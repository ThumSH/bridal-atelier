import Hero from "@/components/home/Hero";
import AtelierIntro from "@/components/home/AtelierIntro";
import BespokeJourney from "@/components/home/BespokeJourney";
import PhilosophySection from "@/components/home/PhilosophySection";
import ComprehensiveServices from "@/components/home/ComprehensiveServices";
import VideoShowcase from "@/components/home/VideoShowcase";
import DressSilhouettes from "@/components/home/DressSilhouettes";
import ArtistryShowcase from "@/components/home/ArtistryShowcase";
import RealWeddings from "@/components/home/RealWeddings";
import AtelierStats from "@/components/home/AtelierStats";

export default function Home() {
  return (
    <main>
      <VideoShowcase />
      <AtelierIntro />
      <Hero /> 
      <ComprehensiveServices />
      <PhilosophySection />
      <BespokeJourney />
      <DressSilhouettes/>
      <ArtistryShowcase />
      <RealWeddings />
      <AtelierStats />
    </main>
  );
}