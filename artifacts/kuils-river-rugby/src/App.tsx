import { useEffect, useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  ArrowDownRight, ArrowRight, Award, Check, ChevronLeft, ChevronRight,
  Dumbbell, Facebook, Heart, Instagram, Menu, ShieldCheck, Sparkles, Trophy, Users, X, Youtube,
} from 'lucide-react';
import { Link, Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import clubLogo from '@assets/image_1795617938523.png';
import './App.css';

const queryClient = new QueryClient();
const image = (name: string) => `/images/${name}`;
const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'The Gym Project', href: '/gym-project' },
  { label: 'Donate', href: '/donate' },
  { label: 'Sponsors', href: '/sponsors' },
  { label: 'Contact', href: '/contact' },
];
const tiers = [
  { amount: 100, name: 'Supporter', icon: Heart },
  { amount: 250, name: 'Community Contributor', icon: Users },
  { amount: 500, name: 'Player Supporter', icon: ShieldCheck },
  { amount: 1000, name: 'Club Champion', icon: Trophy },
  { amount: 2500, name: 'Gym Builder', icon: Dumbbell },
  { amount: 5000, name: 'Major Contributor', icon: Award },
];
const fmt = (n: number) => `R${Math.max(0, n).toLocaleString('en-ZA')}`;

function Header() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <Link href="/" className="brand" aria-label="Kuils River Rugby Club home">
          <img src={clubLogo} alt="Kuils River Rugby Club official crest, established 1994" />
          <span className="brand-name display">Kuils River<span>Rugby Club</span></span>
        </Link>
        <button className="menu-toggle" aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
        <nav className={open ? 'main-nav open' : 'main-nav'} aria-label="Main navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className={`nav-link ${location === item.href ? 'active' : ''}`}>
              {item.label}
            </Link>
          ))}
          <Link href="/donate" onClick={() => setOpen(false)} className="btn btn-red header-donate">Donate now <ArrowRight size={15} /></Link>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main wrap">
        <Link href="/" className="footer-brand">
          <img src={clubLogo} alt="Kuils River Rugby Club crest" />
          <span className="display">Kuils River<span>Rugby Club</span></span>
        </Link>
        <div className="footer-slogan display">Stronger <i>together</i></div>
        <div className="footer-contact">
          <div className="footer-socials" aria-label="Social media channels">
            <span role="img" aria-label="Facebook"><Facebook aria-hidden="true" /></span>
            <span role="img" aria-label="Instagram"><Instagram aria-hidden="true" /></span>
            <span role="img" aria-label="YouTube"><Youtube aria-hidden="true" /></span>
          </div>
          <p>Official social links will be added when confirmed.</p>
          <p>One club. One community. A stronger future.</p>
          <Link className="btn btn-red" href="/contact">Contact the club <ArrowRight size={15} /></Link>
        </div>
      </div>
      <div className="footer-ribbon" aria-hidden="true"><span /><span /></div>
      <div className="footer-legal wrap">
        <span>© {new Date().getFullYear()} Kuils River Rugby Club</span>
        <div><Link href="/privacy">Privacy policy</Link><Link href="/terms">Terms &amp; conditions</Link><Link href="/contact#faq">FAQ</Link></div>
      </div>
    </footer>
  );
}

function Shell({ children }: { children: ReactNode }) {
  return <><Header />{children}<Footer /></>;
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-photo" role="img" aria-label="Kuils River rugby player carrying the ball during a match" />
      <div className="hero-shade" />
      <div className="wrap hero-content">
        <p className="hero-eyebrow"><span /> Kuils River Rugby Club · Gym campaign</p>
        <h1 className="display">Building stronger<br />players.<br /><em>Building a stronger<br className="mobile-break" /> future.</em></h1>
        <p className="hero-copy">Help us build a new home for strength, fitness and player development at Kuils River Rugby Club.</p>
        <div className="hero-actions">
          <Link href="/donate" className="btn btn-red">Make a donation <ArrowRight size={16} /></Link>
          <Link href="/gym-project" className="btn btn-outline">Explore the project <ArrowDownRight size={16} /></Link>
        </div>
      </div>
      <div className="hero-swoosh" aria-hidden="true"><span /><span /></div>
    </section>
  );
}

