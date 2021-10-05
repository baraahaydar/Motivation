<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
////////////////////////////////////Route for admin////////////////////////////////////
Route::get('/admin',[\App\Http\Controllers\AdminsController::class,'index']);
Route::get('/admin/{id}',[\App\Http\Controllers\AdminsController::class,'getById']);
Route::post('/admin/{id}',[\App\Http\Controllers\AdminsController::class,'edit']);
Route::post('/admin',[\App\Http\Controllers\AdminsController::class,'store']);
Route::delete('/admin/{id}',[\App\Http\Controllers\AdminsController::class,'destroy']);
Route::get('/admintoken/{token}',[App\Http\Controllers\AdminsController::class,'getByToken']);

////////////////////////////////////Route for likes////////////////////////////////////

Route::get('/likes',[\App\Http\Controllers\LikesController::class,'index']);
//Route::get('/likes/{id}',[\App\Http\Controllers\likesController::class,'getByID']);
Route::post('/likes',[\App\Http\Controllers\LikesController::class,'store']);
Route::put('/likes/{id}',[\App\Http\Controllers\LikesController::class,'edit']);
Route::delete('/likes/{id}',[\App\Http\Controllers\LikesController::class,'destroy']);
Route::get('/likesuser/{id}',[\App\Http\Controllers\LikesController::class,'byuser']);
Route::get('/likespost/{id}',[\App\Http\Controllers\LikesController::class,'bypost']);
Route::delete('/likespostuser/{idp}/{idu}',[\App\Http\Controllers\LikesController::class,'delet']);
Route::get('/likespostuser/{idp}/{idu}',[\App\Http\Controllers\LikesController::class,'bypostuser']);




////////////////////////////////////Route for posts////////////////////////////////////
Route::post('/posts',[\App\Http\Controllers\PostsController::class,'store']);
Route::get('/posts',[\App\Http\Controllers\PostsController::class,'index']);
Route::post('/posts/{id}',[\App\Http\Controllers\PostsController::class,'edit']);
Route::delete('/posts/{id}',[\App\Http\Controllers\PostsController::class,'destroy']);
Route::get('/posts/{id}',[\App\Http\Controllers\PostsController::class,'getById']);
Route::get('/postadmin/{id}',[\App\Http\Controllers\PostsController::class,'postadmin']);


//////////////////////////////Route for notifications////////////////////////////////////
Route::post('/notifications',[\App\Http\Controllers\NotificationsController::class,'store']);
Route::get('/notifications',[\App\Http\Controllers\NotificationsController::class,'index']);
Route::put('/notifications/{id}',[\App\Http\Controllers\NotificationsController::class,'edit']);
Route::delete('/notifications/{id}',[\App\Http\Controllers\NotificationsController::class,'destroy']);
Route::get('/notifications/{id}',[\App\Http\Controllers\NotificationsController::class,'getById']);
Route::get('/notadmin/{id}',[\App\Http\Controllers\NotificationsController::class,'notadmin']);


////////////////////////////////Route for comments///////////////////////////////////////
Route::post('/comments',[\App\Http\Controllers\CommentsController::class,'store']);
Route::get('/comments',[\App\Http\Controllers\CommentsController::class,'index']);
Route::put('/comments/{id}',[\App\Http\Controllers\CommentsController::class,'edit']);
Route::delete('/comments/{id}',[\App\Http\Controllers\CommentsController::class,'destroy']);
Route::get('/comments/{id}',[\App\Http\Controllers\CommentsController::class,'getById']);



/////////////////////////////////Auth/////////////////////////////////////////////////////////
Route::post('/register', ['App\Http\Controllers\AuthController', 'register']);
Route::post('/login', ['App\Http\Controllers\AuthController', 'login']);
Route::post('/logout', ['App\Http\Controllers\AuthController', 'logout']);
