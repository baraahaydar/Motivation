<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Models\Likes;

class LikesController extends Controller
{
    public function index()
    {
        try {
            return Likes::all();
        } catch (Exception $e) {
            return false;
        }
    }
    public function store(Request $request)
    {
        try {
            $like = new Likes();
            $like->fill($request->all());
            $like->save();
            return $like;
        } catch (Exception $e) {
            return false;
        }
    }
    public function getByID($id)
    {

        try {
            return Likes::findOrFail($id);
        } catch (Exception $e) {
            return false;
        }
    }
    public function edit(Request $request, $id)
    {
        try {
            $like = tap(Likes::where('id', $id));
            $updated = $like->update($request->all())->first();
            return [
                'success' => true,
                'data' => $updated,
            ];
        } catch (Exception $e) {
            return false;
        }
    }
    public function destroy($id)
    {
        try {
            Likes::where('id', $id)->delete();
        } catch (Exception $e) {
            return false;
        }
    }
    public function byuser($id)
    {
        try {
            $arr = Likes::select('*')
                ->Join('admins', 'admins.id', '=', 'likes.admin_id')
                ->where('admin_id', $id)
                ->get();

            if (count($arr) >= 1) {
                return $arr;
            } else {
                return false;
            }
        } catch (exception $e) {
            return false;
        }
    }

    public function bypost($id)
    {
        try {
            $arr = Likes::select('*')
              
                ->where('post_id', $id)
                ->get();
            return $arr;

        } catch (exception $e) {
            return false;
        }
    }
    public function bypostuser($idp , $idu)
    {
        try {
            $res = Likes::where('post_id', $idp)
            ->where('admin_id', $idu)
                ->get();
            return $res;

        } catch (exception $e) {
            return false;
        }
    }

    public static function delet($idp, $idu)
    {
        try {

            $res = Likes::where('post_id', $idp)
                ->where('admin_id', $idu)
                ->delete();
            return $res;

        } catch (Exception $e) {
            return false;
        }
    }
}
