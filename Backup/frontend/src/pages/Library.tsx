import { useState } from 'react';
import { useAuth } from '../lib/auth';
import { useGraphStore } from '../store/graphStore';
import { Api, API_BASE } from '../lib/api';

export default function Library() {
  const { token } = useAuth();
  const [playlistName, setPlaylistName] = useState('MusicDiscovery Playlist');
  const [message, setMessage] = useState<string | null>(null);
  const node = useGraphStore((state) => {
    if (state.selectedNodeId) {
      return state.nodes.find((item) => item.id === state.selectedNodeId);
    }
    if (state.pivotNodeId) {
      return state.nodes.find((item) => item.id === state.pivotNodeId);
    }
    return undefined;
  });

  const exportPlaylist = async () => {
    if (!token) {
      setMessage('Geen token beschikbaar. Login met Spotify.');
      return;
    }
    if (!node) {
      setMessage('Selecteer eerst een artiest in de graaf.');
      return;
    }

    try {
      const tracks = await Api.getTopTracks(node.artistId, import.meta.env.VITE_DEFAULT_MARKET);
      const ids = tracks.slice(0, 10).map((track: any) => track.id);
      if (!ids.length) {
        setMessage('Geen tracks beschikbaar om te exporteren.');
        return;
      }

      const response = await fetch(`${API_BASE}/export/spotify-playlist`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: playlistName, trackIds: ids, isPublic: false }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        setMessage('Playlist aangemaakt! We openen Spotify in een nieuw tabblad.');
        if (data.externalUrl) {
          window.open(data.externalUrl as string, '_blank');
        }
      } else {
        console.error('[MusicDiscovery] playlist export failed', { status: response.status, data });
        setMessage(data.error?.message ?? 'Export mislukt');
      }
    } catch (error) {
      console.error('[MusicDiscovery] playlist export failed with unexpected error', error);
      setMessage('Export mislukt door een netwerkfout. Probeer opnieuw.');
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Library</h2>
      <p>Login met Spotify om playlists te exporteren vanuit je huidige graaf.</p>
      <a className="btn primary" href={`${API_BASE}/auth/spotify/login`}>
        Login met Spotify
      </a>

      <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 420 }}>
        <h3>Export naar Spotify</h3>
        <label className="label" htmlFor="playlist-name">
          Playlistnaam
        </label>
        <input
          id="playlist-name"
          value={playlistName}
          onChange={(event) => setPlaylistName(event.target.value)}
          style={{ padding: 8, borderRadius: 8, border: '1px solid #2a334c', background: '#0f1320', color: 'white' }}
        />
        <button className="btn" onClick={exportPlaylist}>
          Exporteren
        </button>
        {message && <div className="label">{message}</div>}
      </div>
    </div>
  );
}
