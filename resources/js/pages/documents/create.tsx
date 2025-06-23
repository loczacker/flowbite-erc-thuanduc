import React from 'react';
import { Head, useForm, usePage, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { type BreadcrumbItem } from '@/types';
import { toast, Toaster } from 'sonner'; // ✅ THÊM

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Tài liệu', href: '/documents' },
  { title: 'Thêm mới', href: '/documents/create' },
];

export default function DocumentCreate() {
  const { data, setData, post, processing, errors, reset } = useForm({
    title: '',
    company: '',
    factory: '',
    category: '',
    issued_by: '',
    issued_date: '',
    expired_date: '',
    note: '',
    files: [] as File[],
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'files' && Array.isArray(value)) {
        value.forEach((file, index) => formData.append(`files[${index}]`, file));
      } else {
        formData.append(key, value || '');
      }
    });
    post('/documents', {
      data: formData,
      forceFormData: true,
      onSuccess: () => {
        toast.success('Tài liệu đã được lưu thành công!'); // ✅ TOAST
        reset();
      },
    });
  };

  return (
    <>
      <Head title="Thêm mới Tài liệu" />
      <Toaster position="top-right" richColors /> {/* ✅ TOASTER */}

      <div className="px-10 py-6 space-y-6 max-w-[1600px] mx-auto w-full">
        <h1 className="text-2xl font-bold">Thêm mới Tài liệu</h1>

        <form onSubmit={submit} className="space-y-6 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <div className="col-span-1 md:col-span-2">
              <Label htmlFor="files">Tệp tài liệu (chọn nhiều)</Label>
              <Input multiple type="file" id="files" accept=".pdf,.doc,.docx,.xls,.xlsx" onChange={(e) => setData('files', Array.from(e.target.files || []))} />
              {errors.files && <p className="text-red-600 text-sm">{errors.files}</p>}
            </div>
            <div className="col-span-1 md:col-span-2">
              <Label htmlFor="note">Ghi chú</Label>
              <Textarea id="note" value={data.note} onChange={(e) => setData('note', e.target.value)} rows={3} />
              {errors.note && <p className="text-red-600 text-sm">{errors.note}</p>}
            </div>
          </div>

          <div className="text-center pt-6">
            <Button type="submit" disabled={processing}>Lưu Tài liệu</Button>
          </div>
        </form>
      </div>
    </>
  );
}

DocumentCreate.layout = (page: React.ReactNode) => <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>;
