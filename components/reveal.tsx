import { cn } from "@/lib/utils";

// Revelação no scroll via CSS scroll-driven (animation-timeline: view()).
// Sem JS: conteúdo fica visível por padrão; a animação é progressive enhancement
// (só onde há suporte e sem prefers-reduced-motion). Ver globals.css .reveal.
export function Reveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("reveal", className)}>{children}</div>;
}
