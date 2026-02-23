import { Outlet } from 'react-router';
import { AuthProvider } from './features/auth/components/auth-provider';
import { useThemeShortcut } from './hooks/use-theme-shortcut';

export function App() {
  useThemeShortcut();

  return (
    <AuthProvider>
      <div className="w-full min-h-dvh">
        <Outlet />
      </div>
    </AuthProvider>
  );
}

export default App;
