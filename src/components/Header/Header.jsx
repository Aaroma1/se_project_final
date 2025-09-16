import React from "react";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header__logo">NewsExplorer</div>
      <nav className="header__nav">
        <button className="header__button">Home</button>
        <button className="header__button">Sign In</button>
      </nav>
    </header>
  );
}

export default Header;
