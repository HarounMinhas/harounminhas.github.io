import { PlayerScore } from '../types';
import { getWinner } from '../utils/gameLogic';
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
  onGeneratePhase,
}: ScoreboardProps) {
  const { lang, setLang, t } = useI18n();

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
        <div className="flex justify-between align-center" style={{ flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1>{t('scoreboard.title')}</h1>
            <p>{t('scoreboard.round', { round: currentRound })}</p>
          </div>
          <select
            className="form-select"
            value={lang}
            onChange={(e) => setLang(e.target.value as any)}
            aria-label={t('common.language')}
            style={{ width: '120px' }}
          >
            <option value="nl">🇧🇪 NL</option>
            <option value="en">🇬🇧 EN</option>
          </select>
        </div>
      </div>

      {winner && (
        <div
          className="card mb-3"
          style={{
            background: 'linear-gradient(135deg, var(--success), var(--primary))',
            textAlign: 'center',
          }}
        >
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{t('scoreboard.winnerTitle')}</h2>
          <p style={{ fontSize: '1.5rem', fontWeight: 600 }}>{winner.name}</p>
          <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>
            {t('scoreboard.totalPoints', { points: winner.totalPoints })}
          </p>
        </div>
      )}

      <div className="card mb-3">
        <div className="flex gap-2 mb-3" style={{ flexWrap: 'wrap' }}>
          <button className="btn btn-primary" onClick={onEndRound} style={{ flex: 1, minWidth: '200px' }}>
            {t('scoreboard.btn.endRound')}
          </button>
          <button className="btn btn-secondary" onClick={onViewHistory} style={{ flex: 1, minWidth: '200px' }}>
            {t('scoreboard.btn.history')}
          </button>
        </div>
        <div className="flex gap-2" style={{ flexWrap: 'wrap' }}>
          <button className="btn btn-secondary" onClick={onGeneratePhase} style={{ flex: 1, minWidth: '200px' }}>
            {t('scoreboard.btn.customPhases')}
          </button>
          <button className="btn btn-danger" onClick={onNewGame} style={{ flex: 1, minWidth: '200px' }}>
            {t('scoreboard.btn.newGame')}
          </button>
        </div>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>{t('table.rank')}</th>
              <th>{t('table.player')}</th>
              <th>{t('table.phase')}</th>
              <th>{t('table.totalPoints')}</th>
              <th>{t('table.lastRound')}</th>
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
                      {t('badge.completed')}
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
                    {t('phase.label', { phase: score.currentPhase })}
                  </span>
                </td>
                <td>
                  <strong style={{ fontSize: '1.2rem', color: 'var(--light)' }}>{score.totalPoints}</strong>
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
