// import React from "react";
// import "../SearchForm/SearchForm.css";

// function SearchForm() {
//   return (
//     <form className="search__form">
//       <label
//         htmlFor="search-input"
//         className="search__label"
//         style={{ display: "none" }}
//       >
//         Search news
//       </label>
//       <input
//         id="search-input"
//         className="search__input"
//         type="text"
//         placeholder="Enter topic"
//         aria-label="Search news"
//         required
//       />
//       <button className="search__button" type="submit">
//         Search
//       </button>
//     </form>
//   );
// }

// export default SearchForm;
import React, { useState, useEffect } from "react";
import "./SearchForm.css";

function SearchForm({ onSearch, isLoading }) {
  const [keyword, setKeyword] = useState("");
  const [isValid, setIsValid] = useState(false);

  // Check validity whenever keyword changes
  useEffect(() => {
    setIsValid(keyword.trim().length > 0);
  }, [keyword]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid && onSearch) {
      onSearch(keyword.trim());
    }
  };

  return (
    <form className="search__form" onSubmit={handleSubmit} noValidate>
      <label htmlFor="search-input" className="search__label" hidden>
        Search news
      </label>
      <input
        id="search-input"
        className="search__input"
        type="text"
        placeholder="Enter topic"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        disabled={isLoading}
        required
      />
      {!isValid && (
        <span className="search__error">Please enter a keyword</span>
      )}
      <button
        className={`search__button ${
          isLoading || !isValid ? "search__button_disabled" : ""
        }`}
        type="submit"
        disabled={isLoading || !isValid}
      >
        {isLoading ? "Searching..." : "Search"}
      </button>
    </form>
  );
}

export default SearchForm;
