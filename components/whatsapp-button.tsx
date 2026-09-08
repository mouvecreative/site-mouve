import { buttonVariants } from "@/components/ui/button";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export function WhatsAppButton({
  message,
  label,
  variant = "default",
}: {
  message: string;
  label: string;
  variant?: "default" | "outline";
}) {
  return (
    <a
      href={buildWhatsAppUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        buttonVariants({ variant, size: "lg" }),
        variant === "default" && "bg-brand-blue hover:bg-brand-blue/90"
      )}
    >
      {label}
    </a>
  );
}
