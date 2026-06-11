// Multi-step booking flow for namasteyogis.
// Step 1: pick a class from the timetable
// Step 2: choose payment (card now / cash at studio)
// Step 3: confirmation with sea-almond tree illustration

const STEPS = [
  { id: "pick", label: "Pick a class" },
  { id: "pay",  label: "Payment" },
  { id: "done", label: "Confirmed" },
];

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const DAYS = [...WEEKDAYS, "Sat", "Sun"];

const WEEKDAY_CLASSES = [
  { time: "07:00 – 08:30", name: "slow vinyasa",               tag: "flow" },
  { time: "09:00 – 10:30", name: "mat pilates",                tag: "strength" },
  { time: "17:00 – 18:30", name: "yoga for spinal health",     tag: "therapy" },
  { time: "19:00 – 21:00", name: "candlelit yin & meditation", tag: "stillness" },
];

const WEEKEND_CLASSES = {
  Sat: [
    { time: "07:00 – 08:30", name: "morning meditation",   tag: "stillness" },
    { time: "09:00 – 10:30", name: "morning meditation",   tag: "stillness" },
  ],
  Sun: [
    { time: "17:00 – 18:30", name: "Sunday breath work",   tag: "breath" },
    { time: "19:00 – 21:00", name: "Sunday breath work",   tag: "breath" },
  ],
};

const ALL_TIMES = Array.from(
  new Set([
    ...WEEKDAY_CLASSES.map(c => c.time),
    ...Object.values(WEEKEND_CLASSES).flat().map(c => c.time),
  ])
).sort();

const CLASS_PRICE = "350,000 ₫";

function getClass(day, time) {
  if (WEEKDAYS.includes(day)) return WEEKDAY_CLASSES.find(c => c.time === time);
  return (WEEKEND_CLASSES[day] || []).find(c => c.time === time);
}

// If the visitor clicked a specific class in the landing-page timetable, that
// class arrives as URL params — pre-select it so they land ready to reserve.
function getPreselected() {
  const p = new URLSearchParams(window.location.search);
  const day = p.get("day");
  const time = p.get("time");
  if (!day || !time) return null;
  const cls = getClass(day, time);
  if (!cls) return null;
  return { day, time: cls.time, name: cls.name, tag: cls.tag };
}

