# Site do Dr. Gustavo Boaventura

Data: 26/11/2026. Tamanho: pequeno (uma página estática, no formato já usado no site da Dra. Julianna).

## Intenção

Site para pacientes que procuram harmonização facial em São Paulo e estão decidindo se agendam com o Dr. Gustavo Boaventura. A ação principal é agendar uma consulta pelo WhatsApp. Ele ocupa a home de drgustavoboaventura.com.br. O formulário do Curso Full Face continua em /cursos, com um link discreto para profissionais.

## Metas

- Quem chega pelo nome dele entende em poucos segundos quem ele é, o que faz e onde atende, e agenda com um toque.
- Mesma família visual do Instituto e do formulário: logo DR. GUSTAVO / BOΛVENTURΛ, Jost, o Λ (V da Jost girado), tinta, marfim e perolada.
- Ser encontrado no Google: a página é indexável (o formulário continua noindex), com título, descrição, imagem de compartilhamento e dados estruturados com o endereço.

## Não metas

- Agendamento online com horários, blog, área do paciente ou várias páginas.
- Mapa embutido do Google: pesa e rastreia. O endereço leva ao Google Maps por um botão.

## Antimetas (o que faria o site falhar mesmo funcionando)

- Cara de template ou de IA, fotos de banco, imagens geradas mostradas como reais. As fotos de ambiente do brand book são geradas e não entram.
- Dados inventados: formação, CRO, números de pacientes, depoimentos.
- Seção vazia ou "em breve" no ar.
- Travessão no texto e faixa de rodapé (preferência da agência para materiais de clientes).

## Restrições

- Hospedagem no site-mouve (Next.js na Vercel), como página estática em `public/previews/dr-gustavo-boaventura/`, servida na home do domínio por rewrite por host em `next.config.mjs`. O redirect temporário de "/" para "/cursos" sai.
- Publicar só com o OK do Fernando (commit e push na main).

## Abordagens

1. **Página estática no site-mouve (escolhida).** Mesmo caminho do site da Dra. Julianna e do formulário: custo zero, publica com um push, fica no mesmo domínio do /cursos.
2. Projeto Next.js separado na Vercel: duplica estrutura para uma página só.
3. Construtor tipo Framer ou Webflow: o cliente editaria sozinho, mas traz mensalidade, sai do stack da agência e separa o site do /cursos.

O Fernando falou em resultado (público e ação), não em ferramenta; a escolha da 1 é da Mouve.

## Decidido com o Fernando

- Público: pacientes.
- WhatsApp de agendamento: (31) 99667-1116, o mesmo que recebe os formulários do curso.
- Endereço: R. Júlio Diniz, 67, Itaim Bibi, São Paulo, SP, 04547-090. O link que ele mandou aponta para a Clínica Modani.
- Atua com harmonização facial desde 2019.
- Frase da marca: "Estética elevada à arte". Chamada: "Agende sua consulta".

## Propostas da Mouve (o Fernando pode corrigir no rascunho)

- Fundo marfim com trechos em tinta. A foto do ensaio tem fundo branco e o paciente costuma ver pelo celular durante o dia.
- Ordem da página:
  1. Abertura: logo, "Estética elevada à arte", "Harmonização facial em São Paulo", foto do ensaio (Gustavo Prontas-07) e o botão de agendar.
  2. Sobre: cirurgião-dentista, harmonização facial desde 2019, atendimento em São Paulo.
  3. Abordagem: Full Face, o rosto inteiro tratado em proporção, e não um ponto isolado.
  4. Tratamentos: toxina botulínica, lábios, mandíbula e mento, malar, olheiras, rinomodelação, bioestimuladores e fios (a mesma lista do formulário do curso).
  5. Onde atende: o endereço, a linha "Atendimento na Clínica Modani" para o paciente reconhecer a fachada, e o botão "Como chegar".
  6. Agendar: WhatsApp com a mensagem pronta "Olá, vim pelo site e quero agendar uma consulta com o Dr. Gustavo Boaventura." e os Instagram @drgustavosboaventura e @instituto.boaventura.
- Sem faixa de rodapé: o CRO e o link "Cursos para profissionais" entram discretos no fim da última seção.
- A seção de casos (antes e depois) fica fora até existirem fotos com autorização escrita dos pacientes.

## Para preencher antes de publicar

- CRO do Dr. Gustavo. Sem ele, a linha do CRO fica fora.
- Opcional: formação, para o Sobre não ficar curto.
- Opcional: mais fotos do ensaio e do espaço. Hoje existe só uma.

## Fica para quem constrói

- Texto das seções no tom da marca, sem inventar fatos.
- Layout, movimento, versão de celular, acessibilidade e a imagem de compartilhamento.

## Mudanças depois da publicação

- 26/11/2026: a pedido do Fernando, a foto do Gustavo saiu do site. A abertura ficou só com texto, e o Λ gigante, cortado pela borda e quase da cor do fundo, passou do Sobre para a abertura. As fotos recortadas foram apagadas.
