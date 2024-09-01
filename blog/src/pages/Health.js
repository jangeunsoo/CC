import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Health.css";

function Health() {
  const [weatherData, setWeatherData] = useState(null);
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const API_KEY = "84ae597265a1bbd6a829e4214231a09f"; // 여기에 OpenWeatherMap API 키를 입력하세요.
    const latitude = 37.5665; // 서울의 위도
    const longitude = 126.978; // 서울의 경도

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

    axios
      .get(url)
      .then((response) => {
        console.log("API 응답:", response.data); // API 응답 확인
        const temperature = response.data.main.temp;
        const weathercode = response.data.weather[0].id;
        setWeatherData({ temperature, weathercode });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching the weather data:", error);
        setError("날씨 데이터를 불러오는 중 오류가 발생했습니다.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (weatherData) {
      generateHealthAdvice();
    }
  }, [weatherData]);

  const generateHealthAdvice = () => {
    const { temperature, weathercode } = weatherData;

    let advice = "오늘의 건강 관리 팁:\n";

    // 종합적인 조언 생성
    if (temperature > 30) {
      advice +=
        "- 오늘은 매우 덥습니다. 충분한 수분을 섭취하고, 시원한 장소에서 시간을 보내세요. ";
    } else if (temperature < 10) {
      advice +=
        "- 오늘은 춥습니다. 따뜻하게 입고, 외출 시 방한용품을 챙기세요. ";
    } else {
      advice += "- 기온이 적당합니다. 편안한 복장을 유지하세요. ";
    }

    switch (true) {
      case weathercode >= 200 && weathercode < 300: // 뇌우
        advice +=
          "뇌우가 예상됩니다. 외출을 자제하고, 안전한 장소에서 머무세요.\n";
        break;
      case weathercode >= 300 && weathercode < 600: // 이슬비 또는 비
        advice +=
          "비가 내립니다. 우산을 챙기고, 비가 많이 오는 지역은 피하세요.\n";
        break;
      case weathercode >= 600 && weathercode < 700: // 눈
        advice +=
          "눈이 내립니다. 외출 시 미끄럼 방지에 주의하고, 따뜻한 옷을 입으세요.\n";
        break;
      case weathercode >= 700 && weathercode < 800: // 안개
        advice +=
          "안개가 끼어 있습니다. 시야가 제한될 수 있으니, 운전 시 주의하세요.\n";
        break;
      case weathercode === 800: // 맑음
        advice +=
          "날씨가 맑습니다. 자외선 차단제를 바르고, 외출 시 가벼운 옷을 착용하세요.\n";
        break;
      case weathercode > 800: // 구름
        advice +=
          "구름이 많습니다. 날씨가 습할수도 있습니다. 불쾌지수를 확인하세요.\n";
        break;
      default:
        advice += "현재 날씨 상태를 확인하세요.\n";
        break;
    }

    setAdvice(advice);
  };

  return (
    <div className="app-container">
      <h1>날씨에 따른 건강 관리</h1>
      {loading ? (
        <p>날씨 데이터를 불러오는 중...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        weatherData && (
          <>
            <div className="weather-info">
              <p>온도: {weatherData.temperature}°C</p>
              <p>날씨 상태 코드: {weatherData.weathercode}</p>
            </div>
            <div className="advice">
              <pre>{advice}</pre>
            </div>
          </>
        )
      )}
    </div>
  );
}

export default Health;
