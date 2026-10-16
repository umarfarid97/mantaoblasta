import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const photos = [
  'Blasta Empire stall under a lit umbrella at an indoor market',
  'Blasta team member preparing food at the stall',
  'Blasta stall and team preparing customer orders',
  'Customers enjoying Blasta at the market',
  'Blasta team and guests at a busy indoor market',
  'Blasta serving customers at outdoor and indoor events',
  'Golden mantao, butter clams and signature dipping sauces',
  'Guests visiting Blasta stalls at community markets',
  'Freshly prepared cups of creamy dipping sauce',
  'Golden fried mantao ready to serve with dipping sauces',
];

export function EventSlideshow() {
  const [index, setIndex] = useState(0);
  const track = useRef<HTMLDivElement>(null);
  const change = (step: number) => {
    const next = Math.max(0, Math.min(photos.length - 1, index + step));
    track.current?.scrollTo({ left: next * track.current.clientWidth,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  };
  return <div className="garden-gallery" role="region" aria-roledescription="carousel" aria-label="Blasta event and food photos">
    <div ref={track} className="garden-gallery-photos" tabIndex={0} aria-label="Swipe left or right to browse photos"
      onScroll={event => { const element = event.currentTarget; if (element.clientWidth) setIndex(Math.max(0, Math.min(photos.length - 1, Math.round(element.scrollLeft / element.clientWidth)))); }}
      onKeyDown={event => { if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); change(event.key === 'ArrowLeft' ? -1 : 1); } }}>
      {photos.map((alt, photoIndex) => <img key={alt}
        src={`${import.meta.env.BASE_URL}gallery/blasta-${photoIndex + 1}.jpg`}
        alt={alt} loading={photoIndex === 0 ? 'eager' : 'lazy'} decoding="async" width={960} height={1280} draggable={false} />)}
    </div>
    <div className="garden-gallery-controls">
      <p className="garden-gallery-hint">Swipe to see more</p>
      <button disabled={index === 0} onClick={() => change(-1)} aria-label="Previous event photo"><ChevronLeft size={20} /></button>
      <span aria-live="polite">{index + 1} / {photos.length}</span>
      <button disabled={index === photos.length - 1} onClick={() => change(1)} aria-label="Next event photo"><ChevronRight size={20} /></button>
    </div>
  </div>;
}
