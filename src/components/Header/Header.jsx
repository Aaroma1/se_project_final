import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({ loggedIn = false, onSignInClick, onSignOutClick }) {
  const currentUser = useContext(CurrentUserContext);
  const [burger, setBurger] = useState(true);

  const toggleDropDown = () => setBurger(!burger);

  const headerButtonClick = () => {
    if (loggedIn && onSignOutClick) {
      onSignOutClick();
    } else if (!loggedIn && onSignInClick) {
      onSignInClick();
    }
    toggleDropDown();
  };

  return (
    <header className={`header ${burger ? "" : "header__mobile"}`}>
      <NavLink className="header__logo header__title" to="/">
        NewsExplorer
      </NavLink>
      <button
        onClick={toggleDropDown}
        type="button"
        className={`header__hamburger ${
          burger ? "header__button-open" : "header__button-close"
        }`}
        aria-label="Toggle navigation menu"
      />
      <nav
        id="header__links"
        className={`header__links ${
          burger ? "header__links-hidden" : "header__links-open"
        }`}
      >
        <NavLink
          to="/"
          className={({ isActive }) =>
            "header__links-item" +
            (isActive ? " header__links-item_selected" : "")
          }
        >
          Home
        </NavLink>
        {loggedIn && (
          <NavLink
            to="/saved-news"
            className={({ isActive }) =>
              "header__links-item" +
              (isActive ? " header__links-item_selected" : "")
            }
          >
            Saved Articles
          </NavLink>
        )}
        <button
          className="header__links-button"
          type="button"
          onClick={headerButtonClick}
        >
          {loggedIn ? currentUser?.name || "Sign out" : "Sign in"}
          {loggedIn && (
            <img
              className={
                loggedIn
                  ? "header__links-button_image"
                  : "header__links-button_image header__links-button_image-hidden"
              }
              src={testW}
              alt="Logout"
            />
          )}
        </button>
      </nav>
    </header>
  );
}

export default Header;

// import React, { useContext, useState } from 'react';
// import { NavLink } from 'react-router-dom';
// import CurrentUserContext from '../../contexts/CurrentUserContext';

// import testW from '../../images/logout.png';

// const Header = ({ loggedIn, buttonClick }) => {
//   const currentUser = useContext(CurrentUserContext);
//   // console.log({ currentUser });
//   const [burger, setBurger] = useState(true);

//   const toggleDropDown = () => {
//     setBurger(!burger);
//   };

//   const headerButtonClick = () => {
//     buttonClick();
//     toggleDropDown();
//   };

//   return (
//     <header className={`header ${burger ? '' : 'header__mobile'}`}>
//       <NavLink
//         className="header__title"
//         to="/"
//       >
//         NewsExplorer
//       </NavLink>

//       <button onClick={toggleDropDown} type="button" className={`header__hamburger ${burger ? 'header__button-open' : 'header__button-close'}`} />

//       <div id="header__links" className={`header__links ${burger ? 'header__links-hidden' : 'header__links-open'}`}>
//         <NavLink activeClassName="header__links-item_selected" className="header__links-item" to="/">Home</NavLink>

//         <NavLink activeClassName="header__links-item_selected" className={`header__links-item ${loggedIn ? '' : 'header__links-item_hidden'}`} to="/saved-news"> Saved Articles</NavLink>

//         <button className="header__links-button" type="button" onClick={headerButtonClick}>
//           {loggedIn ? `${currentUser.name}` : 'Sign in'}
//           {loggedIn && <img className={loggedIn ? 'header__links-button_image' : 'header__links-button_image header__links-button_image-hidden'} src={testW} alt="Logout" />}

//         </button>
//       </div>

//     </header>
//   );
// };

// export default Header;
