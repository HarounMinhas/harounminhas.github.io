'use client';

import { useEffect, useState } from 'react';
import { globalAudio } from '../lib/audio';
import styles from '../styles.module.css';

export default function GlobalPlayer() {
  const [, setTick] = useState(0);

  useEffect(() => {
    const unsubscribe = globalAudio.onChange(() => setTick((value) => value + 1));
    return unsubscribe;
  }, []);

  return (
    <div className={styles.footerPlayer}>
      <button className={styles.btn} onClick={() => globalAudio.pause()}>
        Pauzeer
      </button>
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        defaultValue={0.8}
        className={styles.range}
        onChange={(event) => globalAudio.volume(Number(event.target.value))}
      />
    </div>
  );
}
