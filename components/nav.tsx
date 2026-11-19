import Link from "next/link";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { Arrow } from "@/components/arrow";

const LINKS = [
  { href: "/sobre", label: "Sobre" },
  { href: "/metodo", label: "Método" },
  { href: "/planos", label: "Planos" },
  { href: "/contato", label: "Contato" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 bg-brand-ink/70 backdrop-blur-xl after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-brand-paper/15 after:to-transparent">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
        <div className="flex items-center justify-between sm:contents">
          <Link
            href="/"
            aria-label="Mouve"
            className="group flex items-center gap-2 font-display text-xl font-extrabold uppercase tracking-tight text-brand-paper"
          >
            MOUVE
            <Arrow className="seta-anda h-3 w-5 text-brand-gold" />
          </Link>
          <div className="sm:order-3">
            <WhatsAppButton
              message="Olá! Vim pelo site e quero saber mais sobre a Mouve."
              label="Falar com a Mouve"
            />
          </div>
        </div>
        <nav className="flex flex-wrap gap-4 sm:order-2 sm:gap-8">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-sm font-medium text-brand-paper/70 transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-brand-gold after:transition-all after:duration-300 hover:text-brand-paper hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
