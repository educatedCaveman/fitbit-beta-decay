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

import * as kp from './kpay.js';
import * as kc from './kpay_core.js';
import * as kcm from '../../../common/kpay/kpay_common.js';

var fn = null;

function yn() {
    kc.kp9(N, Pn, pn);
}

function N(n) {
    console.log("KPay_time_trial - _mainLibInitialized()"), n && (console.log("KPay_time_trial - Fresh install detected; appending State with trial info..."), 
    kc.kp0.te = !1, kc.kp0.ts = !1, kc.kp0.te2 = null), kc.kp0.sl || (kc.kp0.ts && null !== kc.kp0.te2 ? _n() : kc.kp2(!1));
}

function Pn() {
    kc.kp0.ts && !kc.kp0.te || kc.kp0.sl ? console.log("KPay_time_trial - initialized; no action necesarry") : (console.log("KPay_time_trial - initialized; starting status checks"), 
    kc.kp1(!0));
}

function pn(n) {
    if ("trial" == n.status) {
        var e = Math.round(new Date().getTime() / 1e3) + Number(n.trialDurationInSeconds);
        if (!kc.kp0.ts || !kc.kp0.te2 || kc.kp0.te2 > e) {
            kc.kp0.sl = !1, 7 === kc.kp6() && kc.kp7(), kc.kp0.ts = !0, kc.kp0.te2 = e, kc.kp11();
            var a = new Date();
            a.setTime(1e3 * kc.kp0.te2), kc.kp5(3, a, !1);
        }
        return kc.kp3(), _n(), !0;
    }
    return !1;
}

function gn() {
    console.log("KPay_time_trial - _endTrialCallback()"), fn = null, mn();
}

function _n() {
    console.log("KPay_time_trial - _scheduleTrialEndTimer()");
    var n = Math.round(new Date().getTime() / 1e3);
    kc.kp0.te || kc.kp0.ts && n >= kc.kp0.te2 ? (console.log("KPay_time_trial - trial already ended!"), 
    mn()) : kc.kp0.ts && n < kc.kp0.te2 && (console.log("KPay_time_trial - Scheduling trial to end in " + (kc.kp0.te2 - n) + " seconds."), 
    fn = setTimeout(mn, 1e3 * (kc.kp0.te2 - n)));
}

function mn() {
    console.log("KPay_time_trial - _endTrial()"), kc.kp0.sl || (kc.kp5(4, null, !1), kc.startPurchase());
}

yn();