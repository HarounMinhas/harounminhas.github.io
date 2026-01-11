import React, { useState } from 'react';
import { Player } from '../types';
import { useI18n } from '../i18n';

interface PlayerSetupProps {
  onStartGame: (players: Player[]) => void;
}

type ErrorKey = 'error.enterName' | 'error.nameExists' | 'error.minPlayers' | null;

export function PlayerSetup({ onStartGame }: PlayerSetupProps) {
  const { t } = useI18n();

  const [players, setPlayers] = useState<Player[]>([]);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [errorKey, setErrorKey] = useState<ErrorKey>(null);

  const addPlayer = () => {
    const trimmedName = newPlayerName.trim();

    if (!trimmedName) {
      setErrorKey('error.enterName');
      return;
    }

    if (players.some((p) => p.name.toLowerCase() === trimmedName.toLowerCase())) {
      setErrorKey('error.nameExists');
      return;
    }

    setPlayers([...players, { id: Date.now().toString(), name: trimmedName }]);
    setNewPlayerName('');
    setErrorKey(null);
  };

  const removePlayer = (id: string) => {
    setPlayers(players.filter((p) => p.id !== id));
  };

  const startWith4Players = () => {
    const defaultPlayers: Player[] = [
      { id: '1', name: `Player 1` },
      { id: '2', name: `Player 2` },
      { id: '3', name: `Player 3` },
      { id: '4', name: `Player 4` },
    ];

    // Keep default names consistent with current language at the time of creation
    const langDefaults: Player[] = defaultPlayers.map((p, idx) => ({
      ...p,
      name: t('table.player') === 'Speler' ? `Speler ${idx + 1}` : `Player ${idx + 1}`,
    }));

    setPlayers(langDefaults);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addPlayer();
  };

  const handleStartGame = () => {
    if (players.length < 2) {
      setErrorKey('error.minPlayers');
      return;
    }
    onStartGame(players);
  };

  return (
    <div className="container">
      <div className="header">
        <h1>{t('scoreboard.title')}</h1>
        <p>{t('setup.subtitle')}</p>
      </div>

      <div className="card" style={{ maxWidth: '500px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit} className="mb-3">
          <div className="form-group">
            <label className="form-label">{t('setup.label.playerName')}</label>
            <input
              type="text"
              className="form-input"
              value={newPlayerName}
              onChange={(e) => setNewPlayerName(e.target.value)}
              placeholder={t('setup.placeholder.playerName')}
              autoFocus
            />
          </div>

          {errorKey && (
            <div style={{ color: 'var(--danger)', marginBottom: '1rem' }}>{t(errorKey)}</div>
          )}

          <div className="flex gap-2">
            <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
              {t('setup.btn.addPlayer')}
            </button>
            {players.length === 0 && (
              <button type="button" className="btn btn-secondary" onClick={startWith4Players}>
                {t('setup.btn.startWith4')}
              </button>
            )}
          </div>
        </form>

        {players.length > 0 && (
          <>
            <div className="mb-3">
              <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>
                {t('setup.section.players', { count: players.length })}
              </h3>
              <div className="flex flex-column gap-2">
                {players.map((player, index) => (
                  <div
                    key={player.id}
                    className="flex align-center justify-between"
                    style={{
                      padding: '1rem',
                      background: 'var(--dark-light)',
                      borderRadius: '0.5rem',
                    }}
                  >
                    <span>
                      {index + 1}. {player.name}
                    </span>
                    <button
                      className="btn btn-danger btn-small"
                      onClick={() => removePlayer(player.id)}
                    >
                      {t('setup.btn.remove')}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button
              className="btn btn-primary"
              onClick={handleStartGame}
              style={{ width: '100%', fontSize: '1.2rem' }}
            >
              {t('setup.btn.startGame')}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
