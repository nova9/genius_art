import React, { useState } from "react";
import { ServiceItem } from "../types";
import { TexturedIcon } from "./TexturedIcon";
import { motion } from "motion/react";
import { ShieldCheck } from "lucide-react";

interface ServicesPanelProps {
  services: ServiceItem[];
  isDark: boolean;
}

export const ServicesPanel: React.FC<ServicesPanelProps> = ({ services, isDark }) => {
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  return (
    <div className="w-full flex flex-col gap-10">
      {/* Structural Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
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

        {/* Offline cache awareness info */}
        <div className="hidden lg:flex items-center gap-3 text-xs font-mono text-slate-500">
          <ShieldCheck className="h-4 w-4 text-cyan-400" />
          <span>Local storage enabled: specs available offline.</span>
        </div>
      </div>

      {/* Main Grid: Responsive 2-Column Service Grid */}
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
              layoutId={`service-layout-${service.id}`}
            >
              {/* Visual Glass Shimmer on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none" />
              
              <div className="space-y-6">
                <div className="flex items-start gap-4 justify-between">
                  {/* Premium chrome-glowing icon matched to image design */}
                  <TexturedIcon 
                    type={service.iconType} 
                    size={56}
                    isHovered={isHovered}
                    className="shrink-0"
                  />
                  
                  {/* Stats metric pill shown directly on card */}
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

                {/* Title */}
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

                {/* Features list */}
                <div className="space-y-1.5 pt-4 border-t border-slate-800/20">
                  {service.features.map((feat, fidx) => (
                    <div key={fidx} className="flex items-start gap-2 text-xs">
                      <span className="h-4 w-4 shrink-0 rounded bg-white/5 border border-white/20 flex items-center justify-center text-[9px] text-white/50 font-mono font-bold">
                        //
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
