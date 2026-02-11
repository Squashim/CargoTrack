import { queryClient } from '@/config/query-client';
import { toasterOptions } from '@/config/toaster';
import { ThemeProvider } from '@/features/theme/theme-provider';
import { QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { Toaster } from 'sonner';
import './index.css';
import router from './router';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster {...toasterOptions} />
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>
);
