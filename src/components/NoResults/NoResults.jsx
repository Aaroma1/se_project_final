import "./NoResults.css";

function NoResults() {
  return (
    <div className="no-results">
      <img
        src={`${import.meta.env.BASE_URL}Images/NotFound.svg`}
        alt="Not found"
        className="no-results__missing-image"
      />
      <h3 className="no-results__missing-title">Nothing Found</h3>
      <p className="no-results__missing-text">
        Sorry, but nothing matched
        <br />
        your search terms.
      </p>
    </div>
  );
}

export default NoResults;
