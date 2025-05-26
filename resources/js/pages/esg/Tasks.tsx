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
    title: 'Nhiệm vụ ESG',
    href: '/esg/tasks',
  },
];

// Mẫu dữ liệu demo
const tasks = [
  {
    id: 1,
    projectName: 'Dự án giảm khí thải',
    taskName: 'Lắp đặt hệ thống pin mặt trời',
    assignedTo: 'Nguyễn Văn A',
    deadline: '2024-06-30',
    status: 'In Progress',
    progress: 65,
  },
  {
    id: 2,
    projectName: 'Dự án tái chế nước',
    taskName: 'Kiểm tra hệ thống lọc',
    assignedTo: 'Trần Thị B',
    deadline: '2024-07-15',
    status: 'Pending',
    progress: 0,
  },
  {
    id: 3,
    projectName: 'Dự án giáo dục cộng đồng',
    taskName: 'Soạn tài liệu hướng dẫn',
    assignedTo: null,
    deadline: '2023-12-20',
    status: 'Done',
    progress: 100,
  },
];

// Màu badge trạng thái
const statusColors: Record<string, string> = {
  Pending: 'bg-yellow-100 text-yellow-800',
  'In Progress': 'bg-blue-100 text-blue-800',
  Done: 'bg-green-100 text-green-800',
};

export default function TasksPage() {
  return (
    <>
      <Head title="Nhiệm vụ ESG" />
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Nhiệm vụ ESG
        </h1>

        <div className="bg-white dark:bg-gray-900 shadow rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <p className="mb-6 text-gray-700 dark:text-gray-300">
            Trang theo dõi nhiệm vụ chi tiết theo dự án ESG.
          </p>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Dự án</TableHead>
                <TableHead>Nhiệm vụ</TableHead>
                <TableHead>Người phụ trách</TableHead>
                <TableHead>Hạn chót</TableHead>
                <TableHead>Tiến độ</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {tasks.length ? (
                tasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell>{task.id}</TableCell>
                    <TableCell>{task.projectName}</TableCell>
                    <TableCell>{task.taskName}</TableCell>
                    <TableCell>{task.assignedTo ?? '-'}</TableCell>
                    <TableCell>{task.deadline}</TableCell>
                    <TableCell>
                      <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                        <div
                          className="h-3 rounded-full bg-green-500"
                          style={{ width: `${task.progress}%` }}
                        />
                      </div>
                      <span className="text-xs ml-2">{task.progress}%</span>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusColors[task.status]}>
                        {{
                          Pending: 'Chờ xử lý',
                          'In Progress': 'Đang thực hiện',
                          Done: 'Hoàn thành',
                        }[task.status]}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">
                        Xem
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-4 text-gray-500">
                    Không có nhiệm vụ nào
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

TasksPage.layout = (page: React.ReactNode) => <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>;
