<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

// APIルートのプレフィックスを追加
Route::prefix('api')->group(function () {
    Route::get('/test', function () {
        return ['message' => 'API is working'];
    });
});
