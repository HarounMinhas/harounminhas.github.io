import { useState } from 'react';
import { generateRandomPhase } from '../utils/phaseGenerator';
import { PhaseDefinition } from '../types';

interface PhaseGeneratorProps {
  onClose: () => void;
}

export function PhaseGenerator({ onClose }: PhaseGeneratorProps) {
  const [difficulty, setDifficulty] = useState(3);
  const [currentPhase, setCurrentPhase] = useState<PhaseDefinition | null>(null);
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const phase = generateRandomPhase(difficulty);
    setCurrentPhase(phase);
    setCopied(false);
  };

  const copyToClipboard = () => {
    if (currentPhase) {
      navigator.clipboard.writeText(`${currentPhase.title}: ${currentPhase.description}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">🎲 Random Fase Generator</h2>
          <button className="modal-close" onClick={onClose}>
            ✖
          </button>
        </div>

        <div className="modal-body">
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
              style={{ width: '100%', cursor: 'pointer' }}
            />
            <div className="flex justify-between" style={{ fontSize: '0.875rem', color: 'var(--gray)', marginTop: '0.5rem' }}>
              <span>Makkelijk</span>
              <span>Moeilijk</span>
            </div>
          </div>

          <button className="btn btn-primary" onClick={generate} style={{ width: '100%', marginBottom: '1.5rem' }}>
            🎲 Genereer Fase
          </button>

          {currentPhase && (
            <div
              style={{
                padding: '1.5rem',
                background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                borderRadius: '0.5rem',
                textAlign: 'center',
              }}
            >
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{currentPhase.title}</h3>
              <p style={{ fontSize: '1.1rem', opacity: 0.9, marginBottom: '1rem' }}>
                {currentPhase.description}
              </p>
              <span className="badge" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
                Level {currentPhase.level}
              </span>
              <button
                className="btn btn-secondary"
                onClick={copyToClipboard}
                style={{ marginTop: '1rem', width: '100%' }}
              >
                {copied ? '✅ Gekopieerd!' : '📋 Kopieer'}
              </button>
            </div>
          )}

          <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'var(--dark-light)', borderRadius: '0.5rem' }}>
            <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--gray)' }}>Over de generator</h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--gray)', lineHeight: '1.6' }}>
              De generator maakt random fasen op basis van de gekozen moeilijkheid. 
              Gebruik dit om het spel interessanter te maken met custom fasen!
            </p>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-primary" onClick={onClose}>
            Sluiten
          </button>
        </div>
      </div>
    </div>
  );
}
