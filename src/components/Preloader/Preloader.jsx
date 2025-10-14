import "./Preloader.css";

function Preloader() {
  return (
    <div className="preloader__background" role="status" aria-live="polite">
      <i className="preloader__circle-preloader" />
      <p className="preloader__text">Searching for news...</p>
    </div>
  );
}

export default Preloader;
