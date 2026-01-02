import { useState } from 'react';
import { generateRandomPhase } from '../utils/phaseGenerator';
import { PhaseDefinition } from '../types';
import { PhaseList } from './PhaseList';
import { DifficultySelector } from './DifficultySelector';
import { PhaseGeneratorActions } from './PhaseGeneratorActions';

interface PhaseGeneratorProps {
  onClose: () => void;
}

const MAX_PHASES = 10;
const DIFFICULTY_DISTRIBUTION = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5];

export function PhaseGenerator({ onClose }: PhaseGeneratorProps) {
  const [difficulty, setDifficulty] = useState(3);
  const [customPhases, setCustomPhases] = useState<PhaseDefinition[]>([]);
  const [selectedPhaseIndex, setSelectedPhaseIndex] = useState<number | null>(null);

  const handleGeneratePhase = () => {
    const phase = generateRandomPhase(difficulty);
    
    if (selectedPhaseIndex !== null) {
      replacePhase(selectedPhaseIndex, phase);
    } else if (customPhases.length < MAX_PHASES) {
      addPhase(phase);
    }
  };

  const addPhase = (phase: PhaseDefinition) => {
    setCustomPhases([...customPhases, phase]);
  };

  const replacePhase = (index: number, phase: PhaseDefinition) => {
    const newPhases = [...customPhases];
    newPhases[index] = phase;
    setCustomPhases(newPhases);
    setSelectedPhaseIndex(null);
  };

  const removePhase = (index: number) => {
    const newPhases = customPhases.filter((_, i) => i !== index);
    setCustomPhases(newPhases);
    
    if (selectedPhaseIndex === index) {
      setSelectedPhaseIndex(null);
    } else if (selectedPhaseIndex !== null && selectedPhaseIndex > index) {
      setSelectedPhaseIndex(selectedPhaseIndex - 1);
    }
  };

  const togglePhaseSelection = (index: number) => {
    setSelectedPhaseIndex(selectedPhaseIndex === index ? null : index);
  };

  const handleSurpriseMe = () => {
    const newPhases = DIFFICULTY_DISTRIBUTION.map(diff => 
      generateRandomPhase(diff)
    );
    
    setCustomPhases(newPhases);
    setSelectedPhaseIndex(null);
  };

  const handleClearAll = () => {
    if (confirm('Weet je zeker dat je alle fasen wilt verwijderen?')) {
      setCustomPhases([]);
      setSelectedPhaseIndex(null);
    }
  };

  const canGeneratePhase = customPhases.length < MAX_PHASES || selectedPhaseIndex !== null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">🎯 Custom Fasen</h2>
          <button className="modal-close" onClick={onClose}>
            ✖
          </button>
        </div>

        <div className="modal-body">
          <DifficultySelector 
            difficulty={difficulty} 
            onDifficultyChange={setDifficulty} 
          />

          <PhaseGeneratorActions
            isReplaceMode={selectedPhaseIndex !== null}
            canGenerate={canGeneratePhase}
            onGenerate={handleGeneratePhase}
            onSurpriseMe={handleSurpriseMe}
          />

          <PhaseList
            phases={customPhases}
            selectedIndex={selectedPhaseIndex}
            maxPhases={MAX_PHASES}
            onSelectPhase={togglePhaseSelection}
            onRemovePhase={removePhase}
            onClearAll={handleClearAll}
          />

          <PhaseGeneratorInfo />
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Sluiten
          </button>
        </div>
      </div>
    </div>
  );
}

function PhaseGeneratorInfo() {
  return (
    <div style={{ 
      marginTop: '1.5rem', 
      padding: '1rem', 
      background: 'var(--glass-bg)', 
      borderRadius: 'var(--radius-md)',
      border: '1px solid var(--glass-border)'
    }}>
      <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
        💡 Hoe werkt het?
      </h4>
      <ul style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.6', paddingLeft: '1.25rem' }}>
        <li>Klik op "Genereer Fase" om een nieuwe fase toe te voegen (max 10)</li>
        <li>Klik op een fase om deze te selecteren en te vervangen</li>
        <li>"Surprise Me!" genereert 10 fasen met oplopende moeilijkheid</li>
        <li>Gebruik deze lijst tijdens het spel als referentie</li>
      </ul>
    </div>
  );
}
