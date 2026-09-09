import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { soundEngine } from '../utils/sound';
import { islamicMusic } from '../utils/islamicMusicEngine';

export function AudioPlayerFloating() {
  const [isPlaying, setIsPlaying] = useState(islamicMusic.getIsRunning() && !islamicMusic.getIsMuted());

  useEffect(() => {
    const unsubscribe = islamicMusic.subscribe((active) => {
      setIsPlaying(active);
    });
    return () => unsubscribe();
  }, []);

  const handleToggle = () => {
    if (!islamicMusic.getIsRunning()) {
      islamicMusic.start();
      soundEngine.playSoftClick();
      setIsPlaying(true);
    } else {
      const muted = islamicMusic.toggleMute();
      soundEngine.toggleMute();
      setIsPlaying(!muted);
      if (!muted) {
        soundEngine.playSoftClick();
      }
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        id="floating-audio-toggle-btn"
        onClick={handleToggle}
        className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#FCFAF5]/90 backdrop-blur-md border border-[#8C4E26]/40 text-[#5C2B14] hover:border-[#8C4E26] hover:bg-[#F5EBDD] hover:shadow-[0_6px_20px_rgba(140,78,38,0.25)] transition-all shadow-[0_4px_16px_rgba(78,38,15,0.15)] font-cinzel text-xs tracking-wider cursor-pointer"
        title={isPlaying ? 'Pause Islamic Tune' : 'Play Islamic Tune'}
      >
        {isPlaying ? (
          <div className="flex items-center gap-1.5">
            <Volume2 className="w-4 h-4 text-[#8C4E26]" />
            {/* Animated Equalizer Waves */}
            <div className="flex items-end gap-0.5 h-3.5 w-3.5">
              <span className="w-0.5 bg-[#8C4E26] rounded-full animate-[pulse_0.8s_ease-in-out_infinite] h-2.5" />
              <span className="w-0.5 bg-[#8C4E26] rounded-full animate-[pulse_1.1s_ease-in-out_infinite] h-3.5" />
              <span className="w-0.5 bg-[#8C4E26] rounded-full animate-[pulse_0.7s_ease-in-out_infinite] h-1.5" />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-1.5">
            <VolumeX className="w-4 h-4 text-[#A88C78]" />
            <Music className="w-3.5 h-3.5 text-[#A88C78]" />
          </div>
        )}

        <div className="flex flex-col items-start leading-none">
          <span className="text-[11px] font-bold text-[#5C2B14] tracking-wide">
            {isPlaying ? 'Islamic Tune On' : 'Islamic Tune Off'}
          </span>
          <span className="hidden sm:inline font-luxury italic text-[9.5px] text-[#8C6D53] mt-0.5">
            Qanun &amp; Ney Melody
          </span>
        </div>
      </button>
    </div>
  );
}
