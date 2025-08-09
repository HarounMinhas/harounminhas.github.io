'use client';
import React from 'react';
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
}: FiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <MultiSelectFilter
        label="Type"
        options={typeOptions}
        selected={type}
        onChange={(v) => onChange('type', v)}
      />
      <MultiSelectFilter
        label="Country"
        options={countryOptions}
        selected={country}
        onChange={(v) => onChange('country', v)}
      />
      <MultiSelectFilter
        label="City"
        options={cityOptions}
        selected={city}
        onChange={(v) => onChange('city', v)}
      />
      <PageLengthSelect value={pageLength} onChange={(v) => onChange('pageLength', v)} />
    </div>
  );
}

