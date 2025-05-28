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
import { Badge } from '@/components/ui/badge';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Tài liệu', href: '/documents' },
];

type Document = {
  id: number;
  title: string;
  category: string;
  status: 'Published' | 'Draft';
  created_at: string;
  updated_at: string;
};

const mockDocuments: Document[] = [
  {
    id: 1,
    title: 'Quy trình an toàn lao động',
    category: 'An toàn',
    status: 'Published',
    created_at: '2024-05-01',
    updated_at: '2024-05-20',
  },
  {
    id: 2,
    title: 'Chính sách môi trường',
    category: 'Môi trường',
    status: 'Draft',
    created_at: '2024-03-10',
    updated_at: '2024-04-01',
  },
];

export default function DocumentIndex() {
  return (
    <>
      <Head title="Quản lý Tài liệu" />
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Danh sách Tài liệu
        </h1>

        <div className="bg-white dark:bg-gray-900 shadow rounded-xl p-4 border border-gray-200 dark:border-gray-700 overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tiêu đề</TableHead>
                <TableHead>Phân loại</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Ngày tạo</TableHead>
                <TableHead>Cập nhật</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockDocuments.length > 0 ? (
                mockDocuments.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell>{doc.title}</TableCell>
                    <TableCell>{doc.category}</TableCell>
                    <TableCell>
                      <Badge variant={doc.status === 'Published' ? 'success' : 'secondary'}>
                        {doc.status === 'Published' ? 'Xuất bản' : 'Bản nháp'}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(doc.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(doc.updated_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">Chi tiết</Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-gray-500">
                    Không có tài liệu nào.
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

DocumentIndex.layout = (page: React.ReactNode) => (
  <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>
);
