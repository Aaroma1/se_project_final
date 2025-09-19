import React from "react";
import "./Header.css";

function Header({ onSignInClick }) {
  return (
    <header className="header">
      <div className="header__logo">NewsExplorer</div>
      <nav className="header__nav">
        <div className="header__buttons">
          <button className="header__button-home">Home</button>
          <div className="header__white-line" />
        </div>
      </nav>
      <button className="header__button-sign-in" onClick={onSignInClick}>
        Sign In
      </button>
    </header>
  );
}

export default Header;
