<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Mail\NPAKUpdatedMail;
use App\Models\CooperativeLegalStage;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Models\District;
use App\Models\Province;
use App\Models\NPAK;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Mail;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Models\UserRole;

class NPAKController extends Controller
{

    public function npaks()
    {
        // Paginate the data for the NPAKs where provinceId is not 0
        $npaks = NPAK::with(['province', 'district'])
            ->where('provinceId', '!=', 0)
            ->orderBy('name', 'asc')
            ->paginate(10); // You can change 15 to any number of items per page

        // Fetch the default NPAK data where provinceId is 0 (can also be paginated if needed)
        $defaultNPAK = NPAK::with(['province', 'district'])
            ->where('provinceId', 0)
            ->orderBy('name', 'asc')
            ->get();

        // Merge the default NPAK data with the paginated results
        $mergedData = $defaultNPAK->merge($npaks);

        // Return the paginated data along with meta information
        return response()->json([
            'message' => 'Success',
            'data' => $mergedData,
            'pagination' => [
                'current_page' => $npaks->currentPage(),
                'total_pages' => $npaks->lastPage(),
                'total_items' => $npaks->total(),
            ],
        ], 200); // Return the response with HTTP 200
    }

    public function getById($id)
    {
        $npak = Npak::find($id);

        if (!$npak) {
            return response()->json([
                'message' => 'NPAK data not found.',
                'data'    => null
            ], 404);
        }

        return response()->json([
            'message' => 'NPAK data retrieved successfully.',
            'data'    => $npak
        ]);
    }




    public function getByDistrict($districtCode)
    {
        $district = District::where('code', $districtCode)->first();
        if (!$district) {
            return response()->json([
                'message' => 'Invalid district',
                'error' => 'Invalida district'
            ], 500);
        }

        $npaks = NPAK::where('districtId', $district->district_id)
            ->where('provinceId', '!=', 0)
            ->with(['province', 'district'])
            ->orderBy('name', 'asc')
            ->get();

        $defaultNPAK = NPAK::where('provinceId', 0)
            ->with(['province', 'district'])
            ->orderBy('name', 'asc')
            ->get();
        return response()->json([
            'message' => 'Success',
            'data' => [...$defaultNPAK, ...$npaks],
        ], 201);
    }

    public function getByProvince($provinceCode)
    {
        $province = Province::where('code', $provinceCode)->first();
        if (!$province) {
            return response()->json([
                'message' => 'Invalid province',
                'error' => 'Invalida province'
            ], 500);
        }

        $npaks = NPAK::where('provinceId', $province->province_id)
            ->where('provinceId', '!=', 0)
            ->with(['province', 'district'])
            ->orderBy('name', 'asc')
            ->get();

        $defaultNPAK = NPAK::where('provinceId', 0)
            ->with(['province', 'district'])
            ->orderBy('name', 'asc')
            ->get();
        return response()->json([
            'message' => 'Success',
            'data' => [...$defaultNPAK, ...$npaks],
        ], 201);
    }

    public function getByProvinceId($provinceId)
    {
        $npaks = NPAK::where('provinceId', $provinceId)
            ->with(['province', 'district'])
            ->orderBy('name', 'asc')
            ->get();

        if ($npaks->isEmpty()) {
            return response()->json([
                'message' => 'No NPAK data found for the given provinceId.',
                'data' => []
            ], 200);
        }

        return response()->json([
            'message' => 'Success',
            'data' => $npaks
        ], 200);
    }


    public function search ($provinceCode, $NPAKName)
    { 
        $province = Province::where('code', $provinceCode)->first();

        if (!$province) {
            return response()->json([
                'message' => 'Success',
                'data' => [],
            ], 200);
        }

        $npaks = NPAK::select('notary_id', 'name', 'created_at', 'updated_at', 'ahu_number', 'sk_number', 'certificate_training', 'email', 'primary_phone', 'secondary_phone', 'office_telephone', 'provinceId')
            ->with(['province'])
            ->where('provinceId', $province->province_id)
            ->whereRaw('LOWER(name) LIKE ?', ['%' . strtolower($NPAKName) . '%'])
            ->orderBy('name', 'asc')
            ->get();

        return response()->json([
            'message' => 'Success',
            'data' => $npaks,
        ], 201);
    }

    public function validityCheck($notaryId, $districtCode)
    {
        $district = District::where('code', $districtCode)->first();
        if (!$district) {
            return response()->json([
                'message' => 'Success',
                'data' => ['valid' => false, 'token' => ''],
            ], 201);
        }
        $check = NPAK::where('notary_id', $notaryId)
            ->where('districtId', $district->district_id)
            ->first();

        return response()->json([
            'message' => 'Success',
            'data' => [
                'valid' => $check ? true : false,
                'token' => $check ?
                    Crypt::encrypt([
                        'id' => $check->notary_id,
                        'district' => $district->district_id,
                        'expires_at' => now()->addMinutes(30)->timestamp
                    ]) : ''
            ],
        ], 201);
    }

