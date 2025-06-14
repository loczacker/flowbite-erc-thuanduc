import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, XCircle } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Chỉ số ESG',
    href: '/esg/indicators',
  },
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
    { id: 1, name: 'Khí CO2', unit: 'tấn', category_name: 'Môi trường', description: 'Tổng lượng khí CO2 phát ra mỗi năm' },
    { id: 2, name: 'Tình nguyện viên', unit: 'người', category_name: 'Xã hội', description: 'Số nhân sự tham gia cộng đồng' },
  ]);

  const [form, setForm] = useState<Partial<Indicator>>({ name: '', unit: '', category_name: '', description: '' });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [filters, setFilters] = useState({ name: '', unit: '', category: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name || !form.unit || !form.category_name) {
      alert('Vui lòng nhập đầy đủ tên, đơn vị và danh mục');
      return;
    }

    if (editingId !== null) {
      setIndicators(indicators.map(i => i.id === editingId ? { ...form, id: editingId } as Indicator : i));
      setEditingId(null);
    } else {
      const newId = indicators.length ? Math.max(...indicators.map(i => i.id)) + 1 : 1;
      setIndicators([...indicators, { ...form, id: newId } as Indicator]);
    }

    setForm({ name: '', unit: '', category_name: '', description: '' });
  };

  const handleEdit = (indicator: Indicator) => {
    setForm(indicator);
    setEditingId(indicator.id);
  };

  const handleDelete = (id: number) => {
    if (confirm('Bạn có chắc muốn xoá chỉ số này không?')) {
      setIndicators(indicators.filter(i => i.id !== id));
    }
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
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Chỉ số ESG</h1>

        {/* Form nhập liệu */}
        <div className="bg-white dark:bg-gray-900 shadow rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Input name="name" value={form.name} onChange={handleChange} placeholder="Tên chỉ số" />
            <Input name="unit" value={form.unit} onChange={handleChange} placeholder="Đơn vị" />
            <Input name="category_name" value={form.category_name} onChange={handleChange} placeholder="Danh mục" />
            <Textarea name="description" value={form.description || ''} onChange={handleChange} placeholder="Mô tả (tuỳ chọn)" rows={3} />
            <div className="col-span-full flex gap-2">
              <Button onClick={handleSubmit}>{editingId ? 'Cập nhật' : 'Thêm mới'}</Button>
              {editingId && (
                <Button variant="outline" onClick={() => { setForm({ name: '', unit: '', category_name: '', description: '' }); setEditingId(null); }}>
                  Huỷ
                </Button>
              )}
            </div>
          </div>

          {/* Bộ lọc */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <Input name="name" value={filters.name} onChange={handleFilterChange} placeholder="Lọc theo tên chỉ số" />
            <Input name="unit" value={filters.unit} onChange={handleFilterChange} placeholder="Lọc theo đơn vị" />
            <Input name="category" value={filters.category} onChange={handleFilterChange} placeholder="Lọc theo danh mục" />
          </div>

          {/* Bảng dữ liệu */}
          <div className="overflow-auto rounded-lg border border-gray-200 dark:border-gray-700">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Tên chỉ số</TableHead>
                  <TableHead>Đơn vị</TableHead>
                  <TableHead>Danh mục</TableHead>
                  <TableHead>Mô tả</TableHead>
                  <TableHead>Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredIndicators.length > 0 ? (
                  filteredIndicators.map(ind => (
                    <TableRow key={ind.id}>
                      <TableCell>{ind.id}</TableCell>
                      <TableCell>{ind.name}</TableCell>
                      <TableCell>{ind.unit}</TableCell>
                      <TableCell>{ind.category_name}</TableCell>
                      <TableCell>{ind.description || '-'}</TableCell>
                      <TableCell className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleEdit(ind)}>Sửa</Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDelete(ind.id)}>Xoá</Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4 text-gray-500">Không tìm thấy chỉ số phù hợp</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Thống kê danh mục */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <CardTitle className="flex items-center gap-2">
                🌿 Environmental
              </CardTitle>
              <CardDescription>Các chỉ số môi trường và phát triển bền vững</CardDescription>
              <div className="mt-4 text-sm text-muted-foreground">Hoạt động</div>
              <div className="text-lg font-semibold text-green-600">85%</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <CardTitle className="flex items-center gap-2">
                👥 Social
              </CardTitle>
              <CardDescription>Các yếu tố xã hội và trách nhiệm với cộng đồng</CardDescription>
              <div className="mt-4 text-sm text-muted-foreground">Hoạt động</div>
              <div className="text-lg font-semibold text-blue-600">72%</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <CardTitle className="flex items-center gap-2">
                🏛 Governance
              </CardTitle>
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
