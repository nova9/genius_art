import React, { useId } from "react";
import { motion, useReducedMotion } from "motion/react";
import geniusGEye from "../assets/images/white_g_eye_icon_1779553793842.png";

type TexturedIconType =
  | "eye-g"
  | "glass-t"
  | "chrome-aperture"
  | "glowing-layers"
  | "sparkles"
  | "digital-ai"
  | "cinema"
  | "design-3d"
  | "shop-3d";

interface TexturedIconProps {
  type: TexturedIconType;
  size?: number;
  className?: string;
  isHovered?: boolean;
}

interface GlyphProps {
  type: TexturedIconType;
  chromeId: string;
  energyId: string;
  glowId: string;
  isActive: boolean;
}

function IconGlyph({ type, chromeId, energyId, glowId, isActive }: GlyphProps) {
  const chrome = `url(#${chromeId})`;
  const energy = `url(#${energyId})`;
  const glow = `url(#${glowId})`;

  switch (type) {
    case "eye-g":
      return (
        <motion.image
          href={geniusGEye.src}
          x="31"
          y="31"
          width="38"
          height="38"
          preserveAspectRatio="xMidYMid meet"
          initial={{ opacity: 0.86, scale: 1 }}
          animate={{ opacity: isActive ? 1 : 0.86, scale: isActive ? 1.08 : 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: "50px 50px" }}
        />
      );

    case "glass-t":
      return (
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M34 35H66" stroke={chrome} strokeWidth="6" />
          <path d="M50 37V68" stroke={chrome} strokeWidth="7" />
          <motion.path
            d="M35 33H65M47 37V69"
            stroke={energy}
            strokeWidth="1.5"
            initial={{ pathLength: 0.72, opacity: 0.6 }}
            animate={{ pathLength: isActive ? 1 : 0.72, opacity: isActive ? 1 : 0.6 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            filter={isActive ? glow : undefined}
          />
        </g>
      );

    case "chrome-aperture":
      return (
        <g stroke={chrome} strokeWidth="1.25" strokeLinejoin="round">
          <path d="M50 29 61 35 51 45 38 42Z" fill={chrome} />
          <path d="m61 35 7 11-14 4-3-5Z" fill="#94a3b8" />
          <path d="m68 46-1 13-15-4 2-5Z" fill={chrome} />
          <path d="m67 59-11 9-8-12 4-1Z" fill="#64748b" />
          <path d="m56 68-14-1 2-14 4 3Z" fill={chrome} />
          <path d="m42 67-11-9 10-10 3 5Z" fill="#94a3b8" />
          <circle cx="50" cy="50" r="7" fill="#05070b" stroke={energy} strokeWidth="2" />
          <motion.circle
            cx="50"
            cy="50"
            r="3"
            fill="#67e8f9"
            stroke="none"
            initial={{ opacity: 0.65, scale: 1 }}
            animate={{ opacity: isActive ? 1 : 0.65, scale: isActive ? 1.35 : 1 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "50px 50px" }}
            filter={isActive ? glow : undefined}
          />
        </g>
      );

    case "glowing-layers":
      return (
        <g fill="none" strokeLinejoin="round">
          <motion.path
            d="m50 29 21 11-21 11-21-11Z"
            fill="rgba(103,232,249,0.08)"
            stroke={energy}
            strokeWidth="1.8"
            initial={{ y: 0, opacity: 0.78 }}
            animate={{ y: isActive ? -3 : 0, opacity: isActive ? 1 : 0.78 }}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
          />
          <path d="m29 49 21 11 21-11" stroke={chrome} strokeWidth="2" />
          <path d="m29 58 21 11 21-11" stroke={chrome} strokeWidth="2" opacity="0.58" />
          <circle cx="50" cy="40" r="2.5" fill="#e0f2fe" filter={glow} />
        </g>
      );

    case "sparkles":
      return (
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <motion.path
            d="M47 26c1.7 12 5 15.3 17 17-12 1.7-15.3 5-17 17-1.7-12-5-15.3-17-17 12-1.7 15.3-5 17-17Z"
            fill="rgba(103,232,249,0.08)"
            stroke={energy}
            strokeWidth="1.8"
            initial={{ scale: 0.96, opacity: 0.75 }}
            animate={{ scale: isActive ? 1.06 : 0.96, opacity: isActive ? 1 : 0.75 }}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "47px 43px" }}
            filter={isActive ? glow : undefined}
          />
          <path d="M67 55c.7 5 2 6.3 7 7-5 .7-6.3 2-7 7-.7-5-2-6.3-7-7 5-.7 6.3-2 7-7Z" stroke={chrome} strokeWidth="1.5" />
          <path d="M66 28v6M63 31h6" stroke={chrome} strokeWidth="1.5" />
        </g>
      );

    case "digital-ai":
      return (
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M34 38 50 29l16 9v24l-16 9-16-9Z" stroke={chrome} strokeWidth="1.5" opacity="0.65" />
          <path d="m40 57 10-18 10 18M43 51h14" stroke={energy} strokeWidth="2.25" />
          <motion.g
            fill="#a5f3fc"
            stroke="#071018"
            strokeWidth="1"
            initial={{ opacity: 0.7, scale: 1 }}
            animate={{ opacity: isActive ? 1 : 0.7, scale: isActive ? 1.12 : 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "50px 50px" }}
            filter={isActive ? glow : undefined}
          >
            <circle cx="50" cy="39" r="3" />
            <circle cx="40" cy="57" r="3" />
            <circle cx="60" cy="57" r="3" />
            <circle cx="50" cy="51" r="2.5" />
          </motion.g>
        </g>
      );

    case "cinema":
      return (
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <rect x="29" y="34" width="42" height="32" rx="3" stroke={chrome} strokeWidth="2" />
          <path d="M29 42h42M37 35v6M63 35v6M37 59v6M63 59v6" stroke={chrome} strokeWidth="1.5" opacity="0.62" />
          <motion.path
            d="m45 43 14 7-14 7Z"
            fill="rgba(103,232,249,0.18)"
            stroke={energy}
            strokeWidth="2"
            initial={{ x: 0, opacity: 0.78 }}
            animate={{ x: isActive ? 2 : 0, opacity: isActive ? 1 : 0.78 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            filter={isActive ? glow : undefined}
          />
        </g>
      );

    case "design-3d":
      return (
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="m28 59 22 12 22-12-22-12Z" fill="rgba(148,163,184,0.08)" stroke={chrome} strokeWidth="1.5" />
          <path d="M35 58V37l15-8 15 8v21M35 37l15 8 15-8M50 45v26" stroke={energy} strokeWidth="1.8" />
          <motion.path
            d="M29 33h42M35 29v8M65 29v8"
            stroke={chrome}
            strokeWidth="2"
            initial={{ y: 0, opacity: 0.7 }}
            animate={{ y: isActive ? -3 : 0, opacity: isActive ? 1 : 0.7 }}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
          />
          <circle cx="35" cy="58" r="2" fill="#67e8f9" stroke="none" />
          <circle cx="65" cy="58" r="2" fill="#67e8f9" stroke="none" />
        </g>
      );

    case "shop-3d":
      return (
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M31 43h38v27H31Z" fill="rgba(148,163,184,0.07)" stroke={chrome} strokeWidth="1.7" />
          <path d="m28 43 6-13h32l6 13M38 43v27M62 43v27" stroke={chrome} strokeWidth="1.7" />
          <path d="M43 53h14v17H43ZM31 49h7M62 49h7" stroke={energy} strokeWidth="1.8" />
          <motion.path
            d="M30 43h40"
            stroke={energy}
            strokeWidth="3"
            initial={{ pathLength: 0.72, opacity: 0.65 }}
            animate={{ pathLength: isActive ? 1 : 0.72, opacity: isActive ? 1 : 0.65 }}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            filter={isActive ? glow : undefined}
          />
          <circle cx="53" cy="61" r="1" fill="#e0f2fe" stroke="none" />
        </g>
      );
  }
}

export const TexturedIcon: React.FC<TexturedIconProps> = ({
  type,
  size = 56,
  className = "",
  isHovered = false,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const isActive = isHovered && !shouldReduceMotion;
  const instanceId = useId().replace(/:/g, "");
  const chromeId = `${instanceId}-chrome`;
  const energyId = `${instanceId}-energy`;
  const coreId = `${instanceId}-core`;
  const glowId = `${instanceId}-glow`;

  return (
    <div
      className={`relative flex shrink-0 items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        <defs>
          <linearGradient id={chromeId} x1="18" y1="18" x2="78" y2="82" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="0.22" stopColor="#64748b" />
            <stop offset="0.48" stopColor="#f8fafc" />
            <stop offset="0.7" stopColor="#475569" />
            <stop offset="1" stopColor="#cbd5e1" />
          </linearGradient>
          <linearGradient id={energyId} x1="28" y1="72" x2="72" y2="28" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#0284c7" />
            <stop offset="0.5" stopColor="#22d3ee" />
            <stop offset="1" stopColor="#e0f2fe" />
          </linearGradient>
          <radialGradient id={coreId} cx="0" cy="0" r="1" gradientTransform="translate(42 39) rotate(45) scale(40)" gradientUnits="userSpaceOnUse">
            <stop stopColor="#172554" stopOpacity="0.52" />
            <stop offset="0.58" stopColor="#07111f" stopOpacity="0.82" />
            <stop offset="1" stopColor="#020617" stopOpacity="0.96" />
          </radialGradient>
          <filter id={glowId} x="-45%" y="-45%" width="190%" height="190%" colorInterpolationFilters="sRGB">
            <feGaussianBlur stdDeviation="2.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <circle cx="50" cy="50" r="38" stroke={`url(#${chromeId})`} strokeWidth="0.8" opacity="0.22" />
        <motion.circle
          cx="50"
          cy="50"
          r="34"
          stroke={`url(#${energyId})`}
          strokeWidth="1.2"
          strokeDasharray="2 8"
          initial={{ rotate: 0, opacity: 0.38 }}
          animate={{ rotate: isActive ? 24 : 0, opacity: isActive ? 0.82 : 0.38 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: "50px 50px" }}
        />

        <path d="M22 31v-9h9M69 22h9v9M78 69v9h-9M31 78h-9v-9" stroke={`url(#${chromeId})`} strokeWidth="1.5" strokeLinecap="round" />

        <motion.g
          initial={{ scale: 1 }}
          animate={{ scale: isActive ? 1.035 : 1 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: "50px 50px" }}
        >
          <circle cx="50" cy="50" r="26" fill={`url(#${coreId})`} stroke={`url(#${chromeId})`} strokeWidth="1.2" />
          <path d="M36 29A26 26 0 0 1 63 29" stroke="#ffffff" strokeWidth="0.8" opacity="0.42" strokeLinecap="round" />
          <IconGlyph
            type={type}
            chromeId={chromeId}
            energyId={energyId}
            glowId={glowId}
            isActive={isActive}
          />
        </motion.g>

        <motion.circle
          cx="80"
          cy="50"
          r="2.2"
          fill="#67e8f9"
          initial={{ opacity: 0.5, scale: 1 }}
          animate={{ opacity: isActive ? 1 : 0.5, scale: isActive ? 1.45 : 1 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: "80px 50px" }}
          filter={isActive ? `url(#${glowId})` : undefined}
        />
      </svg>
    </div>
  );
};
