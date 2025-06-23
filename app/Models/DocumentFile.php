<?php

// app/Models/DocumentFile.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DocumentFile extends Model
{
    protected $fillable = ['document_id', 'file_path', 'file_name'];

    public function document(): BelongsTo
    {
        return $this->belongsTo(Document::class);
    }
}


