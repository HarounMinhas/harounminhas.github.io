'use client';
import React from 'react';
import TypeFilter from './filters/TypeFilter';
import CountryFilter from './filters/CountryFilter';
import CityFilter from './filters/CityFilter';
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
      <TypeFilter value={type} onChange={(v) => onChange('type', v)} />
      <CountryFilter value={country} onChange={(v) => onChange('country', v)} />
      <CityFilter value={city} onChange={(v) => onChange('city', v)} />
      <PageLengthSelect value={pageLength} onChange={(v) => onChange('pageLength', v)} />
    </div>
  );
}
