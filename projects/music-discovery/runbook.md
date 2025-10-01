# MusicDiscovery — Runbook & E2E Tests

## 1. Prereqs
- Node.js 20+
- Docker Desktop (for PostgreSQL & Redis)
- Spotify developer account (for OAuth & API keys)

## 2. Spotify app setup
1. Open https://developer.spotify.com/dashboard and create an app.
2. Add redirect URI `http://localhost:8080/api/auth/spotify/callback`.
3. Copy the client ID & secret.

## 3. Backend — local run
```bash
cd backend
cp .env.example .env
# fill in Spotify keys and JWT secret

docker compose up -d
npm install
npx prisma migrate dev --name init
npm run dev
```

Smoke tests:
```bash
curl http://localhost:8080/api/health
curl -X POST http://localhost:8080/api/auth/anonymous
curl 'http://localhost:8080/api/spotify/search?query=ben%20howard'
```

## 4. Frontend — local run
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Open http://localhost:5173.

## 5. Manual QA
- Zoek een artiest en controleer de graaf en contextmenu.
- Speel een preview af via "Listen" en pauzeer via de globale player.
- Bewaar een favoriet en snapshot (alert bevestigt het resultaat).
- Login met Spotify via de Library en exporteer een playlist (vereist echte Spotify-credentials).

## 6. Playwright E2E
Frontend bevat Playwright tests in `frontend/tests`.
```bash
# met backend en frontend servers actief
cd frontend
npm run test:e2e
```

## 7. Deployment hints
- Zet `SPOTIFY_REDIRECT_URI` naar je productie-URL.
- Gebruik HTTPS en sterke secrets.
- Voeg token refresh toe voor langdurige Spotify-sessies.
