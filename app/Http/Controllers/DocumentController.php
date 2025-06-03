<?php

namespace App\Http\Controllers;

use App\Models\Document;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;


class DocumentController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('documents/index');
    }

    public function create(): Response
    {
        $documents = Document::latest()->get();

        return Inertia::render('documents/create', [
            'documents' => $documents,
        ]);
    }

    public function store(Request $request): \Illuminate\Http\RedirectResponse
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'file' => 'required|file|max:10240', // max 10MB
        ]);

        $path = $request->file('file')->store('documents', 'public');

        $document = Document::create([
            'title' => $request->title,
            'file_path' => $path,
        ]);

        return redirect()->route('documents.create')->with([
            'fileUrl' => Storage::url($path),
            'message' => 'Tài liệu đã được tải lên thành công!',
        ]);
    }
}
