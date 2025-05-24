import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Link, usePage } from '@inertiajs/react';
import {
  ChevronDown,
  ChevronRight,
  Layers,
  BarChart2,
  FileText,
  Database,
  Folder,
  CheckSquare,
  ShieldCheck,
  Table
} from 'lucide-react';
import { useState, useEffect } from 'react';
import clsx from 'clsx';

const ESG_MENU_ITEMS = [
  { title: "Danh mục ESG", href: "/esg/categories", icon: Layers },
  { title: "Chỉ số ESG", href: "/esg/indicators", icon: BarChart2 },
  { title: "Báo cáo ESG", href: "/esg/reports", icon: FileText },
  { title: "Dữ liệu ESG", href: "/esg/data", icon: Database },
  { title: "Dự án ESG", href: "/esg/projects", icon: Folder },
  { title: "Nhiệm vụ ESG", href: "/esg/tasks", icon: CheckSquare },
  { title: "Kiểm toán ESG", href: "/esg/audit", icon: ShieldCheck },
  { title: "Chính sách ESG", href: "/esg/policies", icon: FileText },
  { title: "Bảng dữ liệu ESG", href: "/esg/data-table", icon: Table },
];

export function EsgMenu() {
  const page = usePage();

  // Mở menu tự động nếu url bắt đầu bằng /esg
  const [isOpen, setIsOpen] = useState(() => page.url.startsWith('/esg'));

  useEffect(() => {
    if (page.url.startsWith('/esg')) {
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
          <span>Quản lý ESG</span>
          {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </button>
      </CollapsibleTrigger>

      <CollapsibleContent>
        <SidebarMenu>
          {ESG_MENU_ITEMS.map(({ title, href, icon: Icon }) => (
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
