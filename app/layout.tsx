import type { Metadata } from "next";
import { Poppins, Bricolage_Grotesque, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-bricolage",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
});

export const metadata: Metadata = {
  title: {
    default: "Mouve Creative",
    template: "%s | Mouve Creative",
  },
  description:
    "Estratégia de marketing digital para marcas que precisam de resultado, não de barulho.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${poppins.variable} ${bricolage.variable} ${instrument.variable}`}
    >
      <body className="bg-brand-ink text-brand-paper font-sans antialiased">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
