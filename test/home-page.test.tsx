import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("Home page", () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_MOUVE_WHATSAPP = "5511900000000";
  });

  it("renders the hero headline and the three credibility numbers", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { name: /Construímos marcas/ })
    ).toBeInTheDocument();
    expect(screen.getByText("fortes.")).toBeInTheDocument();
    expect(screen.getByText("27")).toBeInTheDocument();
    expect(screen.getByText("15")).toBeInTheDocument();
    expect(screen.getByText("98%")).toBeInTheDocument();
  });
});
