import * as simpleSettings from "../../common/companion/companion-settings"

// even though unused, this needs to be here so the messages will be sent
import * as location from "../../common/companion/companion-location";
import * as weather from "../../common/companion/companion-weather";

/**** BEGIN KPAY IMPORTS - REQUIRED ****/
import * as kpay from './kpay/release/kpay_companion.js';
import * as kpay_common from '../common/kpay/kpay_common.js';
/**** END KPAY IMPORTS ****/

/**** KPAY INIT - REQUIRED ***/
kpay.initialize();


simpleSettings.initialize();