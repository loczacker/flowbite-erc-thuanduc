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

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'company' => 'nullable|string|max:255',
            'factory' => 'nullable|string|max:255',
            'category' => 'nullable|string|max:255',
            'issued_by' => 'nullable|string|max:255',
            'issued_date' => 'nullable|date',
            'expired_date' => 'nullable|date',
            'note' => 'nullable|string|max:5000',
            'file' => 'required|file|mimes:pdf,doc,docx,xls,xlsx|max:10240',
        ]);

        // Lưu file
        $path = $request->file('file')->store('documents');

        // Tạo bản ghi
        Document::create([
            'title' => $validated['title'],
            'company' => $validated['company'],
            'factory' => $validated['factory'],
            'category' => $validated['category'],
            'issued_by' => $validated['issued_by'],
            'issued_date' => $validated['issued_date'],
            'expired_date' => $validated['expired_date'],
            'note' => $validated['note'],
            'file_path' => $path,
        ]);

        return redirect()->route('documents.create')->with('message', 'Đã thêm tài liệu thành công!');
    }

    public function destroy(Document $document)
    {
        if ($document->file_path && Storage::exists($document->file_path)) {
            Storage::delete($document->file_path);
        }

        $document->delete();

        return redirect()->route('documents.create')->with('message', 'Đã xoá tài liệu.');
    }
}
