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
    title: 'Chức vụ',
    href: '/organization/positions',
  },
];

// Dữ liệu mẫu demo
type Position = {
  id: number;
  name: string;
  description?: string | null;
  role_level: 'Junior' | 'Mid' | 'Senior' | 'Managerial';
  department?: string | null;
  company?: string | null;
  factory?: string | null;
  deleted_at?: string | null; // soft delete
};

const mockPositions: Position[] = [
  {
    id: 1,
    name: 'Nhân viên QA',
    description: 'Chịu trách nhiệm kiểm thử chất lượng sản phẩm.',
    role_level: 'Junior',
    department: 'Phòng QA',
    company: 'Công ty ABC',
    factory: null,
    deleted_at: null,
  },
  {
    id: 2,
    name: 'Trưởng phòng Sản xuất',
    description: 'Quản lý các hoạt động sản xuất nhà máy.',
    role_level: 'Managerial',
    department: 'Phòng Sản xuất',
    company: 'Công ty ABC',
    factory: 'Nhà máy Số 1',
    deleted_at: null,
  },
  {
    id: 3,
    name: 'Kỹ sư Thiết kế',
    description: 'Thiết kế quy trình sản xuất.',
    role_level: 'Mid',
    department: null,
    company: 'Công ty XYZ',
    factory: null,
    deleted_at: '2024-04-15T10:00:00Z', // soft deleted
  },
];

function roleLevelBadge(level: Position['role_level']) {
  switch (level) {
    case 'Junior':
      return <Badge variant="secondary">Junior</Badge>;
    case 'Mid':
      return <Badge variant="primary">Mid</Badge>;
    case 'Senior':
      return <Badge variant="warning">Senior</Badge>;
    case 'Managerial':
      return <Badge variant="destructive">Managerial</Badge>;
    default:
      return <Badge>Unknown</Badge>;
  }
}

export default function PositionsPage() {
  return (
    <>
      <Head title="Quản lý Chức vụ" />
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Danh sách Chức vụ
        </h1>

        <div className="bg-white dark:bg-gray-900 shadow rounded-xl p-4 border border-gray-200 dark:border-gray-700 overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên chức vụ</TableHead>
                <TableHead>Mô tả</TableHead>
                <TableHead>Cấp bậc</TableHead>
                <TableHead>Phòng ban</TableHead>
                <TableHead>Công ty</TableHead>
                <TableHead>Nhà máy</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPositions.length > 0 ? (
                mockPositions.map((pos) => (
                  <TableRow
                    key={pos.id}
                    className={pos.deleted_at ? 'opacity-50 italic' : ''}
                    title={pos.deleted_at ? 'Đã bị xóa mềm' : undefined}
                  >
                    <TableCell className="font-medium">{pos.name}</TableCell>
                    <TableCell>{pos.description ?? '-'}</TableCell>
                    <TableCell>{roleLevelBadge(pos.role_level)}</TableCell>
                    <TableCell>{pos.department ?? '-'}</TableCell>
                    <TableCell>{pos.company ?? '-'}</TableCell>
                    <TableCell>{pos.factory ?? '-'}</TableCell>
                    <TableCell>
                      {pos.deleted_at ? (
                        <Badge variant="destructive">Đã xóa</Badge>
                      ) : (
                        <Badge variant="success">Đang hoạt động</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" disabled={!!pos.deleted_at}>
                        Chi tiết
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-gray-500">
                    Không có dữ liệu chức vụ.
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

PositionsPage.layout = (page: React.ReactNode) => (
  <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>
);
