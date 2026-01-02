import { PhaseDefinition } from '../types';
import { PhaseListItem } from './PhaseListItem';
import { PhaseListEmpty } from './PhaseListEmpty';

interface PhaseListProps {
  phases: PhaseDefinition[];
  selectedIndex: number | null;
  maxPhases: number;
  onSelectPhase: (index: number) => void;
  onRemovePhase: (index: number) => void;
  onClearAll: () => void;
}

export function PhaseList({ 
  phases, 
  selectedIndex, 
  maxPhases, 
  onSelectPhase, 
  onRemovePhase, 
  onClearAll 
}: PhaseListProps) {
  if (phases.length === 0) {
    return <PhaseListEmpty />;
  }

  return (
    <>
      <div className="flex justify-between align-center mb-2">
        <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>
          Mijn Fasen ({phases.length}/{maxPhases})
        </h3>
        <button 
          className="btn btn-small btn-secondary" 
          onClick={onClearAll}
        >
          Wis alles
        </button>
      </div>

      <div className="phase-list">
        {phases.map((phase, index) => (
          <PhaseListItem
            key={index}
            phase={phase}
            index={index}
            isSelected={selectedIndex === index}
            onSelect={() => onSelectPhase(index)}
            onRemove={() => onRemovePhase(index)}
          />
        ))}
      </div>
    </>
  );
}
