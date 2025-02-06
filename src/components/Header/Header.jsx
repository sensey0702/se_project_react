import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.svg";
import placeholderAvatar from "../../assets/placeholder-avatar.png";

import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Header({
  handleAddClick,
  handleLoginClick,
  handleSignUpClick,
  weatherData,
  isLoggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="wtwr logo" />
      </Link>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>

      <ToggleSwitch />

      {isLoggedIn && (
        <button
          type="button"
          className="header__add-clothes-btn"
          onClick={handleAddClick}
        >
          + Add clothes
        </button>
      )}

      {isLoggedIn ? (
        <Link to="/profile" className="header__profile-link">
          <div className="header__user-container">
            <p className="header__username">{currentUser.name}</p>
            {currentUser.avatar ? (
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="header__avatar"
              />
            ) : (
              <img
                src={placeholderAvatar}
                alt={currentUser.name}
                className="header__avatar"
              />
            )}
          </div>
        </Link>
      ) : (
        <div className="header__logged-out">
          <button onClick={handleSignUpClick} className="header__signup-button">
            {" "}
            Sign Up
          </button>
          <button onClick={handleLoginClick} className="header__login-button">
            {" "}
            Log in
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
