import "./globals"

export function generateGlitchTxt(): String {
    let glitchStr: String = "";
    for (let i:number = 0; i < 5; i++) {
        let index: number = Math.floor(Math.random() * allChars.length);
        glitchStr = glitchStr + allChars[index];
    }
    return glitchStr;
}