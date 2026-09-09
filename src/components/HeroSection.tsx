import { motion } from 'motion/react';
import { ChevronDown, Calendar, MapPin } from 'lucide-react';
import { IslamicArchCard } from './IslamicArchCard';

interface Props {
  onScrollToDiscover: () => void;
}

export function HeroSection({ onScrollToDiscover }: Props) {
  return (
    <section
      id="hero-section"
      className="relative min-h-screen flex flex-col items-center justify-between px-0 pt-0 pb-8 text-center z-10 w-full"
    >
      {/* Main Islamic Cusped Arch Card matching the user's reference image */}
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full flex justify-center"
      >
        <IslamicArchCard />
      </motion.div>

      {/* Clean Minimalist Quick Actions & Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.2 }}
        className="pt-4 pb-2 px-4 flex flex-col items-center z-20"
      >
        <button
          type="button"
          onClick={onScrollToDiscover}
          className="px-6 py-2.5 rounded-full bg-[#721B29] text-white text-xs font-cinzel tracking-[0.2em] uppercase font-medium hover:bg-[#58141F] transition-all shadow-[0_4px_16px_rgba(114,27,41,0.28)] flex items-center gap-2 mb-4 hover:scale-105 cursor-pointer"
        >
          <Calendar className="w-3.5 h-3.5 text-[#FAD5DC]" />
          <span>View Engagement & Venue Details</span>
        </button>

        <div
          onClick={onScrollToDiscover}
          className="cursor-pointer group flex flex-col items-center"
        >
          <span className="font-cinzel text-[10px] sm:text-[11px] tracking-[0.28em] text-[#7A4B53] uppercase group-hover:text-[#721B29] transition-colors mb-1.5 font-medium">
            Scroll for Engagement Program & Duas
          </span>
          <div className="w-7 h-7 rounded-full border border-[#721B29]/40 flex items-center justify-center text-[#721B29] group-hover:border-[#721B29] group-hover:bg-[#721B29]/5 transition-all">
            <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
