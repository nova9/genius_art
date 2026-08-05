import type { ServiceItem } from "../../types";
import { ServicesPanel } from "../ServicesPanel";

interface CapabilitiesSectionProps { services: ServiceItem[]; isDark: boolean; }
export function CapabilitiesSection({ services, isDark }: CapabilitiesSectionProps) {
  return (
    <>
      {/* ---------------- SECTION 1: KEY CAPABILITIES & SERVICES ---------------- */}
      <section id="capabilities" className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24 relative select-none">
        
        {/* Ambient metallic backdrop mesh nodes element */}
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

        <ServicesPanel services={services} isDark={isDark} />
        
      </section>

    </>
  );
}
