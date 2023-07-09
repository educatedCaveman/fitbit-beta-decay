import clock from "clock";
import { battery } from "power";
import * as steps from "./steps";

let clockCallback;
let glitchStr = "";
const allChars = "\"!#$%&'()*+,-./1234567890:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~¡¢£¥¦¨©«®°±²³´¶¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ‐–—‘’“”…█"

export function initialize(granularity, callback) {
    clock.granularity = granularity;
    clockCallback = callback;
    clock.addEventListener("tick", tickHandler);
}


function generateGlitchTxt() {

    if (glitchStr != "") {
        //scrolling 
        let index = Math.floor(Math.random() * allChars.length);
        glitchStr = String(glitchStr + allChars[index]).slice(-5);
    } else {
        // initialize, or refresh whole glitch
        glitchStr = "";
        for (let i = 0; i < 5; i++) {
            let index = Math.floor(Math.random() * allChars.length);
            glitchStr = glitchStr + allChars[index];
        }
    }
    return glitchStr;
}


function tickHandler(evt) {
    // callback
    clockCallback({
        steps: steps.getFormattedSteps(),
        batt: String(battery.chargeLevel + "%"),
        comp: generateGlitchTxt(),
    });

}

