<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cooperative extends Model
{
    protected $table = 'cooperatives';
    protected $primaryKey = 'cooperative_id';
    protected $guarded = ['cooperative_id'];

    protected $fillable = [
        'name', 'display_name', 'working_area', 'form', 'management_pattern',
        'timeframe', 'provinceId', 'districtId', 'subdistrictId', 'villageId',
        'address', 'rt', 'rw', 'postal_code', 'phone', 'email',
        'npakId', 'napk', 'establishment_date', 'meeting_date',
        'meeting_address', 'meeting_participant', 'capital', 'principal_saving',
        'mandatory_saving', 'grant_fund', 'bamd', 'bara', 'subdomain',
        'nik', 'userId', 'request_name', 'old_name', 'registration_type', 'ticket'
    ];
    

    // app/Models/Cooperative.php

    public function province()
    {
        return $this->belongsTo(Province::class, 'provinceId', 'province_id');
    }

    public function district()
    {
        return $this->belongsTo(District::class, 'districtId', 'district_id');
    }

    public function subdistrict()
    {
        return $this->belongsTo(Subdistrict::class, 'subdistrictId', 'subdistrict_id');
    }

    public function village()
    {
        return $this->belongsTo(Village::class, 'villageId', 'village_id');
    }

    public function npak()
    {
        return $this->belongsTo(NPAK::class, 'npakId', 'notary_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'userId', 'id');
    }


    public function managements()
    {
        return $this->hasMany(CooperativeManagement::class, 'cooperativeId', 'cooperative_id');
    }

    public function klus()
    {
        return $this->hasMany(CooperativeKLU::class, 'cooperativeId', 'cooperative_id');
    }

    public function legalStages()
    {
        return $this->hasMany(CooperativeLegalStage::class, 'cooperativeId', 'cooperative_id');
    }

}
