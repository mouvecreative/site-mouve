// Checagem do script da planilha do Curso Full Face (planilha.gs) sem o Google:
// roda o arquivo num contexto vm com imitações das APIs do Apps Script.
// Uso: node scripts/curso-full-face/checar-planilha.mjs
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const codigo = readFileSync(new URL('./planilha.gs', import.meta.url), 'utf8');

function criarAmbiente() {
  const abas = [];
  const emails = [];
  const gatilhos = [];
  // Escritas ainda não confirmadas (flush) e travas soltas com escrita pendente.
  let pendentes = 0;
  const violacoes = [];
  let falhasDeEmail = 0;
  // Como a planilha de verdade: o apóstrofo do começo só marca texto e não volta na leitura.
  const ler = (v) => (typeof v === 'string' && v.startsWith("'") ? v.slice(1) : v);
  function criarAba(nome) {
    const linhas = [];
    const aba = {
      linhas,
      getName: () => nome,
      setName(n) { nome = n; return aba; },
      getLastRow: () => linhas.length,
      getRange(l, c, nl = 1, nc = 1) {
        const faixa = {
          getValues: () => Array.from({ length: nl }, (_, i) =>
            Array.from({ length: nc }, (_, j) => ler((linhas[l - 1 + i] || [])[c - 1 + j] ?? ''))),
          setValues(v) {
            assert.equal(v.length, nl);
            v.forEach((linha, i) => {
              assert.equal(linha.length, nc);
              const alvo = (linhas[l - 1 + i] ||= []);
              linha.forEach((x, j) => { alvo[c - 1 + j] = x; });
            });
            pendentes++;
            return faixa;
          },
          setValue(x) { (linhas[l - 1] ||= [])[c - 1] = x; pendentes++; return faixa; },
          setFontWeight: () => faixa,
        };
        return faixa;
      },
      appendRow(v) { linhas.push([...v]); pendentes++; return aba; },
      setFrozenRows: () => aba,
      hideColumns: () => aba,
    };
    abas.push(aba);
    return aba;
  }
  criarAba('Página1');
  const planilha = {
    getSheetByName: (n) => abas.find((a) => a.getName() === n) || null,
    getSheets: () => abas,
    insertSheet: (n) => criarAba(n),
    getUrl: () => 'https://planilha.test',
  };
  const ctx = {
    SpreadsheetApp: { getActiveSpreadsheet: () => planilha, flush() { pendentes = 0; } },
    LockService: { getScriptLock: () => ({ waitLock() {}, releaseLock() { if (pendentes) violacoes.push(pendentes); } }) },
    MailApp: { sendEmail(o) {
      if (falhasDeEmail > 0) { falhasDeEmail--; throw new Error('Service invoked too many times for one day: email.'); }
      emails.push(o);
    } },
    Session: { getEffectiveUser: () => ({ getEmail: () => 'dono@exemplo.test' }) },
    ContentService: { MimeType: { JSON: 'json' }, createTextOutput: (s) => ({ texto: s, setMimeType() { return this; } }) },
    ScriptApp: {
      getProjectTriggers: () => [...gatilhos],
      deleteTrigger: (t) => gatilhos.splice(gatilhos.indexOf(t), 1),
      newTrigger: (f) => ({ timeBased: () => ({ everyMinutes: (m) => ({ create() {
        const t = { f, m, getHandlerFunction: () => f };
        gatilhos.push(t);
        return t;
      } }) }) }),
    },
    console: { log: console.log, error() {} },
  };
  vm.createContext(ctx);
  vm.runInContext(codigo, ctx);
  return { ctx, planilha, emails, gatilhos, violacoes, falharEmails: (n) => { falhasDeEmail = n; }, aba: () => planilha.getSheetByName('Formulários') };
}

const enviar = (amb, corpo) =>
  JSON.parse(amb.ctx.doPost({ postData: { contents: typeof corpo === 'string' ? corpo : JSON.stringify(corpo) } }).texto);
