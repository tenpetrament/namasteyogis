// Shared Nav + Logo. Loaded by both index.html and faq.html and exported to window
// so each page's app.jsx can render <Nav />.

function Logo({ size = 28, color = "currentColor" }) {
  return (
    <svg width={size * 1.5} height={size} viewBox="0 0 60 40" fill="none" aria-hidden="true">
      <path
        d="M8 20 C 8 8, 24 8, 30 20 C 36 8, 52 8, 52 20 C 52 32, 36 36, 30 26 C 24 36, 8 32, 8 20 Z"
        stroke={color}
        strokeWidth="2"
        fill="none"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Nav() {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const on = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", on, { passive: true });
    on();
    return () => window.removeEventListener("scroll", on);
  }, []);

  // Detect whether we're on the homepage so in-page anchor links stay as plain
  // hashes (smooth-scroll), and from sub-pages route back to index.html#anchor.
  const path = typeof window !== "undefined" ? window.location.pathname : "/";
  const isHome =
    path === "/" ||
    path.endsWith("/index.html") ||
    path.endsWith("/");
  const link = (anchor) => (isHome ? `#${anchor}` : `index.html#${anchor}`);

  return (
    <nav className={`nav ${(scrolled || !isHome) ? "scrolled" : ""}`}>
      <a href={isHome ? "#top" : "index.html"} aria-label="namasteyogis home">
        <span className="nav-brand">
          <span className="mark"><Logo size={26} /></span>
          <span className="wordmark">namasteyogis</span>
        </span>
      </a>
      <div className="nav-links">
        <a href={link("about")}>Studio</a>
        <a href={link("offerings")}>Classes</a>
        <a href={link("schedule")}>Schedule</a>
        <a href={link("workshops")}>Workshops</a>
        <a href={link("retreat")}>Retreats</a>
      </div>
      <a href={link("retreat")} className="nav-cta">Join August Retreat</a>
    </nav>
  );
}

window.Logo = Logo;
window.Nav = Nav;
