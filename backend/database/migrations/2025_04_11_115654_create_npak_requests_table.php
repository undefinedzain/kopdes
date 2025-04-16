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
        Schema::create('npak_requests', function (Blueprint $table) {
            $table->id('notary_id');
            $table->string('name', 256);
            $table->string('address', 256);
            $table->unsignedBigInteger('provinceId'); // FK ke tabel provinsi

            $table->foreign('provinceId')
                ->references('province_id')
                ->on('provinces')
                ->onDelete('cascade');
                
            $table->unsignedBigInteger('districtId');
            
            $table->foreign('districtId')
                ->references('district_id')
                ->on('districts')
                ->onDelete('cascade');
            
            $table->string('ahu_number', 256)->nullable();
            $table->string('sk_number', 256)->nullable();
            $table->string('certificate_training', 256)->nullable();
            $table->string('email', 128)->nullable();
            $table->string('primary_phone', 50)->nullable();
            $table->string('secondary_phone', 50)->nullable();
            $table->string('office_telephone', 50)->nullable();
            $table->enum('status', ['Requested', 'Approved', 'Rejected', 'Canceled'])->default('Requested');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('npak_requests');
    }
};
