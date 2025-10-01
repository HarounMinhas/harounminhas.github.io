'use client';

import { useState } from 'react';
import { useAuth } from '../lib/auth';
import { Api } from '../lib/api';
import { useGraphStore } from '../store/graphStore';
import styles from '../styles.module.css';

export default function FavoriteButton() {
  const { token, refreshFavorites } = useAuth();
  const node = useGraphStore((state) => {
    if (state.selectedNodeId) {
      return state.nodes.find((item) => item.id === state.selectedNodeId);
    }
    if (state.pivotNodeId) {
      return state.nodes.find((item) => item.id === state.pivotNodeId);
    }
    return undefined;
  });
  const [status, setStatus] = useState<'idle' | 'saved'>('idle');

  const save = async () => {
    if (!node || !token) return;
    await Api.addFavorite(token, {
      artistId: node.artistId,
      name: node.name,
      imageUrl: node.imageUrl,
    });
    setStatus('saved');
    await refreshFavorites();
    setTimeout(() => setStatus('idle'), 2400);
  };

  if (!node) return null;

  return (
    <button className={styles.btn} onClick={save} disabled={!token}>
      {status === 'saved' ? 'Bewaard' : 'Favoriet'}
    </button>
  );
}
