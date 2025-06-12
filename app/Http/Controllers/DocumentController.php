<?php

namespace App\Http\Controllers;

use App\Models\Document;
use Illuminate\Http\Request;
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

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'file_path' => 'required|string|max:2048', // Đường dẫn nội bộ
        ]);

        Document::create([
            'title' => $request->title,
            'file_path' => $request->file_path,
        ]);

        return redirect()->route('documents.create')->with('message', 'Đã thêm tài liệu thành công!');
    }

    public function destroy(Document $document)
    {
        $document->delete();
        return redirect()->route('documents.create')->with('message', 'Đã xoá tài liệu.');
    }
}
