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
          ? "absolute inset-x-0 top-0 bg-gradient-to-b from-[#02030a]/80 via-[#02030a]/40 to-transparent"
          : "relative border-b border-gray-200 bg-white/90 text-gray-900 shadow-md",
      ].join(" ")}
    >
      <div
        className={[
          "mx-auto flex w-full items-center justify-between gap-6",
          isHome ? "max-w-5xl px-6 py-10 text-white" : "max-w-6xl px-6 py-4",
        ].join(" ")}
      >
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Haroun Minhas
        </Link>

        <div
          className="flex items-center gap-6 text-sm font-medium uppercase tracking-[0.2em]"
          aria-label="Site navigatie"
        >
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
