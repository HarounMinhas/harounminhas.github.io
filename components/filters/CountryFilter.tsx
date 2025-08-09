'use client';
import React from 'react';

interface CountryFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export default function CountryFilter({ value, onChange }: CountryFilterProps) {
  return (
    <input
      aria-label="Filter by country"
      placeholder="Country"
      className="rounded border px-2 py-1 text-sm"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
