# MusicDiscovery Backend

## Prereqs
- Node.js 20+
- Docker (for PostgreSQL & Redis)

## Setup
1. `cp .env.example .env` and update Spotify + JWT secrets
2. `docker compose up -d`
3. `npm install`
4. `npx prisma migrate dev --name init`
5. `npm run dev`

API available at `http://localhost:8080/api`.

## Key endpoints
- `POST /auth/anonymous`
- `GET /auth/spotify/login`
- `POST /favorites`
- `POST /snapshots`
- `POST /export/spotify-playlist`