const coluna = (amb, rotulo) => {
  const k = amb.aba().linhas[0].indexOf(rotulo);
  assert.ok(k >= 0, `falta a coluna ${rotulo}`);
  return k;
};
const celula = (amb, linha, rotulo) => amb.aba().linhas[linha][coluna(amb, rotulo)] ?? '';

const COMPLETAS = {
  nome: 'Ana Souza', whatsapp: '(11) 98888-7777', email: 'ana@exemplo.test', instagram: 'anasouza.hof',
  cidade: 'São Paulo, SP', formacao: 'Cirurgião(ã)-dentista', registro: 'CRO-SP 12345', tempo: '1 a 3 anos',
  procedimentos: ['Toxina botulínica', 'Lábios'], fullface: 'Já fiz alguns', faturamento: 'R$ 10 mil a R$ 30 mil',
  investimento: 'Acima de R$ 30 mil', pagamento: 'À vista', decisao: 'Sim', disponibilidade: 'Sim',
  dias: 'Sexta e sábado', quando: 'Em até 60 dias', objetivo: 'Atender o rosto inteiro.', motivo: 'Pela técnica.',
};

// parcial_cria_linha
const amb = criarAmbiente();
const parcial = { nome: 'Ana Souza', whatsapp: '(11) 98888-7777' };
assert.deepEqual(enviar(amb, { id: 'a1b2c3d4-0001', seq: 1, situacao: 'Em andamento', parou: 'email', respostas: parcial }), { ok: true });
assert.equal(amb.aba().linhas.length, 2, 'cabeçalho e uma linha');
assert.equal(celula(amb, 1, 'Situação'), 'Em andamento');
assert.equal(celula(amb, 1, 'Parou em'), 'E-mail');
assert.equal(celula(amb, 1, 'Nome'), "'Ana Souza");
assert.equal(celula(amb, 1, 'WhatsApp'), "'(11) 98888-7777");
assert.equal(amb.emails.length, 0, 'em andamento não manda e-mail');
const criado = celula(amb, 1, 'Criado em');
assert.equal(typeof criado.getTime, 'function', 'Criado em é data');

// conclusao_atualiza_e_avisa
assert.deepEqual(enviar(amb, { id: 'a1b2c3d4-0001', seq: 18, situacao: 'Concluído', parou: '', respostas: COMPLETAS }), { ok: true });
assert.equal(amb.aba().linhas.length, 2, 'mesmo lead, mesma linha');
assert.equal(celula(amb, 1, 'Situação'), 'Concluído');
assert.equal(celula(amb, 1, 'Parou em'), '');
assert.equal(celula(amb, 1, 'Criado em'), criado, 'Criado em não muda');
assert.equal(amb.emails.length, 1);
assert.equal(amb.emails[0].to, 'dono@exemplo.test');
assert.equal(amb.emails[0].subject, 'Curso Full Face: formulário de Ana Souza');
assert.ok(amb.emails[0].body.includes('Investimento disponível: Acima de R$ 30 mil'));
assert.ok(amb.emails[0].body.includes('Procedimentos: Toxina botulínica, Lábios'));
assert.ok(amb.emails[0].body.includes('https://wa.me/5511988887777'));
assert.ok(amb.emails[0].body.includes('https://planilha.test'));
assert.equal(celula(amb, 1, 'Aviso enviado'), 'Concluído');

// fora_de_ordem_ignorado
enviar(amb, { id: 'a1b2c3d4-0001', seq: 5, situacao: 'Em andamento', parou: 'formacao', respostas: parcial });
assert.equal(celula(amb, 1, 'Situação'), 'Concluído', 'envio velho não apaga o novo');
assert.equal(celula(amb, 1, 'Objetivo'), "'Atender o rosto inteiro.");

// sem_aviso_repetido
enviar(amb, { id: 'a1b2c3d4-0001', seq: 19, situacao: 'Concluído', parou: '', respostas: { ...COMPLETAS, quando: 'Nos próximos 30 dias' } });
assert.equal(amb.emails.length, 1, 'concluir de novo não repete o e-mail');
assert.equal(celula(amb, 1, 'Quando'), "'Nos próximos 30 dias");

