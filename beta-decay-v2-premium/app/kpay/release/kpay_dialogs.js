/*
* K·Pay Integration Library - v3.1.1 - Copyright Kiezel 2022
* Last Modified: 2019-11-04
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

import document from "document";
import { vibration } from "haptics";
import { display } from "display";
import clock from "clock";
import { me } from "appbit";
import { gettext } from "i18n";
import * as kc from './kpay_core.js';
import * as kcfg from '../kpay_config.js';
import * as kcm from '../../../common/kpay/kpay_common.js';

var I=null,S=null,T=null,C=null,K=null,O=null,R=null,q=null,F=null;function N(){me.permissions.granted("access_internet")||G(gettext("InternetRequired")),kc.kp8(U,B,L)}function U(n){n&&kcfg.KPAY_SHOW_PAID_APP_POPUP&&z()}function Y(n){return document.getElementById(n)}function j(n,t){n&&(n.style.display=t?"inline":"none")}function z(){var n=Y("paidAppPopup");Y("btnPaidAppOk").onclick=function(t){j(n,!1)},Y("btnPaidAppAlreadyPaid").onclick=function(t){var e=Y("alreadyPaidPopup");Y("btnAlreadyPaidOk").onclick=function(n){j(e,!1)},j(e,!0),j(n,!1)},j(n,!0)}function B(n,t){switch(n){case 5:H(gettext("PurchaseStarted"),t);break;case 6:H(gettext("CompletePurchase"),t);break;case 7:J()}}function G(n){I||(I=Y("kpay_errorDialog"),S=Y("kpay_errorMessage")),S.text=n,Q(),j(I,!0),W()}function H(n,t){T||(T=Y("kpay_trialEndedDialog"),C=Y("kpay_trialEndedMessage"),K=Y("kpay_trialEndedCode"),O=Y("kpay_alreadyPaidMessage")),K.text=t,C.text=n,O.text=gettext("AlreadyPaidMsg"),Q(),j(T,!0),W()}function J(){F||(F=Y("kpay_purchaseSuccessDialog")),Q(),j(F,!0),T&&j(T,!1),W("celebration-long"),setTimeout(L,5e3)}function L(){V(),I&&j(I,!1),T&&j(T,!1),F&&j(F,!1)}function Q(){R||(R=Y("kpay_timeInDialog"),q=function(){var n=new Date,t=("0"+n.getHours()).slice(-2)+":"+("0"+n.getMinutes()).slice(-2);R.text=t},clock.addEventListener("tick",function(){R&&"inline"==R.style.display&&q()})),R&&(q(),j(R,!0))}function V(){R&&j(R,!1)}function W(n){display.poke(),vibration.start(n||"nudge-max")}N();