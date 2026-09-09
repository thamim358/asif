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
import { FullCoverGlowReveal } from './components/FullCoverGlowReveal';

export default function App() {
  // Application phase: 'intro' (Full-Screen Video Intro) -> 'revealed' (Full Invitation)
  const [phase, setPhase] = useState<'intro' | 'revealed'>('intro');
  const [showFullCoverGlow, setShowFullCoverGlow] = useState(false);

  // Manage body scroll locking during intro
  useEffect(() => {
    if (phase === 'intro') {
      document.body.style.overflow = 'hidden';
      setShowFullCoverGlow(false);
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [phase]);

  const handleScrollToDiscover = () => {
    const detailsEl = document.getElementById('muslim-wedding-details');
    if (detailsEl) {
      detailsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleReplayIntro = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setShowFullCoverGlow(false);
    setPhase('intro');
  };

  const handleIntroComplete = () => {
    // 1. Immediately switch phase so video dissolves
    setPhase('revealed');
    // 2. Synchronously trigger the full cover golden light burst from center
    setShowFullCoverGlow(true);
  };

  const handleGlowComplete = () => {
    setShowFullCoverGlow(false);
  };

  return (
    <main className="relative min-h-screen bg-[#FFFDF9] text-[#2E1E14] overflow-x-hidden selection:bg-[#721B29]/25 selection:text-[#4A0D17]">
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
          <CinematicVideoIntro onComplete={handleIntroComplete} />
        )}
      </AnimatePresence>

      {/* Synchronized Full-Cover Center Glow Reveal Overlay (z-50) */}
      <AnimatePresence>
        {showFullCoverGlow && (
          <FullCoverGlowReveal onComplete={handleGlowComplete} />
        )}
      </AnimatePresence>
    </main>
  );
}
