// Reservation flow for namasteyogis — handles both the seasonal retreat and the
// monthly workshops, driven by a query param: reserve.html?type=retreat
// or reserve.html?type=workshop&id=01
//
// Step 1: detail page (schedule, address, pictures, price) + reserve button
// Step 2: secure your place — name/email + payment choice
// Step 3: confirmation with the sea-almond tree

/* ============================================================= DATA */
const RETREAT = {
  kind: "retreat",
  eyebrow: "Featured retreat · summer edition",
  title: "Yoga Retreat",
  titleScript: "in Đà Nẵng",
  quote: "…to find yourself once again, and to find your inner strength.",
  blurb:
    "Seven slow days on the south coast of Vietnam — twice-daily yoga, sea baths at sunrise, " +
    "plant-forward meals and a small circle of twelve. Come home to a softer version of yourself.",
  facts: [
    { label: "When", value: "August 1 – 7, 2026" },
    { label: "Where", value: "An Lành villa · Mỹ Khê" },
    { label: "Circle", value: "12 yogis only" },
  ],
  address: ["Võ Nguyên Giáp, Mỹ An", "Quận Ngũ Hành Sơn", "Đà Nẵng, Vietnam"],
  travel: "20 min from Đà Nẵng International Airport · airport pick-up included.",
  price: "19,500,000 ₫",
  priceNote: "≈ $790 · 6 nights, all included",
  payNow: { value: "5,000,000 ₫", label: "deposit", note: "balance due 30 days before" },
  whenShort: "Aug 1 – 7, 2026",
  includes: [
    "6 nights · ocean-view villa",
    "Twice-daily yoga",
    "Plant-forward meals",
    "Sound bath & moon circle",
    "Sea bath rituals",
    "Hoi An day trip",
  ],
  gallery: [
    { src: "media/retreat-yogi-sunset.jpg", alt: "A yogi in a white dress, arms raised to the setting sun on the rocks", big: true },
    { src: "media/retreat-coconuts.jpg", alt: "Fresh coconuts with paper umbrellas and straws" },
    { src: "media/retreat-pool.jpg", alt: "A palm-fringed pool at the villa" },
    { src: "media/retreat-stones.jpg", alt: "An aquamarine and pearl necklace on soft linen" },
    { src: "media/retreat-buddha.jpg", alt: "A small Buddha statue with a pink oleander flower" },
  ],
  schedule: [
    { no: "01", date: "Fri · Aug 1", title: "Arrival & welcome circle",
      items: ["Afternoon check-in", "Sunset sea bath", "Opening dinner under the sea-almond tree"] },
    { no: "02", date: "Sat · Aug 2", title: "Slow mornings",
      items: ["Sunrise slow vinyasa", "Plant-forward brunch", "Candlelit yin & sound bath"] },
    { no: "03", date: "Sun · Aug 3", title: "Moon & water",
      items: ["Beach flow", "Free afternoon by the sea", "Moon circle + mineral bracelet ritual"] },
    { no: "04", date: "Mon · Aug 4", title: "Hoi An day trip",
      items: ["Lantern old town", "Riverside lunch", "Evening at leisure"] },
    { no: "05", date: "Tue · Aug 5", title: "Strength & spine",
      items: ["Mat pilates", "Yoga for spinal health", "Journaling & restorative evening"] },
    { no: "06", date: "Wed · Aug 6", title: "Stillness",
      items: ["Sunrise meditation", "Breath work", "Closing feast & gratitude circle"] },
    { no: "07", date: "Thu · Aug 7", title: "Soft departures",
      items: ["Gentle closing flow", "Slow breakfast", "Farewells & airport transfers"] },
  ],
};

