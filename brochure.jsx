// Brochure page for the Đà Nẵng summer retreat — an on-screen reading
// experience that's also print-ready (A4, one section per sheet).
// Reuses the retreat data already defined for the reservation flow.
// Loaded by brochure.html alongside nav.jsx + footer.jsx.

/* ---------------------------------------------------------------- DATA */
const SCHEDULE = [
  { no: "01", date: "Fri · Aug 1", title: "Arrival & welcome circle",
    items: ["Afternoon check-in", "Sunset sea bath", "Opening dinner under the sea-almond tree"] },
  { no: "02", date: "Sat · Aug 2", title: "Slow mornings",
    items: ["Sunrise slow vinyasa", "Plant-forward brunch", "Candlelit yin & sound bath"] },
  { no: "03", date: "Sun · Aug 3", title: "Moon & water",
    items: ["Beach flow", "Free afternoon by the sea", "Moon circle + mineral bracelet ritual"] },
  { no: "04", date: "Mon · Aug 4", title: "Hội An day trip",
    items: ["Lantern old town", "Riverside lunch", "Evening at leisure"] },
  { no: "05", date: "Tue · Aug 5", title: "Strength & spine",
    items: ["Mat pilates", "Yoga for spinal health", "Journaling & restorative evening"] },
  { no: "06", date: "Wed · Aug 6", title: "Stillness",
    items: ["Sunrise meditation", "Breath work", "Closing feast & gratitude circle"] },
  { no: "07", date: "Thu · Aug 7", title: "Soft departures",
    items: ["Gentle closing flow", "Slow breakfast", "Farewells & airport transfers"] },
];

const INCLUDED = [
  { title: "6 nights · ocean-view villa", body: "Your own bed at An Lành — a quiet, palm-fringed villa a two-minute barefoot walk from Mỹ Khê beach." },
  { title: "Twice-daily yoga", body: "Slow vinyasa at sunrise, candlelit yin or restorative by night. All levels held with care, props for everyone." },
  { title: "Plant-forward meals", body: "Three nourishing meals a day, mostly plants and local produce, plus fresh coconuts and herbal teas between." },
  { title: "Sound bath & moon circle", body: "An evening of crystal bowls and a new-moon circle where you string your own mineral bracelet for the cycle ahead." },
  { title: "Sea bath rituals", body: "Sunrise and sunset dips in the warm South China Sea — the studio's daily ritual for landing back in the body." },
  { title: "Hội An day trip", body: "A full day in the lantern-lit old town: riverside lunch, slow wandering, and an evening entirely at leisure." },
];

const GALLERY = [
  { src: "media/retreat-pool.jpg", alt: "A palm-fringed pool at the villa", cls: "s1" },
  { src: "media/retreat-coconuts.jpg", alt: "Fresh coconuts with paper umbrellas and straws", cls: "s2" },
  { src: "media/retreat-buddha.jpg", alt: "A small Buddha statue with a pink oleander flower", cls: "s3" },
];

/* ---------------------------------------------------------------- LEAF DIVIDER */
function LeafDivider() {
  return (
    <div className="br-divider" aria-hidden="true">
      <Logo size={22} color="currentColor" />
    </div>
  );
}

/* ---------------------------------------------------------------- ACTION BAR */
function ActionBar() {
  return (
    <div className="br-actions-bar">
      <a className="br-pill br-pill-back" href="index.html#retreat">← Back to the studio</a>
      <button className="br-pill br-pill-print" onClick={() => window.print()}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9V2h12v7" /><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><rect x="6" y="14" width="12" height="8" />
        </svg>
        Save as PDF
      </button>
      <a className="br-pill br-pill-apply" href="reserve.html?type=retreat">Apply for a spot →</a>
    </div>
  );
}

