import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";
import { MethodStep } from "@/components/method-step";
import { METHOD_STEPS } from "@/lib/method-steps";

export const metadata: Metadata = {
  title: "Método",
  description:
    "Nosso processo de diagnóstico, estratégia e execução, focado em métricas que realmente pagam o boleto.",
};

const EGO = ["Seguidores", "Curtidas", "Alcance orgânico"];
const BOLETO = ["Leads qualificados", "Custo por aquisição", "Taxa de retenção"];

export default function Metodo() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-24 px-6 py-20">
      <section className="flex flex-col gap-10">
        <SectionHeading
          as="h1"
          eyebrow="Métricas"
          title="Seguidores não pagam boleto."
          subtitle="As métricas que importam de verdade e as que só alimentam o ego."
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="rounded-lg border border-brand-paper/15 p-8 text-brand-paper">
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
          {METHOD_STEPS.map((step) => (
            <MethodStep key={step.number} {...step} />
          ))}
        </div>
      </section>
    </main>
  );
}
