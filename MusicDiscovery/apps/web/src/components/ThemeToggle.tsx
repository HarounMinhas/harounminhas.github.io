import React from 'react';

export type ThemeMode = 'light' | 'dark';

type ThemeToggleProps = {
  value: ThemeMode;
  onChange: (value: ThemeMode) => void;
};

export default function ThemeToggle({ value, onChange }: ThemeToggleProps) {
  const isDark = value === 'dark';

  return (
    <div className="background-toggle">
      <span className="label background-toggle__label">Thema</span>
      <label className="background-toggle__switch">
        <input
          className="background-toggle__switch-input"
          type="checkbox"
          checked={isDark}
          onChange={(event) => {
            onChange(event.target.checked ? 'dark' : 'light');
          }}
        />
        <span className="background-toggle__switch-track" aria-hidden="true">
          <span className="background-toggle__switch-thumb" />
        </span>
        <span className="background-toggle__switch-text">{isDark ? 'Donker' : 'Licht'}</span>
      </label>
    </div>
  );
}
