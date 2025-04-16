<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cooperative_legal_stages', function (Blueprint $table) {
            $table->id('cooperative_legal_stage_id');
            $table->unsignedBigInteger('cooperativeId');
            $table->unsignedBigInteger('legalStageId');

            $table->foreign('cooperativeId')->references('cooperative_id')->on('cooperatives')->onDelete('cascade');
            $table->foreign('legalStageId')->references('legal_stage_id')->on('legal_stages')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cooperative_legal_stages');
    }
};
