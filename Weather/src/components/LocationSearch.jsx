import React, { useState, useEffect } from "react";
import "../css/LocationSearch.css";

function LocationSearch({
  setSelectedLocation,
  setSelectedAdmin1Code,
  setSelectedCountry,
  list,
}) {
  const [userInput, setUserInput] = useState("");
  const [filteredLocations, setFilteredLocations] = useState([]);

  useEffect(() => {
    const filteredAndSortedLocations = list
      .filter((location) =>
        `${location.name}, ${location.admin1Code}, ${location.countryCode}`
          .toLowerCase()
          .includes(userInput.toLowerCase())
      )
      .sort((a, b) => {
        // Sort by city name and country code
        const aFullName = `${a.name}, ${a.admin1Code}, ${a.countryCode}`;
        const bFullName = `${b.name}, ${b.admin1Code}, ${b.countryCode}`;
        return aFullName.localeCompare(bFullName);
      });

    setFilteredLocations(filteredAndSortedLocations);
  }, [userInput, list]);

  return (
    <div>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Type a location"
      />
      <div className="location-container">
        {filteredLocations.map((location) => (
          <div
            key={location.geonameId}
            className="location-item"
            onClick={() => {
              setSelectedLocation(location.name); // Update selectedLocation with the location's name
              setSelectedAdmin1Code(location.admin1Code);
              setSelectedCountry(location.countryCode);
            }}
          >
            {/* Conditionally render the state */}
            {location.countryCode === "US"
              ? `${location.name}, ${location.admin1Code}, ${location.countryCode}`
              : `${location.name}, ${location.countryCode}`}
            {/*`${location.name}, ${location.admin1Code}, ${location.countryCode}`*/}
          </div>
        ))}
      </div>
    </div>
  );
}

export default LocationSearch;
