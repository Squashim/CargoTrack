import { use } from 'react';
import { AuthContext } from '../context/auth-context';

function useAuthContext() {
  const context = use(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}

export { useAuthContext };
