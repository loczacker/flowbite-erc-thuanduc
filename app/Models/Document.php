<?php

// app/Models/Document.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Document extends Model
{
    protected $fillable = [
        'title',
        'company',
        'factory',
        'category',
        'issued_by',
        'issued_date',
        'expired_date',
        'note',
    ];

    public function files(): HasMany
    {
        return $this->hasMany(DocumentFile::class);
    }
}

