import { useEffect, useState } from 'react';
import { GameState, Player, RoundEntry, Round } from './types';
import { PlayerSetup } from './components/PlayerSetup';
import { Scoreboard } from './components/Scoreboard';
import { EndRoundModal } from './components/EndRoundModal';
import { RoundHistory } from './components/RoundHistory';
import { PhaseGenerator } from './components/PhaseGenerator';
import { Toast } from './components/Toast';
import { calculatePlayerScores, recalculateFromRound } from './utils/gameLogic';
import { saveGame, loadGame, clearGame } from './utils/storage';
import { useI18n } from './i18n';
import './App.css';

type ModalType = 'endRound' | 'history' | 'generator' | null;

type ToastState = {
  messageKey: string;
  messageVars?: Record<string, string | number>;
  action?: { labelKey: string; onClick: () => void };
} | null;

function App() {
  const { lang, setLang, t } = useI18n();

  const [gameState, setGameState] = useState<GameState>(() => {
    const saved = loadGame();
    return (
      saved || {
        players: [],
        rounds: [],
        currentRound: 1,
        gameStarted: false,
      }
    );
  });

  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [editingRound, setEditingRound] = useState<number | null>(null);
  const [toast, setToast] = useState<ToastState>(null);
  const [lastAction, setLastAction] = useState<{ type: 'round'; data: GameState } | null>(null);

  // Auto-save whenever game state changes
  useEffect(() => {
    if (gameState.gameStarted) {
      saveGame(gameState);
    }
  }, [gameState]);

  const startGame = (players: Player[]) => {
    setGameState({
      players,
      rounds: [],
      currentRound: 1,
      gameStarted: true,
    });
  };

  const endRound = (entries: RoundEntry[]) => {
    const newRound: Round = {
      id: Date.now().toString(),
      roundNumber: gameState.currentRound,
      entries,
      timestamp: Date.now(),
    };

    const previousState = { ...gameState };
    const newState = {
      ...gameState,
      rounds: [...gameState.rounds, newRound],
      currentRound: gameState.currentRound + 1,
    };

    setGameState(newState);
    setLastAction({ type: 'round', data: previousState });
    setActiveModal(null);
    setToast({
      messageKey: 'toast.roundSaved',
      action: {
        labelKey: 'action.undo',
        onClick: undoLastRound,
      },
    });
  };

  const undoLastRound = () => {
    if (lastAction && lastAction.type === 'round') {
      setGameState(lastAction.data);
      setLastAction(null);
      setToast({ messageKey: 'toast.roundUndone' });
    }
  };

  const editRound = (roundIndex: number, entries: RoundEntry[]) => {
    const updatedRounds = [...gameState.rounds];
    updatedRounds[roundIndex] = {
      ...updatedRounds[roundIndex],
      entries,
    };

    const newState = recalculateFromRound(
      {
        ...gameState,
        rounds: updatedRounds,
      },
      roundIndex
    );

    setGameState(newState);
    setEditingRound(null);
    setActiveModal(null);
    setToast({ messageKey: 'toast.roundUpdated' });
  };

  const resetToSetup = () => {
    clearGame();
    setGameState({
      players: [],
      rounds: [],
      currentRound: 1,
      gameStarted: false,
    });
    setLastAction(null);
    setToast(null);
    setActiveModal(null);
    setEditingRound(null);
  };

  const newGame = () => {
    if (confirm(t('confirm.newGame'))) {
      resetToSetup();
    }
  };

  const getCurrentPhases = (): Map<string, number> => {
    const phases = new Map<string, number>();

    gameState.players.forEach((player) => {
      let currentPhase = 1;
      gameState.rounds.forEach((round) => {
        const entry = round.entries.find((e) => e.playerId === player.id);
        if (entry) {
          currentPhase = entry.phaseAfterRound;
        }
      });
      phases.set(player.id, currentPhase);
    });

    return phases;
  };

  const scores = gameState.gameStarted ? calculatePlayerScores(gameState) : [];

  return (
    <div className="app">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <span className="navbar-brand fw-semibold">ome</span>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#phase10Navbar"
            aria-controls="phase10Navbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="phase10Navbar">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Extra opties
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <button className="dropdown-item" onClick={() => setActiveModal('history')}>
                      Rondegeschiedenis
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={() => setActiveModal('generator')}>
                      Custom fases
                    </button>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button className="dropdown-item text-danger" onClick={newGame}>
                      Nieuw spel
                    </button>
                  </li>
                </ul>
              </li>
            </ul>

            <div className="d-flex align-items-center gap-2">
              <select
                className="form-select form-select-sm"
                value={lang}
                onChange={(e) => setLang(e.target.value as any)}
                aria-label={t('common.language')}
                style={{ width: '110px' }}
              >
                <option value="nl">NL</option>
                <option value="en">EN</option>
              </select>
            </div>
          </div>
        </div>
      </nav>

      <div className="container my-3">
        {gameState.gameStarted && (
          <div className="text-muted mb-2" style={{ fontSize: '0.95rem' }}>
            {t('scoreboard.round', { round: gameState.currentRound })}
          </div>
        )}

        <div className="d-grid gap-2 mb-3">
          {gameState.gameStarted ? (
            <button className="btn btn-primary btn-lg" onClick={() => setActiveModal('endRound')}>
              Einde ronde
            </button>
          ) : (
            <button className="btn btn-primary btn-lg" onClick={resetToSetup}>
              Nieuw spel
            </button>
          )}
        </div>

        {gameState.gameStarted ? <Scoreboard scores={scores} /> : <PlayerSetup onStartGame={startGame} />}

        {/* Fases: voorlopig altijd een duidelijke knop onderaan (extra feature kan later uitgebreid worden) */}
        {gameState.gameStarted && (
          <div className="d-grid gap-2 mt-3">
            <button className="btn btn-outline-secondary" onClick={() => setActiveModal('generator')}>
              Genereer fases
            </button>
          </div>
        )}
      </div>

      {activeModal === 'endRound' && editingRound === null && (
        <EndRoundModal
          players={gameState.players}
          currentPhases={getCurrentPhases()}
          onSave={endRound}
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === 'endRound' && editingRound !== null && (
        <EndRoundModal
          players={gameState.players}
          currentPhases={getCurrentPhases()}
          onSave={(entries) => editRound(editingRound, entries)}
          onClose={() => {
            setEditingRound(null);
            setActiveModal(null);
          }}
        />
      )}

      {activeModal === 'history' && (
        <RoundHistory
          rounds={gameState.rounds}
          players={gameState.players}
          onEditRound={(index) => {
            setEditingRound(index);
            setActiveModal('endRound');
          }}
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === 'generator' && <PhaseGenerator onClose={() => setActiveModal(null)} />}

      {toast && (
        <Toast
          message={t(toast.messageKey, toast.messageVars)}
          action={
            toast.action
              ? {
                  label: t(toast.action.labelKey),
                  onClick: toast.action.onClick,
                }
              : undefined
          }
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default App;
