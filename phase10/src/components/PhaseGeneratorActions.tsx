interface PhaseGeneratorActionsProps {
  isReplaceMode: boolean;
  canGenerate: boolean;
  onGenerate: () => void;
  onSurpriseMe: () => void;
}

export function PhaseGeneratorActions({ 
  isReplaceMode, 
  canGenerate, 
  onGenerate, 
  onSurpriseMe 
}: PhaseGeneratorActionsProps) {
  return (
    <div className="flex gap-2 mb-3">
      <button 
        className="btn btn-primary" 
        onClick={onGenerate} 
        disabled={!canGenerate}
        style={{ flex: 1 }}
      >
        {isReplaceMode ? '🔄 Vervang Fase' : '➕ Genereer Fase'}
      </button>
      <button 
        className="btn btn-secondary" 
        onClick={onSurpriseMe}
        style={{ flex: 1 }}
      >
        ✨ Surprise Me!
      </button>
    </div>
  );
}
