// FAQ sub-page for namasteyogis.
// Renders: shared Nav + FAQ accordion section + shared Footer.

function FAQ() {
  const faqs = [
    {
      q: "I've never done yoga. Is this for me?",
      a: "Yes — every class is open to every body and every level. Our slow vinyasa and candlelit yin are especially gentle starting points. Arrive five minutes early, find a mat, and we'll meet you where you are.",
    },
    {
      q: "What should I bring?",
      a: "Just yourself. Mat rental is included, and blocks, blankets, and bolsters all live at the studio. Wear something soft you can move in. Bare feet are tradition.",
    },
    {
      q: "Do I need to book ahead?",
      a: "Walk-ins are welcome for any class. For workshops and retreats we recommend booking a week ahead — spaces are intentionally kept small so the room stays close.",
    },
    {
      q: "What language are classes taught in?",
      a: "All weekly classes are taught in English. Our teachers also speak fluent Vietnamese — ask questions in either, whichever feels easier.",
    },
    {
      q: "Can I just drop in if I'm visiting Đà Nẵng?",
      a: "Of course. Travelers are some of our favorite yogis. A drop-in class is 350,000 ₫ and includes a free hot or cold beverage afterwards — our way of saying stay a while.",
    },
    {
      q: "Do you offer private sessions?",
      a: "Yes — privates with any of our three teachers are available on request. Send us a WhatsApp and we'll find a time that works around your schedule.",
    },
    {
      q: "What's your cancellation policy?",
      a: "Classes — cancel anytime, no fee. Workshops and retreats — 50% deposit refundable up to 30 days ahead, then non-refundable. Life happens; we'll always try to find you another spot.",
    },
    {
      q: "Are men welcome?",
      a: "Always. Everyone is welcome on the mat. Our community happens to be mostly women right now, but we're a kind, mixed room — and the practice is universal.",
    },
  ];

  const [open, setOpen] = React.useState(new Set([0])); // first one open by default

  const toggle = (i) => {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <section className="faq" id="faq" data-screen-label="FAQ">
      <div className="wrap">
        <div className="faq-header">
          <span className="eyebrow">Frequently asked</span>
          <h1 className="section-title">
            still <em className="script">wondering</em>?
          </h1>
          <p className="lede">
            A few of the questions we hear most often. If yours isn't here, send us a
            message — we answer within a slow morning.
          </p>
        </div>

        <div className="faq-list" role="list">
          {faqs.map((f, i) => (
            <FAQItem
              key={i}
              index={i + 1}
              q={f.q}
              a={f.a}
              isOpen={open.has(i)}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>

        <div className="faq-cta">
          <h3>Still wondering something?</h3>
          <p>We answer every message ourselves, usually within a slow morning.</p>
          <a href="#" className="btn">Send us a WhatsApp <span className="arrow">→</span></a>
        </div>
      </div>
    </section>
  );
}

function FAQItem({ q, a, isOpen, onToggle, index }) {
  return (
    <div className={`faq-item ${isOpen ? "open" : ""}`} role="listitem">
      <button
        className="faq-question"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="faq-q-num">{String(index).padStart(2, "0")}</span>
        <span className="faq-q-text">{q}</span>
        <span className="faq-q-icon" aria-hidden="true">+</span>
      </button>
      <div
        className="faq-answer"
        style={{ maxHeight: isOpen ? "500px" : "0" }}
      >
        <p>{a}</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <React.Fragment>
      <Nav />
      <FAQ />
      <Footer />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
