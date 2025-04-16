<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CooperativeKLU extends Model
{
    protected $table = 'cooperative_klus';
    protected $primaryKey = 'cooperative_klu_id';
    protected $guarded = ['cooperative_klu_id'];

    //
    public function cooperative()
    {
        return $this->belongsTo(Cooperative::class, 'cooperativeId', 'cooperative_id');
    }

    public function klu()
    {
        return $this->hasOne(KLU::class, 'klu_id', 'kluId');
    }

}
