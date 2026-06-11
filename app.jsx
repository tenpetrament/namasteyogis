// namasteyogis — landing page

const { useState, useEffect } = React;

// Resource resolver — in the standalone/bundled build, window.__resources[id]
// holds an inlined blob URL; in dev it's undefined so we fall back to the path.
const R = (id, path) => (window.__resources && window.__resources[id]) || path;

/* ============== Hero ============== */
function HeroMedia() {
  const [active, setActive] = useState(0);
  const [blobUrls, setBlobUrls] = useState([null, null]);
  // In the standalone build only the resources actually inlined are used
  // (one hero clip, to keep the file small); in dev both clips crossfade.
  const sources = window.__resources
    ? [window.__resources.hero1, window.__resources.hero2].filter(Boolean)
    : ["media/hero-1.mp4", "media/hero-2.mp4"];

  // Fetch as blob and create object URLs (works around missing Content-Length / Range headers
  // on the dev sandbox that prevents <video src=...> from playing directly).
  useEffect(() => {
    let cancelled = false;
    const urls = [];
    Promise.all(
      sources.map(async (s) => {
        const r = await fetch(s);
        const blob = await r.blob();
        return URL.createObjectURL(blob);
      })
    ).then((results) => {
      if (cancelled) {
        results.forEach((u) => URL.revokeObjectURL(u));
        return;
      }
      urls.push(...results);
      setBlobUrls(results);
    });
    return () => {
      cancelled = true;
      urls.forEach((u) => URL.revokeObjectURL(u));
    };
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((a) => (a + 1) % sources.length);
    }, 9000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="hero-media">
      {sources.map((_, i) =>
      <video
        key={i}
        src={blobUrls[i] || undefined}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className={i === active ? "active" : ""}
        aria-hidden="true" />

      )}
    </div>);

}

function Hero({ variant }) {
  return (
    <header className="hero" id="top" data-screen-label="01 Hero">
      <HeroMedia />
      <div className="hero-vignette" />
      <div className="motif motif-leaf-1" />

      <div className="hero-inner">
        <div className="hero-text">
          <span className="hero-eyebrow">Yoga · Wellness · Da Nang, Vietnam</span>
          <h1>
            {variant.line}
            <span className="script">{variant.script}</span>
          </h1>
          <p className="hero-sub">
            A creative yoga studio on the south coast of Vietnam — slow mornings, salt air,
            and seasonal retreats for the girls remembering how to rest.
          </p>
          <div className="hero-actions">
            <a href="reserve.html?type=retreat" className="btn btn-primary">
              Reserve a Retreat <span className="arrow">→</span>
            </a>
            <a href="#offerings" className="btn btn-ghost">See the schedule</a>
          </div>
        </div>
        <div className="hero-meta">
          <div className="hero-card">
            <div className="label">Next Retreat</div>
            <div className="value">August 1 – 7, 2026 · Da Nang</div>
          </div>
          <div className="hero-card">
            <div className="label">Studio Hours</div>
            <div className="value">Open every day · until 9pm</div>
          </div>
        </div>
      </div>

      <div className="hero-scroll">
        <span>scroll to breathe</span>
        <span className="line" />
      </div>
    </header>);

}

/* ============== Marquee ============== */
function Marquee() {
  const items = [
  "slow vinyasa", "slow flow", "candlelit yin", "mat pilates", "spinal health",
  "saturday meditation", "sunday breath work", "moon circle", "sea baths", "barefoot mornings"];

  const Row = () =>
  <span>
      {items.map((it, i) =>
    <React.Fragment key={i}>
          <span style={{ color: "rgb(128, 54, 75)" }}>{it}</span>
          <span className="dot" style={{ backgroundColor: "rgb(38, 75, 38)" }} />
        </React.Fragment>
    )}
    </span>;

  return (
    <div className="marquee" aria-hidden="true" style={{ backgroundColor: "rgb(240, 205, 213)" }}>
      <div className="marquee-track"><Row /><Row /><Row /></div>
    </div>);

}

