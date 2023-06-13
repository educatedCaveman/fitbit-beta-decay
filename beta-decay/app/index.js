import clock from "clock";
import * as document from "document";
// import { preferences } from "user-settings";
import { HeartRateSensor } from "heart-rate";
import { FitFont } from 'fitfont';
import { me as appbit } from "appbit";
import { today } from "user-activity";
import { display } from "display";
import { BodyPresenceSensor } from "body-presence";
import { battery } from "power";
import { charger } from "power";


// background for the HR monitor
const heartBG = new FitFont({id:'heart_bg', font:'Segment16C_100', halign: 'middle', valign: 'middle'})
heartBG.text = "•.•.•.";
// the background for the step counter
const stepBG = new FitFont({id:'step_bg', font:'Segment16C_100', halign: 'middle', valign: 'middle'})
stepBG.text = "•.•.•.•.•.";
// the background for the battery stus
// maybe have a stus message, too?
const battBG = new FitFont({id:'batt_bg', font:'Segment16C_50', halign: 'middle', valign: 'middle'})
battBG.text = "•.•.•.•.•.•.•.•.•.•.•.";


// Battery level and status
clock.granularity = "seconds";
// clock.granularity = "minutes";
clock.ontick = (evt) => {
    const level = battery.chargeLevel;
    const battFG = new FitFont({id:'batt_fg_hi', font:'Segment16C_50', halign: 'middle', valign: 'middle'})
    const percent = String("000" + level).slice(-3)
    battFG.text = String("BATT:••" + percent + "%")
}


// detect body presence, and start/stop the Heart rate monitor accordingly.
if (BodyPresenceSensor) {
    const body = new BodyPresenceSensor();
    body.addEventListener("reading", () => {
        if (HeartRateSensor && appbit.permissions.granted("access_heart_rate")) {
            const hrm = new HeartRateSensor();

            // listen for changes to the heartrate
            hrm.addEventListener("reading", () => {
                const hr = hrm.heartRate;
                console.log("Current heart rate: " + hr);
                // const hr_len = String(hr).length;
                let hrFG;
                hrFG = new FitFont({id:'heart_fg_3', font:'Segment16C_100', halign: 'middle', valign: 'middle'})
                hrFG.text = String("000" + hr).slice(-3)
            });

            // Automatically stop the sensor when the screen is off to conserve battery
            display.addEventListener("change", () => {
                display.on ? hrm.start() : hrm.stop();
            });

            // stop the monitor when the watch isn't on the body, and turn back on when it is.
            if (!body.present) {
                hrm.stop();
                let hrFG = new FitFont({id:'heart_fg_3', font:'Segment16C_100', halign: 'middle', valign: 'middle'})
                hrFG.text = String("---")
            } else {
                hrm.start();
            }

            // start the heart rate monitor
            hrm.start();
        }
    });

    // automatically stop the sensor when the screen is off to conserve battery
    display.addEventListener("change", () => {
        display.on ? body.start() : body.stop()
    })

    body.start();
}




if (today && appbit.permissions.granted("access_activity")) {
    const steps = today.adjusted.steps
    const step_len = String(steps).length;
    console.log(step_len)
    let stepFG;
    switch (step_len) {
        case 5:
            stepFG = new FitFont({id:'step_fg_5', font:'Segment16C_100', halign: 'middle', valign: 'middle'})
            break;
        case 4:
            stepFG = new FitFont({id:'step_fg_4', font:'Segment16C_100', halign: 'middle', valign: 'middle'})
            break;
        case 3:
            stepFG = new FitFont({id:'step_fg_3', font:'Segment16C_100', halign: 'middle', valign: 'middle'})
            break;
        case 2:
            stepFG = new FitFont({id:'step_fg_2', font:'Segment16C_100', halign: 'middle', valign: 'middle'})
            break;
        case 0:
            stepFG = new FitFont({id:'step_fg_1', font:'Segment16C_100', halign: 'middle', valign: 'middle'})
            break;
        case 1:
            stepFG = new FitFont({id:'step_fg_0', font:'Segment16C_100', halign: 'middle', valign: 'middle'})
            break;
        //todo: make a message here?
        default:
            steps = "00000"
            break;
    }
    stepFG.text = String("·····" + steps).slice(-5)    
    console.log(stepFG.text)
}