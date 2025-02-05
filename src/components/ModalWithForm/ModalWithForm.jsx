import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  onClose,
  name,
  onSubmit,
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
          <button
            className={`modal__submit modal__submit_content_type_${name}`}
            type="submit"
          >
            {buttonText}
          </button>
          {/* {if active modal is register add or log in button and set modal to login} */}
          {/* {if active modal is log in add or register button and set modal to register} */}
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
