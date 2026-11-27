// Formulário do Curso Full Face (drgustavoboaventura.com.br/cursos): grava uma linha por lead nesta planilha e avisa por e-mail.
// Instalação: Extensões > Apps Script, colar este arquivo, salvar e rodar "configurar" uma vez, autorizando.
// Depois: Implantar > Nova implantação > App da Web, executar como você, acesso de qualquer pessoa. A URL /exec vai em PLANILHA no formulário.
// Fonte versionada no site-mouve em scripts/curso-full-face/planilha.gs, com a checagem checar-planilha.mjs.

const ABA = 'Formulários';
// E-mails extras para avisar, separados por vírgula. Vazio avisa só a conta que instalou o script.
const AVISAR = '';
const PARADO_MINUTOS = 60;

// Mesmos ids e rótulos de PASSOS em public/previews/curso-full-face/index.html: mudou lá, muda aqui.
const CAMPOS = [
  ['nome', 'Nome'], ['whatsapp', 'WhatsApp'], ['email', 'E-mail'], ['instagram', 'Instagram'], ['cidade', 'Cidade'],
  ['formacao', 'Formação'], ['registro', 'Registro'], ['tempo', 'Tempo em harmonização'], ['procedimentos', 'Procedimentos'],
  ['fullface', 'Casos Full Face'], ['faturamento', 'Faturamento mensal'], ['investimento', 'Investimento disponível'],
  ['pagamento', 'Forma de investir'], ['decisao', 'Decisão'], ['disponibilidade', '2 dias fora do consultório'],
  ['dias', 'Dias preferidos'], ['quando', 'Quando'], ['objetivo', 'Objetivo'], ['motivo', 'Por que o Dr. Gustavo'],
];
const LONGOS = ['objetivo', 'motivo'];
const SITUACOES = ['Em andamento', 'Concluído', 'Fora da faixa'];
const CABECALHO = ['Atualizado em', 'Situação', 'Parou em'].concat(CAMPOS.map((c) => c[1]), ['Criado em', 'Aviso enviado', 'ID', 'Seq']);
const COL = {};
CABECALHO.forEach((nome, i) => { COL[nome] = i; });

function doGet() {
  return responder({ ok: true });
}

function doPost(e) {
  const d = validar(e && e.postData ? e.postData.contents : '');
  if (!d) return responder({ ok: false });
  const trava = LockService.getScriptLock();
  trava.waitLock(20000);
  try {
    gravar(d);
  } finally {
    trava.releaseLock();
  }
  return responder({ ok: true });
}

// Devolve o envio limpo, ou null quando não é um envio do formulário.
function validar(texto) {
  if (typeof texto !== 'string' || !texto || texto.length > 100000) return null;
  let d;
  try { d = JSON.parse(texto); } catch (err) { return null; }
  if (!d || typeof d !== 'object' || typeof d.id !== 'string' || !/^[A-Za-z0-9-]{8,64}$/.test(d.id)) return null;
  if (!Number.isInteger(d.seq) || d.seq < 1 || d.seq > 1000000 || SITUACOES.indexOf(d.situacao) < 0) return null;
  const r = d.respostas && typeof d.respostas === 'object' ? d.respostas : {};
  const respostas = {};
  CAMPOS.forEach(([id]) => {
    let v = r[id];
    if (Array.isArray(v)) v = v.filter((x) => typeof x === 'string').join(', ');
    if (typeof v !== 'string') return;
    v = v.replace(/[\u0000-\u0009\u000B-\u001F\u007F]/g, ' ').trim().slice(0, LONGOS.indexOf(id) >= 0 ? 5000 : 300);
    if (v) respostas[id] = v;
  });
  if (!respostas.nome || !respostas.whatsapp) return null;
  return { id: d.id, seq: d.seq, situacao: d.situacao, parou: d.situacao === 'Em andamento' ? rotulo(d.parou) : '', respostas };
}

