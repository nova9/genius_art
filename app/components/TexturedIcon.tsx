import React from "react";
import { motion } from "motion/react";
import geniusGEye from "../assets/images/white_g_eye_icon_1779553793842.png";

interface TexturedIconProps {
  type: "eye-g" | "glass-t" | "chrome-aperture" | "glowing-layers" | "sparkles" | "digital-ai" | "cinema" | "design-3d" | "shop-3d";
  size?: number;
  className?: string;
  isHovered?: boolean;
}

export const TexturedIcon: React.FC<TexturedIconProps> = ({
  type,
  size = 56,
  className = "",
  isHovered = false,
}) => {
  if (type === "eye-g") {
    return (
      <div 
        className={`relative justify-center items-center flex ${className}`}
        style={{ width: size, height: size }}
      >
        <motion.img
          src={geniusGEye.src}
          alt="Genius G-Eye Logo"
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.2 }}
        />
      </div>
    );
  }
  // Gradients and filter definitions to draw the exact metallic texture
  return (
    <div
      className={`relative justify-center items-center flex ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-hidden"
      >
        <defs>
          {/* Metallic Chrome Gradient matching the heavy silver text */}
          <linearGradient id="metalChrome" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="20%" stopColor="#cbd5e1" />
            <stop offset="40%" stopColor="#94a3b8" />
            <stop offset="50%" stopColor="#f8fafc" />
            <stop offset="65%" stopColor="#64748b" />
            <stop offset="85%" stopColor="#e2e8f0" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>

          {/* Glowing Neon Blue / G Iris Radial Gradient */}
          <radialGradient id="electricIris" cx="50%" cy="50%" r="50%" fx="42%" fy="42%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="40%" stopColor="#00f0ff" />
            <stop offset="75%" stopColor="#0284c7" stopOpacity="1" />
            <stop offset="95%" stopColor="#091e3a" />
            <stop offset="100%" stopColor="#07090e" />
          </radialGradient>

          {/* Ice Blue Glass Gradient for 'T' structure */}
          <linearGradient id="iceGlass" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.95" />
            <stop offset="15%" stopColor="#00f0ff" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#0284c7" stopOpacity="0.6" />
            <stop offset="85%" stopColor="#07090e" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#00f0ff" stopOpacity="1" />
          </linearGradient>

          {/* Golden metallic gradient for accents */}
          <linearGradient id="bronzeChrome" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="30%" stopColor="#ca8a04" />
            <stop offset="50%" stopColor="#fef08a" />
            <stop offset="70%" stopColor="#854d0e" />
            <stop offset="100%" stopColor="#422006" />
          </linearGradient>

          {/* 3D Specular Bevel Filter */}
          <filter id="metalSpecularBevel" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
            <feSpecularLighting
              in="blur"
              specularConstant="1.6"
              specularExponent="35"
              lightingColor="#ffffff"
              result="specOut"
            >
              <feDistantLight azimuth="225" elevation="45" />
            </feSpecularLighting>
            <feComposite in="specOut" in2="SourceAlpha" operator="in" result="specChar" />
            <feComposite in="SourceGraphic" in2="specChar" operator="arithmetic" k2="1" k3="1" result="lit" />
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.6" />
          </filter>

          {/* Glow filter for ice blue glass */}
          <filter id="blueGlassGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComponentTransfer in="blur" result="glow">
              <feFuncA type="linear" slope="1.8" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Projection beam gradient for cinema reels */}
          <linearGradient id="projectionBeam" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.4" />
            <stop offset="30%" stopColor="#0284c7" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#00f0ff" stopOpacity="0" />
          </linearGradient>

          {/* Left-facing projection beam gradient */}
          <linearGradient id="projectionBeamLeft" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.4" />
            <stop offset="30%" stopColor="#0284c7" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#00f0ff" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* ----------------- TYPE 2: GLASS-T (Reflective neon blue glass 'T') ----------------- */}
        {type === "glass-t" && (
          <g>
            {/* Background cyber grid panel */}
            <rect x="15" y="15" width="70" height="70" rx="12" fill="#07090d" stroke="url(#metalChrome)" strokeWidth="1.5" />
            
            {/* Metallic bevel trim elements underneath */}
            <circle cx="50" cy="50" r="6" fill="url(#metalChrome)" filter="url(#metalSpecularBevel)" />
            
            {/* The transparent glowing blue glass 'T' structure */}
            <motion.g
              filter="url(#blueGlassGlow)"
              animate={{ 
                y: isHovered ? -3 : 0,
                scale: isHovered ? 1.05 : 1
              }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              {/* Horizontal Bar of T */}
              <rect
                x="28"
                y="30"
                width="44"
                height="11"
                rx="2"
                fill="url(#iceGlass)"
                stroke="#00f0ff"
                strokeWidth="1"
                style={{ backdropFilter: "blur(4px)" }}
              />
              {/* Vertical core bar of T */}
              <rect
                x="44"
                y="38"
                width="12"
                height="32"
                rx="2"
                fill="url(#iceGlass)"
                stroke="#00f0ff"
                strokeWidth="1"
                style={{ backdropFilter: "blur(4px)" }}
              />
            </motion.g>

            {/* Glowing light bars radiating behind */}
            <line x1="30" y1="36" x2="70" y2="36" stroke="#00f0ff" strokeWidth="2" opacity={isHovered ? 0.7 : 0.3} />
            <line x1="50" y1="35" x2="50" y2="68" stroke="#00f0ff" strokeWidth="2" opacity={isHovered ? 0.7 : 0.3} />
          </g>
        )}

        {/* ----------------- TYPE 3: CHROME-APERTURE (Focus Iris Shutter) ----------------- */}
        {type === "chrome-aperture" && (
          <g filter="url(#metalSpecularBevel)">
            {/* Outer heavy steel frame */}
            <circle cx="50" cy="50" r="42" fill="none" stroke="url(#metalChrome)" strokeWidth="5" />
            {/* Camera / advertising focus rings */}
            <motion.g
              animate={{ rotate: isHovered ? 90 : 0 }}
              transition={{ type: "spring", stiffness: 80 }}
            >
              <circle cx="50" cy="50" r="32" fill="none" stroke="url(#metalChrome)" strokeWidth="1" strokeDasharray="10, 5" />
              {/* Segmented blade shutters (brushed silver) */}
              <path d="M50 18 L60 35 L40 32 Z" fill="url(#metalChrome)" opacity="0.9" />
              <path d="M82 50 L65 60 L68 40 Z" fill="url(#metalChrome)" opacity="0.9" />
              <path d="M50 82 L40 65 L60 68 Z" fill="url(#metalChrome)" opacity="0.9" />
              <path d="M18 50 L35 40 L32 60 Z" fill="url(#metalChrome)" opacity="0.9" />
            </motion.g>
            {/* Core blue dot capture state */}
            <circle cx="50" cy="50" r="10" fill="url(#electricIris)" />
            <circle cx="48" cy="48" r="2" fill="#ffffff" opacity="0.8" />
          </g>
        )}

        {/* ----------------- TYPE 4: GLOWING-LAYERS (Neuro grid) ----------------- */}
        {type === "glowing-layers" && (
          <g>
            {/* Deep backing grid layout */}
            <rect x="20" y="20" width="60" height="60" fill="#091e3a" opacity="0.3" rx="8" />
            
            {/* Cyber networking tracks */}
            <path d="M30 30 L50 50 L70 30 M30 70 L50 50 L70 70" stroke="#1e293b" strokeWidth="2" />
            
            {/* Deepest metal layout plate */}
            <motion.rect
              x="30"
              y="40"
              width="40"
              height="40"
              rx="6"
              fill="url(#metalChrome)"
              filter="url(#metalSpecularBevel)"
              animate={{ 
                rotate: isHovered ? -45 : 0,
                scale: isHovered ? 0.9 : 1
              }}
              transition={{ duration: 0.4 }}
            />

            {/* Glowing translucent glass plate overlay (neon glow) */}
            <motion.rect
              x="30"
              y="20"
              width="40"
              height="40"
              rx="6"
              fill="url(#iceGlass)"
              stroke="#00f0ff"
              strokeWidth="1.5"
              filter="url(#blueGlassGlow)"
              animate={{ 
                rotate: isHovered ? 45 : 0,
                y: isHovered ? -4 : 0,
                scale: isHovered ? 1.05 : 1
              }}
              transition={{ duration: 0.4 }}
            />
            
            {/* Center nodes */}
            <circle cx="50" cy="40" r="4" fill="#ffffff" className="drop-shadow-[0_0_4px_#00f0ff]" />
          </g>
        )}

        {/* ----------------- TYPE 5: SPARKLES (Imagination Sparks) ----------------- */}
        {type === "sparkles" && (
          <g>
            {/* Polished metallic ring */}
            <circle cx="50" cy="50" r="35" stroke="url(#metalChrome)" strokeWidth="2" fill="none" />
            
            {/* Main Spark (glowing and pulsing) */}
            <motion.g
              animate={{ 
                scale: isHovered ? [1, 1.25, 1] : 1,
                rotate: isHovered ? [0, 90, 180, 270, 360] : 0
              }}
              transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0, ease: "easeInOut" }}
            >
              {/* Vertical flare */}
              <path d="M50 15 Q50 50 15 50 Q50 50 50 85 Q50 50 85 50 Q50 50 50 15 Z" fill="url(#metalChrome)" filter="url(#metalSpecularBevel)" />
              {/* Golden Core highlight */}
              <path d="M50 30 Q50 50 30 50 Q50 50 50 70 Q50 50 70 50 Q50 50 50 30 Z" fill="url(#bronzeChrome)" />
              <circle cx="50" cy="50" r="5" fill="#ffffff" className="drop-shadow-[0_0_10px_rgba(255,255,255,0.9)]" />
            </motion.g>

            {/* Glowing background sparks */}
            <circle cx="28" cy="28" r="3" fill="#00f0ff" filter="url(#blueGlassGlow)" />
            <circle cx="72" cy="72" r="3" fill="#0284c7" filter="url(#blueGlassGlow)" />
            <circle cx="72" cy="28" r="2.5" fill="#ffffff" />
          </g>
        )}

        {/* ----------------- TYPE 6: DIGITAL-AI (Neural Silicon / CPU Interface) ----------------- */}
        {type === "digital-ai" && (
          <g>
            {/* Tech grid/circuit board backing tracks */}
            <g opacity={isHovered ? 0.8 : 0.4}>
              <motion.path 
                d="M15 50 L35 50 M85 50 L65 50 M50 15 L50 35 M50 85 L50 65" 
                stroke="#00f0ff" 
                strokeWidth="1.5" 
                strokeDasharray="4 2"
                animate={{ strokeDashoffset: [0, -12] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
              <path d="M30 30 L40 40 M70 30 L60 40 M30 70 L40 60 M70 70 L60 60" stroke="#00f0ff" strokeWidth="1" opacity="0.5" />
            </g>

            {/* Microchip / Core Processor Frame */}
            <motion.rect
              x="30"
              y="30"
              width="40"
              height="40"
              rx="8"
              fill="url(#metalChrome)"
              stroke="url(#iceGlass)"
              strokeWidth="2"
              filter="url(#metalSpecularBevel)"
              animate={{ 
                scale: isHovered ? [0.95, 1.05, 0.95] : [1, 1.03, 1],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Neural glowing center matrix / silicon circuitry */}
            <motion.g
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Inner glowing core eye/brain */}
              <rect x="38" y="38" width="24" height="24" rx="4" fill="url(#electricIris)" className="drop-shadow-[0_0_6px_#00f0ff]" />
              
              {/* Circuit Pins / Data gates */}
              <circle cx="50" cy="50" r="4" fill="#ffffff" />
              <line x1="43" y1="43" x2="57" y2="57" stroke="#ffffff" strokeWidth="1" />
              <line x1="43" y1="57" x2="57" y2="43" stroke="#ffffff" strokeWidth="1" />
            </motion.g>

            {/* Outer revolving "digital network" nodes */}
            <motion.g
              animate={{ rotate: 360 }}
              transition={{ duration: isHovered ? 6 : 12, repeat: Infinity, ease: "linear" }}
              style={{ originX: "50px", originY: "50px" }}
            >
              {/* Node-to-node orbital pathways */}
              <circle cx="50" cy="50" r="26" stroke="#00f0ff" strokeWidth="1" strokeDasharray="6 8" opacity="0.6" />
              {/* Data packet orbits */}
              <circle cx="50" cy="24" r="3.5" fill="#ffffff" className="drop-shadow-[0_0_4px_#00f0ff]" />
              <circle cx="50" cy="76" r="3.5" fill="#00f0ff" />
              <circle cx="24" cy="50" r="3.5" fill="#ffffff" />
              <circle cx="76" cy="50" r="3.5" fill="#0284c7" className="drop-shadow-[0_0_4px_#0284c7]" />
            </motion.g>

            {/* Secondary fast orbit for data transmission feel */}
            <motion.g
              animate={{ rotate: -360 }}
              transition={{ duration: isHovered ? 3 : 6, repeat: Infinity, ease: "linear" }}
              style={{ originX: "50px", originY: "50px" }}
            >
              <circle cx="50" cy="18" r="2" fill="#00f0ff" className="drop-shadow-[0_0_3px_#00f0ff]" />
              <circle cx="18" cy="50" r="2" fill="#ffffff" />
            </motion.g>
          </g>
        )}

        {/* ----------------- TYPE 7: CINEMA (Projector and Rotating Dual Film Reels) ----------------- */}
        {type === "cinema" && (
          <g>
            {/* Projector Light Beam with flicker effect, pointing LEFT */}
            <motion.polygon
              points="32,52 14,34 14,70"
              fill="url(#projectionBeamLeft)"
              animate={{
                opacity: isHovered ? [0.6, 0.9, 0.5, 0.8, 0.6] : [0.4, 0.6, 0.4]
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            
            {/* Film tape path between reels with moving dashes */}
            <motion.path
              d="M 68,32 C 68,18 32,14 32,28"
              fill="none"
              stroke="#00f0ff"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              animate={{
                strokeDashoffset: [0, -16]
              }}
              transition={{
                duration: isHovered ? 1.5 : 3,
                repeat: Infinity,
                ease: "linear"
              }}
              opacity="0.8"
            />
            <motion.path
              d="M 32,28 L 50,56"
              fill="none"
              stroke="#00f0ff"
              strokeWidth="1"
              strokeDasharray="3 3"
              animate={{
                strokeDashoffset: [0, -12]
              }}
              transition={{
                duration: isHovered ? 1 : 2,
                repeat: Infinity,
                ease: "linear"
              }}
              opacity="0.6"
            />

            {/* Left Film Reel (Spinning) */}
            <motion.g
              animate={{ rotate: 360 }}
              transition={{ duration: isHovered ? 4 : 8, repeat: Infinity, ease: "linear" }}
              style={{ originX: "32px", originY: "28px" }}
            >
              {/* Reel Metal Flange */}
              <circle cx="32" cy="28" r="14" fill="url(#metalChrome)" filter="url(#metalSpecularBevel)" />
              <circle cx="32" cy="28" r="10" fill="#07090e" />
              {/* Inner details / spokes mapping */}
              <circle cx="32" cy="28" r="13" fill="none" stroke="url(#metalChrome)" strokeWidth="1" opacity="0.5" />
              <circle cx="32" cy="21" r="2" fill="url(#metalChrome)" />
              <circle cx="32" cy="35" r="2" fill="url(#metalChrome)" />
              <circle cx="39" cy="28" r="2" fill="url(#metalChrome)" />
              <circle cx="25" cy="28" r="2" fill="url(#metalChrome)" />
              {/* Center Axle Pin */}
              <circle cx="32" cy="28" r="3.5" fill="url(#metalChrome)" />
              <circle cx="32" cy="28" r="1" fill="#ffffff" />
            </motion.g>

            {/* Right Film Reel (Spinning) */}
            <motion.g
              animate={{ rotate: 360 }}
              transition={{ duration: isHovered ? 3 : 6, repeat: Infinity, ease: "linear" }}
              style={{ originX: "68px", originY: "32px" }}
            >
              {/* Reel Metal Flange */}
              <circle cx="68" cy="32" r="16" fill="url(#metalChrome)" filter="url(#metalSpecularBevel)" />
              <circle cx="68" cy="32" r="12" fill="#07090e" />
              {/* Inner details / spokes mapping */}
              <circle cx="68" cy="32" r="15" fill="none" stroke="url(#metalChrome)" strokeWidth="1" opacity="0.5" />
              <circle cx="68" cy="24" r="2.5" fill="url(#metalChrome)" />
              <circle cx="68" cy="40" r="2.5" fill="url(#metalChrome)" />
              <circle cx="60" cy="32" r="2.5" fill="url(#metalChrome)" />
              <circle cx="76" cy="32" r="2.5" fill="url(#metalChrome)" />
              {/* Center Axle Pin */}
              <circle cx="68" cy="32" r="4" fill="url(#metalChrome)" />
              <circle cx="68" cy="32" r="1.5" fill="#ffffff" />
            </motion.g>

            {/* Projector Body Piece */}
            <g filter="url(#metalSpecularBevel)">
              {/* Main metal casing housing */}
              <rect x="32" y="44" width="44" height="28" rx="4" fill="url(#metalChrome)" />
              {/* Top cooling grilles or decorative brand strip */}
              <line x1="58" y1="48" x2="70" y2="48" stroke="#07090e" strokeWidth="1.5" />
              <line x1="58" y1="52" x2="70" y2="52" stroke="#07090e" strokeWidth="1.5" />
              <rect x="38" y="48" width="14" height="6" rx="1.5" fill="url(#iceGlass)" stroke="#00f0ff" strokeWidth="0.5" />
            </g>

            {/* Projector Lens with Electric Cyan Iris light, pointing LEFT */}
            <g>
              <rect x="26" y="50" width="8" height="15" rx="1.5" fill="url(#metalChrome)" filter="url(#metalSpecularBevel)" />
              <ellipse cx="26" cy="57.5" rx="2" ry="7.5" fill="url(#electricIris)" className="drop-shadow-[0_0_5px_#00f0ff]" />
              <line x1="28" y1="52" x2="28" y2="63" stroke="#ffffff" strokeWidth="0.5" opacity="0.5" />
            </g>
          </g>
        )}

        {/* ----------------- TYPE 8: DESIGN-3D (Isometric CAD Wireframe / Stall modeling) ----------------- */}
        {type === "design-3d" && (
          <g>
            {/* Ambient Rotational Orbit Axis ring */}
            <motion.ellipse
              cx="50"
              cy="52"
              rx="42"
              ry="16"
              fill="none"
              stroke="url(#iceGlass)"
              strokeWidth="1"
              strokeDasharray="4 6"
              animate={{ rotate: isHovered ? 360 : 0 }}
              transition={{ duration: 16, repeat: isHovered ? Infinity : 0, ease: "linear" }}
              style={{ originX: "50px", originY: "52px" }}
              opacity="0.5"
            />

            {/* Blueprint Grid Lines & concentric guide circles */}
            <g opacity="0.25">
              <circle cx="50" cy="52" r="32" fill="none" stroke="#00f0ff" strokeWidth="0.5" />
              {/* Polar guidelines */}
              <line x1="10" y1="52" x2="90" y2="52" stroke="#00f0ff" strokeWidth="0.5" strokeDasharray="2 3" />
              <line x1="50" y1="12" x2="50" y2="92" stroke="#00f0ff" strokeWidth="0.5" strokeDasharray="2 3" />
            </g>

            {/* Exploded Top Face of isometric cube (floating up on hover) */}
            <motion.g
              animate={{
                y: isHovered ? -12 : -2,
                scale: isHovered ? [1, 1.03, 1] : 1
              }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <polygon
                points="50,22 72,32 50,42 28,32"
                fill="url(#iceGlass)"
                stroke="#00f0ff"
                strokeWidth="1.5"
                filter="url(#blueGlassGlow)"
                opacity="0.85"
              />
              <line x1="50" y1="22" x2="50" y2="42" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="0.75" />
              <line x1="28" y1="32" x2="72" y2="32" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="0.75" />
              
              {/* Vertex Anchor Nodes */}
              <circle cx="50" cy="22" r="2" fill="#ffffff" />
              <circle cx="28" cy="32" r="2" fill="#ffffff" />
              <circle cx="72" cy="32" r="2" fill="#ffffff" />
              <circle cx="50" cy="42" r="2" fill="#ffffff" />
            </motion.g>

            {/* Bottom-Stretched Base Structure (sliding down slightly on hover for exploded CAD feeling) */}
            <motion.g
              animate={{
                y: isHovered ? 4 : 0
              }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              {/* Left isometric wall */}
              <motion.polygon
                points="28,38 50,48 50,74 28,64"
                fill="url(#metalChrome)"
                stroke="#00f0ff"
                strokeWidth="1.25"
                filter="url(#metalSpecularBevel)"
                opacity="0.6"
                animate={{
                  strokeDashoffset: isHovered ? [0, -20] : 0,
                  opacity: isHovered ? [0.6, 0.9, 0.6] : 0.6,
                }}
                strokeDasharray="4 4"
                transition={{
                  duration: 2,
                  repeat: isHovered ? Infinity : 0,
                  ease: "linear"
                }}
              />
              {/* Right isometric wall */}
              <motion.polygon
                points="50,48 72,38 72,64 50,74"
                fill="url(#metalChrome)"
                stroke="#00f0ff"
                strokeWidth="1.25"
                filter="url(#metalSpecularBevel)"
                opacity="0.75"
                animate={{
                  strokeDashoffset: isHovered ? [0, 20] : 0,
                  opacity: isHovered ? [0.75, 1, 0.75] : 0.75,
                }}
                strokeDasharray="4 4"
                transition={{
                  duration: 2,
                  repeat: isHovered ? Infinity : 0,
                  ease: "linear"
                }}
              />

              {/* Central axis structural core pillar */}
              <line x1="50" y1="48" x2="50" y2="74" stroke="#ffffff" strokeWidth="1.5" />
              <circle cx="50" cy="48" r="2.5" fill="#00f0ff" className="drop-shadow-[0_0_3px_#00f0ff]" />
              <circle cx="50" cy="74" r="2.5" fill="#00f0ff" />
              
              {/* Corner nodes */}
              <circle cx="28" cy="64" r="2" fill="#00f0ff" />
              <circle cx="72" cy="64" r="2" fill="#00f0ff" />
            </motion.g>

            {/* 3D Cursor vertex controller handle (connecting coordinate bubble) */}
            <g opacity={isHovered ? 1 : 0.6}>
              <line
                x1="72"
                y1={isHovered ? 22 : 30}
                x2="85"
                y2="20"
                stroke="#00f0ff"
                strokeWidth="1"
                strokeDasharray="2 2"
              />
              <motion.g
                animate={{
                  y: isHovered ? -10 : 0
                }}
                transition={{ duration: 0.35 }}
              >
                <circle cx="85" cy="20" r="3.5" fill="url(#metalChrome)" stroke="#00f0ff" strokeWidth="1" />
                <circle cx="85" cy="20" r="1" fill="#00f0ff" />
              </motion.g>
            </g>

            {/* Small viewport orientation axis icon in corner */}
            <g opacity="0.4" transform="translate(14, 14)">
              <line x1="0" y1="0" x2="0" y2="-8" stroke="#ef4444" strokeWidth="1" /> {/* Y-axis (Red) */}
              <line x1="0" y1="0" x2="7" y2="4" stroke="#10b981" strokeWidth="1" />  {/* X-axis (Green) */}
              <line x1="0" y1="0" x2="-7" y2="4" stroke="#3b82f6" strokeWidth="1" /> {/* Z-axis (Blue) */}
              <circle cx="0" cy="0" r="1.5" fill="#ffffff" />
            </g>
          </g>
        )}

        {/* ----------------- TYPE 9: SHOP-3D (3D Storefront Blueprint & Architectural Branding) ----------------- */}
        {type === "shop-3d" && (
          <g>
            {/* Background 3D CAD grid planes */}
            <g opacity="0.25">
              <polygon points="12,74 50,93 88,74 50,55" fill="none" stroke="#00f0ff" strokeWidth="0.5" />
              <line x1="12" y1="74" x2="50" y2="55" stroke="#00f0ff" strokeWidth="0.5" />
              <line x1="88" y1="74" x2="50" y2="55" stroke="#00f0ff" strokeWidth="0.5" />
              <line x1="50" y1="93" x2="50" y2="55" stroke="#00f0ff" strokeWidth="0.5" />
              
              {/* Isometric grid divisions */}
              <line x1="21.5" y1="78.75" x2="59.5" y2="59.75" stroke="#00f0ff" strokeWidth="0.5" strokeDasharray="1 3" />
              <line x1="31" y1="83.5" x2="69" y2="64.5" stroke="#00f0ff" strokeWidth="0.5" strokeDasharray="1 3" />
              <line x1="40.5" y1="88.25" x2="78.5" y2="69.25" stroke="#00f0ff" strokeWidth="0.5" strokeDasharray="1 3" />

              <line x1="78.5" y1="78.75" x2="40.5" y2="59.75" stroke="#00f0ff" strokeWidth="0.5" strokeDasharray="1 3" />
              <line x1="69" y1="83.5" x2="31" y2="64.5" stroke="#00f0ff" strokeWidth="0.5" strokeDasharray="1 3" />
              <line x1="59.5" y1="88.25" x2="21.5" y2="69.25" stroke="#00f0ff" strokeWidth="0.5" strokeDasharray="1 3" />
            </g>

            {/* Ground shop floor platform (thick layered plate) */}
            <polygon
              points="18,72 50,88 82,72 50,56"
              fill="#091e3a"
              stroke="url(#iceGlass)"
              strokeWidth="1.5"
              filter="url(#blueGlassGlow)"
              opacity="0.8"
            />
            {/* Edge border matching deep metal finish */}
            <polygon
              points="18,72 50,88 50,91 18,75"
              fill="url(#metalChrome)"
              opacity="0.9"
            />
            <polygon
              points="50,88 82,72 82,75 50,91"
              fill="url(#metalChrome)"
              opacity="0.75"
            />

            {/* Glowing storefront window outlines & doorway */}
            <g opacity="0.85">
              {/* Left shop glass wall */}
              <polygon
                points="22,70 48,83 48,50 22,37"
                fill="none"
                stroke="#00f0ff"
                strokeWidth="0.75"
              />
              {/* Right shop glass wall */}
              <polygon
                points="52,83 78,70 78,37 52,50"
                fill="none"
                stroke="#00f0ff"
                strokeWidth="0.75"
              />
              {/* Glass window reflections (animating on hover) */}
              <motion.g
                initial={{ opacity: 0.4 }}
                animate={{
                  opacity: isHovered ? [0.4, 0.9, 0.4] : 0.4
                }}
                transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0 }}
              >
                <line
                  x1="26" y1="62" x2="44" y2="71"
                  stroke="url(#iceGlass)"
                  strokeWidth="1.5"
                />
              </motion.g>
              <motion.g
                initial={{ opacity: 0.4 }}
                animate={{
                  opacity: isHovered ? [0.4, 0.9, 0.4] : 0.4
                }}
                transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0, delay: 0.3 }}
              >
                <line
                  x1="56" y1="71" x2="74" y2="62"
                  stroke="url(#iceGlass)"
                  strokeWidth="1.5"
                />
              </motion.g>
            </g>

            {/* Isometric door frame (highlighted neon entrance) */}
            <motion.polygon
              points="44,79 56,85 56,58 44,52"
              fill="none"
              stroke="#00f0ff"
              strokeWidth="1.5"
              className="drop-shadow-[0_0_4px_#38bdf8]"
              animate={{
                opacity: isHovered ? [0.9, 0.6, 1, 0.8, 1] : 0.7
              }}
              transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
            />
            
            {/* Interactive floating branding Sign with custom logo/initial inside */}
            <motion.g
              animate={{
                y: isHovered ? -14 : -4
              }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
            >
              {/* 3D Signboard background on the roof structure */}
              <polygon
                points="30,36 50,46 70,36 50,26"
                fill="url(#metalChrome)"
                stroke="#00f0ff"
                strokeWidth="1"
                filter="url(#metalSpecularBevel)"
              />
              
              {/* Glowing BRAND neon sign (floating 'B' or '3D' design mark) */}
              <motion.g
                animate={{
                  scale: isHovered ? [1, 1.05, 1] : 1,
                  opacity: isHovered ? [0.8, 1, 0.8] : 0.8
                }}
                transition={{ duration: 2, repeat: isHovered ? Infinity : 0, ease: "easeInOut" }}
              >
                {/* Custom geometric logo mark (isometric shopping symbol or custom polygon branding badge) */}
                <polygon
                  points="45,36 50,38 55,36 50,33"
                  fill="url(#electricIris)"
                  stroke="#38bdf8"
                  strokeWidth="0.75"
                />
                
                {/* Supporting model construction cords & nodes */}
                <circle cx="45" cy="36" r="1.5" fill="#ffffff" />
                <circle cx="55" cy="36" r="1.5" fill="#ffffff" />
                <circle cx="50" cy="33" r="1.5" fill="#ffffff" />
                <circle cx="50" cy="38" r="1.5" fill="#ffffff" />
              </motion.g>
            </motion.g>

            {/* Glowing store awning/canopy (3D physical layout structure, floating and scaling on hover) */}
            <motion.g
              animate={{
                y: isHovered ? -8 : -2,
                scale: isHovered ? 1.03 : 1
              }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              style={{ originX: "50px", originY: "40px" }}
            >
              {/* Striped Store Canopy base */}
              <polygon
                points="24,42 50,55 76,42 50,29"
                fill="#07090e"
                stroke="url(#iceGlass)"
                strokeWidth="1"
              />
              
              {/* Canopy physical stripes/panels */}
              <polygon points="24,42 35,47.5 40,38.5 29,33" fill="url(#metalChrome)" opacity="0.8" />
              <polygon points="36,48 47,53.5 50,44.5 39,39" fill="url(#metalChrome)" opacity="0.8" />
              <polygon points="48,54 59,48.5 61,39.5 50,45" fill="url(#metalChrome)" opacity="0.85" />
              <polygon points="61,49.5 72,44 76,35 65,40.5" fill="url(#metalChrome)" opacity="0.8" />

              {/* Front edge glowing strip underawning */}
              <motion.polygon
                points="24,42 50,55 76,42 76,43.5 50,56.5 24,43.5"
                fill="url(#electricIris)"
                initial={{ opacity: 0.7 }}
                animate={{
                  opacity: isHovered ? [0.6, 1, 0.6] : 0.7
                }}
                transition={{ duration: 1.2, repeat: isHovered ? Infinity : 0 }}
              />
            </motion.g>

            {/* 3D coordinate coordinate handle overlay */}
            <g opacity={isHovered ? 1 : 0.3}>
              <line
                x1="50" y1="26"
                x2="50" y2={isHovered ? 6 : 12}
                stroke="#00f0ff"
                strokeWidth="1"
                strokeDasharray="2 2"
              />
              <motion.g
                animate={{ y: isHovered ? -4 : 0 }}
                transition={{ duration: 0.35 }}
              >
                <circle
                  cx="50"
                  cy="10"
                  r="3"
                  fill="url(#metalChrome)"
                  stroke="#38bdf8"
                  strokeWidth="1"
                />
              </motion.g>
            </g>
          </g>
        )}
      </svg>

      {/* Floating reflection/ambient flare strictly client-only visual effect */}
      {isHovered && (
        <span className="absolute inset-0 bg-linear-to-tr from-cyan-400/0 via-white/20 to-blue-500/0 rounded-full blur-sm pointer-events-none animate-pulse" />
      )}
    </div>
  );
};
