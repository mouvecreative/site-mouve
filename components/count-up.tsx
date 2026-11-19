"use client";

import { useEffect, useRef, useState } from "react";

// Conta de 0 até o valor quando entra na viewport (uma vez).
// value aceita prefixo numérico + sufixo, ex.: "27", "98%". Sem suporte a JS
// ou com prefers-reduced-motion, mostra o valor final direto (sem animar).
export function CountUp({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const match = value.match(/^(\d+)(.*)$/);
    const node = ref.current;
    if (!match || !node) return;

    const target = parseInt(match[1], 10);
    const suffix = match[2];

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }

    let raf = 0;
    let started = false;
    setDisplay(`0${suffix}`);

    const run = () => {
      const duration = 1200;
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
        setDisplay(`${Math.round(eased * target)}${suffix}`);
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !started) {
            started = true;
            run();
            io.disconnect();
          }
        }
      },
      { threshold: 0.4 }
    );
    io.observe(node);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
