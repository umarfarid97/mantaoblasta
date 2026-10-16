import React, { useState, useEffect, useRef } from 'react';
import type { WeddingPackage, Currency } from '../types';
import { WEDDING_PACKAGES, SIGNATURE_SAUCES } from '../data/packagesData';
import confetti from 'canvas-confetti';
import { 
  X, 
  Calendar, 
  MapPin, 
  Users, 
  CheckCircle,
  MessageCircle,
  Tag
} from 'lucide-react';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackage: WeddingPackage | null;
  currency: Currency;
  onSelectAnotherPackage: (pkg: WeddingPackage) => void;
  packages?: WeddingPackage[];
}

const WHATSAPP_NUMBER = '60182868402';
const WHATSAPP_DISPLAY = '+60 18-286 8402';

export const formatToDDMMYYYY = (dateStr: string): string => {
  if (!dateStr) return '';
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) return dateStr;
  const parts = dateStr.split('-');
  if (parts.length === 3 && parts[0].length === 4) {
    const [year, month, day] = parts;
    return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;
  }
  return dateStr;
};

export const formatToYYYYMMDD = (ddmmyyyy: string): string => {
  if (!ddmmyyyy) return '';
  const parts = ddmmyyyy.split('/');
  if (parts.length === 3 && parts[2]?.length === 4) {
    const [day, month, year] = parts;
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }
  return '';
};

