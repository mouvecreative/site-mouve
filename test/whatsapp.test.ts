import { describe, it, expect, beforeEach } from "vitest";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

describe("buildWhatsAppUrl", () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_MOUVE_WHATSAPP = "5511900000000";
  });

  it("builds a wa.me link with the configured number", () => {
    const url = buildWhatsAppUrl("Olá!");
    expect(url.startsWith("https://wa.me/5511900000000?text=")).toBe(true);
  });

  it("url-encodes accented characters and spaces", () => {
    const url = buildWhatsAppUrl("Olá! Vim pelo site, quero agendar uma conversa.");
    expect(url).toContain("Ol%C3%A1");
    expect(url).not.toContain(" ");
  });
});
