// import React, { useState } from "react";
// import ModalWithForm from "../ModalWithForm/ModalWithForm";
// import Input from "../Input/input";

// function SignInModal({ isOpen, onClose, onLogin, onAltAction }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const isValid = email.trim() && password.trim();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (isValid) {
//       onLogin({ email, password });
//     }
//   };

//   return (
//     <ModalWithForm
//       isOpen={isOpen}
//       onClose={onClose}
//       title="Sign in"
//       submitText="Sign in"
//       onSubmit={handleSubmit}
//       altText="or"
//       altActionText="Sign up"
//       onAltAction={onAltAction}
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
//     </ModalWithForm>
//   );
// }

// export default SignInModal;
// import React, { useState } from "react";
// import ModalWithForm from "../ModalWithForm/ModalWithForm";
// import Input from "../Input/input";

// function SignInModal({ isOpen, onClose, onLogin, onSwitchToSignUp }) {
//   const [formValues, setFormValues] = useState({ email: "", password: "" });

//   useEffect(() => {
//     if (isOpen) {
//       setFormValues({ email: "", password: "" });
//     }
//   }, [isOpen]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormValues({ ...formValues, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onLogin(formValues);
//   };

//   return (
//     <ModalWithForm
//       isOpen={isOpen}
//       onClose={onClose}
//       title="Sign in"
//       submitText="Sign in"
//       onSubmit={handleSubmit}
//       altActionText="Sign up"
//       onAltAction={onSwitchToSignUp}
//     >
//       <Input
//         label="Email"
//         type="email"
//         name="email"
//         value={formValues.email}
//         onChange={handleChange}
//         placeholder="Enter email"
//       />
//       <Input
//         label="Password"
//         type="password"
//         name="password"
//         value={formValues.password}
//         onChange={handleChange}
//         placeholder="Enter password"
//       />
//     </ModalWithForm>
//   );
// }

// export default SignInModal;
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
