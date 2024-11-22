import React from "react";
// import logo from './logo.svg';
import MainPage from "./components/home";
import ActionButton from "./components/calltoaction";
import "./App.css";
import HeaderBar from "./components/navbar/headerbar";
import { useAuth } from "./AuthContext";

function App() {
  const { isAuthenticated } = useAuth();
  return (
    <div className="app-container">
      <HeaderBar />
      <div className="App">
        <header className="App-header sm:h-screen sm:h-full">
          <MainPage />
          {isAuthenticated && <ActionButton />}
        </header>
      </div>
    </div>
  );
}

export default App;
