export interface Player {
  id: string;
  name: string;
}

export interface RoundEntry {
  playerId: string;
  points: number;
  phaseAfterRound: number;
  phaseCompleted: boolean;
}

export interface Round {
  id: string;
  roundNumber: number;
  entries: RoundEntry[];
  timestamp: number;
}

export interface GameState {
  players: Player[];
  rounds: Round[];
  currentRound: number;
  gameStarted: boolean;
}

export interface PlayerScore {
  playerId: string;
  name: string;
  currentPhase: number;
  totalPoints: number;
  lastRoundPoints: number;
}

export interface PhaseDefinition {
  level: number;
  title: string;
  description: string;
}
