'use client';
import React from 'react';
import TextFilter from './filters/TextFilter';
import PageLengthSelect from './filters/PageLengthSelect';

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
      <TextFilter
        ariaLabel="Filter by type"
        placeholder="Type"
        value={type}
        onChange={(v) => onChange('type', v)}
      />
      <TextFilter
        ariaLabel="Filter by country"
        placeholder="Country"
        value={country}
        onChange={(v) => onChange('country', v)}
      />
      <TextFilter
        ariaLabel="Filter by city"
        placeholder="City"
        value={city}
        onChange={(v) => onChange('city', v)}
      />
      <PageLengthSelect value={pageLength} onChange={(v) => onChange('pageLength', v)} />
    </div>
  );
}
