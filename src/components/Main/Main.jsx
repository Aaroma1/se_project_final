import "./Main.css";
import SearchForm from "../SearchForm/SearchForm";

function Main({ onSearch, isLoading }) {
  return (
    <section className="main">
      <div className="main__background" />
      <h1 className="main__title">What&apos;s going on in the world?</h1>
      <p className="main__subtitle">
        Find the latest news on any topic and save them in your personal
        account.
      </p>
      <SearchForm onSearch={onSearch} isLoading={isLoading} />
    </section>
  );
}

export default Main;
