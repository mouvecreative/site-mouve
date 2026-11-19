import Link from "next/link";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { Arrow } from "@/components/arrow";

// Nav minimal, flutuante e transparente (modelo editorial): só a marca e o CTA.
// A navegação completa fica no rodapé.
export function Nav() {
  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          aria-label="Mouve"
          className="group pointer-events-auto flex items-center gap-2 font-display text-xl font-extrabold uppercase tracking-tight text-brand-paper"
        >
          MOUVE
          <Arrow className="seta-anda h-3 w-5 text-brand-gold" />
        </Link>
        <div className="pointer-events-auto">
          <WhatsAppButton
            message="Olá! Vim pelo site e quero meu diagnóstico gratuito da minha marca com a Mouve."
            label="Diagnóstico gratuito"
          />
        </div>
      </div>
    </header>
  );
}
