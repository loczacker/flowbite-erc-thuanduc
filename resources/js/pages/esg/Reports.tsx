import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { useState } from 'react';
import {
  Table, TableHeader, TableRow, TableHead, TableBody, TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
} from '@/components/ui/select';
import {
  Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Báo cáo ESG', href: '/esg/reports' },
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
  { id: 1, year: 2024, submitted_by: 'Nguyễn Văn A', approved_by: 'Trần Thị B', status: 'Approved', comments: 'Báo cáo đầy đủ và chính xác.' },
  { id: 2, year: 2023, submitted_by: 'Lê Văn C', approved_by: null, status: 'Draft', comments: '' },
  { id: 3, year: 2022, submitted_by: 'Phạm Thị D', approved_by: 'Nguyễn Văn E', status: 'Submitted', comments: 'Chờ duyệt từ quản lý.' },
];

export default function ReportsPage() {
  const [reports, setReports] = useState<ESGReport[]>(sampleReports);
  const [statusFilter, setStatusFilter] = useState('All');
  const [openDialog, setOpenDialog] = useState(false);

  const [form, setForm] = useState({
    year: new Date().getFullYear(),
    submitted_by: '',
    status: 'Draft',
    comments: '',
  });

  const handleAddReport = () => {
    if (!form.year || !form.submitted_by || !form.status) {
      toast.error('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    const newId = reports.length ? Math.max(...reports.map(r => r.id)) + 1 : 1;
    const newReport: ESGReport = {
      id: newId,
      year: Number(form.year),
      submitted_by: form.submitted_by,
      status: form.status as ESGReport['status'],
      comments: form.comments || '',
    };

    setReports([...reports, newReport]);
    setOpenDialog(false);
    toast.success('Thêm báo cáo thành công');

    setForm({
      year: new Date().getFullYear(),
      submitted_by: '',
      status: 'Draft',
      comments: '',
    });
  };

  const handleDelete = (id: number) => {
    if (confirm('Bạn có chắc muốn xóa báo cáo này không?')) {
      setReports(reports.filter(r => r.id !== id));
      toast.success('Đã xoá báo cáo');
    }
  };

  const filteredReports = statusFilter === 'All'
    ? reports
    : reports.filter((r) => r.status === statusFilter);

  return (
    <>
      <Head title="Báo cáo ESG" />
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Báo cáo ESG</h1>
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button>Thêm báo cáo</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Thêm báo cáo ESG</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  type="number"
                  placeholder="Năm báo cáo"
                  value={form.year}
                  onChange={(e) => setForm({ ...form, year: Number(e.target.value) })}
                />
                <Input
                  placeholder="Người gửi"
                  value={form.submitted_by}
                  onChange={(e) => setForm({ ...form, submitted_by: e.target.value })}
                />
                <Select value={form.status} onValueChange={(value) => setForm({ ...form, status: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Draft">Bản nháp</SelectItem>
                    <SelectItem value="Submitted">Đã nộp</SelectItem>
                    <SelectItem value="Approved">Đã duyệt</SelectItem>
                  </SelectContent>
                </Select>
                <Textarea
                  placeholder="Ghi chú (tuỳ chọn)"
                  value={form.comments}
                  onChange={(e) => setForm({ ...form, comments: e.target.value })}
                />
              </div>
              <DialogFooter className="mt-4">
                <Button variant="outline" onClick={() => setOpenDialog(false)}>Huỷ</Button>
                <Button onClick={handleAddReport}>Lưu</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="bg-white dark:bg-gray-900 shadow rounded-xl p-6 border border-gray-200 dark:border-gray-700 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-gray-700 dark:text-gray-300">Danh sách báo cáo đánh giá ESG.</p>
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
                <TableHead className="text-center">Thao tác</TableHead>
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
                    <TableCell className="text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="icon" variant="ghost">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => toast('Xem chưa triển khai')}>
                            Xem
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => handleDelete(report.id)}
                          >
                            Xóa
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4 text-gray-500">
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
