<?php

namespace App\Http\Controllers;

use App\Models\Document;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\DB;
use App\Models\DocumentFile;

class DocumentController extends Controller
{
    public function index(): Response
{
    return Inertia::render('documents/index', [
        'documents' => Document::withCount('files')->latest()->get(),
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

    // 🔧 Tạo 1 document trước
    $document = Document::create([
        'title' => $validated['title'],
        'company' => $validated['company'],
        'factory' => $validated['factory'],
        'category' => $validated['category'],
        'issued_by' => $validated['issued_by'],
        'issued_date' => $validated['issued_date'],
        'expired_date' => $validated['expired_date'],
        'note' => $validated['note'],
    ]);

    // 🔁 Lưu tất cả các file gắn với document đó
    foreach ($request->file('files', []) as $file) {
        $path = $file->store('documents', 'public');
        $document->files()->create([
            'file_path' => $path,
            'file_name' => $file->getClientOriginalName(),
        ]);
    }

    return redirect()->route('documents.create')->with('message', 'Đã thêm tài liệu thành công!');
}



    public function show(Document $document): Response
{
    $document->load('files'); // ⚠️ cần có quan hệ files

    return Inertia::render('documents/show', [
        'document' => $document,
    ]);
}


    public function edit(Document $document)
{
    $document->load('files'); // ⚠️ Cần dòng này

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
        'newFiles.*' => 'nullable|file|mimes:pdf,doc,docx,xls,xlsx|max:10240',
        'deletedFileIds' => 'array',
        'deletedFileIds.*' => 'integer|exists:document_files,id',
    ]);

    try {
        DB::beginTransaction();

        // 1. Cập nhật thông tin tài liệu
        $document->update([
            'title' => $validated['title'],
            'company' => $validated['company'],
            'factory' => $validated['factory'],
            'category' => $validated['category'],
            'issued_by' => $validated['issued_by'],
            'issued_date' => $validated['issued_date'],
            'expired_date' => $validated['expired_date'],
            'note' => $validated['note'],
        ]);

        // 2. Xoá các file được đánh dấu
        if (!empty($validated['deletedFileIds'])) {
            $filesToDelete = DocumentFile::whereIn('id', $validated['deletedFileIds'])->get();
            foreach ($filesToDelete as $file) {
                if ($file->document_id === $document->id) {
                    Storage::disk('public')->delete($file->file_path);
                    $file->delete();
                }
            }
        }

        // 3. Thêm file mới
        if ($request->hasFile('newFiles')) {
            foreach ($request->file('newFiles') as $file) {
                $path = $file->store('documents', 'public');
                $document->files()->create([
                    'file_path' => $path,
                    'file_name' => $file->getClientOriginalName(),
                ]);
            }
        }

        DB::commit();

        return redirect()->route('documents.edit', $document)->with('message', 'Cập nhật tài liệu thành công!');
    } catch (\Exception $e) {
        DB::rollBack();
        return back()->withErrors(['error' => 'Có lỗi xảy ra: ' . $e->getMessage()]);
    }
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
