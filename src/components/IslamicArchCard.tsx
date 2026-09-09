import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export type DeviceProfile = 'ios' | 'android' | 'standard';

interface DevicePreset {
  id: DeviceProfile;
  aspectClass: string;
  ratioWidth: number;
  ratioHeight: number;
  avif4k: string;
  avif: string;
  webp: string;
}

const DEVICE_PRESETS: Record<DeviceProfile, DevicePreset> = {
  ios: {
    id: 'ios',
    aspectClass: 'aspect-[853/1844]',
    ratioWidth: 853,
    ratioHeight: 1844,
    avif4k: '/bg_iphone_4k.avif',
    avif: '/bg_iphone.avif',
    webp: '/bg_iphone.webp',
  },
  android: {
    id: 'android',
    aspectClass: 'aspect-[841/1870]',
    ratioWidth: 841,
    ratioHeight: 1870,
    avif4k: '/bg_android_4k.avif',
    avif: '/bg_android.avif',
    webp: '/bg_android.webp',
  },
  standard: {
    id: 'standard',
    aspectClass: 'aspect-[941/1672]',
    ratioWidth: 941,
    ratioHeight: 1672,
    avif4k: '/bg_mobile_hd_4k.avif',
    avif: '/bg_mobile_hd.avif',
    webp: '/bg_mobile_hd.webp',
  },
};

