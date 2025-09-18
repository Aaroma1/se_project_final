import React from "react";
import "./Main.css";
import SearchForm from "../SearchForm/SearchForm";

function Main() {
  return (
    <>
      <div className="main__background" />
      <div className="main">
        <h2 className="main__title">What's going on in the world?</h2>
        <p className="main__subtitle">
          Find the latest news on any topic and save them in your personal
          account.
        </p>
        <SearchForm />
      </div>
    </>
  );
}

export default Main;
