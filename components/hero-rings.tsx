export function HeroRings() {
  const radii = [70, 140, 210, 280, 350, 420];

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 600 600"
      className="pointer-events-none absolute -right-24 top-1/2 h-[600px] w-[600px] -translate-y-1/2 sm:-right-10"
    >
      {radii.map((r, i) => (
        <circle
          key={r}
          cx="600"
          cy="300"
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth={i === radii.length - 1 ? 1.5 : 1}
          className="text-brand-blue"
          opacity={0.5 - i * 0.07}
        />
      ))}
    </svg>
  );
}
