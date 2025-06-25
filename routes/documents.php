<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DocumentController;
use App\Models\DocumentFile;
use Illuminate\Support\Facades\Storage;

Route::middleware(['auth', 'verified'])->group(function () {
    // Nhóm các route liên quan đến Document
    Route::prefix('documents')->name('documents.')->group(function () {
        Route::get('/', [DocumentController::class, 'index'])->name('index');
        Route::get('/create', [DocumentController::class, 'create'])->name('create');
        Route::post('/', [DocumentController::class, 'store'])->name('store');

        Route::get('/{document}', [DocumentController::class, 'show'])->name('show');
        Route::get('/{document}/edit', [DocumentController::class, 'edit'])->name('edit');
        Route::put('/{document}', [DocumentController::class, 'update'])->name('update');
        Route::delete('/{document}', [DocumentController::class, 'destroy'])->name('destroy');

        Route::get('/{document}/download', [DocumentController::class, 'download'])->name('download');
        Route::get('/{document}/view', [DocumentController::class, 'view'])->name('view');
    });

    // Tải từng file riêng biệt
    Route::get('/documents/download-file/{file}', function (DocumentFile $file) {
        if (!Storage::disk('public')->exists($file->file_path)) {
            abort(404, 'Không tìm thấy file');
        }
        return Storage::disk('public')->download($file->file_path, $file->file_name ?? basename($file->file_path));
    })->name('document_files.download');

    Route::delete('/documents/{document}/delete-file/{file}', function (App\Models\Document $document, App\Models\DocumentFile $file) {
    if ($file->document_id !== $document->id) abort(403);
    Storage::disk('public')->delete($file->file_path);
    $file->delete();
    return back()->with('message', 'Đã xoá tệp thành công!');
})->name('document_files.destroy');

    Route::get('/documents/view-file/{file}', function (App\Models\DocumentFile $file) {
    return redirect()->away(Storage::disk('public')->url($file->file_path));
})->name('document_files.preview');


});
