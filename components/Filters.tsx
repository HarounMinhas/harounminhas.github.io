'use client';
import React, { useState } from 'react';
import PageLengthSelect from './filters/PageLengthSelect';
import MultiSelectFilter, { Option } from './filters/MultiSelectFilter';
import { BsFillGridFill, BsListUl } from 'react-icons/bs';

interface FiltersProps {
  type?: string[];
  city?: string[];
  country?: string[];
    pageLength: number;
    view: 'grid' | 'list';
    onViewChange: (view: 'grid' | 'list') => void;
    onChange: (name: string, value: string | string[]) => void;
    typeOptions: Option[];
    countryOptions: Option[];
    cityOptions: Option[];
}

export default function Filters({
  type = [],
  city = [],
  country = [],
    pageLength,
    view,
    onViewChange,
    onChange,
    typeOptions = [],
    countryOptions = [],
    cityOptions = [],
  }: FiltersProps) {
  const [open, setOpen] = useState<string | null>(null);

  const close = () => setOpen(null);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <MultiSelectFilter
        label="Type"
        options={typeOptions}
        selected={type}
        onChange={(v) => onChange('type', v)}
        open={open === 'type'}
        onOpen={() => setOpen('type')}
        onClose={close}
      />
      <MultiSelectFilter
        label="Country"
        options={countryOptions}
        selected={country}
        onChange={(v) => onChange('country', v)}
        open={open === 'country'}
        onOpen={() => setOpen('country')}
        onClose={close}
      />
      <MultiSelectFilter
        label="City"
        options={cityOptions}
        selected={city}
        onChange={(v) => onChange('city', v)}
        open={open === 'city'}
        onOpen={() => setOpen('city')}
        onClose={close}
      />
        <PageLengthSelect value={pageLength} onChange={(v) => onChange('pageLength', v)} />
        <div className="ml-auto flex items-center gap-1">
          <button
            onClick={() => onViewChange('grid')}
            aria-label="Grid view"
            className={`rounded border p-2 ${view === 'grid' ? 'bg-gray-200' : ''}`}
          >
            <BsFillGridFill />
          </button>
          <button
            onClick={() => onViewChange('list')}
            aria-label="List view"
            className={`rounded border p-2 ${view === 'list' ? 'bg-gray-200' : ''}`}
          >
            <BsListUl />
          </button>
        </div>
      </div>
    );
  }

