import React from 'react'
import { useParams } from 'react-router-dom';


const CurrentReport = ({ level, spot }) => {
  const { siteNumber } = useParams()

  const getReport = (num) => {
    /// Missoula
    if (siteNumber === '12340500') {
      if (num < 2000) {
        return "Both middle and main wave at Brennan's are pretty much impossible to surf at the moment.";
      } else if (num >= 2000 && num < 3200) {
        return "Really bad surfing conditions at the moment. You may be able to snag a ride on middle wave but you'll work hard for it. The best board for today is a foamie with fins you're ok with losing."
      } else if (num >= 3200 && num < 4500) {
        return "Poor to fair conditions. It's a tricky level but can be fun when you figure it out."
      } else if (num >= 4500 && num < 6000) {
        return "Fair conditions. A really fun fast level"
      } else if (num >= 6000 && num <= 8500) {
        return "Good conditions. It's the crowd's favorite level. The wave isn't too foamy and it's easy to get in from the bank or the island."
      } else {
        return "fair"
      }
    }
    //st regis Zer0 2300 to 4500
    if (siteNumber === '12354500') {
      if (num < 2300) {
        return "Zero is out right now. Should come in if the levels get up 2300 CFS";
      } else if (num >= 2300 && num < 3000) {
        return "Fair conditions. It's a tricky level but can be fun when you figure it out. Prepare for a bumpy wave at this level."
      } else if (num >= 3000 && num < 4500) {
        return "Prime conditions for Zero Wave. Get out there and get after it "
      } else if (num >= 4500 && num <= 6000) {
        return "A little high for zero but there is surfing to be had."
      } else {
        return "Water levels are too high to be surfable at the moment, but that is a blessing. Lot's of other surfing options out there right now."
      }
    }
    /// lochsa pipeline
    if (siteNumber === '13337000') {
      if (num < 4500) {
        return "Unless you want some scenic views, It's not worth the drive until levels are above 4500 cfs.";
      } else if (num >= 4500 && num < 7000) {
        return "good conditions. The left shoulder is the sweetspot right now, but it is still a fun and powerful wave."
      } else if (num >= 7000 && num <= 12000) {
        return "Great conditions. It's everyone's favorite level. The whole face of the wave should be opening up. The left shoulder is the sweet spot with the right shoulder being pretty steep."
      } else if (num >= 12000 && num <= 15500) {
        return "Good conditions. It's a big green machine at this level. The wave can get kind of flat, towards 15,000 cfs. So, remeber to bring some extra volume."
      } else {
        return "Too high for me and a little too flat! But if you want to get some intel on it be my guest."
      }
    }
  }

  const currentLevel = level.cfs
  const currentFeet = level.ft
  const time = level.date
  return (
    <div className="hero min-h-fit bg-base-200 mt-8 ">
      <div className="hero-content flex-col lg:flex-row">
        <img src="https://placeimg.com/260/400/nature" className="max-w-sm rounded-lg shadow-2xl" />
        <div>
          <h1 className="text-5xl font-bold">{spot}</h1>
          <p className="py-3 text-3xl">The Report for {time}.</p>
          <p className="py-3 text-2xl">Flows are currently at <span className="font-bold"> {currentLevel} cfs</ span> and <span className="font-bold">{currentFeet} feet</span> high at the gauge.</p>
          <p className="py-3 text-2xl">{getReport(currentLevel)}<span style={{ fontSize: 14 }}>  -Atlas</span></p>
          {/* <button className="btn btn-primary">Get Started</button> */}
        </div>
      </div>
    </div>
  )
}

export default CurrentReport
