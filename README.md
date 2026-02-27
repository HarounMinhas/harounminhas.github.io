# Haroun Minhas Portfolio

Personal portfolio website hosted on GitHub Pages.

## Live Website

- **Portfolio Homepage**: [https://harounminhas.github.io/](https://harounminhas.github.io/)
- **Marieke Logopedie Project**: [https://harounminhas.github.io/marieke/](https://harounminhas.github.io/marieke/)

## Project Structure

The repository contains:

- **Portfolio Landing Page**: Modern Bootstrap-based homepage showcasing all projects
- **Marieke Logopedie**: React + TypeScript web application for a speech therapy practice

### Development

The Marieke frontend is located in `src/` and runs on React (Create React App). TypeScript support has been added, allowing new components to be written in `.ts`/`.tsx` files. Existing JavaScript files remain functional due to the `allowJs` setting in `tsconfig.json`.

#### Available Commands

- `npm install` - Install all dependencies
- `npm start` - Run development server locally at http://localhost:3000
- `npm run type-check` - Execute TypeScript type checking without emitting output
- `npm run build` - Build optimized production version to `build/` directory

## Deployment

This repository is used as a **GitHub Pages hosting repository**.

### MusicDiscovery deployment source of truth

`/MusicDiscovery/` is automatically generated and deployed from the external repository: `HarounMinhas/MusicDiscovery`.

Do **not** manually edit files inside `MusicDiscovery/` in this repository, because those changes will be overwritten by the external deployment process.

### Remaining hosting behavior

Other static content in this repository (portfolio root and subfolders) remains hosted through GitHub Pages from this repo.

### Local Preview

To preview the Marieke project locally:

```bash
npm install
npm start
```

The portfolio landing page is a static HTML file and can be opened directly from `portfolio-index.html`.

## Technology Stack

### Portfolio Landing Page
- **Bootstrap 5** - Modern responsive framework
- **Bootstrap Icons** - Iconography
- **Google Fonts (Poppins)** - Typography
- **Vanilla HTML/CSS/JS** - No build process required

### Marieke Logopedie Project
- **React** - Frontend framework
- **TypeScript** - Type-safe JavaScript
- **React Router** - Client-side routing
- **Bootstrap 5** - UI components
- **Create React App** - Build tooling

## Future Projects

Additional projects will be added over time. The portfolio page is designed to scale easily with new project cards.

## Contact

- **GitHub**: [@HarounMinhas](https://github.com/HarounMinhas)
- **Website**: [harounminhas.github.io](https://harounminhas.github.io/)

---

*Note: This documentation has been formatted and reviewed with assistance from large language models (LLMs) to ensure clarity, consistency, and professional presentation.*
