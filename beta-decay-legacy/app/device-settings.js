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
    "opacityTextBackground": 35,
    "colorTextBackground": "fb-extra-dark-gray",
    "colorBackground": "black",
    "colorLabel": "lightgray",
    "sunInterval": 4
};

export function initialize(callback) {
    settings = loadSettings();
    console.log(JSON.stringify(settings));
    onsettingschange = callback;
    onsettingschange(settings);
}


// Received message containing settings data
messaging.peerSocket.addEventListener("message", function (evt) {
    console.log("companion settings data: " + JSON.stringify(evt))

    // TODO: this needs rewriting

    if (settings === undefined) {
        settings = defaults;
    } else if (evt.data === undefined) {
        // do nothing
        // this message is not for us
        return;
    }

    settings[evt.data.key] = evt.data.value;
    onsettingschange(settings);
})


// Register for the unload event
me.addEventListener("unload", saveSettings);


// Load settings from filesystem
function loadSettings() {
    let loadedSettings = defaults;
    try {
        // return fs.readFileSync(SETTINGS_FILE, SETTINGS_TYPE);
        console.log('trying to load settings')
        loadedSettings = fs.readFileSync(SETTINGS_FILE, SETTINGS_TYPE);
        console.log('loaded settings')
    } catch (ex) {
        // return {};
        console.log('using default settings')
        saveSettings();
        // return settings;
    }
    return loadedSettings;
}


// Save settings to the filesystem
function saveSettings() {
    fs.writeFileSync(SETTINGS_FILE, settings, SETTINGS_TYPE);
}


export function getSettingsVal(settingsKey) {
    let settingsVal;
    try {
        settingsVal = settings[settingsKey].values[0].value
    } catch (ex) {
        // do nothing
    }
    return settingsVal
}