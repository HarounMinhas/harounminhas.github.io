import { useState } from 'react';
import { useAuth } from '../lib/auth';
import { useGraphStore } from '../store/graphStore';
import { Api } from '../lib/api';

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

    const tracks = await Api.getTopTracks(node.artistId, import.meta.env.VITE_DEFAULT_MARKET);
    const ids = tracks.slice(0, 10).map((track: any) => track.id);
    if (!ids.length) {
      setMessage('Geen tracks beschikbaar om te exporteren.');
      return;
    }

    const response = await fetch(`${import.meta.env.VITE_API_BASE || 'http://localhost:8080/api'}/export/spotify-playlist`, {
      method: 'POST',
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
      setMessage(data.error?.message ?? 'Export mislukt');
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Library</h2>
      <p>Login met Spotify om playlists te exporteren vanuit je huidige graaf.</p>
      <a className="btn primary" href={`${import.meta.env.VITE_API_BASE || 'http://localhost:8080/api'}/auth/spotify/login`}>
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
