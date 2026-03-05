import { cn } from '@/lib/utils';
import type { WithClassName } from '@/types/common';
import { Outlet } from 'react-router';
import { Footer } from './footer';
import { Navbar } from './navbar';

type MainLayoutProps = WithClassName;

function MainLayout({ className }: MainLayoutProps) {
  return (
    <div className="min-h-dvh flex flex-col bg-background">
      <Navbar />

      <main className={cn('flex-1 p-4', className)}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export { MainLayout };
