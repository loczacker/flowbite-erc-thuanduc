<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::get('corporations', fn () => Inertia::render('Organization/Corporations'))->name('organizations.corporations');
    Route::get('companies', fn () => Inertia::render('Organization/Companies'))->name('organizations.companies');
    Route::get('factories', fn () => Inertia::render('Organization/Factories'))->name('organizations.factories');
    Route::get('departments', fn () => Inertia::render('Organization/Departments'))->name('organizations.departments');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';