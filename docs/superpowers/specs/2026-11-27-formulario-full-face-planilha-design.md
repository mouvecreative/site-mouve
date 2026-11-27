# Formulário do Curso Full Face: respostas na planilha

Data: 27/11/2026. Tamanho: mudança pequena no formulário que já está no ar em drgustavoboaventura.com.br/cursos.

## Intenção

Um lead preencheu o formulário e a equipe não recebeu nada. Hoje as respostas ficam só no navegador do lead e só chegam à equipe se ele mesmo mandar a mensagem no WhatsApp. Quem cai no filtro de investimento (abaixo de "Acima de R$ 30 mil") não manda nada, por decisão de 25/11. A partir de agora, nenhuma resposta pode depender do lead apertar enviar.

## Metas

- Cada lead vira uma linha numa planilha do Google, a partir da resposta do WhatsApp, atualizada a cada nova resposta.
- A equipe recebe um e-mail com as respostas quando o lead conclui ou fica fora da faixa, e quando ele para no meio.
- O WhatsApp continua como último passo, para combinar as datas do curso.

## Não metas

- Recuperar as respostas de quem preencheu antes desta mudança (elas não existem do nosso lado).
- Painel próprio, login ou banco de dados.

## Antimetas

- Lead perdido porque o envio falhou em silêncio enquanto a página dizia que tinha dado certo.
- Fórmula ou texto gigante vindo do formulário quebrando a planilha.
- E-mail repetido a cada resposta.

## Abordagens

1. **Planilha Google com Apps Script (escolhida pelo Fernando).** O formulário manda as respostas para um app da Web do Apps Script ligado à planilha, que grava a linha e manda o e-mail pela própria conta Google. Grátis, sem conta nova; pede uma autorização no Google uma vez.
2. Só e-mail, por um serviço de envio (Resend) chamado de uma rota do site-mouve: exige conta nova e chave na Vercel, e não deixa uma lista dos leads.
3. Banco de dados (Supabase) com painel: estrutura demais para um formulário.

## Decidido com o Fernando

- Destino: planilha + aviso por e-mail.
- Quem é gravado: todo mundo a partir da resposta do WhatsApp, inclusive quem parou no meio e quem ficou fora da faixa. Quem fica fora da faixa continua sem ver o botão do WhatsApp.
- A primeira tela passa a avisar que as respostas ficam salvas.
- Publicar depois de um teste de ponta a ponta com um lead de teste.

## Propostas da Mouve (aprovadas no desenho)

- Planilha "Curso Full Face: formulários" no Drive da Mouve, em Clientes/Instituto Boaventura, aba "Formulários".
- Uma linha por lead. Colunas: Atualizado em, Situação (Em andamento, Concluído, Fora da faixa), Parou em, as 19 respostas, Criado em, Aviso enviado, e duas colunas escondidas de controle (ID e Seq).
- E-mail na hora em que o lead conclui ou fica fora da faixa. Quem para no meio recebe aviso depois de 1 hora sem responder, conferido a cada 30 minutos. Um aviso por situação, sem repetir.
- O e-mail vai para a conta Google que instalar o script, com a opção de incluir outros endereços no próprio script. Traz as respostas, um link para chamar o lead no WhatsApp e o link da planilha.
- Na tela final sai a frase "As respostas só chegam à equipe pela mensagem que você enviar", que deixa de ser verdade.

## Restrições

- O endereço do app da Web fica visível na página. O script aceita só os campos do formulário, corta textos longos, guarda tudo como texto (nada vira fórmula) e ignora envios fora de ordem. Ainda assim, alguém pode criar linhas falsas.
- O envio não pode atrasar nem travar o formulário: vai em segundo plano e não espera resposta.
- O código do Apps Script fica versionado no site-mouve, fora de `public/`.
- Publicação com o OK já dado pelo Fernando, depois do teste de ponta a ponta.

## Fica para quem constrói

- Formato do envio, validação no script, testes e o passo a passo de instalação no Google.
