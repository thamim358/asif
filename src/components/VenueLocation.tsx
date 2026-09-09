import { motion } from 'motion/react';
import { MapPin, Navigation, Compass, ExternalLink, Sparkles } from 'lucide-react';

export function VenueLocation() {
  const venueName = 'Royal Mahal';
  const venueAddress = '175, Erukkenchery High Rd, Sharma Nagar, Vyasarpadi, Chennai, Tamil Nadu 600039';
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'Royal Mahal, 175, Erukkenchery High Rd, Sharma Nagar, Vyasarpadi, Chennai, Tamil Nadu 600039'
  )}`;

  return (
    <section
      id="venue-location-section"
      className="relative py-28 sm:py-36 px-6 max-w-5xl mx-auto text-center"
    >
      {/* Eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.0 }}
        className="flex items-center justify-center gap-2 mb-3"
      >
        <Sparkles className="w-3.5 h-3.5 text-[#C9A86A]" />
        <span className="font-cinzel text-xs tracking-[0.35em] text-[#C9A86A] uppercase font-medium">
          Where We Celebrate
        </span>
        <Sparkles className="w-3.5 h-3.5 text-[#C9A86A]" />
      </motion.div>

      {/* Main Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.2, delay: 0.15 }}
        className="font-luxury text-4xl sm:text-5xl md:text-6xl text-[#2C231A] font-light tracking-wide mb-14"
      >
        Where Our Story Begins
      </motion.h2>

      {/* Main Luxury Venue Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.2, delay: 0.25 }}
        className="relative overflow-hidden rounded-3xl glass-luxury border border-[#C9A86A]/30 shadow-[0_15px_40px_rgba(201,168,106,0.1)] p-8 sm:p-12"
      >
        {/* Decorative corner borders */}
        <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-[#C9A86A]/40" />
        <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-[#C9A86A]/40" />
        <div className="absolute bottom-3 left-3 w-6 h-6 border-b border-l border-[#C9A86A]/40" />
        <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-[#C9A86A]/40" />

        {/* Animated Golden Map Pin with Ripple Effect */}
        <div className="relative my-4 flex items-center justify-center">
          {/* Ripple Waves */}
          <div className="absolute w-20 h-20 rounded-full border border-[#C9A86A]/30 animate-ping opacity-75" />
          <div className="absolute w-28 h-28 rounded-full border border-[#C9A86A]/20 animate-pulse" />

          {/* Central Glowing Pin Orb */}
          <div className="relative z-10 w-14 h-14 rounded-full bg-gradient-to-tr from-[#C9A86A] via-[#F5E1B5] to-[#C9A86A] p-[2px] shadow-[0_0_25px_rgba(201,168,106,0.6)]">
            <div className="w-full h-full rounded-full bg-[#1A140F] flex items-center justify-center text-[#F5E1B5]">
              <MapPin className="w-6 h-6 text-[#E5C78E] animate-bounce" />
            </div>
          </div>
        </div>

        {/* Venue Name */}
        <h3 className="font-luxury text-3xl sm:text-4xl text-[#2C231A] font-normal tracking-wide mt-6 mb-3">
          {venueName}
        </h3>

        {/* Full Venue Address */}
        <p className="font-sans-clean text-sm sm:text-base text-[#6E5D4F] max-w-md mx-auto leading-relaxed">
          {venueAddress}
        </p>

        {/* Divider */}
        <div className="my-8 w-24 h-[1px] bg-gradient-to-r from-transparent via-[#C9A86A]/50 to-transparent mx-auto" />

        {/* Interactive Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          {/* VIEW LOCATION Button */}
          <a
            id="venue-view-location-link"
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 px-7 py-3 rounded-full border border-[#C9A86A] bg-transparent hover:bg-[#C9A86A] text-[#3D332A] hover:text-[#1A140F] font-cinzel text-xs tracking-[0.2em] uppercase transition-all duration-300 shadow-sm hover:shadow-[0_0_20px_rgba(201,168,106,0.4)]"
          >
            <Compass className="w-4 h-4 text-[#C9A86A] group-hover:text-[#1A140F] transition-colors" />
            <span>View Location</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
          </a>

          {/* GET DIRECTIONS Button */}
          <a
            id="venue-get-directions-link"
            href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
              'Royal Mahal, 175, Erukkenchery High Rd, Sharma Nagar, Vyasarpadi, Chennai, Tamil Nadu 600039'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-[#C9A86A] hover:bg-[#B89658] text-[#1A140F] font-cinzel text-xs tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_4px_16px_rgba(201,168,106,0.35)] hover:shadow-[0_4px_22px_rgba(201,168,106,0.5)]"
          >
            <Navigation className="w-4 h-4" />
            <span>Get Directions</span>
          </a>
        </div>

        {/* Luxury Details Footnote: Attire & Valet */}
        <div className="mt-10 pt-8 border-t border-[#C9A86A]/20 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto text-left sm:text-center text-xs text-[#736354]">
          <div className="p-3 rounded-xl bg-white/40">
            <span className="font-cinzel text-[10px] tracking-widest text-[#C9A86A] uppercase block mb-1">
              Dress Code
            </span>
            <span className="font-sans-clean text-[#4A3D31]">
              Formal Festive / Champagne & Pastel Elegance
            </span>
          </div>
          <div className="p-3 rounded-xl bg-white/40">
            <span className="font-cinzel text-[10px] tracking-widest text-[#C9A86A] uppercase block mb-1">
              Guest Parking
            </span>
            <span className="font-sans-clean text-[#4A3D31]">
              Complimentary Valet Parking Available
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
