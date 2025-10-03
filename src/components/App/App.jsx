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
import SavedArticles from "../SavedArticles/SavedArticles"; // <-- NEW
import getArticles from "../../utils/newsApi";

import "./App.css";

function App() {
  const navigate = useNavigate();

  // Auth state
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  // Modal state
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isCompletedModalOpen, setIsCompletedModalOpen] = useState(false);

  // News search state
  const [articles, setArticles] = useState([]);
  const [visibleCount, setVisibleCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  // Saved articles state
  const [savedArticles, setSavedArticles] = useState([]);
  // Track last search keyword
  const [lastKeyword, setLastKeyword] = useState("");

  // ---------- Modal logic ----------
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
  };

  const handleSignIn = ({ email, password }) => {
    setIsLoggedIn(true);
    setCurrentUser({ email, name: "Demo User" });
    closeModals();
  };

  const handleSignUp = ({ email, password, name }) => {
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
    navigate("/"); // back to home after logout
  };

  // ---------- News search logic ----------
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

  // ---------- Saved articles logic ----------
  const handleSaveArticle = (article) => {
    setSavedArticles((prev) => {
      if (prev.some((a) => a.url === article.url)) {
        return prev;
      }
      // Attach the last search keyword
      return [{ ...article, keyword: lastKeyword }, ...prev];
    });
  };

  const handleRemoveArticle = (article) => {
    setSavedArticles((prev) => prev.filter((a) => a.url !== article.url));
  };

  // ---------- Check token on mount ----------
  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("jwt");
    if (tokenFromStorage) {
      auth
        .checkToken(tokenFromStorage)
        .then((res) => {
          setCurrentUser(res);
          setLoggedIn(true);
          setIsLoggedIn(true);
        })
        .catch(() => {
          setLoggedIn(false);
          setIsLoggedIn(false);
        });
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        {/* TEMP test button, you can delete later */}
        <button
          onClick={() => {
            setLoggedIn((prev) => !prev);
            setIsLoggedIn((prev) => !prev);
          }}
        >
          {loggedIn ? "Log out (fake)" : "Log in (fake)"}
        </button>

        {/* Header always visible */}
        <Header
          onSignInClick={openSignInModal}
          loggedIn={isLoggedIn}
          onSignOutClick={handleLogout}
        />

        {/* Routes handle page switching */}
        <Routes>
          {/* Home */}
          <Route
            path="/"
            element={
              <>
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
              </>
            }
          />

          {/* Saved Articles (only accessible when logged in) */}
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

        <Footer />

        {/* Modals */}
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
