'use client';
import React from 'react';

interface FiltersProps {
  type?: string;
  city?: string;
  country?: string;
  pageLength: number;
  onChange: (name: string, value: string) => void;
}

export default function Filters({ type = '', city = '', country = '', pageLength, onChange }: FiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <input
        aria-label="Filter by type"
        placeholder="Type"
        className="rounded border px-2 py-1 text-sm"
        value={type}
        onChange={(e) => onChange('type', e.target.value)}
      />
      <input
        aria-label="Filter by country"
        placeholder="Country"
        className="rounded border px-2 py-1 text-sm"
        value={country}
        onChange={(e) => onChange('country', e.target.value)}
      />
      <input
        aria-label="Filter by city"
        placeholder="City"
        className="rounded border px-2 py-1 text-sm"
        value={city}
        onChange={(e) => onChange('city', e.target.value)}
      />
      <select
        aria-label="Items per page"
        className="rounded border px-2 py-1 text-sm"
        value={pageLength}
        onChange={(e) => onChange('pageLength', e.target.value)}
      >
        <option value="6">6</option>
        <option value="12">12</option>
        <option value="24">24</option>
      </select>
    </div>
  );
}
