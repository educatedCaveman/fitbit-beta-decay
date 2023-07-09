import * as messaging from "messaging";
import { geolocation } from "geolocation";
import * as utils from "../app/utils"

var ENDPOINT = "https://api.sunrisesunset.io/json?";


function querySunsetSunrise(lat, lon) {

    // get next day based on current date
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const todayStr = today.toISOString().substring(0, 10);
    const tomorrowStr = tomorrow.toISOString().substring(0, 10);
    const hourStr = utils.padString(today.getHours(), 2, "0");
    const minsStr = utils.padString(today.getMinutes(), 2, "0");
    const now = String(hourStr + ":" + minsStr);

    fetch(String(ENDPOINT + "lat=" + lat + "&lng=" + lon + "&date=" + todayStr))
        .then(function (response) {
            response.json()
                .then(function (data) {
                    if (data['status'] === "OK") {
                        let sunrise = data["results"]["sunrise"];
                        let sunset = data["results"]["sunset"];

                        // handle getting the next day's sunrise
                        // after sunset, we need the next day's sunrise
                        let fmtSunset = utils.convertAMPM24h(sunset);
                        if (fmtSunset < now) {
                            sunrise = queryNextSunrise(lat, lon, tomorrowStr)
                        }
                        let fmtSunrise = utils.convertAMPM24h(sunrise);

                        // Send the sun data to the device
                        console.log('fetched new times')
                        returnSunData({ "sunrise": fmtSunrise, "sunset": fmtSunset });
                    } else {
                        return;
                    }
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
                    if (data['status'] === "OK") {
                        return data["results"]["sunrise"];
                    } else {
                        return;
                    }
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
        geolocation.getCurrentPosition(function (position) {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            returnSunData(querySunsetSunrise(lat, lon));
        })
    }
});


messaging.peerSocket.addEventListener("error", (err) => {
    console.error(`Connection error: ${err.code} - ${err.message}`);
});