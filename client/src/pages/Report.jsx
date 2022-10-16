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
    datasets: [{ data: 0 }, { data: 0 }, { data: 0 }]
  })
  const [mobileGraphData, setMobileGraphData] = useState({
    datasets: [{ data: 0 }, { data: 0 }, { data: 0 }]
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
        const filterObservedData = observedData.filter((el, i, arr) => i === (arr.length - 2) || i % 10 === 0)
        const mobileFilterObservedData = observedData.filter((el, i, arr) => i === (arr.length - 2) || i % 18 === 0)
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
        const mobileForecastData = forecastData.filter((el, i, arr) => i === (arr.length - 2) || i === 0 || i % 3 === 0)

        setForecastData(forecastData)
        setLastObserved(lastObserved[0])
        setriverDataObj(riverData);
        setSpot(riverData.wave);
        setObserved(observedData)
        setGraphData({
          datasets: [
            {
              label: ["Observed"],
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
              label: ["Current"],
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
              label: ["Forecasted"],
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
        setMobileGraphData({
          datasets: [
            {
              label: ["Observed"],
              data: mobileFilterObservedData,
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
              label: ["Current"],
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
              label: ["Forecasted"],
              data: mobileForecastData,
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
        title: {
          display: true,
          text: 'Cubic Feet per Second (cfs)',
          color: "rgb(166, 173, 186)",
          font: {
            size: 36,
            family: "'Roboto Slab', Times, serif",
          },
        },
        labels: {
          boxHeight: 30,
      
          color: "rgb(166, 173, 186)",  // not 'fontColor:' anymore
          // fontSize: 18  // not 'fontSize:' anymore
          font: {
            size: 30 // 'size' now within object 'font {}'
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
  const mobileLineOptions = {
    plugins: {
      legend: {
        title: {
          display: true,
          text: 'Cubic Feet per Second (cfs)',
          color: "rgb(166, 173, 186)",
          font: {
            size: 30,
            family: "'Roboto Slab', Times, serif",
          },
        },
        position: 'top',
        labels: {
          color: "rgb(166, 173, 186)",  // not 'fontColor:' anymore
          // fontSize: 18  // not 'fontSize:' anymore
          font: {
            size: 17, // 'size' now within object 'font {}'
            
          },
          
          padding: 20,

        },
      
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
          maxTicksLimit: 9
        }
      }
    }
  }

  return (
    <div className='container mx-auto'>
      {forecastData.length < 1 &&
        <div>
          <h1>Forecast Loading.....</h1>
        </div>
      }


      {forecastData.length > 1 &&
        <div>
          <CurrentReport spot={spot} level={lastObserved} />
          <div className='hidden lg:block'>
            <LineChart chartData={graphData} chartOptions={lineOptions} />
          </div>
          <div className='block lg:hidden'>
            <LineChart chartData={mobileGraphData} chartOptions={mobileLineOptions} />
          </div>

          <ForecastTable forecastData={forecastData} />

          <Comments />

        </div>

      }
    </div>

  )
}

export default Report
