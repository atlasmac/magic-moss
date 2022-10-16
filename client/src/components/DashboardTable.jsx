import React from 'react'

const DashboardTable = ({waves, currentFlows, conditionsLi}) => {
  return (
    <div className='flex mt-10 justify-center gap-x-1'>
    <div className='flex flex-col gap-y-3 pl-3 pr-3'>
      <h2 className='text-xl font-bold md:whitespace-nowrap h-20 md:text-2xl sm:h-14'>Favorite Spot</h2>
      <ul
        className='flex flex-col gap-y-4 text-xl bg-slate-700 p-4 pl-6 pr-6 rounded-bl-2xl h-full justify-center md:whitespace-nowrap'
      >
        {waves}
      </ul>
    </div>

    <div className='flex flex-col gap-y-3'>
      <h2 className='text-xl font-bold md:whitespace-nowrap h-20 md:text-2xl sm:h-14'>Current Flows</h2>
      <ul
        className='flex flex-col gap-y-4 text-xl bg-slate-700 p-4 pl-8 pr-8 h-full justify-center md:whitespace-nowrap'
      >
        {currentFlows}
      </ul>
    </div>

    <div className='flex flex-col gap-y-3 pl-3 pr-3'>
      <h2 className='text-xl font-bold md:whitespace-nowrap h-20 md:text-2xl sm:h-14'>Conditions</h2>
      <ul
        className='flex flex-col gap-y-4 text-xl bg-slate-700 p-4 pl-8 pr-8 rounded-br-2xl h-full justify-center md:whitespace-nowrap'
      >
        {conditionsLi}
      </ul>
    </div>
  </div>
  )
}

export default DashboardTable