    public function update(Request $request)
    {
        try {
            $request->validate([
                'token' => 'required|string|max:1000',
                'address' => 'nullable|min:6|max:256',
                'ahu_number' => 'required|string|min:6|max:128',
                'sk_number' => 'required|string|min:6|max:128',
                'email' => 'required|string|email|min:8|max:128',
                'primary_phone' => 'required|string|min:6|max:16',
                'secondary_phone' => 'required|string|min:6|max:16',
                'office_telephone' => 'required|string|min:6|max:16',
                'certificate_training' => 'required|string|min:8|max:128'
            ]);

            $payload = Crypt::decrypt($request->input('token'));
            if (now()->timestamp > $payload['expires_at']) {
                return response()->json([
                    'message' => 'Failed to update NPAK',
                    'error' => 'The token is expired'
                ], 500);
            }
            
            $notary_id = $payload['id'];
            $districtId = $payload['district'];

            $npak = NPAK::where('notary_id', $notary_id)->where('districtId', $districtId)->first();
            $npak->address = $request->input('address') ?? '-';
            $npak->ahu_number = $request->input('ahu_number');
            $npak->email = $request->input('email');
            $npak->primary_phone = $request->input('primary_phone');
            $npak->secondary_phone = $request->input('secondary_phone');
            $npak->office_telephone = $request->input('office_telephone');
            $npak->sk_number = $request->input('sk_number');
            $npak->certificate_training = $request->input('certificate_training');
            $npak->updated_at = Carbon::now();
            $npak->save();

            Mail::to($request->input('email'))->send(new NPAKUpdatedMail($npak));

            return response()->json([
                'message' => 'Success',
                'data' => [],
            ], 201);
            
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Failed to update NPAK',
                'error' => $th->getMessage()
            ], 500);
        }
    }

    public function cooperativeProcess(Request $request)
    {
        try {
            $request->validate([
                'cooperativeId' => 'required|exists:cooperatives,cooperative_id',
                'token' => 'required|string|max:500'
            ]);

            $payload = Crypt::decrypt($request->input('token'));
            if (now()->timestamp > $payload['expires_at']) {
                return response()->json([
                    'message' => 'Failed to confirm',
                    'error' => 'The token is expired'
                ], 500);
            }

            if ($payload['cooperative_id'] != $request->input('cooperativeId')) {
                return response()->json([
                    'message' => 'Failed to process',
                    'error' => 'Invalid id'
                ], 500);
            }

            $latestCooperativeLegalStage = CooperativeLegalStage::where('cooperativeId', $request->input('cooperativeId'))
                ->orderBy('cooperative_legal_stage_id', 'desc')
                ->first();

            if (!$latestCooperativeLegalStage) {
                return response()->json([
                    'message' => 'Failed to process',
                    'error' => 'Invalid latest legal stage status'
                ], 500);
            }

            if ($latestCooperativeLegalStage->legalStageId == 2 ) {
                return response()->json([
                    'message' => 'Failed to process',
                    'error' => 'Already processed before'
                ], 500);
            }

            CooperativeLegalStage::insert([
                'cooperativeId' => $request->input('cooperativeId'),
                'legalStageId' => 2,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);

            return response()->json([
                'message' => 'Cooperative legal state change by npak success.',
                'data' => []
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Failed to process.',
                'error' => $th->getMessage()
            ], 500);
        }
    }

    public function detail($NPAKId)
    {
        $npak = NPAK::where('notary_id', $NPAKId)
            ->with('province')
            ->first();

        if (!$npak) {
            return response()->json([
                'message' => 'Failed to process.',
                'error' => 'Not found'
            ], 500);
        }

        unset($npak->districtId);
        unset($npak->subdistrictId);
        unset($npak->villageId);
        return response()->json([
            'message' => 'NPAK detail.',
            'data' => $npak
        ], 200);
    }

    public function destroy($id)
    {

        if (!auth()->check()) {
            return response()->json([
                'message' => 'You must be logged in to access this feature.'
            ], 401); 
        }

        $npak = NPAK::find($id);

        if (!$npak) {
            return response()->json([
                'message' => 'NPAK data not found.'
            ], 404); 
        }

        $npak->delete();

        return response()->json([
            'message' => 'NPAK data successfully deleted.'
        ], 200); 
    }


}
