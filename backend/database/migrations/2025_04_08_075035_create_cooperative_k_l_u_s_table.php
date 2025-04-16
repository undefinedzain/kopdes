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
        Schema::create('cooperative_klus', function (Blueprint $table) {
            $table->id('cooperative_klu_id');
            $table->unsignedBigInteger('cooperativeId');
            $table->integer('kluId')->nullable(false);

            $table->foreign('cooperativeId')->references('cooperative_id')->on('cooperatives')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cooperative_klus');
    }
};
