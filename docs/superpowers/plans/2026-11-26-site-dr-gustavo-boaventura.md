# Site do Dr. Gustavo Boaventura: plano de implementação

> **Para quem executa:** SUB-SKILL OBRIGATÓRIA: use superpowers:subagent-driven-development (recomendado) ou superpowers:executing-plans para executar este plano tarefa por tarefa. Os passos usam caixas (`- [ ]`) para acompanhar.

**Objetivo:** página única para pacientes em drgustavoboaventura.com.br, com agendamento de consulta pelo WhatsApp.

**Arquitetura:** HTML e CSS estáticos em `public/previews/dr-gustavo-boaventura/` do site-mouve (Next.js na Vercel), servidos na home do domínio por um rewrite por host em `next.config.mjs`. Sem JavaScript: os links do WhatsApp já vão prontos no HTML. O formulário do curso continua em /cursos.

**Tecnologia:** HTML, CSS, Jost pelo Google Fonts, Chrome headless e PIL para as imagens, Node para as checagens.

**Spec:** `docs/superpowers/specs/2026-11-26-site-dr-gustavo-boaventura-design.md`

## Restrições globais

- Cores: tinta `#15171C`, marfim `#F4F1EA`, perolada `#D6D4CF`, prata `#9A958D`, metal `#C2BEB6`. Fundo principal marfim, com trechos em tinta.
- Fonte: Jost 300 e 400. O Λ é o V da Jost girado 180°, com a mesma construção do logo do formulário (`.lg`, `.a`, `.b`, `.lam` em `public/previews/curso-full-face/index.html`). Logo com no mínimo 160 px de largura.
- WhatsApp: `5531996671116`, mensagem `Olá, vim pelo site e quero agendar uma consulta com o Dr. Gustavo Boaventura.`
- Endereço: `R. Júlio Diniz, 67, Itaim Bibi, São Paulo, SP, 04547-090`, com a linha `Atendimento na Clínica Modani` e o botão `Como chegar` para `https://www.google.com/maps/search/?api=1&query=R.%20J%C3%BAlio%20Diniz%2C%2067%2C%20Itaim%20Bibi%2C%20S%C3%A3o%20Paulo%2C%20SP%2C%2004547-090`.
- Instagram: `https://www.instagram.com/drgustavosboaventura/` e `https://www.instagram.com/instituto.boaventura/`.
- Frases fixas: `Estética elevada à arte.`, `Harmonização facial em São Paulo`, `Agende sua consulta`, `desde 2019`.
- Todo caminho de arquivo é absoluto, começando em `/previews/dr-gustavo-boaventura/` (a página é servida em "/", e um caminho relativo quebraria).
- Proibido: travessão, faixa de rodapé, linha de CRO (o número ainda não chegou), dado inventado, foto de banco, imagem gerada mostrada como real, `noindex`.
- Commit e push só com o OK do Fernando.

## Foco da revisão

1. Celular de 375 px: o botão de agendar aparece na primeira tela, nada vaza para os lados e o logo tem no mínimo 160 px. A checagem fica na Tarefa 3.
2. Página servida em "/" pelo rewrite: CSS e imagens carregam mesmo assim. Fica na asserção de caminhos absolutos da Tarefa 1 e no teste na borda da Vercel da Tarefa 3.
3. Acento na mensagem do WhatsApp: o link, decodificado, devolve a mensagem exata. Fica na Tarefa 1.
4. Prévia do link no WhatsApp e no Instagram: `og:image` é uma URL absoluta que responde 200. Fica na Tarefa 3.
5. Quem pede menos movimento (`prefers-reduced-motion`) recebe a página sem animação. Fica na Tarefa 3.

---

### Task 1: a página

**Arquivos:**
- Criar: `public/previews/dr-gustavo-boaventura/index.html`
- Criar: `public/previews/dr-gustavo-boaventura/estilo.css`
- Criar: `public/previews/dr-gustavo-boaventura/img/gustavo-900.webp` e `img/gustavo-1600.webp`, gerados de `~/Downloads/Gustavo Prontas-07.jpeg` (3840x5760, retrato 2:3).

**Interfaces:**
- Produz: a página em `/previews/dr-gustavo-boaventura/index.html`, que a Tarefa 2 aponta para "/".

- [ ] **Passo 1: escrever a checagem antes da página.** Salvar no scratchpad da sessão como `checar-site.mjs`. Ela lê o `index.html` e falha (`assert`) se faltar algum destes pontos:
  - seções com `id` `sobre`, `abordagem`, `tratamentos`, `onde` e `agendar`;
  - os 8 tratamentos: Toxina botulínica, Lábios, Mandíbula e mento, Malar, Olheiras, Rinomodelação, Bioestimuladores, Fios;
  - pelo menos 2 links `https://wa.me/5531996671116?text=` cujo `text`, decodificado com `decodeURIComponent`, é exatamente a mensagem das restrições globais;
  - `R. Júlio Diniz, 67`, `04547-090`, `Atendimento na Clínica Modani`, o link `Como chegar` com a URL das restrições globais, `href="/cursos"` e `desde 2019`;
  - um bloco `application/ld+json` que o `JSON.parse` aceita, com `@type` `Dentist` e `address.postalCode` igual a `04547-090`.

  Ela também falha se aparecer algum destes:
  - `—`, `noindex` ou `CRO`;
  - um `src=` ou `href=` local que não comece com `/previews/dr-gustavo-boaventura/`, `/cursos`, `#`, `https:` ou `data:`.
