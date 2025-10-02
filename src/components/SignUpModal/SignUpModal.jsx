// export default SignUpModal;
import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import Input from "../Input/input";

function SignUpModal({ isOpen, onClose, onSignUp, onSwitchToSignIn }) {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    name: "",
  });

  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setFormValues({ email: "", password: "", name: "" });
      setEmailError("");
    }
  }, [isOpen]);

  const checkEmailAvailable = (email) => {
    // Replace with backend check later
    const valid = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.(com|edu)$/;
    return valid.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));

    if (name === "email") {
      if (!checkEmailAvailable(value)) {
        setEmailError("This email is not available");
      } else {
        setEmailError("");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formValues.email &&
      formValues.password.length >= 2 &&
      formValues.password.length <= 30 &&
      formValues.name.length >= 2 &&
      formValues.name.length <= 30 &&
      !emailError
    ) {
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
      titleAlignLeft={true}
      isValid={
        formValues.email &&
        !emailError &&
        formValues.password.length >= 2 &&
        formValues.password.length <= 30 &&
        formValues.name.length >= 2 &&
        formValues.name.length <= 30
      }
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
        minLength="2"
        maxLength="30"
        required
      />
      <Input
        label="Name"
        type="text"
        name="name"
        value={formValues.name}
        onChange={handleChange}
        placeholder="Enter your name"
        minLength="2"
        maxLength="30"
        required
      />
      {/* Error text positioned above submit button */}
      {emailError && (
        <span className="form__availability-error">{emailError}</span>
      )}
    </ModalWithForm>
  );
}

export default SignUpModal;
