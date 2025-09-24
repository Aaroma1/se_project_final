// import React, { useState } from "react";
// import ModalWithForm from "../ModalWithForm/ModalWithForm";
// import Input from "../Input/input";

// function SignUpModal({ isOpen, onClose, onSignUp, onSwitchToSignIn }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");

//   const isValid = email.trim() && password.trim() && name.trim();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (isValid) {
//       onRegister({ email, password, name });
//     }
//   };

//   return (
//     <ModalWithForm
//       isOpen={isOpen}
//       onClose={onClose}
//       title="Sign up"
//       submitText="Sign up"
//       onSubmit={handleSubmit}
//       altText="or"
//       altActionText="Sign in"
//       onAltAction={onSwitchToSignIn}
//       isValid={isValid}
//     >
//       <Input
//         label="Email"
//         name="email"
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="Enter email"
//       />
//       <Input
//         label="Password"
//         name="password"
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         placeholder="Enter password"
//       />
//       <Input
//         label="Name"
//         name="name"
//         type="text"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         placeholder="Enter your name"
//       />
//     </ModalWithForm>
//   );
// }

// export default SignUpModal;

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
