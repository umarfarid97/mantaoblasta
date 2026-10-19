import { useEffect, useRef, useState } from 'react';
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
  const [visibleCount, setVisibleCount] = useState(() => window.matchMedia('(min-width:681px)').matches ? 2 : 1);
  const track = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const desktop = window.matchMedia('(min-width:681px)');
    const update = () => {
      setVisibleCount(desktop.matches ? 2 : 1);
      setIndex(0);
      track.current?.scrollTo({ left: 0, behavior: 'instant' });
    };
    desktop.addEventListener('change', update);
    return () => desktop.removeEventListener('change', update);
  }, []);
  const change = (step: number) => {
    const element = track.current;
    if (!element) return;
    const next = Math.max(0, Math.min(photos.length - visibleCount, index + step * visibleCount));
    element.scrollTo({ left: next * (element.clientWidth / visibleCount),
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  };
  return <div className="garden-gallery" role="region" aria-roledescription="carousel" aria-label="Blasta event and food photos">
    <div ref={track} className="garden-gallery-photos" tabIndex={0} aria-label="Swipe left or right to browse photos"
      onScroll={event => { const element = event.currentTarget; if (element.clientWidth) setIndex(Math.max(0, Math.min(photos.length - visibleCount, Math.round(element.scrollLeft / (element.clientWidth / visibleCount))))); }}
      onKeyDown={event => { if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); change(event.key === 'ArrowLeft' ? -1 : 1); } }}>
      {photos.map((alt, photoIndex) => <img key={alt}
        src={`${import.meta.env.BASE_URL}gallery/blasta-${photoIndex + 1}.jpg`}
        alt={alt} loading={photoIndex < visibleCount ? 'eager' : 'lazy'} decoding="async" width={960} height={1280} draggable={false} />)}
    </div>
    <div className="garden-gallery-controls">
      <p className="garden-gallery-hint">Swipe to see more</p>
      <button disabled={index === 0} onClick={() => change(-1)} aria-label={visibleCount === 2 ? 'Previous event photos' : 'Previous event photo'}><ChevronLeft size={20} /></button>
      <span aria-live="polite">{visibleCount === 2 ? `${index + 1}–${index + visibleCount}` : index + 1} / {photos.length}</span>
      <button disabled={index >= photos.length - visibleCount} onClick={() => change(1)} aria-label={visibleCount === 2 ? 'Next event photos' : 'Next event photo'}><ChevronRight size={20} /></button>
    </div>
  </div>;
}
