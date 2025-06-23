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
        return Inertia::render('documents/index', [
            'documents' => Document::latest()->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('documents/create', [
            'documents' => Document::latest()->get(),
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
        'files' => 'required|array',
        'files.*' => 'file|mimes:pdf,doc,docx,xls,xlsx|max:10240',
    ]);

    foreach ($request->file('files') as $file) {
        $path = $file->store('documents', 'public');

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
    }

    return redirect()->route('documents.create')->with('message', 'Đã thêm các tài liệu thành công!');
}


    public function show(Document $document): Response
    {
        return Inertia::render('documents/show', [
            'document' => $document,
        ]);
    }

    public function edit(Document $document): Response
    {
        return Inertia::render('documents/edit', [
            'document' => $document,
        ]);
    }

    public function update(Request $request, Document $document)
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
            'file' => 'nullable|file|mimes:pdf,doc,docx,xls,xlsx|max:10240',
        ]);

        // Nếu có file mới
        if ($request->hasFile('file')) {
            if ($document->file_path && Storage::disk('public')->exists($document->file_path)) {
                Storage::disk('public')->delete($document->file_path);
            }

            $validated['file_path'] = $request->file('file')->store('documents', 'public');
        }

        $document->update($validated);

        return redirect()->route('documents.create')->with('message', 'Đã cập nhật tài liệu.');
    }

    public function destroy(Document $document)
    {
        if ($document->file_path && Storage::disk('public')->exists($document->file_path)) {
            Storage::disk('public')->delete($document->file_path);
        }

        $document->delete();

        return redirect()->route('documents.create')->with('message', 'Đã xoá tài liệu.');
    }

    public function download(Document $document)
    {
        if (!$document->file_path || !Storage::disk('public')->exists($document->file_path)) {
            abort(404, 'Không tìm thấy file');
        }

        $filename = $document->title . '.' . pathinfo($document->file_path, PATHINFO_EXTENSION);

        return Storage::disk('public')->download($document->file_path, $filename);
    }

    public function view(Document $document)
    {
        $ext = strtolower(pathinfo($document->file_path, PATHINFO_EXTENSION));
        $url = Storage::disk('public')->url($document->file_path);
        $absoluteUrl = asset($url);

        if (in_array($ext, ['doc', 'docx', 'xls', 'xlsx'])) {
            $viewerUrl = 'https://view.officeapps.live.com/op/view.aspx?src=' . urlencode($absoluteUrl);
            return redirect()->away($viewerUrl);
        } elseif ($ext === 'pdf') {
            return redirect()->away($absoluteUrl);
        }

        return redirect()->route('documents.download', $document);
    }

}
