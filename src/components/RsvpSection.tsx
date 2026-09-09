import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { CheckCircle2, Send, Users, Phone, User, Heart, Sparkles } from 'lucide-react';
import { soundEngine } from '../utils/sound';

export function RsvpSection() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [guests, setGuests] = useState('2');
  const [attending, setAttending] = useState<'yes' | 'no'>('yes');
  const [wishes, setWishes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Check existing RSVP in localStorage
  useEffect(() => {
    const saved = localStorage.getItem('thamim_nihal_rsvp');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.name) {
          setName(parsed.name);
          setPhone(parsed.phone || '');
          setGuests(parsed.guests || '2');
          setAttending(parsed.attending || 'yes');
          setIsSubmitted(true);
        }
      } catch {
        // Ignore
      }
    }
  }, []);

  const triggerLuxuryConfetti = () => {
    // Champagne gold and blush petal confetti bursts
    const colors = ['#C9A86A', '#E8D9C0', '#D9B8AE', '#FFFDF9', '#E5C78E'];

    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.7 },
      colors: colors,
      disableForReducedMotion: true,
    });

    setTimeout(() => {
      confetti({
        particleCount: 40,
        angle: 60,
        spread: 55,
        origin: { x: 0.2, y: 0.65 },
        colors: colors,
      });
      confetti({
        particleCount: 40,
        angle: 120,
        spread: 55,
        origin: { x: 0.8, y: 0.65 },
        colors: colors,
      });
    }, 250);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    soundEngine.playSoftClick();

    setTimeout(() => {
      const record = {
        name: name.trim(),
        phone: phone.trim(),
        guests: attending === 'yes' ? guests : '0',
        attending,
        wishes: wishes.trim(),
        submittedAt: new Date().toISOString(),
      };

      localStorage.setItem('thamim_nihal_rsvp', JSON.stringify(record));
      setIsSubmitting(false);
      setIsSubmitted(true);
      triggerLuxuryConfetti();
      soundEngine.playRevealChime();
    }, 700);
  };

  return (
    <section
      id="rsvp-section"
      className="relative py-28 sm:py-36 px-6 max-w-3xl mx-auto text-center"
    >
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#C9A86A]/15 blur-3xl pointer-events-none" />

      {/* Header */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9 }}
        className="font-cinzel text-xs tracking-[0.35em] text-[#C9A86A] uppercase font-medium mb-3"
      >
        Kindly Respond
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.2, delay: 0.15 }}
        className="font-luxury text-4xl sm:text-5xl text-[#2C231A] font-light tracking-wide mb-4"
      >
        Will You Celebrate With Us?
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.0, delay: 0.25 }}
        className="font-sans-clean text-xs sm:text-sm text-[#736354] mb-12 tracking-wide"
      >
        Please let us know by September 15, 2026, so we may prepare for your arrival at Royal Mahal.
      </motion.p>

      {/* Main Form Container */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.1, delay: 0.35 }}
        className="relative rounded-3xl glass-luxury border border-[#C9A86A]/30 p-8 sm:p-12 shadow-[0_15px_45px_rgba(201,168,106,0.12)] text-left"
      >
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Attendance Choice */}
              <div>
                <label className="block font-cinzel text-xs tracking-wider text-[#59493B] uppercase mb-3">
                  Attendance Confirmation *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setAttending('yes');
                      soundEngine.playSoftClick();
                    }}
                    className={`flex items-center gap-3 p-4 rounded-xl border transition-all text-left ${
                      attending === 'yes'
                        ? 'border-[#C9A86A] bg-[#C9A86A]/15 text-[#2C231A] shadow-sm'
                        : 'border-[#C9A86A]/25 bg-white/50 text-[#736354] hover:border-[#C9A86A]/60'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        attending === 'yes' ? 'border-[#C9A86A] bg-[#C9A86A]' : 'border-gray-400'
                      }`}
                    >
                      {attending === 'yes' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <div>
                      <span className="font-luxury text-lg font-medium block">Joyfully Accept</span>
                      <span className="font-sans-clean text-[10px] text-[#806D5E]">
                        I / We will be delighted to attend
                      </span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setAttending('no');
                      soundEngine.playSoftClick();
                    }}
                    className={`flex items-center gap-3 p-4 rounded-xl border transition-all text-left ${
                      attending === 'no'
                        ? 'border-[#C9A86A] bg-[#C9A86A]/15 text-[#2C231A] shadow-sm'
                        : 'border-[#C9A86A]/25 bg-white/50 text-[#736354] hover:border-[#C9A86A]/60'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        attending === 'no' ? 'border-[#C9A86A] bg-[#C9A86A]' : 'border-gray-400'
                      }`}
                    >
                      {attending === 'no' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <div>
                      <span className="font-luxury text-lg font-medium block">Regretfully Decline</span>
                      <span className="font-sans-clean text-[10px] text-[#806D5E]">
                        Celebrating with you in spirit
                      </span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label
                  htmlFor="rsvp-name-input"
                  className="block font-cinzel text-xs tracking-wider text-[#59493B] uppercase mb-2"
                >
                  Your Full Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#C9A86A]">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    id="rsvp-name-input"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Dr. Aamir Khan & Family"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/80 border border-[#C9A86A]/30 focus:border-[#C9A86A] focus:ring-2 focus:ring-[#C9A86A]/20 font-sans-clean text-sm text-[#2C231A] outline-none transition-all"
                  />
                </div>
              </div>

              {/* Contact Phone & Number of Guests (Grid) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Phone Number */}
                <div>
                  <label
                    htmlFor="rsvp-phone-input"
                    className="block font-cinzel text-xs tracking-wider text-[#59493B] uppercase mb-2"
                  >
                    Phone / WhatsApp *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#C9A86A]">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      id="rsvp-phone-input"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/80 border border-[#C9A86A]/30 focus:border-[#C9A86A] focus:ring-2 focus:ring-[#C9A86A]/20 font-sans-clean text-sm text-[#2C231A] outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Guests Count */}
                <div>
                  <label
                    htmlFor="rsvp-guests-select"
                    className="block font-cinzel text-xs tracking-wider text-[#59493B] uppercase mb-2"
                  >
                    Total Number of Guests
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#C9A86A]">
                      <Users className="w-4 h-4" />
                    </div>
                    <select
                      id="rsvp-guests-select"
                      disabled={attending === 'no'}
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/80 border border-[#C9A86A]/30 focus:border-[#C9A86A] focus:ring-2 focus:ring-[#C9A86A]/20 font-sans-clean text-sm text-[#2C231A] outline-none transition-all disabled:opacity-50"
                    >
                      <option value="1">1 Person</option>
                      <option value="2">2 People</option>
                      <option value="3">3 People</option>
                      <option value="4">4 People</option>
                      <option value="5">5+ Family Members</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Special Wishes / Message for the Couple */}
              <div>
                <label
                  htmlFor="rsvp-wishes-input"
                  className="block font-cinzel text-xs tracking-wider text-[#59493B] uppercase mb-2"
                >
                  Warm Wishes / Dietary Notes (Optional)
                </label>
                <textarea
                  id="rsvp-wishes-input"
                  rows={2}
                  value={wishes}
                  onChange={(e) => setWishes(e.target.value)}
                  placeholder="Share a heartfelt blessing or message for Thamim & Nihal..."
                  className="w-full px-4 py-3 rounded-xl bg-white/80 border border-[#C9A86A]/30 focus:border-[#C9A86A] focus:ring-2 focus:ring-[#C9A86A]/20 font-sans-clean text-sm text-[#2C231A] outline-none transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  id="rsvp-submit-btn"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#C9A86A] via-[#DFBF82] to-[#C9A86A] hover:opacity-95 text-[#1C1610] font-cinzel text-sm tracking-[0.25em] font-semibold uppercase shadow-[0_4px_20px_rgba(201,168,106,0.35)] hover:shadow-[0_4px_28px_rgba(201,168,106,0.5)] transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 animate-spin text-[#1C1610]" />
                      Recording RSVP...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-4 h-4 text-[#1C1610]" />
                      Confirm RSVP
                    </span>
                  )}
                </button>
              </div>
            </form>
          ) : (
            /* Success View */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="py-8 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-[#C9A86A]/20 border border-[#C9A86A] mx-auto flex items-center justify-center text-[#C9A86A] mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h3 className="font-luxury text-3xl sm:text-4xl text-[#2C231A] font-light mb-3">
                Thank you for celebrating with us 🤍
              </h3>

              <p className="font-sans-clean text-sm text-[#6B5A4D] max-w-md mx-auto mb-6">
                Your response has been lovingly received. We eagerly look forward to sharing this
                magical evening with you, <strong className="text-[#2C231A]">{name}</strong>!
              </p>

              <div className="p-4 rounded-xl bg-white/60 border border-[#C9A86A]/20 max-w-sm mx-auto text-xs text-[#736354] space-y-1 mb-6">
                <p>
                  Status:{' '}
                  <span className="font-semibold text-[#2C231A]">
                    {attending === 'yes' ? 'Joyfully Attending' : 'Regretfully Declined'}
                  </span>
                </p>
                {attending === 'yes' && (
                  <p>
                    Party Size: <span className="font-semibold text-[#2C231A]">{guests} Guest(s)</span>
                  </p>
                )}
                <p>
                  Event Date: <span className="font-semibold text-[#2C231A]">Saturday, September 26, 2026 (Morning 9:00 AM – 4:00 PM)</span>
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsSubmitted(false)}
                className="font-sans-clean text-xs tracking-wider text-[#C9A86A] underline hover:text-[#9E7C3E] transition-colors"
              >
                Need to edit your response? Click here
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
