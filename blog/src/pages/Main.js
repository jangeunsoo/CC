// src/pages/Main.js
import React from 'react';
import './Main.css';

const Main = () => {
  return (
    <div className="main-container">
      <div className="weather-information">
        <h1 className="weather-title">Today's Weather</h1>
        <div className="weather-details">
          <div className="weather-card">
            <h2>Location: Seoul</h2>
            <p>Temperature: 25°C</p>
            <p>Condition: Sunny</p>
          </div>
          {/* 여기에 더 많은 날씨 카드나 정보를 추가할 수 있습니다. */}
        </div>
      </div>
    </div>
  );
};

export default Main;
