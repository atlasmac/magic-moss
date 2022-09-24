import React from 'react'
import axios from 'axios';
import useAuth from '../auth/useAuth';
import BrennansLineChart from './BrennansLineChart';
import ForecastTable from './ForecastTable';
import BrennansReport from './BrennansReport';
import RiverData from '../data/weather.json'
import dayjs from 'dayjs'

const Report = () => {
  const { user, authed } = useAuth();
  const [commentsArr, setCommentsArr] = React.useState([]);
  const [getComments, setGetComments] = React.useState(false)

  const observedData = RiverData.observed
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map(data => {
      return {
        date: dayjs(data.date).format('ddd DD/MM/YYYY h:mm a'),
        cfs: data.cfs,
        ft: data.ft,
        siteNumber: data.siteNumber
      }
    })

  const filterObservedData = observedData.filter((el, i, arr) => i === (arr.length - 2) || i % 7 === 0)
  const lastObserved = observedData.filter((el, i, arr) => i === (arr.length - 1))

  const forecastData = RiverData.forecast
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map(data => {
      return {
        date: dayjs(data.date).format('ddd DD/MM/YYYY h:mm a'),
        cfs: data.cfs,
        ft: data.ft,
        siteNumber: data.siteNumber
      }
    })
  // const forecastDates = forecastData.map((data) => data.date)
  // const forecastCfs = forecastData.map((data) => data.cfs)
  //setting state for chart js 
  const [riverData, setRiverData] = React.useState({
    datasets: [
      {
        label: ["Observed Cubic Feet Per Second"],
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
        label: ["Current Level"],
        data: lastObserved,
        backgroundColor: ["red"],
        borderColor: "black",
        borderWidth: 2,
        parsing: {
          xAxisKey: 'date',
          yAxisKey: 'cfs'
        }

      },
      {
        label: ["Forecasted Cubic Feet Per Second"],
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
    scales: {
      xAxis: {
        ticks: {
          maxTicksLimit: 17
        }
      }
    }

  }

  React.useEffect(() => {
    (async () => {
      try {
        const response = await axios({
          method: 'Get',
          url: 'http://localhost:5000/comment',
          withCredentials: true,
        });
        setCommentsArr(response.data)
      } catch (err) {
        console.log(err)
      }
    })();
  }, [getComments])

  const comments = commentsArr.map(e => {

    return (
      <div
        key={e._id}
      >
        <p><span>{e.user.userName} : </span>{e.comment}</p>
      </div>
    )
  })

  const [msg, setMsg] = React.useState({
    text: '',
    success: false,
  });
  const [formData, setFormData] = React.useState({
    comment: '',
  });

  function handleFormChange(event) {
    const { name, value } = event.target;
    setFormData(prevformData => ({
      ...prevformData,
      [name]: value,
    }));
  }
  const handleSubmit = async event => {
    event.preventDefault();
    console.log(formData, 'New Lesson Attempt Sent');
    try {
      const response = await axios({
        method: 'POST',
        data: {
          user: user._id,
          comment: formData.comment,
          likes: 0,
        },
        url: 'http://localhost:5000/comment/createComment',
        withCredentials: true,
      });
      setGetComments(!getComments);
      console.log('From Server:', response);
      setMsg({
        text: response.data.message.msgBody,
        success: true,
      });
      event.target.reset();
    } catch (err) {
      setMsg({
        text: err.response.data.message.msgBody,
        success: false,
      });
      console.log(err.response);
    }
  };


  return (
    <div className='divs'>
      {/* <h2>The Clark Fork above Missoula is at {observedData[observedData.length - 1].cfs} cfs</h2> */}
      <div>
        <BrennansReport 
          level={observedData[observedData.length - 1]}
        />
      </div>
      <div>
        <BrennansLineChart chartData={riverData} chartOptions={lineOptions} />
      </div>
      <div>
        <ForecastTable forecastData={forecastData}/>
      </div>
      <div>
        <h3>Comments</h3>
        {comments}
      </div>
      {!authed &&
        <div>
          <h3>Log in or sign up to comment</h3>
        </div>
      }
      {authed &&
        <div>
          <h4>Add a comment</h4>
          <div>
            <form onSubmit={handleSubmit} className='form'>
              <label>
                Comment
                <input
                  type="text"
                  onChange={handleFormChange}
                  name="comment"
                  value={formData.comment}
                />
              </label>

              <button>
                Post Comment
              </button>
            </form>
            <div>{msg ? msg.text : ''}</div>
          </div>
        </div>
      }

    </div>

  )
}

export default Report
