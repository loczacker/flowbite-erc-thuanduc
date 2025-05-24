import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Danh sách Nhân viên',
    href: '/hr/employees',
  },
];

export default function EmployeesPage() {
  return (
    <>
      <Head title="Danh sách Nhân viên" />
      <div className="p-6 space-y-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Danh sách Nhân viên
        </h1>

        <div className="bg-white dark:bg-gray-900 shadow rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <p className="text-gray-700 dark:text-gray-300">
            Trang hiển thị danh sách nhân sự.
          </p>
        </div>
      </div>
    </>
  );
}

EmployeesPage.layout = (page: React.ReactNode) => (
  <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>
);
