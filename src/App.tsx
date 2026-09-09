/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CinematicVideoIntro } from './components/CinematicVideoIntro';
import { HeroSection } from './components/HeroSection';
import { MuslimWeddingDetails } from './components/MuslimWeddingDetails';
import { AudioPlayerFloating } from './components/AudioPlayerFloating';
import { OldPaperBackground } from './components/OldPaperBackground';
import { islamicMusic } from './utils/islamicMusicEngine';

export default function App() {
  // Application phase: 'intro' (Full-Screen Video Intro) -> 'revealed' (Full Invitation)
  const [phase, setPhase] = useState<'intro' | 'revealed'>('intro');

  // Manage body scroll locking during intro
  useEffect(() => {
    if (phase === 'intro') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [phase]);

  // Start peaceful Islamic ambient music immediately after video completes
  useEffect(() => {
    if (phase === 'revealed') {
      // Gentle start with auto-fade
      islamicMusic.start();

      // Browser autoplay policy safety listener: resume on first user interaction if locked
      const handleUserGesture = () => {
        if (!islamicMusic.getIsRunning() && !islamicMusic.getIsMuted()) {
          islamicMusic.start();
        }
      };

      window.addEventListener('click', handleUserGesture, { once: true });
      window.addEventListener('touchstart', handleUserGesture, { once: true });
      window.addEventListener('scroll', handleUserGesture, { once: true });

      return () => {
        window.removeEventListener('click', handleUserGesture);
        window.removeEventListener('touchstart', handleUserGesture);
        window.removeEventListener('scroll', handleUserGesture);
      };
    }
  }, [phase]);

  const handleScrollToDiscover = () => {
    const detailsEl = document.getElementById('muslim-wedding-details');
    if (detailsEl) {
      detailsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReplayIntro = () => {
    islamicMusic.stop();
    window.scrollTo({ top: 0, behavior: 'instant' });
    setPhase('intro');
  };

  return (
    <main className="relative min-h-screen bg-[#FAF3E6] text-[#2E1E14] overflow-x-hidden selection:bg-[#721B29]/25 selection:text-[#4A0D17]">
      {/* STEP 1: Full-Screen Cinematic Video Intro with Wax Seal Trigger */}
      <AnimatePresence>
        {phase === 'intro' && (
          <CinematicVideoIntro onComplete={() => setPhase('revealed')} />
        )}
      </AnimatePresence>

      {/* STEP 2: Minimalist Muslim Wedding Digital Invitation */}
      {phase === 'revealed' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98, filter: 'blur(8px)' }}
          animate={{
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
          }}
          transition={{
            duration: 1.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="relative w-full"
        >
          {/* Authentic Old Paper Rusted Color & Fibrous Texture Background */}
          <OldPaperBackground />

          {/* Section 1: The Royal Islamic Arch Invitation Card */}
          <HeroSection onScrollToDiscover={handleScrollToDiscover} />

          {/* Section 2: Clean Minimalist Muslim Wedding Details (Schedule, Venue, Blessings) */}
          <MuslimWeddingDetails onReplay={handleReplayIntro} />

          {/* Floating Subtle Ambient Audio Player Control */}
          <AudioPlayerFloating />
        </motion.div>
      )}
    </main>
  );
}
