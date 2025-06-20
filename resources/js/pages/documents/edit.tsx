// File: resources/js/Pages/Documents/Edit.tsx

import { Head, useForm, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import React from 'react';

export default function DocumentEdit({ document }: { document: any }) {
  const { data, setData, post, processing, errors } = useForm({
    title: document.title || '',
    company: document.company || '',
    factory: document.factory || '',
    category: document.category || '',
    issued_by: document.issued_by || '',
    issued_date: document.issued_date || '',
    expired_date: document.expired_date || '',
    note: document.note || '',
    file: null,
    _method: 'put',
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value || '');
    });
    router.post(`/documents/${document.id}`, formData);
  };

  return (
    <>
      <Head title="Chỉnh sửa Tài liệu" />
      <div className="p-6 space-y-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold">Chỉnh sửa Tài liệu</h1>

        <form onSubmit={submit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
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
              <Label htmlFor="file">Tệp mới (nếu muốn thay)</Label>
              <Input type="file" id="file" accept=".pdf,.doc,.docx,.xls,.xlsx" onChange={(e) => setData('file', e.target.files?.[0] || null)} />
              {errors.file && <p className="text-red-600 text-sm">{errors.file}</p>}
            </div>
          </div>

          <div>
            <Label htmlFor="note">Ghi chú</Label>
            <Textarea id="note" value={data.note} onChange={(e) => setData('note', e.target.value)} />
            {errors.note && <p className="text-red-600 text-sm">{errors.note}</p>}
          </div>

          <div className="text-center">
            <Button type="submit" disabled={processing}>Cập nhật</Button>
          </div>
        </form>
      </div>
    </>
  );
}

DocumentEdit.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;
