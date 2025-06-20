<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Document\DocumentController;

Route::prefix('documents')->middleware(['auth', 'verified'])->group(function () {
    Route::get('/', [DocumentController::class, 'index'])->name('documents.index');
    Route::get('create', [DocumentController::class, 'create'])->name('documents.create');
    Route::post('/', [DocumentController::class, 'store'])->name('documents.store');
    Route::get('/{document}/download', [DocumentController::class, 'download'])->name('documents.download'); // ✅ mới
    Route::delete('/{document}', [DocumentController::class, 'destroy'])->name('documents.destroy');
});


