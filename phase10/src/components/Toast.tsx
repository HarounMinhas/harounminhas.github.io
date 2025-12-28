import { useEffect } from 'react';

interface ToastProps {
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  onClose: () => void;
  duration?: number;
}

export function Toast({ message, action, onClose, duration = 5000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="toast">
      <span>{message}</span>
      {action && (
        <button className="btn btn-small btn-secondary" onClick={action.onClick}>
          {action.label}
        </button>
      )}
      <button
        className="modal-close"
        onClick={onClose}
        style={{ marginLeft: 'auto' }}
      >
        ✖
      </button>
    </div>
  );
}
