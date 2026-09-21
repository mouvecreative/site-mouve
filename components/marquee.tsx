const SEGMENTS = [
  "Clínicas de estética",
  "Odontologia",
  "Saúde",
  "Beleza & bem-estar",
  "Profissionais liberais",
  "Serviços locais",
  "Varejo",
  "Consultoria",
];

export function Marquee() {
  const items = [...SEGMENTS, ...SEGMENTS];
  return (
    <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div className="flex shrink-0 animate-marquee items-center gap-10 pr-10">
        {items.map((seg, idx) => (
          <div key={idx} className="flex shrink-0 items-center gap-10">
            <span className="whitespace-nowrap font-display text-lg font-semibold text-brand-paper/45">
              {seg}
            </span>
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-gold/70" />
          </div>
        ))}
      </div>
    </div>
  );
}
