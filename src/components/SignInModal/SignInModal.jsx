import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import Input from "../Input/input";

function SignInModal({ isOpen, onClose, onSignIn, onSwitchToSignUp }) {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  // Reset form whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setFormValues({ email: "", password: "" });
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formValues.email && formValues.password) {
      onSignIn(formValues);
    }
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Sign in"
      submitText="Sign in"
      onSubmit={handleSubmit}
      altActionText="Sign up"
      onAltAction={onSwitchToSignUp}
    >
      <Input
        label="Email"
        type="email"
        name="email"
        value={formValues.email}
        onChange={handleChange}
        placeholder="Enter email"
      />
      <Input
        label="Password"
        type="password"
        name="password"
        value={formValues.password}
        onChange={handleChange}
        placeholder="Enter password"
      />
    </ModalWithForm>
  );
}

export default SignInModal;
