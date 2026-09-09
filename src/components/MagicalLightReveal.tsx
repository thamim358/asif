import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface Props {
  onComplete: () => void;
}

export function MagicalLightReveal({ onComplete }: Props) {
  // Reveal steps: 1: dark (0-500ms), 2: point of light (500-1400ms), 3: expanding glow & flare (1400-2400ms), 4: warm ivory wash into website (2400-3400ms)
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(2), 350);
    const t2 = setTimeout(() => setStep(3), 1100);
    const t3 = setTimeout(() => setStep(4), 2100);
    const t4 = setTimeout(() => {
      onComplete();
    }, 3200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  return (
    <div
      id="magical-light-reveal-overlay"
      className="fixed inset-0 z-50 pointer-events-none overflow-hidden select-none"
    >
      {/* 1. Base Dark Fading Layer */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: step === 4 ? 0 : 1 }}
        transition={{ duration: 1.1, ease: 'easeInOut' }}
        className="absolute inset-0 bg-[#0C0A08]"
      />

      {/* 2. Golden Center Point & Expanding Radiant Light */}
      {step >= 2 && (
        <motion.div
          initial={{ scale: 0.1, opacity: 0 }}
          animate={{
            scale: step === 2 ? 1 : step === 3 ? 4.5 : 12,
            opacity: step === 4 ? 0 : 1,
          }}
          transition={{
            duration: step === 2 ? 0.9 : 1.4,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(255,250,240,0.98) 0%, rgba(201,168,106,0.85) 30%, rgba(217,184,174,0.45) 60%, rgba(201,168,106,0) 80%)',
            filter: 'blur(12px)',
          }}
        />
      )}

      {/* 3. Subtle Lens Flare & Champagne Glow */}
      {step >= 3 && (
        <>
          {/* Soft Radial Ambient Aura */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: step === 4 ? 0 : 0.45, scale: 2.2 }}
            transition={{ duration: 1.3 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-radial from-[#FFFDF9]/40 via-[#E8D9C0]/20 to-transparent blur-xl"
          />
        </>
      )}

      {/* 4. Glowing Particles / Sparkles Spreading Outward */}
      {step >= 2 && (
        <div className="absolute inset-0">
          {Array.from({ length: 32 }).map((_, i) => {
            const angle = (i / 32) * Math.PI * 2;
            const distance = 140 + (i % 6) * 55;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            const size = 2 + (i % 3) * 1.5;

            return (
              <motion.div
                key={i}
                initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                animate={{
                  x: x * (step >= 3 ? 2.5 : 1),
                  y: y * (step >= 3 ? 2.5 : 1),
                  opacity: step === 4 ? 0 : [0, 0.9, 0.5],
                  scale: [0, 1.3, 0.8],
                }}
                transition={{
                  duration: 1.8,
                  delay: i * 0.02,
                  ease: 'easeOut',
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFF5E1]"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  boxShadow: '0 0 10px rgba(201, 168, 106, 0.8)',
                }}
              />
            );
          })}
        </div>
      )}

      {/* 5. Warm Ivory Light Wash that transitions into the actual website */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: step === 3 ? 0.35 : step === 4 ? 1 : 0 }}
        transition={{ duration: 0.9, ease: 'easeInOut' }}
        className="absolute inset-0 bg-gradient-to-b from-[#FFFDF9] via-[#F8F4EE] to-[#F3EDE2]"
      />
    </div>
  );
}
