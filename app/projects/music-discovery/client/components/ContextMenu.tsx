'use client';

import { useEffect, useRef } from 'react';
import styles from '../styles.module.css';

type MenuItem = { label: string; onClick: () => void; disabled?: boolean };

type Props = {
  x: number;
  y: number;
  title?: string;
  items: MenuItem[];
  onClose: () => void;
};

export function ContextMenu({ x, y, title, items, onClose }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) {
        onClose();
      }
    };
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    <div ref={ref} className={styles.menu} style={{ left: x, top: y }}>
      {title && <div className={styles.menuTitle}>{title}</div>}
      {items.map((item, index) => (
        <button
          key={index}
          className={styles.menuButton}
          onClick={() => {
            if (item.disabled) return;
            onClose();
            item.onClick();
          }}
          disabled={item.disabled}
          style={{ opacity: item.disabled ? 0.5 : 1 }}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
