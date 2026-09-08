import { SectionHeading } from "@/components/section-heading";

const GENERIC = [
  "Pacote fechado, igual para todo cliente",
  "Conteúdo sem estratégia por trás",
  "Relatório de métricas de vaidade",
];

const MOUVE = [
  "Plano desenhado para o seu momento",
  "Estratégia validada em 15 segmentos diferentes",
  "Relatório com o que realmente paga o boleto",
];

export default function Sobre() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-24 px-6 py-20">
      <section className="flex flex-col gap-6">
        <SectionHeading
          eyebrow="Sobre a Mouve"
          title="Marcas fortes não acontecem por acaso."
          subtitle="A história é a crença por trás do nome. A estratégia é o que a sustenta."
        />
        <p className="max-w-2xl text-brand-ink/70">
          A Mouve nasceu para provar que marketing bom não precisa de barulho: precisa
          de estratégia, posicionamento claro e consistência.
        </p>
      </section>

      <section className="flex flex-col gap-10">
        <SectionHeading
          eyebrow="Diferencial"
          title="Nem toda agência sustenta o que promete."
          subtitle="A diferença aparece na estratégia por trás de cada entrega, não na entrega em si."
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="rounded-lg bg-brand-ink p-8 text-brand-paper">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-brand-paper/60">
              Agência genérica
            </h3>
            <ul className="mt-6 flex flex-col gap-4">
              {GENERIC.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border-2 border-brand-blue bg-white p-8">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-brand-blue">
              Mouve
            </h3>
            <ul className="mt-6 flex flex-col gap-4 text-brand-ink">
              {MOUVE.map((item) => (
                <li key={item} className="font-medium">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
