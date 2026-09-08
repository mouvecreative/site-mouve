export function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-sm font-semibold uppercase tracking-widest text-brand-blue">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-3xl font-semibold leading-tight text-brand-ink sm:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-4 text-lg text-brand-ink/70">{subtitle}</p>
      ) : null}
    </div>
  );
}
