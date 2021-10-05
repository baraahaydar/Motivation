<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Models\Posts;

class PostsController extends Controller
{
    public function store(Request $request)
    {
        try {
            $post = new Posts();
            $imgName = 'image';
            $date = date('Y-m-d H:i:s');

            $extesion = $request->file('img')->extension();
            $path = $request->file('img')->storeAs('./public/images', $request->image . $date . '.' . $extesion);
            $post->$imgName = $request->image . $date . '.' . $extesion;

            $post->fill($request->all());
            $post->save();
            return $post;
        } catch (Exception $e) {
            return false;
        }
    }
    public function destroy($id)
    {
        try {
            Posts::where('id', $id)->delete();
        } catch (Exception $e) {
            return false;
        }
    }





    public function edit(Request $request, $id)
    {
        try {
            $post = tap(Posts::where('id', $id));
            $imgName = 'image';
            $date = date('Y-m-d H:i:s');

            $extesion = $request->file('image')->extension();
            $path = $request->file('image')->storeAs('uploads', $request->image . '.' . $extesion);

            $updated = $post->update($request->all())->first();
            return [
                'success' => true,
                'data' => $updated,
            ];
        } catch (Exception $e) {
            return false;
        }
    }
    public function index()
    {
        try {
            return Posts::all();
        } catch (Exception $e) {
            return false;
        }
    }
    public function getById($id)
    {

        try {
            return Posts::findOrFail($id);
        } catch (Exception $e) {
            return false;
        }
    }
    public function postadmin($id){
        {
            try{
        
               
                   
                return Posts::select('*')
               
                ->where('admin_id', $id)
                ->get();
        
                    
            }catch(exception $e){
                return false;
            }
    }
}
}
