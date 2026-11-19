// Seta "→" da identidade Mouve (shaft + chevron, pontas retas), igual às camisetas.
export function Arrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 60"
      fill="none"
      aria-hidden
      className={className}
    >
      <path
        d="M4 30 H78 M58 8 L80 30 L58 52"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}
