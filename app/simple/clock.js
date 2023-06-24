import clock from "clock";
import { today } from "user-activity";
import { battery } from "power";
import { me as appbit } from "appbit";

let clockCallback;
let extASCII = "!\"#$%&()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~€‚ƒ„…†‡ˆ‰Š‹ŒŽ‘’“”•–—˜™š›œžŸ¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ█"


export function initialize(granularity, callback) {
    clock.granularity = granularity;
    clockCallback = callback;
    clock.addEventListener("tick", tickHandler);
}

function generateGlitchTxt() {
    let glitchStr = "";
    for (let i = 0; i < 5; i++) {
        let index = Math.floor(Math.random() * extASCII.length);
        glitchStr = glitchStr + extASCII[index];
    }
    return glitchStr;
}

function tickHandler(evt) {
    // update the steps
    let step_fmt;

    if (today && appbit.permissions.granted("access_activity")) {
        const steps = today.adjusted.steps;
        let step_str = String(steps);
        if (step_str.length > 3) {
            let k_step = step_str.slice(0, -3)
            let step_fraction = step_str.slice(-3);
            step_fmt = String(k_step + "." + step_fraction);
        } else {
            step_fmt = step_str
        }
    }

    // battery percentage string
    let batt_str = String(battery.chargeLevel + "%");

    // callback
    clockCallback({ 
        steps: step_fmt, 
        batt: batt_str,
        glitch: generateGlitchTxt(),
    });

}

