"use client";

import { useState } from "react";
import type { ServiceItem } from "../content";
import { TexturedIcon } from "./TexturedIcon";
import { motion } from "motion/react";
import { Check } from "lucide-react";

interface ServicesPanelProps {
  services: readonly ServiceItem[];
}

export function ServicesPanel({ services }: ServicesPanelProps) {
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  return (
    <section
      id="capabilities"
      className="relative mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-16 md:px-8 md:py-24"
    >
      <div className="pointer-events-none absolute left-10 top-1/4 h-72 w-72 rounded-full bg-cyan-500/5 blur-[120px]" />
      <div>
        <div className="space-y-2">
          <h2 className="max-w-xl text-3xl font-black uppercase leading-[0.95] tracking-tighter text-slate-100 sm:text-4xl md:text-5xl">
            Our specialized marketing services and{" "}
            <span className="chrome-text">
              premium digital solutions
            </span>
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {services.map((service) => {
          const isHovered = hoveredCardId === service.id;
          
          return (
            <motion.div
              key={service.id}
              id={`service-card-${service.id}`}
              className="group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/2 p-6 text-left transition-all duration-300 hover:border-white/20 hover:bg-white/4 hover:shadow-2xl hover:shadow-white/5 md:p-8"
              onMouseEnter={() => setHoveredCardId(service.id)}
              onMouseLeave={() => setHoveredCardId(null)}
              whileHover={{ y: -4 }}
            >
              <div className="space-y-6">
                <div className="flex items-start gap-4 justify-between">
                  <TexturedIcon 
                    type={service.iconType} 
                    size={56}
                    isHovered={isHovered}
                    className="shrink-0"
                  />
                  
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-black uppercase tracking-tighter text-white [word-spacing:0.25em] md:text-xl">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-400">
                    {service.description}
                  </p>
                </div>

                <div className="space-y-1.5 pt-4 border-t border-slate-800/20">
                  {service.features.map((feat, fidx) => (
                    <div key={fidx} className="flex items-start gap-2 text-xs">
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-cyan-400/10 text-cyan-400">
                        <Check className="h-2.5 w-2.5" aria-hidden="true" />
                      </span>
                      <span className="text-slate-400">
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
