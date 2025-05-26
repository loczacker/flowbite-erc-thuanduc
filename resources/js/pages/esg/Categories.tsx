import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import React, { useState } from 'react';

import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea'; // sửa import

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Danh mục ESG',
    href: '/esg/categories',
  },
];

type ESGCategory = {
  id: number;
  name: string;
  description?: string | null;
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<ESGCategory[]>([
    { id: 1, name: 'Môi trường', description: 'Các vấn đề liên quan đến môi trường' },
    { id: 2, name: 'Xã hội', description: 'Vấn đề xã hội và cộng đồng' },
  ]);

  const [form, setForm] = useState<ESGCategory>({ id: 0, name: '', description: '' });
  const [editing, setEditing] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit() {
    if (!form.name.trim()) {
      alert('Tên danh mục không được để trống');
      return;
    }
    if (editing) {
      setCategories(categories.map(cat => (cat.id === form.id ? form : cat)));
    } else {
      const newId = categories.length ? Math.max(...categories.map(c => c.id)) + 1 : 1;
      setCategories([...categories, { ...form, id: newId }]);
    }
    setForm({ id: 0, name: '', description: '' });
    setEditing(false);
  }

  function handleEdit(cat: ESGCategory) {
    setForm(cat);
    setEditing(true);
  }

  function handleDelete(id: number) {
    if (confirm('Bạn có chắc muốn xóa danh mục này không?')) {
      setCategories(categories.filter(cat => cat.id !== id));
    }
  }

  function handleCancel() {
    setForm({ id: 0, name: '', description: '' });
    setEditing(false);
  }

  return (
    <>
      <Head title="Danh mục ESG" />
      <div className="p-6 space-y-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Danh mục ESG
        </h1>

        <div className="bg-white dark:bg-gray-900 shadow rounded-xl p-6 border border-gray-200 dark:border-gray-700 space-y-6">
          <p className="text-gray-700 dark:text-gray-300">
            Trang quản lý các danh mục ESG.
          </p>

          {/* Form thêm/sửa */}
          <div className="max-w-md space-y-3">
            <Input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Tên danh mục"
              required
              autoFocus
            />
            <Textarea
              name="description"
              value={form.description || ''}
              onChange={handleChange}
              placeholder="Mô tả danh mục (tuỳ chọn)"
              rows={3}
            />
            <div className="flex gap-2">
              <Button onClick={handleSubmit}>{editing ? 'Cập nhật' : 'Thêm mới'}</Button>
              {editing && (
                <Button variant="outline" onClick={handleCancel}>
                  Hủy
                </Button>
              )}
            </div>
          </div>

          {/* Bảng danh sách */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Tên danh mục</TableHead>
                <TableHead>Mô tả</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map(cat => (
                <TableRow key={cat.id}>
                  <TableCell>{cat.id}</TableCell>
                  <TableCell>{cat.name}</TableCell>
                  <TableCell>{cat.description || '-'}</TableCell>
                  <TableCell className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(cat)}>Sửa</Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(cat.id)}>Xóa</Button>
                  </TableCell>
                </TableRow>
              ))}
              {categories.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-4 text-gray-500">
                    Không có danh mục nào
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

CategoriesPage.layout = (page: React.ReactNode) => (
  <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>
);
