import React, { useState } from 'react';
import { Head, usePage, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Toaster, toast } from 'sonner';
import { type BreadcrumbItem, type Document, type DocumentFile } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Tài liệu', href: '/documents' },
  { title: 'Chi tiết', href: '' },
];

export default function DocumentShow() {
  const { document } = usePage().props as {
    document: Document & { files: DocumentFile[] };
  };

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const formatDate = (date: string | null) =>
    date ? new Date(date).toLocaleDateString('vi-VN') : '-';

  const getDownloadUrl = (fileId: number) => route('document_files.download', fileId);
  const getPreviewUrl = (fileId: number) => route('document_files.preview', fileId);

  const fileBadgeColor = (ext: string) => {
    switch (ext.toLowerCase()) {
      case 'pdf': return 'bg-red-500 text-white';
      case 'doc':
      case 'docx': return 'bg-blue-500 text-white';
      case 'xls':
      case 'xlsx': return 'bg-green-600 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const handlePreview = (file: DocumentFile) => {
    const ext = file.file_name?.split('.').pop()?.toLowerCase();
    const fileUrl = getPreviewUrl(file.id);

    if (ext === 'pdf') {
      setPreviewUrl(fileUrl);
      setOpen(true);
    } else {
      toast.success('Đang mở bằng Google Docs...', { duration: 3000 });
      window.open(
        `https://docs.google.com/viewer?url=${encodeURIComponent(fileUrl)}&embedded=true`,
        '_blank'
      );
    }
  };

  const handleDownload = (file: DocumentFile) => {
    const downloadUrl = getDownloadUrl(file.id);
    toast.loading('Đang tải xuống...', { id: `download-${file.id}` });

    const newTab = window.open(downloadUrl, '_blank');
    if (newTab) {
      setTimeout(() => {
        toast.success('Tải xuống thành công', {
          id: `download-${file.id}`,
          duration: 3000,
        });
      }, 800);
    } else {
      toast.error('Trình duyệt đã chặn tải xuống', {
        id: `download-${file.id}`,
        duration: 3000,
      });
    }
  };

  return (
    <>
      <Head title={`Chi tiết: ${document.title}`} />
      <Toaster position="top-right" richColors />

      <div className="w-full px-4 md:px-8 py-6">
        <div className="max-w-screen-lg mx-auto space-y-6 bg-white shadow rounded-xl p-6 border border-gray-200">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Chi tiết Tài liệu</h1>
            <Button variant="outline" onClick={() => router.visit('/documents')}>Quay lại</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
            <div><strong>Tên tài liệu:</strong> {document.title}</div>
            <div><strong>Công ty:</strong> {document.company || '-'}</div>
            <div><strong>Nhà máy:</strong> {document.factory || '-'}</div>
            <div><strong>Lĩnh vực:</strong> {document.category || '-'}</div>
            <div><strong>Cơ quan cấp:</strong> {document.issued_by || '-'}</div>
            <div><strong>Ngày cấp:</strong> {formatDate(document.issued_date)}</div>
            <div><strong>Ngày hết hiệu lực:</strong> {formatDate(document.expired_date)}</div>
            <div className="md:col-span-2"><strong>Ghi chú:</strong> {document.note || '-'}</div>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-semibold">Danh sách tệp ({document.files.length})</h2>

            {document.files.length === 0 ? (
              <p className="text-gray-500 italic text-sm">Không có tệp đính kèm.</p>
            ) : (
              <ScrollArea className="max-h-72 border rounded-md">
                <ul className="divide-y">
                  {document.files.map((file) => {
                    const ext = file.file_name?.split('.').pop()?.toLowerCase() || 'file';
                    return (
                      <li key={file.id} className="flex justify-between items-center px-4 py-3 text-sm hover:bg-gray-50 transition">
                        <div className="flex items-center gap-3">
                          <Badge className={fileBadgeColor(ext)}>{ext}</Badge>
                          <span className="truncate max-w-[300px]">{file.file_name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline" onClick={() => handlePreview(file)}>Xem</Button>
                          <Button size="sm" variant="secondary" onClick={() => handleDownload(file)}>Tải</Button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </ScrollArea>
            )}
          </div>
        </div>
      </div>

      {/* Modal xem PDF */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-full max-w-5xl h-[90vh] p-0 overflow-hidden">
          {previewUrl && (
            <iframe src={previewUrl} className="w-full h-full" title="PDF Preview" />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

DocumentShow.layout = (page: React.ReactNode) => (
  <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>
);
