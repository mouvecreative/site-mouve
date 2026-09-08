import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import Planos from "@/app/planos/page";

describe("Planos page", () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_MOUVE_WHATSAPP = "5511900000000";
  });

  it("renders all three plans and the value-stack, with no price anywhere", () => {
    render(<Planos />);
    expect(screen.getByRole("heading", { name: "Essencial" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Crescimento" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Referência" })).toBeInTheDocument();
    expect(
      screen.getByText("Isso não é uma lista de tarefas. É a estrutura completa por trás de uma marca que cresce de verdade.")
    ).toBeInTheDocument();
    expect(screen.queryByText(/R\$/)).not.toBeInTheDocument();
    expect(screen.queryByText(/\d+[.,]\d{3}/)).not.toBeInTheDocument();
  });
});
