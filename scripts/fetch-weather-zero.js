const { Parser } = require('xml2js');
const fetchP = import('node-fetch');
const fs = require('fs');
const { promisify } = require('util');
const siteNumber = 12354500;
const site = "Zero Wave"
const axios = require('axios');

const fetch = async (...args) => {
  return (await fetchP).default(...args); 
}
async function fetchWeather(){


  const writeFile = promisify(fs.writeFile);

  const res = await fetch(
    'https://water.weather.gov/ahps2/hydrograph_to_xml.php?gage=srgm8&output=xml'
  );
  const xml = await res.text();
  const xmlParser = new Parser();
  const data = await xmlParser.parseStringPromise(xml);
  // const json = JSON.stringify(data, null, 2);
  // console.log(json);

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
      ft: parseFloat(a.primary[0]?._)
    };
  });
  // console.log(data);
  await writeFile('data/weatherStRegis.json', JSON.stringify({ siteNumber, wave : site, observed, forecast }, null, 2));

  return data;
};

// setInterval(fetchWeather, 10000)
// const updateReport = async event => {
//   try {
//     const response = await axios({
//       method: 'PUT',
//       data: {
//         siteNumber: siteNumber,
//         wave: site,
//         observed: observed,
//         forecast: forecast,
//       },
//       url: `http://localhost:5000/report/updateReport/${siteNumber}`,
//       withCredentials: true,
//     });
//   }		catch (err) {
//     console.log(err);
//   }
// }

(async () => await fetchWeather())();