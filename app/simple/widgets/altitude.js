import { Barometer } from "barometer";

let barometer, reading;

function altitudeFromPressure(pressure) {
    return (1 - (pressure / 1013.25) ** 0.190284) * 145366.45;
}

export function initialize(callback) {
    if (Barometer) {
        // barometer = new Barometer({ frequency: 1 });
        // barometer.addEventListener("reading", () => {
        //     reading = barometer.pressure;
        //     console.log(`Pressure: ${reading} Pa`);
        //     callback({pressure: altitudeFromPressure(reading)});
        // });
        // barometer.start();        
        // // callback({pressure: reading});



        var bar = new Barometer();

        // Update the lavel with each reading from the sensor
        bar.onreading = () => {
            console.log(altitudeFromPressure(bar.pressure / 100) + " ft");
            console.log(Math.round(bar.pressure / 100) + " hPa");
            callback({pressure: bar.pressure});
        }

        // Begin monitoring the sensor
        bar.start();
    }
}