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
    href: "/projects/marieke-praktijk",
    title: "Marieke Praktijk",
    description: "Digitale aanwezigheid voor een moderne praktijk.",
  },
];

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-[#02030a] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-0 h-[34rem] w-[34rem] rounded-full bg-gradient-to-br from-purple-500 via-fuchsia-500 to-orange-400 opacity-50 blur-[160px]" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[42rem] w-[42rem] rounded-full bg-gradient-to-tr from-sky-400 via-blue-500 to-indigo-500 opacity-40 blur-[200px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.08),transparent_45%),radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.04),transparent_50%)]" />
      </div>

      <div className="relative z-10 flex flex-1 flex-col">
        <div className="flex flex-1 flex-col items-center justify-center px-4 py-12 text-center sm:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.6em] text-white/70">Portfolio</p>
          <h1 className="mt-6 text-5xl font-light tracking-[0.08em] text-white sm:text-6xl md:text-7xl">
            Haroun Minhas
          </h1>
          <p className="mt-6 max-w-3xl text-base text-white/75 sm:text-lg">
            Een moderne donkere canvas met ruimte voor experiment, creativiteit en technologie. Scrol omlaag voor een
            overzicht van projecten of duik direct in een case.
          </p>
        </div>

        <section
          id="projects"
          className="relative z-10 w-full border-t border-white/10 bg-white/5 px-4 py-12 backdrop-blur-md sm:px-10"
        >
          <div className="mx-auto grid w-full max-w-5xl gap-4 sm:grid-cols-2">
            {projects.map((project) => (
              <Link
                key={project.href}
                href={project.href}
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 text-left transition duration-200 ease-out hover:-translate-y-1 hover:border-white/40 hover:bg-white/10"
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
