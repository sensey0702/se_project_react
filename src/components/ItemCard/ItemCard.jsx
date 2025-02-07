import "./ItemCard.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = item.likes.some((id) => id === currentUser._id);

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    onCardLike({ id: item._id, isLiked });
  };

  return (
    <li className="item-card">
      <div className="item-card__heading-wrapper">
        <h2 className="item-card__name">{item.name}</h2>
        {isLoggedIn && (
          <button
            type="button"
            className={
              !isLiked ? "item-card__unlike-button" : "item-card__like-button"
            }
            onClick={handleLike}
          ></button>
        )}
      </div>
      <img
        onClick={handleCardClick}
        className="item-card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
