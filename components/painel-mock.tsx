// Mock ilustrativo do Painel Mouve (dashboard). Números são demonstração, não de cliente real.
const BARS = [38, 52, 46, 68, 60, 82, 96];

export function PainelMock() {
  const w = 320;
  const h = 150;
  const pad = 8;
  const gap = 10;
  const bw = (w - pad * 2 - gap * (BARS.length - 1)) / BARS.length;
  const max = 100;

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-brand-gold/20 bg-brand-surface2/70 p-5 shadow-2xl">
      {/* barra de janela */}
      <div className="mb-5 flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-brand-paper/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-brand-paper/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-brand-paper/20" />
        <span className="ml-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-paper/50">
          Painel Mouve
        </span>
      </div>

      {/* KPIs */}
      <div className="mb-5 grid grid-cols-3 gap-3">
        {[
          ["Investido", "R$ 4.2k"],
          ["Leads", "128"],
          ["Custo / lead", "R$ 32"],
        ].map(([label, value]) => (
          <div key={label} className="rounded-xl border border-brand-paper/10 bg-brand-ink/40 p-3">
            <p className="text-[10px] uppercase tracking-[0.14em] text-brand-paper/45">{label}</p>
            <p className="mt-1 font-display text-lg font-extrabold tracking-tight text-brand-paper">
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* gráfico de barras */}
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full" role="img" aria-label="Gráfico de desempenho por semana (demonstração)">
        <defs>
          <linearGradient id="barGold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D7A94E" />
            <stop offset="100%" stopColor="#B98A3B" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75, 1].map((t) => (
          <line key={t} x1={pad} x2={w - pad} y1={h - t * (h - pad)} y2={h - t * (h - pad)} stroke="#EFEAE0" strokeOpacity="0.07" />
        ))}
        {BARS.map((v, i) => {
          const bh = (v / max) * (h - pad * 2);
          const x = pad + i * (bw + gap);
          const y = h - pad - bh;
          return <rect key={i} x={x} y={y} width={bw} height={bh} rx="3" fill="url(#barGold)" opacity={0.55 + (i / BARS.length) * 0.45} />;
        })}
        {/* linha de tendência */}
        <polyline
          fill="none"
          stroke="#EFEAE0"
          strokeOpacity="0.35"
          strokeWidth="1.5"
          points={BARS.map((v, i) => {
            const x = pad + i * (bw + gap) + bw / 2;
            const y = h - pad - (v / max) * (h - pad * 2);
            return `${x},${y}`;
          }).join(" ")}
        />
      </svg>

      <p className="mt-3 text-[10px] uppercase tracking-[0.14em] text-brand-paper/35">
        Demonstração
      </p>
    </div>
  );
}
