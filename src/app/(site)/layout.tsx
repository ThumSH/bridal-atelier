import Navbar from "@/components/global/Navbar";
import Footer from "@/components/global/Footer";
import Preloader from "@/components/global/Preloader";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col font-sans">
      <Preloader />
      
      {/* 1. The Navbar (Fixed Overlay) */}
      <Navbar />

      {/* 2. The Page Content */}
      <main className="grow">
        {children}
      </main>

      {/* 3. The Footer */}
      <Footer />
      
    </div>
  );
}