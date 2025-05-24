import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Tập đoàn',
    href: '/organization/corporations',
  },
];

export default function CorporationsPage() {
  return (
    <>
      <Head title="Quản lý Tập đoàn" />
      <div className="p-6">
        <h1 className="text-xl font-semibold mb-4">Quản lý Tập đoàn</h1>
        <p>Trang hiển thị danh sách tập đoàn.</p>
      </div>
    </>
  );
}

CorporationsPage.layout = (page: React.ReactNode) => (
  <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>
);
