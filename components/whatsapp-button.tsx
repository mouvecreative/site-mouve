import { MoveRight } from "lucide-react";
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
        "group relative inline-flex items-center justify-center overflow-hidden rounded-full px-6 py-3 text-sm font-semibold",
        variant === "default" && "bg-brand-blue text-brand-ink",
        variant === "outline" &&
          "border border-brand-paper/40 bg-transparent text-brand-paper"
      )}
    >
      <span className="inline-flex translate-x-0 items-center whitespace-nowrap transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
        {label}
      </span>
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-0 z-10 flex translate-x-12 items-center justify-center gap-2 whitespace-nowrap opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100",
          variant === "default" && "text-brand-paper",
          variant === "outline" && "text-brand-ink"
        )}
      >
        {label}
        <MoveRight className="h-4 w-4" />
      </span>
      <span
        aria-hidden="true"
        className={cn(
          "absolute left-[20%] top-[40%] h-2 w-2 rounded-full opacity-0 transition-all duration-300 group-hover:left-0 group-hover:top-0 group-hover:h-full group-hover:w-full group-hover:opacity-100",
          variant === "default" && "bg-brand-ink",
          variant === "outline" && "bg-brand-blue"
        )}
      />
    </a>
  );
}
