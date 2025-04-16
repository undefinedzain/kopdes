<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LegalStage extends Model
{
    protected $table = 'legal_stages';
    protected $primaryKey = 'legal_stage_id';
    protected $guarded = ['legal_stage_id'];

    public function cooperativeLegalStages()
    {
        return $this->hasMany(CooperativeLegalStage::class, 'legalStageId', 'legal_stage_id');
    }

}
