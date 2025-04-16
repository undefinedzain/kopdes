<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Regulation extends Model
{
    protected $guarded = ['regulation_id'];
    protected $primaryKey = 'regulation_id';
}
