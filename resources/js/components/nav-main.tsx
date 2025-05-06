import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { EsgMenu } from '@/components/nav/EsgMenu';
import { OrganizationMenu } from '@/components/nav/OrganizationMenu';
import { HrMenu } from '@/components/nav/HrMenu';
import { Link, usePage } from '@inertiajs/react';

export function NavMain() {
    const { url } = usePage();

    return (
        <div>
            {/* Dashboard */}
            <SidebarGroup className="px-2 py-1">
                <SidebarGroupLabel className="pl-0">Dashboard</SidebarGroupLabel>
                <SidebarMenu className="mt-1">
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            isActive={url === '/dashboard'}
                        >
                            <Link href="/dashboard" prefetch className="flex items-center gap-2 text-sm font-medium">
                                <span>Dashboard</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroup>

            {/* Organization */}
            <SidebarGroup className="px-2 py-1">
                <SidebarGroupLabel className="pl-0">Organization</SidebarGroupLabel>
                <SidebarMenu className="mt-1">
                    <OrganizationMenu />
                </SidebarMenu>
            </SidebarGroup>

            {/* Human Resources */}
            <SidebarGroup className="px-2 py-1">
                <SidebarGroupLabel className="pl-0">Human Resources</SidebarGroupLabel>
                <SidebarMenu className="mt-1">
                    <HrMenu />
                </SidebarMenu>
            </SidebarGroup>

            {/* ESG Management */}
            <SidebarGroup className="px-2 py-1">
                <SidebarGroupLabel className="pl-0">ESG Management</SidebarGroupLabel>
                <SidebarMenu className="mt-1">
                    <EsgMenu />
                </SidebarMenu>
            </SidebarGroup>
        </div>
    );
}
