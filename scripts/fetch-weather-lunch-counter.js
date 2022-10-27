const { Parser } = require('xml2js');
const fetchP = import('node-fetch');
const fs = require('fs');
const { promisify } = require('util');
const siteNumber = 13022500;
const site = "Lunch Counter";
const axios = require('axios');
const dayjs = require('dayjs')

const fetch = async (...args) => {
  return (await fetchP).default(...args);
}
async function fetchWeather() {

  // const writeFile = promisify(fs.writeFile);

  const res = await fetch(
    'https://water.weather.gov/ahps2/hydrograph_to_xml.php?gage=alpw4&output=xml'
  );
  const xml = await res.text();
  const xmlParser = new Parser();
  const data = await xmlParser.parseStringPromise(xml);
  // const json = JSON.stringify(data, null, 2);
  // console.log(json);

  const observed = data.site.observed[0]?.datum.map((a) => {
    return {
      date: new Date(a.valid[0]?._).toLocaleString('en-US', {timeZone: 'America/Denver'}),
      cfs: parseFloat(a.secondary[0]?._)*1000,
      ft: parseFloat(a.primary[0]?._)

    };
  })
    .sort((a, b) => a.date - b.date)
    .map(data => {
      return {
        date: dayjs(data.date).format('ddd MM/D h:mm A'),
        cfs: data.cfs,
        ft: data.ft,
      }
    })

  const filteredObserved = observed.filter((data, i) => {
    let dateParts = data.date.split(' ');
    if (dateParts[2] === '12:00' || dateParts[2] === '6:00' || (i === (observed.length - 1))) {
      return data
    }
    return null;
  })


  const forecast = data.site.forecast[0]?.datum.map((a) => {
    return {
      date: new Date(a.valid[0]?._).toLocaleString('en-US', {timeZone: 'America/Denver'}),
      cfs: parseFloat(a.secondary[0]?._)*1000,
      ft: parseFloat(a.primary[0]?._)
    };
  })
    .sort((a, b) => a.date - b.date)
    .map(data => {
      return {
        date: dayjs(data.date).format('ddd MM/D h:mm A'),
        cfs: data.cfs,
        ft: data.ft
      }
    });

  // console.log(data);
  // await writeFile('data/weatherLunchCounter.json', JSON.stringify({ siteNumber, wave: site, filteredObserved, forecast }, null, 2));
  const updateWeather = async event => {
    try {
      const response = await axios({
        method: 'PUT',
        data: {
          siteNumber: siteNumber,
          wave: site,
          observed: filteredObserved,
          forecast: forecast,
        },
        url: `https://magicmoss.herokuapp.com/api/report/updateReport/${siteNumber}`,
        withCredentials: true,
      });
    } catch (err) {
      console.log(err);
    }
  }
  (async () => await updateWeather())();
  return data;
};

(async () => await fetchWeather())();