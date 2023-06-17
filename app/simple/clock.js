import clock from "clock";
import { today } from "user-activity";
import { battery } from "power";
import { me as appbit } from "appbit";

let clockCallback;

export function initialize(granularity, callback) {
    clock.granularity = granularity;
    clockCallback = callback;
    clock.addEventListener("tick", tickHandler);
}

function tickHandler(evt) {
    // update the steps
    let step_fmt;

    if (today && appbit.permissions.granted("access_activity")) {
        const steps = today.adjusted.steps;
        let step_str = String(steps);
        if (step_str.length > 3) {
            let k_step = step_str.slice(0, -3)
            let step_fraction;
            // 1k-9.99k
            if (k_step.length === 1) {
                step_fraction = step_str.slice(-3, -1)
                step_fmt = String(k_step + "." + step_fraction + "k")
            }
            // >= 10k
            else {
                step_fraction = step_str.slice(-3, -2)
                step_fmt = String(k_step + "." + step_fraction + "k")
            }
        } else {
            step_fmt = step_str
        }
    }

    // battery percentage string
    let batt_str = String(battery.chargeLevel + "%");

    //extra string:
    let extraString = "12345";

    clockCallback({ steps: step_fmt, batt: batt_str, extra: extraString });

}

