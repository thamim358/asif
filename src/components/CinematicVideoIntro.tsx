import { useState, useRef, useEffect, useCallback, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX } from 'lucide-react';

interface Props {
  onComplete: () => void;
}

export function CinematicVideoIntro({ onComplete }: Props) {
  // State: 'ready' (video showing frame 1, waiting for user to tap wax seal) -> 'playing' -> 'ended'
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const completedRef = useRef(false);

  const handleFinish = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    // Notify parent to transition out the overlay smoothly
    onComplete();
  }, [onComplete]);

  // Clean up video playback on unmount
  useEffect(() => {
    return () => {
      if (videoRef.current) {
        try {
          videoRef.current.pause();
        } catch {
          // Ignore
        }
      }
    };
  }, []);

  // Click on the invisible button over the wax seal (or anywhere on the video)
  const handlePlayVideo = () => {
    if (isPlaying) return;
    setIsPlaying(true);

    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.muted = false;
      setIsMuted(false);

      videoRef.current.play().catch(() => {
        // If unmuted playback is blocked by browser policy, fall back to muted
        if (videoRef.current) {
          videoRef.current.muted = true;
          setIsMuted(true);
          videoRef.current.play().catch(() => {});
        }
      });
    }
  };

  // Video timeupdate tracking: audio fade in final 0.8s and seamless trigger near completion
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const cur = videoRef.current.currentTime;
    const dur = videoRef.current.duration || 4.8;

    // Smooth audio fadeout in the final 0.8s to avoid harsh audio clipping
    if (cur >= Math.max(dur - 0.8, 1.5) && !isMuted) {
      const remaining = Math.max(dur - cur, 0);
      const factor = Math.max(remaining / 0.8, 0);
      try {
        videoRef.current.volume = Math.min(Math.max(factor, 0), 1);
      } catch {
        // Safe fallback for mobile browsers
      }
    }

    // Trigger dissolve 0.18s before physical video end to prevent browser video freeze / stutter
    if (cur >= Math.max(dur - 0.18, 2.5)) {
      handleFinish();
    }
  };

  // Safety fallback timer if onEnded event is missed
  useEffect(() => {
    if (isPlaying) {
      const timer = setTimeout(() => {
        handleFinish();
      }, 5200);
      return () => clearTimeout(timer);
    }
  }, [isPlaying, handleFinish]);

  const toggleMute = (e: MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <motion.div
      id="cinematic-video-intro"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: { duration: 0.95, ease: [0.22, 1, 0.36, 1] },
      }}
      style={{ willChange: 'opacity' }}
      className="fixed inset-0 z-50 w-screen h-screen overflow-hidden bg-[#0A0806] flex items-center justify-center select-none pointer-events-auto"
    >
      {/* Ambient background glow & atmospheric vignette */}
      <div className="absolute inset-0 bg-radial from-[#1A140E]/80 via-[#0D0A08] to-[#050403] pointer-events-none" />

      {/* Floating subtle golden dust specks in the ambient space */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(16)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#E5C378]/30 animate-pulse"
            style={{
              top: `${(i * 21) % 96}%`,
              left: `${(i * 31) % 96}%`,
              animationDelay: `${(i * 0.4) % 3}s`,
              animationDuration: `${3 + (i % 2.5)}s`,
            }}
          />
        ))}
      </div>

      {/* =========================================================
          THE FULL-WIDTH CINEMATIC VIDEO CONTAINER
          True edge-to-edge full width with zero spacing in left, right, and top
          ========================================================= */}
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        {/* The Couple Intro Video Element - Object-cover for full-width edge-to-edge */}
        <video
          ref={videoRef}
          src="/TN.mp4"
          poster="/first_frame.jpg"
          playsInline
          preload="auto"
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleFinish}
          onClick={!isPlaying ? handlePlayVideo : undefined}
          className="w-full h-full object-cover cursor-pointer"
        />

        {/* =========================================================
            THE INVISIBLE BUTTON POSITIONED EXACTLY ON THE WAX SEAL
            (Wax seal center: 50.3% X, 50.6% Y of the 720x1280 video)
            ========================================================= */}
        <AnimatePresence>
          {!isPlaying && (
            <motion.button
              id="wax-seal-invisible-button"
              type="button"
              onClick={handlePlayVideo}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute z-30 rounded-full cursor-pointer focus:outline-none"
              style={{
                left: '50.3%',
                top: '50.6%',
                transform: 'translate(-50%, -50%)',
                width: '32%',
                height: '20%',
                background: 'transparent',
              }}
              aria-label="Wax seal trigger"
            />
          )}
        </AnimatePresence>

        {/* Floating Sound Toggle during playback */}
        {isPlaying && (
          <div className="absolute top-4 right-4 z-40">
            <button
              onClick={toggleMute}
              className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-[#721B29]/50 text-[#FCDFE5] flex items-center justify-center hover:bg-[#721B29]/80 transition-all shadow-lg cursor-pointer"
              title={isMuted ? 'Unmute audio' : 'Mute audio'}
              type="button"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#FAD5DC]" />}
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
