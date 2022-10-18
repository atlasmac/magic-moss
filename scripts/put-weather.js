const axios = require('axios');
const missoula = require('../data/weatherMissoula.json');
const stRegis = require('../data/weatherStRegis.json');
const lochsa = require('../data/weatherLochsa.json');

const updateMissoula = async event => {
  try {
    const response = await axios({
      method: 'PUT',
      data: {
        siteNumber: missoula.siteNumber,
        wave: missoula.wave,
        observed: missoula.observed,
        forecast: missoula.forecast,
      },
      url: `https://safe-castle-40765.herokuapp.com/api/report/updateReport/${missoula.siteNumber}`,
      withCredentials: true,
    });
  }		catch (err) {
    console.log(err);
  }
}
const updateStRegis = async event => {
  try {
    const response = await axios({
      method: 'PUT',
      data: {
        siteNumber: stRegis.siteNumber,
        wave: stRegis.wave,
        observed: stRegis.observed,
        forecast: stRegis.forecast,
      },
      url: `https://safe-castle-40765.herokuapp.com/api/report/updateReport/${stRegis.siteNumber}`,
      withCredentials: true,
    });
  }		catch (err) {
    console.log(err);
  }
}
const updateLochsa = async event => {
  try {
    const response = await axios({
      method: 'PUT',
      data: {
        siteNumber: lochsa.siteNumber,
        wave: lochsa.wave,
        observed: lochsa.observed,
        forecast: lochsa.forecast,
      },
      url: `https://safe-castle-40765.herokuapp.com/api/report/updateReport/${lochsa.siteNumber}`,
      withCredentials: true,
    });
  }		catch (err) {
    console.log(err);
  }
}
(async () => {
  await updateMissoula()
  await updateStRegis()
  await updateLochsa()
})();