<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::prefix('hr')->middleware(['auth', 'verified'])->group(function () {
    Route::get('employees', fn () => Inertia::render('hr/employees'))->name('hr.employees');
    Route::get('positions', fn () => Inertia::render('hr/positions'))->name('hr.positions');
    Route::get('employee-positions', fn () => Inertia::render('hr/employeePositions'))->name('hr.employee_positions');
});
