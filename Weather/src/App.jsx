import React, { useState, useEffect } from "react";
import LocationSearch from "./components/LocationSearch";
import GeoParser from "./components/GeoParser";
import "./css/App.css";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState("Bellevue");
  const apiKey = "04d6486432cd4ff9b431962dd1003d3a";
  const country = "US";

  useEffect(() => {
    // Simulate reading data from a file
    const data = `
      12345\tBellevue\tUS\t47.6104\t-122.2007
      67890\tNew York\tUS\t40.7128\t-74.0060
      // ... other data lines
    `;

    const locations = parseGeoNamesData(data);
    // Use the parsed data in your application
    console.log(locations);
  }, []);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${selectedLocation},${country}&APPID=${apiKey}&units=imperial`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setWeatherData(data))
      .catch((error) => console.error("API Error:", error));
  }, [selectedLocation]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather App</h1>
        <LocationSearch setSelectedLocation={setSelectedLocation} />
        {weatherData && (
          <div>
            <p>
              Location: {selectedLocation}, {country}
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
