'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Api } from './api';

type AuthState = {
  token: string | null;
  setToken: (token: string | null) => void;
  favorites: { artistId: string; name: string; imageUrl?: string }[];
  refreshFavorites: () => Promise<void>;
};

const AuthContext = createContext<AuthState>({
  token: null,
  setToken: () => {},
  favorites: [],
  refreshFavorites: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<AuthState['favorites']>([]);

  const refreshFavorites = useMemo(
    () =>
      async () => {
        if (!token) {
          setFavorites([]);
          return;
        }
        const list = await Api.favorites(token);
        setFavorites(list);
      },
    [token],
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.hash.replace(/^#/, ''));
    const hashToken = params.get('token');
    if (hashToken) {
      setToken(hashToken);
      window.localStorage.setItem('musicdiscovery.token', hashToken);
      window.location.hash = '';
      return;
    }

    const stored = window.localStorage.getItem('musicdiscovery.token');
    if (stored) {
      setToken(stored);
      return;
    }

    Api.anonymousAuth().then((response) => {
      setToken(response.token);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('musicdiscovery.token', response.token);
      }
    });
  }, []);

  useEffect(() => {
    void refreshFavorites();
  }, [refreshFavorites]);

  const value = useMemo(
    () => ({ token, setToken, favorites, refreshFavorites }),
    [token, favorites, refreshFavorites],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
