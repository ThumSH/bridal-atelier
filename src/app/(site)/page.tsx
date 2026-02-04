import VideoShowcase from "@/components/home/VideoShowcase";
import AtelierIntro from "@/components/home/AtelierIntro";
import PressStrip from "@/components/home/PressStrip";
import Hero from "@/components/home/Hero";
import BridalGallery from "@/components/home/BridalGallery";
import ArtistryShowcase from "@/components/home/ArtistryShowcase";
import HairArtistry from "@/components/home/HairArtistry";
import RealWeddings from "@/components/home/RealWeddings";
import AtelierStats from "@/components/home/AtelierStats";
import BespokeJourney from "@/components/home/BespokeJourney";
import PreFooter from "@/components/global/PreFooter";

export default function Home() {
  return (
    <main className="w-full bg-bridal-ivory">
      
      {/* 1. THE STAGE (Background Layer) */}
      {/* This stays visually 'underneath' the content that follows */}
      <div className="relative z-0">
        <VideoShowcase />
      </div>

      {/* 2. THE CONTENT (Foreground Layer) */}
      {/* z-10 ensures this sits ON TOP of the video. 
          -mt-20 pulls it up to overlap the video bottom. */}
      <div className="relative z-10 -mt-15">
        
        {/* The "Lid" that creates the rounded transition */}
        

        {/* The White Content Block */}
        <div className="bg-bridal-ivory pb-0">
          <AtelierIntro />
          <PressStrip />
          <Hero />
          <BridalGallery/>
          <ArtistryShowcase />
          <HairArtistry />
          <RealWeddings />
          <AtelierStats />
          <BespokeJourney />
          
          <PreFooter />
        </div>

      </div>
    </main>
  );
}