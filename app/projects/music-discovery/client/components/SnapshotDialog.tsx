'use client';

import { useMemo, useState } from 'react';
import { useGraphStore } from '../store/graphStore';
import { Api } from '../lib/api';
import { useAuth } from '../lib/auth';
import styles from '../styles.module.css';

export default function SnapshotDialog() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('Mijn snapshot');
  const { token, refreshFavorites } = useAuth();
  const graph = useGraphStore((state) => ({
    nodes: state.nodes,
    edges: state.edges,
    pivotNodeId: state.pivotNodeId,
  }));

  const snapshotDisabled = useMemo(() => graph.nodes.length === 0, [graph.nodes.length]);

  const save = async () => {
    if (!token || snapshotDisabled) return;
    await Api.createSnapshot(token, { title, graphJson: graph });
    setOpen(false);
    await refreshFavorites();
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('musicdiscovery:snapshot-created'));
    }
  };

  return (
    <>
      <button className={styles.btn} onClick={() => setOpen(true)} disabled={!token || snapshotDisabled}>
        Snapshot
      </button>
      {open && (
        <div className={styles.dialogBackdrop}>
          <div className={styles.dialog}>
            <h3 className={styles.dialogTitle}>Snapshot opslaan</h3>
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className={styles.dialogInput}
              placeholder="Naam van je snapshot"
            />
            <div className={styles.dialogActions}>
              <button className={styles.btn} onClick={() => setOpen(false)}>
                Annuleer
              </button>
              <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={save}>
                Opslaan
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
