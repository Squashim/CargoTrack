import { cn } from '@/lib/utils';
import { Sidebar, SidebarTrigger, useSidebar } from '../ui/sidebar';

function AppSidebarTrigger() {
  const { state } = useSidebar();

  return (
    <div
      className={cn(
        'fixed z-52 size-12.5 bg-sidebar rounded-2xl shadow-md flex items-center ring-sidebar-border ring-1 transition-[left,top] duration-300 ease-in-out',
        'min-[106rem]:top-5.75 top-24',
        state === 'collapsed' ? 'left-4 md:left-20.5 min-[106rem]:left-4' : 'left-4 md:left-72 min-[106rem]:left-4'
      )}
    >
      <SidebarTrigger className="w-full h-full rounded-2xl" />
    </div>
  );
}

function AppSidebar() {
  return <Sidebar variant="floating" className="z-52" collapsible="icon"></Sidebar>;
}

export { AppSidebar, AppSidebarTrigger };