const WORKSHOPS = {
  "01": {
    kind: "workshop",
    eyebrow: "Workshop · half-day intensive",
    title: "Open Hips,",
    titleScript: "Open Heart",
    quote: "What the hips hold, the breath can soften.",
    blurb:
      "A half-day hip-opening intensive — long-held postures, breath work and journaling for " +
      "what's stored in the body. Tea and slow conversation after.",
    facts: [
      { label: "When", value: "Sat · Apr 20, 2026" },
      { label: "Time", value: "14:00 – 18:00" },
      { label: "Circle", value: "8 – 12 yogis" },
    ],
    address: ["An Thượng 2, Mỹ An", "Quận Ngũ Hành Sơn", "Đà Nẵng, Vietnam"],
    travel: "At the studio — 2 min from Mỹ Khê beach. Free scooter parking out front.",
    price: "950,000 ₫",
    priceNote: "≈ $38 · mat & tea included",
    payNow: { value: "950,000 ₫", label: "full", note: "or pay at the studio" },
    whenShort: "Sat · Apr 20, 2026 · 14:00",
    includes: ["4-hour intensive", "Mat & props", "Tea & journaling", "Small circle of 12"],
    gallery: [
      { src: "media/ws-hips-journal.jpg", alt: "A blank journal resting on fanned palm leaves", big: true },
      { src: "media/ws-hips-tea.jpg", alt: "A pink glass cup of tea with white blossoms floating on top" },
    ],
    schedule: [
      { no: "·", date: "14:00", title: "Arrive & tea", items: ["Settle in, grounding breath"] },
      { no: "·", date: "14:30", title: "Long-held hip openers", items: ["Slow, supported, deep"] },
      { no: "·", date: "16:00", title: "Breath work & journaling", items: ["What the body stored"] },
      { no: "·", date: "17:15", title: "Closing tea", items: ["Slow conversation after"] },
    ],
  },
  "02": {
    kind: "workshop",
    eyebrow: "Workshop · ritual evening",
    title: "The",
    titleScript: "Moon Circle",
    quote: "Set down the old cycle. String the next one by hand.",
    blurb:
      "New-moon journaling, breath work and intention setting — followed by a mineral bracelet " +
      "ritual where you string your own stones for the cycle ahead.",
    facts: [
      { label: "When", value: "Thu · May 14, 2026" },
      { label: "Time", value: "18:30 – 22:00" },
      { label: "Circle", value: "8 – 12 yogis" },
    ],
    address: ["An Thượng 2, Mỹ An", "Quận Ngũ Hành Sơn", "Đà Nẵng, Vietnam"],
    travel: "At the studio — 2 min from Mỹ Khê beach. Free scooter parking out front.",
    price: "1,200,000 ₫",
    priceNote: "≈ $48 · all materials included",
    payNow: { value: "1,200,000 ₫", label: "full", note: "or pay at the studio" },
    whenShort: "Thu · May 14, 2026 · 18:30",
    includes: ["New-moon journaling", "Breath work", "Mineral bracelet kit", "Herbal tea"],
    gallery: [
      { src: "media/ws-moon-bracelet.jpg", alt: "An amethyst bracelet, palo santo and scattered stones on white linen", big: true },
      { src: "media/ws-moon-crescent.jpg", alt: "A slim crescent moon in a dusky pink and violet sky" },
    ],
    schedule: [
      { no: "·", date: "18:30", title: "Arrive & ground", items: ["Candlelight, settling breath"] },
      { no: "·", date: "19:00", title: "New-moon journaling", items: ["Intention setting"] },
      { no: "·", date: "20:00", title: "Breath work", items: ["Soft, guided"] },
      { no: "·", date: "20:45", title: "Bracelet ritual", items: ["String your own stones"] },
    ],
  },
  "03": {
    kind: "workshop",
    eyebrow: "Workshop · sound healing",
    title: "Sunday Slow",
    titleScript: "Sound Bath",
    quote: "Land in the new week soft.",
    blurb:
      "Candlelit yin held by crystal bowls and chimes. Ninety minutes of stillness, sound and a " +
      "long savasana to land in the new week soft.",
    facts: [
      { label: "When", value: "Sun · Jun 2, 2026" },
      { label: "Time", value: "17:00 – 18:30" },
      { label: "Circle", value: "8 – 12 yogis" },
    ],
    address: ["An Thượng 2, Mỹ An", "Quận Ngũ Hành Sơn", "Đà Nẵng, Vietnam"],
    travel: "At the studio — 2 min from Mỹ Khê beach. Free scooter parking out front.",
    price: "650,000 ₫",
    priceNote: "≈ $26 · bolsters & blankets provided",
    payNow: { value: "650,000 ₫", label: "full", note: "or pay at the studio" },
    whenShort: "Sun · Jun 2, 2026 · 17:00",
    includes: ["90 min candlelit yin", "Crystal bowls & chimes", "Long savasana", "Bolsters & blankets"],
    gallery: [
      { src: "media/ws-sound-bowl.jpg", alt: "A flower-of-life singing bowl with mallet and pink blossoms on white linen", big: true },
      { src: "media/ws-sound-candles.jpg", alt: "Dozens of small oil lamps glowing warm in the dark" },
    ],
    schedule: [
      { no: "·", date: "17:00", title: "Settle in", items: ["Candlelight, supported shapes"] },
      { no: "·", date: "17:15", title: "Candlelit yin", items: ["Slow, held postures"] },
      { no: "·", date: "18:00", title: "Sound bath", items: ["Crystal bowls & chimes"] },
      { no: "·", date: "18:20", title: "Long savasana", items: ["Rest, then rise soft"] },
    ],
  },
};

