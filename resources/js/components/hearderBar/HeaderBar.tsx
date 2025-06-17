// src/components/header-bar.tsx
import { SidebarTrigger } from '@/components/ui/sidebar';
import { SearchInput } from './SearchInput';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { NotificationButton } from './NotificationButton';
import { type BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { useState } from 'react';

export function HeaderBar({ breadcrumbs = [] }: { breadcrumbs?: BreadcrumbItemType[] }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  return (
    <header className="border-b border-sidebar-border/50 flex h-16 items-center px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
      {/* Trái: SidebarTrigger + Breadcrumbs */}
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <SidebarTrigger className="-ml-1" />
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </div>

      {/* Phải: SearchInput + Notification */}
      <div className="flex items-center gap-2 ml-auto">
        <SearchInput
          open={searchOpen}
          setOpen={(open) => {
            setSearchOpen(open);
            if (open) setNotificationOpen(false);
          }}
        />
        <NotificationButton
          open={notificationOpen}
          setOpen={(open) => {
            setNotificationOpen(open);
            if (open) setSearchOpen(false);
          }}
        />
      </div>
    </header>
  );
}