/* ============== Intro ============== */
function Intro() {
  return (
    <section className="intro" id="about" data-screen-label="02 About">
      <div className="wrap">
        <div className="intro-grid">
          <div className="intro-text reveal">
            <span className="eyebrow">Our story</span>
            <span className="script-hi" style={{ color: "rgb(38, 75, 38)" }}>Hello,</span>
            <h2>we are <span className="wm">namasteyogis</span></h2>
            <p>
              We are a small, creative yoga brand rooted in the wellness space — a sunlit
              studio tucked into the palms of Da Nang, where the days move at the pace of
              the tide. We run weekly classes, slow workshops, and seasonal retreats
              every three months.
            </p>
            <p>
              We promise a kind, peaceful community — somewhere to meet a future friend,
              to be authentic and reliable, creative and joyful. Pull up a mat.
            </p>
            <div className="intro-signature">with love, from Đà Nẵng</div>
          </div>

          <div className="collage reveal" aria-hidden="true">
            <div className="tape t1" />
            <div className="tape t2" />
            <div className="frame f1"><img src={R("introStudio", "media/intro-studio.jpg")} alt="Open-air yoga studio with palm trees and ocean view" /></div>
            <div className="frame f2"><img src={R("introBeach", "media/intro-beach.jpg")} alt="Yogi in dancer pose on the beach" /></div>
            <div className="frame f3"><img src={R("introBowl", "media/intro-bowl.jpg")} alt="Three smoothie bowls with berries, kiwi and granola" /></div>
            <span className="sticker s1">breathe in,</span>
            <span className="sticker s2">breathe out.</span>
          </div>
        </div>
      </div>
    </section>);

}

/* ============== Offerings ============== */
function Offerings() {
  const cards = [
  { no: "01 — Classes", title: "Daily flow & stillness", desc: "Slow vinyasa, slow flow, candlelit yin, mat pilates, yoga for spinal health, Saturday meditation and Sunday breath work. Walk-ins welcome; drop a mat and stay a while.", meta: "From 350,000 ₫", target: "#schedule" },
  { no: "02 — Workshops", title: "Half-day deep dives", desc: "Themed afternoons and evenings — hip openers, moon circles with mineral bracelet making, slow sound baths. Built for the curious and the in-between.", meta: "Monthly", target: "#workshops" },
  { no: "03 — Retreats", title: "Seasonal slow weeks", desc: "Four times a year, we gather a small circle of yogis on the coast for seven slow days of asana, sea baths, and shared meals.", meta: "Every 3 months", target: "#retreat" }];

  return (
    <section className="offerings" id="offerings" data-screen-label="03 Offerings">
      <div className="motif motif-leaf-2" />
      <div className="wrap">
        <div className="offerings-header reveal">
          <div>
            <span className="eyebrow">What we offer</span>
            <h2 className="section-title">a soft place<br />to come back to.</h2>
          </div>
          <div className="offerings-intro">
            <p className="lede">
              Three ways to land with us. Whether you have a free afternoon or a free week,
              there's a mat saved for you on the deck.
            </p>
            <a href="faq.html" className="offerings-faq">New here? Read the FAQ <span className="arrow">→</span></a>
          </div>
        </div>
        <div className="offer-cards">
          {cards.map((c, i) =>
          <article className="offer reveal" key={c.no} style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="leaf" />
              <div className="num">{c.no}</div>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
              <div className="meta">
                <span>{c.meta}</span>
                <a href={c.target} className="more">explore <span className="arrow">→</span></a>
              </div>
            </article>
          )}
        </div>
      </div>
    </section>);

}

