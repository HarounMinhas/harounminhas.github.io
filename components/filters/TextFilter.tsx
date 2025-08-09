'use client';
import React from 'react';

interface TextFilterProps {
  ariaLabel: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

export default function TextFilter({ ariaLabel, placeholder, value, onChange }: TextFilterProps) {
  return (
    <input
      aria-label={ariaLabel}
      placeholder={placeholder}
      className="rounded border px-2 py-1 text-sm"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
