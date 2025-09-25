import React, { useEffect, useState } from "react";
import Preloader from "../Preloader/Preloader";
import NewsCard from "../NewsCard/NewsCard";

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

  return (
    <section className="results">
      {loading && <Preloader />}

      {!loading && error && (
        <p className="results__message results__message--error">{error}</p>
      )}

      {!loading && !error && displayedArticles.length > 0 && (
        <>
          <div className="results__grid">
            {displayedArticles.map((article, index) => (
              <NewsCard
                key={index}
                article={article}
                loggedIn={loggedIn}
                isSaved={savedArticles.some((a) => a.url === article.url)}
                onSave={onSave}
                onRemove={onRemove}
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

      {!loading && !error && displayedArticles.length === 0 && hasSearched && (
        <p className="results__message">Nothing Found</p>
      )}
    </section>
  );
}

export default Results;
