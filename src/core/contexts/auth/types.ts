import { AuthUser, AuthResponse } from '@/core/domain/auth';

export type AuthContextType = {
  user: AuthUser | null;
  authenticated: boolean;
  verifyIfUserIsAuthenticated: () => AuthUser | null;
  onLogin: (data: AuthResponse, callback: VoidFunction) => void;
  onLogout: (callback: VoidFunction) => void;
};
