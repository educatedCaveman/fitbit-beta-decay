import * as drawText from "./draw-text"
import * as nonClock from "./clock"
import * as heartRateMon from "./hrm"

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
