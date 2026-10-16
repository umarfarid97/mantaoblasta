export interface WeddingPackage {
  id: string;
  name: string;
  subtitle: string;
  paxRange: string;
  minPax: number;
  maxPax: number;
  openEndedGuests?: boolean;
  prices: {
    MYR: number;
    SGD: number;
    USD: number;
  };
  pricePerPaxEquivalent: {
    MYR: string;
    SGD: string;
    USD: string;
  };
  highlightBadge?: string;
  isPopular?: boolean;
  mantaoCount: string;
  dipsCount: number;
  setupType: string;
  features: string[];
  extras: string[];
  idealFor: string;
  liveFryBarIncluded: boolean;
  accentColor: string;
  pricePerGuestMYR?: number;
  exampleGuests?: number;
  menuType?: 'Golden Mantao' | 'Mantao ButterClam';
}

export type Currency = 'MYR' | 'SGD' | 'USD';

export interface SauceItem {
  id: string;
  name: string;
  description: string;
  spiceLevel: string;
  tags: string[];
  popular?: boolean;
}

export interface BookingFormState {
  packageId: string;
  hostName: string;
  eventType: string;
  contactNumber: string;
  email: string;
  eventDate: string;
  venue: string;
  estimatedGuests: number;
  selectedDips: string[];
  specialRequests: string;
}