// fora_da_faixa_avisa
enviar(amb, { id: 'b1b2c3d4-0002', seq: 11, situacao: 'Fora da faixa', parou: '', respostas: { ...parcial, nome: 'Bruno Lima', investimento: 'Até R$ 10 mil' } });
assert.equal(amb.aba().linhas.length, 3);
assert.equal(amb.emails[1].subject, 'Curso Full Face: Bruno Lima ficou fora da faixa de investimento');
assert.equal(celula(amb, 2, 'Situação'), 'Fora da faixa');

// formula_e_texto_longo
const amb2 = criarAmbiente();
enviar(amb2, { id: 'c1b2c3d4-0003', seq: 3, situacao: 'Em andamento', parou: 'instagram', respostas: {
  nome: '=HYPERLINK("http://x","y") Silva', whatsapp: '11977776666', objetivo: 'a'.repeat(6000),
  procedimentos: ['Toxina botulínica', 'Lábios'], extra: 'nao entra' } });
assert.equal(celula(amb2, 1, 'Nome'), `'=HYPERLINK("http://x","y") Silva`);
assert.equal(celula(amb2, 1, 'Objetivo').length, 5001);
assert.equal(celula(amb2, 1, 'Procedimentos'), "'Toxina botulínica, Lábios");
assert.equal(amb2.aba().linhas[0].length, 26, '3 + 19 respostas + 4 colunas de controle');
assert.ok(!amb2.aba().linhas[1].some((v) => String(v).includes('nao entra')), 'chave desconhecida fica fora');

// envios_invalidos
const amb3 = criarAmbiente();
const base = { id: 'd1b2c3d4-0004', seq: 2, situacao: 'Em andamento', parou: 'email', respostas: { nome: 'Dani Reis', whatsapp: '11966665555' } };
const invalidos = ['', 'nao json', { ...base, respostas: { nome: 'Dani Reis' } }, { ...base, situacao: 'Pago' },
  { ...base, id: 'x' }, { ...base, seq: 0 }, { ...base, respostas: { ...base.respostas, motivo: 'b'.repeat(100001) } }];
for (const corpo of invalidos) assert.deepEqual(enviar(amb3, corpo), { ok: false }, JSON.stringify(corpo).slice(0, 60));
assert.deepEqual(JSON.parse(amb3.ctx.doPost({}).texto), { ok: false }, 'sem corpo');
assert.ok(!amb3.aba() || amb3.aba().getLastRow() <= 1, 'nenhuma linha nova');

// id_alternativo
assert.deepEqual(enviar(amb3, { ...base, id: 'lx2k3abc-9f8e7d6c' }), { ok: true });
assert.equal(amb3.aba().getLastRow(), 2);

// parados_avisa_uma_vez (datas criadas fora do contexto do script, como chegam da planilha)
const amb4 = criarAmbiente();
enviar(amb4, { id: 'e1b2c3d4-0005', seq: 6, situacao: 'Em andamento', parou: 'formacao', respostas: { nome: 'Carla Dias', whatsapp: '31955554444', cidade: 'Belo Horizonte, MG' } });
enviar(amb4, { id: 'f1b2c3d4-0006', seq: 3, situacao: 'Em andamento', parou: 'instagram', respostas: { nome: 'Davi Melo', whatsapp: '31944443333' } });
enviar(amb4, { id: 'g1b2c3d4-0007', seq: 18, situacao: 'Concluído', parou: '', respostas: { ...COMPLETAS, nome: 'Eva Rocha' } });
const atualizado = coluna(amb4, 'Atualizado em');
const agora = Date.now();
amb4.aba().linhas[1][atualizado] = new Date(agora - 2 * 3600e3);
amb4.aba().linhas[2][atualizado] = new Date(agora - 10 * 60e3);
amb4.aba().linhas[3][atualizado] = new Date(agora - 3 * 3600e3);
amb4.ctx.avisarParados();
amb4.ctx.avisarParados();
const parados = amb4.emails.slice(1);
assert.equal(parados.length, 1, 'um aviso só, para quem parou há mais de 1 hora');
assert.equal(parados[0].subject, 'Curso Full Face: Carla Dias parou no meio do formulário');
assert.ok(parados[0].body.includes('Parou em: Formação'));
assert.ok(parados[0].body.includes('Cidade: Belo Horizonte, MG'));
assert.ok(parados[0].body.includes('https://wa.me/5531955554444'));
assert.equal(celula(amb4, 1, 'Aviso enviado'), 'Parou no meio');

