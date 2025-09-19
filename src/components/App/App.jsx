import { useState } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import About from "../About/About";
import "./App.css";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSignInClick = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="page">
        <Header onSignInClick={handleSignInClick} />
        <main className="page__content">
          <Main />
        </main>
        <About />
        <Footer />
      </div>
      {isModalOpen && (
        <ModalWithForm
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title="Sign in"
          submitText="Sign in"
          altText="or"
          altActionText="Sign up"
          onSubmit={() => handleCloseModal()}
          onAltAction={() => {}}
        />
      )}
    </>
  );
}

export default App;
