// import { useState } from "react";
// import "./NewsCard.css";

// function NewsCard({ article, loggedIn, isSaved, onSave, onRemove }) {
//   const [showTooltip, setShowTooltip] = useState(false);

//   const handleSaveClick = (e) => {
//     e.preventDefault();
//     if (!loggedIn) {
//       setShowTooltip(true);
//       return;
//     }
//     if (isSaved) {
//       onRemove(article); // remove from saved
//     } else {
//       onSave(article); // save to saved
//     }
//   };

//   return (
//     <div className="newscard">
//       <a href={article.url} target="_blank" rel="noopener noreferrer">
//         <img
//           className="newscard__image"
//           src={article.urlToImage}
//           alt={article.title}
//         />
//         <div className="newscard__content">
//           <h2 className="newscard__date">
//             {new Date(article.publishedAt).toLocaleDateString("en-US", {
//               month: "long",
//               day: "numeric",
//               year: "numeric",
//             })}
//           </h2>
//           <h3 className="newscard__title">{article.title}</h3>
//           <p className="newscard__description">{article.description}</p>
//           <p className="newscard__source">{article.source?.name}</p>
//         </div>
//       </a>

//       {/* Save/Remove button */}
//       <button
//         className={`newscard__save-btn ${
//           !loggedIn
//             ? "newscard__save-btn_inactive"
//             : isSaved
//             ? "newscard__save-btn_saved"
//             : "newscard__save-btn_active"
//         }`}
//         onClick={handleSaveClick}
//         onMouseEnter={() => !loggedIn && setShowTooltip(true)}
//         onMouseLeave={() => setShowTooltip(false)}
//         type="button"
//       />

//       {/* Tooltip */}
//       {showTooltip && !loggedIn && (
//         <span className="newscard__tooltip">Sign in to save articles</span>
//       )}
//     </div>
//   );
// }

// export default NewsCard;

import { useState } from "react";
import "./NewsCard.css";

function NewsCard({
  article,
  loggedIn,
  isSaved,
  onSave,
  onRemove,
  isSavedPage,
}) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [showDeleteTooltip, setShowDeleteTooltip] = useState(false);

  const handleSaveClick = (e) => {
    e.preventDefault();
    if (!loggedIn) {
      setShowTooltip(true);
      return;
    }
    if (isSaved) {
      onRemove(article); // remove from saved
    } else {
      onSave(article); // save to saved
    }
  };

  const handleDeleteClick = (e) => {
    e.preventDefault();
    onRemove(article);
  };

  return (
    <div className="newscard">
      {/* Keyword badge for saved articles */}
      {isSavedPage && article.keyword && (
        <div className="newscard__keyword">{article.keyword}</div>
      )}
      <a href={article.url} target="_blank" rel="noopener noreferrer">
        <img
          className="newscard__image"
          src={article.urlToImage}
          alt={article.title}
        />
        <div className="newscard__content">
          <h2 className="newscard__date">
            {new Date(article.publishedAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </h2>
          <h3 className="newscard__title">{article.title}</h3>
          <p className="newscard__description">{article.description}</p>
          <p className="newscard__source">{article.source?.name}</p>
        </div>
      </a>

      {/* If on Saved Articles page → delete button */}
      {isSavedPage ? (
        <div className="newscard__delete-container">
          <button
            className="newscard__delete-btn"
            onClick={handleDeleteClick}
            onMouseEnter={() => setShowDeleteTooltip(true)}
            onMouseLeave={() => setShowDeleteTooltip(false)}
            type="button"
          />
          {showDeleteTooltip && (
            <span className="newscard__delete-tooltip">Remove from saved</span>
          )}
        </div>
      ) : (
        <>
          {/* Save button (Results page) */}
          <button
            className={`newscard__save-btn ${
              !loggedIn
                ? "newscard__save-btn_inactive"
                : isSaved
                ? "newscard__save-btn_saved"
                : "newscard__save-btn_active"
            }`}
            onClick={handleSaveClick}
            onMouseEnter={() => !loggedIn && setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            type="button"
          />

          {/* Tooltip */}
          {showTooltip && !loggedIn && (
            <span className="newscard__tooltip">Sign in to save articles</span>
          )}
        </>
      )}
    </div>
  );
}

export default NewsCard;
