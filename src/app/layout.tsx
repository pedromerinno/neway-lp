import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Neway — Piscinas e Paisagismo | Transforme seu quintal",
  description:
    "Construa a piscina dos seus sonhos. Da consultoria ao mergulho final — transformamos seu quintal em um paraíso.",
  openGraph: {
    title: "Neway — Piscinas e Paisagismo",
    description:
      "Construa a piscina dos seus sonhos. Da consultoria ao mergulho final.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
