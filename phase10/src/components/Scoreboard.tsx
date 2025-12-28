import { useState } from 'react'
import { GameState, PlayerStats, Round } from '../types'
import RoundModal from './RoundModal'
import HistoryModal from './HistoryModal'
import PhaseGenerator from './PhaseGenerator'
import './Scoreboard.css'

interface ScoreboardProps {
  gameState: GameState
  onResetGame: () => void
  onUpdateGameState: (newState: GameState) => void
}

function Scoreboard({ gameState, onResetGame, onUpdateGameState }: ScoreboardProps) {
  const [showRoundModal, setShowRoundModal] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [showGenerator, setShowGenerator] = useState(false)
  const [showUndo, setShowUndo] = useState(false)
  const [lastRound, setLastRound] = useState<Round | null>(null)

  const getPlayerStats = (): PlayerStats[] => {
    return gameState.players.map(player => {
      let totalPoints = 0
      let currentPhase = 1
      let lastRoundPoints = 0

      gameState.rounds.forEach((round, index) => {
        const score = round.scores.find(s => s.playerId === player.id)
        if (score) {
          totalPoints += score.points
          currentPhase = score.phaseAfterRound
          if (index === gameState.rounds.length - 1) {
            lastRoundPoints = score.points
          }
        }
      })

      return {
        playerId: player.id,
        name: player.name,
        currentPhase,
        totalPoints,
        lastRoundPoints
      }
    })
  }

  const completeRound = (round: Round) => {
    const newState = {
      ...gameState,
      rounds: [...gameState.rounds, round],
      currentRound: gameState.currentRound + 1
    }
    setLastRound(round)
    setShowUndo(true)
    onUpdateGameState(newState)
    setShowRoundModal(false)
    setTimeout(() => setShowUndo(false), 5000)
  }

  const undoLastRound = () => {
    if (gameState.rounds.length > 0) {
      const newState = {
        ...gameState,
        rounds: gameState.rounds.slice(0, -1),
        currentRound: gameState.currentRound - 1
      }
      onUpdateGameState(newState)
      setShowUndo(false)
      setLastRound(null)
    }
  }

  const stats = getPlayerStats()
  const sortedStats = [...stats].sort((a, b) => {
    if (a.currentPhase !== b.currentPhase) {
      return b.currentPhase - a.currentPhase
    }
    return a.totalPoints - b.totalPoints
  })

  return (
    <div className="scoreboard-container">
      <div className="scoreboard">
        <div className="scoreboard-header">
          <div>
            <h1 className="scoreboard-title">🎲 Phase 10</h1>
            <p className="round-info">Ronde {gameState.currentRound + 1}</p>
          </div>
          <div className="header-actions">
            <button onClick={() => setShowGenerator(true)} className="btn btn-secondary btn-sm">
              🎲 Generator
            </button>
            <button onClick={() => setShowHistory(true)} className="btn btn-secondary btn-sm">
              📜 Geschiedenis
            </button>
            <button onClick={onResetGame} className="btn btn-danger btn-sm">
              🔄 Nieuw Spel
            </button>
          </div>
        </div>

        <div className="scoreboard-table-container">
          <table className="scoreboard-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Speler</th>
                <th>Fase</th>
                <th>Totaal</th>
                <th className="last-round-col">Laatste Ronde</th>
              </tr>
            </thead>
            <tbody>
              {sortedStats.map((player, index) => (
                <tr key={player.playerId} className={index === 0 ? 'leader' : ''}>
                  <td className="rank">
                    {index === 0 ? '🏆' : index + 1}
                  </td>
                  <td className="player-name">{player.name}</td>
                  <td>
                    <span className="phase-badge">
                      Fase {player.currentPhase}
                    </span>
                  </td>
                  <td className="total-points">{player.totalPoints}</td>
                  <td className="last-round-points">
                    {player.lastRoundPoints > 0 ? `+${player.lastRoundPoints}` : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button 
          onClick={() => setShowRoundModal(true)}
          className="btn btn-primary btn-large end-round-btn"
        >
          Einde Ronde →
        </button>
      </div>

      {showRoundModal && (
        <RoundModal
          gameState={gameState}
          onClose={() => setShowRoundModal(false)}
          onComplete={completeRound}
        />
      )}

      {showHistory && (
        <HistoryModal
          gameState={gameState}
          onClose={() => setShowHistory(false)}
          onUpdateGameState={onUpdateGameState}
        />
      )}

      {showGenerator && (
        <PhaseGenerator onClose={() => setShowGenerator(false)} />
      )}

      {showUndo && lastRound && (
        <div className="toast">
          <span>Ronde {gameState.currentRound} opgeslagen</span>
          <button onClick={undoLastRound} className="btn btn-secondary btn-sm">
            Ongedaan maken
          </button>
        </div>
      )}
    </div>
  )
}

export default Scoreboard
