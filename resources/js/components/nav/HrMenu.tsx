import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Link, usePage } from '@inertiajs/react';
import { Users, Briefcase, UserCheck, ChevronDown, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import clsx from 'clsx';

const HR_MENU_ITEMS = [
  { title: "Nhân viên", href: "/hr/employees", icon: Users },
  { title: "Chức vụ", href: "/hr/positions", icon: Briefcase },
  { title: "Vị trí nhân viên", href: "/hr/employee-positions", icon: UserCheck },
];

export function HrMenu() {
  const page = usePage();

  // Mở menu tự động nếu url bắt đầu bằng /hr
  const [isOpen, setIsOpen] = useState(() => page.url.startsWith('/hr'));

  // Nếu bạn muốn đồng bộ trạng thái mở khi url thay đổi, thêm useEffect:
  useEffect(() => {
    if (page.url.startsWith('/hr')) {
      setIsOpen(true);
    }
  }, [page.url]);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <button
          aria-expanded={isOpen}
          className={clsx(
            "flex w-full items-center justify-between py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700",
            isOpen && "bg-gray-200 dark:bg-gray-800"
          )}
        >
          <span>Quản lý nhân sự</span>
          {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </button>
      </CollapsibleTrigger>

      <CollapsibleContent>
        <SidebarMenu>
          {HR_MENU_ITEMS.map(({ title, href, icon: Icon }) => (
            <SidebarMenuItem key={href}>
              <SidebarMenuButton asChild isActive={page.url === href}>
                <Link href={href} prefetch className="flex items-center gap-2">
                  {Icon && <Icon size={16} />}
                  <span>{title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </CollapsibleContent>
    </Collapsible>
  );
}
