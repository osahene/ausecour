import React from "react";
// import logo from './logo.svg';
import MainPage from "./components/home";
import ActionButton from "./components/calltoaction";
import "./App.css";
import HeaderBar from "./components/navbar/headerbar";
function App() {
  return (
    <div>
      <div>
        <HeaderBar />
      </div>
      <div className="App">
        <header className="App-header">
          <MainPage />
          <ActionButton />
        </header>
      </div>
    </div>
  );
}

export default App;
