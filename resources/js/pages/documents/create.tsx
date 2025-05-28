import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Tài liệu', href: '/documents' },
  { title: 'Thêm mới', href: '/documents/create' },
];

export default function DocumentCreate() {
  return (
    <>
      <Head title="Thêm mới Tài liệu" />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Thêm mới Tài liệu</h1>
        <p>Form thêm mới tài liệu sẽ được đặt ở đây.</p>
      </div>
    </>
  );
}

DocumentCreate.layout = (page: React.ReactNode) => (
  <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>
);
