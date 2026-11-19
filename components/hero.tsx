"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { HeroRings } from "@/components/hero-rings";
import { Arrow } from "@/components/arrow";

const TITLES = ["se movem", "constroem", "marcam", "crescem"];

export function Hero() {
  const [i, setI] = useState(0);
  const titles = useMemo(() => TITLES, []);
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 700], [0, 70]);

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % titles.length), 2400);
    return () => clearInterval(id);
  }, [titles]);

  return (
    <section className="relative isolate overflow-hidden pb-6 pt-10 sm:pt-16">
      {/* foto de fundo ilustrativa, bem sutil, com parallax no scroll */}
      <motion.img
        src="/img/hero-bg.png"
        alt=""
        aria-hidden
        style={{ y: reduce ? 0 : bgY }}
        className="pointer-events-none absolute -top-[8%] left-0 -z-10 h-[116%] w-full object-cover opacity-25 [mask-image:radial-gradient(130%_100%_at_35%_35%,#000_25%,transparent_78%)]"
      />
      {/* brilho dourado atrás do título (profundidade) */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-10 -z-10 h-72 w-[42rem] max-w-full rounded-full bg-brand-gold/10 blur-[130px]"
      />
      {/* atmosphere */}
      <div aria-hidden className="aura-top pointer-events-none absolute inset-x-0 -top-24 h-[520px]" />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-24 h-[420px] w-[420px] rounded-full bg-brand-gold opacity-[0.12] blur-[130px]"
      />
      <HeroRings />

      <div className="relative max-w-4xl">
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="font-display text-[2.7rem] font-extrabold uppercase leading-[0.95] tracking-tight text-brand-paper balance sm:text-7xl"
        >
          Construímos marcas
          <span className="mt-1 flex items-baseline gap-4">
            <span className="block h-[1.1em] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={titles[i]}
                  initial={reduce ? false : { y: "100%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={reduce ? { opacity: 0 } : { y: "-100%", opacity: 0 }}
                  transition={{ type: "spring", stiffness: 90, damping: 16 }}
                  className="inline-block text-gold-grad"
                >
                  que {titles[i]}.
                </motion.span>
              </AnimatePresence>
            </span>
            <Arrow className="hidden h-[0.5em] w-auto shrink-0 self-center text-brand-gold sm:block" />
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
            message="Olá! Vim pelo site e quero meu diagnóstico gratuito da minha marca com a Mouve."
            label="Peça seu diagnóstico gratuito"
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
