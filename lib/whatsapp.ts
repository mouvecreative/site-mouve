export function buildWhatsAppUrl(message: string): string {
  const number = process.env.NEXT_PUBLIC_MOUVE_WHATSAPP;
  if (!number) {
    throw new Error(
      "NEXT_PUBLIC_MOUVE_WHATSAPP não está configurado (.env.local)."
    );
  }
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
