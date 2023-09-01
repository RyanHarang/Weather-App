import React, { useState, useEffect } from "react";

function LocationSearch({ setSelectedLocation }) {
  const [userInput, setUserInput] = useState("");
  const [filteredLocations, setFilteredLocations] = useState([]);

  const allLocations = [
    "Bellevue",
    "New York",
    "Los Angeles",
    "Chicago" /* ... */,
  ];

  useEffect(() => {
    const filteredAndSortedLocations = allLocations
      .filter((location) =>
        location.toLowerCase().includes(userInput.toLowerCase())
      )
      .sort();

    setFilteredLocations(filteredAndSortedLocations);
  }, [userInput]);

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
            key={location}
            className="location-item"
            onClick={() => setSelectedLocation(location)}
          >
            {location}
          </div>
        ))}
      </div>
    </div>
  );
}

export default LocationSearch;
