import { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Calendar, Navigation, Share2, Clock, Copy, Check, ExternalLink } from 'lucide-react';
import { SeptemberCalendar } from './SeptemberCalendar';

interface Props {
  onReplay?: () => void;
}

export function MuslimWeddingDetails({ onReplay }: Props) {
  const [copied, setCopied] = useState(false);
  const [addressCopied, setAddressCopied] = useState(false);

  const venueName = 'Royal Mahal';
  const venueAddress = '175, Erukkenchery High Rd, Sharma Nagar, Vyasarpadi, Chennai, Tamil Nadu 600039';
  const encodedVenue = encodeURIComponent(`${venueName}, ${venueAddress}`);
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedVenue}`;
  const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodedVenue}`;
  const embedMapUrl = `https://maps.google.com/maps?q=${encodedVenue}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'Thamim & Nihal - Engagement Invitation',
          text: '“And We created you in pairs” - You are cordially invited to celebrate the blessed Engagement Ceremony of Thamim Ansari & Nihal on Saturday morning, September 26, 2026 (9:00 AM – 4:00 PM) at Royal Mahal, Chennai.',
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(`${venueName}, ${venueAddress}`);
    setAddressCopied(true);
    setTimeout(() => setAddressCopied(false), 2500);
  };

  const handleCalendarAdd = () => {
    const title = encodeURIComponent('The Engagement of Thamim Ansari & Nihal');
    const details = encodeURIComponent(
      'Cordially invited to celebrate the blessed Engagement Ceremony of Thamim Ansari & Nihal at Royal Mahal, Vyasarpadi, Chennai. Timing: Morning 9:00 AM to 4:00 PM.'
    );
    const location = encodeURIComponent(`${venueName}, ${venueAddress}`);
    // Saturday, 26 September 2026: 09:00 to 16:00 IST (03:30 to 10:30 UTC)
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20260926T033000Z/20260926T103000Z&details=${details}&location=${location}`;
    window.open(googleCalendarUrl, '_blank');
  };

  return (
    <section id="muslim-wedding-details" className="relative w-full max-w-4xl mx-auto px-4 sm:px-8 py-10 sm:py-16 z-10">
      {/* =========================================================
          SECTION 1: THE SACRED INVITATION TEXT & FAMILY ANNOUNCEMENT
          Smooth GPU-accelerated entrance with subtle transforms
          ========================================================= */}
      <div className="text-center mb-14 sm:mb-18">
        {/* Sacred Quranic Opening */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="transform-gpu"
        >
          <p
            dir="rtl"
            className="font-arabic text-2xl sm:text-3xl md:text-4xl text-[#8A6D3B] tracking-wide mb-3 select-none"
          >
            وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا
          </p>
          <p className="font-luxury italic text-xs sm:text-sm md:text-base text-[#7D7062] max-w-lg mx-auto leading-relaxed">
            “And among His signs is that He created for you mates from among yourselves, that you may dwell in tranquility with them, and He has put love and mercy between your hearts.”
          </p>
          <p className="font-cinzel text-[10px] sm:text-[11px] md:text-xs tracking-[0.25em] text-[#A3927C] uppercase mt-1.5">
            Surah Ar-Rum (30 : 21)
          </p>
        </motion.div>

        {/* Elegant Animated Divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
          className="w-24 h-[1.5px] bg-gradient-to-r from-transparent via-[#C9A048]/60 to-transparent mx-auto my-6"
        />

        {/* Formal Family Invitation */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
          className="space-y-3 max-w-xl mx-auto transform-gpu"
        >
          <p className="font-cinzel text-xs sm:text-sm tracking-[0.24em] text-[#8C7654] uppercase">
            Together with their families
          </p>
          <p className="font-luxury italic text-base sm:text-lg md:text-xl text-[#524436]">
            cordially invite you to grace the auspicious occasion and celebrate the
          </p>
          <div className="py-1">
            <h3 className="font-cinzel text-xl sm:text-2xl md:text-3xl tracking-[0.24em] sm:tracking-[0.28em] text-[#721B29] font-semibold uppercase">
              Engagement Ceremony
            </h3>
            <p className="font-luxury italic text-sm sm:text-base text-[#6B5A4B] mt-1">
              of their beloved children
            </p>
          </div>

          {/* Couple Names Cinematic Highlight */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            className="pt-2 transform-gpu"
          >
            <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl tracking-[0.22em] text-[#3D3022] uppercase font-semibold">
              Thamim Ansari
            </h2>
            <p className="font-luxury italic text-sm sm:text-base text-[#A3927C] my-1">&amp;</p>
            <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl tracking-[0.22em] text-[#3D3022] uppercase font-semibold">
              Nihal
            </h2>
          </motion.div>

          {/* Authentic Islamic Dua for the Newly Engaged */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="pt-5 pb-2 transform-gpu"
          >
            <p
              dir="rtl"
              className="font-arabic text-xl sm:text-2xl md:text-3xl text-[#721B29] tracking-wide leading-loose"
            >
              بَارَكَ ٱللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
            </p>
            <p className="font-luxury italic text-xs sm:text-sm text-[#8A7968] tracking-wide mt-1">
              “May Allah bless you both, shower His blessings upon you, and unite you both in goodness.”
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* =========================================================
          SECTION 2: CEREMONY SCHEDULE & AUSPICIOUS DATE CALENDAR
          ========================================================= */}
      <div className="mb-14 sm:mb-18">
        {/* Schedule Header & Auspicious Date Pill */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center mb-6 transform-gpu"
        >
          <p className="font-cinzel text-xs sm:text-sm tracking-[0.3em] text-[#721B29] uppercase font-bold">
            Saturday Morning Program
          </p>
          <h3 className="font-cinzel text-xl sm:text-2xl md:text-3xl tracking-[0.22em] text-[#2E070F] uppercase font-bold mt-1.5">
            Ceremony Schedule &amp; Date
          </h3>
          <div className="inline-flex flex-col items-center gap-1 mt-2.5 px-5 py-2.5 rounded-2xl bg-[#721B29]/8 border border-[#721B29]/25 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#721B29] shrink-0 animate-pulse" />
              <p className="font-cinzel text-xs sm:text-sm text-[#4A0D17] font-bold tracking-wider">
                Saturday, 26 September 2026
              </p>
            </div>
            <p className="font-cinzel text-[11px] sm:text-xs text-[#721B29] font-bold tracking-wide uppercase">
              Morning 9:00 AM – 4:00 PM
            </p>
            <p className="font-luxury italic text-xs sm:text-sm text-[#721B29] font-bold tracking-wide">
              14 Rabi&apos; al-Awwal 1448 AH
            </p>
          </div>
        </motion.div>

        {/* The September 2026 Calendar & Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="transform-gpu"
        >
          <SeptemberCalendar />
        </motion.div>

        {/* Engagement Schedule Cards with Smooth, Jitter-Free Entrance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-8">
          {/* Card 1: Ring Exchange & Alliance */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.65, delay: 0.1, ease: 'easeOut' }}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="relative isolate bg-white/95 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-[#EADBCA] shadow-[0_4px_16px_rgba(95,44,18,0.06)] flex flex-col justify-between overflow-hidden transition-shadow hover:shadow-[0_8px_24px_rgba(95,44,18,0.1)] transform-gpu"
          >
            {/* Top Red Wine & Gold Accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-[2px] bg-gradient-to-r from-transparent via-[#721B29]/60 to-transparent" />
            <img
              src="/flowers.avif"
              alt=""
              aria-hidden="true"
              className="absolute -z-10 -top-10 -left-10 w-28 sm:w-36 rotate-[18deg] opacity-70 pointer-events-none select-none"
            />
            <img
              src="/flowers.avif"
              alt=""
              aria-hidden="true"
              className="absolute -z-10 -right-10 -bottom-10 w-28 sm:w-36 -rotate-[162deg] opacity-70 pointer-events-none select-none"
            />

            <div>
              {/* Header: Responsive Pill & Time */}
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 mb-3 sm:mb-4">
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="w-5 h-5 rounded-full bg-[#721B29]/15 border border-[#721B29]/30 flex items-center justify-center text-[#721B29] text-[10px] font-cinzel font-bold shrink-0">
                    I
                  </span>
                  <span className="font-cinzel text-[10.5px] sm:text-xs tracking-[0.14em] sm:tracking-[0.18em] text-[#721B29] uppercase font-semibold px-2.5 py-1 rounded-full bg-[#F9E8EC] border border-[#C98A96] shrink-0">
                    Morning Ceremony
                  </span>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FAF5EE] border border-[#E7D6C2] text-[11px] sm:text-xs font-cinzel text-[#721B29] tracking-wider shrink-0 ml-auto sm:ml-0 font-semibold">
                  <Clock className="w-3.5 h-3.5 text-[#721B29] shrink-0" />
                  <span>9:00 AM Onwards</span>
                </div>
              </div>

              <h4 className="font-cinzel text-base sm:text-lg md:text-xl text-[#3D3022] uppercase tracking-[0.12em] sm:tracking-[0.16em] font-semibold leading-snug">
                Ring Exchange &amp; Blessings
              </h4>
              <p className="font-luxury italic text-xs sm:text-sm md:text-base text-[#6E5E4E] mt-2 leading-relaxed">
                Welcoming of honored guests, Quranic recitation, formal engagement alliance announcement, exchange of rings, and elders&apos; blessings for the couple.
              </p>
            </div>

            {/* Footer Meal Detail */}
            <div className="relative z-10 pt-3.5 sm:pt-4 mt-4 sm:mt-5 border-t border-[#EAE3D9]/70 flex items-center justify-between gap-2 text-xs sm:text-sm">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-1.5 h-1.5 rotate-45 bg-[#721B29]/70 shrink-0" />
                <span className="font-luxury italic text-[#786857] truncate bg-[#FFFDF9] px-1 rounded">
                  Welcoming Sharbat &amp; Morning Refreshments
                </span>
              </div>
              <span className="font-cinzel tracking-wider text-[#721B29] font-semibold shrink-0 bg-[#721B29]/10 px-2 py-0.5 rounded border border-[#721B29]/20 text-[11px] sm:text-xs">
                9:00 AM
              </span>
            </div>
          </motion.div>

          {/* Card 2: Engagement Reception */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.65, delay: 0.15, ease: 'easeOut' }}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="relative isolate bg-white/95 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-[#EADBCA] shadow-[0_4px_16px_rgba(95,44,18,0.06)] flex flex-col justify-between overflow-hidden transition-shadow hover:shadow-[0_8px_24px_rgba(95,44,18,0.1)] transform-gpu"
          >
            {/* Top Red Wine Accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-[2px] bg-gradient-to-r from-transparent via-[#721B29]/60 to-transparent" />
            <img
              src="/flowers.avif"
              alt=""
              aria-hidden="true"
              className="absolute -z-10 -top-10 -right-10 w-28 sm:w-36 -rotate-[24deg] opacity-70 pointer-events-none select-none"
            />
            <img
              src="/flowers.avif"
              alt=""
              aria-hidden="true"
              className="absolute -z-10 -bottom-10 -left-10 w-28 sm:w-36 rotate-[155deg] opacity-70 pointer-events-none select-none"
            />

            <div>
              {/* Header: Responsive Pill & Time */}
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 mb-3 sm:mb-4">
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="w-5 h-5 rounded-full bg-[#721B29]/15 border border-[#721B29]/30 flex items-center justify-center text-[#721B29] text-[10px] font-cinzel font-bold shrink-0">
                    II
                  </span>
                  <span className="font-cinzel text-[10.5px] sm:text-xs tracking-[0.14em] sm:tracking-[0.18em] text-[#721B29] uppercase font-semibold px-2.5 py-1 rounded-full bg-[#F9E8EC] border border-[#C98A96] shrink-0">
                    Royal Banquet
                  </span>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FAF5EE] border border-[#E7D6C2] text-[11px] sm:text-xs font-cinzel text-[#721B29] tracking-wider shrink-0 ml-auto sm:ml-0 font-semibold">
                  <Clock className="w-3.5 h-3.5 text-[#721B29] shrink-0" />
                  <span>12:00 PM – 4:00 PM</span>
                </div>
              </div>

              <h4 className="font-cinzel text-base sm:text-lg md:text-xl text-[#3D3022] uppercase tracking-[0.12em] sm:tracking-[0.16em] font-semibold leading-snug">
                Felicitations &amp; Grand Feast
              </h4>
              <p className="font-luxury italic text-xs sm:text-sm md:text-base text-[#6E5E4E] mt-2 leading-relaxed">
                Joyful gathering of family and friends, congratulatory felicitations, photography, followed by the grand traditional lunch feast continuing till 4:00 PM.
              </p>
            </div>

            {/* Footer Meal Detail */}
            <div className="relative z-10 pt-3.5 sm:pt-4 mt-4 sm:mt-5 border-t border-[#EAE3D9]/70 flex items-center justify-between gap-2 text-xs sm:text-sm">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-1.5 h-1.5 rotate-45 bg-[#721B29]/70 shrink-0" />
                {/* <span className="font-luxury italic text-[#786857] truncate bg-[#FFFDF9] px-1 rounded">
                  Traditional Muslim Biryani Lunch Feast
                </span> */}
              </div>
              <span className="font-cinzel tracking-wider text-[#721B29] font-semibold shrink-0 bg-[#721B29]/10 px-2 py-0.5 rounded border border-[#721B29]/20 text-[11px] sm:text-xs">
                12:30 PM
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* =========================================================
          SECTION 3: VENUE & GOOGLE MAPS NAVIGATION
          ========================================================= */}
      <motion.div
        id="venue-navigation-section"
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="mb-14 sm:mb-18 transform-gpu"
      >
        <div className="relative isolate overflow-hidden bg-white/95 rounded-3xl p-5 sm:p-8 md:p-10 border border-[#EADBCA] shadow-[0_6px_24px_rgba(95,44,18,0.06)]">
          <img
            src="/flowers.avif"
            alt=""
            aria-hidden="true"
            className="absolute -z-10 -top-16 -left-16 w-40 sm:w-52 rotate-[22deg] opacity-60 pointer-events-none select-none"
          />
          <img
            src="/flowers.avif"
            alt=""
            aria-hidden="true"
            className="absolute -z-10 -right-16 -bottom-16 w-40 sm:w-52 -rotate-[158deg] opacity-60 pointer-events-none select-none"
          />
          {/* Header */}
          <div className="text-center max-w-xl mx-auto">
            <div className="w-12 h-12 rounded-full bg-[#721B29]/10 border border-[#721B29]/30 flex items-center justify-center text-[#721B29] mx-auto mb-3.5 shadow-xs">
              <MapPin className="w-5 h-5" />
            </div>

            <p className="font-cinzel text-xs tracking-[0.28em] text-[#721B29] uppercase font-semibold">
              Celebration Venue
            </p>
            <h3 className="font-cinzel text-xl sm:text-2xl md:text-3xl text-[#3D3022] uppercase tracking-[0.18em] font-semibold mt-1">
              {venueName}
            </h3>
            {/* Venue Address */}
            <p className="font-sans-clean text-sm sm:text-base text-[#3A2A1E] font-medium mt-2 max-w-xl mx-auto leading-relaxed">
              {venueAddress}
            </p>

            {/* Quick Venue Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-[11px] sm:text-xs font-cinzel text-[#8A6D3B]">
              <span className="px-3 py-1 rounded-full bg-[#721B29]/5 border border-[#721B29]/15">
                ✦ Kalyana Mandapam &amp; AC Banquet Hall
              </span>
              <span className="px-3 py-1 rounded-full bg-[#721B29]/5 border border-[#721B29]/15">
                ✦ Guest Parking Available
              </span>
              <span className="px-3 py-1 rounded-full bg-[#721B29]/5 border border-[#721B29]/15">
                ✦ Vyasarpadi, Chennai
              </span>
            </div>
          </div>

          {/* Interactive Embedded Google Map */}
          <div className="mt-7 rounded-2xl overflow-hidden border border-[#E8DCCB] shadow-inner bg-[#FAF7F2] relative">
            <div className="w-full h-[280px] sm:h-[360px] relative">
              <iframe
                id="google-maps-embed-frame"
                title="Royal Mahal Google Map"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                src={embedMapUrl}
                className="w-full h-full"
              />
            </div>

            {/* Bottom Map Bar with Full Address & Actions */}
            <div className="p-3.5 sm:p-4 bg-[#FFFDF9] border-t border-[#E8DCCB] flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
              <div className="flex items-start gap-2.5 text-[#3D2E20] text-left w-full">
                <MapPin className="w-4 h-4 text-[#721B29] shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <span className="font-cinzel font-bold text-[#2E070F] text-xs sm:text-sm block tracking-wide">
                    {venueName}
                  </span>
                  <p className="font-sans-clean font-medium text-[#4A3B2C] text-xs sm:text-sm leading-relaxed mt-0.5 break-words">
                    {venueAddress}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end md:self-auto w-full sm:w-auto justify-end pt-1 md:pt-0">
                <button
                  id="btn-copy-venue-address"
                  type="button"
                  onClick={handleCopyAddress}
                  className="px-3.5 py-2 rounded-lg bg-white border border-[#D5C4AF] text-[#721B29] hover:bg-[#721B29] hover:text-white transition-all flex items-center gap-1.5 text-xs font-cinzel font-semibold cursor-pointer shadow-xs"
                  title="Copy Full Address"
                >
                  {addressCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-bold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#721B29]" />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>

                <a
                  id="btn-view-venue-maps"
                  href={mapsSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-lg bg-white border border-[#D5C4AF] text-[#721B29] hover:bg-[#721B29] hover:text-white transition-all flex items-center gap-1.5 text-xs font-cinzel font-semibold cursor-pointer shadow-xs"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>View in Maps</span>
                </a>
              </div>
            </div>
          </div>

          {/* Google Maps Legal Attribution */}
          <p className="text-[10px] text-[#A3927C] uppercase tracking-wider font-cinzel text-center mt-2">
            Google Maps
          </p>

          {/* Action Buttons: Primary Get Directions, Add to Calendar, Share */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mt-6 flex-wrap">
            <a
              id="btn-get-directions"
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-[#721B29] text-white text-xs font-cinzel tracking-[0.2em] uppercase font-semibold hover:bg-[#58141F] transition-all flex items-center gap-2.5 shadow-[0_4px_16px_rgba(114,27,41,0.25)] hover:scale-105 cursor-pointer"
            >
              <Navigation className="w-4 h-4 text-[#FAD5DC]" />
              <span>Get Directions</span>
            </a>

            <button
              id="btn-add-calendar"
              type="button"
              onClick={handleCalendarAdd}
              className="px-5 py-3 rounded-full bg-white border-2 border-[#721B29]/30 text-[#721B29] text-xs font-cinzel tracking-[0.18em] uppercase font-semibold hover:bg-[#721B29]/10 hover:border-[#721B29] transition-all flex items-center gap-2 shadow-sm hover:scale-105 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Add to Calendar</span>
            </button>

            <button
              id="btn-share-invitation"
              type="button"
              onClick={handleShare}
              className="px-4 py-3 rounded-full bg-white border-2 border-[#721B29]/30 text-[#721B29] text-xs font-cinzel tracking-[0.16em] uppercase font-semibold hover:bg-[#721B29]/10 hover:border-[#721B29] transition-all flex items-center gap-1.5 shadow-sm hover:scale-105 cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>{copied ? 'Copied!' : 'Share'}</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* =========================================================
          SECTION 4: FOOTER (Replay Intro & Quiet Sign-off)
          ========================================================= */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-center pt-8 border-t border-[#EAE3D9]/70 transform-gpu"
      >
        <p className="font-cinzel text-[11px] tracking-[0.28em] text-[#721B29] uppercase font-semibold">
          Thamim Ansari &amp; Nihal · Engagement Celebration
        </p>
        <p className="font-luxury italic text-xs text-[#9E8B75] mt-1">
          Saturday, 26 September 2026 · 9:00 AM – 4:00 PM · Royal Mahal, Chennai, India
        </p>

        {onReplay && (
          <button
            type="button"
            onClick={onReplay}
            className="mt-5 text-[10px] font-cinzel tracking-[0.24em] text-[#721B29] uppercase hover:underline opacity-85 hover:opacity-100 transition-opacity font-semibold cursor-pointer"
          >
            Replay Wax Seal Opening ✦
          </button>
        )}
      </motion.div>
    </section>
  );
}
