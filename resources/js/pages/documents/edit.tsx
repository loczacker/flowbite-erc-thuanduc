import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Tài liệu', href: '/documents' },
  { title: 'Chỉnh sửa', href: '/documents/edit' },
];

export default function DocumentEdit() {
  return (
    <>
      <Head title="Chỉnh sửa Tài liệu" />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Chỉnh sửa Tài liệu</h1>
        <p>Form chỉnh sửa sẽ hiển thị tại đây.</p>
      </div>
    </>
  );
}

DocumentEdit.layout = (page: React.ReactNode) => (
  <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>
);
