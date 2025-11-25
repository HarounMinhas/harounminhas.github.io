import { useEffect, useState } from 'react';
import { globalAudio } from '../lib/audio';

export default function GlobalPlayer() {
  const [, setTick] = useState(0);

  useEffect(() => globalAudio.onChange(() => setTick((value) => value + 1)), []);

  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <button className="btn" onClick={() => globalAudio.pause()}>
        Pause
      </button>
      <input type="range" min={0} max={1} step={0.01} defaultValue={1} onChange={(event) => globalAudio.volume(Number(event.target.value))} />
    </div>
  );
}
