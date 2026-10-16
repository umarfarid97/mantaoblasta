import { useEffect, useState } from 'react';
import { ArrowDown, ArrowUpRight, ChefHat, Flame, Heart, Leaf, MessageCircle, Plus, Users, Utensils } from 'lucide-react';
import { WEDDING_PACKAGES, SIGNATURE_SAUCES } from '../data/packagesData';
import type { Currency, WeddingPackage } from '../types';
import { EnquiryModal } from '../components/EnquiryModal';
import { FlavourModal } from '../components/FlavourModal';
import './garden.css';

const asset = (name: string) => `${import.meta.env.BASE_URL}${name}`;
const currencyLabels = { MYR: 'RM', SGD: 'S$', USD: '$' };
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
  const [currency, setCurrency] = useState<Currency>('MYR');
  const [selected, setSelected] = useState<WeddingPackage>(WEDDING_PACKAGES[1]);
  const [enquiry, setEnquiry] = useState(false);
  const [sauces, setSauces] = useState(false);
  const enquire = (pkg = selected) => { setSelected(pkg); setEnquiry(true); };
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });

  return <div className="garden-page">
    <a className="garden-skip" href="#garden-menu" onClick={e => { e.preventDefault(); document.getElementById('garden-menu')?.focus(); scrollTo('garden-menu'); }}>Skip to packages</a>
    <div className="garden-sheet">
      <header className="garden-header">
        <a href="#/garden" className="garden-brand" aria-label="Blasta Empire home"><img src={asset('blasta-logo-dark.png')} alt="blasta EMPIRE" /><span>Little buns. Big celebrations.</span></a>
        <nav aria-label="Main navigation"><button onClick={() => scrollTo('garden-menu')}>Packages</button><button onClick={() => scrollTo('garden-story')}>Our mantao</button><button onClick={() => setSauces(true)}>Signature dips</button><button onClick={() => scrollTo('garden-contact')}>Contact</button></nav>
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

        <section className="garden-packages" id="garden-menu" tabIndex={-1} aria-labelledby="garden-packages-title">
          <div className="garden-package-intro"><h2 id="garden-packages-title">A gathering.<br />A celebration.<br /><em>A little Blasta.</em></h2><p>Find a package for your people.<br />We’ll bring the golden goodness.</p><label className="garden-currency">Show prices in <select value={currency} onChange={e => setCurrency(e.target.value as Currency)} aria-label="Price currency"><option value="MYR">MYR</option><option value="SGD">SGD</option><option value="USD">USD</option></select></label></div>
          {WEDDING_PACKAGES.map((pkg, i) => <article className="garden-package" key={pkg.id}>
            <div className={`garden-package-image garden-crop-${i}`}><img src={asset(i === 1 ? 'mantao-box.png' : 'mantao-plate.jpg')} alt={i === 1 ? 'Box of golden mantao with dipping sauce' : 'Golden mantao platter'} loading="lazy" /></div>
            <span className="garden-package-label">{pkg.isPopular ? 'The crowd favourite' : pkg.liveFryBarIncluded ? 'With live frying' : 'For your inner circle'}</span>
            <h3>{pkg.name}</h3><p>{pkg.paxRange}</p><strong>{currencyLabels[currency]} {pkg.prices[currency].toLocaleString()}</strong>
            <p className="garden-package-detail">{pkg.dipsCount} signature dips · {pkg.liveFryBarIncluded ? '2 on-site chefs' : 'Warm serving station'}</p>
            <details><summary>What’s included</summary><p>{pkg.subtitle}</p><p>{pkg.mantaoCount}</p><p>{pkg.setupType}</p><ul>{[...pkg.features, ...pkg.extras].map(item => <li key={item}>{item}</li>)}</ul><p>{pkg.idealFor}</p></details>
            <button onClick={() => enquire(pkg)}>Enquire about this package <ArrowUpRight size={16} /></button>
          </article>)}
        </section>

        <section className="garden-dips" aria-labelledby="garden-dips-title"><div className="garden-section-heading"><span /><h2 id="garden-dips-title">Meet your mantao’s other half</h2><span /></div><p className="garden-section-description">A little savoury, a little sweet. A whole lot to love.</p><div className="garden-dip-list">{SIGNATURE_SAUCES.map((sauce, i) => <button className="garden-dip" key={sauce.id} onClick={() => setSauces(true)}><span className={`garden-sauce garden-sauce-${i}`}><Utensils size={24} /></span><span><strong>{sauce.name}</strong><small>{sauce.spiceLevel}</small></span><Plus size={18} aria-hidden="true" /></button>)}</div><button className="garden-text-button" onClick={() => setSauces(true)}>Explore all signature dips <ArrowUpRight size={16} /></button></section>

        <section className="garden-story" id="garden-story"><div><Leaf size={34} /><h2>Small bites.<br /><em>Generous Malaysian soul.</em></h2><p>Golden fried mantao and our signature creamy spiced buttermilk dip. A comforting combination for corporate functions, private gatherings, and celebrations worth savouring.</p><button className="garden-button garden-green-button" onClick={() => enquire()}>Let’s make it a celebration <ArrowUpRight size={16} /></button></div><img src={asset('mantao-box.png')} alt="Blasta mantao served with signature creamy dip" loading="lazy" /></section>

        <section className="garden-contact" id="garden-contact"><div><h2>Good food. Great company.</h2><p>Tell us what you’re celebrating.<br />We’ll help you find the right package.</p><a href="https://wa.me/60182868402" target="_blank" rel="noreferrer"><MessageCircle size={18} /> +60 18-286 8402 <ArrowUpRight size={16} /></a></div><div><h2>Save a place for something golden.</h2><p>From 100 to 1,000 guests, there’s a little Blasta for everyone.</p><button className="garden-button" onClick={() => enquire()}>Start your event enquiry <ArrowUpRight size={16} /></button></div><div className="garden-footer-art" aria-hidden="true"><ChefHat size={70} strokeWidth={1} /><Utensils size={44} strokeWidth={1} /></div></section>
      </main>
      <footer className="garden-footer"><span>© {currentYear} blasta EMPIRE</span><span>Malaysian comfort. Made to share.</span><a href="#/">View original website <ArrowUpRight size={14} /></a></footer>
    </div>
    <EnquiryModal isOpen={enquiry} onClose={() => setEnquiry(false)} selectedPackage={selected} currency={currency} onSelectAnotherPackage={setSelected} />
    <FlavourModal isOpen={sauces} onClose={() => setSauces(false)} />
  </div>;
}
