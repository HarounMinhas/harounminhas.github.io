'use client';
import React from 'react';

interface PageLengthSelectProps {
  value: number;
  onChange: (value: string) => void;
}

export default function PageLengthSelect({ value, onChange }: PageLengthSelectProps) {
  return (
    <select
      aria-label="Items per page"
      className="rounded border px-2 py-1 text-sm"
      value={String(value)}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="20">20</option>
      <option value="40">40</option>
      <option value="0">All</option>
    </select>
  );
}
