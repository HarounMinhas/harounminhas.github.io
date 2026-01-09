# Phase 10 Scorekeeper

Web application for tracking scores during Phase 10 card games.

## Features

- **Player Management**: Add players individually or quick-start with 4 players
- **Scoreboard**: Overview of current phases and total points per player
- **Round Input**: Single-screen input for all player scores
- **Round History**: View and edit previous rounds
- **Undo Function**: Revert the last completed round
- **Random Phase Generator**: Generate custom phases with adjustable difficulty
- **Auto-Save**: Automatic persistence to browser localStorage
- **Winner Detection**: Automatic winner announcement when Phase 10 is completed

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Technology Stack

- React 18
- TypeScript
- Vite
- CSS3 (no external UI libraries)

## Usage

1. Add players on the start screen
2. Click "Start Spel" to begin
3. Use "Einde Ronde" to enter scores after each round
4. Review round history to edit previous rounds
5. Use Random Phase Generator for custom phase sequences

## Game Rules

- Each player starts at Phase 1
- Enter points and phase completion status after each round
- Check "Fase voltooid" to automatically advance to the next phase
- The player with the lowest score wins when Phase 10 is completed

## Browser Support

Compatible with all modern browsers supporting localStorage.

---

*Note: This documentation has been formatted and reviewed with assistance from large language models (LLMs) to ensure clarity and professional presentation.*
