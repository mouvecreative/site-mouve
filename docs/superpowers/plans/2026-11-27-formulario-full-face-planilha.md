# Formulário do Curso Full Face na planilha: plano de implementação

> **Para quem executa:** SUB-SKILL OBRIGATÓRIA: use superpowers:subagent-driven-development (recomendado) ou superpowers:executing-plans para executar este plano tarefa por tarefa. Os passos usam caixas (`- [ ]`) para acompanhar.

**Objetivo:** toda resposta do formulário do Curso Full Face, a partir do WhatsApp do lead, chega a uma planilha Google com aviso por e-mail, sem depender do lead mandar a mensagem.

**Arquitetura:** o formulário estático (`public/previews/curso-full-face/index.html`) manda, a cada resposta, o retrato atual das respostas por `navigator.sendBeacon` para um app da Web do Google Apps Script ligado à planilha. O script (`scripts/curso-full-face/planilha.gs`) valida, grava uma linha por lead e manda o e-mail; um gatilho de 30 em 30 minutos avisa quem parou no meio.

**Tecnologia:** HTML e JavaScript sem dependências, Google Apps Script (V8), Node (`node:vm` e `node:assert`) para a checagem do script, o navegador do app para a checagem do formulário.

**Spec:** `docs/superpowers/specs/2026-11-27-formulario-full-face-planilha-design.md`

## Restrições globais

- Campos aceitos (id e rótulo iguais aos de `PASSOS` no formulário): nome Nome, whatsapp WhatsApp, email E-mail, instagram Instagram, cidade Cidade, formacao Formação, registro Registro, tempo Tempo em harmonização, procedimentos Procedimentos, fullface Casos Full Face, faturamento Faturamento mensal, investimento Investimento disponível, pagamento Forma de investir, decisao Decisão, disponibilidade 2 dias fora do consultório, dias Dias preferidos, quando Quando, objetivo Objetivo, motivo Por que o Dr. Gustavo.
- Situações: `Em andamento`, `Concluído`, `Fora da faixa`. O aviso de quem para no meio grava `Parou no meio` em "Aviso enviado".
- Envio: `{ id, seq, situacao, parou, respostas }` em JSON, com `parou` igual ao id da próxima pergunta (só em `Em andamento`).
- Colunas da aba "Formulários", nesta ordem: Atualizado em, Situação, Parou em, os 19 rótulos, Criado em, Aviso enviado, ID, Seq (ID e Seq escondidas).
- Todo texto vindo do formulário entra na planilha com `'` na frente (fica texto, nunca fórmula). Limite de 5000 caracteres para Objetivo e Por que o Dr. Gustavo, 300 para os outros campos, corpo do envio até 100000 caracteres.
- Assuntos dos e-mails: `Curso Full Face: formulário de <Nome>`, `Curso Full Face: <Nome> ficou fora da faixa de investimento`, `Curso Full Face: <Nome> parou no meio do formulário`.
- Aviso de quem parou: 60 minutos sem resposta, conferido a cada 30 minutos.
- Texto da primeira tela: `As vagas passam por análise da equipe. O formulário leva cerca de 3 minutos, e suas respostas ficam salvas com a equipe do curso a cada passo, mesmo que você pare no meio.`
- Texto da tela final: `Chame a nossa equipe no WhatsApp para confirmar a disponibilidade de datas para os 2 dias de curso. Suas respostas já vão na mensagem.` A frase `As respostas só chegam à equipe pela mensagem que você enviar.` sai.
- Proibido: travessão nos textos, dependência nova, arquivo do script dentro de `public/`.
- Publicação (commit e push na main) só depois do teste de ponta a ponta; o OK do Fernando já foi dado para esse caso.

## Foco da revisão

1. O lead toca em "Enviar pelo WhatsApp" e o navegador (principalmente o do Instagram) fecha a página: o envio de `Concluído` precisa ter saído no "Concluir", antes da tela final. Fica na checagem da Tarefa 2.
2. Toques rápidos fazem dois envios chegarem fora de ordem: o mais antigo não pode apagar o mais novo. Fica na checagem da Tarefa 1 (`seq`).
3. O lead volta e muda respostas depois de concluir: a linha atualiza e o e-mail não se repete. Fica na Tarefa 1.
4. Navegador antigo sem `crypto.randomUUID`: o id alternativo precisa ser aceito pelo script. Fica nas Tarefas 1 e 2.
5. Texto com fórmula ou gigante: vira texto e é cortado, sem quebrar a planilha. Fica na Tarefa 1 e no teste de ponta a ponta da Tarefa 3.

---

### Task 1: o script da planilha