function Progress() {
  return (
    <section className="progress-wrap wrap" aria-label="Fundraising campaign progress">
      <div className="progress-panel">
        <div className="progress-top">
          <div className="goal-figure"><strong>R250,000</strong><span>Fundraising goal</span></div>
          <div className="progress-stat"><Trophy /><b>R0</b><span>Raised</span></div>
          <div className="progress-stat"><Sparkles /><b>R250,000</b><span>Goal</span></div>
          <div className="progress-stat"><Award /><b>0%</b><span>Complete</span></div>
          <div className="progress-stat"><Users /><b>0</b><span>Verified donations</span></div>
        </div>
        <div className="progress-track" role="progressbar" aria-label="Fundraising progress, baseline" aria-valuemin={0} aria-valuemax={250000} aria-valuenow={0}><span /></div>
        <p>Every rand brings us one step closer to building a stronger Kuils River Rugby Club.</p>
        <small>R0 is the campaign’s starting baseline. Fundraising totals are not yet live.</small>
      </div>
    </section>
  );
}

const reasons = [
  { title: 'Player development', copy: 'Improve performance with proper training equipment.', src: 'gym-training.jpg', icon: Dumbbell },
  { title: 'Youth development', copy: 'Build confidence and strength from a young age.', src: 'gym-interior.jpg', icon: Users },
  { title: 'Injury prevention', copy: 'Support safer, more effective training.', src: 'strength-training.jpg', icon: ShieldCheck },
  { title: 'Community investment', copy: 'Invest in the future of our club and community.', src: 'gym-cardio.jpg', icon: Heart },
];

