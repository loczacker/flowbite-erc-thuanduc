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
    title: 'Công ty',
    href: '/organization/companies',
  },
];

type Company = {
  id: number;
  name: string;
  corporation_name: string;
  description?: string;
  founded_year?: number | null;
};

const mockCompanies: Company[] = [
  {
    id: 1,
    name: 'Công ty TNHH Công nghệ Môi trường Xanh',
    corporation_name: 'Tập đoàn Môi trường Việt Nam',
    description: 'Chuyên về giải pháp công nghệ xanh và tái chế.',
    founded_year: 2012,
  },
  {
    id: 2,
    name: 'Công ty CP Năng lượng Tái tạo ABC',
    corporation_name: 'Tập đoàn Năng lượng Sạch',
    description: 'Phát triển và vận hành các dự án năng lượng tái tạo.',
    founded_year: 2016,
  },
  {
    id: 3,
    name: 'Công ty CP Phân tích ESG Việt Nam',
    corporation_name: 'Tập đoàn Dữ liệu ESG',
    description: 'Cung cấp dịch vụ phân tích và báo cáo ESG cho doanh nghiệp.',
    founded_year: 2019,
  },
];

export default function CompaniesPage() {
  return (
    <>
      <Head title="Quản lý Công ty" />
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Danh sách Công ty ESG
        </h1>

        <div className="bg-white dark:bg-gray-900 shadow rounded-xl p-4 border border-gray-200 dark:border-gray-700 overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Tên Công ty</TableHead>
                <TableHead>Tập đoàn liên kết</TableHead>
                <TableHead>Mô tả</TableHead>
                <TableHead>Năm thành lập</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockCompanies.length > 0 ? (
                mockCompanies.map((company) => (
                  <TableRow key={company.id}>
                    <TableCell>{company.id}</TableCell>
                    <TableCell>{company.name}</TableCell>
                    <TableCell>{company.corporation_name}</TableCell>
                    <TableCell
                      className="max-w-xs truncate"
                      title={company.description ?? ''}
                    >
                      {company.description || '-'}
                    </TableCell>
                    <TableCell>{company.founded_year ?? '-'}</TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">
                        Chi tiết
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-gray-500">
                    Không có dữ liệu công ty.
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

CompaniesPage.layout = (page: React.ReactNode) => (
  <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>
);
