# Site Mouve

Site institucional da Mouve Creative. Next.js + TypeScript + Tailwind + shadcn/ui, 100% estático.

## Rodar localmente

```bash
npm install
cp .env.example .env.local   # depois edite com o número real de WhatsApp
npm run dev
```

## Antes de publicar

1. Edite `.env.local` (e a variável de ambiente equivalente na Vercel) com o número
   real de WhatsApp Business da Mouve, formato `55DDDNÚMERO` sem símbolos.
2. Se a identidade visual mudar, atualize os arquivos em `public/brand/` (copiados de
   `Downloads/Mouve Identidade/` na Task 12) e o favicon em `app/favicon.ico`.

## Depois do deploy

Rode um Lighthouse (Chrome DevTools → aba Lighthouse, ou `npx lighthouse
https://seu-dominio.vercel.app --view`) contra a URL publicada. Sendo um site
estático sem imagens pesadas, performance e acessibilidade devem vir altas por
padrão, qualquer nota abaixo de 90 indica algo a investigar (imagem sem
`width`/`height`, fonte bloqueando render, etc.), não é esperado.

## Deploy

Conecte este repositório na Vercel (Import Project). A Vercel detecta Next.js
automaticamente; configure `NEXT_PUBLIC_MOUVE_WHATSAPP` em Project Settings →
Environment Variables antes do primeiro deploy.
