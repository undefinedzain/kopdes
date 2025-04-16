<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Institution extends Model
{
    protected $primaryKey = 'institution_id';
    protected $fillable = ['name'];

    public function userRoles()
    {
        return $this->hasMany(UserRole::class, 'institutionId', 'institution_id');
    }
}
