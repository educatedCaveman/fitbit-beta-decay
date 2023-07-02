import * as messaging from "messaging";
import { geolocation } from "geolocation";

// let location;

// export function initialize() {
//     // do stuff here
//     geolocation.getCurrentPosition(function(position) {
//         console.log(position.coords.latitude + ", " + position.coords.longitude);
//      })
// }

// example
// https://api.sunrisesunset.io/json?lat=48.13194&lng=11.54944

// var API_KEY = "your-key-goes-here";
var ENDPOINT = "https://api.sunrisesunset.io/json?";


function querySunsetSunrise(lat, lon) {

    // get next day based on current date
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const todayStr = today.toISOString().substring(0, 10);
    const tomorrowStr = tomorrow.toISOString().substring(0, 10);
    const hourStr = String("00" + today.getHours()).slice(-2);
    const minsStr = String("00" + today.getMinutes()).slice(-2);
    const now = String(hourStr + ":" + minsStr);


    // formattedURL = String(ENDPOINT + "lat=" + lat + "&lng=" + lon);

    fetch(String(ENDPOINT + "lat=" + lat + "&lng=" + lon + "&date=" + todayStr))
        .then(function (response) {
            response.json()
                .then(function (data) {
                    // console.log('fetching times')
                    let sunrise = data["results"]["sunrise"];
                    let sunset = data["results"]["sunset"];

                    // TODO: handle getting the next day's sunrise
                    // after sunset, we need the next day's sunrise
                    let fmtSunrise = sunrise.substring(0, sunrise.length - 3);
                    console.log("formatted sunrise1: " + fmtSunrise);
                    console.log("current time: " + now);
                    if (fmtSunrise < now) {
                        sunrise = queryNextSunrise(lat, lon, tomorrowStr)
                    }

                    console.log("sunrise: " + sunrise + ", sunset: " + sunset);
                    data = { "sunrise": sunrise, "sunset": sunset };

                    // Send the sun data to the device
                    returnSunData(data);
                });
        })
        .catch(function (err) {
            console.error(`Error fetching weather: ${err}`);
        });
}


function queryNextSunrise(lat, lon, tomorrow) {
    // fetch the data
    fetch(String(ENDPOINT + "lat=" + lat + "&lng=" + lon + "&date=" + tomorrow))
        .then(function (response) {
            response.json()
                .then(function (data) {
                    let sunrise = data["results"]["sunrise"];
                    let fmtSunrise = sunrise.substring(0, sunrise.length - 3);
                    console.log("tomorrow's sunrise: " + fmtSunrise);
                    return fmtSunrise;
                });
        })
        .catch(function (err) {
            console.error(`Error fetching weather: ${err}`);
        });
}


function returnSunData(data) {
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
        messaging.peerSocket.send(data);
    } else {
        console.error("Error: Connection is not open");
    }
}

messaging.peerSocket.addEventListener("message", (evt) => {
    console.log("location companion event listener data: " + JSON.stringify(evt));
    if (evt.data && evt.data.command === "sunset_sunrise") {
        let lat, lon;
        geolocation.getCurrentPosition(function (position) {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            // console.log(position.coords.latitude + ", " + position.coords.longitude);
        })
        returnSunData(querySunsetSunrise(lat, lon));
    }
});

messaging.peerSocket.addEventListener("error", (err) => {
    console.error(`Connection error: ${err.code} - ${err.message}`);
});