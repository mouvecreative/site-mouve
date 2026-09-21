/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        // Domínio próprio do Centro Educacional Estrela Guia:
        // quando o acesso vier por cieestrelaguia.com.br, a home serve o site da escola.
        // beforeFiles garante que essa regra vença a home do Mouve (app/page.tsx).
        {
          source: "/",
          has: [{ type: "host", value: "(www\\.)?cieestrelaguia\\.com\\.br" }],
          destination: "/previews/estrela-guia/index.html",
        },
      ],
      afterFiles: [
        // Landing page de vendas de LPs, servida como HTML estático em /lps
        { source: "/lps", destination: "/lps/index.html" },
      ],
    };
  },
  async headers() {
    return [
      // Prévias de sites: nunca cachear, pra sempre mostrar a última versão.
      {
        source: "/previews/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store, no-cache, must-revalidate, max-age=0" },
        ],
      },
    ];
  },
};

export default nextConfig;
