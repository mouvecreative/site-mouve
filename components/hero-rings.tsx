export function HeroRings() {
  const radii = [90, 165, 240, 315, 390, 465];

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -right-40 top-1/2 h-[680px] w-[680px] -translate-y-1/2 opacity-70 sm:-right-16"
    >
      <svg
        viewBox="0 0 680 680"
        className="h-full w-full [animation:spin_90s_linear_infinite]"
        style={{ transformOrigin: "680px 340px" }}
      >
        {radii.map((r, idx) => (
          <circle
            key={r}
            cx="680"
            cy="340"
            r={r}
            fill="none"
            stroke="currentColor"
            strokeWidth={idx === radii.length - 1 ? 1.4 : 0.8}
            strokeDasharray={idx % 2 === 0 ? "2 10" : undefined}
            className="text-brand-gold"
            opacity={0.5 - idx * 0.06}
          />
        ))}
        {/* orbiting mark */}
        <circle cx="680" cy="100" r="5" className="fill-brand-goldHi" opacity="0.9" />
      </svg>
    </div>
  );
}
