import Link from "next/link";

const projects = [
  {
    href: "/opportunities",
    title: "Opportunities",
    description:
      "Ontdek kansen en initiatieven waar ik momenteel aan werk of naar op zoek ben.",
  },
  {
    href: "/projects/gsap",
    title: "GSAP Scroll Demo",
    description: "Een soepele scroll-ervaring met animaties gebouwd met GSAP.",
  },
  {
    href: "/projects/eye-tracker",
    title: "Eye Tracking Camera",
    description: "Experimentele interface die reageert op beweging en focus.",
  },
  {
    href: "/projects/music-discovery",
    title: "MusicDiscovery Blueprint",
    description: "Concept voor het ontdekken van nieuwe muziek en artiesten.",
  },
  {
    href: "/projects/marieke-praktijk",
    title: "Marieke Praktijk",
    description: "Digitale aanwezigheid voor een moderne praktijk.",
  },
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#04050a] text-white">
      <div className="pointer-events-none absolute inset-0 opacity-80">
        <div className="absolute -top-32 left-10 h-96 w-96 rounded-full bg-gradient-to-br from-purple-500 via-fuchsia-500 to-orange-400 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[32rem] w-[32rem] rounded-full bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-500 blur-[180px]" />
        <div className="absolute inset-y-0 left-1/2 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-16 text-center">
        <p className="text-sm uppercase tracking-[0.5em] text-white/60">Portfolio</p>
        <h1 className="mt-6 text-5xl font-light tracking-tight text-white sm:text-6xl md:text-7xl">
          Haroun Minhas
        </h1>
        <p className="mt-4 max-w-2xl text-base text-white/70 sm:text-lg">
          Moderne ideeën, experimenten en projecten. Scrol omlaag of kies een project om meer te ontdekken.
        </p>

        <section className="mt-16 w-full max-w-4xl">
          <div className="grid gap-4 sm:grid-cols-2">
            {projects.map((project) => (
              <Link
                key={project.href}
                href={project.href}
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 text-left backdrop-blur-md transition hover:-translate-y-1 hover:border-white/30 hover:bg-white/10"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-white">{project.title}</h2>
                  <span className="text-white/50 transition group-hover:text-white">↗</span>
                </div>
                <p className="mt-3 text-sm text-white/70">{project.description}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
