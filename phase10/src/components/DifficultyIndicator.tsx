interface DifficultyIndicatorProps {
  level: number;
  maxLevel?: number;
}

export function DifficultyIndicator({ level, maxLevel = 5 }: DifficultyIndicatorProps) {
  return (
    <div className="difficulty-dots">
      {Array.from({ length: maxLevel }, (_, i) => i + 1).map(dot => (
        <div 
          key={dot} 
          className={`difficulty-dot ${dot <= level ? 'active' : ''}`}
        />
      ))}
    </div>
  );
}
