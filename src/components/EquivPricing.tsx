import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import type { WeddingPackage } from '../types';
import { WEDDING_PACKAGES } from '../data/packagesData';

// Synthesized tactile mechanical click using native Web Audio API
const playClickSFX = (freq = 850, type = 'high') => {
  if (typeof window === 'undefined') return;
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(type === 'high' ? freq : 380, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(type === 'high' ? 220 : 120, ctx.currentTime + 0.035);
    gain.gain.setValueAtTime(0.045, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(1e-4, ctx.currentTime + 0.035);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.035);
  } catch {
    // Silently handled
  }
};

// Crisp High-Tension Liquid Button with Magnetic Cursor Follow
function LiquidButton({ ctaText, onClick }: { ctaText: string; onClick: () => void }) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [cursorOrigin, setCursorOrigin] = useState({ x: 50, y: 50 });
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  const fluidX = useSpring(mouseX, { stiffness: 320, damping: 26 });
  const fluidY = useSpring(mouseY, { stiffness: 320, damping: 26 });

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCursorOrigin({ x, y });
    mouseX.set(x);
    mouseY.set(y);
    setIsHovered(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.button
      ref={buttonRef}
      type="button"
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        playClickSFX(1020);
        onClick();
      }}
      whileTap={{ scale: 0.98 }}
      className="relative z-10 w-full py-3.5 px-5 rounded-full border border-white/20 outline-none cursor-pointer overflow-hidden transition-all duration-300"
      style={{
        backgroundColor: 'rgba(196, 39, 47, 0.9)',
        boxShadow: isHovered
          ? '0 12px 30px -6px rgba(196, 39, 47, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
          : '0 4px 16px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
      }}
    >
      {/* Expanding Liquid Splash on Hover */}
      <motion.div
        initial={false}
        animate={{ scale: isHovered ? 3.4 : 0, opacity: isHovered ? 1 : 0 }}
        transition={{ type: 'spring', stiffness: 220, damping: 26, mass: 0.75 }}
        style={{
          position: 'absolute',
          left: cursorOrigin.x - 65,
          top: cursorOrigin.y - 65,
          width: 130,
          height: 130,
          borderRadius: '48% 52% 58% 42% / 44% 56% 44% 56%',
          background: '#FAF5EB',
          pointerEvents: 'none',
        }}
      />

      {/* Rotating Fluid Follower */}
      <motion.div
        animate={{
          rotate: isHovered ? [0, 180, 360] : 0,
          borderRadius: isHovered
            ? [
                '45% 55% 60% 40% / 48% 52% 48% 52%',
                '55% 45% 40% 60% / 54% 46% 54% 46%',
                '45% 55% 60% 40% / 48% 52% 48% 52%',
              ]
            : '50%',
        }}
        transition={{
          rotate: { repeat: Infinity, duration: 4.5, ease: 'linear' },
          borderRadius: { repeat: Infinity, duration: 2.8, ease: 'easeInOut' },
        }}
        style={{
          position: 'absolute',
          left: fluidX,
          top: fluidY,
          x: '-50%',
          y: '-50%',
          width: 120,
          height: 120,
          background: '#FAF5EB',
          pointerEvents: 'none',
          opacity: isHovered ? 0.95 : 0,
          transition: 'opacity 0.2s ease',
        }}
      />

      {/* Button Content Label */}
      <div
        className="relative z-20 flex items-center justify-center gap-2 text-xs font-heading font-bold uppercase tracking-wider transition-colors duration-200"
        style={{ color: isHovered ? '#2F1B11' : '#ffffff' }}
      >
        <span>{ctaText}</span>
        <motion.svg
          animate={{ x: isHovered ? 3 : 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 22 }}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </motion.svg>
      </div>
    </motion.button>
  );
}

// Rich Deliverable Feature Details for each of the 3 Packages
interface FeatureItem {
  title: string;
  detail: string;
}

