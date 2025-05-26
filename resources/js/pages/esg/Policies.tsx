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
    title: 'Chính sách ESG',
    href: '/esg/policies',
  },
];

// Dữ liệu mẫu chính sách ESG
const policies = [
  {
    id: 1,
    policyName: 'Chính sách giảm khí thải',
    description: 'Cam kết giảm phát thải carbon trong toàn bộ hoạt động công ty.',
    effectiveDate: '2024-01-01',
    createdBy: 'Nguyễn Văn A',
    lastReviewed: '2024-04-15',
  },
  {
    id: 2,
    policyName: 'Chính sách sử dụng năng lượng tái tạo',
    description: 'Ưu tiên sử dụng nguồn năng lượng sạch và tái tạo trong sản xuất.',
    effectiveDate: '2023-10-01',
    createdBy: 'Trần Thị B',
    lastReviewed: null,
  },
  {
    id: 3,
    policyName: 'Chính sách an toàn lao động',
    description: 'Bảo đảm môi trường làm việc an toàn, không rủi ro cho nhân viên.',
    effectiveDate: '2023-07-15',
    createdBy: 'Lê Văn C',
    lastReviewed: '2024-02-20',
  },
];

export default function PoliciesPage() {
  return (
    <>
      <Head title="Chính sách ESG" />
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Chính sách ESG
        </h1>

        <div className="bg-white dark:bg-gray-900 shadow rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <p className="mb-6 text-gray-700 dark:text-gray-300">
            Trang tạo và cập nhật chính sách ESG.
          </p>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Tên chính sách</TableHead>
                <TableHead>Mô tả</TableHead>
                <TableHead>Ngày hiệu lực</TableHead>
                <TableHead>Người tạo</TableHead>
                <TableHead>Ngày xem xét cuối</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {policies.length ? (
                policies.map((policy) => (
                  <TableRow key={policy.id}>
                    <TableCell>{policy.id}</TableCell>
                    <TableCell>{policy.policyName}</TableCell>
                    <TableCell className="max-w-xs truncate" title={policy.description}>
                      {policy.description}
                    </TableCell>
                    <TableCell>{policy.effectiveDate}</TableCell>
                    <TableCell>{policy.createdBy}</TableCell>
                    <TableCell>{policy.lastReviewed ?? '-'}</TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">
                        Xem
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4 text-gray-500">
                    Không có chính sách nào
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

PoliciesPage.layout = (page: React.ReactNode) => (
  <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>
);
