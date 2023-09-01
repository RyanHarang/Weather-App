import React, { useState, useEffect } from "react";
import LocationSearch from "./components/LocationSearch";
import GeoParser from "./components/GeoParser";
import "./css/App.css";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState("Seattle");
  const [selectedCountry, setSelectedCountry] = useState("US");
  const [locations, setLocations] = useState([]); // Use state to store the locations
  const apiKey = "04d6486432cd4ff9b431962dd1003d3a";

  useEffect(() => {
    // Fetch the text file's content
    fetch("cities100000.txt")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.text();
      })
      .then((data) => {
        // Parse the data using your parsing function
        const parsedLocations = GeoParser(data);
        setLocations(parsedLocations); // Store the parsed locations in state
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${selectedLocation},${selectedCountry}&APPID=${apiKey}&units=imperial`
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
        <LocationSearch
          setSelectedLocation={setSelectedLocation}
          setSelectedCountry={setSelectedCountry}
          list={locations}
        />
        {weatherData && (
          <div>
            <p>
              Location: {selectedLocation}, {selectedCountry}
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
