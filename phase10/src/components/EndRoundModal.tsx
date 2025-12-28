import { useState } from 'react';
import { Player, RoundEntry } from '../types';

interface EndRoundModalProps {
  players: Player[];
  currentPhases: Map<string, number>;
  onSave: (entries: RoundEntry[]) => void;
  onClose: () => void;
}

export function EndRoundModal({ players, currentPhases, onSave, onClose }: EndRoundModalProps) {
  const [entries, setEntries] = useState<Map<string, RoundEntry>>(
    new Map(
      players.map(player => [
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
    onSave(Array.from(entries.values()));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Einde Ronde</h2>
          <button className="modal-close" onClick={onClose}>
            ✖
          </button>
        </div>

        <div className="modal-body">
          {players.map((player) => {
            const entry = entries.get(player.id)!;
            return (
              <div
                key={player.id}
                style={{
                  marginBottom: '1.5rem',
                  padding: '1rem',
                  background: 'var(--dark-light)',
                  borderRadius: '0.5rem',
                }}
              >
                <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>{player.name}</h3>

                <div className="flex gap-2" style={{ marginBottom: '1rem', flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: '120px' }}>
                    <label className="form-label" style={{ fontSize: '0.9rem' }}>
                      Punten
                    </label>
                    <input
                      type="number"
                      className="form-input"
                      min="0"
                      value={entry.points}
                      onChange={(e) =>
                        updateEntry(player.id, { points: parseInt(e.target.value) || 0 })
                      }
                    />
                  </div>

                  <div style={{ flex: 1, minWidth: '120px' }}>
                    <label className="form-label" style={{ fontSize: '0.9rem' }}>
                      Fase na ronde
                    </label>
                    <select
                      className="form-select"
                      value={entry.phaseAfterRound}
                      onChange={(e) =>
                        updateEntry(player.id, { phaseAfterRound: parseInt(e.target.value) })
                      }
                    >
                      {Array.from({ length: 10 }, (_, i) => i + 1).map((phase) => (
                        <option key={phase} value={phase}>
                          Fase {phase}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    cursor: 'pointer',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={entry.phaseCompleted}
                    onChange={(e) =>
                      updateEntry(player.id, { phaseCompleted: e.target.checked })
                    }
                    style={{ width: '1.2rem', height: '1.2rem', cursor: 'pointer' }}
                  />
                  <span>Fase voltooid</span>
                </label>
              </div>
            );
          })}
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Annuleren
          </button>
          <button className="btn btn-primary" onClick={handleSave}>
            💾 Opslaan
          </button>
        </div>
      </div>
    </div>
  );
}
