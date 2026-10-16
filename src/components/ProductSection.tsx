import React from 'react';
import type { WeddingPackage, Currency } from '../types';
import { motion } from 'framer-motion';
import { EquivPricing } from './EquivPricing';

interface ProductSectionProps {
  currency: Currency;
  onSelectPackage: (pkg: WeddingPackage) => void;
  onOpenSauces: () => void;
}

export const ProductSection: React.FC<ProductSectionProps> = ({
  onSelectPackage,
  onOpenSauces,
}) => {
  return (
    <section id="packages-section" className="relative py-14 lg:py-20 wood-bg text-white overflow-hidden select-none">
      
      {/* Background ambient warmth */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#C4272F]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with scroll entrance animation */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto space-y-2 mb-8 sm:mb-10"
        >
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight uppercase">
            Choose Your Event Package
          </h2>

          <p className="text-xs sm:text-sm text-[#D4C3B5] font-medium leading-relaxed">
            Freshly golden-fried on event day with signature creamy buttermilk dip.
          </p>
        </motion.div>

        {/* Framer Equiv Pricing Component with scroll entrance animation */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex justify-center"
        >
          <EquivPricing
            onSelectPackage={onSelectPackage}
            onOpenSauces={onOpenSauces}
          />
        </motion.div>

      </div>
    </section>
  );
};
