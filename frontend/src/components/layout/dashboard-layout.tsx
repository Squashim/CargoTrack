import { CompanyProvider } from '@/features/company/components/company-provider';
import { cn } from '@/lib/utils';
import type { WithClassName } from '@/types/common';
import { Outlet } from 'react-router';
import { SidebarProvider } from '../ui/sidebar';
import { Navbar } from './navbar';
import { AppSidebar, AppSidebarTrigger } from './sidebar';

type DashboardLayoutProps = WithClassName;

function DashboardLayout({ className }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-dvh w-full">
      <CompanyProvider>
        <SidebarProvider defaultOpen={false} className="flex flex-1 flex-col">
          <AppSidebarTrigger />
          <Navbar />
          <AppSidebar />

          <main className={cn('flex-1 -mt-20', className)}>
            <Outlet />
          </main>
        </SidebarProvider>
      </CompanyProvider>
    </div>
  );
}

export { DashboardLayout };
