import fs from "fs/promises";
import path from "path";
import ProjectVersionBanner from "../components/ProjectVersionBanner";
import MusicDiscoveryExperience from "./client/MusicDiscoveryExperience";

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
    <div className="space-y-8">
      <ProjectVersionBanner className="mx-auto mt-4 max-w-3xl" />
      <header className="space-y-3 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-semibold text-gray-900">MusicDiscovery</h1>
        <p className="text-base text-gray-600">
          Ontdek nieuwe artiesten via een interactieve graaf, beluister 30-seconden previews en bewaar snapshots van je
          ontdekkingstocht. De blueprint blijft beschikbaar als referentie maar de app hieronder is volledig interactief en
          draait op mockdata wanneer er geen backend aanwezig is.
        </p>
      </header>
      <MusicDiscoveryExperience blueprint={blueprint} />
    </div>
  );
}
