import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Link, usePage } from '@inertiajs/react';
import { FilePlus, FileText, FilePen, ChevronDown, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import clsx from 'clsx';

const DOCUMENT_MENU_ITEMS = [
  { title: "Tất cả tài liệu", href: "/documents", icon: FileText },
  { title: "Thêm mới tài liệu", href: "/documents/create", icon: FilePlus },
];

export function DocumentMenu() {
  const page = usePage();
  const currentUrl = page.url;

  const [isOpen, setIsOpen] = useState(() => currentUrl.startsWith('/documents'));

  useEffect(() => {
    if (currentUrl.startsWith('/documents')) {
      setIsOpen(true);
    }
  }, [currentUrl]);

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
          <span>Quản lý tài liệu</span>
          {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </button>
      </CollapsibleTrigger>

      <CollapsibleContent>
        <SidebarMenu>
          {DOCUMENT_MENU_ITEMS.map(({ title, href, icon: Icon }) => {
            const isActive = currentUrl === href || currentUrl.startsWith(href + '/');

            return (
              <SidebarMenuItem key={href}>
                <SidebarMenuButton asChild isActive={isActive}>
                  <Link href={href} prefetch className="flex items-center gap-2">
                    <Icon size={16} />
                    <span>{title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </CollapsibleContent>
    </Collapsible>
  );
}
