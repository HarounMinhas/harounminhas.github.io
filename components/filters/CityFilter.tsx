'use client';
import React from 'react';

interface CityFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export default function CityFilter({ value, onChange }: CityFilterProps) {
  return (
    <input
      aria-label="Filter by city"
      placeholder="City"
      className="rounded border px-2 py-1 text-sm"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
