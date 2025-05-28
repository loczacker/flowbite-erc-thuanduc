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
    title: 'Nhà máy',
    href: '/organization/factories',
  },
];

type Factory = {
  id: number;
  name: string;
  company_name: string;
  address?: string | null;
  factory_type: 'Manufacturing' | 'Warehouse' | 'Other';
  created_at: string;
  updated_at: string;
};

const mockFactories: Factory[] = [
  {
    id: 1,
    name: 'Nhà máy Sản xuất ABC',
    company_name: 'Công ty TNHH Công nghệ Môi trường Xanh',
    address: '123 Đường Môi Trường, Quận 1, TP.HCM',
    factory_type: 'Manufacturing',
    created_at: '2023-01-15',
    updated_at: '2024-04-20',
  },
  {
    id: 2,
    name: 'Kho vận DEF',
    company_name: 'Công ty CP Năng lượng Tái tạo ABC',
    address: '456 Khu Công Nghiệp, Bình Dương',
    factory_type: 'Warehouse',
    created_at: '2022-08-10',
    updated_at: '2024-02-28',
  },
  {
    id: 3,
    name: 'Nhà máy Đóng gói XYZ',
    company_name: 'Công ty CP Phân tích ESG Việt Nam',
    address: '789 Đường Sản Xuất, Hà Nội',
    factory_type: 'Other',
    created_at: '2023-05-05',
    updated_at: '2023-12-12',
  },
];

export default function FactoriesPage() {
  return (
    <>
      <Head title="Quản lý Nhà máy" />
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Danh sách Nhà máy
        </h1>

        <div className="bg-white dark:bg-gray-900 shadow rounded-xl p-4 border border-gray-200 dark:border-gray-700 overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Tên Nhà máy</TableHead>
                <TableHead>Công ty chủ quản</TableHead>
                <TableHead>Địa chỉ</TableHead>
                <TableHead>Loại nhà máy</TableHead>
                <TableHead>Ngày tạo</TableHead>
                <TableHead>Ngày cập nhật</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockFactories.length > 0 ? (
                mockFactories.map((factory) => (
                  <TableRow key={factory.id}>
                    <TableCell>{factory.id}</TableCell>
                    <TableCell>{factory.name}</TableCell>
                    <TableCell>{factory.company_name}</TableCell>
                    <TableCell
                      className="max-w-xs truncate"
                      title={factory.address ?? ''}
                    >
                      {factory.address || '-'}
                    </TableCell>
                    <TableCell>{factory.factory_type}</TableCell>
                    <TableCell>{new Date(factory.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(factory.updated_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">
                        Chi tiết
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-gray-500">
                    Không có dữ liệu nhà máy.
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

FactoriesPage.layout = (page: React.ReactNode) => (
  <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>
);
