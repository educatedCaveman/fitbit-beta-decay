import * as document from "document";
import * as simpleSettings from "./simple/device-settings";

import * as drawText from "./simple/draw-text"
import * as nonClock from "./simple/clock"
import * as heartRateMon from "./simple/hrm"
import * as widgetSelector from "./simple/widgets/selector"
// import * as altitude from "./simple/widgets/altitude"

let widgetType = 0;
// let altPressure = -1;

// TODO: split these sections ount into different files.

/* --------- DRAW BACKGROUND ---------- */
drawText.drawBackground();


/* --------- CLOCK ---------- */
// steps, battery level, and extra thingy
function clockCallback(data) {
    //steps
    drawText.drawBigText(data.steps, 'step_fg')
    //batt
    drawText.drawLittleText(data.batt, 'batt_fg')
    //extra
    //how to handle clock?
    let widget_txt = widgetSelector.updateWidget(widgetType)
    drawText.drawLittleText(widget_txt, 'extra_fg');
}
nonClock.initialize("seconds", clockCallback);



// /* --------- ALTITUDE ---------- */
// function pressureCallback(data) {
//     //heart rate
//     altPressure = data.pressure;
//     console.log("callback pressure: " + altPressure);
// }
// altitude.initialize(pressureCallback);


/* --------- HRM ---------- */
function hrmCallback(data) {
    //heart rate
    drawText.drawBigText(data.bpm, 'heart_fg')
}
heartRateMon.initialize(hrmCallback);


/* -------- SETTINGS -------- */
let background = document.getElementById("background");
let text_bg = document.getElementById("text_bg");
let foreground = document.getElementById("foreground");
// let widget = document.getElementById("foreground");

function settingsCallback(data) {
    // console.log(JSON.stringify(data, null, 4))
    if (!data) {
        return;
    }
    if (data.colorBackground) {
        background.style.fill = data.colorBackground;
    }
    if (data.colorTextBackground) {
        text_bg.style.fill = data.colorTextBackground;
    }
    if (data.colorText) {
        foreground.style.fill = data.colorText;
    }
    if (data.widgetType) {
        widgetType = data.widgetType.values[0].value;
        drawText.drawLittleText(widgetSelector.updateWidget(widgetType), 'extra_fg');
    }
}
simpleSettings.initialize(settingsCallback);

