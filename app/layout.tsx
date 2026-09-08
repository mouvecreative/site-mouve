import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Mouve Creative",
  description:
    "Estratégia de marketing digital para marcas que precisam de resultado, não de barulho.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={poppins.variable}>
      <body className="bg-brand-paper text-brand-ink font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
