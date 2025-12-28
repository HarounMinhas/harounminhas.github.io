import { GameState, PlayerScore } from '../types';

export function calculatePlayerScores(gameState: GameState): PlayerScore[] {
  return gameState.players.map(player => {
    let totalPoints = 0;
    let currentPhase = 1;
    let lastRoundPoints = 0;

    gameState.rounds.forEach((round, index) => {
      const entry = round.entries.find(e => e.playerId === player.id);
      if (entry) {
        totalPoints += entry.points;
        currentPhase = entry.phaseAfterRound;
        if (index === gameState.rounds.length - 1) {
          lastRoundPoints = entry.points;
        }
      }
    });

    return {
      playerId: player.id,
      name: player.name,
      currentPhase,
      totalPoints,
      lastRoundPoints,
    };
  });
}

export function recalculateFromRound(gameState: GameState, fromRoundIndex: number): GameState {
  // Recalculate all phases and points from a specific round onwards
  const newRounds = [...gameState.rounds];
  
  for (let i = fromRoundIndex; i < newRounds.length; i++) {
    const round = newRounds[i];
    const previousRound = i > 0 ? newRounds[i - 1] : null;
    
    round.entries = round.entries.map(entry => {
      if (previousRound) {
        const prevEntry = previousRound.entries.find(e => e.playerId === entry.playerId);
        if (prevEntry && !entry.phaseCompleted) {
          // If phase wasn't completed, keep previous phase
          entry.phaseAfterRound = prevEntry.phaseAfterRound;
        }
      }
      return entry;
    });
  }
  
  return {
    ...gameState,
    rounds: newRounds,
  };
}

export function getWinner(scores: PlayerScore[]): PlayerScore | null {
  const phase10Players = scores.filter(s => s.currentPhase >= 10);
  if (phase10Players.length === 0) return null;
  
  return phase10Players.reduce((winner, player) => 
    player.totalPoints < winner.totalPoints ? player : winner
  );
}
