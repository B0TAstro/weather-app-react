import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const api_key = process.env.REACT_APP_WEATHER_API_KEY;
  const api_url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${api_key}&lang=fr&units=metric`;

  const getWeatherClass = () => {
    if (!data.weather) return "";

    const weatherId = data.weather[0].id;
    if (weatherId === 800) {
      return "sun";
    }
    if (weatherId >= 801 && weatherId <= 802) {
      return "few_clouds";
    }
    if (weatherId >= 803 && weatherId <= 804) {
      return "clouds";
    }
    if (weatherId >= 500 && weatherId <= 531) {
      return "rain";
    }
    if (weatherId >= 600 && weatherId <= 622) {
      return "snow";
    }
    if (weatherId >= 600 && weatherId <= 622) {
      return "mist";
    }
    if (weatherId >= 200 && weatherId <= 232) {
      return "thunderstorm";
    }
    return "";
  };

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(api_url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };

  return (
    <div className={`app ${getWeatherClass()}`}>
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Rechercher une ville"
          type="text"
        />
      </div>
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

        {data.name !== undefined && (
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
    </div>
  );
}

export default App;