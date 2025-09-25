import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import Input from "../Input/input";

function SignUpModal({ isOpen, onClose, onSignUp, onSwitchToSignIn }) {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    name: "",
  });

  useEffect(() => {
    if (isOpen) {
      setFormValues({ email: "", password: "", name: "" });
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formValues.email && formValues.password && formValues.name) {
      onSignUp(formValues);
    }
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Sign up"
      submitText="Sign up"
      onSubmit={handleSubmit}
      altActionText="Sign in"
      onAltAction={onSwitchToSignIn}
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
      <Input
        label="Name"
        type="text"
        name="name"
        value={formValues.name}
        onChange={handleChange}
        placeholder="Enter your name"
      />
    </ModalWithForm>
  );
}

export default SignUpModal;
