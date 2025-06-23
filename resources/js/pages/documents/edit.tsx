import React, { useState, useEffect } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { type Document } from '@/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast, Toaster } from 'sonner';

export default function DocumentIndex() {
  const { documents = [], flash } = usePage().props as { documents: Document[], flash?: { message?: string } };

  const [filters, setFilters] = useState({
    factory: '',
    category: '',
    title: '',
    issued_by: '',
    issued_from: '',
    expired_to: '',
  });

  useEffect(() => {
    if (flash?.message) {
      toast.success(flash.message);
    }
  }, [flash]);

  const handleEdit = (doc: Document) => {
    router.visit(`/documents/${doc.id}/edit`);
  };

  const handleDelete = (id: number) => {
    if (confirm('Bạn có chắc chắn muốn xoá tài liệu này?')) {
      router.delete(`/documents/${id}`);
    }
  };

  const filteredDocuments = documents.filter((doc) => {
    const issuedMatch = !filters.issued_from || (doc.issued_date && doc.issued_date >= filters.issued_from);
    const expiredMatch = !filters.expired_to || (doc.expired_date && doc.expired_date <= filters.expired_to);

    return (
      (!filters.factory || doc.factory?.toLowerCase().includes(filters.factory.toLowerCase())) &&
      (!filters.category || doc.category?.toLowerCase().includes(filters.category.toLowerCase())) &&
      (!filters.title || doc.title?.toLowerCase().includes(filters.title.toLowerCase())) &&
      (!filters.issued_by || doc.issued_by?.toLowerCase().includes(filters.issued_by.toLowerCase())) &&
      issuedMatch &&
      expiredMatch
    );
  });

  const formatDate = (iso: string | null | undefined) => {
    if (!iso) return '-';
    return new Date(iso).toLocaleDateString('vi-VN');
  };

  return (
    <AppLayout title="Danh sách tài liệu">
      <Head title="Tài liệu" />
      <Toaster position="top-right" richColors />

      <div className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Danh sách Tài liệu</h1>
          <Link href="/documents/create">
            <Button>Thêm tài liệu</Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded border">
          <div>
            <Label>Nhà máy</Label>
            <Input value={filters.factory} onChange={(e) => setFilters({ ...filters, factory: e.target.value })} />
          </div>
          <div>
            <Label>Lĩnh vực</Label>
            <Input value={filters.category} onChange={(e) => setFilters({ ...filters, category: e.target.value })} />
          </div>
          <div>
            <Label>Tên tài liệu</Label>
            <Input value={filters.title} onChange={(e) => setFilters({ ...filters, title: e.target.value })} />
          </div>
          <div>
            <Label>Cơ quan cấp</Label>
            <Input value={filters.issued_by} onChange={(e) => setFilters({ ...filters, issued_by: e.target.value })} />
          </div>
          <div>
            <Label>Hiệu lực từ</Label>
            <Input type="date" value={filters.issued_from} onChange={(e) => setFilters({ ...filters, issued_from: e.target.value })} />
          </div>
          <div>
            <Label>Hết hiệu lực đến</Label>
            <Input type="date" value={filters.expired_to} onChange={(e) => setFilters({ ...filters, expired_to: e.target.value })} />
          </div>
        </div>

        <ScrollArea className="w-full overflow-auto">
          <table className="w-full table-auto border border-gray-200 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">#</th>
                <th className="border p-2 text-left">Tên</th>
                <th className="border p-2 text-left">Công ty</th>
                <th className="border p-2 text-left">Nhà máy</th>
                <th className="border p-2 text-left">Lĩnh vực</th>
                <th className="border p-2 text-left">Cơ quan cấp</th>
                <th className="border p-2 text-left">Ngày cấp</th>
                <th className="border p-2 text-left">Ngày hết hiệu lực</th>
                <th className="border p-2 text-left">Ghi chú</th>
                <th className="border p-2 text-left">Số file</th>
                <th className="border p-2 text-left">Ngày tạo</th>
                <th className="border p-2 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocuments.map((doc, index) => {
                const createdAt = new Date(doc.created_at).toLocaleString('vi-VN');
                return (
                  <tr key={doc.id} className="border-t">
                    <td className="border p-2 text-center">{index + 1}</td>
                    <td className="border p-2">{doc.title}</td>
                    <td className="border p-2">{doc.company || '-'}</td>
                    <td className="border p-2">{doc.factory || '-'}</td>
                    <td className="border p-2">{doc.category || '-'}</td>
                    <td className="border p-2">{doc.issued_by || '-'}</td>
                    <td className="border p-2">{formatDate(doc.issued_date)}</td>
                    <td className="border p-2">{formatDate(doc.expired_date)}</td>
                    <td className="border p-2">{doc.note || '-'}</td>
                    <td className="border p-2 text-center">{doc.files?.length || 0}</td>
                    <td className="border p-2">{createdAt}</td>
                    <td className="border p-2 text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost">⋮</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => router.visit(`/documents/${doc.id}`)}>Xem</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEdit(doc)}>Chỉnh sửa</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(doc.id)}>Xoá</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </ScrollArea>
      </div>
    </AppLayout>
  );
}
