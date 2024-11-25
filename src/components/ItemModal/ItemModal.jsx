import "./ItemModal.css";

function ItemModal({ card, onClose, isOpen, name, deleteCard }) {
  return (
    <div className={`modal modal_type_${name} ${isOpen ? "modal_opened" : ""}`}>
      <div className={`modal__content modal__content_type_${name}`}>
        <button
          type="button"
          className={`modal__close modal__close_type_${name}`}
          onClick={onClose}
        ></button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <div className="modal__footer_text">
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
          <button
            type="button"
            className="modal__delete-button"
            onClick={deleteCard}
          >
            Delete Item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
