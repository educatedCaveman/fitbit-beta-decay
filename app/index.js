import document from "document";
import * as drawText from "./draw-text"
import * as nonClock from "./clock"
import * as heartRateMon from "./hrm"
import * as simpleSettings from "./simple/device-settings";


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

    //extra (glitch)
    drawText.drawLittleText(data.glitch, 'extra_fg');
}
// seconds for testing. minutes for IRL
// nonClock.initialize("minutes", clockCallback);
nonClock.initialize("seconds", clockCallback);


/* --------- HRM ---------- */
function hrmCallback(data) {
    //heart rate
    drawText.drawBigText(data.bpm, 'heart_fg')
}
heartRateMon.initialize(hrmCallback);

/* -------- SETTINGS -------- */
function settingsCallback(data) {
    // console.log(JSON.stringify(data))
    // handle no data
    if (!data) {
        return;
    }

    // text color
    if (data.colorText) {
        text.style.fill = data.colorText;
    }

    // text background color
    if (data.colorTextBackground) {
        textBG.style.fill = data.colorTextBackground;
    }

    // text background opacity
    if (data.opacityTextBackground) {
        textBG.style.fillOpacity = data.opacityTextBackground/100;
    }

    // background color
    if (data.colorBackground) {
        background.style.fill = data.colorBackground;
    }

    // lable color
    if (data.colorLabel) {
        label.style.fill = data.colorLabel;
    }

}
simpleSettings.initialize(settingsCallback);