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
const stepBG = new FitFont({id:'step_bg', font:'Segment16C_120', halign: 'middle', valign: 'middle'})
// stepBG.text = "•.•.•.•.•.";
stepBG.text = "•.•.•.•.•";
// const battBG = new FitFont({id:'batt_bg', font:'Segment16C_50', halign: 'middle', valign: 'middle'})
// battBG.text = "•.•.•.•.";


// Battery level and status
clock.granularity = "seconds";
// clock.granularity = "minutes";
clock.ontick = (evt) => {

    // let bat_ref = document.getElementById("bat_ref");
    // bat_ref.groupTransform.rotate.angle = 360
    // const battBG = new FitFont({id:'batt_bg', font:'Segment16C_50', halign: 'middle', valign: 'middle'})
    // battBG.text = "•.•.•.•.";

    const level = battery.chargeLevel;
    // const battFG = new FitFont({id:'batt_fg', font:'Segment16C_50', halign: 'middle', valign: 'middle'})
    let lvl_len = String(level).length
    let batt_FG;
    switch (lvl_len) {
        case 3:
            batt_FG = new FitFont({id:'batt_fg_100', font:'Segment16C_50', halign: 'middle', valign: 'middle'})
            break;
        
        case 2:
            batt_FG = new FitFont({id:'batt_fg_10', font:'Segment16C_50', halign: 'middle', valign: 'middle'})
            break;
        
        case 1:
            batt_FG = new FitFont({id:'batt_fg_1', font:'Segment16C_50', halign: 'middle', valign: 'middle'})
            break;
    }
    const percent = String("•••" + level).slice(-3)
    batt_FG.text = String(percent + "%")
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
                hrFG = new FitFont({id:'heart_fg', font:'Segment16C_100', halign: 'middle', valign: 'middle'})
                hrFG.text = String("000" + hr).slice(-3)
            });

            // Automatically stop the sensor when the screen is off to conserve battery
            display.addEventListener("change", () => {
                display.on ? hrm.start() : hrm.stop();
            });

            // stop the monitor when the watch isn't on the body, and turn back on when it is.
            if (!body.present) {
                hrm.stop();
                let hrFG = new FitFont({id:'heart_fg', font:'Segment16C_100', halign: 'middle', valign: 'middle'})
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
    const stepFG = new FitFont({id:'step_fg', font:'Segment16C_120', halign: 'middle', valign: 'middle'})
    stepFG.text = String("00000" + steps).slice(-5)
    // stepFG.text = String("•••••" + steps).slice(-5)
}