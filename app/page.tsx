import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Hero } from "@/components/hero";
import { MethodStep } from "@/components/method-step";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { PainelMock } from "@/components/painel-mock";
import { CountUp } from "@/components/count-up";
import { SectionHeading } from "@/components/section-heading";
import { Arrow } from "@/components/arrow";
import { Reveal } from "@/components/reveal";
import { METHOD_STEPS } from "@/lib/method-steps";

const STATS: [string, string][] = [
  ["27", "Clientes ativos"],
  ["15", "Segmentos atendidos"],
  ["98%", "Taxa de retenção"],
];

const PILLARS: [string, string, string][] = [
  ["Move.", "Estratégia", "Entender o negócio e traçar o caminho antes de qualquer anúncio."],
  ["Create.", "Criatividade", "Conteúdo e campanhas que a sua marca é dona, não cópia de tendência."],
  ["Impact.", "Resultados", "Virar atenção em cliente, com número na mesa todo mês."],
];

const COMPARISON: [string, string, string][] = [
  ["Foco", "Vários segmentos, a mesma receita pra todo mundo.", "Marca premium: estratégia, criação e tráfego num time só."],
  ["Marca", "Social e anúncio soltos, cada um por si.", "Identidade, site e campanha falando a mesma língua."],
  ["Conteúdo", "Modelo pronto, cópia da tendência da vez.", "Conteúdo que só a sua marca é dona."],
  ["Acompanhamento", "Relatório solto, quando dá.", "Painel com login próprio: número na mesa todo mês."],
  ["Relação", "Você é mais um na fila.", "Poucos clientes, atendimento de perto."],
];

const DIAGNOSTICO_MSG =
  "Olá! Vim pelo site e quero meu diagnóstico gratuito da minha marca com a Mouve.";

const CONTRATACAO = [
  { number: "01", title: "Você pede o diagnóstico", description: "Leva menos de um minuto. A gente te chama no WhatsApp pra marcar a conversa." },
  { number: "02", title: "Diagnóstico gratuito", description: "Conversa online sobre o momento da sua marca, os objetivos e as oportunidades." },
  { number: "03", title: "Proposta e assinatura", description: "Escopo e valor definidos, com tudo alinhado antes de começar." },
  { number: "04", title: "Onboarding", description: "Explicamos o processo, as rotinas e as entregas." },
  { number: "05", title: "Plano estratégico", description: "Você recebe o plano pra aprovar e a gente põe a marca no ar." },
];

