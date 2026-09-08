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
    <div className="flex flex-col gap-2">
      <span className="text-2xl font-semibold text-brand-blue">{number}</span>
      <h3 className="text-lg font-semibold text-brand-ink">{title}</h3>
      <p className="text-brand-ink/70">{description}</p>
    </div>
  );
}
