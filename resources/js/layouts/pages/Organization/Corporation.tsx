import AppLayout from '@/layouts/app-layout';

export default function CorporationsPage() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Quản lý Tập đoàn</h1>
      <p>Trang hiển thị danh sách tập đoàn.</p>
    </div>
  );
}

// Gắn layout
CorporationsPage.layout = (page: React.ReactNode) => (
  <AppLayout>{page}</AppLayout>
);
