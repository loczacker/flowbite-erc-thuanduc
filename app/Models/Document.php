<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    protected $fillable = [
    'title', 'company', 'factory', 'category',
    'issued_by', 'issued_date', 'expired_date',
    'note', 'file_path',
];

}
