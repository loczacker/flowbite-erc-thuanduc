import { HeaderBar } from '@/components/hearderBar/HeaderBar';
import { type BreadcrumbItem as BreadcrumbItemType } from '@/types';

export function AppSidebarHeader({ breadcrumbs = [] }: { breadcrumbs?: BreadcrumbItemType[] }) {
  return <HeaderBar breadcrumbs={breadcrumbs} />;
}
