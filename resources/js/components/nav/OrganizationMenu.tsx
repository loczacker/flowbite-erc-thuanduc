import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Link, usePage } from '@inertiajs/react';
import { Building, Factory, Layers, Users, ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const ORG_MENU_ITEMS = [
    { title: "Tập đoàn", href: "/organization/corporations" },
    { title: "Công ty", href: "/organization/companies" },
    { title: "Nhà máy", href: "/organization/factories" },
    { title: "Phòng ban", href: "/organization/departments" },
];

export function OrganizationMenu() {
    const page = usePage();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger asChild>
                <button className="flex w-full items-center justify-between py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700">
                    <span>Quản lý tổ chức</span>
                    {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </button>
            </CollapsibleTrigger>

            <CollapsibleContent>
                <SidebarMenu>
                    {ORG_MENU_ITEMS.map((item) => (
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
