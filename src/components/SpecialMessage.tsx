import { motion } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';

export function SpecialMessage() {
  return (
    <section
      id="special-message-section"
      className="relative py-28 sm:py-36 px-6 max-w-4xl mx-auto text-center"
    >
      {/* Soft Glowing Ambient Background Circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 sm:w-[500px] h-96 sm:h-[500px] rounded-full bg-[#E8C5BE]/20 blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 glass-luxury rounded-3xl p-8 sm:p-14 border border-[#D9B8AE]/40 shadow-[0_12px_36px_rgba(217,184,174,0.15)]"
      >
        {/* Golden Sparkle Crest */}
        <div className="flex items-center justify-center gap-3 mb-6 text-[#C9A86A]">
          <Sparkles className="w-4 h-4 animate-pulse" />
          <Heart className="w-5 h-5 text-[#D9B8AE] fill-[#D9B8AE]/30" />
          <Sparkles className="w-4 h-4 animate-pulse" />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="font-cinzel text-xs tracking-[0.35em] text-[#C9A86A] uppercase font-medium mb-4"
        >
          With Warmth & Gratitude
        </motion.p>

        {/* Main Emotional Message */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: 0.15 }}
          className="font-luxury text-3xl sm:text-4xl md:text-5xl text-[#2C231A] font-light leading-snug tracking-wide"
        >
          “Your presence will make our celebration even more special.”
        </motion.h3>

        <p className="mt-6 font-luxury text-lg sm:text-xl text-[#635345] italic max-w-xl mx-auto leading-relaxed">
          As we take this sacred step together toward a lifetime of shared dreams and devotion, having you by our side fills our hearts with immense joy and gratitude.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <div className="w-10 h-[1px] bg-[#C9A86A]/40" />
          <span className="font-luxury text-xl text-[#C9A86A] italic">Thamim & Nihal</span>
          <div className="w-10 h-[1px] bg-[#C9A86A]/40" />
        </div>
      </motion.div>
    </section>
  );
}