function getReservation() {
  const params = new URLSearchParams(window.location.search);
  const type = params.get("type");
  if (type === "workshop") {
    const id = params.get("id");
    return WORKSHOPS[id] || WORKSHOPS["01"];
  }
  return RETREAT;
}

/* ============================================================= STEP INDICATOR */
function StepIndicator({ step, data }) {
  const steps = [
    { id: "detail", label: data.kind === "retreat" ? "The retreat" : "The workshop" },
    { id: "secure", label: "Secure your place" },
    { id: "done", label: "Reserved" },
  ];
  const currentIdx = steps.findIndex((s) => s.id === step);
  return (
    <ol className="step-indicator" aria-label="Reservation progress">
      {steps.map((s, i) => {
        const status = i < currentIdx ? "past" : i === currentIdx ? "active" : "upcoming";
        return (
          <li key={s.id} className={`step ${status}`}>
            <span className="step-num">{String(i + 1).padStart(2, "0")}</span>
            <span className="step-label">{s.label}</span>
          </li>
        );
      })}
    </ol>
  );
}

/* ============================================================= LOADING LOTUS */
function LoadingBlossom({ text = "Holding your place…" }) {
  return (
    <div className="booking-loading" role="status" aria-live="polite">
      <svg viewBox="0 0 60 60" className="lotus-spinner" aria-hidden="true">
        <g fill="#f0cdd5" stroke="#7a2d44" strokeWidth="1.5" strokeLinejoin="round">
          <ellipse cx="30" cy="14" rx="4" ry="11" />
          <ellipse cx="30" cy="14" rx="4" ry="11" transform="rotate(60 30 30)" />
          <ellipse cx="30" cy="14" rx="4" ry="11" transform="rotate(120 30 30)" />
          <ellipse cx="30" cy="14" rx="4" ry="11" transform="rotate(180 30 30)" />
          <ellipse cx="30" cy="14" rx="4" ry="11" transform="rotate(240 30 30)" />
          <ellipse cx="30" cy="14" rx="4" ry="11" transform="rotate(300 30 30)" />
        </g>
        <circle cx="30" cy="30" r="4" fill="#7a2d44" />
      </svg>
      <p>{text}</p>
    </div>
  );
}

/* ============================================================= GALLERY */
function Gallery({ images }) {
  return (
    <div className={`res-gallery ${images.length <= 2 ? "duo" : ""}`}>
      {images.map((img, i) => (
        <figure key={img.src} className={`res-shot ${img.big ? "big" : ""}`}>
          <img src={img.src} alt={img.alt} loading={i > 1 ? "lazy" : "eager"} />
        </figure>
      ))}
    </div>
  );
}

