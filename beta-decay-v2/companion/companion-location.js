import * as messaging from "messaging";
import { geolocation } from "geolocation";
import * as utils from "../app/utils";

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

    fetch(String(ENDPOINT + "lat=" + lat + "&lng=" + lon + "&date=" + todayStr))
        .then(function (response) {
            response.json()
                .then(function (data) {
                    // console.log(JSON.stringify(data))
                    if (data['status'] === "OK") {
                        let sunrise = data["results"]["sunrise"];
                        let sunset = data["results"]["sunset"];

                        // handle getting the next day's sunrise
                        // after sunset, we need the next day's sunrise
                        let fmtSunset = utils.convertAMPM24h(sunset);
                        if (fmtSunset < now) {
                            sunrise = queryNextSunrise(lat, lon, tomorrowStr)
                        }

                        // Send the sun data to the device
                        console.log('fetched new times')
                        returnSunData({ "sunrise": sunrise, "sunset": sunset });
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
                    // console.log(JSON.stringify(data))
                    if (data['status'] === "OK") {
                        let sunrise = data["results"]["sunrise"];
                        let fmtSunrise = sunrise.substring(0, sunrise.length - 3);
                        return fmtSunrise;
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
            // console.log("lat: " + lat + " lon: " + lon)
            returnSunData(querySunsetSunrise(lat, lon));
        })
    }
});


messaging.peerSocket.addEventListener("error", (err) => {
    console.error(`Connection error: ${err.code} - ${err.message}`);
});