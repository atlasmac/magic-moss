import React from 'react';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';


const ForecastTable = ({ forecastData }) => {
  // aconsole.log(forecastData)
  const {siteNumber} = useParams()
    const getMainRating = (num) => {
      // brennans
      if (siteNumber === '12340500') {
        if (num < 2000) {
          return "Flat";
        } else if (num >= 2000 && num < 3200) {
          return "Poor to impossible"
        } else if (num >= 3200 && num < 4500) {
          return "Poor to fair"
        } else if (num >= 4500 && num < 6000) {
          return "Fair to good"
        } else if (num >= 6000 && num <= 8500) {
          return "Good conditions"
        } else {
          return "Fair to good"
        }
      }
      //st regis Zer0 2300 to 4500
      if (siteNumber === '12354500') {
        if (num < 2300) {
          return "Flat";
        } else if (num >= 2300 && num < 3000) {
          return "Fair"
        } else if (num >= 3000 && num < 4500) {
          return "Good"
        } else if (num >= 4500 && num <= 6000) {
          return "Fair"
        } else {
          return "Poor"
        }
      }
      /// lochsa pipeline
      if (siteNumber === '13337000') {
        if (num < 4500) {
          return "Flat";
        } else if (num >= 4500 && num < 7000) {
          return "Good"
        } else if (num >= 7000 && num <= 12000) {
          return "Great"
        } else if (num >= 12000 && num <= 15500) {
          return "Good"
        } else {
          return "Too high"
        }
      }
    }
  
    const forecastDataNoon = forecastData.filter(data =>{
      let dateParts = data.date.split(' ')
      return dateParts[2] === '12:00' && dateParts[3] === 'AM';
    })


    const headers = [];
    const flows = [];
    const height = []; 
    const waveDescription = [];

  
    forecastDataNoon.forEach((data)=>{
      headers.push(<th key={data.date}>{data.date.split(' ')[0]}</th>)
      flows.push(<td key={data.date}>{data.cfs} CFS</td>)
      height.push(<td key={data.date}>{data.ft} ft high</td>)
      waveDescription.push(<td key={data.date}>{getMainRating(data.cfs)}</td>)
    })

    // console.log(forecastDataNoon)

  return (
    // from daisy ui
    <div className="overflow-x-auto">
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
