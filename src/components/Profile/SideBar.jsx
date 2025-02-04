import "./SideBar.css";
import placeholderAvatar from "../../assets/placeholder-avatar.png";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function SideBar() {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className="sidebar">
      {currentUser.avatar ? (
        <img
          src={currentUser.avatar}
          alt={currentUser.name}
          className="sidebar__avatar"
        />
      ) : (
        <img
          src={placeholderAvatar}
          alt={currentUser.name}
          className="sidebar__avatar"
        />
      )}
      <p className="sidebar__username">{currentUser.name}</p>
    </div>
  );
}

export default SideBar;
