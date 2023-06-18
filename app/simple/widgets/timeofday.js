// TODO
// TODO: only check once per hour, at most
// TODO: have setting for different types of sunup/sundown? (dawn/dusk, sunrise/sunset)
// TODO: calculate time remaining in whichever period
// TODO: figure out if any of this needs to be in the companion app
// TODO: with whatever the interval of checking is, have a check to do a check ahead of time if there is no data
// TODO: 
// TODO: 

// https://sunrisesunset.io/api/
// Coordinates for New York
// TODO: get the actual location
// https://dev.fitbit.com/build/reference/companion-api/geolocation/
// https://dev.fitbit.com/build/guides/geolocation/
const latitude = 40.71427
const longitude = -74.00597
const url = `https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}`


// todo: use the fitbit api for performing this?
// https://dev.fitbit.com/build/reference/companion-api/fetch/
fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data)
  })
  .catch(error => console.error('Error:', error))
