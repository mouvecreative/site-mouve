import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Hero } from "@/components/hero";
import { MethodStep } from "@/components/method-step";
import { Marquee } from "@/components/marquee";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { SectionHeading } from "@/components/section-heading";
import { METHOD_STEPS } from "@/lib/method-steps";

const STATS: [string, string][] = [
  ["27", "Clientes ativos"],
  ["15", "Segmentos atendidos"],
  ["98%", "Taxa de retenção"],
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
                {value}
              </dd>
              <dt className="text-sm font-medium uppercase tracking-[0.18em] text-brand-paper/55">
                {label}
              </dt>
            </div>
          ))}
        </dl>
      </section>

      {/* faixa de segmentos */}
      <section className="pt-16">
        <p className="mb-6 px-6 text-center text-xs font-semibold uppercase tracking-[0.28em] text-brand-gold">
          Marcas que confiam na Mouve
        </p>
        <Marquee />
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

      {/* manifesto */}
      <section className="mx-auto max-w-4xl px-6 pt-28">
        <figure className="relative">
          <span
            aria-hidden
            className="absolute -left-2 -top-10 font-serif text-8xl leading-none text-brand-gold/25 sm:-left-8"
          >
            &ldquo;
          </span>
          <blockquote className="font-serif text-3xl leading-snug text-brand-paper/90 balance sm:text-[2.6rem] sm:leading-[1.15]">
            Marca não é o que você diz que é. É o que ficou na cabeça de quem viu,
            leu e sentiu — <span className="italic text-gold-grad">de novo e de novo</span>.
          </blockquote>
          <figcaption className="mt-6 text-sm uppercase tracking-[0.2em] text-brand-paper/50">
            Mouve — estratégia, conteúdo e crescimento
          </figcaption>
        </figure>
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
                message="Olá! Vim pelo site e quero saber mais sobre a Mouve."
                label="Falar com a Mouve"
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
