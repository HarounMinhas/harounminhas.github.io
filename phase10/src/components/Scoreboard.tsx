import { useState } from 'react';
import { PlayerScore } from '../types';
import { useI18n } from '../i18n';

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
  onGeneratePhase 
}: ScoreboardProps) {
  const { t } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);

  const sortedScores = [...scores].sort((a, b) => {
    if (a.currentPhase !== b.currentPhase) {
      return b.currentPhase - a.currentPhase;
    }
    return a.totalPoints - b.totalPoints;
  });

  const handleMenuAction = (action: () => void) => {
    action();
    setMenuOpen(false);
  };

  return (
    <div className="scoreboard-container">
      <div className="scoreboard-header">
        <h1>{t('scoreboard.title')}</h1>
        <p className="round-indicator">
          {t('scoreboard.round', { round: currentRound })}
        </p>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>{t('table.player')}</th>
              <th>{t('table.phase')}</th>
              <th>{t('table.totalPoints')}</th>
              <th>{t('table.lastRound')}</th>
            </tr>
          </thead>
          <tbody>
            {sortedScores.map((score, index) => (
              <tr key={score.playerId} className={index === 0 ? 'leader' : ''}>
                <td style={{ fontWeight: 600 }}>
                  {index === 0 && '👑 '}
                  {score.name}
                </td>
                <td>{t('phase.label', { phase: score.currentPhase })}</td>
                <td>{score.totalPoints}</td>
                <td className="last-round-points">
                  {score.lastRoundPoints > 0 ? `+${score.lastRoundPoints}` : score.lastRoundPoints}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="action-buttons">
        <button className="btn btn-primary btn-large" onClick={onEndRound}>
          {t('scoreboard.btn.endRound')}
        </button>
        
        <div className="menu-container">
          <button 
            className="btn btn-secondary" 
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ width: '100%' }}
          >
            ☰ Menu
          </button>
          
          {menuOpen && (
            <>
              <div className="menu-overlay" onClick={() => setMenuOpen(false)} />
              <div className="menu-dropdown">
                <button 
                  className="menu-item" 
                  onClick={() => handleMenuAction(onViewHistory)}
                >
                  📜 {t('scoreboard.btn.viewHistory')}
                </button>
                <button 
                  className="menu-item" 
                  onClick={() => handleMenuAction(onGeneratePhase)}
                >
                  ✨ {t('scoreboard.btn.phaseGenerator')}
                </button>
                <button 
                  className="menu-item menu-item-danger" 
                  onClick={() => handleMenuAction(onNewGame)}
                >
                  🔄 {t('scoreboard.btn.newGame')}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
