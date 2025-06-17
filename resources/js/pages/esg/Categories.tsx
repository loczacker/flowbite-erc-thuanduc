import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import React, { useState } from 'react';

import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Badge } from '@/components/ui/badge';

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

const FIXED_CATEGORIES: ESGCategory[] = [
  { id: 1, name: 'Môi trường', description: 'Các vấn đề liên quan đến môi trường' },
  { id: 2, name: 'Xã hội', description: 'Vấn đề xã hội và cộng đồng' },
  { id: 3, name: 'Quản trị', description: 'Quản trị doanh nghiệp và tuân thủ pháp luật' },
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState<ESGCategory[]>(FIXED_CATEGORIES);
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
    }
    setForm({ id: 0, name: '', description: '' });
    setEditing(false);
  }

  function handleEdit(cat: ESGCategory) {
    setForm(cat);
    setEditing(true);
  }

  function handleDelete(id: number) {
    alert('Không thể xoá danh mục cố định.');
  }

  function handleCancel() {
    setForm({ id: 0, name: '', description: '' });
    setEditing(false);
  }

  return (
    <>
      <Head title="Danh mục ESG" />
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Danh mục ESG</h1>

        {/* Section: Tổng quan chỉ số ESG */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="bg-green-50 dark:bg-green-900">
            <CardHeader>
              <CardTitle className="text-green-800 dark:text-green-200">Environmental</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-green-900 dark:text-green-100">
              Các chỉ số về môi trường và phát triển bền vững<br />
              <span className="font-semibold">Hoạt động:</span> <Badge variant="success">12</Badge>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 dark:bg-blue-900">
            <CardHeader>
              <CardTitle className="text-blue-800 dark:text-blue-200">Social</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-blue-900 dark:text-blue-100">
              Các yếu tố xã hội và trách nhiệm với cộng đồng<br />
              <span className="font-semibold">Hoạt động:</span> <Badge variant="info">8</Badge>
            </CardContent>
          </Card>

          <Card className="bg-purple-50 dark:bg-purple-900">
            <CardHeader>
              <CardTitle className="text-purple-800 dark:text-purple-200">Governance</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-purple-900 dark:text-purple-100">
              Quản trị doanh nghiệp và tuân thủ pháp luật<br />
              <span className="font-semibold">Hoạt động:</span> <Badge variant="outline">6</Badge>
            </CardContent>
          </Card>
        </div>

        {/* Danh sách danh mục */}
        <Card>
          <CardHeader>
            <CardTitle>Danh sách danh mục</CardTitle>
          </CardHeader>
          <CardContent>
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
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="icon" variant="ghost">
                            <DotsHorizontalIcon className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(cat)}>Sửa</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(cat.id)} className="text-red-500">
                            Xoá
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Form sửa mô tả */}
        {editing && (
          <Card>
            <CardHeader>
              <CardTitle>Cập nhật mô tả danh mục</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Tên danh mục"
                readOnly
              />
              <Textarea
                name="description"
                value={form.description || ''}
                onChange={handleChange}
                placeholder="Mô tả danh mục"
                rows={3}
              />
              <div className="flex gap-2">
                <Button onClick={handleSubmit}>Cập nhật</Button>
                <Button variant="outline" onClick={handleCancel}>Hủy</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
}

CategoriesPage.layout = (page: React.ReactNode) => (
  <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>
);