**Arquivos:**
- Criar: `scripts/curso-full-face/planilha.gs`
- Criar: `scripts/curso-full-face/checar-planilha.mjs`

**Interfaces:**
- Produz: `doPost(e)` (lê `e.postData.contents`, devolve `ContentService` com `{"ok":true}` ou `{"ok":false}`), `doGet()` (devolve `{"ok":true}`, para conferir o link), `avisarParados()` (gatilho), `configurar()` (cria a aba e o gatilho), constante `AVISAR` (e-mails extras, vazia por padrão).

- [ ] **Passo 1: escrever a checagem.** `checar-planilha.mjs` carrega `planilha.gs` num contexto `vm` com imitações de `SpreadsheetApp` (planilha com `getSheetByName`, `getSheets`, `insertSheet`, `getUrl` igual a `https://planilha.test`; aba em memória com `getLastRow`, `getRange(...).getValues/setValues/setValue/setFontWeight`, `appendRow`, `setFrozenRows`, `hideColumns`, `setName`), `LockService`, `MailApp` (guarda os e-mails), `Session` (`dono@exemplo.test`), `ContentService` e `ScriptApp`. Casos, com `assert`:
  - `parcial_cria_linha`: id `a1b2c3d4-0001`, seq 1, `Em andamento`, parou `email`, nome `Ana Souza`, whatsapp `(11) 98888-7777` → 1 linha; Situação `Em andamento`; Parou em `E-mail`; Nome `'Ana Souza`; nenhum e-mail; resposta `ok: true`.
  - `conclusao_atualiza_e_avisa`: mesmo id, seq 18, `Concluído`, as 19 respostas (investimento `Acima de R$ 30 mil`) → continua 1 linha; Parou em vazio; 1 e-mail para `dono@exemplo.test` com assunto `Curso Full Face: formulário de Ana Souza` e corpo com `Investimento disponível: Acima de R$ 30 mil`, `https://wa.me/5511988887777` e `https://planilha.test`; Aviso enviado `Concluído`.
  - `fora_de_ordem_ignorado`: mesmo id, seq 5, `Em andamento` → Situação continua `Concluído`.
  - `sem_aviso_repetido`: mesmo id, seq 19, `Concluído` → total de e-mails continua 1.
  - `fora_da_faixa_avisa`: id `b1b2c3d4-0002`, `Fora da faixa`, nome `Bruno Lima` → assunto `Curso Full Face: Bruno Lima ficou fora da faixa de investimento`.
  - `formula_e_texto_longo`: nome `=HYPERLINK("http://x","y") Silva` fica `'=HYPERLINK("http://x","y") Silva`; objetivo de 6000 caracteres fica com 5001 (o `'` e mais 5000); procedimentos `['Toxina botulínica', 'Lábios']` fica `'Toxina botulínica, Lábios`; a chave desconhecida `extra` não cria coluna.
  - `envios_invalidos`: corpo vazio, `nao json`, sem whatsapp, situação `Pago`, id `x`, seq 0 e corpo com mais de 100000 caracteres → nenhuma linha nova, resposta `ok: false`.
  - `id_alternativo`: id `lx2k3abc-9f8e7d6c` é aceito.
  - `parados_avisa_uma_vez`: linhas com `Em andamento` atualizada há 2 horas (Carla Dias, parou em Formação), `Em andamento` há 10 minutos e `Concluído` há 3 horas; `avisarParados()` rodado duas vezes → 1 e-mail só, assunto `Curso Full Face: Carla Dias parou no meio do formulário`, corpo com `Parou em: Formação`; Aviso enviado da Carla `Parou no meio`.
  - Datas vindas da imitação são de outro contexto `vm`: o script reconhece data por `getTime`, não por `instanceof Date`.
- [ ] **Passo 2:** `node scripts/curso-full-face/checar-planilha.mjs`. Esperado: falha, porque `planilha.gs` não existe.
- [ ] **Passo 3: escrever `planilha.gs`.** Trava com `LockService.getScriptLock().waitLock(20000)` em `doPost` e `avisarParados`. Procura a linha pelo ID; se a `Seq` gravada for maior ou igual à que chegou, ignora. Grava a linha antes de mandar o e-mail. O link do WhatsApp do lead usa só os dígitos, com `55` na frente quando vierem 10 ou 11 dígitos. `configurar()` renomeia a aba única vazia (ou cria a aba "Formulários"), escreve o cabeçalho em negrito, congela a primeira linha, esconde ID e Seq e recria o gatilho `avisarParados` de 30 em 30 minutos. O topo do arquivo explica a instalação em 3 linhas.
- [ ] **Passo 4:** rodar a checagem de novo. Esperado: `ok: planilha confere`.
- [ ] **Passo 5: commit** de `scripts/curso-full-face/`, desta spec e deste plano.

