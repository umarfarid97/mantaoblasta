import type { WeddingPackage } from '../types';

// Rates and example totals from the customer's supplied event price tables.
export const EVENT_PACKAGES: WeddingPackage[] = (['Golden Mantao', 'Mantao ButterClam'] as const).flatMap((menuType, menuIndex) =>
  ['Silver', 'Gold', 'Platinum'].map((tier, index) => {
    const minPax = [100, 301, 501][index];
    const maxPax = [300, 500, 1000][index];
    const rate = (menuIndex === 0 ? [4.8, 4.5, 4.2] : [9, 8.5, 8])[index];
    const features = menuIndex === 0
      ? ['3 golden mantao per guest']
      : ['3 mantao + approximately 60 g clam per guest', 'Serving crew, booth setup & dismantling'];
    return {
      id: `${menuIndex === 0 ? 'mantao' : 'butterclam'}-${tier.toLowerCase()}`,
      name: `${tier} · ${menuType}`,
      subtitle: menuType,
      menuType,
      paxRange: index === 2 ? '501+ guests' : `${minPax.toLocaleString()}–${maxPax.toLocaleString()} guests`,
      minPax, maxPax,
      openEndedGuests: index === 2,
      pricePerGuestMYR: rate,
      exampleGuests: maxPax,
      prices: { MYR: rate * maxPax, SGD: 0, USD: 0 },
      pricePerPaxEquivalent: { MYR: `RM ${rate.toFixed(2)} / guest`, SGD: '', USD: '' },
      mantaoCount: '3 mantao per guest',
      dipsCount: 0,
      setupType: menuIndex === 0 ? '' : 'Serving crew, booth setup & dismantling',
      features, extras: [], idealFor: '', liveFryBarIncluded: false,
      accentColor: '#395b43',
    };
  })
);
