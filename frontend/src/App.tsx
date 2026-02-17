import { Outlet } from 'react-router';
import { AuthProvider } from './features/auth/components/auth-provider';

export function App() {
  return (
    <AuthProvider>
      <div className="w-full min-h-dvh">
        <Outlet />
      </div>
    </AuthProvider>
  );
}

export default App;