export default function Home() {
  return (
    <main>
      <div className="mx-auto max-w-6xl px-6 pt-20">
        <Hero />
      </div>

      {/* prova em números */}
      <section className="mx-auto max-w-6xl px-6 pt-20">
        <dl className="grid grid-cols-1 divide-y divide-brand-paper/10 border-y border-brand-paper/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {STATS.map(([value, label]) => (
            <div key={label} className="flex flex-col gap-2 py-8 sm:px-8 sm:py-10 sm:first:pl-0 sm:last:pr-0">
              <dd className="font-display text-6xl font-extrabold tracking-tight text-brand-paper">
                <CountUp value={value} />
              </dd>
              <dt className="text-sm font-medium uppercase tracking-[0.18em] text-brand-paper/55">
                {label}
              </dt>
            </div>
          ))}
        </dl>
      </section>

      {/* faixa ilustrativa */}
      <section className="mx-auto max-w-6xl px-6 pt-20">
        <Reveal className="relative isolate aspect-[16/10] overflow-hidden rounded-3xl border border-brand-paper/10 sm:aspect-[21/9]">
          <img
            src="/img/showcase.png"
            alt="Time da Mouve em produção"
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-ink via-brand-ink/20 to-transparent"
          />
          <p className="absolute bottom-0 left-0 max-w-md p-8 font-display text-2xl font-extrabold uppercase leading-[1.05] tracking-tight text-brand-paper sm:p-10 sm:text-3xl">
            Um time só, do início ao <span className="text-gold-grad">resultado.</span>
          </p>
        </Reveal>
      </section>

      {/* pilares MOVE · CREATE · IMPACT */}
      <section className="mx-auto max-w-6xl px-6 pt-28">
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-brand-paper/10 bg-brand-paper/10 sm:grid-cols-3">
          {PILLARS.map(([word, pillar, desc]) => (
            <Reveal
              key={word}
              className="group flex flex-col gap-4 bg-brand-surface p-8 transition-colors duration-300 hover:bg-brand-surface2 sm:p-10"
            >
              <Arrow className="h-4 w-7 text-brand-gold transition-transform duration-300 ease-out group-hover:translate-x-1.5" />
              <h3 className="font-display text-4xl font-extrabold uppercase tracking-tight text-brand-paper">
                {word}
              </h3>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold">
                {pillar}
              </p>
              <p className="text-sm leading-relaxed text-brand-paper/65">{desc}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* agência comum vs Mouve */}
      <section className="mx-auto max-w-6xl px-6 pt-28">
        <SectionHeading
          eyebrow="Por que a Mouve"
          title="Agência comum vs Mouve"
          subtitle="A maioria trata toda marca igual. A Mouve junta estratégia, criação e tráfego num time só, com a marca inteira falando a mesma língua."
        />
        {/* mobile: cartões empilhados (tabela rola mal em tela estreita) */}
        <div className="mt-12 space-y-4 md:hidden">
          {COMPARISON.map(([crit, comum, mouve]) => (
            <div key={crit} className="rounded-2xl border border-brand-paper/10 bg-brand-surface/60 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-paper">{crit}</p>
              <div className="mt-4 space-y-3">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-paper/45">Agência comum</p>
                  <p className="mt-1 text-sm leading-relaxed text-brand-paper/60">{comum}</p>
                </div>
                <div className="rounded-xl border border-brand-gold/20 bg-brand-ink/40 p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-gold">Mouve</p>
                  <p className="mt-1 text-sm leading-relaxed text-brand-paper">{mouve}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* desktop/tablet: tabela */}
        <div className="mt-12 hidden md:block">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-brand-paper/10">
                <th className="w-[18%] py-4 pr-6 text-xs font-semibold uppercase tracking-[0.18em] text-brand-paper/55">Critério</th>
                <th className="w-[41%] py-4 px-6 text-xs font-semibold uppercase tracking-[0.18em] text-brand-paper/55">Agência comum</th>
                <th className="w-[41%] py-4 pl-6 text-xs font-semibold uppercase tracking-[0.18em] text-brand-gold">Mouve</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map(([crit, comum, mouve]) => (
                <tr key={crit} className="border-b border-brand-paper/10 align-top">
                  <td className="py-5 pr-6 text-sm font-semibold text-brand-paper">{crit}</td>
                  <td className="py-5 px-6 text-sm leading-relaxed text-brand-paper/55">{comum}</td>
                  <td className="py-5 pl-6 text-sm leading-relaxed text-brand-paper">{mouve}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* painel / transparência */}
      <section className="mx-auto max-w-6xl px-6 pt-28">
        <Reveal className="relative isolate overflow-hidden rounded-3xl border border-brand-gold/25 bg-brand-surface px-8 py-14 sm:px-16 sm:py-16">
          <div aria-hidden className="aura-top pointer-events-none absolute inset-x-0 -top-20 h-72" />
          <div className="relative grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="max-w-xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-brand-gold">
                Transparência total
              </p>
              <h2 className="font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-brand-paper balance sm:text-4xl">
                Seus resultados num <span className="text-gold-grad">painel com login próprio.</span>
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-brand-paper/70">
                Nada de relatório perdido no WhatsApp. Você acompanha as campanhas e os
                números da sua marca quando quiser, num painel só seu.
              </p>
            </div>
            <PainelMock />
          </div>
        </Reveal>
      </section>

      {/* método */}
      <section className="mx-auto max-w-6xl px-6 pt-28">
        <SectionHeading
          eyebrow="Como trabalhamos"
          title="Um método, não um improviso"
          subtitle="Do diagnóstico à execução, cada etapa existe para transformar atenção em crescimento previsível."
        />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {METHOD_STEPS.map((step) => (
            <MethodStep key={step.number} {...step} />
          ))}
        </div>
      </section>

      {/* como funciona a contratação */}
      <section className="mx-auto max-w-6xl px-6 pt-28">
        <SectionHeading
          eyebrow="Passo a passo"
          title="Como funciona a contratação"
          subtitle="Cinco etapas claras, do primeiro contato ao plano da sua marca no ar."
        />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {CONTRATACAO.map((step) => (
            <MethodStep key={step.number} {...step} />
          ))}
        </div>
      </section>

      {/* manifesto */}
      <section className="mx-auto max-w-5xl px-6 pt-28">
        <Reveal>
          <Arrow className="h-6 w-11 text-brand-gold" />
          <h2 className="mt-6 font-display text-4xl font-extrabold uppercase leading-[1.02] tracking-tight text-brand-paper balance sm:text-6xl">
            Não seguimos tendências.
            <br />
            <span className="text-gold-grad">Construímos marcas.</span>
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-brand-paper/65">
            Tendência passa. Marca fica. A Mouve existe para construir presença
            que se sustenta depois que o hype acaba.
          </p>
        </Reveal>
      </section>

      {/* CTA final */}
      <section className="mx-auto max-w-6xl px-6 pt-28">
        <div className="relative isolate overflow-hidden rounded-3xl border border-brand-gold/25 bg-brand-surface px-8 py-16 sm:px-16 sm:py-20">
          <div aria-hidden className="aura-top pointer-events-none absolute inset-x-0 -top-20 h-72" />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -bottom-24 h-80 w-80 rounded-full bg-brand-gold opacity-[0.12] blur-[120px]"
          />
          <div className="relative max-w-2xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-brand-gold">
              Vamos começar
            </p>
            <h2 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-brand-paper balance sm:text-5xl">
              Pare de investir em barulho.
              <br />
              <span className="text-gold-grad">Comece a investir em estratégia.</span>
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-brand-paper/70">
              Conte pra gente onde sua marca está hoje. Devolvemos um diagnóstico
              honesto e o próximo passo — sem promessa mágica.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
              <WhatsAppButton
                message={DIAGNOSTICO_MSG}
                label="Quero meu diagnóstico gratuito"
              />
              <Link
                href="/planos"
                className="group inline-flex items-center gap-1.5 text-sm font-semibold text-brand-paper/80 transition-colors hover:text-brand-paper"
              >
                Ver planos
                <ArrowUpRight className="h-4 w-4 text-brand-gold transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
