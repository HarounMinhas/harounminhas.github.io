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

  // Default Phase 10 phases
  const defaultPhases = [
    { phase: 1, description: '2 sets of 3' },
    { phase: 2, description: '1 set of 3 + 1 run of 4' },
    { phase: 3, description: '1 set of 4 + 1 run of 4' },
    { phase: 4, description: '1 run of 7' },
    { phase: 5, description: '1 run of 8' },
    { phase: 6, description: '1 run of 9' },
    { phase: 7, description: '2 sets of 4' },
    { phase: 8, description: '7 cards of one color' },
    { phase: 9, description: '1 set of 5 + 1 set of 2' },
    { phase: 10, description: '1 set of 5 + 1 set of 3' },
  ];

  return (
    <div className="scoreboard-container">
      {/* Header with title and menu */}
      <div className="scoreboard-header-bar">
        <h1 className="scoreboard-title">{t('scoreboard.title')}</h1>
        
        <div className="menu-container">
          <button 
            className="btn-menu" 
            onClick={() => setMenuOpen(!menuOpen)}
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

      {/* Round indicator */}
      <p className="round-indicator-top">
        {t('scoreboard.round', { round: currentRound })}
      </p>

      {/* Players scores table */}
      <div className="scores-section">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>{t('table.player')}</th>
                <th>{t('table.phase')}</th>
                <th>{t('table.totalPoints')}</th>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* End Round button */}
      <button className="btn btn-primary btn-large" onClick={onEndRound}>
        {t('scoreboard.btn.endRound')}
      </button>

      {/* Phases reference table at bottom */}
      <div className="phases-reference-section">
        <h3 className="phases-reference-title">Phase Descriptions</h3>
        <div className="table-container">
          <table className="table phases-table">
            <thead>
              <tr>
                <th>Phase #</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {defaultPhases.map((phase) => (
                <tr key={phase.phase}>
                  <td style={{ fontWeight: 600 }}>Phase {phase.phase}</td>
                  <td>{phase.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
