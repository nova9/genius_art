import React, { useState } from "react";
import { ServiceItem } from "../types";
import { TexturedIcon } from "./TexturedIcon";
import { motion } from "motion/react";
import { Check } from "lucide-react";

interface ServicesPanelProps {
  services: ServiceItem[];
  isDark: boolean;
}

export const ServicesPanel: React.FC<ServicesPanelProps> = ({ services, isDark }) => {
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  return (
    <div className="w-full flex flex-col gap-10">
      <div>
        <div className="space-y-2">
          <p className={`text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-tighter uppercase leading-[0.95] max-w-xl ${
            isDark ? "text-slate-100" : "text-slate-900"
          }`}>
            Our specialized marketing services and{" "}
            <span className={`${isDark ? "chrome-text" : "chrome-text-light"}`}>
              premium digital solutions
            </span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {services.map((service) => {
          const isHovered = hoveredCardId === service.id;
          
          return (
            <motion.div
              key={service.id}
              id={`service-card-${service.id}`}
              className={`p-6 md:p-8 rounded-3xl border text-left cursor-pointer transition-all duration-300 relative overflow-hidden group flex flex-col justify-between ${
                isDark
                  ? "bg-white/[0.02] border-white/10 hover:bg-white/[0.04] hover:border-white/20 hover:shadow-2xl hover:shadow-white/5"
                  : "bg-black/[0.01] border-black/5 hover:bg-black/[0.03] hover:border-black/10 hover:shadow-lg"
              }`}
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
                  
                  {service.metricLabel && service.metricValue && (
                    <span className={`inline-flex items-center gap-1.5 text-xs font-mono font-medium px-3 py-1 rounded-full ${
                      isDark 
                        ? "bg-slate-950 border border-slate-900 text-slate-300" 
                        : "bg-slate-100 border border-slate-200 text-slate-700"
                    }`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${
                        service.accentColor === "cyber-blue" ? "bg-cyan-400" : "bg-blue-500"
                      }`} />
                      {service.metricLabel}: <strong className={`font-bold ${service.accentColor === "cyber-blue" ? "text-cyan-400" : "text-blue-400"}`}>{service.metricValue}</strong>
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <h4 className={`text-lg md:text-xl font-display font-black uppercase tracking-tighter [word-spacing:0.25em] ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}>
                    {service.title}
                  </h4>
                  <p className={`text-sm leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                    {service.fullDesc}
                  </p>
                </div>

                <div className="space-y-1.5 pt-4 border-t border-slate-800/20">
                  {service.features.map((feat, fidx) => (
                    <div key={fidx} className="flex items-start gap-2 text-xs">
                      <span className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                        isDark
                          ? "bg-cyan-400/10 text-cyan-400"
                          : "bg-blue-500/10 text-blue-600"
                      }`}>
                        <Check className="h-2.5 w-2.5" aria-hidden="true" />
                      </span>
                      <span className={isDark ? "text-slate-400" : "text-slate-600"}>
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
    </div>
  );
};
