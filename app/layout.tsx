import "./globals.css";
import React from "react";
import NavBar from "../components/NavBar";

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
      <body className="antialiased bg-[#04050a] text-white">
        <div className="bg-primary text-white text-center py-1 w-100">{version}</div>
        <div className="relative min-h-screen">
          <NavBar />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
