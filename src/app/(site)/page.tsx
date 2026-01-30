import Hero from "@/components/home/Hero";
import AtelierIntro from "@/components/home/AtelierIntro";
import KnittingShowcase from "@/components/home/KnittingShowcase";
import PhilosophySection from "@/components/home/PhilosophySection";
import ComprehensiveServices from "@/components/home/ComprehensiveServices";
import VideoShowcase from "@/components/home/VideoShowcase";
import DressSilhouettes from "@/components/home/DressSilhouettes.tsx";

export default function Home() {
  return (
    <main>
      <VideoShowcase />
      <AtelierIntro />
      <Hero /> 
      <ComprehensiveServices />
      <PhilosophySection />
      <KnittingShowcase />
      <DressSilhouettes/>
    </main>
  );
}