<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Models\Notifications;

class NotificationsController extends Controller
{
    public function index()
    {
        try {
            return Notifications::all();
        } catch (Exception $e) {
            return false;
        }
    }
    public function getById($id)
    {

        try {
            return Notifications::findOrFail($id);
        } catch (Exception $e) {
            return false;
        }
    }
    public function store(Request $request)
    {
        try {
            $notification = new Notifications();
            $notification->fill($request->all());
            $notification->save();
            return $notification;
        } catch (Exception $e) {
            return false;
        }
    }
    public function notadmin($id)
    {
    try{

       
           
        return Notifications::select('*')
       
        ->where('admin_id', $id)
        ->get();

            
    }catch(exception $e){
        return false;
    }
}
    public function edit(Request $request, $id)
    {
        try {
            $notifications = tap(Notifications::where('id', $id));
            $updated = $notifications->update($request->all())->first();
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
            Notifications::where('id', $id)->delete();
        } catch (Exception $e) {
            return false;
        }
    }
}
