import AtelierIntro from "@/components/home/AtelierIntro";
import VideoShowcase from "@/components/home/VideoShowcase";
import PressStrip from "@/components/home/PressStrip";
import BridalGallery from "@/components/home/BridalGallery";
import ArtistryShowcase from "@/components/home/ArtistryShowcase";
import HairArtistry from "@/components/home/HairArtistry";
import RealWeddings from "@/components/home/RealWeddings";
import AtelierStats from "@/components/home/AtelierStats";
import BespokeJourney from "@/components/home/BespokeJourney";
import PreFooter from "@/components/global/PreFooter";
import AwardWinningStudio from "@/components/home/AwardWinningStudio";
import Hero from "@/components/home/Hero";

export default function Home() {
  return (
    <main>
        <VideoShowcase />

      {/* 2. THE CONTENT (Foreground Layer) */}
      {/* z-10 ensures this sits ON TOP of the video. 
          -mt-20 pulls it up to overlap the video bottom. */}
      <div className="relative z-10">
        
        {/* The "Lid" that creates the rounded transition */}
        

        {/* The White Content Block */}
        <div className="h-dvh w-full pointer-events-none" />
        <div className="bg-bridal-ivory shadow-[0_-20px_50px_rgba(0,0,0,0.2)]">
          <AtelierIntro />
          <PressStrip />
          <Hero />
          <BridalGallery/>
          <ArtistryShowcase />
          <HairArtistry />
          <RealWeddings />
          <BespokeJourney />
          <AtelierStats />
          <AwardWinningStudio /> 
          <PreFooter />
        </div>

      </div>
    </main>
  );
}