/* ============== Timetable ============== */
function Timetable() {
  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const days = [...weekdays, "Sat", "Sun"];

  const weekdayClasses = [
  { time: "07:00 – 08:30", name: "slow vinyasa", tag: "flow" },
  { time: "09:00 – 10:30", name: "mat pilates", tag: "strength" },
  { time: "17:00 – 18:30", name: "yoga for spinal health", tag: "therapy" },
  { time: "19:00 – 21:00", name: "candlelit yin & meditation", tag: "stillness" }];


  // build a sparse map for weekend slots
  const weekendClasses = {
    "Sat": [
    { time: "07:00 – 08:30", name: "morning meditation", tag: "stillness" },
    { time: "09:00 – 10:30", name: "morning meditation", tag: "stillness" }],

    "Sun": [
    { time: "17:00 – 18:30", name: "Sunday breath work", tag: "breath" },
    { time: "19:00 – 21:00", name: "Sunday breath work", tag: "breath" }]

  };

  // unify all unique time slots across the whole week, in chronological order
  const allTimes = Array.from(
    new Set([
    ...weekdayClasses.map((c) => c.time),
    ...Object.values(weekendClasses).flat().map((c) => c.time)]
    )
  ).sort();

  // helper: get the class at a given (day, time) cell
  const getClass = (day, time) => {
    if (weekdays.includes(day)) return weekdayClasses.find((c) => c.time === time);
    return (weekendClasses[day] || []).find((c) => c.time === time);
  };

  // build the booking link for a specific class, so clicking a cell jumps
  // straight to the reservation page with that class pre-selected
  const bookHref = (day, cls) => {
    const p = new URLSearchParams({ day, time: cls.time, name: cls.name });
    return `book.html?${p.toString()}`;
  };

  return (
    <React.Fragment>
    <section className="timetable tt-schedule" id="schedule" data-screen-label="04 Schedule">
      <div className="wrap">
        <div className="timetable-header reveal">
          <span className="eyebrow">The weekly rhythm</span>
          <h2 className="section-title">
            our <em className="script">studio schedule</em>
          </h2>
          <p className="lede">
            Walk-ins welcome — drop a mat any time. The rhythm stays the same week to week,
            so your body learns where to land.
          </p>
        </div>

        <div className="timetable-card reveal">
          <div className="timetable-grid" role="table" aria-label="Weekly class schedule">
            {/* header row */}
            <div className="tt-cell tt-corner" role="columnheader">
              <span className="tt-corner-label">time</span>
            </div>
            {days.map((d) =>
              <div key={d} className="tt-cell tt-day" role="columnheader">
                {d}
              </div>
              )}

            {/* body rows */}
            {allTimes.map((time) =>
              <React.Fragment key={time}>
                <div className="tt-cell tt-time" role="rowheader">{time}</div>
                {days.map((day) => {
                  const cls = getClass(day, time);
                  if (cls) {
                    return (
                      <a
                        key={day + time}
                        href={bookHref(day, cls)}
                        className="tt-cell tt-slot filled"
                        role="cell"
                        aria-label={`Reserve ${cls.name} on ${day} at ${time}`}>
                        
                        <span className="tt-class">{cls.name}</span>
                        <span className="tt-tag">{cls.tag}</span>
                        <span className="tt-reserve" aria-hidden="true">reserve →</span>
                      </a>);

                  }
                  return (
                    <div key={day + time} className="tt-cell tt-slot empty" role="cell">
                      <span className="tt-rest">·</span>
                    </div>);

                })}
              </React.Fragment>
              )}
          </div>

          <div className="timetable-footnote">
            <p>
              Tap any class to reserve your spot — or
              <a href="book.html"> browse the full schedule →</a>
            </p>
          </div>
        </div>
      </div>
    </section>

    <section className="timetable tt-pricing" id="pricing" data-screen-label="05 Pricing">
      <div className="wrap">
        <div className="pricing-card reveal">
          <div className="pricing-intro">
            <span className="eyebrow">Pricing</span>
            <h3>drop in, or <em className="script">stay a while</em></h3>
            <p>
              All classes are taught in English, open to every body and every level —
              90 minutes of flow with time to soften after. Each one comes with a
              <strong> free hot or cold beverage of your choice</strong>, our way of saying
              <em> stay a while.</em>
            </p>
          </div>

          <div className="pricing-tiers">
            <article className="tier">
              <span className="tier-tag">drop-in</span>
              <div className="tier-price"><span className="num">350,000</span><span className="cur"> ₫</span></div>
              <p>single class · perfect for visitors passing through Đà Nẵng</p>
            </article>

            <article className="tier featured">
              <span className="tier-tag">5-class pack</span>
              <div className="tier-price"><span className="num">1,500,000</span><span className="cur"> ₫</span></div>
              <p>300,000 ₫ per class · valid for 3 months</p>
              <span className="tier-badge">most loved</span>
            </article>

            <article className="tier">
              <span className="tier-tag">monthly unlimited</span>
              <div className="tier-price"><span className="num">3,200,000</span><span className="cur"> ₫</span></div>
              <p>every class · every day · 30 consecutive days</p>
            </article>
          </div>

          <div className="pricing-foot">
            <span className="ribbon">✦ first class on us</span>
            <p>New to namasteyogis? Your very first class is on the house. Just walk in and roll out a mat.</p>
          </div>
        </div>
      </div>
    </section>
    </React.Fragment>);

}

