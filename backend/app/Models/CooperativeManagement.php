<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CooperativeManagement extends Model
{
    //
    protected $table = 'cooperative_management';
    protected $primaryKey = 'cooperative_management_id';
    protected $guarded = ['cooperative_management_id'];

    public function cooperative()
    {
        return $this->belongsTo(Cooperative::class, 'cooperativeId', 'cooperative_id');
    }

}
