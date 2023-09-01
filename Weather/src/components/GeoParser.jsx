function GeoParser(data) {
  const lines = data.split("\n");
  const locations = [];

  lines.forEach((line) => {
    const [
      geonameId,
      name,
      asciiname,
      alternatenames,
      latitude,
      longitude,
      featureClass,
      featureCode,
      countryCode,
      cc2,
      admin1Code,
      admin2Code,
      admin3Code,
      admin4Code,
      population,
      elevation,
      dem,
      timezone,
      modificationDate,
    ] = line.split("\t");

    // Create an object to represent the location and push it to the locations array
    locations.push({
      geonameId,
      name,
      asciiname,
      alternatenames,
      latitude,
      longitude,
      featureClass,
      featureCode,
      countryCode,
      cc2,
      admin1Code,
      admin2Code,
      admin3Code,
      admin4Code,
      population,
      elevation,
      dem,
      timezone,
      modificationDate,
    });
  });

  return locations;
}

export default GeoParser;
