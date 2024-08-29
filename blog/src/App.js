// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Main from './pages/Main';
import Weather from './pages/Weather';
import Clothes from './pages/Clothes';
import Health from './pages/Health';
import Login from './pages/Login';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/clothes" element={<Clothes />} />
          <Route path="/health" element={<Health />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
