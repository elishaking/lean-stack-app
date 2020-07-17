import React from "react";
import { Router } from "@reach/router";

import "./App.css";
import { MainPage } from "./pages/main";

function App() {
  return (
    <Router>
      <MainPage path="/" />
    </Router>
  );
}

export default App;
