import { MethodStep } from "@/components/method-step";
import { WhatsAppButton } from "@/components/whatsapp-button";

const STATS: [string, string][] = [
  ["27", "Clientes ativos"],
  ["15", "Segmentos atendidos"],
  ["98%", "Taxa de retenção"],
];

const STEPS = [
  {
    number: "01",
    title: "Diagnóstico",
    description: "Entendemos sua marca, seu mercado e onde estão as oportunidades reais.",
  },
  {
    number: "02",
    title: "Estratégia",
    description: "Definimos posicionamento, metas e plano de ação, sem achismo.",
  },
  {
    number: "03",
    title: "Execução",
    description: "Colocamos no ar: criativos, mídia, conteúdo e acompanhamento constante.",
  },
];

export default function Home() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-24 px-6 py-20">
      <section className="flex flex-col gap-6">
        <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-brand-ink sm:text-5xl">
          Marcas fortes não acontecem por acaso.
        </h1>
        <p className="max-w-xl text-lg text-brand-ink/70">
          A história é a crença por trás do nome. A estratégia é o que a sustenta.
        </p>
        <div>
          <WhatsAppButton
            message="Olá! Vim pelo site e quero saber mais sobre a Mouve."
            label="Falar com a Mouve"
          />
        </div>
      </section>

      <section className="grid grid-cols-1 gap-10 sm:grid-cols-3">
        {STATS.map(([value, label]) => (
          <div key={label} className="flex flex-col gap-1">
            <span className="text-5xl font-semibold text-brand-blue">{value}</span>
            <span className="text-sm font-semibold uppercase tracking-widest text-brand-ink/60">
              {label}
            </span>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-10 sm:grid-cols-3">
        {STEPS.map((step) => (
          <MethodStep key={step.number} {...step} />
        ))}
      </section>

      <section className="flex flex-col items-start gap-4 rounded-lg bg-brand-ink px-8 py-12 text-brand-paper">
        <h2 className="text-2xl font-semibold">
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
