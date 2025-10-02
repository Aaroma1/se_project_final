import { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Header.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import logoutIcon from "../../../public/Images/logout.svg";

function Header({ loggedIn = false, onSignInClick, onSignOutClick }) {
  const currentUser = useContext(CurrentUserContext);
  const location = useLocation();
  const onSavedPage = location.pathname === "/saved-articles";

  const handleAuthClick = () => {
    if (loggedIn && onSignOutClick) {
      onSignOutClick();
    } else if (!loggedIn && onSignInClick) {
      onSignInClick();
    }
  };

  return (
    <header className={`header ${onSavedPage ? "header__saved" : ""}`}>
      {/* Logo always on left */}
      <NavLink
        className={`header__logo header__title ${
          onSavedPage ? "header__title-saved" : ""
        }`}
        to="/"
      >
        NewsExplorer
      </NavLink>

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
    </header>
  );
}

export default Header;
