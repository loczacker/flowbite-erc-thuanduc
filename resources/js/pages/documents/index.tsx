// File: resources/js/Pages/Documents/index.tsx

import React, { useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { type Document } from '@/types';

export default function DocumentIndex() {
  const { documents = [] } = usePage().props as { documents: Document[] };
  const [selected, setSelected] = useState<Document | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleView = (doc: Document) => {
    const extension = doc.file_path.split('.').pop()?.toLowerCase() || '';
    const previewable = ['pdf', 'png', 'jpg', 'jpeg', 'gif'];

    if (previewable.includes(extension)) {
      setPreviewUrl(`/storage/${doc.file_path}`);
    } else {
      window.open(`/documents/${doc.id}/download`, '_blank');
    }

    setSelected(doc);
  };

  const handleDelete = (id: number) => {
    if (confirm('Bạn có chắc chắn muốn xoá tài liệu này?')) {
      router.delete(`/documents/${id}`);
    }
  };

  return (
    <AppLayout title="Danh sách tài liệu">
      <Head title="Tài liệu" />

      <div className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">📚 Danh sách Tài liệu</h1>
          <Link href="/documents/create">
            <Button>➕ Thêm tài liệu</Button>
          </Link>
        </div>

        <table className="w-full table-auto border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">#</th>
              <th className="border p-2 text-left">Tên</th>
              <th className="border p-2 text-left">Công ty</th>
              <th className="border p-2 text-left">Loại file</th>
              <th className="border p-2 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc, index) => {
              const ext = doc.file_path.split('.').pop();
              return (
                <tr key={doc.id} className="border-t">
                  <td className="border p-2 text-center">{index + 1}</td>
                  <td className="border p-2">{doc.title}</td>
                  <td className="border p-2">{doc.company || '-'}</td>
                  <td className="border p-2">{ext}</td>
                  <td className="border p-2 text-center space-x-2">
                    <Button size="sm" variant="outline" onClick={() => handleView(doc)}>👁️ Xem</Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(doc.id)}>Xoá</Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Xem chi tiết */}
        <Dialog open={!!selected} onOpenChange={() => {
          setSelected(null);
          setPreviewUrl(null);
        }}>
          {selected && (
            <DialogContent className="max-w-4xl w-full h-[85vh] overflow-auto p-4">
              <DialogHeader>
                <DialogTitle>Thông tin chi tiết tài liệu</DialogTitle>
              </DialogHeader>

              <div className="space-y-2 text-sm">
                <p><strong>Tên:</strong> {selected.title}</p>
                <p><strong>Công ty:</strong> {selected.company || '-'}</p>
                <p><strong>Nhà máy:</strong> {selected.factory || '-'}</p>
                <p><strong>Lĩnh vực:</strong> {selected.category || '-'}</p>
                <p><strong>Cơ quan cấp:</strong> {selected.issued_by || '-'}</p>
                <p><strong>Ngày cấp:</strong> {selected.issued_date || '-'}</p>
                <p><strong>Ngày hết hiệu lực:</strong> {selected.expired_date || '-'}</p>
                <p><strong>Ghi chú:</strong> {selected.note || '-'}</p>
                <p><strong>Định dạng file:</strong> {selected.file_path.split('.').pop()}</p>
              </div>

              {previewUrl && (
                <div className="mt-4">
                  <iframe
                    src={previewUrl}
                    className="w-full h-[500px] border rounded"
                    title="File Preview"
                  ></iframe>
                </div>
              )}
            </DialogContent>
          )}
        </Dialog>
      </div>
    </AppLayout>
  );
}
