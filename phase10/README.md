# Phase 10 Scorekeeper

Een snelle en intuïtieve webapp om scores bij te houden tijdens Phase 10 spelletjes.

## Features

- ✅ **Spelers Toevoegen**: Voeg gemakkelijk spelers toe of start snel met 4 spelers
- 📊 **Scorebord**: Overzichtelijk scorebord met huidige fase en totaalpunten
- 🎯 **Ronde Invoer**: Voer alle spelerscores in één scherm in
- 📝 **Rondegeschiedenis**: Bekijk en bewerk alle vorige rondes
- ↩️ **Undo Functie**: Maak de laatste ronde ongedaan gemaakt
- 🎲 **Random Fase Generator**: Genereer random fasen met instelbare moeilijkheid
- 💾 **Auto-Save**: Automatisch opslaan in browser localStorage
- 🏆 **Winnaar Detectie**: Automatische winnaar wanneer iemand fase 10 haalt

## Installatie

```bash
# Installeer dependencies
npm install

# Start development server
npm run dev

# Build voor productie
npm run build

# Preview productie build
npm run preview
```

## Tech Stack

- React 18
- TypeScript
- Vite
- CSS3 (geen externe UI libraries)

## Gebruik

1. Voeg spelers toe op het startscherm
2. Klik op "Start Spel"
3. Gebruik "Einde Ronde" om scores in te voeren na elke ronde
4. Bekijk de rondegeschiedenis om vorige rondes te bewerken
5. Gebruik de Random Fase Generator voor custom fasen

## Game Rules

- Elke speler start bij Fase 1
- Vul punten en fase status in na elke ronde
- Vink "Fase voltooid" aan om automatisch naar de volgende fase te gaan
- De speler met de minste punten wint wanneer fase 10 is behaald

## Browser Support

Werkt in alle moderne browsers met localStorage support.
