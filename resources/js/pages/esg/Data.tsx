import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dữ liệu ESG',
    href: '/esg/data',
  },
];

export default function DataPage() {
  return (
    <>
      <Head title="Dữ liệu ESG" />
      <div className="p-6 space-y-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Dữ liệu ESG
        </h1>

        <div className="bg-white dark:bg-gray-900 shadow rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <p className="text-gray-700 dark:text-gray-300">
            Trang nhập và hiển thị dữ liệu ESG thực tế.
          </p>
        </div>
      </div>
    </>
  );
}

DataPage.layout = (page: React.ReactNode) => (
  <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>
);
