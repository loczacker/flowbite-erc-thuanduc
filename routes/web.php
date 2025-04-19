<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', fn () => Inertia::render('dashboard'))->name('dashboard');

    // Organization
    Route::get('corporations', fn () => Inertia::render('Organization/Corporations'))->name('organizations.corporations');
    Route::get('companies', fn () => Inertia::render('Organization/Companies'))->name('organizations.companies');
    Route::get('factories', fn () => Inertia::render('Organization/Factories'))->name('organizations.factories');
    Route::get('departments', fn () => Inertia::render('Organization/Departments'))->name('organizations.departments');

    // HR (Human Resources)
    Route::get('hr/employees', fn () => Inertia::render('HR/Employees'))->name('hr.employees');
    Route::get('hr/positions', fn () => Inertia::render('HR/Positions'))->name('hr.positions');
    Route::get('hr/employee-positions', fn () => Inertia::render('HR/EmployeePositions'))->name('hr.employee_positions');

    // ESG (Environmental, Social, Governance)
    Route::get('esg/categories', fn () => Inertia::render('ESG/Categories'))->name('esg.categories');
    Route::get('esg/indicators', fn () => Inertia::render('ESG/Indicators'))->name('esg.indicators');
    Route::get('esg/reports', fn () => Inertia::render('ESG/Reports'))->name('esg.reports');
    Route::get('esg/data', fn () => Inertia::render('ESG/Data'))->name('esg.data');
    Route::get('esg/projects', fn () => Inertia::render('ESG/Projects'))->name('esg.projects');
    Route::get('esg/tasks', fn () => Inertia::render('ESG/Tasks'))->name('esg.tasks');
    Route::get('esg/audit', fn () => Inertia::render('ESG/Audit'))->name('esg.audit');
    Route::get('esg/policies', fn () => Inertia::render('ESG/Policies'))->name('esg.policies');
    Route::get('esg/data-table', fn () => Inertia::render('ESG/DataTable'))->name('esg.data_table');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
