<?php

use App\Http\Controllers\Api\ImageController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\PageViewController;
use App\Http\Controllers\Api\RankingController;
use App\Http\Controllers\Api\ContactController;
use Illuminate\Support\Facades\Route;

Route::get('/images', [ImageController::class, 'index']);
Route::post('/images/upload', [ImageController::class, 'upload']);
Route::delete('/images/delete', [ImageController::class, 'destroy']);

Route::get('/posts', [PostController::class, 'index']);
Route::get('/posts/{post}', [PostController::class, 'show']);

Route::get('/categories', [CategoryController::class, 'index']);

Route::get('/search/posts', [PostController::class, 'search']);

Route::post('/page-view', [PageViewController::class, 'store']);

Route::get('/ranking', [RankingController::class, 'index']);

Route::post('/contact', [ContactController::class, 'send']);