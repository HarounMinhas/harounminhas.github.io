import { PhaseDefinition } from '../types';
import { DifficultyIndicator } from './DifficultyIndicator';

interface PhaseListItemProps {
  phase: PhaseDefinition;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
  onRemove: () => void;
}

export function PhaseListItem({ phase, index, isSelected, onSelect, onRemove }: PhaseListItemProps) {
  return (
    <div 
      className={`phase-item ${isSelected ? 'selected' : ''}`}
      onClick={onSelect}
      style={{
        cursor: 'pointer',
        background: isSelected ? 'var(--glass-highlight)' : 'var(--glass-bg)',
        borderColor: isSelected ? 'var(--primary)' : 'var(--glass-border)',
        borderWidth: isSelected ? '2px' : '1px',
      }}
    >
      <div className="phase-number">{index + 1}</div>
      <div className="phase-content">
        <div className="phase-title">{phase.title}</div>
        <div className="phase-description">{phase.description}</div>
        <div style={{ marginTop: '0.5rem' }}>
          <DifficultyIndicator level={phase.level} />
        </div>
      </div>
      <div className="phase-actions" onClick={(e) => e.stopPropagation()}>
        <button 
          className="phase-action-btn delete"
          onClick={onRemove}
          title="Verwijder fase"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}