/* ============== Workshops ============== */
function Workshops() {
  const workshops = [
  {
    no: "01",
    date: { day: "20", month: "Apr" },
    year: "2026",
    title: "Open Hips, Open Heart",
    desc: "A half-day hip-opening intensive — long-held postures, breath work, and journaling for what's stored in the body. Tea and slow conversation after.",
    meta: "Saturday · 14:00 – 18:00 · once a month",
    price: "950,000 ₫",
    tag: "Half-day intensive"
  },
  {
    no: "02",
    date: { day: "14", month: "May" },
    year: "2026",
    title: "The Moon Circle",
    desc: "New-moon journaling, breath work, and intention setting — followed by a mineral bracelet making ritual where you string your own stones for the cycle ahead.",
    meta: "Aligned with the lunar calendar · 18:30 – 22:00",
    price: "1,200,000 ₫",
    tag: "Ritual evening"
  },
  {
    no: "03",
    date: { day: "02", month: "Jun" },
    year: "2026",
    title: "Sunday Slow Sound Bath",
    desc: "Candlelit yin held by crystal bowls and chimes. Ninety minutes of stillness, sound, and a long savasana to land in the new week soft.",
    meta: "First Sunday of every month · 17:00 – 18:30",
    price: "650,000 ₫",
    tag: "Sound healing"
  }];


  return (
    <section className="workshops" id="workshops" data-screen-label="07 Workshops">
      <div className="wrap">
        <div className="workshops-header reveal">
          <div>
            <span className="eyebrow">What's on</span>
            <h2 className="section-title">
              the <em className="script">workshop</em> calendar
            </h2>
          </div>
          <p className="lede">
            Half-day deep dives between the weekly classes and the seasonal retreats — themed
            afternoons and evenings for the curious and the in-between.
          </p>
        </div>

        <ol className="workshop-list">
          {workshops.map((w, i) =>
          <li
            className="workshop reveal"
            key={w.title}
            style={{ transitionDelay: `${i * 90}ms` }}>
            
              <div className="ws-no">{w.no}</div>

              <div className="ws-date">
                <span className="ws-day">{w.date.day}</span>
                <span className="ws-month">{w.date.month}</span>
                <span className="ws-year">{w.year}</span>
              </div>

              <div className="ws-body">
                <span className="ws-tag">{w.tag}</span>
                <h3 className="ws-title">{w.title}</h3>
                <p className="ws-desc">{w.desc}</p>
                <span className="ws-meta">{w.meta}</span>
              </div>

              <div className="ws-action">
                <span className="ws-price">{w.price}</span>
                <a href={`reserve.html?type=workshop&id=${w.no}`} className="ws-book">
                  Reserve <span className="arrow">→</span>
                </a>
              </div>
            </li>
          )}
        </ol>

        <div className="workshops-footer reveal">
          <p>
            Smaller circles, 8–12 yogis each. <a href="#">Join the waitlist →</a>
          </p>
        </div>
      </div>
    </section>);

}

/* ============== Retreat ============== */
function Retreat() {
  const includes = [
  "6 nights · ocean-view villa",
  "Twice daily yoga",
  "Plant-forward meals",
  "Sound bath & moon circle",
  "Sea bath rituals",
  "Hoi An day trip"];

  return (
    <section className="retreat" id="retreat" data-screen-label="04 Retreat">
      <div className="wrap">
        <div className="retreat-grid">
          <div className="retreat-media reveal">
            <div className="hibiscus" />
            <div className="main">
              <img src={R("retreatHero", "media/retreat-hero.jpg")} alt="A group of yogis stretching together on the beach at sunrise" />
            </div>
            <div className="secondary">
              <img src={R("retreatBuddha", "media/retreat-buddha.jpg")} alt="A small Buddha statue with a pink oleander flower" />
            </div>
          </div>

          <div className="retreat-text reveal">
            <span className="eyebrow">Featured retreat</span>
            <p className="quote">"…to find yourself once again, and to find your inner strength."</p>
            <h2 className="retreat-title">
              Yoga Retreat<br />in Da Nang
              <small>Vietnam · summer edition</small>
            </h2>

            <div className="retreat-info">
              <div>
                <div className="label">When</div>
                <div className="value">August 1 – 7, 2026</div>
              </div>
              <div>
                <div className="label">Where</div>
                <div className="value">An Lành villa, Da Nang</div>
              </div>
              <div>
                <div className="label">Spots</div>
                <div className="value">12 yogis only</div>
              </div>
            </div>

            <div className="retreat-includes">
              {includes.map((it) =>
              <span key={it} className="chip"><span className="dot" />{it}</span>
              )}
            </div>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href="reserve.html?type=retreat" className="btn btn-dark">Apply for a spot <span className="arrow">→</span></a>
              <a href="brochure.html" className="btn" style={{ color: "var(--green-800)", border: "1.5px solid var(--green-800)" }}>
                Download the brochure
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>);

}

