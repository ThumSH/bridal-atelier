import type { Metadata } from "next";
import { serif, sans } from "@/styles/fonts";
import "./globals.css";
import SmoothScroll from "@/components/global/SmoothScroll";
import CustomCursor from "@/components/global/CustomCursor";
import Preloader from "@/components/global/Preloader";

export const metadata: Metadata = {
  title: "Bonitha Saloon | Award-Winning Bridal Hair & Beauty Studio",
  description: "Premier bridal couture, professional makeup artistry, and luxury hair styling by Bonitha. World-class bridal transformations for your special day.",
  keywords: ["Bridal Makeup", "Wedding Hair Styling", "Bridal Gowns", "Bonitha Saloon", "Award Winning Salon"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="text-sm">
      <body className={`${serif.variable} ${sans.variable} font-sans antialiased bg-bridal-ivory text-bridal-charcoal selection:bg-bridal-sage selection:text-white cursor-none`}>
        
        {/* 1. Global Noise Overlay */}
        <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03] mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        
        {/* 2. Luxury Elements */}
        <CustomCursor />
        <Preloader />

        {/* 3. The Scroll Wrapper (Crucial for the fix) */}
        <SmoothScroll>
          <main className="relative z-10">
            {children}
          </main>
        </SmoothScroll>
        
      </body>
    </html>
  );
}