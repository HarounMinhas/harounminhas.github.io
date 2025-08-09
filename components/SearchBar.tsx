'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchOpportunities, Opportunity } from '../src/api/opportunities';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Opportunity[]>([]);
  const router = useRouter();

  useEffect(() => {
    let active = true;
    if (!query) {
      setSuggestions([]);
      return;
    }
    async function load() {
      try {
        const res = await fetchOpportunities({ search: query, pageLength: 5 });
        if (active) setSuggestions(res.data);
      } catch (e) {
        console.error(e);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, [query]);

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