/* ============== Step indicator ============== */
function StepIndicator({ step }) {
  const currentIdx = STEPS.findIndex(s => s.id === step);
  return (
    <ol className="step-indicator" aria-label="Booking progress">
      {STEPS.map((s, i) => {
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

/* ============== Loading lotus ============== */
function LoadingBlossom({ text = "Preparing your mat…" }) {
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

/* ============== Step 1 — pick a class ============== */
function PickClass({ selected, onSelect, onConfirm }) {
  const isSelected = (day, time, cls) =>
    selected && selected.day === day && selected.time === time && selected.name === cls.name;

  return (
    <div className="booking-step pick">
      <header className="booking-header">
        <span className="eyebrow">Reserve your mat</span>
        <h1 className="section-title">pick a <em className="script">class</em></h1>
        <p className="lede">
          Tap any class — you'll see it light up. Drop-in classes are {CLASS_PRICE}
          (about $14) and include a free hot or cold beverage afterwards.
        </p>
      </header>

      <div className="timetable-card booking-timetable">
        <div className="timetable-grid" role="table" aria-label="Weekly class schedule">
          <div className="tt-cell tt-corner"><span className="tt-corner-label">time</span></div>
          {DAYS.map(d => (
            <div key={d} className="tt-cell tt-day">{d}</div>
          ))}

          {ALL_TIMES.map(time => (
            <React.Fragment key={time}>
              <div className="tt-cell tt-time">{time}</div>
              {DAYS.map(day => {
                const cls = getClass(day, time);
                const sel = cls && isSelected(day, time, cls);
                return (
                  <div
                    key={day + time}
                    className={`tt-cell tt-slot ${cls ? "filled" : "empty"} ${sel ? "selected" : ""}`}
                    onClick={() => cls && onSelect({ day, time, name: cls.name, tag: cls.tag })}
                    role={cls ? "button" : undefined}
                    tabIndex={cls ? 0 : undefined}
                    onKeyDown={(e) => cls && (e.key === "Enter" || e.key === " ") &&
                      onSelect({ day, time, name: cls.name, tag: cls.tag })}
                  >
                    {cls && (
                      <React.Fragment>
                        <span className="tt-class">{cls.name}</span>
                        <span className="tt-tag">{cls.tag}</span>
                      </React.Fragment>
                    )}
                    {!cls && <span className="tt-rest">·</span>}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className={`booking-selection ${selected ? "visible" : ""}`}>
        {selected && (
          <React.Fragment>
            <div className="selection-detail">
              <span className="selection-tag">Selected</span>
              <div className="selection-class">
                <strong>{selected.name}</strong> · {selected.day} · {selected.time}
              </div>
            </div>
            <div className="selection-action">
              <span className="selection-price">{CLASS_PRICE}</span>
              <button className="btn btn-primary" onClick={onConfirm}>
                Reserve my spot <span className="arrow">→</span>
              </button>
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

/* ============== Step 2 — payment choice ============== */
function PaymentChoice({ selected, onPay, onBack }) {
  return (
    <div className="booking-step pay">
      <header className="booking-header">
        <span className="eyebrow">One more step</span>
        <h1 className="section-title">how would you <em className="script">like to pay</em>?</h1>
        <p className="lede">
          <strong>{selected.name}</strong> · {selected.day} · {selected.time} · {CLASS_PRICE}
        </p>
      </header>

      <div className="payment-options">
        <button className="payment-card" onClick={() => onPay("card")}>
          <span className="pc-tag">Pay now</span>
          <h3>Card</h3>
          <p>Visa, Mastercard, Amex. Secure, instant confirmation by email — and a free
          beverage waiting for you at the studio.</p>
          <span className="pc-cta">Continue with card <span className="arrow">→</span></span>
        </button>

        <button className="payment-card" onClick={() => onPay("cash")}>
          <span className="pc-tag">Pay at the studio</span>
          <h3>Cash</h3>
          <p>Pay in person when you arrive — Vietnamese đồng or US dollars both work.
          Just bring a friendly hello.</p>
          <span className="pc-cta">Continue with cash <span className="arrow">→</span></span>
        </button>
      </div>

      <button className="booking-back" onClick={onBack}>
        ← Pick a different class
      </button>
    </div>
  );
}

/* ============== Step 3 — confirmation ============== */
function Confirmation({ selected, payment, confirmationCode }) {
  return (
    <div className="booking-step done">
      <div className="confirm-illo">
        <SeaAlmondTree />
      </div>

      <header className="booking-header confirm-header">
        <span className="script-thanks">Thank you ✿</span>
        <h1 className="section-title">your mat is <em className="script">reserved</em></h1>
        <p className="lede">
          We'll see you on the deck — under the sea-almond tree, mats already rolled out.
        </p>
      </header>

      <div className="confirmation-card">
        <div className="conf-row">
          <span className="conf-label">Class</span>
          <span className="conf-value">{selected.name}</span>
        </div>
        <div className="conf-row">
          <span className="conf-label">When</span>
          <span className="conf-value">{selected.day} · {selected.time}</span>
        </div>
        <div className="conf-row">
          <span className="conf-label">Payment</span>
          <span className="conf-value">
            {payment === "card" ? "Card · paid in full" : "Cash · at the studio"}
          </span>
        </div>
        <div className="conf-row">
          <span className="conf-label">Confirmation</span>
          <span className="conf-value mono">#NMS-{confirmationCode}</span>
        </div>
      </div>

      <p className="conf-note">
        A note with the studio's address and a soft reminder will arrive in your inbox
        within a slow morning.
      </p>

      <div className="conf-actions">
        <a href="index.html" className="btn btn-ghost-dark">← Back to home</a>
        <a href="book.html" className="btn btn-primary">Book another class</a>
      </div>
    </div>
  );
}

/* ============== Sea-almond tree illustration ============== */
function SeaAlmondTree() {
  return (
    <svg viewBox="0 0 360 420" className="sea-almond-tree" role="img" aria-label="A sea-almond tree, the studio's landmark">
      {/* ground line */}
      <line x1="40" y1="380" x2="320" y2="380" stroke="#7a2d44" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />

      {/* shadow */}
      <ellipse cx="180" cy="384" rx="110" ry="6" fill="#3d5e3a" opacity="0.18" />

      {/* trunk — slightly imperfect curve */}
      <path d="M 180 380 q -4 -90 1 -180 q -3 -90 4 -180"
            stroke="#7a2d44" strokeWidth="6" fill="none" strokeLinecap="round" />

      {/* branches — three tiers */}
      <g stroke="#7a2d44" strokeWidth="2.6" fill="none" strokeLinecap="round">
        <path d="M 178 295 q -38 -10 -78 -8" />
        <path d="M 182 300 q 38 -12 78 -10" />
        <path d="M 180 205 q -30 -8 -56 -2" />
        <path d="M 180 210 q 30 -10 56 -4" />
        <path d="M 180 120 q -22 -4 -38 -2" />
        <path d="M 180 115 q 22 -4 38 -2" />
      </g>

      {/* leaf clusters */}
      <g stroke="#3d5e3a" strokeWidth="1.3" strokeLinejoin="round" strokeLinecap="round">
        {/* lower tier */}
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
        {/* mid tier */}
        <g fill="#7d9b7a">
          <ellipse cx="114" cy="202" rx="18" ry="12" />
          <ellipse cx="104" cy="210" rx="11" ry="8" />
        </g>
        <g fill="#7d9b7a">
          <ellipse cx="248" cy="202" rx="18" ry="12" />
          <ellipse cx="258" cy="210" rx="11" ry="8" />
        </g>
        {/* upper tier */}
        <g fill="#7d9b7a">
          <ellipse cx="132" cy="112" rx="14" ry="9" />
        </g>
        <g fill="#7d9b7a">
          <ellipse cx="228" cy="112" rx="14" ry="9" />
        </g>
        {/* crown */}
        <g fill="#7d9b7a">
          <ellipse cx="180" cy="56" rx="30" ry="18" />
          <ellipse cx="160" cy="62" rx="12" ry="8" />
          <ellipse cx="200" cy="62" rx="12" ry="8" />
        </g>
      </g>

      {/* a few autumn-pink leaves scattered in the canopy */}
      <g fill="#d89bab" stroke="#7a2d44" strokeWidth="0.6" opacity="0.75">
        <ellipse cx="98" cy="288" rx="8" ry="4" transform="rotate(25 98 288)" />
        <ellipse cx="266" cy="207" rx="7" ry="4" transform="rotate(-20 266 207)" />
        <ellipse cx="200" cy="48" rx="8" ry="4" transform="rotate(35 200 48)" />
      </g>

      {/* fallen leaves on the ground */}
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

/* ============== Booking flow controller ============== */
function BookingFlow() {
  const [step, setStep] = React.useState("pick");
  const [selected, setSelected] = React.useState(getPreselected);
  const [payment, setPayment] = React.useState(null);
  const [transitioning, setTransitioning] = React.useState(false);
  const [confirmationCode] = React.useState(() =>
    String(Math.floor(Math.random() * 90000) + 10000)
  );
  const firstRun = React.useRef(true);

  // scroll up when step changes so the user lands at the top of the new step.
  // exception: if they arrived with a class already chosen from the timetable,
  // glide down to the reserve bar instead so the next action is right there.
  React.useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      if (selected) {
        const t = setTimeout(() => {
          const bar = document.querySelector(".booking-selection");
          if (bar) {
            const y = bar.getBoundingClientRect().top + window.scrollY - 150;
            window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
          }
        }, 500);
        return () => clearTimeout(t);
      }
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const goToPayment = () => {
    setTransitioning(true);
    setTimeout(() => {
      setStep("pay");
      setTransitioning(false);
    }, 900);
  };

  const completeBooking = (method) => {
    setPayment(method);
    setTransitioning(true);
    setTimeout(() => {
      setStep("done");
      setTransitioning(false);
    }, 1100);
  };

  const backToPick = () => setStep("pick");

  return (
    <main className="booking">
      <div className="wrap">
        <StepIndicator step={transitioning ? step : step} />

        <div className={`booking-stage ${transitioning ? "transitioning" : ""}`}>
          {transitioning && (
            <LoadingBlossom
              text={step === "pick" ? "Preparing your reservation…" : "Reserving your mat…"}
            />
          )}

          {!transitioning && step === "pick" && (
            <PickClass selected={selected} onSelect={setSelected} onConfirm={goToPayment} />
          )}
          {!transitioning && step === "pay" && (
            <PaymentChoice selected={selected} onPay={completeBooking} onBack={backToPick} />
          )}
          {!transitioning && step === "done" && (
            <Confirmation selected={selected} payment={payment} confirmationCode={confirmationCode} />
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
      <BookingFlow />
      <Footer />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
