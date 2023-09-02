import React, { useState, useEffect } from "react";
import { FixedSizeList as List } from "react-window";
import LocationSearch from "./components/LocationSearch";
import GeoParser from "./components/GeoParser";
import "./css/LocationSearch.css";
import "./css/svg.css";
import "./css/App.css";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [weatherCondition, setWeatherCondition] = useState("default");
  const [selectedLocation, setSelectedLocation] = useState("Seattle");
  const [selectedAdmin1Code, setSelectedAdmin1Code] = useState("WA");
  const [selectedCountry, setSelectedCountry] = useState("US");
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const apiKey = "04d6486432cd4ff9b431962dd1003d3a";

  useEffect(() => {
    // Fetch the text file's content
    fetch("./txt/cities85000.txt")
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

  // useEffect to update background
  useEffect(() => {
    if (weatherData) {
      const conditionClass = mapWeatherToCSSClass(
        weatherData.weather[0].description
      );
      setWeatherCondition(conditionClass);
    }
  }, [weatherData]);

  // Function to apply classes for conditional svg rendering
  function mapWeatherToCSSClass(weatherDescription) {
    switch (weatherDescription.toLowerCase()) {
      case "clear sky":
        return "clear-sky";
      case "few clouds":
        return "few-clouds";
      case "scattered clouds":
        return "scattered-clouds";
      case "broken clouds":
        return "broken-clouds";
      case "overcast clouds":
        return "overcast-clouds";
      case "mist":
        return "mist";
      case "fog":
        return "fog";
      case "light rain":
        return "light-rain";
      case "moderate rain":
        return "moderate-rain";
      case "heavy rain":
        return "heavy-rain";
      case "thunderstorm":
        return "thunderstorm";
      case "snow":
        return "snow";
      case "hail":
        return "hail";
      case "tornado":
        return "tornado";
      default:
        return "";
    }
  }

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
    <div className={`App ${weatherCondition}`}>
      <header className="App-header">
        <h1>Weather</h1>
      </header>
      <LocationSearch
        setSelectedLocation={setSelectedLocation}
        setSelectedCountry={setSelectedCountry}
        setSelectedAdmin1Code={setSelectedAdmin1Code}
        setFilteredLocations={setFilteredLocations}
        list={locations}
      />
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
    </div>
  );
}

export default App;
