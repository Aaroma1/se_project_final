import { useEffect, useState } from "react";
import Preloader from "../Preloader/Preloader";
import NewsCard from "../NewsCard/NewsCard";
import NoResults from "../NoResults/NoResults"; // import here
import "./Results.css";

function Results({
  loading,
  error,
  hasSearched,
  articles,
  visibleCount,
  onShowMore,
  loggedIn,
  savedArticles,
  onSave,
  onRemove,
}) {
  const [displayedArticles, setDisplayedArticles] = useState([]);

  useEffect(() => {
    setDisplayedArticles(articles.slice(0, visibleCount));
  }, [articles, visibleCount]);

  if (!hasSearched) return null;

  // If there are no results, only render NoResults (not wrapped in .results)
  if (!loading && !error && displayedArticles.length === 0 && hasSearched) {
    return <NoResults />;
  }

  return (
    <section className="results">
      {loading && <Preloader />}

      {!loading && error && (
        <p className="results__message results__message--error">{error}</p>
      )}

      {!loading && !error && displayedArticles.length > 0 && (
        <>
          <div className="results__header-container">
            <h2 className="results__header">Search results</h2>
          </div>
          <div className="results__grid">
            {displayedArticles.map((article, index) => (
              <NewsCard
                key={index}
                article={article}
                loggedIn={loggedIn}
                isSaved={savedArticles.some((a) => a.url === article.url)}
                onSave={onSave}
                onRemove={onRemove}
                isSavedPage={false}
              />
            ))}
          </div>

          {visibleCount < articles.length && (
            <button
              onClick={onShowMore}
              className="results__show-more"
              type="button"
            >
              Show more
            </button>
          )}
        </>
      )}
    </section>
  );
}

export default Results;
