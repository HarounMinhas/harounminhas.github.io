import { useState, useEffect } from 'react';
import { generateRandomPhase } from '../utils/phaseGenerator';
import { PhaseDefinition } from '../types';

interface PhaseGeneratorProps {
  onClose: () => void;
}

interface CustomPhase extends PhaseDefinition {
  id: string;
}

const STORAGE_KEY = 'phase10_custom_phases';

export function PhaseGenerator({ onClose }: PhaseGeneratorProps) {
  const [difficulty, setDifficulty] = useState(3);
  const [currentPhase, setCurrentPhase] = useState<PhaseDefinition | null>(null);
  const [phaseList, setPhaseList] = useState<CustomPhase[]>([]);
  const [selectedPhaseIndex, setSelectedPhaseIndex] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  // Load saved phase list from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setPhaseList(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load saved phases:', e);
      }
    }
  }, []);

  // Save phase list to localStorage whenever it changes
  useEffect(() => {
    if (phaseList.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(phaseList));
    }
  }, [phaseList]);

  const generate = () => {
    const phase = generateRandomPhase(difficulty);
    setCurrentPhase(phase);
    setCopied(false);
  };

  const addPhaseToList = () => {
    if (!currentPhase) return;

    if (selectedPhaseIndex !== null) {
      // Replace selected phase
      const updated = [...phaseList];
      updated[selectedPhaseIndex] = {
        ...currentPhase,
        id: phaseList[selectedPhaseIndex].id,
      };
      setPhaseList(updated);
      setSelectedPhaseIndex(null);
    } else {
      // Add new phase (max 10)
      if (phaseList.length >= 10) {
        alert('Je kunt maximaal 10 fasen toevoegen!');
        return;
      }
      const newPhase: CustomPhase = {
        ...currentPhase,
        id: Date.now().toString(),
      };
      setPhaseList([...phaseList, newPhase]);
    }
    setCurrentPhase(null);
  };

  const selectPhase = (index: number) => {
    if (selectedPhaseIndex === index) {
      setSelectedPhaseIndex(null);
    } else {
      setSelectedPhaseIndex(index);
    }
  };

  const removePhase = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = phaseList.filter((_, i) => i !== index);
    setPhaseList(updated);
    if (selectedPhaseIndex === index) {
      setSelectedPhaseIndex(null);
    } else if (selectedPhaseIndex !== null && selectedPhaseIndex > index) {
      setSelectedPhaseIndex(selectedPhaseIndex - 1);
    }
  };

  const surpriseMe = () => {
    const phases: CustomPhase[] = [];
    
    // Generate 10 phases with increasing difficulty
    // 2x difficulty 1, 2x difficulty 2, 2x difficulty 3, 2x difficulty 4, 2x difficulty 5
    const difficultyPattern = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5];
    
    difficultyPattern.forEach((diff) => {
      const phase = generateRandomPhase(diff);
      phases.push({
        ...phase,
        id: Date.now().toString() + Math.random(),
      });
    });
    
    setPhaseList(phases);
    setSelectedPhaseIndex(null);
    setCurrentPhase(null);
  };

  const clearList = () => {
    if (confirm('Weet je zeker dat je alle fasen wilt verwijderen?')) {
      setPhaseList([]);
      setSelectedPhaseIndex(null);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const copyToClipboard = () => {
    if (currentPhase) {
      navigator.clipboard.writeText(`${currentPhase.title}: ${currentPhase.description}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const copyListToClipboard = () => {
    if (phaseList.length === 0) return;
    const text = phaseList.map((phase, i) => `${i + 1}. ${phase.title}: ${phase.description}`).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getDifficultyDots = (level: number) => {
    return (
      <div className="difficulty-dots">
        {[1, 2, 3, 4, 5].map((dot) => (
          <div
            key={dot}
            className={`difficulty-dot ${dot <= level ? 'active' : ''}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '700px' }}>
        <div className="modal-header">
          <h2 className="modal-title">🎯 Custom Fases</h2>
          <button className="modal-close" onClick={onClose}>
            ✖
          </button>
        </div>

        <div className="modal-body">
          {/* Generator Section */}
          <div className="card mb-3">
            <div className="form-group">
              <label className="form-label">
                Moeilijkheid: {difficulty}
              </label>
              <input
                type="range"
                min="1"
                max="5"
                value={difficulty}
                onChange={(e) => setDifficulty(parseInt(e.target.value))}
              />
              <div className="flex justify-between" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                <span>Makkelijk</span>
                <span>Moeilijk</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button 
                className="btn btn-primary" 
                onClick={generate} 
                style={{ flex: 1 }}
              >
                🎲 Genereer Fase
              </button>
              <button 
                className="btn btn-secondary" 
                onClick={surpriseMe}
                title="Genereer automatisch 10 oplopend moeilijke fasen"
              >
                ✨ Surprise Me!
              </button>
            </div>
          </div>

          {/* Generated Phase Preview */}
          {currentPhase && (
            <div
              className="card mb-3"
              style={{
                background: 'linear-gradient(135deg, rgba(0, 122, 255, 0.15), rgba(90, 200, 250, 0.15))',
                borderColor: 'rgba(0, 122, 255, 0.3)',
              }}
            >
              <div className="flex justify-between align-center mb-2">
                <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)' }}>
                  {currentPhase.title}
                </h3>
                {getDifficultyDots(currentPhase.level)}
              </div>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                {currentPhase.description}
              </p>
              <div className="flex gap-2">
                <button
                  className="btn btn-primary"
                  onClick={addPhaseToList}
                  disabled={phaseList.length >= 10 && selectedPhaseIndex === null}
                  style={{ flex: 1 }}
                >
                  {selectedPhaseIndex !== null 
                    ? `🔄 Vervang Fase ${selectedPhaseIndex + 1}` 
                    : `➕ Toevoegen aan Lijst (${phaseList.length}/10)`}
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={copyToClipboard}
                >
                  {copied ? '✅' : '📋'}
                </button>
              </div>
            </div>
          )}

          {/* Phase List */}
          <div className="card">
            <div className="flex justify-between align-center mb-2">
              <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                Je Fases Lijst ({phaseList.length}/10)
              </h3>
              {phaseList.length > 0 && (
                <div className="flex gap-1">
                  <button
                    className="btn btn-small btn-secondary"
                    onClick={copyListToClipboard}
                    title="Kopieer hele lijst"
                  >
                    📋
                  </button>
                  <button
                    className="btn btn-small btn-danger"
                    onClick={clearList}
                    title="Verwijder alle fasen"
                  >
                    🗑️
                  </button>
                </div>
              )}
            </div>

            {phaseList.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">🎮</div>
                <p>Nog geen fasen toegevoegd.</p>
                <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>Genereer een fase en voeg deze toe aan je lijst!</p>
              </div>
            ) : (
              <div className="phase-list">
                {phaseList.map((phase, index) => (
                  <div
                    key={phase.id}
                    className={`phase-item ${selectedPhaseIndex === index ? 'selected' : ''}`}
                    onClick={() => selectPhase(index)}
                    style={{
                      cursor: 'pointer',
                      borderColor: selectedPhaseIndex === index 
                        ? 'var(--primary)' 
                        : 'var(--glass-border)',
                      boxShadow: selectedPhaseIndex === index 
                        ? '0 0 0 2px rgba(0, 122, 255, 0.2)' 
                        : 'none',
                    }}
                  >
                    <div className="phase-number">{index + 1}</div>
                    <div className="phase-content">
                      <div className="flex justify-between align-center" style={{ marginBottom: '0.25rem' }}>
                        <div className="phase-title">{phase.title}</div>
                        {getDifficultyDots(phase.level)}
                      </div>
                      <div className="phase-description">{phase.description}</div>
                    </div>
                    <div className="phase-actions">
                      <button
                        className="phase-action-btn delete"
                        onClick={(e) => removePhase(index, e)}
                        title="Verwijder fase"
                      >
                        ✖
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {selectedPhaseIndex !== null && (
              <div style={{ 
                marginTop: '1rem', 
                padding: '0.75rem', 
                background: 'rgba(0, 122, 255, 0.1)',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.875rem',
                color: 'var(--text-secondary)',
                textAlign: 'center'
              }}>
                💡 Fase {selectedPhaseIndex + 1} is geselecteerd. Genereer een nieuwe fase om deze te vervangen, of klik nogmaals om te deselecteren.
              </div>
            )}
          </div>

          {/* Info Section */}
          <div style={{ 
            marginTop: '1.5rem', 
            padding: '1rem', 
            background: 'var(--glass-bg)', 
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--glass-border)'
          }}>
            <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>ℹ️ Hoe werkt het?</h4>
            <ul style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.8', paddingLeft: '1.25rem' }}>
              <li>Genereer een fase en klik op "Toevoegen" om deze aan je lijst toe te voegen</li>
              <li>Klik op een fase in de lijst om deze te selecteren voor vervanging</li>
              <li>Klik op "Surprise Me!" voor automatisch 10 oplopend moeilijke fasen</li>
              <li>Je lijst wordt automatisch opgeslagen en blijft beschikbaar tijdens het spel</li>
              <li>Maximaal 10 fasen per lijst</li>
            </ul>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-primary" onClick={onClose}>
            ✅ Klaar
          </button>
        </div>
      </div>
    </div>
  );
}
