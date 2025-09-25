import React from "react";
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
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Form onSubmit={onSubmit} className="modal__form">
        <h2 className="modal__title">{title}</h2>

        <fieldset className="modal__fieldset">
          {children /* inputs go here */}
        </fieldset>

        <button className="modal__submit" type="submit">
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
