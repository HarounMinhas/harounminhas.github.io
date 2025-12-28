import { PhaseDefinition } from '../types';

const PHASE_POOL: Record<number, PhaseDefinition[]> = {
  1: [
    { level: 1, title: '2 sets van 3', description: 'Verzamel 2 sets van elk 3 kaarten met hetzelfde getal' },
    { level: 1, title: 'Set van 3 + Run van 4', description: '1 set van 3 kaarten + 1 run van 4 opeenvolgende kaarten' },
    { level: 1, title: '1 set van 4', description: 'Verzamel 4 kaarten met hetzelfde getal' },
  ],
  2: [
    { level: 2, title: 'Set van 5', description: 'Verzamel 5 kaarten met hetzelfde getal' },
    { level: 2, title: '2 sets van 4', description: 'Verzamel 2 sets van elk 4 kaarten met hetzelfde getal' },
    { level: 2, title: 'Run van 6', description: 'Maak een run van 6 opeenvolgende kaarten' },
  ],
  3: [
    { level: 3, title: 'Run van 7', description: 'Maak een run van 7 opeenvolgende kaarten' },
    { level: 3, title: 'Set van 6', description: 'Verzamel 6 kaarten met hetzelfde getal' },
    { level: 3, title: '2 runs van 4', description: 'Maak 2 runs van elk 4 opeenvolgende kaarten' },
  ],
  4: [
    { level: 4, title: 'Run van 8', description: 'Maak een run van 8 opeenvolgende kaarten' },
    { level: 4, title: 'Set van 7', description: 'Verzamel 7 kaarten met hetzelfde getal' },
    { level: 4, title: '7 kaarten van 1 kleur', description: 'Verzamel 7 kaarten van dezelfde kleur' },
  ],
  5: [
    { level: 5, title: 'Run van 9', description: 'Maak een run van 9 opeenvolgende kaarten' },
    { level: 5, title: '8 kaarten van 1 kleur', description: 'Verzamel 8 kaarten van dezelfde kleur' },
    { level: 5, title: 'Set van 8 + Set van 3', description: '1 set van 8 kaarten + 1 set van 3 kaarten' },
  ],
};

export function generateRandomPhase(difficulty: number): PhaseDefinition {
  const pool = PHASE_POOL[difficulty] || PHASE_POOL[3];
  const randomIndex = Math.floor(Math.random() * pool.length);
  return pool[randomIndex];
}

export function getAllPhases(): PhaseDefinition[] {
  return Object.values(PHASE_POOL).flat();
}
