import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Api } from '../lib/api';
import { useGraphStore } from '../store/graphStore';
import { ms } from '../lib/format';
import { globalAudio } from '../lib/audio';

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

  useEffect(() => globalAudio.onChange(() => setTick((value) => value + 1)), []);

  const { data, isLoading } = useQuery({
    queryKey: ['top-tracks', node?.artistId],
    queryFn: () => Api.getTopTracks(node!.artistId, import.meta.env.VITE_DEFAULT_MARKET),
    enabled: !!node,
  });

  if (!node) {
    return <div className="label">Geen selectie</div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '12px 12px 4px' }}>
        {node.imageUrl && <img src={node.imageUrl} width={56} height={56} style={{ borderRadius: 12 }} alt={node.name} />}
        <div>
          <div style={{ fontWeight: 700 }}>{node.name}</div>
          <div className="label">Top tracks</div>
        </div>
      </div>
      <div>
        {isLoading && <div className="label" style={{ padding: '0 12px' }}>Laden...</div>}
        {(data || []).map((track) => (
          <div key={track.id} className="track">
            <button className="btn" onClick={() => globalAudio.play(track.id, track.previewUrl)} disabled={!track.previewUrl}>
              {globalAudio.isPlaying(track.id) ? 'Pause' : 'Play'}
            </button>
            <div style={{ flex: 1 }}>
              <div>{track.name}</div>
              <small>{ms(track.durationMs)}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
