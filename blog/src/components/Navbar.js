// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li><Link to="/">Main</Link></li>
        <li><Link to="/weather">Weather</Link></li>
        <li><Link to="/clothes">Clothes</Link></li>
        <li><Link to="/health">Health</Link></li>
        <li><Link to="/login">Login</Link></li> {/* 로그인 링크 추가 */}
      </ul>
    </nav>
  );
};

export default Navbar;
