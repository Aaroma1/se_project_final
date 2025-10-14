import { useMemo } from "react";
import NewsCard from "../NewsCard/NewsCard";
import "./SavedArticles.css";

function SavedArticles({ currentUser, savedArticles, onRemove, loggedIn }) {
  const savedCount = savedArticles.length;

  const keywordSummary = useMemo(() => {
    if (savedArticles.length === 0) return "";

    const keywords = savedArticles.map((a) => a.keyword);
    const frequency = {};

    keywords.forEach((k) => {
      frequency[k] = (frequency[k] || 0) + 1;
    });

    const sorted = Object.keys(frequency).sort(
      (a, b) => frequency[b] - frequency[a]
    );

    if (sorted.length <= 2) {
      return sorted.join(", ");
    }
    return `${sorted[0]}, ${sorted[1]}, and ${sorted.length - 2} others`;
  }, [savedArticles]);

  return (
    <section className="saved">
      <div className="saved__container">
        <div className="saved__container-inner">
          <p className="saved__title">Saved articles</p>
          <h1 className="saved__heading">
            {currentUser?.name || "User"}, you have {savedCount} saved articles
          </h1>
          {savedCount > 0 ? (
            <p className="saved__text">
              By keywords:{" "}
              <span className="saved__keywords">{keywordSummary}</span>
            </p>
          ) : (
            <p className="saved__text">You have no saved articles yet.</p>
          )}
        </div>
      </div>

      <div className="saved__grid">
        {savedArticles.map((article, index) => (
          <NewsCard
            key={index}
            article={article}
            loggedIn={loggedIn}
            isSaved={true}
            onSave={() => {}}
            onRemove={onRemove}
            isSavedPage={true}
          />
        ))}
      </div>
    </section>
  );
}

export default SavedArticles;
