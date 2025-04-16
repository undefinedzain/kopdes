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
        Schema::create('npaks', function (Blueprint $table) {
            $table->id('notary_id');
            $table->string('name', 256);
            $table->string('address', 256);
            $table->timestamps();
            $table->unsignedBigInteger('provinceId'); // FK ke tabel provinsi

            $table->foreign('provinceId')
                ->references('province_id')
                ->on('provinces')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('npaks');
    }
};
