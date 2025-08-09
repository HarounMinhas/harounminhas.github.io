import "./globals.css";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "ArtConnect Opportunities",
  description: "Browse art opportunities from ArtConnect",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50 text-gray-900">
        <header className="border-b bg-white">
          <div className="mx-auto flex max-w-5xl items-center justify-between p-4">
            <Link href="/opportunities" className="text-xl font-semibold">
              Opportunities
            </Link>
            <input
              type="text"
              placeholder="Search..."
              className="w-48 rounded border px-3 py-1 text-sm"
              aria-label="Search opportunities"
              disabled
            />
          </div>
        </header>
        <main className="mx-auto max-w-5xl p-4">{children}</main>
      </body>
    </html>
  );
}
