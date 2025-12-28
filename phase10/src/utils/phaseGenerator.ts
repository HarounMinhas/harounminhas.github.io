import { PhaseDefinition } from '../types';

// Phase 10 has cards 1-12 in 4 colors (red, blue, yellow, green)
// A Set = 2+ cards with same number
// A Run = 4+ cards of same color in sequence
// All One Color = 7+ cards of same color (any numbers)
// Wild cards can substitute any card

const PHASE_POOL: Record<number, PhaseDefinition[]> = {
  // Level 1: Beginner - Small sets and short runs (easy to complete with 10 cards)
  1: [
    { level: 1, title: '2 sets van 3', description: 'Maak 2 sets van elk 3 kaarten met hetzelfde getal' },
    { level: 1, title: '1 set van 3 + 1 run van 4', description: 'Maak 1 set van 3 en 1 run van 4 opeenvolgende kaarten' },
    { level: 1, title: '3 sets van 2', description: 'Maak 3 verschillende sets van elk 2 kaarten' },
    { level: 1, title: '1 set van 4', description: 'Verzamel 4 kaarten met hetzelfde getal' },
    { level: 1, title: '2 runs van 3', description: 'Maak 2 runs van elk 3 opeenvolgende kaarten' },
    { level: 1, title: '1 run van 5', description: 'Maak een run van 5 opeenvolgende kaarten van dezelfde kleur' },
    { level: 1, title: '1 set van 2 + 1 run van 5', description: 'Combineer 1 klein set met 1 middelgrote run' },
    { level: 1, title: '6 kaarten van 1 kleur', description: 'Verzamel 6 kaarten van dezelfde kleur (elk nummer)' },
    { level: 1, title: '1 set van 3 + 1 set van 2', description: 'Maak 2 verschillende sets' },
    { level: 1, title: '1 run van 4 + 1 set van 2', description: 'Combineer een run met een klein set' },
    { level: 1, title: '4 pairs (sets van 2)', description: 'Maak 4 verschillende paren' },
    { level: 1, title: '1 run van 6', description: 'Maak een run van 6 opeenvolgende kaarten' },
    { level: 1, title: '2 sets van 2 + 1 run van 3', description: 'Combineer meerdere kleine sets en een run' },
    { level: 1, title: '1 set van 4 + 1 set van 2', description: 'Maak een groot en een klein set' },
    { level: 1, title: '5 even getallen', description: 'Verzamel 5 kaarten met even getallen (2,4,6,8,10,12)' },
    { level: 1, title: '5 oneven getallen', description: 'Verzamel 5 kaarten met oneven getallen (1,3,5,7,9,11)' },
    { level: 1, title: '1 set van 2 + 2 runs van 3', description: 'Combineer een set met twee korte runs' },
    { level: 1, title: '3 kaarten onder 5 + 3 kaarten boven 8', description: 'Verzamel lage en hoge kaarten' },
    { level: 1, title: '1 run van 4 + 1 set van 3', description: 'De klassieke Phase 2 combinatie' },
    { level: 1, title: '7 kaarten tussen 4 en 10', description: 'Verzamel middenwaarde kaarten' },
  ],

  // Level 2: Easy - Standard phase complexity
  2: [
    { level: 2, title: '1 set van 4 + 1 run van 4', description: 'Officiële Phase 3: balans tussen sets en runs' },
    { level: 2, title: '2 sets van 4', description: 'Officiële Phase 7: twee middelgrote sets' },
    { level: 2, title: '1 run van 7', description: 'Officiële Phase 4: een lange run' },
    { level: 2, title: '7 kaarten van 1 kleur', description: 'Officiële Phase 8: alle kaarten dezelfde kleur' },
    { level: 2, title: '1 set van 5', description: 'Verzamel 5 kaarten met hetzelfde getal' },
    { level: 2, title: '1 set van 3 + 1 run van 5', description: 'Een set met een langere run' },
    { level: 2, title: '3 sets van 3', description: 'Drie verschillende sets maken' },
    { level: 2, title: '1 run van 5 + 1 run van 4', description: 'Twee runs van verschillende lengtes' },
    { level: 2, title: '1 set van 4 + 1 set van 3', description: 'Twee sets van verschillende groottes' },
    { level: 2, title: '8 kaarten van 2 kleuren', description: 'Verdeel over twee kleuren (minimaal 3 per kleur)' },
    { level: 2, title: '1 set van 5 + 1 run van 3', description: 'Groot set met korte run' },
    { level: 2, title: '2 runs van 4', description: 'Twee middelgrote runs' },
    { level: 2, title: '6 kaarten onder 7', description: 'Verzamel lage kaarten (1-6)' },
    { level: 2, title: '6 kaarten boven 6', description: 'Verzamel hoge kaarten (7-12)' },
    { level: 2, title: '1 run van 6 + 1 set van 2', description: 'Lange run met een pair' },
    { level: 2, title: '4 even + 4 oneven', description: 'Balans tussen even en oneven getallen' },
    { level: 2, title: '1 set van 4 + 2 sets van 2', description: 'Een groot set met twee paren' },
    { level: 2, title: '2 sets van 3 + 1 run van 3', description: 'Combinatie van meerdere sets en een run' },
    { level: 2, title: '7 kaarten met getallen 3-9', description: 'Focus op middengebied' },
    { level: 2, title: '1 set van 6', description: 'Een groot set van zes identieke kaarten' },
  ],

  // Level 3: Medium - Challenging combinations
  3: [
    { level: 3, title: '1 run van 8', description: 'Officiële Phase 5: een zeer lange run' },
    { level: 3, title: '1 run van 9', description: 'Officiële Phase 6: bijna hele reeks' },
    { level: 3, title: '1 set van 5 + 1 set van 2', description: 'Officiële Phase 9: twee verschillende sets' },
    { level: 3, title: '1 set van 5 + 1 set van 3', description: 'Officiële Phase 10: de laatste fase' },
    { level: 3, title: '8 kaarten van 1 kleur', description: 'Uitgebreide kleur collectie' },
    { level: 3, title: '1 set van 7', description: 'Zeer groot set van zeven identieke kaarten' },
    { level: 3, title: '2 runs van 5', description: 'Twee lange runs' },
    { level: 3, title: '3 sets van 4', description: 'Drie middelgrote sets (uitdagend met 10 kaarten!)' },
    { level: 3, title: '1 run van 7 + 1 set van 3', description: 'Lange run gecombineerd met een set' },
    { level: 3, title: '1 set van 4 + 1 run van 6', description: 'Set met een lange run' },
    { level: 3, title: '2 sets van 5', description: 'Twee grote sets' },
    { level: 3, title: '9 kaarten van 2 kleuren', description: 'Verdeel over twee kleuren (minimaal 4 per kleur)' },
    { level: 3, title: '1 run van 5 + 1 run van 5', description: 'Twee identieke lange runs (totaal 10 kaarten!)' },
    { level: 3, title: '1 set van 3 + 1 run van 7', description: 'Klein set met zeer lange run' },
    { level: 3, title: '4 sets van 2 + 1 run van 4', description: 'Veel kleine sets met een run' },
    { level: 3, title: '1 set van 6 + 1 set van 3', description: 'Groot en middel set' },
    { level: 3, title: '7 opeenvolgende nummers (mixed colors)', description: '7 kaarten in volgorde, kleuren mogen verschillen' },
    { level: 3, title: '1 run van 6 + 1 run van 4', description: 'Twee verschillende lange runs (totaal 10!)' },
    { level: 3, title: '3 sets van 3 + 1 set van 2', description: 'Meerdere sets combineren (totaal 11 kaarten!)' },
    { level: 3, title: '8 kaarten tussen 2 en 11', description: 'Breed bereik in middengebied' },
  ],

  // Level 4: Hard - Complex and restrictive
  4: [
    { level: 4, title: '1 run van 10', description: 'Een run van 10 opeenvolgende kaarten (bijna onmogelijk!)' },
    { level: 4, title: '9 kaarten van 1 kleur', description: '90% van je hand moet dezelfde kleur zijn' },
    { level: 4, title: '1 set van 8', description: 'Acht identieke kaarten verzamelen' },
    { level: 4, title: '2 runs van 6', description: 'Twee lange runs (totaal 12 kaarten nodig!)' },
    { level: 4, title: '1 set van 6 + 1 run van 5', description: 'Groot set met lange run (totaal 11!)' },
    { level: 4, title: '4 sets van 3', description: 'Vier verschillende sets (totaal 12 kaarten!)' },
    { level: 4, title: '1 run van 8 + 1 set van 2', description: 'Zeer lange run met een pair' },
    { level: 4, title: '3 sets van 4 + 1 set van 2', description: 'Meerdere grote sets (totaal 14!)' },
    { level: 4, title: '1 set van 5 + 1 run van 6', description: 'Groot set met lange run (totaal 11!)' },
    { level: 4, title: '10 kaarten van 2 kleuren', description: 'Je hele hand verdeeld over exact 2 kleuren' },
    { level: 4, title: '2 sets van 6', description: 'Twee zeer grote sets (totaal 12!)' },
    { level: 4, title: '1 run van 7 + 1 run van 4', description: 'Twee runs (totaal 11 kaarten!)' },
    { level: 4, title: '5 pairs met verschillende nummers', description: 'Vijf verschillende paren (totaal 10 kaarten)' },
    { level: 4, title: '1 set van 4 + 1 run van 7', description: 'Set met zeer lange run (totaal 11!)' },
    { level: 4, title: '8 even of 8 oneven kaarten', description: 'Consistent patroon in getallen' },
    { level: 4, title: '1 run van 9 + 1 set van 2', description: 'Bijna volledige run met pair (totaal 11!)' },
    { level: 4, title: '3 sets van 3 + 1 run van 4', description: 'Veel sets gecombineerd met run (totaal 13!)' },
    { level: 4, title: '1 set van 7 + 1 set van 3', description: 'Zeer groot set met middel set (totaal 10!)' },
    { level: 4, title: '2 runs van 5 + 1 set van 2', description: 'Twee lange runs met pair (totaal 12!)' },
    { level: 4, title: '10 kaarten tussen 1 en 10', description: 'Geen kaarten 11 of 12 toegestaan' },
  ],

  // Level 5: Expert - Extremely challenging
  5: [
    { level: 5, title: '1 run van 11', description: 'Een run van 11 kaarten (bijna onhaalbaar zonder wilds!)' },
    { level: 5, title: '10 kaarten van 1 kleur', description: 'Je hele hand moet dezelfde kleur zijn' },
    { level: 5, title: '1 set van 9', description: 'Negen identieke kaarten (zeer zeldzaam!)' },
    { level: 5, title: '1 run van 12', description: 'Een complete run van 1-12 (perfecte kaarten nodig!)' },
    { level: 5, title: '2 runs van 7', description: 'Twee zeer lange runs (totaal 14 kaarten!)' },
    { level: 5, title: '1 set van 10', description: 'Tien identieke kaarten verzamelen' },
    { level: 5, title: '5 sets van 2 (alle verschillende)', description: 'Vijf unieke paren (perfecte variatie)' },
    { level: 5, title: '1 run van 10 + 1 set van 2', description: 'Bijna volledige run met pair (totaal 12!)' },
    { level: 5, title: '3 sets van 5', description: 'Drie grote sets (totaal 15 kaarten!)' },
    { level: 5, title: '1 set van 7 + 1 run van 5', description: 'Zeer groot set met lange run (totaal 12!)' },
    { level: 5, title: '2 sets van 4 + 2 runs van 4', description: 'Vier verschillende groepen (totaal 16!)' },
    { level: 5, title: '1 run van 8 + 1 run van 5', description: 'Twee zeer lange runs (totaal 13!)' },
    { level: 5, title: '4 sets van 4', description: 'Vier grote sets (totaal 16 kaarten!)' },
    { level: 5, title: '10 kaarten in volgorde (mixed colors)', description: 'Je hele hand moet opeenvolgend zijn' },
    { level: 5, title: '1 set van 6 + 1 set van 6', description: 'Twee zeer grote sets (totaal 12!)' },
    { level: 5, title: '3 runs van 4', description: 'Drie middelgrote runs (totaal 12 kaarten!)' },
    { level: 5, title: '1 set van 8 + 1 set van 3', description: 'Extreem groot set met middel set (totaal 11!)' },
    { level: 5, title: '2 runs van 6 + 1 set van 2', description: 'Twee lange runs met pair (totaal 14!)' },
    { level: 5, title: '10 verschillende kaarten (1-10)', description: 'Elk getal exact 1x, geen duplicaten' },
    { level: 5, title: '1 run van 9 + 1 run van 3', description: 'Zeer lange en korte run (totaal 12!)' },
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
