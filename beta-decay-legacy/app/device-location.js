import * as messaging from "messaging";
// import * as simpleSettings from "./device-settings";
import * as utils from "./utils";

let sunData;

// export function initialize(callback) {
//     settings = loadSettings();
//     onsettingschange = callback;
//     onsettingschange(settings);
// }

// import * as messaging from "messaging";

export function getSunData(currentTime, tickEvent) {
    if (sunData === undefined) {
        fetchSuntime(currentTime, tickEvent);
    }
    return sunData;
}

export function initialize() {
    fetchSuntime("00:00");
}

function fetchSuntime(currentTime, tickEvent) {
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
        // Send a command to the companion
        messaging.peerSocket.send({
            command: "sunset_sunrise",
            timeStr: currentTime,
            tick: tickEvent
        });
    }
}

function convertAMPM(timeStr) {
    // assumes time is in a format like "9:18:48 PM"
    // note no leading 0's for the hour
    // note it uses AM/PM

    // handle null
    if (timeStr === null) {return timeStr};

    // parse the input value
    let hour, min;
    const time = timeStr.split(":");
    hour = utils.padString(time[0], 2, "0");
    min = utils.padString(time[1], 2, "0");

    // handle PM
    let pm = false;
    if (timeStr.slice(-2) === "PM") {
        pm = true;
    }
    if (pm) {
        hour = parseInt(hour) + 12;
    }

    // return formatted string
    return String(hour + ":" + min);
}

function processSunData(data) {
    //   console.log(`The temperature is: ${data.temperature}`);
    //   console.log(JSON.stringify(data));

    let sunrise = convertAMPM(data.sunrise);
    let sunset = convertAMPM(data.sunset);

    sunData = {"sunrise": sunrise, "sunset": sunset};
}

messaging.peerSocket.addEventListener("open", (evt) => {
    fetchSuntime();
});

messaging.peerSocket.addEventListener("message", (evt) => {
    if (evt.data) {
        processSunData(evt.data);
    }
});

messaging.peerSocket.addEventListener("error", (err) => {
    console.error(`Connection error: ${err.code} - ${err.message}`);
});

// Fetch the weather every 30 minutes
// note: this is the amount if miliseconds
// setInterval(fetchSuntime, 30 * 1000 * 60);

// this converts hours to miliseconds
// setInterval(fetchSuntime, 1000 * 3600 * simpleSettings.getSettingsVal('sunInterval'));
setInterval(fetchSuntime, 60000);


// TODO: do i fetch the info on a schedule here, as above
// TODO: or do i have a getter function here that the complication can take advantage of?

// i think i like the second.
// TODO: but i think i should have an update frequency.