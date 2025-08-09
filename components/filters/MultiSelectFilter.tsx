'use client';
import React, { useState } from 'react';

export interface Option {
  value: string;
  label: string;
  description?: string;
}

interface MultiSelectFilterProps {
  label: string;
  options: Option[];
  selected: string[];
  onChange: (values: string[]) => void;
}

export default function MultiSelectFilter({ label, options, selected, onChange }: MultiSelectFilterProps) {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((o) => !o);

  const handleChange = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={toggle}
        className="rounded border px-2 py-1 text-sm"
      >
        {selected.length ? `${label} (${selected.length})` : label}
      </button>
      {open && (
        <div className="absolute z-10 mt-1 w-56 max-h-60 overflow-y-auto rounded border bg-white shadow">
          {options.map((opt) => (
            <label
              key={opt.value}
              className="flex cursor-pointer gap-2 border-b p-2 last:border-b-0"
            >
              <input
                type="checkbox"
                className="form-checkbox mt-1"
                checked={selected.includes(opt.value)}
                onChange={() => handleChange(opt.value)}
              />
              <span className="text-sm">
                {opt.label}
                {opt.description && (
                  <small className="block text-xs text-gray-500">{opt.description}</small>
                )}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

