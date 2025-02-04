import React, { useEffect, useState } from "react";

const getWeatherClass = (weatherIcon) => {
  const weatherClasses = {
    "01d": "sun",
    "01n": "night",
    "02d": "few_clouds",
    "02n": "clouds_night",
    "03d": "clouds",
    "03n": "clouds_night",
    "04d": "clouds",
    "04n": "clouds_night",
    "09d": "rain",
    "09n": "rain_night",
    "10d": "rain",
    "10n": "rain_night",
    "11d": "thunderstorm",
    "11n": "thunderstorm",
    "13d": "snow",
    "13n": "snow_night",
    "50d": "mist",
    "50n": "mist_night",
  };
  return weatherClasses[weatherIcon] || "default";
};

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Charger l'historique des recherches depuis le localStorage
    const storedHistory = JSON.parse(localStorage.getItem("weatherHistory")) || [];
    setHistory(storedHistory);
  }, []);

  return (
    <div className="history-container">
      <h2>Historique des recherches</h2>
      <ul>
        {history.map((item, index) => (
          <li
            key={index}
            className={`history-item ${getWeatherClass(item.icon)}`}
          >
            <div className="history-location">{item.city}</div>
            <div className="history-temp">{item.temp}°</div>
            <div className="history-description">{item.description}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;
