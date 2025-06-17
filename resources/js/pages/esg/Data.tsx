import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Textarea } from '@/components/ui/textarea';
import { format } from 'date-fns';
import { useState } from 'react';
import { toast } from 'sonner';
import { MoreHorizontal } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dữ liệu ESG',
    href: '/esg/data',
  },
];

type ESGData = {
  id: number;
  indicator: string;
  value: number;
  unit: string;
  source?: string | null;
  timestamp: string;
  reportYear: number;
};

const mockData: ESGData[] = [
  {
    id: 1,
    indicator: 'Mức tiêu thụ nước',
    value: 1200,
    unit: 'm³',
    source: 'SCADA',
    timestamp: '2025-05-10T08:30:00Z',
    reportYear: 2025,
  },
  {
    id: 2,
    indicator: 'Khí thải CO2',
    value: 300,
    unit: 'tấn',
    source: 'Báo cáo môi trường',
    timestamp: '2025-04-20T14:00:00Z',
    reportYear: 2025,
  },
  {
    id: 3,
    indicator: 'Tỷ lệ lao động nữ',
    value: 45.2,
    unit: '%',
    source: 'HRM System',
    timestamp: '2025-05-01T10:15:00Z',
    reportYear: 2025,
  },
];

export default function DataPage() {
  const [search, setSearch] = useState('');
  const [data, setData] = useState<ESGData[]>(mockData);
  const [openDialog, setOpenDialog] = useState(false);
  const [form, setForm] = useState<Partial<ESGData>>({
    indicator: '',
    value: 0,
    unit: '',
    source: '',
    timestamp: '',
    reportYear: new Date().getFullYear(),
  });
  const [selected, setSelected] = useState<number[]>([]);

  const filteredData = data.filter((item) =>
    item.indicator.toLowerCase().includes(search.toLowerCase())
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.indicator || !form.unit || !form.value || !form.timestamp) {
      toast.error('Vui lòng nhập đầy đủ thông tin');
      return;
    }
    const newId = data.length ? Math.max(...data.map((d) => d.id)) + 1 : 1;
    const newData = { ...form, id: newId } as ESGData;
    setData([...data, newData]);
    toast.success('Thêm dữ liệu thành công');
    setForm({ indicator: '', value: 0, unit: '', source: '', timestamp: '', reportYear: new Date().getFullYear() });
    setOpenDialog(false);
  };

  const handleDelete = (id: number) => {
    if (confirm('Bạn có chắc muốn xoá dữ liệu này không?')) {
      setData(data.filter((d) => d.id !== id));
      setSelected((prev) => prev.filter((sid) => sid !== id));
      toast.success('Đã xoá dữ liệu');
    }
  };

  const handleDeleteSelected = () => {
    if (confirm('Bạn có chắc muốn xoá các dòng đã chọn?')) {
      setData(data.filter((d) => !selected.includes(d.id)));
      setSelected([]);
      toast.success('Đã xoá các dòng được chọn');
    }
  };

  const handleToggleAll = () => {
    if (selected.length === filteredData.length) {
      setSelected([]);
    } else {
      setSelected(filteredData.map((d) => d.id));
    }
  };

  const handleToggleOne = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  return (
    <>
      <Head title="Dữ liệu ESG" />
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Dữ liệu ESG
          </h1>
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button>Thêm dữ liệu mới</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Thêm dữ liệu ESG</DialogTitle>
              </DialogHeader>
              <div className="grid gap-3">
                <Input name="indicator" value={form.indicator} onChange={handleChange} placeholder="Chỉ số" />
                <Input name="value" value={form.value} type="number" onChange={handleChange} placeholder="Giá trị" />
                <Input name="unit" value={form.unit} onChange={handleChange} placeholder="Đơn vị" />
                <Input name="source" value={form.source} onChange={handleChange} placeholder="Nguồn" />
                <Input name="timestamp" type="datetime-local" value={form.timestamp} onChange={handleChange} placeholder="Thời gian" />
                <Input name="reportYear" type="number" value={form.reportYear} onChange={handleChange} placeholder="Năm báo cáo" />
              </div>
              <DialogFooter className="mt-4">
                <Button variant="outline" onClick={() => setOpenDialog(false)}>Huỷ</Button>
                <Button onClick={handleSubmit}>Lưu</Button>
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

        <div className="bg-white dark:bg-gray-900 shadow rounded-xl p-6 border border-gray-200 dark:border-gray-700 space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-gray-700 dark:text-gray-300">
              Dữ liệu nhập từ các chỉ số ESG thực tế.
            </p>
            <Input
              placeholder="Tìm kiếm chỉ số..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-64"
            />
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <input
                    type="checkbox"
                    checked={selected.length === filteredData.length && filteredData.length > 0}
                    onChange={handleToggleAll}
                  />
                </TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Chỉ số</TableHead>
                <TableHead>Giá trị</TableHead>
                <TableHead>Đơn vị</TableHead>
                <TableHead>Nguồn</TableHead>
                <TableHead>Thời gian nhập</TableHead>
                <TableHead>Năm báo cáo</TableHead>
                <TableHead className="text-center">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={selected.includes(item.id)}
                        onChange={() => handleToggleOne(item.id)}
                      />
                    </TableCell>
                    <TableCell>{item.id}</TableCell>
                    <TableCell className="font-medium">{item.indicator}</TableCell>
                    <TableCell className="text-blue-700 font-semibold">{item.value}</TableCell>
                    <TableCell>{item.unit}</TableCell>
                    <TableCell>{item.source || '-'}</TableCell>
                    <TableCell>{format(new Date(item.timestamp), 'dd/MM/yyyy HH:mm')}</TableCell>
                    <TableCell><Badge variant="outline">{item.reportYear}</Badge></TableCell>
                    <TableCell className="text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="center">
                          <DropdownMenuItem onClick={() => alert(`Xem dữ liệu ID ${item.id}`)}>Xem</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => alert(`Sửa dữ liệu ID ${item.id}`)}>Sửa</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(item.id)} className="text-red-600">Xoá</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-4 text-gray-500">
                    Không có dữ liệu phù hợp
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

DataPage.layout = (page: React.ReactNode) => (
  <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>
);
