import * as messaging from "messaging";
import * as utils from "./utils";

let sunData;


export function updateSunData() {
    // console.log("updateSunData() called")
    fetchSuntime();
}


export function getSunData() {
    // sunData being undefined is handled in the complication code.
    if (sunData === undefined) {
        fetchSuntime();
    }
    return sunData;
}


function fetchSuntime() {    
    // console.log("fetchSuntime() called")
    // console.log(JSON.stringify(sunData))
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
        // Send a command to the companion
        // console.log('about to send message')
        messaging.peerSocket.send({
            command: "sunset_sunrise"
        });
        // console.log('sent message')
    }
}


function processSunData(data) {
    let sunrise = utils.convertAMPM24h(data.sunrise);
    let sunset = utils.convertAMPM24h(data.sunset);
    sunData = { "sunrise": sunrise, "sunset": sunset };
}

messaging.peerSocket.addEventListener("open", (evt) => {
    fetchSuntime();
});

messaging.peerSocket.addEventListener("message", (evt) => {
    if (evt.data && evt.data.sunrise && evt.data.sunset) {
        processSunData(evt.data);
    }
});

messaging.peerSocket.addEventListener("error", (err) => {
    console.error(`Connection error: ${err.code} - ${err.message}`);
});
