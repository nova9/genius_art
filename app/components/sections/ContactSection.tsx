import { PhoneCall } from "lucide-react";

function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 2C6.477 2 2 6.477 2 12c0 2.152.68 4.14 1.838 5.767L2.5 21.5l3.882-1.282A9.952 9.952 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.952 7.952 0 01-4.227-1.216l-.303-.18-2.3.758.772-2.245-.198-.315A7.955 7.955 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
    </svg>
  );
}

export function ContactSection() {
  return (
    <section
        id="alliance"
        className="max-w-7xl mx-auto px-4 md:px-8 py-20 md:py-32 relative z-10 overflow-hidden"
      >
        {/* Header summary */}
        <div className="text-center space-y-5 max-w-4xl mx-auto pb-12">
          <h3 className="contact-title text-5xl sm:text-6xl md:text-7xl [word-spacing:0.15em] lg:text-8xl font-display font-black tracking-tighter uppercase leading-[0.88]">
            Let&apos;s Build a {" "}
            <span className="contact-shimmer chrome-text">
              Legendary Masterpiece
            </span>
          </h3>
          <div className="space-y-5 pt-3">
            <p className="contact-fade-up text-lg font-medium text-slate-300 md:text-2xl">
              Connect with Genius arT
            </p>
            <div className="contact-fade-up contact-phone font-mono text-2xl sm:text-3xl md:text-4xl font-black tracking-widest text-cyan-400 pt-1">
              +94 77 68 66 068
            </div>
            <div className="contact-fade-up pt-4 flex flex-col sm:flex-row items-center justify-center gap-5 max-w-3xl mx-auto">
              {/* Call Button */}
              <a
                href="tel:+94776866068"
                title="Call +94 77 68 66 068"
                className="inline-flex w-full items-center justify-center gap-3 rounded-2xl border border-cyan-300/50 bg-linear-to-b from-cyan-400 to-cyan-500 px-8 py-5 font-mono text-lg font-black tracking-wide text-slate-950 shadow-[0_6px_0_0_#0891b2,0_10px_18px_rgba(6,182,212,0.35)] transition-all duration-150 hover:translate-y-0.5 hover:bg-cyan-300 hover:shadow-[0_4px_0_0_#0891b2,0_6px_12px_rgba(6,182,212,0.3)] active:translate-y-1.5 active:shadow-[0_1px_0_0_#0891b2] sm:min-w-64 md:text-xl"
              >
                <PhoneCall className="h-6 w-6 md:h-7 md:w-7" />
                Call Us
              </a>

              {/* WhatsApp Button */}
              <a
                href="https://wa.me/94776866068"
                target="_blank"
                rel="noopener noreferrer"
                title="Chat on WhatsApp"
                className="inline-flex w-full items-center justify-center gap-3 rounded-2xl border border-emerald-300/50 bg-linear-to-b from-emerald-400 to-emerald-500 px-8 py-5 font-mono text-lg font-black tracking-wide text-slate-950 shadow-[0_6px_0_0_#047857,0_10px_18px_rgba(16,185,129,0.35)] transition-all duration-150 hover:translate-y-0.5 hover:bg-emerald-300 hover:shadow-[0_4px_0_0_#047857,0_6px_12px_rgba(16,185,129,0.3)] active:translate-y-1.5 active:shadow-[0_1px_0_0_#047857] sm:min-w-64 md:text-xl"
              >
                <WhatsAppIcon className="h-6 w-6 md:h-7 md:w-7 fill-current" />
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
    </section>
  );
}
