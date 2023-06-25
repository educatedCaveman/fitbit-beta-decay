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