import React from 'react'
import dayjs from 'dayjs'


const ForecastTable = ({ forecastData }) => {
  const getMainRating = (num) => {
    if (num < 3200){
      return 'Poor to impossible conditions.';
    } else if (num >= 3200 && num < 4500){
      return "Poor to fair conditions."
    } else if (num >= 4500 && num < 6000){
      return "Fair conditions."
    } else if (num >= 6000 && num <= 8500){
      return "Good conditions. It's the crowd's favorite level."
    } else {
      return "fair"
    }
  }

  const forecastDataNoon = forecastData.filter(data =>{
    let dateParts = data.date.split(' ')
    return dateParts[2] === '12:00' && dateParts[3] === 'pm'
  })

  const headers = [];
  const flows = [];
  const height = []; 
  const waveDescription = [];

  forecastDataNoon.forEach((data)=>{
    headers.push(<th key={data.date}>{data.date.split(' ')[0]}</th>)
    flows.push(<td key={data.date}>{data.cfs} CFS</td>)
    height.push(<td key={data.date}>{data.ft} feet high</td>)
    waveDescription.push(<td key={data.date}>{getMainRating(data.cfs)}</td>)
  })

  return (
    // from daisy ui
    <div className="overflow-x-auto">
      Forecast
      <table className="table w-full">
        <thead>
          <tr>
            {headers}
          </tr>
        </thead>
        <tbody>
          <tr>
            {flows}
          </tr>
          <tr>
            {height}
          </tr>
          <tr>
            {waveDescription}
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ForecastTable
