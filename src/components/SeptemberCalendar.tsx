import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, Sparkles, Heart } from 'lucide-react';

export function SeptemberCalendar() {
  // Target: Saturday, September 26, 2026 at 09:00:00 IST (UTC+5:30)
  const targetTime = new Date('2026-09-26T09:00:00+05:30').getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetTime]);

  const handleGoogleCalendar = () => {
    const title = encodeURIComponent('The Engagement of Thamim Ansari & Nihal');
    const details = encodeURIComponent(
      'Together with their families, cordially invite you to celebrate the blessed Engagement Ceremony of Thamim Ansari & Nihal at Royal Mahal, Chennai.'
    );
    const location = encodeURIComponent(
      'Royal Mahal, 175, Erukkenchery High Rd, Sharma Nagar, Vyasarpadi, Chennai, Tamil Nadu 600039'
    );
    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=20260926T033000Z/20260926T103000Z`;
    window.open(gCalUrl, '_blank');
  };

  // September 2026: starts on Tuesday (2 leading blanks: Sun, Mon)
  // Total days = 30
  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const blanks = [null, null]; // Sun, Mon
  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);
  const calendarCells = [...blanks, ...daysInMonth];

  return (
    <div
      id="engagement-september-calendar"
      className="w-full max-w-xl mx-auto my-8 sm:my-10 select-none"
    >
      <div className="relative isolate bg-white/95 rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-[#EADBCA] shadow-[0_6px_24px_rgba(95,44,18,0.06)] overflow-hidden">
        {/* Top Decorative Wine & Gold Border Stripe */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#721B29] via-[#C9A048] to-[#721B29]" />
        <img
          src="/flowers.avif"
          alt=""
          aria-hidden="true"
          className="absolute -z-10 -top-12 -right-12 w-32 sm:w-44 rotate-[26deg] opacity-60 pointer-events-none select-none"
        />
        <img
          src="/flowers.avif"
          alt=""
          aria-hidden="true"
          className="absolute -z-10 -bottom-12 -left-12 w-32 sm:w-44 -rotate-[154deg] opacity-60 pointer-events-none select-none"
        />

        {/* Calendar Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-4 mb-5 border-b border-[#EAE1D3]">
          <div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#721B29]" />
              <h4 className="font-cinzel text-lg sm:text-xl font-bold uppercase tracking-[0.2em] text-[#2E070F]">
                September 2026
              </h4>
            </div>
            <p className="font-luxury italic text-xs sm:text-sm text-[#721B29] font-medium mt-0.5 tracking-wide">
              14 Rabi&apos; al-Awwal 1448 AH · Auspicious Islamic Date
            </p>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#721B29] text-white text-[11px] sm:text-xs font-cinzel font-semibold tracking-wider self-start sm:self-auto shadow-sm">
            <Heart className="w-3.5 h-3.5 fill-[#FAD5DC] text-[#FAD5DC]" />
            <span>Saturday 26th</span>
          </div>
        </div>

        {/* Monthly Calendar Grid with High Contrast */}
        <div className="mb-6">
          {/* Day Names Header */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center mb-2">
            {daysOfWeek.map((day, idx) => (
              <div
                key={idx}
                className={`text-xs sm:text-sm font-cinzel font-bold py-1 ${
                  idx === 6 ? 'text-[#721B29] bg-[#721B29]/10 rounded-md' : 'text-[#3D141C]'
                }`}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center">
            {calendarCells.map((day, idx) => {
              if (day === null) {
                return <div key={`blank-${idx}`} className="h-9 sm:h-10" />;
              }

              const isEventDay = day === 26;
              const isSaturday = (idx % 7) === 6;

              return (
                <div
                  key={`day-${day}`}
                  className="flex items-center justify-center h-9 sm:h-10 relative"
                >
                  {isEventDay ? (
                    <div className="relative w-full h-full flex items-center justify-center">
                      {/* Highlighted Event Day: High-Contrast Royal Burgundy & Gold */}
                      <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: [1, 1.06, 1] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#721B29] text-white flex flex-col items-center justify-center font-cinzel font-bold text-xs sm:text-sm shadow-[0_4px_12px_rgba(114,27,41,0.45)] ring-2 ring-[#C9A048] ring-offset-1 z-10 cursor-pointer"
                        title="Saturday, September 26, 2026 - Engagement Ceremony"
                      >
                        <span>26</span>
                      </motion.div>
                      {/* Little star badge */}
                      <span className="absolute -top-1 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#C9A048] flex items-center justify-center shadow-xs">
                        <Sparkles className="w-1.5 h-1.5 text-white" />
                      </span>
                    </div>
                  ) : (
                    <span
                      className={`font-sans-clean text-xs sm:text-sm font-semibold rounded-lg w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center transition-colors ${
                        isSaturday
                          ? 'text-[#721B29] bg-[#721B29]/5 font-bold'
                          : 'text-[#2C2118] hover:bg-[#F6EFE6]'
                      }`}
                    >
                      {day}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Date Notice */}
        <div className="p-3 sm:p-3.5 rounded-xl bg-[#FAF5EE] border border-[#E7DACB] flex items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#721B29] shrink-0 ring-2 ring-[#721B29]/30" />
            <div>
              <p className="font-cinzel text-xs sm:text-sm text-[#2E070F] font-bold tracking-wide">
                Saturday, 26 September 2026
              </p>
              <p className="font-sans-clean text-[11px] text-[#721B29] font-semibold">
                Morning 9:00 AM to 4:00 PM
              </p>
            </div>
          </div>
          <div className="text-right shrink-0">
            <span className="px-2.5 py-1 rounded-md bg-[#721B29] text-white font-cinzel text-[10px] uppercase font-bold tracking-wider">
              Ceremony
            </span>
          </div>
        </div>

        {/* Live Countdown in High Contrast */}
        <div className="mb-6">
          <div className="flex items-center justify-center gap-1.5 mb-2.5">
            <Clock className="w-3.5 h-3.5 text-[#721B29]" />
            <span className="font-cinzel text-[11px] text-[#721B29] uppercase tracking-[0.2em] font-bold">
              Countdown to the Blessed Union
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center">
            <div className="bg-[#FFFDF9] border border-[#EDE4D8] rounded-xl p-2 sm:p-3 shadow-xs">
              <span className="block font-cinzel text-xl sm:text-2xl font-bold text-[#2E070F]">
                {timeLeft.days}
              </span>
              <span className="block font-cinzel text-[9px] sm:text-[10px] text-[#721B29] uppercase tracking-wider font-bold mt-0.5">
                Days
              </span>
            </div>
            <div className="bg-[#FFFDF9] border border-[#EDE4D8] rounded-xl p-2 sm:p-3 shadow-xs">
              <span className="block font-cinzel text-xl sm:text-2xl font-bold text-[#2E070F]">
                {timeLeft.hours.toString().padStart(2, '0')}
              </span>
              <span className="block font-cinzel text-[9px] sm:text-[10px] text-[#721B29] uppercase tracking-wider font-bold mt-0.5">
                Hours
              </span>
            </div>
            <div className="bg-[#FFFDF9] border border-[#EDE4D8] rounded-xl p-2 sm:p-3 shadow-xs">
              <span className="block font-cinzel text-xl sm:text-2xl font-bold text-[#2E070F]">
                {timeLeft.minutes.toString().padStart(2, '0')}
              </span>
              <span className="block font-cinzel text-[9px] sm:text-[10px] text-[#721B29] uppercase tracking-wider font-bold mt-0.5">
                Mins
              </span>
            </div>
            <div className="bg-[#FFFDF9] border border-[#EDE4D8] rounded-xl p-2 sm:p-3 shadow-xs">
              <span className="block font-cinzel text-xl sm:text-2xl font-bold text-[#721B29]">
                {timeLeft.seconds.toString().padStart(2, '0')}
              </span>
              <span className="block font-cinzel text-[9px] sm:text-[10px] text-[#721B29] uppercase tracking-wider font-bold mt-0.5">
                Secs
              </span>
            </div>
          </div>
        </div>

        {/* High-Contrast Calendar Sync Button */}
        <div className="flex items-center justify-center pt-2">
          <button
            id="btn-calendar-google"
            type="button"
            onClick={handleGoogleCalendar}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#721B29] hover:bg-[#58141F] text-white font-cinzel text-xs sm:text-sm tracking-[0.16em] uppercase font-bold transition-all shadow-[0_4px_14px_rgba(114,27,41,0.3)] hover:scale-105 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-[#FAD5DC]" />
            <span>Add to Google Calendar</span>
          </button>
        </div>
      </div>
    </div>
  );
}
