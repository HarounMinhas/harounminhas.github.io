import React, { createContext, useContext, useMemo, useState } from 'react';

export type Lang = 'nl' | 'en';

type Vars = Record<string, string | number | boolean | null | undefined>;

type I18nContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string, vars?: Vars) => string;
};

const LANG_STORAGE_KEY = 'lang';

const TRANSLATIONS: Record<Lang, Record<string, string>> = {
  nl: {
    'common.language': 'Taal',
    'common.unknown': 'Onbekend',

    'confirm.newGame': 'Weet je zeker dat je een nieuw spel wilt starten? Het huidige spel wordt gewist.',

    'action.undo': 'Ongedaan maken',

    'toast.roundSaved': 'Ronde opgeslagen!',
    'toast.roundUndone': 'Laatste ronde ongedaan gemaakt',
    'toast.roundUpdated': 'Ronde bijgewerkt!',

    'scoreboard.title': '🎲 Phase 10 Scorekeeper',
    'scoreboard.round': 'Ronde {round}',
    'scoreboard.winnerTitle': '🏆 Winnaar!',
    'scoreboard.totalPoints': 'Totaal: {points} punten',
    'scoreboard.btn.endRound': '✅ Einde Ronde',
    'scoreboard.btn.history': '📜 Rondegeschiedenis',
    'scoreboard.btn.customPhases': '🎯 Custom Fasen',
    'scoreboard.btn.newGame': '🔄 Nieuw Spel',

    'table.rank': '#',
    'table.player': 'Speler',
    'table.phase': 'Fase',
    'table.totalPoints': 'Totaal Punten',
    'table.lastRound': 'Laatste Ronde',

    'badge.completed': 'Voltooid!',
    'phase.label': 'Fase {phase}',

    'setup.subtitle': 'Voeg spelers toe om te beginnen',
    'setup.label.playerName': 'Spelernaam',
    'setup.placeholder.playerName': 'Voer naam in...',
    'setup.btn.addPlayer': '➕ Speler toevoegen',
    'setup.btn.startWith4': 'Start met 4 spelers',
    'setup.section.players': 'Spelers ({count})',
    'setup.btn.remove': '❌ Verwijder',
    'setup.btn.startGame': '🎮 Start Spel',

    'error.enterName': 'Voer een naam in',
    'error.nameExists': 'Deze naam bestaat al',
    'error.minPlayers': 'Voeg minimaal 2 spelers toe',

    'endRound.title': 'Einde Ronde',
    'endRound.label.points': 'Punten',
    'endRound.label.phaseAfter': 'Fase na ronde',
    'endRound.label.phaseCompleted': 'Fase voltooid',
    'endRound.btn.cancel': 'Annuleren',
    'endRound.btn.save': '💾 Opslaan',

    'history.title': 'Rondegeschiedenis',
    'history.empty': 'Nog geen rondes gespeeld',
    'history.round': 'Ronde {round}',
    'history.btn.edit': '✏️ Bewerken',
    'history.status': 'Status',
    'history.status.completed': '✅ Voltooid',
    'history.status.notCompleted': '❌ Niet voltooid',
    'history.btn.close': 'Sluiten',

    'generator.title': '🎯 Custom Fasen',
    'generator.difficulty': 'Moeilijkheid: {difficulty}',
    'generator.easy': 'Makkelijk',
    'generator.hard': 'Moeilijk',
    'generator.btn.replace': '🔄 Vervang Fase',
    'generator.btn.generate': '➕ Genereer Fase',
    'generator.btn.surprise': '✨ Surprise Me!',
    'generator.section.myPhases': 'Mijn Fasen ({count}/{max})',
    'generator.btn.clearAll': 'Wis alles',
    'generator.confirm.clearAll': 'Weet je zeker dat je alle fasen wilt verwijderen?',
    'generator.tooltip.deletePhase': 'Verwijder fase',
    'generator.empty.text': 'Geen custom fasen nog. Klik op "Genereer Fase" om te beginnen,\nof probeer "Surprise Me!" voor een volledige set!',
    'generator.howItWorks.title': '💡 Hoe werkt het?',
    'generator.howItWorks.li1': 'Klik op "Genereer Fase" om een nieuwe fase toe te voegen (max 10)',
    'generator.howItWorks.li2': 'Klik op een fase om deze te selecteren en te vervangen',
    'generator.howItWorks.li3': '"Surprise Me!" genereert 10 fasen met oplopende moeilijkheid',
    'generator.howItWorks.li4': 'Gebruik deze lijst tijdens het spel als referentie',
    'generator.btn.close': 'Sluiten',

    'start.subtitle': 'Voeg spelers toe om te beginnen',
    'start.placeholder.playerName': 'Spelernaam',
    'start.btn.add': '+ Toevoegen',
    'start.quick.2': '2 spelers',
    'start.quick.4': '4 spelers',
    'start.quick.6': '6 spelers',
    'start.section.players': 'Spelers ({count})',
    'start.tooltip.remove': 'Verwijder',
    'start.btn.start': 'Start Spel →',
  },
  en: {
    'common.language': 'Language',
    'common.unknown': 'Unknown',

    'confirm.newGame': 'Start a new game? The current game will be cleared.',

    'action.undo': 'Undo',

    'toast.roundSaved': 'Round saved!',
    'toast.roundUndone': 'Last round undone',
    'toast.roundUpdated': 'Round updated!',

    'scoreboard.title': '🎲 Phase 10 Scorekeeper',
    'scoreboard.round': 'Round {round}',
    'scoreboard.winnerTitle': '🏆 Winner!',
    'scoreboard.totalPoints': 'Total: {points} points',
    'scoreboard.btn.endRound': '✅ End round',
    'scoreboard.btn.history': '📜 Round history',
    'scoreboard.btn.customPhases': '🎯 Custom phases',
    'scoreboard.btn.newGame': '🔄 New game',

    'table.rank': '#',
    'table.player': 'Player',
    'table.phase': 'Phase',
    'table.totalPoints': 'Total points',
    'table.lastRound': 'Last round',

    'badge.completed': 'Completed!',
    'phase.label': 'Phase {phase}',

    'setup.subtitle': 'Add players to start',
    'setup.label.playerName': 'Player name',
    'setup.placeholder.playerName': 'Enter name...',
    'setup.btn.addPlayer': '➕ Add player',
    'setup.btn.startWith4': 'Start with 4 players',
    'setup.section.players': 'Players ({count})',
    'setup.btn.remove': '❌ Remove',
    'setup.btn.startGame': '🎮 Start game',

    'error.enterName': 'Enter a name',
    'error.nameExists': 'This name already exists',
    'error.minPlayers': 'Add at least 2 players',

    'endRound.title': 'End round',
    'endRound.label.points': 'Points',
    'endRound.label.phaseAfter': 'Phase after round',
    'endRound.label.phaseCompleted': 'Phase completed',
    'endRound.btn.cancel': 'Cancel',
    'endRound.btn.save': '💾 Save',

    'history.title': 'Round history',
    'history.empty': 'No rounds played yet',
    'history.round': 'Round {round}',
    'history.btn.edit': '✏️ Edit',
    'history.status': 'Status',
    'history.status.completed': '✅ Completed',
    'history.status.notCompleted': '❌ Not completed',
    'history.btn.close': 'Close',

    'generator.title': '🎯 Custom phases',
    'generator.difficulty': 'Difficulty: {difficulty}',
    'generator.easy': 'Easy',
    'generator.hard': 'Hard',
    'generator.btn.replace': '🔄 Replace phase',
    'generator.btn.generate': '➕ Generate phase',
    'generator.btn.surprise': '✨ Surprise me!',
    'generator.section.myPhases': 'My phases ({count}/{max})',
    'generator.btn.clearAll': 'Clear all',
    'generator.confirm.clearAll': 'Are you sure you want to remove all phases?',
    'generator.tooltip.deletePhase': 'Remove phase',
    'generator.empty.text': 'No custom phases yet. Click "Generate phase" to start,\nor try "Surprise me!" for a full set!',
    'generator.howItWorks.title': '💡 How does it work?',
    'generator.howItWorks.li1': 'Click "Generate phase" to add a new phase (max 10)',
    'generator.howItWorks.li2': 'Click a phase to select and replace it',
    'generator.howItWorks.li3': '"Surprise me!" generates 10 phases with increasing difficulty',
    'generator.howItWorks.li4': 'Use this list as a reference during the game',
    'generator.btn.close': 'Close',

    'start.subtitle': 'Add players to start',
    'start.placeholder.playerName': 'Player name',
    'start.btn.add': '+ Add',
    'start.quick.2': '2 players',
    'start.quick.4': '4 players',
    'start.quick.6': '6 players',
    'start.section.players': 'Players ({count})',
    'start.tooltip.remove': 'Remove',
    'start.btn.start': 'Start game →',
  },
};

