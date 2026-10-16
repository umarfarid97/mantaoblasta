import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { ArrowLeft, ArrowUpRight, MessageCircle } from 'lucide-react';
import { EVENT_PACKAGES } from '../data/eventPackages';
import './garden.css';

const money = (value: number) => `RM ${value.toLocaleString('en-MY', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export function EnquiryPage() {
  const query = new URLSearchParams(window.location.hash.split('?')[1]);
  const requestedId = query.get('package');
  const initialPackage = EVENT_PACKAGES.find(item => item.id === requestedId) ?? EVENT_PACKAGES[0];
  const [packageId, setPackageId] = useState(initialPackage.id);
  const pkg = EVENT_PACKAGES.find(item => item.id === packageId) ?? initialPackage;
  const [guests, setGuests] = useState(() => {
    const requestedGuests = Number(query.get('guests'));
    return query.has('guests') && Number.isInteger(requestedGuests)
      ? Math.max(initialPackage.minPax, initialPackage.openEndedGuests ? requestedGuests : Math.min(initialPackage.maxPax, requestedGuests))
      : initialPackage.exampleGuests ?? initialPackage.minPax;
  });
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [eventType, setEventType] = useState('Corporate event');
  const [venue, setVenue] = useState('');
  const [notes, setNotes] = useState('');
  const [opened, setOpened] = useState(false);
  const total = Math.round(guests * (pkg.pricePerGuestMYR ?? 0) * 100) / 100;
  const validGuests = Number.isSafeInteger(guests) && guests >= pkg.minPax && (pkg.openEndedGuests || guests <= pkg.maxPax);
  const [today] = useState(() => new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kuala_Lumpur', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date()));

  useEffect(() => {
    document.documentElement.classList.add('garden-active');
    const originalTitle = document.title;
    document.title = 'Event enquiry · blasta EMPIRE';
    const theme = document.createElement('meta');
    theme.name = 'theme-color'; theme.content = '#edf0e3'; document.head.appendChild(theme);
    return () => { document.documentElement.classList.remove('garden-active'); document.title = originalTitle; theme.remove(); };
  }, []);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validGuests) return;
    const formattedDate = date.split('-').reverse().join('/');
    const message = [
      'Hello blasta EMPIRE! I would like to enquire about event catering.', '',
      `Package: ${pkg.name}`, `Rate: ${money(pkg.pricePerGuestMYR ?? 0)} / guest`,
      `Guests: ${guests}`, `Estimated total: ${money(total)}`, `Mantao: ${guests * 3} pieces`,
      ...(pkg.menuType === 'Mantao ButterClam' ? [`Clam: approximately ${(guests * .06).toFixed(2)} kg`, 'Includes serving crew, booth setup & dismantling'] : []),
      '', `Organizer: ${name.trim()}`, `WhatsApp: ${phone.trim()}`, `Event type: ${eventType}`,
      `Event date: ${formattedDate}`, `Venue: ${venue.trim() || 'To be confirmed'}`,
      `Special requests: ${notes.trim() || 'None'}`, '', 'Please check availability for my event. Thank you!',
    ].join('\n');
    window.open(`https://wa.me/60143452765?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    // WhatsApp opens a draft; the visitor reviews and sends it there.
    setOpened(true);
  };

  return <div className="garden-page garden-enquiry-page"><div className="garden-sheet">
    <header className="garden-header"><a href="./" className="garden-brand"><img src={`${import.meta.env.BASE_URL}blasta-logo-dark.png`} alt="blasta EMPIRE" /></a><a className="garden-back-link" href="./"><ArrowLeft size={17} /> Back to website</a></header>
    <main className="garden-enquiry-main">
      <div className="garden-enquiry-intro"><h1>Let’s plan your event.</h1><p>A few details, a little Blasta. Tell us what you have in mind and we’ll check availability on WhatsApp.</p></div>
      <form className="garden-enquiry-layout" onSubmit={submit}>
        <div className="garden-enquiry-fields">
          <section aria-labelledby="enquiry-event"><h2 id="enquiry-event">Your event</h2>
            <label>Choose your package<select value={packageId} onChange={event => { const next = EVENT_PACKAGES.find(item => item.id === event.target.value)!; setPackageId(next.id); setGuests(current => Math.max(next.minPax, next.openEndedGuests ? current : Math.min(next.maxPax, current))); setOpened(false); }}>{EVENT_PACKAGES.map(item => <option key={item.id} value={item.id}>{item.name} — {money(item.pricePerGuestMYR ?? 0)} / guest</option>)}</select></label>
            <div className="garden-form-row"><label>Number of guests <span>(required)</span><input type="number" min={pkg.minPax} max={pkg.openEndedGuests ? undefined : pkg.maxPax} step="1" required value={guests || ''} onChange={event => setGuests(Number(event.target.value))} aria-describedby="enquiry-guest-range" /><small id="enquiry-guest-range">{pkg.paxRange} for this tier{pkg.openEndedGuests ? ' · Counts above 1,000 welcome' : ''}</small></label><label>Event date <span>(required)</span><input type="date" min={today} required value={date} onChange={event => setDate(event.target.value)} /></label></div>
            <label>Event type<select value={eventType} onChange={event => setEventType(event.target.value)}>{['Corporate event', 'Private gathering', 'Birthday party', 'Wedding / Sanding', 'Exhibition / Festival', 'Annual dinner', 'Other celebration'].map(item => <option key={item}>{item}</option>)}</select></label>
            <label>Venue / location <span>(optional)</span><input autoComplete="street-address" value={venue} onChange={event => setVenue(event.target.value)} placeholder="Hotel, office, hall or outdoor venue" /></label>
          </section>
          <section aria-labelledby="enquiry-contact"><h2 id="enquiry-contact">Your contact details</h2>
            <label>Organizer name <span>(required)</span><input autoComplete="name" required maxLength={120} value={name} onChange={event => setName(event.target.value)} placeholder="Your name or company" pattern=".*\S.*" /></label>
            <label>WhatsApp number <span>(required)</span><input type="tel" autoComplete="tel" required maxLength={25} pattern="[+0-9() .\-]{7,25}" value={phone} onChange={event => setPhone(event.target.value)} placeholder="e.g. +60 12-345 6789" /></label>
            <label>Special requests <span>(optional)</span><textarea rows={4} maxLength={2000} value={notes} onChange={event => setNotes(event.target.value)} placeholder="Serving time, access details, flavour preferences or anything else we should know" /></label>
          </section>
        </div>
        <aside className="garden-enquiry-summary" aria-labelledby="enquiry-summary"><h2 id="enquiry-summary">Your package</h2><h3>{pkg.name}</h3><p>{pkg.paxRange}</p><ul>{pkg.features.map(feature => <li key={feature}>{feature}</li>)}</ul><div className="garden-enquiry-total" aria-live="polite"><span>Estimated total</span><strong>{validGuests ? money(total) : '—'}</strong><small>{validGuests ? `${guests.toLocaleString()} guests × ${money(pkg.pricePerGuestMYR ?? 0)}` : pkg.openEndedGuests ? `Enter at least ${pkg.minPax} guests` : `Enter ${pkg.minPax}–${pkg.maxPax.toLocaleString()} guests`}</small></div><button className="garden-button" type="submit"><MessageCircle size={18} /> Continue on WhatsApp <ArrowUpRight size={16} /></button><p className="garden-enquiry-note">Review and send your enquiry in WhatsApp. Availability will be confirmed by our team.</p>{opened && <p className="garden-enquiry-feedback" role="status">Your WhatsApp draft is ready. If it didn’t open, allow pop-ups and try again.</p>}</aside>
      </form>
    </main><footer className="garden-footer"><a href="./"><ArrowLeft size={14} /> Back to Blasta</a><a href="https://wa.me/60143452765" target="_blank" rel="noreferrer">+60 14-345 2765</a></footer>
  </div></div>;
}
