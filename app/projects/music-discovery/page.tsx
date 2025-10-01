import fs from "fs/promises";
import path from "path";
import ReactMarkdown from "react-markdown";
import ProjectVersionBanner from "../components/ProjectVersionBanner";

export const metadata = {
  title: "MusicDiscovery Blueprint",
  description: "Blueprint en runbook voor de MusicDiscovery app",
};

export default async function MusicDiscoveryProjectPage() {
  const blueprintPath = path.join(
    process.cwd(),
    "projects",
    "music-discovery",
    "blueprint.md",
  );
  const blueprint = await fs.readFile(blueprintPath, "utf8");

  return (
    <div className="space-y-6">
      <ProjectVersionBanner className="mx-auto mt-4 max-w-3xl" />
      <header className="space-y-2 rounded-lg border bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-900">MusicDiscovery</h1>
        <p className="text-sm text-gray-600">
          Een end-to-end blueprint voor een interactieve muziekontdekkingsapp met Spotify-integratie,
          force-directed graaf en gedeelde snapshots.
        </p>
      </header>
      <article className="prose prose-slate max-w-none rounded-lg border bg-white p-6 shadow-sm">
        <ReactMarkdown>{blueprint}</ReactMarkdown>
      </article>
    </div>
  );
}
