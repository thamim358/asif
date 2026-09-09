import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export type DeviceProfile = 'standard' | 'ios' | 'android';

interface DevicePreset {
  id: DeviceProfile;
  name: string;
  aspectClass: string;
  ratioWidth: number;
  ratioHeight: number;
  avif4k: string;
  avif: string;
  webp: string;
  // Dedicated Mobile Typography & Layout Specifications
  containerPadding: string;
  contentMaxW: string;
  bismillahArabic: string;
  bismillahEnglish: string;
  headerTheOf: string;
  headerEngagement: string;
  coupleName: string;
  ampersand: string;
  gregorianDate: string;
  hijriDate: string;
  quranVerse: string;
  quranSurah: string;
  gapClass: string;
  dividerWidth: string;
}

const DEVICE_PRESETS: Record<DeviceProfile, DevicePreset> = {
  ios: {
    id: 'ios',
    name: 'iPhone',
    aspectClass: 'aspect-[853/1844]',
    ratioWidth: 853,
    ratioHeight: 1844,
    avif4k: '/bg_iphone_4k.avif',
    avif: '/bg_iphone.avif',
    webp: '/bg_iphone.webp',
    // iPhone Mobile Specifications (optimized for 375px - 430px iPhone screens with 19.5:9 notch/island)
    containerPadding: 'pt-[8%] pb-[9%] px-[12%] sm:px-[14%]',
    contentMaxW: 'max-w-[290px] sm:max-w-[320px]',
    bismillahArabic: 'text-[17px] sm:text-[16px] leading-relaxed',
    bismillahEnglish: 'text-[13px] sm:text-[12px] tracking-[0.11em]',
    headerTheOf: 'text-[14px] sm:text-[13px] tracking-[0.22em]',
    headerEngagement: 'text-[17px] sm:text-[16px] tracking-[0.28em]',
    coupleName: 'text-[23px] sm:text-[23px] tracking-[0.14em] sm:tracking-[0.17em]',
    ampersand: 'text-[21px] sm:text-[21px]',
    gregorianDate: 'text-[13px] sm:text-[12px] tracking-[0.14em]',
    hijriDate: 'text-[14px] sm:text-[13px] tracking-[0.1em]',
    quranVerse: 'text-[17px] sm:text-[16px] leading-snug',
    quranSurah: 'text-[11px] sm:text-[10px] tracking-[0.2em]',
    gapClass: 'gap-1.5 sm:gap-2.5',
    dividerWidth: 'w-8 sm:w-11',
  },
  android: {
    id: 'android',
    name: 'Android',
    aspectClass: 'aspect-[841/1870]',
    ratioWidth: 841,
    ratioHeight: 1870,
    avif4k: '/bg_android_4k.avif',
    avif: '/bg_android.avif',
    webp: '/bg_android.webp',
    // Android Mobile Specifications (optimized for tall, slender 20:9 Android screens e.g. Samsung / Pixel)
    containerPadding: 'pt-[9%] pb-[9.5%] px-[14%] sm:px-[16%]',
    contentMaxW: 'max-w-[280px] sm:max-w-[310px]',
    bismillahArabic: 'text-[13.5px] sm:text-[14px] leading-relaxed',
    bismillahEnglish: 'text-[10px] sm:text-[10.5px] tracking-[0.1em]',
    headerTheOf: 'text-[11px] sm:text-[12px] tracking-[0.22em]',
    headerEngagement: 'text-[13px] sm:text-[14px] tracking-[0.26em]',
    coupleName: 'text-[18px] sm:text-[21px] tracking-[0.13em] sm:tracking-[0.16em]',
    ampersand: 'text-[16px] sm:text-[19px]',
    gregorianDate: 'text-[10px] sm:text-[11px] tracking-[0.13em]',
    hijriDate: 'text-[11px] sm:text-[12px] tracking-[0.1em]',
    quranVerse: 'text-[13.5px] sm:text-[14px] leading-snug',
    quranSurah: 'text-[8.5px] sm:text-[9px] tracking-[0.18em]',
    gapClass: 'gap-2 sm:gap-3',
    dividerWidth: 'w-7 sm:w-10',
  },
  standard: {
    id: 'standard',
    name: 'Desktop / Tablet',
    aspectClass: 'aspect-[941/1672]',
    ratioWidth: 941,
    ratioHeight: 1672,
    avif4k: '/bg_mobile_hd_4k.avif',
    avif: '/bg_mobile_hd.avif',
    webp: '/bg_mobile_hd.webp',
    // Standard Specifications
    containerPadding: 'pt-[8.5%] pb-[9%] px-[13%] sm:px-[16%]',
    contentMaxW: 'max-w-[330px] sm:max-w-[370px]',
    bismillahArabic: 'text-[13.5px] sm:text-[15.5px] leading-relaxed',
    bismillahEnglish: 'text-[9.5px] sm:text-[11px] tracking-[0.12em]',
    headerTheOf: 'text-[11px] sm:text-[12.5px] tracking-[0.24em]',
    headerEngagement: 'text-[13px] sm:text-[15px] tracking-[0.28em]',
    coupleName: 'text-[20px] sm:text-[25px] tracking-[0.15em] sm:tracking-[0.18em]',
    ampersand: 'text-[19px] sm:text-[23px]',
    gregorianDate: 'text-[10.5px] sm:text-[12px] tracking-[0.15em]',
    hijriDate: 'text-[11.5px] sm:text-[13px] tracking-[0.11em]',
    quranVerse: 'text-[13px] sm:text-[15px] leading-snug',
    quranSurah: 'text-[8.5px] sm:text-[10px] tracking-[0.22em]',
    gapClass: 'gap-2 sm:gap-3.5',
    dividerWidth: 'w-8 sm:w-12',
  },
};