export function IslamicArchCard() {
  const [profile, setProfile] = useState<DeviceProfile>('standard');

  // Silently detect device screen proportions & platform behind the scenes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const detectProfile = () => {
      const ua = navigator.userAgent || '';
      const isIOS = /iPhone|iPad|iPod/i.test(ua);
      const isAndroid = /Android/i.test(ua);

      // Evaluate physical screen & window aspect ratio
      const width = window.innerWidth || 390;
      const height = window.innerHeight || 844;
      const portraitRatio = Math.max(height, width) / Math.max(Math.min(height, width), 1);

      if (isIOS) {
        setProfile('ios');
      } else if (isAndroid) {
        setProfile('android');
      } else if (portraitRatio >= 2.02) {
        // Ultra-tall Android screen (20:9 or 21:9)
        setProfile('android');
      } else if (portraitRatio >= 1.85) {
        // Modern smartphone screen (19.5:9)
        setProfile('ios');
      } else {
        // Standard mobile / tablet / desktop viewport
        setProfile('standard');
      }
    };

    detectProfile();
    window.addEventListener('resize', detectProfile);
    return () => window.removeEventListener('resize', detectProfile);
  }, []);

  const activePreset = DEVICE_PRESETS[profile];

  return (
    <div
      id="islamic-arch-invitation-container"
      className="relative w-full max-w-full sm:max-w-[500px] md:max-w-[560px] mx-auto px-0 mt-0 mb-4 select-none"
    >
      {/* =========================================================
          4K MOBILE INVITATION CARD FRAME
          Preserves exact natural mobile ratio with zero distortion,
          in full width edge-to-edge without top, left, or right spacing
          ========================================================= */}
      <div className="relative w-full overflow-visible">
        {/* Living Glow Effect on desktop */}
        <motion.div
          animate={{
            opacity: [0.45, 0.75, 0.45],
            scale: [0.985, 1.02, 0.985],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -inset-2 sm:-inset-4 rounded-none sm:rounded-[2.6rem] pointer-events-none -z-20 hidden sm:block"
          style={{
            background:
              'radial-gradient(ellipse at 50% 45%, rgba(201, 160, 72, 0.38) 0%, rgba(114, 27, 41, 0.3) 45%, rgba(88, 20, 31, 0.12) 70%, transparent 85%)',
            filter: 'blur(30px)',
          }}
        />

        {/* Card Main Shell - Full width edge-to-edge with 0 spacing on left, right, and top */}
        <div
          className={`relative w-full ${activePreset.aspectClass} rounded-none sm:rounded-[2.4rem] shadow-[0_25px_60px_-15px_rgba(114,27,41,0.24),0_10px_25px_-5px_rgba(45,34,22,0.12)] border-x-0 sm:border-x-2 border-t-0 sm:border-t-2 border-b-2 sm:border-b-2 border-[#E7D6BE] overflow-hidden bg-[#FAF6EE] z-10`}
        >
          {/* =========================================================
              4K AVIF BACKGROUND IMAGE (With WebP & standard AVIF fallback)
              Automatically loaded based on device specifications
              ========================================================= */}
          <picture className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <source srcSet={activePreset.avif4k} type="image/avif" />
            <source srcSet={activePreset.avif} type="image/avif" />
            <source srcSet={activePreset.webp} type="image/webp" />
            <img
              src={activePreset.avif4k}
              alt="Luxury Islamic Wedding Invitation Card"
              className="w-full h-full object-cover object-top sm:object-center pointer-events-none transition-opacity duration-700"
              loading="eager"
            />
          </picture>

          {/* Gentle Center Lighting to Ensure Crisp Contrast on Any Screen */}
          <div className="absolute inset-0 pointer-events-none bg-radial-[at_50%_50%] from-white/35 via-transparent to-black/10 z-10" />

          {/* =========================================================
              REALISTIC LIGHT SHEEN (Subtle specular light sweep)
              Gently sweeps across the gold and parchment surface
              ========================================================= */}
          <motion.div
            initial={{ x: '-130%', opacity: 0 }}
            animate={{
              x: ['-130%', '140%'],
              opacity: [0, 0.35, 0.55, 0.25, 0],
            }}
            transition={{
              duration: 3,
              delay: 1.4,
              ease: [0.25, 1, 0.5, 1],
              repeat: Infinity,
              repeatDelay: 9,
            }}
            className="absolute inset-y-0 w-1/2 pointer-events-none z-15 rotate-12"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, rgba(255, 252, 240, 0.45) 50%, transparent 100%)',
              filter: 'blur(10px)',
            }}
          />

          {/* =========================================================
              INVITATION CONTENT CENTERED IN THE SAFE INTERIOR ZONE
              Gracefully spaced vertical typographic rhythm
              ========================================================= */}
          <div className="relative inset-0 z-20 flex flex-col items-center justify-center text-center pt-[19%] pb-[13%] px-[8%] sm:px-[12%] overflow-hidden gap-2.5 sm:gap-3.5 h-full">
            {/* Center Candlelight Warm Glow behind Names */}
            <motion.div
              animate={{
                opacity: [0.35, 0.65, 0.35],
                scale: [0.98, 1.02, 0.98],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full pointer-events-none -z-1"
              style={{
                background:
                  'radial-gradient(circle, rgba(255, 250, 230, 0.85) 0%, rgba(248, 235, 205, 0.35) 45%, transparent 70%)',
                filter: 'blur(16px)',
              }}
            />

            {/* 1. BISMILLAH CALLIGRAPHY (Crisp, Top-Centered) */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex flex-col items-center justify-center max-w-[240px] sm:max-w-[270px] mx-auto"
            >
              <p
                dir="rtl"
                className="font-arabic text-xs sm:text-sm md:text-base text-[#2E070F] tracking-wider leading-relaxed font-bold drop-shadow-[0_1px_2px_rgba(255,255,255,0.95)]"
              >
                بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
              </p>
              <p className="font-luxury italic text-[8.5px] sm:text-[9.5px] text-[#5C1A25] tracking-[0.14em] mt-1 max-w-[220px] mx-auto leading-normal font-medium">
                In the Name of Allah, the Most Gracious, the Most Merciful
              </p>
            </motion.div>

            {/* 2. HEADER: "the ENGAGEMENT of" */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center"
            >
              <span className="font-luxury italic text-[11px] sm:text-[12px] text-[#7A4952] tracking-[0.25em]">
                the
              </span>
              <h2 className="font-cinzel text-xs sm:text-sm md:text-base tracking-[0.32em] text-[#3D141C] uppercase font-bold my-0.5 sm:my-1">
                Engagement
              </h2>
              <span className="font-luxury italic text-[11px] sm:text-[12px] text-[#7A4952] tracking-[0.25em]">
                of
              </span>
            </motion.div>

            {/* 3. COUPLE NAMES: Stacked Vertically */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center w-full my-0.5"
            >
              <h1 className="font-cinzel text-xl sm:text-2xl md:text-3xl tracking-[0.18em] sm:tracking-[0.24em] text-[#541421] font-bold uppercase leading-tight drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)]">
                Thamim Ansari
              </h1>

              {/* Elegant Ampersand with pleasant vertical breathing space */}
              <div className="flex items-center justify-center my-1 sm:my-1.5">
                <span className="font-luxury italic text-lg sm:text-xl md:text-2xl text-[#721B29] font-normal leading-none">
                  &amp;
                </span>
              </div>

              <h1 className="font-cinzel text-xl sm:text-2xl md:text-3xl tracking-[0.18em] sm:tracking-[0.24em] text-[#541421] font-bold uppercase leading-tight drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)]">
                Nihal
              </h1>

              {/* Auspicious Date in Good Contrast Color - Vertical Layout */}
              <div className="flex flex-col items-center mt-2 sm:mt-2.5 gap-0.5 sm:gap-1 text-center">
                <p className="font-cinzel text-[9.5px] sm:text-[11px] text-[#4A0D17] font-bold tracking-[0.16em] uppercase drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
                  Saturday, 26 September 2026
                </p>
                {/* Islamic Hijri Date - Vertically Stacked Below */}
                <p className="font-luxury italic text-[10px] sm:text-[11.5px] text-[#5A1421] font-bold tracking-[0.12em] drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
                  14 Rabi&apos; al-Awwal 1448 AH
                </p>
              </div>
            </motion.div>

            {/* Subtle Divider with Red Wine & Gold Diamond */}
            <div className="flex items-center justify-center gap-2 my-0.5 sm:my-1">
              <div className="w-8 sm:w-12 h-[1px] bg-gradient-to-r from-transparent to-[#721B29]/40" />
              <div className="w-1.5 h-1.5 rotate-45 border border-[#B38327] bg-[#721B29]" />
              <div className="w-8 sm:w-12 h-[1px] bg-gradient-to-l from-transparent to-[#721B29]/40" />
            </div>

            {/* 4. QURANIC VERSE */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex flex-col items-center"
            >
              <p className="font-luxury italic text-xs sm:text-sm md:text-base text-[#42151D] font-medium leading-snug px-1 drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]">
                “And We created you in pairs”
              </p>
              <p className="font-cinzel text-[8.5px] sm:text-[9.5px] tracking-[0.24em] text-[#80424D] mt-1 uppercase font-medium">
                Surah An-Naba (78 : 8)
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
