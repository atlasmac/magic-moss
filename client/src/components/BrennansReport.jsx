import React from 'react'

const BrennansReport = ({level}) => {
  const getReport = (num) => {
    if (num < 3200){
      return "Really bad surfing conditions at the moment. You may be able to snag a ride on middle wave but you'll work hard for it. The best board for today is a foamie with fins you're ok with losing.";
    } else if (num >= 3200 && num < 4500){
      return "Poor to fair conditions. It's a tricky level but can be fun when you figure it out."
    } else if (num >= 4500 && num < 6000){
      return "Fair conditions. A really fun fast level"
    } else if (num >= 6000 && num <= 8500){
      return "Good conditions. It's the crowd's favorite level. The wave isn't too foamy and it's easy to get in from the bank or the island."
    } else {
      return "fair"
    }
  }
  const currentLevel = level.cfs
  const currentFeet = level.ft
  const time = level.date
  return (
    <div>
      <h1>Brennan's Wave</h1>
      <h2>The Report for {time}.</h2>
      <h2>Flows are currently at {currentLevel} cfs and {currentFeet} feet high at the gauge.</h2>
      <p>{getReport(currentLevel)}<span style={{fontSize:8}}>-Surf Forecaster, Atlas McKinley</span></p>
    </div>
  )
}

export default BrennansReport
