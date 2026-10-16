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
        {/* Brand Logo with entrance animation */}
        <motion.div 
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center justify-center gap-3 cursor-pointer group"
        >
          <img
            src={`${import.meta.env.BASE_URL}blasta-logo.jpg`}
            alt="blasta EMPIRE"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl object-contain bg-white p-0.5 border border-white/20 shadow-md group-hover:scale-105 transition-transform"
          />
          <div className="flex flex-col text-left">
            <div className="flex items-baseline gap-2">
              <span className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight drop-shadow-md group-hover:text-amber-200 transition-colors">
                blasta
              </span>
              <span className="font-serif text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-amber-200/90">
                EMPIRE
              </span>
            </div>
            <span className="text-[9px] sm:text-[10px] font-heading font-bold uppercase tracking-widest text-[#D4C3B5]/80 -mt-0.5">
              Golden Mantao Catering Co.
            </span>
          </div>
        </motion.div>
      </div>

      {/* Sawtooth divider transitioning cleanly into the cream canvas */}
      <SawToothDivider fillColor="#FAF5EB" inverted={false} />
    </header>
  );
};
