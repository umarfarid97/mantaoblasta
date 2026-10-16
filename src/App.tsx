import { useState } from 'react';
import type { Currency, WeddingPackage } from './types';
import { WEDDING_PACKAGES } from './data/packagesData';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProductSection } from './components/ProductSection';
import { FlavourModal } from './components/FlavourModal';
import { EnquiryModal } from './components/EnquiryModal';
import { Footer } from './components/Footer';

export function App() {
  // Default to MYR for Malaysian style mantao
  const [currency, setCurrency] = useState<Currency>('MYR');
  const [selectedPackage, setSelectedPackage] = useState<WeddingPackage | null>(null);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [isSaucesOpen, setIsSaucesOpen] = useState(false);

  const handleExploreClick = () => {
    const el = document.getElementById('packages-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenEnquiry = (packageId?: string) => {
    if (packageId) {
      const found = WEDDING_PACKAGES.find((p) => p.id === packageId);
      if (found) setSelectedPackage(found);
    } else if (!selectedPackage) {
      setSelectedPackage(WEDDING_PACKAGES[1]); // default to popular tier
    }
    setIsEnquiryOpen(true);
  };

  const handleSelectPackageFromCard = (pkg: WeddingPackage) => {
    setSelectedPackage(pkg);
    setIsEnquiryOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF5EB] text-[#2D241E] flex flex-col font-sans selection:bg-[#C4272F] selection:text-white overflow-x-hidden w-full max-w-full">
      {/* Header with Dark Wood Texture, Script Logo, Red Nav & Sawtooth Divider */}
      <Navbar
        currency={currency}
        onCurrencyChange={setCurrency}
        onOpenEnquiry={() => handleOpenEnquiry()}
        onOpenSauces={() => setIsSaucesOpen(true)}
      />

      {/* Main Content: 2 Primary Sections */}
      <main className="flex-grow overflow-x-hidden w-full max-w-full">
        {/* Section 1: Hero Section (Cream canvas, bold red headline, user's Malaysian mantao photo, parallax) */}
        <HeroSection
          onExploreClick={handleExploreClick}
          onOpenEnquiry={() => handleOpenEnquiry()}
          onOpenSauces={() => setIsSaucesOpen(true)}
        />

        {/* Section 2: Product Page Section (Dark wood background, 3 adjacent cards, hovering effect, pax & price) */}
        <ProductSection
          currency={currency}
          onSelectPackage={handleSelectPackageFromCard}
          onOpenSauces={() => setIsSaucesOpen(true)}
        />
      </main>

      {/* Footer with Dark Wood & Catering details */}
      <Footer
        onOpenEnquiry={() => handleOpenEnquiry()}
        onOpenSauces={() => setIsSaucesOpen(true)}
      />

      {/* Interactive Modals */}
      <FlavourModal
        isOpen={isSaucesOpen}
        onClose={() => setIsSaucesOpen(false)}
      />

      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        selectedPackage={selectedPackage}
        currency={currency}
        onSelectAnotherPackage={(pkg) => setSelectedPackage(pkg)}
      />
    </div>
  );
}

export default App;
