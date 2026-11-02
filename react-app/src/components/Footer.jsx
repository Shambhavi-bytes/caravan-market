export default function Footer() {
  return (
    <footer>
      <div className="foot-pan1">
        <a href="#top">Back to top</a>
      </div>

      <div className="foot-pan2">
        <div className="foot-col">
          <h3>Get to Know Us</h3>
          <ul>
            <li><a href="#" onClick={(event) => event.preventDefault()}>About Us</a></li>
            <li><a href="#" onClick={(event) => event.preventDefault()}>Careers</a></li>
            <li><a href="#" onClick={(event) => event.preventDefault()}>Press Releases</a></li>
            <li><a href="#" onClick={(event) => event.preventDefault()}>Our Blog</a></li>
          </ul>
        </div>

        <div className="foot-col">
          <h3>Connect with Us</h3>
          <ul>
            <li><a href="#" onClick={(event) => event.preventDefault()}>GitHub</a></li>
            <li><a href="#" onClick={(event) => event.preventDefault()}>LinkedIn</a></li>
            <li><a href="#" onClick={(event) => event.preventDefault()}>Instagram</a></li>
          </ul>
        </div>

        <div className="foot-col">
          <h3>Work with Us</h3>
          <ul>
            <li><a href="#" onClick={(event) => event.preventDefault()}>Sell on Caravan Market</a></li>
            <li><a href="#" onClick={(event) => event.preventDefault()}>Become an Affiliate</a></li>
            <li><a href="#" onClick={(event) => event.preventDefault()}>Advertise Your Products</a></li>
          </ul>
        </div>

        <div className="foot-col">
          <h3>Let Us Help You</h3>
          <ul>
            <li><a href="#" onClick={(event) => event.preventDefault()}>Your Account</a></li>
            <li><a href="#" onClick={(event) => event.preventDefault()}>Returns Centre</a></li>
            <li><a href="#" onClick={(event) => event.preventDefault()}>Delivery Information</a></li>
            <li><a href="#" onClick={(event) => event.preventDefault()}>Help</a></li>
          </ul>
        </div>
      </div>

      <div className="foot-pan3">
        <a href="#top" className="logo" aria-label="Back to top">CARAVAN</a>
      </div>

      <div className="foot-pan4">
        <div className="pages">
          <a href="#" onClick={(event) => event.preventDefault()}>Conditions of Use &amp; Sale</a>
          <a href="#" onClick={(event) => event.preventDefault()}>Privacy Notice</a>
          <a href="#" onClick={(event) => event.preventDefault()}>Cookie Preferences</a>
        </div>
        <div className="copyright">
          &copy; 2026 Caravan Market. A fictional store built for portfolio purposes.
        </div>
      </div>
    </footer>
  );
}