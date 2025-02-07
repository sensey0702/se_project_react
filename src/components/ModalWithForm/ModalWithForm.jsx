import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  onClose,
  name,
  onSubmit,
  handleOrButton,
  orButtonText,
}) {
  return (
    <div
      className={`modal modal__type_${name} ${isOpen ? "modal_opened" : ""}`}
    >
      <div className={`modal__content modal__content_type_${name}`}>
        <h2 className="modal__title">{title}</h2>
        <button
          type="button"
          className={`modal__close modal__close_content_type_${name}`}
          onClick={onClose}
        />
        <form onSubmit={onSubmit} className="modal__form">
          {children}
          <div className="modal__button-wrapper">
            <button
              className={`modal__submit modal__submit_content_type_${name}`}
              type="submit"
            >
              {buttonText}
            </button>
            {handleOrButton && (
              <button
                onClick={handleOrButton}
                type="button"
                className="modal__button_type_or"
              >
                {orButtonText}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
