import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Bảng dữ liệu ESG',
    href: '/esg/data-table',
  },
];

type EsgDataRow = {
  id: number;
  reportYear: number;
  indicatorName: string;
  value: number;
  unit: string;
  source?: string | null;
  timestamp: string;
  note?: string | null;
  dataQuality: 'Raw' | 'Verified' | 'Estimated';
  validatedBy?: string | null;
  validatedAt?: string | null;
};

const dataSamples: EsgDataRow[] = [
  {
    id: 1,
    reportYear: 2024,
    indicatorName: 'Lượng CO2 phát thải',
    value: 1234.56,
    unit: 'tấn',
    source: 'Báo cáo đo đếm thực tế',
    timestamp: '2024-04-20 10:00:00',
    note: 'Dữ liệu đo từ nhà máy chính',
    dataQuality: 'Verified',
    validatedBy: 'Nguyễn Văn A',
    validatedAt: '2024-04-22 14:30:00',
  },
  {
    id: 2,
    reportYear: 2024,
    indicatorName: 'Tỉ lệ sử dụng năng lượng tái tạo',
    value: 45.8,
    unit: '%',
    source: 'Hệ thống ERP',
    timestamp: '2024-04-20 09:45:00',
    note: '',
    dataQuality: 'Raw',
    validatedBy: null,
    validatedAt: null,
  },
  // ... có thể bổ sung thêm mẫu dữ liệu nếu cần
];

export default function DataTablePage() {
  // State pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // State sort: key và chiều (asc/desc)
  const [sortKey, setSortKey] = useState<keyof EsgDataRow>('id');
  const [sortAsc, setSortAsc] = useState(true);

  // Sắp xếp dữ liệu dựa theo sortKey và sortAsc
  const sortedData = useMemo(() => {
    return [...dataSamples].sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];

      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortAsc ? aValue - bValue : bValue - aValue;
      }
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortAsc
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      return 0;
    });
  }, [dataSamples, sortKey, sortAsc]);

  // Dữ liệu trang hiện tại
  const pagedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(start, start + itemsPerPage);
  }, [currentPage, sortedData]);

  // Đổi chiều sort hoặc cột sort
  function handleSort(key: keyof EsgDataRow) {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  }

  // Số trang
  const totalPages = Math.ceil(dataSamples.length / itemsPerPage);

  return (
    <>
      <Head title="Bảng dữ liệu ESG" />
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Bảng dữ liệu ESG
        </h1>

        <div className="bg-white dark:bg-gray-900 shadow rounded-xl p-6 border border-gray-200 dark:border-gray-700 overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {[
                  { label: 'ID', key: 'id' },
                  { label: 'Năm báo cáo', key: 'reportYear' },
                  { label: 'Chỉ số ESG', key: 'indicatorName' },
                  { label: 'Giá trị', key: 'value' },
                  { label: 'Đơn vị', key: 'unit' },
                  { label: 'Nguồn dữ liệu', key: 'source' },
                  { label: 'Thời gian nhập', key: 'timestamp' },
                  { label: 'Ghi chú', key: 'note' },
                  { label: 'Chất lượng dữ liệu', key: 'dataQuality' },
                  { label: 'Người xác thực', key: 'validatedBy' },
                  { label: 'Thời gian xác thực', key: 'validatedAt' },
                ].map(({ label, key }) => (
                  <TableHead
                    key={key}
                    className="cursor-pointer select-none"
                    onClick={() => handleSort(key as keyof EsgDataRow)}
                  >
                    {label}
                    {sortKey === key && (
                      <span>{sortAsc ? ' ▲' : ' ▼'}</span>
                    )}
                  </TableHead>
                ))}
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {pagedData.length > 0 ? (
                pagedData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.reportYear}</TableCell>
                    <TableCell>{item.indicatorName}</TableCell>
                    <TableCell>{item.value}</TableCell>
                    <TableCell>{item.unit}</TableCell>
                    <TableCell>{item.source || '-'}</TableCell>
                    <TableCell>{item.timestamp}</TableCell>
                    <TableCell title={item.note} className="max-w-xs truncate">
                      {item.note || '-'}
                    </TableCell>
                    <TableCell>{item.dataQuality}</TableCell>
                    <TableCell>{item.validatedBy || '-'}</TableCell>
                    <TableCell>{item.validatedAt || '-'}</TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">
                        Xem
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={13} className="text-center py-4 text-gray-500">
                    Không có dữ liệu ESG nào
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center space-x-2 mt-4">
          <Button
            size="sm"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Trước
          </Button>
          {[...Array(totalPages).keys()].map((page) => (
            <Button
              key={page + 1}
              size="sm"
              variant={currentPage === page + 1 ? 'default' : 'outline'}
              onClick={() => setCurrentPage(page + 1)}
            >
              {page + 1}
            </Button>
          ))}
          <Button
            size="sm"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Sau
          </Button>
        </div>
      </div>
    </>
  );
}

DataTablePage.layout = (page: React.ReactNode) => (
  <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>
);
