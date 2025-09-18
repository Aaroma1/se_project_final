import React from "react";

function SearchForm() {
  return (
    <form className="search__form">
      <input
        className="search__input"
        type="text"
        placeholder="Enter topic"
        aria-label="Search news"
      />
      <button className="search__button" type="submit">
        Search
      </button>
    </form>
  );
}

export default SearchForm;
