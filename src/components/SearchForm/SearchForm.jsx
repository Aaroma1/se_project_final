import { useState, useEffect } from "react";
import "./SearchForm.css";

function SearchForm({ onSearch, isLoading }) {
  const [keyword, setKeyword] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    const len = keyword.trim().length;
    setIsValid(len >= 2 && len <= 50);
  }, [keyword]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(true);
    if (isValid && onSearch) {
      onSearch(keyword.trim());
    }
  };

  return (
    <form className="search" onSubmit={handleSubmit} noValidate>
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
        minLength={2}
        maxLength={50}
      />
      {touched && keyword.trim().length < 2 && (
        <span className="search__error">
          Please enter at least 2 characters
        </span>
      )}
      {touched && keyword.trim().length > 60 && (
        <span className="search__error">
          Please enter no more than 60 characters
        </span>
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
