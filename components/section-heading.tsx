export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  as = "h2",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  as?: "h1" | "h2";
}) {
  const Heading = as;
  return (
    <div className="max-w-2xl">
      <p className="text-sm font-semibold uppercase tracking-widest text-brand-blue">
        {eyebrow}
      </p>
      <Heading className="mt-2 text-3xl font-semibold leading-tight text-brand-ink sm:text-4xl">
        {title}
      </Heading>
      {subtitle ? (
        <p className="mt-4 text-lg text-brand-ink/70">{subtitle}</p>
      ) : null}
    </div>
  );
}
