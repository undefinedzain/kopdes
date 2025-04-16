<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subdistrict extends Model
{
    //
    protected $fillable = ['id', 'name', 'district_id'];
    public $incrementing = false;

    public function district()
    {
        return $this->belongsTo(District::class, 'district_code', 'code');
    }

    public function villages()
    {
        return $this->hasMany(Village::class, 'subdistrict_code', 'code');
    }

}
