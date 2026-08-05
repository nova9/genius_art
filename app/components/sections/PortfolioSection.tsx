import type { PortfolioItem } from "../../types";
import { PortfolioShowcase } from "../PortfolioShowcase";

interface PortfolioSectionProps { portfolio: PortfolioItem[]; isDark: boolean; onUpdatePortfolio: (items: PortfolioItem[]) => void; }
export function PortfolioSection({ portfolio, isDark, onUpdatePortfolio }: PortfolioSectionProps) {
  return (
    <>
      {/* ---------------- SECTION 3: PORTFOLIO SHOWCASE GRID ---------------- */}
      <section id="portfolio" className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24 relative z-10">
        
        <PortfolioShowcase portfolio={portfolio} isDark={isDark} onUpdatePortfolio={onUpdatePortfolio} />

      </section>

    </>
  );
}
