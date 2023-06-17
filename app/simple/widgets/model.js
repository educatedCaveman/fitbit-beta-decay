// TODO
import { me as device } from "device";

export function generateDeviceText() {
    return String(device.modelName.substring(0, 5).toUpperCase());
}