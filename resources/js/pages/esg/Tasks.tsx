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
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { MoreHorizontal } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Nhiệm vụ ESG',
    href: '/esg/tasks',
  },
];

const statusColors: Record<string, string> = {
  Pending: 'bg-yellow-100 text-yellow-800',
  'In Progress': 'bg-blue-100 text-blue-800',
  Done: 'bg-green-100 text-green-800',
};

export default function TasksPage() {
  const [tasks, setTasks] = useState([
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
  ]);
  const [selected, setSelected] = useState<number[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [form, setForm] = useState({
    projectName: '',
    taskName: '',
    assignedTo: '',
    deadline: '',
    status: 'Pending',
    progress: 0,
  });

  const handleToggleAll = () => {
    setSelected(selected.length === tasks.length ? [] : tasks.map((t) => t.id));
  };

  const handleToggleOne = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = () => {
    if (confirm('Bạn có chắc muốn xoá các nhiệm vụ đã chọn?')) {
      setTasks(tasks.filter((t) => !selected.includes(t.id)));
      setSelected([]);
      toast.success('Đã xoá các nhiệm vụ được chọn');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAddTask = () => {
    if (!form.taskName || !form.projectName || !form.deadline) {
      toast.error('Vui lòng nhập đầy đủ thông tin');
      return;
    }
    const newId = tasks.length ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
    setTasks([...tasks, { ...form, id: newId }]);
    toast.success('Thêm nhiệm vụ thành công');
    setForm({ projectName: '', taskName: '', assignedTo: '', deadline: '', status: 'Pending', progress: 0 });
    setOpenDialog(false);
  };

  return (
    <>
      <Head title="Nhiệm vụ ESG" />
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Nhiệm vụ ESG</h1>
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button>Thêm nhiệm vụ</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Thêm nhiệm vụ mới</DialogTitle>
              </DialogHeader>
              <div className="grid gap-3">
                <Input name="projectName" value={form.projectName} onChange={handleChange} placeholder="Tên dự án" />
                <Input name="taskName" value={form.taskName} onChange={handleChange} placeholder="Tên nhiệm vụ" />
                <Input name="assignedTo" value={form.assignedTo} onChange={handleChange} placeholder="Người phụ trách" />
                <Input name="deadline" value={form.deadline} onChange={handleChange} type="date" placeholder="Hạn chót" />
                <Input name="progress" value={form.progress} onChange={handleChange} type="number" placeholder="Tiến độ (%)" />
              </div>
              <DialogFooter className="mt-4">
                <Button variant="outline" onClick={() => setOpenDialog(false)}>Huỷ</Button>
                <Button onClick={handleAddTask}>Lưu</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {selected.length > 0 && (
          <div className="flex justify-end">
            <Button variant="destructive" onClick={handleDeleteSelected}>Xoá {selected.length} nhiệm vụ</Button>
          </div>
        )}

        <div className="bg-white dark:bg-gray-900 shadow rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <p className="mb-6 text-gray-700 dark:text-gray-300">
            Trang theo dõi nhiệm vụ chi tiết theo dự án ESG.
          </p>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead><input type="checkbox" onChange={handleToggleAll} checked={selected.length === tasks.length && tasks.length > 0} /></TableHead>
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
                    <TableCell>
                      <input type="checkbox" checked={selected.includes(task.id)} onChange={() => handleToggleOne(task.id)} />
                    </TableCell>
                    <TableCell>{task.id}</TableCell>
                    <TableCell>{task.projectName}</TableCell>
                    <TableCell>{task.taskName}</TableCell>
                    <TableCell>{task.assignedTo ?? '-'}</TableCell>
                    <TableCell>{task.deadline}</TableCell>
                    <TableCell>
                      <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                        <div className="h-3 rounded-full bg-green-500" style={{ width: `${task.progress}%` }} />
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
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => alert(`Xem nhiệm vụ ${task.id}`)}>Xem</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => alert(`Sửa nhiệm vụ ${task.id}`)}>Sửa</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleToggleOne(task.id)} className="text-red-600">Xoá</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-4 text-gray-500">
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
