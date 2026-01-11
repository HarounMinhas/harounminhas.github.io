import { useState } from 'react'
import { Player } from '../types'
import './StartScreen.css'
import { useI18n } from '../i18n'

interface StartScreenProps {
  onStartGame: (players: Player[]) => void
}

type ErrorKey = 'error.enterName' | 'error.nameExists' | 'error.minPlayers' | null

function StartScreen({ onStartGame }: StartScreenProps) {
  const { t } = useI18n()

  const [players, setPlayers] = useState<Player[]>([])
  const [newPlayerName, setNewPlayerName] = useState('')
  const [errorKey, setErrorKey] = useState<ErrorKey>(null)

  const addPlayer = () => {
    const name = newPlayerName.trim()

    if (!name) {
      setErrorKey('error.enterName')
      return
    }

    if (players.some((p) => p.name.toLowerCase() === name.toLowerCase())) {
      setErrorKey('error.nameExists')
      return
    }

    const newPlayer: Player = {
      id: Date.now().toString(),
      name,
    }

    setPlayers([...players, newPlayer])
    setNewPlayerName('')
    setErrorKey(null)
  }

  const removePlayer = (id: string) => {
    setPlayers(players.filter((p) => p.id !== id))
  }

  const addDefaultPlayers = (count: number) => {
    const newPlayers: Player[] = []
    for (let i = 1; i <= count; i++) {
      newPlayers.push({
        id: Date.now().toString() + i,
        name: t('table.player') === 'Speler' ? `Speler ${i}` : `Player ${i}`,
      })
    }
    setPlayers(newPlayers)
  }

  const handleStartGame = () => {
    if (players.length < 2) {
      setErrorKey('error.minPlayers')
      return
    }
    onStartGame(players)
  }

  return (
    <div className="start-screen">
      <div className="card start-card">
        <h1 className="title">{t('scoreboard.title')}</h1>
        <p className="subtitle">{t('start.subtitle')}</p>

        <div className="input-section">
          <div className="input-with-button">
            <input
              type="text"
              placeholder={t('start.placeholder.playerName')}
              value={newPlayerName}
              onChange={(e) => setNewPlayerName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addPlayer()}
              className="player-input"
            />
            <button onClick={addPlayer} className="btn btn-primary">
              {t('start.btn.add')}
            </button>
          </div>
          {errorKey && <p className="error-message">{t(errorKey)}</p>}
        </div>

        <div className="quick-actions">
          <button onClick={() => addDefaultPlayers(2)} className="btn btn-secondary btn-sm">
            {t('start.quick.2')}
          </button>
          <button onClick={() => addDefaultPlayers(4)} className="btn btn-secondary btn-sm">
            {t('start.quick.4')}
          </button>
          <button onClick={() => addDefaultPlayers(6)} className="btn btn-secondary btn-sm">
            {t('start.quick.6')}
          </button>
        </div>

        {players.length > 0 && (
          <div className="players-list">
            <h3>{t('start.section.players', { count: players.length })}</h3>
            <div className="players-grid">
              {players.map((player) => (
                <div key={player.id} className="player-item">
                  <span>{player.name}</span>
                  <button
                    onClick={() => removePlayer(player.id)}
                    className="btn-icon btn-danger"
                    title={t('start.tooltip.remove')}
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
          {t('start.btn.start')}
        </button>
      </div>
    </div>
  )
}

export default StartScreen
