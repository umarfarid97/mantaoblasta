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
        {/* Authentic Brand Logo with entrance animation */}
        <motion.div 
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 cursor-pointer group py-1"
        >
          <img
            src={`${import.meta.env.BASE_URL}blasta-logo-white.png`}
            alt="blasta EMPIRE"
            className="h-10 sm:h-12 w-auto object-contain drop-shadow-md group-hover:scale-105 transition-transform"
          />
          <span className="hidden sm:inline-block h-6 w-px bg-white/20" />
          <span className="text-[11px] sm:text-xs font-heading font-semibold uppercase tracking-[0.2em] text-amber-200/90 drop-shadow-sm">
            Golden Mantao Catering Co.
          </span>
        </motion.div>
      </div>

      {/* Sawtooth divider transitioning cleanly into the cream canvas */}
      <SawToothDivider fillColor="#FAF5EB" inverted={false} />
    </header>
  );
};
