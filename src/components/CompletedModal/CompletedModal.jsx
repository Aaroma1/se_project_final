import React from "react";
import Modal from "../Modal/Modal";
import "./CompletedModal.css";

function CompletedModal({ isOpen, onClose, onSignIn }) {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="completed-modal">
        <h2 className="completed-modal__title">
          Registration successfully completed!
        </h2>
        <button
          className="completed-modal__signin"
          type="button"
          onClick={onSignIn}
        >
          Sign in
        </button>
      </div>
    </Modal>
  );
}

export default CompletedModal;
