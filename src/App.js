import React, { useState } from "react";
import axios from "axios"; // Import axios

function App() {
  //const api_url = 'https://api.openweathermap.org/data/2.5/weather?q=chambéry&appid={c8767ecf3fe8ac92944b5668e9ea1173&lang=fr&units=metric}';

  return (
    <div className="App">
      <div className="container">
        <h1>Weather App</h1>
        <div className="top">
          <div className="location">
            <p>Chambéry</p>
          </div>
          <div className="temp">
            <p>20°C</p>
          </div>
          <div className="description">
            <p>Ensoleillé</p>
          </div>
        </div>
        <div className="bottom">
          <div className="feels">
            <p>25°C</p>
          </div>
          <div className="humidity">
            <p>35%</p>
          </div>
          <div className="wind">
            <p>10km/h</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
