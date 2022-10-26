export function getLocation(siteNumber){
  //brennans
  if (siteNumber === 12340500){
    return 'https://goo.gl/maps/oEpM7AprKXVw4DXz5'
  }
  //zero
  if (siteNumber === 12354500){
    return 'https://goo.gl/maps/NUyW2mcyiWwQJxWj7'
  }
  //pipeline
  if (siteNumber === 13337000){
    return 'https://goo.gl/maps/65rwVU1ZetpmsfPj8'
  }
  //lunchcounter
  if (siteNumber === 13022500){
    return 'https://goo.gl/maps/eu68KcMiGrQxiVGXA'
  }

  
  return 'https://www.google.com/maps'
}