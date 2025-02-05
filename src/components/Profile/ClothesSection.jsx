import "./ClothesSection.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ onCardClick, clothingItems, handleAddClick }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="clothes-section">
      <div className="clothes-section__wrapper">
        <p className="clothes-section__text">Your items</p>
        <button
          type="button"
          className="clothes-section__button"
          onClick={handleAddClick}
        >
          + Add new
        </button>
      </div>
      <ul className="clothes-section__cards">
        {clothingItems.map((item) => {
          if (!currentUser || !currentUser._id) {
            return null; // or a loading spinner
          }

          const isOwn = item.owner === currentUser._id;

          if (isOwn) {
            return (
              <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
            );
          }
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
