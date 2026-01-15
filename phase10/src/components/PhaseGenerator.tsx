import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { generateRandomPhase, getAllPhases, getPhasesByDifficulty } from '../utils/phaseGenerator';
import { PhaseDefinition } from '../types';
import { useI18n } from '../i18n';

interface PhaseGeneratorProps {
  initialPhases: PhaseDefinition[];
  onConfirm: (phases: PhaseDefinition[]) => void;
  onCancel: () => void;
}

const MAX_PHASES = 10;
const DIFFICULTY_DISTRIBUTION = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getUniquePhase(difficulty: number, usedTitles: Set<string>): PhaseDefinition {
  // 1) Prefer phases of the requested difficulty
  const pool = getPhasesByDifficulty(difficulty);
  const candidates = pool.filter((p) => !usedTitles.has(p.title));
  if (candidates.length > 0) return pickRandom(candidates);

  // 2) Fallback: any phase (still unique)
  const all = getAllPhases();
  const allCandidates = all.filter((p) => !usedTitles.has(p.title));
  if (allCandidates.length > 0) return pickRandom(allCandidates);

  // 3) Absolute fallback (should only happen if literally every phase is already used)
  return generateRandomPhase(difficulty);
}

export function PhaseGenerator({ initialPhases, onConfirm, onCancel }: PhaseGeneratorProps) {
  const { t } = useI18n();

  const [difficulty, setDifficulty] = useState(3);
  const [draftPhases, setDraftPhases] = useState<PhaseDefinition[]>(() => initialPhases);
  const [selectedPhaseIndex, setSelectedPhaseIndex] = useState<number | null>(null);

  useEffect(() => {
    setDraftPhases(initialPhases);
    setSelectedPhaseIndex(null);
  }, [initialPhases]);

  const usedTitles = useMemo(() => new Set(draftPhases.map((p) => p.title)), [draftPhases]);

  const generate = () => {
    if (selectedPhaseIndex !== null) {
      // Allow keeping the same title for this index, but disallow duplicates with others.
      const usedExceptSelected = new Set(usedTitles);
      usedExceptSelected.delete(draftPhases[selectedPhaseIndex]?.title);

      const phase = getUniquePhase(difficulty, usedExceptSelected);
      const next = [...draftPhases];
      next[selectedPhaseIndex] = phase;
      setDraftPhases(next);
      setSelectedPhaseIndex(null);
      return;
    }

    if (draftPhases.length < MAX_PHASES) {
      const phase = getUniquePhase(difficulty, usedTitles);
      setDraftPhases([...draftPhases, phase]);
    }
  };

  const removePhase = (index: number) => {
    const next = draftPhases.filter((_, i) => i !== index);
    setDraftPhases(next);

    if (selectedPhaseIndex === index) {
      setSelectedPhaseIndex(null);
    } else if (selectedPhaseIndex !== null && selectedPhaseIndex > index) {
      setSelectedPhaseIndex(selectedPhaseIndex - 1);
    }
  };

  const selectPhase = (index: number) => {
    setSelectedPhaseIndex(selectedPhaseIndex === index ? null : index);
  };

  const surpriseMe = () => {
    const next: PhaseDefinition[] = [];
    const used = new Set<string>();

    for (const diff of DIFFICULTY_DISTRIBUTION) {
      const phase = getUniquePhase(diff, used);
      next.push(phase);
      used.add(phase.title);
    }

    setDraftPhases(next);
    setSelectedPhaseIndex(null);
  };

  const clearList = () => {
    if (confirm(t('generator.confirm.clearAll'))) {
      setDraftPhases([]);
      setSelectedPhaseIndex(null);
    }
  };

  const getDifficultyDots = (level: number) => (
    <div className="difficulty-dots">
      {[1, 2, 3, 4, 5].map((dot) => (
        <div key={dot} className={`difficulty-dot ${dot <= level ? 'active' : ''}`} />
      ))}
    </div>
  );

  return createPortal(
    <div className="p10-modal-overlay" onClick={onCancel}>
      <div className="p10-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '700px' }}>
        <div className="p10-modal-header">
          <h2 className="p10-modal-title">{t('generator.title')}</h2>
          <button className="p10-modal-close" onClick={onCancel}>
            ✖
          </button>
        </div>

        <div className="p10-modal-body">
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

          <div className="flex gap-2 mb-3">
            <button
              className="btn btn-primary"
              onClick={generate}
              disabled={draftPhases.length >= MAX_PHASES && selectedPhaseIndex === null}
              style={{ flex: 1 }}
            >
              {selectedPhaseIndex !== null ? t('generator.btn.replace') : t('generator.btn.generate')}
            </button>
            <button className="btn btn-secondary" onClick={surpriseMe} style={{ flex: 1 }}>
              {t('generator.btn.surprise')}
            </button>
          </div>

          {draftPhases.length > 0 && (
            <>
              <div className="flex justify-between align-center mb-2">
                <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {t('generator.section.myPhases', { count: draftPhases.length, max: MAX_PHASES })}
                </h3>
                <button className="btn btn-small btn-secondary" onClick={clearList}>
                  {t('generator.btn.clearAll')}
                </button>
              </div>

              <div className="phase-list">
                {draftPhases.map((phase, index) => (
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

          {draftPhases.length === 0 && (
            <div className="empty-state">
              <div className="empty-state-icon">🎲</div>
              <p style={{ whiteSpace: 'pre-line' }}>{t('generator.empty.text')}</p>
            </div>
          )}

          <div
            style={{
              marginTop: '1.5rem',
              padding: '1rem',
              background: 'var(--glass-bg)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--glass-border)',
            }}
          >
            <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
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

        <div className="p10-modal-footer">
          <button className="btn btn-secondary" onClick={onCancel}>
            {t('common.cancel')}
          </button>
          <button className="btn btn-primary" onClick={() => onConfirm(draftPhases)}>
            {t('common.ok')}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
