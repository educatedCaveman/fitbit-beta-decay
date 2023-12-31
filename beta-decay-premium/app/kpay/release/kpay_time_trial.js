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

var dn=null;function pn(){kc.kp9(U,yn,gn)}function U(n){n&&(kc.kp0.te=!1,kc.kp0.ts=!1,kc.kp0.te2=null),kc.kp0.sl||(kc.kp0.ts&&null!==kc.kp0.te2?Pn():kc.kp2(!1))}function yn(){kc.kp0.ts&&!kc.kp0.te||kc.kp0.sl||kc.kp1(!0)}function gn(n){if("trial"==n.status){var t=Math.round((new Date).getTime()/1e3)+Number(n.trialDurationInSeconds);if(!kc.kp0.ts||!kc.kp0.te2||kc.kp0.te2>t){kc.kp0.sl=!1,7===kc.kp6()&&kc.kp7(),kc.kp0.ts=!0,kc.kp0.te2=t,kc.kp11();var e=new Date;e.setTime(1e3*kc.kp0.te2),kc.kp5(3,e,!1)}return kc.kp3(),Pn(),!0}return!1}function kn(){dn=null,bn()}function Pn(){var n=Math.round((new Date).getTime()/1e3);kc.kp0.te||kc.kp0.ts&&n>=kc.kp0.te2?bn():kc.kp0.ts&&n<kc.kp0.te2&&(dn=setTimeout(bn,1e3*(kc.kp0.te2-n)))}function bn(){kc.kp0.sl||(kc.kp5(4,null,!1),kc.startPurchase())}pn();