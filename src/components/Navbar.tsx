import React from 'react';
import type { Currency } from '../types';
import { SawToothDivider } from './SawToothDivider';
import { motion } from 'framer-motion';

interface NavbarProps {
  currency?: Currency;
  onCurrencyChange?: (curr: Currency) => void;
  onOpenEnquiry?: (packageId?: string) => void;
  onOpenSauces?: () => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  return (
    <header className="relative z-40 w-full wood-bg text-white shadow-xl select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 flex items-center justify-center text-center">
        {/* Brand Logo in script style with entrance animation */}
        <motion.div 
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-baseline justify-center gap-2.5 cursor-pointer group"
        >
          <span className="font-brand text-3xl sm:text-4xl text-white tracking-normal drop-shadow-md group-hover:text-amber-200 transition-colors">
            mantao.
          </span>
          <span className="text-[10px] sm:text-xs font-heading font-bold uppercase tracking-widest text-amber-200/90 hidden sm:inline">
            Malaysian Kitchen & Catering
          </span>
        </motion.div>
      </div>

      {/* Sawtooth divider transitioning cleanly into the cream canvas */}
      <SawToothDivider fillColor="#FAF5EB" inverted={false} />
    </header>
  );
};
