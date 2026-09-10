"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { WhatsAppButton } from "@/components/whatsapp-button";

const TITLES = ["fortes", "estratégicas", "consistentes", "memoráveis", "duradouras"];

export function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(() => TITLES, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTitleNumber(titleNumber === titles.length - 1 ? 0 : titleNumber + 1);
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <section className="relative flex flex-col gap-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-40 h-96 w-96 rounded-full bg-brand-blue opacity-[0.07] blur-[120px]"
      />
      <h1 className="relative max-w-3xl text-4xl font-semibold leading-tight text-brand-paper sm:text-5xl">
        <span>Construímos marcas </span>
        <span className="relative inline-flex h-[1.2em] w-full max-w-xs overflow-hidden align-bottom sm:max-w-sm">
          {titles.map((title, index) => (
            <motion.span
              key={title}
              className="absolute text-brand-blue"
              initial={{ opacity: 0, y: 40 }}
              transition={{ type: "spring", stiffness: 60 }}
              animate={
                titleNumber === index
                  ? { y: 0, opacity: 1 }
                  : { y: titleNumber > index ? -40 : 40, opacity: 0 }
              }
            >
              {title}.
            </motion.span>
          ))}
        </span>
      </h1>
      <p className="max-w-xl text-lg text-brand-paper/70">
        A história é a crença por trás do nome. A estratégia é o que a sustenta.
      </p>
      <div>
        <WhatsAppButton
          message="Olá! Vim pelo site e quero saber mais sobre a Mouve."
          label="Falar com a Mouve"
        />
      </div>
    </section>
  );
}
