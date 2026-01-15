import { useState, useEffect } from 'react';
import { GameState, Player, RoundEntry, Round, PhaseDefinition } from './types';
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
  const { t } = useI18n();

  const [gameState, setGameState] = useState<GameState>(() => {
    const saved = loadGame();
    if (saved) {
      return {
        ...saved,
        phases: saved.phases ?? [],
      };
    }

    return {
      players: [],
      rounds: [],
      currentRound: 1,
      gameStarted: false,
      phases: [],
    };
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
      phases: [],
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
    const newState: GameState = {
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
      phases: [],
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

  if (!gameState.gameStarted) {
    return (
      <div className="app">
        <PlayerSetup onStartGame={startGame} />
      </div>
    );
  }

  const phasesList = gameState.phases ?? [];

  const applyPhases = (phases: PhaseDefinition[]) => {
    setGameState((prev) => ({
      ...prev,
      phases,
    }));
  };

  return (
    <div className="app">
      <Scoreboard
        scores={scores}
        currentRound={gameState.currentRound}
        phases={phasesList}
        onEndRound={() => setActiveModal('endRound')}
        onViewHistory={() => setActiveModal('history')}
        onNewGame={newGame}
        onGeneratePhase={() => setActiveModal('generator')}
      />

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

      {activeModal === 'generator' && (
        <PhaseGenerator
          initialPhases={phasesList}
          onCancel={() => setActiveModal(null)}
          onConfirm={(phases) => {
            applyPhases(phases);
            setActiveModal(null);
          }}
        />
      )}

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
