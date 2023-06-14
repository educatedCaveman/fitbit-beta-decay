import clock from "clock";
// import * as document from "document";
// import { preferences } from "user-settings";
import { HeartRateSensor } from "heart-rate";
import { FitFont } from 'fitfont';
import { me as appbit } from "appbit";
import { today } from "user-activity";
import { display } from "display";
import { BodyPresenceSensor } from "body-presence";
import { battery } from "power";
// import { me as companion } from "companion";
// import weather from "weather";


// background for the HR monitor
// const heartBG = new FitFont({id:'heart_bg', font:'Repetition_Scrolling_100', halign: 'end', valign: 'middle'})
const heartBG = new FitFont({ id: 'heart_bg', font: 'Repetition_Scrolling_120', halign: 'end', valign: 'middle' })
heartBG.text = "███";

// the background for the step counter
const stepBG = new FitFont({ id: 'step_bg', font: 'Repetition_Scrolling_120', halign: 'end', valign: 'middle' })
stepBG.text = "█████";

// battery background
const battBG = new FitFont({ id: 'batt_bg', font: 'Repetition_Scrolling_50', halign: 'end', valign: 'middle' })
battBG.text = "████";

// temp background
const tempBG = new FitFont({ id: 'temp_bg', font: 'Repetition_Scrolling_50', halign: 'end', valign: 'middle' })
tempBG.text = "█████";


// Battery level and status
clock.granularity = "seconds";
// clock.granularity = "minutes";
clock.ontick = (evt) => {

  // update the steps
  // TODO: have setting to toggle the formatting
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

  // TODO: update the local temperature
  // if (companion.permissions.granted("access_location")) {
  //   weather.getWeatherData().then((data) => {
  //     if (data.locations.length > 0) {
  //       const temp = Math.floor(data.locations[0].currentWeather.temperature);
  //       const unit = data.temperatureUnit;
  //       console.log(`It's ${temp}\u00B0 ${unit} outside`);
  //     }
  //   }).catch((ex) => {
  //     console.error(ex);
  //   });
  // }  
  const tempFG = new FitFont({ id: 'temp_fg', font: 'Repetition_Scrolling_50', halign: 'end', valign: 'middle' })
  tempFG.text = String("-99°C");
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

