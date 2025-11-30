# MariekeLogopedie

Een moderne, overzichtelijke website die bezoekers informeert over de logopediepraktijk en aanzet tot contact opnemen.

## Ontwikkeling

De frontend staat in `src/` en draait op React (Create React App). TypeScript-ondersteuning is toegevoegd zodat nieuwe componenten ook in `.ts`/`.tsx` kunnen worden geschreven. De bestaande JavaScript-bestanden blijven bruikbaar omdat `allowJs` aan staat in `tsconfig.json`.

Handige commando's:

- `npm install` – installeert alle dependencies.
- `npm start` – draait de devserver lokaal.
- `npm run type-check` – voert een TypeScript-check uit zonder output te schrijven.
- `npm run build` – bouwt een geoptimaliseerde versie in `build/`.

## Publicatie naar GitHub Pages

GitHub Pages wordt via een workflow opgebouwd en gedeployed zodra je naar `main` pusht. De workflow vind je in `.github/workflows/deploy.yml` en doet het volgende:

1. Installeert Node 20 en de npm-dependencies (`npm ci`).
2. Draait `npm run type-check` en `npm run build`.
3. Uploadt de `build/` map als Pages-artifact.
4. Deployt het artifact naar de `github-pages` environment.

Zet in de GitHub Pages-instellingen de bron op **GitHub Actions**. Daarna blijft de site bereikbaar via `https://harounminhas.github.io/`.

De bestaande `docs/` map bevat de eerder gebouwde versie maar wordt niet meer gebruikt zodra de GitHub Actions deploy actief is.
