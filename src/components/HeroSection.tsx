import React, { useState, useEffect } from 'react';
import { SawToothDivider } from './SawToothDivider';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown
} from 'lucide-react';

interface HeroSectionProps {
  onExploreClick: () => void;
  onOpenEnquiry?: () => void;
  onOpenSauces?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
}) => {
  const [scrollY, setScrollY] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const dishes = [
    {
      title: 'GOLDEN MANTAO',
      tagline: 'Soon-to-be classic. Soon-to-be devoured.',
      subtext: 'Deep-fried golden brown pillows drizzled with our signature creamy spiced buttermilk dip.',
      image: '/mantao-box.png',
      badge: 'Malaysian Event Favorite',
    },
    {
      title: 'CREAMY BUTTERMILK DIP',
      tagline: 'Velvety rich. Aromatic chili flakes & curry leaves.',
      subtext: 'Crafted with premium dairy butter, evaporated milk, and fragrant bird’s eye chili.',
      image: '/mantao-box.png',
      badge: '#1 Signature Dip',
    }
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % dishes.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + dishes.length) % dishes.length);

  return (
    <section className="relative cream-canvas overflow-hidden pt-10 pb-16 lg:pt-14 lg:pb-24 select-none">
      
      {/* ================= PARALLAX SCROLLING BACKGROUND ================= */}
      {/* Parallax Layer 1: Giant Watermark Logo behind hero */}
      <div
        className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.06] will-change-transform"
        style={{
          transform: `translateY(${scrollY * 0.28}px)`,
        }}
      >
        <span className="font-brand text-[220px] sm:text-[340px] text-[#2F1B11] leading-none select-none tracking-tight">
          mantao.
        </span>
      </div>

      {/* Parallax Layer 2: Subtle Floating Spice & Herb Accents */}
      <div
        className="absolute inset-0 pointer-events-none will-change-transform"
        style={{
          transform: `translateY(${scrollY * -0.15}px)`,
        }}
      >
        <div className="absolute top-16 left-[12%] w-3 h-3 rounded-full bg-[#C4272F]/30 blur-[1px] animate-pulse" />
        <div className="absolute top-44 right-[15%] w-4 h-4 rounded-full bg-amber-500/20 blur-[1px]" />
        <div className="absolute bottom-28 left-[18%] w-3 h-3 rounded-full bg-emerald-700/20 blur-[1px]" />
      </div>

      {/* ================= HERO CONTENT ================= */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Main Title matching reference typography: Big Red All-Caps with entrance animation */}
        <div className="space-y-2 mb-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            <AnimatePresence mode="wait">
              <motion.h1
                key={`title-${currentSlide}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="font-heading font-extrabold text-4xl sm:text-6xl lg:text-7xl text-[#C4272F] tracking-tight uppercase drop-shadow-sm"
              >
                {dishes[currentSlide].title}
              </motion.h1>
            </AnimatePresence>
          </motion.div>

          {/* Subtitle in red/warm brown script/italic with entrance animation */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={`tagline-${currentSlide}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="font-script text-xl sm:text-2xl lg:text-3xl text-[#9E2A2B] tracking-wide"
              >
                {dishes[currentSlide].tagline}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          {/* Subtext description with entrance animation */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={`subtext-${currentSlide}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="max-w-xl mx-auto text-xs sm:text-sm text-[#6C5343] font-medium pt-1"
              >
                {dishes[currentSlide].subtext}
              </motion.p>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Carousel Food Visual Showcase with entrance animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.93, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-2xl mx-auto py-6 sm:py-8 flex items-center justify-center"
        >
          {/* Left Arrow Button matching reference */}
          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            className="absolute left-1 sm:left-0 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#FAF5EB]/90 hover:bg-[#FAF5EB] text-[#6C5343] hover:text-[#C4272F] flex items-center justify-center shadow-md border border-[#E0D3C1] transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
          </button>

          {/* Central Hero Image: The user's actual Malaysian fried golden mantao with buttermilk dip */}
          <div className="relative group max-w-full">
            {/* Background radial glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-amber-400/20 via-orange-300/10 to-transparent rounded-full blur-2xl transform scale-90 -z-10" />

            {/* Platter Card with soft drop shadow */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl p-2 sm:p-3 bg-white/70 backdrop-blur-sm border-2 border-[#EADCC9] transition-transform duration-500 group-hover:scale-[1.02] max-w-full">
              <AnimatePresence mode="wait">
                <motion.img
                  key={`image-${currentSlide}`}
                  src={dishes[currentSlide].image}
                  alt="Malaysian Style Golden Fried Mantao with Buttermilk Dip"
                  initial={{ opacity: 0.8, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0.8, scale: 0.98 }}
                  transition={{ duration: 0.35 }}
                  className="w-full max-w-[460px] sm:max-w-[500px] h-auto rounded-2xl object-cover shadow-inner"
                />
              </AnimatePresence>
            </div>
          </div>

          {/* Right Arrow Button matching reference */}
          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className="absolute right-1 sm:right-0 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#FAF5EB]/90 hover:bg-[#FAF5EB] text-[#6C5343] hover:text-[#C4272F] flex items-center justify-center shadow-md border border-[#E0D3C1] transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
          </button>
        </motion.div>

        {/* Action Button with entrance animation */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.52, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center pt-2"
        >
          <button
            onClick={onExploreClick}
            className="px-8 py-3.5 rounded-full bg-[#C4272F] hover:bg-[#A81E26] text-white font-heading font-bold text-xs uppercase tracking-widest shadow-xl shadow-[#C4272F]/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 border border-white/20"
          >
            <span>Explore Event Packages</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </button>
        </motion.div>

      </div>

      {/* Bottom Pinking-Shear Sawtooth Divider transitioning into the wood product section */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <SawToothDivider fillColor="#2F1B11" inverted={false} />
      </div>

    </section>
  );
};
