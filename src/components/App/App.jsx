import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";

import Header from "../Header/Header";
import Main from "../Main/Main";
import About from "../About/About";
import Footer from "../Footer/Footer";
import SignInModal from "../SignInModal/SignInModal";
import SignUpModal from "../SignUpModal/SignUpModal";
import CompletedModal from "../CompletedModal/CompletedModal";
import Results from "../Results/Results";
import SavedArticles from "../SavedArticles/SavedArticles";
import getArticles from "../../utils/newsApi";
import * as auth from "../../utils/auth";

import "./App.css";

function App() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isCompletedModalOpen, setIsCompletedModalOpen] = useState(false);

  const [articles, setArticles] = useState([]);
  const [visibleCount, setVisibleCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const [savedArticles, setSavedArticles] = useState([]);
  const [lastKeyword, setLastKeyword] = useState("");

  const openSignInModal = () => {
    setIsSignInOpen(true);
    setIsSignUpOpen(false);
  };
  const openSignUpModal = () => {
    setIsSignUpOpen(true);
    setIsSignInOpen(false);
  };
  const closeModals = () => {
    setIsSignInOpen(false);
    setIsSignUpOpen(false);
    setIsCompletedModalOpen(false);
  };

  const handleSignIn = ({ email }) => {
    setIsLoggedIn(true);
    setCurrentUser({ email, name: "Demo User" });
    closeModals();
  };

  const handleSignUp = ({ email, name }) => {
    setIsSignUpOpen(false);
    setIsCompletedModalOpen(true);
    setCurrentUser({ email, name });
  };

  const handleCompletedSignIn = () => {
    setIsCompletedModalOpen(false);
    setIsSignInOpen(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser({});
    navigate("/");
  };

  const handleSearch = async (keyword) => {
    setLastKeyword(keyword);
    if (!keyword.trim()) {
      setError("Please enter a keyword");
      setArticles([]);
      setHasSearched(false);
      return;
    }

    setLoading(true);
    setError("");
    setArticles([]);
    setVisibleCount(0);
    setHasSearched(true);

    try {
      const results = await getArticles(keyword);
      if (!results || results.length === 0) {
        setArticles([]);
        setVisibleCount(0);
      } else {
        setArticles(results);
        setVisibleCount(3);
      }
    } catch (err) {
      setError(
        "Sorry, something went wrong during the request. Please try again later."
      );
    } finally {
      setTimeout(() => setLoading(false), 300);
    }
  };

  const handleShowMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, articles.length));
  };

  const handleSaveArticle = (article) => {
    setSavedArticles((prev) => {
      if (prev.some((a) => a.url === article.url)) {
        return prev;
      }
      return [{ ...article, keyword: lastKeyword }, ...prev];
    });
  };

  const handleRemoveArticle = (article) => {
    setSavedArticles((prev) => prev.filter((a) => a.url !== article.url));
  };

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("jwt");
    if (tokenFromStorage) {
      auth
        .checkToken(tokenFromStorage)
        .then((res) => {
          setCurrentUser(res);
          setIsLoggedIn(true);
        })
        .catch(() => {
          setIsLoggedIn(false);
        });
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <header>
          <Header
            onSignInClick={openSignInModal}
            loggedIn={isLoggedIn}
            onSignOutClick={handleLogout}
            isModalOpen={isSignInOpen || isSignUpOpen || isCompletedModalOpen}
            onModalClose={closeModals}
          />
        </header>

        <Routes>
          <Route
            path="/"
            element={
              <main>
                <Main onSearch={handleSearch} isLoading={loading} />

                {hasSearched && (
                  <Results
                    loading={loading}
                    error={error}
                    hasSearched={hasSearched}
                    articles={articles}
                    visibleCount={visibleCount}
                    onShowMore={handleShowMore}
                    loggedIn={isLoggedIn}
                    savedArticles={savedArticles}
                    onSave={handleSaveArticle}
                    onRemove={handleRemoveArticle}
                  />
                )}

                <About />
              </main>
            }
          />

          <Route
            path="/saved-articles"
            element={
              isLoggedIn ? (
                <SavedArticles
                  currentUser={currentUser}
                  savedArticles={savedArticles}
                  onRemove={handleRemoveArticle}
                  loggedIn={isLoggedIn}
                />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>

        <footer>
          <Footer />
        </footer>

        <SignInModal
          isOpen={isSignInOpen}
          onClose={closeModals}
          onSignIn={handleSignIn}
          onSwitchToSignUp={openSignUpModal}
        />
        <SignUpModal
          isOpen={isSignUpOpen}
          onClose={closeModals}
          onSignUp={handleSignUp}
          onSwitchToSignIn={openSignInModal}
        />
        <CompletedModal
          isOpen={isCompletedModalOpen}
          onClose={() => setIsCompletedModalOpen(false)}
          onSignIn={handleCompletedSignIn}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
