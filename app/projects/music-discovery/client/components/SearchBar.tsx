'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Api } from '../lib/api';
import { useGraphStore } from '../store/graphStore';
import styles from '../styles.module.css';

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
    }, 220);
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
    <div className={styles.search}>
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Zoek artiest of band..."
        className={styles.searchInput}
        onFocus={() => results.length && setOpen(true)}
        onBlur={() => {
          setTimeout(() => setOpen(false), 120);
        }}
      />
      {open && results.length > 0 && (
        <div ref={listRef} className={styles.searchList}>
          {results.map((item) => (
            <button key={item.id} onMouseDown={() => choose(item)} className={styles.track} style={{ border: 'none', background: 'transparent', textAlign: 'left', width: '100%' }}>
              {item.imageUrl && (
                <Image
                  src={item.imageUrl}
                  width={40}
                  height={40}
                  style={{ borderRadius: 12, objectFit: 'cover' }}
                  alt={item.name}
                />
              )}
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600 }}>{item.name}</div>
                {item.genres?.length ? (
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 4 }}>
                    {item.genres.slice(0, 3).map((genre: string) => (
                      <span key={genre} className={styles.chip}>
                        {genre}
                      </span>
                    ))}
                  </div>
                ) : (
                  <small>Artiest</small>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
