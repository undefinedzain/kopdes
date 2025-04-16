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
        Schema::table('npaks', function (Blueprint $table) {
            $table->unsignedBigInteger('districtId');

            $table->foreign('districtId')
                ->references('district_id')
                ->on('districts')
                ->onDelete('cascade');

            $table->string('ahu_number', 256)->nullable(false);
            $table->string('sk_number', 256)->nullable(false);
            $table->string('certificate_training', 256)->nullable(false);
            $table->string('email', 128)->nullable(false);
            $table->string('primary_phone', 50)->nullable(false);
            $table->string('secondary_phone', 50)->nullable(false);
            $table->string('office_telephone', 128)->nullable(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('npaks', function (Blueprint $table) {
            $table->dropColumn([
                'districtId',
                'ahu_number',
                'sk_number',
                'certificate_training',
                'email',
                'primary_phone',
                'secondary_phone',
                'office_telephone',
            ]);
        });
    }
};
