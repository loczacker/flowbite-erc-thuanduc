import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Nhân sự',
    href: '/organization/employees',
  },
];

type Employee = {
  id: number;
  full_name: string;
  email: string;
  phone?: string | null;
  nationality?: string | null;
  employee_code: string;
  join_date?: string | null;
  status: 'Active' | 'Inactive';
  created_at: string;
  updated_at: string;
};

// Dữ liệu mẫu demo
const mockEmployees: Employee[] = [
  {
    id: 1,
    full_name: 'Nguyễn Văn A',
    email: 'a.nguyen@esgcorp.com',
    phone: '0912345678',
    nationality: 'Việt Nam',
    employee_code: 'EMP001',
    join_date: '2023-01-15',
    status: 'Active',
    created_at: '2023-01-10',
    updated_at: '2024-05-20',
  },
  {
    id: 2,
    full_name: 'Trần Thị B',
    email: 'b.tran@esgcorp.com',
    phone: null,
    nationality: 'Việt Nam',
    employee_code: 'EMP002',
    join_date: '2022-11-01',
    status: 'Inactive',
    created_at: '2022-10-20',
    updated_at: '2024-04-18',
  },
  {
    id: 3,
    full_name: 'Lê Quốc Cường',
    email: 'cuong.le@esgcorp.com',
    phone: '0987654321',
    nationality: 'Singapore',
    employee_code: 'EMP003',
    join_date: '2024-02-28',
    status: 'Active',
    created_at: '2024-02-15',
    updated_at: '2024-05-01',
  },
];

export default function EmployeesPage() {
  return (
    <>
      <Head title="Quản lý Nhân sự" />
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Danh sách Nhân sự
        </h1>

        <div className="bg-white dark:bg-gray-900 shadow rounded-xl p-4 border border-gray-200 dark:border-gray-700 overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã NV</TableHead>
                <TableHead>Họ tên</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Điện thoại</TableHead>
                <TableHead>Quốc tịch</TableHead>
                <TableHead>Ngày vào làm</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockEmployees.length > 0 ? (
                mockEmployees.map((emp) => (
                  <TableRow key={emp.id}>
                    <TableCell className="font-medium">{emp.employee_code}</TableCell>
                    <TableCell>{emp.full_name}</TableCell>
                    <TableCell>{emp.email}</TableCell>
                    <TableCell>{emp.phone ?? '-'}</TableCell>
                    <TableCell>{emp.nationality ?? '-'}</TableCell>
                    <TableCell>
                      {emp.join_date ? new Date(emp.join_date).toLocaleDateString() : '-'}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={emp.status === 'Active' ? 'success' : 'destructive'}
                      >
                        {emp.status === 'Active' ? 'Đang làm' : 'Ngừng làm'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Chi tiết
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-gray-500">
                    Không có dữ liệu nhân sự.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}

EmployeesPage.layout = (page: React.ReactNode) => (
  <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>
);
