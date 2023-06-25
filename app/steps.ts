import { today } from "user-activity";
import { me as appbit } from "appbit";


export function format_steps(): String {
    let step_fmt: String;
    // let test: PermissionName = "push";
    // if (today && appbit.permissions.granted("access_activity")) {
    if (today) {
        const steps: Number = today.adjusted.steps;
        let step_str: String = String(steps);
        if (step_str.length > 3) {
            let k_step: String = step_str.slice(0, -3)
            let step_fraction: String;
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

    //formatted steps:
    return step_fmt

}

