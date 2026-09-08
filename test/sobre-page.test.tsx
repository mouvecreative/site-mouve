import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Sobre from "@/app/sobre/page";

describe("Sobre page", () => {
  it("renders the Diferencial comparison with both columns", () => {
    render(<Sobre />);
    expect(screen.getByText("Agência genérica")).toBeInTheDocument();
    expect(screen.getByText("Mouve")).toBeInTheDocument();
    expect(
      screen.getByText("Estratégia validada em 15 segmentos diferentes")
    ).toBeInTheDocument();
  });
});
