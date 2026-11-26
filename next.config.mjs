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
        // Domínio próprio da Faceta Company (clínica de facetas do Fernando).
        {
          source: "/",
          has: [{ type: "host", value: "(www\\.)?facetacompany\\.com\\.br" }],
          destination: "/previews/faceta-company/index.html",
        },
        // Domínio próprio da Dra. Julianna Munilla: a home serve o site institucional dela.
        // A LP do Fill Experience segue em /previews/fill-experience, ligada pela aba Cursos.
        {
          source: "/",
          has: [{ type: "host", value: "(www\\.)?drajuliannamunilla\\.com\\.br" }],
          destination: "/previews/dra-julianna-munilla/index.html",
        },
        // Domínio do Dr. Gustavo Boaventura: o formulário do Curso Full Face fica em /cursos.
        {
          source: "/cursos",
          has: [{ type: "host", value: "(www\\.)?drgustavoboaventura\\.com\\.br" }],
          destination: "/previews/curso-full-face/index.html",
        },
      ],
      afterFiles: [
        // Landing page de vendas de LPs, servida como HTML estático em /lps
        { source: "/lps", destination: "/lps/index.html" },
        // Landing page "Sites por assinatura" em /sites
        { source: "/sites", destination: "/previews/mouve-sites/index.html" },
      ],
    };
  },
  async redirects() {
    return [
      // A home do domínio do Dr. Gustavo leva ao formulário enquanto ele não tiver um site próprio.
      // Temporário (307) de propósito: quando a home existir, é só tirar esta regra.
      {
        source: "/",
        has: [{ type: "host", value: "(www\\.)?drgustavoboaventura\\.com\\.br" }],
        destination: "/cursos",
        permanent: false,
      },
    ];
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
