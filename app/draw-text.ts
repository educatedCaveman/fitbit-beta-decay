import { FitFont } from 'fitfont';

let littleText: String = 'Repetition_Scrolling_50';
let bigText: String = 'Repetition_Scrolling_120';
// let labelText = 'Hack_20';

export function drawBackground() {
    // background for the HR monitor
    const heartBG: FitFont = new FitFont({ id: 'heart_bg', font: bigText, halign: 'end', valign: 'middle' })
    heartBG.text = "███";

    // the background for the step counter
    const stepBG: FitFont = new FitFont({ id: 'step_bg', font: bigText, halign: 'end', valign: 'middle' })
    stepBG.text = "█████";

    // battery background
    const battBG: FitFont = new FitFont({ id: 'batt_bg', font: littleText, halign: 'end', valign: 'middle' })
    battBG.text = "████";

    // temp background
    const altBG: FitFont = new FitFont({ id: 'extra_bg', font: littleText, halign: 'end', valign: 'middle' })
    altBG.text = "█████";

    // // label/name
    // const label = new FitFont({ id: 'label', font: labelText, halign: 'middle', valign: 'middle'})
    // // label.text = "β-decay";
    // label.text = "ß-decay";
}


export function drawLittleText(txt: String, id: String): void {
    const tmp = new FitFont({ id: id, font: littleText, halign: 'end', valign: 'middle' })
    tmp.text = txt
}


export function drawBigText(txt: String, id: String): void {
    const tmp = new FitFont({ id: id, font: bigText, halign: 'end', valign: 'middle' })
    tmp.text = txt
}