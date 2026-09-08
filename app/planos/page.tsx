import { SectionHeading } from "@/components/section-heading";
import { PlanCard } from "@/components/plan-card";

const PLANS = [
  {
    name: "Essencial",
    items: [
      "Posicionamento e identidade de marca",
      "Gestão de redes e criativos",
      "Conteúdo editorial mensal",
      "Relatório mensal de performance",
    ],
    highlighted: false,
  },
  {
    name: "Crescimento",
    items: [
      "Tudo do Essencial",
      "Tráfego pago Meta (Instagram e Facebook)",
      "Funil de captação de leads",
      "Reunião mensal de alinhamento",
    ],
    highlighted: true,
  },
  {
    name: "Referência",
    items: [
      "Tudo do Crescimento",
      "Google Ads de intenção alta",
      "Produção de fotos e vídeos",
      "Fluxos de relacionamento e prioridade de atendimento",
    ],
    highlighted: false,
  },
];

const VALUE_STACK = [
  "Estratégia de posicionamento sob medida",
  "Gestão completa de redes e criativos",
  "Mídia paga otimizada por resultado",
  "Funil e acompanhamento comercial",
  "Relatório com o que realmente importa",
  "Time dedicado ao seu crescimento",
];

export default function Planos() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-24 px-6 py-20">
      <section className="flex flex-col gap-10">
        <SectionHeading
          eyebrow="O que você leva"
          title="Você não contrata posts. Contrata resultado."
          subtitle="Juntas, essas entregas substituem freelancers soltos e um time interno inteiro."
        />
        <ul className="grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2">
          {VALUE_STACK.map((item) => (
            <li key={item} className="flex gap-2 font-medium text-brand-ink">
              <span aria-hidden="true" className="text-brand-blue">
                ✓
              </span>
              {item}
            </li>
          ))}
        </ul>
        <p className="rounded-lg bg-brand-ink px-8 py-6 italic text-brand-paper">
          Isso não é uma lista de tarefas. É a estrutura completa por trás de uma marca
          que cresce de verdade.
        </p>
      </section>

      <section className="flex flex-col gap-10">
        <SectionHeading eyebrow="Investimento" title="Escolha o plano ideal para o seu momento." />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {PLANS.map((plan) => (
            <PlanCard
              key={plan.name}
              name={plan.name}
              items={plan.items}
              highlighted={plan.highlighted}
              ctaMessage={`Olá! Vim pelo site e quero saber mais sobre o plano ${plan.name}.`}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
