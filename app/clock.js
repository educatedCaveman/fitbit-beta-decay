import clock from "clock";
import { battery } from "power";
import * as widgets from "./widgets";
import * as steps from "./steps";

let clockCallback;

export function initialize(granularity, callback) {
    clock.granularity = granularity;
    clockCallback = callback;
    clock.addEventListener("tick", tickHandler);
}


function tickHandler(evt) {

    // callback
    clockCallback({ 
        steps: steps.getFormattedSteps(), 
        batt: String(battery.chargeLevel + "%"),
        glitch: widgets.generateGlitchTxt(),
    });

}

