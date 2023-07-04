import * as messaging from "messaging";
import { units } from "user-settings";

let temperatureStr;
const tempUnit = units.temperature;


export function updateWeather() {
    fetchWeather();
}


export function getWeather() {
    // intentionally use == to match null or undefined
    if (tempUnit == undefined) {
        tempUnit = "C";
    }

    // initialization
    if (temperatureStr === undefined) {
        fetchWeather();
        return "--"
    } else {
        // base case
        return temperatureStr;
    }
}


function fetchWeather() {
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
        // Send a command to the companion
        messaging.peerSocket.send({
            command: "weather",
            unit: tempUnit
        });
    }
}


function processWeather(data) {
    const rawTemp = data.temperature;
    const roundTmp = String(Math.round(rawTemp));
    if (rawTemp < -99) {
        temperatureStr = String(roundTmp + tempUnit);
    } else {
        temperatureStr = String(roundTmp + "°" + tempUnit);
    }
}

messaging.peerSocket.addEventListener("open", (evt) => {
    fetchWeather();
});

messaging.peerSocket.addEventListener("message", (evt) => {
    if (evt.data && evt.data.temperature) {
        processWeather(evt.data);
    }
});

messaging.peerSocket.addEventListener("error", (err) => {
    console.error(`Connection error: ${err.code} - ${err.message}`);
});
