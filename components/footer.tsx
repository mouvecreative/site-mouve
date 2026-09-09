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
    <footer className="border-t border-brand-ink/10 bg-brand-ink py-10 text-brand-paper">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-lg font-semibold">Mouve</span>
        <nav className="flex flex-wrap gap-4">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-brand-paper/70 hover:text-brand-paper"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <a
          href="https://instagram.com/agencia_mouve"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-brand-paper/70 hover:text-brand-paper"
        >
          @agencia_mouve
        </a>
        <WhatsAppButton
          message="Olá! Vim pelo site e quero saber mais sobre a Mouve."
          label="Falar no WhatsApp"
          variant="outline"
        />
      </div>
    </footer>
  );
}
