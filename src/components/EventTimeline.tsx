import { motion } from 'motion/react';
import { Clock, Sparkles, UtensilsCrossed, Heart } from 'lucide-react';

export function EventTimeline() {
  const events = [
    {
      title: 'Arrival & Welcome Reception',
      time: '10:00 AM',
      desc: 'Guest arrivals, welcome refreshments & morning sharbat',
      icon: Clock,
    },
    {
      title: 'Engagement Ceremony & Rings',
      time: '10:30 AM',
      desc: 'The traditional ring exchange, Quranic recitation & formal announcement',
      icon: Sparkles,
      highlight: true,
    },
    {
      title: 'Blessings & Felicitations',
      time: '11:45 AM',
      desc: 'Family blessings, felicitations with the couple',
      icon: Heart,
    },
    {
      title: 'Celebratory Grand Feast',
      time: '12:30 PM – 2:00 PM',
      desc: 'Exquisite traditional banquet feast & celebratory desserts',
      icon: UtensilsCrossed,
    },
  ];

  return (
    <section
      id="event-timeline-section"
      className="relative py-28 sm:py-36 px-6 max-w-4xl mx-auto"
    >
      {/* Section Header */}
      <div className="text-center mb-16">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.0 }}
          className="font-cinzel text-xs tracking-[0.35em] text-[#C9A86A] uppercase font-medium mb-3"
        >
          Program of the Day
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.2, delay: 0.15 }}
          className="font-luxury text-4xl sm:text-5xl text-[#2C231A] font-light uppercase tracking-wider"
        >
          The Celebration
        </motion.h2>

        <div className="mt-4 w-16 h-[1px] bg-gradient-to-r from-transparent via-[#C9A86A] to-transparent mx-auto" />
      </div>

      {/* Floating Glass-Like Cards Timeline */}
      <div className="relative space-y-6 sm:space-y-8">
        {/* Subtle Golden Vertical Connector Line */}
        <div className="absolute left-8 sm:left-1/2 top-4 bottom-4 w-[1px] bg-gradient-to-b from-transparent via-[#C9A86A]/35 to-transparent -translate-x-1/2" />

        {events.map((evt, idx) => {
          const Icon = evt.icon;
          const isEven = idx % 2 === 0;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, delay: idx * 0.12 }}
              className={`relative flex flex-col sm:flex-row items-center gap-6 ${
                isEven ? 'sm:flex-row' : 'sm:flex-row-reverse'
              }`}
            >
              {/* Event Content Card */}
              <div
                className={`w-full sm:w-[calc(50%-2rem)] pl-16 sm:pl-0 ${
                  isEven ? 'sm:text-right' : 'sm:text-left'
                }`}
              >
                <div
                  className={`p-6 sm:p-7 rounded-2xl glass-luxury border ${
                    evt.highlight
                      ? 'border-[#C9A86A]/45 shadow-[0_8px_30px_rgba(201,168,106,0.12)] ring-1 ring-[#C9A86A]/20'
                      : 'border-[#C9A86A]/20 shadow-sm'
                  } transition-all duration-300 hover:border-[#C9A86A]/50`}
                >
                  <div className="flex items-center gap-2 mb-2 justify-start sm:justify-start">
                    {evt.highlight && (
                      <span className="px-2.5 py-0.5 rounded-full bg-[#C9A86A]/15 border border-[#C9A86A]/30 text-[9px] font-cinzel text-[#9C7A3C] tracking-widest uppercase">
                        Ceremony
                      </span>
                    )}
                  </div>

                  <span className="font-cinzel text-xs tracking-widest text-[#C9A86A] uppercase font-semibold block">
                    {evt.time}
                  </span>

                  <h3 className="font-luxury text-2xl text-[#2C231A] font-medium mt-1 mb-2">
                    {evt.title}
                  </h3>

                  <p className="font-sans-clean text-xs text-[#736354] leading-relaxed">
                    {evt.desc}
                  </p>
                </div>
              </div>

              {/* Central Floating Icon Badge */}
              <div className="absolute left-8 sm:left-1/2 -translate-x-1/2 flex items-center justify-center">
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110 ${
                    evt.highlight
                      ? 'bg-gradient-to-br from-[#EFE5D2] to-[#FFFDF9] border-2 border-[#C9A86A] shadow-[0_0_15px_rgba(201,168,106,0.4)]'
                      : 'bg-[#FFFDF9] border border-[#C9A86A]/40 shadow-sm'
                  }`}
                >
                  <Icon className="w-4 h-4 text-[#C9A86A]" strokeWidth={1.5} />
                </div>
              </div>

              {/* Space filler for the opposite side in 2-column desktop */}
              <div className="hidden sm:block w-[calc(50%-2rem)]" />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
