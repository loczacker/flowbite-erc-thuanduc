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
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Phân công chức vụ',
    href: '/organization/employee-positions',
  },
];

type EmployeePosition = {
  id: number;
  employee: string;
  company: string;
  factory: string;
  department: string;
  position: string;
  assignment_type: string;
  start_date: string | null;
  end_date: string | null;
  is_active: boolean;
};

const mockData: EmployeePosition[] = [
  {
    id: 1,
    employee: 'Nguyễn Văn A',
    company: 'Công ty ABC',
    factory: 'Nhà máy Số 1',
    department: 'Phòng Sản xuất',
    position: 'Trưởng phòng Sản xuất',
    assignment_type: 'Full-time',
    start_date: '2023-01-15',
    end_date: null,
    is_active: true,
  },
  {
    id: 2,
    employee: 'Lê Thị B',
    company: 'Công ty XYZ',
    factory: 'Kho hàng Trung tâm',
    department: 'Phòng Kho vận',
    position: 'Nhân viên Kho',
    assignment_type: 'Part-time',
    start_date: '2022-06-01',
    end_date: '2023-12-31',
    is_active: false,
  },
];

export default function EmployeePositionsPage() {
  const [selected, setSelected] = useState<number[]>([]);
  const [search, setSearch] = useState('');

  const toggleSelect = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const isAllSelected = mockData.length > 0 && selected.length === mockData.length;
  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelected([]);
    } else {
      setSelected(filteredData.map((item) => item.id));
    }
  };

  const filteredData = mockData.filter((item) =>
    item.employee.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Head title="Quản lý Phân công Chức vụ Nhân viên" />
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Danh sách phân công chức vụ nhân viên
          </h1>

          {selected.length > 0 && (
            <Button variant="destructive" onClick={() => alert('Xóa các dòng đã chọn')}>
              <Trash2 className="w-4 h-4 mr-2" />
              Xóa {selected.length} dòng
            </Button>
          )}
        </div>

        <Input
          placeholder="Tìm kiếm theo tên nhân viên..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-sm"
        />

        <div className="overflow-auto bg-white dark:bg-gray-900 shadow rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <Table>
            {/* <TableHeader className="bg-gray-100 dark:bg-gray-800"> */}
            <TableHeader >
              <TableRow>
                <TableHead>
                  <Checkbox
                    checked={isAllSelected}
                    onCheckedChange={toggleSelectAll}
                    aria-label="Chọn tất cả"
                  />
                </TableHead>
                <TableHead>Nhân viên</TableHead>
                <TableHead>Công ty</TableHead>
                <TableHead>Nhà máy</TableHead>
                <TableHead>Phòng ban</TableHead>
                <TableHead>Chức vụ</TableHead>
                <TableHead>Phân công</TableHead>
                <TableHead>Bắt đầu</TableHead>
                <TableHead>Kết thúc</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <TableRow key={item.id} className={!item.is_active ? 'opacity-60 italic' : ''}>
                    <TableCell>
                      <Checkbox
                        checked={selected.includes(item.id)}
                        onCheckedChange={() => toggleSelect(item.id)}
                        aria-label="Chọn dòng"
                      />
                    </TableCell>
                    <TableCell>{item.employee}</TableCell>
                    <TableCell>{item.company}</TableCell>
                    <TableCell>{item.factory}</TableCell>
                    <TableCell>{item.department}</TableCell>
                    <TableCell>{item.position}</TableCell>
                    <TableCell>{item.assignment_type}</TableCell>
                    <TableCell>{item.start_date ?? '-'}</TableCell>
                    <TableCell>{item.end_date ?? '-'}</TableCell>
                    <TableCell>
                      {item.is_active ? (
                        <Badge variant="success">Đang hoạt động</Badge>
                      ) : (
                        <Badge variant="destructive">Ngừng hoạt động</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-5 h-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onSelect={() => alert(`Xem ${item.employee}`)}>
                            Xem chi tiết
                          </DropdownMenuItem>
                          <DropdownMenuItem onSelect={() => alert(`Sửa ${item.employee}`)}>
                            Chỉnh sửa
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onSelect={() => alert(`Xoá ${item.employee}`)}
                          >
                            Xoá
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={11} className="text-center text-gray-500">
                    Không có dữ liệu phù hợp.
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

EmployeePositionsPage.layout = (page: React.ReactNode) => (
  <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>
);
