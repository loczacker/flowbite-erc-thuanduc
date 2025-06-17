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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { MoreHorizontal } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Chính sách ESG',
    href: '/esg/policies',
  },
];

// Dữ liệu mẫu chính sách ESG
const defaultPolicies = [
  {
    id: 1,
    policyName: 'Chính sách giảm khí thải',
    description: 'Cam kết giảm phát thải carbon trong toàn bộ hoạt động công ty.',
    effectiveDate: '2024-01-01',
    createdBy: 'Nguyễn Văn A',
    lastReviewed: '2024-04-15',
  },
  {
    id: 2,
    policyName: 'Chính sách sử dụng năng lượng tái tạo',
    description: 'Ưu tiên sử dụng nguồn năng lượng sạch và tái tạo trong sản xuất.',
    effectiveDate: '2023-10-01',
    createdBy: 'Trần Thị B',
    lastReviewed: null,
  },
  {
    id: 3,
    policyName: 'Chính sách an toàn lao động',
    description: 'Bảo đảm môi trường làm việc an toàn, không rủi ro cho nhân viên.',
    effectiveDate: '2023-07-15',
    createdBy: 'Lê Văn C',
    lastReviewed: '2024-02-20',
  },
];

export default function PoliciesPage() {
  const [policies, setPolicies] = useState(defaultPolicies);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({
    policyName: '',
    description: '',
    effectiveDate: '',
    createdBy: '',
    lastReviewed: '',
  });

  const handleCheck = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleCheckAll = () => {
    if (selectedIds.length === policies.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(policies.map((p) => p.id));
    }
  };

  const handleDeleteSelected = () => {
    setPolicies((prev) => prev.filter((p) => !selectedIds.includes(p.id)));
    setSelectedIds([]);
    toast.success('Đã xóa các chính sách đã chọn');
  };

  const handleAddPolicy = () => {
    const newPolicy = {
      id: policies.length ? Math.max(...policies.map((p) => p.id)) + 1 : 1,
      ...form,
    };
    setPolicies([...policies, newPolicy]);
    toast.success('Đã thêm chính sách thành công');
    setForm({ policyName: '', description: '', effectiveDate: '', createdBy: '', lastReviewed: '' });
    setDialogOpen(false);
  };

  return (
    <>
      <Head title="Chính sách ESG" />
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Chính sách ESG
          </h1>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>Thêm chính sách</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Thêm chính sách mới</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4">
                <Input placeholder="Tên chính sách" value={form.policyName} onChange={(e) => setForm({ ...form, policyName: e.target.value })} />
                <Textarea placeholder="Mô tả" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                <Input type="date" placeholder="Ngày hiệu lực" value={form.effectiveDate} onChange={(e) => setForm({ ...form, effectiveDate: e.target.value })} />
                <Input placeholder="Người tạo" value={form.createdBy} onChange={(e) => setForm({ ...form, createdBy: e.target.value })} />
                <Input type="date" placeholder="Ngày xem xét cuối (nếu có)" value={form.lastReviewed} onChange={(e) => setForm({ ...form, lastReviewed: e.target.value })} />
              </div>
              <DialogFooter className="mt-4">
                <Button variant="outline" onClick={() => setDialogOpen(false)}>Huỷ</Button>
                <Button onClick={handleAddPolicy}>Lưu</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {selectedIds.length > 0 && (
          <div className="flex justify-end">
            <Button variant="destructive" onClick={handleDeleteSelected}>
              Xóa đã chọn ({selectedIds.length})
            </Button>
          </div>
        )}

        <div className="bg-white dark:bg-gray-900 shadow rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <p className="mb-6 text-gray-700 dark:text-gray-300">
            Trang tạo và cập nhật chính sách ESG.
          </p>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Checkbox checked={selectedIds.length === policies.length} onCheckedChange={handleCheckAll} />
                </TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Tên chính sách</TableHead>
                <TableHead>Mô tả</TableHead>
                <TableHead>Ngày hiệu lực</TableHead>
                <TableHead>Người tạo</TableHead>
                <TableHead>Ngày xem xét cuối</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {policies.length ? (
                policies.map((policy) => (
                  <TableRow key={policy.id}>
                    <TableCell>
                      <Checkbox checked={selectedIds.includes(policy.id)} onCheckedChange={() => handleCheck(policy.id)} />
                    </TableCell>
                    <TableCell>{policy.id}</TableCell>
                    <TableCell>{policy.policyName}</TableCell>
                    <TableCell className="max-w-xs truncate" title={policy.description}>
                      {policy.description}
                    </TableCell>
                    <TableCell>{policy.effectiveDate}</TableCell>
                    <TableCell>{policy.createdBy}</TableCell>
                    <TableCell>{policy.lastReviewed ?? '-'}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => toast.info('Xem chi tiết')}>Xem</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.info('Chức năng sửa chưa được cài đặt')}>Sửa</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setPolicies(policies.filter(p => p.id !== policy.id));
                            toast.success('Đã xóa chính sách');
                          }} className="text-red-600">Xoá</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-4 text-gray-500">
                    Không có chính sách nào
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

PoliciesPage.layout = (page: React.ReactNode) => (
  <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>
);
