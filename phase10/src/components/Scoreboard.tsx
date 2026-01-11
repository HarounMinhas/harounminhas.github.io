import { PlayerScore } from '../types';
import { useI18n } from '../i18n';

interface ScoreboardProps {
  scores: PlayerScore[];
}

export function Scoreboard({ scores }: ScoreboardProps) {
  const { t } = useI18n();

  const sortedScores = [...scores].sort((a, b) => {
    if (a.currentPhase !== b.currentPhase) {
      return b.currentPhase - a.currentPhase;
    }
    return a.totalPoints - b.totalPoints;
  });

  return (
    <div className="table-responsive">
      <table className="table table-striped align-middle">
        <thead>
          <tr>
            <th>{t('table.player')}</th>
            <th>{t('table.totalPoints')}</th>
            <th>{t('table.phase')}</th>
          </tr>
        </thead>
        <tbody>
          {sortedScores.map((score) => (
            <tr key={score.playerId}>
              <td style={{ fontWeight: 600 }}>{score.name}</td>
              <td>{score.totalPoints}</td>
              <td>{t('phase.label', { phase: score.currentPhase })}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
