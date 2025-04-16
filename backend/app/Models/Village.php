<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Village extends Model
{
    //
    protected $fillable = ['id', 'name', 'subdistrict_id'];
    public $incrementing = false;

    public function subdistrict()
    {
        return $this->belongsTo(Subdistrict::class, 'subdistrict_code', 'code');
    }

}
