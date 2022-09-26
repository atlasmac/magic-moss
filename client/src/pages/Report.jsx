import React from 'react'
import axios from 'axios';
import LineChart from '../components/LineChart';
import ForecastTable from '../components/ForecastTable';
import CurrentReport from '../components/CurrentReport';
import Comments from '../components/Comments';
import RiverData from '../data/weather.json';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';

const Report = () => {
  const { siteNumber } = useParams();
  // console.log(siteNumber);
  const spot = RiverData.wave;

  const [riverDataObj, setriverDataObj] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      try {
        const response = await axios({
          method: 'Get',
          url: `http://localhost:5000/report/${siteNumber}`,
          withCredentials: true,
        });

        const riverData = response.data[0]

        setriverDataObj(riverData);
      } catch (err) {
        console.log(err)
      }
    })();
  }, [siteNumber])

  console.log(riverDataObj)

  // const [ data ] = riverDataObj;
  // data.observed.forEach(el => console.log(el))

  const observedData = RiverData.observed
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map(data => {
      return {
        date: dayjs(data.date).format('ddd DD/MM/YYYY h:mm a'),
        cfs: data.cfs,
        ft: data.ft,
      }
    })

  const filterObservedData = observedData.filter((el, i, arr) => i === (arr.length - 2) || i % 7 === 0)
  const lastObserved = observedData.filter((el, i, arr) => i === (arr.length - 1))[0]

  const forecastData = RiverData.forecast
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map(data => {
      return {
        date: dayjs(data.date).format('ddd DD/MM/YYYY h:mm a'),
        cfs: data.cfs,
        ft: data.ft
      }
    })

  const [graphData, setGraphData] = React.useState({
    datasets: [
      {
        label: ["Observed CFS"],
        data: filterObservedData,
        backgroundColor: ["orange"],
        borderColor: "black",
        borderWidth: 2,
        tension: .6,
        parsing: {
          xAxisKey: 'date',
          yAxisKey: 'cfs'
        }
      }, {
        label: ["Current CFS"],
        data: lastObserved,
        backgroundColor: ["red"],
        borderColor: "red",
        borderWidth: 2,
        pointRadius: 6,
        pointHoverBorderWidth: 9,
        pointStyle: 'star',
        parsing: {
          xAxisKey: 'date',
          yAxisKey: 'cfs'
        }

      },
      {
        label: ["Forecasted CFS"],
        data: forecastData,
        backgroundColor: ["green"],
        borderColor: "black",
        borderWidth: 2,
        tension: .6,
        parsing: {
          xAxisKey: 'date',
          yAxisKey: 'cfs'
        }

      }
    ]
  })

  const lineOptions = {
    plugins: {
      tooltip: {
        intersect: false
      }
    },
    scales: {
      y: {
        grid: {
          color: "rgba(0, 0, 0, 0)"
        }
      },
      x: {
        ticks: {
          maxTicksLimit: 17
        }
      }
    }

  }

  return (
    <div className='divs'>
      <CurrentReport
        spot={spot}
        level={lastObserved}
      />

      <LineChart chartData={graphData} chartOptions={lineOptions} />

      <ForecastTable forecastData={forecastData} />

      <Comments />
    </div>

  )
}

export default Report
