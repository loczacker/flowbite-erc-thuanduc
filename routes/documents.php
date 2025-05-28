<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::prefix('documents')->middleware(['auth', 'verified'])->group(function () {
    // Tất cả tài liệu
    Route::get('/', fn () => Inertia::render('documents/index'))->name('documents.index');

    // Thêm mới tài liệu
    Route::get('create', fn () => Inertia::render('documents/create'))->name('documents.create');

    // Sửa tài liệu (trang chọn tài liệu để sửa)
    Route::get('edit', fn () => Inertia::render('documents/edit'))->name('documents.edit');
});
