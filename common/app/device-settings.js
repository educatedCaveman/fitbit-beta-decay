import { me } from "appbit";
import * as fs from "fs";
import * as messaging from "messaging";

const SETTINGS_TYPE = "cbor";
const SETTINGS_FILE = "settings.cbor";

let settings, onsettingschange;
const defaults = {
    "complication": "1",
    "dateFmt": "1",
    "modelFmt": "3",
    "colorText": "gold",
    "opacityTextBackground": 50,
    "colorTextBackground": "fb-extra-dark-gray",
    "colorBackground": "black",
    "colorLabel": "lightgray",
    "sunInterval": 1,
    "queryPolitely": true,
    "glitchScroll": false,
    "customizeTextBackground": false,
    "customizeBackground": false,
    "customizeText": false,
    "customizeLabel": false,
    "customTextBackground": "fb-extra-dark-gray",
    "customBackground": "black",
    "customText": "gold",
    "customLabel": "lightgray",
    "tickerText": "",
};

export function initialize(callback) {
    settings = loadSettings();
    // console.log(JSON.stringify(settings));
    onsettingschange = callback;
    onsettingschange(settings);
}


// Received message containing settings data
messaging.peerSocket.addEventListener("message", function (evt) {
    if (settings === undefined) {
        settings = defaults;
    } else if (evt.data === undefined) {
        return;
    } else { }

    settings[evt.data.key] = evt.data.value;
    onsettingschange(settings);
})


// Register for the unload event
me.addEventListener("unload", saveSettings);


// Load settings from filesystem
function loadSettings() {
    let loadedSettings = defaults;
    try {
        loadedSettings = fs.readFileSync(SETTINGS_FILE, SETTINGS_TYPE);
    } catch (ex) {
        saveSettings();
    }
    return loadedSettings;
}


// Save settings to the filesystem
function saveSettings() {
    fs.writeFileSync(SETTINGS_FILE, settings, SETTINGS_TYPE);
}


export function getSettingsVal(settingsKey) {
    try {
        if (typeof (settings[settingsKey]) === "boolean") {
            return settings[settingsKey];
        } else if (settings[settingsKey] === undefined) {
            return;
        } else {
            // for some reason the textinput setting is like {"name":"fuck u"}
            // where most others are like {"values":[{"name":"Ticker","value":"9"}],"selected":[8]}
            if (settings[settingsKey].values === undefined) {
                return settings[settingsKey].name;
            } else {
                return settings[settingsKey].values[0].value;
            }
        }
    } catch (ex) {
        // do nothing?
    }

}