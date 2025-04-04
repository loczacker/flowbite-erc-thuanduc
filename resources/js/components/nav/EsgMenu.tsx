import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Link, usePage } from '@inertiajs/react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const ESG_MENU_ITEMS = [
    { title: "Danh mục ESG", href: "/esg/categories" },
    { title: "Chỉ số ESG", href: "/esg/indicators" },
    { title: "Báo cáo ESG", href: "/esg/reports" },
    { title: "Dữ liệu ESG", href: "/esg/data" },
    { title: "Dự án ESG", href: "/esg/projects" },
    { title: "Nhiệm vụ ESG", href: "/esg/tasks" },
    { title: "Kiểm toán ESG", href: "/esg/audit" },
    { title: "Chính sách ESG", href: "/esg/policies" },
    { title: "Bảng dữ liệu ESG", href: "/esg/data-table" },
];

export function EsgMenu() {
    const page = usePage();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger asChild>
                <button className="flex w-full items-center justify-between py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700">
                    <span>Quản lý ESG</span>
                    {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </button>
            </CollapsibleTrigger>

            <CollapsibleContent>
                <SidebarMenu>
                    {ESG_MENU_ITEMS.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild isActive={item.href === page.url}>
                                <Link href={item.href} prefetch>
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </CollapsibleContent>
        </Collapsible>
    );
}
