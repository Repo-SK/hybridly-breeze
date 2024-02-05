<?php

use App\Http\Controllers\UserProfileController;
use App\Http\Controllers\OtherBrowserSessionsController;
use App\Http\Controllers\CurrentUserController;
use App\Http\Controllers\TermsOfServiceController;
use App\Http\Controllers\PrivacyPolicyController;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;

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

Route::get('/', function () {
    return hybridly('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('welcome');

Route::get('/terms-of-service', [TermsOfServiceController::class, 'show'])->name('terms.show');
Route::get('/privacy-policy', [PrivacyPolicyController::class, 'show'])->name('policy.show');

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', function () {
        return hybridly('Dashboard');
    })->name('dashboard');

    // User & Profile...
    Route::get('/user/profile', [UserProfileController::class, 'show'])
        ->name('profile.show');

    Route::delete('/user/other-browser-sessions', [OtherBrowserSessionsController::class, 'destroy'])
        ->name('other-browser-sessions.destroy');

    Route::delete('/user', [CurrentUserController::class, 'destroy'])
        ->name('current-user.destroy');

    Route::middleware(['verifed'])->group(function () {
        // make something awesome!
    });
});
