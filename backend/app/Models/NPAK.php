<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NPAK extends Model
{
    protected $table = 'npaks';

    protected $primaryKey = 'notary_id';

    protected $guarded = ['notary_id'];

    public function province()
    {
        return $this->hasOne(Province::class, 'province_id', 'provinceId');
    }

    public function district()
    {
        return $this->hasOne(District::class, 'district_id', 'districtId');
    }
}
