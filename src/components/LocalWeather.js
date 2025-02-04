// src/components/LocalWeather.js

import React, { useState, useEffect } from "react";
import axios from "axios";

const LocalWeather = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [error, setError] = useState(null);

  const api_key = process.env.REACT_APP_WEATHER_API_KEY;

  const getWeatherClass = () => {
    if (!data.weather) return "default";
    const weatherIcon = data.weather[0].icon;
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

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Erreur de géolocalisation:", error);
          setError("La géolocalisation est nécessaire pour afficher la météo locale.");
        }
      );
    } else {
      setError("La géolocalisation n'est pas supportée par ce navigateur.");
    }
  }, []);

  useEffect(() => {
    if (location.lat && location.lon) {
      const api_url = `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${api_key}&lang=fr&units=metric`;
      axios.get(api_url).then((response) => {
        setData(response.data);
      });
    }
  }, [location, api_key]);

  return (
    <div className={`app ${getWeatherClass()}`}>
      {error ? (
        <div className="error-message">
          <p>{error}</p>
          <p>Veuillez activer la géolocalisation ou réessayer.</p>
        </div>
      ) : (
        <div className="container">
          <div className="top">
            <div className="location">
              <p>{data.name}</p>
            </div>
            <div className="temp">
              {data.main ? <h1>{Math.round(data.main.temp)}°C</h1> : null}
            </div>
            <div className="description">
              {data.weather ? <p>{data.weather[0].description}</p> : null}
            </div>
          </div>
          {data.name && (
            <div className="bottom">
              <div className="feels">
                {data.main ? <p className="bold">{Math.round(data.main.feels_like)}°C</p> : null}
                <p>Ressentie</p>
              </div>
              <div className="humidity">
                {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
                <p>Humidité</p>
              </div>
              <div className="wind">
                {data.wind ? <p className="bold">{Math.round(data.wind.speed)} KM/H</p> : null}
                <p>Vent</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LocalWeather;