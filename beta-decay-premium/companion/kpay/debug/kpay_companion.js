/*
* K·Pay Integration Library - v3.1.1 - Copyright Kiezel 2022
* Last Modified: 2022-10-08
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

//import { localStorage } from "local-storage"
var localStorageModule = require('local-storage').localStorage;    //because normal import currently doesn't work on Android
import { device } from "peer";
import { inbox, outbox } from "file-transfer";
import * as cbor from 'cbor';
import * as kcm from '../../../common/kpay/kpay_common.js';
import { me } from "companion";
import * as appClusterStorage from "app-cluster-storage";
var e = "fb3.1.1", n = 3e3, o = 5e3, t = 25e3, a = 1e4, s = 864e5, u = null, f = null, y = null, m = null, g = null, k = null, p = "kpay_nextRecheckTimeLocalstorageKey", K = "kpay_lastStatusResultLocalstorageKey", P = "kpay_flagsLocalstorageKey", v = "kpay_appIdLocalstorageKey", h = "kpay_accountTokenLocalstorageKey", S = null, x = null, b = null, T = !1, w = !1, _ = 0, R = 0, C = !1, N = !1, I = 0, D = null, U = null, W = function() {}, M = fe, O = appClusterStorage.get("betadecay");

export function initialize() {
    console.log("KPay - initialize()"), null !== ge() && "licensed" !== ge().status && ye(), 
    fe(), inbox.addEventListener("newfile", G), setTimeout($, 6e4);
}

export function setEventHandler(e) {
    W = e;
}

export function setAccountTokenGenerator(e) {
    M = e;
}

export function startPurchase() {
    E(kcm.purchaseMessageFilename, {
        purchase: "start"
    });
}

export function cancelPurchase() {
    E(kcm.purchaseMessageFilename, {
        purchase: "cancel"
    });
}

function E(e, n, o, t) {
    var a = function() {
        o ? o() : console.log('KPay - Successfully sent kpay settings "' + e + '": ' + JSON.stringify(n));
    }, s = function(n) {
        t ? t() : console.log('KPay - Error sending kpay settings "' + e + '": ' + n);
    };
    console.log("KPay - sending message to watch using file transfer..."), outbox.enqueue(e, cbor.encode(n)).then(a).catch(s);
}

function L() {
    return 0 != (2 & x);
}

function J() {
    return 0 != (4 & x);
}

var A = [ kcm.getStatusMessageFilename, kcm.cancelPurchaseMessageFilename ], F = [], q = [];

inbox.o = inbox.pop, inbox.pop = async function() {
    if (F.length > 0) return F.pop();
    for (var e; e = await  inbox.o(); ) {
        if (!(A.indexOf(e.name) > -1)) return e;
        q.push(e);
    }
};

async function z() {
    if (q.length > 0) return q.pop();
    for (var e; e = await  inbox.o(); ) {
        if (A.indexOf(e.name) > -1) return e;
        F.push(e);
    }
}

function G() {
    console.log("KPay_filetransfer - _onMessageFromWatch()"), z().then(function(e) {
        void 0 !== e && e.cbor().then(function(e) {
            if (kcm.isKPayMessage(e)) if (console.log("KPay - Received msg from watch: " + JSON.stringify(e)), 
            j(e)) {
                if (console.log("KPay - Received GETSTATUS msg from watch..."), T && S === e.appId && x === e.flags) {
                    var n = new Date().getTime();
                    if (C && !N && n - R < t) return void console.log("KPay - Websocket connected and alive, no need to start new status request...");
                    if (n - _ < o) return void console.log("KPay - Status checks already running, no need to start new status request...");
                }
                S = e.appId, x = e.flags, null !== ge() && "unlicensed" !== ge().status && ye(), 
                Q(), f && (clearTimeout(f), f = null), f = setTimeout(Y, 15e3);
            } else B(e) && (console.log("KPay - Received CANCELPURCHASE msg from watch..."), 
            T = !1, ye(), u && (clearTimeout(u), u = null), f && (clearTimeout(f), f = null), 
            C && ue());
        });
    });
}

function j(e) {
    return kcm.isKPayMessage(e) && 0 === e.type;
}

function B(e) {
    return kcm.isKPayMessage(e) && 3 === e.type;
}

function H(e) {
    return {
        isKpayMsg: !0,
        type: 1,
        serverResponse: e
    };
}

function Q() {
    console.log("KPay - _statusCheck()"), T = !0;
    var o = new Date().getTime(), t = M(), a = pe(), s = "https://api.kiezelpay.com/api/v2/status?";
    s += "appid=" + encodeURIComponent(S), s += "&accounttoken=" + encodeURIComponent(t), 
    s += "&platform=fitbit", s += "&device=" + encodeURIComponent(a), L() && (s += "&test=true"), 
    J() && (s += "&skiptrial=true"), s += "&nocache=" + encodeURIComponent(o), s += "&libv=" + encodeURIComponent(e), 
    console.log("KPay - Getting status from server at " + s), fetch(s).then(function(e) {
        return e.json();
    }).then(function(e) {
        console.log("KPay - Got response from server: " + JSON.stringify(e)), w = !1, _ = new Date().getTime(), 
        e && e.hasOwnProperty("status") ? V(e) : console.log("KPay - Invalid KPay response received.");
    }).catch(function(e) {
        console.log("KPay - Status request failed: " + e), _ = new Date().getTime(), w || !T || null !== ge() && "licensed" === ge().status || (u && (clearTimeout(u), 
        u = null), u = setTimeout(Q, n)), w = !1;
    });
}

function V(e) {
    "unlicensed" === e.status && (I = Number(e.paymentCode)), null === ge() || ge().status !== e.status || "unlicensed" === ge().status && (ge().purchaseStatus !== e.purchaseStatus || ge().paymentCode !== e.paymentCode || ge().checksum !== e.checksum) ? E(kcm.statusMessageFilename, H(e), function() {
        if (console.log("KPay - Status msg successfully sent to watch"), "licensed" === e.status) X(7, null, !1); else if ("trial" === e.status) {
            var n = Math.round(new Date().getTime() / 1e3) + Number(e.trialDurationInSeconds), o = new Date();
            o.setTime(1e3 * n), X(3, o, !1);
        } else if ("unlicensed" === e.status) {
            var t = Number(e.paymentCode), a = null == ge() || t !== ge().paymentCode;
            "waitForUser" == e.purchaseStatus ? X(5, t, a) : "inProgress" == e.purchaseStatus && X(6, t, a);
        }
        de(e);
    }, function() {
        console.log("KPay - Status msg failed sending to watch");
    }) : console.log("KPay - No status change detected"), "licensed" === e.status || "trial" === e.status ? ("licensed" === e.status ? Z(e) : oe(), 
    T = !1, f && (clearTimeout(f), f = null), ue(), console.log("KPay - Licensed/trial status reached, no more action necesarry.")) : (oe(), 
    N || C ? N && (u && (clearTimeout(u), u = null), u = setTimeout(Q, n)) : ce());
}

function X(e, n, o) {
    if (U !== e || o) {
        U = e, console.log("KPay - firing event callback for event " + e);
        try {
            W(e, n);
        } catch (e) {}
    }
}

function Y() {
    console.log("KPay - _failSafeStatusCheck()");
    var e = new Date().getTime();
    T && (C && !N && e - R >= t || (!C || N) && e - _ >= 15e3) && (null === ge() || "licensed" !== ge().status && "trial" !== ge().status) && (console.log("KPay - status checks have stopped for some reason, restarting..."), 
    u && (clearTimeout(u), u = null), u = setTimeout(Q, 0)), f && (clearTimeout(f), 
    f = null), f = setTimeout(Y, 15e3);
}

function Z(e) {
    console.log("KPay - _setPeriodicRechecksForResponse()"), e && "licensed" === e.status && ee(86400 * e.validityPeriodInDays * 1e3, !1);
}

function $() {
    var e = Ke(p, null);
    console.log("KPay - _checkForStoredRecheck(); nextRecheckTime from ls = " + e), 
    null !== e && ee(e - new Date().getTime(), !0);
}

function ee(e, n) {
    console.log("KPay - _scheduleRecheckWithTimeout(recheckTimeout = " + e + ", isStartupScheduling = " + n + ")"), 
    n || (Pe(P, x), Pe(v, S)), e < 0 ? te() : ne(e);
}

function ne(e) {
    console.log("KPay - _storeScheduledRecheck(recheckTimeout = " + e + ")"), oe();
    var n = new Date(), o = e / 1e3;
    n.setSeconds(n.getSeconds() + o), Pe(p, n.getTime()), console.log("KPay - Scheduling js status recheck for " + o + " seconds from now."), 
    y && (clearTimeout(y), y = null), y = setTimeout(te, e);
}

function oe() {
    console.log("KPay - _removeScheduledRecheck()"), y && (clearTimeout(y), y = null), 
    ve(p);
}

function te() {
    console.log("KPay - _performRecheck()"), x = Ke(P, x), S = Ke(v, S), ne(s), T || (console.log("KPay - Performing js fallback status recheck..."), 
    w = !0, Q());
}

function ce() {
    if (console.log("KPay - _beginWebSocketChecks()"), !N && !C && null === D) {
        var n = M(), o = pe(), a = {
            type: "register.v2",
            purchaseCode: I,
            data: {
                appid: S,
                accounttoken: n,
                platform: "fitbit",
                t: o,
                test: L(),
                l: J(),
                libv: e
            }
        }, s = "wss://socket.kiezelpay.com";
        console.log("KPay - Opening websocket connection to KPay..."), g && (clearTimeout(g), 
        g = null), g = setTimeout(function() {
            C || (console.log("KPay - Opening websocket failed, reverting to normal polling checks..."), 
            N = !0, Q(), ae());
        }, 3e3);
        try {
            (D = new WebSocket(s)).onopen = function(e) {
                C = !0, N = !1, console.log("KPay - WebSocket connection opened..."), se(D, a);
            }, D.onmessage = function(e) {
                if (C) {
                    R = new Date().getTime(), console.log("KPay - WebSocket message received: " + e.data);
                    var n = JSON.parse(e.data);
                    if (n && "registerReponse" == n.type && n.keepAliveTimeout) t = n.keepAliveTimeout, 
                    m && (clearTimeout(m), m = null), m = setTimeout(function() {
                        le(D);
                    }, t); else if (n && "statusUpdate" == n.type) {
                        if (!n.data || !n.data.hasOwnProperty("status")) return void console.log("KPay - Invalid KPay response received: " + e.data);
                        V(n.data);
                    } else console.log("KPay - Unknown KPay response received: " + e.data);
                } else try {
                    D.close(), console.log("KPay - Closing stray WebSocket...");
                } catch (e) {}
            }, D.onerror = function(e) {
                console.log("KPay - WebSocket error: " + e), C = !1, N = !0;
                try {
                    console.log("KPay - Closing websocket..."), D.close();
                } catch (e) {}
                D = null, ae(), console.log("KPay - Starting polling status checks..."), Q();
            }, D.onclose = function(e) {
                if (C) {
                    if (C = !1, null !== D) {
                        console.log("KPay - Closing websocket...");
                        try {
                            console.log("KPay - Closing websocket..."), D.close();
                        } catch (e) {}
                    }
                    D = null, N = !0, ae(), console.log("KPay - WebSocket closed by server: " + e), 
                    console.log("KPay - Starting polling status checks..."), Q();
                }
            };
        } catch (e) {
            console.log("KPay - Exception opening websocket: " + e);
        }
    }
}

function le(e) {
    N || (se(e, {
        type: "keepAlive"
    }), null !== m && (clearTimeout(m), m = null), m = setTimeout(function() {
        le(e);
    }, t));
}

function ae() {
    k && (clearTimeout(k), k = null), console.log("KPay - Scheduling websocket retry..."), 
    k = setTimeout(function() {
        N = !1;
    }, a);
}

function se(e, n) {
    try {
        if (1 === e.readyState) {
            var o = JSON.stringify(n);
            console.log("KPay - Sending webSocket message: " + o), e.send(o);
        } else console.log("KPay - Error sending webSocket message: readyState !== 1"), 
        ie();
    } catch (e) {
        console.log("KPay - Error sending webSocket message: " + e), ie();
    }
}

function ie() {
    C = !1, N = !0;
    try {
        console.log("KPay - Closing websocket..."), D.close();
    } catch (e) {}
    D = null, ae(), console.log("KPay - Starting polling status checks..."), Q();
}

function ue() {
    if (console.log("KPay - Cancelling websocket status checking..."), null !== g && (clearTimeout(g), 
    g = null), null !== m && (clearTimeout(m), m = null), C = !1, null !== D) try {
        D.close();
    } catch (e) {}
    D = null, T = !1;
}

function re(e) {
    for (var n = [], i = 0; i < e.length; i += 2) n.push(parseInt(e.substr(i, 2), 16));
    return n;
}

function fe() {
    var e = null;
    return me.permissions.granted("access_app_cluster_storage") && null !== O && (console.log("KPay - attempting to get stored accounttoken from app storage cluster..."), 
    e = O.getItem(h)), null !== e && void 0 !== e && "undefined" !== e || (console.log("KPay - attempting to get stored accounttoken from localstorage..."), 
    null !== (e = localStorageModule.getItem(h)) && void 0 !== e && "undefined" !== e || (console.log("KPay - generating new accounttoken..."), 
    e = ke(), Pe(h, e)), me.permissions.granted("access_app_cluster_storage") && null !== O && O.setItem(h, e)), 
    e;
}

function ye() {
    b = null, ve(K);
}

function de(e) {
    b = e, Pe(K, JSON.stringify(b));
}

function ge() {
    if (null === b) {
        var e = localStorageModule.getItem(K);
        null !== e && void 0 !== e && "undefined" !== e && (b = JSON.parse(e));
    }
    return b;
}

function ke() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
        var r = 16 * Math.random() | 0;
        return ("x" == c ? r : 3 & r | 8).toString(16);
    });
}

function pe() {
    return device.modelName.toLowerCase();
}

function Ke(e, n) {
    var o = localStorageModule.getItem(e);
    if (null !== o && void 0 !== o && "undefined" !== o && !isNaN(o)) {
        var t = Number(o);
        if (!isNaN(t)) return t;
    }
    return n;
}

function Pe(e, n) {
    null !== n && void 0 !== n && localStorageModule.setItem(e, n.toString());
}

function ve(e) {
    localStorageModule.removeItem(e);
}