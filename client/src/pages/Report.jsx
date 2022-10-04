import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import LineChart from '../components/LineChart';
import ForecastTable from '../components/ForecastTable';
import CurrentReport from '../components/CurrentReport';
import Comments from '../components/Comments';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';

const Report = () => {
  const { siteNumber } = useParams();
  const [riverDataObj, setriverDataObj] = useState([]);
  const [spot, setSpot] = useState('');
  const [observed, setObserved] = useState([]);
  const [lastObserved, setLastObserved] = useState([]);
  const [forecastData, setForecastData] = useState([]);
  const [graphData, setGraphData] = useState({
    datasets: [
      {
        label: ["Observed CFS"],
        data: 0,
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
        data: 0,
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
        data: 0,
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

  React.useEffect(() => {
    (async () => {
      try {
        const response = await axios({
          method: 'Get',
          url: `http://localhost:5000/report/${siteNumber}`,
          withCredentials: true,
        });

        const riverData = response.data[0]
        const observedData = riverData.observed
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .map(data => {
            return {
              date: dayjs(data.date).format('ddd DD/MM h:mm A'),
              cfs: data.cfs,
              ft: data.ft,
            }
          })
        const filterObservedData = observedData.filter((el, i, arr) => i === (arr.length - 2) || i % 7 === 0)
        const lastObserved = observedData.filter((el, i, arr) => i === (arr.length - 1))
        const forecastData = riverData.forecast
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .map(data => {
            return {
              date: dayjs(data.date).format('ddd DD/MM h:mm A'),
              cfs: data.cfs,
              ft: data.ft
            }
          })

        setForecastData(forecastData)
        setLastObserved(lastObserved[0])
        setriverDataObj(riverData);
        setSpot(riverData.wave);
        setObserved(observedData)
        setGraphData({
          datasets: [
            {
              label: ["Observed CFS"],
              data: filterObservedData,
              backgroundColor: ["orange"],
              borderColor: "orange",
              borderWidth: 2,
              pointRadius: 5,
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
              borderWidth: 8,
              pointRadius: 9,
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
              borderColor: "green",
              borderWidth: 2,
              pointRadius: 5,
              tension: .6,
              parsing: {
                xAxisKey: 'date',
                yAxisKey: 'cfs'
              }

            }
          ]
        })

      } catch (err) {
        console.log(err)
      }
    })();
  }, [siteNumber])

  const lineOptions = {
    plugins: {
      legend: {
        labels: {
          color: "rgb(166, 173, 186)",  // not 'fontColor:' anymore
          // fontSize: 18  // not 'fontSize:' anymore
          font: {
            size: 24 // 'size' now within object 'font {}'
          }
        }
      },
      tooltip: {
        intersect: false
      }
    },
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: { 
          color: 'rgb(166, 173, 186)',
          font: {
            size: 18 // 'size' now within object 'font {}'
          }
        },
        grid: {
          color: "rgba(0, 0, 0, 0)"
        }
      },
      x: {
        ticks: {
          color: 'rgb(166, 173, 186)',
          font: {
            size: 18 // 'size' now within object 'font {}'
          },
          maxTicksLimit: 17
        }
      }
    }

  }
  console.log(lastObserved, observed)

  return (
    <div className='container mx-auto'>
      {forecastData.length > 1 && <CurrentReport
        spot={spot}
        level={lastObserved}
      />}
      {forecastData.length < 1 &&
        <div>
          <h1>Forecast Loading.....</h1>
        </div>
      }
      {forecastData.length > 1 && <LineChart chartData={graphData} chartOptions={lineOptions} />}

      {forecastData.length > 1 && <ForecastTable forecastData={forecastData} />}

      {forecastData.length > 1 && <Comments />}
    </div>

  )
}

export default Report
