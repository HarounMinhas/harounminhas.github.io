import ProjectMarkdownSection from '../components/ProjectMarkdownSection';
import ProjectVersionBanner from '../components/ProjectVersionBanner';
import { getProjectMarkdownMap } from '../data';

export const metadata = {
  title: 'MusicDiscovery App',
  description: 'Interactieve muziekontdekking met Spotify-integratie, backend + frontend stack en runbook.',
};

const SLUG = 'music-discovery' as const;

export default async function MusicDiscoveryProjectPage() {
  const docs = await getProjectMarkdownMap(SLUG, ['blueprint.md', 'runbook.md'] as const);

  return (
    <div className="space-y-6">
      <ProjectVersionBanner className="mx-auto mt-4 max-w-3xl" />

      <header className="space-y-3 rounded-lg border bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-900">MusicDiscovery</h1>
        <p className="text-sm text-gray-600">
          Een volledige implementatie van de MusicDiscovery blueprint: Node.js/Prisma backend met Spotify-proxy en playlist export,
          plus een Vite/React frontend met force-directed graaf, previews, favorieten en snapshots.
        </p>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-md border bg-slate-50 p-4">
            <h2 className="text-sm font-semibold text-slate-900">Backend</h2>
            <p className="text-sm text-slate-600">
              Express + Prisma API met Spotify-integratie, Redis caching, favorieten, snapshots en playlist export endpoints.
            </p>
            <a
              className="mt-3 inline-flex text-sm font-medium text-blue-600"
              href="https://github.com/harounminhas/harounminhas.github.io/tree/main/backend"
              target="_blank"
              rel="noreferrer"
            >
              Bekijk backend/
            </a>
          </div>
          <div className="rounded-md border bg-slate-50 p-4">
            <h2 className="text-sm font-semibold text-slate-900">Frontend</h2>
            <p className="text-sm text-slate-600">
              Vite + React app met react-force-graph, globale audio player, Spotify login en Playwright E2E tests.
            </p>
            <a
              className="mt-3 inline-flex text-sm font-medium text-blue-600"
              href="https://github.com/harounminhas/harounminhas.github.io/tree/main/frontend"
              target="_blank"
              rel="noreferrer"
            >
              Bekijk frontend/
            </a>
          </div>
        </div>
      </header>

      <ProjectMarkdownSection
        title="Blueprint"
        description="De originele productvisie, functionele eisen en architectuurkeuzes voor het platform."
        content={docs['blueprint.md']}
      />

      <ProjectMarkdownSection
        title="Runbook"
        description="Stap-voor-stap handleiding voor lokale ontwikkeling, tests en deployment."
        content={docs['runbook.md']}
      />
    </div>
  );
}