function normalizeLang(value: string | null | undefined): Lang {
  return value === 'en' ? 'en' : 'nl';
}

function detectBrowserLang(): Lang {
  const raw = (navigator.languages?.[0] ?? navigator.language ?? '').toLowerCase();
  return raw.startsWith('en') ? 'en' : 'nl';
}

function getInitialLang(): Lang {
  try {
    const stored = localStorage.getItem(LANG_STORAGE_KEY);
    if (stored) return normalizeLang(stored);
  } catch {
    // ignore
  }
  return detectBrowserLang();
}

function format(template: string, vars?: Vars): string {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (_match, key) => {
    const value = vars[key];
    if (value === null || value === undefined) return '';
    return String(value);
  });
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => getInitialLang());

  const setLang = (next: Lang) => {
    const normalized = normalizeLang(next);
    try {
      localStorage.setItem(LANG_STORAGE_KEY, normalized);
    } catch {
      // ignore
    }
    setLangState(normalized);
  };

  const t = useMemo(() => {
    return (key: string, vars?: Vars) => {
      const template = TRANSLATIONS[lang]?.[key] ?? TRANSLATIONS.nl?.[key] ?? key;
      return format(template, vars);
    };
  }, [lang]);

  const value = useMemo<I18nContextValue>(() => ({ lang, setLang, t }), [lang, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
