import type { TestimonialItem } from "../../types";
import { Testimonials } from "../Testimonials";

interface TestimonialsSectionProps { testimonials: TestimonialItem[]; isDark: boolean; }
export function TestimonialsSection({ testimonials, isDark }: TestimonialsSectionProps) {
  return (
    <>
      {/* ---------------- SECTION 4: CLIENT TESTIMONIALS SLIDER ---------------- */}
      <section id="testimonials" className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20 relative select-none">
        
        {/* Glow ball */}
        <div className="absolute top-1/2 right-10 w-64 h-64 bg-white/5 rounded-full blur-[110px] pointer-events-none" />

        <Testimonials testimonials={testimonials} isDark={isDark} />

      </section>

    </>
  );
}
