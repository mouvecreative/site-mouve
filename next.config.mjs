/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      // Landing page de vendas de LPs, servida como HTML estático em /lps
      { source: "/lps", destination: "/lps/index.html" },
    ];
  },
};

export default nextConfig;