/* ============== Teachers ============== */
function Teachers() {
  const teachers = [
  {
    name: "Mai",
    fullName: "Mai Nguyễn",
    role: "Founder · Lead teacher",
    img: R("teacher1", "media/teacher-1.jpg"),
    objPos: "center 22%",
    quote: "Slowness is a skill — and like any skill, you can practice it.",
    signature: "Slow vinyasa · breath work",
    detail: "Trained in Rishikesh, brought slowness home to Đà Nẵng in 2024. Drinks her coffee black and her matcha ceremonial."
  },
  {
    name: "Linh",
    fullName: "Linh Phạm",
    role: "Yin · Meditation",
    img: R("teacher2", "media/teacher-2.jpg"),
    objPos: "center 72%",
    quote: "The mat will hold whatever you bring. You don't have to arrive ready.",
    signature: "Candlelit yin · moon circles",
    detail: "200-hr RYT, certified in yin & restorative. Once cried in pigeon pose and is not embarrassed about it."
  },
  {
    name: "Hà",
    fullName: "Hà Trần",
    role: "Pilates · Spinal health",
    img: R("teacher3", "media/teacher-3.jpg"),
    objPos: "center 8%",
    quote: "Strong is a side effect of soft. Mobility before muscle, always.",
    signature: "Mat pilates · therapy work",
    detail: "Former contemporary dancer, pilates instructor since 2019. Always slightly cold, always smiling about it."
  }];


  return (
    <section className="teachers" id="teachers" data-screen-label="06 Teachers">
      <div className="wrap">
        <div className="teachers-header reveal">
          <div>
            <span className="eyebrow">Behind the mat</span>
            <h2 className="section-title">
              meet the <em className="script">teachers</em>
            </h2>
          </div>
          <p className="lede">
            Three women, three lineages, one studio. The hands cueing your shoulders down
            from your ears — and the voices reminding you it doesn't have to be perfect to
            be enough.
          </p>
        </div>

        <div className="teacher-grid" style={{ height: "474px" }}>
          {teachers.map((t, i) =>
          <article
            className="teacher-card reveal"
            key={t.name}
            style={{ transitionDelay: `${i * 90}ms` }}>
            
              <div className="teacher-photo">
                <img src={t.img} alt={`Portrait of ${t.fullName}`} style={{ objectFit: "cover", objectPosition: t.objPos || "center", padding: "0px" }} />
              </div>

              <div className="teacher-body">
                <span className="teacher-role">{t.role}</span>
                <div className="teacher-name">{t.name}</div>
                <div className="teacher-fullname">{t.fullName}</div>
                <p className="teacher-quote">"{t.quote}"</p>
                <div className="teacher-foot">
                  <span className="teacher-signature">{t.signature}</span>
                  <p className="teacher-detail">{t.detail}</p>
                </div>
              </div>
            </article>
          )}
        </div>
      </div>
    </section>);

}

