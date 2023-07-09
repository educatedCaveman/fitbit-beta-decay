import * as messaging from "messaging";
import { me as companion } from "companion";
import weather from "weather";


function queryWeather(units) {
    if (companion.permissions.granted("access_location")) {
        weather
            .getWeatherData(units)
            .then((data) => {
                if (data.locations.length > 0) {
                    const temp = Math.round(data.locations[0].currentWeather.temperature);
                    // have to call this function here.  not sure why passing the object through doesn't work.
                    returnWeatherData({ "temperature": temp });
                }
            })
            .catch((ex) => {
                console.error(ex);
            });
    }
}


function returnWeatherData(data) {
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
        messaging.peerSocket.send(data);
    } else {
        console.error("Error: Connection is not open");
    }
}


// {"temperatureUnit": "fahrenheit"}
// {"temperatureUnit": "celcius"}
messaging.peerSocket.addEventListener("message", (evt) => {
    if (evt.data && evt.data.command === "weather" && evt.data.unit) {
        if (evt.data.unit === "F") {
            queryWeather({ "temperatureUnit": "fahrenheit" })
        } else {
            queryWeather({ "temperatureUnit": "celsius" })
        }
    }
});


messaging.peerSocket.addEventListener("error", (err) => {
    console.error(`Connection error: ${err.code} - ${err.message}`);
});