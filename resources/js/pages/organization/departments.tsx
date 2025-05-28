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
import { Button } from '@/components/ui/button';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Phòng ban',
    href: '/organization/departments',
  },
];

type Department = {
  id: number;
  name: string;
  factory_name: string;
  parent_department_name?: string | null;
  esg_score: number;
  environmental_impact?: number | null;
  social_impact?: number | null;
  governance_score?: number | null;
  esg_category_name?: string | null;
  created_at: string;
  updated_at: string;
};

// Dữ liệu mẫu demo
const mockDepartments: Department[] = [
  {
    id: 1,
    name: 'Phòng Sản xuất',
    factory_name: 'Nhà máy Sản xuất ABC',
    parent_department_name: null,
    esg_score: 87.5,
    environmental_impact: 30.2,
    social_impact: 29.8,
    governance_score: 27.5,
    esg_category_name: 'Sản xuất xanh',
    created_at: '2023-01-10',
    updated_at: '2024-04-15',
  },
  {
    id: 2,
    name: 'Phòng Quản lý chất lượng',
    factory_name: 'Nhà máy Sản xuất ABC',
    parent_department_name: 'Phòng Sản xuất',
    esg_score: 91.3,
    environmental_impact: 31.0,
    social_impact: 30.1,
    governance_score: 30.2,
    esg_category_name: 'Chất lượng và ESG',
    created_at: '2023-02-20',
    updated_at: '2024-03-30',
  },
  {
    id: 3,
    name: 'Phòng Nhân sự',
    factory_name: 'Kho vận DEF',
    parent_department_name: null,
    esg_score: 79.8,
    environmental_impact: 20.5,
    social_impact: 30.0,
    governance_score: 29.3,
    esg_category_name: 'Quản trị nhân sự',
    created_at: '2023-05-05',
    updated_at: '2024-01-22',
  },
];

export default function DepartmentsPage() {
  return (
    <>
      <Head title="Quản lý Phòng ban" />
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Danh sách Phòng ban
        </h1>

        <div className="bg-white dark:bg-gray-900 shadow rounded-xl p-4 border border-gray-200 dark:border-gray-700 overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Tên Phòng ban</TableHead>
                <TableHead>Nhà máy</TableHead>
                <TableHead>Phòng ban cha</TableHead>
                <TableHead>Điểm ESG</TableHead>
                <TableHead>Tác động Môi trường</TableHead>
                <TableHead>Tác động Xã hội</TableHead>
                <TableHead>Điểm Quản trị</TableHead>
                <TableHead>Danh mục ESG</TableHead>
                <TableHead>Ngày tạo</TableHead>
                <TableHead>Ngày cập nhật</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockDepartments.length > 0 ? (
                mockDepartments.map((dept) => (
                  <TableRow key={dept.id}>
                    <TableCell>{dept.id}</TableCell>
                    <TableCell>{dept.name}</TableCell>
                    <TableCell>{dept.factory_name}</TableCell>
                    <TableCell>{dept.parent_department_name || '-'}</TableCell>
                    <TableCell>{dept.esg_score.toFixed(2)}</TableCell>
                    <TableCell>{dept.environmental_impact?.toFixed(2) ?? '-'}</TableCell>
                    <TableCell>{dept.social_impact?.toFixed(2) ?? '-'}</TableCell>
                    <TableCell>{dept.governance_score?.toFixed(2) ?? '-'}</TableCell>
                    <TableCell>{dept.esg_category_name || '-'}</TableCell>
                    <TableCell>{new Date(dept.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(dept.updated_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">
                        Chi tiết
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={12} className="text-center text-gray-500">
                    Không có dữ liệu phòng ban.
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

DepartmentsPage.layout = (page: React.ReactNode) => (
  <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>
);
