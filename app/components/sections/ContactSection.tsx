import { MonitorCheck, PhoneCall } from "lucide-react";
import type { ServiceItem } from "../../types";
import { ContactForm } from "../ContactForm";

function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="currentColor"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 2C6.477 2 2 6.477 2 12c0 2.152.68 4.14 1.838 5.767L2.5 21.5l3.882-1.282A9.952 9.952 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.952 7.952 0 01-4.227-1.216l-.303-.18-2.3.758.772-2.245-.198-.315A7.955 7.955 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
    </svg>
  );
}

interface ContactSectionProps { services: ServiceItem[]; isDark: boolean; }
export function ContactSection({ services, isDark }: ContactSectionProps) {
  return (
    <>
      {/* ---------------- SECTION 5: CONTACT ALLIANCE FORM ---------------- */}
      <section id="alliance" className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24 relative z-10">
        
        {/* Header summary */}
        <div className="text-center space-y-3 max-w-xl mx-auto pb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-white/60 uppercase tracking-widest font-black">
            <MonitorCheck className="h-3.5 w-3.5" />
            Establish Correspondence
          </div>
          <h3 className="text-4xl md:text-5xl font-display font-black tracking-tighter uppercase leading-[0.95]">
            Let&apos;s Build a{" "}
            <span className={`${isDark ? "chrome-text" : "chrome-text-light"}`}>
              Legendary Masterpiece
            </span>
          </h3>
          <div className="space-y-3 pt-2">
            <p className={`text-base md:text-lg font-medium ${isDark ? "text-slate-300" : "text-slate-700"}`}>
              Connect with Genius arT
            </p>
            <div className="font-mono text-xl sm:text-2xl font-black tracking-widest text-cyan-400 pt-1">
              +94 77 68 66 068
            </div>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
              {/* Call Button */}
              <a 
                href="tel:+94776866068" 
                title="Call +94 77 68 66 068"
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl font-mono text-base md:text-lg font-black tracking-wide transition-all duration-150 transform active:translate-y-1.5 ${
                  isDark 
                    ? "bg-linear-to-b from-cyan-400 to-cyan-500 text-slate-950 border border-cyan-300/50 shadow-[0_6px_0_0_#0891b2,0_10px_18px_rgba(6,182,212,0.35)] hover:bg-cyan-300 hover:shadow-[0_4px_0_0_#0891b2,0_6px_12px_rgba(6,182,212,0.3)] hover:translate-y-0.5 active:shadow-[0_1px_0_0_#0891b2]" 
                    : "bg-linear-to-b from-cyan-500 to-blue-600 text-white border border-cyan-400 shadow-[0_6px_0_0_#1d4ed8,0_10px_18px_rgba(29,78,216,0.3)] hover:from-cyan-400 hover:to-blue-500 hover:shadow-[0_4px_0_0_#1d4ed8,0_6px_12px_rgba(29,78,216,0.25)] hover:translate-y-0.5 active:shadow-[0_1px_0_0_#1d4ed8]"
                }`}
              >
                <PhoneCall className="h-5 w-5 md:h-6 md:w-6" />
                Call Us
              </a>

              {/* WhatsApp Button */}
              <a 
                href="https://wa.me/94776866068" 
                target="_blank"
                rel="noopener noreferrer"
                title="Chat on WhatsApp"
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl font-mono text-base md:text-lg font-black tracking-wide transition-all duration-150 transform active:translate-y-1.5 ${
                  isDark 
                    ? "bg-linear-to-b from-emerald-400 to-emerald-500 text-slate-950 border border-emerald-300/50 shadow-[0_6px_0_0_#047857,0_10px_18px_rgba(16,185,129,0.35)] hover:bg-emerald-300 hover:shadow-[0_4px_0_0_#047857,0_6px_12px_rgba(16,185,129,0.3)] hover:translate-y-0.5 active:shadow-[0_1px_0_0_#047857]" 
                    : "bg-linear-to-b from-emerald-500 to-green-600 text-white border border-emerald-400 shadow-[0_6px_0_0_#15803d,0_10px_18px_rgba(21,128,61,0.3)] hover:from-emerald-400 hover:to-green-500 hover:shadow-[0_4px_0_0_#15803d,0_6px_12px_rgba(21,128,61,0.25)] hover:translate-y-0.5 active:shadow-[0_1px_0_0_#15803d]"
                }`}
              >
                <WhatsAppIcon className="h-5 w-5 md:h-6 md:w-6 fill-current" />
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>

        {/* <ContactForm services={services} isDark={isDark} /> */}
      </section>

    </>
  );
}
