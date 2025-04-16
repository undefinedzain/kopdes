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
        Schema::create('role_positions', function (Blueprint $table) {
            $table->id('role_id');
            $table->unsignedBigInteger('roleId');
            $table->string('position', 255);
            $table->timestamps();

            $table->foreign('roleId')->references('role_id')->on('roles')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('role_positions');
    }
};
