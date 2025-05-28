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
    title: 'Tập đoàn',
    href: '/organization/corporations',
  },
];

type Corporation = {
  id: number;
  name: string;
  description?: string;
  industry_type?: string;
  headquarters_location?: string;
};

const mockData: Corporation[] = [
  {
    id: 1,
    name: 'Tập đoàn Năng lượng Xanh',
    description: 'Chuyên phát triển điện mặt trời và gió.',
    industry_type: 'Năng lượng tái tạo',
    headquarters_location: 'Hà Nội',
  },
  {
    id: 2,
    name: 'Công ty Công nghệ Bền vững',
    description: 'Cung cấp giải pháp AI và ESG cho doanh nghiệp.',
    industry_type: 'Công nghệ',
    headquarters_location: 'TP.HCM',
  },
  {
    id: 3,
    name: 'Tập đoàn Môi trường Toàn Cầu',
    description: 'Xử lý và tái chế chất thải công nghiệp.',
    industry_type: 'Môi trường',
    headquarters_location: 'Đà Nẵng',
  },
];

export default function CorporationsPage() {
  return (
    <>
      <Head title="Quản lý Tập đoàn" />
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Danh sách Tập đoàn ESG
        </h1>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow rounded-xl p-4 overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Tên Tập đoàn</TableHead>
                <TableHead>Mô tả</TableHead>
                <TableHead>Ngành nghề</TableHead>
                <TableHead>Trụ sở chính</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockData.map((corp) => (
                <TableRow key={corp.id}>
                  <TableCell>{corp.id}</TableCell>
                  <TableCell>{corp.name}</TableCell>
                  <TableCell className="max-w-xs truncate" title={corp.description}>
                    {corp.description || '-'}
                  </TableCell>
                  <TableCell>{corp.industry_type || '-'}</TableCell>
                  <TableCell>{corp.headquarters_location || '-'}</TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline">
                      Chi tiết
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {mockData.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-gray-500">
                    Không có dữ liệu tập đoàn.
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

CorporationsPage.layout = (page: React.ReactNode) => (
  <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>
);
