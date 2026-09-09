import { Sparkles, RotateCcw } from 'lucide-react';

interface Props {
  onReplayIntro: () => void;
}

export function Footer({ onReplayIntro }: Props) {
  return (
    <footer
      id="invitation-footer"
      className="relative pt-20 pb-16 px-6 text-center border-t border-[#C9A86A]/20 bg-gradient-to-b from-transparent to-[#F1E9DE]/60"
    >
      <div className="max-w-xl mx-auto flex flex-col items-center">
        {/* Decorative Top Sparkle */}
        <div className="text-[#C9A86A] mb-4">
          <Sparkles className="w-5 h-5 mx-auto animate-sparkle-star" />
        </div>

        <p className="font-cinzel text-xs tracking-[0.4em] text-[#C9A86A] uppercase font-medium mb-3">
          With Love
        </p>

        {/* Couple Names */}
        <h4 className="font-luxury text-3xl sm:text-4xl text-[#2C231A] uppercase tracking-[0.18em] font-light">
          Thamim Ansari
        </h4>

        <div className="my-2 text-[#C9A86A] text-lg font-serif">✦</div>

        <h4 className="font-luxury text-3xl sm:text-4xl text-[#2C231A] uppercase tracking-[0.18em] font-light">
          Nihal
        </h4>

        {/* Date */}
        <p className="font-sans-clean text-xs tracking-[0.3em] text-[#7A695A] uppercase mt-6 mb-8">
          26 September 2026 · Saturday Morning (9:00 AM – 4:00 PM)
        </p>

        {/* Replay Intro Button */}
        <button
          id="footer-replay-intro-btn"
          onClick={onReplayIntro}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C9A86A]/30 bg-white/50 hover:bg-[#C9A86A]/15 text-[#59493B] font-sans-clean text-[11px] tracking-wider uppercase transition-all duration-300 shadow-sm"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#C9A86A]" />
          <span>Replay Cinematic Intro</span>
        </button>

        <div className="mt-12 w-12 h-[1px] bg-[#C9A86A]/30 mx-auto" />

        <p className="font-sans-clean text-[10px] tracking-[0.25em] text-[#9E8B7C] uppercase mt-4">
          Thamim Ansari & Nihal — The Beautiful Beginning
        </p>
      </div>
    </footer>
  );
}
