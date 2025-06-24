import React, { useState, useEffect } from 'react';
import { Head, useForm, usePage, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { type BreadcrumbItem, type Document, type DocumentFile } from '@/types';
import { Toaster, toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Tài liệu', href: '/documents' },
  { title: 'Chỉnh sửa', href: '' },
];

export default function DocumentEdit() {
  const { document } = usePage().props as {
    document: Document & { files: DocumentFile[] }
  };

  const { data, setData, post, processing, errors, reset } = useForm({
    _method: 'put',
    title: document.title || '',
    company: document.company || '',
    factory: document.factory || '',
    category: document.category || '',
    issued_by: document.issued_by || '',
    issued_date: document.issued_date || '',
    expired_date: document.expired_date || '',
    note: document.note || '',
    newFiles: [] as File[],
    deletedFileIds: [] as number[],
  });

  const handleDeleteFile = (fileId: number) => {
    setData('deletedFileIds', [...data.deletedFileIds, fileId]);
    toast.info('Tệp sẽ bị xoá sau khi lưu.');
  };

  const previewFile = (file: DocumentFile) => {
    const ext = file.file_name?.split('.').pop()?.toLowerCase();
    const fileUrl = route('document_files.download', file.id);

    if (ext === 'pdf') {
      window.open(fileUrl, '_blank');
    } else {
      toast.warning('Chỉ hỗ trợ xem trước file PDF!');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === 'newFiles') {
        value.forEach((file, i) => formData.append(`newFiles[${i}]`, file));
      } else if (key === 'deletedFileIds') {
        value.forEach((id, i) => formData.append(`deletedFileIds[${i}]`, id.toString()));
      } else {
        formData.append(key, value || '');
      }
    });

    post(route('documents.update', document.id), {
      data: formData,
      forceFormData: true,
      onSuccess: () => toast.success('Cập nhật tài liệu thành công!'),
      onError: () => toast.error('Có lỗi xảy ra khi cập nhật.'),
    });
  };

  return (
    <AppLayout title={`Chỉnh sửa: ${document.title}`} breadcrumbs={breadcrumbs}>
      <Head title={`Chỉnh sửa Tài liệu`} />
      <Toaster position="top-right" richColors />

      <div className="px-10 py-6 space-y-6 max-w-[1600px] mx-auto w-full">
        <h1 className="text-2xl font-bold">Chỉnh sửa Tài liệu</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="title">Tên tài liệu</Label>
              <Input id="title" value={data.title} onChange={(e) => setData('title', e.target.value)} />
              {errors.title && <p className="text-red-600 text-sm">{errors.title}</p>}
            </div>
            <div>
              <Label htmlFor="company">Công ty</Label>
              <Input id="company" value={data.company} onChange={(e) => setData('company', e.target.value)} />
            </div>
            <div>
              <Label htmlFor="factory">Nhà máy</Label>
              <Input id="factory" value={data.factory} onChange={(e) => setData('factory', e.target.value)} />
            </div>
            <div>
              <Label htmlFor="category">Lĩnh vực</Label>
              <Input id="category" value={data.category} onChange={(e) => setData('category', e.target.value)} />
            </div>
            <div>
              <Label htmlFor="issued_by">Cơ quan cấp</Label>
              <Input id="issued_by" value={data.issued_by} onChange={(e) => setData('issued_by', e.target.value)} />
            </div>
            <div>
              <Label htmlFor="issued_date">Ngày cấp</Label>
              <Input type="date" id="issued_date" value={data.issued_date} onChange={(e) => setData('issued_date', e.target.value)} />
            </div>
            <div>
              <Label htmlFor="expired_date">Ngày hết hiệu lực</Label>
              <Input type="date" id="expired_date" value={data.expired_date} onChange={(e) => setData('expired_date', e.target.value)} />
            </div>
            <div className="col-span-1 md:col-span-2">
              <Label htmlFor="note">Ghi chú</Label>
              <Textarea id="note" value={data.note} onChange={(e) => setData('note', e.target.value)} rows={3} />
            </div>
          </div>

          <div>
            <Label className="block mb-2">Tài liệu hiện tại</Label>
            {document.files.map((file) =>
              !data.deletedFileIds.includes(file.id) && (
                <div key={file.id} className="flex justify-between items-center bg-gray-100 p-2 rounded mb-2">
                  <span>{file.file_name}</span>
                  <div className="space-x-2">
                    <Button size="sm" variant="outline" type="button" onClick={() => previewFile(file)}>Xem</Button>
                    <Button size="sm" variant="secondary" type="button" onClick={() => window.open(route('document_files.download', file.id), '_blank')}>Tải</Button>
                    <Button size="sm" variant="destructive" type="button" onClick={() => handleDeleteFile(file.id)}>Xoá</Button>
                  </div>
                </div>
              )
            )}
          </div>

          <div>
            <Label htmlFor="newFiles">Thêm tệp mới</Label>
            <div
              className="p-4 border-2 border-dashed rounded bg-white"
              onDrop={(e) => {
                e.preventDefault();
                const droppedFiles = Array.from(e.dataTransfer.files);
                setData('newFiles', [...data.newFiles, ...droppedFiles]);
                toast.success(`Đã thêm ${droppedFiles.length} tệp`);
              }}
              onDragOver={(e) => e.preventDefault()}
            >
              <Input
                multiple
                type="file"
                accept=".pdf,.doc,.docx,.xls,.xlsx"
                onChange={(e) => setData('newFiles', Array.from(e.target.files || []))}
              />
              <p className="text-sm text-gray-500 mt-2">Kéo thả hoặc chọn nhiều file</p>
            </div>
          </div>

          <div className="text-center pt-6">
            <Button type="submit" disabled={processing}>Lưu thay đổi</Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
