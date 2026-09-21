import Link from "next/link";
import { WhatsAppButton } from "@/components/whatsapp-button";

const LINKS = [
  { href: "/sobre", label: "Sobre" },
  { href: "/metodo", label: "Método" },
  { href: "/planos", label: "Planos" },
  { href: "/contato", label: "Contato" },
];

export function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-brand-paper/10 bg-brand-ink">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-40 h-80 aura-top rotate-180"
      />
      <div className="relative mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-col gap-12 sm:flex-row sm:justify-between">
          <div className="max-w-sm">
            <Link
              href="/"
              className="inline-flex items-baseline font-display text-2xl font-extrabold tracking-tight"
            >
              <span className="text-brand-paper">mou</span>
              <span className="text-gold-grad">ve</span>
              <span className="text-brand-gold">.</span>
            </Link>
            <p className="mt-4 font-serif text-lg italic text-brand-paper/60">
              Marketing que move: estratégia, conteúdo e crescimento de verdade.
            </p>
            <div className="mt-6">
              <WhatsAppButton
                message="Olá! Vim pelo site e quero saber mais sobre a Mouve."
                label="Falar no WhatsApp"
                variant="outline"
              />
            </div>
          </div>

          <div className="flex gap-16">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-brand-gold">
                Navegar
              </span>
              {LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-brand-paper/70 transition-colors hover:text-brand-paper"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-brand-gold">
                Social
              </span>
              <a
                href="https://instagram.com/agencia_mouve"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-brand-paper/70 transition-colors hover:text-brand-paper"
              >
                @agencia_mouve
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-brand-paper/10 pt-6 text-xs text-brand-paper/40 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Mouve Creative. Todos os direitos reservados.</span>
          <span>Feito para transformar atenção em crescimento.</span>
        </div>
      </div>
    </footer>
  );
}
