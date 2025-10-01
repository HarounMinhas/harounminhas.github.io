'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Api } from '../lib/api';
import { useGraphStore } from '../store/graphStore';
import { formatMs } from '../lib/format';
import { globalAudio } from '../lib/audio';
import styles from '../styles.module.css';

export default function TopTracks() {
  const node = useGraphStore((state) => {
    if (state.selectedNodeId) {
      return state.nodes.find((item) => item.id === state.selectedNodeId);
    }
    if (state.pivotNodeId) {
      return state.nodes.find((item) => item.id === state.pivotNodeId);
    }
    return undefined;
  });
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const unsubscribe = globalAudio.onChange(() => setTick((value) => value + 1));
    return unsubscribe;
  }, []);

  const market = useMemo(() => (typeof window !== 'undefined' ? window.navigator.language.slice(0, 2).toUpperCase() : 'BE'), []);

  const { data, isLoading } = useQuery({
    queryKey: ['top-tracks', node?.artistId, market],
    queryFn: () => Api.getTopTracks(node!.artistId, market),
    enabled: !!node,
  });

  if (!node) {
    return <div className={styles.sideSection}>Selecteer een artiest in de graaf om top tracks te zien.</div>;
  }

  return (
    <div className={styles.sideSection}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        {node.imageUrl && (
          <Image src={node.imageUrl} width={64} height={64} style={{ borderRadius: 16 }} alt={node.name} />
        )}
        <div>
          <div style={{ fontWeight: 700, fontSize: 16 }}>{node.name}</div>
          <div className={styles.label}>Top tracks</div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {isLoading && <div className={styles.label}>Laden...</div>}
        {(data || []).map((track) => (
          <div key={track.id} className={styles.track} style={{ background: 'rgba(12,16,26,0.55)' }}>
            <button
              className={`${styles.btn} ${styles.btnPrimary}`}
              onClick={() => globalAudio.play(track.id, track.previewUrl)}
              disabled={!track.previewUrl}
            >
              {globalAudio.isPlaying(track.id) ? 'Pause' : 'Play'}
            </button>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600 }}>{track.name}</div>
              <small>{formatMs(track.durationMs)}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
