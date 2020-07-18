import React from "react";
import { Router } from "@reach/router";
import socketClient from "socket.io-client";

import "./App.css";
import { AuthPage, MainPage } from "./pages";
import { User } from "./interfaces/user";

function App() {
  const userJson = localStorage.getItem("user");
  const socket = socketClient("/");
  if (!userJson) return <AuthPage />;

  const user: User = JSON.parse(userJson);

  return (
    <Router>
      <MainPage path="/" user={user} socket={socket} />
    </Router>
  );
}

export default App;
