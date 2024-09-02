import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Clothes = () => {
  const location = useLocation();
  const { tmp, pop } = location.state;
  const [advice, setAdvice] = useState("");

  const generateClotheshAdvice = () => {
    let advice = `오늘의 옷차림:\n`;

    switch (true) {
      case tmp > 28:
        advice += "민소매, 반팔, 반바지, 원피스를 입으세요. ";
        break;
      case tmp >= 23 && tmp <= 27:
        advice += "반팔, 얇은 셔츠, 반바지, 면바지를 입으세요. ";
        break;
      case tmp >= 20 && tmp < 23:
        advice += "얇은 가디건, 긴팔, 면바지, 청바지를 입으세요. ";
        break;
      case tmp >= 17 && tmp < 20:
        advice += "얇은 니트, 맨투맨, 가디건, 청바지를 입으세요. ";
        break;
      case tmp >= 12 && tmp < 17:
        advice += "코트, 가죽자켓, 히트텍 니트, 레깅스를 입으세요. ";
        break;
      case tmp >= 8 && tmp < 12:
        advice += "자켓, 트렌치코트, 야상, 니트, 청바지, 스타킹을 입으세요. ";
        break;
      case tmp >= 5 && tmp < 8:
        advice += "코트, 가죽자켓, 히트텍, 니트, 레깅스을 입으세요. ";
        break;
      case tmp <= 5:
        advice += "패딩, 두꺼운 코트, 목도리, 기모제품을 입으세요. ";
        break;
      default:
        advice += "온도 정보를 확인할 수 없습니다. ";
    }

    if (pop >= 40) {
      advice += "우산을 챙기세요. 비가 올 확률이 높습니다.";
    }

    setAdvice(advice);
  };

  useEffect(() => {
    generateClotheshAdvice();
  }, [tmp, pop]);

  return (
    <div className="app-container">
      <h1>날씨에 따른 옷차림</h1>
      <div className="weather-info">
        <p>온도: {tmp}°C</p>
        <p>강수확률: {pop}%</p>
      </div>
      <div className="advice">
        <pre>{advice}</pre>
      </div>
    </div>
  );
};

export default Clothes;