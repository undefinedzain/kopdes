<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Regulation;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class RegulationController extends Controller
{
    public function index()
    {
        $data = Regulation::all();

        return response()->json([
            'message' => 'Success get all regulations',
            'data' => $data,
        ], 200);
    }

}
