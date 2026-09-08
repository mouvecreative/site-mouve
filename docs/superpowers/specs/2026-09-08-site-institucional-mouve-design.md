# Site institucional da Mouve — Design

## Objetivo

Site institucional/lead-gen da própria Mouve Creative, usando a nova identidade visual (símbolo M mono-linha, azul `#0F0FDF`). Funciona como extensão web do deck de vendas v3: mesma narrativa de persuasão (prova social → problema → autoridade → diferencial → gatilho emocional → value stack → planos), terminando em CTA de WhatsApp.

## Arquitetura

- **Next.js (App Router) + TypeScript + Tailwind CSS + shadcn/ui**
- Site 100% estático: nenhuma página tem dado dinâmico, banco de dados ou API própria. Cada rota é conteúdo fixo renderizado em build time.
- **Sem formulário com backend.** Todo CTA de contato é um link `wa.me/<numero>?text=<mensagem pré-preenchida>`, no mesmo padrão já usado nas landing pages de clientes (Dr. Danilo, Dr. Bruno Goulart).
- **Conteúdo direto nos componentes de página** (não em arquivos de dados separados nem MDX) — não há CMS, não há múltiplos idiomas, e o usuário não edita código diretamente, então a indireção extra não traria benefício agora. Se o site ganhar um blog no futuro, essa decisão é revisitada.
- **Hospedagem: Vercel.** Deploy automático a cada push no GitHub, sem necessidade de gerenciar servidor.

## Fonte

A identidade oficial usa Avenir Next Demi Bold, que não é uma fonte web gratuita (licenciada Apple/Linotype). Substituto aprovado pelo usuário: **Poppins** (Google Fonts, gratuita), já usada em outro material da própria Mouve (template de proposta genérica), mantendo consistência entre os materiais.

## Páginas (Information Architecture)

Estrutura espelha a sequência de persuasão validada no deck de vendas v3 (ver `mouve-template-proposta-generica` na memória do projeto):

1. **`/` — Home**
   - Hero: símbolo M + headline + CTA principal
   - Resumo rápido do método (4 pilares ou 3 etapas, versão condensada)
   - Números de credibilidade (clientes ativos, segmentos atendidos, taxa de retenção — mesmos números do deck)
   - CTA final de WhatsApp

2. **`/sobre` — Sobre & Diferencial**
   - "Sobre a Mouve" (história/crença, adaptado do deck)
   - "Diferencial": comparação agência genérica vs. Mouve (mesmo conteúdo do slide "Diferencial")

3. **`/metodo` — Método**
   - "Métricas": vaidade vs. o que paga o boleto (reframe do problema)
   - "Processo": diagnóstico → estratégia → execução

4. **`/planos` — Planos & Investimento**
   - Os 3 planos (Essencial / Crescimento / Referência) com o que cada um inclui — **sem valor em R$ visível**, terminando em CTA de "marcar uma conversa"
   - "O que você leva" (value stack): lista das entregas + linha de ancoragem, igual ao slide correspondente do deck

5. **`/contato` — Contato**
   - CTA de WhatsApp grande e direto
   - Redes sociais (Instagram @agencia_mouve)

## Visual

- **Cores**: azul Mouve `#0F0FDF` (CTA/destaque), grafite `#16181F` (texto/fundo escuro), paper `#F6F4EF` (fundo claro). Sem gradientes, sem paleta genérica de IA.
- **Tipografia**: Poppins em toda a hierarquia (títulos, corpo, labels).
- **Motivo gráfico**: símbolo M mono-linha reaproveitado como elemento recorrente — tom sobre tom (ex.: símbolo gigante cortado pela página, quase na cor do fundo), nunca em grade densa repetida (regra já estabelecida: "muito poluído pra médico/cliente premium").
- **Regras herdadas dos materiais Mouve**: nunca usar travessão (—); nunca usar rodapé de texto corrido (o footer do site é funcional — logo, links, WhatsApp — não um parágrafo institucional).
- Mobile-first, responsivo.

## Componentes principais

- `Nav` — logo (símbolo + wordmark) + links das 5 páginas + CTA WhatsApp destacado
- `Footer` — minimalista: logo, redes sociais, link de WhatsApp. Sem texto longo.
- `WhatsAppButton` — componente reutilizável, aceita uma mensagem pré-preenchida por contexto (varia por página/seção)
- `SectionHeading` — eyebrow (label pequeno) + título, mesmo padrão visual do deck
- `PlanCard` — nome do plano, lista do que inclui, CTA — sem preço
- `MethodStep` — item numerado (usado em Processo e nos 4 pilares)

## Testes / QA

- Verificação visual em mobile e desktop antes de publicar
- Conferir que cada link de WhatsApp abre com a mensagem certa pro contexto
- Rodar Lighthouse básico (performance/acessibilidade) — site estático simples deve pontuar bem por padrão
- Revisão de conteúdo: nenhum placeholder, nenhum travessão, nenhum preço nas páginas de planos

## Fora de escopo (YAGNI)

- CMS / edição de conteúdo sem código
- Blog / múltiplos idiomas
- Formulário com envio de e-mail ou integração com CRM
- Preços públicos
- Autenticação ou qualquer área logada
