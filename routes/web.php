<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', fn () => Inertia::render('dashboard'))->name('dashboard');

    // Organization
    Route::prefix('organization')->group(function () {
        Route::get('corporations', fn () => Inertia::render('organization/corporations'))->name('organizations.corporations');
        Route::get('companies', fn () => Inertia::render('organization/companies'))->name('organizations.companies');
        Route::get('factories', fn () => Inertia::render('organization/factories'))->name('organizations.factories');
        Route::get('departments', fn () => Inertia::render('organization/departments'))->name('organizations.departments');
    });
    

    // HR (Human Resources)
    Route::get('hr/employees', fn () => Inertia::render('hr/employees'))->name('hr.employees');
    Route::get('hr/positions', fn () => Inertia::render('hr/positions'))->name('hr.positions');
    Route::get('hr/employee-positions', fn () => Inertia::render('hr/employeePositions'))->name('hr.employee_positions');

    // ESG (Environmental, Social, Governance)
    Route::get('esg/categories', fn () => Inertia::render('esg/categories'))->name('esg.categories');
    Route::get('esg/indicators', fn () => Inertia::render('esg/indicators'))->name('esg.indicators');
    Route::get('esg/reports', fn () => Inertia::render('esg/reports'))->name('esg.reports');
    Route::get('esg/data', fn () => Inertia::render('esg/data'))->name('esg.data');
    Route::get('esg/projects', fn () => Inertia::render('esg/projects'))->name('esg.projects');
    Route::get('esg/tasks', fn () => Inertia::render('esg/tasks'))->name('esg.tasks');
    Route::get('esg/audit', fn () => Inertia::render('esg/audit'))->name('esg.audit');
    Route::get('esg/policies', fn () => Inertia::render('esg/policies'))->name('esg.policies');
    Route::get('esg/data-table', fn () => Inertia::render('esg/dataTable'))->name('esg.data_table');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
