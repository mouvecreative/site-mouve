import { Card, CardContent } from "@/components/ui/card";
import { WhatsAppButton } from "@/components/whatsapp-button";

export function PlanCard({
  name,
  items,
  ctaMessage,
  highlighted = false,
}: {
  name: string;
  items: string[];
  ctaMessage: string;
  highlighted?: boolean;
}) {
  return (
    <Card
      className={
        highlighted
          ? "border-brand-blue border-2 bg-brand-paper"
          : "border-brand-ink/10 bg-brand-paper"
      }
    >
      <CardContent className="flex flex-col gap-6 p-8">
        {highlighted ? (
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-blue">
            Mais escolhido
          </span>
        ) : null}
        <h3 className="text-2xl font-semibold text-brand-ink">{name}</h3>
        <ul className="flex flex-col gap-3">
          {items.map((item) => (
            <li key={item} className="flex gap-2 text-brand-ink/80">
              <span aria-hidden="true" className="text-brand-blue">
                ✓
              </span>
              {item}
            </li>
          ))}
        </ul>
        <WhatsAppButton message={ctaMessage} label="Marcar uma conversa" />
      </CardContent>
    </Card>
  );
}
