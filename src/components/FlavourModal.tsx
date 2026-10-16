import React from 'react';
import { SIGNATURE_SAUCES } from '../data/packagesData';
import { X, Sparkles } from 'lucide-react';

interface FlavourModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FlavourModal: React.FC<FlavourModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm animate-fade-in select-none">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] bg-[#FAF5EB] rounded-3xl shadow-2xl border-2 border-[#D9C8B4] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 wood-bg text-white flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#C4272F] text-white flex items-center justify-center font-brand text-xl shadow-md">
              m.
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-lg sm:text-xl text-white uppercase tracking-wider">
                Signature Malaysian Dipping Sauces
              </h3>
              <p className="text-xs text-[#D4C3B5] font-medium">
                Poured hot and served fresh alongside crispy golden fried mantao
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-stone-300 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SIGNATURE_SAUCES.map((sauce) => (
              <div
                key={sauce.id}
                className="bg-white rounded-2xl p-5 border border-[#E3D3C1] shadow-sm hover:shadow-md hover:border-[#C4272F] transition-all flex flex-col justify-between space-y-3 group"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-heading font-bold text-base text-[#2F1B11] group-hover:text-[#C4272F] transition-colors">
                        {sauce.name}
                      </h4>
                      <span className="inline-block mt-0.5 text-xs font-semibold text-[#8C5332] bg-[#FAF3E8] px-2 py-0.5 rounded border border-[#EADCC9]">
                        {sauce.spiceLevel}
                      </span>
                    </div>

                    {sauce.popular && (
                      <span className="shrink-0 text-[10px] uppercase font-heading font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#C4272F] text-white flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5" />
                        Top Pick
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-[#573E30] leading-relaxed mt-2.5 font-normal">
                    {sauce.description}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-[#F0E5D5]">
                  {sauce.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[#FAF5EB] text-[#6C5343] border border-[#E8DAC8]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* User's uploaded picture highlight box */}
          <div className="p-4 rounded-2xl bg-[#EFE2CF] border border-[#DAC4AD] flex flex-col sm:flex-row items-center gap-4 text-xs text-[#4A3222]">
            <img
              src={`${import.meta.env.BASE_URL}mantao-box.png`}
              alt="Golden Mantao Box with Buttermilk Dip"
              className="w-20 h-20 rounded-xl object-cover border border-[#C5AD95] shadow-sm shrink-0"
            />
            <div className="flex-1 space-y-1">
              <p className="font-heading font-bold text-sm text-[#C4272F] uppercase">
                Featured: Creamy Buttermilk Sauce & Golden Mantao Platter
              </p>
              <p className="text-[#573E30] leading-snug">
                Served in generous portions for event cocktail hours, corporate functions, and guest grazing tables. 
                Crispy golden on the outside, steamy soft on the inside.
              </p>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-[#C4272F] hover:bg-[#A81E26] text-white font-heading font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
            >
              Back to Event Packages
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
