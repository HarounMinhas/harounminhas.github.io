'use client';
import { useEffect, useState } from 'react';

const themes = [
  { value: 'flatly', label: 'Light' },
  { value: 'darkly', label: 'Dark' },
  { value: 'cyborg', label: 'Darker' },
];

export default function ThemeSelector() {
  const [theme, setTheme] = useState('flatly');

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
    const initial = saved || 'flatly';
    setTheme(initial);
    const link = document.getElementById('bootstrap-theme') as HTMLLinkElement | null;
    if (link) {
      link.href = `https://cdn.jsdelivr.net/npm/bootswatch@5.3.3/dist/${initial}/bootstrap.min.css`;
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setTheme(value);
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', value);
    }
    const link = document.getElementById('bootstrap-theme') as HTMLLinkElement | null;
    if (link) {
      link.href = `https://cdn.jsdelivr.net/npm/bootswatch@5.3.3/dist/${value}/bootstrap.min.css`;
    }
  };

  return (
    <select value={theme} onChange={handleChange} className="form-select w-auto">
      {themes.map((t) => (
        <option key={t.value} value={t.value}>
          {t.label}
        </option>
      ))}
    </select>
  );
}
