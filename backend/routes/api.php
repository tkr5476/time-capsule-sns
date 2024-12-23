<?php

use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\ProfileController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\GoalController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CommentController;
use Illuminate\Support\Facades\Route;

// 認証関連
Route::prefix('auth')->name('auth.')->group(function () {
    Route::post('/register', RegisterController::class)->name('register');
    Route::post('/login', [LoginController::class, 'login'])->name('login');

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [LoginController::class, 'logout'])->name('logout');
        Route::get('/me', [ProfileController::class, 'show'])->name('me');
        Route::put('/profile', [ProfileController::class, 'update'])->name('profile.update');
    });
});

// 認証必須のルート
Route::middleware('auth:sanctum')->group(function () {
    // ユーザー関連
    Route::get('/users/search', [UserController::class, 'search'])->name('users.search');
    Route::get('/users/{user}', [UserController::class, 'show'])->name('users.show');

    // フォロー関連
    Route::post('/users/{user}/follow', [UserController::class, 'follow'])->name('users.follow');
    Route::delete('/users/{user}/unfollow', [UserController::class, 'unfollow'])->name('users.unfollow');
    Route::get('/users/{user}/followers', [UserController::class, 'followers'])->name('users.followers');
    Route::get('/users/{user}/following', [UserController::class, 'following'])->name('users.following');

    // 投稿関連
    Route::apiResource('posts', PostController::class)->names([
        'index' => 'posts.index',
        'store' => 'posts.store',
        'show' => 'posts.show',
        'update' => 'posts.update',
        'destroy' => 'posts.destroy',
    ]);
    Route::post('/posts/{post}/like', [PostController::class, 'like'])->name('posts.like');
    Route::delete('/posts/{post}/unlike', [PostController::class, 'unlike'])->name('posts.unlike');
    Route::get('/posts/{post}/likes', [PostController::class, 'getLikes'])->name('posts.likes');
    Route::get('/posts/{post}/comments', [CommentController::class, 'index'])->name('posts.comments.index');
    Route::post('/posts/{post}/comments', [CommentController::class, 'store'])->name('posts.comments.store');
    Route::put('/posts/{post}/comments/{comment}', [CommentController::class, 'update'])->name('posts.comments.update');
    Route::delete('/posts/{post}/comments/{comment}', [CommentController::class, 'destroy'])->name('posts.comments.destroy');

    // 目標関連
    Route::apiResource('goals', GoalController::class)->names([
        'index' => 'goals.index',
        'store' => 'goals.store',
        'show' => 'goals.show',
        'update' => 'goals.update',
        'destroy' => 'goals.destroy',
    ]);

    // タスク関連
    Route::apiResource('tasks', TaskController::class)->names([
        'index' => 'tasks.index',
        'store' => 'tasks.store',
        'show' => 'tasks.show',
        'update' => 'tasks.update',
        'destroy' => 'tasks.destroy',
    ]);
    Route::post('/tasks/{task}/complete', [TaskController::class, 'complete'])->name('tasks.complete');
    Route::post('/tasks/{task}/like', [TaskController::class, 'like'])->name('tasks.like');
    Route::delete('/tasks/{task}/unlike', [TaskController::class, 'unlike'])->name('tasks.unlike');
    Route::get('/tasks/{task}/likes', [TaskController::class, 'getLikes'])->name('tasks.likes');
    Route::get('/tasks/{task}/comments', [CommentController::class, 'index'])->name('tasks.comments.index');
    Route::post('/tasks/{task}/comments', [CommentController::class, 'store'])->name('tasks.comments.store');
    Route::put('/tasks/{task}/comments/{comment}', [CommentController::class, 'update'])->name('tasks.comments.update');
    Route::delete('/tasks/{task}/comments/{comment}', [CommentController::class, 'destroy'])->name('tasks.comments.destroy');
});

// テスト用エンドポイント
Route::get('/test', function () {
    return response()->json([
        'message' => 'API接続テスト成功',
        'timestamp' => now()
    ]);
})->name('test');
