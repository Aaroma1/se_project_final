import React from "react";
import "../SearchForm/SearchForm.css";

function SearchForm() {
  return (
    <form className="search__form">
      <label
        htmlFor="search-input"
        className="search__label"
        style={{ display: "none" }}
      >
        Search news
      </label>
      <input
        id="search-input"
        className="search__input"
        type="text"
        placeholder="Enter topic"
        aria-label="Search news"
        required
      />
      <button className="search__button" type="submit">
        Search
      </button>
    </form>
  );
}

export default SearchForm;
