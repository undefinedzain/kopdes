<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Province;
use App\Models\District;
use App\Models\Subdistrict;
use App\Models\Village;
use App\Models\VillageDuplicate;
use DB;

class LocationController extends Controller
{
    public function provinces()
    {
        $provinces = Province::orderBy('name', 'asc')
            ->where('province_id', '!=', 0)
            ->get();
        return response()->json([
            'message' => 'Success',
            'data' => $provinces,
        ], 200);
    }

    public function provinceById($id)
    {
        $province = Province::where('province_id', $id)->first();

        if (!$province) {
            return response()->json([
                'message' => 'Province not found.'
            ], 404);
        }

        return response()->json([
            'message' => 'Success',
            'data' => $province,
        ], 200);
    }


    public function districts($provinceCode)
    {
        $districts = District::where('province_code', $provinceCode)
            ->where('district_id', '!=', 0)
            ->orderBy('name', 'asc')
            ->get();
        return response()->json([
            'message' => 'Success',
            'data' => $districts,
        ], 200);
    }

    public function districtById($id)
    {
        $district = District::where('district_id', $id)->first();

        if (!$district) {
            return response()->json([
                'message' => 'District not found.'
            ], 404);
        }

        return response()->json([
            'message' => 'Success',
            'data' => $district,
        ], 200);
    }


    public function subDistricts($districtCode)
    {
        $subdistricts = Subdistrict::where('district_code', $districtCode)
            ->where('subdistrict_id', '!=', 0)
            ->orderBy('name', 'asc')
            ->get();
        return response()->json([
            'message' => 'Success',
            'data' => $subdistricts,
        ], 200);
    }

    public function subdistrictById($id)
    {
        $subdistrict = Subdistrict::where('subdistrict_id', $id)->first();

        if (!$subdistrict) {
            return response()->json([
                'message' => 'Subdistrict not found.'
            ], 404);
        }

        return response()->json([
            'message' => 'Success',
            'data' => $subdistrict,
        ], 200);
    }


    public function villages($subDistrictCode)
    {
        $villages = Village::where('subdistrict_code', $subDistrictCode)
            ->where('village_id', '!=', 0)
            ->orderBy('name', 'asc')
            ->get();
        return response()->json([
            'message' => 'Success',
            'data' => $villages,
        ], 200);
    }

    public function villageById($id)
    {
        $village = Village::where('village_id', $id)->first();

        if (!$village) {
            return response()->json([
                'message' => 'Village not found.'
            ], 404);
        }

        return response()->json([
            'message' => 'Success',
            'data' => $village,
        ], 200);
    }


    // Check duplicate villages
    public function villageDuplicateCheck($villageCode)
    {
        $isDuplicate = false;
        $villages = [];
        $village = VillageDuplicate::where('code', $villageCode)->first();
        if ($village) {
            $isDuplicate = true;
            $villages = VillageDuplicate::where('village_duplicates.name', $village->name)
                ->join('subdistricts', 'village_duplicates.subdistrict_code', 'subdistricts.code')
                ->join('districts', 'subdistricts.district_code', 'districts.code')
                ->join('provinces', 'districts.province_code', 'provinces.code')
                ->select(
                    'provinces.name as province_name',
                    'districts.name as district_name',
                    'subdistricts.name as subdistrict_name',
                    'village_duplicates.name as village_name'
                )
                ->get();
        }

        return response()->json([
            'message' => 'Success',
            'data' => [
                'is_duplicate' => $isDuplicate,
                'villages' => $villages
            ],
        ], 200);
    }
}
