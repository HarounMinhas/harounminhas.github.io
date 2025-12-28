# Haroun Minhas Portfolio

Dit is mijn persoonlijke portfolio website gehost op GitHub Pages.

## 🌐 Live Website

- **Portfolio Homepage**: [https://harounminhas.github.io/](https://harounminhas.github.io/)
- **Marieke Logopedie Project**: [https://harounminhas.github.io/marieke/](https://harounminhas.github.io/marieke/)

## 📁 Projectstructuur

De repository bevat:

- **Portfolio Landing Page**: Een moderne Bootstrap-gebaseerde homepage die al mijn projecten showcaset
- **Marieke Logopedie**: Een React + TypeScript webapp voor een logopediepraktijk

### Ontwikkeling

De Marieke frontend staat in `src/` en draait op React (Create React App). TypeScript-ondersteuning is toegevoegd zodat nieuwe componenten ook in `.ts`/`.tsx` kunnen worden geschreven. De bestaande JavaScript-bestanden blijven bruikbaar omdat `allowJs` aan staat in `tsconfig.json`.

#### Handige commando's:

- `npm install` – installeert alle dependencies
- `npm start` – draait de devserver lokaal op http://localhost:3000
- `npm run type-check` – voert een TypeScript-check uit zonder output te schrijven
- `npm run build` – bouwt een geoptimaliseerde versie in `build/`

## 🚀 Deployment

GitHub Pages wordt automatisch bijgewerkt via GitHub Actions zodra je naar `main` pusht.

### Deployment Flow:

1. De workflow installeert Node 20 en npm-dependencies (`npm ci`)
2. Voert type-checking uit (`npm run type-check`)
3. Bouwt de React app (`npm run build`)
4. Organiseert de files:
   - React build → `/marieke/`
   - Portfolio landing page → `/` (root)
5. Deploy alles naar GitHub Pages

De workflow vind je in `.github/workflows/deploy.yml`.

### Lokale Preview

Om het Marieke project lokaal te bekijken:

```bash
npm install
npm start
```

De portfolio landing page is een statische HTML pagina en kan direct geopend worden vanuit `portfolio-index.html`.

## 🎨 Technologie Stack

### Portfolio Landing Page
- **Bootstrap 5** - Modern responsive framework
- **Bootstrap Icons** - Iconografie
- **Google Fonts (Poppins)** - Typografie
- **Vanilla HTML/CSS/JS** - Geen build process nodig

### Marieke Logopedie Project
- **React** - Frontend framework
- **TypeScript** - Type-safe JavaScript
- **React Router** - Client-side routing
- **Bootstrap 5** - UI components
- **Create React App** - Build tooling

## 📝 Toekomstige Projecten

Meer projecten komen binnenkort! De portfolio pagina is ontworpen om eenvoudig uit te breiden met nieuwe project cards.

## 👤 Contact

- **GitHub**: [@HarounMinhas](https://github.com/HarounMinhas)
- **Website**: [harounminhas.github.io](https://harounminhas.github.io/)
