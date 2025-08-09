/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for deployment on GitHub Pages
  output: 'export',
  // Ensure routes have trailing slashes so GitHub Pages serves the
  // generated directory index.html files correctly
  trailingSlash: true,
  // Disable image optimization since GitHub Pages is a static host
  images: { unoptimized: true },
};

export default nextConfig;
