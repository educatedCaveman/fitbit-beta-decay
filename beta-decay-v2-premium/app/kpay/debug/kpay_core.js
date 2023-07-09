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
export var kp0 = null, n = {
    o: !1,
    i: !1,
    t: !1
}, e = null, a = null, o = null, t = null, s = !1, u = function() {
    return !1;
}, f = function() {}, y = function() {}, P = function() {}, p = function() {}, g = function() {}, _ = function() {
    return !1;
};

var KPAY_APP_ID = 632137509;
export function init() {
    console.log("KPay - _initialize()"), x() ? (console.log("KPay - Fresh install detected; generating new State..."), 
    kp0 = {
        sl: !1,
        it: new Date().getTime()
    }, p(!0), f(!0), console.log("KPay - Storing new State on fs"), kp11()) : (console.log("KPay - Loading existing State from fs"), 
    D(), console.log("KPay - Loaded State: " + JSON.stringify(kp0)), p(!1), f(!1)), 
    setTimeout(function() {
        g();
    }, 0);
}

export function processMessageFromCompanion(n) {
    console.log("_onMessageFromCompanion()"), w(n) ? (console.log("KPay - Message from companion: " + JSON.stringify(n)), 
    A(n)) : n && "start" === n.purchase ? (console.log("KPay - 'StartPurchase' message from companion"), 
    startPurchase()) : n && "cancel" === n.purchase && (console.log("KPay - 'CancelPurchase' message from companion"), 
    cancelPurchase());
}

function m() {
    console.log("KPay - _cancelFailsafeStatusCheckTimer()"), null !== a && (clearTimeout(a), 
    a = null);
}

export function kp1(e) {
    console.log("KPay - s tartStatusChecksWithFailsafe(immediateCheck == " + e + ")"), 
    n.t = !1, kp2(e);
}

export function kp2(e) {
    console.log("KPay - s cheduleFailsafeStatusCheck(immediateCheck == " + e + ")"), 
    m(), n.t ? console.log("KPay - kp2() - checking finished") : (e && K(), null === a && (console.log("KPay - scheduling failsafe check for over 15 seconds..."), 
    a = setTimeout(function() {
        kp2(!0);
    }, 15e3)));
}

export function kp3() {
    console.log("KPay - e ndStatusReached()"), m(), n.t = !0;
}

function K() {
    console.log("KPay - _statusCheck()"), n.t = !1, o || (o = Math.round(4294967295 * Math.random()));
    var e = v(KPAY_APP_ID, o, h(kcfg.KPAY_TEST_MODE, !s));
    console.log("KPay - Sending status request message to companion..."), k(kcm.getStatusMessageFilename, e);
}

function h(e, a) {
    var o = 1;
    return e && (console.log("KPay - FLAG: testmode"), o |= 2), (a || n.i) && (console.log("KPay - FLAG: trialDisabled/purchaseStarted"), 
    o |= 4), o |= 32, console.log("KPay - FLAG: filetransfer"), o |= 64;
}

function k(n, e) {
    console.log("KPay - _sendMessageToCompanion()");
    var a = function() {
        console.log("KPay - message sent succesfull!");
    }, o = function() {
        b(e);
    };
    outbox.enqueue(n, cbor.encode(e)).then(a).catch(o);
}

function b(n) {
    console.log("KPay - _outboxFailedHandler(): message sending failed!"), console.log("KPay - try again in a little while..."), 
    kp1(!1);
}

export function startPurchase() {
    console.log("KPay - s tartPurchase()"), kp0.sl || (kp0.te = !0, n.i = !0, n.t = !1, 
    kp11(), kp1(!0));
}

export function cancelPurchase() {
    console.log("KPay - c ancelPurchase()");
    var a = S();
    console.log("KPay - sending cancelPurchase message..."), k(kcm.cancelPurchaseMessageFilename, a), 
    kp0.sl || (kp0.te = !1, n.i = !1, kp11(), kp3(), P(), e = null);
}

function v(n, e, a) {
    return {
        isKpayMsg: !0,
        type: 0,
        appId: n,
        random: e,
        flags: a
    };
}

function S() {
    return {
        isKpayMsg: !0,
        type: 3
    };
}

function w(n) {
    return kcm.isKPayMessage(n) && 1 === n.type;
}

export function getStatus() {
    return kp0.sl ? "licensed" : kp0.ts && !kp0.te ? "trial" : "unlicensed";
}

function A(a) {
    console.log("KPay - _handleStatusResult");
    var o = a.serverResponse;
    if (console.log("KPay - Server response received: " + JSON.stringify(o)), "licensed" == o.status) kp0.sl = !0, 
    kp11(), kp5(7, null, !1), n.o = !1, kp3(); else if ("unlicensed" == o.status) {
        kp0.sl = !1, kp11(), 7 === e && (e = null), n.o = !0;
        var s = o.paymentCode, u = s != t;
        t = s, "waitForUser" == o.purchaseStatus ? kp5(5, s, u) : "inProgress" == o.purchaseStatus && kp5(6, s, u), 
        kp1(!0);
    } else _(o) || (console.log("KPay - Unsupported status: " + o.status), kp1(!0));
}

export function kp5(a, o, t) {
    if (console.log("KPay - f ireEvent()"), e !== a || t) {
        e = a, console.log("KPay - firing event callback for event " + a);
        try {
            u(a, o) || 7 === a && !n.o || y(a, o);
        } catch (n) {
            console.error("KPay - Error in event callback:" + n);
        }
    }
}

export function kp6() {
    return e;
}

export function kp7() {
    e = null;
}

export function setEventHandler(n) {
    u = n;
}

export function kp8(n, e, a) {
    f = n, y = e, P = a;
}

export function kp9(n, e, a) {
    s = !0, p = n, g = e, _ = a;
}

function x() {
    try {
        var n = fs.statSync("kps");
        return !(n && n.size);
    } catch (n) {
        return !0;
    }
}

function D() {
    x() || (kp0 = fs.readFileSync("kps", "cbor"));
}

export function kp11() {
    console.log("KPay - s aveState()"), fs.writeFileSync("kps", kp0, "cbor");
}

