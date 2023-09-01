import React, { useState, useEffect } from "react";
import { FixedSizeList as List } from "react-window";
import LocationSearch from "./components/LocationSearch";
import GeoParser from "./components/GeoParser";
import "./css/LocationSearch.css";
import "./css/App.css";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState("Seattle");
  const [selectedAdmin1Code, setSelectedAdmin1Code] = useState("WA");
  const [selectedCountry, setSelectedCountry] = useState("US");
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const apiKey = "04d6486432cd4ff9b431962dd1003d3a";

  useEffect(() => {
    // Fetch the text file's content
    fetch("cities85000.txt")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.text();
      })
      .then((data) => {
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

  // Function to help with formatting
  function capFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // Sizing
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const listHeightInVh = 50; // Set your desired height in vh
  const listHeightInPixels = (windowHeight * listHeightInVh) / 100;
  const listWidthInPixels = 400;

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather App</h1>
      </header>
      <LocationSearch
        setSelectedLocation={setSelectedLocation}
        setSelectedCountry={setSelectedCountry}
        setSelectedAdmin1Code={setSelectedAdmin1Code}
        setFilteredLocations={setFilteredLocations}
        list={locations}
      />
      <div className="content">
        <div className="divider"></div>
        <List
          className="city-list"
          height={listHeightInPixels}
          itemCount={filteredLocations.length}
          itemSize={40}
          width={listWidthInPixels}
        >
          {({ index, style }) => (
            <div
              className="location-item"
              style={style}
              key={filteredLocations[index].geonameId}
              onClick={() => {
                setSelectedLocation(filteredLocations[index].name);
                setSelectedAdmin1Code(filteredLocations[index].admin1Code);
                setSelectedCountry(filteredLocations[index].countryCode);
              }}
            >
              {filteredLocations[index].countryCode === "US"
                ? `${filteredLocations[index].name}, ${filteredLocations[index].admin1Code}, ${filteredLocations[index].countryCode}`
                : `${filteredLocations[index].name}, ${filteredLocations[index].countryCode}`}
            </div>
          )}
        </List>
        <div className="divider"></div>
        <div className="data">
          {weatherData && (
            <div>
              <p>
                Location: {selectedLocation},{" "}
                {selectedCountry === "US" ? `${selectedAdmin1Code},` : ""}{" "}
                {selectedCountry}
              </p>
              <p>Temperature: {weatherData.main.temp} °F</p>
              <p>Weather: {capFirst(weatherData.weather[0].description)}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
