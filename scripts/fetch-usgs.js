const { Parser } = require('xml2js');
const fetchP = import('node-fetch');
const fs = require('fs');
const { promisify } = require('util');
const { url } = require('inspector');

const fetch = async (...args) => {
  return (await fetchP).default(...args);
}
const writeFile = promisify(fs.writeFile);

async function fetchUsgs() {
  const now = new Date();
  const start = new Date(now);
  start.setDate(now.getDate()-1);
  const startArg = `${start.getFullYear()}-${start.getMonth()+1}-${start.getDate()}`
  const endArg = `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}`
  const url = `https://waterdata.usgs.gov/mt/nwis/uv?cb_00060=on&cb_00065=on&format=rdb&site_no=12340500&period=&begin_date=${startArg}&end_date=${endArg}`
console.log(url)
  const res = await fetch(
    url
  );
  const tsv = await res.text();
  let skipLines = 2;
  const data = tsv.split(/\n/).flatMap((line) => {
    if (line.match(/^#/)) {
      return [];
    }
    if (skipLines) {
      skipLines--;
      return [];
    }
    const [ siteNumber, date, tz, cfs, , gaugeHeight, ] = line.split(/\t/);
    return {
      siteNumber: parseFloat(siteNumber),
      date: new Date(`${date} ${tz}`),
      cfs: parseFloat(cfs),
      ft : parseFloat(gaugeHeight)
    }
    return line;
  });
  console.log(data);
  await writeFile('client/src/data/usgs.json', JSON.stringify(data, null, 2));
  return data;
};


(async () => await fetchUsgs())();