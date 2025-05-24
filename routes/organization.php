<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::prefix('organization')->middleware(['auth', 'verified'])->group(function () {
    Route::get('corporations', fn () => Inertia::render('organization/corporations'))->name('organizations.corporations');
    Route::get('companies', fn () => Inertia::render('organization/companies'))->name('organizations.companies');
    Route::get('factories', fn () => Inertia::render('organization/factories'))->name('organizations.factories');
    Route::get('departments', fn () => Inertia::render('organization/departments'))->name('organizations.departments');
});
