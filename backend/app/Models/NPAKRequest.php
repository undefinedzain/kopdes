<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NPAKRequest extends Model
{
    protected $table = 'npak_requests';

    protected $primaryKey = 'notary_id';

    protected $fillable = ['notary_id', 'name', 'address', 'primary_phone', 'email', 'provinceId', 'districtId'];

    public function province()
    {
        return $this->hasOne(Province::class, 'province_id', 'provinceId');
    }

    public function district()
    {
        return $this->hasOne(District::class, 'district_id', 'districtId');
    }
}
