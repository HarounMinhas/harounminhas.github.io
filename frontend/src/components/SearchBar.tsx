import { useEffect, useRef, useState } from 'react';
import { Api } from '../lib/api';
import { useGraphStore } from '../store/graphStore';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const upsertRoot = useGraphStore((state) => state.upsertRoot);
  const addNeighbors = useGraphStore((state) => state.addNeighbors);

  useEffect(() => {
    const handle = setTimeout(async () => {
      if (query.trim().length < 2) {
        setResults([]);
        setOpen(false);
        return;
      }
      const response = await Api.searchArtists(query.trim(), 8);
      setResults(response);
      setOpen(true);
    }, 200);
    return () => clearTimeout(handle);
  }, [query]);

  const choose = async (artist: any) => {
    const nodeId = upsertRoot({ id: artist.id, name: artist.name, imageUrl: artist.imageUrl });
    const related = await Api.getRelated(artist.id);
    addNeighbors(nodeId, related);
    setOpen(false);
    setQuery(artist.name);
  };

  return (
    <div className="search" style={{ position: 'relative' }}>
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Zoek artiest..."
        onFocus={() => results.length && setOpen(true)}
        onBlur={() => {
          setTimeout(() => setOpen(false), 120);
        }}
      />
      {open && results.length > 0 && (
        <div
          ref={listRef}
          style={{
            position: 'absolute',
            top: 44,
            left: 0,
            right: 0,
            background: '#0f1320',
            border: '1px solid #27314d',
            borderRadius: 10,
            overflow: 'hidden',
            zIndex: 20,
          }}
        >
          {results.map((item) => (
            <div key={item.id} onMouseDown={() => choose(item)} className="track" style={{ cursor: 'pointer' }}>
              {item.imageUrl && (
                <img src={item.imageUrl} width={32} height={32} style={{ borderRadius: 999 }} alt={item.name} />
              )}
              <div>
                <div>{item.name}</div>
                <small>{item.genres?.slice(0, 2).join(', ')}</small>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
