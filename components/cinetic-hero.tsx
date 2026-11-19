"use client";

import { ReactNode, useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { Arrow } from "@/components/arrow";
import { WhatsAppButton } from "@/components/whatsapp-button";

const DIAGNOSTICO_MSG =
  "Olá! Vim pelo site e quero meu diagnóstico gratuito da minha marca com a Mouve.";

// Hero scrollytelling no modelo Studio Impacto, mas com a assinatura da Mouve:
// a seta cresce e desliza enquanto o fundo inverte preto -> dourado, e o texto
// de abertura dá lugar ao reframe. Com prefers-reduced-motion vira duas seções
// estáticas empilhadas (sem pin nem animação de scroll).
export function CineticHero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  // useScroll (target/offset e scrollY cru) não avança nesta versão do Next/framer.
  // Calculo o progresso do pin na mão via getBoundingClientRect: quanto o topo da
  // seção (300vh) já subiu acima do viewport, sobre a distância rolável (altura - vh).
  const scrollYProgress = useMotionValue(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const total = el.offsetHeight - window.innerHeight;
      const p = total > 0 ? -el.getBoundingClientRect().top / total : 0;
      scrollYProgress.set(Math.min(Math.max(p, 0), 1));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [scrollYProgress]);

  // dark -> dourado (inversão, seta preta + reframe) -> volta pro dark no fim,
  // pra emendar com o corpo escuro da home.
  const bg = useTransform(
    scrollYProgress,
    [0, 0.45, 0.7, 1],
    ["#111111", "#111111", "#B98A3B", "#111111"]
  );
  const arrowScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 2.4, 3.2]);
  const arrowX = useTransform(scrollYProgress, [0, 1], ["0%", "52%"]);
  const arrowColor = useTransform(
    scrollYProgress,
    [0.4, 0.5, 0.82, 0.95],
    ["#B98A3B", "#111111", "#111111", "#B98A3B"]
  );
  const introOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0]);
  const reframeOpacity = useTransform(
    scrollYProgress,
    [0.55, 0.68, 0.84, 0.96],
    [0, 1, 1, 0]
  );
  const reframeY = useTransform(scrollYProgress, [0.55, 0.68], [24, 0]);

  if (reduce) {
    return (
      <div>
        <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-brand-ink px-6 py-24 text-brand-paper">
          <HeroCopy
            middle={<Arrow className="h-auto w-[46vw] text-brand-gold" />}
          />
        </section>
        <section className="flex min-h-screen items-center bg-brand-gold px-6 py-20">
          <Reframe />
        </section>
      </div>
    );
  }

  return (
    <div ref={ref} className="relative h-[300vh]">
      <motion.section
        style={{ backgroundColor: bg }}
        className="sticky top-0 flex h-screen items-center justify-center overflow-hidden"
      >
        {/* seta — objeto assinatura */}
        <motion.div
          aria-hidden
          style={{ scale: arrowScale, x: arrowX, color: arrowColor }}
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <Arrow className="h-auto w-[44vw]" />
        </motion.div>

        {/* abertura (sobre o preto) */}
        <motion.div
          style={{ opacity: introOpacity }}
          className="absolute inset-0 flex flex-col justify-center px-6 text-brand-paper sm:px-10"
        >
          <HeroCopy />
        </motion.div>

        {/* reframe (sobre o dourado) */}
        <motion.div
          style={{ opacity: reframeOpacity, y: reframeY }}
          className="absolute inset-0 flex items-start px-6 pt-28 sm:px-10 sm:pt-32"
        >
          <Reframe />
        </motion.div>
      </motion.section>
    </div>
  );
}

// `middle` ocupa o espaço reservado entre o título e o subtítulo. No modo
// animado fica vazio (a seta absoluta cai nesse vão); no reduced-motion recebe
// a seta estática, para o texto ficar em cima e embaixo dela.
function HeroCopy({ middle }: { middle?: ReactNode }) {
  return (
    <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
      <h1 className="font-display text-[3.2rem] font-extrabold uppercase leading-[0.92] tracking-[-0.02em] text-brand-paper sm:text-8xl">
        Do ponto ao <span className="text-gold-grad">movimento.</span>
      </h1>
      <div
        aria-hidden={!middle}
        className="flex h-[30vw] max-h-[360px] min-h-[120px] w-full items-center justify-center"
      >
        {middle}
      </div>
      <p className="mx-auto max-w-xl text-lg leading-relaxed text-brand-paper/70">
        Agência de marca premium. Estratégia, criação e tráfego num time só.
        Construímos marcas que se movem.
      </p>
      <div className="mt-9 flex justify-center">
        <WhatsAppButton
          message={DIAGNOSTICO_MSG}
          label="Peça seu diagnóstico gratuito"
        />
      </div>
    </div>
  );
}

function Reframe() {
  return (
    <div className="max-w-2xl">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-ink/60">
        Por que a Mouve
      </p>
      <h2 className="mt-5 font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-[-0.02em] text-brand-ink sm:text-6xl">
        A maioria entrega
        <br />
        peça solta.
      </h2>
      <p className="mt-5 font-display text-2xl font-extrabold uppercase leading-[0.95] tracking-[-0.02em] text-brand-ink/70 sm:text-3xl">
        A Mouve move a marca inteira.
      </p>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-brand-ink/75">
        Identidade, site, conteúdo e campanha falando a mesma língua, com
        número na mesa todo mês.
      </p>
    </div>
  );
}
