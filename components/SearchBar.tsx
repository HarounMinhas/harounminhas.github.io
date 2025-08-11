'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchAllOpportunities, Opportunity } from '../src/api/opportunities';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Opportunity[]>([]);
  const [allData, setAllData] = useState<Opportunity[]>([]);
  const router = useRouter();

  // Load all opportunities once and cache in sessionStorage
  useEffect(() => {
    let canceled = false;
    async function loadAll() {
      try {
        let cached: Opportunity[] | null = null;
        if (typeof window !== 'undefined') {
          const saved = sessionStorage.getItem('all-opportunities');
          if (saved) {
            try {
              cached = JSON.parse(saved) as Opportunity[];
            } catch {
              // ignore parse errors
            }
          }
        }
        const data = cached || (await fetchAllOpportunities());
        if (canceled) return;
        setAllData(data);
        if (!cached && typeof window !== 'undefined') {
          sessionStorage.setItem('all-opportunities', JSON.stringify(data));
        }
      } catch (e) {
        console.error(e);
      }
    }
    loadAll();
    return () => {
      canceled = true;
    };
  }, []);

  // Filter suggestions locally
  useEffect(() => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    const q = query.toLowerCase();
    const matches = allData.filter((o) => o.title.toLowerCase().includes(q));
    setSuggestions(matches.slice(0, 5));
  }, [query, allData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/opportunities?search=${encodeURIComponent(query.trim())}`);
      setSuggestions([]);
    }
  };

  const handleSelect = (id: string) => {
    router.push(`/opportunities?id=${encodeURIComponent(id)}`);
    setSuggestions([]);
    setQuery('');
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          className="w-48 rounded border px-3 py-1 text-sm"
          aria-label="Search opportunities"
        />
      </form>
      {suggestions.length > 0 && (
        <ul className="absolute z-10 mt-1 w-48 rounded border bg-white text-sm">
          {suggestions.map((s) => (
            <li key={s.id}>
              <button
                className="block w-full px-3 py-1 text-left hover:bg-gray-100"
                onClick={() => handleSelect(s.id)}
              >
                {s.title}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

