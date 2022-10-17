export function getGif(siteNumber){
  //brennans
  if (siteNumber === '12340500'){
    return '/gifs/brennans.gif'
  }
  //zero
  if (siteNumber === '12354500'){
    return '/gifs/zero.gif'
  }
  //pipeline
  if (siteNumber === '13337000'){
    return '/gifs/lochsa.gif'
  }
  return '/gifs/brennans-small.gif'
}