import type { Metadata } from "next";
import { serif, sans } from "@/styles/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Atelier | Bespoke Bridal Artistry",
  description: "Nationwide bridal couture, makeup, and handcrafted knitting.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="text-sm">
      <body className={`${serif.variable} ${sans.variable} font-sans antialiased bg-bridal-ivory text-bridal-charcoal selection:bg-bridal-sage selection:text-white`}>
        {children}
      </body>
    </html>
  );
}