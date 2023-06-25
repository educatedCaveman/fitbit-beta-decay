// import { HeartRateSensor } from "heart-rate";
// import { display } from "display";
// import { BodyPresenceSensor } from "body-presence";
// import { me } from "appbit";

// let hrm: HeartRateSensor;
// let watchID: Number;
// let hrmCallback: Function;
// let body: BodyPresenceSensor;
// let heartRate: String = "--";

// export function initialize(callback) {
//     if (BodyPresenceSensor) {
//         body = new BodyPresenceSensor();
//         // basic heart rate sensor from example (mostly)
//         if (HeartRateSensor) {
//             hrmCallback = callback;
//             hrm = new HeartRateSensor();
//             setupEvents();
//             start();
//         } else {
//             console.log("Denied Heart Rate or User Profile permissions");
//             callback({bpm: "???"});
//         }

//         // display listener; turn off body presence
//         display.addEventListener("change", function () {
//             display.on ? body.start() : body.stop()
//         })

//         body.start();
//     }
// }

// function getReading() {
//     if (body.present) {
//         heartRate = hrm.heartRate;
//     } else {
//         heartRate = "--";
//     }
//     hrmCallback({bpm: heartRate});
// }

// function setupEvents() {
//     display.addEventListener("change", function () {
//         if (display.on) {
//             start();
//         } else {
//             stop();
//         }
//     });
// }

// function start() {
//     if (!watchID) {
//         hrm.start();
//         getReading();
//         watchID = setInterval(getReading, 1000);
//     }
// }

// function stop() {
//     hrm.stop();
//     clearInterval(watchID);
//     watchID = null;
// }