const PACKAGE_DELIVERABLES: Record<string, FeatureItem[]> = {
  'silver-gathering': [
    {
      title: 'Up to 900 Golden Fried Mantao',
      detail: 'Crispy golden exterior with pillow-soft interior, portioned for 3 pieces per guest for cocktail or tea hour.',
    },
    {
      title: '2 Signature Dips',
      detail: 'Choose 2 dips from Buttermilk Salted Egg, Vanilla Cinnamon, Pandan Custard, and Milk Chocolate.',
    },
  ],
  'gold-celebration': [
    {
      title: 'Up to 1,500 Golden Fried Mantao',
      detail: 'Abundant supply freshly prepared in batches for 300 to 500 guests with maximum crunch and fluffiness.',
    },
    {
      title: '3 Signature Dips with Free Refills',
      detail: 'Choose 3 dips from Buttermilk Salted Egg, Vanilla Cinnamon, Pandan Custard, and Milk Chocolate, with unlimited sauce refills.',
    },
  ],
  'platinum-grand': [
    {
      title: 'Up to 3,000 Golden Fried Mantao (Full Flow)',
      detail: 'Continuous live flow for 500 to 1,000 guests, ensuring piping-hot buns are replenished without interruption.',
    },
    {
      title: 'All 4 Signature Dips with Heated Dispensers',
      detail: 'All 4 dips: Buttermilk Salted Egg, Vanilla Cinnamon, Pandan Custard, and Milk Chocolate in dedicated sauce dispensers.',
    },
  ],
};

interface EquivPricingProps {
  onSelectPackage: (pkg: WeddingPackage) => void;
  onOpenSauces: () => void;
}

