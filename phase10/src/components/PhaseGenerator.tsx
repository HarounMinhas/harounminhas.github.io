import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { generateRandomPhase } from '../utils/phaseGenerator';
import { PhaseDefinition } from '../types';
import { useI18n } from '../i18n';

interface PhaseGeneratorProps {
  onClose: () => void;
}

const STORAGE_KEY = 'phase10_custom_phases';
const MAX_PHASES = 10;
const DIFFICULTY_DISTRIBUTION = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5];

export function PhaseGenerator({ onClose }: PhaseGeneratorProps) {
  const { t } = useI18n();

  const [difficulty, setDifficulty] = useState(3);
  const [customPhases, setCustomPhases] = useState<PhaseDefinition[]>([]);
  const [selectedPhaseIndex, setSelectedPhaseIndex] = useState<number | null>(null);

  // Load saved phase list from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setCustomPhases(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load saved phases:', e);
      }
    }
  }, []);

  // Save phase list to localStorage whenever it changes
  useEffect(() => {
    if (customPhases.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(customPhases));
    }
  }, [customPhases]);

  const generate = () => {
    const phase = generateRandomPhase(difficulty);

    if (selectedPhaseIndex !== null) {
      // Replace selected phase
      const newPhases = [...customPhases];
      newPhases[selectedPhaseIndex] = phase;
      setCustomPhases(newPhases);
      setSelectedPhaseIndex(null);
    } else if (customPhases.length < MAX_PHASES) {
      // Add new phase
      setCustomPhases([...customPhases, phase]);
    }
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

  const selectPhase = (index: number) => {
    if (selectedPhaseIndex === index) {
      setSelectedPhaseIndex(null);
    } else {
      setSelectedPhaseIndex(index);
    }
  };

  const surpriseMe = () => {
    const newPhases = DIFFICULTY_DISTRIBUTION.map((diff) => generateRandomPhase(diff));

    setCustomPhases(newPhases);
    setSelectedPhaseIndex(null);
  };

  const clearList = () => {
    if (confirm(t('generator.confirm.clearAll'))) {
      setCustomPhases([]);
      setSelectedPhaseIndex(null);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const getDifficultyDots = (level: number) => {
    return (
      <div className="difficulty-dots">
        {[1, 2, 3, 4, 5].map((dot) => (
          <div key={dot} className={`difficulty-dot ${dot <= level ? 'active' : ''}`} />
        ))}
      </div>
    );
  };

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '700px' }}>
        <div className="modal-header">
          <h2 className="modal-title">{t('generator.title')}</h2>
          <button className="modal-close" onClick={onClose}>
            ✖
          </button>
        </div>

        <div className="modal-body">
          {/* Difficulty Selector */}
          <div className="form-group">
            <label className="form-label">{t('generator.difficulty', { difficulty })}</label>
            <input
              type="range"
              min="1"
              max="5"
              value={difficulty}
              onChange={(e) => setDifficulty(parseInt(e.target.value))}
            />
            <div
              className="flex justify-between"
              style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}
            >
              <span>{t('generator.easy')}</span>
              <span>{t('generator.hard')}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mb-3">
            <button
              className="btn btn-primary"
              onClick={generate}
              disabled={customPhases.length >= MAX_PHASES && selectedPhaseIndex === null}
              style={{ flex: 1 }}
            >
              {selectedPhaseIndex !== null ? t('generator.btn.replace') : t('generator.btn.generate')}
            </button>
            <button className="btn btn-secondary" onClick={surpriseMe} style={{ flex: 1 }}>
              {t('generator.btn.surprise')}
            </button>
          </div>

          {/* Custom Phases List */}
          {customPhases.length > 0 && (
            <>
              <div className="flex justify-between align-center mb-2">
                <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {t('generator.section.myPhases', { count: customPhases.length, max: MAX_PHASES })}
                </h3>
                <button className="btn btn-small btn-secondary" onClick={clearList}>
                  {t('generator.btn.clearAll')}
                </button>
              </div>

              <div className="phase-list">
                {customPhases.map((phase, index) => (
                  <div
                    key={index}
                    className={`phase-item ${selectedPhaseIndex === index ? 'selected' : ''}`}
                    onClick={() => selectPhase(index)}
                    style={{
                      cursor: 'pointer',
                      background: selectedPhaseIndex === index ? 'var(--glass-highlight)' : 'var(--glass-bg)',
                      borderColor: selectedPhaseIndex === index ? 'var(--primary)' : 'var(--glass-border)',
                      borderWidth: selectedPhaseIndex === index ? '2px' : '1px',
                    }}
                  >
                    <div className="phase-number">{index + 1}</div>
                    <div className="phase-content">
                      <div className="phase-title">{phase.title}</div>
                      <div className="phase-description">{phase.description}</div>
                      <div style={{ marginTop: '0.5rem' }}>{getDifficultyDots(phase.level)}</div>
                    </div>
                    <div className="phase-actions" onClick={(e) => e.stopPropagation()}>
                      <button
                        className="phase-action-btn delete"
                        onClick={() => removePhase(index)}
                        title={t('generator.tooltip.deletePhase')}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Empty State */}
          {customPhases.length === 0 && (
            <div className="empty-state">
              <div className="empty-state-icon">🎲</div>
              <p style={{ whiteSpace: 'pre-line' }}>{t('generator.empty.text')}</p>
            </div>
          )}

          {/* Info Box */}
          <div
            style={{
              marginTop: '1.5rem',
              padding: '1rem',
              background: 'var(--glass-bg)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--glass-border)',
            }}
          >
            <h4
              style={{
                fontSize: '0.9rem',
                marginBottom: '0.5rem',
                color: 'var(--text-primary)',
              }}
            >
              {t('generator.howItWorks.title')}
            </h4>
            <ul
              style={{
                fontSize: '0.875rem',
                color: 'var(--text-secondary)',
                lineHeight: '1.6',
                paddingLeft: '1.25rem',
              }}
            >
              <li>{t('generator.howItWorks.li1')}</li>
              <li>{t('generator.howItWorks.li2')}</li>
              <li>{t('generator.howItWorks.li3')}</li>
              <li>{t('generator.howItWorks.li4')}</li>
            </ul>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            {t('generator.btn.close')}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
