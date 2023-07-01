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


function querySunsetSunrise(lat, lon, timeStr, tick) {
    // formattedURL = String(ENDPOINT + "lat=" + lat + "&lng=" + lon);

    fetch(String(ENDPOINT + "lat=" + lat + "&lng=" + lon))
        .then(function (response) {
            response.json()
                .then(function (data) {
                    // console.log('fetching times')
                    // TODO: handle getting the next day's sunrise
                    let sunrise = data["results"]["sunrise"];
                    let sunset = data["results"]["sunset"];

                    // TODO: need to complete this function (figure out how to best get next date)
                    // let fmtSunset = sunset.substring(0, sunset.length - 3);
                    // if (fmtSunset > timeStr) {
                    //     sunrise = querySunsetSunrise(lat, lon, tick)
                    // }


                    console.log("sunrise: " + sunrise + ", sunset: " + sunset);
                    data = {"sunrise": sunrise, "sunset": sunset};

                    // Send the sun data to the device
                    returnSunData(data);
                });
        })
        .catch(function (err) {
            console.error(`Error fetching weather: ${err}`);
        });
}

function padString(val, len, pad) {
    // make sure the value to pad onto the input is defined.
    // defaults to 0
    if (pad === undefined) {
        pad = "0";
    }

    // create the string to fill with
    let paddedString = "";
    for (let i = 0; i < len; i++) {
        paddedString += pad;
    }

    // format the value
    const valFmt = String(paddedString + val).slice(-len)

    return valFmt
}


function queryNextSunrise(lat, lon, tick) {
    // formattedURL = String(ENDPOINT + "lat=" + lat + "&lng=" + lon);

    // TODO get next day based on input date
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    fetch(String(ENDPOINT + "lat=" + lat + "&lng=" + lon + "&date=" + ))
        .then(function (response) {
            response.json()
                .then(function (data) {
                    // console.log('fetching times')
                    // TODO: handle getting the next day's sunrise
                    let sunrise = data["results"]["sunrise"];
                    let sunset = data["results"]["sunset"];

                    let fmtSunset = sunset.substring(0, sunset.length - 3);


                    console.log("sunrise: " + sunrise + ", sunset: " + sunset);
                    data = {"sunrise": sunrise, "sunset": sunset};

                    // Send the sun data to the device
                    returnSunData(data);
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
    if (evt.data && evt.data.command === "sunset_sunrise") {
        let lat, lon;
        geolocation.getCurrentPosition(function (position) {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            // console.log(position.coords.latitude + ", " + position.coords.longitude);
        })
        returnSunData(querySunsetSunrise(lat, lon, evt.data.timeStr, evt.data.tick));
    }
});

messaging.peerSocket.addEventListener("error", (err) => {
    console.error(`Connection error: ${err.code} - ${err.message}`);
});