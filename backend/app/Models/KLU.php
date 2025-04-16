<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class KLU extends Model
{
    protected $table = 'klus';

    public function cooperativeType()
    {
        return $this->hasOne(CooperativeType::class, 'cooperative_type_id', 'cooperativeTypeId');
    }
}
