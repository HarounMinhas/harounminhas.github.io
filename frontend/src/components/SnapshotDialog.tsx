import { useState } from 'react';
import { useGraphStore } from '../store/graphStore';
import { Api } from '../lib/api';
import { useAuth } from '../lib/auth';

export default function SnapshotDialog() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('Mijn snapshot');
  const { token } = useAuth();
  const graph = useGraphStore((state) => ({
    nodes: state.nodes,
    edges: state.edges,
    pivotNodeId: state.pivotNodeId,
  }));

  const save = async () => {
    if (!token) return;
    await Api.createSnapshot(token, { title, graphJson: graph });
    alert('Snapshot opgeslagen');
    setOpen(false);
  };

  return (
    <>
      <button className="btn" onClick={() => setOpen(true)} disabled={!token}>
        Snapshot
      </button>
      {open && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'grid', placeItems: 'center', zIndex: 50 }}>
          <div style={{ background: '#141a2b', border: '1px solid #2a334c', borderRadius: 12, padding: 16, width: 360 }}>
            <h3>Snapshot opslaan</h3>
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid #2a334c', background: '#0f1320', color: 'white' }}
            />
            <div style={{ marginTop: 12, display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button className="btn" onClick={() => setOpen(false)}>
                Annuleer
              </button>
              <button className="btn primary" onClick={save}>
                Opslaan
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
