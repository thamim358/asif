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
    containerPadding: 'pt-[16.5%] pb-[10%] px-[12%] sm:px-[14%]',
    contentMaxW: 'max-w-[290px] sm:max-w-[320px]',
    bismillahArabic: 'text-[12.5px] sm:text-[14px] leading-relaxed',
    bismillahEnglish: 'text-[9px] sm:text-[10px] tracking-[0.11em]',
    headerTheOf: 'text-[10.5px] sm:text-[11.5px] tracking-[0.22em]',
    headerEngagement: 'text-[12px] sm:text-[13.5px] tracking-[0.28em]',
    coupleName: 'text-[19px] sm:text-[22px] tracking-[0.14em] sm:tracking-[0.17em]',
    ampersand: 'text-[17px] sm:text-[20px]',
    gregorianDate: 'text-[9.5px] sm:text-[11px] tracking-[0.14em]',
    hijriDate: 'text-[10.5px] sm:text-[12px] tracking-[0.1em]',
    quranVerse: 'text-[12px] sm:text-[13.5px] leading-snug',
    quranSurah: 'text-[8px] sm:text-[9px] tracking-[0.2em]',
    gapClass: 'gap-1 sm:gap-2',
    dividerWidth: 'w-7 sm:w-10',
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
    containerPadding: 'pt-[18%] pb-[11%] px-[14%] sm:px-[16%]',
    contentMaxW: 'max-w-[280px] sm:max-w-[310px]',
    bismillahArabic: 'text-[12px] sm:text-[13px] leading-relaxed',
    bismillahEnglish: 'text-[8.5px] sm:text-[9.5px] tracking-[0.1em]',
    headerTheOf: 'text-[10px] sm:text-[11px] tracking-[0.22em]',
    headerEngagement: 'text-[11.5px] sm:text-[13px] tracking-[0.26em]',
    coupleName: 'text-[18px] sm:text-[21px] tracking-[0.13em] sm:tracking-[0.16em]',
    ampersand: 'text-[16px] sm:text-[19px]',
    gregorianDate: 'text-[9px] sm:text-[10.5px] tracking-[0.13em]',
    hijriDate: 'text-[10px] sm:text-[11.5px] tracking-[0.1em]',
    quranVerse: 'text-[11.5px] sm:text-[13px] leading-snug',
    quranSurah: 'text-[7.5px] sm:text-[8.5px] tracking-[0.18em]',
    gapClass: 'gap-1.5 sm:gap-2',
    dividerWidth: 'w-6 sm:w-9',
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
    containerPadding: 'pt-[16%] pb-[10%] px-[13%] sm:px-[16%]',
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
    gapClass: 'gap-2 sm:gap-3',
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
      className="w-full max-w-[500px] sm:max-w-[520px] md:max-w-[560px] mx-auto px-1.5 sm:px-3 flex flex-col items-center select-none"
    >
      {/* 
        Quick Device View Switcher
        Allows immediate testing of exact iPhone vs Android mobile dimensions & left/right spacing
      */}
      <div className="flex items-center justify-center gap-1.5 mb-2 mt-0.5 z-20">
        <button
          type="button"
          onClick={() => setProfile('ios')}
          className={`px-3 py-1 rounded-full text-[10px] sm:text-[10.5px] font-cinzel tracking-[0.14em] uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
            profile === 'ios'
              ? 'bg-[#721B29] text-white shadow-md font-bold ring-1 ring-[#ECC170]/60'
              : 'bg-[#F6E1C2]/85 text-[#541421] border border-[#721B29]/25 hover:bg-[#721B29]/15'
          }`}
          aria-label="View iPhone mobile size"
        >
          <span>📱 iPhone Size</span>
        </button>
        <button
          type="button"
          onClick={() => setProfile('android')}
          className={`px-3 py-1 rounded-full text-[10px] sm:text-[10.5px] font-cinzel tracking-[0.14em] uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
            profile === 'android'
              ? 'bg-[#721B29] text-white shadow-md font-bold ring-1 ring-[#ECC170]/60'
              : 'bg-[#F6E1C2]/85 text-[#541421] border border-[#721B29]/25 hover:bg-[#721B29]/15'
          }`}
          aria-label="View Android mobile size"
        >
          <span>🤖 Android Size</span>
        </button>
      </div>

      {/* 
        Container with device-tailored aspect ratio.
        Fits entirely on screen with zero clipping or awkward gaps.
      */}
      <div
        className={`relative w-full ${activePreset.aspectClass} max-h-[92vh] flex items-center justify-center`}
      >
        {/* The Card Container */}
        <div
          id="islamic-arch-card-inner"
          className="relative w-full h-full shadow-[0_20px_50px_rgba(46,14,20,0.22),0_4px_16px_rgba(46,14,20,0.12)] rounded-[4px] overflow-hidden bg-[#FAF3E6]"
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
          <div className="absolute inset-0 pointer-events-none bg-radial-[at_50%_50%] from-white/35 via-transparent to-black/10 z-10" />

          {/* =========================================================
              ROYAL GLOWING REVEAL ANIMATION (Triggered on video finish)
              Radiant golden candlelight bloom & shimmering specular light sweep
              ========================================================= */}
          {isRevealed && (
            <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
              {/* 1. Divine Radiant Center Candlelight Bloom */}
              <motion.div
                initial={{ scale: 0.3, opacity: 0 }}
                animate={{
                  scale: [0.3, 1.25, 2.3],
                  opacity: [0, 0.95, 0.7, 0],
                }}
                transition={{
                  duration: 2.2,
                  times: [0, 0.25, 0.65, 1],
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 sm:w-96 sm:h-96 rounded-full"
                style={{
                  background:
                    'radial-gradient(circle, rgba(255, 255, 245, 1) 0%, rgba(254, 235, 170, 0.9) 25%, rgba(229, 184, 105, 0.65) 50%, rgba(179, 131, 39, 0.3) 72%, transparent 88%)',
                  mixBlendMode: 'screen',
                }}
              />

              {/* 2. Golden Halo Shockwave Wave */}
              <motion.div
                initial={{ scale: 0.3, opacity: 0 }}
                animate={{
                  scale: [0.3, 1.4, 2.4],
                  opacity: [0, 0.85, 0],
                }}
                transition={{
                  duration: 1.8,
                  times: [0, 0.3, 1],
                  ease: 'easeOut',
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 rounded-full border-2 border-[#E5B869]/80"
                style={{
                  boxShadow:
                    '0 0 40px rgba(229, 184, 105, 0.6), inset 0 0 30px rgba(255, 235, 170, 0.5)',
                }}
              />

              {/* 3. Golden Specular Light Sweep across the Arch & Names */}
              <motion.div
                initial={{ x: '-150%', opacity: 0 }}
                animate={{
                  x: ['-150%', '160%'],
                  opacity: [0, 0.9, 0.9, 0],
                }}
                transition={{
                  duration: 1.8,
                  delay: 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute inset-y-0 w-3/4 pointer-events-none rotate-12"
                style={{
                  background:
                    'linear-gradient(90deg, transparent 0%, rgba(255, 245, 215, 0.25) 30%, rgba(255, 255, 255, 0.8) 50%, rgba(240, 195, 95, 0.55) 70%, transparent 100%)',
                  mixBlendMode: 'screen',
                }}
              />

              {/* 4. Golden Sparkling Light Flecks blooming outward */}
              <div className="absolute inset-0 pointer-events-none">
                {[
                  { top: '38%', left: '30%', delay: 0.15, size: 'w-2.5 h-2.5' },
                  { top: '35%', left: '70%', delay: 0.25, size: 'w-3 h-3' },
                  { top: '48%', left: '24%', delay: 0.2, size: 'w-2 h-2' },
                  { top: '50%', left: '76%', delay: 0.3, size: 'w-3 h-3' },
                  { top: '62%', left: '40%', delay: 0.35, size: 'w-2.5 h-2.5' },
                  { top: '60%', left: '60%', delay: 0.4, size: 'w-2 h-2' },
                  { top: '26%', left: '50%', delay: 0.1, size: 'w-3.5 h-3.5' },
                  { top: '74%', left: '50%', delay: 0.45, size: 'w-2.5 h-2.5' },
                ].map((star, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: [0, 1.4, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 1.2,
                      delay: star.delay,
                      ease: 'easeOut',
                    }}
                    className={`absolute ${star.size} -translate-x-1/2 -translate-y-1/2`}
                    style={{ top: star.top, left: star.left }}
                  >
                    <div className="w-full h-full bg-[#FFF5D0] rotate-45 rounded-[1px] shadow-[0_0_12px_#ECC170]" />
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Gentle recurring specular sheen (runs gracefully in the background) */}
          <motion.div
            initial={{ x: '-140%', opacity: 0 }}
            animate={{
              x: ['-140%', '150%'],
              opacity: [0, 0.3, 0.45, 0.2, 0],
            }}
            transition={{
              duration: 3.2,
              delay: 3.5,
              ease: [0.25, 1, 0.5, 1],
              repeat: Infinity,
              repeatDelay: 8,
            }}
            className="absolute inset-y-0 w-1/2 pointer-events-none z-15 rotate-12"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, rgba(255, 252, 240, 0.4) 50%, transparent 100%)',
            }}
          />

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

            {/* 1. BISMILLAH CALLIGRAPHY (Crisp, Top-Centered with left-right margins) */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className={`w-full flex flex-col items-center justify-center ${activePreset.contentMaxW} mx-auto px-2`}
            >
              <p
                dir="rtl"
                className={`font-arabic ${activePreset.bismillahArabic} text-[#2E070F] tracking-wider font-bold drop-shadow-[0_1px_2px_rgba(255,255,255,0.95)]`}
              >
                بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
              </p>
              <p
                className={`font-luxury italic ${activePreset.bismillahEnglish} text-[#5C1A25] mt-0.5 mx-auto leading-normal font-medium`}
              >
                In the Name of Allah, the Most Gracious, the Most Merciful
              </p>
            </motion.div>

            {/* 2. HEADER: "the ENGAGEMENT of" */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center px-2"
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
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
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
                className={`font-cinzel ${activePreset.coupleName} text-[#541421] font-bold uppercase leading-tight drop-shadow-[0_1px_2px_rgba(255,255,255,0.95)]`}
              >
                Nihal
              </h1>

              {/* Gregorian Event Date */}
              <div className="flex flex-col items-center mt-1.5 sm:mt-2.5 gap-0.5 text-center px-2">
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

            {/* Subtle Divider with Red Wine & Gold Diamond */}
            <div className="flex items-center justify-center gap-2 my-0.5">
              <div
                className={`${activePreset.dividerWidth} h-[1px] bg-gradient-to-r from-transparent to-[#721B29]/40`}
              />
              <div className="w-1.5 h-1.5 rotate-45 border border-[#B38327] bg-[#721B29]" />
              <div
                className={`${activePreset.dividerWidth} h-[1px] bg-gradient-to-l from-transparent to-[#721B29]/40`}
              />
            </div>

            {/* 4. QURANIC VERSE with generous left/right breathing space */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`w-full flex flex-col items-center px-3 ${activePreset.contentMaxW} mx-auto`}
            >
              <p
                className={`font-luxury italic ${activePreset.quranVerse} text-[#42151D] font-medium drop-shadow-[0_1px_2px_rgba(255,255,255,0.85)]`}
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
