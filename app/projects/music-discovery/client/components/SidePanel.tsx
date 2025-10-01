'use client';

import { useEffect, useState } from 'react';
import FavoriteButton from './FavoriteButton';
import SnapshotDialog from './SnapshotDialog';
import TopTracks from './TopTracks';
import { useAuth } from '../lib/auth';
import { Api } from '../lib/api';
import styles from '../styles.module.css';

export default function SidePanel() {
  const { token, favorites } = useAuth();
  const [snapshots, setSnapshots] = useState<{ title: string; graphJson: any }[]>([]);

  useEffect(() => {
    if (!token) {
      setSnapshots([]);
      return;
    }
    Api.listSnapshots(token).then((items) => setSnapshots(items ?? []));
  }, [token]);

  useEffect(() => {
    const handler = () => {
      if (token) {
        Api.listSnapshots(token).then((items) => setSnapshots(items ?? []));
      }
    };
    window.addEventListener('musicdiscovery:snapshot-created', handler);
    return () => window.removeEventListener('musicdiscovery:snapshot-created', handler);
  }, [token]);

  return (
    <aside className={styles.side}>
      <div className={styles.sideSection}>
        <div style={{ display: 'flex', gap: 8 }}>
          <FavoriteButton />
          <SnapshotDialog />
        </div>
        <div className={styles.label}>Pin, bewaar en deel je graaf.</div>
      </div>
      <TopTracks />
      <div className={styles.sideSection}>
        <div className={styles.sideSectionHeader}>Favorieten</div>
        {favorites.length === 0 ? (
          <div className={styles.label}>Nog geen favorieten toegevoegd.</div>
        ) : (
          <div className={styles.snapshotList}>
            {favorites.map((fav) => (
              <div key={fav.artistId} className={styles.snapshotCard}>
                <div>
                  <div className={styles.snapshotTitle}>{fav.name}</div>
                  <div className={styles.label}>Artiest</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={styles.sideSection}>
        <div className={styles.sideSectionHeader}>Snapshots</div>
        {snapshots.length === 0 ? (
          <div className={styles.label}>Sla een snapshot op om je graaf later terug te openen.</div>
        ) : (
          <div className={styles.snapshotList}>
            {snapshots.map((snapshot, index) => (
              <div key={`${snapshot.title}-${index}`} className={styles.snapshotCard}>
                <div>
                  <div className={styles.snapshotTitle}>{snapshot.title}</div>
                  <div className={styles.label}>{snapshot.graphJson?.nodes?.length ?? 0} nodes</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}
