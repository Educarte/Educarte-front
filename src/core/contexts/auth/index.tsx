import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { AuthUser, AuthResponse } from '@/core/domain/auth';
import {
  getAuthToken,
  getDecodedUser,
  initialValues,
  removeAuthToken,
  setAuthToken,
} from './utils';
import { AuthContextType } from './types';

const AuthContext = createContext<AuthContextType>(initialValues);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  function handleLogin(data: AuthResponse, callback: VoidFunction) {
    const currentUser = getDecodedUser(data.token);

    if (currentUser !== null) {
      setAuthToken(data.token);
      setUser({ ...currentUser, email: currentUser.sub });
      setAuthenticated(true);
      callback();
    }
  }

  function handleLogout(callback: VoidFunction) {
    removeAuthToken();
    setUser(null);
    setAuthenticated(false);
    callback();
  }
  const verifyIfUserIsAuthenticated = () => {
    const token = getAuthToken();

    if (token !== null) {
      const currentUser = getDecodedUser(token);

      if (currentUser !== null) {
        setUser({ ...currentUser, email: currentUser.sub });
        setAuthenticated(true);
        return currentUser;
      }
    }
    return null;
  };
  useEffect(() => {
    verifyIfUserIsAuthenticated();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        authenticated,
        verifyIfUserIsAuthenticated,
        onLogin: handleLogin,
        onLogout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  return useContext<AuthContextType>(AuthContext);
}

export * from './types';
export * from './utils';
