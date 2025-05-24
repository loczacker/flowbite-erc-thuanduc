import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Vị trí Nhân viên',
    href: '/hr/employee-positions',
  },
];

export default function EmployeePositionsPage() {
  return (
    <>
      <Head title="Vị trí Nhân viên" />
      <div className="p-6 space-y-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Vị trí Nhân viên
        </h1>

        <div className="bg-white dark:bg-gray-900 shadow rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <p className="text-gray-700 dark:text-gray-300">
            Trang ánh xạ nhân viên với chức vụ/phòng ban.
          </p>
        </div>
      </div>
    </>
  );
}

EmployeePositionsPage.layout = (page: React.ReactNode) => (
  <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>
);
