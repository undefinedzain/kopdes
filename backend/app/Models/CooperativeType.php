<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CooperativeType extends Model
{
    public function klus()
    {
        return $this->hasMany(KLU::class, 'cooperativeTypeId', 'cooperative_type_id');
    }
}
