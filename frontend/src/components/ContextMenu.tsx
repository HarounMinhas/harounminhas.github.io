import { useEffect, useRef } from 'react';

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
    <div ref={ref} className="menu" style={{ left: x, top: y, position: 'absolute' }}>
      {title && <h4>{title}</h4>}
      {items.map((item, index) => (
        <button
          key={index}
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
