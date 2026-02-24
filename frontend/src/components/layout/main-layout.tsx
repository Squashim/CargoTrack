import { cn } from '@/lib/utils';
import type { WithClassName } from '@/types/common';
import type { PropsWithChildren } from 'react';
import { Footer } from './footer';
import { Navbar } from './navbar';

type MainLayoutProps = WithClassName;

function MainLayout({ children, className }: PropsWithChildren<MainLayoutProps>) {
  return (
    <div className="min-h-dvh flex flex-col bg-background">
      <Navbar />

      <main className={cn('flex-1 p-4', className)}>{children}</main>

      <Footer />
    </div>
  );
}

export { MainLayout };
