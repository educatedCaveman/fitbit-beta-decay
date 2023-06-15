import clock from "clock";
import * as document from "document";
import { HeartRateSensor } from "heart-rate";
import { FitFont } from 'fitfont';
import { me as appbit } from "appbit";
import { today } from "user-activity";
import { display } from "display";
import { BodyPresenceSensor } from "body-presence";
import { battery } from "power";
import * as simpleSettings from "./simple/device-settings";
import { Barometer } from "barometer";


// TODO: split these sections ount into different files.

// background for the HR monitor
const heartBG = new FitFont({ id: 'heart_bg', font: 'Repetition_Scrolling_120', halign: 'end', valign: 'middle' })
heartBG.text = "███";

// the background for the step counter
const stepBG = new FitFont({ id: 'step_bg', font: 'Repetition_Scrolling_120', halign: 'end', valign: 'middle' })
stepBG.text = "█████";

// battery background
const battBG = new FitFont({ id: 'batt_bg', font: 'Repetition_Scrolling_50', halign: 'end', valign: 'middle' })
battBG.text = "████";

// temp background
const altBG = new FitFont({ id: 'alt_bg', font: 'Repetition_Scrolling_50', halign: 'end', valign: 'middle' })
altBG.text = "█████";




// Battery level and status
clock.granularity = "seconds";
// clock.granularity = "minutes";
clock.ontick = (evt) => {

  // update the steps
  if (today && appbit.permissions.granted("access_activity")) {
    const steps = today.adjusted.steps;
    let step_str = String(steps);
    let step_fmt;
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

    const stepFG = new FitFont({ id: 'step_fg', font: 'Repetition_Scrolling_120', halign: 'end', valign: 'middle' })
    stepFG.text = step_fmt;
  }

  // update the battery percentage
  const battFG = new FitFont({ id: 'batt_fg', font: 'Repetition_Scrolling_50', halign: 'end', valign: 'middle' })
  battFG.text = String(battery.chargeLevel + "%");

}


function altitudeFromPressure(pressure) {
  return (1 - (pressure/1013.25)**0.190284)*145366.45;
}

// todo: fix the formatting here
if (Barometer) {
  console.log("This device has a Barometer!");
  const barometer = new Barometer({ frequency: 1 });
  barometer.addEventListener("reading", () => {
    console.log(`Pressure: ${barometer.pressure} Pa`);
    const altFG = new FitFont({ id: 'alt_fg', font: 'Repetition_Scrolling_50', halign: 'end', valign: 'middle' })
    altFG.text = String(altitudeFromPressure(barometer.pressure / 100) + "'");
  });
  barometer.start();
} else {
  console.log("This device does NOT have a Barometer!");
}


// detect body presence, and start/stop the Heart rate monitor accordingly.
if (BodyPresenceSensor) {
  const body = new BodyPresenceSensor();
  body.addEventListener("reading", () => {
    if (HeartRateSensor && appbit.permissions.granted("access_heart_rate")) {
      const hrm = new HeartRateSensor();

      // common output, and start with default value
      const hrFG = new FitFont({ id: 'heart_fg', font: 'Repetition_Scrolling_120', halign: 'end', valign: 'middle' })      
      hrFG.text = String("--")

      // listen for changes to the heartrate
      hrm.addEventListener("reading", () => {
        hrFG.text = hrm.heartRate
      });

      // Automatically stop the sensor when the screen is off to conserve battery
      display.addEventListener("change", () => {
        display.on ? hrm.start() : hrm.stop();
      });

      // stop the monitor when the watch isn't on the body, and turn back on when it is.
      if (!body.present) {
        hrm.stop();
        hrFG.text = String("--")
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




let background = document.getElementById("background");
let text_bg = document.getElementById("text_bg");
let foreground = document.getElementById("foreground");


/* -------- SETTINGS -------- */
function settingsCallback(data) {
  if (!data) {
    return;
  }
  // console.log(data)
  if (data.colorBackground) {
    background.style.fill = data.colorBackground;
  }
  if (data.colorTextBackground) {
    text_bg.style.fill = data.colorTextBackground;
  }
  if (data.colorText) {
    foreground.style.fill = data.colorText;
  }
}
simpleSettings.initialize(settingsCallback);

