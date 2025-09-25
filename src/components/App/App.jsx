import { useState, useEffect } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import About from "../About/About";
import Footer from "../Footer/Footer";
import SignInModal from "../SignInModal/SignInModal";
import SignUpModal from "../SignUpModal/SignUpModal";
import getArticles from "../../utils/newsApi";
import Results from "../Results/Results";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  // Auth/Modal state (unchanged)
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  // News search state
  const [articles, setArticles] = useState([]);
  const [visibleCount, setVisibleCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  // Saved articles state
  const [savedArticles, setSavedArticles] = useState([]);

  // Modal logic (unchanged)
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
    setCurrentUser({ email });
    closeModals();
  };
  const handleSignUp = ({ email, password, name }) => {
    setIsLoggedIn(true);
    setCurrentUser({ email, name });
    closeModals();
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser({});
  };

  // News search logic
  const handleSearch = async (keyword) => {
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
        setError("Nothing Found");
      } else {
        setArticles(results);
        setVisibleCount(3);
      }
    } catch (err) {
      setError(
        "Sorry, something went wrong during the request. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };
  const handleShowMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, articles.length));
  };

  const handleSaveArticle = (article) => {
    // optional: avoid duplicates
    setSavedArticles((prev) => {
      // check by URL (or some unique id)
      if (prev.some((a) => a.url === article.url)) {
        return prev;
      }
      return [article, ...prev];
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
          setLoggedIn(true);
        })
        .catch(() => {
          setLoggedIn(false);
        });
    }
  }, []);

  return (
    <div className="app">
      <button onClick={() => setLoggedIn((prev) => !prev)}>
        {loggedIn ? "Log out (fake)" : "Log in (fake)"}
      </button>
      <Header
        onSignInClick={openSignInModal}
        loggedIn={isLoggedIn}
        onSignOutClick={handleLogout}
      />
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
    </div>
  );
}

export default App;
