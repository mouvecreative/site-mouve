import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CineticHero } from "@/components/cinetic-hero";
import { MethodStep } from "@/components/method-step";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { PainelMock } from "@/components/painel-mock";
import { CountUp } from "@/components/count-up";
import { Arrow } from "@/components/arrow";
import { Reveal } from "@/components/reveal";
import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";
import { METHOD_STEPS } from "@/lib/method-steps";

// prefix opcional (ex.: "R$") renderizado antes do número animado.
const STATS: [string, string, string?][] = [
  ["7", "Anos no mercado"],
  ["100 mil+", "Geridos em tráfego/mês", "R$ "],
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
  "Olá! Vim pelo site e quero meu diagnóstico da minha marca com a Mouve.";

const CONTRATACAO = [
  { number: "01", title: "Você pede o diagnóstico", description: "Leva menos de um minuto. A gente te chama no WhatsApp pra marcar a conversa." },
  { number: "02", title: "Diagnóstico", description: "Conversa online sobre o momento da sua marca, os objetivos e as oportunidades." },
  { number: "03", title: "Proposta e assinatura", description: "Escopo e valor definidos, com tudo alinhado antes de começar." },
  { number: "04", title: "Onboarding", description: "Explicamos o processo, as rotinas e as entregas." },
  { number: "05", title: "Plano estratégico", description: "Você recebe o plano pra aprovar e a gente põe a marca no ar." },
];

export default function Home() {
  return (
    <main>
      <CineticHero />

      {/* NÚMEROS — afirmação editorial */}
      <section className="w-full px-6 py-28 sm:py-40">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-gold">
              A prova
            </p>
            <h2 className="mt-5 max-w-3xl font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-[-0.02em] text-brand-paper balance sm:text-7xl">
              Marca que se move <span className="text-gold-grad">vira número.</span>
            </h2>
          </Reveal>
          <dl className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-8">
            {STATS.map(([value, label, prefix]) => (
              <Reveal key={label} className="border-t border-brand-paper/15 pt-6">
                <dd className="font-display text-6xl font-extrabold tracking-[-0.03em] text-brand-paper sm:text-7xl">
                  {prefix}
                  <CountUp value={value} />
                </dd>
                <dt className="mt-3 text-sm font-medium uppercase tracking-[0.2em] text-brand-paper/55">
                  {label}
                </dt>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* FAIXA ILUSTRATIVA */}
      <section className="w-full px-6">
        <Reveal className="relative isolate mx-auto aspect-[16/10] max-w-6xl overflow-hidden rounded-3xl border border-brand-paper/10 sm:aspect-[21/9]">
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
          <p className="absolute bottom-0 left-0 max-w-md p-8 font-display text-2xl font-extrabold uppercase leading-[1.05] tracking-tight text-brand-paper sm:p-10 sm:text-4xl">
            Um time só, do início ao <span className="text-gold-grad">resultado.</span>
          </p>
        </Reveal>
      </section>

      {/* MOVE · CREATE · IMPACT — inversão dourada */}
      <section className="mt-28 w-full bg-brand-gold px-6 py-28 text-brand-ink sm:mt-40 sm:py-40">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-ink/60">
            O que fazemos
          </p>
          <div className="mt-12 divide-y divide-brand-ink/15">
            {PILLARS.map(([word, pillar, desc]) => (
              <Reveal
                key={word}
                className="flex flex-col gap-4 py-10 sm:flex-row sm:items-baseline sm:justify-between sm:gap-12 sm:py-14"
              >
                <h3 className="font-display text-6xl font-extrabold uppercase leading-[0.9] tracking-[-0.03em] text-brand-ink sm:text-8xl">
                  {word}
                </h3>
                <div className="max-w-md">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-ink/70">
                    {pillar}
                  </p>
                  <p className="mt-2 text-lg leading-relaxed text-brand-ink/80">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* AGÊNCIA COMUM vs MOUVE */}
      <section className="w-full px-6 py-28 sm:py-40">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-gold">
              Por que a Mouve
            </p>
            <h2 className="mt-5 max-w-3xl font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-[-0.02em] text-brand-paper balance sm:text-7xl">
              Agência comum <span className="text-gold-grad">vs Mouve</span>
            </h2>
          </Reveal>
          {/* mobile: cartões empilhados */}
          <div className="mt-14 space-y-4 md:hidden">
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
          <div className="mt-14 hidden md:block">
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
        </div>
      </section>

      {/* PAINEL / TRANSPARÊNCIA */}
      <section className="w-full px-6 py-28 sm:py-40">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <Reveal className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-gold">
              Transparência total
            </p>
            <h2 className="mt-5 font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-[-0.02em] text-brand-paper balance sm:text-6xl">
              Seus números num <span className="text-gold-grad">painel só seu.</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-brand-paper/70">
              Nada de relatório perdido no WhatsApp. Você acompanha as campanhas e os
              números da sua marca quando quiser, com login próprio.
            </p>
          </Reveal>
          <Reveal>
            <PainelMock />
          </Reveal>
        </div>
      </section>

      {/* MÉTODO */}
      <section className="w-full px-6 py-28 sm:py-40">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-gold">
              Como trabalhamos
            </p>
            <h2 className="mt-5 max-w-3xl font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-[-0.02em] text-brand-paper balance sm:text-7xl">
              Um método, <span className="text-gold-grad">não um improviso.</span>
            </h2>
          </Reveal>
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {METHOD_STEPS.map((step) => (
              <MethodStep key={step.number} {...step} />
            ))}
          </div>
        </div>
      </section>

      {/* CONTRATAÇÃO */}
      <section className="w-full px-6 pb-28 sm:pb-40">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-gold">
              Passo a passo
            </p>
            <h2 className="mt-5 max-w-3xl font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-[-0.02em] text-brand-paper balance sm:text-7xl">
              Como funciona <span className="text-gold-grad">a contratação.</span>
            </h2>
          </Reveal>
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {CONTRATACAO.map((step) => (
              <MethodStep key={step.number} {...step} />
            ))}
          </div>
        </div>
      </section>

      {/* MANIFESTO — inversão dourada */}
      <section className="w-full bg-brand-gold px-6 py-28 text-brand-ink sm:py-44">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <Arrow className="h-7 w-12 text-brand-ink" />
            <h2 className="mt-8 font-display text-5xl font-extrabold uppercase leading-[0.9] tracking-[-0.03em] text-brand-ink balance sm:text-8xl">
              Não seguimos tendências. Construímos marcas.
            </h2>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-brand-ink/75">
              Tendência passa. Marca fica. A Mouve existe para construir presença
              que se sustenta depois que o hype acaba.
            </p>
          </Reveal>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="relative w-full overflow-hidden px-6 py-28 sm:py-40">
        <DottedGlowBackground
          className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(85%_85%_at_50%_50%,#000,transparent)]"
          gap={20}
          radius={2}
          color="rgba(185,138,59,0.6)"
          glowColor="rgba(230,185,95,1)"
          opacity={1}
          speedMin={0.3}
          speedMax={1.6}
        />
        <div className="relative z-10 mx-auto max-w-5xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-gold">
              Comece pelo ponto
            </p>
            <h2 className="mt-5 font-display text-5xl font-extrabold uppercase leading-[0.92] tracking-[-0.03em] text-brand-paper balance sm:text-8xl">
              Pare de investir em barulho.
              <br />
              <span className="text-gold-grad">Invista em estratégia.</span>
            </h2>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-brand-paper/70">
              Conte pra gente onde sua marca está hoje. Devolvemos um diagnóstico
              honesto e o próximo passo, sem promessa mágica.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
              <WhatsAppButton
                message={DIAGNOSTICO_MSG}
                label="Quero meu diagnóstico"
              />
              <Link
                href="/planos"
                className="group inline-flex items-center gap-1.5 text-sm font-semibold text-brand-paper/80 transition-colors hover:text-brand-paper"
              >
                Ver planos
                <ArrowUpRight className="h-4 w-4 text-brand-gold transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
