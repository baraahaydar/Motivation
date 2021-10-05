<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Models\Admins;
class AdminsController extends Controller
{
    public function index()
    {
        try {
            return Admins::all();
        } catch (Exception $e) {
            return false;
        }
    }
    public function getById($id)
    {

        try {
            return Admins::findOrFail($id);
        } catch (Exception $e) {
            return false;
        }
    }
    public function getByToken(Request $request)
    {
    try{
              
        $token= $request->token;
       

$arr= Admins::where('token', $token)
                 ->get();
                 if(count($arr)>=1){
                    return [
                        'success' => true,
                        'data' => $arr,
                    ];
                }else{
                    return [
                        'success' => false
                   ];
                }
        }catch(exception $e){
            return false;
        }
    }
    public function store(Request $request)
    {
        try {
            $admin = new Admins();
            $admin->fill($request->all());
            $admin->save();
            return $admin;
        } catch (Exception $e) {
            return false;
        }
    }
    public function edit(Request $request, $id)
    {
        try {
            $admin = tap(Admins::where('id', $id));
            $updated = $admin->update($request->all());
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
            Admins::where('id', $id)->delete();
        } catch (Exception $e) {
            return false;
        }
    }
}
