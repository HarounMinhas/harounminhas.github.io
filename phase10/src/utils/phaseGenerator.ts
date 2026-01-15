import { PhaseDefinition } from '../types';

// Phase 10 feasibility notes used for this generator:
// - Players have 10 cards in hand.
// - A phase must be completable with <= 10 cards.
// - Runs in Phase 10 are 4+ consecutive cards (color does NOT matter).
// - The official game includes sets as small as 2 cards (Phase 9).
// - To keep custom phases playable, this pool avoids extreme sets (6+), and avoids runs smaller than 4.

const PHASE_POOL: Record<number, PhaseDefinition[]> = {
  // Level 1: Beginner (easy, usually <= 8 cards)
  1: [
    { level: 1, title: '2 sets van 3', description: 'Official Phase 1: maak 2 sets van elk 3 kaarten (6 kaarten totaal)' },
    { level: 1, title: '1 set van 3 + 1 run van 4', description: 'Official Phase 2: 1 set van 3 + 1 run van 4 kaarten (7 kaarten totaal)' },
    { level: 1, title: '1 set van 4', description: 'Maak 1 set van 4 identieke kaarten (4 kaarten)' },
    { level: 1, title: '1 set van 5', description: 'Maak 1 set van 5 identieke kaarten (5 kaarten)' },
    { level: 1, title: '1 run van 4', description: 'Maak een run van 4 opeenvolgende kaarten (4 kaarten)' },
    { level: 1, title: '1 run van 5', description: 'Maak een run van 5 opeenvolgende kaarten (5 kaarten)' },
    { level: 1, title: '3 sets van 2', description: 'Maak 3 verschillende paren (6 kaarten totaal)' },
    { level: 1, title: '4 sets van 2', description: 'Maak 4 verschillende paren (8 kaarten totaal)' },
    { level: 1, title: '5 even getallen', description: 'Verzamel 5 kaarten met even getallen: 2, 4, 6, 8, 10, 12 (5 kaarten)' },
    { level: 1, title: '5 oneven getallen', description: 'Verzamel 5 kaarten met oneven getallen: 1, 3, 5, 7, 9, 11 (5 kaarten)' },
    { level: 1, title: '3 kaarten onder 5 + 3 kaarten boven 8', description: 'Lage kaarten (1-4) en hoge kaarten (9-12) (6 kaarten totaal)' },
    { level: 1, title: '7 kaarten tussen 3 en 9', description: 'Alle kaarten moeten tussen 3 en 9 liggen (7 kaarten)' },
  ],

  // Level 2: Easy (official phases 3-4, mostly 7-10 cards)
  2: [
    { level: 2, title: '1 set van 4 + 1 run van 4', description: 'Official Phase 3: balans tussen sets en runs (8 kaarten totaal)' },
    { level: 2, title: '1 run van 7', description: 'Official Phase 4: maak een run van 7 opeenvolgende kaarten (7 kaarten)' },
    { level: 2, title: '2 sets van 4', description: 'Official Phase 7: maak 2 sets van elk 4 kaarten (8 kaarten totaal)' },
    { level: 2, title: '7 kaarten van 1 kleur', description: 'Official Phase 8: alle kaarten van dezelfde kleur (7 kaarten)' },
    { level: 2, title: '2 runs van 4', description: 'Twee middelgrote runs (8 kaarten totaal)' },
    { level: 2, title: '8 kaarten van 2 kleuren', description: 'Verdeel over twee kleuren, minimaal 3 per kleur (8 kaarten)' },
    { level: 2, title: '1 run van 6 + 1 set van 2', description: 'Lange run met een pair (8 kaarten totaal)' },
    { level: 2, title: '4 even + 4 oneven', description: 'Balans tussen even en oneven getallen (8 kaarten totaal)' },
    { level: 2, title: '6 kaarten onder 7', description: 'Verzamel alleen lage kaarten 1-6 (6 kaarten)' },
    { level: 2, title: '6 kaarten boven 6', description: 'Verzamel alleen hoge kaarten 7-12 (6 kaarten)' },
    { level: 2, title: '2 sets van 3 + 1 run van 4', description: 'Twee sets plus een run (10 kaarten totaal)' },
    { level: 2, title: '1 set van 3 + 1 set van 2 + 1 run van 4', description: 'Meerdere kleine groepen (9 kaarten totaal)' },
  ],

  // Level 3: Medium (longer runs and 9-10 card phases)
  3: [
    { level: 3, title: '1 run van 8', description: 'Official Phase 5: zeer lange run (8 kaarten)' },
    { level: 3, title: '1 run van 9', description: 'Official Phase 6: bijna je hele hand (9 kaarten)' },
    { level: 3, title: '1 set van 5 + 1 set van 2', description: 'Official Phase 9: twee verschillende sets (7 kaarten totaal)' },
    { level: 3, title: '1 set van 5 + 1 set van 3', description: 'Official Phase 10: de laatste officiële fase (8 kaarten totaal)' },
    { level: 3, title: '8 kaarten van 1 kleur', description: 'Uitgebreide kleurcollectie (8 kaarten)' },
    { level: 3, title: '2 runs van 5', description: 'Twee lange runs (10 kaarten totaal)' },
    { level: 3, title: '1 run van 7 + 1 set van 2', description: 'Lange run met een pair (9 kaarten totaal)' },
    { level: 3, title: '1 run van 6 + 1 set van 3', description: 'Lange run met een set (9 kaarten totaal)' },
    { level: 3, title: '9 kaarten van 2 kleuren', description: 'Verdeel over twee kleuren, minimaal 4 per kleur (9 kaarten)' },
    { level: 3, title: '3 sets van 3', description: 'Drie verschillende sets (9 kaarten totaal)' },
    { level: 3, title: '7 opeenvolgende nummers', description: '7 kaarten in volgorde, kleuren mogen verschillen (7 kaarten)' },
    { level: 3, title: '1 run van 5 + 1 run van 4', description: 'Twee middelgrote runs (9 kaarten totaal)' },
    { level: 3, title: '1 set van 5 + 1 run van 4', description: 'Groot set met middelgrote run (9 kaarten totaal)' },
    { level: 3, title: '8 kaarten tussen 2 en 11', description: 'Breed bereik in middengebied (8 kaarten)' },
  ],

  // Level 4: Hard (complex 10-card phases, still feasible)
  4: [
    { level: 4, title: '1 run van 10', description: 'Je hele hand in perfecte volgorde (10 kaarten)' },
    { level: 4, title: '9 kaarten van 1 kleur', description: '90% van je hand moet dezelfde kleur zijn (9 kaarten)' },
    { level: 4, title: '1 run van 8 + 1 set van 2', description: 'Zeer lange run met pair (10 kaarten totaal)' },
    { level: 4, title: '10 kaarten van 2 kleuren', description: 'Je hele hand verdeeld over exact 2 kleuren (10 kaarten)' },
    { level: 4, title: '5 paren met verschillende nummers', description: 'Vijf unieke paren (10 kaarten totaal)' },
    { level: 4, title: '1 run van 9 + 1 kaart', description: 'Bijna volledige run met 1 extra kaart (10 kaarten totaal)' },
    { level: 4, title: '8 even of 8 oneven kaarten', description: 'Consistent patroon in getallen (8 kaarten)' },
    { level: 4, title: '2 sets van 5', description: 'Twee grote sets (10 kaarten totaal)' },
    { level: 4, title: '1 set van 5 + 1 run van 5', description: 'Groot set met lange run (10 kaarten totaal)' },
    { level: 4, title: '3 sets van 3 + 1 kaart', description: 'Drie sets met 1 extra (10 kaarten totaal)' },
    { level: 4, title: '10 kaarten tussen 1 en 10', description: 'Geen kaarten 11 of 12 toegestaan (10 kaarten)' },
    { level: 4, title: '9 opeenvolgende nummers', description: '9 kaarten in volgorde, kleuren mogen verschillen (9 kaarten)' },
    { level: 4, title: '10 kaarten allemaal verschillend', description: 'Elk getal hooguit 1x, perfecte spreiding (10 kaarten)' },
  ],

  // Level 5: Expert (very hard, but not “impossible”)
  5: [
    { level: 5, title: '10 kaarten van 1 kleur', description: 'Je hele hand van exact 1 kleur (10 kaarten)' },
    { level: 5, title: '1 run van 10', description: 'Je hele hand als 1 perfecte run (10 kaarten)' },
    { level: 5, title: '10 opeenvolgende nummers', description: 'Je hele hand in perfecte volgorde, kleuren mogen verschillen (10 kaarten)' },
    { level: 5, title: '10 verschillende kaarten (1-10)', description: 'Elk getal van 1-10 exact 1x (10 kaarten)' },
    { level: 5, title: '5 even + 5 oneven kaarten', description: 'Perfecte balans tussen even en oneven (10 kaarten)' },
    { level: 5, title: '1 set van 5 + 1 set van 5', description: 'Twee grote sets (10 kaarten totaal)' },
    { level: 5, title: '2 runs van 4 + 1 set van 2', description: 'Twee runs met een pair (10 kaarten totaal)' },
    { level: 5, title: '10 kaarten in 2 kleuren (5 per kleur)', description: 'Perfect verdeeld over 2 kleuren (10 kaarten)' },
    { level: 5, title: '1 run van 9 + 1 kaart', description: 'Bijna volledige run met 1 extra (10 kaarten totaal)' },
    { level: 5, title: '2 sets van 3 + 2 sets van 2', description: 'Vier verschillende sets (10 kaarten totaal)' },
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

export function getPhasesByDifficulty(difficulty: number): PhaseDefinition[] {
  return PHASE_POOL[difficulty] || [];
}

export function getTotalPhaseCount(): number {
  return Object.values(PHASE_POOL).reduce((sum, phases) => sum + phases.length, 0);
}
