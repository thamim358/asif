import { useEffect } from 'react';
import { motion } from 'motion/react';

interface Props {
  onComplete?: () => void;
}

/**
 * FullCoverGlowReveal
 * 
 * Exact user sequence:
 * 1. center: Radiant warm golden-white light originates at the center
 * 2. slower glowing cover the page: Smoothly and slowly expands from center to cover the entire page
 * 3. fade: The glow softly and slowly fades out to transparent
 * 
 * Strictly no stars, no shockwave rings, and no sideway lights. Pure, slow, smooth light only.
 */
export function FullCoverGlowReveal({ onComplete }: Props) {
  useEffect(() => {
    // Slower, majestic sequence completes at 4.0 seconds
    const timer = setTimeout(() => {
      onComplete?.();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      id="full-cover-glow-reveal"
      className="fixed inset-0 z-[60] pointer-events-none overflow-hidden flex items-center justify-center select-none"
    >
      {/* 1. Full-Screen Atmospheric Soft Golden Wash */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 0.95, 0.75, 0],
        }}
        transition={{
          duration: 3.9,
          times: [0, 0.42, 0.68, 1],
          ease: [0.16, 1, 0.3, 1],
        }}
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(255, 252, 240, 1) 0%, rgba(250, 226, 165, 0.9) 45%, rgba(212, 163, 66, 0.4) 75%, transparent 100%)',
          mixBlendMode: 'screen',
        }}
      />

      {/* 2. Pure Center Radiant Light: Expands slowly and smoothly from center to full cover, then fades */}
      <motion.div
        initial={{ scale: 0.05, opacity: 0 }}
        animate={{
          scale: [0.05, 1.4, 3.8],
          opacity: [0, 1, 0.85, 0],
        }}
        transition={{
          duration: 3.9,
          times: [0, 0.4, 0.65, 1],
          ease: [0.16, 1, 0.3, 1],
        }}
        className="absolute w-[92vmax] h-[92vmax] rounded-full"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 1) 0%, rgba(255, 246, 215, 0.95) 25%, rgba(245, 210, 130, 0.75) 50%, rgba(218, 170, 75, 0.3) 72%, transparent 90%)',
          mixBlendMode: 'screen',
        }}
      />
    </div>
  );
}

