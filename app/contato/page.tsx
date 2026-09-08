import { SectionHeading } from "@/components/section-heading";
import { WhatsAppButton } from "@/components/whatsapp-button";

export default function Contato() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col items-start gap-8 px-6 py-24">
      <SectionHeading
        eyebrow="Contato"
        title="Vamos conversar sobre a sua marca."
        subtitle="Sem formulário, sem espera. Fala direto com a gente pelo WhatsApp."
      />
      <WhatsAppButton
        message="Olá! Vim pelo site e quero falar com a Mouve."
        label="Falar com a Mouve no WhatsApp"
      />
      <a
        href="https://instagram.com/agencia_mouve"
        target="_blank"
        rel="noopener noreferrer"
        className="text-brand-ink/70 hover:text-brand-ink"
      >
        @agencia_mouve
      </a>
    </main>
  );
}
