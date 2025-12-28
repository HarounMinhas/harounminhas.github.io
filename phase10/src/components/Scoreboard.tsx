import React from 'react';
import { PlayerScore } from '../types';
import { getWinner } from '../utils/gameLogic';

interface ScoreboardProps {
  scores: PlayerScore[];
  currentRound: number;
  onEndRound: () => void;
  onViewHistory: () => void;
  onNewGame: () => void;
  onGeneratePhase: () => void;
}

export function Scoreboard({
  scores,
  currentRound,
  onEndRound,
  onViewHistory,
  onNewGame,
  onGeneratePhase,
}: ScoreboardProps) {
  const winner = getWinner(scores);
  const sortedScores = [...scores].sort((a, b) => {
    if (a.currentPhase !== b.currentPhase) {
      return b.currentPhase - a.currentPhase;
    }
    return a.totalPoints - b.totalPoints;
  });

  return (
    <div className="container">
      <div className="header">
        <h1>🎲 Phase 10 Scorekeeper</h1>
        <p>Ronde {currentRound}</p>
      </div>

      {winner && (
        <div
          className="card mb-3"
          style={{
            background: 'linear-gradient(135deg, var(--success), var(--primary))',
            textAlign: 'center',
          }}
        >
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🏆 Winnaar!</h2>
          <p style={{ fontSize: '1.5rem', fontWeight: 600 }}>{winner.name}</p>
          <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>Totaal: {winner.totalPoints} punten</p>
        </div>
      )}

      <div className="card mb-3">
        <div className="flex gap-2 mb-3" style={{ flexWrap: 'wrap' }}>
          <button className="btn btn-primary" onClick={onEndRound} style={{ flex: 1, minWidth: '200px' }}>
            ✅ Einde Ronde
          </button>
          <button className="btn btn-secondary" onClick={onViewHistory} style={{ flex: 1, minWidth: '200px' }}>
            📜 Rondegeschiedenis
          </button>
        </div>
        <div className="flex gap-2" style={{ flexWrap: 'wrap' }}>
          <button className="btn btn-secondary" onClick={onGeneratePhase} style={{ flex: 1, minWidth: '200px' }}>
            🎲 Random Fase
          </button>
          <button className="btn btn-danger" onClick={onNewGame} style={{ flex: 1, minWidth: '200px' }}>
            🔄 Nieuw Spel
          </button>
        </div>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Speler</th>
              <th>Fase</th>
              <th>Totaal Punten</th>
              <th>Laatste Ronde</th>
            </tr>
          </thead>
          <tbody>
            {sortedScores.map((score, index) => (
              <tr key={score.playerId}>
                <td>{index + 1}</td>
                <td>
                  <strong style={{ color: 'var(--light)' }}>{score.name}</strong>
                  {score.currentPhase >= 10 && (
                    <span className="badge badge-success" style={{ marginLeft: '0.5rem' }}>
                      Voltooid!
                    </span>
                  )}
                </td>
                <td>
                  <span
                    className="badge"
                    style={{
                      background: 'var(--primary)',
                      color: 'white',
                      fontSize: '1rem',
                      padding: '0.5rem 1rem',
                    }}
                  >
                    Fase {score.currentPhase}
                  </span>
                </td>
                <td>
                  <strong style={{ fontSize: '1.2rem', color: 'var(--light)' }}>
                    {score.totalPoints}
                  </strong>
                </td>
                <td style={{ color: score.lastRoundPoints > 0 ? 'var(--danger)' : 'var(--success)' }}>
                  +{score.lastRoundPoints}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
