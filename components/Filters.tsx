'use client';
import React, { useState } from 'react';
import PageLengthSelect from './filters/PageLengthSelect';
import MultiSelectFilter, { Option } from './filters/MultiSelectFilter';

interface FiltersProps {
  type?: string[];
  city?: string[];
  country?: string[];
  pageLength: number;
  onChange: (name: string, value: string | string[]) => void;
  typeOptions: Option[];
  countryOptions: Option[];
  cityOptions: Option[];
  view: 'grid' | 'list';
  onViewChange: (v: 'grid' | 'list') => void;
}

export default function Filters({
  type = [],
  city = [],
  country = [],
  pageLength,
  onChange,
  typeOptions = [],
  countryOptions = [],
  cityOptions = [],
  view,
  onViewChange,
}: FiltersProps) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <MultiSelectFilter
        label="Type"
        options={typeOptions}
        selected={type}
        onChange={(v) => onChange('type', v)}
        open={open === 'type'}
        onToggle={() => setOpen(open === 'type' ? null : 'type')}
        onClose={() => setOpen(null)}
      />
      <MultiSelectFilter
        label="Country"
        options={countryOptions}
        selected={country}
        onChange={(v) => onChange('country', v)}
        open={open === 'country'}
        onToggle={() => setOpen(open === 'country' ? null : 'country')}
        onClose={() => setOpen(null)}
      />
      <MultiSelectFilter
        label="City"
        options={cityOptions}
        selected={city}
        onChange={(v) => onChange('city', v)}
        open={open === 'city'}
        onToggle={() => setOpen(open === 'city' ? null : 'city')}
        onClose={() => setOpen(null)}
      />
      <PageLengthSelect value={pageLength} onChange={(v) => onChange('pageLength', v)} />
      <div className="flex items-center gap-1 ml-auto">
        <button
          type="button"
          className={`p-1 ${view === 'grid' ? 'text-primary' : 'text-gray-500'}`}
          onClick={() => onViewChange('grid')}
          aria-label="Grid view"
        >
          <i className="bi bi-grid" />
        </button>
        <button
          type="button"
          className={`p-1 ${view === 'list' ? 'text-primary' : 'text-gray-500'}`}
          onClick={() => onViewChange('list')}
          aria-label="List view"
        >
          <i className="bi bi-list" />
        </button>
      </div>
    </div>
  );
}

