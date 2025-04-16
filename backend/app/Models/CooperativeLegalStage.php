<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CooperativeLegalStage extends Model
{
    protected $table = 'cooperative_legal_stages';
    protected $primaryKey = 'cooperative_legal_stage_id';
    protected $guarded = ['cooperative_legal_stage_id'];

    public function cooperative()
    {
        return $this->belongsTo(Cooperative::class, 'cooperativeId', 'cooperative_id');
    }

    public function legalStage()
    {
        return $this->belongsTo(LegalStage::class, 'legalStageId', 'legal_stage_id');
    }

}
