import { useState } from 'react';
import { PlayerScore, PhaseDefinition } from '../types';
import { useI18n } from '../i18n';

interface ScoreboardProps {
  scores: PlayerScore[];
  currentRound: number;
  phases: PhaseDefinition[];
  onEndRound: () => void;
  onViewHistory: () => void;
  onNewGame: () => void;
  onGeneratePhase: () => void;
}

export function Scoreboard({
  scores,
  currentRound,
  phases,
  onEndRound,
  onViewHistory,
  onNewGame,
  onGeneratePhase,
}: ScoreboardProps) {
  const { t, lang, setLang } = useI18n();
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

  const handleLanguage = (next: 'nl' | 'en') => {
    setLang(next);
    setMenuOpen(false);
  };

  return (
    <div className="scoreboard-container">
      <div className="scoreboard-header-bar">
        <h1 className="scoreboard-title">{t('app.title')}</h1>

        <div className="menu-container">
          <button className="btn-menu" onClick={() => setMenuOpen(!menuOpen)}>
            ☰ {t('nav.toggle')}
          </button>

          {menuOpen && (
            <>
              <div className="menu-overlay" onClick={() => setMenuOpen(false)} />
              <div className="menu-dropdown">
                <button className="menu-item" onClick={() => handleMenuAction(onViewHistory)}>
                  📜 {t('nav.history')}
                </button>
                <button className="menu-item" onClick={() => handleMenuAction(onGeneratePhase)}>
                  ✨ {t('nav.customPhases')}
                </button>

                <div className="menu-item menu-item-static" onClick={(e) => e.stopPropagation()}>
                  <span>🌐 {t('common.language')}</span>
                  <span className="menu-lang-buttons">
                    <button
                      className={`btn btn-small ${lang === 'nl' ? 'btn-primary' : 'btn-secondary'}`}
                      onClick={() => handleLanguage('nl')}
                      type="button"
                    >
                      NL
                    </button>
                    <button
                      className={`btn btn-small ${lang === 'en' ? 'btn-primary' : 'btn-secondary'}`}
                      onClick={() => handleLanguage('en')}
                      type="button"
                    >
                      EN
                    </button>
                  </span>
                </div>

                <button className="menu-item menu-item-danger" onClick={() => handleMenuAction(onNewGame)}>
                  🔄 {t('nav.newGame')}
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <p className="round-indicator-top">{t('scoreboard.round', { round: currentRound })}</p>

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

      <button className="btn btn-primary btn-large" onClick={onEndRound}>
        {t('action.endRound')}
      </button>

      <div className="phases-reference-section">
        <h3 className="phases-reference-title">{t('phases.overview.title')}</h3>

        {phases.length === 0 ? (
          <div className="p10-empty-phases">
            <p style={{ color: 'var(--text-secondary)' }}>{t('phases.overview.empty')}</p>
            <button className="btn btn-primary" onClick={onGeneratePhase}>
              {t('action.generatePhases')}
            </button>
          </div>
        ) : (
          <div className="table-container">
            <table className="table phases-table">
              <thead>
                <tr>
                  <th>{t('phases.overview.col.phase')}</th>
                  <th>{t('phases.overview.col.description')}</th>
                </tr>
              </thead>
              <tbody>
                {phases.map((phase, idx) => (
                  <tr key={idx}>
                    <td style={{ fontWeight: 600 }}>{t('phase.label', { phase: idx + 1 })}</td>
                    <td>
                      {phase.title} — {phase.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
