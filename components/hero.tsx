"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { HeroRings } from "@/components/hero-rings";

const TITLES = ["fortes", "estratégicas", "memoráveis", "duradouras"];

export function Hero() {
  const [i, setI] = useState(0);
  const titles = useMemo(() => TITLES, []);
  const reduce = useReducedMotion();

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % titles.length), 2400);
    return () => clearInterval(id);
  }, [titles]);

  return (
    <section className="relative isolate overflow-hidden pb-6 pt-10 sm:pt-16">
      {/* atmosphere */}
      <div aria-hidden className="aura-top pointer-events-none absolute inset-x-0 -top-24 h-[520px]" />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-24 h-[420px] w-[420px] rounded-full bg-brand-gold opacity-[0.12] blur-[130px]"
      />
      <HeroRings />

      <div className="relative max-w-4xl">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-brand-gold"
        >
          <span className="h-px w-8 bg-brand-gold/60" />
          Estratégia · Conteúdo · Crescimento
        </motion.p>

        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="font-display text-[2.7rem] font-extrabold leading-[0.98] tracking-tight text-brand-paper balance sm:text-7xl"
        >
          Construímos marcas
          <span className="mt-1 block h-[1.15em] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={titles[i]}
                initial={reduce ? false : { y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={reduce ? { opacity: 0 } : { y: "-100%", opacity: 0 }}
                transition={{ type: "spring", stiffness: 90, damping: 16 }}
                className="inline-block font-serif text-[1.05em] font-normal italic text-gold-grad"
              >
                {titles[i]}.
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-7 max-w-xl text-lg leading-relaxed text-brand-paper/70"
        >
          A história é a crença por trás do nome. A estratégia é o que a sustenta.
          A Mouve existe para transformar atenção em crescimento de verdade.
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4"
        >
          <WhatsAppButton
            message="Olá! Vim pelo site e quero saber mais sobre a Mouve."
            label="Falar com a Mouve"
          />
          <Link
            href="/metodo"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-brand-paper/80 transition-colors hover:text-brand-paper"
          >
            Conhecer o método
            <ArrowUpRight className="h-4 w-4 text-brand-gold transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
