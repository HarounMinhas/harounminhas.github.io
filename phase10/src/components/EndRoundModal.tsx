import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Player, RoundEntry } from '../types';
import { useI18n } from '../i18n';

interface EndRoundModalProps {
  players: Player[];
  currentPhases: Map<string, number>;
  onSave: (entries: RoundEntry[]) => void;
  onClose: () => void;
}

function normalizePointsInput(raw: string): string {
  if (raw === '') return '';
  const n = parseInt(raw, 10);
  if (Number.isNaN(n) || n < 0) return '0';
  return String(n);
}

export function EndRoundModal({ players, currentPhases, onSave, onClose }: EndRoundModalProps) {
  const { t } = useI18n();

  const [entries, setEntries] = useState<Map<string, RoundEntry>>(
    new Map(
      players.map((player) => [
        player.id,
        {
          playerId: player.id,
          points: 0,
          phaseAfterRound: currentPhases.get(player.id) || 1,
          phaseCompleted: false,
        },
      ])
    )
  );

  const [pointsDraft, setPointsDraft] = useState<Map<string, string>>(
    new Map(players.map((p) => [p.id, '0']))
  );

  const updateEntry = (playerId: string, updates: Partial<RoundEntry>) => {
    const current = entries.get(playerId)!;
    const updated = { ...current, ...updates };

    // Auto-increment phase if completed
    if (updates.phaseCompleted && updated.phaseAfterRound < 10) {
      updated.phaseAfterRound = Math.min(10, updated.phaseAfterRound + 1);
    } else if (updates.phaseCompleted === false) {
      updated.phaseAfterRound = currentPhases.get(playerId) || 1;
    }

    setEntries(new Map(entries.set(playerId, updated)));
  };

  const handleSave = () => {
    const merged = players.map((p) => {
      const base = entries.get(p.id)!;
      const raw = pointsDraft.get(p.id) ?? '0';
      const points = raw === '' ? 0 : parseInt(raw, 10) || 0;
      return {
        ...base,
        points,
      };
    });

    onSave(merged);
  };

  return createPortal(
    <div className="p10-modal-overlay" onClick={onClose}>
      <div className="p10-modal" onClick={(e) => e.stopPropagation()}>
        <div className="p10-modal-header">
          <h2 className="p10-modal-title">{t('endRound.title')}</h2>
          <button className="p10-modal-close" onClick={onClose}>
            ✖
          </button>
        </div>

        <div className="p10-modal-body">
          {players.map((player) => {
            const entry = entries.get(player.id)!;
            const pointsValue = pointsDraft.get(player.id) ?? '0';

            return (
              <div
                key={player.id}
                style={{
                  marginBottom: '1.5rem',
                  padding: '1rem',
                  background: 'var(--glass-bg)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: '0.75rem',
                }}
              >
                <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>{player.name}</h3>

                <div className="flex gap-2" style={{ marginBottom: '1rem', flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: '120px' }}>
                    <label className="form-label" style={{ fontSize: '0.9rem' }}>
                      {t('endRound.label.points')}
                    </label>
                    <input
                      type="number"
                      className="form-input"
                      min="0"
                      value={pointsValue}
                      onFocus={(e) => {
                        if (e.currentTarget.value === '0') {
                          e.currentTarget.select();
                        }
                      }}
                      onBlur={() => {
                        const raw = pointsDraft.get(player.id) ?? '0';
                        if (raw === '') {
                          setPointsDraft((prev) => {
                            const next = new Map(prev);
                            next.set(player.id, '0');
                            return next;
                          });
                        }
                      }}
                      onChange={(e) => {
                        const normalized = normalizePointsInput(e.target.value);

                        setPointsDraft((prev) => {
                          const next = new Map(prev);
                          next.set(player.id, normalized);
                          return next;
                        });

                        const points = normalized === '' ? 0 : parseInt(normalized, 10) || 0;
                        updateEntry(player.id, { points });
                      }}
                    />
                  </div>

                  <div style={{ flex: 1, minWidth: '120px' }}>
                    <label className="form-label" style={{ fontSize: '0.9rem' }}>
                      {t('endRound.label.phaseAfter')}
                    </label>
                    <select
                      className="form-select"
                      value={entry.phaseAfterRound}
                      onChange={(e) => updateEntry(player.id, { phaseAfterRound: parseInt(e.target.value) })}
                    >
                      {Array.from({ length: 10 }, (_, i) => i + 1).map((phase) => (
                        <option key={phase} value={phase}>
                          {t('phase.label', { phase })}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={entry.phaseCompleted}
                    onChange={(e) => updateEntry(player.id, { phaseCompleted: e.target.checked })}
                    style={{ width: '1.2rem', height: '1.2rem', cursor: 'pointer' }}
                  />
                  <span>{t('endRound.label.phaseCompleted')}</span>
                </label>
              </div>
            );
          })}
        </div>

        <div className="p10-modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            {t('endRound.btn.cancel')}
          </button>
          <button className="btn btn-primary" onClick={handleSave}>
            {t('endRound.btn.save')}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
