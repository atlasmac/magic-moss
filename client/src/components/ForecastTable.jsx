import React from 'react';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';
import useConditionHook from '../hooks/useConditionHook';


const ForecastTable = ({ forecastData }) => {
  const { getConditions } = useConditionHook();

  const { siteNumber } = useParams()

  const forecastDataNoon = forecastData.filter(data => {
    let dateParts = data.date.split(' ')
    return dateParts[2] === '12:00' && dateParts[3] === 'AM';
  })


  const headers = [];
  const flows = [];
  const height = [];
  const waveDescription = [];


  forecastDataNoon.forEach((data) => {
    headers.push(<th key={data.date}>{data.date.split(' ')[0]}</th>)
    flows.push(<td key={data.date}>{data.cfs} CFS</td>)
    height.push(<td key={data.date}>{data.ft} ft high</td>)
    waveDescription.push([data.cfs, +siteNumber])
  })

  const conditionsTd = getConditions(waveDescription).map((el, i) => (<td key={`${i}${el}`}>{el}</td>))

  return (
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
            {conditionsTd}
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ForecastTable
