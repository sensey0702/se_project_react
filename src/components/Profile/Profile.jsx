import "./Profile.css";

import ClothesSection from "./ClothesSection";
import SideBar from "./SideBar";

function Profile({ handleCardClick }) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
      </section>
      <section className="profile__clothes-section">
        <ClothesSection handleCardClick={handleCardClick} />
      </section>
    </div>
  );
}

export default Profile;
