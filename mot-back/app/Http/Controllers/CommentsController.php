<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use \App\Models\Comments;


class CommentsController extends Controller
{
    public function store(Request $request)
    {
        try {
            $comment = new Comments();
            $comment->fill($request->all());
            $comment->save();
            return $comment;
        } catch (Exception $e) {
            return false;
        }
    }
    public function edit(Request $request, $id)
    {
        try {
            $comment = tap(Comments::where('id', $id));
            $updated = $comment->update($request->all())->first();
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
            Comments::where('id', $id)->delete();
        } catch (Exception $e) {
            return false;
        }
    }
    public function index()
    {
        try {
            return Comments::all();
        } catch (Exception $e) {
            return false;
        }
    }
    public function getById($id)
    {

        try {
            return Comments::findOrFail($id);
        } catch (Exception $e) {
            return false;
        }
    }
}
