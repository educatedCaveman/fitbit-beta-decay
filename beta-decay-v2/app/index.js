import document from "document";
import * as drawText from "../../common/app/draw-text"
import * as nonClock from "../../common/app/clock"
import * as heartRateMon from "../../common/app/hrm"
import * as simpleSettings from "../../common/app/device-settings"

/* --------- Document/UI elements ---------- */
let background = document.getElementById("background");
let textBG = document.getElementById("text_bg");
let text = document.getElementById("foreground");
let label = document.getElementById("label");


/* --------- DRAW BACKGROUND ---------- */
drawText.drawBackground();


/* --------- CLOCK ---------- */
// steps, battery level, and extra thingy
function clockCallback(data) {
    //steps
    drawText.drawBigText(data.steps, 'step_fg');

    //batt
    drawText.drawLittleText(data.batt, 'batt_fg');

    //complication
    drawText.drawLittleText(data.comp, 'comp_fg');
}
// seconds for testing. minutes for IRL
nonClock.initialize("seconds", clockCallback);


/* --------- HRM ---------- */
function hrmCallback(data) {
    //heart rate
    drawText.drawBigText(data.bpm, 'heart_fg')
}
heartRateMon.initialize(hrmCallback);


/* -------- SETTINGS -------- */
function settingsCallback(data) {
    // handle no data
    if (!data) {
        return;
    }

    // text color
    if (data.colorText) {
        text.style.fill = data.colorText;
    }

    // text background color. preset
    if (data.colorTextBackground) {
        textBG.style.fill = data.colorTextBackground;
    }

    // text background opacity
    if (data.opacityTextBackground) {
        textBG.style.fillOpacity = data.opacityTextBackground / 100;
    }

    // background color
    if (data.colorBackground) {
        background.style.fill = data.colorBackground;
    }

    // label color
    if (data.colorLabel) {
        label.style.fill = data.colorLabel;
    }

    // override/custom colors
    // text color
    if (data.customText && simpleSettings.getSettingsVal('customizeText')) {
        text.style.fill = data.customText.name;
    }
    // text background color
    if (data.customTextBackground && simpleSettings.getSettingsVal('customizeTextBackground')) {
        textBG.style.fill = data.customTextBackground.name;
    }
    // background color
    if (data.customBackground && simpleSettings.getSettingsVal('customizeBackground')) {
        background.style.fill = data.customBackground.name;
    }
    // label color
    if (data.customLabel && simpleSettings.getSettingsVal('customizeLabel')) {
        label.style.fill = data.customLabel.name;
    }

}
simpleSettings.initialize(settingsCallback);