/* ============== Community ============== */
function Community() {
  const yogis = [
  { img: R("yogi1", "media/yogi-1.jpg"), alt: "Top-down view of feet on a yoga mat next to an open laptop",
    title: "the burned out corporate girl",
    desc: "Trading inbox panic for sunrise savasana. Welcomed with iced coffee and zero hustle." },
  { img: R("yogi2", "media/yogi-2.jpg"), alt: "Hand holding a layered matcha and ube iced drink, beige blazer",
    title: "the “always in a hurry” girl learning to slow down",
    desc: "Phone on silent, matcha in hand. Here to finally hear her own breath." },
  { img: R("yogi3", "media/yogi-3.jpg"), alt: "Woman in extended child's pose with hands clasped on a burgundy yoga mat",
    title: "the girl learning softness again after heartbreak",
    desc: "Açaí bowls, group hugs, and long walks on the sand. We hold the space." },
  { img: R("yogi4", "media/yogi-4.jpg"), alt: "Two yogis sitting back-to-back, one in dusty pink, one in soft gray",
    title: "the community seeker girl",
    desc: "Boba teas after class, journal swap on Sunday, a friend within the first hour." }];


  return (
    <section className="community" id="community" data-screen-label="05 Community">
      <div className="wrap">
        <div className="community-intro reveal">
          <span className="eyebrow">Who comes here</span>
          <h2 className="section-title">every retreat has<br />these <em>yogi girls</em>…</h2>
          <p className="lede">You will recognise yourself in at least one of them. (Maybe all four, on different days.)</p>
        </div>
        <div className="yogis">
          {yogis.map((y, i) =>
          <div className="yogi reveal" key={y.img} style={{ transitionDelay: `${i * 70}ms` }}>
              <div className="yogi-img">
                <img src={y.img} alt={y.alt} />
              </div>
              <div className="yogi-body">
                <h4>{y.title}</h4>
                <p>{y.desc}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);
}

function Testimonial() {
  return (
    <section className="testimonial" data-screen-label="06 Quote">
      <div className="reveal">
        <div className="quote-mark">"</div>
        <blockquote>I came home to a softer version of myself. The kind I forgot was in there.</blockquote>
        <cite>— Mia, March retreat<span className="role">Returning yogi, Sydney</span></cite>
      </div>
    </section>);

}

/* ============== Visit / map ============== */
function MapIllustration() {
  return (
    <svg
      viewBox="0 0 700 700"
      xmlns="http://www.w3.org/2000/svg"
      className="map-svg"
      role="img"
      aria-label="Hand-drawn map showing the namasteyogis studio near Mỹ Khê beach in Đà Nẵng, Vietnam">
      
      {/* warm cream paper background */}
      <rect width="700" height="700" fill="#fbf6ec" />

      {/* hand-drawn-looking border (wobbly path, not a perfect rect) */}
      <path
        d="M 26 22 Q 200 18 360 24 Q 520 18 676 26 Q 682 200 678 360 Q 684 520 676 676 Q 520 682 360 678 Q 200 684 24 676 Q 18 520 22 360 Q 16 200 26 22 Z"
        fill="none" stroke="#7a2d44" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" opacity="0.9" />
      

      {/* OCEAN — pale dusty wash on the right ~45% */}
      <path
        d="M 380 26 q -8 80 4 160 q 10 80 -4 160 q -2 80 6 160 q 6 90 -2 168 L 678 674 L 678 26 Z"
        fill="#cfdce3" opacity="0.85" />
      

      {/* BEACH — sandy strip between land and ocean */}
      <path
        d="M 358 26 q -6 80 6 160 q 12 80 -4 160 q -2 80 8 160 q 6 90 -2 168 L 396 674 q 6 -90 -2 -168 q -8 -80 -6 -160 q 14 -80 4 -160 q -12 -80 -4 -160 Z"
        fill="#e8d6b3" opacity="0.85" />
      

      {/* WAVES — wavy ink strokes scattered across the ocean */}
      <g stroke="#5b7c8c" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.75">
        <path d="M 460 90 q 12 -7 24 0 t 24 0 t 24 0" />
        <path d="M 520 160 q 12 -7 24 0 t 24 0" />
        <path d="M 460 240 q 12 -7 24 0 t 24 0 t 24 0" />
        <path d="M 520 320 q 12 -7 24 0 t 24 0" />
        <path d="M 460 400 q 12 -7 24 0 t 24 0 t 24 0" />
        <path d="M 530 470 q 12 -7 24 0 t 24 0" />
        <path d="M 460 540 q 12 -7 24 0 t 24 0 t 24 0" />
        <path d="M 520 610 q 12 -7 24 0 t 24 0" />
      </g>

      {/* "Đà Nẵng, Vietnam ♡" handwritten in top-right ocean — the postcard moment */}
      <g transform="translate(498, 88) rotate(-4)">
        <text x="0" y="0" fontFamily="Dancing Script, cursive" fontSize="44" fontWeight="700" fill="#5b7c8c" fontStyle="italic">
          Đà Nẵng,
        </text>
        <text x="22" y="46" fontFamily="Dancing Script, cursive" fontSize="38" fontWeight="700" fill="#5b7c8c" fontStyle="italic">
          Vietnam
        </text>
        {/* heart */}
        <path
          d="M 120 70 C 116 62, 104 60, 102 72 C 100 86, 116 96, 122 102 C 130 96, 144 86, 142 72 C 140 60, 128 62, 124 70 Z"
          fill="#7a2d44" opacity="0.85" />
        
      </g>

      {/* STREETS — burgundy wobbly ink grid */}
      <g fill="none" stroke="#7a2d44" strokeLinecap="round" strokeLinejoin="round">
        {/* vertical street 1 (smaller, west of main) */}
        <path d="M 130 20 C 134 200, 126 420, 134 680" strokeWidth="4.5" />
        {/* vertical street 2 — MAIN, runs through the studio (An Thượng 2) */}
        <path d="M 252 20 C 244 200, 258 420, 248 680" strokeWidth="6.5" />
        {/* horizontal street 1 (upper) */}
        <path d="M 24 250 C 100 244, 200 254, 360 248" strokeWidth="4.5" />
        {/* horizontal street 2 (crosses through the studio, heads to beach) */}
        <path d="M 24 372 C 100 368, 200 380, 360 374" strokeWidth="6" />
      </g>

      {/* dashed center stripe on the main vertical street */}
      <path
        d="M 250 60 C 248 160, 252 260, 250 360 C 252 460, 248 560, 250 660"
        fill="none" stroke="#7a2d44" strokeWidth="1" strokeDasharray="5,12" opacity="0.5" />
      

      {/* PALM TREE 1 — upper area, between streets */}
      <g transform="translate(190, 210) rotate(-4)">
        <path d="M 0 0 q 4 -32 -3 -60 q -4 -28 4 -56" stroke="#3d5e3a" strokeWidth="3" fill="none" strokeLinecap="round" />
        <g stroke="#3d5e3a" strokeWidth="2" fill="none" strokeLinecap="round">
          <path d="M 0 -116 Q -22 -128 -40 -108" />
          <path d="M 0 -116 Q 22 -128 40 -108" />
          <path d="M 0 -116 Q -18 -138 -4 -150" />
          <path d="M 0 -116 Q 20 -138 4 -150" />
        </g>
      </g>

      {/* PALM TREE 2 — lower, just before the beach */}
      <g transform="translate(340, 500) rotate(6) scale(0.85)">
        <path d="M 0 0 q -4 -32 4 -60 q 3 -28 -4 -56" stroke="#3d5e3a" strokeWidth="3" fill="none" strokeLinecap="round" />
        <g stroke="#3d5e3a" strokeWidth="2" fill="none" strokeLinecap="round">
          <path d="M 0 -116 Q -22 -128 -38 -106" />
          <path d="M 0 -116 Q 22 -130 40 -110" />
          <path d="M 0 -116 Q -18 -138 -4 -148" />
          <path d="M 0 -116 Q 20 -136 6 -150" />
        </g>
      </g>

      {/* tiny grass tufts for character */}
      <g stroke="#3d5e3a" strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.75">
        <path d="M 80 460 q 8 -10 16 -2 q 10 -10 18 0 q 8 -8 16 2" />
        <path d="M 290 600 q 8 -10 16 -2 q 10 -10 18 0" />
      </g>

      {/* MARKER at the central intersection — circle + blossoming lotus with leaves */}
      <g transform="translate(252, 372)">
        {/* circle around marker */}
        <circle cx="0" cy="0" r="38" fill="#fbf6ec" stroke="#7a2d44" strokeWidth="2.5" />

        {/* GREEN LEAVES — two pointed leaves at the base */}
        <g fill="#a4b5a0" stroke="#3d5e3a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 0 0 Q 11 -4 22 0 Q 11 4 0 0 Z" transform="translate(-2 6) rotate(150)" />
          <path d="M 0 0 Q 11 -4 22 0 Q 11 4 0 0 Z" transform="translate(2 6) rotate(30)" />
          {/* subtle leaf veins */}
          <line x1="0" y1="0" x2="20" y2="0" transform="translate(-2 6) rotate(150)" stroke="#3d5e3a" strokeWidth="0.7" opacity="0.55" />
          <line x1="0" y1="0" x2="20" y2="0" transform="translate(2 6) rotate(30)" stroke="#3d5e3a" strokeWidth="0.7" opacity="0.55" />
        </g>

        {/* LOTUS PETALS — 5 petals fanning upward */}
        <g fill="#f0cdd5" stroke="#7a2d44" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          {/* outer back petals (slightly smaller, angled wide) */}
          <path d="M 0 0 Q -5 -12 0 -22 Q 5 -12 0 0 Z" transform="rotate(-82)" />
          <path d="M 0 0 Q -5 -12 0 -22 Q 5 -12 0 0 Z" transform="rotate(82)" />
          {/* mid-side petals */}
          <path d="M 0 0 Q -6 -14 0 -26 Q 6 -14 0 0 Z" transform="rotate(-44)" />
          <path d="M 0 0 Q -6 -14 0 -26 Q 6 -14 0 0 Z" transform="rotate(44)" />
          {/* top center petal (most forward, on top) */}
          <path d="M 0 0 Q -6 -14 0 -26 Q 6 -14 0 0 Z" />
        </g>

        {/* center — seed pod dot */}
        <circle cx="0" cy="-2" r="2.4" fill="#7a2d44" />
      </g>

      {/* "our studio" handwritten callout pointing to the mat */}
      <g>
        <path d="M 96 478 Q 160 440 218 396" stroke="#7a2d44" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeDasharray="3,5" />
        <text x="40" y="498" fontFamily="Dancing Script, cursive" fontSize="32" fontWeight="700" fill="#7a2d44">
          our studio
        </text>
      </g>

      {/* compass rose top-left */}
      <g transform="translate(80, 90)">
        <circle cx="0" cy="0" r="22" fill="none" stroke="#7a2d44" strokeWidth="1.2" strokeDasharray="2,4" opacity="0.7" />
        <path d="M 0 -26 L -6 0 L 0 26 L 6 0 Z" fill="#7a2d44" opacity="0.85" />
        <text x="0" y="-30" fontFamily="Cormorant Garamond, serif" fontStyle="italic" fontSize="12" fill="#7a2d44" textAnchor="middle">N</text>
      </g>
    </svg>);

}

function Visit() {
  return (
    <section className="visit" id="visit" data-screen-label="08 Visit">
      <div className="wrap">
        <div className="visit-header reveal">
          <span className="eyebrow">Visit us</span>
          <h2 className="section-title">find your way <em className="script">to the mat</em></h2>
          <p className="lede">
            Tucked into the palm-lined lanes of Mỹ An, two minutes from the sand.
            Look for the green door under the sea-almond tree — that's us.
          </p>
        </div>

        <div className="visit-grid">
          <div className="visit-info-col">
            <div className="info-block reveal">
              <span className="info-tag">Address</span>
              <h4>An Thượng 2, Mỹ An</h4>
              <p>Quận Ngũ Hành Sơn<br />Đà Nẵng, Vietnam</p>
              <a href="#" className="info-link">Open in Google Maps →</a>
            </div>

            <div className="info-block reveal" style={{ transitionDelay: "80ms" }}>
              <span className="info-tag">Studio hours</span>
              <h4>Open every day</h4>
              <p>
                Mon – Fri · 06:00 – 21:00<br />
                Sat · 07:00 – 11:00<br />
                Sun · 17:00 – 21:00
              </p>
              <a href="book.html" className="info-link">Book a class →</a>
            </div>

            <div className="info-block reveal" style={{ transitionDelay: "160ms" }}>
              <span className="info-tag">Getting here</span>
              <h4>On foot, scooter, or Grab</h4>
              <p>2 min from Mỹ Khê beach.<br />Free scooter parking out front.</p>
              <a href="#" className="info-link">Send us a WhatsApp →</a>
            </div>
          </div>

          <div className="visit-map-col reveal">
            <MapIllustration />
          </div>
        </div>
      </div>
    </section>);

}

/* ============== Newsletter ============== */
function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    if (email.includes("@")) setSent(true);
  };
  return (
    <section className="newsletter" id="journal" data-screen-label="07 Newsletter">
      <div className="newsletter-inner reveal">
        <span className="eyebrow">The slow letter</span>
        <h2>monthly notes, <span className="script">soft seasons</span></h2>
        <p>
          Once a month: studio updates, retreat openings, smoothie bowl recipes,
          and one slow ritual to try this week. No spam — promise.
        </p>
        <form className={`newsletter-form ${sent ? "success" : ""}`} onSubmit={onSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your-email@dreamscape.com"
            required
            disabled={sent} />
          
          <button type="submit">{sent ? "You're in ✓" : "Subscribe"}</button>
        </form>
      </div>
    </section>);

}

/* ============== Reveal-on-scroll ============== */
function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ============== Tweaks panel ============== */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": ["#d89bab", "#f0cdd5", "#bb6f85"],
  "headlineFont": "Cormorant Garamond",
  "showMarquee": true,
  "heroCopy": "softness"
} /*EDITMODE-END*/;

