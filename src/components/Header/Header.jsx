import { useContext, useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Header.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import logoutIcon from "../../../public/Images/logout.svg";

function Header({ loggedIn = false, onSignInClick, onSignOutClick }) {
  const currentUser = useContext(CurrentUserContext);
  const location = useLocation();
  const onSavedPage = location.pathname === "/saved-articles";

  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleAuthClick = () => {
    if (loggedIn && onSignOutClick) {
      onSignOutClick();
    } else if (!loggedIn && onSignInClick) {
      onSignInClick();
    }
    setMobileOpen(false);
  };

  return (
    <header
      className={`header ${onSavedPage ? "header__saved" : ""} ${
        mobileOpen ? "mobile-open" : ""
      }`}
    >
      <NavLink
        className={`header__logo header__title ${
          onSavedPage ? "header__title-saved" : ""
        }`}
        to="/"
        onClick={() => setMobileOpen(false)}
      >
        NewsExplorer
      </NavLink>

      {/* desktop links (hidden on phone via CSS) */}
      <nav className="header__links">
        <NavLink
          to="/"
          className={({ isActive }) =>
            "header__links-item" +
            (isActive ? " header__links-item_selected" : "") +
            (onSavedPage ? " header__links-item_saved" : "")
          }
        >
          Home
        </NavLink>

        {loggedIn && (
          <NavLink
            to="/saved-articles"
            className={({ isActive }) =>
              "header__links-item" +
              (isActive ? " header__links-item_saved-selected" : "") +
              (onSavedPage ? " header__links-item_saved" : "")
            }
          >
            Saved Articles
          </NavLink>
        )}

        <button
          className={
            "header__links-button " +
            (onSavedPage ? "header__links-button_saved" : "")
          }
          type="button"
          onClick={handleAuthClick}
        >
          {loggedIn ? currentUser?.name || "User" : "Sign in"}
          {loggedIn && (
            <img
              className={
                "header__links-button_image" +
                (onSavedPage ? " header__links-button_image_saved" : "")
              }
              src={logoutIcon}
              alt="Logout"
            />
          )}
        </button>
      </nav>

      {/* burger button (visible only on phone via CSS) */}
      <button
        className={`header__burger ${mobileOpen ? "header__burger_open" : ""}`}
        type="button"
        aria-expanded={mobileOpen}
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
        onClick={() => setMobileOpen((s) => !s)}
      />

      {/* mobile dropdown (fixed 174px high) */}
      {/* <div
        className={`mobile-nav ${mobileOpen ? "mobile-nav_open" : ""} ${
          onSavedPage ? "mobile-nav_saved" : ""
        }`}
        aria-hidden={!mobileOpen}
      > */}
      <div
        className={`mobile-nav 
    ${mobileOpen ? "mobile-nav_open" : ""} 
    ${onSavedPage ? "mobile-nav_saved" : ""} 
    ${loggedIn ? "mobile-nav_logged-in" : "mobile-nav_logged-out"}
  `}
        aria-hidden={!mobileOpen}
      >
        <div className="mobile-nav__inner">
          <NavLink
            className="mobile-nav__button"
            to="/"
            onClick={() => setMobileOpen(false)}
          >
            Home
          </NavLink>

          {!loggedIn ? (
            <button
              className="mobile-nav__button"
              type="button"
              onClick={() => {
                onSignInClick?.();
                setMobileOpen(false);
              }}
            >
              Sign in
            </button>
          ) : (
            <>
              <NavLink
                className="mobile-nav__button"
                to="/saved-articles"
                onClick={() => setMobileOpen(false)}
              >
                Saved Articles
              </NavLink>
              <button
                className="mobile-nav__button mobile-nav__button_action"
                type="button"
                onClick={handleAuthClick}
              >
                {currentUser?.name || "User"} — Sign out
              </button>
            </>
          )}
        </div>
      </div>
      {mobileOpen && (
        <div
          className="mobile-overlay"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
}

export default Header;
