// File: resources/js/Pages/Documents/Create.tsx

import { Head, useForm, usePage, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { type BreadcrumbItem } from '@/types';
import React from 'react';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Tài liệu', href: '/documents' },
  { title: 'Thêm mới', href: '/documents/create' },
];

type DocumentItem = {
  id: number;
  title: string;
  file_path: string;
};

export default function DocumentCreate() {
  const { data, setData, post, processing, errors, reset } = useForm({
    title: '',
    company: '',
    factory: '',
    category: '',
    issued_by: '',
    issued_date: '',
    expired_date: '',
    file: null,
    notes: '',
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value || '');
    });
    post('/documents', {
      data: formData,
      forceFormData: true,
      onSuccess: () => reset(),
    });
  };

  const { props } = usePage<{
    message?: string;
    documents?: DocumentItem[];
  }>();

  const message = props.message;
  const documents = props.documents ?? [];

  const handleDelete = (id: number) => {
    if (confirm('Bạn có chắc chắn muốn xoá?')) {
      router.delete(`/documents/${id}`);
    }
  };

  return (
    <>
      <Head title="Thêm mới Tài liệu" />
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Thêm mới Tài liệu</h1>

        <form onSubmit={submit} className="space-y-6 max-w-5xl">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label htmlFor="title">Tên tài liệu</Label>
              <Input id="title" value={data.title} onChange={(e) => setData('title', e.target.value)} />
              {errors.title && <p className="text-red-600 text-sm">{errors.title}</p>}
            </div>
            <div>
              <Label htmlFor="company">Công ty</Label>
              <Input id="company" value={data.company} onChange={(e) => setData('company', e.target.value)} />
              {errors.company && <p className="text-red-600 text-sm">{errors.company}</p>}
            </div>
            <div>
              <Label htmlFor="factory">Nhà máy</Label>
              <Input id="factory" value={data.factory} onChange={(e) => setData('factory', e.target.value)} />
              {errors.factory && <p className="text-red-600 text-sm">{errors.factory}</p>}
            </div>
            <div>
              <Label htmlFor="category">Lĩnh vực</Label>
              <Input id="category" value={data.category} onChange={(e) => setData('category', e.target.value)} />
              {errors.category && <p className="text-red-600 text-sm">{errors.category}</p>}
            </div>
            <div>
              <Label htmlFor="issued_by">Cơ quan cấp</Label>
              <Input id="issued_by" value={data.issued_by} onChange={(e) => setData('issued_by', e.target.value)} />
              {errors.issued_by && <p className="text-red-600 text-sm">{errors.issued_by}</p>}
            </div>
            <div>
              <Label htmlFor="issued_date">Ngày cấp</Label>
              <Input type="date" id="issued_date" value={data.issued_date} onChange={(e) => setData('issued_date', e.target.value)} />
              {errors.issued_date && <p className="text-red-600 text-sm">{errors.issued_date}</p>}
            </div>
            <div>
              <Label htmlFor="expired_date">Ngày hết hiệu lực</Label>
              <Input type="date" id="expired_date" value={data.expired_date} onChange={(e) => setData('expired_date', e.target.value)} />
              {errors.expired_date && <p className="text-red-600 text-sm">{errors.expired_date}</p>}
            </div>
            <div>
              <Label htmlFor="file">Tệp tài liệu</Label>
              <Input type="file" id="file" accept=".pdf,.doc,.docx,.xls,.xlsx" onChange={(e) => setData('file', e.target.files?.[0] || null)} />
              {errors.file && <p className="text-red-600 text-sm">{errors.file}</p>}
            </div>
            <div className="col-span-2">
              <Label htmlFor="notes">Ghi chú</Label>
              <textarea id="notes" className="w-full border rounded px-3 py-2" rows={3} value={data.notes} onChange={(e) => setData('notes', e.target.value)} />
              {errors.notes && <p className="text-red-600 text-sm">{errors.notes}</p>}
            </div>
          </div>

          <div className="text-center pt-4">
            <Button type="submit" disabled={processing}>Lưu Tài liệu</Button>
          </div>
        </form>

        {message && (
          <div className="p-4 bg-green-100 border border-green-300 text-green-800 rounded mt-4">
            {message}
          </div>
        )}

        {documents.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4">Danh sách Tài liệu</h2>
            <table className="w-full table-auto border-collapse border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2">#</th>
                  <th className="border p-2 text-left">Tên</th>
                  <th className="border p-2 text-left">Tệp</th>
                  <th className="border p-2">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc, index) => (
                  <tr key={doc.id} className="border-t">
                    <td className="border p-2 text-center">{index + 1}</td>
                    <td className="border p-2">{doc.title}</td>
                    <td className="border p-2 break-all text-blue-700 underline">
                      <a href={`/documents/${doc.id}/download`} target="_blank" rel="noopener noreferrer">
                        Xem tệp
                      </a>
                    </td>
                    <td className="border p-2 text-center">
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(doc.id)}>Xoá</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

DocumentCreate.layout = (page: React.ReactNode) => <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>;