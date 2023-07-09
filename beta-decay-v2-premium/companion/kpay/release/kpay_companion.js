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
var n="fb3.1.1",e=3e3,t=5e3,u=25e3,o=1e4,a=864e5,f=null,s=null,m=null,p=null,x=null,v=null,T="kpay_nextRecheckTimeLocalstorageKey",y="kpay_lastStatusResultLocalstorageKey",k="kpay_flagsLocalstorageKey",g="kpay_appIdLocalstorageKey",b="kpay_accountTokenLocalstorageKey",h=null,w=null,_=null,S=!1,N=!1,D=0,I=0,R=!1,C=!1,M=0,U=null,K=null,L=function(){},J=mn,O=appClusterStorage.get("betadecay.v2");export function initialize(){null!==xn()&&"licensed"!==xn().status&&dn(),mn(),inbox.addEventListener("newfile",j),setTimeout($,6e4)}export function setEventHandler(n){L=n}export function setAccountTokenGenerator(n){J=n}export function startPurchase(){P(kcm.purchaseMessageFilename,{purchase:"start"})}export function cancelPurchase(){P(kcm.purchaseMessageFilename,{purchase:"cancel"})}function P(n,e,t,u){var o=function(){t&&t()},a=function(n){u&&u()};outbox.enqueue(n,cbor.encode(e)).then(o).catch(a)}function z(){return 0!=(2&w)}function A(){return 0!=(4&w)}var F=[kcm.getStatusMessageFilename,kcm.cancelPurchaseMessageFilename],B=[],E=[];inbox.t=inbox.pop,inbox.pop=async function(){if(B.length>0)return B.pop();for(var n;n=await inbox.t();){if(!(F.indexOf(n.name)>-1))return n;E.push(n)}};async function W(){if(E.length>0)return E.pop();for(var n;n=await inbox.t();){if(F.indexOf(n.name)>-1)return n;B.push(n)}}function j(){W().then(function(n){void 0!==n&&n.cbor().then(function(n){if(kcm.isKPayMessage(n))if(q(n)){if(S&&h===n.appId&&w===n.flags){var e=(new Date).getTime();if(R&&!C&&e-I<u)return;if(e-D<t)return}h=n.appId,w=n.flags,null!==xn()&&"unlicensed"!==xn().status&&dn(),Q(),s&&(clearTimeout(s),s=null),s=setTimeout(Y,15e3)}else G(n)&&(S=!1,dn(),f&&(clearTimeout(f),f=null),s&&(clearTimeout(s),s=null),R&&fn())})})}function q(n){return kcm.isKPayMessage(n)&&0===n.type}function G(n){return kcm.isKPayMessage(n)&&3===n.type}function H(n){return{isKpayMsg:!0,type:1,serverResponse:n}}function Q(){S=!0;var t=(new Date).getTime(),u=J(),o=Tn(),a="https://api.kiezelpay.com/api/v2/status?";a+="appid="+encodeURIComponent(h),a+="&accounttoken="+encodeURIComponent(u),a+="&platform=fitbit",a+="&device="+encodeURIComponent(o),z()&&(a+="&test=true"),A()&&(a+="&skiptrial=true"),a+="&nocache="+encodeURIComponent(t),a+="&libv="+encodeURIComponent(n),fetch(a).then(function(n){return n.json()}).then(function(n){N=!1,D=(new Date).getTime(),n&&n.hasOwnProperty("status")&&V(n)}).catch(function(n){D=(new Date).getTime(),N||!S||null!==xn()&&"licensed"===xn().status||(f&&(clearTimeout(f),f=null),f=setTimeout(Q,e)),N=!1})}function V(n){"unlicensed"===n.status&&(M=Number(n.paymentCode)),null!==xn()&&xn().status===n.status&&("unlicensed"!==xn().status||xn().purchaseStatus===n.purchaseStatus&&xn().paymentCode===n.paymentCode&&xn().checksum===n.checksum)||P(kcm.statusMessageFilename,H(n),function(){if("licensed"===n.status)X(7,null,!1);else if("trial"===n.status){var e=Math.round((new Date).getTime()/1e3)+Number(n.trialDurationInSeconds),t=new Date;t.setTime(1e3*e),X(3,t,!1)}else if("unlicensed"===n.status){var u=Number(n.paymentCode),o=null==xn()||u!==xn().paymentCode;"waitForUser"==n.purchaseStatus?X(5,u,o):"inProgress"==n.purchaseStatus&&X(6,u,o)}pn(n)},function(){}),"licensed"===n.status||"trial"===n.status?("licensed"===n.status?Z(n):tn(),S=!1,s&&(clearTimeout(s),s=null),fn()):(tn(),C||R?C&&(f&&(clearTimeout(f),f=null),f=setTimeout(Q,e)):ln())}function X(n,e,t){if(K!==n||t){K=n;try{L(n,e)}catch(n){}}}function Y(){var n=(new Date).getTime();S&&(R&&!C&&n-I>=u||(!R||C)&&n-D>=15e3)&&(null===xn()||"licensed"!==xn().status&&"trial"!==xn().status)&&(f&&(clearTimeout(f),f=null),f=setTimeout(Q,0)),s&&(clearTimeout(s),s=null),s=setTimeout(Y,15e3)}function Z(n){n&&"licensed"===n.status&&nn(86400*n.validityPeriodInDays*1e3,!1)}function $(){var n=yn(T,null);null!==n&&nn(n-(new Date).getTime(),!0)}function nn(n,e){e||(kn(k,w),kn(g,h)),n<0?un():en(n)}function en(n){tn();var e=new Date,t=n/1e3;e.setSeconds(e.getSeconds()+t),kn(T,e.getTime()),m&&(clearTimeout(m),m=null),m=setTimeout(un,n)}function tn(){m&&(clearTimeout(m),m=null),gn(T)}function un(){w=yn(k,w),h=yn(g,h),en(a),S||(N=!0,Q())}function ln(){if(!C&&!R&&null===U){var e=J(),t=Tn(),o={type:"register.v2",purchaseCode:M,data:{appid:h,accounttoken:e,platform:"fitbit",u:t,test:z(),l:A(),libv:n}},a="wss://socket.kiezelpay.com";x&&(clearTimeout(x),x=null),x=setTimeout(function(){R||(C=!0,Q(),cn())},3e3);try{(U=new WebSocket(a)).onopen=function(n){R=!0,C=!1,rn(U,o)},U.onmessage=function(n){if(R){I=(new Date).getTime();var e=JSON.parse(n.data);if(e&&"registerReponse"==e.type&&e.keepAliveTimeout)u=e.keepAliveTimeout,p&&(clearTimeout(p),p=null),p=setTimeout(function(){on(U)},u);else if(e&&"statusUpdate"==e.type){if(!e.data||!e.data.hasOwnProperty("status"))return;V(e.data)}}else try{U.close()}catch(n){}},U.onerror=function(n){R=!1,C=!0;try{U.close()}catch(n){}U=null,cn(),Q()},U.onclose=function(n){if(R){if(R=!1,null!==U)try{U.close()}catch(n){}U=null,C=!0,cn(),Q()}}}catch(n){}}}function on(n){C||(rn(n,{type:"keepAlive"}),null!==p&&(clearTimeout(p),p=null),p=setTimeout(function(){on(n)},u))}function cn(){v&&(clearTimeout(v),v=null),v=setTimeout(function(){C=!1},o)}function rn(n,e){try{if(1===n.readyState){var t=JSON.stringify(e);n.send(t)}else an()}catch(n){an()}}function an(){R=!1,C=!0;try{U.close()}catch(n){}U=null,cn(),Q()}function fn(){if(null!==x&&(clearTimeout(x),x=null),null!==p&&(clearTimeout(p),p=null),R=!1,null!==U)try{U.close()}catch(n){}U=null,S=!1}function sn(n){for(var e=[],i=0;i<n.length;i+=2)e.push(parseInt(n.substr(i,2),16));return e}function mn(){var n=null;return me.permissions.granted("access_app_cluster_storage")&&null!==O&&(n=O.getItem(b)),null!==n&&void 0!==n&&"undefined"!==n||(null!==(n=localStorageModule.getItem(b))&&void 0!==n&&"undefined"!==n||(n=vn(),kn(b,n)),me.permissions.granted("access_app_cluster_storage")&&null!==O&&O.setItem(b,n)),n}function dn(){_=null,gn(y)}function pn(n){_=n,kn(y,JSON.stringify(_))}function xn(){if(null===_){var n=localStorageModule.getItem(y);null!==n&&void 0!==n&&"undefined"!==n&&(_=JSON.parse(n))}return _}function vn(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(c){var r=16*Math.random()|0;return("x"==c?r:3&r|8).toString(16)})}function Tn(){return device.modelName.toLowerCase()}function yn(n,e){var t=localStorageModule.getItem(n);if(null!==t&&void 0!==t&&"undefined"!==t&&!isNaN(t)){var u=Number(t);if(!isNaN(u))return u}return e}function kn(n,e){null!==e&&void 0!==e&&localStorageModule.setItem(n,e.toString())}function gn(n){localStorageModule.removeItem(n)}