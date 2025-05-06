import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart2, Users, Settings } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                {/* Top 3 cards */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <Card className="shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Tổng người dùng
                            </CardTitle>
                            <Users className="h-5 w-5 text-primary" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">1,700</div>
                            <p className="text-xs text-muted-foreground">+20% so với tháng trước</p>
                        </CardContent>
                    </Card>

                    <Card className="shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Số lượng người đăng nhập
                            </CardTitle>
                            <BarChart2 className="h-5 w-5 text-success" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">856</div>
                            <p className="text-xs text-muted-foreground">+10% so với tháng trước</p>
                        </CardContent>
                    </Card>

                    <Card className="shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Thiết lập hệ thống
                            </CardTitle>
                            <Settings className="h-5 w-5 text-warning" />
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col space-y-2">
                                <Button variant="outline" size="sm" className="w-full">
                                    Cấu hình hệ thống
                                </Button>
                                <Button variant="secondary" size="sm" className="w-full">
                                    Quản lý quyền
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Big section */}
                <div className="border-sidebar-border/70 dark:border-sidebar-border flex-1 overflow-hidden rounded-xl border p-6">
                    <h3 className="text-lg font-semibold mb-4">Báo cáo tổng quan</h3>

                    {/* Placeholder - sau này gắn chart hoặc data table */}
                    <div className="flex items-center justify-center h-96 border-2 border-dashed rounded-lg border-muted-foreground/30">
                        <span className="text-muted-foreground">Biểu đồ thống kê sẽ hiển thị ở đây</span>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
