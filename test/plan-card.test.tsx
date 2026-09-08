import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { PlanCard } from "@/components/plan-card";

describe("PlanCard", () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_MOUVE_WHATSAPP = "5511900000000";
  });

  it("renders the plan name and every item, never a currency value", () => {
    render(
      <PlanCard
        name="Crescimento"
        items={["Tudo do Essencial", "Tráfego pago Meta"]}
        ctaMessage="Quero saber mais sobre o plano Crescimento"
      />
    );
    expect(screen.getByRole("heading", { name: "Crescimento" })).toBeInTheDocument();
    expect(screen.getByText("Tráfego pago Meta")).toBeInTheDocument();
    expect(screen.queryByText(/R\$/)).not.toBeInTheDocument();
  });
});
