import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import LineChart from '../components/LineChart';
import ForecastTable from '../components/ForecastTable';
import CurrentReport from '../components/CurrentReport';
import Loading from '../components/Loading';
import Comments from '../components/Comments';
import dayjs, { Dayjs } from 'dayjs';
import { useParams } from 'react-router-dom';

const Report = ({ showLogin, setShowLogin, setShowSignUp, showSignUp }) => {
  const { siteNumber } = useParams();
  const [riverDataObj, setriverDataObj] = useState([]);
  const [spot, setSpot] = useState('');
  const [observed, setObserved] = useState([]);
  const [lastObserved, setLastObserved] = useState([]);
  const [forecastData, setForecastData] = useState([]);
  const [graphData, setGraphData] = useState({
    datasets: [{ data: 0 }, { data: 0 }, { data: 0 }]
  })
  
  React.useEffect(() => {
    (async () => {
      try {
        const response = await axios({
          method: 'Get',
          url: `${process.env.REACT_APP_API_URL}/report/${siteNumber}`,
          withCredentials: true,
        });

        const riverData = response.data[0]
        const observedData = riverData.observed
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .map(data => {
            return {
              date: dayjs(data.date).format('ddd MM/D h:mm A'),
              cfs: data.cfs,
              ft: data.ft,
            }
          })
        const lastObserved = observedData.filter((el, i, arr) => i === (arr.length - 1))

        const testObservedFilter = observedData.filter((data, i ) => {
          let dateParts = data.date.split(' ');
          if (dateParts[2] === '12:00' || dateParts[2] === '6:00' || (i === (observedData.length - 1)) ) {
            return dateParts;
          }
          return null;
        })

        const forecastData = riverData.forecast
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .map(data => {
            return {
              date: dayjs(data.date).format('ddd MM/D h:mm A'),
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
              label: ["Observed"],
              data: testObservedFilter,
              backgroundColor: ["rgb(152, 168, 248)"],
              borderColor: "rgb(152, 168, 248)",
              borderWidth: 2,
              pointRadius: 0,
              pointHoverRadius: 5,
              order: 2,
              tension: 0.5,
              parsing: {
                xAxisKey: 'date',
                yAxisKey: 'cfs'
              }
            },
            {
              label: ["Current"],
              data: lastObserved,
              backgroundColor: ["red"],
              borderColor: "red",
              borderWidth: 2,
              pointRadius: 9,
              pointHoverBorderWidth: 9,
              pointStyle: 'star',
              order: 1,
              parsing: {
                xAxisKey: 'date',
                yAxisKey: 'cfs'
              }

            },
            {
              label: ["Forecasted"],
              data: forecastData,
              backgroundColor: ["rgb(205, 252, 246)"],
              borderColor: "rgb(205, 252, 246)",
              borderWidth: 2,
              pointRadius: 0,
              pointHoverRadius: 5,
              tension: .5,
              order: 3,
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
          color: "rgb(166, 173, 186)",  // not 'fontColor:' anymore
          // fontSize: 18  // not 'fontSize:' anymore
          font: {
            size: 20 // 'size' now within object 'font {}'
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
        suggestedMin: 0,
        ticks: {
          color: 'rgb(166, 173, 186)',
          font: {
            size: 16 
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
            size: 16 
          },
          maxTicksLimit: 11,
          maxRotation: 0,
          minRotation: 0,
          callback: function(value, index, ticks) {
            return this.getLabelForValue(value)
              .split(' ')
              .filter((el, i)=> {
                return i === 0 || i === 1 }
              )
              .map((el, i) => {
                return i === 1 ? el.split('/')[1] : el;
              })
              .map(el => {
                const strTest = /^[a-zA-Z]+$/
                if (strTest.test(el)){
                  return el
                } else if (el[el.length - 1] === '1'){
                  return `${el}st`
                } else if (el[el.length - 1] === '2'){
                  return `${el}nd`
                } else if (el[el.length - 1] === '3'){
                  return `${el}rd`
                } else {
                  return `${el}th`
                }
              })
        }
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
            size: 26,
            family: "'Roboto Slab', Times, serif",
          },
        },
        labels: {
          color: "rgb(166, 173, 186)",  // not 'fontColor:' anymore
          // fontSize: 18  // not 'fontSize:' anymore
          font: {
            size: 14 // 'size' now within object 'font {}'
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
        suggestedMin: 0,
        ticks: {
          color: 'rgb(166, 173, 186)',
          font: {
            size: 14 
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
            size: 12
          },
          maxTicksLimit: 11,
          maxRotation: 0,
          minRotation: 0,
          callback: function(value, index, ticks) {
            return this.getLabelForValue(value)
              .split(' ')
              .filter((el, i)=> {
                return i === 0 || i === 1 }
              )
              .map((el, i) => {
                return i === 1 ? el.split('/')[1] : el;
              })
              .map(el => {
                const strTest = /^[a-zA-Z]+$/
                if (strTest.test(el)){
                  return el
                } else if (el[el.length - 1] === '1'){
                  return `${el}st`
                } else if (el[el.length - 1] === '2'){
                  return `${el}nd`
                } else if (el[el.length - 1] === '3'){
                  return `${el}rd`
                } else {
                  return `${el}th`
                }
              })
        }
        }
      }
    }
  }

  return (
    <div className='container mx-auto'>
      {forecastData.length < 1 &&
        <Loading />
      }
      {forecastData.length > 1 &&
        <div>
          <CurrentReport spot={spot} level={lastObserved} />
          <div className='hidden lg:block'>
            <LineChart chartData={graphData} chartOptions={lineOptions} />
          </div>
          <div className='block lg:hidden'>
            <LineChart chartData={graphData} chartOptions={mobileLineOptions} />
          </div>
          <ForecastTable forecastData={forecastData} />
          <Comments 
            showLogin={showLogin}
            setShowLogin={setShowLogin}
            showSignUp={showSignUp}
            setShowSignUp={setShowSignUp}/>
        </div>

      }
    </div>

  )
}

export default Report
