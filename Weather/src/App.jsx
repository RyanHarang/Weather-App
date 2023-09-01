import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const apiKey = "04d6486432cd4ff9b431962dd1003d3a";
  const city = "Washington";
  const country = "US";

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${apiKey}&units=imperial`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setWeatherData(data))
      .catch((error) => console.error("API Error:", error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather App</h1>
        {weatherData && (
          <div>
            <p>
              Location: {city}, {country}
            </p>
            <p>Temperature: {weatherData.main.temp} °F</p>
            <p>Weather: {weatherData.weather[0].description}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
