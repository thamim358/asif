import React from 'react';

/**
 * OldPaperBackground
 * 
 * Lighter, radiant antique parchment using the requested 4-color palette:
 * - Center (Even Lighter): Luminous sunlit cream bloom (#FFFDF8 -> #FAF3E6)
 * - Inner Field:   🤍 Light Cream   #F6E1C2 (246, 225, 194)
 * - Midtone Ring:  🥂 Soft Ivory     #F2D7B3 (242, 215, 179)
 * - Outer Field:   🌟 Warm Beige     #EDCB9E (237, 203, 158)
 * - Outer Border:  🟤 Antique Beige  #E2B780 (226, 183, 128)
 */
export function OldPaperBackground() {
  return (
    <div
      id="old-paper-palette-background"
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* 1. Base Tone: Ultra-light warm ivory parchment */}
      <div className="absolute inset-0 bg-[#FAF3E6]" />

      {/* 2. Primary Radial Gradient: Even Lighter Center radiating outward through the 4-color palette */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              ellipse 88% 80% at 50% 36%,
              #FFFDF8 0%,
              #FAF3E6 24%,
              #F6E1C2 52%,
              #F2D7B3 72%,
              #EDCB9E 88%,
              #E2B780 100%
            )
          `,
        }}
      />

      {/* 3. Soft, Luminous Antique Beige (#E2B780) Perimeter Border Washes */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            /* Top & bottom gentle edge wash in Antique Beige */
            linear-gradient(180deg, rgba(226, 183, 128, 0.42) 0%, rgba(226, 183, 128, 0) 14%, rgba(226, 183, 128, 0) 86%, rgba(226, 183, 128, 0.48) 100%),
            /* Left & right gentle edge wash in Antique Beige */
            linear-gradient(90deg, rgba(226, 183, 128, 0.38) 0%, rgba(226, 183, 128, 0) 12%, rgba(226, 183, 128, 0) 88%, rgba(226, 183, 128, 0.38) 100%),
            /* Corner vintage warmth in Antique Beige (#E2B780) & Warm Beige (#EDCB9E) */
            radial-gradient(circle 460px at 0% 0%, rgba(226, 183, 128, 0.48) 0%, rgba(237, 203, 158, 0.22) 45%, transparent 72%),
            radial-gradient(circle 460px at 100% 0%, rgba(226, 183, 128, 0.46) 0%, rgba(237, 203, 158, 0.22) 45%, transparent 72%),
            radial-gradient(circle 520px at 0% 100%, rgba(226, 183, 128, 0.52) 0%, rgba(237, 203, 158, 0.25) 48%, transparent 74%),
            radial-gradient(circle 520px at 100% 100%, rgba(226, 183, 128, 0.52) 0%, rgba(237, 203, 158, 0.25) 48%, transparent 74%)
          `,
        }}
      />

      {/* 4. Soft Feathery Inset Border Framing in 🟤 Antique Beige (#E2B780) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: `
            inset 0 0 35px 8px rgba(226, 183, 128, 0.38),
            inset 0 0 95px 28px rgba(226, 183, 128, 0.26),
            inset 0 0 170px 65px rgba(237, 203, 158, 0.16)
          `,
        }}
      />

      {/* 5. Delicate Handmade Paper Texture Grain (very subtle 11% opacity for clean lightness) */}
      <svg
        className="absolute inset-0 w-full h-full opacity-11 mix-blend-multiply pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="lightPaperGrain" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.04 0.035"
            numOctaves="4"
            stitchTiles="stitch"
            result="fiberNoise"
          />
          <feColorMatrix
            type="matrix"
            values="
              0.85 0    0    0  0.72
              0    0.78 0    0  0.64
              0    0    0.55 0  0.42
              0    0    0    0.25 0"
            result="ivoryBeigeTint"
          />
          <feBlend in="SourceGraphic" in2="ivoryBeigeTint" mode="multiply" />
        </filter>
        <rect width="100%" height="100%" filter="url(#lightPaperGrain)" fill="#FAF3E6" />
      </svg>

      {/* 6. Soft Flecks in Antique Beige Tone */}
      <div
        className="absolute inset-0 opacity-14 mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle 2px at 15% 18%, rgba(226, 183, 128, 0.6) 0%, transparent 100%),
            radial-gradient(circle 2.5px at 85% 24%, rgba(226, 183, 128, 0.55) 0%, transparent 100%),
            radial-gradient(circle 1.5px at 18% 75%, rgba(226, 183, 128, 0.6) 0%, transparent 100%),
            radial-gradient(circle 2.5px at 82% 80%, rgba(226, 183, 128, 0.55) 0%, transparent 100%),
            radial-gradient(circle 3px at 50% 92%, rgba(237, 203, 158, 0.35) 0%, transparent 100%),
            radial-gradient(circle 2px at 8% 50%, rgba(226, 183, 128, 0.5) 0%, transparent 100%),
            radial-gradient(circle 2px at 92% 55%, rgba(226, 183, 128, 0.5) 0%, transparent 100%)
          `,
        }}
      />

      {/* 7. Extra Radiant Center Glow (Keeps the core bright, open, and luminous) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_78%_58%_at_50%_35%,rgba(255,255,255,0.72)_0%,rgba(255,255,255,0.25)_46%,transparent_78%)] pointer-events-none" />
    </div>
  );
}
