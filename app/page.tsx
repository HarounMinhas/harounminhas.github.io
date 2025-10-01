import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Projects</h1>
      <ul className="list-disc pl-5 space-y-2">
        <li>
          <Link href="/opportunities">Opportunities</Link>
        </li>
        <li>
          <Link href="/projects/gsap">GSAP Scroll Demo</Link>
        </li>
        <li>
          <Link href="/projects/eye-tracker">Eye Tracking Camera</Link>
        </li>
        <li>
          <Link href="/projects/music-discovery">MusicDiscovery Blueprint</Link>
        </li>
      </ul>
    </div>
  );
}
