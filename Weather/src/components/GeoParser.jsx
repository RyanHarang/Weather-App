// dataParsing.js (utility function)
function GeoParser(data) {
  const lines = data.split("\n");
  const locations = [];

  lines.forEach((line) => {
    const [geonameId, name, country, latitude, longitude] = line.split("\t");
    locations.push({
      geonameId,
      name,
      country,
      latitude,
      longitude,
    });
  });

  return locations;
}

export default GeoParser;
