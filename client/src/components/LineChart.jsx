import React from 'react'
import {Line} from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto'

const LineChart = ({chartData, chartOptions}) => {
  return (
    <div className='h-screen pt-8 pb-8'>
      <Line data={chartData} options={chartOptions} />
    </div>
  )
}

export default LineChart
