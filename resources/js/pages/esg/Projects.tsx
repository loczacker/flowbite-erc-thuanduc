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
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { MoreHorizontal } from 'lucide-react';
import { useState } from 'react';

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

const statusColor = {
  Planning: 'bg-yellow-100 text-yellow-800',
  'In Progress': 'bg-blue-100 text-blue-800',
  Completed: 'bg-green-100 text-green-800',
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([
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
  ]);

  const [selected, setSelected] = useState<number[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [form, setForm] = useState<Omit<Project, 'id'>>({
    name: '',
    description: '',
    start_date: '',
    end_date: '',
    budget: 0,
    status: 'Planning',
    created_by: '',
    department: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddProject = () => {
    if (!form.name || !form.start_date || !form.budget || !form.created_by) {
      toast.error('Vui lòng nhập đầy đủ thông tin bắt buộc.');
      return;
    }
    const newId = Math.max(...projects.map(p => p.id)) + 1;
    setProjects([...projects, { ...form, id: newId }]);
    toast.success('Thêm dự án thành công');
    setForm({ name: '', description: '', start_date: '', end_date: '', budget: 0, status: 'Planning', created_by: '', department: '' });
    setOpenDialog(false);
  };

  const handleToggleAll = () => {
    setSelected(selected.length === projects.length ? [] : projects.map(p => p.id));
  };

  const handleToggleOne = (id: number) => {
    setSelected((prev) => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleDeleteSelected = () => {
    if (confirm('Bạn có chắc muốn xoá các dự án đã chọn?')) {
      setProjects(projects.filter(p => !selected.includes(p.id)));
      setSelected([]);
      toast.success('Đã xoá các dự án được chọn');
    }
  };

  return (
    <>
      <Head title="Dự án ESG" />
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Dự án ESG</h1>
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button>Thêm dự án mới</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Thêm dự án ESG</DialogTitle>
              </DialogHeader>
              <div className="grid gap-3">
                <Input name="name" value={form.name} onChange={handleChange} placeholder="Tên dự án" />
                <Textarea name="description" value={form.description} onChange={handleChange} placeholder="Mô tả" rows={3} />
                <Input name="start_date" value={form.start_date} onChange={handleChange} placeholder="Ngày bắt đầu" type="date" />
                <Input name="end_date" value={form.end_date ?? ''} onChange={handleChange} placeholder="Ngày kết thúc" type="date" />
                <Input name="budget" value={form.budget} onChange={handleChange} placeholder="Ngân sách" type="number" />
                <Input name="created_by" value={form.created_by} onChange={handleChange} placeholder="Người tạo" />
                <Input name="department" value={form.department ?? ''} onChange={handleChange} placeholder="Phòng ban" />
              </div>
              <DialogFooter className="mt-4">
                <Button variant="outline" onClick={() => setOpenDialog(false)}>Huỷ</Button>
                <Button onClick={handleAddProject}>Lưu</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {selected.length > 0 && (
          <div className="flex justify-end">
            <Button variant="destructive" onClick={handleDeleteSelected}>
              Xoá {selected.length} mục đã chọn
            </Button>
          </div>
        )}

        <div className="bg-white dark:bg-gray-900 shadow rounded-xl p-6 border border-gray-200 dark:border-gray-700 space-y-6">
          <p className="text-gray-700 dark:text-gray-300">
            Trang quản lý các dự án ESG đang triển khai trong doanh nghiệp.
          </p>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <input
                    type="checkbox"
                    checked={selected.length === projects.length && projects.length > 0}
                    onChange={handleToggleAll}
                  />
                </TableHead>
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
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={selected.includes(project.id)}
                      onChange={() => handleToggleOne(project.id)}
                    />
                  </TableCell>
                  <TableCell>{project.id}</TableCell>
                  <TableCell>{project.name}</TableCell>
                  <TableCell>{project.department || '-'}</TableCell>
                  <TableCell>{project.created_by}</TableCell>
                  <TableCell>{project.budget.toLocaleString('vi-VN')} ₫</TableCell>
                  <TableCell>{project.start_date} → {project.end_date || '...'}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 text-xs rounded ${statusColor[project.status]}`}>
                      {{
                        Planning: 'Lên kế hoạch',
                        'In Progress': 'Đang thực hiện',
                        Completed: 'Đã hoàn tất',
                      }[project.status]}
                    </span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => alert(`Xem dự án ID ${project.id}`)}>Xem</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => alert(`Sửa dự án ID ${project.id}`)}>Sửa</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteSelected()} className="text-red-600">Xoá</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {projects.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-4 text-gray-500">
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