function TweaksUI({ t, setTweak }) {
  const { TweaksPanel, TweakSection, TweakRadio, TweakToggle, TweakSelect, TweakColor } = window;
  if (!TweaksPanel) return null;
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection title="Palette">
        <TweakColor
          label="Accent"
          value={t.accent}
          onChange={(v) => setTweak("accent", v)}
          options={[
          ["#d89bab", "#f0cdd5", "#bb6f85"], // hibiscus pink
          ["#df937a", "#f6cfc1", "#b96651"], // coral
          ["#e2b079", "#f6ddc2", "#b8814a"], // apricot
          ["#a4b5a0", "#d6e0cf", "#6c8a64"] // sage
          ]} />
        
      </TweakSection>
      <TweakSection title="Typography">
        <TweakSelect
          label="Headline serif"
          value={t.headlineFont}
          onChange={(v) => setTweak("headlineFont", v)}
          options={[
          "Cormorant Garamond",
          "Playfair Display",
          "DM Serif Display",
          "Italiana"]
          } />
        
      </TweakSection>
      <TweakSection title="Hero copy">
        <TweakRadio
          label="Mood"
          value={t.heroCopy}
          onChange={(v) => setTweak("heroCopy", v)}
          options={["softness", "strength", "home"]} />
        
      </TweakSection>
      <TweakSection title="Layout">
        <TweakToggle
          label="Show marquee"
          value={t.showMarquee}
          onChange={(v) => setTweak("showMarquee", v)} />
        
      </TweakSection>
    </TweaksPanel>);

}

