import { today } from "user-activity";
import { me as appbit } from "appbit";

export function getFormattedSteps() {
    // update the steps
    let step_fmt = String();

    // TODO: if i add the ability for multiple font types, i would need to have a way to 
    // switch between the 2 different output formats here
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

    return step_fmt;

}

