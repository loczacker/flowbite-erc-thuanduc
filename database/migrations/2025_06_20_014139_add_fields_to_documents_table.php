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
        Schema::table('documents', function (Blueprint $table) {
        $table->string('company')->nullable();
        $table->string('factory')->nullable();
        $table->string('category')->nullable();
        $table->string('issued_by')->nullable();
        $table->date('issued_date')->nullable();
        $table->date('expired_date')->nullable();
        $table->text('note')->nullable(); // ghi chú
        $table->string('file_path')->nullable();
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('documents', function (Blueprint $table) {
            //
        });
    }
};
