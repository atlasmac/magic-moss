export function getRange(siteNumber){
  //brennans
  if (siteNumber === 12340500){
    return '3200 - 20,000'
  }
  //zero
  if (siteNumber === 12354500){
    return '2300 - 5500'
  }
  //pipeline
  if (siteNumber === 13337000){
    return '4500 - 15,500'
  }
  return 'unavailable'
}