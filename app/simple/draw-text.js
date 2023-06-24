import { FitFont } from 'fitfont';

let littleText = 'Segment16C_50';
let bigText = 'Segment16C_117';
// let labelText = 'Hack_20';

export function drawBackground() {
    // background for the HR monitor
    const heartBG = new FitFont({ id: 'heart_bg', font: bigText, halign: 'end', valign: 'middle' })
    heartBG.text = "¦•.¦•.¦•.";
    // heartBG.text = "888";

    // the background for the step counter
    const stepBG = new FitFont({ id: 'step_bg', font: bigText, halign: 'end', valign: 'middle' })
    // stepBG.text = "¦•.¦•.¦•.¦•.¦•.";
    stepBG.text = "88888";

    // battery background
    const battBG = new FitFont({ id: 'batt_bg', font: littleText, halign: 'end', valign: 'middle' })
    battBG.text = "¦•.¦•.¦•.¦•.";
    // battBG.text = "8888";

    // // temp background
    // const altBG = new FitFont({ id: 'extra_bg', font: littleText, halign: 'end', valign: 'middle' })
    // altBG.text = "¦•.¦•.¦•.¦•.¦•.";
    // // altBG.text = "88888";

    // // label/name
    // const label = new FitFont({ id: 'label', font: labelText, halign: 'middle', valign: 'middle'})
    // // label.text = "β-decay";
    // label.text = "ß-decay";
}


export function drawLittleText(txt, id) {
    const tmp = new FitFont({ id: id, font: littleText, halign: 'end', valign: 'middle' })
    tmp.text = txt
}


export function drawBigText(txt, id) {
    const tmp = new FitFont({ id: id, font: bigText, halign: 'end', valign: 'middle' })
    tmp.text = txt
}