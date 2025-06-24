import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { type Document, type DocumentFile } from '@/types';

export default function DocumentShow() {
  const { document } = usePage().props as {
    document: Document & { files: DocumentFile[] };
  };

  const formatDate = (date: string | null) => {
    return date ? new Date(date).toLocaleDateString('vi-VN') : '-';
  };

  const getDownloadUrl = (fileId: number) => route('document_files.download', fileId);

  return (
    <AppLayout title={`Chi tiết: ${document.title}`}>
      <Head title={`Tài liệu: ${document.title}`} />

      <div className="p-6 max-w-5xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">Chi tiết Tài liệu</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><strong>Tên tài liệu:</strong> {document.title}</div>
          <div><strong>Công ty:</strong> {document.company || '-'}</div>
          <div><strong>Nhà máy:</strong> {document.factory || '-'}</div>
          <div><strong>Lĩnh vực:</strong> {document.category || '-'}</div>
          <div><strong>Cơ quan cấp:</strong> {document.issued_by || '-'}</div>
          <div><strong>Ngày cấp:</strong> {formatDate(document.issued_date)}</div>
          <div><strong>Ngày hết hiệu lực:</strong> {formatDate(document.expired_date)}</div>
          <div className="md:col-span-2"><strong>Ghi chú:</strong> {document.note || '-'}</div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mt-6 mb-2">Danh sách file</h2>
          {document.files.length === 0 ? (
            <p>Không có tệp đính kèm.</p>
          ) : (
            <ScrollArea className="max-h-64 border rounded">
              <ul className="divide-y">
                {document.files.map((file) => {
                  const ext = file.file_name?.split('.').pop()?.toLowerCase() || '---';
                  return (
                    <li key={file.id} className="flex justify-between items-center px-4 py-2">
                      <span className="truncate">{file.file_name}</span>
                      <span className="text-xs text-gray-500 mr-4 uppercase">{ext}</span>
                      <Button size="sm" variant="outline" onClick={() => window.open(getDownloadUrl(file.id), '_blank')}>
                        Tải xuống
                      </Button>
                    </li>
                  );
                })}
              </ul>
            </ScrollArea>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
