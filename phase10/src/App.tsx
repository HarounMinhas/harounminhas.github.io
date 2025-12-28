import { useState, useEffect } from 'react'
import StartScreen from './components/StartScreen'
import Scoreboard from './components/Scoreboard'
import { GameState, Player } from './types'
import './App.css'

const STORAGE_KEY = 'phase10-game-state'

function App() {
  const [gameState, setGameState] = useState<GameState | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : null
  })

  useEffect(() => {
    if (gameState) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState))
    }
  }, [gameState])

  const startGame = (players: Player[]) => {
    const newGame: GameState = {
      players,
      rounds: [],
      currentRound: 0
    }
    setGameState(newGame)
  }

  const resetGame = () => {
    localStorage.removeItem(STORAGE_KEY)
    setGameState(null)
  }

  const updateGameState = (newState: GameState) => {
    setGameState(newState)
  }

  return (
    <div className="app">
      {!gameState ? (
        <StartScreen onStartGame={startGame} />
      ) : (
        <Scoreboard 
          gameState={gameState} 
          onResetGame={resetGame}
          onUpdateGameState={updateGameState}
        />
      )}
    </div>
  )
}

export default App
