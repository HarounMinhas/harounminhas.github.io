'use client';
import React from 'react';

export default function SortSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <select
      aria-label="Sort opportunities"
      className="rounded border px-2 py-1 text-sm"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="-deadline">Deadline (latest)</option>
      <option value="deadline">Deadline (earliest)</option>
      <option value="-createdAt">Newest</option>
    </select>
  );
}
