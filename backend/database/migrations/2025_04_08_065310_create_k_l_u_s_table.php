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
        Schema::create('klus', function (Blueprint $table) {
            $table->id('klu_id');
            $table->string('name', 256);
            $table->string('code_kbli', 50);
            $table->timestamps();
            $table->unsignedBigInteger('cooperativeTypeId');

            $table->foreign('cooperativeTypeId')
                ->references('cooperative_type_id')
                ->on('cooperative_types')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('klus');
    }
};
