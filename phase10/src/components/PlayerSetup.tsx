import React, { useState } from 'react';
import { Player } from '../types';

interface PlayerSetupProps {
  onStartGame: (players: Player[]) => void;
}

export function PlayerSetup({ onStartGame }: PlayerSetupProps) {
  const [players, setPlayers] = useState<Player[]>([]);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [error, setError] = useState('');

  const addPlayer = () => {
    const trimmedName = newPlayerName.trim();
    
    if (!trimmedName) {
      setError('Voer een naam in');
      return;
    }
    
    if (players.some(p => p.name.toLowerCase() === trimmedName.toLowerCase())) {
      setError('Deze naam bestaat al');
      return;
    }
    
    setPlayers([...players, { id: Date.now().toString(), name: trimmedName }]);
    setNewPlayerName('');
    setError('');
  };

  const removePlayer = (id: string) => {
    setPlayers(players.filter(p => p.id !== id));
  };

  const startWith4Players = () => {
    const defaultPlayers: Player[] = [
      { id: '1', name: 'Speler 1' },
      { id: '2', name: 'Speler 2' },
      { id: '3', name: 'Speler 3' },
      { id: '4', name: 'Speler 4' },
    ];
    setPlayers(defaultPlayers);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addPlayer();
  };

  const handleStartGame = () => {
    if (players.length < 2) {
      setError('Voeg minimaal 2 spelers toe');
      return;
    }
    onStartGame(players);
  };

  return (
    <div className="container">
      <div className="header">
        <h1>🎲 Phase 10 Scorekeeper</h1>
        <p>Voeg spelers toe om te beginnen</p>
      </div>

      <div className="card" style={{ maxWidth: '500px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit} className="mb-3">
          <div className="form-group">
            <label className="form-label">Spelernaam</label>
            <input
              type="text"
              className="form-input"
              value={newPlayerName}
              onChange={(e) => setNewPlayerName(e.target.value)}
              placeholder="Voer naam in..."
              autoFocus
            />
          </div>
          
          {error && (
            <div style={{ color: 'var(--danger)', marginBottom: '1rem' }}>
              {error}
            </div>
          )}

          <div className="flex gap-2">
            <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
              ➕ Speler toevoegen
            </button>
            {players.length === 0 && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={startWith4Players}
              >
                Start met 4 spelers
              </button>
            )}
          </div>
        </form>

        {players.length > 0 && (
          <>
            <div className="mb-3">
              <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>Spelers ({players.length})</h3>
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
                      ❌ Verwijder
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
              🎮 Start Spel
            </button>
          </>
        )}
      </div>
    </div>
  );
}
