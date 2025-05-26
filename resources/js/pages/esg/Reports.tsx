import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { useState } from 'react';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Báo cáo ESG',
    href: '/esg/reports',
  },
];

type ESGReport = {
  id: number;
  year: number;
  submitted_by: string;
  approved_by?: string | null;
  status: 'Draft' | 'Submitted' | 'Approved';
  comments?: string;
};

const sampleReports: ESGReport[] = [
  {
    id: 1,
    year: 2024,
    submitted_by: 'Nguyễn Văn A',
    approved_by: 'Trần Thị B',
    status: 'Approved',
    comments: 'Báo cáo đầy đủ và chính xác.',
  },
  {
    id: 2,
    year: 2023,
    submitted_by: 'Lê Văn C',
    approved_by: null,
    status: 'Draft',
    comments: '',
  },
  {
    id: 3,
    year: 2022,
    submitted_by: 'Phạm Thị D',
    approved_by: 'Nguyễn Văn E',
    status: 'Submitted',
    comments: 'Chờ duyệt từ quản lý.',
  },
];

export default function ReportsPage() {
  const [reports] = useState(sampleReports);
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredReports =
    statusFilter === 'All'
      ? reports
      : reports.filter((r) => r.status === statusFilter);

  return (
    <>
      <Head title="Báo cáo ESG" />
      <div className="p-6 space-y-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Báo cáo ESG
        </h1>

        <div className="bg-white dark:bg-gray-900 shadow rounded-xl p-6 border border-gray-200 dark:border-gray-700 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-gray-700 dark:text-gray-300">
              Danh sách báo cáo đánh giá ESG.
            </p>

            <Select onValueChange={setStatusFilter} defaultValue="All">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Lọc theo trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">Tất cả trạng thái</SelectItem>
                <SelectItem value="Draft">Bản nháp</SelectItem>
                <SelectItem value="Submitted">Đã nộp</SelectItem>
                <SelectItem value="Approved">Đã duyệt</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Năm</TableHead>
                <TableHead>Người gửi</TableHead>
                <TableHead>Người duyệt</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Ghi chú</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.length > 0 ? (
                filteredReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell>{report.year}</TableCell>
                    <TableCell>{report.submitted_by}</TableCell>
                    <TableCell>{report.approved_by || '—'}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          report.status === 'Approved'
                            ? 'success'
                            : report.status === 'Submitted'
                            ? 'default'
                            : 'secondary'
                        }
                      >
                        {report.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{report.comments || '—'}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Xem
                        </Button>
                        <Button variant="destructive" size="sm">
                          Xóa
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                    Không có báo cáo phù hợp.
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

ReportsPage.layout = (page: React.ReactNode) => (
  <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>
);
