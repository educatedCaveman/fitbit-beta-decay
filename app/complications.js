import { preferences } from "user-settings";
import * as utils from "./utils";

const allChars = "\"!#$%&'()*+,-./1234567890:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~¡¢£¥¦¨©«®°±²³´¶¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ‐–—‘’“”…█"
const asciiExtended = " !\"#$%&()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~€‚ƒ„…†‡ˆ‰Š‹ŒŽ‘’“”•–—˜™š›œžŸ¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ"


export function getCompText(compType, tickEvent) {
    let compText = String("");
    // retrieval here
    switch (compType) {
        // glitch
        case "1":
            compText = generateGlitchTxt();
            break;

        // time
        case "2":
            compText = generateTimeStr(tickEvent);
            break;

        // none
        case "99":
            compText = generateNoneWidget();
            break;
    
        // default (glitch)
        default:
            compText = generateGlitchTxt();
            break;
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