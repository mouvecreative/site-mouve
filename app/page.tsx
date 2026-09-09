import { MethodStep } from "@/components/method-step";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { METHOD_STEPS } from "@/lib/method-steps";

const STATS: [string, string][] = [
  ["27", "Clientes ativos"],
  ["15", "Segmentos atendidos"],
  ["98%", "Taxa de retenção"],
];

export default function Home() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-24 px-6 py-20">
      <section className="flex flex-col gap-6">
        <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-brand-paper sm:text-5xl">
          Marcas fortes não acontecem por acaso.
        </h1>
        <p className="max-w-xl text-lg text-brand-paper/70">
          A história é a crença por trás do nome. A estratégia é o que a sustenta.
        </p>
        <div>
          <WhatsAppButton
            message="Olá! Vim pelo site e quero saber mais sobre a Mouve."
            label="Falar com a Mouve"
          />
        </div>
      </section>

      <dl className="grid grid-cols-1 gap-10 sm:grid-cols-3">
        {STATS.map(([value, label]) => (
          <div key={label} className="flex flex-col gap-1">
            <dt className="order-2 text-sm font-semibold uppercase tracking-widest text-brand-paper/60">
              {label}
            </dt>
            <dd className="order-1 text-5xl font-semibold text-brand-blue">{value}</dd>
          </div>
        ))}
      </dl>

      <section className="flex flex-col gap-10">
        <h2 className="text-2xl font-semibold text-brand-paper">Como trabalhamos</h2>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          {METHOD_STEPS.map((step) => (
            <MethodStep key={step.number} {...step} />
          ))}
        </div>
      </section>

      <section className="flex flex-col items-start gap-4 rounded-lg border border-brand-paper/15 px-8 py-12">
        <h2 className="text-2xl font-semibold text-brand-paper">
          Pronto para parar de investir em barulho e começar a investir em estratégia?
        </h2>
        <WhatsAppButton
          message="Olá! Vim pelo site e quero saber mais sobre a Mouve."
          label="Falar com a Mouve"
        />
      </section>
    </main>
  );
}
