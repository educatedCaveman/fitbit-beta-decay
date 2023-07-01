import { me } from "appbit";
import * as fs from "fs";
import * as messaging from "messaging";

const SETTINGS_TYPE = "cbor";
const SETTINGS_FILE = "settings.cbor";

// let settings, onsettingschange;
let settings = {
    "complication":             "1",
    "dateFmt":                  "1",
    "modelFmt":                 "3",
    "colorText":                "gold",
    "opacityTextBackground":    35,
    "colorTextBackground":      "fb-extra-dark-gray",
    "colorBackground":          "black",
    "colorLabel":               "lightgray"
};
let onsettingschange;

export function initialize(callback) {
    settings = loadSettings();
    onsettingschange = callback;
    onsettingschange(settings);
}


// Received message containing settings data
messaging.peerSocket.addEventListener("message", function (evt) {
    settings[evt.data.key] = evt.data.value;
    onsettingschange(settings);
})


// Register for the unload event
me.addEventListener("unload", saveSettings);


// Load settings from filesystem
function loadSettings() {
    let loadedSettings = settings;
    try {
        // return fs.readFileSync(SETTINGS_FILE, SETTINGS_TYPE);
        loadedSettings = fs.readFileSync(SETTINGS_FILE, SETTINGS_TYPE);
    } catch (ex) {
        // return {};
        saveSettings();
        // return settings;
    }
    return loadedSettings;
}


// Save settings to the filesystem
function saveSettings() {
    fs.writeFileSync(SETTINGS_FILE, settings, SETTINGS_TYPE);
}


export function getCompType() {
    let settingsVal = "1";
    try {
        settingsVal = settings['complication'].values[0].value
    } catch (ex) {
        // do nothing
    }
    return settingsVal
}


export function getDateFmt() {
    let settingsVal = "1";
    try {
        settingsVal = settings['dateFmt'].values[0].value
    } catch (ex) {
        // do nothing
    }
    return settingsVal
}


export function getModelTruncation() {
    let settingsVal = false;
    try {
        settingsVal = settings['modelFmt'].values[0].value
    } catch (ex) {
        // do nothing
    }
    return settingsVal
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