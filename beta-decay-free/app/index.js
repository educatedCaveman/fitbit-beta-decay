import document from "document";
import * as drawText from "../../common/app/draw-text.js"
import * as nonClock from "../../common/app/clock.js"
import * as heartRateMon from "../../common/app/hrm.js"


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

