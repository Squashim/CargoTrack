import { createContext } from 'react';
import type { UserAuthResponse } from '../api/types';

export interface AuthContextType {
  user: UserAuthResponse | null;
  authError: unknown;
  isLoading: boolean;
  isAuthenticated: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
