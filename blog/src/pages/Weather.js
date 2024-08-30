import React, { useState } from 'react';
import axios from 'axios';
import './Weather.css';
import citycode from './cityCode.json';
import sunImage from '../image/sun.png';
import cloudsImage from '../image/clouds.png';
import rainImage from '../image/rain.png';
import cloudmImage from '../image/cloudm.png';

function Weather() {
  const [city, setCity] = useState('');
  const [weathertmp, setWeathertmp] = useState(null);
  const [secondday, setSeondday] = useState(null);
  const [thridday, setThirdday] = useState(null);
  const [weatherwsd, setWeatherwsd] = useState(null);
  const [weatherpop, setWeatherpop] = useState(null);
  const [weatherreh, setWeatherreh] = useState(null);
  const [weathersky, setWeathersky] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentDay, setCurrentDay] = useState('');
  const [secondcurrentDay, setSecondCurrentDay] = useState('');
  const [thirdcurrentDay, setThirdCurrentDay] = useState('');

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
  };
  const getCurrentDate2 = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate() + 1).padStart(2, '0');
    return `${year}${month}${day}`;
  };

  const getCurrentDate3 = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate() + 2).padStart(2, '0');
    return `${year}${month}${day}`;
  };

  const getCurrentHour = () => {
    const today = new Date();
    const hours = String(today.getHours()).padStart(2, '0');
    return `${hours}00`;
  };

  const getCurrentDay = () => {
    const today = new Date();
    const days = [
      '일요일',
      '월요일',
      '화요일',
      '수요일',
      '목요일',
      '금요일',
      '토요일',
    ];
    return days[today.getDay()];
  };

  const getSecondCurrentDay = () => {
    const today = new Date();
    const days = [
      '일요일',
      '월요일',
      '화요일',
      '수요일',
      '목요일',
      '금요일',
      '토요일',
    ];
    return days[(today.getDay() + 1) % 7];
  };

  const getThirdCurrentDay = () => {
    const today = new Date();
    const days = [
      '일요일',
      '월요일',
      '화요일',
      '수요일',
      '목요일',
      '금요일',
      '토요일',
    ];
    return days[(today.getDay() + 2) % 7];
  };

  const fetchWeather = async () => {
    const API_KEY =
      'CRalAqLC8hP4aH%2FS0HU%2BQK38wOPgVNKto4YOMwg%2BlDc727TBqgZ7wBDnTnEKWPLv%2BlFaQ5twlYXRrXr2dycmTA%3D%3D';
    const baseDate = getCurrentDate();
    const baseTime = '0500';
    const fcstDate2 = getCurrentDate2();
    const fcstDate3 = getCurrentDate3();
    const fcstTime = getCurrentHour();
    const selectCity = citycode[city];
    const currentDay = getCurrentDay();
    const secondcurrentDay = getSecondCurrentDay();
    const thirdcurrentDay = getThirdCurrentDay();

    if (!selectCity) {
      setError('유효한 도시 이름을 입력해주세요.');
      return;
    } else {
      setError('');
    }

    const { nx, ny } = selectCity;

    const url = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${API_KEY}&pageNo=1&numOfRows=1000&dataType=JSON&base_date=${baseDate}&base_time=${baseTime}&nx=${nx}&ny=${ny}`;

    setLoading(true);
    try {
      const response = await axios.get(url);
      const data = response.data.response.body.items.item;

      const tempData = data.find(
        (item) => item.category === 'TMP' && item.fcstTime === fcstTime
      );
      const secondday = data.find(
        (item) =>
          item.category === 'TMP' &&
          item.fcstDate === fcstDate2 &&
          item.fcstTime === fcstTime
      );
      const thridday = data.find(
        (item) =>
          item.category === 'TMP' &&
          item.fcstDate === fcstDate3 &&
          item.fcstTime === fcstTime
      );
      const wsdData = data.find(
        (item) => item.category === 'WSD' && item.fcstTime === fcstTime
      );
      const popData = data.find(
        (item) => item.category === 'POP' && item.fcstTime === fcstTime
      );
      const rehData = data.find(
        (item) => item.category === 'REH' && item.fcstTime === fcstTime
      );
      const skyData = data.find(
        (item) => item.category === 'SKY' && item.fcstTime === fcstTime
      );

      if (tempData) {
        setWeathertmp(tempData.fcstValue);
      } else {
        setError('기온 데이터를 찾을 수 없습니다.');
        setWeathertmp(null);
      }
      if (secondday) {
        setSeondday(secondday.fcstValue);
      } else {
        setError('내일 기온 데이터를 찾을 수 없습니다.');
        setSeondday(null);
      }
      if (thridday) {
        setThirdday(thridday.fcstValue);
      } else {
        setError('모레 기온 데이터를 찾을 수 없습니다.');
        setThirdday(null);
      }
      if (wsdData) {
        setWeatherwsd(wsdData.fcstValue);
      } else {
        setError('풍속 데이터를 찾을 수 없습니다.');
        setWeatherwsd(null);
      }
      if (popData) {
        setWeatherpop(popData.fcstValue);
      } else {
        setError('강수확률 데이터를 찾을 수 없습니다.');
        setWeatherpop(null);
      }
      if (rehData) {
        setWeatherreh(rehData.fcstValue);
      } else {
        setError('습도 데이터를 찾을 수 없습니다.');
        setWeatherreh(null);
      }

      // POP에 따른 이미지 설정
      if (popData.fcstValue >= 40) {
        setWeatherIcon(rainImage);
      } else if (skyData) {
        switch (skyData.fcstValue) {
          case '1': // 맑음
            setWeatherIcon(sunImage);
            break;
          case '2': // 구름 조금
          case '3': // 구름 많음
            setWeatherIcon(cloudsImage);
            break;
          default:
            setWeatherIcon(cloudmImage);
            break;
        }
        setWeathersky(skyData.fcstValue);
      }

      setCurrentDay(currentDay);
      setSecondCurrentDay(secondcurrentDay);
      setThirdCurrentDay(thirdcurrentDay);
    } catch (err) {
      console.error('API 요청 오류:', err.message);
      setError('데이터를 가져오는 데 실패했습니다.');
      setWeathertmp(null);
      setWeatherwsd(null);
      setWeatherpop(null);
      setWeatherreh(null);
      setWeatherIcon(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <div className="Weather">
      <div className="weather-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="도시를 입력하세요"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit" disabled={loading}>
            {loading ? '로딩 중...' : '날씨 확인'}
          </button>
        </form>
        {error && <p>{error}</p>}
        {weathertmp && weatherwsd && weatherpop && weatherreh && (
          <div>
            <h1>{city}</h1>
            <div className="weather-temp">{weathertmp}°C</div>
            <div className="weather-info">
              <div>
                {weatherIcon && (
                  <img
                    src={weatherIcon}
                    alt="Weather Icon"
                    className="weather-icon"
                  />
                )}
              </div>
            </div>
            <div>
              <p>{`강수확률: ${weatherpop}%`}</p>
            </div>
            <div className="weather-details">
              <div className="weather-day">
                <p>{currentDay}</p>
                <p>{weathertmp}°C</p>
              </div>
              <div className="separator"></div>
              <div className="weather-day">
                <p>{secondcurrentDay}</p>
                <p>{secondday}°C</p>
              </div>
              <div className="separator"></div>
              <div className="weather-day">
                <p>{thirdcurrentDay}</p>
                <p>{thridday}°C</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Weather;
