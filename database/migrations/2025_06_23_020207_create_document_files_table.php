<?php

// database/migrations/xxxx_xx_xx_create_document_files_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('document_files', function (Blueprint $table) {
            $table->id();
            $table->foreignId('document_id')->constrained()->onDelete('cascade');
            $table->string('file_path');
            $table->string('file_name')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('document_files');
    }
};
