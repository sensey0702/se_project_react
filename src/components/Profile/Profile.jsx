import "./Profile.css";

import ClothesSection from "./ClothesSection";
import SideBar from "./SideBar";

function Profile({ onCardClick }) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
      </section>
      <section className="profile__clothes-section">
        <ClothesSection onCardClick={onCardClick} />
      </section>
    </div>
  );
}

export default Profile;
