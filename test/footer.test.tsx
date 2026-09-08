import { describe, it, expect, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { Footer } from "@/components/footer";

describe("Footer", () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_MOUVE_WHATSAPP = "5511900000000";
  });

  it("has no long-form paragraph text", () => {
    const { container: root } = render(<Footer />);
    const paragraphs = root.querySelectorAll("p");
    paragraphs.forEach((p) => {
      expect(p.textContent?.length ?? 0).toBeLessThan(60);
    });
  });
});
