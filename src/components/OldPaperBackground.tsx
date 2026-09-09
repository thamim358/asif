import React from 'react';

/**
 * OldPaperBackground
 * 
 * Ultra-Light, Radiant Golden Ivory & Sunlit Parchment
 * - Significantly lighter palette with pristine sunlit cream & warm ivory
 * - Fully GPU-accelerated without heavy SVG filter loops to ensure 60/120fps buttery-smooth scrolling
 *   with zero screen-tearing or breaking artifacts on mobile & desktop.
 */
export function OldPaperBackground() {
  return (
    <div
      id="old-paper-palette-background"
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none will-change-transform"
      style={{
        transform: 'translate3d(0, 0, 0)',
        backfaceVisibility: 'hidden',
      }}
    >
      {/* 1. Base Tone: Ultra-light sunlit warm ivory parchment */}
      <div className="absolute inset-0 bg-[#FFFDF9]" />

      {/* 2. Primary Radiant Radial Gradient: Clean, bright, airy center radiating into soft ivory */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              ellipse 95% 85% at 50% 32%,
              #FFFFFF 0%,
              #FFFDF9 28%,
              #FAF6EE 55%,
              #F6EFE2 78%,
              #F0E5D3 100%
            )
          `,
        }}
      />

      {/* 3. Luminous Golden Sunlight Center Bloom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(255, 255, 255, 0.85) 0%, rgba(255, 250, 238, 0.45) 50%, transparent 80%)',
        }}
      />

      {/* 4. Ultra-delicate warm golden edge whisper (extremely light and unobtrusive) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(180deg, rgba(235, 215, 185, 0.18) 0%, transparent 12%, transparent 88%, rgba(235, 215, 185, 0.22) 100%),
            linear-gradient(90deg, rgba(235, 215, 185, 0.15) 0%, transparent 10%, transparent 90%, rgba(235, 215, 185, 0.15) 100%)
          `,
        }}
      />

      {/* 5. Delicate Golden Diamond Watermark Accents (lightweight, zero scroll lag) */}
      <div
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle 1.5px at 15% 20%, rgba(180, 135, 60, 0.28) 0%, transparent 100%),
            radial-gradient(circle 2px at 85% 25%, rgba(180, 135, 60, 0.25) 0%, transparent 100%),
            radial-gradient(circle 1.5px at 20% 75%, rgba(180, 135, 60, 0.25) 0%, transparent 100%),
            radial-gradient(circle 2px at 80% 80%, rgba(180, 135, 60, 0.25) 0%, transparent 100%)
          `,
        }}
      />
    </div>
  );
}