/* ============== App ============== */
function App() {
  const useTweaks = window.useTweaks || (() => [TWEAK_DEFAULTS, () => {}]);
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  useReveal();

  // accent palette swap
  useEffect(() => {
    const pal = Array.isArray(t.accent) ? t.accent : ["#d89bab", "#f0cdd5", "#bb6f85"];
    const [p400, p200, p600] = pal;
    const root = document.documentElement;
    root.style.setProperty("--pink-200", p200);
    root.style.setProperty("--pink-400", p400);
    root.style.setProperty("--pink-600", p600);
  }, [t.accent]);

  // headline font swap
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--serif",
      `"${t.headlineFont}", Georgia, serif`
    );
  }, [t.headlineFont]);

  const heroVariants = {
    softness: { line: "breathe in,", script: "find your softness." },
    strength: { line: "rise gently,", script: "find your strength." },
    home: { line: "come home,", script: "find your stillness." }
  };

  return (
    <React.Fragment>
      <Nav />
      <Hero variant={heroVariants[t.heroCopy] || heroVariants.softness} />
      {t.showMarquee && <Marquee />}
      <Intro />
      <Teachers />
      <Offerings />
      <Timetable />
      <Workshops />
      <Retreat />
      <Community />
      <Testimonial />
      <Visit />
      <Newsletter />
      <Footer />
      <TweaksUI t={t} setTweak={setTweak} />
    </React.Fragment>);

}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);