import React from 'react';
import { SawToothDivider } from './SawToothDivider';
import { MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

interface FooterProps {
  onOpenEnquiry?: () => void;
  onOpenSauces?: () => void;
}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="relative wood-dark text-[#D4C3B5] pt-0 pb-12 select-none">
      
      {/* Top Sawtooth Border */}
      <SawToothDivider fillColor="#2F1B11" inverted={true} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10 items-start"
        >
          
          {/* Brand Info (Left Column) */}
          <div className="md:col-span-7 space-y-4">
            <div className="flex items-baseline gap-2">
              <span className="font-brand text-4xl text-white tracking-normal">
                mantao.
              </span>
              <span className="text-xs font-heading font-bold uppercase tracking-widest text-amber-300">
                Malaysian Catering Co.
              </span>
            </div>
            
            <p className="text-xs sm:text-sm text-[#BFA694] leading-relaxed max-w-md">
              Crispy on the outside, steamy soft on the inside. Malaysian-style golden fried mantao 
              paired with signature creamy buttermilk dip for corporate functions, private gatherings & celebrations.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-xs text-amber-200">
              <span className="px-2.5 py-1 rounded bg-black/40 border border-white/10">
                100% Halal Ingredients
              </span>
              <span className="px-2.5 py-1 rounded bg-black/40 border border-white/10">
                Live Deep Frying Booth
              </span>
              <span className="px-2.5 py-1 rounded bg-black/40 border border-white/10">
                Chafing Food Warmers
              </span>
            </div>
          </div>

          {/* Contact (Right Column) */}
          <div className="md:col-span-5 space-y-3">
            <h4 className="font-heading font-bold text-xs text-white uppercase tracking-widest">
              Contact Us
            </h4>

            <div className="space-y-2 text-xs text-[#D4C3B5] pt-1">
              <a
                href="https://wa.me/60182868402"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 hover:text-white transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-[#C4272F]" />
                <span>WhatsApp: +60 18-286 8402</span>
              </a>
            </div>
          </div>

        </motion.div>

        {/* Bottom Bar */}
        <div className="pt-8 flex items-center justify-center text-center text-xs text-[#8C7565]">
          <p>© {new Date().getFullYear()} mantao. Malaysian Kitchen. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
};
