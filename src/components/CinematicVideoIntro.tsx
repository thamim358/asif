import { useState, useRef, useEffect, useCallback, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';

interface Props {
  onComplete: () => void;
}

export function CinematicVideoIntro({ onComplete }: Props) {
  // State: 'ready' (video showing frame 1, waiting for user to tap wax seal) -> 'playing' -> 'ended'
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [videoDuration, setVideoDuration] = useState(4.8);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const completedRef = useRef(false);

  const handleFinish = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
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

  // Click on the invisible button over the wax seal
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
          videoRef.current.play().catch(handleFinish);
        }
      });
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current && videoRef.current.duration && !isNaN(videoRef.current.duration)) {
      setVideoDuration(videoRef.current.duration);
    }
  };

  // Video timeupdate tracking: audio fade in final 0.7s and seamless trigger near completion
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const cur = videoRef.current.currentTime;
    const dur = videoRef.current.duration && !isNaN(videoRef.current.duration) ? videoRef.current.duration : videoDuration;

    // Smooth audio fadeout in the final 0.7s to avoid harsh audio clipping
    if (cur >= Math.max(dur - 0.7, 1.5) && !isMuted) {
      const remaining = Math.max(dur - cur, 0);
      const factor = Math.max(remaining / 0.7, 0);
      try {
        videoRef.current.volume = Math.min(Math.max(factor, 0), 1);
      } catch {
        // Safe fallback for mobile browsers
      }
    }

    // Trigger dissolve 0.15s before physical video buffer end to prevent freeze or black flash
    if (cur >= Math.max(dur - 0.15, 2.5)) {
      handleFinish();
    }
  };

  // Safety fallback timer if onEnded event is missed
  useEffect(() => {
    if (isPlaying) {
      const timeoutMs = (videoDuration || 4.8) * 1000 + 200;
      const timer = setTimeout(() => {
        handleFinish();
      }, timeoutMs);
      return () => clearTimeout(timer);
    }
  }, [isPlaying, videoDuration, handleFinish]);

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
        transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
      }}
      style={{ willChange: 'opacity' }}
      className="fixed inset-0 z-50 w-screen h-screen min-h-[100dvh] h-[100dvh] overflow-hidden bg-[#0A0806] flex items-center justify-center select-none pointer-events-auto"
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
          onLoadedMetadata={handleLoadedMetadata}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleFinish}
          onError={handleFinish}
          onClick={!isPlaying ? handlePlayVideo : handleFinish}
          className="w-full h-full object-cover cursor-pointer"
        />

        {/* =========================================================
            THE INVISIBLE BUTTON POSITIONED EXACTLY ON THE WAX SEAL
            (Wax seal center: 50.3% X, 50.6% Y of the 720x1280 video)
            ========================================================= */}
        <AnimatePresence>
          {!isPlaying && (
            <>
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
              <motion.p
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, delay: 0.15 }}
                className="absolute z-30 left-1/2 top-[62%] -translate-x-1/2 whitespace-nowrap pointer-events-none inline-flex items-center gap-1.5 rounded-full bg-[#FFF7F0]/85 px-3 py-1 font-cinzel text-[9px] sm:text-[10px] font-bold tracking-[0.2em] uppercase text-[#721B29] shadow-[0_2px_8px_rgba(46,7,15,0.45)]"
              >
                <Sparkles className="w-3 h-3 shrink-0 text-[#721B29]" />
                <span>Tap to Open</span>
              </motion.p>
            </>
          )}
        </AnimatePresence>

        {/* Controls during playback: Quick Skip and Mute Toggle */}
        {isPlaying && (
          <div className="absolute top-4 inset-x-4 flex items-center justify-end z-40 pointer-events-auto">
            {/* Mute Toggle button */}
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
