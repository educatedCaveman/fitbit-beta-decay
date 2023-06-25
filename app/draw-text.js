import { FitFont } from 'fitfont';

let littleText = 'Repetition_Scrolling_50';
let bigText = 'Repetition_Scrolling_120';
// let labelText = 'Hack_20';

// TODO: if i add multiple fonts, i'll need multiple backround texts
export function drawBackground() {
    // background for the HR monitor
    const heartBG = new FitFont({ id: 'heart_bg', font: bigText, halign: 'end', valign: 'middle' })
    heartBG.text = "███";

    // the background for the step counter
    const stepBG = new FitFont({ id: 'step_bg', font: bigText, halign: 'end', valign: 'middle' })
    stepBG.text = "█████";

    // battery background
    const battBG = new FitFont({ id: 'batt_bg', font: littleText, halign: 'end', valign: 'middle' })
    battBG.text = "████";

    // complication background
    const compBG = new FitFont({ id: 'comp_bg', font: littleText, halign: 'end', valign: 'middle' })
    compBG.text = "█████";

}


export function drawLittleText(txt, id) {
    const tmp = new FitFont({ id: id, font: littleText, halign: 'end', valign: 'middle' })
    tmp.text = txt
}


export function drawBigText(txt, id) {
    const tmp = new FitFont({ id: id, font: bigText, halign: 'end', valign: 'middle' })
    tmp.text = txt
}