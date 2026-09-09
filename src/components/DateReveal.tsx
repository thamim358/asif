import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Download } from 'lucide-react';

export function DateReveal() {
  // Target date: September 26, 2026, 10:00:00 (Saturday Morning - Chennai / IST)
  const targetTime = new Date('2026-09-26T10:00:00+05:30').getTime();

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

  const handleAddToCalendar = () => {
    // Generate .ics calendar invite
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Thamim and Nihal//Engagement Invitation//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      'SUMMARY:The Engagement of Thamim Ansari & Nihal',
      'DESCRIPTION:Join us to celebrate the blessed engagement of Thamim Ansari & Nihal at Royal Mahal, Chennai.',
      'LOCATION:Royal Mahal, 175, Erukkenchery High Rd, Sharma Nagar, Vyasarpadi, Chennai, Tamil Nadu 600039',
      'DTSTART:20260926T043000Z',
      'DTEND:20260926T083000Z',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'Thamim_and_Nihal_Engagement.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleGoogleCalendar = () => {
    const title = encodeURIComponent('The Engagement of Thamim Ansari & Nihal');
    const details = encodeURIComponent(
      'Together with their families, cordially request the pleasure of your company to celebrate their blessed Engagement Ceremony at Royal Mahal, Chennai. Timing: Morning 10:00 AM to 2:00 PM.'
    );
    const location = encodeURIComponent(
      'Royal Mahal, 175, Erukkenchery High Rd, Sharma Nagar, Vyasarpadi, Chennai, Tamil Nadu 600039'
    );
    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=20260926T043000Z/20260926T083000Z`;
    window.open(gCalUrl, '_blank');
  };

  return (
    <section
      id="date-reveal-section"
      className="relative py-28 sm:py-40 px-6 max-w-4xl mx-auto text-center"
    >
      {/* Background Soft Glow Ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-[480px] h-80 sm:h-[480px] rounded-full bg-[#EBD8BE]/25 blur-3xl pointer-events-none" />

      {/* Eyebrow */}
      <motion.p
        initial={{ opacity: 0, letterSpacing: '0.15em' }}
        whileInView={{ opacity: 1, letterSpacing: '0.4em' }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.2 }}
        className="font-cinzel text-xs sm:text-sm text-[#C9A86A] uppercase font-medium mb-6"
      >
        Save The Date
      </motion.p>

      {/* Decorative Gold Botanical Crest */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.0, delay: 0.1 }}
        className="flex items-center justify-center gap-4 mb-8"
      >
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#C9A86A] to-transparent" />
        <span className="text-[#D9B8AE] text-sm">❦</span>
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#C9A86A] to-transparent" />
      </motion.div>

      {/* ARTISTIC GIANT NUMBER 26 */}
      <div className="relative my-2 inline-block">
        <motion.div
          initial={{ opacity: 0, scale: 0.82, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          {/* Subtle metallic number drop shadow */}
          <span
            className="font-luxury font-light text-[120px] sm:text-[180px] md:text-[220px] leading-none text-[#2C231A] select-none tracking-tight block"
            style={{
              textShadow: '0 15px 35px rgba(201, 168, 106, 0.25)',
            }}
          >
            26
          </span>

          {/* Accent Gold Ring & Flourish */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-28 h-1 bg-gradient-to-r from-transparent via-[#C9A86A] to-transparent" />
        </motion.div>
      </div>

      {/* Month & Year */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.1, delay: 0.4 }}
        className="mt-6"
      >
        <p className="font-luxury text-3xl sm:text-4xl md:text-5xl tracking-[0.25em] text-[#3D332A] uppercase font-normal">
          September 2026
        </p>

        {/* Day of Week */}
        <p className="font-cinzel text-sm sm:text-base tracking-[0.45em] text-[#C9A86A] uppercase font-semibold mt-4">
          Saturday Morning (10:00 AM – 2:00 PM)
        </p>
      </motion.div>

      {/* Countdown Timer to September 25, 2026 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.2, delay: 0.55 }}
        className="mt-14 max-w-xl mx-auto grid grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-6 rounded-2xl glass-luxury border border-[#C9A86A]/25 shadow-sm"
      >
        <div className="flex flex-col items-center">
          <span className="font-luxury text-2xl sm:text-4xl text-[#2C231A] font-medium">
            {timeLeft.days}
          </span>
          <span className="font-sans-clean text-[9px] sm:text-[11px] tracking-[0.2em] text-[#806D5E] uppercase mt-1">
            Days
          </span>
        </div>
        <div className="flex flex-col items-center border-l border-[#C9A86A]/20">
          <span className="font-luxury text-2xl sm:text-4xl text-[#2C231A] font-medium">
            {timeLeft.hours.toString().padStart(2, '0')}
          </span>
          <span className="font-sans-clean text-[9px] sm:text-[11px] tracking-[0.2em] text-[#806D5E] uppercase mt-1">
            Hours
          </span>
        </div>
        <div className="flex flex-col items-center border-l border-[#C9A86A]/20">
          <span className="font-luxury text-2xl sm:text-4xl text-[#2C231A] font-medium">
            {timeLeft.minutes.toString().padStart(2, '0')}
          </span>
          <span className="font-sans-clean text-[9px] sm:text-[11px] tracking-[0.2em] text-[#806D5E] uppercase mt-1">
            Mins
          </span>
        </div>
        <div className="flex flex-col items-center border-l border-[#C9A86A]/20">
          <span className="font-luxury text-2xl sm:text-4xl text-[#C9A86A] font-medium">
            {timeLeft.seconds.toString().padStart(2, '0')}
          </span>
          <span className="font-sans-clean text-[9px] sm:text-[11px] tracking-[0.2em] text-[#806D5E] uppercase mt-1">
            Secs
          </span>
        </div>
      </motion.div>

      {/* Calendar Export Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.0, delay: 0.7 }}
        className="mt-8 flex flex-wrap items-center justify-center gap-3"
      >
        <button
          id="date-google-cal-btn"
          onClick={handleGoogleCalendar}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#C9A86A]/40 bg-white/80 hover:bg-[#C9A86A]/15 text-[#3D332A] font-sans-clean text-xs tracking-wider uppercase transition-all duration-300 shadow-sm hover:border-[#C9A86A] cursor-pointer"
        >
          <Calendar className="w-4 h-4 text-[#C9A86A]" />
          <span>Add to Google Calendar</span>
        </button>
      </motion.div>
    </section>
  );
}
