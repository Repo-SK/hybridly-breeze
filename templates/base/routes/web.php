<?php

use App\Http\Controllers\AccountProfileController;
use App\Http\Controllers\AccountSecurityController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/', function () {
        return hybridly('dashboard');
    })->name('dashboard.index');

    Route::get('/account/profile', AccountProfileController::class)->name('account.profile');
    Route::get('/account/security', AccountSecurityController::class)
        ->middleware('password.confirm')
        ->name('account.security');
});