function gravar(d) {
  const aba = planilha().getSheetByName(ABA) || configurarAba();
  const n = aba.getLastRow();
  const ids = n > 1 ? aba.getRange(2, COL.ID + 1, n - 1, 1).getValues().map((l) => String(l[0])) : [];
  const k = ids.indexOf(d.id);
  const linha = k >= 0 ? aba.getRange(k + 2, 1, 1, CABECALHO.length).getValues()[0] : CABECALHO.map(() => '');
  // Quem responde rápido faz envios chegarem fora de ordem: só o mais novo vale.
  if (k >= 0 && Number(linha[COL.Seq]) >= d.seq) return;
  const agora = new Date();
  linha[COL['Atualizado em']] = agora;
  linha[COL['Situação']] = d.situacao;
  linha[COL['Parou em']] = d.parou;
  CAMPOS.forEach(([id, rot]) => { linha[COL[rot]] = d.respostas[id] ? texto(d.respostas[id]) : ''; });
  linha[COL.ID] = texto(d.id);
  linha[COL.Seq] = d.seq;
  const avisar = d.situacao !== 'Em andamento' && linha[COL['Aviso enviado']] !== d.situacao;
  if (avisar) linha[COL['Aviso enviado']] = d.situacao;
  if (k >= 0) {
    aba.getRange(k + 2, 1, 1, CABECALHO.length).setValues([linha]);
  } else {
    linha[COL['Criado em']] = agora;
    aba.appendRow(linha);
  }
  if (avisar) avisarPorEmail(d.situacao, d.respostas, d.parou);
}

// Gatilho de 30 em 30 minutos: avisa uma vez quem parou no meio há mais de PARADO_MINUTOS.
function avisarParados() {
  const trava = LockService.getScriptLock();
  trava.waitLock(20000);
  try {
    const aba = planilha().getSheetByName(ABA);
    if (!aba || aba.getLastRow() < 2) return;
    const limite = Date.now() - PARADO_MINUTOS * 60000;
    aba.getRange(2, 1, aba.getLastRow() - 1, CABECALHO.length).getValues().forEach((l, i) => {
      const quando = l[COL['Atualizado em']];
      if (l[COL['Situação']] !== 'Em andamento' || l[COL['Aviso enviado']] !== '') return;
      if (!quando || typeof quando.getTime !== 'function' || quando.getTime() > limite) return;
      const r = {};
      CAMPOS.forEach(([id, rot]) => { if (l[COL[rot]] !== '') r[id] = String(l[COL[rot]]); });
      aba.getRange(i + 2, COL['Aviso enviado'] + 1).setValue('Parou no meio');
      avisarPorEmail('Parou no meio', r, l[COL['Parou em']]);
    });
  } finally {
    trava.releaseLock();
  }
}

function avisarPorEmail(situacao, r, parou) {
  const nome = String(r.nome || 'Sem nome').replace(/\s+/g, ' ');
  const assunto = situacao === 'Concluído' ? 'Curso Full Face: formulário de ' + nome
    : situacao === 'Fora da faixa' ? 'Curso Full Face: ' + nome + ' ficou fora da faixa de investimento'
    : 'Curso Full Face: ' + nome + ' parou no meio do formulário';
  const corpo = [situacao === 'Parou no meio' ? 'Parou em: ' + parou : 'Situação: ' + situacao, '']
    .concat(CAMPOS.filter(([id]) => r[id]).map(([id, rot]) => rot + ': ' + r[id]))
    .concat(['', 'Chamar no WhatsApp: https://wa.me/' + zap(r.whatsapp), 'Planilha: ' + planilha().getUrl()])
    .join('\n');
  MailApp.sendEmail({ to: destinatarios(), subject: assunto, body: corpo, name: 'Formulário Curso Full Face' });
}

function configurar() {
  configurarAba();
  ScriptApp.getProjectTriggers()
    .filter((t) => t.getHandlerFunction() === 'avisarParados')
    .forEach((t) => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger('avisarParados').timeBased().everyMinutes(30).create();
}

function configurarAba() {
  const p = planilha();
  const abas = p.getSheets();
  const aba = p.getSheetByName(ABA)
    || (abas.length === 1 && abas[0].getLastRow() === 0 ? abas[0].setName(ABA) : p.insertSheet(ABA));
  aba.getRange(1, 1, 1, CABECALHO.length).setValues([CABECALHO]).setFontWeight('bold');
  aba.setFrozenRows(1);
  aba.hideColumns(COL.ID + 1, 2);
  return aba;
}

// O apóstrofo faz a planilha guardar como texto: nada que vem do formulário vira fórmula, número ou data.
function texto(v) {
  return "'" + v;
}

function rotulo(id) {
  const c = CAMPOS.find(([k]) => k === id);
  return c ? c[1] : '';
}

// Número do lead para o link do WhatsApp: só dígitos, com 55 quando veio só DDD e número.
function zap(numero) {
  const d = String(numero || '').replace(/\D/g, '');
  return d.length === 10 || d.length === 11 ? '55' + d : d;
}

function destinatarios() {
  return [Session.getEffectiveUser().getEmail()].concat(AVISAR.split(','))
    .map((s) => s.trim()).filter(Boolean).join(',');
}

function planilha() {
  return SpreadsheetApp.getActiveSpreadsheet();
}

function responder(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