const getDefaultDips = (count: number): string[] => {
  const defaults = SIGNATURE_SAUCES.map((sauce) => sauce.id);
  return defaults.slice(0, count);
};

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  selectedPackage,
  currency,
  onSelectAnotherPackage,
  packages = WEDDING_PACKAGES,
}) => {
  const currentPkg = selectedPackage || packages[1] || packages[0];
  const hiddenDateInputRef = useRef<HTMLInputElement>(null);

  const [hostName, setHostName] = useState('');
  const [eventType, setEventType] = useState('Corporate Event');
  const [phone, setPhone] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [venue, setVenue] = useState('');
  const [guestCount, setGuestCount] = useState(currentPkg.minPax + 100);
  const [selectedDips, setSelectedDips] = useState<string[]>(() =>
    getDefaultDips(currentPkg.dipsCount)
  );
  const [specialNotes, setSpecialNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Keep dips selection strictly clamped to current package limit whenever package changes or modal opens
  useEffect(() => {
    setGuestCount(currentPkg.exampleGuests ?? currentPkg.minPax + 50);
    setSelectedDips((prev) => {
      if (prev.length > currentPkg.dipsCount) {
        return prev.slice(0, currentPkg.dipsCount);
      } else if (prev.length < currentPkg.dipsCount) {
        const defaults = getDefaultDips(currentPkg.dipsCount);
        const combined = Array.from(new Set([...prev, ...defaults]));
        return combined.slice(0, currentPkg.dipsCount);
      }
      return prev;
    });
  }, [currentPkg.id, currentPkg.dipsCount, currentPkg.minPax, currentPkg.exampleGuests, isOpen]);

  if (!isOpen) return null;

  const toggleDip = (id: string) => {
    if (selectedDips.includes(id)) {
      // Allow deselecting if more than 1 dip is selected
      if (selectedDips.length > 1) {
        setSelectedDips(selectedDips.filter((d) => d !== id));
      }
    } else {
      if (selectedDips.length < currentPkg.dipsCount) {
        setSelectedDips([...selectedDips, id]);
      } else if (currentPkg.dipsCount > 0) {
        // If limit reached, seamlessly replace the last selected dip
        setSelectedDips([...selectedDips.slice(0, currentPkg.dipsCount - 1), id]);
      }
    }
  };

  const getPriceString = () => {
    const amount = currency === 'MYR' && currentPkg.pricePerGuestMYR !== undefined
      ? Math.round(currentPkg.pricePerGuestMYR * guestCount * 100) / 100
      : currentPkg.prices[currency];
    const prefix = currency === 'MYR' ? 'RM ' : currency === 'SGD' ? 'S$' : '$';
    return `${prefix}${amount.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
  };

  const generateWhatsAppMessage = () => {
    const dipsList = currentPkg.dipsCount === 0 ? 'Not specified for this menu' : selectedDips
      .map((id) => SIGNATURE_SAUCES.find((s) => s.id === id)?.name)
      .filter(Boolean)
      .join(', ');

    const text = `Hello blasta EMPIRE Catering Team!%0A%0AWe would like to book a Malaysian Fried Mantao Event Package:%0A• *Package:* ${encodeURIComponent(currentPkg.name)} (${encodeURIComponent(currentPkg.paxRange)})%0A• *Host / Organizer:* ${encodeURIComponent(hostName || 'Organizer')}%0A• *Contact Phone:* ${encodeURIComponent(phone || 'Not specified')}%0A• *Event Type:* ${encodeURIComponent(eventType || 'Special Event')}%0A• *Event Date:* ${encodeURIComponent(formatToDDMMYYYY(eventDate) || 'TBD (DD/MM/YYYY)')}%0A• *Venue / Location:* ${encodeURIComponent(venue || 'TBD')}%0A• *Guest Estimate:* ${guestCount} pax%0A• *Package Total:* ${encodeURIComponent(getPriceString())}%0A• *Selected Dips:* ${encodeURIComponent(dipsList || 'Creamy Buttermilk & Salted Egg')}%0A• *Special Requests:* ${encodeURIComponent(specialNotes || 'None')}%0A%0APlease check date availability for us. Thank you!`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C4272F', '#D97706', '#FAF5EB', '#2F1B11'],
      });
    } catch {
      // Fallback
    }

    generateWhatsAppMessage();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm animate-fade-in overflow-y-auto select-none">
      <div 
        className="relative w-full max-w-2xl bg-[#FAF5EB] rounded-3xl shadow-2xl border-2 border-[#D9C8B4] overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="px-6 py-5 wood-bg text-white flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <img
              src={`${import.meta.env.BASE_URL}blasta-logo-white.png`}
              alt="blasta EMPIRE"
              className="h-9 sm:h-10 w-auto object-contain drop-shadow-sm"
            />
            <div>
              <h3 className="font-heading font-extrabold text-lg text-white uppercase tracking-wider">
                Book With blasta EMPIRE
              </h3>
              <p className="text-xs text-[#D4C3B5]">
                Direct WhatsApp Booking to {WHATSAPP_DISPLAY}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-stone-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Package Selection */}
              <div className="space-y-2">
                <label className="text-xs font-heading font-bold text-[#8C5332] uppercase tracking-wider block">
                  Selected Event Tier:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {packages.map((pkg) => (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => {
                        onSelectAnotherPackage(pkg);
                        setSelectedDips((prev) => {
                          if (prev.length > pkg.dipsCount) {
                            return prev.slice(0, pkg.dipsCount);
                          } else if (prev.length < pkg.dipsCount) {
                            const defaults = getDefaultDips(pkg.dipsCount);
                            const combined = Array.from(new Set([...prev, ...defaults]));
                            return combined.slice(0, pkg.dipsCount);
                          }
                          return prev;
                        });
                      }}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        currentPkg.id === pkg.id
                          ? 'bg-[#EFE2CF] border-[#C4272F] ring-2 ring-[#C4272F]/50 shadow-sm'
                          : 'bg-white border-[#E3D3C1] hover:border-[#C4272F]'
                      }`}
                    >
                      <p className="font-heading font-bold text-xs uppercase text-[#2F1B11]">{pkg.name}</p>
                      <p className="text-[11px] text-[#6C5343] font-medium">{pkg.paxRange}</p>
                      <p className="text-xs font-heading font-extrabold text-[#C4272F] mt-1">
                        {currency === 'MYR' ? 'RM ' : currency === 'SGD' ? 'S$' : '$'}
                        {pkg.pricePerGuestMYR !== undefined ? `${pkg.pricePerGuestMYR.toFixed(2)} / guest` : pkg.prices[currency].toLocaleString()}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Host & Event Type */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-heading font-bold text-[#2F1B11] uppercase mb-1">
                    Contact Person / Organizer Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aiman / Company / Family"
                    value={hostName}
                    onChange={(e) => setHostName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9C8B4] bg-white text-sm text-[#2F1B11] focus:outline-none focus:ring-2 focus:ring-[#C4272F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-heading font-bold text-[#2F1B11] uppercase mb-1 flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5 text-[#C4272F]" />
                    <span>Event Type</span>
                  </label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#D9C8B4] bg-white text-xs font-medium text-[#2F1B11] focus:outline-none focus:ring-2 focus:ring-[#C4272F]"
                  >
                    <option value="Corporate Event">Corporate Event</option>
                    <option value="Private Gathering">Private Gathering</option>
                    <option value="Birthday Party">Birthday Party</option>
                    <option value="Wedding / Sanding">Wedding / Sanding</option>
                    <option value="Exhibition / Festival">Exhibition / Festival</option>
                    <option value="Annual Dinner">Annual Dinner</option>
                  </select>
                </div>
              </div>

              {/* Contact, Date & Venue */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-heading font-bold text-[#2F1B11] uppercase mb-1">
                    WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+60 18-286 8402"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9C8B4] bg-white text-sm text-[#2F1B11] focus:outline-none focus:ring-2 focus:ring-[#C4272F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-heading font-bold text-[#2F1B11] uppercase mb-1 flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#C4272F]" />
                      <span>Event Date *</span>
                    </span>
                    <span className="text-[10px] text-[#8C5332] font-semibold lowercase">dd/mm/yyyy</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="DD/MM/YYYY"
                      maxLength={10}
                      value={eventDate}
                      onChange={(e) => {
                        let val = e.target.value.replace(/[^\d/]/g, '');
                        if ((val.length === 2 || val.length === 5) && !val.endsWith('/') && val.length > eventDate.length) {
                          val = `${val}/`;
                        }
                        if (val.length <= 10) {
                          setEventDate(val);
                        }
                      }}
                      className="w-full px-3.5 py-2.5 pr-10 rounded-xl border border-[#D9C8B4] bg-white text-sm text-[#2F1B11] placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#C4272F]"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        try {
                          hiddenDateInputRef.current?.showPicker?.();
                        } catch {
                          hiddenDateInputRef.current?.focus();
                        }
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-[#C4272F] hover:text-[#9E2A2B] hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
                      title="Select date (DD/MM/YYYY)"
                      aria-label="Open date picker calendar"
                    >
                      <Calendar className="w-4 h-4" />
                    </button>
                    <input
                      ref={hiddenDateInputRef}
                      type="date"
                      tabIndex={-1}
                      value={formatToYYYYMMDD(eventDate)}
                      onChange={(e) => {
                        if (e.target.value) {
                          setEventDate(formatToDDMMYYYY(e.target.value));
                        }
                      }}
                      className="sr-only absolute pointer-events-none"
                      aria-hidden="true"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-heading font-bold text-[#2F1B11] uppercase mb-1 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-[#C4272F]" />
                    <span>Estimated Pax</span>
                  </label>
                  <input
                    type="number"
                    required
                    step={1}
                    min={currentPkg.minPax}
                    max={currentPkg.maxPax}
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-[#D9C8B4] bg-white text-sm text-[#2F1B11] focus:outline-none focus:ring-2 focus:ring-[#C4272F]"
                  />
                </div>
              </div>

              {/* Venue */}
              <div>
                <label className="block text-xs font-heading font-bold text-[#2F1B11] uppercase mb-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#C4272F]" />
                  <span>Venue / Location</span>
                </label>
                <input
                  type="text"
                  placeholder="Hotel / Office / Dewan / Outdoor Venue"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#D9C8B4] bg-white text-sm text-[#2F1B11] focus:outline-none focus:ring-2 focus:ring-[#C4272F]"
                />
              </div>

              {/* Preferred Dips Selection */}
              {currentPkg.dipsCount > 0 && <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-heading font-bold text-[#2F1B11] uppercase">
                    Select Up To {currentPkg.dipsCount} Signature Dips:
                  </label>
                  <span className="text-[11px] font-bold text-[#C4272F] bg-[#FAF3E8] px-2 py-0.5 rounded-full border border-[#EADCC9]">
                    {selectedDips.length} / {currentPkg.dipsCount} selected
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {SIGNATURE_SAUCES.map((sauce) => {
                    const isSelected = selectedDips.includes(sauce.id);
                    return (
                      <button
                        key={sauce.id}
                        type="button"
                        onClick={() => toggleDip(sauce.id)}
                        className={`p-2.5 rounded-xl border text-left text-xs flex items-center justify-between transition-all ${
                          isSelected
                            ? 'bg-[#EFE2CF] border-[#C4272F] text-[#2F1B11] font-bold'
                            : 'bg-white border-[#E3D3C1] text-[#573E30] hover:border-[#C4272F]'
                        }`}
                      >
                        <span>{sauce.name}</span>
                        {isSelected && <CheckCircle className="w-4 h-4 text-[#C4272F]" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              }
              {/* Special Requests */}
              <div>
                <label className="block text-xs font-heading font-bold text-[#2F1B11] uppercase mb-1">
                  Event Schedule & Special Requests
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Please serve during event cocktail hour (12:30 PM), company logo stickers on snack boxes, outdoor setup timing..."
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#D9C8B4] bg-white text-xs text-[#2F1B11] focus:outline-none focus:ring-2 focus:ring-[#C4272F]"
                />
              </div>

              {/* Price summary pill */}
              <div className="p-3.5 rounded-2xl bg-[#EFE2CF] border border-[#DAC4AD] flex items-center justify-between text-xs">
                <div>
                  <p className="font-heading font-bold text-[#2F1B11]">Package Total: {getPriceString()}</p>
                  <p className="text-[11px] text-[#6C5343]">{currentPkg.pricePerGuestMYR !== undefined ? `${guestCount.toLocaleString()} guests × RM ${currentPkg.pricePerGuestMYR.toFixed(2)} · ${(guestCount * 3).toLocaleString()} mantao` : `Includes ${currentPkg.mantaoCount.split('(')[0]}`}</p>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-[11px]">
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Direct WhatsApp Enquiry</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-heading font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 border border-white/20"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Send WhatsApp Enquiry ({WHATSAPP_DISPLAY})</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="py-3.5 px-5 rounded-xl border border-[#D9C8B4] bg-white text-xs font-heading font-bold uppercase text-[#573E30] hover:bg-stone-50"
                >
                  Cancel
                </button>
              </div>

            </form>
          ) : (
            /* Submission Success */
            <div className="py-8 text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center border-2 border-emerald-400 shadow-md">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h4 className="font-heading font-extrabold text-2xl text-[#2F1B11] uppercase">
                  Thank You, {hostName || 'Organizer'}!
                </h4>
                <p className="text-sm text-[#573E30] max-w-md mx-auto">
                  Your event enquiry for <strong className="text-[#C4272F]">{currentPkg.name}</strong> ({currentPkg.paxRange}) has been drafted.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#DAC4AD] text-left text-xs space-y-1.5 max-w-md mx-auto shadow-sm">
                <p><strong>Package:</strong> {currentPkg.name} ({getPriceString()})</p>
                <p><strong>Event Type:</strong> {eventType}</p>
                <p><strong>Event Date:</strong> {formatToDDMMYYYY(eventDate) || 'Pending confirmation'}</p>
                <p><strong>Location:</strong> {venue || 'To be updated'}</p>
                <p><strong>WhatsApp Recipient:</strong> {WHATSAPP_DISPLAY}</p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={generateWhatsAppMessage}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-heading font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-colors"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Open WhatsApp ({WHATSAPP_DISPLAY})</span>
                </button>

                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl border border-[#D9C8B4] bg-stone-100 text-xs font-heading font-bold uppercase text-[#2F1B11] hover:bg-stone-200 transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
