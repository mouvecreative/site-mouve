export function MethodStep({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="group relative flex flex-col gap-4 rounded-2xl border border-brand-paper/10 bg-brand-surface/60 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-gold/40 hover:bg-brand-surface2/70">
      <div className="flex items-baseline justify-between">
        <span className="font-serif text-5xl italic text-gold-grad">{number}</span>
        <span className="h-px w-10 bg-brand-paper/15 transition-all duration-300 group-hover:w-16 group-hover:bg-brand-gold/60" />
      </div>
      <h3 className="font-display text-xl font-bold text-brand-paper">{title}</h3>
      <p className="text-sm leading-relaxed text-brand-paper/65">{description}</p>
    </div>
  );
}
