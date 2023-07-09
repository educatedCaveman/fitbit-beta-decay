/*
* K·Pay Integration Library - v3.1.1 - Copyright Kiezel 2022
* Last Modified: 2022-09-26
*
* BECAUSE THE LIBRARY IS LICENSED FREE OF CHARGE, THERE IS NO
* WARRANTY FOR THE LIBRARY, TO THE EXTENT PERMITTED BY APPLICABLE
* LAW. EXCEPT WHEN OTHERWISE STATED IN WRITING THE COPYRIGHT
* HOLDERS AND/OR OTHER PARTIES PROVIDE THE LIBRARY "AS IS"
* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR IMPLIED,
* INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
* MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE. THE ENTIRE
* RISK AS TO THE QUALITY AND PERFORMANCE OF THE LIBRARY IS WITH YOU.
* SHOULD THE LIBRARY PROVE DEFECTIVE, YOU ASSUME THE COST OF ALL
* NECESSARY SERVICING, REPAIR OR CORRECTION.
*
* IN NO EVENT UNLESS REQUIRED BY APPLICABLE LAW OR AGREED TO IN
* WRITING WILL ANY COPYRIGHT HOLDER, OR ANY OTHER PARTY WHO MAY
* MODIFY AND/OR REDISTRIBUTE THE LIBRARY AS PERMITTED ABOVE, BE
* LIABLE TO YOU FOR DAMAGES, INCLUDING ANY GENERAL, SPECIAL,
* INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE USE OR
* INABILITY TO USE THE LIBRARY (INCLUDING BUT NOT LIMITED TO LOSS
* OF DATA OR DATA BEING RENDERED INACCURATE OR LOSSES SUSTAINED BY
* YOU OR THIRD PARTIES OR A FAILURE OF THE LIBRARY TO OPERATE WITH
* ANY OTHER SOFTWARE), EVEN IF SUCH HOLDER OR OTHER PARTY HAS BEEN
* ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
*/ 

/*****************************************************************************************/
/*                 GENERATED CODE BELOW THIS LINE - DO NOT MODIFY!                       */
/*****************************************************************************************/

import * as fs from "fs";
import * as kcm from '../../../common/kpay/kpay_common.js';
import { outbox } from "file-transfer";
import * as cbor from 'cbor';
import * as kcfg from '../kpay_config.js';
import * as kp from './kpay.js';
export var kp0=null,n={t:!1,i:!1,u:!1},t=null,e=null,u=null,a=null,o=!1,f=function(){return!1},s=function(){},p=function(){},y=function(){},g=function(){},k=function(){},P=function(){return!1};var KPAY_APP_ID = 1690298698;
export function init(){M()?(kp0={sl:!1,it:(new Date).getTime()},g(!0),s(!0),kp11()):(E(),g(!1),s(!1)),setTimeout(function(){k()},0)}export function processMessageFromCompanion(n){D(n)?w(n):n&&"start"===n.purchase?startPurchase():n&&"cancel"===n.purchase&&cancelPurchase()}function b(){null!==e&&(clearTimeout(e),e=null)}export function kp1(t){n.u=!1,kp2(t)}export function kp2(t){b(),n.u||(t&&v(),null===e&&(e=setTimeout(function(){kp2(!0)},15e3)))}export function kp3(){b(),n.u=!0}function v(){n.u=!1,u||(u=Math.round(4294967295*Math.random()));var t=x(KPAY_APP_ID,u,m(kcfg.KPAY_TEST_MODE,!o));_(kcm.getStatusMessageFilename,t)}function m(t,e){var u=1;return t&&(u|=2),(e||n.i)&&(u|=4),u|=32,u|=64}function _(n,t){var e=function(){},u=function(){h(t)};outbox.enqueue(n,cbor.encode(t)).then(e).catch(u)}function h(n){kp1(!1)}export function startPurchase(){kp0.sl||(kp0.te=!0,n.i=!0,n.u=!1,kp11(),kp1(!0))}export function cancelPurchase(){var e=A();_(kcm.cancelPurchaseMessageFilename,e),kp0.sl||(kp0.te=!1,n.i=!1,kp11(),kp3(),y(),t=null)}function x(n,t,e){return{isKpayMsg:!0,type:0,appId:n,random:t,flags:e}}function A(){return{isKpayMsg:!0,type:3}}function D(n){return kcm.isKPayMessage(n)&&1===n.type}export function getStatus(){return kp0.sl?"licensed":kp0.ts&&!kp0.te?"trial":"unlicensed"}function w(e){var u=e.serverResponse;if("licensed"==u.status)kp0.sl=!0,kp11(),kp5(7,null,!1),n.t=!1,kp3();else if("unlicensed"==u.status){kp0.sl=!1,kp11(),7===t&&(t=null),n.t=!0;var o=u.paymentCode,f=o!=a;a=o,"waitForUser"==u.purchaseStatus?kp5(5,o,f):"inProgress"==u.purchaseStatus&&kp5(6,o,f),kp1(!0)}else P(u)||kp1(!0)}export function kp5(e,u,a){if(t!==e||a){t=e;try{f(e,u)||7===e&&!n.t||p(e,u)}catch(n){console.error("KPay - Error in event callback:"+n)}}}export function kp6(){return t}export function kp7(){t=null}export function setEventHandler(n){f=n}export function kp8(n,t,e){s=n,p=t,y=e}export function kp9(n,t,e){o=!0,g=n,k=t,P=e}function M(){try{var n=fs.statSync("kps");return!(n&&n.size)}catch(n){return!0}}function E(){M()||(kp0=fs.readFileSync("kps","cbor"))}export function kp11(){fs.writeFileSync("kps",kp0,"cbor")}