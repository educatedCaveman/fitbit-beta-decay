import { preferences } from "user-settings";
import * as utils from "./utils";
import * as simpleSettings from "./device-settings";
import { me as device } from "device";
// import { geolocation } from "geolocation";
import * as location from "./device-location";


const allChars = "\"!#$%&'()*+,-./1234567890:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~¡¢£¥¦¨©«®°±²³´¶¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ‐–—‘’“”…█"
const asciiExtended = " !\"#$%&()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~€‚ƒ„…†‡ˆ‰Š‹ŒŽ‘’“”•–—˜™š›œžŸ¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ"
const requestOffset = parseInt(Math.random() * 11);

export function getCompText(compType, tickEvent) {
    let compText = String("");
    // retrieval here
    switch (compType) {
        // none
        case "99":
            compText = generateNoneWidget();
            break;

        // time
        case "2":
            compText = generateTimeStr(tickEvent);
            break;

        // date
        case "3":
            compText = generateDateStr(tickEvent);
            break;

        // Model
        case "4":
            compText = generateModelStr();
            break;

        // Sunset-Sunrise
        case "5":
            compText = generateSunStr(tickEvent);
            break;

        // glitch (default)
        case "1":
            compText = generateGlitchTxt();
            break;

        default:
            compText = generateGlitchTxt();

    }
    return compText;
}

// TODO: if i have a swtich between the font types, need to switch between the 2 character sets.
function generateGlitchTxt() {
    let glitchStr = "";
    for (let i = 0; i < 5; i++) {
        let index = Math.floor(Math.random() * allChars.length);
        glitchStr = glitchStr + allChars[index];
    }
    return glitchStr;
}

function generateNoneWidget() {
    return String("█████");
}

function generateTimeStr(tickEvent) {
    // get initial hour and minute values
    let hours = tickEvent.date.getHours();
    let mins = tickEvent.date.getMinutes();

    // format the hours according to user preference
    if (preferences.clockDisplay === "12h") {
        // 12h format
        hours = hours % 12 || 12;
    }

    // add leading 0's as necessary
    hours = utils.padString(hours, 2, "0");
    mins = utils.padString(mins, 2, "0");

    // final time string
    let timeStr = String(hours + ":" + mins);

    return timeStr;
}

function generateDateStr(tickEvent) {
    // interogate the tickEvent    
    // day of month
    const rawDay = tickEvent.date.getDate();
    //day of week, starting at 0 on Sunday
    const dow = tickEvent.date.getDay();
    // month, starting at 0
    const rawMonth = tickEvent.date.getMonth();

    // prepare for formatting the Day or month
    const daysCamel = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthCamel = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // basic formatted values
    let dowFmt = daysCamel[dow];
    let monthFmt = monthCamel[rawMonth];
    let numericDay = utils.padString(String(rawDay), 2, "0");
    let numericMonth = utils.padString(String(rawMonth + 1), 2, "0");

    // normalize the day or month format    
    const dateFmt = simpleSettings.getSettingsVal('dateFmt');
    switch (dateFmt) {
        // OCT31 or 31OCT
        case "6":
        case "8":
            monthFmt = monthFmt.toUpperCase();
            break;

        // FRI13 or 13FRI
        case "10":
        case "12":
            dowFmt = dowFmt.toUpperCase();
            break;

        // other
        default:
            break;
    }

    let dateStr;
    switch (dateFmt) {
        // 13FRI or 13Fri
        case "12":
        case "11":
            dateStr = String(numericDay + dowFmt);
            break;

        // FRI13 or Fri13
        case "10":
        case "9":
            dateStr = String(dowFmt + numericDay);
            break;

        // 31OCT or 31Oct
        case "8":
        case "7":
            dateStr = String(numericDay + monthFmt);
            break;

        // OCT31 or Oct31
        case "6":
        case "5":
            dateStr = String(monthFmt + numericDay);
            break;

        // dd-mm
        case "4":
            dateStr = String(numericDay + "-" + numericMonth);
            break;

        // dd/mm
        case "3":
            dateStr = String(numericDay + "/" + numericMonth);
            break;

        // mm-dd
        case "2":
            dateStr = String(numericMonth + "-" + numericDay);
            break;

        // mm/dd, default
        case "1":
        default:
            dateStr = String(numericMonth + "/" + numericDay);
            break;
    }
    return dateStr;
}

