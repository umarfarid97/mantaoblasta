import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, ChefHat, ChevronLeft, ChevronRight, Flame, Heart, MessageCircle, Users, Utensils } from 'lucide-react';
import { SIGNATURE_SAUCES } from '../data/sauces';
import { EVENT_PACKAGES } from '../data/eventPackages';
import { EventSlideshow } from '../components/EventSlideshow';
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
  const [guestCounts, setGuestCounts] = useState<Record<string, number>>({});
  const pkg = EVENT_PACKAGES[packageIndex];
  const guests = guestCounts[pkg.id] ?? pkg.minPax;
  const total = Math.round(guests * (pkg.pricePerGuestMYR ?? 0) * 100) / 100;
  const enquire = (chosenPackage = pkg) => { window.location.hash = `/enquiry?package=${encodeURIComponent(chosenPackage.id)}&guests=${guestCounts[chosenPackage.id] ?? chosenPackage.minPax}`; };
  const switchPackage = (step: number) => {
    setPackageIndex(index => (index + step + EVENT_PACKAGES.length) % EVENT_PACKAGES.length);
  };
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });

  return <div className="garden-page">
    <a className="garden-skip" href="#garden-menu" onClick={e => { e.preventDefault(); document.getElementById('garden-menu')?.focus(); scrollTo('garden-menu'); }}>Skip to packages</a>
    <div className="garden-sheet">
      <header className="garden-header">
        <a href="./" className="garden-brand" aria-label="Blasta Empire home"><img src={asset('blasta-logo-dark.png')} alt="blasta EMPIRE" /></a>
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
          <div className="garden-hero-photo"><img src={asset('mantao-plate.jpg')} alt="Golden fried mantao drizzled with creamy sauce on a sharing plate" fetchPriority="high" /></div>
          <svg className="garden-wave" viewBox="0 0 1200 80" preserveAspectRatio="none" aria-hidden="true"><path d="M0 55C160-40 300 110 540 40S930 25 1200 60V80H0Z" fill="currentColor" /></svg>
        </section>

        <section className="garden-values" aria-label="The Blasta experience">
          {[{ Icon: Flame, title: 'That golden crunch', text: 'Crispy little pillows with an ultra-fluffy centre.' }, { Icon: Utensils, title: 'A dip for every mood', text: 'From buttermilk salted egg to sweet pandan custard.' }, { Icon: ChefHat, title: 'Ready for your event', text: 'Warm catering setups and live frying options.' }, { Icon: Users, title: 'Better together', text: 'For intimate gatherings and grand celebrations.' }].map(({ Icon, title, text }) => <div key={title}><Icon /><h2>{title}</h2><p>{text}</p></div>)}
        </section>

        <section className="garden-packages garden-package-carousel garden-package-calculator" id="garden-menu" tabIndex={-1} aria-labelledby="garden-packages-title">
          <div className="garden-package-intro"><h2 id="garden-packages-title">Event packages &amp; pricing</h2><p>Choose your package and guest count to see your total.</p></div>
          <article className="garden-package" id="garden-current-package">
          <div className="garden-package-picker" tabIndex={0} aria-label="Swipe package name or use arrow keys to switch package" onKeyDown={event => {
            if (event.target !== event.currentTarget) return;
            if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
              event.preventDefault();
              switchPackage(event.key === 'ArrowLeft' ? -1 : 1);
            }
          }}>
          <button className="garden-package-arrow garden-package-prev" onClick={() => switchPackage(-1)} aria-label="Previous package" aria-controls="garden-current-package"><ChevronLeft size={26} /></button>
          <motion.h3 key={pkg.id} aria-live="polite"
            drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={.55} dragSnapToOrigin
            onDragEnd={(_, info) => {
              if (Math.abs(info.offset.x) > 55 || Math.abs(info.velocity.x) > 450) switchPackage(info.offset.x === 0 ? (info.velocity.x < 0 ? 1 : -1) : (info.offset.x < 0 ? 1 : -1));
            }}>
            {pkg.name}
          </motion.h3>
          <button className="garden-package-arrow garden-package-next" onClick={() => switchPackage(1)} aria-label="Next package" aria-controls="garden-current-package"><ChevronRight size={26} /></button>
          </div>
            <p>{pkg.paxRange}</p>
            <strong>RM {pkg.pricePerGuestMYR?.toFixed(2)}<span className="garden-per-guest"> / guest</span></strong>
            <ul className="garden-package-inclusions">{pkg.features.map(feature => <li key={feature}>{feature}</li>)}</ul>
            <div className="garden-pax-control">
              <label htmlFor="garden-pax">Your guest count <output htmlFor="garden-pax">{guests.toLocaleString()} pax</output></label>
              <input id="garden-pax" type="range" min={pkg.minPax} max={pkg.maxPax} step={1} value={guests} onChange={event => setGuestCounts(previous => ({ ...previous, [pkg.id]: Number(event.target.value) }))} aria-valuetext={`${guests} guests`} />
              <div className="garden-pax-bounds"><span>{pkg.minPax.toLocaleString()} pax</span><span>{pkg.maxPax.toLocaleString()} pax</span></div>
              {pkg.openEndedGuests && <p className="garden-pax-note">More than 1,000 guests? Enter your count on the enquiry page.</p>}
            </div>
            <div className="garden-tile-total" aria-live="polite"><span>Estimated total</span><strong>RM {total.toLocaleString('en-MY', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong><small>{guests.toLocaleString()} guests × RM {pkg.pricePerGuestMYR?.toFixed(2)}</small></div>
            <button onPointerDown={event => event.stopPropagation()} onClick={() => enquire(pkg)}>Enquire about this package <ArrowUpRight size={16} /></button>
          </article>
          <p className="garden-package-position" role="status">Package {packageIndex + 1} of {EVENT_PACKAGES.length}<span>Swipe the package name to explore</span></p>
        </section>

        <section className="garden-dips" id="garden-dips" aria-labelledby="garden-dips-title"><div className="garden-section-heading"><span /><h2 id="garden-dips-title">Meet your mantao’s other half</h2><span /></div><p className="garden-section-description">A little savoury, a little sweet. A whole lot to love.</p><div className="garden-dip-list">{SIGNATURE_SAUCES.map((sauce, i) => <div className="garden-dip" key={sauce.id}><span className={`garden-sauce garden-sauce-${i}`}><Utensils size={24} /></span><span><strong>{sauce.name}</strong><small>{[sauce.spiceLevel, ...sauce.tags].join(' · ')}</small></span></div>)}</div></section>

        <section className="garden-story" id="garden-story"><div><h2>Our event history</h2><p>A few moments from our past events and pop-ups.</p></div><EventSlideshow /></section>

        <section className="garden-contact" id="garden-contact"><div><h2>Good food. Great company.</h2><p>Tell us what you’re celebrating.<br />We’ll help you find the right package.</p><a href="https://wa.me/60182868402" target="_blank" rel="noreferrer"><MessageCircle size={18} /> +60 18-286 8402 <ArrowUpRight size={16} /></a></div><div><h2>Save a place for something golden.</h2><p>From 100 guests to celebrations of 1,000 and beyond.</p><button className="garden-button" onClick={() => enquire()}>Start your event enquiry <ArrowUpRight size={16} /></button></div><div className="garden-footer-art" aria-hidden="true"><ChefHat size={70} strokeWidth={1} /><Utensils size={44} strokeWidth={1} /></div></section>
      </main>
      <footer className="garden-footer"><span>© {currentYear} blasta EMPIRE</span><span>Malaysian comfort. Made to share.</span></footer>
    </div>
  </div>;
}
