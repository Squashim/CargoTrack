import { cn } from '@/lib/utils';
import type { WithClassName } from '@/types/common';
import type { PropsWithChildren } from 'react';

type BasicLayoutProps = WithClassName;

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
