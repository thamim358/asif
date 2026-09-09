/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { CinematicVideoIntro } from './components/CinematicVideoIntro';
import { HeroSection } from './components/HeroSection';
import { MuslimWeddingDetails } from './components/MuslimWeddingDetails';
import { OldPaperBackground } from './components/OldPaperBackground';

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

  const handleScrollToDiscover = () => {
    const detailsEl = document.getElementById('muslim-wedding-details');
    if (detailsEl) {
      detailsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReplayIntro = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setPhase('intro');
  };

  return (
    <main className="relative min-h-screen bg-[#FAF3E6] text-[#2E1E14] overflow-x-hidden selection:bg-[#721B29]/25 selection:text-[#4A0D17]">
      {/* 
        The Royal Islamic Digital Invitation:
        Pre-rendered in the DOM so backgrounds, textures, images, and fonts are already painted
        and hardware-cached, completely eliminating freeze, hanging, or stutter when the intro ends.
      */}
      <div className="relative w-full">
        {/* Authentic Old Paper Rusted Color & Fibrous Texture Background */}
        <OldPaperBackground />

        {/* Section 1: The Royal Islamic Arch Invitation Card */}
        <HeroSection
          onScrollToDiscover={handleScrollToDiscover}
          isRevealed={phase === 'revealed'}
        />

        {/* Section 2: Clean Minimalist Muslim Wedding Details (Schedule, Venue, Blessings) */}
        <MuslimWeddingDetails onReplay={handleReplayIntro} />
      </div>

      {/* Full-Screen Cinematic Video Intro Overlay (z-50) */}
      <AnimatePresence>
        {phase === 'intro' && (
          <CinematicVideoIntro onComplete={() => setPhase('revealed')} />
        )}
      </AnimatePresence>
    </main>
  );
}
