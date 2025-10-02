// export default SignInModal;
import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import Input from "../Input/input";

function SignInModal({ isOpen, onClose, onSignIn, onSwitchToSignUp }) {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const [emailError, setEmailError] = useState("");

  // Reset form & errors whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setFormValues({ email: "", password: "" });
      setEmailError("");
    }
  }, [isOpen]);

  const validateEmail = (email) => {
    const emailRegex = /^[A-Za-z0-9._%+-]{2,30}@[A-Za-z0-9.-]+\.(com|edu)$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));

    if (name === "email") {
      if (!validateEmail(value)) {
        setEmailError("Invalid email address");
      } else {
        setEmailError("");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateEmail(formValues.email) && formValues.password) {
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
      isValid={
        validateEmail(formValues.email) && formValues.password.length > 0
      }
      titleAlignLeft={true}
    >
      <Input
        label="Email"
        type="email"
        name="email"
        value={formValues.email}
        onChange={handleChange}
        placeholder="Enter email"
      />
      {/* Error text for email */}
      {emailError && (
        <span
          style={{
            color: "#FF0000",
            fontFamily: "Inter",
            fontWeight: 400,
            fontSize: "12px",
            width: "173px",
            height: "14px",
            display: "block",
            marginTop: "-8px",
            marginBottom: "8px",
          }}
        >
          {emailError}
        </span>
      )}
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
    </ModalWithForm>
  );
}

export default SignInModal;
