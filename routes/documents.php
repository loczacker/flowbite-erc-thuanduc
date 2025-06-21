<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DocumentController;

Route::prefix('documents')->middleware(['auth', 'verified'])->group(function () {
    Route::get('/', [DocumentController::class, 'index'])->name('documents.index');
    Route::get('/create', [DocumentController::class, 'create'])->name('documents.create');
    Route::post('/', [DocumentController::class, 'store'])->name('documents.store');

    Route::get('/{document}', [DocumentController::class, 'show'])->name('documents.show');
    Route::get('/{document}/edit', [DocumentController::class, 'edit'])->name('documents.edit');
    Route::put('/{document}', [DocumentController::class, 'update'])->name('documents.update');
    Route::delete('/{document}', [DocumentController::class, 'destroy'])->name('documents.destroy');

    Route::get('/{document}/download', [DocumentController::class, 'download'])->name('documents.download');
    Route::get('/{document}/view', [DocumentController::class, 'view'])->name('documents.view'); // thêm nếu cần
});



