// TODO


export function getTime(h, m) {
    hours = String("00" + h).slice[-2];
    minutes = String("00" + m).slice[-2];
    time_str = String(hours + ":" + minutes);
    return time_str;
}