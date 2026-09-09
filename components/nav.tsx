import Image from "next/image";
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
    <header className="border-b border-brand-ink/10 bg-brand-paper">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" aria-label="Mouve" className="flex items-center gap-2">
          <Image src="/brand/symbol-blue.svg" alt="" width={28} height={28} />
          <span className="text-xl font-semibold text-brand-ink">ouve</span>
        </Link>
        <nav className="hidden gap-8 sm:flex">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-brand-ink/70 hover:text-brand-ink"
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
