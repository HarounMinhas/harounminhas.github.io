# MariekeLogopedie

Een moderne, overzichtelijke website die bezoekers informeert over de logopediepraktijk en aanzet tot contact opnemen.

## GitHub Pages publicatie

Deze repository is de bron voor `harounminhas.github.io`. GitHub Pages kan vanaf de `docs/` map serveren. Volg deze stappen om de live-site bij te werken:

1. Draai `npm install` als dependencies ontbreken.
2. Bouw de site lokaal: `npm run build`.
3. Verplaats de build-output naar `docs/`: `mv build docs` (de map bestaat al en wordt overschreven).
4. Commit en push naar de branch die GitHub Pages gebruikt (meestal `main`).
5. Controleer in de repository-instellingen dat GitHub Pages als bron `main` > `docs/` gebruikt.

> Als je alleen naar een andere branch pusht, werkt de live-website niet bij. GitHub Pages pakt uitsluitend de geconfigureerde branch/map. Merge daarom je wijzigingen naar de Pages-bron of gebruik een workflow die automatisch naar `docs/` publiceert.
