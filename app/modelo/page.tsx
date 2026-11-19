import { CineticHero } from "@/components/cinetic-hero";

// Prova do modelo editorial/scrollytelling (seta cinética). Rota separada para
// não mexer na home no ar até aprovar a direção.
export const metadata = { title: "Mouve · Modelo" };

export default function Modelo() {
  return (
    <main>
      <CineticHero />
    </main>
  );
}
