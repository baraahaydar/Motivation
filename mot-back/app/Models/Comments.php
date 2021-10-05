<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comments extends Model
{
    use HasFactory;
    Protected $fillable = [
        'date',  'text',  'admin_id',  'post_id'
    ];
}
