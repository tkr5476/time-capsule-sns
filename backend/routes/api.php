<?php

use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\ProfileController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->name('auth.')->group(function () {
    // 未認証ユーザー向けルート
    Route::post('/register', RegisterController::class)->name('register');
    Route::post('/login', [LoginController::class, 'login'])->name('login');

    // 認証済みユーザー向けルート
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [LoginController::class, 'logout'])->name('logout');
        Route::get('/me', ProfileController::class)->name('me');
    });
});

// テスト用エンドポイントを追加
Route::get('/test', function () {
    return response()->json([
        'message' => 'API接続テスト成功',
        'timestamp' => now()
    ]);
});
