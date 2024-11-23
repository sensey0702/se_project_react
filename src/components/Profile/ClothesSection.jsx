import "./ClothesSection.css";

import ItemCard from "../ItemCard/ItemCard";

import { defaultClothingItems } from "../../utils/constants";

function ClothesSection({ onCardClick }) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__wrapper">
        <p className="clothes-section__text">Your items</p>
        <button className="clothes-section__button">+ Add new</button>
      </div>
      <ul className="cards__list clothes-section__cards">
        {defaultClothingItems.map((item) => {
          return (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
