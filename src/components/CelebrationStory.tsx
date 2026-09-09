import { motion } from 'motion/react';

export function CelebrationStory() {
  return (
    <section
      id="celebration-story-section"
      className="relative py-28 sm:py-36 px-6 max-w-4xl mx-auto text-center"
    >
      {/* Decorative Gold Top Ornament */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.0 }}
        className="flex items-center justify-center gap-3 mb-6"
      >
        <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#C9A86A]" />
        <svg className="w-5 h-5 text-[#C9A86A]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" />
        </svg>
        <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#C9A86A]" />
      </motion.div>

      {/* Section Sub-eyebrow */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, delay: 0.1 }}
        className="font-cinzel text-xs tracking-[0.3em] text-[#C9A86A] uppercase mb-4"
      >
        Our Celebration
      </motion.p>

      {/* Main Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="font-luxury text-4xl sm:text-5xl md:text-6xl text-[#2C231A] font-light tracking-wide mb-8"
      >
        A Beautiful Beginning
      </motion.h2>

      {/* Romantic Quote */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.1, delay: 0.35 }}
        className="relative max-w-2xl mx-auto px-4 sm:px-8 py-8 glass-luxury rounded-2xl border border-[#C9A86A]/20 shadow-sm"
      >
        <p className="font-luxury text-2xl sm:text-3xl text-[#4A3D31] italic leading-relaxed font-light">
          “Two hearts, two families, and one beautiful journey ahead.”
        </p>

        <div className="mt-6 flex items-center justify-center gap-2 text-[#C9A86A]/70 text-sm">
          <span>✧</span>
          <span className="font-sans-clean text-[11px] tracking-[0.25em] uppercase text-[#806D5E]">
            United in Love & Harmony
          </span>
          <span>✧</span>
        </div>
      </motion.div>
    </section>
  );
}
