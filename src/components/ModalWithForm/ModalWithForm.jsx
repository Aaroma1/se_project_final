import Modal from "../Modal/Modal";
import Form from "../Form/Form";
import "./ModalWithForm.css";

function ModalWithForm({
  isOpen,
  onClose,
  title,
  onSubmit,
  submitText,
  children,
  altActionText,
  onAltAction,
  isValid,
  titleAlignLeft,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Form onSubmit={onSubmit} className="modal__form">
        <h2
          className="modal__title"
          style={titleAlignLeft ? { alignSelf: "flex-start" } : {}}
        >
          {title}
        </h2>

        <fieldset className="modal__fieldset">{children}</fieldset>

        <button
          className={`modal__submit ${isValid ? "modal__submit_active" : ""}`}
          type="submit"
          disabled={!isValid}
        >
          {submitText}
        </button>

        {altActionText && (
          <div className="modal__alt-action">
            <span className="modal__alt-text">or </span>
            <button
              className="modal__alt-button"
              type="button"
              onClick={onAltAction}
            >
              {altActionText}
            </button>
          </div>
        )}
      </Form>
    </Modal>
  );
}

export default ModalWithForm;
