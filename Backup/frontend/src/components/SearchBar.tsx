import { useCallback, useEffect, useRef, useState } from 'react';
import { Api } from '../lib/api';
import { useGraphStore } from '../store/graphStore';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const upsertRoot = useGraphStore((state) => state.upsertRoot);
  const addNeighbors = useGraphStore((state) => state.addNeighbors);

  const fetchResults = useCallback(async (term: string) => {
    const trimmed = term.trim();
    if (trimmed.length < 2) {
      setResults([]);
      setError(null);
      setOpen(false);
      return;
    }

    setLoading(true);
    setError(null);
    setOpen(true);

    try {
      const response = await Api.searchArtists(trimmed, 8);
      setResults(response);
      if (response.length === 0) {
        setError('Geen resultaten gevonden.');
      }
    } catch (err) {
      setResults([]);
      setError('Zoeken mislukt. Probeer het later opnieuw.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length < 2) {
      setResults([]);
      if (trimmed.length === 0) {
        setError(null);
        setOpen(false);
      }
      return;
    }

    const handle = setTimeout(() => {
      fetchResults(trimmed);
    }, 200);
    return () => clearTimeout(handle);
  }, [query, fetchResults]);

  const choose = async (artist: any) => {
    const nodeId = upsertRoot({ id: artist.id, name: artist.name, imageUrl: artist.imageUrl });
    const related = await Api.getRelated(artist.id);
    addNeighbors(nodeId, related);
    setOpen(false);
    setQuery(artist.name);
  };

  const handleSubmit = () => {
    if (query.trim().length < 2) {
      setResults([]);
      setError('Voer minimaal 2 tekens in om te zoeken.');
      setOpen(true);
      return;
    }

    fetchResults(query);
  };

  return (
    <div className="search">
      <div className="searchField">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Zoek artiest..."
          onFocus={() => {
            if (results.length > 0 || error) {
              setOpen(true);
            }
          }}
          onBlur={() => {
            setTimeout(() => setOpen(false), 120);
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              if (open && results.length > 0) {
                choose(results[0]);
              } else {
                handleSubmit();
              }
            }
          }}
        />
        {open && (
          <div
            ref={listRef}
            className="searchResults"
          >
            {loading && <div className="searchStatus">Zoeken...</div>}
            {!loading && results.length > 0 && (
              <div>
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
            {!loading && error && <div className="searchStatus">{error}</div>}
          </div>
        )}
      </div>
      <button type="button" className="btn primary" onClick={handleSubmit} disabled={loading}>
        Zoek
      </button>
    </div>
  );
}
