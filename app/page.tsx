import { portfolio, services } from "./content";
import { PortfolioShowcase } from "./components/PortfolioShowcase";
import { ServicesPanel } from "./components/ServicesPanel";
import { ApproachSection } from "./components/sections/ApproachSection";
import { ContactSection } from "./components/sections/ContactSection";
import { FullScreenVideoPortal } from "./components/sections/FullScreenVideoPortal";
import { HeroSection } from "./components/sections/HeroSection";
import { ParallaxBanner } from "./components/sections/ParallaxBanner";
import { SharedParticleBackground } from "./components/sections/SharedParticleBackground";
import { SiteFooter } from "./components/sections/SiteFooter";
import { SiteHeader } from "./components/sections/SiteHeader";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 carbon-mesh">
      <SiteHeader />

      <SharedParticleBackground>
        <HeroSection />
        <FullScreenVideoPortal
          immersive
          showHeading={false}
          overlayEyebrow="A Cinematic Journey"
          overlayTitle="Imagination Unleashed"
          videoUrl="https://youtu.be/RdQyIS-mvcw"
          thumbnailUrl="https://img.youtube.com/vi/RdQyIS-mvcw/maxresdefault.jpg"
        />
        <FullScreenVideoPortal
          videoUrl="https://youtu.be/OqRClNpVqZw?si=02az8DoeQ5A5vP8L"
          thumbnailUrl="https://img.youtube.com/vi/OqRClNpVqZw/maxresdefault.jpg"
          headingSuffix="in a Minute"
        />
      </SharedParticleBackground>

      <ServicesPanel services={services} />
      <ParallaxBanner />
      <PortfolioShowcase portfolio={portfolio} />
      <ApproachSection />
      <ContactSection />
      <SiteFooter />
    </div>
  );
}
