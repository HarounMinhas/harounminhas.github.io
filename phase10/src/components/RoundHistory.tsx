import { useState } from 'react';
import { Round, Player } from '../types';
import { useI18n } from '../i18n';

interface RoundHistoryProps {
  rounds: Round[];
  players: Player[];
  onEditRound: (roundIndex: number) => void;
  onClose: () => void;
}

export function RoundHistory({ rounds, players, onEditRound, onClose }: RoundHistoryProps) {
  const { t } = useI18n();
  const [selectedRound, setSelectedRound] = useState<number | null>(null);

  const getPlayerName = (playerId: string) => {
    return players.find((p) => p.id === playerId)?.name || t('common.unknown');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '800px' }}>
        <div className="modal-header">
          <h2 className="modal-title">{t('history.title')}</h2>
          <button className="modal-close" onClick={onClose}>
            ✖
          </button>
        </div>

        <div className="modal-body">
          {rounds.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'var(--gray)', padding: '2rem' }}>{t('history.empty')}</p>
          ) : (
            <div className="flex flex-column gap-2">
              {rounds.map((round, index) => (
                <div
                  key={round.id}
                  style={{
                    background: selectedRound === index ? 'var(--primary)' : 'var(--dark-light)',
                    padding: '1rem',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                  onClick={() => setSelectedRound(selectedRound === index ? null : index)}
                >
                  <div className="flex justify-between align-center">
                    <h3 style={{ fontSize: '1.1rem' }}>{t('history.round', { round: round.roundNumber })}</h3>
                    <button
                      className="btn btn-small btn-secondary"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditRound(index);
                      }}
                    >
                      {t('history.btn.edit')}
                    </button>
                  </div>

                  {selectedRound === index && (
                    <div
                      className="mt-2"
                      style={{
                        paddingTop: '1rem',
                        borderTop: '1px solid rgba(255,255,255,0.1)',
                      }}
                    >
                      <table className="table" style={{ marginBottom: 0 }}>
                        <thead>
                          <tr>
                            <th>{t('table.player')}</th>
                            <th>{t('endRound.label.points')}</th>
                            <th>{t('table.phase')}</th>
                            <th>{t('history.status')}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {round.entries.map((entry) => (
                            <tr key={entry.playerId}>
                              <td>{getPlayerName(entry.playerId)}</td>
                              <td>{entry.points}</td>
                              <td>{t('phase.label', { phase: entry.phaseAfterRound })}</td>
                              <td>
                                {entry.phaseCompleted ? (
                                  <span className="badge badge-success">{t('history.status.completed')}</span>
                                ) : (
                                  <span className="badge badge-warning">{t('history.status.notCompleted')}</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn btn-primary" onClick={onClose}>
            {t('history.btn.close')}
          </button>
        </div>
      </div>
    </div>
  );
}
