import type { Metadata } from "next";
import { serif, sans } from "@/styles/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bridal Atelier | Bespoke Couture & Artistry",
  description: "Exclusive bridal services, knitting, and couture.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${serif.variable} ${sans.variable} font-sans antialiased bg-bridal-ivory text-bridal-charcoal overflow-x-hidden selection:bg-bridal-sage selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}