/* ---------------------------------------------------------------- COVER */
function Cover() {
  return (
    <header className="br-cover" data-screen-label="Cover">
      <div className="br-cover-media">
        <img src="media/retreat-hero.jpg" alt="A group of yogis stretching together on the beach at sunrise" />
      </div>
      <div className="br-cover-top">
        <span className="br-cover-brand">
          <Logo size={26} color="var(--sand-50)" />
          <span className="wordmark">namasteyogis</span>
        </span>
        <span className="br-cover-issue">The Retreat Brochure</span>
      </div>
      <div className="br-cover-bottom">
        <span className="br-eyebrow">Featured retreat · summer edition</span>
        <h1 className="br-cover-title">
          Yoga Retreat
          <span className="script">in Đà Nẵng</span>
        </h1>
        <div className="br-cover-meta">
          <div>
            <span className="label">When</span>
            <span className="value">August 1 – 7, 2026</span>
          </div>
          <div>
            <span className="label">Where</span>
            <span className="value">An Lành villa · Mỹ Khê</span>
          </div>
          <div>
            <span className="label">Circle</span>
            <span className="value">12 yogis only</span>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ---------------------------------------------------------------- INVITATION */
function Invitation() {
  return (
    <section className="br-page br-invite" data-screen-label="Invitation">
      <div className="br-inner">
        <span className="br-eyebrow">An invitation</span>
        <p className="br-invite-quote">
          "…to find yourself once again, and to find your <span className="script">inner strength</span>."
        </p>
        <p className="br-lede">
          Seven slow days on the south coast of Vietnam — twice-daily yoga, sea baths at sunrise,
          plant-forward meals and a small circle of just twelve. No rushing, no performing; only
          the practice, the sea, and the kind of quiet that lets you hear yourself think again.
        </p>
        <p className="br-lede">
          This brochure walks you through how the week unfolds, everything that's held for you,
          where you'll be staying, and what a place costs. When you're ready, there's a spot
          waiting under the sea-almond tree.
        </p>
        <p className="br-invite-sign">— Mai &amp; the namasteyogis circle</p>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- DAILY RHYTHM */
function DailyRhythm() {
  return (
    <section className="br-page br-rhythm" data-screen-label="Daily rhythm">
      <div className="br-inner">
        <div className="br-section-head">
          <span className="br-eyebrow">Day by day</span>
          <h2 className="br-title">seven <span className="script">slow days</span></h2>
        </div>
        <div className="br-rhythm-grid">
          {SCHEDULE.map((d) => (
            <article className="br-day" key={d.no}>
              <div className="br-day-top">
                <span className="br-day-no">{d.no}</span>
                <span className="br-day-date">{d.date}</span>
              </div>
              <h3>{d.title}</h3>
              <ul>
                {d.items.map((it) => <li key={it}>{it}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- WHAT'S INCLUDED */
function Included() {
  return (
    <section className="br-page br-included" data-screen-label="What's included">
      <div className="br-inner">
        <div className="br-section-head">
          <span className="br-eyebrow">Everything held for you</span>
          <h2 className="br-title">what's <span className="script">included</span></h2>
          <p className="br-lede">
            One price, six nights, very little to think about. From the moment we collect you at
            the airport to your soft departure, the week is taken care of.
          </p>
        </div>
        <div className="br-included-grid">
          {INCLUDED.map((it, i) => (
            <article className="br-incl" key={it.title}>
              <span className="br-incl-no">{String(i + 1).padStart(2, "0")}</span>
              <h3>{it.title}</h3>
              <p>{it.body}</p>
            </article>
          ))}
        </div>
        <p className="br-note">
          <span className="dot" />
          Airport pick-up is included — we're 20 minutes from Đà Nẵng International Airport.
          Flights and travel insurance are the only things to arrange yourself.
        </p>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- VILLA & LOCATION */
function Villa() {
  return (
    <section className="br-page br-villa" data-screen-label="The villa & location">
      <div className="br-inner">
        <div className="br-section-head">
          <span className="br-eyebrow">Where you'll be</span>
          <h2 className="br-title">the villa &amp; <span className="script">the coast</span></h2>
        </div>
        <div className="br-villa-grid">
          <div className="br-villa-copy">
            <h3>An Lành villa, on Mỹ Khê beach</h3>
            <p>
              A calm, palm-shaded villa on the south coast of Vietnam — ocean-view rooms, a quiet
              pool, and the warm South China Sea a two-minute barefoot walk away. Mornings open
              on the sand; evenings close under the sea-almond tree.
            </p>
            <p>
              On day four we leave the coast for Hội An, an hour south — a UNESCO old town of
              lantern-lit streets, riverside lunches and slow wandering before an evening at leisure.
            </p>
            <div className="br-villa-facts">
              <div className="br-fact">
                <div className="label">The villa</div>
                <address>
                  Võ Nguyên Giáp, Mỹ An<br />
                  Quận Ngũ Hành Sơn<br />
                  Đà Nẵng, Vietnam
                </address>
              </div>
              <div className="br-fact">
                <div className="label">Getting there</div>
                <div className="value">20 min from Đà Nẵng International Airport</div>
              </div>
              <div className="br-fact">
                <div className="label">Day trip</div>
                <div className="value">Hội An old town · 1 hr south</div>
              </div>
              <div className="br-fact">
                <div className="label">The sea</div>
                <div className="value">Mỹ Khê beach · 2 min on foot</div>
              </div>
            </div>
          </div>
          <div className="br-villa-media">
            {GALLERY.map((g) => (
              <figure className={`shot ${g.cls}`} key={g.src}>
                <img src={g.src} alt={g.alt} loading="lazy" />
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- PRICING */
function Pricing() {
  return (
    <section className="br-page br-pricing" data-screen-label="Pricing">
      <div className="br-inner">
        <div className="br-section-head">
          <span className="br-eyebrow">A place in the circle</span>
          <h2 className="br-title">what a <span className="script">spot</span> costs</h2>
          <p className="br-lede">
            One all-in price for six nights — yoga, meals, rituals, the Hội An day trip and your
            airport transfers. Hold your place with a deposit; the balance follows closer to the date.
          </p>
        </div>

        <div className="br-price-card">
          <div className="br-price-main">
            <div className="br-price-big">19,500,000 ₫</div>
            <div className="br-price-sub">≈ $790 · 6 nights, all included · per yogi</div>
            <div className="br-price-line" />
            <div className="br-price-rows">
              <div className="br-price-row">
                <span className="k">To reserve your place</span>
                <span className="v">5,000,000 ₫ deposit</span>
              </div>
              <div className="br-price-row">
                <span className="k">Balance</span>
                <span className="v">due 30 days before</span>
              </div>
              <div className="br-price-row">
                <span className="k">The circle</span>
                <span className="v">12 yogis only</span>
              </div>
            </div>
          </div>
          <div className="br-price-aside">
            <h4>In your price</h4>
            <ul>
              <li>6 nights at the villa</li>
              <li>Twice-daily yoga &amp; rituals</li>
              <li>All meals &amp; teas</li>
              <li>Hội An day trip</li>
              <li>Airport transfers</li>
            </ul>
            <h4 style={{ marginTop: 18 }}>To arrange yourself</h4>
            <ul className="muted">
              <li>Flights to Đà Nẵng</li>
              <li>Travel insurance</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- CLOSING */
function Closing() {
  return (
    <section className="br-page br-closing" data-screen-label="How to reserve">
      <div className="br-inner">
        <span className="br-eyebrow">When you're ready</span>
        <h2 className="br-closing-title">
          come home to a softer <span className="script">version of yourself</span>
        </h2>
        <p>
          Twelve places, once this summer. Hold yours with a deposit and we'll send a soft note
          with everything you'll need to pack.
        </p>
        <div className="br-closing-actions">
          <a className="btn btn-primary" href="reserve.html?type=retreat">Apply for a spot <span className="arrow">→</span></a>
          <a className="btn btn-ghost-dark" href="index.html#retreat">Back to the studio</a>
        </div>
        <p className="br-contact">
          Questions before you commit? Write to us at <a href="mailto:hello@namasteyogis.co">hello@namasteyogis.co</a>
        </p>
        <div style={{ marginTop: 40 }}><LeafDivider /></div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- APP */
function App() {
  return (
    <React.Fragment>
      <ActionBar />
      <main className="brochure">
        <Cover />
        <Invitation />
        <DailyRhythm />
        <Included />
        <Villa />
        <Pricing />
        <Closing />
      </main>
      <Footer />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
