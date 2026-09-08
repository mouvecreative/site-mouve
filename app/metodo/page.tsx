import { SectionHeading } from "@/components/section-heading";
import { MethodStep } from "@/components/method-step";

const EGO = ["Seguidores", "Curtidas", "Alcance orgânico"];
const BOLETO = ["Leads qualificados", "Custo por aquisição", "Taxa de retenção"];

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

export default function Metodo() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-24 px-6 py-20">
      <section className="flex flex-col gap-10">
        <SectionHeading
          eyebrow="Métricas"
          title="Seguidores não pagam boleto."
          subtitle="As métricas que importam de verdade e as que só alimentam o ego."
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="rounded-lg bg-brand-ink p-8 text-brand-paper">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-brand-paper/60">
              Alimentam o ego
            </h3>
            <ul className="mt-6 flex flex-col gap-4">
              {EGO.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border-2 border-brand-blue bg-brand-paper p-8">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-brand-blue">
              Pagam o boleto
            </h3>
            <ul className="mt-6 flex flex-col gap-4 text-brand-ink">
              {BOLETO.map((item) => (
                <li key={item} className="font-medium">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-10">
        <SectionHeading
          eyebrow="Processo"
          title="Como trabalhamos."
          subtitle="Spoiler: o primeiro post é a última etapa."
        />
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          {STEPS.map((step) => (
            <MethodStep key={step.number} {...step} />
          ))}
        </div>
      </section>
    </main>
  );
}
