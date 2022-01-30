import './App.css';
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Profile from './components/Profile';

function App() {

  const [color_theme, set_color_theme] = useState('theme-light');

  useEffect(() => {
    const current_theme = localStorage.getItem('theme-color');
    if (current_theme)
      set_color_theme(current_theme);
    document.body.classList.toggle('theme-dark')
  }, [color_theme]);

  const handler = (theme) => {
    set_color_theme(theme)
    localStorage.setItem('theme-color', theme);
  }

  return (
    <Router>
      <div className={`App ${color_theme}`}>
        <Navbar handler={handler} />
        <Routes>
          <Route path="/profile/" element={<Profile />} />
          <Route path="/" />
        </Routes>
      </div>
    </Router>

  );
}

export default App;