export const EquivPricing: React.FC<EquivPricingProps> = ({ onSelectPackage }) => {
  const [selectedPackageIndex, setSelectedPackageIndex] = useState(1); // Default to Gold (middle package)
  const [openFeature, setOpenFeature] = useState<number | null>(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const currentPkg = WEDDING_PACKAGES[selectedPackageIndex];
  const deliverables = PACKAGE_DELIVERABLES[currentPkg.id] || [];

  // Animated Price Spring Interpolation
  const targetPrice = currentPkg.prices.MYR;
  const priceSpring = useSpring(targetPrice, { stiffness: 180, damping: 20 });
  const [displayPrice, setDisplayPrice] = useState(targetPrice);

  useEffect(() => {
    priceSpring.set(targetPrice);
  }, [targetPrice, priceSpring]);

  useEffect(() => {
    return priceSpring.on('change', (latest) => {
      setDisplayPrice(Math.round(latest));
    });
  }, [priceSpring]);

  const packageNames = ['Silver', 'Gold', 'Platinum'];

  return (
    <div className="w-full flex justify-center py-2 px-2 select-none">
      <div
        ref={cardRef}
        className="relative w-full max-w-[420px] rounded-3xl bg-[#1A0E08]/95 border border-white/10 p-6 sm:p-7 flex flex-col justify-between text-white overflow-hidden shadow-2xl transition-all duration-300"
        style={{
          boxShadow: '0 24px 60px -12px rgba(0, 0, 0, 0.85), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
        }}
      >
        {/* Subtle ambient warm back-glow inside card */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-0" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#C4272F]/10 rounded-full blur-2xl pointer-events-none -z-0" />

        {/* 1. TOP SEGMENTED PACKAGE PILL TOGGLE (Toggles between 3 Packages) */}
        <div className="relative z-10 flex justify-center mb-6">
          <div
            role="group"
            aria-label="Package Tier Selector"
            className="inline-flex w-full bg-black/40 rounded-full p-1 border border-white/10"
          >
            {WEDDING_PACKAGES.map((pkg, idx) => {
              const isSelected = selectedPackageIndex === idx;
              return (
                <button
                  key={pkg.id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => {
                    playClickSFX(idx === 0 ? 680 : idx === 1 ? 780 : 880);
                    setSelectedPackageIndex(idx);
                  }}
                  className={`relative flex-1 py-2 px-1 text-center text-xs font-heading font-bold uppercase tracking-wider rounded-full transition-colors duration-200 cursor-pointer ${
                    isSelected ? 'text-white' : 'text-stone-400 hover:text-white'
                  }`}
                >
                  {/* Sliding Spring Active Background Pill */}
                  {isSelected && (
                    <motion.div
                      layoutId="activeEquivPackagePill"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      className="absolute inset-0 bg-[#C4272F] rounded-full shadow-md -z-10"
                    />
                  )}
                  <span>{packageNames[idx]}</span>
                  <span className="block text-[9px] font-normal opacity-80 lowercase tracking-normal">
                    {pkg.paxRange.replace(' Pax', '')}pax
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. CARD HEADER: Clean Package Title */}
        <div className="relative z-10 mb-5">
          <motion.h3
            key={currentPkg.id + '-title'}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="font-heading font-extrabold text-2xl sm:text-3xl uppercase tracking-tight text-white"
          >
            {currentPkg.name}
          </motion.h3>
        </div>

        {/* 3. PRICE SECTION WITH SPRING ANIMATION & PERK BADGE */}
        <div className="relative z-10 p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-between mb-5">
          <div className="flex items-baseline gap-1">
            <span className="text-sm font-heading font-bold text-amber-300">RM</span>
            <span className="text-3xl sm:text-4xl font-heading font-extrabold tracking-tight text-white">
              {displayPrice.toLocaleString()}
            </span>
            <span className="text-xs text-stone-400 font-medium ml-1">/ net</span>
          </div>

          <span className="text-[10px] font-heading font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/10 text-amber-200 border border-white/10">
            {currentPkg.pricePerPaxEquivalent.MYR}
          </span>
        </div>

        {/* 4. INTERACTIVE DELIVERABLES ACCORDION LIST */}
        <div className="relative z-10 flex flex-col gap-2 mb-6">
          <div className="flex items-center justify-between text-[11px] font-heading font-bold uppercase tracking-wider text-stone-400 mb-1">
            <span>What&apos;s Included</span>
            <span className="text-amber-200/80 text-[10px] lowercase font-normal">tap row for details</span>
          </div>

          <div className="space-y-2">
            {deliverables.map((item, idx) => {
              const isOpen = openFeature === idx;
              const toggleRow = () => {
                playClickSFX(isOpen ? 440 : 740);
                setOpenFeature(isOpen ? null : idx);
              };

              return (
                <div
                  key={idx}
                  className={`w-full rounded-xl border transition-all duration-200 overflow-hidden ${
                    isOpen ? 'bg-white/[0.06] border-white/15' : 'bg-transparent border-white/5 hover:border-white/10'
                  }`}
                >
                  <button
                    type="button"
                    onClick={toggleRow}
                    className="w-full flex items-center justify-between p-2.5 text-left cursor-pointer outline-none"
                  >
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#C4272F"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="shrink-0"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span className={`text-xs font-semibold truncate ${isOpen ? 'text-white' : 'text-stone-300'}`}>
                        {item.title}
                      </span>
                    </div>

                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                      className="text-sm font-bold text-stone-400 ml-2 shrink-0 leading-none"
                    >
                      +
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{
                          opacity: 1,
                          height: 'auto',
                          transition: { height: { type: 'spring', stiffness: 400, damping: 32 }, opacity: { duration: 0.2 } },
                        }}
                        exit={{
                          opacity: 0,
                          height: 0,
                          transition: { height: { type: 'spring', stiffness: 450, damping: 35 }, opacity: { duration: 0.15 } },
                        }}
                        className="overflow-hidden"
                      >
                        <div className="px-3 pb-2.5 pt-0.5 text-[11px] text-[#BFA694] leading-relaxed border-t border-white/5">
                          {item.detail}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* 5. CRISP HIGH-TENSION LIQUID BUTTON */}
        <div className="relative z-10 pt-1">
          <LiquidButton
            ctaText={`Select ${currentPkg.name} →`}
            onClick={() => onSelectPackage(currentPkg)}
          />
        </div>
      </div>
    </div>
  );
};
