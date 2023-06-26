import { preferences } from "user-settings";
import * as utils from "./utils";
import * as simpleSettings from "./device-settings";
import { me as device } from "device";

const allChars = "\"!#$%&'()*+,-./1234567890:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~¡¢£¥¦¨©«®°±²³´¶¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ‐–—‘’“”…█"
const asciiExtended = " !\"#$%&()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~€‚ƒ„…†‡ˆ‰Š‹ŒŽ‘’“”•–—˜™š›œžŸ¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ"


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
    const dateFmt = simpleSettings.getDateFmt();
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
    // TODO: get setting for which to show
    // https://dev.fitbit.com/build/reference/device-api/device/
    // device.type is like hera or rhea
    // device.modelName is like sense or versa
}