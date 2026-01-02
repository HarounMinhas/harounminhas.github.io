interface DifficultySelectorProps {
  difficulty: number;
  onDifficultyChange: (difficulty: number) => void;
}

export function DifficultySelector({ difficulty, onDifficultyChange }: DifficultySelectorProps) {
  return (
    <div className="form-group">
      <label className="form-label">
        Moeilijkheid: {difficulty}
      </label>
      <input
        type="range"
        min="1"
        max="5"
        value={difficulty}
        onChange={(e) => onDifficultyChange(parseInt(e.target.value))}
      />
      <div className="flex justify-between" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
        <span>Makkelijk</span>
        <span>Moeilijk</span>
      </div>
    </div>
  );
}