// configurar
const amb5 = criarAmbiente();
amb5.ctx.configurar();
amb5.ctx.configurar();
assert.equal(amb5.planilha.getSheets().length, 1, 'usa a aba vazia em vez de criar outra');
assert.equal(amb5.planilha.getSheets()[0].getName(), 'Formulários');
assert.deepEqual(amb5.aba().linhas[0].slice(0, 4), ['Atualizado em', 'Situação', 'Parou em', 'Nome']);
assert.deepEqual(amb5.aba().linhas[0].slice(-4), ['Criado em', 'Aviso enviado', 'ID', 'Seq']);
assert.deepEqual(amb5.gatilhos.map((t) => [t.f, t.m]), [['avisarParados', 30]], 'um gatilho só, de 30 em 30 minutos');
assert.deepEqual(JSON.parse(amb5.ctx.doGet().texto), { ok: true });

// falha_de_email_tenta_de_novo: a linha fica salva e o gatilho manda o aviso pendente
const amb6 = criarAmbiente();
amb6.falharEmails(1);
assert.deepEqual(enviar(amb6, { id: 'h1b2c3d4-0008', seq: 18, situacao: 'Concluído', parou: '', respostas: { ...COMPLETAS, nome: 'Fabi Nunes' } }), { ok: true }, 'a linha fica salva mesmo com o e-mail falhando');
assert.equal(amb6.aba().getLastRow(), 2);
assert.equal(celula(amb6, 1, 'Aviso enviado'), '', 'o aviso volta a ficar pendente');
amb6.ctx.avisarParados();
assert.equal(amb6.emails.length, 1, 'o gatilho manda o aviso pendente');
assert.equal(amb6.emails[0].subject, 'Curso Full Face: formulário de Fabi Nunes');
assert.equal(celula(amb6, 1, 'Aviso enviado'), 'Concluído');
amb6.ctx.avisarParados();
assert.equal(amb6.emails.length, 1, 'sem repetir depois');

// falha_no_gatilho_nao_para_os_outros
const amb7 = criarAmbiente();
enviar(amb7, { id: 'i1b2c3d4-0009', seq: 4, situacao: 'Em andamento', parou: 'cidade', respostas: { nome: 'Gabi Prado', whatsapp: '11933332222' } });
enviar(amb7, { id: 'j1b2c3d4-0010', seq: 4, situacao: 'Em andamento', parou: 'cidade', respostas: { nome: 'Hugo Reis', whatsapp: '11922221111' } });
const at7 = coluna(amb7, 'Atualizado em');
amb7.aba().linhas[1][at7] = new Date(Date.now() - 2 * 3600e3);
amb7.aba().linhas[2][at7] = new Date(Date.now() - 2 * 3600e3);
amb7.falharEmails(1);
amb7.ctx.avisarParados();
assert.equal(amb7.emails.length, 1, 'a falha de um não impede o outro');
assert.equal(amb7.emails[0].subject, 'Curso Full Face: Hugo Reis parou no meio do formulário');
assert.equal(celula(amb7, 1, 'Aviso enviado'), '', 'quem falhou fica pendente');
amb7.ctx.avisarParados();
assert.equal(amb7.emails.length, 2, 'e sai na rodada seguinte');

// escrita_confirmada_antes_de_soltar_a_trava (flush antes de releaseLock em todos os cenários)
for (const [nome, a] of Object.entries({ amb, amb2, amb3, amb4, amb6, amb7 })) assert.deepEqual(a.violacoes, [], 'trava solta com escrita pendente em ' + nome);

console.log('ok: planilha confere');
