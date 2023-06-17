/*
  Responsible for loading, applying and saving settings.
  Requires companion/simple/companion-settings.js
  Callback should be used to update your UI.
*/
import { me } from "appbit";
import { me as device } from "device";
import * as fs from "fs";
import * as messaging from "messaging";

// import * as widgetSelector from "./widgets/selector"

const SETTINGS_TYPE = "cbor";
const SETTINGS_FILE = "settings.cbor";

let settings, onsettingschange;

export function initialize(callback) {
  settings = loadSettings();
  onsettingschange = callback;
  onsettingschange(settings);
}

// Received message containing settings data
messaging.peerSocket.addEventListener("message", function(evt) {
  console.log(JSON.stringify(evt, null, 4));
  settings[evt.data.key] = evt.data.value;
  // settings[evt.key] = evt.value;
  onsettingschange(settings);
})

// Register for the unload event
me.addEventListener("unload", saveSettings);

// // Load settings from filesystem
// function loadSettings() {
//   try {
//     return fs.readFileSync(SETTINGS_FILE, SETTINGS_TYPE);
//   } catch (ex) {
//     return {};
//   }
// }

// https://community.fitbit.com/t5/SDK-Development/Saving-Color-Select-Settings/td-p/2991982
// Load settings from filesystem
function loadSettings() {
  try {
    let savedSettings = fs.readFileSync(SETTINGS_FILE, SETTINGS_TYPE);
    if (typeof savedSettings === "undefined") {
      return {};
    } else {
      return savedSettings;
    }
  } catch (ex) {
    return {};
  }
}

// Save settings to the filesystem
function saveSettings() {
  fs.writeFileSync(SETTINGS_FILE, settings, SETTINGS_TYPE);
}