function generateModelStr() {
    // https://dev.fitbit.com/build/reference/device-api/device/
    // device.type is like hera or rhea
    // device.modelName is like sense or versa

    // TODO: need to wait for versa 4 and sense 2 model info
    // through trial and error, i discovered sense 2 is 60
    const models = {
        '36': { truncated: "VERSA", squished: "VRSA3", code: "ATLAS" },
        '44': { truncated: "SENSE", squished: "SENSE", code: "VULCN" },
        '98': { truncated: "VERSA", squished: "VRSA4", code: "HERA" },
        '60': { truncated: "SENSE", squished: "SENS2", code: "RHEA" },
        '99': { model: "UNKWN"}
    }

    const modelNum = device.modelId
    const format = simpleSettings.getSettingsVal('modelFmt');
    if (modelNum) {
        switch (format) {
            case '1':
                return models[modelNum].truncated;

            case '2':
                return models[modelNum].squished;

            case '3':
            default:
                return models[modelNum].code;
        }
    } else {
        // unknown model (Versa 4)
        return models['99'].model
    }
}


function getTimeDiff(time1, time2) {
    const tmp1 = time1.split(":")
    const tmp2 = time2.split(":")

    // convert time strings to minute of the day
    let time1_m = parseInt(tmp1[0]) * 60 + parseInt(tmp1[1]);
    let time2_m = parseInt(tmp2[0]) * 60 + parseInt(tmp2[1]);

    // case 1: time1 is after time2 -- do nothing
    // case 2: time1 is before time2 (sunrise the next day)-- add 24h
    if (time1_m <= time2_m) { time1_m + (24 * 60) };

    const diff_m = time1_m - time2_m;

    const hours = parseInt(diff_m / 60);
    const mins = parseInt((diff_m - (60 * hours)));

    const hrStr = utils.padString(hours, 2, "0");
    const minStr = utils.padString(mins, 2, "0");

    return String(hrStr + ":" + minStr);
}


function generateSunStr(tickEvent) {
    let delay = requestOffset
    const polite = simpleSettings.getSettingsVal('queryPolitely');
    if (!polite) { delay = 0; }
    const baseInterval = simpleSettings.getSettingsVal('sunInterval');
    let interval;
    if (baseInterval === 0) {
        interval = 30
    } else {
        interval = baseInterval * 60;
    }
    // convert the tick event to the minute of the day, minus the delay
    // this means the update happens delay minutes after the interval
    const tickMins = utils.tickToMins(tickEvent, delay);
    // update the data
    if (tickMins % interval === 0) { location.updateSunData() }
    // debug code
    // TODO: remove eventually
    // if (tickEvent.date.getSeconds() % 10 === 0) {
    //     console.log('tick')
    //     location.updateSunData()
    // } else {
    //     console.log('tock')
    // }



    // return either new or saved data
    const hours = utils.padString(tickEvent.date.getHours(), 2, "0");
    const mins = utils.padString(tickEvent.date.getMinutes(), 2, "0");
    const currentTime = String(hours + ":" + mins);
    const sunData = location.getSunData();
    let sunrise, sunset;


    // handle initialization lag
    if (sunData === undefined || sunData.sunrise === undefined || sunData.sunset === undefined) {
        return "--:--"
    } else {
        sunrise = sunData.sunrise;
        sunset = sunData.sunset;
    }

    // handle nulls (should only be for the poles)
    if (sunrise === null || sunset === null) { return "POLAR" }

    //TODO: immediately after sunset, query again to get updated sunrise.
    const currentMins = parseInt(hours) * 60 + parseInt(mins);
    const sunTime = sunset.split(":");
    const sunsetMins = parseInt(sunTime[0]) * 60 + parseInt(sunTime[1]);
    const sunsetDiff = currentMins - sunsetMins;
    if (sunsetDiff === 0 || sunsetDiff === 1) { location.updateSunData() };

    //determine which time to comare against
    if (currentTime >= sunrise && currentTime < sunset) {
        // between sunrise and sunset
        return getTimeDiff(sunset, currentTime);

    } else {
        // after sunset or before sunrise
        // NOTE: the API query handles returning the next day's sunrise, when the current time is after sunset
        return getTimeDiff(sunrise, currentTime);
    }
}