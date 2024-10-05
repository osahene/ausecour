import React from "react";
// import logo from './logo.svg';
import MainPage from "./components/home";
import ActionButton from "./components/calltoaction";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <MainPage />
        <ActionButton />
      </header>
    </div>
  );
}

export default App;
