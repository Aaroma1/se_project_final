// import { useState } from "react";
// import Header from "../Header/Header";
// import Main from "../Main/Main";
// import About from "../About/About";
// import "./App.css";
// import Footer from "../Footer/Footer";
// import ModalWithForm from "../ModalWithForm/ModalWithForm";

// function App() {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleSignInClick = () => setIsModalOpen(true);
//   const handleCloseModal = () => setIsModalOpen(false);

//   return (
//     <>
//       <div className="page">
//         <main className="page__content">
//           <Header onSignInClick={handleSignInClick} />
//           <Main />
//           <About />
//           <Footer />
//         </main>
//       </div>
//       {isModalOpen && (
//         <ModalWithForm
//           isOpen={isModalOpen}
//           onClose={handleCloseModal}
//           title="Sign in"
//           submitText="Sign in"
//           altText="or"
//           altActionText="Sign up"
//           onSubmit={() => handleCloseModal()}
//           onAltAction={() => {}}
//         />
//       )}
//     </>
//   );
// }

// export default App;
// import { useState } from "react";
// import Header from "../Header/Header";
// import Main from "../Main/Main";
// import About from "../About/About";
// import Footer from "../Footer/Footer";
// import SignInModal from "../SignInModal/SignInModal";
// import SignUpModal from "../SignUpModal/SignUpModal";

// function App() {
//   const [isSignInOpen, setIsSignInOpen] = useState(false);
//   const [isSignUpOpen, setIsSignUpOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [currentUser, setCurrentUser] = useState({});

//   // Open modals
//   const openSignInModal = () => {
//     setIsSignInOpen(true);
//     setIsSignUpOpen(false);
//   };

//   const openSignUpModal = () => {
//     setIsSignUpOpen(true);
//     setIsSignInOpen(false);
//   };

//   const closeModals = () => {
//     setIsSignInOpen(false);
//     setIsSignUpOpen(false);
//   };

//   // Sign-in / Sign-up handlers
//   const handleSignIn = ({ email, password }) => {
//     setIsLoggedIn(true);
//     setCurrentUser({ email }); // simple front-end mock
//     closeModals();
//   };

//   const handleSignUp = ({ email, password, username }) => {
//     setIsLoggedIn(true);
//     setCurrentUser({ email, username }); // simple front-end mock
//     closeModals();
//   };

//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     setCurrentUser({});
//   };

//   return (
//     <>
//       <div className="page">
//         <main className="page__content">
//           <Header
//             onSignInClick={openSignInModal}
//             isLoggedIn={isLoggedIn}
//             onLogout={handleLogout}
//           />
//           <Main />
//           <About />
//           <Footer />
//         </main>
//       </div>

//       {/* Sign In Modal */}
//       <SignInModal
//         isOpen={isSignInOpen}
//         onClose={closeModals}
//         onSignIn={handleSignIn}
//         onSwitchToSignUp={openSignUpModal}
//       />

//       {/* Sign Up Modal */}
//       <SignUpModal
//         isOpen={isSignUpOpen}
//         onClose={closeModals}
//         onSignUp={handleSignUp}
//         onSwitchToSignIn={openSignInModal}
//       />
//     </>
//   );
// }

// export default App;
import { useState } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import About from "../About/About";
import Footer from "../Footer/Footer";
import SignInModal from "../SignInModal/SignInModal";
import SignUpModal from "../SignUpModal/SignUpModal";

function App() {
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  // 🔹 Open modals
  const openSignInModal = () => {
    setIsSignInOpen(true);
    setIsSignUpOpen(false);
  };

  const openSignUpModal = () => {
    setIsSignUpOpen(true);
    setIsSignInOpen(false);
  };

  // 🔹 Close all modals
  const closeModals = () => {
    setIsSignInOpen(false);
    setIsSignUpOpen(false);
  };

  // 🔹 Sign-in handler
  const handleSignIn = ({ email, password }) => {
    setIsLoggedIn(true);
    setCurrentUser({ email }); // Mock user
    closeModals();
  };

  // 🔹 Sign-up handler
  const handleSignUp = ({ email, password, name }) => {
    setIsLoggedIn(true);
    setCurrentUser({ email, name }); // Mock user
    closeModals();
  };

  // 🔹 Logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser({});
  };

  return (
    <>
      <div className="page">
        <main className="page__content">
          <Header
            onSignInClick={openSignInModal}
            loggedIn={isLoggedIn}
            onSignOutClick={handleLogout}
          />
          <Main />
          <About />
          <Footer />
        </main>
      </div>

      {/* 🔹 Sign In Modal */}
      <SignInModal
        isOpen={isSignInOpen}
        onClose={closeModals}
        onSignIn={handleSignIn}
        onSwitchToSignUp={openSignUpModal}
      />

      {/* 🔹 Sign Up Modal */}
      <SignUpModal
        isOpen={isSignUpOpen}
        onClose={closeModals}
        onSignUp={handleSignUp}
        onSwitchToSignIn={openSignInModal}
      />
    </>
  );
}

export default App;