interface Props {
  isRevealed?: boolean;
}

export function IslamicArchCard({ isRevealed = true }: Props) {
  const [profile, setProfile] = useState<DeviceProfile>('ios');

  // Detect device screen proportions & platform
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const detectProfile = () => {
      const ua = navigator.userAgent || '';
      const isIOS = /iPhone|iPad|iPod/i.test(ua);
      const isAndroid = /Android/i.test(ua);

      // Check URL query override if testing (?device=ios or ?device=android)
      const params = new URLSearchParams(window.location.search);
      const deviceParam = params.get('device');
      if (deviceParam === 'ios' || deviceParam === 'android' || deviceParam === 'standard') {
        setProfile(deviceParam as DeviceProfile);
        return;
      }

      // Check viewport dimensions
      const width = window.innerWidth || 390;
      const height = window.innerHeight || 844;
      const portraitRatio = Math.max(height, width) / Math.max(Math.min(height, width), 1);

      if (isIOS) {
        setProfile('ios');
      } else if (isAndroid) {
        setProfile('android');
      } else if (width <= 500) {
        // Mobile screen: differentiate by aspect ratio
        if (portraitRatio >= 2.0) {
          setProfile('android'); // Tall 20:9 ratio Android
        } else {
          setProfile('ios'); // Standard 19.5:9 ratio iPhone
        }
      } else {
        // Default to iPhone view on small-medium desktop frames, standard on wide
        setProfile(width <= 768 ? 'ios' : 'standard');
      }
    };

    detectProfile();
    window.addEventListener('resize', detectProfile);
    return () => window.removeEventListener('resize', detectProfile);
  }, []);

  const activePreset = DEVICE_PRESETS[profile];

  return (
    <div
      id="islamic-arch-card-wrapper"
      className="w-full max-w-full sm:max-w-[520px] md:max-w-[560px] mx-auto px-0 flex flex-col items-center select-none"
    >
      {/* 
        Container with device-tailored aspect ratio automatically detected.
        Full edge-to-edge layout with zero border space, zero side padding, and zero top gap.
      */}
      <div
        className={`relative w-full ${activePreset.aspectClass} flex items-center justify-center`}
      >
        {/* The Card Container - Sits flush at top and side edges */}
        <div
          id="islamic-arch-card-inner"
          className="relative w-full h-full rounded-none overflow-hidden bg-[#FFFDF9] transform-gpu"
        >
          {/* =========================================================
              4K AVIF BACKGROUND IMAGE (With WebP & standard AVIF fallback)
              Automatically loaded based on selected mobile specifications
              ========================================================= */}
          <picture className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <source srcSet={activePreset.avif4k} type="image/avif" />
            <source srcSet={activePreset.avif} type="image/avif" />
            <source srcSet={activePreset.webp} type="image/webp" />
            <img
              key={activePreset.id}
              src={activePreset.avif4k}
              alt="Luxury Islamic Wedding Invitation Card"
              className="w-full h-full object-cover object-top sm:object-center pointer-events-none transition-opacity duration-500"
              loading="eager"
            />
          </picture>

          {/* Gentle Center Lighting to Ensure Crisp Contrast on Any Screen */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.45)_0%,transparent_65%)] z-10" />

          {/* =========================================================
              INVITATION CONTENT CENTERED IN THE SAFE INTERIOR ZONE
              Configured strictly according to the active mobile device preset
              ========================================================= */}
          <div
            className={`relative inset-0 z-20 flex flex-col items-center justify-center text-center ${activePreset.containerPadding} overflow-hidden ${activePreset.gapClass} h-full`}
          >
            {/* Center Candlelight Warm Glow behind Names (Continuous Ambient Pulse) */}
            <motion.div
              animate={{
                opacity: [0.35, 0.7, 0.35],
                scale: [0.96, 1.04, 0.96],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-72 sm:h-72 rounded-full pointer-events-none -z-1"
              style={{
                background:
                  'radial-gradient(circle, rgba(255, 250, 230, 0.9) 0%, rgba(248, 235, 205, 0.4) 45%, transparent 72%)',
              }}
            />

            {/* 1. BISMILLAH CALLIGRAPHY & TOP SEPARATOR (Moved to top with generous spacing) */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: 1.8, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className={`w-full flex flex-col items-center justify-center ${activePreset.contentMaxW} mx-auto px-2 mb-1.5 sm:mb-2.5 -mt-1 sm:-mt-1.5`}
            >
              <p
                dir="rtl"
                className={`font-arabic ${activePreset.bismillahArabic} text-[#2E070F] tracking-wider font-bold drop-shadow-[0_1px_2px_rgba(255,255,255,0.95)] mb-2 sm:mb-3`}
              >
                بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
              </p>
              <p
                className={`font-luxury italic ${activePreset.bismillahEnglish} text-[#5C1A25] mx-auto leading-normal font-medium mb-2.5 sm:mb-3.5`}
              >
                In the Name of Allah, the Most Gracious, the Most Merciful
              </p>

              {/* The Royal Separator at Top: Red Wine & Gold Diamond */}
              <div className="flex items-center justify-center gap-2 mt-0.5 sm:mt-1">
                <div
                  className={`${activePreset.dividerWidth} h-[1px] bg-gradient-to-r from-transparent to-[#721B29]/45`}
                />
                <div className="w-1.5 h-1.5 rotate-45 border border-[#B38327] bg-[#721B29]" />
                <div
                  className={`${activePreset.dividerWidth} h-[1px] bg-gradient-to-l from-transparent to-[#721B29]/45`}
                />
              </div>
            </motion.div>

            {/* 2. HEADER: "the ENGAGEMENT of" */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
              transition={{ duration: 1.8, delay: 1.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center px-2 mt-1 sm:mt-1.5"
            >
              <span className={`font-luxury italic ${activePreset.headerTheOf} text-[#7A4952]`}>
                the
              </span>
              <h2
                className={`font-cinzel ${activePreset.headerEngagement} text-[#3D141C] uppercase font-bold my-0.5`}
              >
                Engagement
              </h2>
              <span className={`font-luxury italic ${activePreset.headerTheOf} text-[#7A4952]`}>
                of
              </span>
            </motion.div>

            {/* 3. COUPLE NAMES: Stacked Vertically with dedicated device padding */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: 2.0, delay: 2.0, ease: [0.16, 1, 0.3, 1] }}
              className={`flex flex-col items-center w-full my-0.5 px-3 ${activePreset.contentMaxW} mx-auto`}
            >
              <h1
                className={`font-cinzel ${activePreset.coupleName} text-[#541421] font-bold uppercase leading-tight drop-shadow-[0_1px_2px_rgba(255,255,255,0.95)]`}
              >
                Thamim Ansari
              </h1>

              <div className="flex items-center justify-center my-0.5 sm:my-1">
                <span
                  className={`font-luxury italic ${activePreset.ampersand} text-[#721B29] font-normal leading-none`}
                >
                  &amp;
                </span>
              </div>

              <h1
                className={`font-cinzel ${activePreset.coupleName} text-[#541421] font-bold uppercase leading-tight drop-shadow-[0_1px_2px_rgba(255,255,255,0.95)] mb-1 sm:mb-1.5`}
              >
                Nihal
              </h1>

              {/* Gregorian Event Date */}
              <div className="flex flex-col items-center mt-2.5 sm:mt-3.5 gap-1.5 sm:gap-2 text-center px-2 mb-1 sm:mb-1.5">
                <p
                  className={`font-cinzel ${activePreset.gregorianDate} text-[#4A0D17] font-bold uppercase drop-shadow-[0_1px_1px_rgba(255,255,255,0.85)]`}
                >
                  Saturday, 26 September 2026
                </p>
                {/* Islamic Hijri Date - Vertically Stacked Below */}
                <p
                  className={`font-luxury italic ${activePreset.hijriDate} text-[#5A1421] font-bold drop-shadow-[0_1px_1px_rgba(255,255,255,0.85)]`}
                >
                  14 Rabi&apos; al-Awwal 1448 AH
                </p>
              </div>
            </motion.div>

            {/* 4. QURANIC VERSE with generous left/right breathing space */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
              transition={{ duration: 2.0, delay: 2.3, ease: [0.16, 1, 0.3, 1] }}
              className={`w-full flex flex-col items-center px-3 ${activePreset.contentMaxW} mx-auto`}
            >
              <p
                className={`font-luxury italic ${activePreset.quranVerse} text-[#721B29] font-semibold drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]`}
              >
                “And We created you in pairs”
              </p>
              <p
                className={`font-cinzel ${activePreset.quranSurah} text-[#80424D] mt-0.5 uppercase font-semibold`}
              >
                Surah An-Naba (78 : 8)
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
