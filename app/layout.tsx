import "./globals.css";
import Link from "next/link";
import React from "react";
import SearchBar from "../components/SearchBar";
import ThemeSelector from "../components/ThemeSelector";

const version = `Example of what can be done with Codex - ${process.env.NEXT_PUBLIC_PR_INFO || "local"}`;

export const metadata = {
  title: "ArtConnect Opportunities",
  description: "Browse art opportunities from ArtConnect",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          id="bootstrap-theme"
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootswatch@5.3.3/dist/flatly/bootstrap.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css"
        />
      </head>
      <body className="antialiased bg-gray-50 text-gray-900">
        <div className="bg-primary text-white text-center py-1 w-100">
          {version}
        </div>
        <header className="border-b bg-white">
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-2 p-4">
            <Link href="/" className="text-xl font-semibold">
              Projects
            </Link>
            <div className="flex items-center gap-2">
              <ThemeSelector />
              <SearchBar />
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-5xl p-4">{children}</main>
      </body>
    </html>
  );
}
