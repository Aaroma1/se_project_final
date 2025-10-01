import React from "react";
import "./NoResults.css";

function NoResults() {
  return (
    <div className="results__background">
      <img
        src="/pictures/NothingFound.png"
        alt="Not found"
        className="results__missing-image"
      />
      <h3 className="results__missing-title">Nothing Found</h3>
      <p className="results__missing-text">
        Sorry, but nothing matched
        <br />
        your search terms.
      </p>
    </div>
  );
}

export default NoResults;
