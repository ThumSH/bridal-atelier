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
import CoutureDetails from "@/components/home/CoutureDetails"; // New
import PressStrip from "@/components/home/PressStrip"; // New
import PreFooter from "@/components/global/PreFooter";

export default function Home() {
  return (
    <main>
      <VideoShowcase />
      <AtelierIntro />
      <ArtistryShowcase />
      <CoutureDetails />
      <Hero /> 
       <PressStrip />
        <DressSilhouettes/>
      <PhilosophySection />   
      <ComprehensiveServices />
      <BespokeJourney />
     
      <RealWeddings />
      <AtelierStats />
      <PreFooter />
    </main>
  );
}