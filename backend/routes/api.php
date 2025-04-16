<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\LocationController;
use App\Http\Controllers\Api\CooperativeController;
use App\Http\Controllers\Api\NPAKAdministratorController;
use App\Http\Controllers\Api\NPAKController;
use App\Http\Controllers\Api\RegulationController;

Route::get('/login', function () {
    return response()->json(['message' => 'Please authenticate'], 401);
})->name('login');

Route::post('/register', [AuthController::class, 'register']);
Route::post('/register/npak', [AuthController::class, 'registerNPAK']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);
Route::middleware('auth:sanctum')->get('/profile', [AuthController::class, 'profile']);
Route::middleware('auth:sanctum')->put('/profile', [AuthController::class, 'update']);
Route::post('/forgot-password', [AuthController::class, 'sendResetLink']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('cooperatives', CooperativeController::class);
    Route::prefix('cooperatives')->group(function () {
        Route::get('by-npak-id/{NPAKId}', [CooperativeController::class, 'getByNPAKId']);
    });
    
    Route::prefix('cooperative')->group(function () {
        Route::get('by-cooperative-id/{cooperativeId}', [CooperativeController::class, 'detail']);
        Route::get('legal-stages/by-cooperative-id/{cooperativeId}', [CooperativeController::class, 'getLegalStages']);
    });
});



Route::get('/provinces', [LocationController::class, 'provinces']);
Route::get('/districts/by-province-code/{provinceCode}', [LocationController::class, 'districts']);
Route::get('/sub-districts/by-district-code/{districtCode}', [LocationController::class, 'subDistricts']);
Route::prefix('villages')->group(function () {
    Route::get('/by-sub-district-code/{subDistrictCode}', [LocationController::class, 'villages']);
    Route::get('/duplicate-check/{villageCode}', [LocationController::class, 'villageDuplicateCheck']);
});

Route::get('/province/{id}', [LocationController::class, 'provinceById']);
Route::get('/district/{id}', [LocationController::class, 'districtById']);
Route::get('/subdistrict/{id}', [LocationController::class, 'subdistrictById']);
Route::get('/village/{id}', [LocationController::class, 'villageById']);

Route::get('/verifikasi-pengajuan', [CooperativeController::class, 'verify']);

Route::prefix('cooperative')->group(function () {
    Route::post('/register', [CooperativeController::class, 'register']);
    Route::get('/by-nik/{nik}', [CooperativeController::class, 'getByNIK']);
    Route::get('/types', [CooperativeController::class, 'getCooperativeTypes']);
    Route::patch('agreement-confirmation', [CooperativeController::class,'agreementConfirmation']);
    
});

Route::prefix('npak')->group(function () {
    Route::get('', [NPAKController::class, 'npaks']);
    Route::get('/{id}', [NpakController::class, 'getById']);
    Route::get('/province/{provinceId}', [NPAKController::class, 'getByProvinceId']);
    Route::get('search/{provinceCode}/{NPAKName}', [NPAKController::class, 'search']);
    Route::get('validity-check/{notaryId}/{districtCode}', [NPAKController::class, 'validityCheck']);
    Route::get('by-district-code/{districtCode}', [NPAKController::class, 'getByDistrict']);
    Route::get('by-province-code/{provinceCode}', [NPAKController::class, 'getByProvince']);
    Route::get('by-npak-id/{NPAKId}', [NPAKController::class, 'detail']);
    Route::patch('update', [NPAKController::class,'update']);
    Route::delete('npak/{id}', [NPAKController::class, 'destroy'])->name('npak.destroy');
    Route::patch('cooperative-process', [NPAKController::class,'cooperativeProcess']);
});


Route::apiResource('regulations', RegulationController::class);

Route::middleware(['auth:sanctum', 'isAdministrator'])->group(function () {
    Route::get('/administrator/npak', [NPAKAdministratorController::class, 'index'])->name('administratorNPAK.index');
    Route::post('/administrator/npak', [NPAKAdministratorController::class, 'store'])->name('administratorNPAK.store');
    Route::get('/administrator/npak/{npak}', [NPAKAdministratorController::class, 'show'])->name('administratorNPAK.show');
    Route::put('/administrator/npak/{npak}', [NPAKAdministratorController::class, 'update'])->name('administratorNPAK.update');
    Route::delete('/administrator/npak/{npak}', [NPAKAdministratorController::class, 'destroy'])->name('administratorNPAK.destroy');
});



