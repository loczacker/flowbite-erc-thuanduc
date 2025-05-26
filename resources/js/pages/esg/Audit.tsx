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
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Kiểm toán ESG',
    href: '/esg/audit',
  },
];

type Audit = {
  id: number;
  reportId: number;
  auditor: {
    id: number;
    name: string;
  };
  auditNotes: string;
  auditDate: string;
  auditStatus: 'Pending' | 'Completed' | 'Rejected';
};

const audits: Audit[] = [
  {
    id: 1,
    reportId: 201,
    auditor: { id: 1, name: 'Nguyễn Văn An' },
    auditNotes: 'Dữ liệu được xác minh, đầy đủ thông tin.',
    auditDate: '2025-05-20',
    auditStatus: 'Completed',
  },
  {
    id: 2,
    reportId: 202,
    auditor: { id: 2, name: 'Trần Thị Bình' },
    auditNotes: 'Thiếu nguồn gốc dữ liệu, yêu cầu bổ sung.',
    auditDate: '2025-05-22',
    auditStatus: 'Rejected',
  },
  {
    id: 3,
    reportId: 203,
    auditor: { id: 3, name: 'Lê Minh Châu' },
    auditNotes: 'Đang chờ xác thực kết quả.',
    auditDate: '2025-05-25',
    auditStatus: 'Pending',
  },
];

function statusColor(status: Audit['auditStatus']) {
  switch (status) {
    case 'Completed':
      return 'success';
    case 'Rejected':
      return 'destructive';
    case 'Pending':
    default:
      return 'secondary';
  }
}

export default function AuditPage() {
  return (
    <>
      <Head title="Kiểm toán ESG" />
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Kiểm toán ESG
        </h1>

        <div className="bg-white dark:bg-gray-900 shadow rounded-xl p-6 border border-gray-200 dark:border-gray-700 space-y-6">
          <p className="text-gray-700 dark:text-gray-300">
            Danh sách các kiểm toán của báo cáo ESG đã được thực hiện.
          </p>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Báo cáo</TableHead>
                <TableHead>Kiểm toán viên</TableHead>
                <TableHead>Ghi chú</TableHead>
                <TableHead>Ngày kiểm toán</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {audits.map((audit) => (
                <TableRow key={audit.id}>
                  <TableCell>{audit.id}</TableCell>
                  <TableCell>#{audit.reportId}</TableCell>
                  <TableCell className="flex items-center gap-2">
                    <Avatar className="h-7 w-7">
                      <AvatarFallback>{audit.auditor.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <span>{audit.auditor.name}</span>
                  </TableCell>
                  <TableCell className="max-w-[250px] truncate">
                    {audit.auditNotes}
                  </TableCell>
                  <TableCell>
                    {format(new Date(audit.auditDate), 'dd/MM/yyyy')}
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusColor(audit.auditStatus)}>
                      {audit.auditStatus === 'Pending'
                        ? 'Chờ kiểm tra'
                        : audit.auditStatus === 'Completed'
                        ? 'Hoàn tất'
                        : 'Từ chối'}
                    </Badge>
                  </TableCell>
                  <TableCell className="space-x-2">
                    <Button size="sm" variant="outline">Xem</Button>
                    <Button size="sm" variant="destructive">Xóa</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}

AuditPage.layout = (page: React.ReactNode) => (
  <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>
);
