import "./Profile.css";

import ClothesSection from "./ClothesSection";
import SideBar from "./SideBar";

function Profile({
  onCardClick,
  clothingItems,
  handleAddClick,
  handleEditProfileClick,
  onCardLike,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar handleEditProfileClick={handleEditProfileClick} />
      </section>
      <section className="profile__clothes-section">
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          handleAddClick={handleAddClick}
          onCardLike={onCardLike}
        />
      </section>
    </div>
  );
}

export default Profile;
