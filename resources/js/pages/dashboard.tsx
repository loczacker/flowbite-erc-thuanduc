import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart2, Users, Settings } from 'lucide-react';
import { ResponsiveLine } from '@nivo/line';
import { ResponsivePie } from '@nivo/pie';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/dashboard' },
];

// Dữ liệu mẫu cho biểu đồ Line và Pie
const lineData = [
  {
    id: 'Chỉ số ESG',
    color: 'hsl(204, 70%, 50%)',
    data: [
      { x: 'Tháng 1', y: 50 },
      { x: 'Tháng 2', y: 60 },
      { x: 'Tháng 3', y: 80 },
      { x: 'Tháng 4', y: 70 },
      { x: 'Tháng 5', y: 90 },
    ],
  },
  // Bạn có thể thêm nhiều dòng khác nếu muốn thử
  // {
  //   id: 'Chỉ số khác',
  //   color: 'hsl(100, 70%, 50%)',
  //   data: [
  //     { x: 'Tháng 1', y: 30 },
  //     { x: 'Tháng 2', y: 45 },
  //     { x: 'Tháng 3', y: 50 },
  //     { x: 'Tháng 4', y: 60 },
  //     { x: 'Tháng 5', y: 80 },
  //   ],
  // },
];

const pieData = [
  { id: 'Môi trường', label: 'Môi trường', value: 40 },
  { id: 'Xã hội', label: 'Xã hội', value: 35 },
  { id: 'Quản trị', label: 'Quản trị', value: 25 },
];

// Theme light cho Nivo charts
const nivoLightTheme = {
  textColor: 'hsl(var(--foreground))',
  axis: {
    ticks: { text: { fill: 'hsl(var(--foreground))' } },
    legend: { text: { fill: 'hsl(var(--foreground))' } },
  },
  grid: { line: { stroke: '#e5e7eb', strokeDasharray: '4 4' } },
  tooltip: {
    container: {
      background: 'hsl(var(--popover))',
      color: 'hsl(var(--foreground))',
    },
  },
};

// Theme dark cho Nivo charts
const nivoDarkTheme = {
  textColor: 'hsl(var(--foreground))',
  axis: {
    ticks: { text: { fill: 'hsl(var(--foreground))' } },
    legend: { text: { fill: 'hsl(var(--foreground))' } },
  },
  grid: { line: { stroke: '#374151', strokeDasharray: '4 4' } },
  tooltip: {
    container: {
      background: 'hsl(var(--popover))',
      color: 'hsl(var(--foreground))',
    },
  },
};

