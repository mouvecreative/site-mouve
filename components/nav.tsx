import Link from "next/link";
import { WhatsAppButton } from "@/components/whatsapp-button";

const LINKS = [
  { href: "/sobre", label: "Sobre" },
  { href: "/metodo", label: "Método" },
  { href: "/planos", label: "Planos" },
  { href: "/contato", label: "Contato" },
];

export function Nav() {
  return (
    <header className="border-b border-brand-paper/10 bg-brand-ink">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          aria-label="Mouve"
          className="flex items-center transition-opacity hover:opacity-80"
        >
          <span className="text-xl font-bold tracking-tight text-brand-paper">MOU</span>
          <span className="text-xl font-bold tracking-tight text-brand-blue">VE</span>
        </Link>
        <nav className="flex flex-wrap gap-4 sm:gap-8">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-sm font-medium text-brand-paper/70 transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-brand-blue after:transition-all after:duration-300 hover:text-brand-paper hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <WhatsAppButton
          message="Olá! Vim pelo site e quero saber mais sobre a Mouve."
          label="Falar com a Mouve"
        />
      </div>
    </header>
  );
}
