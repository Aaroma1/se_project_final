import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__title">© 2025 Supersite, Powered by News API</div>
      <div className="footer__buttons">
        <Link
          to="/"
          className="footer__button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Home
        </Link>
        <a
          href="https://tripleten.com"
          className="footer__button"
          target="_blank"
          rel="noopener noreferrer"
        >
          TripleTen
        </a>
      </div>
    </footer>
  );
}

export default Footer;
