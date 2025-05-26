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
import { format } from 'date-fns';
import { useState } from 'react';

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

  const filteredData = data.filter((item) =>
    item.indicator.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Head title="Dữ liệu ESG" />
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Dữ liệu ESG
        </h1>

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
                <TableHead>#</TableHead>
                <TableHead>Chỉ số</TableHead>
                <TableHead>Giá trị</TableHead>
                <TableHead>Đơn vị</TableHead>
                <TableHead>Nguồn</TableHead>
                <TableHead>Thời gian nhập</TableHead>
                <TableHead>Năm báo cáo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item, idx) => (
                <TableRow key={item.id}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell className="font-medium">{item.indicator}</TableCell>
                  <TableCell className="text-blue-700 font-semibold">{item.value}</TableCell>
                  <TableCell>{item.unit}</TableCell>
                  <TableCell>{item.source || '-'}</TableCell>
                  <TableCell>{format(new Date(item.timestamp), 'dd/MM/yyyy HH:mm')}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.reportYear}</Badge>
                  </TableCell>
                </TableRow>
              ))}
              {filteredData.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4 text-gray-500">
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