export default function Dashboard() {
  const [isDark, setIsDark] = useState(false);

  // State quản lý ẩn/hiện từng dòng của biểu đồ Line
  const [visibleLines, setVisibleLines] = useState<string[]>(lineData.map((line) => line.id));

  // State quản lý ẩn/hiện từng phần của biểu đồ Pie
  const [visiblePieSlices, setVisiblePieSlices] = useState<string[]>(pieData.map((slice) => slice.id));

  useEffect(() => {
    const html = document.documentElement;

    function updateDarkMode() {
      if (html.classList.contains('dark')) {
        setIsDark(true);
      } else {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setIsDark(mediaQuery.matches);
      }
    }
    updateDarkMode();

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', updateDarkMode);

    return () => mediaQuery.removeEventListener('change', updateDarkMode);
  }, []);

  function toggleLineVisibility(id: string) {
    setVisibleLines((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }

  function togglePieSliceVisibility(id: string) {
    setVisiblePieSlices((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }

  // Lọc dữ liệu chỉ lấy dòng/miền được chọn
  const filteredLineData = lineData.filter((line) => visibleLines.includes(line.id));
  const filteredPieData = pieData.filter((slice) => visiblePieSlices.includes(slice.id));

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      <div className="flex flex-col gap-6 p-4">
        {/* Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Tổng người dùng</CardTitle>
              <Users className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,700</div>
              <p className="text-xs text-muted-foreground">+20% so với tháng trước</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Số lượng người đăng nhập</CardTitle>
              <BarChart2 className="h-5 w-5 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">856</div>
              <p className="text-xs text-muted-foreground">+10% so với tháng trước</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Thiết lập hệ thống</CardTitle>
              <Settings className="h-5 w-5 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-2">
                <Button variant="outline" size="sm" className="w-full">Cấu hình hệ thống</Button>
                <Button variant="secondary" size="sm" className="w-full">Quản lý quyền</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Biểu đồ Line */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground">Biểu đồ chỉ số ESG theo thời gian</CardTitle>
              <div className="flex flex-wrap gap-4 mt-2">
                {lineData.map((line) => (
                  <label
                    key={line.id}
                    className="inline-flex items-center space-x-2 cursor-pointer select-none"
                  >
                    <input
                      type="checkbox"
                      checked={visibleLines.includes(line.id)}
                      onChange={() => toggleLineVisibility(line.id)}
                      className="form-checkbox h-4 w-4"
                    />
                    <span>{line.id}</span>
                  </label>
                ))}
              </div>
            </CardHeader>
            <CardContent className="h-[320px]">
              <ResponsiveLine
                data={filteredLineData}
                theme={isDark ? nivoDarkTheme : nivoLightTheme}
                margin={{ top: 20, right: 30, bottom: 50, left: 50 }}
                xScale={{ type: 'point' }}
                yScale={{ type: 'linear', min: 0, max: 'auto', stacked: false, reverse: false }}
                axisBottom={{
                  tickRotation: -20,
                  tickSize: 5,
                  tickPadding: 5,
                  legend: 'Tháng',
                  legendPosition: 'middle',
                  legendOffset: 40,
                }}
                axisLeft={{
                  legend: 'Điểm ESG',
                  legendOffset: -40,
                  legendPosition: 'middle',
                  tickSize: 5,
                  tickPadding: 5,
                }}
                colors={{ scheme: 'nivo' }}
                pointSize={8}
                useMesh={true}
              />
            </CardContent>

            {/* Bảng số liệu Line */}
            <CardContent className="overflow-x-auto">
              <table className="w-full text-sm border-collapse border border-slate-200 dark:border-slate-700">
                <thead className="bg-muted text-muted-foreground dark:bg-muted/30 dark:text-muted-foreground/80">
                  <tr>
                    <th className="border border-slate-300 dark:border-slate-600 px-3 py-1 text-left">Tháng</th>
                    {visibleLines.map((id) => (
                      <th
                        key={id}
                        className="border border-slate-300 dark:border-slate-600 px-3 py-1 text-left"
                      >
                        {id}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Dòng đầu tiên có đầy đủ các tháng, lấy làm chuẩn */}
                  {lineData[0].data.map(({ x }, i) => (
                    <tr key={x} className="hover:bg-muted/50 dark:hover:bg-muted/40">
                      <td className="border border-slate-300 dark:border-slate-600 px-3 py-1">{x}</td>
                      {visibleLines.map((id) => {
                        const line = lineData.find((l) => l.id === id);
                        return (
                          <td key={id} className="border border-slate-300 dark:border-slate-600 px-3 py-1">
                            {line?.data[i]?.y ?? '-'}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>

          {/* Biểu đồ Pie */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground">Tỉ trọng ESG theo lĩnh vực</CardTitle>
              <div className="flex flex-wrap gap-4 mt-2">
                {pieData.map((slice) => (
                  <label
                    key={slice.id}
                    className="inline-flex items-center space-x-2 cursor-pointer select-none"
                  >
                    <input
                      type="checkbox"
                      checked={visiblePieSlices.includes(slice.id)}
                      onChange={() => togglePieSliceVisibility(slice.id)}
                      className="form-checkbox h-4 w-4"
                    />
                    <span>{slice.label}</span>
                  </label>
                ))}
              </div>
            </CardHeader>
            <CardContent className="h-[320px]">
              <ResponsivePie
                data={filteredPieData}
                theme={isDark ? nivoDarkTheme : nivoLightTheme}
                margin={{ top: 20, right: 20, bottom: 40, left: 20 }}
                innerRadius={0.5}
                padAngle={1}
                cornerRadius={3}
                activeOuterRadiusOffset={8}
                colors={{ scheme: 'paired' }}
                borderWidth={1}
                borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                arcLinkLabelsSkipAngle={10}
                arcLinkLabelsTextColor="inherit"
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: 'color' }}
                arcLabelsTextColor="inherit"
              />
            </CardContent>

            {/* Bảng số liệu Pie */}
            <CardContent className="overflow-x-auto">
              <table className="w-full text-sm border-collapse border border-slate-200 dark:border-slate-700">
                <thead className="bg-muted text-muted-foreground dark:bg-muted/30 dark:text-muted-foreground/80">
                  <tr>
                    <th className="border border-slate-300 dark:border-slate-600 px-3 py-1 text-left">Lĩnh vực</th>
                    <th className="border border-slate-300 dark:border-slate-600 px-3 py-1 text-left">Giá trị</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPieData.map(({ id, label, value }) => (
                    <tr
                      key={id}
                      className="hover:bg-muted/50 dark:hover:bg-muted/40"
                    >
                      <td className="border border-slate-300 dark:border-slate-600 px-3 py-1">{label}</td>
                      <td className="border border-slate-300 dark:border-slate-600 px-3 py-1">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
