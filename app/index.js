import * as document from "document";
import * as simpleSettings from "./simple/device-settings";
import * as drawText from "./simple/draw-text"
import * as nonClock from "./simple/clock"
import * as heartRateMon from "./simple/hrm"
import * as widgetSelector from "./simple/widgets/selector"

let widgetType = 0;
let widgetValue = null;


/* --------- DRAW BACKGROUND ---------- */
drawText.drawBackground();


/* --------- CLOCK ---------- */
// steps, battery level, and extra thingy
function clockCallback(data) {
    //steps
    drawText.drawBigText(data.steps, 'step_fg');

    //batt
    drawText.drawLittleText(data.batt, 'batt_fg');

    //extra
     let widget_info = {
        widgetType: widgetType,
        currentValue: widgetValue,
        year: data.year,
        month: data.month,
        day: data.day,
        hour: data.hrs,
        mins: data.mins,
        secs: data.secs,
    };

    // update the widget value, depending on the type, currnt value, and date/time
    widgetValue = widgetSelector.updateWidget(widget_info);

    // whatever the value, redraw it, regardless of wether it changed or not
    drawText.drawLittleText(widgetValue, 'extra_fg');
}
nonClock.initialize("seconds", clockCallback);



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
        // reset the widget
        let widget_info = {
            widgetType: data.widgetType.values[0].value,
            currentValue: null,
            year: 0,
            month: 0,
            day: 0,
            hour: 0,
            mins: 0,
            secs: 0,
        }
        
        drawText.drawLittleText(widgetSelector.updateWidget(widget_info), 'extra_fg');
    }
}
simpleSettings.initialize(settingsCallback);

