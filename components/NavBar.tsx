"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchBar from "./SearchBar";
import ThemeSelector from "./ThemeSelector";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Projecten", href: "/#projects" },
  { label: "Opportunities", href: "/opportunities" },
];

export default function NavBar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <nav
      className={[
        "w-full",
        "z-30",
        isHome
          ? "absolute top-0 left-0 backdrop-blur"
          : "relative border-b border-gray-200 bg-white/90 text-gray-900 shadow-md",
      ].join(" ")}
    >
      <div
        className={[
          "flex items-center justify-between gap-6",
          isHome ? "px-8 py-8 text-white" : "mx-auto max-w-6xl px-6 py-4",
        ].join(" ")}
      >
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Haroun Minhas
        </Link>

        <div className="flex items-center gap-6 text-sm font-medium uppercase tracking-[0.2em]">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={[
                "transition",
                isHome ? "text-white/80 hover:text-white" : "text-gray-600 hover:text-gray-900",
              ].join(" ")}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {isHome ? (
          <div className="text-xs uppercase tracking-[0.4em] text-white/70">Portfolio</div>
        ) : (
          <div className="flex items-center gap-3">
            <ThemeSelector />
            <SearchBar />
          </div>
        )}
      </div>
    </nav>
  );
}