- [ ] **Passo 2:** rodar `node checar-site.mjs <caminho do index.html>`. Esperado: falha, porque o arquivo ainda não existe.
- [ ] **Passo 3: gerar as fotos.** Usar PIL e cortar só pela altura, sem esticar nem forçar nitidez. Resultado: WebP com qualidade 82 em 900 e 1600 de largura.
- [ ] **Passo 4: escrever `index.html` e `estilo.css`.** Seguir a ordem da spec: abertura, Sobre, Abordagem, Tratamentos, Onde atende, Agendar. A abertura mostra o logo vivo, as frases fixas, a foto em retângulo vertical sem sombra (com `srcset` das duas larguras) e o botão. O cabeçalho tem só o logo e "Agende sua consulta". "Cursos para profissionais" fica discreto no fim da seção Agendar, onde o CRO entra quando o número chegar.
  - No `head`:
    - `title`: `Dr. Gustavo Boaventura | Harmonização facial em São Paulo`.
    - `description`, `canonical` (`https://drgustavoboaventura.com.br/`) e `theme-color` marfim.
    - `og:image` com `https://site-mouve.vercel.app/previews/dr-gustavo-boaventura/og.jpg`.
    - O favicon do Λ, igual ao do formulário.
    - O JSON-LD `Dentist` com nome, endereço, telefone `+55 31 99667-1116`, `url` e `sameAs` com os dois Instagram.
  - Texto: no tom da marca, curto, só com fatos da spec.
- [ ] **Passo 5:** rodar a checagem de novo. Esperado: passa, sem nenhuma asserção falhando.

### Task 2: a home do domínio abre a página

**Arquivos:**
- Modificar: `next.config.mjs`. Remover a função `redirects()` inteira, porque ela só existia para mandar "/" para "/cursos". Incluir em `beforeFiles` a regra `{ source: "/", has: [{ type: "host", value: "(www\\.)?drgustavoboaventura\\.com\\.br" }], destination: "/previews/dr-gustavo-boaventura/index.html" }` antes da regra de `/cursos`. Atualizar o comentário do domínio.

**Interfaces:**
- Consome: a página da Tarefa 1.

- [ ] **Passo 1:** escrever a checagem `node --input-type=module -e` que importa `next.config.mjs`. Ela deve confirmar que:
  - `nextConfig.redirects` é `undefined`;
  - `beforeFiles` tem as regras de "/" e de "/cursos" para o host do Gustavo, com os destinos acima;
  - as regras da Estrela Guia, da Faceta e da Julianna continuam iguais.
- [ ] **Passo 2:** rodar a checagem antes da mudança. Esperado: falha, porque `redirects` ainda existe.
- [ ] **Passo 3:** editar `next.config.mjs`.
- [ ] **Passo 4:** rodar a checagem de novo. Esperado: passa.

### Task 3: conferência, imagem de compartilhamento e publicação

**Arquivos:**
- Criar: `public/previews/dr-gustavo-boaventura/og.jpg` (1200x630, render da abertura pelo Chrome headless, JPEG com qualidade 88).

- [ ] **Passo 1: conferir no navegador do app.** Usar o servidor `fullface-local` (de `.claude/launch.json`), que serve `public/` na porta 3060.
  - Conferir a página em 375 e em 1440 px: botão visível na primeira tela, nada vazando para os lados e o logo com no mínimo 160 px (medir por `getBoundingClientRect`).
  - Tirar um print de cada largura.
  - Ligar `prefers-reduced-motion` e conferir que nada se move.
- [ ] **Passo 2:** rodar o detector do impeccable na página e corrigir o que for material.
- [ ] **Passo 3:** gerar o `og.jpg` e olhar o resultado.
- [ ] **Passo 4:** mostrar os prints ao Fernando e pedir o OK para publicar.
- [ ] **Passo 5 (só com o OK): publicar.**
  - `git fetch` e rebase em `origin/main`, se a main tiver andado.
  - Fazer um commit com a spec, este plano, a pasta da página e `next.config.mjs`.
  - `git push origin HEAD:main`.
- [ ] **Passo 6: conferir em produção.**
  - Esperar o deploy ficar `Ready` (`npx vercel ls site-mouve`).
  - Conferir que `https://site-mouve.vercel.app/previews/dr-gustavo-boaventura/og.jpg` responde 200.
  - Para o apex e para o www, rodar `curl --resolve <host>:80:216.198.79.1`. Esperado:
    - "/" responde 200 e traz o `title` da página;
    - "/cursos" responde 200 e traz o formulário.
  - O HTTPS só funciona depois do DNS no registro.br.
