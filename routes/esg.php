<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::prefix('esg')->middleware(['auth', 'verified'])->group(function () {
    Route::get('categories', fn () => Inertia::render('esg/categories'))->name('esg.categories');
    Route::get('indicators', fn () => Inertia::render('esg/indicators'))->name('esg.indicators');
    Route::get('reports', fn () => Inertia::render('esg/reports'))->name('esg.reports');
    Route::get('data', fn () => Inertia::render('esg/data'))->name('esg.data');
    Route::get('projects', fn () => Inertia::render('esg/projects'))->name('esg.projects');
    Route::get('tasks', fn () => Inertia::render('esg/tasks'))->name('esg.tasks');
    Route::get('audit', fn () => Inertia::render('esg/audit'))->name('esg.audit');
    Route::get('policies', fn () => Inertia::render('esg/policies'))->name('esg.policies');
    Route::get('data-table', fn () => Inertia::render('esg/dataTable'))->name('esg.data_table');
});
