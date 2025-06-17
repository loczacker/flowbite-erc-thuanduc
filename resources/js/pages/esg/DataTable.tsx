// Full version with Excel import/export, dynamic column widths, file path display, import preview and save/cancel functionality
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { useState, useMemo } from 'react';
import * as XLSX from 'xlsx';
import { toast } from 'sonner';
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
  { title: 'Bảng dữ liệu ESG', href: '/esg/data-table' },
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

const exportableColumns: { label: string; key: keyof EsgDataRow }[] = [
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
];

const sampleData: EsgDataRow[] = Array.from({ length: 20 }).map((_, i) => ({
  id: i + 1,
  reportYear: 2024,
  indicatorName: `Chỉ số ${i + 1}`,
  value: Math.random() * 1000,
  unit: 'tấn',
  source: 'Nguồn mẫu',
  timestamp: '2024-06-01 10:00:00',
  note: `Ghi chú mẫu ${i + 1}`,
  dataQuality: 'Raw',
  validatedBy: 'Nguyễn Văn A',
  validatedAt: '2024-06-02 14:00:00',
}));

export default function DataTablePage() {
  const [data, setData] = useState<EsgDataRow[]>(sampleData);
  const [importData, setImportData] = useState<EsgDataRow[] | null>(null);
  const [filePath, setFilePath] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<keyof EsgDataRow>('id');
  const [sortAsc, setSortAsc] = useState(true);

  const dataToDisplay = importData ?? data;

  const sortedData = useMemo(() => {
    return [...dataToDisplay].sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];
      if (aValue == null) return 1;
      if (bValue == null) return -1;
      if (typeof aValue === 'number' && typeof bValue === 'number')
        return sortAsc ? aValue - bValue : bValue - aValue;
      return sortAsc
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });
  }, [dataToDisplay, sortKey, sortAsc]);

  const pagedData = useMemo(() => {
    const start = (currentPage - 1) * 10;
    return sortedData.slice(start, start + 10);
  }, [currentPage, sortedData]);

  const totalPages = Math.ceil(sortedData.length / 10);

  const handleSort = (key: keyof EsgDataRow) => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    worksheet['!cols'] = exportableColumns.map(() => ({ wch: 25 }));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'ESG');
    XLSX.writeFile(workbook, 'esg_bao_cao.xlsx');
  };

  const handleImportExcel = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFilePath(file.name);

    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target?.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      const wsName = wb.SheetNames[0];
      const ws = wb.Sheets[wsName];
      const json = XLSX.utils.sheet_to_json(ws);

      const imported = json.map((row: any, index: number): EsgDataRow => ({
        id: +row['ID'] || index + 1,
        reportYear: +row['Năm báo cáo'] || 0,
        indicatorName: row['Chỉ số ESG'] || '',
        value: +row['Giá trị'] || 0,
        unit: row['Đơn vị'] || '',
        source: row['Nguồn dữ liệu'] || '',
        timestamp: row['Thời gian nhập'] || '',
        note: row['Ghi chú'] || '',
        dataQuality: row['Chất lượng dữ liệu'] || 'Raw',
        validatedBy: row['Người xác thực'] || '',
        validatedAt: row['Thời gian xác thực'] || '',
      }));

      setImportData(imported);
      setCurrentPage(1);
      toast.success('Đã nhập file, vui lòng kiểm tra và xác nhận.');
    };
    reader.readAsBinaryString(file);
  };

  return (
    <>
      <Head title="Bảng dữ liệu ESG" />
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Bảng dữ liệu ESG</h1>

        <div className="flex justify-between gap-4 flex-wrap items-center">
          <div className="flex items-center gap-2">
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={handleImportExcel}
              className="border px-2 py-1 text-sm"
            />
            {filePath && (
              <span className="text-sm text-muted-foreground">{filePath}</span>
            )}
            {importData ? (
              <>
                <Button
                  size="sm"
                  variant="success"
                  onClick={() => {
                    setData(importData);
                    setImportData(null);
                    setFilePath('');
                    toast.success('Dữ liệu đã được lưu.');
                  }}
                >
                  Lưu dữ liệu
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => {
                    setImportData(null);
                    setFilePath('');
                    toast('Đã huỷ dữ liệu import.');
                  }}
                >
                  Huỷ
                </Button>
              </>
            ) : (
              <Button
                size="sm"
                variant="destructive"
                onClick={() => {
                  setData(sampleData);
                  setCurrentPage(1);
                }}
              >
                Xoá dữ liệu đã import
              </Button>
            )}
          </div>
          <Button onClick={handleExportExcel}>Xuất Excel</Button>
        </div>

        <div className="border rounded-xl overflow-auto bg-white shadow p-4">
          <Table>
            <TableHeader>
              <TableRow>
                {exportableColumns.map(({ label, key }) => (
                  <TableHead key={key} onClick={() => handleSort(key)} className="cursor-pointer">
                    {label} {sortKey === key ? (sortAsc ? '▲' : '▼') : ''}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {pagedData.map((item) => (
                <TableRow key={item.id}>
                  {exportableColumns.map(({ key }) => (
                    <TableCell key={key}>{String(item[key] ?? '')}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-center gap-2">
          <Button size="sm" onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}>
            Trước
          </Button>
          {[...Array(totalPages)].map((_, i) => (
            <Button
              key={i + 1}
              size="sm"
              variant={currentPage === i + 1 ? 'default' : 'outline'}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
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
