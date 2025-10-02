import { useEffect } from "react";
import "./Modal.css";

function Modal({ isOpen, onClose, children }) {
  useEffect(() => {
    if (!isOpen) return;
    function handleEsc(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal__container" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal__close"
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
