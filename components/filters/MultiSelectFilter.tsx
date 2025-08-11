'use client';
import React, { useEffect, useRef } from 'react';

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
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export default function MultiSelectFilter({
  label,
  options,
  selected,
  onChange,
  open,
  onOpen,
  onClose,
}: MultiSelectFilterProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [open, onClose]);

  const toggle = () => {
    if (open) {
      onClose();
    } else {
      onOpen();
    }
  };

  const handleChange = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <div className="relative" ref={ref}>
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

