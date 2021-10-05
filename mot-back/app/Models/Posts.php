<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Posts extends Model
{
    use HasFactory;
    Protected $fillable = [
        'description',  'image', 'numberLikes', 'admin_id'
    ];
}
