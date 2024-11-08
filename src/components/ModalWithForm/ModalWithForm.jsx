import "./ModalWithForm.css";

function ModalWithForm({ children, buttonText, title, isOpen, onClose, name }) {
  return (
    <div
      className={`modal modal__type_${name} ${isOpen ? "modal_opened" : ""}`}
    >
      <div className={`modal__content`}>
        <h2 className="modal__title">{title}</h2>
        <button
          type="button"
          className="modal__close"
          onClick={onClose}
        ></button>
        <form className="modal__form">
          {children}
          <button className="modal__submit" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