function WhySection() {
  return (
    <section className="why-section" id="why">
      <div className="wrap why-layout">
        <div className="why-intro">
          <span className="section-kicker">The need is real</span>
          <h2 className="display">Why we need<br /><em>a new gym</em></h2>
          <p>A dedicated gym will help our players train harder, prevent injuries and reach their full potential.</p>
          <Link href="/about" className="btn btn-red">Learn more <ArrowRight size={15} /></Link>
        </div>
        <div className="reason-grid">
          {reasons.map(({ title, copy, src, icon: Icon }) => (
            <article className="reason-card" key={title}>
              <div className="reason-image"><img src={image(src)} alt={`${title} in a dedicated training facility`} loading="lazy" /></div>
              <div className="reason-copy"><Icon aria-hidden="true" /><h3 className="display">{title}</h3><p>{copy}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const gallery = [
  { src: 'modern-gym.jpg', alt: 'Bright modern gym with strength and resistance equipment' },
  { src: 'gym-interior.jpg', alt: 'Dumbbell racks in a well-equipped gym' },
  { src: 'dumbbell-training.jpg', alt: 'Athlete training with dumbbells' },
  { src: 'strength-training.jpg', alt: 'Athlete preparing for a barbell strength exercise' },
  { src: 'gym-cardio.jpg', alt: 'Cardio and strength training area in a gym' },
];

function ProjectStrip() {
  const [index, setIndex] = useState(0);
  const scroll = (direction: number) => {
    const next = (index + direction + gallery.length) % gallery.length;
    setIndex(next);
    document.getElementById(`gallery-${next}`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  };
  return (
    <section className="project-strip" id="project">
      <div className="wrap project-layout">
        <div className="project-intro">
          <span className="section-kicker">A practical investment</span>
          <h2 className="display">What we’re<br /><em>building together</em></h2>
          <p>A brand-new gym facility to support our players at every level.</p>
          <Link href="/gym-project" className="btn btn-outline">See the vision <ArrowRight size={15} /></Link>
        </div>
        <div className="gallery-wrap">
          <div className="gallery" aria-label="Gym project inspiration gallery">
            {gallery.map((photo, i) => <figure className={`gallery-item ${i === index ? 'current' : ''}`} id={`gallery-${i}`} key={photo.src}><img src={image(photo.src)} alt={photo.alt} loading="lazy" /></figure>)}
          </div>
          <div className="gallery-controls">
            <span>Project inspiration <b>0{index + 1}</b> / 0{gallery.length}</span>
            <button onClick={() => scroll(-1)} aria-label="Previous gym inspiration image"><ChevronLeft /></button>
            <button onClick={() => scroll(1)} aria-label="Next gym inspiration image"><ChevronRight /></button>
          </div>
        </div>
      </div>
    </section>
  );
}

function DonationSelector({ onDonate, initialAmount = 250, continueEnabled = true }: { onDonate: (amount: number) => void; initialAmount?: number; continueEnabled?: boolean }) {
  const [selected, setSelected] = useState<number | null>(initialAmount);
  const [custom, setCustom] = useState('');
  const amount = custom !== '' ? Number(custom) || 0 : selected || 0;
  const choose = (value: number) => { setSelected(value); setCustom(''); };
  return (
    <section className="donation-section" id="donate-options">
      <div className="wrap donation-wrap">
        <div className="donation-heading">
          <div><span className="section-kicker">Every contribution counts</span><h2 className="display">Be part of<br /><em>something bigger</em></h2></div>
          <div className="donation-desc"><p>Whether it’s R100 or R10,000, every contribution helps bring our new gym one step closer to reality.</p><span className="script-note">Donate today.</span></div>
        </div>
        <div className="tier-grid">
          {tiers.map(({ amount: value, name, icon: Icon }) => (
            <button className={`tier-card ${selected === value && custom === '' ? 'selected' : ''}`} key={value} onClick={() => choose(value)} aria-pressed={selected === value && custom === ''}>
              <Icon aria-hidden="true" /><b>{fmt(value)}</b><span>{name}</span>
            </button>
          ))}
        </div>
        <div className="donation-bottom">
          <label className={`custom-amount ${custom !== '' ? 'selected' : ''}`}><span>Choose your amount</span><div><b>R</b><input aria-label="Custom donation amount in rand" type="number" min="1" step="1" placeholder="Custom amount" value={custom} onChange={(event) => { setCustom(event.target.value); setSelected(null); }} /></div></label>
          <div className="donation-selected"><span>Selected contribution</span><strong>{fmt(amount)}</strong></div>
          <button className="btn btn-red donate-submit" onClick={() => onDonate(amount)} disabled={!continueEnabled || amount < 1}>{continueEnabled ? <>Continue <ArrowRight size={16} /></> : 'Payments unavailable'}</button>
        </div>
        <p className="donation-notice"><ShieldCheck size={15} /> Payments are not enabled yet. No payment or donor information is collected on this site.</p>
      </div>
    </section>
  );
}

function SponsorClubBand() {
  return (
    <section className="sponsor-band wrap">
      <article className="sponsor-pitch">
        <div className="pitch-image" />
        <div className="pitch-content"><span className="section-kicker">Local business. Lasting impact.</span><h2 className="display">Partner with us.<br /><em>Build something that lasts.</em></h2><p>Become a sponsor and help support the future of Kuils River Rugby Club.</p><Link className="btn btn-gold" href="/sponsors">Become a sponsor <ArrowRight size={14} /></Link></div>
      </article>
      <article className="supporters-panel">
        <span className="section-kicker">Community powered</span><h3 className="display">Our supporters</h3>
        <div className="supporter-mark"><Users size={30} /><span>Local people.<br /><b>One club.</b></span></div>
        <p>We’re making room for the local businesses and neighbours who will help make this project possible.</p>
        <Link href="/sponsors" className="text-link">Explore sponsorship <ArrowRight size={14} /></Link>
      </article>
      <article className="about-teaser">
        <img src={image('gym-training.jpg')} alt="Athlete focused on strength training, representing player development at the club" loading="lazy" />
        <div><span className="section-kicker">Since 1994</span><h3 className="display">About Kuils River Rugby Club</h3><p>A proud rugby club, committed to developing players, building community and creating opportunities for all.</p><Link className="text-link" href="/about">Learn more <ArrowRight size={14} /></Link></div>
      </article>
    </section>
  );
}

function Home() {
  const [, setLocation] = useLocation();
  return <Shell><main><Hero /><Progress /><WhySection /><ProjectStrip /><DonationSelector onDonate={(amount) => setLocation(`/donate?amount=${amount}`)} /><SponsorClubBand /></main></Shell>;
}

function PageHero({ eyebrow, title, description, photo }: { eyebrow: string; title: string; description: string; photo?: string }) {
  return <section className="page-hero" style={photo ? { backgroundImage: `linear-gradient(90deg, rgba(16,24,39,.96), rgba(18,59,112,.62)), url("${image(photo)}")` } : undefined}><div className="wrap"><span className="section-kicker">{eyebrow}</span><h1 className="display">{title}</h1><p>{description}</p></div></section>;
}

function About() {
  return <Shell><main><PageHero eyebrow="Kuils River Rugby Club" title="A club with roots. A future worth building." description="A proud rugby club, committed to developing players, building community and creating opportunities for all." photo="gym-training.jpg" />
    <section className="content-section wrap two-col"><div><span className="section-kicker">Stronger together</span><h2 className="display">More than a game.</h2><p>For generations, Kuils River Rugby Club has brought players, families and neighbours together through rugby. Our next chapter is about giving every player a better place to prepare, grow and thrive.</p><p>The new gym is a practical investment in player development, safer training and the strength of our local rugby community.</p><Link href="/gym-project" className="btn btn-red">Meet the gym project <ArrowRight size={15} /></Link></div><img className="content-photo" src={image('strength-training.jpg')} alt="Strength training equipment, a foundation for player development" loading="lazy" /></section>
  </main></Shell>;
}

function GymProject() {
  return <Shell><main><PageHero eyebrow="The gym project" title="A stronger foundation for every player." description="We’re raising R250,000 to build a dedicated home for strength, fitness and player development at Kuils River Rugby Club." photo="modern-gym.jpg" />
    <section className="content-section wrap project-details"><div className="project-copy"><span className="section-kicker">The goal · R250,000</span><h2 className="display">Training for the next generation.</h2><p>A dedicated gym will give our players access to consistent strength and conditioning in a club environment. From youth development to match-day readiness, it’s an investment in the whole player.</p><ul><li><Check /> Purpose-built strength and conditioning space</li><li><Check /> Better access to training equipment</li><li><Check /> A safer, more consistent training environment</li><li><Check /> A lasting asset for the club community</li></ul><Link href="/donate" className="btn btn-red">Support the project <ArrowRight size={15} /></Link></div><img className="content-photo" src={image('gym-interior.jpg')} alt="Gym interior with dumbbell racks and equipment" loading="lazy" /></section>
    <ProjectStrip />
  </main></Shell>;
}

function Donate() {
  const [, setLocation] = useLocation();
  const queryAmount = Number(new URLSearchParams(window.location.search).get('amount')) || 250;
  return <Shell><main><PageHero eyebrow="Back the team" title="Every rand moves us forward." description="Choose a contribution towards the R250,000 gym project. Payments are not enabled yet, so no transaction or donor data will be taken." />
    <DonationSelector initialAmount={queryAmount} continueEnabled={false} onDonate={() => setLocation('/donate')} />
  </main></Shell>;
}

function Sponsors() {
  return <Shell><main><PageHero eyebrow="Local partners, lasting impact" title="Partner with Kuils River Rugby Club." description="Help us create a lasting home for player development and community rugby. We welcome conversations with local businesses and supporters." photo="gym-interior.jpg" />
    <section className="content-section wrap two-col sponsor-page"><div><span className="section-kicker">Build something that lasts</span><h2 className="display">A partnership with purpose.</h2><p>We’re inviting businesses and community supporters to be part of our R250,000 gym campaign. Sponsorship opportunities can help put essential training equipment and a stronger future within reach.</p><p>No sponsors are listed here yet. We will only display partner names or logos with their permission.</p><Link className="btn btn-red" href="/contact#sponsor">Enquire about sponsorship <ArrowRight size={15} /></Link></div><img className="content-photo" src={image('dumbbell-training.jpg')} alt="Close-up of strength training equipment" loading="lazy" /></section>
    <section className="sponsor-levels"><div className="wrap"><span className="section-kicker">A place on the team</span><h2 className="display">Every partnership helps.</h2><div className="level-row"><span><Award /> Equipment partner</span><span><Trophy /> Project partner</span><span><Users /> Community supporter</span></div><p>Interested? Get in touch to discuss a suitable way to support the project. Enquiries are not enabled yet.</p></div></section>
  </main></Shell>;
}

function Contact() {
  return <Shell><main><PageHero eyebrow="Get in touch" title="The club is better together." description="Questions about the gym campaign, a sponsorship idea, or want to connect with the club? We’d be glad to hear from you." />
    <section className="contact-section wrap">
      <div className="contact-copy"><span className="section-kicker">Talk to the club</span><h2 className="display">Let’s make it happen.</h2><p>Our contact and enquiry forms are being prepared. Submissions are not enabled yet, and information entered here will not be sent or stored.</p><div className="contact-note"><ShieldCheck /><span><b>No form submission</b><br />Please do not enter personal or payment details.</span></div></div>
      <div className="contact-form-card" id="sponsor"><h3 className="display">Send an enquiry</h3><label>Your name<input type="text" placeholder="Name" /></label><label>Email address<input type="email" placeholder="you@example.com" /></label><label>How can we help?<textarea rows={4} placeholder="Tell us what you have in mind" /></label><button className="btn btn-red" disabled title="Enquiries are not enabled yet">Enquiries not enabled</button><small>Nothing entered in this form is submitted or stored.</small></div>
    </section>
    <section className="faq-section" id="faq"><div className="wrap"><span className="section-kicker">A few quick answers</span><h2 className="display">Campaign FAQ</h2><div className="faq-grid"><article><h3>What is the fundraising goal?</h3><p>R250,000 towards a new gym facility for Kuils River Rugby Club.</p></article><article><h3>Can I donate online now?</h3><p>Not yet. Payment functionality is not enabled. No payment will be taken.</p></article><article><h3>Is the progress total live?</h3><p>No. R0 is the starting baseline shown for this campaign. Totals are not connected to a live database.</p></article></div></div></section>
  </main></Shell>;
}

function StatusPage({ failed }: { failed: boolean }) {
  return <Shell><main><section className="status-page"><div className="status-mark">{failed ? <X /> : <Check />}</div><span className="section-kicker">{failed ? 'Payment unavailable' : 'Campaign update'}</span><h1 className="display">{failed ? 'No payment was made.' : 'Thank you for standing with the club.'}</h1><p>{failed ? 'Online payments are not enabled on this website. No payment was attempted or recorded.' : 'Your support matters. Donation submissions are not enabled yet, so no donation has been submitted or recorded.'}</p><div className="status-actions"><Link className="btn btn-red" href="/donate">Return to donation options <ArrowRight size={15} /></Link><Link className="text-link" href="/">Back to home</Link></div></section></main></Shell>;
}

function Legal({ terms }: { terms: boolean }) {
  const title = terms ? 'Terms & conditions' : 'Privacy policy';
  return <Shell><main><PageHero eyebrow="Kuils River Rugby Club" title={title} description="Clear information about this campaign website and its current limitations." />
    <section className="legal-content wrap"><span className="section-kicker">Last updated · 2025</span>{terms ? <><h2 className="display">Campaign terms</h2><p>This website provides information about Kuils River Rugby Club’s R250,000 gym fundraising campaign. The R0 raised figure is a starting baseline and is not connected to a live fundraising database.</p><h3>Payments and donations</h3><p>Online payment and donation submissions are not enabled. No payment is accepted, no donor information is submitted, and campaign totals are not updated by activity on this site.</p><h3>Campaign information</h3><p>Project details are provided to explain the fundraising goal. Final project scope and timing are subject to club planning and available funds.</p><h3>Questions</h3><p>Use the Contact page for campaign questions. Enquiry submissions are not enabled yet.</p></> : <><h2 className="display">Your information matters.</h2><p>This campaign website does not currently submit or store donation or contact form information. Payment processing is not enabled. Please do not enter personal, financial or payment information into its forms.</p><h3>Website activity</h3><p>The R0 campaign baseline is a static display, not a live database total. No donor list or payment history is maintained through this website.</p><h3>Third-party services</h3><p>No payment service is currently connected to this website. This page will be updated if campaign features change.</p><h3>Questions</h3><p>For questions about this notice, please use the club contact page. Contact form submissions are not enabled yet.</p></>}</section>
  </main></Shell>;
}

const pageMeta: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Kuils River Rugby Club Gym Fundraiser | Stronger Together',
    description: 'Help Kuils River Rugby Club raise R250,000 for a new gym supporting player development, safer training, and the local rugby community.',
  },
  '/about': {
    title: 'About Kuils River Rugby Club | Community Rugby',
    description: 'Learn about Kuils River Rugby Club, established in 1994, and the community-focused gym campaign building a stronger future for players.',
  },
  '/gym-project': {
    title: 'Kuils River Rugby Club Gym Project | R250,000 Goal',
    description: 'Explore the plan to build a dedicated gym for strength, fitness, youth development, and safer training at Kuils River Rugby Club.',
  },
  '/donate': {
    title: 'Donate to Kuils River Rugby Club’s Gym Project',
    description: 'Choose a contribution towards the Kuils River Rugby Club R250,000 gym campaign. Online payments are not enabled yet.',
  },
  '/sponsors': {
    title: 'Sponsor Kuils River Rugby Club’s New Gym Campaign',
    description: 'Partner with Kuils River Rugby Club to support player development and a lasting community gym project.',
  },
  '/contact': {
    title: 'Contact Kuils River Rugby Club | Gym Campaign',
    description: 'Find campaign answers and learn how to connect with Kuils River Rugby Club about the new gym project.',
  },
  '/thank-you': {
    title: 'Thank You | Kuils River Rugby Club',
    description: 'A campaign message from Kuils River Rugby Club supporters. Donation submissions are not enabled yet.',
  },
  '/payment-failed': {
    title: 'Payment Not Completed | Kuils River Rugby Club',
    description: 'Online payments are not enabled for the Kuils River Rugby Club gym campaign. No payment was attempted.',
  },
  '/privacy': {
    title: 'Privacy Policy | Kuils River Rugby Club',
    description: 'Read how the Kuils River Rugby Club campaign website currently handles information and donation features.',
  },
  '/terms': {
    title: 'Terms and Conditions | Kuils River Rugby Club',
    description: 'Review the current terms for the Kuils River Rugby Club gym fundraising campaign website.',
  },
};

function PageMetadata() {
  const [location] = useLocation();

  useEffect(() => {
    const path = location.split('?')[0] || '/';
    const meta = pageMeta[path] ?? {
      title: 'Kuils River Rugby Club | Gym Campaign',
      description: 'Support the Kuils River Rugby Club R250,000 gym fundraising campaign.',
    };

    document.title = meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', meta.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', meta.description);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', meta.title);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', meta.description);
  }, [location]);

  return null;
}

function Router() {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}><Switch>
    <Route path="/" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/gym-project" component={GymProject} />
    <Route path="/donate" component={Donate} />
    <Route path="/sponsors" component={Sponsors} />
    <Route path="/contact" component={Contact} />
    <Route path="/thank-you"><StatusPage failed={false} /></Route>
    <Route path="/payment-failed"><StatusPage failed /></Route>
    <Route path="/privacy"><Legal terms={false} /></Route>
    <Route path="/terms"><Legal terms /></Route>
    <Route component={NotFound} />
  </Switch></ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><PageMetadata /><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;
