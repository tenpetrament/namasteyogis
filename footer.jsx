// Shared Footer. Loaded by both index.html and faq.html and exported to window
// so each page's app.jsx can render <Footer />.

function Footer() {
  const path = typeof window !== "undefined" ? window.location.pathname : "/";
  const isHome =
    path === "/" ||
    path.endsWith("/index.html") ||
    path.endsWith("/");
  const link = (anchor) => (isHome ? `#${anchor}` : `index.html#${anchor}`);

  return (
    <footer className="footer" data-screen-label="09 Footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="wordmark">namasteyogis</div>
          <p>
            A creative yoga &amp; wellness studio in Đà Nẵng, Vietnam — gathering kind humans
            on the mat since 2024.
          </p>
        </div>
        <div>
          <h5>Visit</h5>
          <ul>
            <li><a href="#">An Thượng 2, Mỹ An</a></li>
            <li><a href="#">Đà Nẵng, Vietnam</a></li>
            <li><a href="#">Open every day</a></li>
          </ul>
        </div>
        <div>
          <h5>Practice</h5>
          <ul>
            <li><a href={link("offerings")}>Classes</a></li>
            <li><a href={link("workshops")}>Workshops</a></li>
            <li><a href={link("retreat")}>Retreats</a></li>
            <li><a href="faq.html">FAQ</a></li>
          </ul>
        </div>
        <div>
          <h5>Stay close</h5>
          <ul>
            <li><a href="#">Instagram</a></li>
            <li><a href="#">TikTok</a></li>
            <li><a href="#">Pinterest</a></li>
            <li><a href="#">hello@namasteyogis.co</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 namasteyogis · all rights reserved</span>
        <span className="signoff">made with love, in Vietnam ♡</span>
        <span>terms · privacy · cookies</span>
      </div>
    </footer>
  );
}

window.Footer = Footer;
