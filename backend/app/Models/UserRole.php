<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserRole extends Model
{
    public $timestamps = false;
    protected $fillable = [
        'role_positionId', 'userId', 'institutionId', 'npak', 'cooperativeId',
    ];

    public function institution()
    {
        return $this->belongsTo(Institution::class, 'institutionId', 'institution_id');
    }

    public function rolePosition()
    {
        return $this->belongsTo(RolePosition::class, 'role_positionId');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'userId');
    }

    public function npak()
    {
        return $this->belongsTo(Npak::class, 'npak');
    }

    public function cooperative()
    {
        return $this->belongsTo(Cooperative::class, 'cooperativeId');
    }

    public function role()
    {
        return $this->hasOne(RolePosition::class, 'role_id', 'role_positionId');
    }
}
