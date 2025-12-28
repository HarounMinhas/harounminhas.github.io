import { useState } from 'react'
import { Player } from '../types'
import './StartScreen.css'

interface StartScreenProps {
  onStartGame: (players: Player[]) => void
}

function StartScreen({ onStartGame }: StartScreenProps) {
  const [players, setPlayers] = useState<Player[]>([])
  const [newPlayerName, setNewPlayerName] = useState('')
  const [error, setError] = useState('')

  const addPlayer = () => {
    const name = newPlayerName.trim()
    
    if (!name) {
      setError('Voer een naam in')
      return
    }

    if (players.some(p => p.name.toLowerCase() === name.toLowerCase())) {
      setError('Deze naam bestaat al')
      return
    }

    const newPlayer: Player = {
      id: Date.now().toString(),
      name
    }

    setPlayers([...players, newPlayer])
    setNewPlayerName('')
    setError('')
  }

  const removePlayer = (id: string) => {
    setPlayers(players.filter(p => p.id !== id))
  }

  const addDefaultPlayers = (count: number) => {
    const newPlayers: Player[] = []
    for (let i = 1; i <= count; i++) {
      newPlayers.push({
        id: Date.now().toString() + i,
        name: `Speler ${i}`
      })
    }
    setPlayers(newPlayers)
  }

  const handleStartGame = () => {
    if (players.length < 2) {
      setError('Voeg minimaal 2 spelers toe')
      return
    }
    onStartGame(players)
  }

  return (
    <div className="start-screen">
      <div className="card start-card">
        <h1 className="title">🎲 Phase 10 Scorekeeper</h1>
        <p className="subtitle">Voeg spelers toe om te beginnen</p>

        <div className="input-section">
          <div className="input-with-button">
            <input
              type="text"
              placeholder="Spelernaam"
              value={newPlayerName}
              onChange={(e) => setNewPlayerName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addPlayer()}
              className="player-input"
            />
            <button onClick={addPlayer} className="btn btn-primary">
              + Toevoegen
            </button>
          </div>
          {error && <p className="error-message">{error}</p>}
        </div>

        <div className="quick-actions">
          <button onClick={() => addDefaultPlayers(2)} className="btn btn-secondary btn-sm">
            2 spelers
          </button>
          <button onClick={() => addDefaultPlayers(4)} className="btn btn-secondary btn-sm">
            4 spelers
          </button>
          <button onClick={() => addDefaultPlayers(6)} className="btn btn-secondary btn-sm">
            6 spelers
          </button>
        </div>

        {players.length > 0 && (
          <div className="players-list">
            <h3>Spelers ({players.length})</h3>
            <div className="players-grid">
              {players.map(player => (
                <div key={player.id} className="player-item">
                  <span>{player.name}</span>
                  <button 
                    onClick={() => removePlayer(player.id)}
                    className="btn-icon btn-danger"
                    title="Verwijder"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <button 
          onClick={handleStartGame}
          disabled={players.length < 2}
          className="btn btn-primary btn-large"
        >
          Start Spel →
        </button>
      </div>
    </div>
  )
}

export default StartScreen
