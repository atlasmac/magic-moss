import React from 'react';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';
import useConditionHook from '../hooks/useConditionHook';


const ForecastTable = ({ forecastData }) => {
  const { getConditions } = useConditionHook();
  const { siteNumber } = useParams();

  const headers = [];
  const flows = [];
  const height = [];
  const waveDescription = [];

  forecastData.forEach((data) => {
    headers.push(<td key={data.date}>{data.date.split(' ')[0]}</td>);
    flows.push(<td key={data.date}>{data.cfs}</td>);
    height.push(<td key={data.date}>{data.ft}</td>);
    waveDescription.push([data.cfs, +siteNumber]);
  })

  const conditionsTd = getConditions(waveDescription).map((el, i) => (<td key={`${i}${el}`}>{el}</td>));

  return (
    <div>
      <div className='flex justify-center'>
        <h2 className='text-3xl font-robotoSlab font-bold'>Daily Forecast Levels</h2>
      </div>
      <div className="overflow-x-auto scrollbar-thin scrollbar-corner-full scrollbar-thumb-slate-400 scrollbar-thumb-rounded-md scrollbar-track-base-200 overflow-scroll mt-3 pb-1">
        <table className="table w-full mb-1">
          <thead>
            <tr>
              <th></th>
              {headers}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Cubic Feet / Second </th>
              {flows}
            </tr>
            <tr>
              <th>Height (Feet)</th>
              {height}
            </tr>
            <tr>
              <th>Wave Condition</th>
              {conditionsTd}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ForecastTable
