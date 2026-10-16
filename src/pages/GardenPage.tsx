import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, ChefHat, ChevronLeft, ChevronRight, Flame, Heart, Leaf, MessageCircle, Users, Utensils } from 'lucide-react';
import { SIGNATURE_SAUCES } from '../data/packagesData';
import { EVENT_PACKAGES } from '../data/eventPackages';
import type { WeddingPackage } from '../types';
import { EnquiryModal } from '../components/EnquiryModal';
import './garden.css';

const asset = (name: string) => `${import.meta.env.BASE_URL}${name}`;
const currentYear = new Date().getFullYear();

export function GardenPage() {
  useEffect(() => {
    document.documentElement.classList.add('garden-active');
    const existingTheme = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    const theme = existingTheme ?? document.createElement('meta');
    const previousColor = theme.content;
    theme.name = 'theme-color';
    theme.content = '#edf0e3';
    if (!existingTheme) document.head.appendChild(theme);
    return () => {
      document.documentElement.classList.remove('garden-active');
      if (existingTheme) theme.content = previousColor;
      else theme.remove();
    };
  }, []);
  const [packageIndex, setPackageIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const reducedMotion = useReducedMotion();
  const pkg = EVENT_PACKAGES[packageIndex];
  const [selected, setSelected] = useState<WeddingPackage>(EVENT_PACKAGES[0]);
  const [enquiry, setEnquiry] = useState(false);
  const enquire = (chosenPackage = pkg) => { setSelected(chosenPackage); setEnquiry(true); };
  const switchPackage = (step: number) => {
    setDirection(step);
    setPackageIndex(index => (index + step + EVENT_PACKAGES.length) % EVENT_PACKAGES.length);
  };
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });

  return <div className="garden-page">
    <a className="garden-skip" href="#garden-menu" onClick={e => { e.preventDefault(); document.getElementById('garden-menu')?.focus(); scrollTo('garden-menu'); }}>Skip to packages</a>
    <div className="garden-sheet">
      <header className="garden-header">
        <a href="#/garden" className="garden-brand" aria-label="Blasta Empire home"><img src={asset('blasta-logo-dark.png')} alt="blasta EMPIRE" /><span>Little buns. Big celebrations.</span></a>
        <nav aria-label="Main navigation"><button onClick={() => scrollTo('garden-menu')}>Packages</button><button onClick={() => scrollTo('garden-story')}>Our mantao</button><button onClick={() => scrollTo('garden-dips')}>Signature dips</button><button onClick={() => scrollTo('garden-contact')}>Contact</button></nav>
        <button className="garden-button" onClick={() => enquire()}>Plan your event <ArrowUpRight size={16} /></button>
      </header>

      <main>
        <section className="garden-hero" aria-labelledby="garden-title">
          <div className="garden-hero-copy">
            <h1 id="garden-title">Golden little buns.<br />Unforgettable<br /><em>little moments.</em></h1>
            <p>Crispy outside. Fluffy inside. Malaysian-style golden fried mantao, made for sharing and dipped in something delicious.</p>
            <button className="garden-button" onClick={() => scrollTo('garden-menu')}>Explore event packages <ArrowDown size={16} /></button>
            <div className="garden-hero-notes"><span><Flame />Golden fried<br />on event day</span><span><Heart />Made for<br />sharing</span><span><Utensils />Signature<br />creamy dips</span></div>
          </div>
          <div className="garden-hero-photo"><img src={asset('mantao-plate.jpg')} alt="Golden fried mantao drizzled with creamy sauce on a sharing plate" fetchPriority="high" /><span className="garden-photo-note"><Leaf size={25} />Malaysian<br />comfort, shared.</span></div>
          <svg className="garden-wave" viewBox="0 0 1200 80" preserveAspectRatio="none" aria-hidden="true"><path d="M0 55C160-40 300 110 540 40S930 25 1200 60V80H0Z" fill="currentColor" /></svg>
        </section>

        <section className="garden-values" aria-label="The Blasta experience">
          {[{ Icon: Flame, title: 'That golden crunch', text: 'Crispy little pillows with an ultra-fluffy centre.' }, { Icon: Utensils, title: 'A dip for every mood', text: 'From buttermilk salted egg to sweet pandan custard.' }, { Icon: ChefHat, title: 'Ready for your event', text: 'Warm catering setups and live frying options.' }, { Icon: Users, title: 'Better together', text: 'For intimate gatherings and grand celebrations.' }].map(({ Icon, title, text }) => <div key={title}><Icon /><h2>{title}</h2><p>{text}</p></div>)}
        </section>

        <section className="garden-packages garden-package-carousel" id="garden-menu" tabIndex={-1} aria-labelledby="garden-packages-title" aria-roledescription="carousel">
          <div className="garden-package-intro"><h2 id="garden-packages-title">A gathering. A celebration.<br /><em>A little Blasta.</em></h2><p>Find a package for your people.<br />We’ll bring the golden goodness.</p></div>
          <div className="garden-package-stage" tabIndex={0} aria-label="Package cards. Swipe or use left and right arrow keys to change package." onKeyDown={event => {
            if (event.target !== event.currentTarget) return;
            if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
              event.preventDefault();
              switchPackage(event.key === 'ArrowLeft' ? -1 : 1);
            }
          }}>
          <button className="garden-package-arrow garden-package-prev" onClick={() => switchPackage(-1)} aria-label="Previous package" aria-controls="garden-current-package"><ChevronLeft size={26} /></button>
          <div className="garden-card-deck">
          <AnimatePresence initial={false} mode="sync" custom={direction}>
          <motion.article className="garden-package" id="garden-current-package" key={pkg.id}
            custom={direction}
            variants={{
              enter: { x: 0, opacity: 1, rotate: 0, scale: 1, zIndex: 1 },
              active: { x: 0, opacity: 1, rotate: 0, scale: 1, zIndex: 1 },
              exit: (step: number) => ({ x: reducedMotion ? 0 : (step > 0 ? '-110%' : '110%'), opacity: 1, rotate: reducedMotion ? 0 : step * -5, scale: 1, zIndex: 2, pointerEvents: 'none' as const }),
            }} initial="enter" animate="active" exit="exit"
            transition={reducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 340, damping: 32, mass: .8 }}
            drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={.55} dragSnapToOrigin
            onDragEnd={(_, info) => {
              if (Math.abs(info.offset.x) > 55 || Math.abs(info.velocity.x) > 450) switchPackage(info.offset.x === 0 ? (info.velocity.x < 0 ? 1 : -1) : (info.offset.x < 0 ? 1 : -1));
            }}>
            <h3>{pkg.name}</h3><p>{pkg.paxRange}</p>
            <strong>RM {pkg.pricePerGuestMYR?.toFixed(2)}<span className="garden-per-guest"> / guest</span></strong>
            <ul className="garden-package-inclusions">{pkg.features.map(feature => <li key={feature}>{feature}</li>)}</ul>
            <p className="garden-package-example">Example: {pkg.exampleGuests?.toLocaleString()} guests · <b>RM {pkg.prices.MYR.toLocaleString()}</b></p>
            <button onPointerDown={event => event.stopPropagation()} onClick={() => enquire(pkg)}>Enquire about this package <ArrowUpRight size={16} /></button>
          </motion.article>
          </AnimatePresence>
          </div>
          <button className="garden-package-arrow garden-package-next" onClick={() => switchPackage(1)} aria-label="Next package" aria-controls="garden-current-package"><ChevronRight size={26} /></button>
          </div>
          <p className="garden-package-position" role="status">{pkg.name} · {packageIndex + 1} of {EVENT_PACKAGES.length}<span>Swipe to explore packages</span></p>
        </section>

        <section className="garden-dips" id="garden-dips" aria-labelledby="garden-dips-title"><div className="garden-section-heading"><span /><h2 id="garden-dips-title">Meet your mantao’s other half</h2><span /></div><p className="garden-section-description">A little savoury, a little sweet. A whole lot to love.</p><div className="garden-dip-list">{SIGNATURE_SAUCES.map((sauce, i) => <div className="garden-dip" key={sauce.id}><span className={`garden-sauce garden-sauce-${i}`}><Utensils size={24} /></span><span><strong>{sauce.name}</strong><small>{sauce.spiceLevel} · {sauce.tags.join(' · ')}</small></span></div>)}</div></section>

        <section className="garden-story" id="garden-story"><div><Leaf size={34} /><h2>Small bites.<br /><em>Generous Malaysian soul.</em></h2><p>Golden fried mantao and our signature creamy spiced buttermilk dip. A comforting combination for corporate functions, private gatherings, and celebrations worth savouring.</p><button className="garden-button garden-green-button" onClick={() => enquire()}>Let’s make it a celebration <ArrowUpRight size={16} /></button></div><img src={asset('mantao-box.png')} alt="Blasta mantao served with signature creamy dip" loading="lazy" /></section>

        <section className="garden-contact" id="garden-contact"><div><h2>Good food. Great company.</h2><p>Tell us what you’re celebrating.<br />We’ll help you find the right package.</p><a href="https://wa.me/60182868402" target="_blank" rel="noreferrer"><MessageCircle size={18} /> +60 18-286 8402 <ArrowUpRight size={16} /></a></div><div><h2>Save a place for something golden.</h2><p>From 100 to 1,000 guests, there’s a little Blasta for everyone.</p><button className="garden-button" onClick={() => enquire()}>Start your event enquiry <ArrowUpRight size={16} /></button></div><div className="garden-footer-art" aria-hidden="true"><ChefHat size={70} strokeWidth={1} /><Utensils size={44} strokeWidth={1} /></div></section>
      </main>
      <footer className="garden-footer"><span>© {currentYear} blasta EMPIRE</span><span>Malaysian comfort. Made to share.</span><a href="#/">View original website <ArrowUpRight size={14} /></a></footer>
    </div>
    <EnquiryModal isOpen={enquiry} onClose={() => setEnquiry(false)} selectedPackage={selected} currency="MYR" onSelectAnotherPackage={setSelected} packages={EVENT_PACKAGES} />
  </div>;
}
