/*
* K·Pay Integration Library - v3.1.1 - Copyright Kiezel 2022
* Last Modified: 2019-12-20
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

var E = null, M = null, C = null, F = null, T = null, X = null, Z = null, R = null, I = null, O = null, z = null, $ = !1, nn = !1;

function L() {
    console.log("KPay_dialogs - kpay_dialogs initialize called!"), display.addEventListener("change", tn), 
    me.permissions.granted("access_internet") || (console.log("KPay - ERROR: internet permission not enabled!"), 
    H(gettext("InternetRequired"))), kc.kp8(N, U, j);
}

function N(n) {
    console.log("KPay_dialogs - _mainLibInitialized()"), n && kcfg.KPAY_SHOW_PAID_APP_POPUP && (console.log("KPay_dialogs - Fresh install detected; showing paid app popup..."), 
    J());
}

function q(n) {
    return document.getElementById(n);
}

function G(n, e) {
    n && (n.style.display = e ? "inline" : "none");
}

function J() {
    an(), X = q("paidAppPopup"), q("btnPaidAppOk").onclick = function(n) {
        G(X, !1), on();
    }, q("btnPaidAppAlreadyPaid").onclick = function(n) {
        Z = q("alreadyPaidPopup"), q("btnAlreadyPaidOk").onclick = function(n) {
            G(Z, !1), on();
        }, G(Z, !0), G(X, !1);
    }, G(X, !0);
}

function U(n, e) {
    switch (console.log("KPay_dialogs - _handleEvent(e == " + n + ", extraData == " + e + ")"), 
    n) {
      case 5:
        W(gettext("PurchaseStarted"), e);
        break;

      case 6:
        W(gettext("CompletePurchase"), e);
        break;

      case 7:
        Y();
    }
}

function H(n) {
    an(), console.log("KPay_dialogs - _showError() - message == " + n), E || (E = q("kpay_errorDialog"), 
    M = q("kpay_errorMessage")), M.text = n, B(), G(E, !0), V();
}

function W(n, e) {
    G(Z, !1), G(X, !1), an(), console.log("KPay_dialogs - _showTrialEnded() - message == " + n + "; code == " + e), 
    C || (C = q("kpay_trialEndedDialog"), F = q("kpay_trialEndedMessage"), T = q("kpay_trialEndedCode"), 
    R = q("kpay_alreadyPaidMessage")), T.text = en(e), F.text = n, R.text = gettext("AlreadyPaidMsg"), 
    B(), G(C, !0), V();
}

function Y() {
    an(), console.log("KPay_dialogs - _showPurchaseSuccess()"), z || (z = q("kpay_purchaseSuccessDialog")), 
    B(), G(z, !0), C && G(C, !1), V("celebration-long"), setTimeout(j, 5e3);
}

function j() {
    console.log("KPay_dialogs - _hideAlert()"), Q(), E && G(E, !1), C && G(C, !1), z && G(z, !1), 
    on();
}

function B() {
    I || (I = q("kpay_timeInDialog"), O = function() {
        var n = new Date(), e = ("0" + n.getHours()).slice(-2) + ":" + ("0" + n.getMinutes()).slice(-2);
        I.text = e;
    }, clock.addEventListener("tick", function() {
        I && "inline" == I.style.display && O();
    })), I && (O(), G(I, !0));
}

function Q() {
    I && G(I, !1);
}

function V(n) {
    display.poke(), vibration.start(n || "nudge-max");
}

function en(n) {
    for (var e = ""; n > 0; ) e = String.fromCharCode(16 + n % 10) + e, n = n / 10 | 0;
    return e;
}

function an() {
    nn || ($ = display.aodAllowed, nn = !0, $ && me.permissions.granted("access_aod") && (console.log("KPay_dialogs - Setting display.aodAllowed to false"), 
    display.aodAllowed = !1));
}

function on() {
    nn = !1, $ && me.permissions.granted("access_aod") && (console.log("KPay_dialogs - Setting display.aodAllowed to true"), 
    display.aodAllowed = !0);
}

function tn() {
    nn && me.permissions.granted("access_aod") && display.aodAllowed && (console.error("ERROR: you are not allowed to set `display.aodAllowed` to `true` while K-Pay is showing dialogs!"), 
    display.aodAllowed = !1);
}

L();

