const pad = (value) => value.toString().padStart(2, '0');
const buildDate = new Date();
const deployedAt = `${buildDate.getUTCFullYear()}-${pad(buildDate.getUTCMonth() + 1)}-${pad(buildDate.getUTCDate())}` +
  `T${pad(buildDate.getUTCHours())}:${pad(buildDate.getUTCMinutes())}:${pad(buildDate.getUTCSeconds())}Z`;

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for deployment on GitHub Pages
  output: 'export',
  // Ensure routes have trailing slashes so GitHub Pages serves the
  // generated directory index.html files correctly
  trailingSlash: true,
  // Disable image optimization since GitHub Pages is a static host
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_DEPLOYED_AT: deployedAt,
  },
};

export default nextConfig;
