<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\NPAK;
use App\Models\Regulation;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class NPAKAdministratorController extends Controller
{
    
    public function index()
    {
        $npaks = Npak::with('district')->get();

        return response()->json([
            'message' => 'List of NPAKs retrieved successfully.',
            'data' => $npaks
        ], 200);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'                 => 'required|string|max:256',
            'address'              => 'required|string|max:256',
            'provinceId'           => 'required|exists:provinces,province_id',
            'districtId'           => 'required|exists:districts,district_id',
            'ahu_number'           => 'nullable',
            'sk_number'            => 'nullable',
            'certificate_training' => 'required|string|max:256',
            'email'                => 'required|email|max:128|unique:npaks,email',
            'primary_phone'        => 'required|string|max:50',
            'secondary_phone'      => 'required|string|max:50',
            'office_telephone'     => 'required|string|max:128',
            'status'               => 'required|in:Requested,Approved,Rejected,Canceled',
        ]);

        $npak = Npak::create($data);

        return response()->json([
            'message' => 'NPAK created successfully.',
            'data'    => $npak
        ], 201);
    }


    public function show($id)
    {
        $npak = Npak::with('district')->find($id);

        if (!$npak) {
            return response()->json([
                'message' => 'NPAK not found.'
            ], 404);
        }

        return response()->json([
            'message' => 'NPAK retrieved successfully.',
            'data'    => $npak
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $npak = Npak::find($id);

        if (!$npak) {
            return response()->json([
                'message' => 'NPAK not found.'
            ], 404);
        }

        $data = $request->validate([
            'name'                 => 'sometimes|string|max:256',
            'address'              => 'sometimes|string|max:256',
            'provinceId'           => 'sometimes|exists:provinces,province_id',
            'districtId'           => 'sometimes|exists:districts,district_id',
            'ahu_number'           => 'sometimes|string|max:256',
            'sk_number'            => 'sometimes|string|max:256',
            'certificate_training' => 'sometimes|string|max:256',
            'email'                => 'sometimes|email|max:128|unique:npaks,email,' . $id,
            'primary_phone'        => 'sometimes|string|max:50',
            'secondary_phone'      => 'sometimes|string|max:50',
            'office_telephone'     => 'sometimes|string|max:128',
            'status'               => 'sometimes|in:Requested,Approved,Rejected,Canceled',
        ]);

        $npak->update($data);

        return response()->json([
            'message' => 'NPAK updated successfully.',
            'data'    => $npak
        ], 200);
    }


    public function destroy($id)
    {
        $npak = Npak::find($id);

        if (!$npak) {
            return response()->json([
                'message' => 'NPAK not found.'
            ], 404);
        }

        $npak->delete();

        return response()->json([
            'message' => 'NPAK deleted successfully.'
        ], 200);
    }


}
