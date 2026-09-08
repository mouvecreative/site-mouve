import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import Contato from "@/app/contato/page";

describe("Contato page", () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_MOUVE_WHATSAPP = "5511900000000";
  });

  it("renders the WhatsApp CTA and the Instagram link", () => {
    render(<Contato />);
    expect(
      screen.getByRole("link", { name: "Falar com a Mouve no WhatsApp" })
    ).toHaveAttribute("href", expect.stringContaining("https://wa.me/5511900000000"));
    expect(screen.getByRole("link", { name: "@agencia_mouve" })).toHaveAttribute(
      "href",
      "https://instagram.com/agencia_mouve"
    );
  });
});
