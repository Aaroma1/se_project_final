import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__left">© 2025 Supersite, Powered by News API</div>
      <div className="footer__right">
        <button className="footer__button">Home</button>
        <button className="footer__button">TripleTen</button>
      </div>
    </footer>
  );
}

export default Footer;
