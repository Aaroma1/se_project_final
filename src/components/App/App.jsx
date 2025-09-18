import { useState } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import "./App.css";

function App() {
  return (
    <>
      <div className="page">
        <div className="page__content">
          <Header />
          <Main />
        </div>
      </div>
    </>
  );
}

export default App;
