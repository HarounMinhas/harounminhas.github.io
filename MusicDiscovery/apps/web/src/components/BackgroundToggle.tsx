import React from 'react';

export type BackgroundMode = 'static' | 'animated';

type BackgroundToggleProps = {
  value: BackgroundMode;
  onChange: (value: BackgroundMode) => void;
};

export default function BackgroundToggle({ value, onChange }: BackgroundToggleProps) {
  const enabled = value === 'animated';

  return (
    <div className="background-toggle">
      <span className="label background-toggle__label">Achtergrondanimatie</span>
      <label className="background-toggle__switch">
        <input
          className="background-toggle__switch-input"
          type="checkbox"
          checked={enabled}
          onChange={(event) => {
            onChange(event.target.checked ? 'animated' : 'static');
          }}
        />
        <span className="background-toggle__switch-track" aria-hidden="true">
          <span className="background-toggle__switch-thumb" />
        </span>
        <span className="background-toggle__switch-text">{enabled ? 'Aan' : 'Uit'}</span>
      </label>
    </div>
  );
}
