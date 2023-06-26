import clock from "clock";
import { battery } from "power";
import * as complication from "./complications";
import * as steps from "./steps";
import * as simpleSettings from "./device-settings";

let clockCallback;

export function initialize(granularity, callback) {
    clock.granularity = granularity;
    clockCallback = callback;
    clock.addEventListener("tick", tickHandler);
}


function tickHandler(evt) {

    // handle complication
    let compType = simpleSettings.getCompType();
    let compText = complication.getCompText(compType, evt);

    // callback
    clockCallback({ 
        steps: steps.getFormattedSteps(), 
        batt: String(battery.chargeLevel + "%"),
        comp: compText,
    });

}

