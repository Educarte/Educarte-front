import { jwtDecode } from 'jwt-decode';
import { AuthUser } from '@/core/domain/auth';
import { AuthContextType } from './types';

const AUTH_KEY = import.meta.env.VITE_APP_KEY;

export const initialValues: AuthContextType = {
  user: null,
  authenticated: false,
  verifyIfUserIsAuthenticated: () => null,
  onLogin() {},
  onLogout() {},
};

export function setAuthToken(token: string) {
  localStorage.setItem(AUTH_KEY, token);
}

export function removeAuthToken() {
  localStorage.removeItem(AUTH_KEY);
}

export function getAuthToken(): string | null {
  return localStorage.getItem(AUTH_KEY);
}

export function getDecodedUser(token: string | null): AuthUser | null {
  if (token !== null) {
    try {
      return jwtDecode<AuthUser>(token);
    } catch (error) {
      return null;
    }
  }
  return null;
}
