import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { WhatsAppButton } from "@/components/whatsapp-button";

describe("WhatsAppButton", () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_MOUVE_WHATSAPP = "5511900000000";
  });

  it("renders a link to wa.me with the given message", () => {
    render(<WhatsAppButton message="Quero falar com a Mouve" label="Falar com a Mouve" />);
    const link = screen.getByRole("link", { name: "Falar com a Mouve" });
    expect(link).toHaveAttribute(
      "href",
      expect.stringContaining("https://wa.me/5511900000000?text=")
    );
    expect(link).toHaveAttribute("target", "_blank");
  });
});
