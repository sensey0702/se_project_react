import "./Profile.css";

import ClothesSection from "./ClothesSection";
import SideBar from "./SideBar";

function Profile({
  onCardClick,
  clothingItems,
  handleAddClick,
  handleEditProfileClick,
  onCardLike,
  onLogOutClick,
  isLoggedIn,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          handleEditProfileClick={handleEditProfileClick}
          onLogOutClick={onLogOutClick}
        />
      </section>
      <section className="profile__clothes-section">
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          handleAddClick={handleAddClick}
          onCardLike={onCardLike}
          isLoggedIn={isLoggedIn}
        />
      </section>
    </div>
  );
}

export default Profile;
