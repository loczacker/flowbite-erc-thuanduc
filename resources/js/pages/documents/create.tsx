import { Head, useForm, usePage, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
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
  const { data, setData, post, processing, errors, reset } = useForm({
    title: '',
    file_path: '',
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/documents', {
      onSuccess: () => reset(),
    });
  };

  const { props } = usePage<{
    message?: string;
    documents?: DocumentItem[];
  }>();

  const message = props.message;
  const documents = props.documents ?? [];

  const handleDelete = (id: number) => {
    if (confirm('Bạn có chắc chắn muốn xoá?')) {
      router.delete(`/documents/${id}`);
    }
  };

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
            <Label htmlFor="file_path">Đường dẫn file</Label>
            <Input
              id="file_path"
              value={data.file_path}
              onChange={(e) => setData('file_path', e.target.value)}
              className="mt-1"
            />
            {errors.file_path && <p className="text-red-600 text-sm">{errors.file_path}</p>}
          </div>

          <Button type="submit" disabled={processing}>
            Lưu Tài liệu
          </Button>
        </form>

        {message && (
          <div className="p-4 bg-green-100 border border-green-300 text-green-800 rounded mt-4">
            {message}
          </div>
        )}

        {documents.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4">Danh sách Tài liệu</h2>
            <table className="w-full table-auto border-collapse border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2">#</th>
                  <th className="border p-2 text-left">Tiêu đề</th>
                  <th className="border p-2 text-left">Tệp</th>
                  <th className="border p-2">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc, index) => (
                  <tr key={doc.id} className="border-t">
                    <td className="border p-2 text-center">{index + 1}</td>
                    <td className="border p-2">{doc.title}</td>
                    <td className="border p-2 break-all text-blue-700 underline">
                      <a
                        href={`file:///${doc.file_path.replace(/\\/g, '/')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {doc.file_path}
                      </a>
                    </td>
                    <td className="border p-2 text-center">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(doc.id)}
                      >
                        Xoá
                      </Button>
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