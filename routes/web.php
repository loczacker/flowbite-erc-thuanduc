<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', fn () => Inertia::render('dashboard'))->name('dashboard');
});

require __DIR__.'/organization.php';
require __DIR__.'/hr.php';
require __DIR__.'/esg.php';
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/documents.php';

