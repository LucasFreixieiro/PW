import "./App.css";
import React, { useState, useEffect, createContext } from "react";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Profile from "./components/Profile/Profile";
import {
  UserProvider,
  useUserValue,
} from "./components/UserState/UserProvider";
import NotFound from "./components/AuxilaryPages/NotFound";
import Register from "./components/Authentication/Register";
import Login from "./components/Authentication/Login";
import NotAllowed from "./components/AuxilaryPages/NotAllowed";
import reducer, { initialState } from "./components/UserState/reducer";
import ToastTest from "./components/AuxilaryPages/ToastTest";
import GameManagementForm from "./components/Management/GameManagementForm";
import UserManagementForm from "./components/Management/UserManagementForm";
import PostCreationForm from "./components/Forum/PostCreationForm";
import MainPage from "./components/MainPage/MainPage";
import PostPage from "./components/Forum/PostPage";

function App() {
  const [color_theme, set_color_theme] = useState("theme-light");

  useEffect(() => {
    let current_theme = localStorage.getItem("theme-color");
    if (current_theme) {
      set_color_theme(current_theme);
    } else {
      localStorage.setItem("theme-color", "theme-light");
      current_theme = "theme-light";
    }
    if (!document.body.classList.contains(current_theme)) {
      document.body.className = "";
      document.body.classList.add(current_theme);
    }
  }, [color_theme]);

  const handler = (theme) => {
    set_color_theme(theme);
    localStorage.setItem("theme-color", theme);
  };

  return (
    <Router>
      <UserProvider initialState={initialState} reducer={reducer}>
        <div className={`App ${color_theme}`}>
          <Navbar handler={handler} />
          <Routes>
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/" element={<MainPage />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/403" element={<NotAllowed />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/game_management" element={<GameManagementForm />} />
            <Route path="/user_management" element={<UserManagementForm />} />
            <Route path="/submitPost" element={<PostCreationForm />} />
            <Route path="/post/:id" element={<PostPage />} />
          </Routes>
        </div>
      </UserProvider>
    </Router>
  );
}

export default App;
