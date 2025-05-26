import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dự án ESG', href: '/esg/projects' },
];

type Project = {
  id: number;
  name: string;
  description: string;
  start_date: string;
  end_date?: string | null;
  budget: number;
  status: 'Planning' | 'In Progress' | 'Completed';
  created_by: string;
  department?: string | null;
};

const projects: Project[] = [
  {
    id: 1,
    name: 'Giảm phát thải CO2',
    description: 'Triển khai hệ thống năng lượng mặt trời tại nhà máy.',
    start_date: '2024-01-10',
    end_date: '2024-08-15',
    budget: 250000000,
    status: 'In Progress',
    created_by: 'Nguyễn Văn A',
    department: 'Kỹ thuật',
  },
  {
    id: 2,
    name: 'Hỗ trợ cộng đồng',
    description: 'Chương trình giáo dục và y tế cho khu vực miền núi.',
    start_date: '2023-09-01',
    end_date: null,
    budget: 50000000,
    status: 'Planning',
    created_by: 'Trần Thị B',
    department: 'CSR',
  },
  {
    id: 3,
    name: 'Tái chế nước thải',
    description: 'Tái sử dụng nước tại nhà máy sản xuất.',
    start_date: '2023-01-01',
    end_date: '2023-12-31',
    budget: 150000000,
    status: 'Completed',
    created_by: 'Lê Văn C',
    department: 'Môi trường',
  },
];

const statusColor = {
  Planning: 'bg-yellow-100 text-yellow-800',
  'In Progress': 'bg-blue-100 text-blue-800',
  Completed: 'bg-green-100 text-green-800',
};

export default function ProjectsPage() {
  return (
    <>
      <Head title="Dự án ESG" />
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Dự án ESG
        </h1>

        <div className="bg-white dark:bg-gray-900 shadow rounded-xl p-6 border border-gray-200 dark:border-gray-700 space-y-6">
          <p className="text-gray-700 dark:text-gray-300">
            Trang quản lý các dự án ESG đang triển khai trong doanh nghiệp.
          </p>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Tên dự án</TableHead>
                <TableHead>Phòng ban</TableHead>
                <TableHead>Người tạo</TableHead>
                <TableHead>Ngân sách</TableHead>
                <TableHead>Thời gian</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>{project.id}</TableCell>
                  <TableCell>{project.name}</TableCell>
                  <TableCell>{project.department || '-'}</TableCell>
                  <TableCell>{project.created_by}</TableCell>
                  <TableCell>{project.budget.toLocaleString('vi-VN')} ₫</TableCell>
                  <TableCell>
                    {project.start_date} → {project.end_date || '...'}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 text-xs rounded ${statusColor[project.status]}`}
                    >
                      {
                        {
                          Planning: 'Lên kế hoạch',
                          'In Progress': 'Đang thực hiện',
                          Completed: 'Đã hoàn tất',
                        }[project.status]
                      }
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline">
                      Xem
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {projects.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-4 text-gray-500">
                    Không có dự án nào
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

ProjectsPage.layout = (page: React.ReactNode) => (
  <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>
);
