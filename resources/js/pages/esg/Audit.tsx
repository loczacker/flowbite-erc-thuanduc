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
  const [audits, setAudits] = useState<Audit[]>([
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
  ]);
  const [selected, setSelected] = useState<number[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [form, setForm] = useState({
    reportId: '',
    auditorName: '',
    auditNotes: '',
    auditDate: '',
    auditStatus: 'Pending',
  });

  const handleToggleAll = () => {
    setSelected(selected.length === audits.length ? [] : audits.map((a) => a.id));
  };

  const handleToggleOne = (id: number) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  const handleDeleteSelected = () => {
    if (confirm('Bạn có chắc muốn xoá các kiểm toán đã chọn?')) {
      setAudits(audits.filter((a) => !selected.includes(a.id)));
      setSelected([]);
      toast.success('Đã xoá kiểm toán được chọn');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAddAudit = () => {
    if (!form.reportId || !form.auditorName || !form.auditDate) {
      toast.error('Vui lòng nhập đầy đủ thông tin');
      return;
    }
    const newId = audits.length ? Math.max(...audits.map((a) => a.id)) + 1 : 1;
    setAudits([
      ...audits,
      {
        id: newId,
        reportId: Number(form.reportId),
        auditor: { id: newId, name: form.auditorName },
        auditNotes: form.auditNotes,
        auditDate: form.auditDate,
        auditStatus: form.auditStatus as Audit['auditStatus'],
      },
    ]);
    toast.success('Thêm kiểm toán thành công');
    setForm({ reportId: '', auditorName: '', auditNotes: '', auditDate: '', auditStatus: 'Pending' });
    setOpenDialog(false);
  };

  return (
    <>
      <Head title="Kiểm toán ESG" />
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Kiểm toán ESG</h1>
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button>Thêm kiểm toán</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Thêm kiểm toán mới</DialogTitle>
              </DialogHeader>
              <div className="grid gap-3">
                <Input name="reportId" value={form.reportId} onChange={handleChange} placeholder="ID báo cáo" />
                <Input name="auditorName" value={form.auditorName} onChange={handleChange} placeholder="Tên kiểm toán viên" />
                <Input name="auditNotes" value={form.auditNotes} onChange={handleChange} placeholder="Ghi chú" />
                <Input name="auditDate" value={form.auditDate} onChange={handleChange} type="date" placeholder="Ngày kiểm toán" />
              </div>
              <DialogFooter className="mt-4">
                <Button variant="outline" onClick={() => setOpenDialog(false)}>Huỷ</Button>
                <Button onClick={handleAddAudit}>Lưu</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {selected.length > 0 && (
          <div className="flex justify-end">
            <Button variant="destructive" onClick={handleDeleteSelected}>Xoá {selected.length} kiểm toán</Button>
          </div>
        )}

        <div className="bg-white dark:bg-gray-900 shadow rounded-xl p-6 border border-gray-200 dark:border-gray-700 space-y-6">
          <p className="text-gray-700 dark:text-gray-300">Danh sách các kiểm toán của báo cáo ESG đã được thực hiện.</p>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead><input type="checkbox" onChange={handleToggleAll} checked={selected.length === audits.length && audits.length > 0} /></TableHead>
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
                  <TableCell><input type="checkbox" checked={selected.includes(audit.id)} onChange={() => handleToggleOne(audit.id)} /></TableCell>
                  <TableCell>{audit.id}</TableCell>
                  <TableCell>#{audit.reportId}</TableCell>
                  <TableCell className="flex items-center gap-2">
                    <Avatar className="h-7 w-7">
                      <AvatarFallback>{audit.auditor.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <span>{audit.auditor.name}</span>
                  </TableCell>
                  <TableCell className="max-w-[250px] truncate">{audit.auditNotes}</TableCell>
                  <TableCell>{format(new Date(audit.auditDate), 'dd/MM/yyyy')}</TableCell>
                  <TableCell>
                    <Badge variant={statusColor(audit.auditStatus)}>
                      {audit.auditStatus === 'Pending' ? 'Chờ kiểm tra' : audit.auditStatus === 'Completed' ? 'Hoàn tất' : 'Từ chối'}
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
                        <DropdownMenuItem onClick={() => alert(`Xem kiểm toán ${audit.id}`)}>Xem</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => alert(`Sửa kiểm toán ${audit.id}`)}>Sửa</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleToggleOne(audit.id)} className="text-red-600">Xoá</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
