import { Head, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Tài liệu', href: '/documents' },
  { title: 'Thêm mới', href: '/documents/create' },
];

type DocumentItem = {
  id: number;
  title: string;
  file_path: string;
};

export default function DocumentCreate() {
  const { data, setData, post, processing, errors } = useForm({
    title: '',
    file: null as File | null,
  });

  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setData('file', file ?? null);

    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/documents');
  };

  // 🟩 Nhận dữ liệu từ controller
  const { props } = usePage<{
    fileUrl?: string;
    message?: string;
    documents?: DocumentItem[];
  }>();

  const fileUrl = props.fileUrl;
  const message = props.message;
  const documents = props.documents ?? [];

  return (
    <>
      <Head title="Thêm mới Tài liệu" />
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Thêm mới Tài liệu</h1>

        <form onSubmit={submit} className="space-y-4 max-w-lg">
          <div>
            <Label htmlFor="title">Tiêu đề</Label>
            <Input
              id="title"
              value={data.title}
              onChange={(e) => setData('title', e.target.value)}
              className="mt-1"
            />
            {errors.title && <p className="text-red-600 text-sm">{errors.title}</p>}
          </div>

          <div>
            <Label htmlFor="file">Tệp tài liệu</Label>
            <Input
              id="file"
              type="file"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.webp"
              onChange={handleFileChange}
              className="mt-1"
            />
            {errors.file && <p className="text-red-600 text-sm">{errors.file}</p>}
          </div>

          {preview && (
            <div>
              <Label>Xem trước</Label>
              <img src={preview} alt="Preview" className="max-w-xs rounded border mt-2" />
            </div>
          )}

          <Button type="submit" disabled={processing}>
            Lưu Tài liệu
          </Button>
        </form>

        {message && (
          <div className="p-4 bg-green-100 border border-green-300 text-green-800 rounded mt-4">
            {message}
            {fileUrl && (
              <div className="mt-2 text-sm break-all">
                Đường dẫn:{" "}
                <a href={fileUrl} target="_blank" className="text-blue-600 underline">
                  {fileUrl}
                </a>
              </div>
            )}
          </div>
        )}

        {/* 🟩 Hiển thị bảng danh sách tài liệu */}
        {documents.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4">Danh sách Tài liệu</h2>
            <table className="w-full table-auto border-collapse border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2">#</th>
                  <th className="border p-2 text-left">Tiêu đề</th>
                  <th className="border p-2 text-left">Tệp</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc, index) => (
                  <tr key={doc.id} className="border-t">
                    <td className="border p-2 text-center">{index + 1}</td>
                    <td className="border p-2">{doc.title}</td>
                    <td className="border p-2">
                      <a href={doc.file_path} target="_blank" className="text-blue-600 underline">
                        Xem tài liệu
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

DocumentCreate.layout = (page: React.ReactNode) => (
  <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>
);
