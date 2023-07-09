// general utility functions

export function padString(val, len, pad) {
    // make sure the value to pad onto the input is defined.
    // defaults to 0
    if (pad === undefined) {
        pad = "0";
    }

    // create the string to fill with
    let paddedString = "";
    for (let i = 0; i < len; i++) {
        paddedString += pad;
    }

    // format the value
    const valFmt = String(paddedString + val).slice(-len)

    return valFmt
}


export function convertAMPM24h(timeStr) {
    // assumes time is in a format like "9:18:48 PM"
    // note no leading 0's for the hour
    // note it uses AM/PM

    // handle null
    if (timeStr === null) { return timeStr };

    // parse the input value
    let hour, min;
    const time = timeStr.split(":");
    hour = padString(time[0], 2, "0");
    min = padString(time[1], 2, "0");

    // handle PM
    let pm = false;
    if (timeStr.slice(-2) === "PM") {
        pm = true;
    }
    if (pm) {
        hour = parseInt(hour) + 12;
    }

    // return formatted string
    return String(hour + ":" + min);
}

export function convertPM24H(timeStr) {
    // assumes time is in a format like "09:18" where it is in PM

    // handle null
    if (timeStr === null) { return timeStr };

    // parse the input value
    let hour, min;
    const time = timeStr.split(":");
    hour = parseInt(padString(time[0], 2, "0")) + 12;
    min = padString(time[1], 2, "0");

    // return formatted string
    return String(hour + ":" + min);
}


export function tickToMins(tick, delay) {
    const hours = tick.date.getHours();
    const mins = tick.date.getMinutes();
    const totalmins = hours * 60 + mins - delay;
    return totalmins;
}

