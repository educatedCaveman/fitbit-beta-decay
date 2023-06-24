import * as drawText from "./simple/draw-text"
import * as nonClock from "./simple/clock"
import * as heartRateMon from "./simple/hrm"

/* --------- DRAW BACKGROUND ---------- */
drawText.drawBackground();

/* --------- CLOCK ---------- */
// steps, battery level, and extra thingy
function clockCallback(data) {
    //steps
    drawText.drawBigText(data.steps, 'step_fg');

    //batt
    // drawText.drawLittleText(data.batt, 'batt_fg');

    //extra (glitch)
    // drawText.drawLittleText(data.glitch, 'extra_fg');
}
nonClock.initialize("seconds", clockCallback);


/* --------- HRM ---------- */
function hrmCallback(data) {
    //heart rate
    drawText.drawBigText(data.bpm, 'heart_fg')
}
heartRateMon.initialize(hrmCallback);
