import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';

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
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState<boolean[]>([]);
  const region = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const next = (index + 1) % photos.length;
  const change = (step: number) => {
    setPaused(true);
    setIndex(current => (current + step + photos.length) % photos.length);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    if (region.current) observer.observe(region.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (paused || hovered || focused || !visible || reducedMotion || !loaded[next]) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setIndex(next);
    }, 5500);
    return () => window.clearInterval(timer);
  }, [paused, hovered, focused, visible, reducedMotion, loaded, next]);

  return <div ref={region} className="garden-gallery" role="region" aria-roledescription="carousel" aria-label="Blasta event and food photos"
    onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
    onFocusCapture={() => setFocused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
    <div className="garden-gallery-photos">
      {photos.map((alt, photoIndex) => <img key={alt}
        src={`${import.meta.env.BASE_URL}gallery/blasta-${photoIndex + 1}.jpg`}
        alt={alt} aria-hidden={index !== photoIndex} className={index === photoIndex ? 'is-active' : ''}
        loading="lazy" decoding="async" width={960} height={1280}
        onLoad={() => setLoaded(previous => { const updated = [...previous]; updated[photoIndex] = true; return updated; })} />)}
    </div>
    <div className="garden-gallery-controls">
      <button disabled={!loaded[(index - 1 + photos.length) % photos.length]} onClick={() => change(-1)} aria-label="Previous event photo"><ChevronLeft size={20} /></button>
      <span aria-live={paused ? 'polite' : 'off'}>{index + 1} / {photos.length}</span>
      <button disabled={!loaded[next]} onClick={() => change(1)} aria-label="Next event photo"><ChevronRight size={20} /></button>
      {!reducedMotion && <button onClick={() => setPaused(value => !value)} aria-label={paused ? 'Play photo slideshow' : 'Pause photo slideshow'}>{paused ? <Play size={17} /> : <Pause size={17} />}</button>}
    </div>
  </div>;
}