### Task 2: o formulário manda as respostas

**Arquivos:**
- Modificar: `public/previews/curso-full-face/index.html` (constantes do topo do script, `avancar`, `capa`, `fimA` e o CSS de `.miuda`, se ficar sem uso)
- Criar no scratchpad: `checar-envio.js` (roda no navegador do app)

**Interfaces:**
- Consome: o formato de envio das restrições globais, aceito pelo `doPost` da Tarefa 1.
- Produz: constante `PLANILHA` (vazia até a Tarefa 3; vazia não manda nada) e `gravar(situacao, parou)`.

- [ ] **Passo 1: escrever a checagem do navegador.** Abre uma cópia do formulário no scratchpad com `PLANILHA` trocada por `https://exemplo.test/exec`, troca `navigator.sendBeacon` por uma função que guarda `(url, corpo)` e preenche as telas pelo DOM (`requestSubmit`). Confere:
  - depois do nome, nenhum envio; depois do WhatsApp, 1 envio com `situacao` `Em andamento`, `parou` `email`, `seq` 1 e `respostas` com nome e WhatsApp;
  - ao tocar em "Concluir", o último envio é `Concluído`, `parou` vazio e `seq` 18, todos com o mesmo id e a URL de `PLANILHA`, antes de qualquer toque no WhatsApp;
  - a tela final não tem `só chegam` e o link continua começando com `https://wa.me/5531996671116?text=`;
  - a primeira tela tem `mesmo que você pare no meio`;
  - numa segunda rodada, sem `crypto.randomUUID` e com o armazenamento limpo, investimento `Até R$ 10 mil` gera envio `Fora da faixa` com um id novo que casa com `/^[A-Za-z0-9-]{8,64}$/`.
- [ ] **Passo 2:** rodar a checagem na cópia do formulário atual. Esperado: falha (nenhum envio).
- [ ] **Passo 3: mudar o formulário.** `gravar` não faz nada sem `PLANILHA` ou sem `R.whatsapp`; cria o id uma vez (`crypto.randomUUID`, senão base 36 de `Date.now()` e de `Math.random()`), soma 1 em `seq`, guarda os dois em `localStorage` na chave `fullface-envio-v1` e manda por `sendBeacon`, com `fetch` `no-cors` e `keepalive` se o `sendBeacon` faltar ou recusar. `avancar` chama `gravar` depois de `salvar()`: `Fora da faixa` antes de ir para `fimB`, `Concluído` antes de `fimA`, senão `Em andamento` com o id da próxima pergunta. Trocar os textos das restrições globais.
- [ ] **Passo 4:** rodar a checagem de novo numa cópia nova. Esperado: tudo confere. Olhar a primeira tela e a final no celular (375 px) e no computador.
- [ ] **Passo 5: commit** do formulário.

### Task 3: planilha no Drive, instalação, teste de ponta a ponta e publicação

**Arquivos:**
- Modificar: `public/previews/curso-full-face/index.html` (valor de `PLANILHA`)

- [ ] **Passo 1:** criar a planilha vazia "Curso Full Face: formulários" na pasta do Drive Clientes/Instituto Boaventura (id `1gqSGT7EoxUBtQGs5E-ZBZzOJNfxNVoXO`).
- [ ] **Passo 2:** mandar ao Fernando o `planilha.gs` e o passo a passo: Extensões > Apps Script, colar, salvar, rodar `configurar` e autorizar, Implantar > Nova implantação > App da Web (executar como você, acesso: qualquer pessoa), mandar a URL que termina em `/exec`. Parar até ele mandar.
- [ ] **Passo 3:** com a URL: abrir no navegador (esperado `{"ok":true}`), colocar em `PLANILHA` e rodar de novo a checagem da Tarefa 2.
- [ ] **Passo 4: teste de ponta a ponta.** Pelo formulário local, preencher um lead "Teste Mouve" até "Concluir", com uma resposta que começa com `=`. Esperado: uma linha na planilha com Situação `Concluído`, a resposta com `=` como texto, e o e-mail na caixa da conta que instalou (o Fernando confirma, se não houver como ver daqui).
- [ ] **Passo 5: publicar.** `git fetch`, rebase em `origin/main` se a main andou, commit e `git push origin HEAD:main`.
- [ ] **Passo 6: conferir em produção.** Deploy `Ready` (`npx vercel ls site-mouve`), `https://drgustavoboaventura.com.br/cursos` traz a URL nova em `PLANILHA` e os textos novos, e o site da home continua 200.
