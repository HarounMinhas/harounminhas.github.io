import { createContext, useContext, useEffect, useState } from 'react';
import { Api } from './api';

type AuthState = {
  token: string | null;
  setToken: (token: string | null) => void;
};

const AuthContext = createContext<AuthState>({ token: null, setToken: () => {} });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.replace(/^#/, ''));
    const hashToken = params.get('token');
    if (hashToken) {
      setToken(hashToken);
      localStorage.setItem('token', hashToken);
      window.location.hash = '';
      return;
    }

    const stored = localStorage.getItem('token');
    if (stored) {
      setToken(stored);
      return;
    }

    Api.anonymousAuth().then((response) => {
      setToken(response.token);
      localStorage.setItem('token', response.token);
    });
  }, []);

  return <AuthContext.Provider value={{ token, setToken }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
