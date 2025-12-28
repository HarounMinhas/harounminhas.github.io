export interface Player {
  id: string
  name: string
}

export interface RoundScore {
  playerId: string
  points: number
  phaseAfterRound: number
  phaseCompleted: boolean
}

export interface Round {
  roundNumber: number
  scores: RoundScore[]
}

export interface GameState {
  players: Player[]
  rounds: Round[]
  currentRound: number
}

export interface PlayerStats {
  playerId: string
  name: string
  currentPhase: number
  totalPoints: number
  lastRoundPoints: number
}

export interface PhaseDefinition {
  id: number
  title: string
  description: string
  difficulty: number
}
