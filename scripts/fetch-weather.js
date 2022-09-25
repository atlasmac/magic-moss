const { Parser } = require('xml2js');
const fetchP = import('node-fetch');
const fs = require('fs');
const { promisify } = require('util');
const clarkForkAboveMissoula = 12340500;
const site = "Brennan's wave"

const fetch = async (...args) => {
  return (await fetchP).default(...args); 
}
async function fetchWeather(){


  const writeFile = promisify(fs.writeFile);

  const res = await fetch(
    'https://water.weather.gov/ahps2/hydrograph_to_xml.php?gage=abom8&output=xml'
  );
  const xml = await res.text();
  const xmlParser = new Parser();
  const data = await xmlParser.parseStringPromise(xml);
  // const json = JSON.stringify(data, null, 2);
  // console.log(json);
  
 const siteNumber = clarkForkAboveMissoula;
 const wave = site;

  const observed = data.site.observed[0]?.datum.map((a) => {
    return {
      date: a.valid[0]?._,
      cfs: parseFloat(a.secondary[0]?._),
      ft: parseFloat(a.primary[0]?._)
    };
  });
  const forecast = data.site.forecast[0]?.datum.map((a) => {
    return {
      date: a.valid[0]?._,
      cfs: parseFloat(a.secondary[0]?._),
      ft: parseFloat(a.primary[0]?._),
    };
  });
  // console.log(data);
  await writeFile('data/weather.json', JSON.stringify({ siteNumber, wave, observed, forecast }, null, 2));
  return data;
};

// setInterval(fetchWeather, 10000)
(async () => await fetchWeather())();