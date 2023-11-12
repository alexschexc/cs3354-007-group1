import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginSignup from "./components/LoginSignup/LoginSignup";

const App = () => {
  return (
      <div>
        <LoginSignup/>
      </div>
  );
};

export default App;