/* ============================================================= SCHEDULE */
function Schedule({ data }) {
  const isRetreat = data.kind === "retreat";
  return (
    <div className="res-schedule">
      <span className="eyebrow">{isRetreat ? "Day by day" : "How the time flows"}</span>
      <h2 className="res-sub-title">
        {isRetreat ? (
          <React.Fragment>seven <em className="script">slow days</em></React.Fragment>
        ) : (
          <React.Fragment>the <em className="script">flow</em></React.Fragment>
        )}
      </h2>
      <ol className="res-timeline">
        {data.schedule.map((d, i) => (
          <li key={i} className="res-day">
            <div className="res-day-mark">
              <span className="res-day-no">{d.no}</span>
              <span className="res-day-date">{d.date}</span>
            </div>
            <div className="res-day-body">
              <h3>{d.title}</h3>
              <ul>
                {d.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ============================================================= INFO + PRICE CARD */
function InfoCard({ data, onReserve }) {
  return (
    <aside className="res-aside">
      <div className="res-card">
        <dl className="res-facts">
          {data.facts.map((f) => (
            <div className="res-fact" key={f.label}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>

        <div className="res-includes">
          <span className="res-includes-label">Included</span>
          <div className="res-chips">
            {data.includes.map((it) => (
              <span className="chip" key={it}>
                <span className="dot" />
                {it}
              </span>
            ))}
          </div>
        </div>

        <div className="res-price-row">
          <div>
            <div className="res-price">{data.price}</div>
            <div className="res-price-note">{data.priceNote}</div>
          </div>
        </div>

        <button className="btn btn-primary res-reserve" onClick={onReserve}>
          Reserve your place <span className="arrow">→</span>
        </button>
        <p className="res-reserve-note">
          Hold your place with a {data.payNow.label === "deposit" ? "deposit" : "quick reservation"} —
          {" "}{data.payNow.note}.
        </p>
      </div>

      <div className="res-address">
        <span className="res-includes-label">Where to find us</span>
        <address>
          {data.address.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </address>
        <p className="res-travel">{data.travel}</p>
      </div>
    </aside>
  );
}

/* ============================================================= STEP 1 — DETAIL */
function Detail({ data, onReserve }) {
  return (
    <div className="booking-step res-detail">
      <header className="booking-header res-detail-header">
        <span className="eyebrow">{data.eyebrow}</span>
        <h1 className="section-title">
          {data.title} <em className="script">{data.titleScript}</em>
        </h1>
        <p className="res-quote">"{data.quote}"</p>
        <p className="lede">{data.blurb}</p>
      </header>

      <Gallery images={data.gallery} />

      <div className="res-body">
        <Schedule data={data} />
        <InfoCard data={data} onReserve={onReserve} />
      </div>
    </div>
  );
}

/* ============================================================= STEP 2 — SECURE */
function SecurePlace({ data, onConfirm, onBack }) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const ready = name.trim().length > 1 && email.includes("@");
  const isDeposit = data.payNow.label === "deposit";

  const pay = (method) => {
    if (!ready) return;
    onConfirm({ name: name.trim(), email: email.trim() }, method);
  };

  return (
    <div className="booking-step pay">
      <header className="booking-header">
        <span className="eyebrow">One more step</span>
        <h1 className="section-title">
          secure your <em className="script">place</em>
        </h1>
        <p className="lede">
          <strong>{data.title} {data.titleScript}</strong> · {data.whenShort} · {data.price}
        </p>
      </header>

      <form className="res-form" onSubmit={(e) => e.preventDefault()}>
        <label className="res-field">
          <span>Your name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="first name"
            autoComplete="given-name"
          />
        </label>
        <label className="res-field">
          <span>Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@dreamscape.com"
            autoComplete="email"
          />
        </label>
      </form>

      <div className={`payment-options ${ready ? "" : "locked"}`}>
        <button className="payment-card" onClick={() => pay("card")} disabled={!ready}>
          <span className="pc-tag">{isDeposit ? "Pay deposit now" : "Pay now"}</span>
          <h3>Card</h3>
          <p>
            {isDeposit
              ? `Secure your spot with a ${data.payNow.value} deposit — Visa, Mastercard, Amex. The balance is due 30 days before we gather.`
              : "Visa, Mastercard, Amex. Instant confirmation by email, and a free beverage waiting at the studio."}
          </p>
          <span className="pc-cta">
            {isDeposit ? `Pay ${data.payNow.value} deposit` : "Continue with card"} <span className="arrow">→</span>
          </span>
        </button>

        <button className="payment-card" onClick={() => pay("hold")} disabled={!ready}>
          <span className="pc-tag">{isDeposit ? "Hold my place" : "Pay at the studio"}</span>
          <h3>{isDeposit ? "Reserve" : "Cash"}</h3>
          <p>
            {isDeposit
              ? "We'll hold your spot for 48 hours and send a soft note with payment details and everything you'll need to pack."
              : "Pay in person when you arrive — Vietnamese đồng or US dollars both work. Just bring a friendly hello."}
          </p>
          <span className="pc-cta">
            {isDeposit ? "Hold my place" : "Continue with cash"} <span className="arrow">→</span>
          </span>
        </button>
      </div>

      {!ready && <p className="res-form-hint">Add your name and email to continue.</p>}

      <button className="booking-back" onClick={onBack}>
        ← Back to the details
      </button>
    </div>
  );
}

/* ============================================================= STEP 3 — DONE */
function Confirmation({ data, form, payment, code }) {
  const isDeposit = data.payNow.label === "deposit";
  let payValue;
  if (payment === "card") {
    payValue = isDeposit ? `Card · ${data.payNow.value} deposit paid` : `Card · ${data.price} paid in full`;
  } else {
    payValue = isDeposit ? "Place held · 48 hours" : "Cash · at the studio";
  }

  return (
    <div className="booking-step done">
      <div className="confirm-illo">
        <SeaAlmondTree />
      </div>

      <header className="booking-header confirm-header">
        <span className="script-thanks">Thank you, {form.name} ✿</span>
        <h1 className="section-title">
          your place is <em className="script">reserved</em>
        </h1>
        <p className="lede">
          {data.kind === "retreat"
            ? "Seven slow days are yours. We'll see you on the coast — under the sea-almond tree, mats already rolled out."
            : "We've saved you a spot in the circle. We'll see you on the deck — under the sea-almond tree."}
        </p>
      </header>

      <div className="confirmation-card">
        <div className="conf-row">
          <span className="conf-label">{data.kind === "retreat" ? "Retreat" : "Workshop"}</span>
          <span className="conf-value">{data.title} {data.titleScript}</span>
        </div>
        <div className="conf-row">
          <span className="conf-label">When</span>
          <span className="conf-value">{data.whenShort}</span>
        </div>
        <div className="conf-row">
          <span className="conf-label">Confirmation to</span>
          <span className="conf-value">{form.email}</span>
        </div>
        <div className="conf-row">
          <span className="conf-label">Payment</span>
          <span className="conf-value">{payValue}</span>
        </div>
        <div className="conf-row">
          <span className="conf-label">Confirmation</span>
          <span className="conf-value mono">#NMS-{code}</span>
        </div>
      </div>

      <p className="conf-note">
        A note with the address, what to pack, and a soft reminder will arrive in your inbox
        within a slow morning.
      </p>

      <div className="conf-actions">
        <a href="index.html" className="btn btn-ghost-dark">← Back to home</a>
        <a href="index.html#retreat" className="btn btn-primary">See more from the studio</a>
      </div>
    </div>
  );
}

/* ============================================================= SEA-ALMOND TREE */
function SeaAlmondTree() {
  return (
    <svg viewBox="0 0 360 420" className="sea-almond-tree" role="img" aria-label="A sea-almond tree, the studio's landmark">
      <line x1="40" y1="380" x2="320" y2="380" stroke="#7a2d44" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <ellipse cx="180" cy="384" rx="110" ry="6" fill="#3d5e3a" opacity="0.18" />
      <path d="M 180 380 q -4 -90 1 -180 q -3 -90 4 -180" stroke="#7a2d44" strokeWidth="6" fill="none" strokeLinecap="round" />
      <g stroke="#7a2d44" strokeWidth="2.6" fill="none" strokeLinecap="round">
        <path d="M 178 295 q -38 -10 -78 -8" />
        <path d="M 182 300 q 38 -12 78 -10" />
        <path d="M 180 205 q -30 -8 -56 -2" />
        <path d="M 180 210 q 30 -10 56 -4" />
        <path d="M 180 120 q -22 -4 -38 -2" />
        <path d="M 180 115 q 22 -4 38 -2" />
      </g>
      <g stroke="#3d5e3a" strokeWidth="1.3" strokeLinejoin="round" strokeLinecap="round">
        <g fill="#7d9b7a">
          <ellipse cx="90" cy="290" rx="24" ry="15" />
          <ellipse cx="78" cy="298" rx="14" ry="9" />
          <ellipse cx="102" cy="282" rx="16" ry="10" />
        </g>
        <g fill="#7d9b7a">
          <ellipse cx="278" cy="290" rx="24" ry="15" />
          <ellipse cx="290" cy="298" rx="14" ry="9" />
          <ellipse cx="266" cy="282" rx="16" ry="10" />
        </g>
        <g fill="#7d9b7a">
          <ellipse cx="114" cy="202" rx="18" ry="12" />
          <ellipse cx="104" cy="210" rx="11" ry="8" />
        </g>
        <g fill="#7d9b7a">
          <ellipse cx="248" cy="202" rx="18" ry="12" />
          <ellipse cx="258" cy="210" rx="11" ry="8" />
        </g>
        <g fill="#7d9b7a">
          <ellipse cx="132" cy="112" rx="14" ry="9" />
        </g>
        <g fill="#7d9b7a">
          <ellipse cx="228" cy="112" rx="14" ry="9" />
        </g>
        <g fill="#7d9b7a">
          <ellipse cx="180" cy="56" rx="30" ry="18" />
          <ellipse cx="160" cy="62" rx="12" ry="8" />
          <ellipse cx="200" cy="62" rx="12" ry="8" />
        </g>
      </g>
      <g fill="#d89bab" stroke="#7a2d44" strokeWidth="0.6" opacity="0.75">
        <ellipse cx="98" cy="288" rx="8" ry="4" transform="rotate(25 98 288)" />
        <ellipse cx="266" cy="207" rx="7" ry="4" transform="rotate(-20 266 207)" />
        <ellipse cx="200" cy="48" rx="8" ry="4" transform="rotate(35 200 48)" />
      </g>
      <g fill="#d89bab" stroke="#7a2d44" strokeWidth="0.8" opacity="0.75">
        <ellipse cx="100" cy="388" rx="6" ry="3" transform="rotate(20 100 388)" />
        <ellipse cx="240" cy="386" rx="7" ry="3" transform="rotate(-30 240 386)" />
        <ellipse cx="172" cy="389" rx="6" ry="3" transform="rotate(8 172 389)" />
        <ellipse cx="285" cy="389" rx="5" ry="3" transform="rotate(-12 285 389)" />
        <ellipse cx="62" cy="386" rx="5" ry="3" transform="rotate(36 62 386)" />
      </g>
    </svg>
  );
}

/* ============================================================= CONTROLLER */
function ReserveFlow() {
  const [data] = React.useState(getReservation);
  const [step, setStep] = React.useState("detail");
  const [form, setForm] = React.useState(null);
  const [payment, setPayment] = React.useState(null);
  const [transitioning, setTransitioning] = React.useState(false);
  const [code] = React.useState(() => String(Math.floor(Math.random() * 90000) + 10000));

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const goToSecure = () => {
    setTransitioning(true);
    setTimeout(() => {
      setStep("secure");
      setTransitioning(false);
    }, 850);
  };

  const complete = (formData, method) => {
    setForm(formData);
    setPayment(method);
    setTransitioning(true);
    setTimeout(() => {
      setStep("done");
      setTransitioning(false);
    }, 1100);
  };

  return (
    <main className="booking reserve">
      <div className="wrap">
        <StepIndicator step={step} data={data} />

        <div className={`booking-stage ${transitioning ? "transitioning" : ""}`}>
          {transitioning && (
            <LoadingBlossom
              text={step === "detail" ? "Opening your reservation…" : "Holding your place…"}
            />
          )}

          {!transitioning && step === "detail" && <Detail data={data} onReserve={goToSecure} />}
          {!transitioning && step === "secure" && (
            <SecurePlace data={data} onConfirm={complete} onBack={() => setStep("detail")} />
          )}
          {!transitioning && step === "done" && (
            <Confirmation data={data} form={form} payment={payment} code={code} />
          )}
        </div>
      </div>
    </main>
  );
}

function App() {
  return (
    <React.Fragment>
      <Nav />
      <ReserveFlow />
      <Footer />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
