import React, { useState, useEffect } from "react";
import "./SearchForm.css";

function SearchForm({ onSearch, isLoading }) {
  const [keyword, setKeyword] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [touched, setTouched] = useState(false); // new state

  // Validate whenever keyword changes
  useEffect(() => {
    setIsValid(keyword.trim().length > 0);
  }, [keyword]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(true); // mark that the form was submitted/touched
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
      {touched && !isValid && (
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
