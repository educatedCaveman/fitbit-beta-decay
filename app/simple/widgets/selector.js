// import the various widgets
import * as glitch from "./glitch"
import * as altitude from "./altitude"
import * as model from "./model"
import * as time from "./time"
import * as date from "./date"
import * as goal from "./goal"
import * as suntime from "./timeofday"
import * as weather from "./weather"

//functions
export function updateWidget(widget) {
    // todo: handle the value being null
    // let tmpStr = "";
    // console.log("widget type: " + widgetType);
    switch (widget.widgetType) {
        //sunset/sunrise: TODO
        case "8":
            return String("TODO8");

        //goal: TODO
        case "7":
            return String("TODO7");

        //date: TODO
        case "6":
            // return String("TODO6");
            return date.getTime(widget.month, widget.day);

        //time: TODO
        case "5":
            // return String("TODO5");
            return time.getTime(widget.hour, widget.mins);

        //model
        case "4":
            return model.generateDeviceText();

        //weather: TODO
        case "3":
            return String("TODO3");

        //altitude: TODO
        case "2":
            return String("TODO2");

        // glitch:
        case "1":
        default:
            return glitch.generateGlitchTxt();
    }
    // return tmpStr;
}