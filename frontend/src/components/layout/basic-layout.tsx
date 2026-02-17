import { cn } from '@/lib/utils';
import type { PropsWithChildren } from 'react';

interface BasicLayoutProps {
  className?: string;
}

const BasicLayout = ({ children, className }: PropsWithChildren<BasicLayoutProps>) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center min-h-screen gap-4 bg-radial from-primary/30 to-background',
        className
      )}
    >
      {children}
    </div>
  );
};

export { BasicLayout };
