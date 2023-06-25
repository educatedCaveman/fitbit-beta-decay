import "./globals";
import { generateGlitchTxt } from "./glitch";
import { format_steps } from "./steps";
import clock, { TickEvent } from "clock";
import { battery } from "power";
import * as drawText from "./draw-text"
// import * as heartRateMon from "./simple/hrm";



/* --------- DRAW BACKGROUND ---------- */
drawText.drawBackground();



/* --------- CLOCK ---------- */
clock.granularity = "seconds";
function handleTick(event: TickEvent): void {
    // draw the updates
    //steps
    drawText.drawBigText(format_steps(), 'step_fg');

    //batt
    drawText.drawLittleText(String(battery.chargeLevel + "%"), 'batt_fg');

    // //extra (glitch)
    drawText.drawLittleText(generateGlitchTxt(), 'extra_fg');
}


/* --------- HRM ---------- */
// function hrmCallback(data) {
//     //heart rate
//     drawText.drawBigText(data.bpm, 'heart_fg')
// }
// heartRateMon.initialize(hrmCallback);
