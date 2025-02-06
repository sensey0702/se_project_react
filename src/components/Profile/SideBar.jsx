import "./SideBar.css";
import placeholderAvatar from "../../assets/placeholder-avatar.png";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function SideBar({ handleEditProfileClick, onLogOutClick }) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className="sidebar">
      <div className="sidebar__user-info-wrapper">
        <img
          src={currentUser?.avatar || placeholderAvatar}
          alt={currentUser?.name || "Guest Avatar"}
          className="sidebar__avatar"
        />

        <p className="sidebar__username">{currentUser?.name || "Guest"}</p>
      </div>
      <div className="sidebar_button-wrapper">
        <button
          onClick={handleEditProfileClick}
          className="sidebar__edit-profile-button"
          type="button"
        >
          Change profile data
        </button>
        <button
          onClick={onLogOutClick}
          className="sidebar__log-out-button"
          type="button"
        >
          Log out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
