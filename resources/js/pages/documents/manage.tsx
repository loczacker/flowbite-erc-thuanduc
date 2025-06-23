// File: resources/js/Pages/Documents/manage.tsx

import React, { useState } from 'react';
import { Head, Link, usePage, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { type Document } from '@/types';

export default function DocumentManage() {
  const { documents = [] } = usePage().props as { documents: Document[] };
  const [filter, setFilter] = useState('');

  const filteredDocs = documents.filter(doc =>
    doc.title.toLowerCase().includes(filter.toLowerCase()) ||
    doc.category?.toLowerCase().includes(filter.toLowerCase()) ||
    doc.factory?.toLowerCase().includes(filter.toLowerCase()) ||
    doc.company?.toLowerCase().includes(filter.toLowerCase()) ||
    doc.issued_by?.toLowerCase().includes(filter.toLowerCase())
  );

  const handleDelete = (id: number) => {
    if (confirm('Bạn có chắc chắn muốn xoá tài liệu này?')) {
      router.delete(`/documents/${id}`);
    }
  };

  const getFileExt = (path: string): string => {
    return path?.split('.').pop()?.toLowerCase() || '';
  };

  return (
    <AppLayout title="Quản lý Tài liệu">
      <Head title="Quản lý Tài liệu" />
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">📂 Quản lý Tài liệu</h1>
          <Link href="/documents/create">
            <Button>➕ Thêm tài liệu</Button>
          </Link>
        </div>

        <div>
          <Label className="font-semibold">🔍 Tìm kiếm (Tên / Lĩnh vực / Nhà máy ...)</Label>
          <Input
            placeholder="Nhập từ khoá..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="max-w-xl"
          />
        </div>

        <ScrollArea className="overflow-auto max-h-[75vh] border rounded">
          <table className="w-full table-auto text-sm border-collapse">
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr>
                <th className="border p-2">#</th>
                <th className="border p-2 text-left">Tên</th>
                <th className="border p-2 text-left">Công ty</th>
                <th className="border p-2 text-left">Nhà máy</th>
                <th className="border p-2 text-left">Lĩnh vực</th>
                <th className="border p-2 text-left">Cơ quan cấp</th>
                <th className="border p-2 text-left">Ngày cấp</th>
                <th className="border p-2 text-left">Ngày hết hiệu lực</th>
                <th className="border p-2 text-left">Định dạng</th>
                <th className="border p-2 text-left">Ghi chú</th>
                <th className="border p-2 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocs.map((doc, index) => (
                <tr key={doc.id} className="border-t hover:bg-gray-50">
                  <td className="border p-2 text-center">{index + 1}</td>
                  <td className="border p-2">{doc.title}</td>
                  <td className="border p-2">{doc.company || '-'}</td>
                  <td className="border p-2">{doc.factory || '-'}</td>
                  <td className="border p-2">{doc.category || '-'}</td>
                  <td className="border p-2">{doc.issued_by || '-'}</td>
                  <td className="border p-2">{doc.issued_date || '-'}</td>
                  <td className="border p-2">{doc.expired_date || '-'}</td>
                  <td className="border p-2">{getFileExt(doc.file_path)}</td>
                  <td className="border p-2 truncate max-w-xs">{doc.note || '-'}</td>
                  <td className="border p-2 text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost">⋮</Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => router.visit(`/documents/${doc.id}/edit`)}>✏️ Sửa</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => window.open(route('documents.view', doc.id), '_blank')}>👁️ Xem</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(doc.id)}>🗑️ Xoá</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollArea>
      </div>
    </AppLayout>
  );
}
