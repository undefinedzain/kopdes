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
        Schema::create('cooperatives', function (Blueprint $table) {
            $table->id('cooperative_id');
            $table->timestamps();

            $table->string('name', 256);
            $table->string('display_name', 256)->nullable();
            $table->string('working_area', 256)->nullable();
            $table->string('form', 50)->nullable();
            $table->string('management_pattern', 50)->nullable();
            $table->date('timeframe')->nullable();

            $table->unsignedBigInteger('provinceId');
            $table->unsignedBigInteger('districtId');
            $table->unsignedBigInteger('subdistrictId');
            $table->unsignedBigInteger('villageId');
            $table->string('address', 256)->nullable();
            $table->string('rt', 50)->nullable();
            $table->string('rw', 50)->nullable();
            $table->string('postal_code', 50)->nullable();
            $table->string('phone', 50);
            $table->string('email', 128);

            $table->unsignedBigInteger('npakId');
            $table->string('establishment_date', 50)->nullable();
            $table->string('meeting_date', 50)->nullable();
            $table->string('meeting_address', 50)->nullable();
            $table->string('meeting_participant', 50)->nullable();
            $table->string('capital', 50)->nullable();
            $table->string('principal_saving', 50)->nullable();
            $table->string('mandatory_saving', 50)->nullable();
            $table->string('grant_fund', 50)->nullable();
            $table->string('bamd', 500);
            $table->string('bara', 500);
            $table->string('subdomain', 50);
            $table->unsignedBigInteger('nik')->nullable();
            $table->unsignedBigInteger('userId');
            $table->unsignedBigInteger('request_name')->nullable();
            $table->unsignedBigInteger('old_name')->nullable();
            $table->string('registration_type', 50)->nullable();

            // Foreign keys
            $table->foreign('provinceId')->references('province_id')->on('provinces')->onDelete('cascade');
            $table->foreign('districtId')->references('district_id')->on('districts')->onDelete('cascade');
            $table->foreign('subdistrictId')->references('subdistrict_id')->on('subdistricts')->onDelete('cascade');
            $table->foreign('villageId')->references('village_id')->on('villages')->onDelete('cascade');
            $table->foreign('npakId')->references('notary_id')->on('npaks')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cooperatives');
    }
};
