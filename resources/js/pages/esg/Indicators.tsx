import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { useState } from 'react';
import { toast } from 'sonner';
import {
  Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Chỉ số ESG', href: '/esg/indicators' },
];

type Indicator = {
  id: number;
  name: string;
  unit: string;
  category_name: string;
  description?: string | null;
};

export default function IndicatorsPage() {
  const [indicators, setIndicators] = useState<Indicator[]>([
    {
      id: 1,
      name: 'Khí CO2',
      unit: 'tấn',
      category_name: 'Môi trường',
      description: 'Tổng lượng khí CO2 phát ra mỗi năm',
    },
    {
      id: 2,
      name: 'Tình nguyện viên',
      unit: 'người',
      category_name: 'Xã hội',
      description: 'Số nhân sự tham gia cộng đồng',
    },
  ]);

  const [form, setForm] = useState<Partial<Indicator>>({ name: '', unit: '', category_name: '', description: '' });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [filters, setFilters] = useState({ name: '', unit: '', category: '' });
  const [openDialog, setOpenDialog] = useState(false);
  const [selected, setSelected] = useState<number[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name || !form.unit || !form.category_name) {
      toast.error('Vui lòng nhập đầy đủ tên, đơn vị và danh mục');
      return;
    }

    if (editingId !== null) {
      setIndicators(indicators.map(i => i.id === editingId ? { ...form, id: editingId } as Indicator : i));
      toast.success('Cập nhật chỉ số thành công');
      setEditingId(null);
    } else {
      const newId = indicators.length ? Math.max(...indicators.map(i => i.id)) + 1 : 1;
      setIndicators([...indicators, { ...form, id: newId } as Indicator]);
      toast.success('Thêm chỉ số thành công');
    }

    setForm({ name: '', unit: '', category_name: '', description: '' });
    setOpenDialog(false);
  };

  const handleEdit = (indicator: Indicator) => {
    setForm(indicator);
    setEditingId(indicator.id);
    setOpenDialog(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Bạn có chắc muốn xoá chỉ số này không?')) {
      setIndicators(indicators.filter(i => i.id !== id));
      setSelected((prev) => prev.filter((sid) => sid !== id));
      toast.success('Đã xoá chỉ số');
    }
  };

  const handleDeleteSelected = () => {
    if (confirm('Bạn có chắc muốn xoá các chỉ số đã chọn?')) {
      setIndicators(indicators.filter(i => !selected.includes(i.id)));
      setSelected([]);
      toast.success('Đã xoá các chỉ số được chọn');
    }
  };

  const handleView = (id: number) => {
    router.visit(`/indicators/${id}`);
  };

  const handleToggleAll = () => {
    if (selected.length === filteredIndicators.length) {
      setSelected([]);
    } else {
      setSelected(filteredIndicators.map(i => i.id));
    }
  };

  const handleToggleOne = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]
    );
  };

  const filteredIndicators = indicators.filter(i =>
    i.name.toLowerCase().includes(filters.name.toLowerCase()) &&
    i.unit.toLowerCase().includes(filters.unit.toLowerCase()) &&
    i.category_name.toLowerCase().includes(filters.category.toLowerCase())
  );

  return (
    <>
      <Head title="Chỉ số ESG" />
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Chỉ số ESG</h1>
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button>Thêm chỉ số mới</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>{editingId ? 'Cập nhật chỉ số' : 'Thêm chỉ số mới'}</DialogTitle>
              </DialogHeader>
              <div className="grid gap-3">
                <Input name="name" value={form.name} onChange={handleChange} placeholder="Tên chỉ số" />
                <Input name="unit" value={form.unit} onChange={handleChange} placeholder="Đơn vị" />
                <Input name="category_name" value={form.category_name} onChange={handleChange} placeholder="Danh mục" />
                <Textarea name="description" value={form.description || ''} onChange={handleChange} placeholder="Mô tả (tuỳ chọn)" rows={3} />
              </div>
              <DialogFooter className="mt-4">
                <Button variant="outline" onClick={() => {
                  setForm({ name: '', unit: '', category_name: '', description: '' });
                  setEditingId(null);
                  setOpenDialog(false);
                }}>Huỷ</Button>
                <Button onClick={handleSubmit}>{editingId ? 'Cập nhật' : 'Lưu'}</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {selected.length > 0 && (
          <div className="flex justify-end">
            <Button variant="destructive" onClick={handleDeleteSelected}>
              Xoá {selected.length} chỉ số đã chọn
            </Button>
          </div>
        )}

        {/* Bộ lọc */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <Input name="name" value={filters.name} onChange={(e) => setFilters({ ...filters, name: e.target.value })} placeholder="Lọc theo tên chỉ số" />
          <Input name="unit" value={filters.unit} onChange={(e) => setFilters({ ...filters, unit: e.target.value })} placeholder="Lọc theo đơn vị" />
          <Input name="category" value={filters.category} onChange={(e) => setFilters({ ...filters, category: e.target.value })} placeholder="Lọc theo danh mục" />
        </div>

        {/* Bảng dữ liệu */}
        <div className="overflow-auto rounded-lg border border-gray-200 dark:border-gray-700">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <input
                    type="checkbox"
                    checked={selected.length === filteredIndicators.length && filteredIndicators.length > 0}
                    onChange={handleToggleAll}
                  />
                </TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Tên chỉ số</TableHead>
                <TableHead>Đơn vị</TableHead>
                <TableHead>Danh mục</TableHead>
                <TableHead>Mô tả</TableHead>
                <TableHead className="text-center">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredIndicators.length > 0 ? (
                filteredIndicators.map(ind => (
                  <TableRow key={ind.id}>
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={selected.includes(ind.id)}
                        onChange={() => handleToggleOne(ind.id)}
                      />
                    </TableCell>
                    <TableCell>{ind.id}</TableCell>
                    <TableCell>{ind.name}</TableCell>
                    <TableCell>{ind.unit}</TableCell>
                    <TableCell>{ind.category_name}</TableCell>
                    <TableCell>{ind.description || '-'}</TableCell>
                    <TableCell className="text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="center">
                          <DropdownMenuItem onClick={() => handleView(ind.id)}>Xem</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEdit(ind)}>Sửa</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(ind.id)} className="text-red-600">Xoá</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4 text-gray-500">Không tìm thấy chỉ số phù hợp</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Thống kê danh mục */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <CardTitle>🌿 Environmental</CardTitle>
              <CardDescription>Các chỉ số môi trường và phát triển bền vững</CardDescription>
              <div className="mt-4 text-sm text-muted-foreground">Hoạt động</div>
              <div className="text-lg font-semibold text-green-600">85%</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <CardTitle>👥 Social</CardTitle>
              <CardDescription>Các yếu tố xã hội và trách nhiệm với cộng đồng</CardDescription>
              <div className="mt-4 text-sm text-muted-foreground">Hoạt động</div>
              <div className="text-lg font-semibold text-blue-600">72%</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <CardTitle>🏛 Governance</CardTitle>
              <CardDescription>Quản trị doanh nghiệp và tuân thủ pháp luật</CardDescription>
              <div className="mt-4 text-sm text-muted-foreground">Hoạt động</div>
              <div className="text-lg font-semibold text-purple-600">60%</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

IndicatorsPage.layout = (page: React.ReactNode) => (
  <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>
);
