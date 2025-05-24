import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Nhà máy',
    href: '/organization/factories',
  },
];

export default function FactoriesPage() {
  return (
    <>
      <Head title="Quản lý Nhà máy" />
      <div className="p-6 space-y-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Quản lý Nhà máy
        </h1>

        <div className="bg-white dark:bg-gray-900 shadow rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <p className="text-gray-700 dark:text-gray-300">
            Trang hiển thị danh sách nhà máy.
          </p>
        </div>
      </div>
    </>
  );
}

FactoriesPage.layout = (page: React.ReactNode) => (
  <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>
);
