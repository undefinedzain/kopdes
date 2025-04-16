<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Province extends Model
{
    
    protected $primaryKey = 'province_id'; // karena bukan default 'id'
    protected $fillable = ['code', 'name'];

    public function districts()
    {
        return $this->hasMany(District::class, 'province_code', 'code');
    }
}
