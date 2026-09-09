import { describe, it, expect, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { Footer } from "@/components/footer";

describe("Footer", () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_MOUVE_WHATSAPP = "5511900000000";
  });

  it("has no long-form paragraph text", () => {
    const { container: root } = render(<Footer />);
    const textElements = root.querySelectorAll("p, span, a");
    expect(textElements.length).toBeGreaterThan(0);
    textElements.forEach((el) => {
      expect(el.textContent?.length ?? 0).toBeLessThan(60);
    });
  });

  it("links to all four pages", () => {
    render(<Footer />);
    expect(document.querySelectorAll(`a[href="/sobre"]`)).toHaveLength(1);
    expect(document.querySelectorAll(`a[href="/metodo"]`)).toHaveLength(1);
    expect(document.querySelectorAll(`a[href="/planos"]`)).toHaveLength(1);
    expect(document.querySelectorAll(`a[href="/contato"]`)).toHaveLength(1);
  });
});
