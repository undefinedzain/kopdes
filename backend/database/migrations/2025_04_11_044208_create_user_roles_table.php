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
        Schema::create('user_roles', function (Blueprint $table) {
            $table->id('user_role_id'); // satu-satunya auto_increment + primary key
        
            $table->unsignedBigInteger('role_positionId');
            $table->unsignedBigInteger('userId');
            $table->unsignedBigInteger('institutionId')->nullable(); // foreign key, bukan auto_increment
            $table->unsignedBigInteger('npak')->nullable();
            $table->unsignedBigInteger('cooperativeId')->nullable(); // foreign key, bukan auto_increment
        
            // Foreign keys
            $table->foreign('role_positionId')->references('role_id')->on('role_positions')->onDelete('cascade');
            $table->foreign('userId')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('institutionId')->references('institution_id')->on('institutions')->onDelete('cascade');
            $table->foreign('npak')->references('notary_id')->on('npaks')->onDelete('cascade');
            $table->foreign('cooperativeId')->references('cooperative_id')->on('cooperatives')->onDelete('cascade');
        
            $table->timestamps();
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_roles');
    }
};
