'use client';
import React from 'react';

interface TypeFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export default function TypeFilter({ value, onChange }: TypeFilterProps) {
  return (
    <input
      aria-label="Filter by type"
      placeholder="Type"
      className="rounded border px-2 py-1 text-sm"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
