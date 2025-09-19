import React, { useState } from "react";
import Modal from "../Modal/Modal";
import Form from "../Form/Form";
import "./ModalWithForm.css";

function ModalWithForm({
  isOpen = true,
  onClose = () => {},
  title,
  onSubmit,
  submitText,
  altText,
  altActionText,
  onAltAction,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isValid = email.trim() && password.trim();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid && onSubmit) onSubmit(e, { email, password });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Form onSubmit={handleSubmit} className="modal__form">
        <h2 className="modal__title">{title}</h2>
        <fieldset className="modal__fieldset">
          <label className="modal__label" htmlFor="email">
            Email
          </label>
          <input
            className="modal__input"
            id="email"
            type="email"
            placeholder="Enter email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="modal__label" htmlFor="password">
            Password
          </label>
          <input
            className="modal__input"
            id="password"
            type="password"
            placeholder="Enter password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </fieldset>
        <button
          className="modal__submit"
          type="submit"
          disabled={!isValid}
          style={isValid ? { background: "#2F71E5", color: "#fff" } : {}}
        >
          {submitText}
        </button>
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
      </Form>
    </Modal>
  );
}

export default ModalWithForm;
