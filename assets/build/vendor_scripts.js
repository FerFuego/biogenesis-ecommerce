/*
 * anime.js v3.2.0
 * (c) 2020 Julian Garnier
 * Released under the MIT license
 * animejs.com
 */

!function(n,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):n.anime=e()}(this,function(){"use strict";var n={update:null,begin:null,loopBegin:null,changeBegin:null,change:null,changeComplete:null,loopComplete:null,complete:null,loop:1,direction:"normal",autoplay:!0,timelineOffset:0},e={duration:1e3,delay:0,endDelay:0,easing:"easeOutElastic(1, .5)",round:0},r=["translateX","translateY","translateZ","rotate","rotateX","rotateY","rotateZ","scale","scaleX","scaleY","scaleZ","skew","skewX","skewY","perspective","matrix","matrix3d"],t={CSS:{},springs:{}};function a(n,e,r){return Math.min(Math.max(n,e),r)}function o(n,e){return n.indexOf(e)>-1}function u(n,e){return n.apply(null,e)}var i={arr:function(n){return Array.isArray(n)},obj:function(n){return o(Object.prototype.toString.call(n),"Object")},pth:function(n){return i.obj(n)&&n.hasOwnProperty("totalLength")},svg:function(n){return n instanceof SVGElement},inp:function(n){return n instanceof HTMLInputElement},dom:function(n){return n.nodeType||i.svg(n)},str:function(n){return"string"==typeof n},fnc:function(n){return"function"==typeof n},und:function(n){return void 0===n},hex:function(n){return/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(n)},rgb:function(n){return/^rgb/.test(n)},hsl:function(n){return/^hsl/.test(n)},col:function(n){return i.hex(n)||i.rgb(n)||i.hsl(n)},key:function(r){return!n.hasOwnProperty(r)&&!e.hasOwnProperty(r)&&"targets"!==r&&"keyframes"!==r}};function c(n){var e=/\(([^)]+)\)/.exec(n);return e?e[1].split(",").map(function(n){return parseFloat(n)}):[]}function s(n,e){var r=c(n),o=a(i.und(r[0])?1:r[0],.1,100),u=a(i.und(r[1])?100:r[1],.1,100),s=a(i.und(r[2])?10:r[2],.1,100),f=a(i.und(r[3])?0:r[3],.1,100),l=Math.sqrt(u/o),d=s/(2*Math.sqrt(u*o)),p=d<1?l*Math.sqrt(1-d*d):0,h=1,v=d<1?(d*l-f)/p:-f+l;function g(n){var r=e?e*n/1e3:n;return r=d<1?Math.exp(-r*d*l)*(h*Math.cos(p*r)+v*Math.sin(p*r)):(h+v*r)*Math.exp(-r*l),0===n||1===n?n:1-r}return e?g:function(){var e=t.springs[n];if(e)return e;for(var r=0,a=0;;)if(1===g(r+=1/6)){if(++a>=16)break}else a=0;var o=r*(1/6)*1e3;return t.springs[n]=o,o}}function f(n){return void 0===n&&(n=10),function(e){return Math.ceil(a(e,1e-6,1)*n)*(1/n)}}var l,d,p=function(){var n=11,e=1/(n-1);function r(n,e){return 1-3*e+3*n}function t(n,e){return 3*e-6*n}function a(n){return 3*n}function o(n,e,o){return((r(e,o)*n+t(e,o))*n+a(e))*n}function u(n,e,o){return 3*r(e,o)*n*n+2*t(e,o)*n+a(e)}return function(r,t,a,i){if(0<=r&&r<=1&&0<=a&&a<=1){var c=new Float32Array(n);if(r!==t||a!==i)for(var s=0;s<n;++s)c[s]=o(s*e,r,a);return function(n){return r===t&&a===i?n:0===n||1===n?n:o(f(n),t,i)}}function f(t){for(var i=0,s=1,f=n-1;s!==f&&c[s]<=t;++s)i+=e;var l=i+(t-c[--s])/(c[s+1]-c[s])*e,d=u(l,r,a);return d>=.001?function(n,e,r,t){for(var a=0;a<4;++a){var i=u(e,r,t);if(0===i)return e;e-=(o(e,r,t)-n)/i}return e}(t,l,r,a):0===d?l:function(n,e,r,t,a){for(var u,i,c=0;(u=o(i=e+(r-e)/2,t,a)-n)>0?r=i:e=i,Math.abs(u)>1e-7&&++c<10;);return i}(t,i,i+e,r,a)}}}(),h=(l={linear:function(){return function(n){return n}}},d={Sine:function(){return function(n){return 1-Math.cos(n*Math.PI/2)}},Circ:function(){return function(n){return 1-Math.sqrt(1-n*n)}},Back:function(){return function(n){return n*n*(3*n-2)}},Bounce:function(){return function(n){for(var e,r=4;n<((e=Math.pow(2,--r))-1)/11;);return 1/Math.pow(4,3-r)-7.5625*Math.pow((3*e-2)/22-n,2)}},Elastic:function(n,e){void 0===n&&(n=1),void 0===e&&(e=.5);var r=a(n,1,10),t=a(e,.1,2);return function(n){return 0===n||1===n?n:-r*Math.pow(2,10*(n-1))*Math.sin((n-1-t/(2*Math.PI)*Math.asin(1/r))*(2*Math.PI)/t)}}},["Quad","Cubic","Quart","Quint","Expo"].forEach(function(n,e){d[n]=function(){return function(n){return Math.pow(n,e+2)}}}),Object.keys(d).forEach(function(n){var e=d[n];l["easeIn"+n]=e,l["easeOut"+n]=function(n,r){return function(t){return 1-e(n,r)(1-t)}},l["easeInOut"+n]=function(n,r){return function(t){return t<.5?e(n,r)(2*t)/2:1-e(n,r)(-2*t+2)/2}}}),l);function v(n,e){if(i.fnc(n))return n;var r=n.split("(")[0],t=h[r],a=c(n);switch(r){case"spring":return s(n,e);case"cubicBezier":return u(p,a);case"steps":return u(f,a);default:return u(t,a)}}function g(n){try{return document.querySelectorAll(n)}catch(n){return}}function m(n,e){for(var r=n.length,t=arguments.length>=2?arguments[1]:void 0,a=[],o=0;o<r;o++)if(o in n){var u=n[o];e.call(t,u,o,n)&&a.push(u)}return a}function y(n){return n.reduce(function(n,e){return n.concat(i.arr(e)?y(e):e)},[])}function b(n){return i.arr(n)?n:(i.str(n)&&(n=g(n)||n),n instanceof NodeList||n instanceof HTMLCollection?[].slice.call(n):[n])}function x(n,e){return n.some(function(n){return n===e})}function M(n){var e={};for(var r in n)e[r]=n[r];return e}function w(n,e){var r=M(n);for(var t in n)r[t]=e.hasOwnProperty(t)?e[t]:n[t];return r}function k(n,e){var r=M(n);for(var t in e)r[t]=i.und(n[t])?e[t]:n[t];return r}function O(n){return i.rgb(n)?(r=/rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(e=n))?"rgba("+r[1]+",1)":e:i.hex(n)?(t=n.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,function(n,e,r,t){return e+e+r+r+t+t}),a=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t),"rgba("+parseInt(a[1],16)+","+parseInt(a[2],16)+","+parseInt(a[3],16)+",1)"):i.hsl(n)?function(n){var e,r,t,a=/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(n)||/hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(n),o=parseInt(a[1],10)/360,u=parseInt(a[2],10)/100,i=parseInt(a[3],10)/100,c=a[4]||1;function s(n,e,r){return r<0&&(r+=1),r>1&&(r-=1),r<1/6?n+6*(e-n)*r:r<.5?e:r<2/3?n+(e-n)*(2/3-r)*6:n}if(0==u)e=r=t=i;else{var f=i<.5?i*(1+u):i+u-i*u,l=2*i-f;e=s(l,f,o+1/3),r=s(l,f,o),t=s(l,f,o-1/3)}return"rgba("+255*e+","+255*r+","+255*t+","+c+")"}(n):void 0;var e,r,t,a}function C(n){var e=/[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(n);if(e)return e[1]}function B(n,e){return i.fnc(n)?n(e.target,e.id,e.total):n}function P(n,e){return n.getAttribute(e)}function I(n,e,r){if(x([r,"deg","rad","turn"],C(e)))return e;var a=t.CSS[e+r];if(!i.und(a))return a;var o=document.createElement(n.tagName),u=n.parentNode&&n.parentNode!==document?n.parentNode:document.body;u.appendChild(o),o.style.position="absolute",o.style.width=100+r;var c=100/o.offsetWidth;u.removeChild(o);var s=c*parseFloat(e);return t.CSS[e+r]=s,s}function T(n,e,r){if(e in n.style){var t=e.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase(),a=n.style[e]||getComputedStyle(n).getPropertyValue(t)||"0";return r?I(n,a,r):a}}function D(n,e){return i.dom(n)&&!i.inp(n)&&(P(n,e)||i.svg(n)&&n[e])?"attribute":i.dom(n)&&x(r,e)?"transform":i.dom(n)&&"transform"!==e&&T(n,e)?"css":null!=n[e]?"object":void 0}function E(n){if(i.dom(n)){for(var e,r=n.style.transform||"",t=/(\w+)\(([^)]*)\)/g,a=new Map;e=t.exec(r);)a.set(e[1],e[2]);return a}}function F(n,e,r,t){var a,u=o(e,"scale")?1:0+(o(a=e,"translate")||"perspective"===a?"px":o(a,"rotate")||o(a,"skew")?"deg":void 0),i=E(n).get(e)||u;return r&&(r.transforms.list.set(e,i),r.transforms.last=e),t?I(n,i,t):i}function N(n,e,r,t){switch(D(n,e)){case"transform":return F(n,e,t,r);case"css":return T(n,e,r);case"attribute":return P(n,e);default:return n[e]||0}}function A(n,e){var r=/^(\*=|\+=|-=)/.exec(n);if(!r)return n;var t=C(n)||0,a=parseFloat(e),o=parseFloat(n.replace(r[0],""));switch(r[0][0]){case"+":return a+o+t;case"-":return a-o+t;case"*":return a*o+t}}function L(n,e){if(i.col(n))return O(n);if(/\s/g.test(n))return n;var r=C(n),t=r?n.substr(0,n.length-r.length):n;return e?t+e:t}function j(n,e){return Math.sqrt(Math.pow(e.x-n.x,2)+Math.pow(e.y-n.y,2))}function S(n){for(var e,r=n.points,t=0,a=0;a<r.numberOfItems;a++){var o=r.getItem(a);a>0&&(t+=j(e,o)),e=o}return t}function q(n){if(n.getTotalLength)return n.getTotalLength();switch(n.tagName.toLowerCase()){case"circle":return o=n,2*Math.PI*P(o,"r");case"rect":return 2*P(a=n,"width")+2*P(a,"height");case"line":return j({x:P(t=n,"x1"),y:P(t,"y1")},{x:P(t,"x2"),y:P(t,"y2")});case"polyline":return S(n);case"polygon":return r=(e=n).points,S(e)+j(r.getItem(r.numberOfItems-1),r.getItem(0))}var e,r,t,a,o}function $(n,e){var r=e||{},t=r.el||function(n){for(var e=n.parentNode;i.svg(e)&&i.svg(e.parentNode);)e=e.parentNode;return e}(n),a=t.getBoundingClientRect(),o=P(t,"viewBox"),u=a.width,c=a.height,s=r.viewBox||(o?o.split(" "):[0,0,u,c]);return{el:t,viewBox:s,x:s[0]/1,y:s[1]/1,w:u/s[2],h:c/s[3]}}function X(n,e){function r(r){void 0===r&&(r=0);var t=e+r>=1?e+r:0;return n.el.getPointAtLength(t)}var t=$(n.el,n.svg),a=r(),o=r(-1),u=r(1);switch(n.property){case"x":return(a.x-t.x)*t.w;case"y":return(a.y-t.y)*t.h;case"angle":return 180*Math.atan2(u.y-o.y,u.x-o.x)/Math.PI}}function Y(n,e){var r=/[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g,t=L(i.pth(n)?n.totalLength:n,e)+"";return{original:t,numbers:t.match(r)?t.match(r).map(Number):[0],strings:i.str(n)||e?t.split(r):[]}}function Z(n){return m(n?y(i.arr(n)?n.map(b):b(n)):[],function(n,e,r){return r.indexOf(n)===e})}function Q(n){var e=Z(n);return e.map(function(n,r){return{target:n,id:r,total:e.length,transforms:{list:E(n)}}})}function V(n,e){var r=M(e);if(/^spring/.test(r.easing)&&(r.duration=s(r.easing)),i.arr(n)){var t=n.length;2===t&&!i.obj(n[0])?n={value:n}:i.fnc(e.duration)||(r.duration=e.duration/t)}var a=i.arr(n)?n:[n];return a.map(function(n,r){var t=i.obj(n)&&!i.pth(n)?n:{value:n};return i.und(t.delay)&&(t.delay=r?0:e.delay),i.und(t.endDelay)&&(t.endDelay=r===a.length-1?e.endDelay:0),t}).map(function(n){return k(n,r)})}function z(n,e){var r=[],t=e.keyframes;for(var a in t&&(e=k(function(n){for(var e=m(y(n.map(function(n){return Object.keys(n)})),function(n){return i.key(n)}).reduce(function(n,e){return n.indexOf(e)<0&&n.push(e),n},[]),r={},t=function(t){var a=e[t];r[a]=n.map(function(n){var e={};for(var r in n)i.key(r)?r==a&&(e.value=n[r]):e[r]=n[r];return e})},a=0;a<e.length;a++)t(a);return r}(t),e)),e)i.key(a)&&r.push({name:a,tweens:V(e[a],n)});return r}function H(n,e){var r;return n.tweens.map(function(t){var a=function(n,e){var r={};for(var t in n){var a=B(n[t],e);i.arr(a)&&1===(a=a.map(function(n){return B(n,e)})).length&&(a=a[0]),r[t]=a}return r.duration=parseFloat(r.duration),r.delay=parseFloat(r.delay),r}(t,e),o=a.value,u=i.arr(o)?o[1]:o,c=C(u),s=N(e.target,n.name,c,e),f=r?r.to.original:s,l=i.arr(o)?o[0]:f,d=C(l)||C(s),p=c||d;return i.und(u)&&(u=f),a.from=Y(l,p),a.to=Y(A(u,l),p),a.start=r?r.end:0,a.end=a.start+a.delay+a.duration+a.endDelay,a.easing=v(a.easing,a.duration),a.isPath=i.pth(o),a.isColor=i.col(a.from.original),a.isColor&&(a.round=1),r=a,a})}var G={css:function(n,e,r){return n.style[e]=r},attribute:function(n,e,r){return n.setAttribute(e,r)},object:function(n,e,r){return n[e]=r},transform:function(n,e,r,t,a){if(t.list.set(e,r),e===t.last||a){var o="";t.list.forEach(function(n,e){o+=e+"("+n+") "}),n.style.transform=o}}};function R(n,e){Q(n).forEach(function(n){for(var r in e){var t=B(e[r],n),a=n.target,o=C(t),u=N(a,r,o,n),i=A(L(t,o||C(u)),u),c=D(a,r);G[c](a,r,i,n.transforms,!0)}})}function W(n,e){return m(y(n.map(function(n){return e.map(function(e){return function(n,e){var r=D(n.target,e.name);if(r){var t=H(e,n),a=t[t.length-1];return{type:r,property:e.name,animatable:n,tweens:t,duration:a.end,delay:t[0].delay,endDelay:a.endDelay}}}(n,e)})})),function(n){return!i.und(n)})}function J(n,e){var r=n.length,t=function(n){return n.timelineOffset?n.timelineOffset:0},a={};return a.duration=r?Math.max.apply(Math,n.map(function(n){return t(n)+n.duration})):e.duration,a.delay=r?Math.min.apply(Math,n.map(function(n){return t(n)+n.delay})):e.delay,a.endDelay=r?a.duration-Math.max.apply(Math,n.map(function(n){return t(n)+n.duration-n.endDelay})):e.endDelay,a}var K=0;var U,_=[],nn=[],en=function(){function n(){U=requestAnimationFrame(e)}function e(e){var r=_.length;if(r){for(var t=0;t<r;){var a=_[t];if(a.paused){var o=_.indexOf(a);o>-1&&(_.splice(o,1),r=_.length)}else a.tick(e);t++}n()}else U=cancelAnimationFrame(U)}return n}();function rn(r){void 0===r&&(r={});var t,o=0,u=0,i=0,c=0,s=null;function f(n){var e=window.Promise&&new Promise(function(n){return s=n});return n.finished=e,e}var l,d,p,h,v,g,y,b,x=(d=w(n,l=r),p=w(e,l),h=z(p,l),v=Q(l.targets),g=W(v,h),y=J(g,p),b=K,K++,k(d,{id:b,children:[],animatables:v,animations:g,duration:y.duration,delay:y.delay,endDelay:y.endDelay}));f(x);function M(){var n=x.direction;"alternate"!==n&&(x.direction="normal"!==n?"normal":"reverse"),x.reversed=!x.reversed,t.forEach(function(n){return n.reversed=x.reversed})}function O(n){return x.reversed?x.duration-n:n}function C(){o=0,u=O(x.currentTime)*(1/rn.speed)}function B(n,e){e&&e.seek(n-e.timelineOffset)}function P(n){for(var e=0,r=x.animations,t=r.length;e<t;){var o=r[e],u=o.animatable,i=o.tweens,c=i.length-1,s=i[c];c&&(s=m(i,function(e){return n<e.end})[0]||s);for(var f=a(n-s.start-s.delay,0,s.duration)/s.duration,l=isNaN(f)?1:s.easing(f),d=s.to.strings,p=s.round,h=[],v=s.to.numbers.length,g=void 0,y=0;y<v;y++){var b=void 0,M=s.to.numbers[y],w=s.from.numbers[y]||0;b=s.isPath?X(s.value,l*M):w+l*(M-w),p&&(s.isColor&&y>2||(b=Math.round(b*p)/p)),h.push(b)}var k=d.length;if(k){g=d[0];for(var O=0;O<k;O++){d[O];var C=d[O+1],B=h[O];isNaN(B)||(g+=C?B+C:B+" ")}}else g=h[0];G[o.type](u.target,o.property,g,u.transforms),o.currentValue=g,e++}}function I(n){x[n]&&!x.passThrough&&x[n](x)}function T(n){var e=x.duration,r=x.delay,l=e-x.endDelay,d=O(n);x.progress=a(d/e*100,0,100),x.reversePlayback=d<x.currentTime,t&&function(n){if(x.reversePlayback)for(var e=c;e--;)B(n,t[e]);else for(var r=0;r<c;r++)B(n,t[r])}(d),!x.began&&x.currentTime>0&&(x.began=!0,I("begin")),!x.loopBegan&&x.currentTime>0&&(x.loopBegan=!0,I("loopBegin")),d<=r&&0!==x.currentTime&&P(0),(d>=l&&x.currentTime!==e||!e)&&P(e),d>r&&d<l?(x.changeBegan||(x.changeBegan=!0,x.changeCompleted=!1,I("changeBegin")),I("change"),P(d)):x.changeBegan&&(x.changeCompleted=!0,x.changeBegan=!1,I("changeComplete")),x.currentTime=a(d,0,e),x.began&&I("update"),n>=e&&(u=0,x.remaining&&!0!==x.remaining&&x.remaining--,x.remaining?(o=i,I("loopComplete"),x.loopBegan=!1,"alternate"===x.direction&&M()):(x.paused=!0,x.completed||(x.completed=!0,I("loopComplete"),I("complete"),!x.passThrough&&"Promise"in window&&(s(),f(x)))))}return x.reset=function(){var n=x.direction;x.passThrough=!1,x.currentTime=0,x.progress=0,x.paused=!0,x.began=!1,x.loopBegan=!1,x.changeBegan=!1,x.completed=!1,x.changeCompleted=!1,x.reversePlayback=!1,x.reversed="reverse"===n,x.remaining=x.loop,t=x.children;for(var e=c=t.length;e--;)x.children[e].reset();(x.reversed&&!0!==x.loop||"alternate"===n&&1===x.loop)&&x.remaining++,P(x.reversed?x.duration:0)},x.set=function(n,e){return R(n,e),x},x.tick=function(n){i=n,o||(o=i),T((i+(u-o))*rn.speed)},x.seek=function(n){T(O(n))},x.pause=function(){x.paused=!0,C()},x.play=function(){x.paused&&(x.completed&&x.reset(),x.paused=!1,_.push(x),C(),U||en())},x.reverse=function(){M(),x.completed=!x.reversed,C()},x.restart=function(){x.reset(),x.play()},x.reset(),x.autoplay&&x.play(),x}function tn(n,e){for(var r=e.length;r--;)x(n,e[r].animatable.target)&&e.splice(r,1)}return"undefined"!=typeof document&&document.addEventListener("visibilitychange",function(){document.hidden?(_.forEach(function(n){return n.pause()}),nn=_.slice(0),rn.running=_=[]):nn.forEach(function(n){return n.play()})}),rn.version="3.2.0",rn.speed=1,rn.running=_,rn.remove=function(n){for(var e=Z(n),r=_.length;r--;){var t=_[r],a=t.animations,o=t.children;tn(e,a);for(var u=o.length;u--;){var i=o[u],c=i.animations;tn(e,c),c.length||i.children.length||o.splice(u,1)}a.length||o.length||t.pause()}},rn.get=N,rn.set=R,rn.convertPx=I,rn.path=function(n,e){var r=i.str(n)?g(n)[0]:n,t=e||100;return function(n){return{property:n,el:r,svg:$(r),totalLength:q(r)*(t/100)}}},rn.setDashoffset=function(n){var e=q(n);return n.setAttribute("stroke-dasharray",e),e},rn.stagger=function(n,e){void 0===e&&(e={});var r=e.direction||"normal",t=e.easing?v(e.easing):null,a=e.grid,o=e.axis,u=e.from||0,c="first"===u,s="center"===u,f="last"===u,l=i.arr(n),d=l?parseFloat(n[0]):parseFloat(n),p=l?parseFloat(n[1]):0,h=C(l?n[1]:n)||0,g=e.start||0+(l?d:0),m=[],y=0;return function(n,e,i){if(c&&(u=0),s&&(u=(i-1)/2),f&&(u=i-1),!m.length){for(var v=0;v<i;v++){if(a){var b=s?(a[0]-1)/2:u%a[0],x=s?(a[1]-1)/2:Math.floor(u/a[0]),M=b-v%a[0],w=x-Math.floor(v/a[0]),k=Math.sqrt(M*M+w*w);"x"===o&&(k=-M),"y"===o&&(k=-w),m.push(k)}else m.push(Math.abs(u-v));y=Math.max.apply(Math,m)}t&&(m=m.map(function(n){return t(n/y)*y})),"reverse"===r&&(m=m.map(function(n){return o?n<0?-1*n:-n:Math.abs(y-n)}))}return g+(l?(p-d)/y:d)*(Math.round(100*m[e])/100)+h}},rn.timeline=function(n){void 0===n&&(n={});var r=rn(n);return r.duration=0,r.add=function(t,a){var o=_.indexOf(r),u=r.children;function c(n){n.passThrough=!0}o>-1&&_.splice(o,1);for(var s=0;s<u.length;s++)c(u[s]);var f=k(t,w(e,n));f.targets=f.targets||n.targets;var l=r.duration;f.autoplay=!1,f.direction=r.direction,f.timelineOffset=i.und(a)?l:A(a,l),c(r),r.seek(f.timelineOffset);var d=rn(f);c(d),u.push(d);var p=J(u,n);return r.delay=p.delay,r.endDelay=p.endDelay,r.duration=p.duration,r.seek(0),r.reset(),r.autoplay&&r.play(),r},r},rn.easing=v,rn.penner=h,rn.random=function(n,e){return Math.floor(Math.random()*(e-n+1))+n},rn});

/*!
Waypoints - 4.0.1
Copyright © 2011-2016 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blob/master/licenses.txt
*/
(function() {
  'use strict'

  var keyCounter = 0
  var allWaypoints = {}

  /* http://imakewebthings.com/waypoints/api/waypoint */
  function Waypoint(options) {
    if (!options) {
      throw new Error('No options passed to Waypoint constructor')
    }
    if (!options.element) {
      throw new Error('No element option passed to Waypoint constructor')
    }
    if (!options.handler) {
      throw new Error('No handler option passed to Waypoint constructor')
    }

    this.key = 'waypoint-' + keyCounter
    this.options = Waypoint.Adapter.extend({}, Waypoint.defaults, options)
    this.element = this.options.element
    this.adapter = new Waypoint.Adapter(this.element)
    this.callback = options.handler
    this.axis = this.options.horizontal ? 'horizontal' : 'vertical'
    this.enabled = this.options.enabled
    this.triggerPoint = null
    this.group = Waypoint.Group.findOrCreate({
      name: this.options.group,
      axis: this.axis
    })
    this.context = Waypoint.Context.findOrCreateByElement(this.options.context)

    if (Waypoint.offsetAliases[this.options.offset]) {
      this.options.offset = Waypoint.offsetAliases[this.options.offset]
    }
    this.group.add(this)
    this.context.add(this)
    allWaypoints[this.key] = this
    keyCounter += 1
  }

  /* Private */
  Waypoint.prototype.queueTrigger = function(direction) {
    this.group.queueTrigger(this, direction)
  }

  /* Private */
  Waypoint.prototype.trigger = function(args) {
    if (!this.enabled) {
      return
    }
    if (this.callback) {
      this.callback.apply(this, args)
    }
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/destroy */
  Waypoint.prototype.destroy = function() {
    this.context.remove(this)
    this.group.remove(this)
    delete allWaypoints[this.key]
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/disable */
  Waypoint.prototype.disable = function() {
    this.enabled = false
    return this
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/enable */
  Waypoint.prototype.enable = function() {
    this.context.refresh()
    this.enabled = true
    return this
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/next */
  Waypoint.prototype.next = function() {
    return this.group.next(this)
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/previous */
  Waypoint.prototype.previous = function() {
    return this.group.previous(this)
  }

  /* Private */
  Waypoint.invokeAll = function(method) {
    var allWaypointsArray = []
    for (var waypointKey in allWaypoints) {
      allWaypointsArray.push(allWaypoints[waypointKey])
    }
    for (var i = 0, end = allWaypointsArray.length; i < end; i++) {
      allWaypointsArray[i][method]()
    }
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/destroy-all */
  Waypoint.destroyAll = function() {
    Waypoint.invokeAll('destroy')
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/disable-all */
  Waypoint.disableAll = function() {
    Waypoint.invokeAll('disable')
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/enable-all */
  Waypoint.enableAll = function() {
    Waypoint.Context.refreshAll()
    for (var waypointKey in allWaypoints) {
      allWaypoints[waypointKey].enabled = true
    }
    return this
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/refresh-all */
  Waypoint.refreshAll = function() {
    Waypoint.Context.refreshAll()
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/viewport-height */
  Waypoint.viewportHeight = function() {
    return window.innerHeight || document.documentElement.clientHeight
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/viewport-width */
  Waypoint.viewportWidth = function() {
    return document.documentElement.clientWidth
  }

  Waypoint.adapters = []

  Waypoint.defaults = {
    context: window,
    continuous: true,
    enabled: true,
    group: 'default',
    horizontal: false,
    offset: 0
  }

  Waypoint.offsetAliases = {
    'bottom-in-view': function() {
      return this.context.innerHeight() - this.adapter.outerHeight()
    },
    'right-in-view': function() {
      return this.context.innerWidth() - this.adapter.outerWidth()
    }
  }

  window.Waypoint = Waypoint
}())
;(function() {
  'use strict'

  function requestAnimationFrameShim(callback) {
    window.setTimeout(callback, 1000 / 60)
  }

  var keyCounter = 0
  var contexts = {}
  var Waypoint = window.Waypoint
  var oldWindowLoad = window.onload

  /* http://imakewebthings.com/waypoints/api/context */
  function Context(element) {
    this.element = element
    this.Adapter = Waypoint.Adapter
    this.adapter = new this.Adapter(element)
    this.key = 'waypoint-context-' + keyCounter
    this.didScroll = false
    this.didResize = false
    this.oldScroll = {
      x: this.adapter.scrollLeft(),
      y: this.adapter.scrollTop()
    }
    this.waypoints = {
      vertical: {},
      horizontal: {}
    }

    element.waypointContextKey = this.key
    contexts[element.waypointContextKey] = this
    keyCounter += 1
    if (!Waypoint.windowContext) {
      Waypoint.windowContext = true
      Waypoint.windowContext = new Context(window)
    }

    this.createThrottledScrollHandler()
    this.createThrottledResizeHandler()
  }

  /* Private */
  Context.prototype.add = function(waypoint) {
    var axis = waypoint.options.horizontal ? 'horizontal' : 'vertical'
    this.waypoints[axis][waypoint.key] = waypoint
    this.refresh()
  }

  /* Private */
  Context.prototype.checkEmpty = function() {
    var horizontalEmpty = this.Adapter.isEmptyObject(this.waypoints.horizontal)
    var verticalEmpty = this.Adapter.isEmptyObject(this.waypoints.vertical)
    var isWindow = this.element == this.element.window
    if (horizontalEmpty && verticalEmpty && !isWindow) {
      this.adapter.off('.waypoints')
      delete contexts[this.key]
    }
  }

  /* Private */
  Context.prototype.createThrottledResizeHandler = function() {
    var self = this

    function resizeHandler() {
      self.handleResize()
      self.didResize = false
    }

    this.adapter.on('resize.waypoints', function() {
      if (!self.didResize) {
        self.didResize = true
        Waypoint.requestAnimationFrame(resizeHandler)
      }
    })
  }

  /* Private */
  Context.prototype.createThrottledScrollHandler = function() {
    var self = this
    function scrollHandler() {
      self.handleScroll()
      self.didScroll = false
    }

    this.adapter.on('scroll.waypoints', function() {
      if (!self.didScroll || Waypoint.isTouch) {
        self.didScroll = true
        Waypoint.requestAnimationFrame(scrollHandler)
      }
    })
  }

  /* Private */
  Context.prototype.handleResize = function() {
    Waypoint.Context.refreshAll()
  }

  /* Private */
  Context.prototype.handleScroll = function() {
    var triggeredGroups = {}
    var axes = {
      horizontal: {
        newScroll: this.adapter.scrollLeft(),
        oldScroll: this.oldScroll.x,
        forward: 'right',
        backward: 'left'
      },
      vertical: {
        newScroll: this.adapter.scrollTop(),
        oldScroll: this.oldScroll.y,
        forward: 'down',
        backward: 'up'
      }
    }

    for (var axisKey in axes) {
      var axis = axes[axisKey]
      var isForward = axis.newScroll > axis.oldScroll
      var direction = isForward ? axis.forward : axis.backward

      for (var waypointKey in this.waypoints[axisKey]) {
        var waypoint = this.waypoints[axisKey][waypointKey]
        if (waypoint.triggerPoint === null) {
          continue
        }
        var wasBeforeTriggerPoint = axis.oldScroll < waypoint.triggerPoint
        var nowAfterTriggerPoint = axis.newScroll >= waypoint.triggerPoint
        var crossedForward = wasBeforeTriggerPoint && nowAfterTriggerPoint
        var crossedBackward = !wasBeforeTriggerPoint && !nowAfterTriggerPoint
        if (crossedForward || crossedBackward) {
          waypoint.queueTrigger(direction)
          triggeredGroups[waypoint.group.id] = waypoint.group
        }
      }
    }

    for (var groupKey in triggeredGroups) {
      triggeredGroups[groupKey].flushTriggers()
    }

    this.oldScroll = {
      x: axes.horizontal.newScroll,
      y: axes.vertical.newScroll
    }
  }

  /* Private */
  Context.prototype.innerHeight = function() {
    /*eslint-disable eqeqeq */
    if (this.element == this.element.window) {
      return Waypoint.viewportHeight()
    }
    /*eslint-enable eqeqeq */
    return this.adapter.innerHeight()
  }

  /* Private */
  Context.prototype.remove = function(waypoint) {
    delete this.waypoints[waypoint.axis][waypoint.key]
    this.checkEmpty()
  }

  /* Private */
  Context.prototype.innerWidth = function() {
    /*eslint-disable eqeqeq */
    if (this.element == this.element.window) {
      return Waypoint.viewportWidth()
    }
    /*eslint-enable eqeqeq */
    return this.adapter.innerWidth()
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/context-destroy */
  Context.prototype.destroy = function() {
    var allWaypoints = []
    for (var axis in this.waypoints) {
      for (var waypointKey in this.waypoints[axis]) {
        allWaypoints.push(this.waypoints[axis][waypointKey])
      }
    }
    for (var i = 0, end = allWaypoints.length; i < end; i++) {
      allWaypoints[i].destroy()
    }
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/context-refresh */
  Context.prototype.refresh = function() {
    /*eslint-disable eqeqeq */
    var isWindow = this.element == this.element.window
    /*eslint-enable eqeqeq */
    var contextOffset = isWindow ? undefined : this.adapter.offset()
    var triggeredGroups = {}
    var axes

    this.handleScroll()
    axes = {
      horizontal: {
        contextOffset: isWindow ? 0 : contextOffset.left,
        contextScroll: isWindow ? 0 : this.oldScroll.x,
        contextDimension: this.innerWidth(),
        oldScroll: this.oldScroll.x,
        forward: 'right',
        backward: 'left',
        offsetProp: 'left'
      },
      vertical: {
        contextOffset: isWindow ? 0 : contextOffset.top,
        contextScroll: isWindow ? 0 : this.oldScroll.y,
        contextDimension: this.innerHeight(),
        oldScroll: this.oldScroll.y,
        forward: 'down',
        backward: 'up',
        offsetProp: 'top'
      }
    }

    for (var axisKey in axes) {
      var axis = axes[axisKey]
      for (var waypointKey in this.waypoints[axisKey]) {
        var waypoint = this.waypoints[axisKey][waypointKey]
        var adjustment = waypoint.options.offset
        var oldTriggerPoint = waypoint.triggerPoint
        var elementOffset = 0
        var freshWaypoint = oldTriggerPoint == null
        var contextModifier, wasBeforeScroll, nowAfterScroll
        var triggeredBackward, triggeredForward

        if (waypoint.element !== waypoint.element.window) {
          elementOffset = waypoint.adapter.offset()[axis.offsetProp]
        }

        if (typeof adjustment === 'function') {
          adjustment = adjustment.apply(waypoint)
        }
        else if (typeof adjustment === 'string') {
          adjustment = parseFloat(adjustment)
          if (waypoint.options.offset.indexOf('%') > - 1) {
            adjustment = Math.ceil(axis.contextDimension * adjustment / 100)
          }
        }

        contextModifier = axis.contextScroll - axis.contextOffset
        waypoint.triggerPoint = Math.floor(elementOffset + contextModifier - adjustment)
        wasBeforeScroll = oldTriggerPoint < axis.oldScroll
        nowAfterScroll = waypoint.triggerPoint >= axis.oldScroll
        triggeredBackward = wasBeforeScroll && nowAfterScroll
        triggeredForward = !wasBeforeScroll && !nowAfterScroll

        if (!freshWaypoint && triggeredBackward) {
          waypoint.queueTrigger(axis.backward)
          triggeredGroups[waypoint.group.id] = waypoint.group
        }
        else if (!freshWaypoint && triggeredForward) {
          waypoint.queueTrigger(axis.forward)
          triggeredGroups[waypoint.group.id] = waypoint.group
        }
        else if (freshWaypoint && axis.oldScroll >= waypoint.triggerPoint) {
          waypoint.queueTrigger(axis.forward)
          triggeredGroups[waypoint.group.id] = waypoint.group
        }
      }
    }

    Waypoint.requestAnimationFrame(function() {
      for (var groupKey in triggeredGroups) {
        triggeredGroups[groupKey].flushTriggers()
      }
    })

    return this
  }

  /* Private */
  Context.findOrCreateByElement = function(element) {
    return Context.findByElement(element) || new Context(element)
  }

  /* Private */
  Context.refreshAll = function() {
    for (var contextId in contexts) {
      contexts[contextId].refresh()
    }
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/context-find-by-element */
  Context.findByElement = function(element) {
    return contexts[element.waypointContextKey]
  }

  window.onload = function() {
    if (oldWindowLoad) {
      oldWindowLoad()
    }
    Context.refreshAll()
  }


  Waypoint.requestAnimationFrame = function(callback) {
    var requestFn = window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      requestAnimationFrameShim
    requestFn.call(window, callback)
  }
  Waypoint.Context = Context
}())
;(function() {
  'use strict'

  function byTriggerPoint(a, b) {
    return a.triggerPoint - b.triggerPoint
  }

  function byReverseTriggerPoint(a, b) {
    return b.triggerPoint - a.triggerPoint
  }

  var groups = {
    vertical: {},
    horizontal: {}
  }
  var Waypoint = window.Waypoint

  /* http://imakewebthings.com/waypoints/api/group */
  function Group(options) {
    this.name = options.name
    this.axis = options.axis
    this.id = this.name + '-' + this.axis
    this.waypoints = []
    this.clearTriggerQueues()
    groups[this.axis][this.name] = this
  }

  /* Private */
  Group.prototype.add = function(waypoint) {
    this.waypoints.push(waypoint)
  }

  /* Private */
  Group.prototype.clearTriggerQueues = function() {
    this.triggerQueues = {
      up: [],
      down: [],
      left: [],
      right: []
    }
  }

  /* Private */
  Group.prototype.flushTriggers = function() {
    for (var direction in this.triggerQueues) {
      var waypoints = this.triggerQueues[direction]
      var reverse = direction === 'up' || direction === 'left'
      waypoints.sort(reverse ? byReverseTriggerPoint : byTriggerPoint)
      for (var i = 0, end = waypoints.length; i < end; i += 1) {
        var waypoint = waypoints[i]
        if (waypoint.options.continuous || i === waypoints.length - 1) {
          waypoint.trigger([direction])
        }
      }
    }
    this.clearTriggerQueues()
  }

  /* Private */
  Group.prototype.next = function(waypoint) {
    this.waypoints.sort(byTriggerPoint)
    var index = Waypoint.Adapter.inArray(waypoint, this.waypoints)
    var isLast = index === this.waypoints.length - 1
    return isLast ? null : this.waypoints[index + 1]
  }

  /* Private */
  Group.prototype.previous = function(waypoint) {
    this.waypoints.sort(byTriggerPoint)
    var index = Waypoint.Adapter.inArray(waypoint, this.waypoints)
    return index ? this.waypoints[index - 1] : null
  }

  /* Private */
  Group.prototype.queueTrigger = function(waypoint, direction) {
    this.triggerQueues[direction].push(waypoint)
  }

  /* Private */
  Group.prototype.remove = function(waypoint) {
    var index = Waypoint.Adapter.inArray(waypoint, this.waypoints)
    if (index > -1) {
      this.waypoints.splice(index, 1)
    }
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/first */
  Group.prototype.first = function() {
    return this.waypoints[0]
  }

  /* Public */
  /* http://imakewebthings.com/waypoints/api/last */
  Group.prototype.last = function() {
    return this.waypoints[this.waypoints.length - 1]
  }

  /* Private */
  Group.findOrCreate = function(options) {
    return groups[options.axis][options.name] || new Group(options)
  }

  Waypoint.Group = Group
}())
;(function() {
  'use strict'

  var $ = window.jQuery
  var Waypoint = window.Waypoint

  function JQueryAdapter(element) {
    this.$element = $(element)
  }

  $.each([
    'innerHeight',
    'innerWidth',
    'off',
    'offset',
    'on',
    'outerHeight',
    'outerWidth',
    'scrollLeft',
    'scrollTop'
  ], function(i, method) {
    JQueryAdapter.prototype[method] = function() {
      var args = Array.prototype.slice.call(arguments)
      return this.$element[method].apply(this.$element, args)
    }
  })

  $.each([
    'extend',
    'inArray',
    'isEmptyObject'
  ], function(i, method) {
    JQueryAdapter[method] = $[method]
  })

  Waypoint.adapters.push({
    name: 'jquery',
    Adapter: JQueryAdapter
  })
  Waypoint.Adapter = JQueryAdapter
}())
;(function() {
  'use strict'

  var Waypoint = window.Waypoint

  function createExtension(framework) {
    return function() {
      var waypoints = []
      var overrides = arguments[0]

      if (framework.isFunction(arguments[0])) {
        overrides = framework.extend({}, arguments[1])
        overrides.handler = arguments[0]
      }

      this.each(function() {
        var options = framework.extend({}, overrides, {
          element: this
        })
        if (typeof options.context === 'string') {
          options.context = framework(this).closest(options.context)[0]
        }
        waypoints.push(new Waypoint(options))
      })

      return waypoints
    }
  }

  if (window.jQuery) {
    window.jQuery.fn.waypoint = createExtension(window.jQuery)
  }
  if (window.Zepto) {
    window.Zepto.fn.waypoint = createExtension(window.Zepto)
  }
}())
;
/*! Magnific Popup - v1.1.0 - 2016-02-20
* http://dimsemenov.com/plugins/magnific-popup/
* Copyright (c) 2016 Dmitry Semenov; */
;(function (factory) {
if (typeof define === 'function' && define.amd) {
 // AMD. Register as an anonymous module.
 define(['jquery'], factory);
 } else if (typeof exports === 'object') {
 // Node/CommonJS
 factory(require('jquery'));
 } else {
 // Browser globals
 factory(window.jQuery || window.Zepto);
 }
 }(function($) {

/*>>core*/
/**
 *
 * Magnific Popup Core JS file
 *
 */


/**
 * Private static constants
 */
var CLOSE_EVENT = 'Close',
	BEFORE_CLOSE_EVENT = 'BeforeClose',
	AFTER_CLOSE_EVENT = 'AfterClose',
	BEFORE_APPEND_EVENT = 'BeforeAppend',
	MARKUP_PARSE_EVENT = 'MarkupParse',
	OPEN_EVENT = 'Open',
	CHANGE_EVENT = 'Change',
	NS = 'mfp',
	EVENT_NS = '.' + NS,
	READY_CLASS = 'mfp-ready',
	REMOVING_CLASS = 'mfp-removing',
	PREVENT_CLOSE_CLASS = 'mfp-prevent-close';


/**
 * Private vars
 */
/*jshint -W079 */
var mfp, // As we have only one instance of MagnificPopup object, we define it locally to not to use 'this'
	MagnificPopup = function(){},
	_isJQ = !!(window.jQuery),
	_prevStatus,
	_window = $(window),
	_document,
	_prevContentType,
	_wrapClasses,
	_currPopupType;


/**
 * Private functions
 */
var _mfpOn = function(name, f) {
		mfp.ev.on(NS + name + EVENT_NS, f);
	},
	_getEl = function(className, appendTo, html, raw) {
		var el = document.createElement('div');
		el.className = 'mfp-'+className;
		if(html) {
			el.innerHTML = html;
		}
		if(!raw) {
			el = $(el);
			if(appendTo) {
				el.appendTo(appendTo);
			}
		} else if(appendTo) {
			appendTo.appendChild(el);
		}
		return el;
	},
	_mfpTrigger = function(e, data) {
		mfp.ev.triggerHandler(NS + e, data);

		if(mfp.st.callbacks) {
			// converts "mfpEventName" to "eventName" callback and triggers it if it's present
			e = e.charAt(0).toLowerCase() + e.slice(1);
			if(mfp.st.callbacks[e]) {
				mfp.st.callbacks[e].apply(mfp, $.isArray(data) ? data : [data]);
			}
		}
	},
	_getCloseBtn = function(type) {
		if(type !== _currPopupType || !mfp.currTemplate.closeBtn) {
			mfp.currTemplate.closeBtn = $( mfp.st.closeMarkup.replace('%title%', mfp.st.tClose ) );
			_currPopupType = type;
		}
		return mfp.currTemplate.closeBtn;
	},
	// Initialize Magnific Popup only when called at least once
	_checkInstance = function() {
		if(!$.magnificPopup.instance) {
			/*jshint -W020 */
			mfp = new MagnificPopup();
			mfp.init();
			$.magnificPopup.instance = mfp;
		}
	},
	// CSS transition detection, http://stackoverflow.com/questions/7264899/detect-css-transitions-using-javascript-and-without-modernizr
	supportsTransitions = function() {
		var s = document.createElement('p').style, // 's' for style. better to create an element if body yet to exist
			v = ['ms','O','Moz','Webkit']; // 'v' for vendor

		if( s['transition'] !== undefined ) {
			return true;
		}

		while( v.length ) {
			if( v.pop() + 'Transition' in s ) {
				return true;
			}
		}

		return false;
	};



/**
 * Public functions
 */
MagnificPopup.prototype = {

	constructor: MagnificPopup,

	/**
	 * Initializes Magnific Popup plugin.
	 * This function is triggered only once when $.fn.magnificPopup or $.magnificPopup is executed
	 */
	init: function() {
		var appVersion = navigator.appVersion;
		mfp.isLowIE = mfp.isIE8 = document.all && !document.addEventListener;
		mfp.isAndroid = (/android/gi).test(appVersion);
		mfp.isIOS = (/iphone|ipad|ipod/gi).test(appVersion);
		mfp.supportsTransition = supportsTransitions();

		// We disable fixed positioned lightbox on devices that don't handle it nicely.
		// If you know a better way of detecting this - let me know.
		mfp.probablyMobile = (mfp.isAndroid || mfp.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent) );
		_document = $(document);

		mfp.popupsCache = {};
	},

	/**
	 * Opens popup
	 * @param  data [description]
	 */
	open: function(data) {

		var i;

		if(data.isObj === false) {
			// convert jQuery collection to array to avoid conflicts later
			mfp.items = data.items.toArray();

			mfp.index = 0;
			var items = data.items,
				item;
			for(i = 0; i < items.length; i++) {
				item = items[i];
				if(item.parsed) {
					item = item.el[0];
				}
				if(item === data.el[0]) {
					mfp.index = i;
					break;
				}
			}
		} else {
			mfp.items = $.isArray(data.items) ? data.items : [data.items];
			mfp.index = data.index || 0;
		}

		// if popup is already opened - we just update the content
		if(mfp.isOpen) {
			mfp.updateItemHTML();
			return;
		}

		mfp.types = [];
		_wrapClasses = '';
		if(data.mainEl && data.mainEl.length) {
			mfp.ev = data.mainEl.eq(0);
		} else {
			mfp.ev = _document;
		}

		if(data.key) {
			if(!mfp.popupsCache[data.key]) {
				mfp.popupsCache[data.key] = {};
			}
			mfp.currTemplate = mfp.popupsCache[data.key];
		} else {
			mfp.currTemplate = {};
		}



		mfp.st = $.extend(true, {}, $.magnificPopup.defaults, data );
		mfp.fixedContentPos = mfp.st.fixedContentPos === 'auto' ? !mfp.probablyMobile : mfp.st.fixedContentPos;

		if(mfp.st.modal) {
			mfp.st.closeOnContentClick = false;
			mfp.st.closeOnBgClick = false;
			mfp.st.showCloseBtn = false;
			mfp.st.enableEscapeKey = false;
		}


		// Building markup
		// main containers are created only once
		if(!mfp.bgOverlay) {

			// Dark overlay
			mfp.bgOverlay = _getEl('bg').on('click'+EVENT_NS, function() {
				mfp.close();
			});

			mfp.wrap = _getEl('wrap').attr('tabindex', -1).on('click'+EVENT_NS, function(e) {
				if(mfp._checkIfClose(e.target)) {
					mfp.close();
				}
			});

			mfp.container = _getEl('container', mfp.wrap);
		}

		mfp.contentContainer = _getEl('content');
		if(mfp.st.preloader) {
			mfp.preloader = _getEl('preloader', mfp.container, mfp.st.tLoading);
		}


		// Initializing modules
		var modules = $.magnificPopup.modules;
		for(i = 0; i < modules.length; i++) {
			var n = modules[i];
			n = n.charAt(0).toUpperCase() + n.slice(1);
			mfp['init'+n].call(mfp);
		}
		_mfpTrigger('BeforeOpen');


		if(mfp.st.showCloseBtn) {
			// Close button
			if(!mfp.st.closeBtnInside) {
				mfp.wrap.append( _getCloseBtn() );
			} else {
				_mfpOn(MARKUP_PARSE_EVENT, function(e, template, values, item) {
					values.close_replaceWith = _getCloseBtn(item.type);
				});
				_wrapClasses += ' mfp-close-btn-in';
			}
		}

		if(mfp.st.alignTop) {
			_wrapClasses += ' mfp-align-top';
		}



		if(mfp.fixedContentPos) {
			mfp.wrap.css({
				overflow: mfp.st.overflowY,
				overflowX: 'hidden',
				overflowY: mfp.st.overflowY
			});
		} else {
			mfp.wrap.css({
				top: _window.scrollTop(),
				position: 'absolute'
			});
		}
		if( mfp.st.fixedBgPos === false || (mfp.st.fixedBgPos === 'auto' && !mfp.fixedContentPos) ) {
			mfp.bgOverlay.css({
				height: _document.height(),
				position: 'absolute'
			});
		}



		if(mfp.st.enableEscapeKey) {
			// Close on ESC key
			_document.on('keyup' + EVENT_NS, function(e) {
				if(e.keyCode === 27) {
					mfp.close();
				}
			});
		}

		_window.on('resize' + EVENT_NS, function() {
			mfp.updateSize();
		});


		if(!mfp.st.closeOnContentClick) {
			_wrapClasses += ' mfp-auto-cursor';
		}

		if(_wrapClasses)
			mfp.wrap.addClass(_wrapClasses);


		// this triggers recalculation of layout, so we get it once to not to trigger twice
		var windowHeight = mfp.wH = _window.height();


		var windowStyles = {};

		if( mfp.fixedContentPos ) {
            if(mfp._hasScrollBar(windowHeight)){
                var s = mfp._getScrollbarSize();
                if(s) {
                    windowStyles.marginRight = s;
                }
            }
        }

		if(mfp.fixedContentPos) {
			if(!mfp.isIE7) {
				windowStyles.overflow = 'hidden';
			} else {
				// ie7 double-scroll bug
				$('body, html').css('overflow', 'hidden');
			}
		}



		var classesToadd = mfp.st.mainClass;
		if(mfp.isIE7) {
			classesToadd += ' mfp-ie7';
		}
		if(classesToadd) {
			mfp._addClassToMFP( classesToadd );
		}

		// add content
		mfp.updateItemHTML();

		_mfpTrigger('BuildControls');

		// remove scrollbar, add margin e.t.c
		$('html').css(windowStyles);

		// add everything to DOM
		mfp.bgOverlay.add(mfp.wrap).prependTo( mfp.st.prependTo || $(document.body) );

		// Save last focused element
		mfp._lastFocusedEl = document.activeElement;

		// Wait for next cycle to allow CSS transition
		setTimeout(function() {

			if(mfp.content) {
				mfp._addClassToMFP(READY_CLASS);
				mfp._setFocus();
			} else {
				// if content is not defined (not loaded e.t.c) we add class only for BG
				mfp.bgOverlay.addClass(READY_CLASS);
			}

			// Trap the focus in popup
			_document.on('focusin' + EVENT_NS, mfp._onFocusIn);

		}, 16);

		mfp.isOpen = true;
		mfp.updateSize(windowHeight);
		_mfpTrigger(OPEN_EVENT);

		return data;
	},

	/**
	 * Closes the popup
	 */
	close: function() {
		if(!mfp.isOpen) return;
		_mfpTrigger(BEFORE_CLOSE_EVENT);

		mfp.isOpen = false;
		// for CSS3 animation
		if(mfp.st.removalDelay && !mfp.isLowIE && mfp.supportsTransition )  {
			mfp._addClassToMFP(REMOVING_CLASS);
			setTimeout(function() {
				mfp._close();
			}, mfp.st.removalDelay);
		} else {
			mfp._close();
		}
	},

	/**
	 * Helper for close() function
	 */
	_close: function() {
		_mfpTrigger(CLOSE_EVENT);

		var classesToRemove = REMOVING_CLASS + ' ' + READY_CLASS + ' ';

		mfp.bgOverlay.detach();
		mfp.wrap.detach();
		mfp.container.empty();

		if(mfp.st.mainClass) {
			classesToRemove += mfp.st.mainClass + ' ';
		}

		mfp._removeClassFromMFP(classesToRemove);

		if(mfp.fixedContentPos) {
			var windowStyles = {marginRight: ''};
			if(mfp.isIE7) {
				$('body, html').css('overflow', '');
			} else {
				windowStyles.overflow = '';
			}
			$('html').css(windowStyles);
		}

		_document.off('keyup' + EVENT_NS + ' focusin' + EVENT_NS);
		mfp.ev.off(EVENT_NS);

		// clean up DOM elements that aren't removed
		mfp.wrap.attr('class', 'mfp-wrap').removeAttr('style');
		mfp.bgOverlay.attr('class', 'mfp-bg');
		mfp.container.attr('class', 'mfp-container');

		// remove close button from target element
		if(mfp.st.showCloseBtn &&
		(!mfp.st.closeBtnInside || mfp.currTemplate[mfp.currItem.type] === true)) {
			if(mfp.currTemplate.closeBtn)
				mfp.currTemplate.closeBtn.detach();
		}


		if(mfp.st.autoFocusLast && mfp._lastFocusedEl) {
			$(mfp._lastFocusedEl).focus(); // put tab focus back
		}
		mfp.currItem = null;
		mfp.content = null;
		mfp.currTemplate = null;
		mfp.prevHeight = 0;

		_mfpTrigger(AFTER_CLOSE_EVENT);
	},

	updateSize: function(winHeight) {

		if(mfp.isIOS) {
			// fixes iOS nav bars https://github.com/dimsemenov/Magnific-Popup/issues/2
			var zoomLevel = document.documentElement.clientWidth / window.innerWidth;
			var height = window.innerHeight * zoomLevel;
			mfp.wrap.css('height', height);
			mfp.wH = height;
		} else {
			mfp.wH = winHeight || _window.height();
		}
		// Fixes #84: popup incorrectly positioned with position:relative on body
		if(!mfp.fixedContentPos) {
			mfp.wrap.css('height', mfp.wH);
		}

		_mfpTrigger('Resize');

	},

	/**
	 * Set content of popup based on current index
	 */
	updateItemHTML: function() {
		var item = mfp.items[mfp.index];

		// Detach and perform modifications
		mfp.contentContainer.detach();

		if(mfp.content)
			mfp.content.detach();

		if(!item.parsed) {
			item = mfp.parseEl( mfp.index );
		}

		var type = item.type;

		_mfpTrigger('BeforeChange', [mfp.currItem ? mfp.currItem.type : '', type]);
		// BeforeChange event works like so:
		// _mfpOn('BeforeChange', function(e, prevType, newType) { });

		mfp.currItem = item;

		if(!mfp.currTemplate[type]) {
			var markup = mfp.st[type] ? mfp.st[type].markup : false;

			// allows to modify markup
			_mfpTrigger('FirstMarkupParse', markup);

			if(markup) {
				mfp.currTemplate[type] = $(markup);
			} else {
				// if there is no markup found we just define that template is parsed
				mfp.currTemplate[type] = true;
			}
		}

		if(_prevContentType && _prevContentType !== item.type) {
			mfp.container.removeClass('mfp-'+_prevContentType+'-holder');
		}

		var newContent = mfp['get' + type.charAt(0).toUpperCase() + type.slice(1)](item, mfp.currTemplate[type]);
		mfp.appendContent(newContent, type);

		item.preloaded = true;

		_mfpTrigger(CHANGE_EVENT, item);
		_prevContentType = item.type;

		// Append container back after its content changed
		mfp.container.prepend(mfp.contentContainer);

		_mfpTrigger('AfterChange');
	},


	/**
	 * Set HTML content of popup
	 */
	appendContent: function(newContent, type) {
		mfp.content = newContent;

		if(newContent) {
			if(mfp.st.showCloseBtn && mfp.st.closeBtnInside &&
				mfp.currTemplate[type] === true) {
				// if there is no markup, we just append close button element inside
				if(!mfp.content.find('.mfp-close').length) {
					mfp.content.append(_getCloseBtn());
				}
			} else {
				mfp.content = newContent;
			}
		} else {
			mfp.content = '';
		}

		_mfpTrigger(BEFORE_APPEND_EVENT);
		mfp.container.addClass('mfp-'+type+'-holder');

		mfp.contentContainer.append(mfp.content);
	},


	/**
	 * Creates Magnific Popup data object based on given data
	 * @param  {int} index Index of item to parse
	 */
	parseEl: function(index) {
		var item = mfp.items[index],
			type;

		if(item.tagName) {
			item = { el: $(item) };
		} else {
			type = item.type;
			item = { data: item, src: item.src };
		}

		if(item.el) {
			var types = mfp.types;

			// check for 'mfp-TYPE' class
			for(var i = 0; i < types.length; i++) {
				if( item.el.hasClass('mfp-'+types[i]) ) {
					type = types[i];
					break;
				}
			}

			item.src = item.el.attr('data-mfp-src');
			if(!item.src) {
				item.src = item.el.attr('href');
			}
		}

		item.type = type || mfp.st.type || 'inline';
		item.index = index;
		item.parsed = true;
		mfp.items[index] = item;
		_mfpTrigger('ElementParse', item);

		return mfp.items[index];
	},


	/**
	 * Initializes single popup or a group of popups
	 */
	addGroup: function(el, options) {
		var eHandler = function(e) {
			e.mfpEl = this;
			mfp._openClick(e, el, options);
		};

		if(!options) {
			options = {};
		}

		var eName = 'click.magnificPopup';
		options.mainEl = el;

		if(options.items) {
			options.isObj = true;
			el.off(eName).on(eName, eHandler);
		} else {
			options.isObj = false;
			if(options.delegate) {
				el.off(eName).on(eName, options.delegate , eHandler);
			} else {
				options.items = el;
				el.off(eName).on(eName, eHandler);
			}
		}
	},
	_openClick: function(e, el, options) {
		var midClick = options.midClick !== undefined ? options.midClick : $.magnificPopup.defaults.midClick;


		if(!midClick && ( e.which === 2 || e.ctrlKey || e.metaKey || e.altKey || e.shiftKey ) ) {
			return;
		}

		var disableOn = options.disableOn !== undefined ? options.disableOn : $.magnificPopup.defaults.disableOn;

		if(disableOn) {
			if($.isFunction(disableOn)) {
				if( !disableOn.call(mfp) ) {
					return true;
				}
			} else { // else it's number
				if( _window.width() < disableOn ) {
					return true;
				}
			}
		}

		if(e.type) {
			e.preventDefault();

			// This will prevent popup from closing if element is inside and popup is already opened
			if(mfp.isOpen) {
				e.stopPropagation();
			}
		}

		options.el = $(e.mfpEl);
		if(options.delegate) {
			options.items = el.find(options.delegate);
		}
		mfp.open(options);
	},


	/**
	 * Updates text on preloader
	 */
	updateStatus: function(status, text) {

		if(mfp.preloader) {
			if(_prevStatus !== status) {
				mfp.container.removeClass('mfp-s-'+_prevStatus);
			}

			if(!text && status === 'loading') {
				text = mfp.st.tLoading;
			}

			var data = {
				status: status,
				text: text
			};
			// allows to modify status
			_mfpTrigger('UpdateStatus', data);

			status = data.status;
			text = data.text;

			mfp.preloader.html(text);

			mfp.preloader.find('a').on('click', function(e) {
				e.stopImmediatePropagation();
			});

			mfp.container.addClass('mfp-s-'+status);
			_prevStatus = status;
		}
	},


	/*
		"Private" helpers that aren't private at all
	 */
	// Check to close popup or not
	// "target" is an element that was clicked
	_checkIfClose: function(target) {

		if($(target).hasClass(PREVENT_CLOSE_CLASS)) {
			return;
		}

		var closeOnContent = mfp.st.closeOnContentClick;
		var closeOnBg = mfp.st.closeOnBgClick;

		if(closeOnContent && closeOnBg) {
			return true;
		} else {

			// We close the popup if click is on close button or on preloader. Or if there is no content.
			if(!mfp.content || $(target).hasClass('mfp-close') || (mfp.preloader && target === mfp.preloader[0]) ) {
				return true;
			}

			// if click is outside the content
			if(  (target !== mfp.content[0] && !$.contains(mfp.content[0], target))  ) {
				if(closeOnBg) {
					// last check, if the clicked element is in DOM, (in case it's removed onclick)
					if( $.contains(document, target) ) {
						return true;
					}
				}
			} else if(closeOnContent) {
				return true;
			}

		}
		return false;
	},
	_addClassToMFP: function(cName) {
		mfp.bgOverlay.addClass(cName);
		mfp.wrap.addClass(cName);
	},
	_removeClassFromMFP: function(cName) {
		this.bgOverlay.removeClass(cName);
		mfp.wrap.removeClass(cName);
	},
	_hasScrollBar: function(winHeight) {
		return (  (mfp.isIE7 ? _document.height() : document.body.scrollHeight) > (winHeight || _window.height()) );
	},
	_setFocus: function() {
		(mfp.st.focus ? mfp.content.find(mfp.st.focus).eq(0) : mfp.wrap).focus();
	},
	_onFocusIn: function(e) {
		if( e.target !== mfp.wrap[0] && !$.contains(mfp.wrap[0], e.target) ) {
			mfp._setFocus();
			return false;
		}
	},
	_parseMarkup: function(template, values, item) {
		var arr;
		if(item.data) {
			values = $.extend(item.data, values);
		}
		_mfpTrigger(MARKUP_PARSE_EVENT, [template, values, item] );

		$.each(values, function(key, value) {
			if(value === undefined || value === false) {
				return true;
			}
			arr = key.split('_');
			if(arr.length > 1) {
				var el = template.find(EVENT_NS + '-'+arr[0]);

				if(el.length > 0) {
					var attr = arr[1];
					if(attr === 'replaceWith') {
						if(el[0] !== value[0]) {
							el.replaceWith(value);
						}
					} else if(attr === 'img') {
						if(el.is('img')) {
							el.attr('src', value);
						} else {
							el.replaceWith( $('<img>').attr('src', value).attr('class', el.attr('class')) );
						}
					} else {
						el.attr(arr[1], value);
					}
				}

			} else {
				template.find(EVENT_NS + '-'+key).html(value);
			}
		});
	},

	_getScrollbarSize: function() {
		// thx David
		if(mfp.scrollbarSize === undefined) {
			var scrollDiv = document.createElement("div");
			scrollDiv.style.cssText = 'width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;';
			document.body.appendChild(scrollDiv);
			mfp.scrollbarSize = scrollDiv.offsetWidth - scrollDiv.clientWidth;
			document.body.removeChild(scrollDiv);
		}
		return mfp.scrollbarSize;
	}

}; /* MagnificPopup core prototype end */




/**
 * Public static functions
 */
$.magnificPopup = {
	instance: null,
	proto: MagnificPopup.prototype,
	modules: [],

	open: function(options, index) {
		_checkInstance();

		if(!options) {
			options = {};
		} else {
			options = $.extend(true, {}, options);
		}

		options.isObj = true;
		options.index = index || 0;
		return this.instance.open(options);
	},

	close: function() {
		return $.magnificPopup.instance && $.magnificPopup.instance.close();
	},

	registerModule: function(name, module) {
		if(module.options) {
			$.magnificPopup.defaults[name] = module.options;
		}
		$.extend(this.proto, module.proto);
		this.modules.push(name);
	},

	defaults: {

		// Info about options is in docs:
		// http://dimsemenov.com/plugins/magnific-popup/documentation.html#options

		disableOn: 0,

		key: null,

		midClick: false,

		mainClass: '',

		preloader: true,

		focus: '', // CSS selector of input to focus after popup is opened

		closeOnContentClick: false,

		closeOnBgClick: true,

		closeBtnInside: true,

		showCloseBtn: true,

		enableEscapeKey: true,

		modal: false,

		alignTop: false,

		removalDelay: 0,

		prependTo: null,

		fixedContentPos: 'auto',

		fixedBgPos: 'auto',

		overflowY: 'auto',

		closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',

		tClose: 'Close (Esc)',

		tLoading: 'Loading...',

		autoFocusLast: true

	}
};



$.fn.magnificPopup = function(options) {
	_checkInstance();

	var jqEl = $(this);

	// We call some API method of first param is a string
	if (typeof options === "string" ) {

		if(options === 'open') {
			var items,
				itemOpts = _isJQ ? jqEl.data('magnificPopup') : jqEl[0].magnificPopup,
				index = parseInt(arguments[1], 10) || 0;

			if(itemOpts.items) {
				items = itemOpts.items[index];
			} else {
				items = jqEl;
				if(itemOpts.delegate) {
					items = items.find(itemOpts.delegate);
				}
				items = items.eq( index );
			}
			mfp._openClick({mfpEl:items}, jqEl, itemOpts);
		} else {
			if(mfp.isOpen)
				mfp[options].apply(mfp, Array.prototype.slice.call(arguments, 1));
		}

	} else {
		// clone options obj
		options = $.extend(true, {}, options);

		/*
		 * As Zepto doesn't support .data() method for objects
		 * and it works only in normal browsers
		 * we assign "options" object directly to the DOM element. FTW!
		 */
		if(_isJQ) {
			jqEl.data('magnificPopup', options);
		} else {
			jqEl[0].magnificPopup = options;
		}

		mfp.addGroup(jqEl, options);

	}
	return jqEl;
};

/*>>core*/







/*>>zoom*/
var hasMozTransform,
	getHasMozTransform = function() {
		if(hasMozTransform === undefined) {
			hasMozTransform = document.createElement('p').style.MozTransform !== undefined;
		}
		return hasMozTransform;
	};

$.magnificPopup.registerModule('zoom', {

	options: {
		enabled: false,
		easing: 'ease-in-out',
		duration: 300,
		opener: function(element) {
			return element.is('img') ? element : element.find('img');
		}
	},

	proto: {

		initZoom: function() {
			var zoomSt = mfp.st.zoom,
				ns = '.zoom',
				image;

			if(!zoomSt.enabled || !mfp.supportsTransition) {
				return;
			}

			var duration = zoomSt.duration,
				getElToAnimate = function(image) {
					var newImg = image.clone().removeAttr('style').removeAttr('class').addClass('mfp-animated-image'),
						transition = 'all '+(zoomSt.duration/1000)+'s ' + zoomSt.easing,
						cssObj = {
							position: 'fixed',
							zIndex: 9999,
							left: 0,
							top: 0,
							'-webkit-backface-visibility': 'hidden'
						},
						t = 'transition';

					cssObj['-webkit-'+t] = cssObj['-moz-'+t] = cssObj['-o-'+t] = cssObj[t] = transition;

					newImg.css(cssObj);
					return newImg;
				},
				showMainContent = function() {
					mfp.content.css('visibility', 'visible');
				},
				openTimeout,
				animatedImg;

			_mfpOn('BuildControls'+ns, function() {
				if(mfp._allowZoom()) {

					clearTimeout(openTimeout);
					mfp.content.css('visibility', 'hidden');

					// Basically, all code below does is clones existing image, puts in on top of the current one and animated it

					image = mfp._getItemToZoom();

					if(!image) {
						showMainContent();
						return;
					}

					animatedImg = getElToAnimate(image);

					animatedImg.css( mfp._getOffset() );

					mfp.wrap.append(animatedImg);

					openTimeout = setTimeout(function() {
						animatedImg.css( mfp._getOffset( true ) );
						openTimeout = setTimeout(function() {

							showMainContent();

							setTimeout(function() {
								animatedImg.remove();
								image = animatedImg = null;
								_mfpTrigger('ZoomAnimationEnded');
							}, 16); // avoid blink when switching images

						}, duration); // this timeout equals animation duration

					}, 16); // by adding this timeout we avoid short glitch at the beginning of animation


					// Lots of timeouts...
				}
			});
			_mfpOn(BEFORE_CLOSE_EVENT+ns, function() {
				if(mfp._allowZoom()) {

					clearTimeout(openTimeout);

					mfp.st.removalDelay = duration;

					if(!image) {
						image = mfp._getItemToZoom();
						if(!image) {
							return;
						}
						animatedImg = getElToAnimate(image);
					}

					animatedImg.css( mfp._getOffset(true) );
					mfp.wrap.append(animatedImg);
					mfp.content.css('visibility', 'hidden');

					setTimeout(function() {
						animatedImg.css( mfp._getOffset() );
					}, 16);
				}

			});

			_mfpOn(CLOSE_EVENT+ns, function() {
				if(mfp._allowZoom()) {
					showMainContent();
					if(animatedImg) {
						animatedImg.remove();
					}
					image = null;
				}
			});
		},

		_allowZoom: function() {
			return mfp.currItem.type === 'image';
		},

		_getItemToZoom: function() {
			if(mfp.currItem.hasSize) {
				return mfp.currItem.img;
			} else {
				return false;
			}
		},

		// Get element postion relative to viewport
		_getOffset: function(isLarge) {
			var el;
			if(isLarge) {
				el = mfp.currItem.img;
			} else {
				el = mfp.st.zoom.opener(mfp.currItem.el || mfp.currItem);
			}

			var offset = el.offset();
			var paddingTop = parseInt(el.css('padding-top'),10);
			var paddingBottom = parseInt(el.css('padding-bottom'),10);
			offset.top -= ( $(window).scrollTop() - paddingTop );


			/*

			Animating left + top + width/height looks glitchy in Firefox, but perfect in Chrome. And vice-versa.

			 */
			var obj = {
				width: el.width(),
				// fix Zepto height+padding issue
				height: (_isJQ ? el.innerHeight() : el[0].offsetHeight) - paddingBottom - paddingTop
			};

			// I hate to do this, but there is no another option
			if( getHasMozTransform() ) {
				obj['-moz-transform'] = obj['transform'] = 'translate(' + offset.left + 'px,' + offset.top + 'px)';
			} else {
				obj.left = offset.left;
				obj.top = offset.top;
			}
			return obj;
		}

	}
});



/*>>zoom*/

/*>>iframe*/

var IFRAME_NS = 'iframe',
	_emptyPage = '//about:blank',

	_fixIframeBugs = function(isShowing) {
		if(mfp.currTemplate[IFRAME_NS]) {
			var el = mfp.currTemplate[IFRAME_NS].find('iframe');
			if(el.length) {
				// reset src after the popup is closed to avoid "video keeps playing after popup is closed" bug
				if(!isShowing) {
					el[0].src = _emptyPage;
				}

				// IE8 black screen bug fix
				if(mfp.isIE8) {
					el.css('display', isShowing ? 'block' : 'none');
				}
			}
		}
	};

$.magnificPopup.registerModule(IFRAME_NS, {

	options: {
		markup: '<div class="mfp-iframe-scaler">'+
					'<div class="mfp-close"></div>'+
					'<iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe>'+
				'</div>',

		srcAction: 'iframe_src',

		// we don't care and support only one default type of URL by default
		patterns: {
			youtube: {
				index: 'youtube.com',
				id: 'v=',
				src: '//www.youtube.com/embed/%id%?autoplay=1'
			},
			vimeo: {
				index: 'vimeo.com/',
				id: '/',
				src: '//player.vimeo.com/video/%id%?autoplay=1'
			},
			gmaps: {
				index: '//maps.google.',
				src: '%id%&output=embed'
			}
		}
	},

	proto: {
		initIframe: function() {
			mfp.types.push(IFRAME_NS);

			_mfpOn('BeforeChange', function(e, prevType, newType) {
				if(prevType !== newType) {
					if(prevType === IFRAME_NS) {
						_fixIframeBugs(); // iframe if removed
					} else if(newType === IFRAME_NS) {
						_fixIframeBugs(true); // iframe is showing
					}
				}// else {
					// iframe source is switched, don't do anything
				//}
			});

			_mfpOn(CLOSE_EVENT + '.' + IFRAME_NS, function() {
				_fixIframeBugs();
			});
		},

		getIframe: function(item, template) {
			var embedSrc = item.src;
			var iframeSt = mfp.st.iframe;

			$.each(iframeSt.patterns, function() {
				if(embedSrc.indexOf( this.index ) > -1) {
					if(this.id) {
						if(typeof this.id === 'string') {
							embedSrc = embedSrc.substr(embedSrc.lastIndexOf(this.id)+this.id.length, embedSrc.length);
						} else {
							embedSrc = this.id.call( this, embedSrc );
						}
					}
					embedSrc = this.src.replace('%id%', embedSrc );
					return false; // break;
				}
			});

			var dataObj = {};
			if(iframeSt.srcAction) {
				dataObj[iframeSt.srcAction] = embedSrc;
			}
			mfp._parseMarkup(template, dataObj, item);

			mfp.updateStatus('ready');

			return template;
		}
	}
});



/*>>iframe*/




 _checkInstance(); }));

/*! Select2 4.1.0-rc.0 | https://github.com/select2/select2/blob/master/LICENSE.md */
!function(n){"function"==typeof define&&define.amd?define(["jquery"],n):"object"==typeof module&&module.exports?module.exports=function(e,t){return void 0===t&&(t="undefined"!=typeof window?require("jquery"):require("jquery")(e)),n(t),t}:n(jQuery)}(function(t){var e,n,s,p,r,o,h,f,g,m,y,v,i,a,_,s=((u=t&&t.fn&&t.fn.select2&&t.fn.select2.amd?t.fn.select2.amd:u)&&u.requirejs||(u?n=u:u={},g={},m={},y={},v={},i=Object.prototype.hasOwnProperty,a=[].slice,_=/\.js$/,h=function(e,t){var n,s,i=c(e),r=i[0],t=t[1];return e=i[1],r&&(n=x(r=l(r,t))),r?e=n&&n.normalize?n.normalize(e,(s=t,function(e){return l(e,s)})):l(e,t):(r=(i=c(e=l(e,t)))[0],e=i[1],r&&(n=x(r))),{f:r?r+"!"+e:e,n:e,pr:r,p:n}},f={require:function(e){return w(e)},exports:function(e){var t=g[e];return void 0!==t?t:g[e]={}},module:function(e){return{id:e,uri:"",exports:g[e],config:(t=e,function(){return y&&y.config&&y.config[t]||{}})};var t}},r=function(e,t,n,s){var i,r,o,a,l,c=[],u=typeof n,d=A(s=s||e);if("undefined"==u||"function"==u){for(t=!t.length&&n.length?["require","exports","module"]:t,a=0;a<t.length;a+=1)if("require"===(r=(o=h(t[a],d)).f))c[a]=f.require(e);else if("exports"===r)c[a]=f.exports(e),l=!0;else if("module"===r)i=c[a]=f.module(e);else if(b(g,r)||b(m,r)||b(v,r))c[a]=x(r);else{if(!o.p)throw new Error(e+" missing "+r);o.p.load(o.n,w(s,!0),function(t){return function(e){g[t]=e}}(r),{}),c[a]=g[r]}u=n?n.apply(g[e],c):void 0,e&&(i&&i.exports!==p&&i.exports!==g[e]?g[e]=i.exports:u===p&&l||(g[e]=u))}else e&&(g[e]=n)},e=n=o=function(e,t,n,s,i){if("string"==typeof e)return f[e]?f[e](t):x(h(e,A(t)).f);if(!e.splice){if((y=e).deps&&o(y.deps,y.callback),!t)return;t.splice?(e=t,t=n,n=null):e=p}return t=t||function(){},"function"==typeof n&&(n=s,s=i),s?r(p,e,t,n):setTimeout(function(){r(p,e,t,n)},4),o},o.config=function(e){return o(e)},e._defined=g,(s=function(e,t,n){if("string"!=typeof e)throw new Error("See almond README: incorrect module build, no module name");t.splice||(n=t,t=[]),b(g,e)||b(m,e)||(m[e]=[e,t,n])}).amd={jQuery:!0},u.requirejs=e,u.require=n,u.define=s),u.define("almond",function(){}),u.define("jquery",[],function(){var e=t||$;return null==e&&console&&console.error&&console.error("Select2: An instance of jQuery or a jQuery-compatible library was not found. Make sure that you are including jQuery before Select2 on your web page."),e}),u.define("select2/utils",["jquery"],function(r){var s={};function c(e){var t,n=e.prototype,s=[];for(t in n)"function"==typeof n[t]&&"constructor"!==t&&s.push(t);return s}s.Extend=function(e,t){var n,s={}.hasOwnProperty;function i(){this.constructor=e}for(n in t)s.call(t,n)&&(e[n]=t[n]);return i.prototype=t.prototype,e.prototype=new i,e.__super__=t.prototype,e},s.Decorate=function(s,i){var e=c(i),t=c(s);function r(){var e=Array.prototype.unshift,t=i.prototype.constructor.length,n=s.prototype.constructor;0<t&&(e.call(arguments,s.prototype.constructor),n=i.prototype.constructor),n.apply(this,arguments)}i.displayName=s.displayName,r.prototype=new function(){this.constructor=r};for(var n=0;n<t.length;n++){var o=t[n];r.prototype[o]=s.prototype[o]}for(var a=0;a<e.length;a++){var l=e[a];r.prototype[l]=function(e){var t=function(){};e in r.prototype&&(t=r.prototype[e]);var n=i.prototype[e];return function(){return Array.prototype.unshift.call(arguments,t),n.apply(this,arguments)}}(l)}return r};function e(){this.listeners={}}e.prototype.on=function(e,t){this.listeners=this.listeners||{},e in this.listeners?this.listeners[e].push(t):this.listeners[e]=[t]},e.prototype.trigger=function(e){var t=Array.prototype.slice,n=t.call(arguments,1);this.listeners=this.listeners||{},0===(n=null==n?[]:n).length&&n.push({}),(n[0]._type=e)in this.listeners&&this.invoke(this.listeners[e],t.call(arguments,1)),"*"in this.listeners&&this.invoke(this.listeners["*"],arguments)},e.prototype.invoke=function(e,t){for(var n=0,s=e.length;n<s;n++)e[n].apply(this,t)},s.Observable=e,s.generateChars=function(e){for(var t="",n=0;n<e;n++)t+=Math.floor(36*Math.random()).toString(36);return t},s.bind=function(e,t){return function(){e.apply(t,arguments)}},s._convertData=function(e){for(var t in e){var n=t.split("-"),s=e;if(1!==n.length){for(var i=0;i<n.length;i++){var r=n[i];(r=r.substring(0,1).toLowerCase()+r.substring(1))in s||(s[r]={}),i==n.length-1&&(s[r]=e[t]),s=s[r]}delete e[t]}}return e},s.hasScroll=function(e,t){var n=r(t),s=t.style.overflowX,i=t.style.overflowY;return(s!==i||"hidden"!==i&&"visible"!==i)&&("scroll"===s||"scroll"===i||(n.innerHeight()<t.scrollHeight||n.innerWidth()<t.scrollWidth))},s.escapeMarkup=function(e){var t={"\\":"&#92;","&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#47;"};return"string"!=typeof e?e:String(e).replace(/[&<>"'\/\\]/g,function(e){return t[e]})},s.__cache={};var n=0;return s.GetUniqueElementId=function(e){var t=e.getAttribute("data-select2-id");return null!=t||(t=e.id?"select2-data-"+e.id:"select2-data-"+(++n).toString()+"-"+s.generateChars(4),e.setAttribute("data-select2-id",t)),t},s.StoreData=function(e,t,n){e=s.GetUniqueElementId(e);s.__cache[e]||(s.__cache[e]={}),s.__cache[e][t]=n},s.GetData=function(e,t){var n=s.GetUniqueElementId(e);return t?s.__cache[n]&&null!=s.__cache[n][t]?s.__cache[n][t]:r(e).data(t):s.__cache[n]},s.RemoveData=function(e){var t=s.GetUniqueElementId(e);null!=s.__cache[t]&&delete s.__cache[t],e.removeAttribute("data-select2-id")},s.copyNonInternalCssClasses=function(e,t){var n=(n=e.getAttribute("class").trim().split(/\s+/)).filter(function(e){return 0===e.indexOf("select2-")}),t=(t=t.getAttribute("class").trim().split(/\s+/)).filter(function(e){return 0!==e.indexOf("select2-")}),t=n.concat(t);e.setAttribute("class",t.join(" "))},s}),u.define("select2/results",["jquery","./utils"],function(d,p){function s(e,t,n){this.$element=e,this.data=n,this.options=t,s.__super__.constructor.call(this)}return p.Extend(s,p.Observable),s.prototype.render=function(){var e=d('<ul class="select2-results__options" role="listbox"></ul>');return this.options.get("multiple")&&e.attr("aria-multiselectable","true"),this.$results=e},s.prototype.clear=function(){this.$results.empty()},s.prototype.displayMessage=function(e){var t=this.options.get("escapeMarkup");this.clear(),this.hideLoading();var n=d('<li role="alert" aria-live="assertive" class="select2-results__option"></li>'),s=this.options.get("translations").get(e.message);n.append(t(s(e.args))),n[0].className+=" select2-results__message",this.$results.append(n)},s.prototype.hideMessages=function(){this.$results.find(".select2-results__message").remove()},s.prototype.append=function(e){this.hideLoading();var t=[];if(null!=e.results&&0!==e.results.length){e.results=this.sort(e.results);for(var n=0;n<e.results.length;n++){var s=e.results[n],s=this.option(s);t.push(s)}this.$results.append(t)}else 0===this.$results.children().length&&this.trigger("results:message",{message:"noResults"})},s.prototype.position=function(e,t){t.find(".select2-results").append(e)},s.prototype.sort=function(e){return this.options.get("sorter")(e)},s.prototype.highlightFirstItem=function(){var e=this.$results.find(".select2-results__option--selectable"),t=e.filter(".select2-results__option--selected");(0<t.length?t:e).first().trigger("mouseenter"),this.ensureHighlightVisible()},s.prototype.setClasses=function(){var t=this;this.data.current(function(e){var s=e.map(function(e){return e.id.toString()});t.$results.find(".select2-results__option--selectable").each(function(){var e=d(this),t=p.GetData(this,"data"),n=""+t.id;null!=t.element&&t.element.selected||null==t.element&&-1<s.indexOf(n)?(this.classList.add("select2-results__option--selected"),e.attr("aria-selected","true")):(this.classList.remove("select2-results__option--selected"),e.attr("aria-selected","false"))})})},s.prototype.showLoading=function(e){this.hideLoading();e={disabled:!0,loading:!0,text:this.options.get("translations").get("searching")(e)},e=this.option(e);e.className+=" loading-results",this.$results.prepend(e)},s.prototype.hideLoading=function(){this.$results.find(".loading-results").remove()},s.prototype.option=function(e){var t=document.createElement("li");t.classList.add("select2-results__option"),t.classList.add("select2-results__option--selectable");var n,s={role:"option"},i=window.Element.prototype.matches||window.Element.prototype.msMatchesSelector||window.Element.prototype.webkitMatchesSelector;for(n in(null!=e.element&&i.call(e.element,":disabled")||null==e.element&&e.disabled)&&(s["aria-disabled"]="true",t.classList.remove("select2-results__option--selectable"),t.classList.add("select2-results__option--disabled")),null==e.id&&t.classList.remove("select2-results__option--selectable"),null!=e._resultId&&(t.id=e._resultId),e.title&&(t.title=e.title),e.children&&(s.role="group",s["aria-label"]=e.text,t.classList.remove("select2-results__option--selectable"),t.classList.add("select2-results__option--group")),s){var r=s[n];t.setAttribute(n,r)}if(e.children){var o=d(t),a=document.createElement("strong");a.className="select2-results__group",this.template(e,a);for(var l=[],c=0;c<e.children.length;c++){var u=e.children[c],u=this.option(u);l.push(u)}i=d("<ul></ul>",{class:"select2-results__options select2-results__options--nested",role:"none"});i.append(l),o.append(a),o.append(i)}else this.template(e,t);return p.StoreData(t,"data",e),t},s.prototype.bind=function(t,e){var i=this,n=t.id+"-results";this.$results.attr("id",n),t.on("results:all",function(e){i.clear(),i.append(e.data),t.isOpen()&&(i.setClasses(),i.highlightFirstItem())}),t.on("results:append",function(e){i.append(e.data),t.isOpen()&&i.setClasses()}),t.on("query",function(e){i.hideMessages(),i.showLoading(e)}),t.on("select",function(){t.isOpen()&&(i.setClasses(),i.options.get("scrollAfterSelect")&&i.highlightFirstItem())}),t.on("unselect",function(){t.isOpen()&&(i.setClasses(),i.options.get("scrollAfterSelect")&&i.highlightFirstItem())}),t.on("open",function(){i.$results.attr("aria-expanded","true"),i.$results.attr("aria-hidden","false"),i.setClasses(),i.ensureHighlightVisible()}),t.on("close",function(){i.$results.attr("aria-expanded","false"),i.$results.attr("aria-hidden","true"),i.$results.removeAttr("aria-activedescendant")}),t.on("results:toggle",function(){var e=i.getHighlightedResults();0!==e.length&&e.trigger("mouseup")}),t.on("results:select",function(){var e,t=i.getHighlightedResults();0!==t.length&&(e=p.GetData(t[0],"data"),t.hasClass("select2-results__option--selected")?i.trigger("close",{}):i.trigger("select",{data:e}))}),t.on("results:previous",function(){var e,t=i.getHighlightedResults(),n=i.$results.find(".select2-results__option--selectable"),s=n.index(t);s<=0||(e=s-1,0===t.length&&(e=0),(s=n.eq(e)).trigger("mouseenter"),t=i.$results.offset().top,n=s.offset().top,s=i.$results.scrollTop()+(n-t),0===e?i.$results.scrollTop(0):n-t<0&&i.$results.scrollTop(s))}),t.on("results:next",function(){var e,t=i.getHighlightedResults(),n=i.$results.find(".select2-results__option--selectable"),s=n.index(t)+1;s>=n.length||((e=n.eq(s)).trigger("mouseenter"),t=i.$results.offset().top+i.$results.outerHeight(!1),n=e.offset().top+e.outerHeight(!1),e=i.$results.scrollTop()+n-t,0===s?i.$results.scrollTop(0):t<n&&i.$results.scrollTop(e))}),t.on("results:focus",function(e){e.element[0].classList.add("select2-results__option--highlighted"),e.element[0].setAttribute("aria-selected","true")}),t.on("results:message",function(e){i.displayMessage(e)}),d.fn.mousewheel&&this.$results.on("mousewheel",function(e){var t=i.$results.scrollTop(),n=i.$results.get(0).scrollHeight-t+e.deltaY,t=0<e.deltaY&&t-e.deltaY<=0,n=e.deltaY<0&&n<=i.$results.height();t?(i.$results.scrollTop(0),e.preventDefault(),e.stopPropagation()):n&&(i.$results.scrollTop(i.$results.get(0).scrollHeight-i.$results.height()),e.preventDefault(),e.stopPropagation())}),this.$results.on("mouseup",".select2-results__option--selectable",function(e){var t=d(this),n=p.GetData(this,"data");t.hasClass("select2-results__option--selected")?i.options.get("multiple")?i.trigger("unselect",{originalEvent:e,data:n}):i.trigger("close",{}):i.trigger("select",{originalEvent:e,data:n})}),this.$results.on("mouseenter",".select2-results__option--selectable",function(e){var t=p.GetData(this,"data");i.getHighlightedResults().removeClass("select2-results__option--highlighted").attr("aria-selected","false"),i.trigger("results:focus",{data:t,element:d(this)})})},s.prototype.getHighlightedResults=function(){return this.$results.find(".select2-results__option--highlighted")},s.prototype.destroy=function(){this.$results.remove()},s.prototype.ensureHighlightVisible=function(){var e,t,n,s,i=this.getHighlightedResults();0!==i.length&&(e=this.$results.find(".select2-results__option--selectable").index(i),s=this.$results.offset().top,t=i.offset().top,n=this.$results.scrollTop()+(t-s),s=t-s,n-=2*i.outerHeight(!1),e<=2?this.$results.scrollTop(0):(s>this.$results.outerHeight()||s<0)&&this.$results.scrollTop(n))},s.prototype.template=function(e,t){var n=this.options.get("templateResult"),s=this.options.get("escapeMarkup"),e=n(e,t);null==e?t.style.display="none":"string"==typeof e?t.innerHTML=s(e):d(t).append(e)},s}),u.define("select2/keys",[],function(){return{BACKSPACE:8,TAB:9,ENTER:13,SHIFT:16,CTRL:17,ALT:18,ESC:27,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT:37,UP:38,RIGHT:39,DOWN:40,DELETE:46}}),u.define("select2/selection/base",["jquery","../utils","../keys"],function(n,s,i){function r(e,t){this.$element=e,this.options=t,r.__super__.constructor.call(this)}return s.Extend(r,s.Observable),r.prototype.render=function(){var e=n('<span class="select2-selection" role="combobox"  aria-haspopup="true" aria-expanded="false"></span>');return this._tabindex=0,null!=s.GetData(this.$element[0],"old-tabindex")?this._tabindex=s.GetData(this.$element[0],"old-tabindex"):null!=this.$element.attr("tabindex")&&(this._tabindex=this.$element.attr("tabindex")),e.attr("title",this.$element.attr("title")),e.attr("tabindex",this._tabindex),e.attr("aria-disabled","false"),this.$selection=e},r.prototype.bind=function(e,t){var n=this,s=e.id+"-results";this.container=e,this.$selection.on("focus",function(e){n.trigger("focus",e)}),this.$selection.on("blur",function(e){n._handleBlur(e)}),this.$selection.on("keydown",function(e){n.trigger("keypress",e),e.which===i.SPACE&&e.preventDefault()}),e.on("results:focus",function(e){n.$selection.attr("aria-activedescendant",e.data._resultId)}),e.on("selection:update",function(e){n.update(e.data)}),e.on("open",function(){n.$selection.attr("aria-expanded","true"),n.$selection.attr("aria-owns",s),n._attachCloseHandler(e)}),e.on("close",function(){n.$selection.attr("aria-expanded","false"),n.$selection.removeAttr("aria-activedescendant"),n.$selection.removeAttr("aria-owns"),n.$selection.trigger("focus"),n._detachCloseHandler(e)}),e.on("enable",function(){n.$selection.attr("tabindex",n._tabindex),n.$selection.attr("aria-disabled","false")}),e.on("disable",function(){n.$selection.attr("tabindex","-1"),n.$selection.attr("aria-disabled","true")})},r.prototype._handleBlur=function(e){var t=this;window.setTimeout(function(){document.activeElement==t.$selection[0]||n.contains(t.$selection[0],document.activeElement)||t.trigger("blur",e)},1)},r.prototype._attachCloseHandler=function(e){n(document.body).on("mousedown.select2."+e.id,function(e){var t=n(e.target).closest(".select2");n(".select2.select2-container--open").each(function(){this!=t[0]&&s.GetData(this,"element").select2("close")})})},r.prototype._detachCloseHandler=function(e){n(document.body).off("mousedown.select2."+e.id)},r.prototype.position=function(e,t){t.find(".selection").append(e)},r.prototype.destroy=function(){this._detachCloseHandler(this.container)},r.prototype.update=function(e){throw new Error("The `update` method must be defined in child classes.")},r.prototype.isEnabled=function(){return!this.isDisabled()},r.prototype.isDisabled=function(){return this.options.get("disabled")},r}),u.define("select2/selection/single",["jquery","./base","../utils","../keys"],function(e,t,n,s){function i(){i.__super__.constructor.apply(this,arguments)}return n.Extend(i,t),i.prototype.render=function(){var e=i.__super__.render.call(this);return e[0].classList.add("select2-selection--single"),e.html('<span class="select2-selection__rendered"></span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span>'),e},i.prototype.bind=function(t,e){var n=this;i.__super__.bind.apply(this,arguments);var s=t.id+"-container";this.$selection.find(".select2-selection__rendered").attr("id",s).attr("role","textbox").attr("aria-readonly","true"),this.$selection.attr("aria-labelledby",s),this.$selection.attr("aria-controls",s),this.$selection.on("mousedown",function(e){1===e.which&&n.trigger("toggle",{originalEvent:e})}),this.$selection.on("focus",function(e){}),this.$selection.on("blur",function(e){}),t.on("focus",function(e){t.isOpen()||n.$selection.trigger("focus")})},i.prototype.clear=function(){var e=this.$selection.find(".select2-selection__rendered");e.empty(),e.removeAttr("title")},i.prototype.display=function(e,t){var n=this.options.get("templateSelection");return this.options.get("escapeMarkup")(n(e,t))},i.prototype.selectionContainer=function(){return e("<span></span>")},i.prototype.update=function(e){var t,n;0!==e.length?(n=e[0],t=this.$selection.find(".select2-selection__rendered"),e=this.display(n,t),t.empty().append(e),(n=n.title||n.text)?t.attr("title",n):t.removeAttr("title")):this.clear()},i}),u.define("select2/selection/multiple",["jquery","./base","../utils"],function(i,e,c){function r(e,t){r.__super__.constructor.apply(this,arguments)}return c.Extend(r,e),r.prototype.render=function(){var e=r.__super__.render.call(this);return e[0].classList.add("select2-selection--multiple"),e.html('<ul class="select2-selection__rendered"></ul>'),e},r.prototype.bind=function(e,t){var n=this;r.__super__.bind.apply(this,arguments);var s=e.id+"-container";this.$selection.find(".select2-selection__rendered").attr("id",s),this.$selection.on("click",function(e){n.trigger("toggle",{originalEvent:e})}),this.$selection.on("click",".select2-selection__choice__remove",function(e){var t;n.isDisabled()||(t=i(this).parent(),t=c.GetData(t[0],"data"),n.trigger("unselect",{originalEvent:e,data:t}))}),this.$selection.on("keydown",".select2-selection__choice__remove",function(e){n.isDisabled()||e.stopPropagation()})},r.prototype.clear=function(){var e=this.$selection.find(".select2-selection__rendered");e.empty(),e.removeAttr("title")},r.prototype.display=function(e,t){var n=this.options.get("templateSelection");return this.options.get("escapeMarkup")(n(e,t))},r.prototype.selectionContainer=function(){return i('<li class="select2-selection__choice"><button type="button" class="select2-selection__choice__remove" tabindex="-1"><span aria-hidden="true">&times;</span></button><span class="select2-selection__choice__display"></span></li>')},r.prototype.update=function(e){if(this.clear(),0!==e.length){for(var t=[],n=this.$selection.find(".select2-selection__rendered").attr("id")+"-choice-",s=0;s<e.length;s++){var i=e[s],r=this.selectionContainer(),o=this.display(i,r),a=n+c.generateChars(4)+"-";i.id?a+=i.id:a+=c.generateChars(4),r.find(".select2-selection__choice__display").append(o).attr("id",a);var l=i.title||i.text;l&&r.attr("title",l);o=this.options.get("translations").get("removeItem"),l=r.find(".select2-selection__choice__remove");l.attr("title",o()),l.attr("aria-label",o()),l.attr("aria-describedby",a),c.StoreData(r[0],"data",i),t.push(r)}this.$selection.find(".select2-selection__rendered").append(t)}},r}),u.define("select2/selection/placeholder",[],function(){function e(e,t,n){this.placeholder=this.normalizePlaceholder(n.get("placeholder")),e.call(this,t,n)}return e.prototype.normalizePlaceholder=function(e,t){return t="string"==typeof t?{id:"",text:t}:t},e.prototype.createPlaceholder=function(e,t){var n=this.selectionContainer();n.html(this.display(t)),n[0].classList.add("select2-selection__placeholder"),n[0].classList.remove("select2-selection__choice");t=t.title||t.text||n.text();return this.$selection.find(".select2-selection__rendered").attr("title",t),n},e.prototype.update=function(e,t){var n=1==t.length&&t[0].id!=this.placeholder.id;if(1<t.length||n)return e.call(this,t);this.clear();t=this.createPlaceholder(this.placeholder);this.$selection.find(".select2-selection__rendered").append(t)},e}),u.define("select2/selection/allowClear",["jquery","../keys","../utils"],function(i,s,a){function e(){}return e.prototype.bind=function(e,t,n){var s=this;e.call(this,t,n),null==this.placeholder&&this.options.get("debug")&&window.console&&console.error&&console.error("Select2: The `allowClear` option should be used in combination with the `placeholder` option."),this.$selection.on("mousedown",".select2-selection__clear",function(e){s._handleClear(e)}),t.on("keypress",function(e){s._handleKeyboardClear(e,t)})},e.prototype._handleClear=function(e,t){if(!this.isDisabled()){var n=this.$selection.find(".select2-selection__clear");if(0!==n.length){t.stopPropagation();var s=a.GetData(n[0],"data"),i=this.$element.val();this.$element.val(this.placeholder.id);var r={data:s};if(this.trigger("clear",r),r.prevented)this.$element.val(i);else{for(var o=0;o<s.length;o++)if(r={data:s[o]},this.trigger("unselect",r),r.prevented)return void this.$element.val(i);this.$element.trigger("input").trigger("change"),this.trigger("toggle",{})}}}},e.prototype._handleKeyboardClear=function(e,t,n){n.isOpen()||t.which!=s.DELETE&&t.which!=s.BACKSPACE||this._handleClear(t)},e.prototype.update=function(e,t){var n,s;e.call(this,t),this.$selection.find(".select2-selection__clear").remove(),this.$selection[0].classList.remove("select2-selection--clearable"),0<this.$selection.find(".select2-selection__placeholder").length||0===t.length||(n=this.$selection.find(".select2-selection__rendered").attr("id"),s=this.options.get("translations").get("removeAllItems"),(e=i('<button type="button" class="select2-selection__clear" tabindex="-1"><span aria-hidden="true">&times;</span></button>')).attr("title",s()),e.attr("aria-label",s()),e.attr("aria-describedby",n),a.StoreData(e[0],"data",t),this.$selection.prepend(e),this.$selection[0].classList.add("select2-selection--clearable"))},e}),u.define("select2/selection/search",["jquery","../utils","../keys"],function(s,a,l){function e(e,t,n){e.call(this,t,n)}return e.prototype.render=function(e){var t=this.options.get("translations").get("search"),n=s('<span class="select2-search select2-search--inline"><textarea class="select2-search__field" type="search" tabindex="-1" autocorrect="off" autocapitalize="none" spellcheck="false" role="searchbox" aria-autocomplete="list" ></textarea></span>');this.$searchContainer=n,this.$search=n.find("textarea"),this.$search.prop("autocomplete",this.options.get("autocomplete")),this.$search.attr("aria-label",t());e=e.call(this);return this._transferTabIndex(),e.append(this.$searchContainer),e},e.prototype.bind=function(e,t,n){var s=this,i=t.id+"-results",r=t.id+"-container";e.call(this,t,n),s.$search.attr("aria-describedby",r),t.on("open",function(){s.$search.attr("aria-controls",i),s.$search.trigger("focus")}),t.on("close",function(){s.$search.val(""),s.resizeSearch(),s.$search.removeAttr("aria-controls"),s.$search.removeAttr("aria-activedescendant"),s.$search.trigger("focus")}),t.on("enable",function(){s.$search.prop("disabled",!1),s._transferTabIndex()}),t.on("disable",function(){s.$search.prop("disabled",!0)}),t.on("focus",function(e){s.$search.trigger("focus")}),t.on("results:focus",function(e){e.data._resultId?s.$search.attr("aria-activedescendant",e.data._resultId):s.$search.removeAttr("aria-activedescendant")}),this.$selection.on("focusin",".select2-search--inline",function(e){s.trigger("focus",e)}),this.$selection.on("focusout",".select2-search--inline",function(e){s._handleBlur(e)}),this.$selection.on("keydown",".select2-search--inline",function(e){var t;e.stopPropagation(),s.trigger("keypress",e),s._keyUpPrevented=e.isDefaultPrevented(),e.which!==l.BACKSPACE||""!==s.$search.val()||0<(t=s.$selection.find(".select2-selection__choice").last()).length&&(t=a.GetData(t[0],"data"),s.searchRemoveChoice(t),e.preventDefault())}),this.$selection.on("click",".select2-search--inline",function(e){s.$search.val()&&e.stopPropagation()});var t=document.documentMode,o=t&&t<=11;this.$selection.on("input.searchcheck",".select2-search--inline",function(e){o?s.$selection.off("input.search input.searchcheck"):s.$selection.off("keyup.search")}),this.$selection.on("keyup.search input.search",".select2-search--inline",function(e){var t;o&&"input"===e.type?s.$selection.off("input.search input.searchcheck"):(t=e.which)!=l.SHIFT&&t!=l.CTRL&&t!=l.ALT&&t!=l.TAB&&s.handleSearch(e)})},e.prototype._transferTabIndex=function(e){this.$search.attr("tabindex",this.$selection.attr("tabindex")),this.$selection.attr("tabindex","-1")},e.prototype.createPlaceholder=function(e,t){this.$search.attr("placeholder",t.text)},e.prototype.update=function(e,t){var n=this.$search[0]==document.activeElement;this.$search.attr("placeholder",""),e.call(this,t),this.resizeSearch(),n&&this.$search.trigger("focus")},e.prototype.handleSearch=function(){var e;this.resizeSearch(),this._keyUpPrevented||(e=this.$search.val(),this.trigger("query",{term:e})),this._keyUpPrevented=!1},e.prototype.searchRemoveChoice=function(e,t){this.trigger("unselect",{data:t}),this.$search.val(t.text),this.handleSearch()},e.prototype.resizeSearch=function(){this.$search.css("width","25px");var e="100%";""===this.$search.attr("placeholder")&&(e=.75*(this.$search.val().length+1)+"em"),this.$search.css("width",e)},e}),u.define("select2/selection/selectionCss",["../utils"],function(n){function e(){}return e.prototype.render=function(e){var t=e.call(this),e=this.options.get("selectionCssClass")||"";return-1!==e.indexOf(":all:")&&(e=e.replace(":all:",""),n.copyNonInternalCssClasses(t[0],this.$element[0])),t.addClass(e),t},e}),u.define("select2/selection/eventRelay",["jquery"],function(o){function e(){}return e.prototype.bind=function(e,t,n){var s=this,i=["open","opening","close","closing","select","selecting","unselect","unselecting","clear","clearing"],r=["opening","closing","selecting","unselecting","clearing"];e.call(this,t,n),t.on("*",function(e,t){var n;-1!==i.indexOf(e)&&(t=t||{},n=o.Event("select2:"+e,{params:t}),s.$element.trigger(n),-1!==r.indexOf(e)&&(t.prevented=n.isDefaultPrevented()))})},e}),u.define("select2/translation",["jquery","require"],function(t,n){function s(e){this.dict=e||{}}return s.prototype.all=function(){return this.dict},s.prototype.get=function(e){return this.dict[e]},s.prototype.extend=function(e){this.dict=t.extend({},e.all(),this.dict)},s._cache={},s.loadPath=function(e){var t;return e in s._cache||(t=n(e),s._cache[e]=t),new s(s._cache[e])},s}),u.define("select2/diacritics",[],function(){return{"Ⓐ":"A","Ａ":"A","À":"A","Á":"A","Â":"A","Ầ":"A","Ấ":"A","Ẫ":"A","Ẩ":"A","Ã":"A","Ā":"A","Ă":"A","Ằ":"A","Ắ":"A","Ẵ":"A","Ẳ":"A","Ȧ":"A","Ǡ":"A","Ä":"A","Ǟ":"A","Ả":"A","Å":"A","Ǻ":"A","Ǎ":"A","Ȁ":"A","Ȃ":"A","Ạ":"A","Ậ":"A","Ặ":"A","Ḁ":"A","Ą":"A","Ⱥ":"A","Ɐ":"A","Ꜳ":"AA","Æ":"AE","Ǽ":"AE","Ǣ":"AE","Ꜵ":"AO","Ꜷ":"AU","Ꜹ":"AV","Ꜻ":"AV","Ꜽ":"AY","Ⓑ":"B","Ｂ":"B","Ḃ":"B","Ḅ":"B","Ḇ":"B","Ƀ":"B","Ƃ":"B","Ɓ":"B","Ⓒ":"C","Ｃ":"C","Ć":"C","Ĉ":"C","Ċ":"C","Č":"C","Ç":"C","Ḉ":"C","Ƈ":"C","Ȼ":"C","Ꜿ":"C","Ⓓ":"D","Ｄ":"D","Ḋ":"D","Ď":"D","Ḍ":"D","Ḑ":"D","Ḓ":"D","Ḏ":"D","Đ":"D","Ƌ":"D","Ɗ":"D","Ɖ":"D","Ꝺ":"D","Ǳ":"DZ","Ǆ":"DZ","ǲ":"Dz","ǅ":"Dz","Ⓔ":"E","Ｅ":"E","È":"E","É":"E","Ê":"E","Ề":"E","Ế":"E","Ễ":"E","Ể":"E","Ẽ":"E","Ē":"E","Ḕ":"E","Ḗ":"E","Ĕ":"E","Ė":"E","Ë":"E","Ẻ":"E","Ě":"E","Ȅ":"E","Ȇ":"E","Ẹ":"E","Ệ":"E","Ȩ":"E","Ḝ":"E","Ę":"E","Ḙ":"E","Ḛ":"E","Ɛ":"E","Ǝ":"E","Ⓕ":"F","Ｆ":"F","Ḟ":"F","Ƒ":"F","Ꝼ":"F","Ⓖ":"G","Ｇ":"G","Ǵ":"G","Ĝ":"G","Ḡ":"G","Ğ":"G","Ġ":"G","Ǧ":"G","Ģ":"G","Ǥ":"G","Ɠ":"G","Ꞡ":"G","Ᵹ":"G","Ꝿ":"G","Ⓗ":"H","Ｈ":"H","Ĥ":"H","Ḣ":"H","Ḧ":"H","Ȟ":"H","Ḥ":"H","Ḩ":"H","Ḫ":"H","Ħ":"H","Ⱨ":"H","Ⱶ":"H","Ɥ":"H","Ⓘ":"I","Ｉ":"I","Ì":"I","Í":"I","Î":"I","Ĩ":"I","Ī":"I","Ĭ":"I","İ":"I","Ï":"I","Ḯ":"I","Ỉ":"I","Ǐ":"I","Ȉ":"I","Ȋ":"I","Ị":"I","Į":"I","Ḭ":"I","Ɨ":"I","Ⓙ":"J","Ｊ":"J","Ĵ":"J","Ɉ":"J","Ⓚ":"K","Ｋ":"K","Ḱ":"K","Ǩ":"K","Ḳ":"K","Ķ":"K","Ḵ":"K","Ƙ":"K","Ⱪ":"K","Ꝁ":"K","Ꝃ":"K","Ꝅ":"K","Ꞣ":"K","Ⓛ":"L","Ｌ":"L","Ŀ":"L","Ĺ":"L","Ľ":"L","Ḷ":"L","Ḹ":"L","Ļ":"L","Ḽ":"L","Ḻ":"L","Ł":"L","Ƚ":"L","Ɫ":"L","Ⱡ":"L","Ꝉ":"L","Ꝇ":"L","Ꞁ":"L","Ǉ":"LJ","ǈ":"Lj","Ⓜ":"M","Ｍ":"M","Ḿ":"M","Ṁ":"M","Ṃ":"M","Ɱ":"M","Ɯ":"M","Ⓝ":"N","Ｎ":"N","Ǹ":"N","Ń":"N","Ñ":"N","Ṅ":"N","Ň":"N","Ṇ":"N","Ņ":"N","Ṋ":"N","Ṉ":"N","Ƞ":"N","Ɲ":"N","Ꞑ":"N","Ꞥ":"N","Ǌ":"NJ","ǋ":"Nj","Ⓞ":"O","Ｏ":"O","Ò":"O","Ó":"O","Ô":"O","Ồ":"O","Ố":"O","Ỗ":"O","Ổ":"O","Õ":"O","Ṍ":"O","Ȭ":"O","Ṏ":"O","Ō":"O","Ṑ":"O","Ṓ":"O","Ŏ":"O","Ȯ":"O","Ȱ":"O","Ö":"O","Ȫ":"O","Ỏ":"O","Ő":"O","Ǒ":"O","Ȍ":"O","Ȏ":"O","Ơ":"O","Ờ":"O","Ớ":"O","Ỡ":"O","Ở":"O","Ợ":"O","Ọ":"O","Ộ":"O","Ǫ":"O","Ǭ":"O","Ø":"O","Ǿ":"O","Ɔ":"O","Ɵ":"O","Ꝋ":"O","Ꝍ":"O","Œ":"OE","Ƣ":"OI","Ꝏ":"OO","Ȣ":"OU","Ⓟ":"P","Ｐ":"P","Ṕ":"P","Ṗ":"P","Ƥ":"P","Ᵽ":"P","Ꝑ":"P","Ꝓ":"P","Ꝕ":"P","Ⓠ":"Q","Ｑ":"Q","Ꝗ":"Q","Ꝙ":"Q","Ɋ":"Q","Ⓡ":"R","Ｒ":"R","Ŕ":"R","Ṙ":"R","Ř":"R","Ȑ":"R","Ȓ":"R","Ṛ":"R","Ṝ":"R","Ŗ":"R","Ṟ":"R","Ɍ":"R","Ɽ":"R","Ꝛ":"R","Ꞧ":"R","Ꞃ":"R","Ⓢ":"S","Ｓ":"S","ẞ":"S","Ś":"S","Ṥ":"S","Ŝ":"S","Ṡ":"S","Š":"S","Ṧ":"S","Ṣ":"S","Ṩ":"S","Ș":"S","Ş":"S","Ȿ":"S","Ꞩ":"S","Ꞅ":"S","Ⓣ":"T","Ｔ":"T","Ṫ":"T","Ť":"T","Ṭ":"T","Ț":"T","Ţ":"T","Ṱ":"T","Ṯ":"T","Ŧ":"T","Ƭ":"T","Ʈ":"T","Ⱦ":"T","Ꞇ":"T","Ꜩ":"TZ","Ⓤ":"U","Ｕ":"U","Ù":"U","Ú":"U","Û":"U","Ũ":"U","Ṹ":"U","Ū":"U","Ṻ":"U","Ŭ":"U","Ü":"U","Ǜ":"U","Ǘ":"U","Ǖ":"U","Ǚ":"U","Ủ":"U","Ů":"U","Ű":"U","Ǔ":"U","Ȕ":"U","Ȗ":"U","Ư":"U","Ừ":"U","Ứ":"U","Ữ":"U","Ử":"U","Ự":"U","Ụ":"U","Ṳ":"U","Ų":"U","Ṷ":"U","Ṵ":"U","Ʉ":"U","Ⓥ":"V","Ｖ":"V","Ṽ":"V","Ṿ":"V","Ʋ":"V","Ꝟ":"V","Ʌ":"V","Ꝡ":"VY","Ⓦ":"W","Ｗ":"W","Ẁ":"W","Ẃ":"W","Ŵ":"W","Ẇ":"W","Ẅ":"W","Ẉ":"W","Ⱳ":"W","Ⓧ":"X","Ｘ":"X","Ẋ":"X","Ẍ":"X","Ⓨ":"Y","Ｙ":"Y","Ỳ":"Y","Ý":"Y","Ŷ":"Y","Ỹ":"Y","Ȳ":"Y","Ẏ":"Y","Ÿ":"Y","Ỷ":"Y","Ỵ":"Y","Ƴ":"Y","Ɏ":"Y","Ỿ":"Y","Ⓩ":"Z","Ｚ":"Z","Ź":"Z","Ẑ":"Z","Ż":"Z","Ž":"Z","Ẓ":"Z","Ẕ":"Z","Ƶ":"Z","Ȥ":"Z","Ɀ":"Z","Ⱬ":"Z","Ꝣ":"Z","ⓐ":"a","ａ":"a","ẚ":"a","à":"a","á":"a","â":"a","ầ":"a","ấ":"a","ẫ":"a","ẩ":"a","ã":"a","ā":"a","ă":"a","ằ":"a","ắ":"a","ẵ":"a","ẳ":"a","ȧ":"a","ǡ":"a","ä":"a","ǟ":"a","ả":"a","å":"a","ǻ":"a","ǎ":"a","ȁ":"a","ȃ":"a","ạ":"a","ậ":"a","ặ":"a","ḁ":"a","ą":"a","ⱥ":"a","ɐ":"a","ꜳ":"aa","æ":"ae","ǽ":"ae","ǣ":"ae","ꜵ":"ao","ꜷ":"au","ꜹ":"av","ꜻ":"av","ꜽ":"ay","ⓑ":"b","ｂ":"b","ḃ":"b","ḅ":"b","ḇ":"b","ƀ":"b","ƃ":"b","ɓ":"b","ⓒ":"c","ｃ":"c","ć":"c","ĉ":"c","ċ":"c","č":"c","ç":"c","ḉ":"c","ƈ":"c","ȼ":"c","ꜿ":"c","ↄ":"c","ⓓ":"d","ｄ":"d","ḋ":"d","ď":"d","ḍ":"d","ḑ":"d","ḓ":"d","ḏ":"d","đ":"d","ƌ":"d","ɖ":"d","ɗ":"d","ꝺ":"d","ǳ":"dz","ǆ":"dz","ⓔ":"e","ｅ":"e","è":"e","é":"e","ê":"e","ề":"e","ế":"e","ễ":"e","ể":"e","ẽ":"e","ē":"e","ḕ":"e","ḗ":"e","ĕ":"e","ė":"e","ë":"e","ẻ":"e","ě":"e","ȅ":"e","ȇ":"e","ẹ":"e","ệ":"e","ȩ":"e","ḝ":"e","ę":"e","ḙ":"e","ḛ":"e","ɇ":"e","ɛ":"e","ǝ":"e","ⓕ":"f","ｆ":"f","ḟ":"f","ƒ":"f","ꝼ":"f","ⓖ":"g","ｇ":"g","ǵ":"g","ĝ":"g","ḡ":"g","ğ":"g","ġ":"g","ǧ":"g","ģ":"g","ǥ":"g","ɠ":"g","ꞡ":"g","ᵹ":"g","ꝿ":"g","ⓗ":"h","ｈ":"h","ĥ":"h","ḣ":"h","ḧ":"h","ȟ":"h","ḥ":"h","ḩ":"h","ḫ":"h","ẖ":"h","ħ":"h","ⱨ":"h","ⱶ":"h","ɥ":"h","ƕ":"hv","ⓘ":"i","ｉ":"i","ì":"i","í":"i","î":"i","ĩ":"i","ī":"i","ĭ":"i","ï":"i","ḯ":"i","ỉ":"i","ǐ":"i","ȉ":"i","ȋ":"i","ị":"i","į":"i","ḭ":"i","ɨ":"i","ı":"i","ⓙ":"j","ｊ":"j","ĵ":"j","ǰ":"j","ɉ":"j","ⓚ":"k","ｋ":"k","ḱ":"k","ǩ":"k","ḳ":"k","ķ":"k","ḵ":"k","ƙ":"k","ⱪ":"k","ꝁ":"k","ꝃ":"k","ꝅ":"k","ꞣ":"k","ⓛ":"l","ｌ":"l","ŀ":"l","ĺ":"l","ľ":"l","ḷ":"l","ḹ":"l","ļ":"l","ḽ":"l","ḻ":"l","ſ":"l","ł":"l","ƚ":"l","ɫ":"l","ⱡ":"l","ꝉ":"l","ꞁ":"l","ꝇ":"l","ǉ":"lj","ⓜ":"m","ｍ":"m","ḿ":"m","ṁ":"m","ṃ":"m","ɱ":"m","ɯ":"m","ⓝ":"n","ｎ":"n","ǹ":"n","ń":"n","ñ":"n","ṅ":"n","ň":"n","ṇ":"n","ņ":"n","ṋ":"n","ṉ":"n","ƞ":"n","ɲ":"n","ŉ":"n","ꞑ":"n","ꞥ":"n","ǌ":"nj","ⓞ":"o","ｏ":"o","ò":"o","ó":"o","ô":"o","ồ":"o","ố":"o","ỗ":"o","ổ":"o","õ":"o","ṍ":"o","ȭ":"o","ṏ":"o","ō":"o","ṑ":"o","ṓ":"o","ŏ":"o","ȯ":"o","ȱ":"o","ö":"o","ȫ":"o","ỏ":"o","ő":"o","ǒ":"o","ȍ":"o","ȏ":"o","ơ":"o","ờ":"o","ớ":"o","ỡ":"o","ở":"o","ợ":"o","ọ":"o","ộ":"o","ǫ":"o","ǭ":"o","ø":"o","ǿ":"o","ɔ":"o","ꝋ":"o","ꝍ":"o","ɵ":"o","œ":"oe","ƣ":"oi","ȣ":"ou","ꝏ":"oo","ⓟ":"p","ｐ":"p","ṕ":"p","ṗ":"p","ƥ":"p","ᵽ":"p","ꝑ":"p","ꝓ":"p","ꝕ":"p","ⓠ":"q","ｑ":"q","ɋ":"q","ꝗ":"q","ꝙ":"q","ⓡ":"r","ｒ":"r","ŕ":"r","ṙ":"r","ř":"r","ȑ":"r","ȓ":"r","ṛ":"r","ṝ":"r","ŗ":"r","ṟ":"r","ɍ":"r","ɽ":"r","ꝛ":"r","ꞧ":"r","ꞃ":"r","ⓢ":"s","ｓ":"s","ß":"s","ś":"s","ṥ":"s","ŝ":"s","ṡ":"s","š":"s","ṧ":"s","ṣ":"s","ṩ":"s","ș":"s","ş":"s","ȿ":"s","ꞩ":"s","ꞅ":"s","ẛ":"s","ⓣ":"t","ｔ":"t","ṫ":"t","ẗ":"t","ť":"t","ṭ":"t","ț":"t","ţ":"t","ṱ":"t","ṯ":"t","ŧ":"t","ƭ":"t","ʈ":"t","ⱦ":"t","ꞇ":"t","ꜩ":"tz","ⓤ":"u","ｕ":"u","ù":"u","ú":"u","û":"u","ũ":"u","ṹ":"u","ū":"u","ṻ":"u","ŭ":"u","ü":"u","ǜ":"u","ǘ":"u","ǖ":"u","ǚ":"u","ủ":"u","ů":"u","ű":"u","ǔ":"u","ȕ":"u","ȗ":"u","ư":"u","ừ":"u","ứ":"u","ữ":"u","ử":"u","ự":"u","ụ":"u","ṳ":"u","ų":"u","ṷ":"u","ṵ":"u","ʉ":"u","ⓥ":"v","ｖ":"v","ṽ":"v","ṿ":"v","ʋ":"v","ꝟ":"v","ʌ":"v","ꝡ":"vy","ⓦ":"w","ｗ":"w","ẁ":"w","ẃ":"w","ŵ":"w","ẇ":"w","ẅ":"w","ẘ":"w","ẉ":"w","ⱳ":"w","ⓧ":"x","ｘ":"x","ẋ":"x","ẍ":"x","ⓨ":"y","ｙ":"y","ỳ":"y","ý":"y","ŷ":"y","ỹ":"y","ȳ":"y","ẏ":"y","ÿ":"y","ỷ":"y","ẙ":"y","ỵ":"y","ƴ":"y","ɏ":"y","ỿ":"y","ⓩ":"z","ｚ":"z","ź":"z","ẑ":"z","ż":"z","ž":"z","ẓ":"z","ẕ":"z","ƶ":"z","ȥ":"z","ɀ":"z","ⱬ":"z","ꝣ":"z","Ά":"Α","Έ":"Ε","Ή":"Η","Ί":"Ι","Ϊ":"Ι","Ό":"Ο","Ύ":"Υ","Ϋ":"Υ","Ώ":"Ω","ά":"α","έ":"ε","ή":"η","ί":"ι","ϊ":"ι","ΐ":"ι","ό":"ο","ύ":"υ","ϋ":"υ","ΰ":"υ","ώ":"ω","ς":"σ","’":"'"}}),u.define("select2/data/base",["../utils"],function(n){function s(e,t){s.__super__.constructor.call(this)}return n.Extend(s,n.Observable),s.prototype.current=function(e){throw new Error("The `current` method must be defined in child classes.")},s.prototype.query=function(e,t){throw new Error("The `query` method must be defined in child classes.")},s.prototype.bind=function(e,t){},s.prototype.destroy=function(){},s.prototype.generateResultId=function(e,t){e=e.id+"-result-";return e+=n.generateChars(4),null!=t.id?e+="-"+t.id.toString():e+="-"+n.generateChars(4),e},s}),u.define("select2/data/select",["./base","../utils","jquery"],function(e,a,l){function n(e,t){this.$element=e,this.options=t,n.__super__.constructor.call(this)}return a.Extend(n,e),n.prototype.current=function(e){var t=this;e(Array.prototype.map.call(this.$element[0].querySelectorAll(":checked"),function(e){return t.item(l(e))}))},n.prototype.select=function(i){var e,r=this;if(i.selected=!0,null!=i.element&&"option"===i.element.tagName.toLowerCase())return i.element.selected=!0,void this.$element.trigger("input").trigger("change");this.$element.prop("multiple")?this.current(function(e){var t=[];(i=[i]).push.apply(i,e);for(var n=0;n<i.length;n++){var s=i[n].id;-1===t.indexOf(s)&&t.push(s)}r.$element.val(t),r.$element.trigger("input").trigger("change")}):(e=i.id,this.$element.val(e),this.$element.trigger("input").trigger("change"))},n.prototype.unselect=function(i){var r=this;if(this.$element.prop("multiple")){if(i.selected=!1,null!=i.element&&"option"===i.element.tagName.toLowerCase())return i.element.selected=!1,void this.$element.trigger("input").trigger("change");this.current(function(e){for(var t=[],n=0;n<e.length;n++){var s=e[n].id;s!==i.id&&-1===t.indexOf(s)&&t.push(s)}r.$element.val(t),r.$element.trigger("input").trigger("change")})}},n.prototype.bind=function(e,t){var n=this;(this.container=e).on("select",function(e){n.select(e.data)}),e.on("unselect",function(e){n.unselect(e.data)})},n.prototype.destroy=function(){this.$element.find("*").each(function(){a.RemoveData(this)})},n.prototype.query=function(t,e){var n=[],s=this;this.$element.children().each(function(){var e;"option"!==this.tagName.toLowerCase()&&"optgroup"!==this.tagName.toLowerCase()||(e=l(this),e=s.item(e),null!==(e=s.matches(t,e))&&n.push(e))}),e({results:n})},n.prototype.addOptions=function(e){this.$element.append(e)},n.prototype.option=function(e){var t;e.children?(t=document.createElement("optgroup")).label=e.text:void 0!==(t=document.createElement("option")).textContent?t.textContent=e.text:t.innerText=e.text,void 0!==e.id&&(t.value=e.id),e.disabled&&(t.disabled=!0),e.selected&&(t.selected=!0),e.title&&(t.title=e.title);e=this._normalizeItem(e);return e.element=t,a.StoreData(t,"data",e),l(t)},n.prototype.item=function(e){var t={};if(null!=(t=a.GetData(e[0],"data")))return t;var n=e[0];if("option"===n.tagName.toLowerCase())t={id:e.val(),text:e.text(),disabled:e.prop("disabled"),selected:e.prop("selected"),title:e.prop("title")};else if("optgroup"===n.tagName.toLowerCase()){t={text:e.prop("label"),children:[],title:e.prop("title")};for(var s=e.children("option"),i=[],r=0;r<s.length;r++){var o=l(s[r]),o=this.item(o);i.push(o)}t.children=i}return(t=this._normalizeItem(t)).element=e[0],a.StoreData(e[0],"data",t),t},n.prototype._normalizeItem=function(e){e!==Object(e)&&(e={id:e,text:e});return null!=(e=l.extend({},{text:""},e)).id&&(e.id=e.id.toString()),null!=e.text&&(e.text=e.text.toString()),null==e._resultId&&e.id&&null!=this.container&&(e._resultId=this.generateResultId(this.container,e)),l.extend({},{selected:!1,disabled:!1},e)},n.prototype.matches=function(e,t){return this.options.get("matcher")(e,t)},n}),u.define("select2/data/array",["./select","../utils","jquery"],function(e,t,c){function s(e,t){this._dataToConvert=t.get("data")||[],s.__super__.constructor.call(this,e,t)}return t.Extend(s,e),s.prototype.bind=function(e,t){s.__super__.bind.call(this,e,t),this.addOptions(this.convertToOptions(this._dataToConvert))},s.prototype.select=function(n){var e=this.$element.find("option").filter(function(e,t){return t.value==n.id.toString()});0===e.length&&(e=this.option(n),this.addOptions(e)),s.__super__.select.call(this,n)},s.prototype.convertToOptions=function(e){var t=this,n=this.$element.find("option"),s=n.map(function(){return t.item(c(this)).id}).get(),i=[];for(var r=0;r<e.length;r++){var o,a,l=this._normalizeItem(e[r]);0<=s.indexOf(l.id)?(o=n.filter(function(e){return function(){return c(this).val()==e.id}}(l)),a=this.item(o),a=c.extend(!0,{},l,a),a=this.option(a),o.replaceWith(a)):(a=this.option(l),l.children&&(l=this.convertToOptions(l.children),a.append(l)),i.push(a))}return i},s}),u.define("select2/data/ajax",["./array","../utils","jquery"],function(e,t,r){function n(e,t){this.ajaxOptions=this._applyDefaults(t.get("ajax")),null!=this.ajaxOptions.processResults&&(this.processResults=this.ajaxOptions.processResults),n.__super__.constructor.call(this,e,t)}return t.Extend(n,e),n.prototype._applyDefaults=function(e){var t={data:function(e){return r.extend({},e,{q:e.term})},transport:function(e,t,n){e=r.ajax(e);return e.then(t),e.fail(n),e}};return r.extend({},t,e,!0)},n.prototype.processResults=function(e){return e},n.prototype.query=function(t,n){var s=this;null!=this._request&&("function"==typeof this._request.abort&&this._request.abort(),this._request=null);var i=r.extend({type:"GET"},this.ajaxOptions);function e(){var e=i.transport(i,function(e){e=s.processResults(e,t);s.options.get("debug")&&window.console&&console.error&&(e&&e.results&&Array.isArray(e.results)||console.error("Select2: The AJAX results did not return an array in the `results` key of the response.")),n(e)},function(){"status"in e&&(0===e.status||"0"===e.status)||s.trigger("results:message",{message:"errorLoading"})});s._request=e}"function"==typeof i.url&&(i.url=i.url.call(this.$element,t)),"function"==typeof i.data&&(i.data=i.data.call(this.$element,t)),this.ajaxOptions.delay&&null!=t.term?(this._queryTimeout&&window.clearTimeout(this._queryTimeout),this._queryTimeout=window.setTimeout(e,this.ajaxOptions.delay)):e()},n}),u.define("select2/data/tags",["jquery"],function(t){function e(e,t,n){var s=n.get("tags"),i=n.get("createTag");void 0!==i&&(this.createTag=i);i=n.get("insertTag");if(void 0!==i&&(this.insertTag=i),e.call(this,t,n),Array.isArray(s))for(var r=0;r<s.length;r++){var o=s[r],o=this._normalizeItem(o),o=this.option(o);this.$element.append(o)}}return e.prototype.query=function(e,c,u){var d=this;this._removeOldTags(),null!=c.term&&null==c.page?e.call(this,c,function e(t,n){for(var s=t.results,i=0;i<s.length;i++){var r=s[i],o=null!=r.children&&!e({results:r.children},!0);if((r.text||"").toUpperCase()===(c.term||"").toUpperCase()||o)return!n&&(t.data=s,void u(t))}if(n)return!0;var a,l=d.createTag(c);null!=l&&((a=d.option(l)).attr("data-select2-tag","true"),d.addOptions([a]),d.insertTag(s,l)),t.results=s,u(t)}):e.call(this,c,u)},e.prototype.createTag=function(e,t){if(null==t.term)return null;t=t.term.trim();return""===t?null:{id:t,text:t}},e.prototype.insertTag=function(e,t,n){t.unshift(n)},e.prototype._removeOldTags=function(e){this.$element.find("option[data-select2-tag]").each(function(){this.selected||t(this).remove()})},e}),u.define("select2/data/tokenizer",["jquery"],function(c){function e(e,t,n){var s=n.get("tokenizer");void 0!==s&&(this.tokenizer=s),e.call(this,t,n)}return e.prototype.bind=function(e,t,n){e.call(this,t,n),this.$search=t.dropdown.$search||t.selection.$search||n.find(".select2-search__field")},e.prototype.query=function(e,t,n){var s=this;t.term=t.term||"";var i=this.tokenizer(t,this.options,function(e){var t,n=s._normalizeItem(e);s.$element.find("option").filter(function(){return c(this).val()===n.id}).length||((t=s.option(n)).attr("data-select2-tag",!0),s._removeOldTags(),s.addOptions([t])),t=n,s.trigger("select",{data:t})});i.term!==t.term&&(this.$search.length&&(this.$search.val(i.term),this.$search.trigger("focus")),t.term=i.term),e.call(this,t,n)},e.prototype.tokenizer=function(e,t,n,s){for(var i=n.get("tokenSeparators")||[],r=t.term,o=0,a=this.createTag||function(e){return{id:e.term,text:e.term}};o<r.length;){var l=r[o];-1!==i.indexOf(l)?(l=r.substr(0,o),null!=(l=a(c.extend({},t,{term:l})))?(s(l),r=r.substr(o+1)||"",o=0):o++):o++}return{term:r}},e}),u.define("select2/data/minimumInputLength",[],function(){function e(e,t,n){this.minimumInputLength=n.get("minimumInputLength"),e.call(this,t,n)}return e.prototype.query=function(e,t,n){t.term=t.term||"",t.term.length<this.minimumInputLength?this.trigger("results:message",{message:"inputTooShort",args:{minimum:this.minimumInputLength,input:t.term,params:t}}):e.call(this,t,n)},e}),u.define("select2/data/maximumInputLength",[],function(){function e(e,t,n){this.maximumInputLength=n.get("maximumInputLength"),e.call(this,t,n)}return e.prototype.query=function(e,t,n){t.term=t.term||"",0<this.maximumInputLength&&t.term.length>this.maximumInputLength?this.trigger("results:message",{message:"inputTooLong",args:{maximum:this.maximumInputLength,input:t.term,params:t}}):e.call(this,t,n)},e}),u.define("select2/data/maximumSelectionLength",[],function(){function e(e,t,n){this.maximumSelectionLength=n.get("maximumSelectionLength"),e.call(this,t,n)}return e.prototype.bind=function(e,t,n){var s=this;e.call(this,t,n),t.on("select",function(){s._checkIfMaximumSelected()})},e.prototype.query=function(e,t,n){var s=this;this._checkIfMaximumSelected(function(){e.call(s,t,n)})},e.prototype._checkIfMaximumSelected=function(e,t){var n=this;this.current(function(e){e=null!=e?e.length:0;0<n.maximumSelectionLength&&e>=n.maximumSelectionLength?n.trigger("results:message",{message:"maximumSelected",args:{maximum:n.maximumSelectionLength}}):t&&t()})},e}),u.define("select2/dropdown",["jquery","./utils"],function(t,e){function n(e,t){this.$element=e,this.options=t,n.__super__.constructor.call(this)}return e.Extend(n,e.Observable),n.prototype.render=function(){var e=t('<span class="select2-dropdown"><span class="select2-results"></span></span>');return e.attr("dir",this.options.get("dir")),this.$dropdown=e},n.prototype.bind=function(){},n.prototype.position=function(e,t){},n.prototype.destroy=function(){this.$dropdown.remove()},n}),u.define("select2/dropdown/search",["jquery"],function(r){function e(){}return e.prototype.render=function(e){var t=e.call(this),n=this.options.get("translations").get("search"),e=r('<span class="select2-search select2-search--dropdown"><input class="select2-search__field" type="search" tabindex="-1" autocorrect="off" autocapitalize="none" spellcheck="false" role="searchbox" aria-autocomplete="list" /></span>');return this.$searchContainer=e,this.$search=e.find("input"),this.$search.prop("autocomplete",this.options.get("autocomplete")),this.$search.attr("aria-label",n()),t.prepend(e),t},e.prototype.bind=function(e,t,n){var s=this,i=t.id+"-results";e.call(this,t,n),this.$search.on("keydown",function(e){s.trigger("keypress",e),s._keyUpPrevented=e.isDefaultPrevented()}),this.$search.on("input",function(e){r(this).off("keyup")}),this.$search.on("keyup input",function(e){s.handleSearch(e)}),t.on("open",function(){s.$search.attr("tabindex",0),s.$search.attr("aria-controls",i),s.$search.trigger("focus"),window.setTimeout(function(){s.$search.trigger("focus")},0)}),t.on("close",function(){s.$search.attr("tabindex",-1),s.$search.removeAttr("aria-controls"),s.$search.removeAttr("aria-activedescendant"),s.$search.val(""),s.$search.trigger("blur")}),t.on("focus",function(){t.isOpen()||s.$search.trigger("focus")}),t.on("results:all",function(e){null!=e.query.term&&""!==e.query.term||(s.showSearch(e)?s.$searchContainer[0].classList.remove("select2-search--hide"):s.$searchContainer[0].classList.add("select2-search--hide"))}),t.on("results:focus",function(e){e.data._resultId?s.$search.attr("aria-activedescendant",e.data._resultId):s.$search.removeAttr("aria-activedescendant")})},e.prototype.handleSearch=function(e){var t;this._keyUpPrevented||(t=this.$search.val(),this.trigger("query",{term:t})),this._keyUpPrevented=!1},e.prototype.showSearch=function(e,t){return!0},e}),u.define("select2/dropdown/hidePlaceholder",[],function(){function e(e,t,n,s){this.placeholder=this.normalizePlaceholder(n.get("placeholder")),e.call(this,t,n,s)}return e.prototype.append=function(e,t){t.results=this.removePlaceholder(t.results),e.call(this,t)},e.prototype.normalizePlaceholder=function(e,t){return t="string"==typeof t?{id:"",text:t}:t},e.prototype.removePlaceholder=function(e,t){for(var n=t.slice(0),s=t.length-1;0<=s;s--){var i=t[s];this.placeholder.id===i.id&&n.splice(s,1)}return n},e}),u.define("select2/dropdown/infiniteScroll",["jquery"],function(n){function e(e,t,n,s){this.lastParams={},e.call(this,t,n,s),this.$loadingMore=this.createLoadingMore(),this.loading=!1}return e.prototype.append=function(e,t){this.$loadingMore.remove(),this.loading=!1,e.call(this,t),this.showLoadingMore(t)&&(this.$results.append(this.$loadingMore),this.loadMoreIfNeeded())},e.prototype.bind=function(e,t,n){var s=this;e.call(this,t,n),t.on("query",function(e){s.lastParams=e,s.loading=!0}),t.on("query:append",function(e){s.lastParams=e,s.loading=!0}),this.$results.on("scroll",this.loadMoreIfNeeded.bind(this))},e.prototype.loadMoreIfNeeded=function(){var e=n.contains(document.documentElement,this.$loadingMore[0]);!this.loading&&e&&(e=this.$results.offset().top+this.$results.outerHeight(!1),this.$loadingMore.offset().top+this.$loadingMore.outerHeight(!1)<=e+50&&this.loadMore())},e.prototype.loadMore=function(){this.loading=!0;var e=n.extend({},{page:1},this.lastParams);e.page++,this.trigger("query:append",e)},e.prototype.showLoadingMore=function(e,t){return t.pagination&&t.pagination.more},e.prototype.createLoadingMore=function(){var e=n('<li class="select2-results__option select2-results__option--load-more"role="option" aria-disabled="true"></li>'),t=this.options.get("translations").get("loadingMore");return e.html(t(this.lastParams)),e},e}),u.define("select2/dropdown/attachBody",["jquery","../utils"],function(u,o){function e(e,t,n){this.$dropdownParent=u(n.get("dropdownParent")||document.body),e.call(this,t,n)}return e.prototype.bind=function(e,t,n){var s=this;e.call(this,t,n),t.on("open",function(){s._showDropdown(),s._attachPositioningHandler(t),s._bindContainerResultHandlers(t)}),t.on("close",function(){s._hideDropdown(),s._detachPositioningHandler(t)}),this.$dropdownContainer.on("mousedown",function(e){e.stopPropagation()})},e.prototype.destroy=function(e){e.call(this),this.$dropdownContainer.remove()},e.prototype.position=function(e,t,n){t.attr("class",n.attr("class")),t[0].classList.remove("select2"),t[0].classList.add("select2-container--open"),t.css({position:"absolute",top:-999999}),this.$container=n},e.prototype.render=function(e){var t=u("<span></span>"),e=e.call(this);return t.append(e),this.$dropdownContainer=t},e.prototype._hideDropdown=function(e){this.$dropdownContainer.detach()},e.prototype._bindContainerResultHandlers=function(e,t){var n;this._containerResultsHandlersBound||(n=this,t.on("results:all",function(){n._positionDropdown(),n._resizeDropdown()}),t.on("results:append",function(){n._positionDropdown(),n._resizeDropdown()}),t.on("results:message",function(){n._positionDropdown(),n._resizeDropdown()}),t.on("select",function(){n._positionDropdown(),n._resizeDropdown()}),t.on("unselect",function(){n._positionDropdown(),n._resizeDropdown()}),this._containerResultsHandlersBound=!0)},e.prototype._attachPositioningHandler=function(e,t){var n=this,s="scroll.select2."+t.id,i="resize.select2."+t.id,r="orientationchange.select2."+t.id,t=this.$container.parents().filter(o.hasScroll);t.each(function(){o.StoreData(this,"select2-scroll-position",{x:u(this).scrollLeft(),y:u(this).scrollTop()})}),t.on(s,function(e){var t=o.GetData(this,"select2-scroll-position");u(this).scrollTop(t.y)}),u(window).on(s+" "+i+" "+r,function(e){n._positionDropdown(),n._resizeDropdown()})},e.prototype._detachPositioningHandler=function(e,t){var n="scroll.select2."+t.id,s="resize.select2."+t.id,t="orientationchange.select2."+t.id;this.$container.parents().filter(o.hasScroll).off(n),u(window).off(n+" "+s+" "+t)},e.prototype._positionDropdown=function(){var e=u(window),t=this.$dropdown[0].classList.contains("select2-dropdown--above"),n=this.$dropdown[0].classList.contains("select2-dropdown--below"),s=null,i=this.$container.offset();i.bottom=i.top+this.$container.outerHeight(!1);var r={height:this.$container.outerHeight(!1)};r.top=i.top,r.bottom=i.top+r.height;var o=this.$dropdown.outerHeight(!1),a=e.scrollTop(),l=e.scrollTop()+e.height(),c=a<i.top-o,e=l>i.bottom+o,a={left:i.left,top:r.bottom},l=this.$dropdownParent;"static"===l.css("position")&&(l=l.offsetParent());i={top:0,left:0};(u.contains(document.body,l[0])||l[0].isConnected)&&(i=l.offset()),a.top-=i.top,a.left-=i.left,t||n||(s="below"),e||!c||t?!c&&e&&t&&(s="below"):s="above",("above"==s||t&&"below"!==s)&&(a.top=r.top-i.top-o),null!=s&&(this.$dropdown[0].classList.remove("select2-dropdown--below"),this.$dropdown[0].classList.remove("select2-dropdown--above"),this.$dropdown[0].classList.add("select2-dropdown--"+s),this.$container[0].classList.remove("select2-container--below"),this.$container[0].classList.remove("select2-container--above"),this.$container[0].classList.add("select2-container--"+s)),this.$dropdownContainer.css(a)},e.prototype._resizeDropdown=function(){var e={width:this.$container.outerWidth(!1)+"px"};this.options.get("dropdownAutoWidth")&&(e.minWidth=e.width,e.position="relative",e.width="auto"),this.$dropdown.css(e)},e.prototype._showDropdown=function(e){this.$dropdownContainer.appendTo(this.$dropdownParent),this._positionDropdown(),this._resizeDropdown()},e}),u.define("select2/dropdown/minimumResultsForSearch",[],function(){function e(e,t,n,s){this.minimumResultsForSearch=n.get("minimumResultsForSearch"),this.minimumResultsForSearch<0&&(this.minimumResultsForSearch=1/0),e.call(this,t,n,s)}return e.prototype.showSearch=function(e,t){return!(function e(t){for(var n=0,s=0;s<t.length;s++){var i=t[s];i.children?n+=e(i.children):n++}return n}(t.data.results)<this.minimumResultsForSearch)&&e.call(this,t)},e}),u.define("select2/dropdown/selectOnClose",["../utils"],function(s){function e(){}return e.prototype.bind=function(e,t,n){var s=this;e.call(this,t,n),t.on("close",function(e){s._handleSelectOnClose(e)})},e.prototype._handleSelectOnClose=function(e,t){if(t&&null!=t.originalSelect2Event){var n=t.originalSelect2Event;if("select"===n._type||"unselect"===n._type)return}n=this.getHighlightedResults();n.length<1||(null!=(n=s.GetData(n[0],"data")).element&&n.element.selected||null==n.element&&n.selected||this.trigger("select",{data:n}))},e}),u.define("select2/dropdown/closeOnSelect",[],function(){function e(){}return e.prototype.bind=function(e,t,n){var s=this;e.call(this,t,n),t.on("select",function(e){s._selectTriggered(e)}),t.on("unselect",function(e){s._selectTriggered(e)})},e.prototype._selectTriggered=function(e,t){var n=t.originalEvent;n&&(n.ctrlKey||n.metaKey)||this.trigger("close",{originalEvent:n,originalSelect2Event:t})},e}),u.define("select2/dropdown/dropdownCss",["../utils"],function(n){function e(){}return e.prototype.render=function(e){var t=e.call(this),e=this.options.get("dropdownCssClass")||"";return-1!==e.indexOf(":all:")&&(e=e.replace(":all:",""),n.copyNonInternalCssClasses(t[0],this.$element[0])),t.addClass(e),t},e}),u.define("select2/dropdown/tagsSearchHighlight",["../utils"],function(s){function e(){}return e.prototype.highlightFirstItem=function(e){var t=this.$results.find(".select2-results__option--selectable:not(.select2-results__option--selected)");if(0<t.length){var n=t.first(),t=s.GetData(n[0],"data").element;if(t&&t.getAttribute&&"true"===t.getAttribute("data-select2-tag"))return void n.trigger("mouseenter")}e.call(this)},e}),u.define("select2/i18n/en",[],function(){return{errorLoading:function(){return"The results could not be loaded."},inputTooLong:function(e){var t=e.input.length-e.maximum,e="Please delete "+t+" character";return 1!=t&&(e+="s"),e},inputTooShort:function(e){return"Please enter "+(e.minimum-e.input.length)+" or more characters"},loadingMore:function(){return"Loading more results…"},maximumSelected:function(e){var t="You can only select "+e.maximum+" item";return 1!=e.maximum&&(t+="s"),t},noResults:function(){return"No results found"},searching:function(){return"Searching…"},removeAllItems:function(){return"Remove all items"},removeItem:function(){return"Remove item"},search:function(){return"Search"}}}),u.define("select2/defaults",["jquery","./results","./selection/single","./selection/multiple","./selection/placeholder","./selection/allowClear","./selection/search","./selection/selectionCss","./selection/eventRelay","./utils","./translation","./diacritics","./data/select","./data/array","./data/ajax","./data/tags","./data/tokenizer","./data/minimumInputLength","./data/maximumInputLength","./data/maximumSelectionLength","./dropdown","./dropdown/search","./dropdown/hidePlaceholder","./dropdown/infiniteScroll","./dropdown/attachBody","./dropdown/minimumResultsForSearch","./dropdown/selectOnClose","./dropdown/closeOnSelect","./dropdown/dropdownCss","./dropdown/tagsSearchHighlight","./i18n/en"],function(l,r,o,a,c,u,d,p,h,f,g,t,m,y,v,_,b,$,w,x,A,D,S,E,O,C,L,T,q,I,e){function n(){this.reset()}return n.prototype.apply=function(e){var t;null==(e=l.extend(!0,{},this.defaults,e)).dataAdapter&&(null!=e.ajax?e.dataAdapter=v:null!=e.data?e.dataAdapter=y:e.dataAdapter=m,0<e.minimumInputLength&&(e.dataAdapter=f.Decorate(e.dataAdapter,$)),0<e.maximumInputLength&&(e.dataAdapter=f.Decorate(e.dataAdapter,w)),0<e.maximumSelectionLength&&(e.dataAdapter=f.Decorate(e.dataAdapter,x)),e.tags&&(e.dataAdapter=f.Decorate(e.dataAdapter,_)),null==e.tokenSeparators&&null==e.tokenizer||(e.dataAdapter=f.Decorate(e.dataAdapter,b))),null==e.resultsAdapter&&(e.resultsAdapter=r,null!=e.ajax&&(e.resultsAdapter=f.Decorate(e.resultsAdapter,E)),null!=e.placeholder&&(e.resultsAdapter=f.Decorate(e.resultsAdapter,S)),e.selectOnClose&&(e.resultsAdapter=f.Decorate(e.resultsAdapter,L)),e.tags&&(e.resultsAdapter=f.Decorate(e.resultsAdapter,I))),null==e.dropdownAdapter&&(e.multiple?e.dropdownAdapter=A:(t=f.Decorate(A,D),e.dropdownAdapter=t),0!==e.minimumResultsForSearch&&(e.dropdownAdapter=f.Decorate(e.dropdownAdapter,C)),e.closeOnSelect&&(e.dropdownAdapter=f.Decorate(e.dropdownAdapter,T)),null!=e.dropdownCssClass&&(e.dropdownAdapter=f.Decorate(e.dropdownAdapter,q)),e.dropdownAdapter=f.Decorate(e.dropdownAdapter,O)),null==e.selectionAdapter&&(e.multiple?e.selectionAdapter=a:e.selectionAdapter=o,null!=e.placeholder&&(e.selectionAdapter=f.Decorate(e.selectionAdapter,c)),e.allowClear&&(e.selectionAdapter=f.Decorate(e.selectionAdapter,u)),e.multiple&&(e.selectionAdapter=f.Decorate(e.selectionAdapter,d)),null!=e.selectionCssClass&&(e.selectionAdapter=f.Decorate(e.selectionAdapter,p)),e.selectionAdapter=f.Decorate(e.selectionAdapter,h)),e.language=this._resolveLanguage(e.language),e.language.push("en");for(var n=[],s=0;s<e.language.length;s++){var i=e.language[s];-1===n.indexOf(i)&&n.push(i)}return e.language=n,e.translations=this._processTranslations(e.language,e.debug),e},n.prototype.reset=function(){function a(e){return e.replace(/[^\u0000-\u007E]/g,function(e){return t[e]||e})}this.defaults={amdLanguageBase:"./i18n/",autocomplete:"off",closeOnSelect:!0,debug:!1,dropdownAutoWidth:!1,escapeMarkup:f.escapeMarkup,language:{},matcher:function e(t,n){if(null==t.term||""===t.term.trim())return n;if(n.children&&0<n.children.length){for(var s=l.extend(!0,{},n),i=n.children.length-1;0<=i;i--)null==e(t,n.children[i])&&s.children.splice(i,1);return 0<s.children.length?s:e(t,s)}var r=a(n.text).toUpperCase(),o=a(t.term).toUpperCase();return-1<r.indexOf(o)?n:null},minimumInputLength:0,maximumInputLength:0,maximumSelectionLength:0,minimumResultsForSearch:0,selectOnClose:!1,scrollAfterSelect:!1,sorter:function(e){return e},templateResult:function(e){return e.text},templateSelection:function(e){return e.text},theme:"default",width:"resolve"}},n.prototype.applyFromElement=function(e,t){var n=e.language,s=this.defaults.language,i=t.prop("lang"),t=t.closest("[lang]").prop("lang"),t=Array.prototype.concat.call(this._resolveLanguage(i),this._resolveLanguage(n),this._resolveLanguage(s),this._resolveLanguage(t));return e.language=t,e},n.prototype._resolveLanguage=function(e){if(!e)return[];if(l.isEmptyObject(e))return[];if(l.isPlainObject(e))return[e];for(var t,n=Array.isArray(e)?e:[e],s=[],i=0;i<n.length;i++)s.push(n[i]),"string"==typeof n[i]&&0<n[i].indexOf("-")&&(t=n[i].split("-")[0],s.push(t));return s},n.prototype._processTranslations=function(e,t){for(var n=new g,s=0;s<e.length;s++){var i=new g,r=e[s];if("string"==typeof r)try{i=g.loadPath(r)}catch(e){try{r=this.defaults.amdLanguageBase+r,i=g.loadPath(r)}catch(e){t&&window.console&&console.warn&&console.warn('Select2: The language file for "'+r+'" could not be automatically loaded. A fallback will be used instead.')}}else i=l.isPlainObject(r)?new g(r):r;n.extend(i)}return n},n.prototype.set=function(e,t){var n={};n[l.camelCase(e)]=t;n=f._convertData(n);l.extend(!0,this.defaults,n)},new n}),u.define("select2/options",["jquery","./defaults","./utils"],function(c,n,u){function e(e,t){this.options=e,null!=t&&this.fromElement(t),null!=t&&(this.options=n.applyFromElement(this.options,t)),this.options=n.apply(this.options)}return e.prototype.fromElement=function(e){var t=["select2"];null==this.options.multiple&&(this.options.multiple=e.prop("multiple")),null==this.options.disabled&&(this.options.disabled=e.prop("disabled")),null==this.options.autocomplete&&e.prop("autocomplete")&&(this.options.autocomplete=e.prop("autocomplete")),null==this.options.dir&&(e.prop("dir")?this.options.dir=e.prop("dir"):e.closest("[dir]").prop("dir")?this.options.dir=e.closest("[dir]").prop("dir"):this.options.dir="ltr"),e.prop("disabled",this.options.disabled),e.prop("multiple",this.options.multiple),u.GetData(e[0],"select2Tags")&&(this.options.debug&&window.console&&console.warn&&console.warn('Select2: The `data-select2-tags` attribute has been changed to use the `data-data` and `data-tags="true"` attributes and will be removed in future versions of Select2.'),u.StoreData(e[0],"data",u.GetData(e[0],"select2Tags")),u.StoreData(e[0],"tags",!0)),u.GetData(e[0],"ajaxUrl")&&(this.options.debug&&window.console&&console.warn&&console.warn("Select2: The `data-ajax-url` attribute has been changed to `data-ajax--url` and support for the old attribute will be removed in future versions of Select2."),e.attr("ajax--url",u.GetData(e[0],"ajaxUrl")),u.StoreData(e[0],"ajax-Url",u.GetData(e[0],"ajaxUrl")));var n={};function s(e,t){return t.toUpperCase()}for(var i=0;i<e[0].attributes.length;i++){var r=e[0].attributes[i].name,o="data-";r.substr(0,o.length)==o&&(r=r.substring(o.length),o=u.GetData(e[0],r),n[r.replace(/-([a-z])/g,s)]=o)}c.fn.jquery&&"1."==c.fn.jquery.substr(0,2)&&e[0].dataset&&(n=c.extend(!0,{},e[0].dataset,n));var a,l=c.extend(!0,{},u.GetData(e[0]),n);for(a in l=u._convertData(l))-1<t.indexOf(a)||(c.isPlainObject(this.options[a])?c.extend(this.options[a],l[a]):this.options[a]=l[a]);return this},e.prototype.get=function(e){return this.options[e]},e.prototype.set=function(e,t){this.options[e]=t},e}),u.define("select2/core",["jquery","./options","./utils","./keys"],function(t,i,r,s){var o=function(e,t){null!=r.GetData(e[0],"select2")&&r.GetData(e[0],"select2").destroy(),this.$element=e,this.id=this._generateId(e),t=t||{},this.options=new i(t,e),o.__super__.constructor.call(this);var n=e.attr("tabindex")||0;r.StoreData(e[0],"old-tabindex",n),e.attr("tabindex","-1");t=this.options.get("dataAdapter");this.dataAdapter=new t(e,this.options);n=this.render();this._placeContainer(n);t=this.options.get("selectionAdapter");this.selection=new t(e,this.options),this.$selection=this.selection.render(),this.selection.position(this.$selection,n);t=this.options.get("dropdownAdapter");this.dropdown=new t(e,this.options),this.$dropdown=this.dropdown.render(),this.dropdown.position(this.$dropdown,n);n=this.options.get("resultsAdapter");this.results=new n(e,this.options,this.dataAdapter),this.$results=this.results.render(),this.results.position(this.$results,this.$dropdown);var s=this;this._bindAdapters(),this._registerDomEvents(),this._registerDataEvents(),this._registerSelectionEvents(),this._registerDropdownEvents(),this._registerResultsEvents(),this._registerEvents(),this.dataAdapter.current(function(e){s.trigger("selection:update",{data:e})}),e[0].classList.add("select2-hidden-accessible"),e.attr("aria-hidden","true"),this._syncAttributes(),r.StoreData(e[0],"select2",this),e.data("select2",this)};return r.Extend(o,r.Observable),o.prototype._generateId=function(e){return"select2-"+(null!=e.attr("id")?e.attr("id"):null!=e.attr("name")?e.attr("name")+"-"+r.generateChars(2):r.generateChars(4)).replace(/(:|\.|\[|\]|,)/g,"")},o.prototype._placeContainer=function(e){e.insertAfter(this.$element);var t=this._resolveWidth(this.$element,this.options.get("width"));null!=t&&e.css("width",t)},o.prototype._resolveWidth=function(e,t){var n=/^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i;if("resolve"==t){var s=this._resolveWidth(e,"style");return null!=s?s:this._resolveWidth(e,"element")}if("element"==t){s=e.outerWidth(!1);return s<=0?"auto":s+"px"}if("style"!=t)return"computedstyle"!=t?t:window.getComputedStyle(e[0]).width;e=e.attr("style");if("string"!=typeof e)return null;for(var i=e.split(";"),r=0,o=i.length;r<o;r+=1){var a=i[r].replace(/\s/g,"").match(n);if(null!==a&&1<=a.length)return a[1]}return null},o.prototype._bindAdapters=function(){this.dataAdapter.bind(this,this.$container),this.selection.bind(this,this.$container),this.dropdown.bind(this,this.$container),this.results.bind(this,this.$container)},o.prototype._registerDomEvents=function(){var t=this;this.$element.on("change.select2",function(){t.dataAdapter.current(function(e){t.trigger("selection:update",{data:e})})}),this.$element.on("focus.select2",function(e){t.trigger("focus",e)}),this._syncA=r.bind(this._syncAttributes,this),this._syncS=r.bind(this._syncSubtree,this),this._observer=new window.MutationObserver(function(e){t._syncA(),t._syncS(e)}),this._observer.observe(this.$element[0],{attributes:!0,childList:!0,subtree:!1})},o.prototype._registerDataEvents=function(){var n=this;this.dataAdapter.on("*",function(e,t){n.trigger(e,t)})},o.prototype._registerSelectionEvents=function(){var n=this,s=["toggle","focus"];this.selection.on("toggle",function(){n.toggleDropdown()}),this.selection.on("focus",function(e){n.focus(e)}),this.selection.on("*",function(e,t){-1===s.indexOf(e)&&n.trigger(e,t)})},o.prototype._registerDropdownEvents=function(){var n=this;this.dropdown.on("*",function(e,t){n.trigger(e,t)})},o.prototype._registerResultsEvents=function(){var n=this;this.results.on("*",function(e,t){n.trigger(e,t)})},o.prototype._registerEvents=function(){var n=this;this.on("open",function(){n.$container[0].classList.add("select2-container--open")}),this.on("close",function(){n.$container[0].classList.remove("select2-container--open")}),this.on("enable",function(){n.$container[0].classList.remove("select2-container--disabled")}),this.on("disable",function(){n.$container[0].classList.add("select2-container--disabled")}),this.on("blur",function(){n.$container[0].classList.remove("select2-container--focus")}),this.on("query",function(t){n.isOpen()||n.trigger("open",{}),this.dataAdapter.query(t,function(e){n.trigger("results:all",{data:e,query:t})})}),this.on("query:append",function(t){this.dataAdapter.query(t,function(e){n.trigger("results:append",{data:e,query:t})})}),this.on("keypress",function(e){var t=e.which;n.isOpen()?t===s.ESC||t===s.UP&&e.altKey?(n.close(e),e.preventDefault()):t===s.ENTER||t===s.TAB?(n.trigger("results:select",{}),e.preventDefault()):t===s.SPACE&&e.ctrlKey?(n.trigger("results:toggle",{}),e.preventDefault()):t===s.UP?(n.trigger("results:previous",{}),e.preventDefault()):t===s.DOWN&&(n.trigger("results:next",{}),e.preventDefault()):(t===s.ENTER||t===s.SPACE||t===s.DOWN&&e.altKey)&&(n.open(),e.preventDefault())})},o.prototype._syncAttributes=function(){this.options.set("disabled",this.$element.prop("disabled")),this.isDisabled()?(this.isOpen()&&this.close(),this.trigger("disable",{})):this.trigger("enable",{})},o.prototype._isChangeMutation=function(e){var t=this;if(e.addedNodes&&0<e.addedNodes.length){for(var n=0;n<e.addedNodes.length;n++)if(e.addedNodes[n].selected)return!0}else{if(e.removedNodes&&0<e.removedNodes.length)return!0;if(Array.isArray(e))return e.some(function(e){return t._isChangeMutation(e)})}return!1},o.prototype._syncSubtree=function(e){var e=this._isChangeMutation(e),t=this;e&&this.dataAdapter.current(function(e){t.trigger("selection:update",{data:e})})},o.prototype.trigger=function(e,t){var n=o.__super__.trigger,s={open:"opening",close:"closing",select:"selecting",unselect:"unselecting",clear:"clearing"};if(void 0===t&&(t={}),e in s){var i=s[e],s={prevented:!1,name:e,args:t};if(n.call(this,i,s),s.prevented)return void(t.prevented=!0)}n.call(this,e,t)},o.prototype.toggleDropdown=function(){this.isDisabled()||(this.isOpen()?this.close():this.open())},o.prototype.open=function(){this.isOpen()||this.isDisabled()||this.trigger("query",{})},o.prototype.close=function(e){this.isOpen()&&this.trigger("close",{originalEvent:e})},o.prototype.isEnabled=function(){return!this.isDisabled()},o.prototype.isDisabled=function(){return this.options.get("disabled")},o.prototype.isOpen=function(){return this.$container[0].classList.contains("select2-container--open")},o.prototype.hasFocus=function(){return this.$container[0].classList.contains("select2-container--focus")},o.prototype.focus=function(e){this.hasFocus()||(this.$container[0].classList.add("select2-container--focus"),this.trigger("focus",{}))},o.prototype.enable=function(e){this.options.get("debug")&&window.console&&console.warn&&console.warn('Select2: The `select2("enable")` method has been deprecated and will be removed in later Select2 versions. Use $element.prop("disabled") instead.');e=!(e=null==e||0===e.length?[!0]:e)[0];this.$element.prop("disabled",e)},o.prototype.data=function(){this.options.get("debug")&&0<arguments.length&&window.console&&console.warn&&console.warn('Select2: Data can no longer be set using `select2("data")`. You should consider setting the value instead using `$element.val()`.');var t=[];return this.dataAdapter.current(function(e){t=e}),t},o.prototype.val=function(e){if(this.options.get("debug")&&window.console&&console.warn&&console.warn('Select2: The `select2("val")` method has been deprecated and will be removed in later Select2 versions. Use $element.val() instead.'),null==e||0===e.length)return this.$element.val();e=e[0];Array.isArray(e)&&(e=e.map(function(e){return e.toString()})),this.$element.val(e).trigger("input").trigger("change")},o.prototype.destroy=function(){r.RemoveData(this.$container[0]),this.$container.remove(),this._observer.disconnect(),this._observer=null,this._syncA=null,this._syncS=null,this.$element.off(".select2"),this.$element.attr("tabindex",r.GetData(this.$element[0],"old-tabindex")),this.$element[0].classList.remove("select2-hidden-accessible"),this.$element.attr("aria-hidden","false"),r.RemoveData(this.$element[0]),this.$element.removeData("select2"),this.dataAdapter.destroy(),this.selection.destroy(),this.dropdown.destroy(),this.results.destroy(),this.dataAdapter=null,this.selection=null,this.dropdown=null,this.results=null},o.prototype.render=function(){var e=t('<span class="select2 select2-container"><span class="selection"></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>');return e.attr("dir",this.options.get("dir")),this.$container=e,this.$container[0].classList.add("select2-container--"+this.options.get("theme")),r.StoreData(e[0],"element",this.$element),e},o}),u.define("jquery-mousewheel",["jquery"],function(e){return e}),u.define("jquery.select2",["jquery","jquery-mousewheel","./select2/core","./select2/defaults","./select2/utils"],function(i,e,r,t,o){var a;return null==i.fn.select2&&(a=["open","close","destroy"],i.fn.select2=function(t){if("object"==typeof(t=t||{}))return this.each(function(){var e=i.extend(!0,{},t);new r(i(this),e)}),this;if("string"!=typeof t)throw new Error("Invalid arguments for Select2: "+t);var n,s=Array.prototype.slice.call(arguments,1);return this.each(function(){var e=o.GetData(this,"select2");null==e&&window.console&&console.error&&console.error("The select2('"+t+"') method was called on an element that is not using Select2."),n=e[t].apply(e,s)}),-1<a.indexOf(t)?this:n}),null==i.fn.select2.defaults&&(i.fn.select2.defaults=t),r}),{define:u.define,require:u.require});function b(e,t){return i.call(e,t)}function l(e,t){var n,s,i,r,o,a,l,c,u,d,p=t&&t.split("/"),h=y.map,f=h&&h["*"]||{};if(e){for(t=(e=e.split("/")).length-1,y.nodeIdCompat&&_.test(e[t])&&(e[t]=e[t].replace(_,"")),"."===e[0].charAt(0)&&p&&(e=p.slice(0,p.length-1).concat(e)),c=0;c<e.length;c++)"."===(d=e[c])?(e.splice(c,1),--c):".."===d&&(0===c||1===c&&".."===e[2]||".."===e[c-1]||0<c&&(e.splice(c-1,2),c-=2));e=e.join("/")}if((p||f)&&h){for(c=(n=e.split("/")).length;0<c;--c){if(s=n.slice(0,c).join("/"),p)for(u=p.length;0<u;--u)if(i=h[p.slice(0,u).join("/")],i=i&&i[s]){r=i,o=c;break}if(r)break;!a&&f&&f[s]&&(a=f[s],l=c)}!r&&a&&(r=a,o=l),r&&(n.splice(0,o,r),e=n.join("/"))}return e}function w(t,n){return function(){var e=a.call(arguments,0);return"string"!=typeof e[0]&&1===e.length&&e.push(null),o.apply(p,e.concat([t,n]))}}function x(e){var t;if(b(m,e)&&(t=m[e],delete m[e],v[e]=!0,r.apply(p,t)),!b(g,e)&&!b(v,e))throw new Error("No "+e);return g[e]}function c(e){var t,n=e?e.indexOf("!"):-1;return-1<n&&(t=e.substring(0,n),e=e.substring(n+1,e.length)),[t,e]}function A(e){return e?c(e):[]}var u=s.require("jquery.select2");return t.fn.select2.amd=s,u});
/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version: 1.8.0
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

 */
/* global window, document, define, jQuery, setInterval, clearInterval */
;(function(factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports !== 'undefined') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }

}(function($) {
    'use strict';
    var Slick = window.Slick || {};

    Slick = (function() {

        var instanceUid = 0;

        function Slick(element, settings) {

            var _ = this, dataSettings;

            _.defaults = {
                accessibility: true,
                adaptiveHeight: false,
                appendArrows: $(element),
                appendDots: $(element),
                arrows: true,
                asNavFor: null,
                prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
                nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
                autoplay: false,
                autoplaySpeed: 3000,
                centerMode: false,
                centerPadding: '50px',
                cssEase: 'ease',
                customPaging: function(slider, i) {
                    return $('<button type="button" />').text(i + 1);
                },
                dots: false,
                dotsClass: 'slick-dots',
                draggable: true,
                easing: 'linear',
                edgeFriction: 0.35,
                fade: false,
                focusOnSelect: false,
                focusOnChange: false,
                infinite: true,
                initialSlide: 0,
                lazyLoad: 'ondemand',
                mobileFirst: false,
                pauseOnHover: true,
                pauseOnFocus: true,
                pauseOnDotsHover: false,
                respondTo: 'window',
                responsive: null,
                rows: 1,
                rtl: false,
                slide: '',
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: true,
                swipeToSlide: false,
                touchMove: true,
                touchThreshold: 5,
                useCSS: true,
                useTransform: true,
                variableWidth: false,
                vertical: false,
                verticalSwiping: false,
                waitForAnimate: true,
                zIndex: 1000
            };

            _.initials = {
                animating: false,
                dragging: false,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                scrolling: false,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: false,
                slideOffset: 0,
                swipeLeft: null,
                swiping: false,
                $list: null,
                touchObject: {},
                transformsEnabled: false,
                unslicked: false
            };

            $.extend(_, _.initials);

            _.activeBreakpoint = null;
            _.animType = null;
            _.animProp = null;
            _.breakpoints = [];
            _.breakpointSettings = [];
            _.cssTransitions = false;
            _.focussed = false;
            _.interrupted = false;
            _.hidden = 'hidden';
            _.paused = true;
            _.positionProp = null;
            _.respondTo = null;
            _.rowCount = 1;
            _.shouldClick = true;
            _.$slider = $(element);
            _.$slidesCache = null;
            _.transformType = null;
            _.transitionType = null;
            _.visibilityChange = 'visibilitychange';
            _.windowWidth = 0;
            _.windowTimer = null;

            dataSettings = $(element).data('slick') || {};

            _.options = $.extend({}, _.defaults, settings, dataSettings);

            _.currentSlide = _.options.initialSlide;

            _.originalSettings = _.options;

            if (typeof document.mozHidden !== 'undefined') {
                _.hidden = 'mozHidden';
                _.visibilityChange = 'mozvisibilitychange';
            } else if (typeof document.webkitHidden !== 'undefined') {
                _.hidden = 'webkitHidden';
                _.visibilityChange = 'webkitvisibilitychange';
            }

            _.autoPlay = $.proxy(_.autoPlay, _);
            _.autoPlayClear = $.proxy(_.autoPlayClear, _);
            _.autoPlayIterator = $.proxy(_.autoPlayIterator, _);
            _.changeSlide = $.proxy(_.changeSlide, _);
            _.clickHandler = $.proxy(_.clickHandler, _);
            _.selectHandler = $.proxy(_.selectHandler, _);
            _.setPosition = $.proxy(_.setPosition, _);
            _.swipeHandler = $.proxy(_.swipeHandler, _);
            _.dragHandler = $.proxy(_.dragHandler, _);
            _.keyHandler = $.proxy(_.keyHandler, _);

            _.instanceUid = instanceUid++;

            // A simple way to check for HTML strings
            // Strict HTML recognition (must start with <)
            // Extracted from jQuery v1.11 source
            _.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;


            _.registerBreakpoints();
            _.init(true);

        }

        return Slick;

    }());

    Slick.prototype.activateADA = function() {
        var _ = this;

        _.$slideTrack.find('.slick-active').attr({
            'aria-hidden': 'false'
        }).find('a, input, button, select').attr({
            'tabindex': '0'
        });

    };

    Slick.prototype.addSlide = Slick.prototype.slickAdd = function(markup, index, addBefore) {

        var _ = this;

        if (typeof(index) === 'boolean') {
            addBefore = index;
            index = null;
        } else if (index < 0 || (index >= _.slideCount)) {
            return false;
        }

        _.unload();

        if (typeof(index) === 'number') {
            if (index === 0 && _.$slides.length === 0) {
                $(markup).appendTo(_.$slideTrack);
            } else if (addBefore) {
                $(markup).insertBefore(_.$slides.eq(index));
            } else {
                $(markup).insertAfter(_.$slides.eq(index));
            }
        } else {
            if (addBefore === true) {
                $(markup).prependTo(_.$slideTrack);
            } else {
                $(markup).appendTo(_.$slideTrack);
            }
        }

        _.$slides = _.$slideTrack.children(this.options.slide);

        _.$slideTrack.children(this.options.slide).detach();

        _.$slideTrack.append(_.$slides);

        _.$slides.each(function(index, element) {
            $(element).attr('data-slick-index', index);
        });

        _.$slidesCache = _.$slides;

        _.reinit();

    };

    Slick.prototype.animateHeight = function() {
        var _ = this;
        if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
            _.$list.animate({
                height: targetHeight
            }, _.options.speed);
        }
    };

    Slick.prototype.animateSlide = function(targetLeft, callback) {

        var animProps = {},
            _ = this;

        _.animateHeight();

        if (_.options.rtl === true && _.options.vertical === false) {
            targetLeft = -targetLeft;
        }
        if (_.transformsEnabled === false) {
            if (_.options.vertical === false) {
                _.$slideTrack.animate({
                    left: targetLeft
                }, _.options.speed, _.options.easing, callback);
            } else {
                _.$slideTrack.animate({
                    top: targetLeft
                }, _.options.speed, _.options.easing, callback);
            }

        } else {

            if (_.cssTransitions === false) {
                if (_.options.rtl === true) {
                    _.currentLeft = -(_.currentLeft);
                }
                $({
                    animStart: _.currentLeft
                }).animate({
                    animStart: targetLeft
                }, {
                    duration: _.options.speed,
                    easing: _.options.easing,
                    step: function(now) {
                        now = Math.ceil(now);
                        if (_.options.vertical === false) {
                            animProps[_.animType] = 'translate(' +
                                now + 'px, 0px)';
                            _.$slideTrack.css(animProps);
                        } else {
                            animProps[_.animType] = 'translate(0px,' +
                                now + 'px)';
                            _.$slideTrack.css(animProps);
                        }
                    },
                    complete: function() {
                        if (callback) {
                            callback.call();
                        }
                    }
                });

            } else {

                _.applyTransition();
                targetLeft = Math.ceil(targetLeft);

                if (_.options.vertical === false) {
                    animProps[_.animType] = 'translate3d(' + targetLeft + 'px, 0px, 0px)';
                } else {
                    animProps[_.animType] = 'translate3d(0px,' + targetLeft + 'px, 0px)';
                }
                _.$slideTrack.css(animProps);

                if (callback) {
                    setTimeout(function() {

                        _.disableTransition();

                        callback.call();
                    }, _.options.speed);
                }

            }

        }

    };

    Slick.prototype.getNavTarget = function() {

        var _ = this,
            asNavFor = _.options.asNavFor;

        if ( asNavFor && asNavFor !== null ) {
            asNavFor = $(asNavFor).not(_.$slider);
        }

        return asNavFor;

    };

    Slick.prototype.asNavFor = function(index) {

        var _ = this,
            asNavFor = _.getNavTarget();

        if ( asNavFor !== null && typeof asNavFor === 'object' ) {
            asNavFor.each(function() {
                var target = $(this).slick('getSlick');
                if(!target.unslicked) {
                    target.slideHandler(index, true);
                }
            });
        }

    };

    Slick.prototype.applyTransition = function(slide) {

        var _ = this,
            transition = {};

        if (_.options.fade === false) {
            transition[_.transitionType] = _.transformType + ' ' + _.options.speed + 'ms ' + _.options.cssEase;
        } else {
            transition[_.transitionType] = 'opacity ' + _.options.speed + 'ms ' + _.options.cssEase;
        }

        if (_.options.fade === false) {
            _.$slideTrack.css(transition);
        } else {
            _.$slides.eq(slide).css(transition);
        }

    };

    Slick.prototype.autoPlay = function() {

        var _ = this;

        _.autoPlayClear();

        if ( _.slideCount > _.options.slidesToShow ) {
            _.autoPlayTimer = setInterval( _.autoPlayIterator, _.options.autoplaySpeed );
        }

    };

    Slick.prototype.autoPlayClear = function() {

        var _ = this;

        if (_.autoPlayTimer) {
            clearInterval(_.autoPlayTimer);
        }

    };

    Slick.prototype.autoPlayIterator = function() {

        var _ = this,
            slideTo = _.currentSlide + _.options.slidesToScroll;

        if ( !_.paused && !_.interrupted && !_.focussed ) {

            if ( _.options.infinite === false ) {

                if ( _.direction === 1 && ( _.currentSlide + 1 ) === ( _.slideCount - 1 )) {
                    _.direction = 0;
                }

                else if ( _.direction === 0 ) {

                    slideTo = _.currentSlide - _.options.slidesToScroll;

                    if ( _.currentSlide - 1 === 0 ) {
                        _.direction = 1;
                    }

                }

            }

            _.slideHandler( slideTo );

        }

    };

    Slick.prototype.buildArrows = function() {

        var _ = this;

        if (_.options.arrows === true ) {

            _.$prevArrow = $(_.options.prevArrow).addClass('slick-arrow');
            _.$nextArrow = $(_.options.nextArrow).addClass('slick-arrow');

            if( _.slideCount > _.options.slidesToShow ) {

                _.$prevArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');
                _.$nextArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');

                if (_.htmlExpr.test(_.options.prevArrow)) {
                    _.$prevArrow.prependTo(_.options.appendArrows);
                }

                if (_.htmlExpr.test(_.options.nextArrow)) {
                    _.$nextArrow.appendTo(_.options.appendArrows);
                }

                if (_.options.infinite !== true) {
                    _.$prevArrow
                        .addClass('slick-disabled')
                        .attr('aria-disabled', 'true');
                }

            } else {

                _.$prevArrow.add( _.$nextArrow )

                    .addClass('slick-hidden')
                    .attr({
                        'aria-disabled': 'true',
                        'tabindex': '-1'
                    });

            }

        }

    };

    Slick.prototype.buildDots = function() {

        var _ = this,
            i, dot;

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            _.$slider.addClass('slick-dotted');

            dot = $('<ul />').addClass(_.options.dotsClass);

            for (i = 0; i <= _.getDotCount(); i += 1) {
                dot.append($('<li />').append(_.options.customPaging.call(this, _, i)));
            }

            _.$dots = dot.appendTo(_.options.appendDots);

            _.$dots.find('li').first().addClass('slick-active');

        }

    };

    Slick.prototype.buildOut = function() {

        var _ = this;

        _.$slides =
            _.$slider
                .children( _.options.slide + ':not(.slick-cloned)')
                .addClass('slick-slide');

        _.slideCount = _.$slides.length;

        _.$slides.each(function(index, element) {
            $(element)
                .attr('data-slick-index', index)
                .data('originalStyling', $(element).attr('style') || '');
        });

        _.$slider.addClass('slick-slider');

        _.$slideTrack = (_.slideCount === 0) ?
            $('<div class="slick-track"/>').appendTo(_.$slider) :
            _.$slides.wrapAll('<div class="slick-track"/>').parent();

        _.$list = _.$slideTrack.wrap(
            '<div class="slick-list"/>').parent();
        _.$slideTrack.css('opacity', 0);

        if (_.options.centerMode === true || _.options.swipeToSlide === true) {
            _.options.slidesToScroll = 1;
        }

        $('img[data-lazy]', _.$slider).not('[src]').addClass('slick-loading');

        _.setupInfinite();

        _.buildArrows();

        _.buildDots();

        _.updateDots();


        _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

        if (_.options.draggable === true) {
            _.$list.addClass('draggable');
        }

    };

    Slick.prototype.buildRows = function() {

        var _ = this, a, b, c, newSlides, numOfSlides, originalSlides,slidesPerSection;

        newSlides = document.createDocumentFragment();
        originalSlides = _.$slider.children();

        if(_.options.rows > 0) {

            slidesPerSection = _.options.slidesPerRow * _.options.rows;
            numOfSlides = Math.ceil(
                originalSlides.length / slidesPerSection
            );

            for(a = 0; a < numOfSlides; a++){
                var slide = document.createElement('div');
                for(b = 0; b < _.options.rows; b++) {
                    var row = document.createElement('div');
                    for(c = 0; c < _.options.slidesPerRow; c++) {
                        var target = (a * slidesPerSection + ((b * _.options.slidesPerRow) + c));
                        if (originalSlides.get(target)) {
                            row.appendChild(originalSlides.get(target));
                        }
                    }
                    slide.appendChild(row);
                }
                newSlides.appendChild(slide);
            }

            _.$slider.empty().append(newSlides);
            _.$slider.children().children().children()
                .css({
                    'width':(100 / _.options.slidesPerRow) + '%',
                    'display': 'inline-block'
                });

        }

    };

    Slick.prototype.checkResponsive = function(initial, forceUpdate) {

        var _ = this,
            breakpoint, targetBreakpoint, respondToWidth, triggerBreakpoint = false;
        var sliderWidth = _.$slider.width();
        var windowWidth = window.innerWidth || $(window).width();

        if (_.respondTo === 'window') {
            respondToWidth = windowWidth;
        } else if (_.respondTo === 'slider') {
            respondToWidth = sliderWidth;
        } else if (_.respondTo === 'min') {
            respondToWidth = Math.min(windowWidth, sliderWidth);
        }

        if ( _.options.responsive &&
            _.options.responsive.length &&
            _.options.responsive !== null) {

            targetBreakpoint = null;

            for (breakpoint in _.breakpoints) {
                if (_.breakpoints.hasOwnProperty(breakpoint)) {
                    if (_.originalSettings.mobileFirst === false) {
                        if (respondToWidth < _.breakpoints[breakpoint]) {
                            targetBreakpoint = _.breakpoints[breakpoint];
                        }
                    } else {
                        if (respondToWidth > _.breakpoints[breakpoint]) {
                            targetBreakpoint = _.breakpoints[breakpoint];
                        }
                    }
                }
            }

            if (targetBreakpoint !== null) {
                if (_.activeBreakpoint !== null) {
                    if (targetBreakpoint !== _.activeBreakpoint || forceUpdate) {
                        _.activeBreakpoint =
                            targetBreakpoint;
                        if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
                            _.unslick(targetBreakpoint);
                        } else {
                            _.options = $.extend({}, _.originalSettings,
                                _.breakpointSettings[
                                    targetBreakpoint]);
                            if (initial === true) {
                                _.currentSlide = _.options.initialSlide;
                            }
                            _.refresh(initial);
                        }
                        triggerBreakpoint = targetBreakpoint;
                    }
                } else {
                    _.activeBreakpoint = targetBreakpoint;
                    if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
                        _.unslick(targetBreakpoint);
                    } else {
                        _.options = $.extend({}, _.originalSettings,
                            _.breakpointSettings[
                                targetBreakpoint]);
                        if (initial === true) {
                            _.currentSlide = _.options.initialSlide;
                        }
                        _.refresh(initial);
                    }
                    triggerBreakpoint = targetBreakpoint;
                }
            } else {
                if (_.activeBreakpoint !== null) {
                    _.activeBreakpoint = null;
                    _.options = _.originalSettings;
                    if (initial === true) {
                        _.currentSlide = _.options.initialSlide;
                    }
                    _.refresh(initial);
                    triggerBreakpoint = targetBreakpoint;
                }
            }

            // only trigger breakpoints during an actual break. not on initialize.
            if( !initial && triggerBreakpoint !== false ) {
                _.$slider.trigger('breakpoint', [_, triggerBreakpoint]);
            }
        }

    };

    Slick.prototype.changeSlide = function(event, dontAnimate) {

        var _ = this,
            $target = $(event.currentTarget),
            indexOffset, slideOffset, unevenOffset;

        // If target is a link, prevent default action.
        if($target.is('a')) {
            event.preventDefault();
        }

        // If target is not the <li> element (ie: a child), find the <li>.
        if(!$target.is('li')) {
            $target = $target.closest('li');
        }

        unevenOffset = (_.slideCount % _.options.slidesToScroll !== 0);
        indexOffset = unevenOffset ? 0 : (_.slideCount - _.currentSlide) % _.options.slidesToScroll;

        switch (event.data.message) {

            case 'previous':
                slideOffset = indexOffset === 0 ? _.options.slidesToScroll : _.options.slidesToShow - indexOffset;
                if (_.slideCount > _.options.slidesToShow) {
                    _.slideHandler(_.currentSlide - slideOffset, false, dontAnimate);
                }
                break;

            case 'next':
                slideOffset = indexOffset === 0 ? _.options.slidesToScroll : indexOffset;
                if (_.slideCount > _.options.slidesToShow) {
                    _.slideHandler(_.currentSlide + slideOffset, false, dontAnimate);
                }
                break;

            case 'index':
                var index = event.data.index === 0 ? 0 :
                    event.data.index || $target.index() * _.options.slidesToScroll;

                _.slideHandler(_.checkNavigable(index), false, dontAnimate);
                $target.children().trigger('focus');
                break;

            default:
                return;
        }

    };

    Slick.prototype.checkNavigable = function(index) {

        var _ = this,
            navigables, prevNavigable;

        navigables = _.getNavigableIndexes();
        prevNavigable = 0;
        if (index > navigables[navigables.length - 1]) {
            index = navigables[navigables.length - 1];
        } else {
            for (var n in navigables) {
                if (index < navigables[n]) {
                    index = prevNavigable;
                    break;
                }
                prevNavigable = navigables[n];
            }
        }

        return index;
    };

    Slick.prototype.cleanUpEvents = function() {

        var _ = this;

        if (_.options.dots && _.$dots !== null) {

            $('li', _.$dots)
                .off('click.slick', _.changeSlide)
                .off('mouseenter.slick', $.proxy(_.interrupt, _, true))
                .off('mouseleave.slick', $.proxy(_.interrupt, _, false));

            if (_.options.accessibility === true) {
                _.$dots.off('keydown.slick', _.keyHandler);
            }
        }

        _.$slider.off('focus.slick blur.slick');

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow && _.$prevArrow.off('click.slick', _.changeSlide);
            _.$nextArrow && _.$nextArrow.off('click.slick', _.changeSlide);

            if (_.options.accessibility === true) {
                _.$prevArrow && _.$prevArrow.off('keydown.slick', _.keyHandler);
                _.$nextArrow && _.$nextArrow.off('keydown.slick', _.keyHandler);
            }
        }

        _.$list.off('touchstart.slick mousedown.slick', _.swipeHandler);
        _.$list.off('touchmove.slick mousemove.slick', _.swipeHandler);
        _.$list.off('touchend.slick mouseup.slick', _.swipeHandler);
        _.$list.off('touchcancel.slick mouseleave.slick', _.swipeHandler);

        _.$list.off('click.slick', _.clickHandler);

        $(document).off(_.visibilityChange, _.visibility);

        _.cleanUpSlideEvents();

        if (_.options.accessibility === true) {
            _.$list.off('keydown.slick', _.keyHandler);
        }

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().off('click.slick', _.selectHandler);
        }

        $(window).off('orientationchange.slick.slick-' + _.instanceUid, _.orientationChange);

        $(window).off('resize.slick.slick-' + _.instanceUid, _.resize);

        $('[draggable!=true]', _.$slideTrack).off('dragstart', _.preventDefault);

        $(window).off('load.slick.slick-' + _.instanceUid, _.setPosition);

    };

    Slick.prototype.cleanUpSlideEvents = function() {

        var _ = this;

        _.$list.off('mouseenter.slick', $.proxy(_.interrupt, _, true));
        _.$list.off('mouseleave.slick', $.proxy(_.interrupt, _, false));

    };

    Slick.prototype.cleanUpRows = function() {

        var _ = this, originalSlides;

        if(_.options.rows > 0) {
            originalSlides = _.$slides.children().children();
            originalSlides.removeAttr('style');
            _.$slider.empty().append(originalSlides);
        }

    };

    Slick.prototype.clickHandler = function(event) {

        var _ = this;

        if (_.shouldClick === false) {
            event.stopImmediatePropagation();
            event.stopPropagation();
            event.preventDefault();
        }

    };

    Slick.prototype.destroy = function(refresh) {

        var _ = this;

        _.autoPlayClear();

        _.touchObject = {};

        _.cleanUpEvents();

        $('.slick-cloned', _.$slider).detach();

        if (_.$dots) {
            _.$dots.remove();
        }

        if ( _.$prevArrow && _.$prevArrow.length ) {

            _.$prevArrow
                .removeClass('slick-disabled slick-arrow slick-hidden')
                .removeAttr('aria-hidden aria-disabled tabindex')
                .css('display','');

            if ( _.htmlExpr.test( _.options.prevArrow )) {
                _.$prevArrow.remove();
            }
        }

        if ( _.$nextArrow && _.$nextArrow.length ) {

            _.$nextArrow
                .removeClass('slick-disabled slick-arrow slick-hidden')
                .removeAttr('aria-hidden aria-disabled tabindex')
                .css('display','');

            if ( _.htmlExpr.test( _.options.nextArrow )) {
                _.$nextArrow.remove();
            }
        }


        if (_.$slides) {

            _.$slides
                .removeClass('slick-slide slick-active slick-center slick-visible slick-current')
                .removeAttr('aria-hidden')
                .removeAttr('data-slick-index')
                .each(function(){
                    $(this).attr('style', $(this).data('originalStyling'));
                });

            _.$slideTrack.children(this.options.slide).detach();

            _.$slideTrack.detach();

            _.$list.detach();

            _.$slider.append(_.$slides);
        }

        _.cleanUpRows();

        _.$slider.removeClass('slick-slider');
        _.$slider.removeClass('slick-initialized');
        _.$slider.removeClass('slick-dotted');

        _.unslicked = true;

        if(!refresh) {
            _.$slider.trigger('destroy', [_]);
        }

    };

    Slick.prototype.disableTransition = function(slide) {

        var _ = this,
            transition = {};

        transition[_.transitionType] = '';

        if (_.options.fade === false) {
            _.$slideTrack.css(transition);
        } else {
            _.$slides.eq(slide).css(transition);
        }

    };

    Slick.prototype.fadeSlide = function(slideIndex, callback) {

        var _ = this;

        if (_.cssTransitions === false) {

            _.$slides.eq(slideIndex).css({
                zIndex: _.options.zIndex
            });

            _.$slides.eq(slideIndex).animate({
                opacity: 1
            }, _.options.speed, _.options.easing, callback);

        } else {

            _.applyTransition(slideIndex);

            _.$slides.eq(slideIndex).css({
                opacity: 1,
                zIndex: _.options.zIndex
            });

            if (callback) {
                setTimeout(function() {

                    _.disableTransition(slideIndex);

                    callback.call();
                }, _.options.speed);
            }

        }

    };

    Slick.prototype.fadeSlideOut = function(slideIndex) {

        var _ = this;

        if (_.cssTransitions === false) {

            _.$slides.eq(slideIndex).animate({
                opacity: 0,
                zIndex: _.options.zIndex - 2
            }, _.options.speed, _.options.easing);

        } else {

            _.applyTransition(slideIndex);

            _.$slides.eq(slideIndex).css({
                opacity: 0,
                zIndex: _.options.zIndex - 2
            });

        }

    };

    Slick.prototype.filterSlides = Slick.prototype.slickFilter = function(filter) {

        var _ = this;

        if (filter !== null) {

            _.$slidesCache = _.$slides;

            _.unload();

            _.$slideTrack.children(this.options.slide).detach();

            _.$slidesCache.filter(filter).appendTo(_.$slideTrack);

            _.reinit();

        }

    };

    Slick.prototype.focusHandler = function() {

        var _ = this;

        _.$slider
            .off('focus.slick blur.slick')
            .on('focus.slick blur.slick', '*', function(event) {

            event.stopImmediatePropagation();
            var $sf = $(this);

            setTimeout(function() {

                if( _.options.pauseOnFocus ) {
                    _.focussed = $sf.is(':focus');
                    _.autoPlay();
                }

            }, 0);

        });
    };

    Slick.prototype.getCurrent = Slick.prototype.slickCurrentSlide = function() {

        var _ = this;
        return _.currentSlide;

    };

    Slick.prototype.getDotCount = function() {

        var _ = this;

        var breakPoint = 0;
        var counter = 0;
        var pagerQty = 0;

        if (_.options.infinite === true) {
            if (_.slideCount <= _.options.slidesToShow) {
                 ++pagerQty;
            } else {
                while (breakPoint < _.slideCount) {
                    ++pagerQty;
                    breakPoint = counter + _.options.slidesToScroll;
                    counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
                }
            }
        } else if (_.options.centerMode === true) {
            pagerQty = _.slideCount;
        } else if(!_.options.asNavFor) {
            pagerQty = 1 + Math.ceil((_.slideCount - _.options.slidesToShow) / _.options.slidesToScroll);
        }else {
            while (breakPoint < _.slideCount) {
                ++pagerQty;
                breakPoint = counter + _.options.slidesToScroll;
                counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
            }
        }

        return pagerQty - 1;

    };

    Slick.prototype.getLeft = function(slideIndex) {

        var _ = this,
            targetLeft,
            verticalHeight,
            verticalOffset = 0,
            targetSlide,
            coef;

        _.slideOffset = 0;
        verticalHeight = _.$slides.first().outerHeight(true);

        if (_.options.infinite === true) {
            if (_.slideCount > _.options.slidesToShow) {
                _.slideOffset = (_.slideWidth * _.options.slidesToShow) * -1;
                coef = -1

                if (_.options.vertical === true && _.options.centerMode === true) {
                    if (_.options.slidesToShow === 2) {
                        coef = -1.5;
                    } else if (_.options.slidesToShow === 1) {
                        coef = -2
                    }
                }
                verticalOffset = (verticalHeight * _.options.slidesToShow) * coef;
            }
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                if (slideIndex + _.options.slidesToScroll > _.slideCount && _.slideCount > _.options.slidesToShow) {
                    if (slideIndex > _.slideCount) {
                        _.slideOffset = ((_.options.slidesToShow - (slideIndex - _.slideCount)) * _.slideWidth) * -1;
                        verticalOffset = ((_.options.slidesToShow - (slideIndex - _.slideCount)) * verticalHeight) * -1;
                    } else {
                        _.slideOffset = ((_.slideCount % _.options.slidesToScroll) * _.slideWidth) * -1;
                        verticalOffset = ((_.slideCount % _.options.slidesToScroll) * verticalHeight) * -1;
                    }
                }
            }
        } else {
            if (slideIndex + _.options.slidesToShow > _.slideCount) {
                _.slideOffset = ((slideIndex + _.options.slidesToShow) - _.slideCount) * _.slideWidth;
                verticalOffset = ((slideIndex + _.options.slidesToShow) - _.slideCount) * verticalHeight;
            }
        }

        if (_.slideCount <= _.options.slidesToShow) {
            _.slideOffset = 0;
            verticalOffset = 0;
        }

        if (_.options.centerMode === true && _.slideCount <= _.options.slidesToShow) {
            _.slideOffset = ((_.slideWidth * Math.floor(_.options.slidesToShow)) / 2) - ((_.slideWidth * _.slideCount) / 2);
        } else if (_.options.centerMode === true && _.options.infinite === true) {
            _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2) - _.slideWidth;
        } else if (_.options.centerMode === true) {
            _.slideOffset = 0;
            _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2);
        }

        if (_.options.vertical === false) {
            targetLeft = ((slideIndex * _.slideWidth) * -1) + _.slideOffset;
        } else {
            targetLeft = ((slideIndex * verticalHeight) * -1) + verticalOffset;
        }

        if (_.options.variableWidth === true) {

            if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
                targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
            } else {
                targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow);
            }

            if (_.options.rtl === true) {
                if (targetSlide[0]) {
                    targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
                } else {
                    targetLeft =  0;
                }
            } else {
                targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
            }

            if (_.options.centerMode === true) {
                if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
                    targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
                } else {
                    targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow + 1);
                }

                if (_.options.rtl === true) {
                    if (targetSlide[0]) {
                        targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
                    } else {
                        targetLeft =  0;
                    }
                } else {
                    targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
                }

                targetLeft += (_.$list.width() - targetSlide.outerWidth()) / 2;
            }
        }

        return targetLeft;

    };

    Slick.prototype.getOption = Slick.prototype.slickGetOption = function(option) {

        var _ = this;

        return _.options[option];

    };

    Slick.prototype.getNavigableIndexes = function() {

        var _ = this,
            breakPoint = 0,
            counter = 0,
            indexes = [],
            max;

        if (_.options.infinite === false) {
            max = _.slideCount;
        } else {
            breakPoint = _.options.slidesToScroll * -1;
            counter = _.options.slidesToScroll * -1;
            max = _.slideCount * 2;
        }

        while (breakPoint < max) {
            indexes.push(breakPoint);
            breakPoint = counter + _.options.slidesToScroll;
            counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
        }

        return indexes;

    };

    Slick.prototype.getSlick = function() {

        return this;

    };

    Slick.prototype.getSlideCount = function() {

        var _ = this,
            slidesTraversed, swipedSlide, centerOffset;

        centerOffset = _.options.centerMode === true ? _.slideWidth * Math.floor(_.options.slidesToShow / 2) : 0;

        if (_.options.swipeToSlide === true) {
            _.$slideTrack.find('.slick-slide').each(function(index, slide) {
                if (slide.offsetLeft - centerOffset + ($(slide).outerWidth() / 2) > (_.swipeLeft * -1)) {
                    swipedSlide = slide;
                    return false;
                }
            });

            slidesTraversed = Math.abs($(swipedSlide).attr('data-slick-index') - _.currentSlide) || 1;

            return slidesTraversed;

        } else {
            return _.options.slidesToScroll;
        }

    };

    Slick.prototype.goTo = Slick.prototype.slickGoTo = function(slide, dontAnimate) {

        var _ = this;

        _.changeSlide({
            data: {
                message: 'index',
                index: parseInt(slide)
            }
        }, dontAnimate);

    };

    Slick.prototype.init = function(creation) {

        var _ = this;

        if (!$(_.$slider).hasClass('slick-initialized')) {

            $(_.$slider).addClass('slick-initialized');

            _.buildRows();
            _.buildOut();
            _.setProps();
            _.startLoad();
            _.loadSlider();
            _.initializeEvents();
            _.updateArrows();
            _.updateDots();
            _.checkResponsive(true);
            _.focusHandler();

        }

        if (creation) {
            _.$slider.trigger('init', [_]);
        }

        if (_.options.accessibility === true) {
            _.initADA();
        }

        if ( _.options.autoplay ) {

            _.paused = false;
            _.autoPlay();

        }

    };

    Slick.prototype.initADA = function() {
        var _ = this,
                numDotGroups = Math.ceil(_.slideCount / _.options.slidesToShow),
                tabControlIndexes = _.getNavigableIndexes().filter(function(val) {
                    return (val >= 0) && (val < _.slideCount);
                });

        _.$slides.add(_.$slideTrack.find('.slick-cloned')).attr({
            'aria-hidden': 'true',
            'tabindex': '-1'
        }).find('a, input, button, select').attr({
            'tabindex': '-1'
        });

        if (_.$dots !== null) {
            _.$slides.not(_.$slideTrack.find('.slick-cloned')).each(function(i) {
                var slideControlIndex = tabControlIndexes.indexOf(i);

                $(this).attr({
                    'role': 'tabpanel',
                    'id': 'slick-slide' + _.instanceUid + i,
                    'tabindex': -1
                });

                if (slideControlIndex !== -1) {
                   var ariaButtonControl = 'slick-slide-control' + _.instanceUid + slideControlIndex
                   if ($('#' + ariaButtonControl).length) {
                     $(this).attr({
                         'aria-describedby': ariaButtonControl
                     });
                   }
                }
            });

            _.$dots.attr('role', 'tablist').find('li').each(function(i) {
                var mappedSlideIndex = tabControlIndexes[i];

                $(this).attr({
                    'role': 'presentation'
                });

                $(this).find('button').first().attr({
                    'role': 'tab',
                    'id': 'slick-slide-control' + _.instanceUid + i,
                    'aria-controls': 'slick-slide' + _.instanceUid + mappedSlideIndex,
                    'aria-label': (i + 1) + ' of ' + numDotGroups,
                    'aria-selected': null,
                    'tabindex': '-1'
                });

            }).eq(_.currentSlide).find('button').attr({
                'aria-selected': 'true',
                'tabindex': '0'
            }).end();
        }

        for (var i=_.currentSlide, max=i+_.options.slidesToShow; i < max; i++) {
          if (_.options.focusOnChange) {
            _.$slides.eq(i).attr({'tabindex': '0'});
          } else {
            _.$slides.eq(i).removeAttr('tabindex');
          }
        }

        _.activateADA();

    };

    Slick.prototype.initArrowEvents = function() {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow
               .off('click.slick')
               .on('click.slick', {
                    message: 'previous'
               }, _.changeSlide);
            _.$nextArrow
               .off('click.slick')
               .on('click.slick', {
                    message: 'next'
               }, _.changeSlide);

            if (_.options.accessibility === true) {
                _.$prevArrow.on('keydown.slick', _.keyHandler);
                _.$nextArrow.on('keydown.slick', _.keyHandler);
            }
        }

    };

    Slick.prototype.initDotEvents = function() {

        var _ = this;

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
            $('li', _.$dots).on('click.slick', {
                message: 'index'
            }, _.changeSlide);

            if (_.options.accessibility === true) {
                _.$dots.on('keydown.slick', _.keyHandler);
            }
        }

        if (_.options.dots === true && _.options.pauseOnDotsHover === true && _.slideCount > _.options.slidesToShow) {

            $('li', _.$dots)
                .on('mouseenter.slick', $.proxy(_.interrupt, _, true))
                .on('mouseleave.slick', $.proxy(_.interrupt, _, false));

        }

    };

    Slick.prototype.initSlideEvents = function() {

        var _ = this;

        if ( _.options.pauseOnHover ) {

            _.$list.on('mouseenter.slick', $.proxy(_.interrupt, _, true));
            _.$list.on('mouseleave.slick', $.proxy(_.interrupt, _, false));

        }

    };

    Slick.prototype.initializeEvents = function() {

        var _ = this;

        _.initArrowEvents();

        _.initDotEvents();
        _.initSlideEvents();

        _.$list.on('touchstart.slick mousedown.slick', {
            action: 'start'
        }, _.swipeHandler);
        _.$list.on('touchmove.slick mousemove.slick', {
            action: 'move'
        }, _.swipeHandler);
        _.$list.on('touchend.slick mouseup.slick', {
            action: 'end'
        }, _.swipeHandler);
        _.$list.on('touchcancel.slick mouseleave.slick', {
            action: 'end'
        }, _.swipeHandler);

        _.$list.on('click.slick', _.clickHandler);

        $(document).on(_.visibilityChange, $.proxy(_.visibility, _));

        if (_.options.accessibility === true) {
            _.$list.on('keydown.slick', _.keyHandler);
        }

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().on('click.slick', _.selectHandler);
        }

        $(window).on('orientationchange.slick.slick-' + _.instanceUid, $.proxy(_.orientationChange, _));

        $(window).on('resize.slick.slick-' + _.instanceUid, $.proxy(_.resize, _));

        $('[draggable!=true]', _.$slideTrack).on('dragstart', _.preventDefault);

        $(window).on('load.slick.slick-' + _.instanceUid, _.setPosition);
        $(_.setPosition);

    };

    Slick.prototype.initUI = function() {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

            _.$prevArrow.show();
            _.$nextArrow.show();

        }

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            _.$dots.show();

        }

    };

    Slick.prototype.keyHandler = function(event) {

        var _ = this;
         //Dont slide if the cursor is inside the form fields and arrow keys are pressed
        if(!event.target.tagName.match('TEXTAREA|INPUT|SELECT')) {
            if (event.keyCode === 37 && _.options.accessibility === true) {
                _.changeSlide({
                    data: {
                        message: _.options.rtl === true ? 'next' :  'previous'
                    }
                });
            } else if (event.keyCode === 39 && _.options.accessibility === true) {
                _.changeSlide({
                    data: {
                        message: _.options.rtl === true ? 'previous' : 'next'
                    }
                });
            }
        }

    };

    Slick.prototype.lazyLoad = function() {

        var _ = this,
            loadRange, cloneRange, rangeStart, rangeEnd;

        function loadImages(imagesScope) {

            $('img[data-lazy]', imagesScope).each(function() {

                var image = $(this),
                    imageSource = $(this).attr('data-lazy'),
                    imageSrcSet = $(this).attr('data-srcset'),
                    imageSizes  = $(this).attr('data-sizes') || _.$slider.attr('data-sizes'),
                    imageToLoad = document.createElement('img');

                imageToLoad.onload = function() {

                    image
                        .animate({ opacity: 0 }, 100, function() {

                            if (imageSrcSet) {
                                image
                                    .attr('srcset', imageSrcSet );

                                if (imageSizes) {
                                    image
                                        .attr('sizes', imageSizes );
                                }
                            }

                            image
                                .attr('src', imageSource)
                                .animate({ opacity: 1 }, 200, function() {
                                    image
                                        .removeAttr('data-lazy data-srcset data-sizes')
                                        .removeClass('slick-loading');
                                });
                            _.$slider.trigger('lazyLoaded', [_, image, imageSource]);
                        });

                };

                imageToLoad.onerror = function() {

                    image
                        .removeAttr( 'data-lazy' )
                        .removeClass( 'slick-loading' )
                        .addClass( 'slick-lazyload-error' );

                    _.$slider.trigger('lazyLoadError', [ _, image, imageSource ]);

                };

                imageToLoad.src = imageSource;

            });

        }

        if (_.options.centerMode === true) {
            if (_.options.infinite === true) {
                rangeStart = _.currentSlide + (_.options.slidesToShow / 2 + 1);
                rangeEnd = rangeStart + _.options.slidesToShow + 2;
            } else {
                rangeStart = Math.max(0, _.currentSlide - (_.options.slidesToShow / 2 + 1));
                rangeEnd = 2 + (_.options.slidesToShow / 2 + 1) + _.currentSlide;
            }
        } else {
            rangeStart = _.options.infinite ? _.options.slidesToShow + _.currentSlide : _.currentSlide;
            rangeEnd = Math.ceil(rangeStart + _.options.slidesToShow);
            if (_.options.fade === true) {
                if (rangeStart > 0) rangeStart--;
                if (rangeEnd <= _.slideCount) rangeEnd++;
            }
        }

        loadRange = _.$slider.find('.slick-slide').slice(rangeStart, rangeEnd);

        if (_.options.lazyLoad === 'anticipated') {
            var prevSlide = rangeStart - 1,
                nextSlide = rangeEnd,
                $slides = _.$slider.find('.slick-slide');

            for (var i = 0; i < _.options.slidesToScroll; i++) {
                if (prevSlide < 0) prevSlide = _.slideCount - 1;
                loadRange = loadRange.add($slides.eq(prevSlide));
                loadRange = loadRange.add($slides.eq(nextSlide));
                prevSlide--;
                nextSlide++;
            }
        }

        loadImages(loadRange);

        if (_.slideCount <= _.options.slidesToShow) {
            cloneRange = _.$slider.find('.slick-slide');
            loadImages(cloneRange);
        } else
        if (_.currentSlide >= _.slideCount - _.options.slidesToShow) {
            cloneRange = _.$slider.find('.slick-cloned').slice(0, _.options.slidesToShow);
            loadImages(cloneRange);
        } else if (_.currentSlide === 0) {
            cloneRange = _.$slider.find('.slick-cloned').slice(_.options.slidesToShow * -1);
            loadImages(cloneRange);
        }

    };

    Slick.prototype.loadSlider = function() {

        var _ = this;

        _.setPosition();

        _.$slideTrack.css({
            opacity: 1
        });

        _.$slider.removeClass('slick-loading');

        _.initUI();

        if (_.options.lazyLoad === 'progressive') {
            _.progressiveLazyLoad();
        }

    };

    Slick.prototype.next = Slick.prototype.slickNext = function() {

        var _ = this;

        _.changeSlide({
            data: {
                message: 'next'
            }
        });

    };

    Slick.prototype.orientationChange = function() {

        var _ = this;

        _.checkResponsive();
        _.setPosition();

    };

    Slick.prototype.pause = Slick.prototype.slickPause = function() {

        var _ = this;

        _.autoPlayClear();
        _.paused = true;

    };

    Slick.prototype.play = Slick.prototype.slickPlay = function() {

        var _ = this;

        _.autoPlay();
        _.options.autoplay = true;
        _.paused = false;
        _.focussed = false;
        _.interrupted = false;

    };

    Slick.prototype.postSlide = function(index) {

        var _ = this;

        if( !_.unslicked ) {

            _.$slider.trigger('afterChange', [_, index]);

            _.animating = false;

            if (_.slideCount > _.options.slidesToShow) {
                _.setPosition();
            }

            _.swipeLeft = null;

            if ( _.options.autoplay ) {
                _.autoPlay();
            }

            if (_.options.accessibility === true) {
                _.initADA();

                if (_.options.focusOnChange) {
                    var $currentSlide = $(_.$slides.get(_.currentSlide));
                    $currentSlide.attr('tabindex', 0).focus();
                }
            }

        }

    };

    Slick.prototype.prev = Slick.prototype.slickPrev = function() {

        var _ = this;

        _.changeSlide({
            data: {
                message: 'previous'
            }
        });

    };

    Slick.prototype.preventDefault = function(event) {

        event.preventDefault();

    };

    Slick.prototype.progressiveLazyLoad = function( tryCount ) {

        tryCount = tryCount || 1;

        var _ = this,
            $imgsToLoad = $( 'img[data-lazy]', _.$slider ),
            image,
            imageSource,
            imageSrcSet,
            imageSizes,
            imageToLoad;

        if ( $imgsToLoad.length ) {

            image = $imgsToLoad.first();
            imageSource = image.attr('data-lazy');
            imageSrcSet = image.attr('data-srcset');
            imageSizes  = image.attr('data-sizes') || _.$slider.attr('data-sizes');
            imageToLoad = document.createElement('img');

            imageToLoad.onload = function() {

                if (imageSrcSet) {
                    image
                        .attr('srcset', imageSrcSet );

                    if (imageSizes) {
                        image
                            .attr('sizes', imageSizes );
                    }
                }

                image
                    .attr( 'src', imageSource )
                    .removeAttr('data-lazy data-srcset data-sizes')
                    .removeClass('slick-loading');

                if ( _.options.adaptiveHeight === true ) {
                    _.setPosition();
                }

                _.$slider.trigger('lazyLoaded', [ _, image, imageSource ]);
                _.progressiveLazyLoad();

            };

            imageToLoad.onerror = function() {

                if ( tryCount < 3 ) {

                    /**
                     * try to load the image 3 times,
                     * leave a slight delay so we don't get
                     * servers blocking the request.
                     */
                    setTimeout( function() {
                        _.progressiveLazyLoad( tryCount + 1 );
                    }, 500 );

                } else {

                    image
                        .removeAttr( 'data-lazy' )
                        .removeClass( 'slick-loading' )
                        .addClass( 'slick-lazyload-error' );

                    _.$slider.trigger('lazyLoadError', [ _, image, imageSource ]);

                    _.progressiveLazyLoad();

                }

            };

            imageToLoad.src = imageSource;

        } else {

            _.$slider.trigger('allImagesLoaded', [ _ ]);

        }

    };

    Slick.prototype.refresh = function( initializing ) {

        var _ = this, currentSlide, lastVisibleIndex;

        lastVisibleIndex = _.slideCount - _.options.slidesToShow;

        // in non-infinite sliders, we don't want to go past the
        // last visible index.
        if( !_.options.infinite && ( _.currentSlide > lastVisibleIndex )) {
            _.currentSlide = lastVisibleIndex;
        }

        // if less slides than to show, go to start.
        if ( _.slideCount <= _.options.slidesToShow ) {
            _.currentSlide = 0;

        }

        currentSlide = _.currentSlide;

        _.destroy(true);

        $.extend(_, _.initials, { currentSlide: currentSlide });

        _.init();

        if( !initializing ) {

            _.changeSlide({
                data: {
                    message: 'index',
                    index: currentSlide
                }
            }, false);

        }

    };

    Slick.prototype.registerBreakpoints = function() {

        var _ = this, breakpoint, currentBreakpoint, l,
            responsiveSettings = _.options.responsive || null;

        if ( $.type(responsiveSettings) === 'array' && responsiveSettings.length ) {

            _.respondTo = _.options.respondTo || 'window';

            for ( breakpoint in responsiveSettings ) {

                l = _.breakpoints.length-1;

                if (responsiveSettings.hasOwnProperty(breakpoint)) {
                    currentBreakpoint = responsiveSettings[breakpoint].breakpoint;

                    // loop through the breakpoints and cut out any existing
                    // ones with the same breakpoint number, we don't want dupes.
                    while( l >= 0 ) {
                        if( _.breakpoints[l] && _.breakpoints[l] === currentBreakpoint ) {
                            _.breakpoints.splice(l,1);
                        }
                        l--;
                    }

                    _.breakpoints.push(currentBreakpoint);
                    _.breakpointSettings[currentBreakpoint] = responsiveSettings[breakpoint].settings;

                }

            }

            _.breakpoints.sort(function(a, b) {
                return ( _.options.mobileFirst ) ? a-b : b-a;
            });

        }

    };

    Slick.prototype.reinit = function() {

        var _ = this;

        _.$slides =
            _.$slideTrack
                .children(_.options.slide)
                .addClass('slick-slide');

        _.slideCount = _.$slides.length;

        if (_.currentSlide >= _.slideCount && _.currentSlide !== 0) {
            _.currentSlide = _.currentSlide - _.options.slidesToScroll;
        }

        if (_.slideCount <= _.options.slidesToShow) {
            _.currentSlide = 0;
        }

        _.registerBreakpoints();

        _.setProps();
        _.setupInfinite();
        _.buildArrows();
        _.updateArrows();
        _.initArrowEvents();
        _.buildDots();
        _.updateDots();
        _.initDotEvents();
        _.cleanUpSlideEvents();
        _.initSlideEvents();

        _.checkResponsive(false, true);

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().on('click.slick', _.selectHandler);
        }

        _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

        _.setPosition();
        _.focusHandler();

        _.paused = !_.options.autoplay;
        _.autoPlay();

        _.$slider.trigger('reInit', [_]);

    };

    Slick.prototype.resize = function() {

        var _ = this;

        if ($(window).width() !== _.windowWidth) {
            clearTimeout(_.windowDelay);
            _.windowDelay = window.setTimeout(function() {
                _.windowWidth = $(window).width();
                _.checkResponsive();
                if( !_.unslicked ) { _.setPosition(); }
            }, 50);
        }
    };

    Slick.prototype.removeSlide = Slick.prototype.slickRemove = function(index, removeBefore, removeAll) {

        var _ = this;

        if (typeof(index) === 'boolean') {
            removeBefore = index;
            index = removeBefore === true ? 0 : _.slideCount - 1;
        } else {
            index = removeBefore === true ? --index : index;
        }

        if (_.slideCount < 1 || index < 0 || index > _.slideCount - 1) {
            return false;
        }

        _.unload();

        if (removeAll === true) {
            _.$slideTrack.children().remove();
        } else {
            _.$slideTrack.children(this.options.slide).eq(index).remove();
        }

        _.$slides = _.$slideTrack.children(this.options.slide);

        _.$slideTrack.children(this.options.slide).detach();

        _.$slideTrack.append(_.$slides);

        _.$slidesCache = _.$slides;

        _.reinit();

    };

    Slick.prototype.setCSS = function(position) {

        var _ = this,
            positionProps = {},
            x, y;

        if (_.options.rtl === true) {
            position = -position;
        }
        x = _.positionProp == 'left' ? Math.ceil(position) + 'px' : '0px';
        y = _.positionProp == 'top' ? Math.ceil(position) + 'px' : '0px';

        positionProps[_.positionProp] = position;

        if (_.transformsEnabled === false) {
            _.$slideTrack.css(positionProps);
        } else {
            positionProps = {};
            if (_.cssTransitions === false) {
                positionProps[_.animType] = 'translate(' + x + ', ' + y + ')';
                _.$slideTrack.css(positionProps);
            } else {
                positionProps[_.animType] = 'translate3d(' + x + ', ' + y + ', 0px)';
                _.$slideTrack.css(positionProps);
            }
        }

    };

    Slick.prototype.setDimensions = function() {

        var _ = this;

        if (_.options.vertical === false) {
            if (_.options.centerMode === true) {
                _.$list.css({
                    padding: ('0px ' + _.options.centerPadding)
                });
            }
        } else {
            _.$list.height(_.$slides.first().outerHeight(true) * _.options.slidesToShow);
            if (_.options.centerMode === true) {
                _.$list.css({
                    padding: (_.options.centerPadding + ' 0px')
                });
            }
        }

        _.listWidth = _.$list.width();
        _.listHeight = _.$list.height();


        if (_.options.vertical === false && _.options.variableWidth === false) {
            _.slideWidth = Math.ceil(_.listWidth / _.options.slidesToShow);
            _.$slideTrack.width(Math.ceil((_.slideWidth * _.$slideTrack.children('.slick-slide').length)));

        } else if (_.options.variableWidth === true) {
            _.$slideTrack.width(5000 * _.slideCount);
        } else {
            _.slideWidth = Math.ceil(_.listWidth);
            _.$slideTrack.height(Math.ceil((_.$slides.first().outerHeight(true) * _.$slideTrack.children('.slick-slide').length)));
        }

        var offset = _.$slides.first().outerWidth(true) - _.$slides.first().width();
        if (_.options.variableWidth === false) _.$slideTrack.children('.slick-slide').width(_.slideWidth - offset);

    };

    Slick.prototype.setFade = function() {

        var _ = this,
            targetLeft;

        _.$slides.each(function(index, element) {
            targetLeft = (_.slideWidth * index) * -1;
            if (_.options.rtl === true) {
                $(element).css({
                    position: 'relative',
                    right: targetLeft,
                    top: 0,
                    zIndex: _.options.zIndex - 2,
                    opacity: 0
                });
            } else {
                $(element).css({
                    position: 'relative',
                    left: targetLeft,
                    top: 0,
                    zIndex: _.options.zIndex - 2,
                    opacity: 0
                });
            }
        });

        _.$slides.eq(_.currentSlide).css({
            zIndex: _.options.zIndex - 1,
            opacity: 1
        });

    };

    Slick.prototype.setHeight = function() {

        var _ = this;

        if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
            _.$list.css('height', targetHeight);
        }

    };

    Slick.prototype.setOption =
    Slick.prototype.slickSetOption = function() {

        /**
         * accepts arguments in format of:
         *
         *  - for changing a single option's value:
         *     .slick("setOption", option, value, refresh )
         *
         *  - for changing a set of responsive options:
         *     .slick("setOption", 'responsive', [{}, ...], refresh )
         *
         *  - for updating multiple values at once (not responsive)
         *     .slick("setOption", { 'option': value, ... }, refresh )
         */

        var _ = this, l, item, option, value, refresh = false, type;

        if( $.type( arguments[0] ) === 'object' ) {

            option =  arguments[0];
            refresh = arguments[1];
            type = 'multiple';

        } else if ( $.type( arguments[0] ) === 'string' ) {

            option =  arguments[0];
            value = arguments[1];
            refresh = arguments[2];

            if ( arguments[0] === 'responsive' && $.type( arguments[1] ) === 'array' ) {

                type = 'responsive';

            } else if ( typeof arguments[1] !== 'undefined' ) {

                type = 'single';

            }

        }

        if ( type === 'single' ) {

            _.options[option] = value;


        } else if ( type === 'multiple' ) {

            $.each( option , function( opt, val ) {

                _.options[opt] = val;

            });


        } else if ( type === 'responsive' ) {

            for ( item in value ) {

                if( $.type( _.options.responsive ) !== 'array' ) {

                    _.options.responsive = [ value[item] ];

                } else {

                    l = _.options.responsive.length-1;

                    // loop through the responsive object and splice out duplicates.
                    while( l >= 0 ) {

                        if( _.options.responsive[l].breakpoint === value[item].breakpoint ) {

                            _.options.responsive.splice(l,1);

                        }

                        l--;

                    }

                    _.options.responsive.push( value[item] );

                }

            }

        }

        if ( refresh ) {

            _.unload();
            _.reinit();

        }

    };

    Slick.prototype.setPosition = function() {

        var _ = this;

        _.setDimensions();

        _.setHeight();

        if (_.options.fade === false) {
            _.setCSS(_.getLeft(_.currentSlide));
        } else {
            _.setFade();
        }

        _.$slider.trigger('setPosition', [_]);

    };

    Slick.prototype.setProps = function() {

        var _ = this,
            bodyStyle = document.body.style;

        _.positionProp = _.options.vertical === true ? 'top' : 'left';

        if (_.positionProp === 'top') {
            _.$slider.addClass('slick-vertical');
        } else {
            _.$slider.removeClass('slick-vertical');
        }

        if (bodyStyle.WebkitTransition !== undefined ||
            bodyStyle.MozTransition !== undefined ||
            bodyStyle.msTransition !== undefined) {
            if (_.options.useCSS === true) {
                _.cssTransitions = true;
            }
        }

        if ( _.options.fade ) {
            if ( typeof _.options.zIndex === 'number' ) {
                if( _.options.zIndex < 3 ) {
                    _.options.zIndex = 3;
                }
            } else {
                _.options.zIndex = _.defaults.zIndex;
            }
        }

        if (bodyStyle.OTransform !== undefined) {
            _.animType = 'OTransform';
            _.transformType = '-o-transform';
            _.transitionType = 'OTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.MozTransform !== undefined) {
            _.animType = 'MozTransform';
            _.transformType = '-moz-transform';
            _.transitionType = 'MozTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.MozPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.webkitTransform !== undefined) {
            _.animType = 'webkitTransform';
            _.transformType = '-webkit-transform';
            _.transitionType = 'webkitTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.msTransform !== undefined) {
            _.animType = 'msTransform';
            _.transformType = '-ms-transform';
            _.transitionType = 'msTransition';
            if (bodyStyle.msTransform === undefined) _.animType = false;
        }
        if (bodyStyle.transform !== undefined && _.animType !== false) {
            _.animType = 'transform';
            _.transformType = 'transform';
            _.transitionType = 'transition';
        }
        _.transformsEnabled = _.options.useTransform && (_.animType !== null && _.animType !== false);
    };


    Slick.prototype.setSlideClasses = function(index) {

        var _ = this,
            centerOffset, allSlides, indexOffset, remainder;

        allSlides = _.$slider
            .find('.slick-slide')
            .removeClass('slick-active slick-center slick-current')
            .attr('aria-hidden', 'true');

        _.$slides
            .eq(index)
            .addClass('slick-current');

        if (_.options.centerMode === true) {

            var evenCoef = _.options.slidesToShow % 2 === 0 ? 1 : 0;

            centerOffset = Math.floor(_.options.slidesToShow / 2);

            if (_.options.infinite === true) {

                if (index >= centerOffset && index <= (_.slideCount - 1) - centerOffset) {
                    _.$slides
                        .slice(index - centerOffset + evenCoef, index + centerOffset + 1)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                } else {

                    indexOffset = _.options.slidesToShow + index;
                    allSlides
                        .slice(indexOffset - centerOffset + 1 + evenCoef, indexOffset + centerOffset + 2)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                }

                if (index === 0) {

                    allSlides
                        .eq(allSlides.length - 1 - _.options.slidesToShow)
                        .addClass('slick-center');

                } else if (index === _.slideCount - 1) {

                    allSlides
                        .eq(_.options.slidesToShow)
                        .addClass('slick-center');

                }

            }

            _.$slides
                .eq(index)
                .addClass('slick-center');

        } else {

            if (index >= 0 && index <= (_.slideCount - _.options.slidesToShow)) {

                _.$slides
                    .slice(index, index + _.options.slidesToShow)
                    .addClass('slick-active')
                    .attr('aria-hidden', 'false');

            } else if (allSlides.length <= _.options.slidesToShow) {

                allSlides
                    .addClass('slick-active')
                    .attr('aria-hidden', 'false');

            } else {

                remainder = _.slideCount % _.options.slidesToShow;
                indexOffset = _.options.infinite === true ? _.options.slidesToShow + index : index;

                if (_.options.slidesToShow == _.options.slidesToScroll && (_.slideCount - index) < _.options.slidesToShow) {

                    allSlides
                        .slice(indexOffset - (_.options.slidesToShow - remainder), indexOffset + remainder)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                } else {

                    allSlides
                        .slice(indexOffset, indexOffset + _.options.slidesToShow)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                }

            }

        }

        if (_.options.lazyLoad === 'ondemand' || _.options.lazyLoad === 'anticipated') {
            _.lazyLoad();
        }
    };

    Slick.prototype.setupInfinite = function() {

        var _ = this,
            i, slideIndex, infiniteCount;

        if (_.options.fade === true) {
            _.options.centerMode = false;
        }

        if (_.options.infinite === true && _.options.fade === false) {

            slideIndex = null;

            if (_.slideCount > _.options.slidesToShow) {

                if (_.options.centerMode === true) {
                    infiniteCount = _.options.slidesToShow + 1;
                } else {
                    infiniteCount = _.options.slidesToShow;
                }

                for (i = _.slideCount; i > (_.slideCount -
                        infiniteCount); i -= 1) {
                    slideIndex = i - 1;
                    $(_.$slides[slideIndex]).clone(true).attr('id', '')
                        .attr('data-slick-index', slideIndex - _.slideCount)
                        .prependTo(_.$slideTrack).addClass('slick-cloned');
                }
                for (i = 0; i < infiniteCount  + _.slideCount; i += 1) {
                    slideIndex = i;
                    $(_.$slides[slideIndex]).clone(true).attr('id', '')
                        .attr('data-slick-index', slideIndex + _.slideCount)
                        .appendTo(_.$slideTrack).addClass('slick-cloned');
                }
                _.$slideTrack.find('.slick-cloned').find('[id]').each(function() {
                    $(this).attr('id', '');
                });

            }

        }

    };

    Slick.prototype.interrupt = function( toggle ) {

        var _ = this;

        if( !toggle ) {
            _.autoPlay();
        }
        _.interrupted = toggle;

    };

    Slick.prototype.selectHandler = function(event) {

        var _ = this;

        var targetElement =
            $(event.target).is('.slick-slide') ?
                $(event.target) :
                $(event.target).parents('.slick-slide');

        var index = parseInt(targetElement.attr('data-slick-index'));

        if (!index) index = 0;

        if (_.slideCount <= _.options.slidesToShow) {

            _.slideHandler(index, false, true);
            return;

        }

        _.slideHandler(index);

    };

    Slick.prototype.slideHandler = function(index, sync, dontAnimate) {

        var targetSlide, animSlide, oldSlide, slideLeft, targetLeft = null,
            _ = this, navTarget;

        sync = sync || false;

        if (_.animating === true && _.options.waitForAnimate === true) {
            return;
        }

        if (_.options.fade === true && _.currentSlide === index) {
            return;
        }

        if (sync === false) {
            _.asNavFor(index);
        }

        targetSlide = index;
        targetLeft = _.getLeft(targetSlide);
        slideLeft = _.getLeft(_.currentSlide);

        _.currentLeft = _.swipeLeft === null ? slideLeft : _.swipeLeft;

        if (_.options.infinite === false && _.options.centerMode === false && (index < 0 || index > _.getDotCount() * _.options.slidesToScroll)) {
            if (_.options.fade === false) {
                targetSlide = _.currentSlide;
                if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
                    _.animateSlide(slideLeft, function() {
                        _.postSlide(targetSlide);
                    });
                } else {
                    _.postSlide(targetSlide);
                }
            }
            return;
        } else if (_.options.infinite === false && _.options.centerMode === true && (index < 0 || index > (_.slideCount - _.options.slidesToScroll))) {
            if (_.options.fade === false) {
                targetSlide = _.currentSlide;
                if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
                    _.animateSlide(slideLeft, function() {
                        _.postSlide(targetSlide);
                    });
                } else {
                    _.postSlide(targetSlide);
                }
            }
            return;
        }

        if ( _.options.autoplay ) {
            clearInterval(_.autoPlayTimer);
        }

        if (targetSlide < 0) {
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                animSlide = _.slideCount - (_.slideCount % _.options.slidesToScroll);
            } else {
                animSlide = _.slideCount + targetSlide;
            }
        } else if (targetSlide >= _.slideCount) {
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                animSlide = 0;
            } else {
                animSlide = targetSlide - _.slideCount;
            }
        } else {
            animSlide = targetSlide;
        }

        _.animating = true;

        _.$slider.trigger('beforeChange', [_, _.currentSlide, animSlide]);

        oldSlide = _.currentSlide;
        _.currentSlide = animSlide;

        _.setSlideClasses(_.currentSlide);

        if ( _.options.asNavFor ) {

            navTarget = _.getNavTarget();
            navTarget = navTarget.slick('getSlick');

            if ( navTarget.slideCount <= navTarget.options.slidesToShow ) {
                navTarget.setSlideClasses(_.currentSlide);
            }

        }

        _.updateDots();
        _.updateArrows();

        if (_.options.fade === true) {
            if (dontAnimate !== true) {

                _.fadeSlideOut(oldSlide);

                _.fadeSlide(animSlide, function() {
                    _.postSlide(animSlide);
                });

            } else {
                _.postSlide(animSlide);
            }
            _.animateHeight();
            return;
        }

        if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
            _.animateSlide(targetLeft, function() {
                _.postSlide(animSlide);
            });
        } else {
            _.postSlide(animSlide);
        }

    };

    Slick.prototype.startLoad = function() {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

            _.$prevArrow.hide();
            _.$nextArrow.hide();

        }

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            _.$dots.hide();

        }

        _.$slider.addClass('slick-loading');

    };

    Slick.prototype.swipeDirection = function() {

        var xDist, yDist, r, swipeAngle, _ = this;

        xDist = _.touchObject.startX - _.touchObject.curX;
        yDist = _.touchObject.startY - _.touchObject.curY;
        r = Math.atan2(yDist, xDist);

        swipeAngle = Math.round(r * 180 / Math.PI);
        if (swipeAngle < 0) {
            swipeAngle = 360 - Math.abs(swipeAngle);
        }

        if ((swipeAngle <= 45) && (swipeAngle >= 0)) {
            return (_.options.rtl === false ? 'left' : 'right');
        }
        if ((swipeAngle <= 360) && (swipeAngle >= 315)) {
            return (_.options.rtl === false ? 'left' : 'right');
        }
        if ((swipeAngle >= 135) && (swipeAngle <= 225)) {
            return (_.options.rtl === false ? 'right' : 'left');
        }
        if (_.options.verticalSwiping === true) {
            if ((swipeAngle >= 35) && (swipeAngle <= 135)) {
                return 'down';
            } else {
                return 'up';
            }
        }

        return 'vertical';

    };

    Slick.prototype.swipeEnd = function(event) {

        var _ = this,
            slideCount,
            direction;

        _.dragging = false;
        _.swiping = false;

        if (_.scrolling) {
            _.scrolling = false;
            return false;
        }

        _.interrupted = false;
        _.shouldClick = ( _.touchObject.swipeLength > 10 ) ? false : true;

        if ( _.touchObject.curX === undefined ) {
            return false;
        }

        if ( _.touchObject.edgeHit === true ) {
            _.$slider.trigger('edge', [_, _.swipeDirection() ]);
        }

        if ( _.touchObject.swipeLength >= _.touchObject.minSwipe ) {

            direction = _.swipeDirection();

            switch ( direction ) {

                case 'left':
                case 'down':

                    slideCount =
                        _.options.swipeToSlide ?
                            _.checkNavigable( _.currentSlide + _.getSlideCount() ) :
                            _.currentSlide + _.getSlideCount();

                    _.currentDirection = 0;

                    break;

                case 'right':
                case 'up':

                    slideCount =
                        _.options.swipeToSlide ?
                            _.checkNavigable( _.currentSlide - _.getSlideCount() ) :
                            _.currentSlide - _.getSlideCount();

                    _.currentDirection = 1;

                    break;

                default:


            }

            if( direction != 'vertical' ) {

                _.slideHandler( slideCount );
                _.touchObject = {};
                _.$slider.trigger('swipe', [_, direction ]);

            }

        } else {

            if ( _.touchObject.startX !== _.touchObject.curX ) {

                _.slideHandler( _.currentSlide );
                _.touchObject = {};

            }

        }

    };

    Slick.prototype.swipeHandler = function(event) {

        var _ = this;

        if ((_.options.swipe === false) || ('ontouchend' in document && _.options.swipe === false)) {
            return;
        } else if (_.options.draggable === false && event.type.indexOf('mouse') !== -1) {
            return;
        }

        _.touchObject.fingerCount = event.originalEvent && event.originalEvent.touches !== undefined ?
            event.originalEvent.touches.length : 1;

        _.touchObject.minSwipe = _.listWidth / _.options
            .touchThreshold;

        if (_.options.verticalSwiping === true) {
            _.touchObject.minSwipe = _.listHeight / _.options
                .touchThreshold;
        }

        switch (event.data.action) {

            case 'start':
                _.swipeStart(event);
                break;

            case 'move':
                _.swipeMove(event);
                break;

            case 'end':
                _.swipeEnd(event);
                break;

        }

    };

    Slick.prototype.swipeMove = function(event) {

        var _ = this,
            edgeWasHit = false,
            curLeft, swipeDirection, swipeLength, positionOffset, touches, verticalSwipeLength;

        touches = event.originalEvent !== undefined ? event.originalEvent.touches : null;

        if (!_.dragging || _.scrolling || touches && touches.length !== 1) {
            return false;
        }

        curLeft = _.getLeft(_.currentSlide);

        _.touchObject.curX = touches !== undefined ? touches[0].pageX : event.clientX;
        _.touchObject.curY = touches !== undefined ? touches[0].pageY : event.clientY;

        _.touchObject.swipeLength = Math.round(Math.sqrt(
            Math.pow(_.touchObject.curX - _.touchObject.startX, 2)));

        verticalSwipeLength = Math.round(Math.sqrt(
            Math.pow(_.touchObject.curY - _.touchObject.startY, 2)));

        if (!_.options.verticalSwiping && !_.swiping && verticalSwipeLength > 4) {
            _.scrolling = true;
            return false;
        }

        if (_.options.verticalSwiping === true) {
            _.touchObject.swipeLength = verticalSwipeLength;
        }

        swipeDirection = _.swipeDirection();

        if (event.originalEvent !== undefined && _.touchObject.swipeLength > 4) {
            _.swiping = true;
            event.preventDefault();
        }

        positionOffset = (_.options.rtl === false ? 1 : -1) * (_.touchObject.curX > _.touchObject.startX ? 1 : -1);
        if (_.options.verticalSwiping === true) {
            positionOffset = _.touchObject.curY > _.touchObject.startY ? 1 : -1;
        }


        swipeLength = _.touchObject.swipeLength;

        _.touchObject.edgeHit = false;

        if (_.options.infinite === false) {
            if ((_.currentSlide === 0 && swipeDirection === 'right') || (_.currentSlide >= _.getDotCount() && swipeDirection === 'left')) {
                swipeLength = _.touchObject.swipeLength * _.options.edgeFriction;
                _.touchObject.edgeHit = true;
            }
        }

        if (_.options.vertical === false) {
            _.swipeLeft = curLeft + swipeLength * positionOffset;
        } else {
            _.swipeLeft = curLeft + (swipeLength * (_.$list.height() / _.listWidth)) * positionOffset;
        }
        if (_.options.verticalSwiping === true) {
            _.swipeLeft = curLeft + swipeLength * positionOffset;
        }

        if (_.options.fade === true || _.options.touchMove === false) {
            return false;
        }

        if (_.animating === true) {
            _.swipeLeft = null;
            return false;
        }

        _.setCSS(_.swipeLeft);

    };

    Slick.prototype.swipeStart = function(event) {

        var _ = this,
            touches;

        _.interrupted = true;

        if (_.touchObject.fingerCount !== 1 || _.slideCount <= _.options.slidesToShow) {
            _.touchObject = {};
            return false;
        }

        if (event.originalEvent !== undefined && event.originalEvent.touches !== undefined) {
            touches = event.originalEvent.touches[0];
        }

        _.touchObject.startX = _.touchObject.curX = touches !== undefined ? touches.pageX : event.clientX;
        _.touchObject.startY = _.touchObject.curY = touches !== undefined ? touches.pageY : event.clientY;

        _.dragging = true;

    };

    Slick.prototype.unfilterSlides = Slick.prototype.slickUnfilter = function() {

        var _ = this;

        if (_.$slidesCache !== null) {

            _.unload();

            _.$slideTrack.children(this.options.slide).detach();

            _.$slidesCache.appendTo(_.$slideTrack);

            _.reinit();

        }

    };

    Slick.prototype.unload = function() {

        var _ = this;

        $('.slick-cloned', _.$slider).remove();

        if (_.$dots) {
            _.$dots.remove();
        }

        if (_.$prevArrow && _.htmlExpr.test(_.options.prevArrow)) {
            _.$prevArrow.remove();
        }

        if (_.$nextArrow && _.htmlExpr.test(_.options.nextArrow)) {
            _.$nextArrow.remove();
        }

        _.$slides
            .removeClass('slick-slide slick-active slick-visible slick-current')
            .attr('aria-hidden', 'true')
            .css('width', '');

    };

    Slick.prototype.unslick = function(fromBreakpoint) {

        var _ = this;
        _.$slider.trigger('unslick', [_, fromBreakpoint]);
        _.destroy();

    };

    Slick.prototype.updateArrows = function() {

        var _ = this,
            centerOffset;

        centerOffset = Math.floor(_.options.slidesToShow / 2);

        if ( _.options.arrows === true &&
            _.slideCount > _.options.slidesToShow &&
            !_.options.infinite ) {

            _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
            _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            if (_.currentSlide === 0) {

                _.$prevArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            } else if (_.currentSlide >= _.slideCount - _.options.slidesToShow && _.options.centerMode === false) {

                _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            } else if (_.currentSlide >= _.slideCount - 1 && _.options.centerMode === true) {

                _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            }

        }

    };

    Slick.prototype.updateDots = function() {

        var _ = this;

        if (_.$dots !== null) {

            _.$dots
                .find('li')
                    .removeClass('slick-active')
                    .end();

            _.$dots
                .find('li')
                .eq(Math.floor(_.currentSlide / _.options.slidesToScroll))
                .addClass('slick-active');

        }

    };

    Slick.prototype.visibility = function() {

        var _ = this;

        if ( _.options.autoplay ) {

            if ( document[_.hidden] ) {

                _.interrupted = true;

            } else {

                _.interrupted = false;

            }

        }

    };

    $.fn.slick = function() {
        var _ = this,
            opt = arguments[0],
            args = Array.prototype.slice.call(arguments, 1),
            l = _.length,
            i,
            ret;
        for (i = 0; i < l; i++) {
            if (typeof opt == 'object' || typeof opt == 'undefined')
                _[i].slick = new Slick(_[i], opt);
            else
                ret = _[i].slick[opt].apply(_[i].slick, args);
            if (typeof ret != 'undefined') return ret;
        }
        return _;
    };

}));

!function(i){"use strict";"function"==typeof define&&define.amd?define(["jquery"],i):"undefined"!=typeof exports?module.exports=i(require("jquery")):i(jQuery)}(function(i){"use strict";var e=window.Slick||{};(e=function(){var e=0;return function(t,o){var s,n=this;n.defaults={accessibility:!0,adaptiveHeight:!1,appendArrows:i(t),appendDots:i(t),arrows:!0,asNavFor:null,prevArrow:'<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',nextArrow:'<button class="slick-next" aria-label="Next" type="button">Next</button>',autoplay:!1,autoplaySpeed:3e3,centerMode:!1,centerPadding:"50px",cssEase:"ease",customPaging:function(e,t){return i('<button type="button" />').text(t+1)},dots:!1,dotsClass:"slick-dots",draggable:!0,easing:"linear",edgeFriction:.35,fade:!1,focusOnSelect:!1,focusOnChange:!1,infinite:!0,initialSlide:0,lazyLoad:"ondemand",mobileFirst:!1,pauseOnHover:!0,pauseOnFocus:!0,pauseOnDotsHover:!1,respondTo:"window",responsive:null,rows:1,rtl:!1,slide:"",slidesPerRow:1,slidesToShow:1,slidesToScroll:1,speed:500,swipe:!0,swipeToSlide:!1,touchMove:!0,touchThreshold:5,useCSS:!0,useTransform:!0,variableWidth:!1,vertical:!1,verticalSwiping:!1,waitForAnimate:!0,zIndex:1e3},n.initials={animating:!1,dragging:!1,autoPlayTimer:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,scrolling:!1,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:!1,slideOffset:0,swipeLeft:null,swiping:!1,$list:null,touchObject:{},transformsEnabled:!1,unslicked:!1},i.extend(n,n.initials),n.activeBreakpoint=null,n.animType=null,n.animProp=null,n.breakpoints=[],n.breakpointSettings=[],n.cssTransitions=!1,n.focussed=!1,n.interrupted=!1,n.hidden="hidden",n.paused=!0,n.positionProp=null,n.respondTo=null,n.rowCount=1,n.shouldClick=!0,n.$slider=i(t),n.$slidesCache=null,n.transformType=null,n.transitionType=null,n.visibilityChange="visibilitychange",n.windowWidth=0,n.windowTimer=null,s=i(t).data("slick")||{},n.options=i.extend({},n.defaults,o,s),n.currentSlide=n.options.initialSlide,n.originalSettings=n.options,void 0!==document.mozHidden?(n.hidden="mozHidden",n.visibilityChange="mozvisibilitychange"):void 0!==document.webkitHidden&&(n.hidden="webkitHidden",n.visibilityChange="webkitvisibilitychange"),n.autoPlay=i.proxy(n.autoPlay,n),n.autoPlayClear=i.proxy(n.autoPlayClear,n),n.autoPlayIterator=i.proxy(n.autoPlayIterator,n),n.changeSlide=i.proxy(n.changeSlide,n),n.clickHandler=i.proxy(n.clickHandler,n),n.selectHandler=i.proxy(n.selectHandler,n),n.setPosition=i.proxy(n.setPosition,n),n.swipeHandler=i.proxy(n.swipeHandler,n),n.dragHandler=i.proxy(n.dragHandler,n),n.keyHandler=i.proxy(n.keyHandler,n),n.instanceUid=e++,n.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/,n.registerBreakpoints(),n.init(!0)}}()).prototype.activateADA=function(){this.$slideTrack.find(".slick-active").attr({"aria-hidden":"false"}).find("a, input, button, select").attr({tabindex:"0"})},e.prototype.addSlide=e.prototype.slickAdd=function(e,t,o){var s=this;if("boolean"==typeof t)o=t,t=null;else if(t<0||t>=s.slideCount)return!1;s.unload(),"number"==typeof t?0===t&&0===s.$slides.length?i(e).appendTo(s.$slideTrack):o?i(e).insertBefore(s.$slides.eq(t)):i(e).insertAfter(s.$slides.eq(t)):!0===o?i(e).prependTo(s.$slideTrack):i(e).appendTo(s.$slideTrack),s.$slides=s.$slideTrack.children(this.options.slide),s.$slideTrack.children(this.options.slide).detach(),s.$slideTrack.append(s.$slides),s.$slides.each(function(e,t){i(t).attr("data-slick-index",e)}),s.$slidesCache=s.$slides,s.reinit()},e.prototype.animateHeight=function(){var i=this;if(1===i.options.slidesToShow&&!0===i.options.adaptiveHeight&&!1===i.options.vertical){var e=i.$slides.eq(i.currentSlide).outerHeight(!0);i.$list.animate({height:e},i.options.speed)}},e.prototype.animateSlide=function(e,t){var o={},s=this;s.animateHeight(),!0===s.options.rtl&&!1===s.options.vertical&&(e=-e),!1===s.transformsEnabled?!1===s.options.vertical?s.$slideTrack.animate({left:e},s.options.speed,s.options.easing,t):s.$slideTrack.animate({top:e},s.options.speed,s.options.easing,t):!1===s.cssTransitions?(!0===s.options.rtl&&(s.currentLeft=-s.currentLeft),i({animStart:s.currentLeft}).animate({animStart:e},{duration:s.options.speed,easing:s.options.easing,step:function(i){i=Math.ceil(i),!1===s.options.vertical?(o[s.animType]="translate("+i+"px, 0px)",s.$slideTrack.css(o)):(o[s.animType]="translate(0px,"+i+"px)",s.$slideTrack.css(o))},complete:function(){t&&t.call()}})):(s.applyTransition(),e=Math.ceil(e),!1===s.options.vertical?o[s.animType]="translate3d("+e+"px, 0px, 0px)":o[s.animType]="translate3d(0px,"+e+"px, 0px)",s.$slideTrack.css(o),t&&setTimeout(function(){s.disableTransition(),t.call()},s.options.speed))},e.prototype.getNavTarget=function(){var e=this,t=e.options.asNavFor;return t&&null!==t&&(t=i(t).not(e.$slider)),t},e.prototype.asNavFor=function(e){var t=this.getNavTarget();null!==t&&"object"==typeof t&&t.each(function(){var t=i(this).slick("getSlick");t.unslicked||t.slideHandler(e,!0)})},e.prototype.applyTransition=function(i){var e=this,t={};!1===e.options.fade?t[e.transitionType]=e.transformType+" "+e.options.speed+"ms "+e.options.cssEase:t[e.transitionType]="opacity "+e.options.speed+"ms "+e.options.cssEase,!1===e.options.fade?e.$slideTrack.css(t):e.$slides.eq(i).css(t)},e.prototype.autoPlay=function(){var i=this;i.autoPlayClear(),i.slideCount>i.options.slidesToShow&&(i.autoPlayTimer=setInterval(i.autoPlayIterator,i.options.autoplaySpeed))},e.prototype.autoPlayClear=function(){var i=this;i.autoPlayTimer&&clearInterval(i.autoPlayTimer)},e.prototype.autoPlayIterator=function(){var i=this,e=i.currentSlide+i.options.slidesToScroll;i.paused||i.interrupted||i.focussed||(!1===i.options.infinite&&(1===i.direction&&i.currentSlide+1===i.slideCount-1?i.direction=0:0===i.direction&&(e=i.currentSlide-i.options.slidesToScroll,i.currentSlide-1==0&&(i.direction=1))),i.slideHandler(e))},e.prototype.buildArrows=function(){var e=this;!0===e.options.arrows&&(e.$prevArrow=i(e.options.prevArrow).addClass("slick-arrow"),e.$nextArrow=i(e.options.nextArrow).addClass("slick-arrow"),e.slideCount>e.options.slidesToShow?(e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),e.htmlExpr.test(e.options.prevArrow)&&e.$prevArrow.prependTo(e.options.appendArrows),e.htmlExpr.test(e.options.nextArrow)&&e.$nextArrow.appendTo(e.options.appendArrows),!0!==e.options.infinite&&e.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true")):e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({"aria-disabled":"true",tabindex:"-1"}))},e.prototype.buildDots=function(){var e,t,o=this;if(!0===o.options.dots){for(o.$slider.addClass("slick-dotted"),t=i("<ul />").addClass(o.options.dotsClass),e=0;e<=o.getDotCount();e+=1)t.append(i("<li />").append(o.options.customPaging.call(this,o,e)));o.$dots=t.appendTo(o.options.appendDots),o.$dots.find("li").first().addClass("slick-active")}},e.prototype.buildOut=function(){var e=this;e.$slides=e.$slider.children(e.options.slide+":not(.slick-cloned)").addClass("slick-slide"),e.slideCount=e.$slides.length,e.$slides.each(function(e,t){i(t).attr("data-slick-index",e).data("originalStyling",i(t).attr("style")||"")}),e.$slider.addClass("slick-slider"),e.$slideTrack=0===e.slideCount?i('<div class="slick-track"/>').appendTo(e.$slider):e.$slides.wrapAll('<div class="slick-track"/>').parent(),e.$list=e.$slideTrack.wrap('<div class="slick-list"/>').parent(),e.$slideTrack.css("opacity",0),!0!==e.options.centerMode&&!0!==e.options.swipeToSlide||(e.options.slidesToScroll=1),i("img[data-lazy]",e.$slider).not("[src]").addClass("slick-loading"),e.setupInfinite(),e.buildArrows(),e.buildDots(),e.updateDots(),e.setSlideClasses("number"==typeof e.currentSlide?e.currentSlide:0),!0===e.options.draggable&&e.$list.addClass("draggable")},e.prototype.buildRows=function(){var i,e,t,o,s,n,r,l=this;if(o=document.createDocumentFragment(),n=l.$slider.children(),l.options.rows>1){for(r=l.options.slidesPerRow*l.options.rows,s=Math.ceil(n.length/r),i=0;i<s;i++){var d=document.createElement("div");for(e=0;e<l.options.rows;e++){var a=document.createElement("div");for(t=0;t<l.options.slidesPerRow;t++){var c=i*r+(e*l.options.slidesPerRow+t);n.get(c)&&a.appendChild(n.get(c))}d.appendChild(a)}o.appendChild(d)}l.$slider.empty().append(o),l.$slider.children().children().children().css({width:100/l.options.slidesPerRow+"%",display:"inline-block"})}},e.prototype.checkResponsive=function(e,t){var o,s,n,r=this,l=!1,d=r.$slider.width(),a=window.innerWidth||i(window).width();if("window"===r.respondTo?n=a:"slider"===r.respondTo?n=d:"min"===r.respondTo&&(n=Math.min(a,d)),r.options.responsive&&r.options.responsive.length&&null!==r.options.responsive){s=null;for(o in r.breakpoints)r.breakpoints.hasOwnProperty(o)&&(!1===r.originalSettings.mobileFirst?n<r.breakpoints[o]&&(s=r.breakpoints[o]):n>r.breakpoints[o]&&(s=r.breakpoints[o]));null!==s?null!==r.activeBreakpoint?(s!==r.activeBreakpoint||t)&&(r.activeBreakpoint=s,"unslick"===r.breakpointSettings[s]?r.unslick(s):(r.options=i.extend({},r.originalSettings,r.breakpointSettings[s]),!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e)),l=s):(r.activeBreakpoint=s,"unslick"===r.breakpointSettings[s]?r.unslick(s):(r.options=i.extend({},r.originalSettings,r.breakpointSettings[s]),!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e)),l=s):null!==r.activeBreakpoint&&(r.activeBreakpoint=null,r.options=r.originalSettings,!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e),l=s),e||!1===l||r.$slider.trigger("breakpoint",[r,l])}},e.prototype.changeSlide=function(e,t){var o,s,n,r=this,l=i(e.currentTarget);switch(l.is("a")&&e.preventDefault(),l.is("li")||(l=l.closest("li")),n=r.slideCount%r.options.slidesToScroll!=0,o=n?0:(r.slideCount-r.currentSlide)%r.options.slidesToScroll,e.data.message){case"previous":s=0===o?r.options.slidesToScroll:r.options.slidesToShow-o,r.slideCount>r.options.slidesToShow&&r.slideHandler(r.currentSlide-s,!1,t);break;case"next":s=0===o?r.options.slidesToScroll:o,r.slideCount>r.options.slidesToShow&&r.slideHandler(r.currentSlide+s,!1,t);break;case"index":var d=0===e.data.index?0:e.data.index||l.index()*r.options.slidesToScroll;r.slideHandler(r.checkNavigable(d),!1,t),l.children().trigger("focus");break;default:return}},e.prototype.checkNavigable=function(i){var e,t;if(e=this.getNavigableIndexes(),t=0,i>e[e.length-1])i=e[e.length-1];else for(var o in e){if(i<e[o]){i=t;break}t=e[o]}return i},e.prototype.cleanUpEvents=function(){var e=this;e.options.dots&&null!==e.$dots&&(i("li",e.$dots).off("click.slick",e.changeSlide).off("mouseenter.slick",i.proxy(e.interrupt,e,!0)).off("mouseleave.slick",i.proxy(e.interrupt,e,!1)),!0===e.options.accessibility&&e.$dots.off("keydown.slick",e.keyHandler)),e.$slider.off("focus.slick blur.slick"),!0===e.options.arrows&&e.slideCount>e.options.slidesToShow&&(e.$prevArrow&&e.$prevArrow.off("click.slick",e.changeSlide),e.$nextArrow&&e.$nextArrow.off("click.slick",e.changeSlide),!0===e.options.accessibility&&(e.$prevArrow&&e.$prevArrow.off("keydown.slick",e.keyHandler),e.$nextArrow&&e.$nextArrow.off("keydown.slick",e.keyHandler))),e.$list.off("touchstart.slick mousedown.slick",e.swipeHandler),e.$list.off("touchmove.slick mousemove.slick",e.swipeHandler),e.$list.off("touchend.slick mouseup.slick",e.swipeHandler),e.$list.off("touchcancel.slick mouseleave.slick",e.swipeHandler),e.$list.off("click.slick",e.clickHandler),i(document).off(e.visibilityChange,e.visibility),e.cleanUpSlideEvents(),!0===e.options.accessibility&&e.$list.off("keydown.slick",e.keyHandler),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().off("click.slick",e.selectHandler),i(window).off("orientationchange.slick.slick-"+e.instanceUid,e.orientationChange),i(window).off("resize.slick.slick-"+e.instanceUid,e.resize),i("[draggable!=true]",e.$slideTrack).off("dragstart",e.preventDefault),i(window).off("load.slick.slick-"+e.instanceUid,e.setPosition)},e.prototype.cleanUpSlideEvents=function(){var e=this;e.$list.off("mouseenter.slick",i.proxy(e.interrupt,e,!0)),e.$list.off("mouseleave.slick",i.proxy(e.interrupt,e,!1))},e.prototype.cleanUpRows=function(){var i,e=this;e.options.rows>1&&((i=e.$slides.children().children()).removeAttr("style"),e.$slider.empty().append(i))},e.prototype.clickHandler=function(i){!1===this.shouldClick&&(i.stopImmediatePropagation(),i.stopPropagation(),i.preventDefault())},e.prototype.destroy=function(e){var t=this;t.autoPlayClear(),t.touchObject={},t.cleanUpEvents(),i(".slick-cloned",t.$slider).detach(),t.$dots&&t.$dots.remove(),t.$prevArrow&&t.$prevArrow.length&&(t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),t.htmlExpr.test(t.options.prevArrow)&&t.$prevArrow.remove()),t.$nextArrow&&t.$nextArrow.length&&(t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),t.htmlExpr.test(t.options.nextArrow)&&t.$nextArrow.remove()),t.$slides&&(t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function(){i(this).attr("style",i(this).data("originalStyling"))}),t.$slideTrack.children(this.options.slide).detach(),t.$slideTrack.detach(),t.$list.detach(),t.$slider.append(t.$slides)),t.cleanUpRows(),t.$slider.removeClass("slick-slider"),t.$slider.removeClass("slick-initialized"),t.$slider.removeClass("slick-dotted"),t.unslicked=!0,e||t.$slider.trigger("destroy",[t])},e.prototype.disableTransition=function(i){var e=this,t={};t[e.transitionType]="",!1===e.options.fade?e.$slideTrack.css(t):e.$slides.eq(i).css(t)},e.prototype.fadeSlide=function(i,e){var t=this;!1===t.cssTransitions?(t.$slides.eq(i).css({zIndex:t.options.zIndex}),t.$slides.eq(i).animate({opacity:1},t.options.speed,t.options.easing,e)):(t.applyTransition(i),t.$slides.eq(i).css({opacity:1,zIndex:t.options.zIndex}),e&&setTimeout(function(){t.disableTransition(i),e.call()},t.options.speed))},e.prototype.fadeSlideOut=function(i){var e=this;!1===e.cssTransitions?e.$slides.eq(i).animate({opacity:0,zIndex:e.options.zIndex-2},e.options.speed,e.options.easing):(e.applyTransition(i),e.$slides.eq(i).css({opacity:0,zIndex:e.options.zIndex-2}))},e.prototype.filterSlides=e.prototype.slickFilter=function(i){var e=this;null!==i&&(e.$slidesCache=e.$slides,e.unload(),e.$slideTrack.children(this.options.slide).detach(),e.$slidesCache.filter(i).appendTo(e.$slideTrack),e.reinit())},e.prototype.focusHandler=function(){var e=this;e.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick","*",function(t){t.stopImmediatePropagation();var o=i(this);setTimeout(function(){e.options.pauseOnFocus&&(e.focussed=o.is(":focus"),e.autoPlay())},0)})},e.prototype.getCurrent=e.prototype.slickCurrentSlide=function(){return this.currentSlide},e.prototype.getDotCount=function(){var i=this,e=0,t=0,o=0;if(!0===i.options.infinite)if(i.slideCount<=i.options.slidesToShow)++o;else for(;e<i.slideCount;)++o,e=t+i.options.slidesToScroll,t+=i.options.slidesToScroll<=i.options.slidesToShow?i.options.slidesToScroll:i.options.slidesToShow;else if(!0===i.options.centerMode)o=i.slideCount;else if(i.options.asNavFor)for(;e<i.slideCount;)++o,e=t+i.options.slidesToScroll,t+=i.options.slidesToScroll<=i.options.slidesToShow?i.options.slidesToScroll:i.options.slidesToShow;else o=1+Math.ceil((i.slideCount-i.options.slidesToShow)/i.options.slidesToScroll);return o-1},e.prototype.getLeft=function(i){var e,t,o,s,n=this,r=0;return n.slideOffset=0,t=n.$slides.first().outerHeight(!0),!0===n.options.infinite?(n.slideCount>n.options.slidesToShow&&(n.slideOffset=n.slideWidth*n.options.slidesToShow*-1,s=-1,!0===n.options.vertical&&!0===n.options.centerMode&&(2===n.options.slidesToShow?s=-1.5:1===n.options.slidesToShow&&(s=-2)),r=t*n.options.slidesToShow*s),n.slideCount%n.options.slidesToScroll!=0&&i+n.options.slidesToScroll>n.slideCount&&n.slideCount>n.options.slidesToShow&&(i>n.slideCount?(n.slideOffset=(n.options.slidesToShow-(i-n.slideCount))*n.slideWidth*-1,r=(n.options.slidesToShow-(i-n.slideCount))*t*-1):(n.slideOffset=n.slideCount%n.options.slidesToScroll*n.slideWidth*-1,r=n.slideCount%n.options.slidesToScroll*t*-1))):i+n.options.slidesToShow>n.slideCount&&(n.slideOffset=(i+n.options.slidesToShow-n.slideCount)*n.slideWidth,r=(i+n.options.slidesToShow-n.slideCount)*t),n.slideCount<=n.options.slidesToShow&&(n.slideOffset=0,r=0),!0===n.options.centerMode&&n.slideCount<=n.options.slidesToShow?n.slideOffset=n.slideWidth*Math.floor(n.options.slidesToShow)/2-n.slideWidth*n.slideCount/2:!0===n.options.centerMode&&!0===n.options.infinite?n.slideOffset+=n.slideWidth*Math.floor(n.options.slidesToShow/2)-n.slideWidth:!0===n.options.centerMode&&(n.slideOffset=0,n.slideOffset+=n.slideWidth*Math.floor(n.options.slidesToShow/2)),e=!1===n.options.vertical?i*n.slideWidth*-1+n.slideOffset:i*t*-1+r,!0===n.options.variableWidth&&(o=n.slideCount<=n.options.slidesToShow||!1===n.options.infinite?n.$slideTrack.children(".slick-slide").eq(i):n.$slideTrack.children(".slick-slide").eq(i+n.options.slidesToShow),e=!0===n.options.rtl?o[0]?-1*(n.$slideTrack.width()-o[0].offsetLeft-o.width()):0:o[0]?-1*o[0].offsetLeft:0,!0===n.options.centerMode&&(o=n.slideCount<=n.options.slidesToShow||!1===n.options.infinite?n.$slideTrack.children(".slick-slide").eq(i):n.$slideTrack.children(".slick-slide").eq(i+n.options.slidesToShow+1),e=!0===n.options.rtl?o[0]?-1*(n.$slideTrack.width()-o[0].offsetLeft-o.width()):0:o[0]?-1*o[0].offsetLeft:0,e+=(n.$list.width()-o.outerWidth())/2)),e},e.prototype.getOption=e.prototype.slickGetOption=function(i){return this.options[i]},e.prototype.getNavigableIndexes=function(){var i,e=this,t=0,o=0,s=[];for(!1===e.options.infinite?i=e.slideCount:(t=-1*e.options.slidesToScroll,o=-1*e.options.slidesToScroll,i=2*e.slideCount);t<i;)s.push(t),t=o+e.options.slidesToScroll,o+=e.options.slidesToScroll<=e.options.slidesToShow?e.options.slidesToScroll:e.options.slidesToShow;return s},e.prototype.getSlick=function(){return this},e.prototype.getSlideCount=function(){var e,t,o=this;return t=!0===o.options.centerMode?o.slideWidth*Math.floor(o.options.slidesToShow/2):0,!0===o.options.swipeToSlide?(o.$slideTrack.find(".slick-slide").each(function(s,n){if(n.offsetLeft-t+i(n).outerWidth()/2>-1*o.swipeLeft)return e=n,!1}),Math.abs(i(e).attr("data-slick-index")-o.currentSlide)||1):o.options.slidesToScroll},e.prototype.goTo=e.prototype.slickGoTo=function(i,e){this.changeSlide({data:{message:"index",index:parseInt(i)}},e)},e.prototype.init=function(e){var t=this;i(t.$slider).hasClass("slick-initialized")||(i(t.$slider).addClass("slick-initialized"),t.buildRows(),t.buildOut(),t.setProps(),t.startLoad(),t.loadSlider(),t.initializeEvents(),t.updateArrows(),t.updateDots(),t.checkResponsive(!0),t.focusHandler()),e&&t.$slider.trigger("init",[t]),!0===t.options.accessibility&&t.initADA(),t.options.autoplay&&(t.paused=!1,t.autoPlay())},e.prototype.initADA=function(){var e=this,t=Math.ceil(e.slideCount/e.options.slidesToShow),o=e.getNavigableIndexes().filter(function(i){return i>=0&&i<e.slideCount});e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({"aria-hidden":"true",tabindex:"-1"}).find("a, input, button, select").attr({tabindex:"-1"}),null!==e.$dots&&(e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function(t){var s=o.indexOf(t);i(this).attr({role:"tabpanel",id:"slick-slide"+e.instanceUid+t,tabindex:-1}),-1!==s&&i(this).attr({"aria-describedby":"slick-slide-control"+e.instanceUid+s})}),e.$dots.attr("role","tablist").find("li").each(function(s){var n=o[s];i(this).attr({role:"presentation"}),i(this).find("button").first().attr({role:"tab",id:"slick-slide-control"+e.instanceUid+s,"aria-controls":"slick-slide"+e.instanceUid+n,"aria-label":s+1+" of "+t,"aria-selected":null,tabindex:"-1"})}).eq(e.currentSlide).find("button").attr({"aria-selected":"true",tabindex:"0"}).end());for(var s=e.currentSlide,n=s+e.options.slidesToShow;s<n;s++)e.$slides.eq(s).attr("tabindex",0);e.activateADA()},e.prototype.initArrowEvents=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.off("click.slick").on("click.slick",{message:"previous"},i.changeSlide),i.$nextArrow.off("click.slick").on("click.slick",{message:"next"},i.changeSlide),!0===i.options.accessibility&&(i.$prevArrow.on("keydown.slick",i.keyHandler),i.$nextArrow.on("keydown.slick",i.keyHandler)))},e.prototype.initDotEvents=function(){var e=this;!0===e.options.dots&&(i("li",e.$dots).on("click.slick",{message:"index"},e.changeSlide),!0===e.options.accessibility&&e.$dots.on("keydown.slick",e.keyHandler)),!0===e.options.dots&&!0===e.options.pauseOnDotsHover&&i("li",e.$dots).on("mouseenter.slick",i.proxy(e.interrupt,e,!0)).on("mouseleave.slick",i.proxy(e.interrupt,e,!1))},e.prototype.initSlideEvents=function(){var e=this;e.options.pauseOnHover&&(e.$list.on("mouseenter.slick",i.proxy(e.interrupt,e,!0)),e.$list.on("mouseleave.slick",i.proxy(e.interrupt,e,!1)))},e.prototype.initializeEvents=function(){var e=this;e.initArrowEvents(),e.initDotEvents(),e.initSlideEvents(),e.$list.on("touchstart.slick mousedown.slick",{action:"start"},e.swipeHandler),e.$list.on("touchmove.slick mousemove.slick",{action:"move"},e.swipeHandler),e.$list.on("touchend.slick mouseup.slick",{action:"end"},e.swipeHandler),e.$list.on("touchcancel.slick mouseleave.slick",{action:"end"},e.swipeHandler),e.$list.on("click.slick",e.clickHandler),i(document).on(e.visibilityChange,i.proxy(e.visibility,e)),!0===e.options.accessibility&&e.$list.on("keydown.slick",e.keyHandler),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().on("click.slick",e.selectHandler),i(window).on("orientationchange.slick.slick-"+e.instanceUid,i.proxy(e.orientationChange,e)),i(window).on("resize.slick.slick-"+e.instanceUid,i.proxy(e.resize,e)),i("[draggable!=true]",e.$slideTrack).on("dragstart",e.preventDefault),i(window).on("load.slick.slick-"+e.instanceUid,e.setPosition),i(e.setPosition)},e.prototype.initUI=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.show(),i.$nextArrow.show()),!0===i.options.dots&&i.slideCount>i.options.slidesToShow&&i.$dots.show()},e.prototype.keyHandler=function(i){var e=this;i.target.tagName.match("TEXTAREA|INPUT|SELECT")||(37===i.keyCode&&!0===e.options.accessibility?e.changeSlide({data:{message:!0===e.options.rtl?"next":"previous"}}):39===i.keyCode&&!0===e.options.accessibility&&e.changeSlide({data:{message:!0===e.options.rtl?"previous":"next"}}))},e.prototype.lazyLoad=function(){function e(e){i("img[data-lazy]",e).each(function(){var e=i(this),t=i(this).attr("data-lazy"),o=i(this).attr("data-srcset"),s=i(this).attr("data-sizes")||n.$slider.attr("data-sizes"),r=document.createElement("img");r.onload=function(){e.animate({opacity:0},100,function(){o&&(e.attr("srcset",o),s&&e.attr("sizes",s)),e.attr("src",t).animate({opacity:1},200,function(){e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")}),n.$slider.trigger("lazyLoaded",[n,e,t])})},r.onerror=function(){e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),n.$slider.trigger("lazyLoadError",[n,e,t])},r.src=t})}var t,o,s,n=this;if(!0===n.options.centerMode?!0===n.options.infinite?s=(o=n.currentSlide+(n.options.slidesToShow/2+1))+n.options.slidesToShow+2:(o=Math.max(0,n.currentSlide-(n.options.slidesToShow/2+1)),s=n.options.slidesToShow/2+1+2+n.currentSlide):(o=n.options.infinite?n.options.slidesToShow+n.currentSlide:n.currentSlide,s=Math.ceil(o+n.options.slidesToShow),!0===n.options.fade&&(o>0&&o--,s<=n.slideCount&&s++)),t=n.$slider.find(".slick-slide").slice(o,s),"anticipated"===n.options.lazyLoad)for(var r=o-1,l=s,d=n.$slider.find(".slick-slide"),a=0;a<n.options.slidesToScroll;a++)r<0&&(r=n.slideCount-1),t=(t=t.add(d.eq(r))).add(d.eq(l)),r--,l++;e(t),n.slideCount<=n.options.slidesToShow?e(n.$slider.find(".slick-slide")):n.currentSlide>=n.slideCount-n.options.slidesToShow?e(n.$slider.find(".slick-cloned").slice(0,n.options.slidesToShow)):0===n.currentSlide&&e(n.$slider.find(".slick-cloned").slice(-1*n.options.slidesToShow))},e.prototype.loadSlider=function(){var i=this;i.setPosition(),i.$slideTrack.css({opacity:1}),i.$slider.removeClass("slick-loading"),i.initUI(),"progressive"===i.options.lazyLoad&&i.progressiveLazyLoad()},e.prototype.next=e.prototype.slickNext=function(){this.changeSlide({data:{message:"next"}})},e.prototype.orientationChange=function(){var i=this;i.checkResponsive(),i.setPosition()},e.prototype.pause=e.prototype.slickPause=function(){var i=this;i.autoPlayClear(),i.paused=!0},e.prototype.play=e.prototype.slickPlay=function(){var i=this;i.autoPlay(),i.options.autoplay=!0,i.paused=!1,i.focussed=!1,i.interrupted=!1},e.prototype.postSlide=function(e){var t=this;t.unslicked||(t.$slider.trigger("afterChange",[t,e]),t.animating=!1,t.slideCount>t.options.slidesToShow&&t.setPosition(),t.swipeLeft=null,t.options.autoplay&&t.autoPlay(),!0===t.options.accessibility&&(t.initADA(),t.options.focusOnChange&&i(t.$slides.get(t.currentSlide)).attr("tabindex",0).focus()))},e.prototype.prev=e.prototype.slickPrev=function(){this.changeSlide({data:{message:"previous"}})},e.prototype.preventDefault=function(i){i.preventDefault()},e.prototype.progressiveLazyLoad=function(e){e=e||1;var t,o,s,n,r,l=this,d=i("img[data-lazy]",l.$slider);d.length?(t=d.first(),o=t.attr("data-lazy"),s=t.attr("data-srcset"),n=t.attr("data-sizes")||l.$slider.attr("data-sizes"),(r=document.createElement("img")).onload=function(){s&&(t.attr("srcset",s),n&&t.attr("sizes",n)),t.attr("src",o).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"),!0===l.options.adaptiveHeight&&l.setPosition(),l.$slider.trigger("lazyLoaded",[l,t,o]),l.progressiveLazyLoad()},r.onerror=function(){e<3?setTimeout(function(){l.progressiveLazyLoad(e+1)},500):(t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),l.$slider.trigger("lazyLoadError",[l,t,o]),l.progressiveLazyLoad())},r.src=o):l.$slider.trigger("allImagesLoaded",[l])},e.prototype.refresh=function(e){var t,o,s=this;o=s.slideCount-s.options.slidesToShow,!s.options.infinite&&s.currentSlide>o&&(s.currentSlide=o),s.slideCount<=s.options.slidesToShow&&(s.currentSlide=0),t=s.currentSlide,s.destroy(!0),i.extend(s,s.initials,{currentSlide:t}),s.init(),e||s.changeSlide({data:{message:"index",index:t}},!1)},e.prototype.registerBreakpoints=function(){var e,t,o,s=this,n=s.options.responsive||null;if("array"===i.type(n)&&n.length){s.respondTo=s.options.respondTo||"window";for(e in n)if(o=s.breakpoints.length-1,n.hasOwnProperty(e)){for(t=n[e].breakpoint;o>=0;)s.breakpoints[o]&&s.breakpoints[o]===t&&s.breakpoints.splice(o,1),o--;s.breakpoints.push(t),s.breakpointSettings[t]=n[e].settings}s.breakpoints.sort(function(i,e){return s.options.mobileFirst?i-e:e-i})}},e.prototype.reinit=function(){var e=this;e.$slides=e.$slideTrack.children(e.options.slide).addClass("slick-slide"),e.slideCount=e.$slides.length,e.currentSlide>=e.slideCount&&0!==e.currentSlide&&(e.currentSlide=e.currentSlide-e.options.slidesToScroll),e.slideCount<=e.options.slidesToShow&&(e.currentSlide=0),e.registerBreakpoints(),e.setProps(),e.setupInfinite(),e.buildArrows(),e.updateArrows(),e.initArrowEvents(),e.buildDots(),e.updateDots(),e.initDotEvents(),e.cleanUpSlideEvents(),e.initSlideEvents(),e.checkResponsive(!1,!0),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().on("click.slick",e.selectHandler),e.setSlideClasses("number"==typeof e.currentSlide?e.currentSlide:0),e.setPosition(),e.focusHandler(),e.paused=!e.options.autoplay,e.autoPlay(),e.$slider.trigger("reInit",[e])},e.prototype.resize=function(){var e=this;i(window).width()!==e.windowWidth&&(clearTimeout(e.windowDelay),e.windowDelay=window.setTimeout(function(){e.windowWidth=i(window).width(),e.checkResponsive(),e.unslicked||e.setPosition()},50))},e.prototype.removeSlide=e.prototype.slickRemove=function(i,e,t){var o=this;if(i="boolean"==typeof i?!0===(e=i)?0:o.slideCount-1:!0===e?--i:i,o.slideCount<1||i<0||i>o.slideCount-1)return!1;o.unload(),!0===t?o.$slideTrack.children().remove():o.$slideTrack.children(this.options.slide).eq(i).remove(),o.$slides=o.$slideTrack.children(this.options.slide),o.$slideTrack.children(this.options.slide).detach(),o.$slideTrack.append(o.$slides),o.$slidesCache=o.$slides,o.reinit()},e.prototype.setCSS=function(i){var e,t,o=this,s={};!0===o.options.rtl&&(i=-i),e="left"==o.positionProp?Math.ceil(i)+"px":"0px",t="top"==o.positionProp?Math.ceil(i)+"px":"0px",s[o.positionProp]=i,!1===o.transformsEnabled?o.$slideTrack.css(s):(s={},!1===o.cssTransitions?(s[o.animType]="translate("+e+", "+t+")",o.$slideTrack.css(s)):(s[o.animType]="translate3d("+e+", "+t+", 0px)",o.$slideTrack.css(s)))},e.prototype.setDimensions=function(){var i=this;!1===i.options.vertical?!0===i.options.centerMode&&i.$list.css({padding:"0px "+i.options.centerPadding}):(i.$list.height(i.$slides.first().outerHeight(!0)*i.options.slidesToShow),!0===i.options.centerMode&&i.$list.css({padding:i.options.centerPadding+" 0px"})),i.listWidth=i.$list.width(),i.listHeight=i.$list.height(),!1===i.options.vertical&&!1===i.options.variableWidth?(i.slideWidth=Math.ceil(i.listWidth/i.options.slidesToShow),i.$slideTrack.width(Math.ceil(i.slideWidth*i.$slideTrack.children(".slick-slide").length))):!0===i.options.variableWidth?i.$slideTrack.width(5e3*i.slideCount):(i.slideWidth=Math.ceil(i.listWidth),i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0)*i.$slideTrack.children(".slick-slide").length)));var e=i.$slides.first().outerWidth(!0)-i.$slides.first().width();!1===i.options.variableWidth&&i.$slideTrack.children(".slick-slide").width(i.slideWidth-e)},e.prototype.setFade=function(){var e,t=this;t.$slides.each(function(o,s){e=t.slideWidth*o*-1,!0===t.options.rtl?i(s).css({position:"relative",right:e,top:0,zIndex:t.options.zIndex-2,opacity:0}):i(s).css({position:"relative",left:e,top:0,zIndex:t.options.zIndex-2,opacity:0})}),t.$slides.eq(t.currentSlide).css({zIndex:t.options.zIndex-1,opacity:1})},e.prototype.setHeight=function(){var i=this;if(1===i.options.slidesToShow&&!0===i.options.adaptiveHeight&&!1===i.options.vertical){var e=i.$slides.eq(i.currentSlide).outerHeight(!0);i.$list.css("height",e)}},e.prototype.setOption=e.prototype.slickSetOption=function(){var e,t,o,s,n,r=this,l=!1;if("object"===i.type(arguments[0])?(o=arguments[0],l=arguments[1],n="multiple"):"string"===i.type(arguments[0])&&(o=arguments[0],s=arguments[1],l=arguments[2],"responsive"===arguments[0]&&"array"===i.type(arguments[1])?n="responsive":void 0!==arguments[1]&&(n="single")),"single"===n)r.options[o]=s;else if("multiple"===n)i.each(o,function(i,e){r.options[i]=e});else if("responsive"===n)for(t in s)if("array"!==i.type(r.options.responsive))r.options.responsive=[s[t]];else{for(e=r.options.responsive.length-1;e>=0;)r.options.responsive[e].breakpoint===s[t].breakpoint&&r.options.responsive.splice(e,1),e--;r.options.responsive.push(s[t])}l&&(r.unload(),r.reinit())},e.prototype.setPosition=function(){var i=this;i.setDimensions(),i.setHeight(),!1===i.options.fade?i.setCSS(i.getLeft(i.currentSlide)):i.setFade(),i.$slider.trigger("setPosition",[i])},e.prototype.setProps=function(){var i=this,e=document.body.style;i.positionProp=!0===i.options.vertical?"top":"left","top"===i.positionProp?i.$slider.addClass("slick-vertical"):i.$slider.removeClass("slick-vertical"),void 0===e.WebkitTransition&&void 0===e.MozTransition&&void 0===e.msTransition||!0===i.options.useCSS&&(i.cssTransitions=!0),i.options.fade&&("number"==typeof i.options.zIndex?i.options.zIndex<3&&(i.options.zIndex=3):i.options.zIndex=i.defaults.zIndex),void 0!==e.OTransform&&(i.animType="OTransform",i.transformType="-o-transform",i.transitionType="OTransition",void 0===e.perspectiveProperty&&void 0===e.webkitPerspective&&(i.animType=!1)),void 0!==e.MozTransform&&(i.animType="MozTransform",i.transformType="-moz-transform",i.transitionType="MozTransition",void 0===e.perspectiveProperty&&void 0===e.MozPerspective&&(i.animType=!1)),void 0!==e.webkitTransform&&(i.animType="webkitTransform",i.transformType="-webkit-transform",i.transitionType="webkitTransition",void 0===e.perspectiveProperty&&void 0===e.webkitPerspective&&(i.animType=!1)),void 0!==e.msTransform&&(i.animType="msTransform",i.transformType="-ms-transform",i.transitionType="msTransition",void 0===e.msTransform&&(i.animType=!1)),void 0!==e.transform&&!1!==i.animType&&(i.animType="transform",i.transformType="transform",i.transitionType="transition"),i.transformsEnabled=i.options.useTransform&&null!==i.animType&&!1!==i.animType},e.prototype.setSlideClasses=function(i){var e,t,o,s,n=this;if(t=n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden","true"),n.$slides.eq(i).addClass("slick-current"),!0===n.options.centerMode){var r=n.options.slidesToShow%2==0?1:0;e=Math.floor(n.options.slidesToShow/2),!0===n.options.infinite&&(i>=e&&i<=n.slideCount-1-e?n.$slides.slice(i-e+r,i+e+1).addClass("slick-active").attr("aria-hidden","false"):(o=n.options.slidesToShow+i,t.slice(o-e+1+r,o+e+2).addClass("slick-active").attr("aria-hidden","false")),0===i?t.eq(t.length-1-n.options.slidesToShow).addClass("slick-center"):i===n.slideCount-1&&t.eq(n.options.slidesToShow).addClass("slick-center")),n.$slides.eq(i).addClass("slick-center")}else i>=0&&i<=n.slideCount-n.options.slidesToShow?n.$slides.slice(i,i+n.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"):t.length<=n.options.slidesToShow?t.addClass("slick-active").attr("aria-hidden","false"):(s=n.slideCount%n.options.slidesToShow,o=!0===n.options.infinite?n.options.slidesToShow+i:i,n.options.slidesToShow==n.options.slidesToScroll&&n.slideCount-i<n.options.slidesToShow?t.slice(o-(n.options.slidesToShow-s),o+s).addClass("slick-active").attr("aria-hidden","false"):t.slice(o,o+n.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"));"ondemand"!==n.options.lazyLoad&&"anticipated"!==n.options.lazyLoad||n.lazyLoad()},e.prototype.setupInfinite=function(){var e,t,o,s=this;if(!0===s.options.fade&&(s.options.centerMode=!1),!0===s.options.infinite&&!1===s.options.fade&&(t=null,s.slideCount>s.options.slidesToShow)){for(o=!0===s.options.centerMode?s.options.slidesToShow+1:s.options.slidesToShow,e=s.slideCount;e>s.slideCount-o;e-=1)t=e-1,i(s.$slides[t]).clone(!0).attr("id","").attr("data-slick-index",t-s.slideCount).prependTo(s.$slideTrack).addClass("slick-cloned");for(e=0;e<o+s.slideCount;e+=1)t=e,i(s.$slides[t]).clone(!0).attr("id","").attr("data-slick-index",t+s.slideCount).appendTo(s.$slideTrack).addClass("slick-cloned");s.$slideTrack.find(".slick-cloned").find("[id]").each(function(){i(this).attr("id","")})}},e.prototype.interrupt=function(i){var e=this;i||e.autoPlay(),e.interrupted=i},e.prototype.selectHandler=function(e){var t=this,o=i(e.target).is(".slick-slide")?i(e.target):i(e.target).parents(".slick-slide"),s=parseInt(o.attr("data-slick-index"));s||(s=0),t.slideCount<=t.options.slidesToShow?t.slideHandler(s,!1,!0):t.slideHandler(s)},e.prototype.slideHandler=function(i,e,t){var o,s,n,r,l,d=null,a=this;if(e=e||!1,!(!0===a.animating&&!0===a.options.waitForAnimate||!0===a.options.fade&&a.currentSlide===i))if(!1===e&&a.asNavFor(i),o=i,d=a.getLeft(o),r=a.getLeft(a.currentSlide),a.currentLeft=null===a.swipeLeft?r:a.swipeLeft,!1===a.options.infinite&&!1===a.options.centerMode&&(i<0||i>a.getDotCount()*a.options.slidesToScroll))!1===a.options.fade&&(o=a.currentSlide,!0!==t?a.animateSlide(r,function(){a.postSlide(o)}):a.postSlide(o));else if(!1===a.options.infinite&&!0===a.options.centerMode&&(i<0||i>a.slideCount-a.options.slidesToScroll))!1===a.options.fade&&(o=a.currentSlide,!0!==t?a.animateSlide(r,function(){a.postSlide(o)}):a.postSlide(o));else{if(a.options.autoplay&&clearInterval(a.autoPlayTimer),s=o<0?a.slideCount%a.options.slidesToScroll!=0?a.slideCount-a.slideCount%a.options.slidesToScroll:a.slideCount+o:o>=a.slideCount?a.slideCount%a.options.slidesToScroll!=0?0:o-a.slideCount:o,a.animating=!0,a.$slider.trigger("beforeChange",[a,a.currentSlide,s]),n=a.currentSlide,a.currentSlide=s,a.setSlideClasses(a.currentSlide),a.options.asNavFor&&(l=(l=a.getNavTarget()).slick("getSlick")).slideCount<=l.options.slidesToShow&&l.setSlideClasses(a.currentSlide),a.updateDots(),a.updateArrows(),!0===a.options.fade)return!0!==t?(a.fadeSlideOut(n),a.fadeSlide(s,function(){a.postSlide(s)})):a.postSlide(s),void a.animateHeight();!0!==t?a.animateSlide(d,function(){a.postSlide(s)}):a.postSlide(s)}},e.prototype.startLoad=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.hide(),i.$nextArrow.hide()),!0===i.options.dots&&i.slideCount>i.options.slidesToShow&&i.$dots.hide(),i.$slider.addClass("slick-loading")},e.prototype.swipeDirection=function(){var i,e,t,o,s=this;return i=s.touchObject.startX-s.touchObject.curX,e=s.touchObject.startY-s.touchObject.curY,t=Math.atan2(e,i),(o=Math.round(180*t/Math.PI))<0&&(o=360-Math.abs(o)),o<=45&&o>=0?!1===s.options.rtl?"left":"right":o<=360&&o>=315?!1===s.options.rtl?"left":"right":o>=135&&o<=225?!1===s.options.rtl?"right":"left":!0===s.options.verticalSwiping?o>=35&&o<=135?"down":"up":"vertical"},e.prototype.swipeEnd=function(i){var e,t,o=this;if(o.dragging=!1,o.swiping=!1,o.scrolling)return o.scrolling=!1,!1;if(o.interrupted=!1,o.shouldClick=!(o.touchObject.swipeLength>10),void 0===o.touchObject.curX)return!1;if(!0===o.touchObject.edgeHit&&o.$slider.trigger("edge",[o,o.swipeDirection()]),o.touchObject.swipeLength>=o.touchObject.minSwipe){switch(t=o.swipeDirection()){case"left":case"down":e=o.options.swipeToSlide?o.checkNavigable(o.currentSlide+o.getSlideCount()):o.currentSlide+o.getSlideCount(),o.currentDirection=0;break;case"right":case"up":e=o.options.swipeToSlide?o.checkNavigable(o.currentSlide-o.getSlideCount()):o.currentSlide-o.getSlideCount(),o.currentDirection=1}"vertical"!=t&&(o.slideHandler(e),o.touchObject={},o.$slider.trigger("swipe",[o,t]))}else o.touchObject.startX!==o.touchObject.curX&&(o.slideHandler(o.currentSlide),o.touchObject={})},e.prototype.swipeHandler=function(i){var e=this;if(!(!1===e.options.swipe||"ontouchend"in document&&!1===e.options.swipe||!1===e.options.draggable&&-1!==i.type.indexOf("mouse")))switch(e.touchObject.fingerCount=i.originalEvent&&void 0!==i.originalEvent.touches?i.originalEvent.touches.length:1,e.touchObject.minSwipe=e.listWidth/e.options.touchThreshold,!0===e.options.verticalSwiping&&(e.touchObject.minSwipe=e.listHeight/e.options.touchThreshold),i.data.action){case"start":e.swipeStart(i);break;case"move":e.swipeMove(i);break;case"end":e.swipeEnd(i)}},e.prototype.swipeMove=function(i){var e,t,o,s,n,r,l=this;return n=void 0!==i.originalEvent?i.originalEvent.touches:null,!(!l.dragging||l.scrolling||n&&1!==n.length)&&(e=l.getLeft(l.currentSlide),l.touchObject.curX=void 0!==n?n[0].pageX:i.clientX,l.touchObject.curY=void 0!==n?n[0].pageY:i.clientY,l.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(l.touchObject.curX-l.touchObject.startX,2))),r=Math.round(Math.sqrt(Math.pow(l.touchObject.curY-l.touchObject.startY,2))),!l.options.verticalSwiping&&!l.swiping&&r>4?(l.scrolling=!0,!1):(!0===l.options.verticalSwiping&&(l.touchObject.swipeLength=r),t=l.swipeDirection(),void 0!==i.originalEvent&&l.touchObject.swipeLength>4&&(l.swiping=!0,i.preventDefault()),s=(!1===l.options.rtl?1:-1)*(l.touchObject.curX>l.touchObject.startX?1:-1),!0===l.options.verticalSwiping&&(s=l.touchObject.curY>l.touchObject.startY?1:-1),o=l.touchObject.swipeLength,l.touchObject.edgeHit=!1,!1===l.options.infinite&&(0===l.currentSlide&&"right"===t||l.currentSlide>=l.getDotCount()&&"left"===t)&&(o=l.touchObject.swipeLength*l.options.edgeFriction,l.touchObject.edgeHit=!0),!1===l.options.vertical?l.swipeLeft=e+o*s:l.swipeLeft=e+o*(l.$list.height()/l.listWidth)*s,!0===l.options.verticalSwiping&&(l.swipeLeft=e+o*s),!0!==l.options.fade&&!1!==l.options.touchMove&&(!0===l.animating?(l.swipeLeft=null,!1):void l.setCSS(l.swipeLeft))))},e.prototype.swipeStart=function(i){var e,t=this;if(t.interrupted=!0,1!==t.touchObject.fingerCount||t.slideCount<=t.options.slidesToShow)return t.touchObject={},!1;void 0!==i.originalEvent&&void 0!==i.originalEvent.touches&&(e=i.originalEvent.touches[0]),t.touchObject.startX=t.touchObject.curX=void 0!==e?e.pageX:i.clientX,t.touchObject.startY=t.touchObject.curY=void 0!==e?e.pageY:i.clientY,t.dragging=!0},e.prototype.unfilterSlides=e.prototype.slickUnfilter=function(){var i=this;null!==i.$slidesCache&&(i.unload(),i.$slideTrack.children(this.options.slide).detach(),i.$slidesCache.appendTo(i.$slideTrack),i.reinit())},e.prototype.unload=function(){var e=this;i(".slick-cloned",e.$slider).remove(),e.$dots&&e.$dots.remove(),e.$prevArrow&&e.htmlExpr.test(e.options.prevArrow)&&e.$prevArrow.remove(),e.$nextArrow&&e.htmlExpr.test(e.options.nextArrow)&&e.$nextArrow.remove(),e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden","true").css("width","")},e.prototype.unslick=function(i){var e=this;e.$slider.trigger("unslick",[e,i]),e.destroy()},e.prototype.updateArrows=function(){var i=this;Math.floor(i.options.slidesToShow/2),!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&!i.options.infinite&&(i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false"),i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false"),0===i.currentSlide?(i.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false")):i.currentSlide>=i.slideCount-i.options.slidesToShow&&!1===i.options.centerMode?(i.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")):i.currentSlide>=i.slideCount-1&&!0===i.options.centerMode&&(i.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")))},e.prototype.updateDots=function(){var i=this;null!==i.$dots&&(i.$dots.find("li").removeClass("slick-active").end(),i.$dots.find("li").eq(Math.floor(i.currentSlide/i.options.slidesToScroll)).addClass("slick-active"))},e.prototype.visibility=function(){var i=this;i.options.autoplay&&(document[i.hidden]?i.interrupted=!0:i.interrupted=!1)},i.fn.slick=function(){var i,t,o=this,s=arguments[0],n=Array.prototype.slice.call(arguments,1),r=o.length;for(i=0;i<r;i++)if("object"==typeof s||void 0===s?o[i].slick=new e(o[i],s):t=o[i].slick[s].apply(o[i].slick,n),void 0!==t)return t;return o}});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuaW1lLmpzIiwianF1ZXJ5LndheXBvaW50cy5qcyIsIm1hZ25pZmljLmpzIiwic2VsZWN0Mi5qcyIsInNsaWNrLmpzIiwic2xpY2subWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNycEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNodkNBO0FBQ0E7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuOEZBO0FBQ0EiLCJmaWxlIjoidmVuZG9yX3NjcmlwdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogYW5pbWUuanMgdjMuMi4wXG4gKiAoYykgMjAyMCBKdWxpYW4gR2FybmllclxuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKiBhbmltZWpzLmNvbVxuICovXG5cbiFmdW5jdGlvbihuLGUpe1wib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzJiZcInVuZGVmaW5lZFwiIT10eXBlb2YgbW9kdWxlP21vZHVsZS5leHBvcnRzPWUoKTpcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKGUpOm4uYW5pbWU9ZSgpfSh0aGlzLGZ1bmN0aW9uKCl7XCJ1c2Ugc3RyaWN0XCI7dmFyIG49e3VwZGF0ZTpudWxsLGJlZ2luOm51bGwsbG9vcEJlZ2luOm51bGwsY2hhbmdlQmVnaW46bnVsbCxjaGFuZ2U6bnVsbCxjaGFuZ2VDb21wbGV0ZTpudWxsLGxvb3BDb21wbGV0ZTpudWxsLGNvbXBsZXRlOm51bGwsbG9vcDoxLGRpcmVjdGlvbjpcIm5vcm1hbFwiLGF1dG9wbGF5OiEwLHRpbWVsaW5lT2Zmc2V0OjB9LGU9e2R1cmF0aW9uOjFlMyxkZWxheTowLGVuZERlbGF5OjAsZWFzaW5nOlwiZWFzZU91dEVsYXN0aWMoMSwgLjUpXCIscm91bmQ6MH0scj1bXCJ0cmFuc2xhdGVYXCIsXCJ0cmFuc2xhdGVZXCIsXCJ0cmFuc2xhdGVaXCIsXCJyb3RhdGVcIixcInJvdGF0ZVhcIixcInJvdGF0ZVlcIixcInJvdGF0ZVpcIixcInNjYWxlXCIsXCJzY2FsZVhcIixcInNjYWxlWVwiLFwic2NhbGVaXCIsXCJza2V3XCIsXCJza2V3WFwiLFwic2tld1lcIixcInBlcnNwZWN0aXZlXCIsXCJtYXRyaXhcIixcIm1hdHJpeDNkXCJdLHQ9e0NTUzp7fSxzcHJpbmdzOnt9fTtmdW5jdGlvbiBhKG4sZSxyKXtyZXR1cm4gTWF0aC5taW4oTWF0aC5tYXgobixlKSxyKX1mdW5jdGlvbiBvKG4sZSl7cmV0dXJuIG4uaW5kZXhPZihlKT4tMX1mdW5jdGlvbiB1KG4sZSl7cmV0dXJuIG4uYXBwbHkobnVsbCxlKX12YXIgaT17YXJyOmZ1bmN0aW9uKG4pe3JldHVybiBBcnJheS5pc0FycmF5KG4pfSxvYmo6ZnVuY3Rpb24obil7cmV0dXJuIG8oT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG4pLFwiT2JqZWN0XCIpfSxwdGg6ZnVuY3Rpb24obil7cmV0dXJuIGkub2JqKG4pJiZuLmhhc093blByb3BlcnR5KFwidG90YWxMZW5ndGhcIil9LHN2ZzpmdW5jdGlvbihuKXtyZXR1cm4gbiBpbnN0YW5jZW9mIFNWR0VsZW1lbnR9LGlucDpmdW5jdGlvbihuKXtyZXR1cm4gbiBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnR9LGRvbTpmdW5jdGlvbihuKXtyZXR1cm4gbi5ub2RlVHlwZXx8aS5zdmcobil9LHN0cjpmdW5jdGlvbihuKXtyZXR1cm5cInN0cmluZ1wiPT10eXBlb2Ygbn0sZm5jOmZ1bmN0aW9uKG4pe3JldHVyblwiZnVuY3Rpb25cIj09dHlwZW9mIG59LHVuZDpmdW5jdGlvbihuKXtyZXR1cm4gdm9pZCAwPT09bn0saGV4OmZ1bmN0aW9uKG4pe3JldHVybi8oXiNbMC05QS1GXXs2fSQpfCheI1swLTlBLUZdezN9JCkvaS50ZXN0KG4pfSxyZ2I6ZnVuY3Rpb24obil7cmV0dXJuL15yZ2IvLnRlc3Qobil9LGhzbDpmdW5jdGlvbihuKXtyZXR1cm4vXmhzbC8udGVzdChuKX0sY29sOmZ1bmN0aW9uKG4pe3JldHVybiBpLmhleChuKXx8aS5yZ2Iobil8fGkuaHNsKG4pfSxrZXk6ZnVuY3Rpb24ocil7cmV0dXJuIW4uaGFzT3duUHJvcGVydHkocikmJiFlLmhhc093blByb3BlcnR5KHIpJiZcInRhcmdldHNcIiE9PXImJlwia2V5ZnJhbWVzXCIhPT1yfX07ZnVuY3Rpb24gYyhuKXt2YXIgZT0vXFwoKFteKV0rKVxcKS8uZXhlYyhuKTtyZXR1cm4gZT9lWzFdLnNwbGl0KFwiLFwiKS5tYXAoZnVuY3Rpb24obil7cmV0dXJuIHBhcnNlRmxvYXQobil9KTpbXX1mdW5jdGlvbiBzKG4sZSl7dmFyIHI9YyhuKSxvPWEoaS51bmQoclswXSk/MTpyWzBdLC4xLDEwMCksdT1hKGkudW5kKHJbMV0pPzEwMDpyWzFdLC4xLDEwMCkscz1hKGkudW5kKHJbMl0pPzEwOnJbMl0sLjEsMTAwKSxmPWEoaS51bmQoclszXSk/MDpyWzNdLC4xLDEwMCksbD1NYXRoLnNxcnQodS9vKSxkPXMvKDIqTWF0aC5zcXJ0KHUqbykpLHA9ZDwxP2wqTWF0aC5zcXJ0KDEtZCpkKTowLGg9MSx2PWQ8MT8oZCpsLWYpL3A6LWYrbDtmdW5jdGlvbiBnKG4pe3ZhciByPWU/ZSpuLzFlMzpuO3JldHVybiByPWQ8MT9NYXRoLmV4cCgtcipkKmwpKihoKk1hdGguY29zKHAqcikrdipNYXRoLnNpbihwKnIpKTooaCt2KnIpKk1hdGguZXhwKC1yKmwpLDA9PT1ufHwxPT09bj9uOjEtcn1yZXR1cm4gZT9nOmZ1bmN0aW9uKCl7dmFyIGU9dC5zcHJpbmdzW25dO2lmKGUpcmV0dXJuIGU7Zm9yKHZhciByPTAsYT0wOzspaWYoMT09PWcocis9MS82KSl7aWYoKythPj0xNilicmVha31lbHNlIGE9MDt2YXIgbz1yKigxLzYpKjFlMztyZXR1cm4gdC5zcHJpbmdzW25dPW8sb319ZnVuY3Rpb24gZihuKXtyZXR1cm4gdm9pZCAwPT09biYmKG49MTApLGZ1bmN0aW9uKGUpe3JldHVybiBNYXRoLmNlaWwoYShlLDFlLTYsMSkqbikqKDEvbil9fXZhciBsLGQscD1mdW5jdGlvbigpe3ZhciBuPTExLGU9MS8obi0xKTtmdW5jdGlvbiByKG4sZSl7cmV0dXJuIDEtMyplKzMqbn1mdW5jdGlvbiB0KG4sZSl7cmV0dXJuIDMqZS02Km59ZnVuY3Rpb24gYShuKXtyZXR1cm4gMypufWZ1bmN0aW9uIG8obixlLG8pe3JldHVybigocihlLG8pKm4rdChlLG8pKSpuK2EoZSkpKm59ZnVuY3Rpb24gdShuLGUsbyl7cmV0dXJuIDMqcihlLG8pKm4qbisyKnQoZSxvKSpuK2EoZSl9cmV0dXJuIGZ1bmN0aW9uKHIsdCxhLGkpe2lmKDA8PXImJnI8PTEmJjA8PWEmJmE8PTEpe3ZhciBjPW5ldyBGbG9hdDMyQXJyYXkobik7aWYociE9PXR8fGEhPT1pKWZvcih2YXIgcz0wO3M8bjsrK3MpY1tzXT1vKHMqZSxyLGEpO3JldHVybiBmdW5jdGlvbihuKXtyZXR1cm4gcj09PXQmJmE9PT1pP246MD09PW58fDE9PT1uP246byhmKG4pLHQsaSl9fWZ1bmN0aW9uIGYodCl7Zm9yKHZhciBpPTAscz0xLGY9bi0xO3MhPT1mJiZjW3NdPD10OysrcylpKz1lO3ZhciBsPWkrKHQtY1stLXNdKS8oY1tzKzFdLWNbc10pKmUsZD11KGwscixhKTtyZXR1cm4gZD49LjAwMT9mdW5jdGlvbihuLGUscix0KXtmb3IodmFyIGE9MDthPDQ7KythKXt2YXIgaT11KGUscix0KTtpZigwPT09aSlyZXR1cm4gZTtlLT0obyhlLHIsdCktbikvaX1yZXR1cm4gZX0odCxsLHIsYSk6MD09PWQ/bDpmdW5jdGlvbihuLGUscix0LGEpe2Zvcih2YXIgdSxpLGM9MDsodT1vKGk9ZSsoci1lKS8yLHQsYSktbik+MD9yPWk6ZT1pLE1hdGguYWJzKHUpPjFlLTcmJisrYzwxMDspO3JldHVybiBpfSh0LGksaStlLHIsYSl9fX0oKSxoPShsPXtsaW5lYXI6ZnVuY3Rpb24oKXtyZXR1cm4gZnVuY3Rpb24obil7cmV0dXJuIG59fX0sZD17U2luZTpmdW5jdGlvbigpe3JldHVybiBmdW5jdGlvbihuKXtyZXR1cm4gMS1NYXRoLmNvcyhuKk1hdGguUEkvMil9fSxDaXJjOmZ1bmN0aW9uKCl7cmV0dXJuIGZ1bmN0aW9uKG4pe3JldHVybiAxLU1hdGguc3FydCgxLW4qbil9fSxCYWNrOmZ1bmN0aW9uKCl7cmV0dXJuIGZ1bmN0aW9uKG4pe3JldHVybiBuKm4qKDMqbi0yKX19LEJvdW5jZTpmdW5jdGlvbigpe3JldHVybiBmdW5jdGlvbihuKXtmb3IodmFyIGUscj00O248KChlPU1hdGgucG93KDIsLS1yKSktMSkvMTE7KTtyZXR1cm4gMS9NYXRoLnBvdyg0LDMtciktNy41NjI1Kk1hdGgucG93KCgzKmUtMikvMjItbiwyKX19LEVsYXN0aWM6ZnVuY3Rpb24obixlKXt2b2lkIDA9PT1uJiYobj0xKSx2b2lkIDA9PT1lJiYoZT0uNSk7dmFyIHI9YShuLDEsMTApLHQ9YShlLC4xLDIpO3JldHVybiBmdW5jdGlvbihuKXtyZXR1cm4gMD09PW58fDE9PT1uP246LXIqTWF0aC5wb3coMiwxMCoobi0xKSkqTWF0aC5zaW4oKG4tMS10LygyKk1hdGguUEkpKk1hdGguYXNpbigxL3IpKSooMipNYXRoLlBJKS90KX19fSxbXCJRdWFkXCIsXCJDdWJpY1wiLFwiUXVhcnRcIixcIlF1aW50XCIsXCJFeHBvXCJdLmZvckVhY2goZnVuY3Rpb24obixlKXtkW25dPWZ1bmN0aW9uKCl7cmV0dXJuIGZ1bmN0aW9uKG4pe3JldHVybiBNYXRoLnBvdyhuLGUrMil9fX0pLE9iamVjdC5rZXlzKGQpLmZvckVhY2goZnVuY3Rpb24obil7dmFyIGU9ZFtuXTtsW1wiZWFzZUluXCIrbl09ZSxsW1wiZWFzZU91dFwiK25dPWZ1bmN0aW9uKG4scil7cmV0dXJuIGZ1bmN0aW9uKHQpe3JldHVybiAxLWUobixyKSgxLXQpfX0sbFtcImVhc2VJbk91dFwiK25dPWZ1bmN0aW9uKG4scil7cmV0dXJuIGZ1bmN0aW9uKHQpe3JldHVybiB0PC41P2UobixyKSgyKnQpLzI6MS1lKG4scikoLTIqdCsyKS8yfX19KSxsKTtmdW5jdGlvbiB2KG4sZSl7aWYoaS5mbmMobikpcmV0dXJuIG47dmFyIHI9bi5zcGxpdChcIihcIilbMF0sdD1oW3JdLGE9YyhuKTtzd2l0Y2gocil7Y2FzZVwic3ByaW5nXCI6cmV0dXJuIHMobixlKTtjYXNlXCJjdWJpY0JlemllclwiOnJldHVybiB1KHAsYSk7Y2FzZVwic3RlcHNcIjpyZXR1cm4gdShmLGEpO2RlZmF1bHQ6cmV0dXJuIHUodCxhKX19ZnVuY3Rpb24gZyhuKXt0cnl7cmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwobil9Y2F0Y2gobil7cmV0dXJufX1mdW5jdGlvbiBtKG4sZSl7Zm9yKHZhciByPW4ubGVuZ3RoLHQ9YXJndW1lbnRzLmxlbmd0aD49Mj9hcmd1bWVudHNbMV06dm9pZCAwLGE9W10sbz0wO288cjtvKyspaWYobyBpbiBuKXt2YXIgdT1uW29dO2UuY2FsbCh0LHUsbyxuKSYmYS5wdXNoKHUpfXJldHVybiBhfWZ1bmN0aW9uIHkobil7cmV0dXJuIG4ucmVkdWNlKGZ1bmN0aW9uKG4sZSl7cmV0dXJuIG4uY29uY2F0KGkuYXJyKGUpP3koZSk6ZSl9LFtdKX1mdW5jdGlvbiBiKG4pe3JldHVybiBpLmFycihuKT9uOihpLnN0cihuKSYmKG49ZyhuKXx8biksbiBpbnN0YW5jZW9mIE5vZGVMaXN0fHxuIGluc3RhbmNlb2YgSFRNTENvbGxlY3Rpb24/W10uc2xpY2UuY2FsbChuKTpbbl0pfWZ1bmN0aW9uIHgobixlKXtyZXR1cm4gbi5zb21lKGZ1bmN0aW9uKG4pe3JldHVybiBuPT09ZX0pfWZ1bmN0aW9uIE0obil7dmFyIGU9e307Zm9yKHZhciByIGluIG4pZVtyXT1uW3JdO3JldHVybiBlfWZ1bmN0aW9uIHcobixlKXt2YXIgcj1NKG4pO2Zvcih2YXIgdCBpbiBuKXJbdF09ZS5oYXNPd25Qcm9wZXJ0eSh0KT9lW3RdOm5bdF07cmV0dXJuIHJ9ZnVuY3Rpb24gayhuLGUpe3ZhciByPU0obik7Zm9yKHZhciB0IGluIGUpclt0XT1pLnVuZChuW3RdKT9lW3RdOm5bdF07cmV0dXJuIHJ9ZnVuY3Rpb24gTyhuKXtyZXR1cm4gaS5yZ2Iobik/KHI9L3JnYlxcKChcXGQrLFxccypbXFxkXSssXFxzKltcXGRdKylcXCkvZy5leGVjKGU9bikpP1wicmdiYShcIityWzFdK1wiLDEpXCI6ZTppLmhleChuKT8odD1uLnJlcGxhY2UoL14jPyhbYS1mXFxkXSkoW2EtZlxcZF0pKFthLWZcXGRdKSQvaSxmdW5jdGlvbihuLGUscix0KXtyZXR1cm4gZStlK3Ircit0K3R9KSxhPS9eIz8oW2EtZlxcZF17Mn0pKFthLWZcXGRdezJ9KShbYS1mXFxkXXsyfSkkL2kuZXhlYyh0KSxcInJnYmEoXCIrcGFyc2VJbnQoYVsxXSwxNikrXCIsXCIrcGFyc2VJbnQoYVsyXSwxNikrXCIsXCIrcGFyc2VJbnQoYVszXSwxNikrXCIsMSlcIik6aS5oc2wobik/ZnVuY3Rpb24obil7dmFyIGUscix0LGE9L2hzbFxcKChcXGQrKSxcXHMqKFtcXGQuXSspJSxcXHMqKFtcXGQuXSspJVxcKS9nLmV4ZWMobil8fC9oc2xhXFwoKFxcZCspLFxccyooW1xcZC5dKyklLFxccyooW1xcZC5dKyklLFxccyooW1xcZC5dKylcXCkvZy5leGVjKG4pLG89cGFyc2VJbnQoYVsxXSwxMCkvMzYwLHU9cGFyc2VJbnQoYVsyXSwxMCkvMTAwLGk9cGFyc2VJbnQoYVszXSwxMCkvMTAwLGM9YVs0XXx8MTtmdW5jdGlvbiBzKG4sZSxyKXtyZXR1cm4gcjwwJiYocis9MSkscj4xJiYoci09MSkscjwxLzY/bis2KihlLW4pKnI6cjwuNT9lOnI8Mi8zP24rKGUtbikqKDIvMy1yKSo2Om59aWYoMD09dSllPXI9dD1pO2Vsc2V7dmFyIGY9aTwuNT9pKigxK3UpOmkrdS1pKnUsbD0yKmktZjtlPXMobCxmLG8rMS8zKSxyPXMobCxmLG8pLHQ9cyhsLGYsby0xLzMpfXJldHVyblwicmdiYShcIisyNTUqZStcIixcIisyNTUqcitcIixcIisyNTUqdCtcIixcIitjK1wiKVwifShuKTp2b2lkIDA7dmFyIGUscix0LGF9ZnVuY3Rpb24gQyhuKXt2YXIgZT0vWystXT9cXGQqXFwuP1xcZCsoPzpcXC5cXGQrKT8oPzpbZUVdWystXT9cXGQrKT8oJXxweHxwdHxlbXxyZW18aW58Y218bW18ZXh8Y2h8cGN8dnd8dmh8dm1pbnx2bWF4fGRlZ3xyYWR8dHVybik/JC8uZXhlYyhuKTtpZihlKXJldHVybiBlWzFdfWZ1bmN0aW9uIEIobixlKXtyZXR1cm4gaS5mbmMobik/bihlLnRhcmdldCxlLmlkLGUudG90YWwpOm59ZnVuY3Rpb24gUChuLGUpe3JldHVybiBuLmdldEF0dHJpYnV0ZShlKX1mdW5jdGlvbiBJKG4sZSxyKXtpZih4KFtyLFwiZGVnXCIsXCJyYWRcIixcInR1cm5cIl0sQyhlKSkpcmV0dXJuIGU7dmFyIGE9dC5DU1NbZStyXTtpZighaS51bmQoYSkpcmV0dXJuIGE7dmFyIG89ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChuLnRhZ05hbWUpLHU9bi5wYXJlbnROb2RlJiZuLnBhcmVudE5vZGUhPT1kb2N1bWVudD9uLnBhcmVudE5vZGU6ZG9jdW1lbnQuYm9keTt1LmFwcGVuZENoaWxkKG8pLG8uc3R5bGUucG9zaXRpb249XCJhYnNvbHV0ZVwiLG8uc3R5bGUud2lkdGg9MTAwK3I7dmFyIGM9MTAwL28ub2Zmc2V0V2lkdGg7dS5yZW1vdmVDaGlsZChvKTt2YXIgcz1jKnBhcnNlRmxvYXQoZSk7cmV0dXJuIHQuQ1NTW2Urcl09cyxzfWZ1bmN0aW9uIFQobixlLHIpe2lmKGUgaW4gbi5zdHlsZSl7dmFyIHQ9ZS5yZXBsYWNlKC8oW2Etel0pKFtBLVpdKS9nLFwiJDEtJDJcIikudG9Mb3dlckNhc2UoKSxhPW4uc3R5bGVbZV18fGdldENvbXB1dGVkU3R5bGUobikuZ2V0UHJvcGVydHlWYWx1ZSh0KXx8XCIwXCI7cmV0dXJuIHI/SShuLGEscik6YX19ZnVuY3Rpb24gRChuLGUpe3JldHVybiBpLmRvbShuKSYmIWkuaW5wKG4pJiYoUChuLGUpfHxpLnN2ZyhuKSYmbltlXSk/XCJhdHRyaWJ1dGVcIjppLmRvbShuKSYmeChyLGUpP1widHJhbnNmb3JtXCI6aS5kb20obikmJlwidHJhbnNmb3JtXCIhPT1lJiZUKG4sZSk/XCJjc3NcIjpudWxsIT1uW2VdP1wib2JqZWN0XCI6dm9pZCAwfWZ1bmN0aW9uIEUobil7aWYoaS5kb20obikpe2Zvcih2YXIgZSxyPW4uc3R5bGUudHJhbnNmb3JtfHxcIlwiLHQ9LyhcXHcrKVxcKChbXildKilcXCkvZyxhPW5ldyBNYXA7ZT10LmV4ZWMocik7KWEuc2V0KGVbMV0sZVsyXSk7cmV0dXJuIGF9fWZ1bmN0aW9uIEYobixlLHIsdCl7dmFyIGEsdT1vKGUsXCJzY2FsZVwiKT8xOjArKG8oYT1lLFwidHJhbnNsYXRlXCIpfHxcInBlcnNwZWN0aXZlXCI9PT1hP1wicHhcIjpvKGEsXCJyb3RhdGVcIil8fG8oYSxcInNrZXdcIik/XCJkZWdcIjp2b2lkIDApLGk9RShuKS5nZXQoZSl8fHU7cmV0dXJuIHImJihyLnRyYW5zZm9ybXMubGlzdC5zZXQoZSxpKSxyLnRyYW5zZm9ybXMubGFzdD1lKSx0P0kobixpLHQpOml9ZnVuY3Rpb24gTihuLGUscix0KXtzd2l0Y2goRChuLGUpKXtjYXNlXCJ0cmFuc2Zvcm1cIjpyZXR1cm4gRihuLGUsdCxyKTtjYXNlXCJjc3NcIjpyZXR1cm4gVChuLGUscik7Y2FzZVwiYXR0cmlidXRlXCI6cmV0dXJuIFAobixlKTtkZWZhdWx0OnJldHVybiBuW2VdfHwwfX1mdW5jdGlvbiBBKG4sZSl7dmFyIHI9L14oXFwqPXxcXCs9fC09KS8uZXhlYyhuKTtpZighcilyZXR1cm4gbjt2YXIgdD1DKG4pfHwwLGE9cGFyc2VGbG9hdChlKSxvPXBhcnNlRmxvYXQobi5yZXBsYWNlKHJbMF0sXCJcIikpO3N3aXRjaChyWzBdWzBdKXtjYXNlXCIrXCI6cmV0dXJuIGErbyt0O2Nhc2VcIi1cIjpyZXR1cm4gYS1vK3Q7Y2FzZVwiKlwiOnJldHVybiBhKm8rdH19ZnVuY3Rpb24gTChuLGUpe2lmKGkuY29sKG4pKXJldHVybiBPKG4pO2lmKC9cXHMvZy50ZXN0KG4pKXJldHVybiBuO3ZhciByPUMobiksdD1yP24uc3Vic3RyKDAsbi5sZW5ndGgtci5sZW5ndGgpOm47cmV0dXJuIGU/dCtlOnR9ZnVuY3Rpb24gaihuLGUpe3JldHVybiBNYXRoLnNxcnQoTWF0aC5wb3coZS54LW4ueCwyKStNYXRoLnBvdyhlLnktbi55LDIpKX1mdW5jdGlvbiBTKG4pe2Zvcih2YXIgZSxyPW4ucG9pbnRzLHQ9MCxhPTA7YTxyLm51bWJlck9mSXRlbXM7YSsrKXt2YXIgbz1yLmdldEl0ZW0oYSk7YT4wJiYodCs9aihlLG8pKSxlPW99cmV0dXJuIHR9ZnVuY3Rpb24gcShuKXtpZihuLmdldFRvdGFsTGVuZ3RoKXJldHVybiBuLmdldFRvdGFsTGVuZ3RoKCk7c3dpdGNoKG4udGFnTmFtZS50b0xvd2VyQ2FzZSgpKXtjYXNlXCJjaXJjbGVcIjpyZXR1cm4gbz1uLDIqTWF0aC5QSSpQKG8sXCJyXCIpO2Nhc2VcInJlY3RcIjpyZXR1cm4gMipQKGE9bixcIndpZHRoXCIpKzIqUChhLFwiaGVpZ2h0XCIpO2Nhc2VcImxpbmVcIjpyZXR1cm4gaih7eDpQKHQ9bixcIngxXCIpLHk6UCh0LFwieTFcIil9LHt4OlAodCxcIngyXCIpLHk6UCh0LFwieTJcIil9KTtjYXNlXCJwb2x5bGluZVwiOnJldHVybiBTKG4pO2Nhc2VcInBvbHlnb25cIjpyZXR1cm4gcj0oZT1uKS5wb2ludHMsUyhlKStqKHIuZ2V0SXRlbShyLm51bWJlck9mSXRlbXMtMSksci5nZXRJdGVtKDApKX12YXIgZSxyLHQsYSxvfWZ1bmN0aW9uICQobixlKXt2YXIgcj1lfHx7fSx0PXIuZWx8fGZ1bmN0aW9uKG4pe2Zvcih2YXIgZT1uLnBhcmVudE5vZGU7aS5zdmcoZSkmJmkuc3ZnKGUucGFyZW50Tm9kZSk7KWU9ZS5wYXJlbnROb2RlO3JldHVybiBlfShuKSxhPXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksbz1QKHQsXCJ2aWV3Qm94XCIpLHU9YS53aWR0aCxjPWEuaGVpZ2h0LHM9ci52aWV3Qm94fHwobz9vLnNwbGl0KFwiIFwiKTpbMCwwLHUsY10pO3JldHVybntlbDp0LHZpZXdCb3g6cyx4OnNbMF0vMSx5OnNbMV0vMSx3OnUvc1syXSxoOmMvc1szXX19ZnVuY3Rpb24gWChuLGUpe2Z1bmN0aW9uIHIocil7dm9pZCAwPT09ciYmKHI9MCk7dmFyIHQ9ZStyPj0xP2UrcjowO3JldHVybiBuLmVsLmdldFBvaW50QXRMZW5ndGgodCl9dmFyIHQ9JChuLmVsLG4uc3ZnKSxhPXIoKSxvPXIoLTEpLHU9cigxKTtzd2l0Y2gobi5wcm9wZXJ0eSl7Y2FzZVwieFwiOnJldHVybihhLngtdC54KSp0Lnc7Y2FzZVwieVwiOnJldHVybihhLnktdC55KSp0Lmg7Y2FzZVwiYW5nbGVcIjpyZXR1cm4gMTgwKk1hdGguYXRhbjIodS55LW8ueSx1Lngtby54KS9NYXRoLlBJfX1mdW5jdGlvbiBZKG4sZSl7dmFyIHI9L1srLV0/XFxkKlxcLj9cXGQrKD86XFwuXFxkKyk/KD86W2VFXVsrLV0/XFxkKyk/L2csdD1MKGkucHRoKG4pP24udG90YWxMZW5ndGg6bixlKStcIlwiO3JldHVybntvcmlnaW5hbDp0LG51bWJlcnM6dC5tYXRjaChyKT90Lm1hdGNoKHIpLm1hcChOdW1iZXIpOlswXSxzdHJpbmdzOmkuc3RyKG4pfHxlP3Quc3BsaXQocik6W119fWZ1bmN0aW9uIFoobil7cmV0dXJuIG0obj95KGkuYXJyKG4pP24ubWFwKGIpOmIobikpOltdLGZ1bmN0aW9uKG4sZSxyKXtyZXR1cm4gci5pbmRleE9mKG4pPT09ZX0pfWZ1bmN0aW9uIFEobil7dmFyIGU9WihuKTtyZXR1cm4gZS5tYXAoZnVuY3Rpb24obixyKXtyZXR1cm57dGFyZ2V0Om4saWQ6cix0b3RhbDplLmxlbmd0aCx0cmFuc2Zvcm1zOntsaXN0OkUobil9fX0pfWZ1bmN0aW9uIFYobixlKXt2YXIgcj1NKGUpO2lmKC9ec3ByaW5nLy50ZXN0KHIuZWFzaW5nKSYmKHIuZHVyYXRpb249cyhyLmVhc2luZykpLGkuYXJyKG4pKXt2YXIgdD1uLmxlbmd0aDsyPT09dCYmIWkub2JqKG5bMF0pP249e3ZhbHVlOm59OmkuZm5jKGUuZHVyYXRpb24pfHwoci5kdXJhdGlvbj1lLmR1cmF0aW9uL3QpfXZhciBhPWkuYXJyKG4pP246W25dO3JldHVybiBhLm1hcChmdW5jdGlvbihuLHIpe3ZhciB0PWkub2JqKG4pJiYhaS5wdGgobik/bjp7dmFsdWU6bn07cmV0dXJuIGkudW5kKHQuZGVsYXkpJiYodC5kZWxheT1yPzA6ZS5kZWxheSksaS51bmQodC5lbmREZWxheSkmJih0LmVuZERlbGF5PXI9PT1hLmxlbmd0aC0xP2UuZW5kRGVsYXk6MCksdH0pLm1hcChmdW5jdGlvbihuKXtyZXR1cm4gayhuLHIpfSl9ZnVuY3Rpb24geihuLGUpe3ZhciByPVtdLHQ9ZS5rZXlmcmFtZXM7Zm9yKHZhciBhIGluIHQmJihlPWsoZnVuY3Rpb24obil7Zm9yKHZhciBlPW0oeShuLm1hcChmdW5jdGlvbihuKXtyZXR1cm4gT2JqZWN0LmtleXMobil9KSksZnVuY3Rpb24obil7cmV0dXJuIGkua2V5KG4pfSkucmVkdWNlKGZ1bmN0aW9uKG4sZSl7cmV0dXJuIG4uaW5kZXhPZihlKTwwJiZuLnB1c2goZSksbn0sW10pLHI9e30sdD1mdW5jdGlvbih0KXt2YXIgYT1lW3RdO3JbYV09bi5tYXAoZnVuY3Rpb24obil7dmFyIGU9e307Zm9yKHZhciByIGluIG4paS5rZXkocik/cj09YSYmKGUudmFsdWU9bltyXSk6ZVtyXT1uW3JdO3JldHVybiBlfSl9LGE9MDthPGUubGVuZ3RoO2ErKyl0KGEpO3JldHVybiByfSh0KSxlKSksZSlpLmtleShhKSYmci5wdXNoKHtuYW1lOmEsdHdlZW5zOlYoZVthXSxuKX0pO3JldHVybiByfWZ1bmN0aW9uIEgobixlKXt2YXIgcjtyZXR1cm4gbi50d2VlbnMubWFwKGZ1bmN0aW9uKHQpe3ZhciBhPWZ1bmN0aW9uKG4sZSl7dmFyIHI9e307Zm9yKHZhciB0IGluIG4pe3ZhciBhPUIoblt0XSxlKTtpLmFycihhKSYmMT09PShhPWEubWFwKGZ1bmN0aW9uKG4pe3JldHVybiBCKG4sZSl9KSkubGVuZ3RoJiYoYT1hWzBdKSxyW3RdPWF9cmV0dXJuIHIuZHVyYXRpb249cGFyc2VGbG9hdChyLmR1cmF0aW9uKSxyLmRlbGF5PXBhcnNlRmxvYXQoci5kZWxheSkscn0odCxlKSxvPWEudmFsdWUsdT1pLmFycihvKT9vWzFdOm8sYz1DKHUpLHM9TihlLnRhcmdldCxuLm5hbWUsYyxlKSxmPXI/ci50by5vcmlnaW5hbDpzLGw9aS5hcnIobyk/b1swXTpmLGQ9QyhsKXx8QyhzKSxwPWN8fGQ7cmV0dXJuIGkudW5kKHUpJiYodT1mKSxhLmZyb209WShsLHApLGEudG89WShBKHUsbCkscCksYS5zdGFydD1yP3IuZW5kOjAsYS5lbmQ9YS5zdGFydCthLmRlbGF5K2EuZHVyYXRpb24rYS5lbmREZWxheSxhLmVhc2luZz12KGEuZWFzaW5nLGEuZHVyYXRpb24pLGEuaXNQYXRoPWkucHRoKG8pLGEuaXNDb2xvcj1pLmNvbChhLmZyb20ub3JpZ2luYWwpLGEuaXNDb2xvciYmKGEucm91bmQ9MSkscj1hLGF9KX12YXIgRz17Y3NzOmZ1bmN0aW9uKG4sZSxyKXtyZXR1cm4gbi5zdHlsZVtlXT1yfSxhdHRyaWJ1dGU6ZnVuY3Rpb24obixlLHIpe3JldHVybiBuLnNldEF0dHJpYnV0ZShlLHIpfSxvYmplY3Q6ZnVuY3Rpb24obixlLHIpe3JldHVybiBuW2VdPXJ9LHRyYW5zZm9ybTpmdW5jdGlvbihuLGUscix0LGEpe2lmKHQubGlzdC5zZXQoZSxyKSxlPT09dC5sYXN0fHxhKXt2YXIgbz1cIlwiO3QubGlzdC5mb3JFYWNoKGZ1bmN0aW9uKG4sZSl7bys9ZStcIihcIituK1wiKSBcIn0pLG4uc3R5bGUudHJhbnNmb3JtPW99fX07ZnVuY3Rpb24gUihuLGUpe1EobikuZm9yRWFjaChmdW5jdGlvbihuKXtmb3IodmFyIHIgaW4gZSl7dmFyIHQ9QihlW3JdLG4pLGE9bi50YXJnZXQsbz1DKHQpLHU9TihhLHIsbyxuKSxpPUEoTCh0LG98fEModSkpLHUpLGM9RChhLHIpO0dbY10oYSxyLGksbi50cmFuc2Zvcm1zLCEwKX19KX1mdW5jdGlvbiBXKG4sZSl7cmV0dXJuIG0oeShuLm1hcChmdW5jdGlvbihuKXtyZXR1cm4gZS5tYXAoZnVuY3Rpb24oZSl7cmV0dXJuIGZ1bmN0aW9uKG4sZSl7dmFyIHI9RChuLnRhcmdldCxlLm5hbWUpO2lmKHIpe3ZhciB0PUgoZSxuKSxhPXRbdC5sZW5ndGgtMV07cmV0dXJue3R5cGU6cixwcm9wZXJ0eTplLm5hbWUsYW5pbWF0YWJsZTpuLHR3ZWVuczp0LGR1cmF0aW9uOmEuZW5kLGRlbGF5OnRbMF0uZGVsYXksZW5kRGVsYXk6YS5lbmREZWxheX19fShuLGUpfSl9KSksZnVuY3Rpb24obil7cmV0dXJuIWkudW5kKG4pfSl9ZnVuY3Rpb24gSihuLGUpe3ZhciByPW4ubGVuZ3RoLHQ9ZnVuY3Rpb24obil7cmV0dXJuIG4udGltZWxpbmVPZmZzZXQ/bi50aW1lbGluZU9mZnNldDowfSxhPXt9O3JldHVybiBhLmR1cmF0aW9uPXI/TWF0aC5tYXguYXBwbHkoTWF0aCxuLm1hcChmdW5jdGlvbihuKXtyZXR1cm4gdChuKStuLmR1cmF0aW9ufSkpOmUuZHVyYXRpb24sYS5kZWxheT1yP01hdGgubWluLmFwcGx5KE1hdGgsbi5tYXAoZnVuY3Rpb24obil7cmV0dXJuIHQobikrbi5kZWxheX0pKTplLmRlbGF5LGEuZW5kRGVsYXk9cj9hLmR1cmF0aW9uLU1hdGgubWF4LmFwcGx5KE1hdGgsbi5tYXAoZnVuY3Rpb24obil7cmV0dXJuIHQobikrbi5kdXJhdGlvbi1uLmVuZERlbGF5fSkpOmUuZW5kRGVsYXksYX12YXIgSz0wO3ZhciBVLF89W10sbm49W10sZW49ZnVuY3Rpb24oKXtmdW5jdGlvbiBuKCl7VT1yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZSl9ZnVuY3Rpb24gZShlKXt2YXIgcj1fLmxlbmd0aDtpZihyKXtmb3IodmFyIHQ9MDt0PHI7KXt2YXIgYT1fW3RdO2lmKGEucGF1c2VkKXt2YXIgbz1fLmluZGV4T2YoYSk7bz4tMSYmKF8uc3BsaWNlKG8sMSkscj1fLmxlbmd0aCl9ZWxzZSBhLnRpY2soZSk7dCsrfW4oKX1lbHNlIFU9Y2FuY2VsQW5pbWF0aW9uRnJhbWUoVSl9cmV0dXJuIG59KCk7ZnVuY3Rpb24gcm4ocil7dm9pZCAwPT09ciYmKHI9e30pO3ZhciB0LG89MCx1PTAsaT0wLGM9MCxzPW51bGw7ZnVuY3Rpb24gZihuKXt2YXIgZT13aW5kb3cuUHJvbWlzZSYmbmV3IFByb21pc2UoZnVuY3Rpb24obil7cmV0dXJuIHM9bn0pO3JldHVybiBuLmZpbmlzaGVkPWUsZX12YXIgbCxkLHAsaCx2LGcseSxiLHg9KGQ9dyhuLGw9cikscD13KGUsbCksaD16KHAsbCksdj1RKGwudGFyZ2V0cyksZz1XKHYsaCkseT1KKGcscCksYj1LLEsrKyxrKGQse2lkOmIsY2hpbGRyZW46W10sYW5pbWF0YWJsZXM6dixhbmltYXRpb25zOmcsZHVyYXRpb246eS5kdXJhdGlvbixkZWxheTp5LmRlbGF5LGVuZERlbGF5OnkuZW5kRGVsYXl9KSk7Zih4KTtmdW5jdGlvbiBNKCl7dmFyIG49eC5kaXJlY3Rpb247XCJhbHRlcm5hdGVcIiE9PW4mJih4LmRpcmVjdGlvbj1cIm5vcm1hbFwiIT09bj9cIm5vcm1hbFwiOlwicmV2ZXJzZVwiKSx4LnJldmVyc2VkPSF4LnJldmVyc2VkLHQuZm9yRWFjaChmdW5jdGlvbihuKXtyZXR1cm4gbi5yZXZlcnNlZD14LnJldmVyc2VkfSl9ZnVuY3Rpb24gTyhuKXtyZXR1cm4geC5yZXZlcnNlZD94LmR1cmF0aW9uLW46bn1mdW5jdGlvbiBDKCl7bz0wLHU9Tyh4LmN1cnJlbnRUaW1lKSooMS9ybi5zcGVlZCl9ZnVuY3Rpb24gQihuLGUpe2UmJmUuc2VlayhuLWUudGltZWxpbmVPZmZzZXQpfWZ1bmN0aW9uIFAobil7Zm9yKHZhciBlPTAscj14LmFuaW1hdGlvbnMsdD1yLmxlbmd0aDtlPHQ7KXt2YXIgbz1yW2VdLHU9by5hbmltYXRhYmxlLGk9by50d2VlbnMsYz1pLmxlbmd0aC0xLHM9aVtjXTtjJiYocz1tKGksZnVuY3Rpb24oZSl7cmV0dXJuIG48ZS5lbmR9KVswXXx8cyk7Zm9yKHZhciBmPWEobi1zLnN0YXJ0LXMuZGVsYXksMCxzLmR1cmF0aW9uKS9zLmR1cmF0aW9uLGw9aXNOYU4oZik/MTpzLmVhc2luZyhmKSxkPXMudG8uc3RyaW5ncyxwPXMucm91bmQsaD1bXSx2PXMudG8ubnVtYmVycy5sZW5ndGgsZz12b2lkIDAseT0wO3k8djt5Kyspe3ZhciBiPXZvaWQgMCxNPXMudG8ubnVtYmVyc1t5XSx3PXMuZnJvbS5udW1iZXJzW3ldfHwwO2I9cy5pc1BhdGg/WChzLnZhbHVlLGwqTSk6dytsKihNLXcpLHAmJihzLmlzQ29sb3ImJnk+Mnx8KGI9TWF0aC5yb3VuZChiKnApL3ApKSxoLnB1c2goYil9dmFyIGs9ZC5sZW5ndGg7aWYoayl7Zz1kWzBdO2Zvcih2YXIgTz0wO088aztPKyspe2RbT107dmFyIEM9ZFtPKzFdLEI9aFtPXTtpc05hTihCKXx8KGcrPUM/QitDOkIrXCIgXCIpfX1lbHNlIGc9aFswXTtHW28udHlwZV0odS50YXJnZXQsby5wcm9wZXJ0eSxnLHUudHJhbnNmb3Jtcyksby5jdXJyZW50VmFsdWU9ZyxlKyt9fWZ1bmN0aW9uIEkobil7eFtuXSYmIXgucGFzc1Rocm91Z2gmJnhbbl0oeCl9ZnVuY3Rpb24gVChuKXt2YXIgZT14LmR1cmF0aW9uLHI9eC5kZWxheSxsPWUteC5lbmREZWxheSxkPU8obik7eC5wcm9ncmVzcz1hKGQvZSoxMDAsMCwxMDApLHgucmV2ZXJzZVBsYXliYWNrPWQ8eC5jdXJyZW50VGltZSx0JiZmdW5jdGlvbihuKXtpZih4LnJldmVyc2VQbGF5YmFjaylmb3IodmFyIGU9YztlLS07KUIobix0W2VdKTtlbHNlIGZvcih2YXIgcj0wO3I8YztyKyspQihuLHRbcl0pfShkKSwheC5iZWdhbiYmeC5jdXJyZW50VGltZT4wJiYoeC5iZWdhbj0hMCxJKFwiYmVnaW5cIikpLCF4Lmxvb3BCZWdhbiYmeC5jdXJyZW50VGltZT4wJiYoeC5sb29wQmVnYW49ITAsSShcImxvb3BCZWdpblwiKSksZDw9ciYmMCE9PXguY3VycmVudFRpbWUmJlAoMCksKGQ+PWwmJnguY3VycmVudFRpbWUhPT1lfHwhZSkmJlAoZSksZD5yJiZkPGw/KHguY2hhbmdlQmVnYW58fCh4LmNoYW5nZUJlZ2FuPSEwLHguY2hhbmdlQ29tcGxldGVkPSExLEkoXCJjaGFuZ2VCZWdpblwiKSksSShcImNoYW5nZVwiKSxQKGQpKTp4LmNoYW5nZUJlZ2FuJiYoeC5jaGFuZ2VDb21wbGV0ZWQ9ITAseC5jaGFuZ2VCZWdhbj0hMSxJKFwiY2hhbmdlQ29tcGxldGVcIikpLHguY3VycmVudFRpbWU9YShkLDAsZSkseC5iZWdhbiYmSShcInVwZGF0ZVwiKSxuPj1lJiYodT0wLHgucmVtYWluaW5nJiYhMCE9PXgucmVtYWluaW5nJiZ4LnJlbWFpbmluZy0tLHgucmVtYWluaW5nPyhvPWksSShcImxvb3BDb21wbGV0ZVwiKSx4Lmxvb3BCZWdhbj0hMSxcImFsdGVybmF0ZVwiPT09eC5kaXJlY3Rpb24mJk0oKSk6KHgucGF1c2VkPSEwLHguY29tcGxldGVkfHwoeC5jb21wbGV0ZWQ9ITAsSShcImxvb3BDb21wbGV0ZVwiKSxJKFwiY29tcGxldGVcIiksIXgucGFzc1Rocm91Z2gmJlwiUHJvbWlzZVwiaW4gd2luZG93JiYocygpLGYoeCkpKSkpfXJldHVybiB4LnJlc2V0PWZ1bmN0aW9uKCl7dmFyIG49eC5kaXJlY3Rpb247eC5wYXNzVGhyb3VnaD0hMSx4LmN1cnJlbnRUaW1lPTAseC5wcm9ncmVzcz0wLHgucGF1c2VkPSEwLHguYmVnYW49ITEseC5sb29wQmVnYW49ITEseC5jaGFuZ2VCZWdhbj0hMSx4LmNvbXBsZXRlZD0hMSx4LmNoYW5nZUNvbXBsZXRlZD0hMSx4LnJldmVyc2VQbGF5YmFjaz0hMSx4LnJldmVyc2VkPVwicmV2ZXJzZVwiPT09bix4LnJlbWFpbmluZz14Lmxvb3AsdD14LmNoaWxkcmVuO2Zvcih2YXIgZT1jPXQubGVuZ3RoO2UtLTspeC5jaGlsZHJlbltlXS5yZXNldCgpOyh4LnJldmVyc2VkJiYhMCE9PXgubG9vcHx8XCJhbHRlcm5hdGVcIj09PW4mJjE9PT14Lmxvb3ApJiZ4LnJlbWFpbmluZysrLFAoeC5yZXZlcnNlZD94LmR1cmF0aW9uOjApfSx4LnNldD1mdW5jdGlvbihuLGUpe3JldHVybiBSKG4sZSkseH0seC50aWNrPWZ1bmN0aW9uKG4pe2k9bixvfHwobz1pKSxUKChpKyh1LW8pKSpybi5zcGVlZCl9LHguc2Vlaz1mdW5jdGlvbihuKXtUKE8obikpfSx4LnBhdXNlPWZ1bmN0aW9uKCl7eC5wYXVzZWQ9ITAsQygpfSx4LnBsYXk9ZnVuY3Rpb24oKXt4LnBhdXNlZCYmKHguY29tcGxldGVkJiZ4LnJlc2V0KCkseC5wYXVzZWQ9ITEsXy5wdXNoKHgpLEMoKSxVfHxlbigpKX0seC5yZXZlcnNlPWZ1bmN0aW9uKCl7TSgpLHguY29tcGxldGVkPSF4LnJldmVyc2VkLEMoKX0seC5yZXN0YXJ0PWZ1bmN0aW9uKCl7eC5yZXNldCgpLHgucGxheSgpfSx4LnJlc2V0KCkseC5hdXRvcGxheSYmeC5wbGF5KCkseH1mdW5jdGlvbiB0bihuLGUpe2Zvcih2YXIgcj1lLmxlbmd0aDtyLS07KXgobixlW3JdLmFuaW1hdGFibGUudGFyZ2V0KSYmZS5zcGxpY2UociwxKX1yZXR1cm5cInVuZGVmaW5lZFwiIT10eXBlb2YgZG9jdW1lbnQmJmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ2aXNpYmlsaXR5Y2hhbmdlXCIsZnVuY3Rpb24oKXtkb2N1bWVudC5oaWRkZW4/KF8uZm9yRWFjaChmdW5jdGlvbihuKXtyZXR1cm4gbi5wYXVzZSgpfSksbm49Xy5zbGljZSgwKSxybi5ydW5uaW5nPV89W10pOm5uLmZvckVhY2goZnVuY3Rpb24obil7cmV0dXJuIG4ucGxheSgpfSl9KSxybi52ZXJzaW9uPVwiMy4yLjBcIixybi5zcGVlZD0xLHJuLnJ1bm5pbmc9Xyxybi5yZW1vdmU9ZnVuY3Rpb24obil7Zm9yKHZhciBlPVoobikscj1fLmxlbmd0aDtyLS07KXt2YXIgdD1fW3JdLGE9dC5hbmltYXRpb25zLG89dC5jaGlsZHJlbjt0bihlLGEpO2Zvcih2YXIgdT1vLmxlbmd0aDt1LS07KXt2YXIgaT1vW3VdLGM9aS5hbmltYXRpb25zO3RuKGUsYyksYy5sZW5ndGh8fGkuY2hpbGRyZW4ubGVuZ3RofHxvLnNwbGljZSh1LDEpfWEubGVuZ3RofHxvLmxlbmd0aHx8dC5wYXVzZSgpfX0scm4uZ2V0PU4scm4uc2V0PVIscm4uY29udmVydFB4PUkscm4ucGF0aD1mdW5jdGlvbihuLGUpe3ZhciByPWkuc3RyKG4pP2cobilbMF06bix0PWV8fDEwMDtyZXR1cm4gZnVuY3Rpb24obil7cmV0dXJue3Byb3BlcnR5Om4sZWw6cixzdmc6JChyKSx0b3RhbExlbmd0aDpxKHIpKih0LzEwMCl9fX0scm4uc2V0RGFzaG9mZnNldD1mdW5jdGlvbihuKXt2YXIgZT1xKG4pO3JldHVybiBuLnNldEF0dHJpYnV0ZShcInN0cm9rZS1kYXNoYXJyYXlcIixlKSxlfSxybi5zdGFnZ2VyPWZ1bmN0aW9uKG4sZSl7dm9pZCAwPT09ZSYmKGU9e30pO3ZhciByPWUuZGlyZWN0aW9ufHxcIm5vcm1hbFwiLHQ9ZS5lYXNpbmc/dihlLmVhc2luZyk6bnVsbCxhPWUuZ3JpZCxvPWUuYXhpcyx1PWUuZnJvbXx8MCxjPVwiZmlyc3RcIj09PXUscz1cImNlbnRlclwiPT09dSxmPVwibGFzdFwiPT09dSxsPWkuYXJyKG4pLGQ9bD9wYXJzZUZsb2F0KG5bMF0pOnBhcnNlRmxvYXQobikscD1sP3BhcnNlRmxvYXQoblsxXSk6MCxoPUMobD9uWzFdOm4pfHwwLGc9ZS5zdGFydHx8MCsobD9kOjApLG09W10seT0wO3JldHVybiBmdW5jdGlvbihuLGUsaSl7aWYoYyYmKHU9MCkscyYmKHU9KGktMSkvMiksZiYmKHU9aS0xKSwhbS5sZW5ndGgpe2Zvcih2YXIgdj0wO3Y8aTt2Kyspe2lmKGEpe3ZhciBiPXM/KGFbMF0tMSkvMjp1JWFbMF0seD1zPyhhWzFdLTEpLzI6TWF0aC5mbG9vcih1L2FbMF0pLE09Yi12JWFbMF0sdz14LU1hdGguZmxvb3Iodi9hWzBdKSxrPU1hdGguc3FydChNKk0rdyp3KTtcInhcIj09PW8mJihrPS1NKSxcInlcIj09PW8mJihrPS13KSxtLnB1c2goayl9ZWxzZSBtLnB1c2goTWF0aC5hYnModS12KSk7eT1NYXRoLm1heC5hcHBseShNYXRoLG0pfXQmJihtPW0ubWFwKGZ1bmN0aW9uKG4pe3JldHVybiB0KG4veSkqeX0pKSxcInJldmVyc2VcIj09PXImJihtPW0ubWFwKGZ1bmN0aW9uKG4pe3JldHVybiBvP248MD8tMSpuOi1uOk1hdGguYWJzKHktbil9KSl9cmV0dXJuIGcrKGw/KHAtZCkveTpkKSooTWF0aC5yb3VuZCgxMDAqbVtlXSkvMTAwKStofX0scm4udGltZWxpbmU9ZnVuY3Rpb24obil7dm9pZCAwPT09biYmKG49e30pO3ZhciByPXJuKG4pO3JldHVybiByLmR1cmF0aW9uPTAsci5hZGQ9ZnVuY3Rpb24odCxhKXt2YXIgbz1fLmluZGV4T2YociksdT1yLmNoaWxkcmVuO2Z1bmN0aW9uIGMobil7bi5wYXNzVGhyb3VnaD0hMH1vPi0xJiZfLnNwbGljZShvLDEpO2Zvcih2YXIgcz0wO3M8dS5sZW5ndGg7cysrKWModVtzXSk7dmFyIGY9ayh0LHcoZSxuKSk7Zi50YXJnZXRzPWYudGFyZ2V0c3x8bi50YXJnZXRzO3ZhciBsPXIuZHVyYXRpb247Zi5hdXRvcGxheT0hMSxmLmRpcmVjdGlvbj1yLmRpcmVjdGlvbixmLnRpbWVsaW5lT2Zmc2V0PWkudW5kKGEpP2w6QShhLGwpLGMociksci5zZWVrKGYudGltZWxpbmVPZmZzZXQpO3ZhciBkPXJuKGYpO2MoZCksdS5wdXNoKGQpO3ZhciBwPUoodSxuKTtyZXR1cm4gci5kZWxheT1wLmRlbGF5LHIuZW5kRGVsYXk9cC5lbmREZWxheSxyLmR1cmF0aW9uPXAuZHVyYXRpb24sci5zZWVrKDApLHIucmVzZXQoKSxyLmF1dG9wbGF5JiZyLnBsYXkoKSxyfSxyfSxybi5lYXNpbmc9dixybi5wZW5uZXI9aCxybi5yYW5kb209ZnVuY3Rpb24obixlKXtyZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKihlLW4rMSkpK259LHJufSk7XG4iLCIvKiFcbldheXBvaW50cyAtIDQuMC4xXG5Db3B5cmlnaHQgwqkgMjAxMS0yMDE2IENhbGViIFRyb3VnaHRvblxuTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuaHR0cHM6Ly9naXRodWIuY29tL2ltYWtld2VidGhpbmdzL3dheXBvaW50cy9ibG9iL21hc3Rlci9saWNlbnNlcy50eHRcbiovXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0J1xuXG4gIHZhciBrZXlDb3VudGVyID0gMFxuICB2YXIgYWxsV2F5cG9pbnRzID0ge31cblxuICAvKiBodHRwOi8vaW1ha2V3ZWJ0aGluZ3MuY29tL3dheXBvaW50cy9hcGkvd2F5cG9pbnQgKi9cbiAgZnVuY3Rpb24gV2F5cG9pbnQob3B0aW9ucykge1xuICAgIGlmICghb3B0aW9ucykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBvcHRpb25zIHBhc3NlZCB0byBXYXlwb2ludCBjb25zdHJ1Y3RvcicpXG4gICAgfVxuICAgIGlmICghb3B0aW9ucy5lbGVtZW50KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGVsZW1lbnQgb3B0aW9uIHBhc3NlZCB0byBXYXlwb2ludCBjb25zdHJ1Y3RvcicpXG4gICAgfVxuICAgIGlmICghb3B0aW9ucy5oYW5kbGVyKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGhhbmRsZXIgb3B0aW9uIHBhc3NlZCB0byBXYXlwb2ludCBjb25zdHJ1Y3RvcicpXG4gICAgfVxuXG4gICAgdGhpcy5rZXkgPSAnd2F5cG9pbnQtJyArIGtleUNvdW50ZXJcbiAgICB0aGlzLm9wdGlvbnMgPSBXYXlwb2ludC5BZGFwdGVyLmV4dGVuZCh7fSwgV2F5cG9pbnQuZGVmYXVsdHMsIG9wdGlvbnMpXG4gICAgdGhpcy5lbGVtZW50ID0gdGhpcy5vcHRpb25zLmVsZW1lbnRcbiAgICB0aGlzLmFkYXB0ZXIgPSBuZXcgV2F5cG9pbnQuQWRhcHRlcih0aGlzLmVsZW1lbnQpXG4gICAgdGhpcy5jYWxsYmFjayA9IG9wdGlvbnMuaGFuZGxlclxuICAgIHRoaXMuYXhpcyA9IHRoaXMub3B0aW9ucy5ob3Jpem9udGFsID8gJ2hvcml6b250YWwnIDogJ3ZlcnRpY2FsJ1xuICAgIHRoaXMuZW5hYmxlZCA9IHRoaXMub3B0aW9ucy5lbmFibGVkXG4gICAgdGhpcy50cmlnZ2VyUG9pbnQgPSBudWxsXG4gICAgdGhpcy5ncm91cCA9IFdheXBvaW50Lkdyb3VwLmZpbmRPckNyZWF0ZSh7XG4gICAgICBuYW1lOiB0aGlzLm9wdGlvbnMuZ3JvdXAsXG4gICAgICBheGlzOiB0aGlzLmF4aXNcbiAgICB9KVxuICAgIHRoaXMuY29udGV4dCA9IFdheXBvaW50LkNvbnRleHQuZmluZE9yQ3JlYXRlQnlFbGVtZW50KHRoaXMub3B0aW9ucy5jb250ZXh0KVxuXG4gICAgaWYgKFdheXBvaW50Lm9mZnNldEFsaWFzZXNbdGhpcy5vcHRpb25zLm9mZnNldF0pIHtcbiAgICAgIHRoaXMub3B0aW9ucy5vZmZzZXQgPSBXYXlwb2ludC5vZmZzZXRBbGlhc2VzW3RoaXMub3B0aW9ucy5vZmZzZXRdXG4gICAgfVxuICAgIHRoaXMuZ3JvdXAuYWRkKHRoaXMpXG4gICAgdGhpcy5jb250ZXh0LmFkZCh0aGlzKVxuICAgIGFsbFdheXBvaW50c1t0aGlzLmtleV0gPSB0aGlzXG4gICAga2V5Q291bnRlciArPSAxXG4gIH1cblxuICAvKiBQcml2YXRlICovXG4gIFdheXBvaW50LnByb3RvdHlwZS5xdWV1ZVRyaWdnZXIgPSBmdW5jdGlvbihkaXJlY3Rpb24pIHtcbiAgICB0aGlzLmdyb3VwLnF1ZXVlVHJpZ2dlcih0aGlzLCBkaXJlY3Rpb24pXG4gIH1cblxuICAvKiBQcml2YXRlICovXG4gIFdheXBvaW50LnByb3RvdHlwZS50cmlnZ2VyID0gZnVuY3Rpb24oYXJncykge1xuICAgIGlmICghdGhpcy5lbmFibGVkKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgaWYgKHRoaXMuY2FsbGJhY2spIHtcbiAgICAgIHRoaXMuY2FsbGJhY2suYXBwbHkodGhpcywgYXJncylcbiAgICB9XG4gIH1cblxuICAvKiBQdWJsaWMgKi9cbiAgLyogaHR0cDovL2ltYWtld2VidGhpbmdzLmNvbS93YXlwb2ludHMvYXBpL2Rlc3Ryb3kgKi9cbiAgV2F5cG9pbnQucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmNvbnRleHQucmVtb3ZlKHRoaXMpXG4gICAgdGhpcy5ncm91cC5yZW1vdmUodGhpcylcbiAgICBkZWxldGUgYWxsV2F5cG9pbnRzW3RoaXMua2V5XVxuICB9XG5cbiAgLyogUHVibGljICovXG4gIC8qIGh0dHA6Ly9pbWFrZXdlYnRoaW5ncy5jb20vd2F5cG9pbnRzL2FwaS9kaXNhYmxlICovXG4gIFdheXBvaW50LnByb3RvdHlwZS5kaXNhYmxlID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5lbmFibGVkID0gZmFsc2VcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLyogUHVibGljICovXG4gIC8qIGh0dHA6Ly9pbWFrZXdlYnRoaW5ncy5jb20vd2F5cG9pbnRzL2FwaS9lbmFibGUgKi9cbiAgV2F5cG9pbnQucHJvdG90eXBlLmVuYWJsZSA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuY29udGV4dC5yZWZyZXNoKClcbiAgICB0aGlzLmVuYWJsZWQgPSB0cnVlXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8qIFB1YmxpYyAqL1xuICAvKiBodHRwOi8vaW1ha2V3ZWJ0aGluZ3MuY29tL3dheXBvaW50cy9hcGkvbmV4dCAqL1xuICBXYXlwb2ludC5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmdyb3VwLm5leHQodGhpcylcbiAgfVxuXG4gIC8qIFB1YmxpYyAqL1xuICAvKiBodHRwOi8vaW1ha2V3ZWJ0aGluZ3MuY29tL3dheXBvaW50cy9hcGkvcHJldmlvdXMgKi9cbiAgV2F5cG9pbnQucHJvdG90eXBlLnByZXZpb3VzID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuZ3JvdXAucHJldmlvdXModGhpcylcbiAgfVxuXG4gIC8qIFByaXZhdGUgKi9cbiAgV2F5cG9pbnQuaW52b2tlQWxsID0gZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgdmFyIGFsbFdheXBvaW50c0FycmF5ID0gW11cbiAgICBmb3IgKHZhciB3YXlwb2ludEtleSBpbiBhbGxXYXlwb2ludHMpIHtcbiAgICAgIGFsbFdheXBvaW50c0FycmF5LnB1c2goYWxsV2F5cG9pbnRzW3dheXBvaW50S2V5XSlcbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IDAsIGVuZCA9IGFsbFdheXBvaW50c0FycmF5Lmxlbmd0aDsgaSA8IGVuZDsgaSsrKSB7XG4gICAgICBhbGxXYXlwb2ludHNBcnJheVtpXVttZXRob2RdKClcbiAgICB9XG4gIH1cblxuICAvKiBQdWJsaWMgKi9cbiAgLyogaHR0cDovL2ltYWtld2VidGhpbmdzLmNvbS93YXlwb2ludHMvYXBpL2Rlc3Ryb3ktYWxsICovXG4gIFdheXBvaW50LmRlc3Ryb3lBbGwgPSBmdW5jdGlvbigpIHtcbiAgICBXYXlwb2ludC5pbnZva2VBbGwoJ2Rlc3Ryb3knKVxuICB9XG5cbiAgLyogUHVibGljICovXG4gIC8qIGh0dHA6Ly9pbWFrZXdlYnRoaW5ncy5jb20vd2F5cG9pbnRzL2FwaS9kaXNhYmxlLWFsbCAqL1xuICBXYXlwb2ludC5kaXNhYmxlQWxsID0gZnVuY3Rpb24oKSB7XG4gICAgV2F5cG9pbnQuaW52b2tlQWxsKCdkaXNhYmxlJylcbiAgfVxuXG4gIC8qIFB1YmxpYyAqL1xuICAvKiBodHRwOi8vaW1ha2V3ZWJ0aGluZ3MuY29tL3dheXBvaW50cy9hcGkvZW5hYmxlLWFsbCAqL1xuICBXYXlwb2ludC5lbmFibGVBbGwgPSBmdW5jdGlvbigpIHtcbiAgICBXYXlwb2ludC5Db250ZXh0LnJlZnJlc2hBbGwoKVxuICAgIGZvciAodmFyIHdheXBvaW50S2V5IGluIGFsbFdheXBvaW50cykge1xuICAgICAgYWxsV2F5cG9pbnRzW3dheXBvaW50S2V5XS5lbmFibGVkID0gdHJ1ZVxuICAgIH1cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLyogUHVibGljICovXG4gIC8qIGh0dHA6Ly9pbWFrZXdlYnRoaW5ncy5jb20vd2F5cG9pbnRzL2FwaS9yZWZyZXNoLWFsbCAqL1xuICBXYXlwb2ludC5yZWZyZXNoQWxsID0gZnVuY3Rpb24oKSB7XG4gICAgV2F5cG9pbnQuQ29udGV4dC5yZWZyZXNoQWxsKClcbiAgfVxuXG4gIC8qIFB1YmxpYyAqL1xuICAvKiBodHRwOi8vaW1ha2V3ZWJ0aGluZ3MuY29tL3dheXBvaW50cy9hcGkvdmlld3BvcnQtaGVpZ2h0ICovXG4gIFdheXBvaW50LnZpZXdwb3J0SGVpZ2h0ID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5pbm5lckhlaWdodCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0XG4gIH1cblxuICAvKiBQdWJsaWMgKi9cbiAgLyogaHR0cDovL2ltYWtld2VidGhpbmdzLmNvbS93YXlwb2ludHMvYXBpL3ZpZXdwb3J0LXdpZHRoICovXG4gIFdheXBvaW50LnZpZXdwb3J0V2lkdGggPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoXG4gIH1cblxuICBXYXlwb2ludC5hZGFwdGVycyA9IFtdXG5cbiAgV2F5cG9pbnQuZGVmYXVsdHMgPSB7XG4gICAgY29udGV4dDogd2luZG93LFxuICAgIGNvbnRpbnVvdXM6IHRydWUsXG4gICAgZW5hYmxlZDogdHJ1ZSxcbiAgICBncm91cDogJ2RlZmF1bHQnLFxuICAgIGhvcml6b250YWw6IGZhbHNlLFxuICAgIG9mZnNldDogMFxuICB9XG5cbiAgV2F5cG9pbnQub2Zmc2V0QWxpYXNlcyA9IHtcbiAgICAnYm90dG9tLWluLXZpZXcnOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbnRleHQuaW5uZXJIZWlnaHQoKSAtIHRoaXMuYWRhcHRlci5vdXRlckhlaWdodCgpXG4gICAgfSxcbiAgICAncmlnaHQtaW4tdmlldyc6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuY29udGV4dC5pbm5lcldpZHRoKCkgLSB0aGlzLmFkYXB0ZXIub3V0ZXJXaWR0aCgpXG4gICAgfVxuICB9XG5cbiAgd2luZG93LldheXBvaW50ID0gV2F5cG9pbnRcbn0oKSlcbjsoZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0J1xuXG4gIGZ1bmN0aW9uIHJlcXVlc3RBbmltYXRpb25GcmFtZVNoaW0oY2FsbGJhY2spIHtcbiAgICB3aW5kb3cuc2V0VGltZW91dChjYWxsYmFjaywgMTAwMCAvIDYwKVxuICB9XG5cbiAgdmFyIGtleUNvdW50ZXIgPSAwXG4gIHZhciBjb250ZXh0cyA9IHt9XG4gIHZhciBXYXlwb2ludCA9IHdpbmRvdy5XYXlwb2ludFxuICB2YXIgb2xkV2luZG93TG9hZCA9IHdpbmRvdy5vbmxvYWRcblxuICAvKiBodHRwOi8vaW1ha2V3ZWJ0aGluZ3MuY29tL3dheXBvaW50cy9hcGkvY29udGV4dCAqL1xuICBmdW5jdGlvbiBDb250ZXh0KGVsZW1lbnQpIHtcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50XG4gICAgdGhpcy5BZGFwdGVyID0gV2F5cG9pbnQuQWRhcHRlclxuICAgIHRoaXMuYWRhcHRlciA9IG5ldyB0aGlzLkFkYXB0ZXIoZWxlbWVudClcbiAgICB0aGlzLmtleSA9ICd3YXlwb2ludC1jb250ZXh0LScgKyBrZXlDb3VudGVyXG4gICAgdGhpcy5kaWRTY3JvbGwgPSBmYWxzZVxuICAgIHRoaXMuZGlkUmVzaXplID0gZmFsc2VcbiAgICB0aGlzLm9sZFNjcm9sbCA9IHtcbiAgICAgIHg6IHRoaXMuYWRhcHRlci5zY3JvbGxMZWZ0KCksXG4gICAgICB5OiB0aGlzLmFkYXB0ZXIuc2Nyb2xsVG9wKClcbiAgICB9XG4gICAgdGhpcy53YXlwb2ludHMgPSB7XG4gICAgICB2ZXJ0aWNhbDoge30sXG4gICAgICBob3Jpem9udGFsOiB7fVxuICAgIH1cblxuICAgIGVsZW1lbnQud2F5cG9pbnRDb250ZXh0S2V5ID0gdGhpcy5rZXlcbiAgICBjb250ZXh0c1tlbGVtZW50LndheXBvaW50Q29udGV4dEtleV0gPSB0aGlzXG4gICAga2V5Q291bnRlciArPSAxXG4gICAgaWYgKCFXYXlwb2ludC53aW5kb3dDb250ZXh0KSB7XG4gICAgICBXYXlwb2ludC53aW5kb3dDb250ZXh0ID0gdHJ1ZVxuICAgICAgV2F5cG9pbnQud2luZG93Q29udGV4dCA9IG5ldyBDb250ZXh0KHdpbmRvdylcbiAgICB9XG5cbiAgICB0aGlzLmNyZWF0ZVRocm90dGxlZFNjcm9sbEhhbmRsZXIoKVxuICAgIHRoaXMuY3JlYXRlVGhyb3R0bGVkUmVzaXplSGFuZGxlcigpXG4gIH1cblxuICAvKiBQcml2YXRlICovXG4gIENvbnRleHQucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uKHdheXBvaW50KSB7XG4gICAgdmFyIGF4aXMgPSB3YXlwb2ludC5vcHRpb25zLmhvcml6b250YWwgPyAnaG9yaXpvbnRhbCcgOiAndmVydGljYWwnXG4gICAgdGhpcy53YXlwb2ludHNbYXhpc11bd2F5cG9pbnQua2V5XSA9IHdheXBvaW50XG4gICAgdGhpcy5yZWZyZXNoKClcbiAgfVxuXG4gIC8qIFByaXZhdGUgKi9cbiAgQ29udGV4dC5wcm90b3R5cGUuY2hlY2tFbXB0eSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBob3Jpem9udGFsRW1wdHkgPSB0aGlzLkFkYXB0ZXIuaXNFbXB0eU9iamVjdCh0aGlzLndheXBvaW50cy5ob3Jpem9udGFsKVxuICAgIHZhciB2ZXJ0aWNhbEVtcHR5ID0gdGhpcy5BZGFwdGVyLmlzRW1wdHlPYmplY3QodGhpcy53YXlwb2ludHMudmVydGljYWwpXG4gICAgdmFyIGlzV2luZG93ID0gdGhpcy5lbGVtZW50ID09IHRoaXMuZWxlbWVudC53aW5kb3dcbiAgICBpZiAoaG9yaXpvbnRhbEVtcHR5ICYmIHZlcnRpY2FsRW1wdHkgJiYgIWlzV2luZG93KSB7XG4gICAgICB0aGlzLmFkYXB0ZXIub2ZmKCcud2F5cG9pbnRzJylcbiAgICAgIGRlbGV0ZSBjb250ZXh0c1t0aGlzLmtleV1cbiAgICB9XG4gIH1cblxuICAvKiBQcml2YXRlICovXG4gIENvbnRleHQucHJvdG90eXBlLmNyZWF0ZVRocm90dGxlZFJlc2l6ZUhhbmRsZXIgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXNcblxuICAgIGZ1bmN0aW9uIHJlc2l6ZUhhbmRsZXIoKSB7XG4gICAgICBzZWxmLmhhbmRsZVJlc2l6ZSgpXG4gICAgICBzZWxmLmRpZFJlc2l6ZSA9IGZhbHNlXG4gICAgfVxuXG4gICAgdGhpcy5hZGFwdGVyLm9uKCdyZXNpemUud2F5cG9pbnRzJywgZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoIXNlbGYuZGlkUmVzaXplKSB7XG4gICAgICAgIHNlbGYuZGlkUmVzaXplID0gdHJ1ZVxuICAgICAgICBXYXlwb2ludC5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVzaXplSGFuZGxlcilcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgLyogUHJpdmF0ZSAqL1xuICBDb250ZXh0LnByb3RvdHlwZS5jcmVhdGVUaHJvdHRsZWRTY3JvbGxIYW5kbGVyID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzXG4gICAgZnVuY3Rpb24gc2Nyb2xsSGFuZGxlcigpIHtcbiAgICAgIHNlbGYuaGFuZGxlU2Nyb2xsKClcbiAgICAgIHNlbGYuZGlkU2Nyb2xsID0gZmFsc2VcbiAgICB9XG5cbiAgICB0aGlzLmFkYXB0ZXIub24oJ3Njcm9sbC53YXlwb2ludHMnLCBmdW5jdGlvbigpIHtcbiAgICAgIGlmICghc2VsZi5kaWRTY3JvbGwgfHwgV2F5cG9pbnQuaXNUb3VjaCkge1xuICAgICAgICBzZWxmLmRpZFNjcm9sbCA9IHRydWVcbiAgICAgICAgV2F5cG9pbnQucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHNjcm9sbEhhbmRsZXIpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIC8qIFByaXZhdGUgKi9cbiAgQ29udGV4dC5wcm90b3R5cGUuaGFuZGxlUmVzaXplID0gZnVuY3Rpb24oKSB7XG4gICAgV2F5cG9pbnQuQ29udGV4dC5yZWZyZXNoQWxsKClcbiAgfVxuXG4gIC8qIFByaXZhdGUgKi9cbiAgQ29udGV4dC5wcm90b3R5cGUuaGFuZGxlU2Nyb2xsID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHRyaWdnZXJlZEdyb3VwcyA9IHt9XG4gICAgdmFyIGF4ZXMgPSB7XG4gICAgICBob3Jpem9udGFsOiB7XG4gICAgICAgIG5ld1Njcm9sbDogdGhpcy5hZGFwdGVyLnNjcm9sbExlZnQoKSxcbiAgICAgICAgb2xkU2Nyb2xsOiB0aGlzLm9sZFNjcm9sbC54LFxuICAgICAgICBmb3J3YXJkOiAncmlnaHQnLFxuICAgICAgICBiYWNrd2FyZDogJ2xlZnQnXG4gICAgICB9LFxuICAgICAgdmVydGljYWw6IHtcbiAgICAgICAgbmV3U2Nyb2xsOiB0aGlzLmFkYXB0ZXIuc2Nyb2xsVG9wKCksXG4gICAgICAgIG9sZFNjcm9sbDogdGhpcy5vbGRTY3JvbGwueSxcbiAgICAgICAgZm9yd2FyZDogJ2Rvd24nLFxuICAgICAgICBiYWNrd2FyZDogJ3VwJ1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIGF4aXNLZXkgaW4gYXhlcykge1xuICAgICAgdmFyIGF4aXMgPSBheGVzW2F4aXNLZXldXG4gICAgICB2YXIgaXNGb3J3YXJkID0gYXhpcy5uZXdTY3JvbGwgPiBheGlzLm9sZFNjcm9sbFxuICAgICAgdmFyIGRpcmVjdGlvbiA9IGlzRm9yd2FyZCA/IGF4aXMuZm9yd2FyZCA6IGF4aXMuYmFja3dhcmRcblxuICAgICAgZm9yICh2YXIgd2F5cG9pbnRLZXkgaW4gdGhpcy53YXlwb2ludHNbYXhpc0tleV0pIHtcbiAgICAgICAgdmFyIHdheXBvaW50ID0gdGhpcy53YXlwb2ludHNbYXhpc0tleV1bd2F5cG9pbnRLZXldXG4gICAgICAgIGlmICh3YXlwb2ludC50cmlnZ2VyUG9pbnQgPT09IG51bGwpIHtcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG4gICAgICAgIHZhciB3YXNCZWZvcmVUcmlnZ2VyUG9pbnQgPSBheGlzLm9sZFNjcm9sbCA8IHdheXBvaW50LnRyaWdnZXJQb2ludFxuICAgICAgICB2YXIgbm93QWZ0ZXJUcmlnZ2VyUG9pbnQgPSBheGlzLm5ld1Njcm9sbCA+PSB3YXlwb2ludC50cmlnZ2VyUG9pbnRcbiAgICAgICAgdmFyIGNyb3NzZWRGb3J3YXJkID0gd2FzQmVmb3JlVHJpZ2dlclBvaW50ICYmIG5vd0FmdGVyVHJpZ2dlclBvaW50XG4gICAgICAgIHZhciBjcm9zc2VkQmFja3dhcmQgPSAhd2FzQmVmb3JlVHJpZ2dlclBvaW50ICYmICFub3dBZnRlclRyaWdnZXJQb2ludFxuICAgICAgICBpZiAoY3Jvc3NlZEZvcndhcmQgfHwgY3Jvc3NlZEJhY2t3YXJkKSB7XG4gICAgICAgICAgd2F5cG9pbnQucXVldWVUcmlnZ2VyKGRpcmVjdGlvbilcbiAgICAgICAgICB0cmlnZ2VyZWRHcm91cHNbd2F5cG9pbnQuZ3JvdXAuaWRdID0gd2F5cG9pbnQuZ3JvdXBcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIGdyb3VwS2V5IGluIHRyaWdnZXJlZEdyb3Vwcykge1xuICAgICAgdHJpZ2dlcmVkR3JvdXBzW2dyb3VwS2V5XS5mbHVzaFRyaWdnZXJzKClcbiAgICB9XG5cbiAgICB0aGlzLm9sZFNjcm9sbCA9IHtcbiAgICAgIHg6IGF4ZXMuaG9yaXpvbnRhbC5uZXdTY3JvbGwsXG4gICAgICB5OiBheGVzLnZlcnRpY2FsLm5ld1Njcm9sbFxuICAgIH1cbiAgfVxuXG4gIC8qIFByaXZhdGUgKi9cbiAgQ29udGV4dC5wcm90b3R5cGUuaW5uZXJIZWlnaHQgPSBmdW5jdGlvbigpIHtcbiAgICAvKmVzbGludC1kaXNhYmxlIGVxZXFlcSAqL1xuICAgIGlmICh0aGlzLmVsZW1lbnQgPT0gdGhpcy5lbGVtZW50LndpbmRvdykge1xuICAgICAgcmV0dXJuIFdheXBvaW50LnZpZXdwb3J0SGVpZ2h0KClcbiAgICB9XG4gICAgLyplc2xpbnQtZW5hYmxlIGVxZXFlcSAqL1xuICAgIHJldHVybiB0aGlzLmFkYXB0ZXIuaW5uZXJIZWlnaHQoKVxuICB9XG5cbiAgLyogUHJpdmF0ZSAqL1xuICBDb250ZXh0LnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbih3YXlwb2ludCkge1xuICAgIGRlbGV0ZSB0aGlzLndheXBvaW50c1t3YXlwb2ludC5heGlzXVt3YXlwb2ludC5rZXldXG4gICAgdGhpcy5jaGVja0VtcHR5KClcbiAgfVxuXG4gIC8qIFByaXZhdGUgKi9cbiAgQ29udGV4dC5wcm90b3R5cGUuaW5uZXJXaWR0aCA9IGZ1bmN0aW9uKCkge1xuICAgIC8qZXNsaW50LWRpc2FibGUgZXFlcWVxICovXG4gICAgaWYgKHRoaXMuZWxlbWVudCA9PSB0aGlzLmVsZW1lbnQud2luZG93KSB7XG4gICAgICByZXR1cm4gV2F5cG9pbnQudmlld3BvcnRXaWR0aCgpXG4gICAgfVxuICAgIC8qZXNsaW50LWVuYWJsZSBlcWVxZXEgKi9cbiAgICByZXR1cm4gdGhpcy5hZGFwdGVyLmlubmVyV2lkdGgoKVxuICB9XG5cbiAgLyogUHVibGljICovXG4gIC8qIGh0dHA6Ly9pbWFrZXdlYnRoaW5ncy5jb20vd2F5cG9pbnRzL2FwaS9jb250ZXh0LWRlc3Ryb3kgKi9cbiAgQ29udGV4dC5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBhbGxXYXlwb2ludHMgPSBbXVxuICAgIGZvciAodmFyIGF4aXMgaW4gdGhpcy53YXlwb2ludHMpIHtcbiAgICAgIGZvciAodmFyIHdheXBvaW50S2V5IGluIHRoaXMud2F5cG9pbnRzW2F4aXNdKSB7XG4gICAgICAgIGFsbFdheXBvaW50cy5wdXNoKHRoaXMud2F5cG9pbnRzW2F4aXNdW3dheXBvaW50S2V5XSlcbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IDAsIGVuZCA9IGFsbFdheXBvaW50cy5sZW5ndGg7IGkgPCBlbmQ7IGkrKykge1xuICAgICAgYWxsV2F5cG9pbnRzW2ldLmRlc3Ryb3koKVxuICAgIH1cbiAgfVxuXG4gIC8qIFB1YmxpYyAqL1xuICAvKiBodHRwOi8vaW1ha2V3ZWJ0aGluZ3MuY29tL3dheXBvaW50cy9hcGkvY29udGV4dC1yZWZyZXNoICovXG4gIENvbnRleHQucHJvdG90eXBlLnJlZnJlc2ggPSBmdW5jdGlvbigpIHtcbiAgICAvKmVzbGludC1kaXNhYmxlIGVxZXFlcSAqL1xuICAgIHZhciBpc1dpbmRvdyA9IHRoaXMuZWxlbWVudCA9PSB0aGlzLmVsZW1lbnQud2luZG93XG4gICAgLyplc2xpbnQtZW5hYmxlIGVxZXFlcSAqL1xuICAgIHZhciBjb250ZXh0T2Zmc2V0ID0gaXNXaW5kb3cgPyB1bmRlZmluZWQgOiB0aGlzLmFkYXB0ZXIub2Zmc2V0KClcbiAgICB2YXIgdHJpZ2dlcmVkR3JvdXBzID0ge31cbiAgICB2YXIgYXhlc1xuXG4gICAgdGhpcy5oYW5kbGVTY3JvbGwoKVxuICAgIGF4ZXMgPSB7XG4gICAgICBob3Jpem9udGFsOiB7XG4gICAgICAgIGNvbnRleHRPZmZzZXQ6IGlzV2luZG93ID8gMCA6IGNvbnRleHRPZmZzZXQubGVmdCxcbiAgICAgICAgY29udGV4dFNjcm9sbDogaXNXaW5kb3cgPyAwIDogdGhpcy5vbGRTY3JvbGwueCxcbiAgICAgICAgY29udGV4dERpbWVuc2lvbjogdGhpcy5pbm5lcldpZHRoKCksXG4gICAgICAgIG9sZFNjcm9sbDogdGhpcy5vbGRTY3JvbGwueCxcbiAgICAgICAgZm9yd2FyZDogJ3JpZ2h0JyxcbiAgICAgICAgYmFja3dhcmQ6ICdsZWZ0JyxcbiAgICAgICAgb2Zmc2V0UHJvcDogJ2xlZnQnXG4gICAgICB9LFxuICAgICAgdmVydGljYWw6IHtcbiAgICAgICAgY29udGV4dE9mZnNldDogaXNXaW5kb3cgPyAwIDogY29udGV4dE9mZnNldC50b3AsXG4gICAgICAgIGNvbnRleHRTY3JvbGw6IGlzV2luZG93ID8gMCA6IHRoaXMub2xkU2Nyb2xsLnksXG4gICAgICAgIGNvbnRleHREaW1lbnNpb246IHRoaXMuaW5uZXJIZWlnaHQoKSxcbiAgICAgICAgb2xkU2Nyb2xsOiB0aGlzLm9sZFNjcm9sbC55LFxuICAgICAgICBmb3J3YXJkOiAnZG93bicsXG4gICAgICAgIGJhY2t3YXJkOiAndXAnLFxuICAgICAgICBvZmZzZXRQcm9wOiAndG9wJ1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIGF4aXNLZXkgaW4gYXhlcykge1xuICAgICAgdmFyIGF4aXMgPSBheGVzW2F4aXNLZXldXG4gICAgICBmb3IgKHZhciB3YXlwb2ludEtleSBpbiB0aGlzLndheXBvaW50c1theGlzS2V5XSkge1xuICAgICAgICB2YXIgd2F5cG9pbnQgPSB0aGlzLndheXBvaW50c1theGlzS2V5XVt3YXlwb2ludEtleV1cbiAgICAgICAgdmFyIGFkanVzdG1lbnQgPSB3YXlwb2ludC5vcHRpb25zLm9mZnNldFxuICAgICAgICB2YXIgb2xkVHJpZ2dlclBvaW50ID0gd2F5cG9pbnQudHJpZ2dlclBvaW50XG4gICAgICAgIHZhciBlbGVtZW50T2Zmc2V0ID0gMFxuICAgICAgICB2YXIgZnJlc2hXYXlwb2ludCA9IG9sZFRyaWdnZXJQb2ludCA9PSBudWxsXG4gICAgICAgIHZhciBjb250ZXh0TW9kaWZpZXIsIHdhc0JlZm9yZVNjcm9sbCwgbm93QWZ0ZXJTY3JvbGxcbiAgICAgICAgdmFyIHRyaWdnZXJlZEJhY2t3YXJkLCB0cmlnZ2VyZWRGb3J3YXJkXG5cbiAgICAgICAgaWYgKHdheXBvaW50LmVsZW1lbnQgIT09IHdheXBvaW50LmVsZW1lbnQud2luZG93KSB7XG4gICAgICAgICAgZWxlbWVudE9mZnNldCA9IHdheXBvaW50LmFkYXB0ZXIub2Zmc2V0KClbYXhpcy5vZmZzZXRQcm9wXVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBhZGp1c3RtZW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgYWRqdXN0bWVudCA9IGFkanVzdG1lbnQuYXBwbHkod2F5cG9pbnQpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIGFkanVzdG1lbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgYWRqdXN0bWVudCA9IHBhcnNlRmxvYXQoYWRqdXN0bWVudClcbiAgICAgICAgICBpZiAod2F5cG9pbnQub3B0aW9ucy5vZmZzZXQuaW5kZXhPZignJScpID4gLSAxKSB7XG4gICAgICAgICAgICBhZGp1c3RtZW50ID0gTWF0aC5jZWlsKGF4aXMuY29udGV4dERpbWVuc2lvbiAqIGFkanVzdG1lbnQgLyAxMDApXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29udGV4dE1vZGlmaWVyID0gYXhpcy5jb250ZXh0U2Nyb2xsIC0gYXhpcy5jb250ZXh0T2Zmc2V0XG4gICAgICAgIHdheXBvaW50LnRyaWdnZXJQb2ludCA9IE1hdGguZmxvb3IoZWxlbWVudE9mZnNldCArIGNvbnRleHRNb2RpZmllciAtIGFkanVzdG1lbnQpXG4gICAgICAgIHdhc0JlZm9yZVNjcm9sbCA9IG9sZFRyaWdnZXJQb2ludCA8IGF4aXMub2xkU2Nyb2xsXG4gICAgICAgIG5vd0FmdGVyU2Nyb2xsID0gd2F5cG9pbnQudHJpZ2dlclBvaW50ID49IGF4aXMub2xkU2Nyb2xsXG4gICAgICAgIHRyaWdnZXJlZEJhY2t3YXJkID0gd2FzQmVmb3JlU2Nyb2xsICYmIG5vd0FmdGVyU2Nyb2xsXG4gICAgICAgIHRyaWdnZXJlZEZvcndhcmQgPSAhd2FzQmVmb3JlU2Nyb2xsICYmICFub3dBZnRlclNjcm9sbFxuXG4gICAgICAgIGlmICghZnJlc2hXYXlwb2ludCAmJiB0cmlnZ2VyZWRCYWNrd2FyZCkge1xuICAgICAgICAgIHdheXBvaW50LnF1ZXVlVHJpZ2dlcihheGlzLmJhY2t3YXJkKVxuICAgICAgICAgIHRyaWdnZXJlZEdyb3Vwc1t3YXlwb2ludC5ncm91cC5pZF0gPSB3YXlwb2ludC5ncm91cFxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCFmcmVzaFdheXBvaW50ICYmIHRyaWdnZXJlZEZvcndhcmQpIHtcbiAgICAgICAgICB3YXlwb2ludC5xdWV1ZVRyaWdnZXIoYXhpcy5mb3J3YXJkKVxuICAgICAgICAgIHRyaWdnZXJlZEdyb3Vwc1t3YXlwb2ludC5ncm91cC5pZF0gPSB3YXlwb2ludC5ncm91cFxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGZyZXNoV2F5cG9pbnQgJiYgYXhpcy5vbGRTY3JvbGwgPj0gd2F5cG9pbnQudHJpZ2dlclBvaW50KSB7XG4gICAgICAgICAgd2F5cG9pbnQucXVldWVUcmlnZ2VyKGF4aXMuZm9yd2FyZClcbiAgICAgICAgICB0cmlnZ2VyZWRHcm91cHNbd2F5cG9pbnQuZ3JvdXAuaWRdID0gd2F5cG9pbnQuZ3JvdXBcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIFdheXBvaW50LnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpIHtcbiAgICAgIGZvciAodmFyIGdyb3VwS2V5IGluIHRyaWdnZXJlZEdyb3Vwcykge1xuICAgICAgICB0cmlnZ2VyZWRHcm91cHNbZ3JvdXBLZXldLmZsdXNoVHJpZ2dlcnMoKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLyogUHJpdmF0ZSAqL1xuICBDb250ZXh0LmZpbmRPckNyZWF0ZUJ5RWxlbWVudCA9IGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgICByZXR1cm4gQ29udGV4dC5maW5kQnlFbGVtZW50KGVsZW1lbnQpIHx8IG5ldyBDb250ZXh0KGVsZW1lbnQpXG4gIH1cblxuICAvKiBQcml2YXRlICovXG4gIENvbnRleHQucmVmcmVzaEFsbCA9IGZ1bmN0aW9uKCkge1xuICAgIGZvciAodmFyIGNvbnRleHRJZCBpbiBjb250ZXh0cykge1xuICAgICAgY29udGV4dHNbY29udGV4dElkXS5yZWZyZXNoKClcbiAgICB9XG4gIH1cblxuICAvKiBQdWJsaWMgKi9cbiAgLyogaHR0cDovL2ltYWtld2VidGhpbmdzLmNvbS93YXlwb2ludHMvYXBpL2NvbnRleHQtZmluZC1ieS1lbGVtZW50ICovXG4gIENvbnRleHQuZmluZEJ5RWxlbWVudCA9IGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgICByZXR1cm4gY29udGV4dHNbZWxlbWVudC53YXlwb2ludENvbnRleHRLZXldXG4gIH1cblxuICB3aW5kb3cub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKG9sZFdpbmRvd0xvYWQpIHtcbiAgICAgIG9sZFdpbmRvd0xvYWQoKVxuICAgIH1cbiAgICBDb250ZXh0LnJlZnJlc2hBbGwoKVxuICB9XG5cblxuICBXYXlwb2ludC5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgIHZhciByZXF1ZXN0Rm4gPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICB3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWVTaGltXG4gICAgcmVxdWVzdEZuLmNhbGwod2luZG93LCBjYWxsYmFjaylcbiAgfVxuICBXYXlwb2ludC5Db250ZXh0ID0gQ29udGV4dFxufSgpKVxuOyhmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnXG5cbiAgZnVuY3Rpb24gYnlUcmlnZ2VyUG9pbnQoYSwgYikge1xuICAgIHJldHVybiBhLnRyaWdnZXJQb2ludCAtIGIudHJpZ2dlclBvaW50XG4gIH1cblxuICBmdW5jdGlvbiBieVJldmVyc2VUcmlnZ2VyUG9pbnQoYSwgYikge1xuICAgIHJldHVybiBiLnRyaWdnZXJQb2ludCAtIGEudHJpZ2dlclBvaW50XG4gIH1cblxuICB2YXIgZ3JvdXBzID0ge1xuICAgIHZlcnRpY2FsOiB7fSxcbiAgICBob3Jpem9udGFsOiB7fVxuICB9XG4gIHZhciBXYXlwb2ludCA9IHdpbmRvdy5XYXlwb2ludFxuXG4gIC8qIGh0dHA6Ly9pbWFrZXdlYnRoaW5ncy5jb20vd2F5cG9pbnRzL2FwaS9ncm91cCAqL1xuICBmdW5jdGlvbiBHcm91cChvcHRpb25zKSB7XG4gICAgdGhpcy5uYW1lID0gb3B0aW9ucy5uYW1lXG4gICAgdGhpcy5heGlzID0gb3B0aW9ucy5heGlzXG4gICAgdGhpcy5pZCA9IHRoaXMubmFtZSArICctJyArIHRoaXMuYXhpc1xuICAgIHRoaXMud2F5cG9pbnRzID0gW11cbiAgICB0aGlzLmNsZWFyVHJpZ2dlclF1ZXVlcygpXG4gICAgZ3JvdXBzW3RoaXMuYXhpc11bdGhpcy5uYW1lXSA9IHRoaXNcbiAgfVxuXG4gIC8qIFByaXZhdGUgKi9cbiAgR3JvdXAucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uKHdheXBvaW50KSB7XG4gICAgdGhpcy53YXlwb2ludHMucHVzaCh3YXlwb2ludClcbiAgfVxuXG4gIC8qIFByaXZhdGUgKi9cbiAgR3JvdXAucHJvdG90eXBlLmNsZWFyVHJpZ2dlclF1ZXVlcyA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMudHJpZ2dlclF1ZXVlcyA9IHtcbiAgICAgIHVwOiBbXSxcbiAgICAgIGRvd246IFtdLFxuICAgICAgbGVmdDogW10sXG4gICAgICByaWdodDogW11cbiAgICB9XG4gIH1cblxuICAvKiBQcml2YXRlICovXG4gIEdyb3VwLnByb3RvdHlwZS5mbHVzaFRyaWdnZXJzID0gZnVuY3Rpb24oKSB7XG4gICAgZm9yICh2YXIgZGlyZWN0aW9uIGluIHRoaXMudHJpZ2dlclF1ZXVlcykge1xuICAgICAgdmFyIHdheXBvaW50cyA9IHRoaXMudHJpZ2dlclF1ZXVlc1tkaXJlY3Rpb25dXG4gICAgICB2YXIgcmV2ZXJzZSA9IGRpcmVjdGlvbiA9PT0gJ3VwJyB8fCBkaXJlY3Rpb24gPT09ICdsZWZ0J1xuICAgICAgd2F5cG9pbnRzLnNvcnQocmV2ZXJzZSA/IGJ5UmV2ZXJzZVRyaWdnZXJQb2ludCA6IGJ5VHJpZ2dlclBvaW50KVxuICAgICAgZm9yICh2YXIgaSA9IDAsIGVuZCA9IHdheXBvaW50cy5sZW5ndGg7IGkgPCBlbmQ7IGkgKz0gMSkge1xuICAgICAgICB2YXIgd2F5cG9pbnQgPSB3YXlwb2ludHNbaV1cbiAgICAgICAgaWYgKHdheXBvaW50Lm9wdGlvbnMuY29udGludW91cyB8fCBpID09PSB3YXlwb2ludHMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgIHdheXBvaW50LnRyaWdnZXIoW2RpcmVjdGlvbl0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5jbGVhclRyaWdnZXJRdWV1ZXMoKVxuICB9XG5cbiAgLyogUHJpdmF0ZSAqL1xuICBHcm91cC5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uKHdheXBvaW50KSB7XG4gICAgdGhpcy53YXlwb2ludHMuc29ydChieVRyaWdnZXJQb2ludClcbiAgICB2YXIgaW5kZXggPSBXYXlwb2ludC5BZGFwdGVyLmluQXJyYXkod2F5cG9pbnQsIHRoaXMud2F5cG9pbnRzKVxuICAgIHZhciBpc0xhc3QgPSBpbmRleCA9PT0gdGhpcy53YXlwb2ludHMubGVuZ3RoIC0gMVxuICAgIHJldHVybiBpc0xhc3QgPyBudWxsIDogdGhpcy53YXlwb2ludHNbaW5kZXggKyAxXVxuICB9XG5cbiAgLyogUHJpdmF0ZSAqL1xuICBHcm91cC5wcm90b3R5cGUucHJldmlvdXMgPSBmdW5jdGlvbih3YXlwb2ludCkge1xuICAgIHRoaXMud2F5cG9pbnRzLnNvcnQoYnlUcmlnZ2VyUG9pbnQpXG4gICAgdmFyIGluZGV4ID0gV2F5cG9pbnQuQWRhcHRlci5pbkFycmF5KHdheXBvaW50LCB0aGlzLndheXBvaW50cylcbiAgICByZXR1cm4gaW5kZXggPyB0aGlzLndheXBvaW50c1tpbmRleCAtIDFdIDogbnVsbFxuICB9XG5cbiAgLyogUHJpdmF0ZSAqL1xuICBHcm91cC5wcm90b3R5cGUucXVldWVUcmlnZ2VyID0gZnVuY3Rpb24od2F5cG9pbnQsIGRpcmVjdGlvbikge1xuICAgIHRoaXMudHJpZ2dlclF1ZXVlc1tkaXJlY3Rpb25dLnB1c2god2F5cG9pbnQpXG4gIH1cblxuICAvKiBQcml2YXRlICovXG4gIEdyb3VwLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbih3YXlwb2ludCkge1xuICAgIHZhciBpbmRleCA9IFdheXBvaW50LkFkYXB0ZXIuaW5BcnJheSh3YXlwb2ludCwgdGhpcy53YXlwb2ludHMpXG4gICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgIHRoaXMud2F5cG9pbnRzLnNwbGljZShpbmRleCwgMSlcbiAgICB9XG4gIH1cblxuICAvKiBQdWJsaWMgKi9cbiAgLyogaHR0cDovL2ltYWtld2VidGhpbmdzLmNvbS93YXlwb2ludHMvYXBpL2ZpcnN0ICovXG4gIEdyb3VwLnByb3RvdHlwZS5maXJzdCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLndheXBvaW50c1swXVxuICB9XG5cbiAgLyogUHVibGljICovXG4gIC8qIGh0dHA6Ly9pbWFrZXdlYnRoaW5ncy5jb20vd2F5cG9pbnRzL2FwaS9sYXN0ICovXG4gIEdyb3VwLnByb3RvdHlwZS5sYXN0ID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMud2F5cG9pbnRzW3RoaXMud2F5cG9pbnRzLmxlbmd0aCAtIDFdXG4gIH1cblxuICAvKiBQcml2YXRlICovXG4gIEdyb3VwLmZpbmRPckNyZWF0ZSA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gZ3JvdXBzW29wdGlvbnMuYXhpc11bb3B0aW9ucy5uYW1lXSB8fCBuZXcgR3JvdXAob3B0aW9ucylcbiAgfVxuXG4gIFdheXBvaW50Lkdyb3VwID0gR3JvdXBcbn0oKSlcbjsoZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0J1xuXG4gIHZhciAkID0gd2luZG93LmpRdWVyeVxuICB2YXIgV2F5cG9pbnQgPSB3aW5kb3cuV2F5cG9pbnRcblxuICBmdW5jdGlvbiBKUXVlcnlBZGFwdGVyKGVsZW1lbnQpIHtcbiAgICB0aGlzLiRlbGVtZW50ID0gJChlbGVtZW50KVxuICB9XG5cbiAgJC5lYWNoKFtcbiAgICAnaW5uZXJIZWlnaHQnLFxuICAgICdpbm5lcldpZHRoJyxcbiAgICAnb2ZmJyxcbiAgICAnb2Zmc2V0JyxcbiAgICAnb24nLFxuICAgICdvdXRlckhlaWdodCcsXG4gICAgJ291dGVyV2lkdGgnLFxuICAgICdzY3JvbGxMZWZ0JyxcbiAgICAnc2Nyb2xsVG9wJ1xuICBdLCBmdW5jdGlvbihpLCBtZXRob2QpIHtcbiAgICBKUXVlcnlBZGFwdGVyLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cylcbiAgICAgIHJldHVybiB0aGlzLiRlbGVtZW50W21ldGhvZF0uYXBwbHkodGhpcy4kZWxlbWVudCwgYXJncylcbiAgICB9XG4gIH0pXG5cbiAgJC5lYWNoKFtcbiAgICAnZXh0ZW5kJyxcbiAgICAnaW5BcnJheScsXG4gICAgJ2lzRW1wdHlPYmplY3QnXG4gIF0sIGZ1bmN0aW9uKGksIG1ldGhvZCkge1xuICAgIEpRdWVyeUFkYXB0ZXJbbWV0aG9kXSA9ICRbbWV0aG9kXVxuICB9KVxuXG4gIFdheXBvaW50LmFkYXB0ZXJzLnB1c2goe1xuICAgIG5hbWU6ICdqcXVlcnknLFxuICAgIEFkYXB0ZXI6IEpRdWVyeUFkYXB0ZXJcbiAgfSlcbiAgV2F5cG9pbnQuQWRhcHRlciA9IEpRdWVyeUFkYXB0ZXJcbn0oKSlcbjsoZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0J1xuXG4gIHZhciBXYXlwb2ludCA9IHdpbmRvdy5XYXlwb2ludFxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUV4dGVuc2lvbihmcmFtZXdvcmspIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgd2F5cG9pbnRzID0gW11cbiAgICAgIHZhciBvdmVycmlkZXMgPSBhcmd1bWVudHNbMF1cblxuICAgICAgaWYgKGZyYW1ld29yay5pc0Z1bmN0aW9uKGFyZ3VtZW50c1swXSkpIHtcbiAgICAgICAgb3ZlcnJpZGVzID0gZnJhbWV3b3JrLmV4dGVuZCh7fSwgYXJndW1lbnRzWzFdKVxuICAgICAgICBvdmVycmlkZXMuaGFuZGxlciA9IGFyZ3VtZW50c1swXVxuICAgICAgfVxuXG4gICAgICB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBvcHRpb25zID0gZnJhbWV3b3JrLmV4dGVuZCh7fSwgb3ZlcnJpZGVzLCB7XG4gICAgICAgICAgZWxlbWVudDogdGhpc1xuICAgICAgICB9KVxuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMuY29udGV4dCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBvcHRpb25zLmNvbnRleHQgPSBmcmFtZXdvcmsodGhpcykuY2xvc2VzdChvcHRpb25zLmNvbnRleHQpWzBdXG4gICAgICAgIH1cbiAgICAgICAgd2F5cG9pbnRzLnB1c2gobmV3IFdheXBvaW50KG9wdGlvbnMpKVxuICAgICAgfSlcblxuICAgICAgcmV0dXJuIHdheXBvaW50c1xuICAgIH1cbiAgfVxuXG4gIGlmICh3aW5kb3cualF1ZXJ5KSB7XG4gICAgd2luZG93LmpRdWVyeS5mbi53YXlwb2ludCA9IGNyZWF0ZUV4dGVuc2lvbih3aW5kb3cualF1ZXJ5KVxuICB9XG4gIGlmICh3aW5kb3cuWmVwdG8pIHtcbiAgICB3aW5kb3cuWmVwdG8uZm4ud2F5cG9pbnQgPSBjcmVhdGVFeHRlbnNpb24od2luZG93LlplcHRvKVxuICB9XG59KCkpXG47IiwiLyohIE1hZ25pZmljIFBvcHVwIC0gdjEuMS4wIC0gMjAxNi0wMi0yMFxuKiBodHRwOi8vZGltc2VtZW5vdi5jb20vcGx1Z2lucy9tYWduaWZpYy1wb3B1cC9cbiogQ29weXJpZ2h0IChjKSAyMDE2IERtaXRyeSBTZW1lbm92OyAqL1xuOyhmdW5jdGlvbiAoZmFjdG9yeSkge1xuaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuIC8vIEFNRC4gUmVnaXN0ZXIgYXMgYW4gYW5vbnltb3VzIG1vZHVsZS5cbiBkZWZpbmUoWydqcXVlcnknXSwgZmFjdG9yeSk7XG4gfSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAvLyBOb2RlL0NvbW1vbkpTXG4gZmFjdG9yeShyZXF1aXJlKCdqcXVlcnknKSk7XG4gfSBlbHNlIHtcbiAvLyBCcm93c2VyIGdsb2JhbHNcbiBmYWN0b3J5KHdpbmRvdy5qUXVlcnkgfHwgd2luZG93LlplcHRvKTtcbiB9XG4gfShmdW5jdGlvbigkKSB7XG5cbi8qPj5jb3JlKi9cbi8qKlxuICpcbiAqIE1hZ25pZmljIFBvcHVwIENvcmUgSlMgZmlsZVxuICpcbiAqL1xuXG5cbi8qKlxuICogUHJpdmF0ZSBzdGF0aWMgY29uc3RhbnRzXG4gKi9cbnZhciBDTE9TRV9FVkVOVCA9ICdDbG9zZScsXG5cdEJFRk9SRV9DTE9TRV9FVkVOVCA9ICdCZWZvcmVDbG9zZScsXG5cdEFGVEVSX0NMT1NFX0VWRU5UID0gJ0FmdGVyQ2xvc2UnLFxuXHRCRUZPUkVfQVBQRU5EX0VWRU5UID0gJ0JlZm9yZUFwcGVuZCcsXG5cdE1BUktVUF9QQVJTRV9FVkVOVCA9ICdNYXJrdXBQYXJzZScsXG5cdE9QRU5fRVZFTlQgPSAnT3BlbicsXG5cdENIQU5HRV9FVkVOVCA9ICdDaGFuZ2UnLFxuXHROUyA9ICdtZnAnLFxuXHRFVkVOVF9OUyA9ICcuJyArIE5TLFxuXHRSRUFEWV9DTEFTUyA9ICdtZnAtcmVhZHknLFxuXHRSRU1PVklOR19DTEFTUyA9ICdtZnAtcmVtb3ZpbmcnLFxuXHRQUkVWRU5UX0NMT1NFX0NMQVNTID0gJ21mcC1wcmV2ZW50LWNsb3NlJztcblxuXG4vKipcbiAqIFByaXZhdGUgdmFyc1xuICovXG4vKmpzaGludCAtVzA3OSAqL1xudmFyIG1mcCwgLy8gQXMgd2UgaGF2ZSBvbmx5IG9uZSBpbnN0YW5jZSBvZiBNYWduaWZpY1BvcHVwIG9iamVjdCwgd2UgZGVmaW5lIGl0IGxvY2FsbHkgdG8gbm90IHRvIHVzZSAndGhpcydcblx0TWFnbmlmaWNQb3B1cCA9IGZ1bmN0aW9uKCl7fSxcblx0X2lzSlEgPSAhISh3aW5kb3cualF1ZXJ5KSxcblx0X3ByZXZTdGF0dXMsXG5cdF93aW5kb3cgPSAkKHdpbmRvdyksXG5cdF9kb2N1bWVudCxcblx0X3ByZXZDb250ZW50VHlwZSxcblx0X3dyYXBDbGFzc2VzLFxuXHRfY3VyclBvcHVwVHlwZTtcblxuXG4vKipcbiAqIFByaXZhdGUgZnVuY3Rpb25zXG4gKi9cbnZhciBfbWZwT24gPSBmdW5jdGlvbihuYW1lLCBmKSB7XG5cdFx0bWZwLmV2Lm9uKE5TICsgbmFtZSArIEVWRU5UX05TLCBmKTtcblx0fSxcblx0X2dldEVsID0gZnVuY3Rpb24oY2xhc3NOYW1lLCBhcHBlbmRUbywgaHRtbCwgcmF3KSB7XG5cdFx0dmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0ZWwuY2xhc3NOYW1lID0gJ21mcC0nK2NsYXNzTmFtZTtcblx0XHRpZihodG1sKSB7XG5cdFx0XHRlbC5pbm5lckhUTUwgPSBodG1sO1xuXHRcdH1cblx0XHRpZighcmF3KSB7XG5cdFx0XHRlbCA9ICQoZWwpO1xuXHRcdFx0aWYoYXBwZW5kVG8pIHtcblx0XHRcdFx0ZWwuYXBwZW5kVG8oYXBwZW5kVG8pO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSBpZihhcHBlbmRUbykge1xuXHRcdFx0YXBwZW5kVG8uYXBwZW5kQ2hpbGQoZWwpO1xuXHRcdH1cblx0XHRyZXR1cm4gZWw7XG5cdH0sXG5cdF9tZnBUcmlnZ2VyID0gZnVuY3Rpb24oZSwgZGF0YSkge1xuXHRcdG1mcC5ldi50cmlnZ2VySGFuZGxlcihOUyArIGUsIGRhdGEpO1xuXG5cdFx0aWYobWZwLnN0LmNhbGxiYWNrcykge1xuXHRcdFx0Ly8gY29udmVydHMgXCJtZnBFdmVudE5hbWVcIiB0byBcImV2ZW50TmFtZVwiIGNhbGxiYWNrIGFuZCB0cmlnZ2VycyBpdCBpZiBpdCdzIHByZXNlbnRcblx0XHRcdGUgPSBlLmNoYXJBdCgwKS50b0xvd2VyQ2FzZSgpICsgZS5zbGljZSgxKTtcblx0XHRcdGlmKG1mcC5zdC5jYWxsYmFja3NbZV0pIHtcblx0XHRcdFx0bWZwLnN0LmNhbGxiYWNrc1tlXS5hcHBseShtZnAsICQuaXNBcnJheShkYXRhKSA/IGRhdGEgOiBbZGF0YV0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblx0X2dldENsb3NlQnRuID0gZnVuY3Rpb24odHlwZSkge1xuXHRcdGlmKHR5cGUgIT09IF9jdXJyUG9wdXBUeXBlIHx8ICFtZnAuY3VyclRlbXBsYXRlLmNsb3NlQnRuKSB7XG5cdFx0XHRtZnAuY3VyclRlbXBsYXRlLmNsb3NlQnRuID0gJCggbWZwLnN0LmNsb3NlTWFya3VwLnJlcGxhY2UoJyV0aXRsZSUnLCBtZnAuc3QudENsb3NlICkgKTtcblx0XHRcdF9jdXJyUG9wdXBUeXBlID0gdHlwZTtcblx0XHR9XG5cdFx0cmV0dXJuIG1mcC5jdXJyVGVtcGxhdGUuY2xvc2VCdG47XG5cdH0sXG5cdC8vIEluaXRpYWxpemUgTWFnbmlmaWMgUG9wdXAgb25seSB3aGVuIGNhbGxlZCBhdCBsZWFzdCBvbmNlXG5cdF9jaGVja0luc3RhbmNlID0gZnVuY3Rpb24oKSB7XG5cdFx0aWYoISQubWFnbmlmaWNQb3B1cC5pbnN0YW5jZSkge1xuXHRcdFx0Lypqc2hpbnQgLVcwMjAgKi9cblx0XHRcdG1mcCA9IG5ldyBNYWduaWZpY1BvcHVwKCk7XG5cdFx0XHRtZnAuaW5pdCgpO1xuXHRcdFx0JC5tYWduaWZpY1BvcHVwLmluc3RhbmNlID0gbWZwO1xuXHRcdH1cblx0fSxcblx0Ly8gQ1NTIHRyYW5zaXRpb24gZGV0ZWN0aW9uLCBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzcyNjQ4OTkvZGV0ZWN0LWNzcy10cmFuc2l0aW9ucy11c2luZy1qYXZhc2NyaXB0LWFuZC13aXRob3V0LW1vZGVybml6clxuXHRzdXBwb3J0c1RyYW5zaXRpb25zID0gZnVuY3Rpb24oKSB7XG5cdFx0dmFyIHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJykuc3R5bGUsIC8vICdzJyBmb3Igc3R5bGUuIGJldHRlciB0byBjcmVhdGUgYW4gZWxlbWVudCBpZiBib2R5IHlldCB0byBleGlzdFxuXHRcdFx0diA9IFsnbXMnLCdPJywnTW96JywnV2Via2l0J107IC8vICd2JyBmb3IgdmVuZG9yXG5cblx0XHRpZiggc1sndHJhbnNpdGlvbiddICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHR3aGlsZSggdi5sZW5ndGggKSB7XG5cdFx0XHRpZiggdi5wb3AoKSArICdUcmFuc2l0aW9uJyBpbiBzICkge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH07XG5cblxuXG4vKipcbiAqIFB1YmxpYyBmdW5jdGlvbnNcbiAqL1xuTWFnbmlmaWNQb3B1cC5wcm90b3R5cGUgPSB7XG5cblx0Y29uc3RydWN0b3I6IE1hZ25pZmljUG9wdXAsXG5cblx0LyoqXG5cdCAqIEluaXRpYWxpemVzIE1hZ25pZmljIFBvcHVwIHBsdWdpbi5cblx0ICogVGhpcyBmdW5jdGlvbiBpcyB0cmlnZ2VyZWQgb25seSBvbmNlIHdoZW4gJC5mbi5tYWduaWZpY1BvcHVwIG9yICQubWFnbmlmaWNQb3B1cCBpcyBleGVjdXRlZFxuXHQgKi9cblx0aW5pdDogZnVuY3Rpb24oKSB7XG5cdFx0dmFyIGFwcFZlcnNpb24gPSBuYXZpZ2F0b3IuYXBwVmVyc2lvbjtcblx0XHRtZnAuaXNMb3dJRSA9IG1mcC5pc0lFOCA9IGRvY3VtZW50LmFsbCAmJiAhZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcjtcblx0XHRtZnAuaXNBbmRyb2lkID0gKC9hbmRyb2lkL2dpKS50ZXN0KGFwcFZlcnNpb24pO1xuXHRcdG1mcC5pc0lPUyA9ICgvaXBob25lfGlwYWR8aXBvZC9naSkudGVzdChhcHBWZXJzaW9uKTtcblx0XHRtZnAuc3VwcG9ydHNUcmFuc2l0aW9uID0gc3VwcG9ydHNUcmFuc2l0aW9ucygpO1xuXG5cdFx0Ly8gV2UgZGlzYWJsZSBmaXhlZCBwb3NpdGlvbmVkIGxpZ2h0Ym94IG9uIGRldmljZXMgdGhhdCBkb24ndCBoYW5kbGUgaXQgbmljZWx5LlxuXHRcdC8vIElmIHlvdSBrbm93IGEgYmV0dGVyIHdheSBvZiBkZXRlY3RpbmcgdGhpcyAtIGxldCBtZSBrbm93LlxuXHRcdG1mcC5wcm9iYWJseU1vYmlsZSA9IChtZnAuaXNBbmRyb2lkIHx8IG1mcC5pc0lPUyB8fCAvKE9wZXJhIE1pbmkpfEtpbmRsZXx3ZWJPU3xCbGFja0JlcnJ5fChPcGVyYSBNb2JpKXwoV2luZG93cyBQaG9uZSl8SUVNb2JpbGUvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpICk7XG5cdFx0X2RvY3VtZW50ID0gJChkb2N1bWVudCk7XG5cblx0XHRtZnAucG9wdXBzQ2FjaGUgPSB7fTtcblx0fSxcblxuXHQvKipcblx0ICogT3BlbnMgcG9wdXBcblx0ICogQHBhcmFtICBkYXRhIFtkZXNjcmlwdGlvbl1cblx0ICovXG5cdG9wZW46IGZ1bmN0aW9uKGRhdGEpIHtcblxuXHRcdHZhciBpO1xuXG5cdFx0aWYoZGF0YS5pc09iaiA9PT0gZmFsc2UpIHtcblx0XHRcdC8vIGNvbnZlcnQgalF1ZXJ5IGNvbGxlY3Rpb24gdG8gYXJyYXkgdG8gYXZvaWQgY29uZmxpY3RzIGxhdGVyXG5cdFx0XHRtZnAuaXRlbXMgPSBkYXRhLml0ZW1zLnRvQXJyYXkoKTtcblxuXHRcdFx0bWZwLmluZGV4ID0gMDtcblx0XHRcdHZhciBpdGVtcyA9IGRhdGEuaXRlbXMsXG5cdFx0XHRcdGl0ZW07XG5cdFx0XHRmb3IoaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRpdGVtID0gaXRlbXNbaV07XG5cdFx0XHRcdGlmKGl0ZW0ucGFyc2VkKSB7XG5cdFx0XHRcdFx0aXRlbSA9IGl0ZW0uZWxbMF07XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYoaXRlbSA9PT0gZGF0YS5lbFswXSkge1xuXHRcdFx0XHRcdG1mcC5pbmRleCA9IGk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0bWZwLml0ZW1zID0gJC5pc0FycmF5KGRhdGEuaXRlbXMpID8gZGF0YS5pdGVtcyA6IFtkYXRhLml0ZW1zXTtcblx0XHRcdG1mcC5pbmRleCA9IGRhdGEuaW5kZXggfHwgMDtcblx0XHR9XG5cblx0XHQvLyBpZiBwb3B1cCBpcyBhbHJlYWR5IG9wZW5lZCAtIHdlIGp1c3QgdXBkYXRlIHRoZSBjb250ZW50XG5cdFx0aWYobWZwLmlzT3Blbikge1xuXHRcdFx0bWZwLnVwZGF0ZUl0ZW1IVE1MKCk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0bWZwLnR5cGVzID0gW107XG5cdFx0X3dyYXBDbGFzc2VzID0gJyc7XG5cdFx0aWYoZGF0YS5tYWluRWwgJiYgZGF0YS5tYWluRWwubGVuZ3RoKSB7XG5cdFx0XHRtZnAuZXYgPSBkYXRhLm1haW5FbC5lcSgwKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bWZwLmV2ID0gX2RvY3VtZW50O1xuXHRcdH1cblxuXHRcdGlmKGRhdGEua2V5KSB7XG5cdFx0XHRpZighbWZwLnBvcHVwc0NhY2hlW2RhdGEua2V5XSkge1xuXHRcdFx0XHRtZnAucG9wdXBzQ2FjaGVbZGF0YS5rZXldID0ge307XG5cdFx0XHR9XG5cdFx0XHRtZnAuY3VyclRlbXBsYXRlID0gbWZwLnBvcHVwc0NhY2hlW2RhdGEua2V5XTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bWZwLmN1cnJUZW1wbGF0ZSA9IHt9O1xuXHRcdH1cblxuXG5cblx0XHRtZnAuc3QgPSAkLmV4dGVuZCh0cnVlLCB7fSwgJC5tYWduaWZpY1BvcHVwLmRlZmF1bHRzLCBkYXRhICk7XG5cdFx0bWZwLmZpeGVkQ29udGVudFBvcyA9IG1mcC5zdC5maXhlZENvbnRlbnRQb3MgPT09ICdhdXRvJyA/ICFtZnAucHJvYmFibHlNb2JpbGUgOiBtZnAuc3QuZml4ZWRDb250ZW50UG9zO1xuXG5cdFx0aWYobWZwLnN0Lm1vZGFsKSB7XG5cdFx0XHRtZnAuc3QuY2xvc2VPbkNvbnRlbnRDbGljayA9IGZhbHNlO1xuXHRcdFx0bWZwLnN0LmNsb3NlT25CZ0NsaWNrID0gZmFsc2U7XG5cdFx0XHRtZnAuc3Quc2hvd0Nsb3NlQnRuID0gZmFsc2U7XG5cdFx0XHRtZnAuc3QuZW5hYmxlRXNjYXBlS2V5ID0gZmFsc2U7XG5cdFx0fVxuXG5cblx0XHQvLyBCdWlsZGluZyBtYXJrdXBcblx0XHQvLyBtYWluIGNvbnRhaW5lcnMgYXJlIGNyZWF0ZWQgb25seSBvbmNlXG5cdFx0aWYoIW1mcC5iZ092ZXJsYXkpIHtcblxuXHRcdFx0Ly8gRGFyayBvdmVybGF5XG5cdFx0XHRtZnAuYmdPdmVybGF5ID0gX2dldEVsKCdiZycpLm9uKCdjbGljaycrRVZFTlRfTlMsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRtZnAuY2xvc2UoKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRtZnAud3JhcCA9IF9nZXRFbCgnd3JhcCcpLmF0dHIoJ3RhYmluZGV4JywgLTEpLm9uKCdjbGljaycrRVZFTlRfTlMsIGZ1bmN0aW9uKGUpIHtcblx0XHRcdFx0aWYobWZwLl9jaGVja0lmQ2xvc2UoZS50YXJnZXQpKSB7XG5cdFx0XHRcdFx0bWZwLmNsb3NlKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHRtZnAuY29udGFpbmVyID0gX2dldEVsKCdjb250YWluZXInLCBtZnAud3JhcCk7XG5cdFx0fVxuXG5cdFx0bWZwLmNvbnRlbnRDb250YWluZXIgPSBfZ2V0RWwoJ2NvbnRlbnQnKTtcblx0XHRpZihtZnAuc3QucHJlbG9hZGVyKSB7XG5cdFx0XHRtZnAucHJlbG9hZGVyID0gX2dldEVsKCdwcmVsb2FkZXInLCBtZnAuY29udGFpbmVyLCBtZnAuc3QudExvYWRpbmcpO1xuXHRcdH1cblxuXG5cdFx0Ly8gSW5pdGlhbGl6aW5nIG1vZHVsZXNcblx0XHR2YXIgbW9kdWxlcyA9ICQubWFnbmlmaWNQb3B1cC5tb2R1bGVzO1xuXHRcdGZvcihpID0gMDsgaSA8IG1vZHVsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBuID0gbW9kdWxlc1tpXTtcblx0XHRcdG4gPSBuLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgbi5zbGljZSgxKTtcblx0XHRcdG1mcFsnaW5pdCcrbl0uY2FsbChtZnApO1xuXHRcdH1cblx0XHRfbWZwVHJpZ2dlcignQmVmb3JlT3BlbicpO1xuXG5cblx0XHRpZihtZnAuc3Quc2hvd0Nsb3NlQnRuKSB7XG5cdFx0XHQvLyBDbG9zZSBidXR0b25cblx0XHRcdGlmKCFtZnAuc3QuY2xvc2VCdG5JbnNpZGUpIHtcblx0XHRcdFx0bWZwLndyYXAuYXBwZW5kKCBfZ2V0Q2xvc2VCdG4oKSApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0X21mcE9uKE1BUktVUF9QQVJTRV9FVkVOVCwgZnVuY3Rpb24oZSwgdGVtcGxhdGUsIHZhbHVlcywgaXRlbSkge1xuXHRcdFx0XHRcdHZhbHVlcy5jbG9zZV9yZXBsYWNlV2l0aCA9IF9nZXRDbG9zZUJ0bihpdGVtLnR5cGUpO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0X3dyYXBDbGFzc2VzICs9ICcgbWZwLWNsb3NlLWJ0bi1pbic7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYobWZwLnN0LmFsaWduVG9wKSB7XG5cdFx0XHRfd3JhcENsYXNzZXMgKz0gJyBtZnAtYWxpZ24tdG9wJztcblx0XHR9XG5cblxuXG5cdFx0aWYobWZwLmZpeGVkQ29udGVudFBvcykge1xuXHRcdFx0bWZwLndyYXAuY3NzKHtcblx0XHRcdFx0b3ZlcmZsb3c6IG1mcC5zdC5vdmVyZmxvd1ksXG5cdFx0XHRcdG92ZXJmbG93WDogJ2hpZGRlbicsXG5cdFx0XHRcdG92ZXJmbG93WTogbWZwLnN0Lm92ZXJmbG93WVxuXHRcdFx0fSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdG1mcC53cmFwLmNzcyh7XG5cdFx0XHRcdHRvcDogX3dpbmRvdy5zY3JvbGxUb3AoKSxcblx0XHRcdFx0cG9zaXRpb246ICdhYnNvbHV0ZSdcblx0XHRcdH0pO1xuXHRcdH1cblx0XHRpZiggbWZwLnN0LmZpeGVkQmdQb3MgPT09IGZhbHNlIHx8IChtZnAuc3QuZml4ZWRCZ1BvcyA9PT0gJ2F1dG8nICYmICFtZnAuZml4ZWRDb250ZW50UG9zKSApIHtcblx0XHRcdG1mcC5iZ092ZXJsYXkuY3NzKHtcblx0XHRcdFx0aGVpZ2h0OiBfZG9jdW1lbnQuaGVpZ2h0KCksXG5cdFx0XHRcdHBvc2l0aW9uOiAnYWJzb2x1dGUnXG5cdFx0XHR9KTtcblx0XHR9XG5cblxuXG5cdFx0aWYobWZwLnN0LmVuYWJsZUVzY2FwZUtleSkge1xuXHRcdFx0Ly8gQ2xvc2Ugb24gRVNDIGtleVxuXHRcdFx0X2RvY3VtZW50Lm9uKCdrZXl1cCcgKyBFVkVOVF9OUywgZnVuY3Rpb24oZSkge1xuXHRcdFx0XHRpZihlLmtleUNvZGUgPT09IDI3KSB7XG5cdFx0XHRcdFx0bWZwLmNsb3NlKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdF93aW5kb3cub24oJ3Jlc2l6ZScgKyBFVkVOVF9OUywgZnVuY3Rpb24oKSB7XG5cdFx0XHRtZnAudXBkYXRlU2l6ZSgpO1xuXHRcdH0pO1xuXG5cblx0XHRpZighbWZwLnN0LmNsb3NlT25Db250ZW50Q2xpY2spIHtcblx0XHRcdF93cmFwQ2xhc3NlcyArPSAnIG1mcC1hdXRvLWN1cnNvcic7XG5cdFx0fVxuXG5cdFx0aWYoX3dyYXBDbGFzc2VzKVxuXHRcdFx0bWZwLndyYXAuYWRkQ2xhc3MoX3dyYXBDbGFzc2VzKTtcblxuXG5cdFx0Ly8gdGhpcyB0cmlnZ2VycyByZWNhbGN1bGF0aW9uIG9mIGxheW91dCwgc28gd2UgZ2V0IGl0IG9uY2UgdG8gbm90IHRvIHRyaWdnZXIgdHdpY2Vcblx0XHR2YXIgd2luZG93SGVpZ2h0ID0gbWZwLndIID0gX3dpbmRvdy5oZWlnaHQoKTtcblxuXG5cdFx0dmFyIHdpbmRvd1N0eWxlcyA9IHt9O1xuXG5cdFx0aWYoIG1mcC5maXhlZENvbnRlbnRQb3MgKSB7XG4gICAgICAgICAgICBpZihtZnAuX2hhc1Njcm9sbEJhcih3aW5kb3dIZWlnaHQpKXtcbiAgICAgICAgICAgICAgICB2YXIgcyA9IG1mcC5fZ2V0U2Nyb2xsYmFyU2l6ZSgpO1xuICAgICAgICAgICAgICAgIGlmKHMpIHtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93U3R5bGVzLm1hcmdpblJpZ2h0ID0gcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuXHRcdGlmKG1mcC5maXhlZENvbnRlbnRQb3MpIHtcblx0XHRcdGlmKCFtZnAuaXNJRTcpIHtcblx0XHRcdFx0d2luZG93U3R5bGVzLm92ZXJmbG93ID0gJ2hpZGRlbic7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyBpZTcgZG91YmxlLXNjcm9sbCBidWdcblx0XHRcdFx0JCgnYm9keSwgaHRtbCcpLmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cblxuXHRcdHZhciBjbGFzc2VzVG9hZGQgPSBtZnAuc3QubWFpbkNsYXNzO1xuXHRcdGlmKG1mcC5pc0lFNykge1xuXHRcdFx0Y2xhc3Nlc1RvYWRkICs9ICcgbWZwLWllNyc7XG5cdFx0fVxuXHRcdGlmKGNsYXNzZXNUb2FkZCkge1xuXHRcdFx0bWZwLl9hZGRDbGFzc1RvTUZQKCBjbGFzc2VzVG9hZGQgKTtcblx0XHR9XG5cblx0XHQvLyBhZGQgY29udGVudFxuXHRcdG1mcC51cGRhdGVJdGVtSFRNTCgpO1xuXG5cdFx0X21mcFRyaWdnZXIoJ0J1aWxkQ29udHJvbHMnKTtcblxuXHRcdC8vIHJlbW92ZSBzY3JvbGxiYXIsIGFkZCBtYXJnaW4gZS50LmNcblx0XHQkKCdodG1sJykuY3NzKHdpbmRvd1N0eWxlcyk7XG5cblx0XHQvLyBhZGQgZXZlcnl0aGluZyB0byBET01cblx0XHRtZnAuYmdPdmVybGF5LmFkZChtZnAud3JhcCkucHJlcGVuZFRvKCBtZnAuc3QucHJlcGVuZFRvIHx8ICQoZG9jdW1lbnQuYm9keSkgKTtcblxuXHRcdC8vIFNhdmUgbGFzdCBmb2N1c2VkIGVsZW1lbnRcblx0XHRtZnAuX2xhc3RGb2N1c2VkRWwgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuXG5cdFx0Ly8gV2FpdCBmb3IgbmV4dCBjeWNsZSB0byBhbGxvdyBDU1MgdHJhbnNpdGlvblxuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cblx0XHRcdGlmKG1mcC5jb250ZW50KSB7XG5cdFx0XHRcdG1mcC5fYWRkQ2xhc3NUb01GUChSRUFEWV9DTEFTUyk7XG5cdFx0XHRcdG1mcC5fc2V0Rm9jdXMoKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIGlmIGNvbnRlbnQgaXMgbm90IGRlZmluZWQgKG5vdCBsb2FkZWQgZS50LmMpIHdlIGFkZCBjbGFzcyBvbmx5IGZvciBCR1xuXHRcdFx0XHRtZnAuYmdPdmVybGF5LmFkZENsYXNzKFJFQURZX0NMQVNTKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gVHJhcCB0aGUgZm9jdXMgaW4gcG9wdXBcblx0XHRcdF9kb2N1bWVudC5vbignZm9jdXNpbicgKyBFVkVOVF9OUywgbWZwLl9vbkZvY3VzSW4pO1xuXG5cdFx0fSwgMTYpO1xuXG5cdFx0bWZwLmlzT3BlbiA9IHRydWU7XG5cdFx0bWZwLnVwZGF0ZVNpemUod2luZG93SGVpZ2h0KTtcblx0XHRfbWZwVHJpZ2dlcihPUEVOX0VWRU5UKTtcblxuXHRcdHJldHVybiBkYXRhO1xuXHR9LFxuXG5cdC8qKlxuXHQgKiBDbG9zZXMgdGhlIHBvcHVwXG5cdCAqL1xuXHRjbG9zZTogZnVuY3Rpb24oKSB7XG5cdFx0aWYoIW1mcC5pc09wZW4pIHJldHVybjtcblx0XHRfbWZwVHJpZ2dlcihCRUZPUkVfQ0xPU0VfRVZFTlQpO1xuXG5cdFx0bWZwLmlzT3BlbiA9IGZhbHNlO1xuXHRcdC8vIGZvciBDU1MzIGFuaW1hdGlvblxuXHRcdGlmKG1mcC5zdC5yZW1vdmFsRGVsYXkgJiYgIW1mcC5pc0xvd0lFICYmIG1mcC5zdXBwb3J0c1RyYW5zaXRpb24gKSAge1xuXHRcdFx0bWZwLl9hZGRDbGFzc1RvTUZQKFJFTU9WSU5HX0NMQVNTKTtcblx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdG1mcC5fY2xvc2UoKTtcblx0XHRcdH0sIG1mcC5zdC5yZW1vdmFsRGVsYXkpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRtZnAuX2Nsb3NlKCk7XG5cdFx0fVxuXHR9LFxuXG5cdC8qKlxuXHQgKiBIZWxwZXIgZm9yIGNsb3NlKCkgZnVuY3Rpb25cblx0ICovXG5cdF9jbG9zZTogZnVuY3Rpb24oKSB7XG5cdFx0X21mcFRyaWdnZXIoQ0xPU0VfRVZFTlQpO1xuXG5cdFx0dmFyIGNsYXNzZXNUb1JlbW92ZSA9IFJFTU9WSU5HX0NMQVNTICsgJyAnICsgUkVBRFlfQ0xBU1MgKyAnICc7XG5cblx0XHRtZnAuYmdPdmVybGF5LmRldGFjaCgpO1xuXHRcdG1mcC53cmFwLmRldGFjaCgpO1xuXHRcdG1mcC5jb250YWluZXIuZW1wdHkoKTtcblxuXHRcdGlmKG1mcC5zdC5tYWluQ2xhc3MpIHtcblx0XHRcdGNsYXNzZXNUb1JlbW92ZSArPSBtZnAuc3QubWFpbkNsYXNzICsgJyAnO1xuXHRcdH1cblxuXHRcdG1mcC5fcmVtb3ZlQ2xhc3NGcm9tTUZQKGNsYXNzZXNUb1JlbW92ZSk7XG5cblx0XHRpZihtZnAuZml4ZWRDb250ZW50UG9zKSB7XG5cdFx0XHR2YXIgd2luZG93U3R5bGVzID0ge21hcmdpblJpZ2h0OiAnJ307XG5cdFx0XHRpZihtZnAuaXNJRTcpIHtcblx0XHRcdFx0JCgnYm9keSwgaHRtbCcpLmNzcygnb3ZlcmZsb3cnLCAnJyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR3aW5kb3dTdHlsZXMub3ZlcmZsb3cgPSAnJztcblx0XHRcdH1cblx0XHRcdCQoJ2h0bWwnKS5jc3Mod2luZG93U3R5bGVzKTtcblx0XHR9XG5cblx0XHRfZG9jdW1lbnQub2ZmKCdrZXl1cCcgKyBFVkVOVF9OUyArICcgZm9jdXNpbicgKyBFVkVOVF9OUyk7XG5cdFx0bWZwLmV2Lm9mZihFVkVOVF9OUyk7XG5cblx0XHQvLyBjbGVhbiB1cCBET00gZWxlbWVudHMgdGhhdCBhcmVuJ3QgcmVtb3ZlZFxuXHRcdG1mcC53cmFwLmF0dHIoJ2NsYXNzJywgJ21mcC13cmFwJykucmVtb3ZlQXR0cignc3R5bGUnKTtcblx0XHRtZnAuYmdPdmVybGF5LmF0dHIoJ2NsYXNzJywgJ21mcC1iZycpO1xuXHRcdG1mcC5jb250YWluZXIuYXR0cignY2xhc3MnLCAnbWZwLWNvbnRhaW5lcicpO1xuXG5cdFx0Ly8gcmVtb3ZlIGNsb3NlIGJ1dHRvbiBmcm9tIHRhcmdldCBlbGVtZW50XG5cdFx0aWYobWZwLnN0LnNob3dDbG9zZUJ0biAmJlxuXHRcdCghbWZwLnN0LmNsb3NlQnRuSW5zaWRlIHx8IG1mcC5jdXJyVGVtcGxhdGVbbWZwLmN1cnJJdGVtLnR5cGVdID09PSB0cnVlKSkge1xuXHRcdFx0aWYobWZwLmN1cnJUZW1wbGF0ZS5jbG9zZUJ0bilcblx0XHRcdFx0bWZwLmN1cnJUZW1wbGF0ZS5jbG9zZUJ0bi5kZXRhY2goKTtcblx0XHR9XG5cblxuXHRcdGlmKG1mcC5zdC5hdXRvRm9jdXNMYXN0ICYmIG1mcC5fbGFzdEZvY3VzZWRFbCkge1xuXHRcdFx0JChtZnAuX2xhc3RGb2N1c2VkRWwpLmZvY3VzKCk7IC8vIHB1dCB0YWIgZm9jdXMgYmFja1xuXHRcdH1cblx0XHRtZnAuY3Vyckl0ZW0gPSBudWxsO1xuXHRcdG1mcC5jb250ZW50ID0gbnVsbDtcblx0XHRtZnAuY3VyclRlbXBsYXRlID0gbnVsbDtcblx0XHRtZnAucHJldkhlaWdodCA9IDA7XG5cblx0XHRfbWZwVHJpZ2dlcihBRlRFUl9DTE9TRV9FVkVOVCk7XG5cdH0sXG5cblx0dXBkYXRlU2l6ZTogZnVuY3Rpb24od2luSGVpZ2h0KSB7XG5cblx0XHRpZihtZnAuaXNJT1MpIHtcblx0XHRcdC8vIGZpeGVzIGlPUyBuYXYgYmFycyBodHRwczovL2dpdGh1Yi5jb20vZGltc2VtZW5vdi9NYWduaWZpYy1Qb3B1cC9pc3N1ZXMvMlxuXHRcdFx0dmFyIHpvb21MZXZlbCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCAvIHdpbmRvdy5pbm5lcldpZHRoO1xuXHRcdFx0dmFyIGhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCAqIHpvb21MZXZlbDtcblx0XHRcdG1mcC53cmFwLmNzcygnaGVpZ2h0JywgaGVpZ2h0KTtcblx0XHRcdG1mcC53SCA9IGhlaWdodDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bWZwLndIID0gd2luSGVpZ2h0IHx8IF93aW5kb3cuaGVpZ2h0KCk7XG5cdFx0fVxuXHRcdC8vIEZpeGVzICM4NDogcG9wdXAgaW5jb3JyZWN0bHkgcG9zaXRpb25lZCB3aXRoIHBvc2l0aW9uOnJlbGF0aXZlIG9uIGJvZHlcblx0XHRpZighbWZwLmZpeGVkQ29udGVudFBvcykge1xuXHRcdFx0bWZwLndyYXAuY3NzKCdoZWlnaHQnLCBtZnAud0gpO1xuXHRcdH1cblxuXHRcdF9tZnBUcmlnZ2VyKCdSZXNpemUnKTtcblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBTZXQgY29udGVudCBvZiBwb3B1cCBiYXNlZCBvbiBjdXJyZW50IGluZGV4XG5cdCAqL1xuXHR1cGRhdGVJdGVtSFRNTDogZnVuY3Rpb24oKSB7XG5cdFx0dmFyIGl0ZW0gPSBtZnAuaXRlbXNbbWZwLmluZGV4XTtcblxuXHRcdC8vIERldGFjaCBhbmQgcGVyZm9ybSBtb2RpZmljYXRpb25zXG5cdFx0bWZwLmNvbnRlbnRDb250YWluZXIuZGV0YWNoKCk7XG5cblx0XHRpZihtZnAuY29udGVudClcblx0XHRcdG1mcC5jb250ZW50LmRldGFjaCgpO1xuXG5cdFx0aWYoIWl0ZW0ucGFyc2VkKSB7XG5cdFx0XHRpdGVtID0gbWZwLnBhcnNlRWwoIG1mcC5pbmRleCApO1xuXHRcdH1cblxuXHRcdHZhciB0eXBlID0gaXRlbS50eXBlO1xuXG5cdFx0X21mcFRyaWdnZXIoJ0JlZm9yZUNoYW5nZScsIFttZnAuY3Vyckl0ZW0gPyBtZnAuY3Vyckl0ZW0udHlwZSA6ICcnLCB0eXBlXSk7XG5cdFx0Ly8gQmVmb3JlQ2hhbmdlIGV2ZW50IHdvcmtzIGxpa2Ugc286XG5cdFx0Ly8gX21mcE9uKCdCZWZvcmVDaGFuZ2UnLCBmdW5jdGlvbihlLCBwcmV2VHlwZSwgbmV3VHlwZSkgeyB9KTtcblxuXHRcdG1mcC5jdXJySXRlbSA9IGl0ZW07XG5cblx0XHRpZighbWZwLmN1cnJUZW1wbGF0ZVt0eXBlXSkge1xuXHRcdFx0dmFyIG1hcmt1cCA9IG1mcC5zdFt0eXBlXSA/IG1mcC5zdFt0eXBlXS5tYXJrdXAgOiBmYWxzZTtcblxuXHRcdFx0Ly8gYWxsb3dzIHRvIG1vZGlmeSBtYXJrdXBcblx0XHRcdF9tZnBUcmlnZ2VyKCdGaXJzdE1hcmt1cFBhcnNlJywgbWFya3VwKTtcblxuXHRcdFx0aWYobWFya3VwKSB7XG5cdFx0XHRcdG1mcC5jdXJyVGVtcGxhdGVbdHlwZV0gPSAkKG1hcmt1cCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyBpZiB0aGVyZSBpcyBubyBtYXJrdXAgZm91bmQgd2UganVzdCBkZWZpbmUgdGhhdCB0ZW1wbGF0ZSBpcyBwYXJzZWRcblx0XHRcdFx0bWZwLmN1cnJUZW1wbGF0ZVt0eXBlXSA9IHRydWU7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYoX3ByZXZDb250ZW50VHlwZSAmJiBfcHJldkNvbnRlbnRUeXBlICE9PSBpdGVtLnR5cGUpIHtcblx0XHRcdG1mcC5jb250YWluZXIucmVtb3ZlQ2xhc3MoJ21mcC0nK19wcmV2Q29udGVudFR5cGUrJy1ob2xkZXInKTtcblx0XHR9XG5cblx0XHR2YXIgbmV3Q29udGVudCA9IG1mcFsnZ2V0JyArIHR5cGUuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyB0eXBlLnNsaWNlKDEpXShpdGVtLCBtZnAuY3VyclRlbXBsYXRlW3R5cGVdKTtcblx0XHRtZnAuYXBwZW5kQ29udGVudChuZXdDb250ZW50LCB0eXBlKTtcblxuXHRcdGl0ZW0ucHJlbG9hZGVkID0gdHJ1ZTtcblxuXHRcdF9tZnBUcmlnZ2VyKENIQU5HRV9FVkVOVCwgaXRlbSk7XG5cdFx0X3ByZXZDb250ZW50VHlwZSA9IGl0ZW0udHlwZTtcblxuXHRcdC8vIEFwcGVuZCBjb250YWluZXIgYmFjayBhZnRlciBpdHMgY29udGVudCBjaGFuZ2VkXG5cdFx0bWZwLmNvbnRhaW5lci5wcmVwZW5kKG1mcC5jb250ZW50Q29udGFpbmVyKTtcblxuXHRcdF9tZnBUcmlnZ2VyKCdBZnRlckNoYW5nZScpO1xuXHR9LFxuXG5cblx0LyoqXG5cdCAqIFNldCBIVE1MIGNvbnRlbnQgb2YgcG9wdXBcblx0ICovXG5cdGFwcGVuZENvbnRlbnQ6IGZ1bmN0aW9uKG5ld0NvbnRlbnQsIHR5cGUpIHtcblx0XHRtZnAuY29udGVudCA9IG5ld0NvbnRlbnQ7XG5cblx0XHRpZihuZXdDb250ZW50KSB7XG5cdFx0XHRpZihtZnAuc3Quc2hvd0Nsb3NlQnRuICYmIG1mcC5zdC5jbG9zZUJ0bkluc2lkZSAmJlxuXHRcdFx0XHRtZnAuY3VyclRlbXBsYXRlW3R5cGVdID09PSB0cnVlKSB7XG5cdFx0XHRcdC8vIGlmIHRoZXJlIGlzIG5vIG1hcmt1cCwgd2UganVzdCBhcHBlbmQgY2xvc2UgYnV0dG9uIGVsZW1lbnQgaW5zaWRlXG5cdFx0XHRcdGlmKCFtZnAuY29udGVudC5maW5kKCcubWZwLWNsb3NlJykubGVuZ3RoKSB7XG5cdFx0XHRcdFx0bWZwLmNvbnRlbnQuYXBwZW5kKF9nZXRDbG9zZUJ0bigpKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bWZwLmNvbnRlbnQgPSBuZXdDb250ZW50O1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRtZnAuY29udGVudCA9ICcnO1xuXHRcdH1cblxuXHRcdF9tZnBUcmlnZ2VyKEJFRk9SRV9BUFBFTkRfRVZFTlQpO1xuXHRcdG1mcC5jb250YWluZXIuYWRkQ2xhc3MoJ21mcC0nK3R5cGUrJy1ob2xkZXInKTtcblxuXHRcdG1mcC5jb250ZW50Q29udGFpbmVyLmFwcGVuZChtZnAuY29udGVudCk7XG5cdH0sXG5cblxuXHQvKipcblx0ICogQ3JlYXRlcyBNYWduaWZpYyBQb3B1cCBkYXRhIG9iamVjdCBiYXNlZCBvbiBnaXZlbiBkYXRhXG5cdCAqIEBwYXJhbSAge2ludH0gaW5kZXggSW5kZXggb2YgaXRlbSB0byBwYXJzZVxuXHQgKi9cblx0cGFyc2VFbDogZnVuY3Rpb24oaW5kZXgpIHtcblx0XHR2YXIgaXRlbSA9IG1mcC5pdGVtc1tpbmRleF0sXG5cdFx0XHR0eXBlO1xuXG5cdFx0aWYoaXRlbS50YWdOYW1lKSB7XG5cdFx0XHRpdGVtID0geyBlbDogJChpdGVtKSB9O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0eXBlID0gaXRlbS50eXBlO1xuXHRcdFx0aXRlbSA9IHsgZGF0YTogaXRlbSwgc3JjOiBpdGVtLnNyYyB9O1xuXHRcdH1cblxuXHRcdGlmKGl0ZW0uZWwpIHtcblx0XHRcdHZhciB0eXBlcyA9IG1mcC50eXBlcztcblxuXHRcdFx0Ly8gY2hlY2sgZm9yICdtZnAtVFlQRScgY2xhc3Ncblx0XHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0eXBlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRpZiggaXRlbS5lbC5oYXNDbGFzcygnbWZwLScrdHlwZXNbaV0pICkge1xuXHRcdFx0XHRcdHR5cGUgPSB0eXBlc1tpXTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpdGVtLnNyYyA9IGl0ZW0uZWwuYXR0cignZGF0YS1tZnAtc3JjJyk7XG5cdFx0XHRpZighaXRlbS5zcmMpIHtcblx0XHRcdFx0aXRlbS5zcmMgPSBpdGVtLmVsLmF0dHIoJ2hyZWYnKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpdGVtLnR5cGUgPSB0eXBlIHx8IG1mcC5zdC50eXBlIHx8ICdpbmxpbmUnO1xuXHRcdGl0ZW0uaW5kZXggPSBpbmRleDtcblx0XHRpdGVtLnBhcnNlZCA9IHRydWU7XG5cdFx0bWZwLml0ZW1zW2luZGV4XSA9IGl0ZW07XG5cdFx0X21mcFRyaWdnZXIoJ0VsZW1lbnRQYXJzZScsIGl0ZW0pO1xuXG5cdFx0cmV0dXJuIG1mcC5pdGVtc1tpbmRleF07XG5cdH0sXG5cblxuXHQvKipcblx0ICogSW5pdGlhbGl6ZXMgc2luZ2xlIHBvcHVwIG9yIGEgZ3JvdXAgb2YgcG9wdXBzXG5cdCAqL1xuXHRhZGRHcm91cDogZnVuY3Rpb24oZWwsIG9wdGlvbnMpIHtcblx0XHR2YXIgZUhhbmRsZXIgPSBmdW5jdGlvbihlKSB7XG5cdFx0XHRlLm1mcEVsID0gdGhpcztcblx0XHRcdG1mcC5fb3BlbkNsaWNrKGUsIGVsLCBvcHRpb25zKTtcblx0XHR9O1xuXG5cdFx0aWYoIW9wdGlvbnMpIHtcblx0XHRcdG9wdGlvbnMgPSB7fTtcblx0XHR9XG5cblx0XHR2YXIgZU5hbWUgPSAnY2xpY2subWFnbmlmaWNQb3B1cCc7XG5cdFx0b3B0aW9ucy5tYWluRWwgPSBlbDtcblxuXHRcdGlmKG9wdGlvbnMuaXRlbXMpIHtcblx0XHRcdG9wdGlvbnMuaXNPYmogPSB0cnVlO1xuXHRcdFx0ZWwub2ZmKGVOYW1lKS5vbihlTmFtZSwgZUhhbmRsZXIpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRvcHRpb25zLmlzT2JqID0gZmFsc2U7XG5cdFx0XHRpZihvcHRpb25zLmRlbGVnYXRlKSB7XG5cdFx0XHRcdGVsLm9mZihlTmFtZSkub24oZU5hbWUsIG9wdGlvbnMuZGVsZWdhdGUgLCBlSGFuZGxlcik7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRvcHRpb25zLml0ZW1zID0gZWw7XG5cdFx0XHRcdGVsLm9mZihlTmFtZSkub24oZU5hbWUsIGVIYW5kbGVyKTtcblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cdF9vcGVuQ2xpY2s6IGZ1bmN0aW9uKGUsIGVsLCBvcHRpb25zKSB7XG5cdFx0dmFyIG1pZENsaWNrID0gb3B0aW9ucy5taWRDbGljayAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5taWRDbGljayA6ICQubWFnbmlmaWNQb3B1cC5kZWZhdWx0cy5taWRDbGljaztcblxuXG5cdFx0aWYoIW1pZENsaWNrICYmICggZS53aGljaCA9PT0gMiB8fCBlLmN0cmxLZXkgfHwgZS5tZXRhS2V5IHx8IGUuYWx0S2V5IHx8IGUuc2hpZnRLZXkgKSApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHR2YXIgZGlzYWJsZU9uID0gb3B0aW9ucy5kaXNhYmxlT24gIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMuZGlzYWJsZU9uIDogJC5tYWduaWZpY1BvcHVwLmRlZmF1bHRzLmRpc2FibGVPbjtcblxuXHRcdGlmKGRpc2FibGVPbikge1xuXHRcdFx0aWYoJC5pc0Z1bmN0aW9uKGRpc2FibGVPbikpIHtcblx0XHRcdFx0aWYoICFkaXNhYmxlT24uY2FsbChtZnApICkge1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2UgeyAvLyBlbHNlIGl0J3MgbnVtYmVyXG5cdFx0XHRcdGlmKCBfd2luZG93LndpZHRoKCkgPCBkaXNhYmxlT24gKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZihlLnR5cGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0Ly8gVGhpcyB3aWxsIHByZXZlbnQgcG9wdXAgZnJvbSBjbG9zaW5nIGlmIGVsZW1lbnQgaXMgaW5zaWRlIGFuZCBwb3B1cCBpcyBhbHJlYWR5IG9wZW5lZFxuXHRcdFx0aWYobWZwLmlzT3Blbikge1xuXHRcdFx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdG9wdGlvbnMuZWwgPSAkKGUubWZwRWwpO1xuXHRcdGlmKG9wdGlvbnMuZGVsZWdhdGUpIHtcblx0XHRcdG9wdGlvbnMuaXRlbXMgPSBlbC5maW5kKG9wdGlvbnMuZGVsZWdhdGUpO1xuXHRcdH1cblx0XHRtZnAub3BlbihvcHRpb25zKTtcblx0fSxcblxuXG5cdC8qKlxuXHQgKiBVcGRhdGVzIHRleHQgb24gcHJlbG9hZGVyXG5cdCAqL1xuXHR1cGRhdGVTdGF0dXM6IGZ1bmN0aW9uKHN0YXR1cywgdGV4dCkge1xuXG5cdFx0aWYobWZwLnByZWxvYWRlcikge1xuXHRcdFx0aWYoX3ByZXZTdGF0dXMgIT09IHN0YXR1cykge1xuXHRcdFx0XHRtZnAuY29udGFpbmVyLnJlbW92ZUNsYXNzKCdtZnAtcy0nK19wcmV2U3RhdHVzKTtcblx0XHRcdH1cblxuXHRcdFx0aWYoIXRleHQgJiYgc3RhdHVzID09PSAnbG9hZGluZycpIHtcblx0XHRcdFx0dGV4dCA9IG1mcC5zdC50TG9hZGluZztcblx0XHRcdH1cblxuXHRcdFx0dmFyIGRhdGEgPSB7XG5cdFx0XHRcdHN0YXR1czogc3RhdHVzLFxuXHRcdFx0XHR0ZXh0OiB0ZXh0XG5cdFx0XHR9O1xuXHRcdFx0Ly8gYWxsb3dzIHRvIG1vZGlmeSBzdGF0dXNcblx0XHRcdF9tZnBUcmlnZ2VyKCdVcGRhdGVTdGF0dXMnLCBkYXRhKTtcblxuXHRcdFx0c3RhdHVzID0gZGF0YS5zdGF0dXM7XG5cdFx0XHR0ZXh0ID0gZGF0YS50ZXh0O1xuXG5cdFx0XHRtZnAucHJlbG9hZGVyLmh0bWwodGV4dCk7XG5cblx0XHRcdG1mcC5wcmVsb2FkZXIuZmluZCgnYScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcblx0XHRcdFx0ZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRtZnAuY29udGFpbmVyLmFkZENsYXNzKCdtZnAtcy0nK3N0YXR1cyk7XG5cdFx0XHRfcHJldlN0YXR1cyA9IHN0YXR1cztcblx0XHR9XG5cdH0sXG5cblxuXHQvKlxuXHRcdFwiUHJpdmF0ZVwiIGhlbHBlcnMgdGhhdCBhcmVuJ3QgcHJpdmF0ZSBhdCBhbGxcblx0ICovXG5cdC8vIENoZWNrIHRvIGNsb3NlIHBvcHVwIG9yIG5vdFxuXHQvLyBcInRhcmdldFwiIGlzIGFuIGVsZW1lbnQgdGhhdCB3YXMgY2xpY2tlZFxuXHRfY2hlY2tJZkNsb3NlOiBmdW5jdGlvbih0YXJnZXQpIHtcblxuXHRcdGlmKCQodGFyZ2V0KS5oYXNDbGFzcyhQUkVWRU5UX0NMT1NFX0NMQVNTKSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdHZhciBjbG9zZU9uQ29udGVudCA9IG1mcC5zdC5jbG9zZU9uQ29udGVudENsaWNrO1xuXHRcdHZhciBjbG9zZU9uQmcgPSBtZnAuc3QuY2xvc2VPbkJnQ2xpY2s7XG5cblx0XHRpZihjbG9zZU9uQ29udGVudCAmJiBjbG9zZU9uQmcpIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH0gZWxzZSB7XG5cblx0XHRcdC8vIFdlIGNsb3NlIHRoZSBwb3B1cCBpZiBjbGljayBpcyBvbiBjbG9zZSBidXR0b24gb3Igb24gcHJlbG9hZGVyLiBPciBpZiB0aGVyZSBpcyBubyBjb250ZW50LlxuXHRcdFx0aWYoIW1mcC5jb250ZW50IHx8ICQodGFyZ2V0KS5oYXNDbGFzcygnbWZwLWNsb3NlJykgfHwgKG1mcC5wcmVsb2FkZXIgJiYgdGFyZ2V0ID09PSBtZnAucHJlbG9hZGVyWzBdKSApIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cblx0XHRcdC8vIGlmIGNsaWNrIGlzIG91dHNpZGUgdGhlIGNvbnRlbnRcblx0XHRcdGlmKCAgKHRhcmdldCAhPT0gbWZwLmNvbnRlbnRbMF0gJiYgISQuY29udGFpbnMobWZwLmNvbnRlbnRbMF0sIHRhcmdldCkpICApIHtcblx0XHRcdFx0aWYoY2xvc2VPbkJnKSB7XG5cdFx0XHRcdFx0Ly8gbGFzdCBjaGVjaywgaWYgdGhlIGNsaWNrZWQgZWxlbWVudCBpcyBpbiBET00sIChpbiBjYXNlIGl0J3MgcmVtb3ZlZCBvbmNsaWNrKVxuXHRcdFx0XHRcdGlmKCAkLmNvbnRhaW5zKGRvY3VtZW50LCB0YXJnZXQpICkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2UgaWYoY2xvc2VPbkNvbnRlbnQpIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9LFxuXHRfYWRkQ2xhc3NUb01GUDogZnVuY3Rpb24oY05hbWUpIHtcblx0XHRtZnAuYmdPdmVybGF5LmFkZENsYXNzKGNOYW1lKTtcblx0XHRtZnAud3JhcC5hZGRDbGFzcyhjTmFtZSk7XG5cdH0sXG5cdF9yZW1vdmVDbGFzc0Zyb21NRlA6IGZ1bmN0aW9uKGNOYW1lKSB7XG5cdFx0dGhpcy5iZ092ZXJsYXkucmVtb3ZlQ2xhc3MoY05hbWUpO1xuXHRcdG1mcC53cmFwLnJlbW92ZUNsYXNzKGNOYW1lKTtcblx0fSxcblx0X2hhc1Njcm9sbEJhcjogZnVuY3Rpb24od2luSGVpZ2h0KSB7XG5cdFx0cmV0dXJuICggIChtZnAuaXNJRTcgPyBfZG9jdW1lbnQuaGVpZ2h0KCkgOiBkb2N1bWVudC5ib2R5LnNjcm9sbEhlaWdodCkgPiAod2luSGVpZ2h0IHx8IF93aW5kb3cuaGVpZ2h0KCkpICk7XG5cdH0sXG5cdF9zZXRGb2N1czogZnVuY3Rpb24oKSB7XG5cdFx0KG1mcC5zdC5mb2N1cyA/IG1mcC5jb250ZW50LmZpbmQobWZwLnN0LmZvY3VzKS5lcSgwKSA6IG1mcC53cmFwKS5mb2N1cygpO1xuXHR9LFxuXHRfb25Gb2N1c0luOiBmdW5jdGlvbihlKSB7XG5cdFx0aWYoIGUudGFyZ2V0ICE9PSBtZnAud3JhcFswXSAmJiAhJC5jb250YWlucyhtZnAud3JhcFswXSwgZS50YXJnZXQpICkge1xuXHRcdFx0bWZwLl9zZXRGb2N1cygpO1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0fSxcblx0X3BhcnNlTWFya3VwOiBmdW5jdGlvbih0ZW1wbGF0ZSwgdmFsdWVzLCBpdGVtKSB7XG5cdFx0dmFyIGFycjtcblx0XHRpZihpdGVtLmRhdGEpIHtcblx0XHRcdHZhbHVlcyA9ICQuZXh0ZW5kKGl0ZW0uZGF0YSwgdmFsdWVzKTtcblx0XHR9XG5cdFx0X21mcFRyaWdnZXIoTUFSS1VQX1BBUlNFX0VWRU5ULCBbdGVtcGxhdGUsIHZhbHVlcywgaXRlbV0gKTtcblxuXHRcdCQuZWFjaCh2YWx1ZXMsIGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcblx0XHRcdGlmKHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IGZhbHNlKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdFx0YXJyID0ga2V5LnNwbGl0KCdfJyk7XG5cdFx0XHRpZihhcnIubGVuZ3RoID4gMSkge1xuXHRcdFx0XHR2YXIgZWwgPSB0ZW1wbGF0ZS5maW5kKEVWRU5UX05TICsgJy0nK2FyclswXSk7XG5cblx0XHRcdFx0aWYoZWwubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdHZhciBhdHRyID0gYXJyWzFdO1xuXHRcdFx0XHRcdGlmKGF0dHIgPT09ICdyZXBsYWNlV2l0aCcpIHtcblx0XHRcdFx0XHRcdGlmKGVsWzBdICE9PSB2YWx1ZVswXSkge1xuXHRcdFx0XHRcdFx0XHRlbC5yZXBsYWNlV2l0aCh2YWx1ZSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSBlbHNlIGlmKGF0dHIgPT09ICdpbWcnKSB7XG5cdFx0XHRcdFx0XHRpZihlbC5pcygnaW1nJykpIHtcblx0XHRcdFx0XHRcdFx0ZWwuYXR0cignc3JjJywgdmFsdWUpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0ZWwucmVwbGFjZVdpdGgoICQoJzxpbWc+JykuYXR0cignc3JjJywgdmFsdWUpLmF0dHIoJ2NsYXNzJywgZWwuYXR0cignY2xhc3MnKSkgKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0ZWwuYXR0cihhcnJbMV0sIHZhbHVlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGVtcGxhdGUuZmluZChFVkVOVF9OUyArICctJytrZXkpLmh0bWwodmFsdWUpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9LFxuXG5cdF9nZXRTY3JvbGxiYXJTaXplOiBmdW5jdGlvbigpIHtcblx0XHQvLyB0aHggRGF2aWRcblx0XHRpZihtZnAuc2Nyb2xsYmFyU2l6ZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHR2YXIgc2Nyb2xsRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRcdHNjcm9sbERpdi5zdHlsZS5jc3NUZXh0ID0gJ3dpZHRoOiA5OXB4OyBoZWlnaHQ6IDk5cHg7IG92ZXJmbG93OiBzY3JvbGw7IHBvc2l0aW9uOiBhYnNvbHV0ZTsgdG9wOiAtOTk5OXB4Oyc7XG5cdFx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNjcm9sbERpdik7XG5cdFx0XHRtZnAuc2Nyb2xsYmFyU2l6ZSA9IHNjcm9sbERpdi5vZmZzZXRXaWR0aCAtIHNjcm9sbERpdi5jbGllbnRXaWR0aDtcblx0XHRcdGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoc2Nyb2xsRGl2KTtcblx0XHR9XG5cdFx0cmV0dXJuIG1mcC5zY3JvbGxiYXJTaXplO1xuXHR9XG5cbn07IC8qIE1hZ25pZmljUG9wdXAgY29yZSBwcm90b3R5cGUgZW5kICovXG5cblxuXG5cbi8qKlxuICogUHVibGljIHN0YXRpYyBmdW5jdGlvbnNcbiAqL1xuJC5tYWduaWZpY1BvcHVwID0ge1xuXHRpbnN0YW5jZTogbnVsbCxcblx0cHJvdG86IE1hZ25pZmljUG9wdXAucHJvdG90eXBlLFxuXHRtb2R1bGVzOiBbXSxcblxuXHRvcGVuOiBmdW5jdGlvbihvcHRpb25zLCBpbmRleCkge1xuXHRcdF9jaGVja0luc3RhbmNlKCk7XG5cblx0XHRpZighb3B0aW9ucykge1xuXHRcdFx0b3B0aW9ucyA9IHt9O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRvcHRpb25zID0gJC5leHRlbmQodHJ1ZSwge30sIG9wdGlvbnMpO1xuXHRcdH1cblxuXHRcdG9wdGlvbnMuaXNPYmogPSB0cnVlO1xuXHRcdG9wdGlvbnMuaW5kZXggPSBpbmRleCB8fCAwO1xuXHRcdHJldHVybiB0aGlzLmluc3RhbmNlLm9wZW4ob3B0aW9ucyk7XG5cdH0sXG5cblx0Y2xvc2U6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiAkLm1hZ25pZmljUG9wdXAuaW5zdGFuY2UgJiYgJC5tYWduaWZpY1BvcHVwLmluc3RhbmNlLmNsb3NlKCk7XG5cdH0sXG5cblx0cmVnaXN0ZXJNb2R1bGU6IGZ1bmN0aW9uKG5hbWUsIG1vZHVsZSkge1xuXHRcdGlmKG1vZHVsZS5vcHRpb25zKSB7XG5cdFx0XHQkLm1hZ25pZmljUG9wdXAuZGVmYXVsdHNbbmFtZV0gPSBtb2R1bGUub3B0aW9ucztcblx0XHR9XG5cdFx0JC5leHRlbmQodGhpcy5wcm90bywgbW9kdWxlLnByb3RvKTtcblx0XHR0aGlzLm1vZHVsZXMucHVzaChuYW1lKTtcblx0fSxcblxuXHRkZWZhdWx0czoge1xuXG5cdFx0Ly8gSW5mbyBhYm91dCBvcHRpb25zIGlzIGluIGRvY3M6XG5cdFx0Ly8gaHR0cDovL2RpbXNlbWVub3YuY29tL3BsdWdpbnMvbWFnbmlmaWMtcG9wdXAvZG9jdW1lbnRhdGlvbi5odG1sI29wdGlvbnNcblxuXHRcdGRpc2FibGVPbjogMCxcblxuXHRcdGtleTogbnVsbCxcblxuXHRcdG1pZENsaWNrOiBmYWxzZSxcblxuXHRcdG1haW5DbGFzczogJycsXG5cblx0XHRwcmVsb2FkZXI6IHRydWUsXG5cblx0XHRmb2N1czogJycsIC8vIENTUyBzZWxlY3RvciBvZiBpbnB1dCB0byBmb2N1cyBhZnRlciBwb3B1cCBpcyBvcGVuZWRcblxuXHRcdGNsb3NlT25Db250ZW50Q2xpY2s6IGZhbHNlLFxuXG5cdFx0Y2xvc2VPbkJnQ2xpY2s6IHRydWUsXG5cblx0XHRjbG9zZUJ0bkluc2lkZTogdHJ1ZSxcblxuXHRcdHNob3dDbG9zZUJ0bjogdHJ1ZSxcblxuXHRcdGVuYWJsZUVzY2FwZUtleTogdHJ1ZSxcblxuXHRcdG1vZGFsOiBmYWxzZSxcblxuXHRcdGFsaWduVG9wOiBmYWxzZSxcblxuXHRcdHJlbW92YWxEZWxheTogMCxcblxuXHRcdHByZXBlbmRUbzogbnVsbCxcblxuXHRcdGZpeGVkQ29udGVudFBvczogJ2F1dG8nLFxuXG5cdFx0Zml4ZWRCZ1BvczogJ2F1dG8nLFxuXG5cdFx0b3ZlcmZsb3dZOiAnYXV0bycsXG5cblx0XHRjbG9zZU1hcmt1cDogJzxidXR0b24gdGl0bGU9XCIldGl0bGUlXCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwibWZwLWNsb3NlXCI+JiMyMTU7PC9idXR0b24+JyxcblxuXHRcdHRDbG9zZTogJ0Nsb3NlIChFc2MpJyxcblxuXHRcdHRMb2FkaW5nOiAnTG9hZGluZy4uLicsXG5cblx0XHRhdXRvRm9jdXNMYXN0OiB0cnVlXG5cblx0fVxufTtcblxuXG5cbiQuZm4ubWFnbmlmaWNQb3B1cCA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcblx0X2NoZWNrSW5zdGFuY2UoKTtcblxuXHR2YXIganFFbCA9ICQodGhpcyk7XG5cblx0Ly8gV2UgY2FsbCBzb21lIEFQSSBtZXRob2Qgb2YgZmlyc3QgcGFyYW0gaXMgYSBzdHJpbmdcblx0aWYgKHR5cGVvZiBvcHRpb25zID09PSBcInN0cmluZ1wiICkge1xuXG5cdFx0aWYob3B0aW9ucyA9PT0gJ29wZW4nKSB7XG5cdFx0XHR2YXIgaXRlbXMsXG5cdFx0XHRcdGl0ZW1PcHRzID0gX2lzSlEgPyBqcUVsLmRhdGEoJ21hZ25pZmljUG9wdXAnKSA6IGpxRWxbMF0ubWFnbmlmaWNQb3B1cCxcblx0XHRcdFx0aW5kZXggPSBwYXJzZUludChhcmd1bWVudHNbMV0sIDEwKSB8fCAwO1xuXG5cdFx0XHRpZihpdGVtT3B0cy5pdGVtcykge1xuXHRcdFx0XHRpdGVtcyA9IGl0ZW1PcHRzLml0ZW1zW2luZGV4XTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGl0ZW1zID0ganFFbDtcblx0XHRcdFx0aWYoaXRlbU9wdHMuZGVsZWdhdGUpIHtcblx0XHRcdFx0XHRpdGVtcyA9IGl0ZW1zLmZpbmQoaXRlbU9wdHMuZGVsZWdhdGUpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGl0ZW1zID0gaXRlbXMuZXEoIGluZGV4ICk7XG5cdFx0XHR9XG5cdFx0XHRtZnAuX29wZW5DbGljayh7bWZwRWw6aXRlbXN9LCBqcUVsLCBpdGVtT3B0cyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmKG1mcC5pc09wZW4pXG5cdFx0XHRcdG1mcFtvcHRpb25zXS5hcHBseShtZnAsIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkpO1xuXHRcdH1cblxuXHR9IGVsc2Uge1xuXHRcdC8vIGNsb25lIG9wdGlvbnMgb2JqXG5cdFx0b3B0aW9ucyA9ICQuZXh0ZW5kKHRydWUsIHt9LCBvcHRpb25zKTtcblxuXHRcdC8qXG5cdFx0ICogQXMgWmVwdG8gZG9lc24ndCBzdXBwb3J0IC5kYXRhKCkgbWV0aG9kIGZvciBvYmplY3RzXG5cdFx0ICogYW5kIGl0IHdvcmtzIG9ubHkgaW4gbm9ybWFsIGJyb3dzZXJzXG5cdFx0ICogd2UgYXNzaWduIFwib3B0aW9uc1wiIG9iamVjdCBkaXJlY3RseSB0byB0aGUgRE9NIGVsZW1lbnQuIEZUVyFcblx0XHQgKi9cblx0XHRpZihfaXNKUSkge1xuXHRcdFx0anFFbC5kYXRhKCdtYWduaWZpY1BvcHVwJywgb3B0aW9ucyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGpxRWxbMF0ubWFnbmlmaWNQb3B1cCA9IG9wdGlvbnM7XG5cdFx0fVxuXG5cdFx0bWZwLmFkZEdyb3VwKGpxRWwsIG9wdGlvbnMpO1xuXG5cdH1cblx0cmV0dXJuIGpxRWw7XG59O1xuXG4vKj4+Y29yZSovXG5cblxuXG5cblxuXG5cbi8qPj56b29tKi9cbnZhciBoYXNNb3pUcmFuc2Zvcm0sXG5cdGdldEhhc01velRyYW5zZm9ybSA9IGZ1bmN0aW9uKCkge1xuXHRcdGlmKGhhc01velRyYW5zZm9ybSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRoYXNNb3pUcmFuc2Zvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJykuc3R5bGUuTW96VHJhbnNmb3JtICE9PSB1bmRlZmluZWQ7XG5cdFx0fVxuXHRcdHJldHVybiBoYXNNb3pUcmFuc2Zvcm07XG5cdH07XG5cbiQubWFnbmlmaWNQb3B1cC5yZWdpc3Rlck1vZHVsZSgnem9vbScsIHtcblxuXHRvcHRpb25zOiB7XG5cdFx0ZW5hYmxlZDogZmFsc2UsXG5cdFx0ZWFzaW5nOiAnZWFzZS1pbi1vdXQnLFxuXHRcdGR1cmF0aW9uOiAzMDAsXG5cdFx0b3BlbmVyOiBmdW5jdGlvbihlbGVtZW50KSB7XG5cdFx0XHRyZXR1cm4gZWxlbWVudC5pcygnaW1nJykgPyBlbGVtZW50IDogZWxlbWVudC5maW5kKCdpbWcnKTtcblx0XHR9XG5cdH0sXG5cblx0cHJvdG86IHtcblxuXHRcdGluaXRab29tOiBmdW5jdGlvbigpIHtcblx0XHRcdHZhciB6b29tU3QgPSBtZnAuc3Quem9vbSxcblx0XHRcdFx0bnMgPSAnLnpvb20nLFxuXHRcdFx0XHRpbWFnZTtcblxuXHRcdFx0aWYoIXpvb21TdC5lbmFibGVkIHx8ICFtZnAuc3VwcG9ydHNUcmFuc2l0aW9uKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0dmFyIGR1cmF0aW9uID0gem9vbVN0LmR1cmF0aW9uLFxuXHRcdFx0XHRnZXRFbFRvQW5pbWF0ZSA9IGZ1bmN0aW9uKGltYWdlKSB7XG5cdFx0XHRcdFx0dmFyIG5ld0ltZyA9IGltYWdlLmNsb25lKCkucmVtb3ZlQXR0cignc3R5bGUnKS5yZW1vdmVBdHRyKCdjbGFzcycpLmFkZENsYXNzKCdtZnAtYW5pbWF0ZWQtaW1hZ2UnKSxcblx0XHRcdFx0XHRcdHRyYW5zaXRpb24gPSAnYWxsICcrKHpvb21TdC5kdXJhdGlvbi8xMDAwKSsncyAnICsgem9vbVN0LmVhc2luZyxcblx0XHRcdFx0XHRcdGNzc09iaiA9IHtcblx0XHRcdFx0XHRcdFx0cG9zaXRpb246ICdmaXhlZCcsXG5cdFx0XHRcdFx0XHRcdHpJbmRleDogOTk5OSxcblx0XHRcdFx0XHRcdFx0bGVmdDogMCxcblx0XHRcdFx0XHRcdFx0dG9wOiAwLFxuXHRcdFx0XHRcdFx0XHQnLXdlYmtpdC1iYWNrZmFjZS12aXNpYmlsaXR5JzogJ2hpZGRlbidcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHR0ID0gJ3RyYW5zaXRpb24nO1xuXG5cdFx0XHRcdFx0Y3NzT2JqWyctd2Via2l0LScrdF0gPSBjc3NPYmpbJy1tb3otJyt0XSA9IGNzc09ialsnLW8tJyt0XSA9IGNzc09ialt0XSA9IHRyYW5zaXRpb247XG5cblx0XHRcdFx0XHRuZXdJbWcuY3NzKGNzc09iaik7XG5cdFx0XHRcdFx0cmV0dXJuIG5ld0ltZztcblx0XHRcdFx0fSxcblx0XHRcdFx0c2hvd01haW5Db250ZW50ID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0bWZwLmNvbnRlbnQuY3NzKCd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKTtcblx0XHRcdFx0fSxcblx0XHRcdFx0b3BlblRpbWVvdXQsXG5cdFx0XHRcdGFuaW1hdGVkSW1nO1xuXG5cdFx0XHRfbWZwT24oJ0J1aWxkQ29udHJvbHMnK25zLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0aWYobWZwLl9hbGxvd1pvb20oKSkge1xuXG5cdFx0XHRcdFx0Y2xlYXJUaW1lb3V0KG9wZW5UaW1lb3V0KTtcblx0XHRcdFx0XHRtZnAuY29udGVudC5jc3MoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XG5cblx0XHRcdFx0XHQvLyBCYXNpY2FsbHksIGFsbCBjb2RlIGJlbG93IGRvZXMgaXMgY2xvbmVzIGV4aXN0aW5nIGltYWdlLCBwdXRzIGluIG9uIHRvcCBvZiB0aGUgY3VycmVudCBvbmUgYW5kIGFuaW1hdGVkIGl0XG5cblx0XHRcdFx0XHRpbWFnZSA9IG1mcC5fZ2V0SXRlbVRvWm9vbSgpO1xuXG5cdFx0XHRcdFx0aWYoIWltYWdlKSB7XG5cdFx0XHRcdFx0XHRzaG93TWFpbkNvbnRlbnQoKTtcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRhbmltYXRlZEltZyA9IGdldEVsVG9BbmltYXRlKGltYWdlKTtcblxuXHRcdFx0XHRcdGFuaW1hdGVkSW1nLmNzcyggbWZwLl9nZXRPZmZzZXQoKSApO1xuXG5cdFx0XHRcdFx0bWZwLndyYXAuYXBwZW5kKGFuaW1hdGVkSW1nKTtcblxuXHRcdFx0XHRcdG9wZW5UaW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdGFuaW1hdGVkSW1nLmNzcyggbWZwLl9nZXRPZmZzZXQoIHRydWUgKSApO1xuXHRcdFx0XHRcdFx0b3BlblRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRcdFx0XHRcdHNob3dNYWluQ29udGVudCgpO1xuXG5cdFx0XHRcdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcdFx0YW5pbWF0ZWRJbWcucmVtb3ZlKCk7XG5cdFx0XHRcdFx0XHRcdFx0aW1hZ2UgPSBhbmltYXRlZEltZyA9IG51bGw7XG5cdFx0XHRcdFx0XHRcdFx0X21mcFRyaWdnZXIoJ1pvb21BbmltYXRpb25FbmRlZCcpO1xuXHRcdFx0XHRcdFx0XHR9LCAxNik7IC8vIGF2b2lkIGJsaW5rIHdoZW4gc3dpdGNoaW5nIGltYWdlc1xuXG5cdFx0XHRcdFx0XHR9LCBkdXJhdGlvbik7IC8vIHRoaXMgdGltZW91dCBlcXVhbHMgYW5pbWF0aW9uIGR1cmF0aW9uXG5cblx0XHRcdFx0XHR9LCAxNik7IC8vIGJ5IGFkZGluZyB0aGlzIHRpbWVvdXQgd2UgYXZvaWQgc2hvcnQgZ2xpdGNoIGF0IHRoZSBiZWdpbm5pbmcgb2YgYW5pbWF0aW9uXG5cblxuXHRcdFx0XHRcdC8vIExvdHMgb2YgdGltZW91dHMuLi5cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRfbWZwT24oQkVGT1JFX0NMT1NFX0VWRU5UK25zLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0aWYobWZwLl9hbGxvd1pvb20oKSkge1xuXG5cdFx0XHRcdFx0Y2xlYXJUaW1lb3V0KG9wZW5UaW1lb3V0KTtcblxuXHRcdFx0XHRcdG1mcC5zdC5yZW1vdmFsRGVsYXkgPSBkdXJhdGlvbjtcblxuXHRcdFx0XHRcdGlmKCFpbWFnZSkge1xuXHRcdFx0XHRcdFx0aW1hZ2UgPSBtZnAuX2dldEl0ZW1Ub1pvb20oKTtcblx0XHRcdFx0XHRcdGlmKCFpbWFnZSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRhbmltYXRlZEltZyA9IGdldEVsVG9BbmltYXRlKGltYWdlKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRhbmltYXRlZEltZy5jc3MoIG1mcC5fZ2V0T2Zmc2V0KHRydWUpICk7XG5cdFx0XHRcdFx0bWZwLndyYXAuYXBwZW5kKGFuaW1hdGVkSW1nKTtcblx0XHRcdFx0XHRtZnAuY29udGVudC5jc3MoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XG5cblx0XHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0YW5pbWF0ZWRJbWcuY3NzKCBtZnAuX2dldE9mZnNldCgpICk7XG5cdFx0XHRcdFx0fSwgMTYpO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0pO1xuXG5cdFx0XHRfbWZwT24oQ0xPU0VfRVZFTlQrbnMsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRpZihtZnAuX2FsbG93Wm9vbSgpKSB7XG5cdFx0XHRcdFx0c2hvd01haW5Db250ZW50KCk7XG5cdFx0XHRcdFx0aWYoYW5pbWF0ZWRJbWcpIHtcblx0XHRcdFx0XHRcdGFuaW1hdGVkSW1nLnJlbW92ZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpbWFnZSA9IG51bGw7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0sXG5cblx0XHRfYWxsb3dab29tOiBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiBtZnAuY3Vyckl0ZW0udHlwZSA9PT0gJ2ltYWdlJztcblx0XHR9LFxuXG5cdFx0X2dldEl0ZW1Ub1pvb206IGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYobWZwLmN1cnJJdGVtLmhhc1NpemUpIHtcblx0XHRcdFx0cmV0dXJuIG1mcC5jdXJySXRlbS5pbWc7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8vIEdldCBlbGVtZW50IHBvc3Rpb24gcmVsYXRpdmUgdG8gdmlld3BvcnRcblx0XHRfZ2V0T2Zmc2V0OiBmdW5jdGlvbihpc0xhcmdlKSB7XG5cdFx0XHR2YXIgZWw7XG5cdFx0XHRpZihpc0xhcmdlKSB7XG5cdFx0XHRcdGVsID0gbWZwLmN1cnJJdGVtLmltZztcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGVsID0gbWZwLnN0Lnpvb20ub3BlbmVyKG1mcC5jdXJySXRlbS5lbCB8fCBtZnAuY3Vyckl0ZW0pO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgb2Zmc2V0ID0gZWwub2Zmc2V0KCk7XG5cdFx0XHR2YXIgcGFkZGluZ1RvcCA9IHBhcnNlSW50KGVsLmNzcygncGFkZGluZy10b3AnKSwxMCk7XG5cdFx0XHR2YXIgcGFkZGluZ0JvdHRvbSA9IHBhcnNlSW50KGVsLmNzcygncGFkZGluZy1ib3R0b20nKSwxMCk7XG5cdFx0XHRvZmZzZXQudG9wIC09ICggJCh3aW5kb3cpLnNjcm9sbFRvcCgpIC0gcGFkZGluZ1RvcCApO1xuXG5cblx0XHRcdC8qXG5cblx0XHRcdEFuaW1hdGluZyBsZWZ0ICsgdG9wICsgd2lkdGgvaGVpZ2h0IGxvb2tzIGdsaXRjaHkgaW4gRmlyZWZveCwgYnV0IHBlcmZlY3QgaW4gQ2hyb21lLiBBbmQgdmljZS12ZXJzYS5cblxuXHRcdFx0ICovXG5cdFx0XHR2YXIgb2JqID0ge1xuXHRcdFx0XHR3aWR0aDogZWwud2lkdGgoKSxcblx0XHRcdFx0Ly8gZml4IFplcHRvIGhlaWdodCtwYWRkaW5nIGlzc3VlXG5cdFx0XHRcdGhlaWdodDogKF9pc0pRID8gZWwuaW5uZXJIZWlnaHQoKSA6IGVsWzBdLm9mZnNldEhlaWdodCkgLSBwYWRkaW5nQm90dG9tIC0gcGFkZGluZ1RvcFxuXHRcdFx0fTtcblxuXHRcdFx0Ly8gSSBoYXRlIHRvIGRvIHRoaXMsIGJ1dCB0aGVyZSBpcyBubyBhbm90aGVyIG9wdGlvblxuXHRcdFx0aWYoIGdldEhhc01velRyYW5zZm9ybSgpICkge1xuXHRcdFx0XHRvYmpbJy1tb3otdHJhbnNmb3JtJ10gPSBvYmpbJ3RyYW5zZm9ybSddID0gJ3RyYW5zbGF0ZSgnICsgb2Zmc2V0LmxlZnQgKyAncHgsJyArIG9mZnNldC50b3AgKyAncHgpJztcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdG9iai5sZWZ0ID0gb2Zmc2V0LmxlZnQ7XG5cdFx0XHRcdG9iai50b3AgPSBvZmZzZXQudG9wO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG9iajtcblx0XHR9XG5cblx0fVxufSk7XG5cblxuXG4vKj4+em9vbSovXG5cbi8qPj5pZnJhbWUqL1xuXG52YXIgSUZSQU1FX05TID0gJ2lmcmFtZScsXG5cdF9lbXB0eVBhZ2UgPSAnLy9hYm91dDpibGFuaycsXG5cblx0X2ZpeElmcmFtZUJ1Z3MgPSBmdW5jdGlvbihpc1Nob3dpbmcpIHtcblx0XHRpZihtZnAuY3VyclRlbXBsYXRlW0lGUkFNRV9OU10pIHtcblx0XHRcdHZhciBlbCA9IG1mcC5jdXJyVGVtcGxhdGVbSUZSQU1FX05TXS5maW5kKCdpZnJhbWUnKTtcblx0XHRcdGlmKGVsLmxlbmd0aCkge1xuXHRcdFx0XHQvLyByZXNldCBzcmMgYWZ0ZXIgdGhlIHBvcHVwIGlzIGNsb3NlZCB0byBhdm9pZCBcInZpZGVvIGtlZXBzIHBsYXlpbmcgYWZ0ZXIgcG9wdXAgaXMgY2xvc2VkXCIgYnVnXG5cdFx0XHRcdGlmKCFpc1Nob3dpbmcpIHtcblx0XHRcdFx0XHRlbFswXS5zcmMgPSBfZW1wdHlQYWdlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gSUU4IGJsYWNrIHNjcmVlbiBidWcgZml4XG5cdFx0XHRcdGlmKG1mcC5pc0lFOCkge1xuXHRcdFx0XHRcdGVsLmNzcygnZGlzcGxheScsIGlzU2hvd2luZyA/ICdibG9jaycgOiAnbm9uZScpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xuXG4kLm1hZ25pZmljUG9wdXAucmVnaXN0ZXJNb2R1bGUoSUZSQU1FX05TLCB7XG5cblx0b3B0aW9uczoge1xuXHRcdG1hcmt1cDogJzxkaXYgY2xhc3M9XCJtZnAtaWZyYW1lLXNjYWxlclwiPicrXG5cdFx0XHRcdFx0JzxkaXYgY2xhc3M9XCJtZnAtY2xvc2VcIj48L2Rpdj4nK1xuXHRcdFx0XHRcdCc8aWZyYW1lIGNsYXNzPVwibWZwLWlmcmFtZVwiIHNyYz1cIi8vYWJvdXQ6YmxhbmtcIiBmcmFtZWJvcmRlcj1cIjBcIiBhbGxvd2Z1bGxzY3JlZW4+PC9pZnJhbWU+Jytcblx0XHRcdFx0JzwvZGl2PicsXG5cblx0XHRzcmNBY3Rpb246ICdpZnJhbWVfc3JjJyxcblxuXHRcdC8vIHdlIGRvbid0IGNhcmUgYW5kIHN1cHBvcnQgb25seSBvbmUgZGVmYXVsdCB0eXBlIG9mIFVSTCBieSBkZWZhdWx0XG5cdFx0cGF0dGVybnM6IHtcblx0XHRcdHlvdXR1YmU6IHtcblx0XHRcdFx0aW5kZXg6ICd5b3V0dWJlLmNvbScsXG5cdFx0XHRcdGlkOiAndj0nLFxuXHRcdFx0XHRzcmM6ICcvL3d3dy55b3V0dWJlLmNvbS9lbWJlZC8laWQlP2F1dG9wbGF5PTEnXG5cdFx0XHR9LFxuXHRcdFx0dmltZW86IHtcblx0XHRcdFx0aW5kZXg6ICd2aW1lby5jb20vJyxcblx0XHRcdFx0aWQ6ICcvJyxcblx0XHRcdFx0c3JjOiAnLy9wbGF5ZXIudmltZW8uY29tL3ZpZGVvLyVpZCU/YXV0b3BsYXk9MSdcblx0XHRcdH0sXG5cdFx0XHRnbWFwczoge1xuXHRcdFx0XHRpbmRleDogJy8vbWFwcy5nb29nbGUuJyxcblx0XHRcdFx0c3JjOiAnJWlkJSZvdXRwdXQ9ZW1iZWQnXG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXG5cdHByb3RvOiB7XG5cdFx0aW5pdElmcmFtZTogZnVuY3Rpb24oKSB7XG5cdFx0XHRtZnAudHlwZXMucHVzaChJRlJBTUVfTlMpO1xuXG5cdFx0XHRfbWZwT24oJ0JlZm9yZUNoYW5nZScsIGZ1bmN0aW9uKGUsIHByZXZUeXBlLCBuZXdUeXBlKSB7XG5cdFx0XHRcdGlmKHByZXZUeXBlICE9PSBuZXdUeXBlKSB7XG5cdFx0XHRcdFx0aWYocHJldlR5cGUgPT09IElGUkFNRV9OUykge1xuXHRcdFx0XHRcdFx0X2ZpeElmcmFtZUJ1Z3MoKTsgLy8gaWZyYW1lIGlmIHJlbW92ZWRcblx0XHRcdFx0XHR9IGVsc2UgaWYobmV3VHlwZSA9PT0gSUZSQU1FX05TKSB7XG5cdFx0XHRcdFx0XHRfZml4SWZyYW1lQnVncyh0cnVlKTsgLy8gaWZyYW1lIGlzIHNob3dpbmdcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0vLyBlbHNlIHtcblx0XHRcdFx0XHQvLyBpZnJhbWUgc291cmNlIGlzIHN3aXRjaGVkLCBkb24ndCBkbyBhbnl0aGluZ1xuXHRcdFx0XHQvL31cblx0XHRcdH0pO1xuXG5cdFx0XHRfbWZwT24oQ0xPU0VfRVZFTlQgKyAnLicgKyBJRlJBTUVfTlMsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRfZml4SWZyYW1lQnVncygpO1xuXHRcdFx0fSk7XG5cdFx0fSxcblxuXHRcdGdldElmcmFtZTogZnVuY3Rpb24oaXRlbSwgdGVtcGxhdGUpIHtcblx0XHRcdHZhciBlbWJlZFNyYyA9IGl0ZW0uc3JjO1xuXHRcdFx0dmFyIGlmcmFtZVN0ID0gbWZwLnN0LmlmcmFtZTtcblxuXHRcdFx0JC5lYWNoKGlmcmFtZVN0LnBhdHRlcm5zLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0aWYoZW1iZWRTcmMuaW5kZXhPZiggdGhpcy5pbmRleCApID4gLTEpIHtcblx0XHRcdFx0XHRpZih0aGlzLmlkKSB7XG5cdFx0XHRcdFx0XHRpZih0eXBlb2YgdGhpcy5pZCA9PT0gJ3N0cmluZycpIHtcblx0XHRcdFx0XHRcdFx0ZW1iZWRTcmMgPSBlbWJlZFNyYy5zdWJzdHIoZW1iZWRTcmMubGFzdEluZGV4T2YodGhpcy5pZCkrdGhpcy5pZC5sZW5ndGgsIGVtYmVkU3JjLmxlbmd0aCk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRlbWJlZFNyYyA9IHRoaXMuaWQuY2FsbCggdGhpcywgZW1iZWRTcmMgKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZW1iZWRTcmMgPSB0aGlzLnNyYy5yZXBsYWNlKCclaWQlJywgZW1iZWRTcmMgKTtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7IC8vIGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0dmFyIGRhdGFPYmogPSB7fTtcblx0XHRcdGlmKGlmcmFtZVN0LnNyY0FjdGlvbikge1xuXHRcdFx0XHRkYXRhT2JqW2lmcmFtZVN0LnNyY0FjdGlvbl0gPSBlbWJlZFNyYztcblx0XHRcdH1cblx0XHRcdG1mcC5fcGFyc2VNYXJrdXAodGVtcGxhdGUsIGRhdGFPYmosIGl0ZW0pO1xuXG5cdFx0XHRtZnAudXBkYXRlU3RhdHVzKCdyZWFkeScpO1xuXG5cdFx0XHRyZXR1cm4gdGVtcGxhdGU7XG5cdFx0fVxuXHR9XG59KTtcblxuXG5cbi8qPj5pZnJhbWUqL1xuXG5cblxuXG4gX2NoZWNrSW5zdGFuY2UoKTsgfSkpO1xuIiwiLyohIFNlbGVjdDIgNC4xLjAtcmMuMCB8IGh0dHBzOi8vZ2l0aHViLmNvbS9zZWxlY3QyL3NlbGVjdDIvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZCAqL1xuIWZ1bmN0aW9uKG4pe1wiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoW1wianF1ZXJ5XCJdLG4pOlwib2JqZWN0XCI9PXR5cGVvZiBtb2R1bGUmJm1vZHVsZS5leHBvcnRzP21vZHVsZS5leHBvcnRzPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIHZvaWQgMD09PXQmJih0PVwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/cmVxdWlyZShcImpxdWVyeVwiKTpyZXF1aXJlKFwianF1ZXJ5XCIpKGUpKSxuKHQpLHR9Om4oalF1ZXJ5KX0oZnVuY3Rpb24odCl7dmFyIGUsbixzLHAscixvLGgsZixnLG0seSx2LGksYSxfLHM9KCh1PXQmJnQuZm4mJnQuZm4uc2VsZWN0MiYmdC5mbi5zZWxlY3QyLmFtZD90LmZuLnNlbGVjdDIuYW1kOnUpJiZ1LnJlcXVpcmVqc3x8KHU/bj11OnU9e30sZz17fSxtPXt9LHk9e30sdj17fSxpPU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHksYT1bXS5zbGljZSxfPS9cXC5qcyQvLGg9ZnVuY3Rpb24oZSx0KXt2YXIgbixzLGk9YyhlKSxyPWlbMF0sdD10WzFdO3JldHVybiBlPWlbMV0sciYmKG49eChyPWwocix0KSkpLHI/ZT1uJiZuLm5vcm1hbGl6ZT9uLm5vcm1hbGl6ZShlLChzPXQsZnVuY3Rpb24oZSl7cmV0dXJuIGwoZSxzKX0pKTpsKGUsdCk6KHI9KGk9YyhlPWwoZSx0KSkpWzBdLGU9aVsxXSxyJiYobj14KHIpKSkse2Y6cj9yK1wiIVwiK2U6ZSxuOmUscHI6cixwOm59fSxmPXtyZXF1aXJlOmZ1bmN0aW9uKGUpe3JldHVybiB3KGUpfSxleHBvcnRzOmZ1bmN0aW9uKGUpe3ZhciB0PWdbZV07cmV0dXJuIHZvaWQgMCE9PXQ/dDpnW2VdPXt9fSxtb2R1bGU6ZnVuY3Rpb24oZSl7cmV0dXJue2lkOmUsdXJpOlwiXCIsZXhwb3J0czpnW2VdLGNvbmZpZzoodD1lLGZ1bmN0aW9uKCl7cmV0dXJuIHkmJnkuY29uZmlnJiZ5LmNvbmZpZ1t0XXx8e319KX07dmFyIHR9fSxyPWZ1bmN0aW9uKGUsdCxuLHMpe3ZhciBpLHIsbyxhLGwsYz1bXSx1PXR5cGVvZiBuLGQ9QShzPXN8fGUpO2lmKFwidW5kZWZpbmVkXCI9PXV8fFwiZnVuY3Rpb25cIj09dSl7Zm9yKHQ9IXQubGVuZ3RoJiZuLmxlbmd0aD9bXCJyZXF1aXJlXCIsXCJleHBvcnRzXCIsXCJtb2R1bGVcIl06dCxhPTA7YTx0Lmxlbmd0aDthKz0xKWlmKFwicmVxdWlyZVwiPT09KHI9KG89aCh0W2FdLGQpKS5mKSljW2FdPWYucmVxdWlyZShlKTtlbHNlIGlmKFwiZXhwb3J0c1wiPT09ciljW2FdPWYuZXhwb3J0cyhlKSxsPSEwO2Vsc2UgaWYoXCJtb2R1bGVcIj09PXIpaT1jW2FdPWYubW9kdWxlKGUpO2Vsc2UgaWYoYihnLHIpfHxiKG0scil8fGIodixyKSljW2FdPXgocik7ZWxzZXtpZighby5wKXRocm93IG5ldyBFcnJvcihlK1wiIG1pc3NpbmcgXCIrcik7by5wLmxvYWQoby5uLHcocywhMCksZnVuY3Rpb24odCl7cmV0dXJuIGZ1bmN0aW9uKGUpe2dbdF09ZX19KHIpLHt9KSxjW2FdPWdbcl19dT1uP24uYXBwbHkoZ1tlXSxjKTp2b2lkIDAsZSYmKGkmJmkuZXhwb3J0cyE9PXAmJmkuZXhwb3J0cyE9PWdbZV0/Z1tlXT1pLmV4cG9ydHM6dT09PXAmJmx8fChnW2VdPXUpKX1lbHNlIGUmJihnW2VdPW4pfSxlPW49bz1mdW5jdGlvbihlLHQsbixzLGkpe2lmKFwic3RyaW5nXCI9PXR5cGVvZiBlKXJldHVybiBmW2VdP2ZbZV0odCk6eChoKGUsQSh0KSkuZik7aWYoIWUuc3BsaWNlKXtpZigoeT1lKS5kZXBzJiZvKHkuZGVwcyx5LmNhbGxiYWNrKSwhdClyZXR1cm47dC5zcGxpY2U/KGU9dCx0PW4sbj1udWxsKTplPXB9cmV0dXJuIHQ9dHx8ZnVuY3Rpb24oKXt9LFwiZnVuY3Rpb25cIj09dHlwZW9mIG4mJihuPXMscz1pKSxzP3IocCxlLHQsbik6c2V0VGltZW91dChmdW5jdGlvbigpe3IocCxlLHQsbil9LDQpLG99LG8uY29uZmlnPWZ1bmN0aW9uKGUpe3JldHVybiBvKGUpfSxlLl9kZWZpbmVkPWcsKHM9ZnVuY3Rpb24oZSx0LG4pe2lmKFwic3RyaW5nXCIhPXR5cGVvZiBlKXRocm93IG5ldyBFcnJvcihcIlNlZSBhbG1vbmQgUkVBRE1FOiBpbmNvcnJlY3QgbW9kdWxlIGJ1aWxkLCBubyBtb2R1bGUgbmFtZVwiKTt0LnNwbGljZXx8KG49dCx0PVtdKSxiKGcsZSl8fGIobSxlKXx8KG1bZV09W2UsdCxuXSl9KS5hbWQ9e2pRdWVyeTohMH0sdS5yZXF1aXJlanM9ZSx1LnJlcXVpcmU9bix1LmRlZmluZT1zKSx1LmRlZmluZShcImFsbW9uZFwiLGZ1bmN0aW9uKCl7fSksdS5kZWZpbmUoXCJqcXVlcnlcIixbXSxmdW5jdGlvbigpe3ZhciBlPXR8fCQ7cmV0dXJuIG51bGw9PWUmJmNvbnNvbGUmJmNvbnNvbGUuZXJyb3ImJmNvbnNvbGUuZXJyb3IoXCJTZWxlY3QyOiBBbiBpbnN0YW5jZSBvZiBqUXVlcnkgb3IgYSBqUXVlcnktY29tcGF0aWJsZSBsaWJyYXJ5IHdhcyBub3QgZm91bmQuIE1ha2Ugc3VyZSB0aGF0IHlvdSBhcmUgaW5jbHVkaW5nIGpRdWVyeSBiZWZvcmUgU2VsZWN0MiBvbiB5b3VyIHdlYiBwYWdlLlwiKSxlfSksdS5kZWZpbmUoXCJzZWxlY3QyL3V0aWxzXCIsW1wianF1ZXJ5XCJdLGZ1bmN0aW9uKHIpe3ZhciBzPXt9O2Z1bmN0aW9uIGMoZSl7dmFyIHQsbj1lLnByb3RvdHlwZSxzPVtdO2Zvcih0IGluIG4pXCJmdW5jdGlvblwiPT10eXBlb2Ygblt0XSYmXCJjb25zdHJ1Y3RvclwiIT09dCYmcy5wdXNoKHQpO3JldHVybiBzfXMuRXh0ZW5kPWZ1bmN0aW9uKGUsdCl7dmFyIG4scz17fS5oYXNPd25Qcm9wZXJ0eTtmdW5jdGlvbiBpKCl7dGhpcy5jb25zdHJ1Y3Rvcj1lfWZvcihuIGluIHQpcy5jYWxsKHQsbikmJihlW25dPXRbbl0pO3JldHVybiBpLnByb3RvdHlwZT10LnByb3RvdHlwZSxlLnByb3RvdHlwZT1uZXcgaSxlLl9fc3VwZXJfXz10LnByb3RvdHlwZSxlfSxzLkRlY29yYXRlPWZ1bmN0aW9uKHMsaSl7dmFyIGU9YyhpKSx0PWMocyk7ZnVuY3Rpb24gcigpe3ZhciBlPUFycmF5LnByb3RvdHlwZS51bnNoaWZ0LHQ9aS5wcm90b3R5cGUuY29uc3RydWN0b3IubGVuZ3RoLG49cy5wcm90b3R5cGUuY29uc3RydWN0b3I7MDx0JiYoZS5jYWxsKGFyZ3VtZW50cyxzLnByb3RvdHlwZS5jb25zdHJ1Y3Rvciksbj1pLnByb3RvdHlwZS5jb25zdHJ1Y3Rvciksbi5hcHBseSh0aGlzLGFyZ3VtZW50cyl9aS5kaXNwbGF5TmFtZT1zLmRpc3BsYXlOYW1lLHIucHJvdG90eXBlPW5ldyBmdW5jdGlvbigpe3RoaXMuY29uc3RydWN0b3I9cn07Zm9yKHZhciBuPTA7bjx0Lmxlbmd0aDtuKyspe3ZhciBvPXRbbl07ci5wcm90b3R5cGVbb109cy5wcm90b3R5cGVbb119Zm9yKHZhciBhPTA7YTxlLmxlbmd0aDthKyspe3ZhciBsPWVbYV07ci5wcm90b3R5cGVbbF09ZnVuY3Rpb24oZSl7dmFyIHQ9ZnVuY3Rpb24oKXt9O2UgaW4gci5wcm90b3R5cGUmJih0PXIucHJvdG90eXBlW2VdKTt2YXIgbj1pLnByb3RvdHlwZVtlXTtyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gQXJyYXkucHJvdG90eXBlLnVuc2hpZnQuY2FsbChhcmd1bWVudHMsdCksbi5hcHBseSh0aGlzLGFyZ3VtZW50cyl9fShsKX1yZXR1cm4gcn07ZnVuY3Rpb24gZSgpe3RoaXMubGlzdGVuZXJzPXt9fWUucHJvdG90eXBlLm9uPWZ1bmN0aW9uKGUsdCl7dGhpcy5saXN0ZW5lcnM9dGhpcy5saXN0ZW5lcnN8fHt9LGUgaW4gdGhpcy5saXN0ZW5lcnM/dGhpcy5saXN0ZW5lcnNbZV0ucHVzaCh0KTp0aGlzLmxpc3RlbmVyc1tlXT1bdF19LGUucHJvdG90eXBlLnRyaWdnZXI9ZnVuY3Rpb24oZSl7dmFyIHQ9QXJyYXkucHJvdG90eXBlLnNsaWNlLG49dC5jYWxsKGFyZ3VtZW50cywxKTt0aGlzLmxpc3RlbmVycz10aGlzLmxpc3RlbmVyc3x8e30sMD09PShuPW51bGw9PW4/W106bikubGVuZ3RoJiZuLnB1c2goe30pLChuWzBdLl90eXBlPWUpaW4gdGhpcy5saXN0ZW5lcnMmJnRoaXMuaW52b2tlKHRoaXMubGlzdGVuZXJzW2VdLHQuY2FsbChhcmd1bWVudHMsMSkpLFwiKlwiaW4gdGhpcy5saXN0ZW5lcnMmJnRoaXMuaW52b2tlKHRoaXMubGlzdGVuZXJzW1wiKlwiXSxhcmd1bWVudHMpfSxlLnByb3RvdHlwZS5pbnZva2U9ZnVuY3Rpb24oZSx0KXtmb3IodmFyIG49MCxzPWUubGVuZ3RoO248cztuKyspZVtuXS5hcHBseSh0aGlzLHQpfSxzLk9ic2VydmFibGU9ZSxzLmdlbmVyYXRlQ2hhcnM9ZnVuY3Rpb24oZSl7Zm9yKHZhciB0PVwiXCIsbj0wO248ZTtuKyspdCs9TWF0aC5mbG9vcigzNipNYXRoLnJhbmRvbSgpKS50b1N0cmluZygzNik7cmV0dXJuIHR9LHMuYmluZD1mdW5jdGlvbihlLHQpe3JldHVybiBmdW5jdGlvbigpe2UuYXBwbHkodCxhcmd1bWVudHMpfX0scy5fY29udmVydERhdGE9ZnVuY3Rpb24oZSl7Zm9yKHZhciB0IGluIGUpe3ZhciBuPXQuc3BsaXQoXCItXCIpLHM9ZTtpZigxIT09bi5sZW5ndGgpe2Zvcih2YXIgaT0wO2k8bi5sZW5ndGg7aSsrKXt2YXIgcj1uW2ldOyhyPXIuc3Vic3RyaW5nKDAsMSkudG9Mb3dlckNhc2UoKStyLnN1YnN0cmluZygxKSlpbiBzfHwoc1tyXT17fSksaT09bi5sZW5ndGgtMSYmKHNbcl09ZVt0XSkscz1zW3JdfWRlbGV0ZSBlW3RdfX1yZXR1cm4gZX0scy5oYXNTY3JvbGw9ZnVuY3Rpb24oZSx0KXt2YXIgbj1yKHQpLHM9dC5zdHlsZS5vdmVyZmxvd1gsaT10LnN0eWxlLm92ZXJmbG93WTtyZXR1cm4ocyE9PWl8fFwiaGlkZGVuXCIhPT1pJiZcInZpc2libGVcIiE9PWkpJiYoXCJzY3JvbGxcIj09PXN8fFwic2Nyb2xsXCI9PT1pfHwobi5pbm5lckhlaWdodCgpPHQuc2Nyb2xsSGVpZ2h0fHxuLmlubmVyV2lkdGgoKTx0LnNjcm9sbFdpZHRoKSl9LHMuZXNjYXBlTWFya3VwPWZ1bmN0aW9uKGUpe3ZhciB0PXtcIlxcXFxcIjpcIiYjOTI7XCIsXCImXCI6XCImYW1wO1wiLFwiPFwiOlwiJmx0O1wiLFwiPlwiOlwiJmd0O1wiLCdcIic6XCImcXVvdDtcIixcIidcIjpcIiYjMzk7XCIsXCIvXCI6XCImIzQ3O1wifTtyZXR1cm5cInN0cmluZ1wiIT10eXBlb2YgZT9lOlN0cmluZyhlKS5yZXBsYWNlKC9bJjw+XCInXFwvXFxcXF0vZyxmdW5jdGlvbihlKXtyZXR1cm4gdFtlXX0pfSxzLl9fY2FjaGU9e307dmFyIG49MDtyZXR1cm4gcy5HZXRVbmlxdWVFbGVtZW50SWQ9ZnVuY3Rpb24oZSl7dmFyIHQ9ZS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXNlbGVjdDItaWRcIik7cmV0dXJuIG51bGwhPXR8fCh0PWUuaWQ/XCJzZWxlY3QyLWRhdGEtXCIrZS5pZDpcInNlbGVjdDItZGF0YS1cIisoKytuKS50b1N0cmluZygpK1wiLVwiK3MuZ2VuZXJhdGVDaGFycyg0KSxlLnNldEF0dHJpYnV0ZShcImRhdGEtc2VsZWN0Mi1pZFwiLHQpKSx0fSxzLlN0b3JlRGF0YT1mdW5jdGlvbihlLHQsbil7ZT1zLkdldFVuaXF1ZUVsZW1lbnRJZChlKTtzLl9fY2FjaGVbZV18fChzLl9fY2FjaGVbZV09e30pLHMuX19jYWNoZVtlXVt0XT1ufSxzLkdldERhdGE9ZnVuY3Rpb24oZSx0KXt2YXIgbj1zLkdldFVuaXF1ZUVsZW1lbnRJZChlKTtyZXR1cm4gdD9zLl9fY2FjaGVbbl0mJm51bGwhPXMuX19jYWNoZVtuXVt0XT9zLl9fY2FjaGVbbl1bdF06cihlKS5kYXRhKHQpOnMuX19jYWNoZVtuXX0scy5SZW1vdmVEYXRhPWZ1bmN0aW9uKGUpe3ZhciB0PXMuR2V0VW5pcXVlRWxlbWVudElkKGUpO251bGwhPXMuX19jYWNoZVt0XSYmZGVsZXRlIHMuX19jYWNoZVt0XSxlLnJlbW92ZUF0dHJpYnV0ZShcImRhdGEtc2VsZWN0Mi1pZFwiKX0scy5jb3B5Tm9uSW50ZXJuYWxDc3NDbGFzc2VzPWZ1bmN0aW9uKGUsdCl7dmFyIG49KG49ZS5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKS50cmltKCkuc3BsaXQoL1xccysvKSkuZmlsdGVyKGZ1bmN0aW9uKGUpe3JldHVybiAwPT09ZS5pbmRleE9mKFwic2VsZWN0Mi1cIil9KSx0PSh0PXQuZ2V0QXR0cmlidXRlKFwiY2xhc3NcIikudHJpbSgpLnNwbGl0KC9cXHMrLykpLmZpbHRlcihmdW5jdGlvbihlKXtyZXR1cm4gMCE9PWUuaW5kZXhPZihcInNlbGVjdDItXCIpfSksdD1uLmNvbmNhdCh0KTtlLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsdC5qb2luKFwiIFwiKSl9LHN9KSx1LmRlZmluZShcInNlbGVjdDIvcmVzdWx0c1wiLFtcImpxdWVyeVwiLFwiLi91dGlsc1wiXSxmdW5jdGlvbihkLHApe2Z1bmN0aW9uIHMoZSx0LG4pe3RoaXMuJGVsZW1lbnQ9ZSx0aGlzLmRhdGE9bix0aGlzLm9wdGlvbnM9dCxzLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMpfXJldHVybiBwLkV4dGVuZChzLHAuT2JzZXJ2YWJsZSkscy5wcm90b3R5cGUucmVuZGVyPWZ1bmN0aW9uKCl7dmFyIGU9ZCgnPHVsIGNsYXNzPVwic2VsZWN0Mi1yZXN1bHRzX19vcHRpb25zXCIgcm9sZT1cImxpc3Rib3hcIj48L3VsPicpO3JldHVybiB0aGlzLm9wdGlvbnMuZ2V0KFwibXVsdGlwbGVcIikmJmUuYXR0cihcImFyaWEtbXVsdGlzZWxlY3RhYmxlXCIsXCJ0cnVlXCIpLHRoaXMuJHJlc3VsdHM9ZX0scy5wcm90b3R5cGUuY2xlYXI9ZnVuY3Rpb24oKXt0aGlzLiRyZXN1bHRzLmVtcHR5KCl9LHMucHJvdG90eXBlLmRpc3BsYXlNZXNzYWdlPWZ1bmN0aW9uKGUpe3ZhciB0PXRoaXMub3B0aW9ucy5nZXQoXCJlc2NhcGVNYXJrdXBcIik7dGhpcy5jbGVhcigpLHRoaXMuaGlkZUxvYWRpbmcoKTt2YXIgbj1kKCc8bGkgcm9sZT1cImFsZXJ0XCIgYXJpYS1saXZlPVwiYXNzZXJ0aXZlXCIgY2xhc3M9XCJzZWxlY3QyLXJlc3VsdHNfX29wdGlvblwiPjwvbGk+Jykscz10aGlzLm9wdGlvbnMuZ2V0KFwidHJhbnNsYXRpb25zXCIpLmdldChlLm1lc3NhZ2UpO24uYXBwZW5kKHQocyhlLmFyZ3MpKSksblswXS5jbGFzc05hbWUrPVwiIHNlbGVjdDItcmVzdWx0c19fbWVzc2FnZVwiLHRoaXMuJHJlc3VsdHMuYXBwZW5kKG4pfSxzLnByb3RvdHlwZS5oaWRlTWVzc2FnZXM9ZnVuY3Rpb24oKXt0aGlzLiRyZXN1bHRzLmZpbmQoXCIuc2VsZWN0Mi1yZXN1bHRzX19tZXNzYWdlXCIpLnJlbW92ZSgpfSxzLnByb3RvdHlwZS5hcHBlbmQ9ZnVuY3Rpb24oZSl7dGhpcy5oaWRlTG9hZGluZygpO3ZhciB0PVtdO2lmKG51bGwhPWUucmVzdWx0cyYmMCE9PWUucmVzdWx0cy5sZW5ndGgpe2UucmVzdWx0cz10aGlzLnNvcnQoZS5yZXN1bHRzKTtmb3IodmFyIG49MDtuPGUucmVzdWx0cy5sZW5ndGg7bisrKXt2YXIgcz1lLnJlc3VsdHNbbl0scz10aGlzLm9wdGlvbihzKTt0LnB1c2gocyl9dGhpcy4kcmVzdWx0cy5hcHBlbmQodCl9ZWxzZSAwPT09dGhpcy4kcmVzdWx0cy5jaGlsZHJlbigpLmxlbmd0aCYmdGhpcy50cmlnZ2VyKFwicmVzdWx0czptZXNzYWdlXCIse21lc3NhZ2U6XCJub1Jlc3VsdHNcIn0pfSxzLnByb3RvdHlwZS5wb3NpdGlvbj1mdW5jdGlvbihlLHQpe3QuZmluZChcIi5zZWxlY3QyLXJlc3VsdHNcIikuYXBwZW5kKGUpfSxzLnByb3RvdHlwZS5zb3J0PWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLm9wdGlvbnMuZ2V0KFwic29ydGVyXCIpKGUpfSxzLnByb3RvdHlwZS5oaWdobGlnaHRGaXJzdEl0ZW09ZnVuY3Rpb24oKXt2YXIgZT10aGlzLiRyZXN1bHRzLmZpbmQoXCIuc2VsZWN0Mi1yZXN1bHRzX19vcHRpb24tLXNlbGVjdGFibGVcIiksdD1lLmZpbHRlcihcIi5zZWxlY3QyLXJlc3VsdHNfX29wdGlvbi0tc2VsZWN0ZWRcIik7KDA8dC5sZW5ndGg/dDplKS5maXJzdCgpLnRyaWdnZXIoXCJtb3VzZWVudGVyXCIpLHRoaXMuZW5zdXJlSGlnaGxpZ2h0VmlzaWJsZSgpfSxzLnByb3RvdHlwZS5zZXRDbGFzc2VzPWZ1bmN0aW9uKCl7dmFyIHQ9dGhpczt0aGlzLmRhdGEuY3VycmVudChmdW5jdGlvbihlKXt2YXIgcz1lLm1hcChmdW5jdGlvbihlKXtyZXR1cm4gZS5pZC50b1N0cmluZygpfSk7dC4kcmVzdWx0cy5maW5kKFwiLnNlbGVjdDItcmVzdWx0c19fb3B0aW9uLS1zZWxlY3RhYmxlXCIpLmVhY2goZnVuY3Rpb24oKXt2YXIgZT1kKHRoaXMpLHQ9cC5HZXREYXRhKHRoaXMsXCJkYXRhXCIpLG49XCJcIit0LmlkO251bGwhPXQuZWxlbWVudCYmdC5lbGVtZW50LnNlbGVjdGVkfHxudWxsPT10LmVsZW1lbnQmJi0xPHMuaW5kZXhPZihuKT8odGhpcy5jbGFzc0xpc3QuYWRkKFwic2VsZWN0Mi1yZXN1bHRzX19vcHRpb24tLXNlbGVjdGVkXCIpLGUuYXR0cihcImFyaWEtc2VsZWN0ZWRcIixcInRydWVcIikpOih0aGlzLmNsYXNzTGlzdC5yZW1vdmUoXCJzZWxlY3QyLXJlc3VsdHNfX29wdGlvbi0tc2VsZWN0ZWRcIiksZS5hdHRyKFwiYXJpYS1zZWxlY3RlZFwiLFwiZmFsc2VcIikpfSl9KX0scy5wcm90b3R5cGUuc2hvd0xvYWRpbmc9ZnVuY3Rpb24oZSl7dGhpcy5oaWRlTG9hZGluZygpO2U9e2Rpc2FibGVkOiEwLGxvYWRpbmc6ITAsdGV4dDp0aGlzLm9wdGlvbnMuZ2V0KFwidHJhbnNsYXRpb25zXCIpLmdldChcInNlYXJjaGluZ1wiKShlKX0sZT10aGlzLm9wdGlvbihlKTtlLmNsYXNzTmFtZSs9XCIgbG9hZGluZy1yZXN1bHRzXCIsdGhpcy4kcmVzdWx0cy5wcmVwZW5kKGUpfSxzLnByb3RvdHlwZS5oaWRlTG9hZGluZz1mdW5jdGlvbigpe3RoaXMuJHJlc3VsdHMuZmluZChcIi5sb2FkaW5nLXJlc3VsdHNcIikucmVtb3ZlKCl9LHMucHJvdG90eXBlLm9wdGlvbj1mdW5jdGlvbihlKXt2YXIgdD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7dC5jbGFzc0xpc3QuYWRkKFwic2VsZWN0Mi1yZXN1bHRzX19vcHRpb25cIiksdC5jbGFzc0xpc3QuYWRkKFwic2VsZWN0Mi1yZXN1bHRzX19vcHRpb24tLXNlbGVjdGFibGVcIik7dmFyIG4scz17cm9sZTpcIm9wdGlvblwifSxpPXdpbmRvdy5FbGVtZW50LnByb3RvdHlwZS5tYXRjaGVzfHx3aW5kb3cuRWxlbWVudC5wcm90b3R5cGUubXNNYXRjaGVzU2VsZWN0b3J8fHdpbmRvdy5FbGVtZW50LnByb3RvdHlwZS53ZWJraXRNYXRjaGVzU2VsZWN0b3I7Zm9yKG4gaW4obnVsbCE9ZS5lbGVtZW50JiZpLmNhbGwoZS5lbGVtZW50LFwiOmRpc2FibGVkXCIpfHxudWxsPT1lLmVsZW1lbnQmJmUuZGlzYWJsZWQpJiYoc1tcImFyaWEtZGlzYWJsZWRcIl09XCJ0cnVlXCIsdC5jbGFzc0xpc3QucmVtb3ZlKFwic2VsZWN0Mi1yZXN1bHRzX19vcHRpb24tLXNlbGVjdGFibGVcIiksdC5jbGFzc0xpc3QuYWRkKFwic2VsZWN0Mi1yZXN1bHRzX19vcHRpb24tLWRpc2FibGVkXCIpKSxudWxsPT1lLmlkJiZ0LmNsYXNzTGlzdC5yZW1vdmUoXCJzZWxlY3QyLXJlc3VsdHNfX29wdGlvbi0tc2VsZWN0YWJsZVwiKSxudWxsIT1lLl9yZXN1bHRJZCYmKHQuaWQ9ZS5fcmVzdWx0SWQpLGUudGl0bGUmJih0LnRpdGxlPWUudGl0bGUpLGUuY2hpbGRyZW4mJihzLnJvbGU9XCJncm91cFwiLHNbXCJhcmlhLWxhYmVsXCJdPWUudGV4dCx0LmNsYXNzTGlzdC5yZW1vdmUoXCJzZWxlY3QyLXJlc3VsdHNfX29wdGlvbi0tc2VsZWN0YWJsZVwiKSx0LmNsYXNzTGlzdC5hZGQoXCJzZWxlY3QyLXJlc3VsdHNfX29wdGlvbi0tZ3JvdXBcIikpLHMpe3ZhciByPXNbbl07dC5zZXRBdHRyaWJ1dGUobixyKX1pZihlLmNoaWxkcmVuKXt2YXIgbz1kKHQpLGE9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0cm9uZ1wiKTthLmNsYXNzTmFtZT1cInNlbGVjdDItcmVzdWx0c19fZ3JvdXBcIix0aGlzLnRlbXBsYXRlKGUsYSk7Zm9yKHZhciBsPVtdLGM9MDtjPGUuY2hpbGRyZW4ubGVuZ3RoO2MrKyl7dmFyIHU9ZS5jaGlsZHJlbltjXSx1PXRoaXMub3B0aW9uKHUpO2wucHVzaCh1KX1pPWQoXCI8dWw+PC91bD5cIix7Y2xhc3M6XCJzZWxlY3QyLXJlc3VsdHNfX29wdGlvbnMgc2VsZWN0Mi1yZXN1bHRzX19vcHRpb25zLS1uZXN0ZWRcIixyb2xlOlwibm9uZVwifSk7aS5hcHBlbmQobCksby5hcHBlbmQoYSksby5hcHBlbmQoaSl9ZWxzZSB0aGlzLnRlbXBsYXRlKGUsdCk7cmV0dXJuIHAuU3RvcmVEYXRhKHQsXCJkYXRhXCIsZSksdH0scy5wcm90b3R5cGUuYmluZD1mdW5jdGlvbih0LGUpe3ZhciBpPXRoaXMsbj10LmlkK1wiLXJlc3VsdHNcIjt0aGlzLiRyZXN1bHRzLmF0dHIoXCJpZFwiLG4pLHQub24oXCJyZXN1bHRzOmFsbFwiLGZ1bmN0aW9uKGUpe2kuY2xlYXIoKSxpLmFwcGVuZChlLmRhdGEpLHQuaXNPcGVuKCkmJihpLnNldENsYXNzZXMoKSxpLmhpZ2hsaWdodEZpcnN0SXRlbSgpKX0pLHQub24oXCJyZXN1bHRzOmFwcGVuZFwiLGZ1bmN0aW9uKGUpe2kuYXBwZW5kKGUuZGF0YSksdC5pc09wZW4oKSYmaS5zZXRDbGFzc2VzKCl9KSx0Lm9uKFwicXVlcnlcIixmdW5jdGlvbihlKXtpLmhpZGVNZXNzYWdlcygpLGkuc2hvd0xvYWRpbmcoZSl9KSx0Lm9uKFwic2VsZWN0XCIsZnVuY3Rpb24oKXt0LmlzT3BlbigpJiYoaS5zZXRDbGFzc2VzKCksaS5vcHRpb25zLmdldChcInNjcm9sbEFmdGVyU2VsZWN0XCIpJiZpLmhpZ2hsaWdodEZpcnN0SXRlbSgpKX0pLHQub24oXCJ1bnNlbGVjdFwiLGZ1bmN0aW9uKCl7dC5pc09wZW4oKSYmKGkuc2V0Q2xhc3NlcygpLGkub3B0aW9ucy5nZXQoXCJzY3JvbGxBZnRlclNlbGVjdFwiKSYmaS5oaWdobGlnaHRGaXJzdEl0ZW0oKSl9KSx0Lm9uKFwib3BlblwiLGZ1bmN0aW9uKCl7aS4kcmVzdWx0cy5hdHRyKFwiYXJpYS1leHBhbmRlZFwiLFwidHJ1ZVwiKSxpLiRyZXN1bHRzLmF0dHIoXCJhcmlhLWhpZGRlblwiLFwiZmFsc2VcIiksaS5zZXRDbGFzc2VzKCksaS5lbnN1cmVIaWdobGlnaHRWaXNpYmxlKCl9KSx0Lm9uKFwiY2xvc2VcIixmdW5jdGlvbigpe2kuJHJlc3VsdHMuYXR0cihcImFyaWEtZXhwYW5kZWRcIixcImZhbHNlXCIpLGkuJHJlc3VsdHMuYXR0cihcImFyaWEtaGlkZGVuXCIsXCJ0cnVlXCIpLGkuJHJlc3VsdHMucmVtb3ZlQXR0cihcImFyaWEtYWN0aXZlZGVzY2VuZGFudFwiKX0pLHQub24oXCJyZXN1bHRzOnRvZ2dsZVwiLGZ1bmN0aW9uKCl7dmFyIGU9aS5nZXRIaWdobGlnaHRlZFJlc3VsdHMoKTswIT09ZS5sZW5ndGgmJmUudHJpZ2dlcihcIm1vdXNldXBcIil9KSx0Lm9uKFwicmVzdWx0czpzZWxlY3RcIixmdW5jdGlvbigpe3ZhciBlLHQ9aS5nZXRIaWdobGlnaHRlZFJlc3VsdHMoKTswIT09dC5sZW5ndGgmJihlPXAuR2V0RGF0YSh0WzBdLFwiZGF0YVwiKSx0Lmhhc0NsYXNzKFwic2VsZWN0Mi1yZXN1bHRzX19vcHRpb24tLXNlbGVjdGVkXCIpP2kudHJpZ2dlcihcImNsb3NlXCIse30pOmkudHJpZ2dlcihcInNlbGVjdFwiLHtkYXRhOmV9KSl9KSx0Lm9uKFwicmVzdWx0czpwcmV2aW91c1wiLGZ1bmN0aW9uKCl7dmFyIGUsdD1pLmdldEhpZ2hsaWdodGVkUmVzdWx0cygpLG49aS4kcmVzdWx0cy5maW5kKFwiLnNlbGVjdDItcmVzdWx0c19fb3B0aW9uLS1zZWxlY3RhYmxlXCIpLHM9bi5pbmRleCh0KTtzPD0wfHwoZT1zLTEsMD09PXQubGVuZ3RoJiYoZT0wKSwocz1uLmVxKGUpKS50cmlnZ2VyKFwibW91c2VlbnRlclwiKSx0PWkuJHJlc3VsdHMub2Zmc2V0KCkudG9wLG49cy5vZmZzZXQoKS50b3Ascz1pLiRyZXN1bHRzLnNjcm9sbFRvcCgpKyhuLXQpLDA9PT1lP2kuJHJlc3VsdHMuc2Nyb2xsVG9wKDApOm4tdDwwJiZpLiRyZXN1bHRzLnNjcm9sbFRvcChzKSl9KSx0Lm9uKFwicmVzdWx0czpuZXh0XCIsZnVuY3Rpb24oKXt2YXIgZSx0PWkuZ2V0SGlnaGxpZ2h0ZWRSZXN1bHRzKCksbj1pLiRyZXN1bHRzLmZpbmQoXCIuc2VsZWN0Mi1yZXN1bHRzX19vcHRpb24tLXNlbGVjdGFibGVcIikscz1uLmluZGV4KHQpKzE7cz49bi5sZW5ndGh8fCgoZT1uLmVxKHMpKS50cmlnZ2VyKFwibW91c2VlbnRlclwiKSx0PWkuJHJlc3VsdHMub2Zmc2V0KCkudG9wK2kuJHJlc3VsdHMub3V0ZXJIZWlnaHQoITEpLG49ZS5vZmZzZXQoKS50b3ArZS5vdXRlckhlaWdodCghMSksZT1pLiRyZXN1bHRzLnNjcm9sbFRvcCgpK24tdCwwPT09cz9pLiRyZXN1bHRzLnNjcm9sbFRvcCgwKTp0PG4mJmkuJHJlc3VsdHMuc2Nyb2xsVG9wKGUpKX0pLHQub24oXCJyZXN1bHRzOmZvY3VzXCIsZnVuY3Rpb24oZSl7ZS5lbGVtZW50WzBdLmNsYXNzTGlzdC5hZGQoXCJzZWxlY3QyLXJlc3VsdHNfX29wdGlvbi0taGlnaGxpZ2h0ZWRcIiksZS5lbGVtZW50WzBdLnNldEF0dHJpYnV0ZShcImFyaWEtc2VsZWN0ZWRcIixcInRydWVcIil9KSx0Lm9uKFwicmVzdWx0czptZXNzYWdlXCIsZnVuY3Rpb24oZSl7aS5kaXNwbGF5TWVzc2FnZShlKX0pLGQuZm4ubW91c2V3aGVlbCYmdGhpcy4kcmVzdWx0cy5vbihcIm1vdXNld2hlZWxcIixmdW5jdGlvbihlKXt2YXIgdD1pLiRyZXN1bHRzLnNjcm9sbFRvcCgpLG49aS4kcmVzdWx0cy5nZXQoMCkuc2Nyb2xsSGVpZ2h0LXQrZS5kZWx0YVksdD0wPGUuZGVsdGFZJiZ0LWUuZGVsdGFZPD0wLG49ZS5kZWx0YVk8MCYmbjw9aS4kcmVzdWx0cy5oZWlnaHQoKTt0PyhpLiRyZXN1bHRzLnNjcm9sbFRvcCgwKSxlLnByZXZlbnREZWZhdWx0KCksZS5zdG9wUHJvcGFnYXRpb24oKSk6biYmKGkuJHJlc3VsdHMuc2Nyb2xsVG9wKGkuJHJlc3VsdHMuZ2V0KDApLnNjcm9sbEhlaWdodC1pLiRyZXN1bHRzLmhlaWdodCgpKSxlLnByZXZlbnREZWZhdWx0KCksZS5zdG9wUHJvcGFnYXRpb24oKSl9KSx0aGlzLiRyZXN1bHRzLm9uKFwibW91c2V1cFwiLFwiLnNlbGVjdDItcmVzdWx0c19fb3B0aW9uLS1zZWxlY3RhYmxlXCIsZnVuY3Rpb24oZSl7dmFyIHQ9ZCh0aGlzKSxuPXAuR2V0RGF0YSh0aGlzLFwiZGF0YVwiKTt0Lmhhc0NsYXNzKFwic2VsZWN0Mi1yZXN1bHRzX19vcHRpb24tLXNlbGVjdGVkXCIpP2kub3B0aW9ucy5nZXQoXCJtdWx0aXBsZVwiKT9pLnRyaWdnZXIoXCJ1bnNlbGVjdFwiLHtvcmlnaW5hbEV2ZW50OmUsZGF0YTpufSk6aS50cmlnZ2VyKFwiY2xvc2VcIix7fSk6aS50cmlnZ2VyKFwic2VsZWN0XCIse29yaWdpbmFsRXZlbnQ6ZSxkYXRhOm59KX0pLHRoaXMuJHJlc3VsdHMub24oXCJtb3VzZWVudGVyXCIsXCIuc2VsZWN0Mi1yZXN1bHRzX19vcHRpb24tLXNlbGVjdGFibGVcIixmdW5jdGlvbihlKXt2YXIgdD1wLkdldERhdGEodGhpcyxcImRhdGFcIik7aS5nZXRIaWdobGlnaHRlZFJlc3VsdHMoKS5yZW1vdmVDbGFzcyhcInNlbGVjdDItcmVzdWx0c19fb3B0aW9uLS1oaWdobGlnaHRlZFwiKS5hdHRyKFwiYXJpYS1zZWxlY3RlZFwiLFwiZmFsc2VcIiksaS50cmlnZ2VyKFwicmVzdWx0czpmb2N1c1wiLHtkYXRhOnQsZWxlbWVudDpkKHRoaXMpfSl9KX0scy5wcm90b3R5cGUuZ2V0SGlnaGxpZ2h0ZWRSZXN1bHRzPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuJHJlc3VsdHMuZmluZChcIi5zZWxlY3QyLXJlc3VsdHNfX29wdGlvbi0taGlnaGxpZ2h0ZWRcIil9LHMucHJvdG90eXBlLmRlc3Ryb3k9ZnVuY3Rpb24oKXt0aGlzLiRyZXN1bHRzLnJlbW92ZSgpfSxzLnByb3RvdHlwZS5lbnN1cmVIaWdobGlnaHRWaXNpYmxlPWZ1bmN0aW9uKCl7dmFyIGUsdCxuLHMsaT10aGlzLmdldEhpZ2hsaWdodGVkUmVzdWx0cygpOzAhPT1pLmxlbmd0aCYmKGU9dGhpcy4kcmVzdWx0cy5maW5kKFwiLnNlbGVjdDItcmVzdWx0c19fb3B0aW9uLS1zZWxlY3RhYmxlXCIpLmluZGV4KGkpLHM9dGhpcy4kcmVzdWx0cy5vZmZzZXQoKS50b3AsdD1pLm9mZnNldCgpLnRvcCxuPXRoaXMuJHJlc3VsdHMuc2Nyb2xsVG9wKCkrKHQtcykscz10LXMsbi09MippLm91dGVySGVpZ2h0KCExKSxlPD0yP3RoaXMuJHJlc3VsdHMuc2Nyb2xsVG9wKDApOihzPnRoaXMuJHJlc3VsdHMub3V0ZXJIZWlnaHQoKXx8czwwKSYmdGhpcy4kcmVzdWx0cy5zY3JvbGxUb3AobikpfSxzLnByb3RvdHlwZS50ZW1wbGF0ZT1mdW5jdGlvbihlLHQpe3ZhciBuPXRoaXMub3B0aW9ucy5nZXQoXCJ0ZW1wbGF0ZVJlc3VsdFwiKSxzPXRoaXMub3B0aW9ucy5nZXQoXCJlc2NhcGVNYXJrdXBcIiksZT1uKGUsdCk7bnVsbD09ZT90LnN0eWxlLmRpc3BsYXk9XCJub25lXCI6XCJzdHJpbmdcIj09dHlwZW9mIGU/dC5pbm5lckhUTUw9cyhlKTpkKHQpLmFwcGVuZChlKX0sc30pLHUuZGVmaW5lKFwic2VsZWN0Mi9rZXlzXCIsW10sZnVuY3Rpb24oKXtyZXR1cm57QkFDS1NQQUNFOjgsVEFCOjksRU5URVI6MTMsU0hJRlQ6MTYsQ1RSTDoxNyxBTFQ6MTgsRVNDOjI3LFNQQUNFOjMyLFBBR0VfVVA6MzMsUEFHRV9ET1dOOjM0LEVORDozNSxIT01FOjM2LExFRlQ6MzcsVVA6MzgsUklHSFQ6MzksRE9XTjo0MCxERUxFVEU6NDZ9fSksdS5kZWZpbmUoXCJzZWxlY3QyL3NlbGVjdGlvbi9iYXNlXCIsW1wianF1ZXJ5XCIsXCIuLi91dGlsc1wiLFwiLi4va2V5c1wiXSxmdW5jdGlvbihuLHMsaSl7ZnVuY3Rpb24gcihlLHQpe3RoaXMuJGVsZW1lbnQ9ZSx0aGlzLm9wdGlvbnM9dCxyLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMpfXJldHVybiBzLkV4dGVuZChyLHMuT2JzZXJ2YWJsZSksci5wcm90b3R5cGUucmVuZGVyPWZ1bmN0aW9uKCl7dmFyIGU9bignPHNwYW4gY2xhc3M9XCJzZWxlY3QyLXNlbGVjdGlvblwiIHJvbGU9XCJjb21ib2JveFwiICBhcmlhLWhhc3BvcHVwPVwidHJ1ZVwiIGFyaWEtZXhwYW5kZWQ9XCJmYWxzZVwiPjwvc3Bhbj4nKTtyZXR1cm4gdGhpcy5fdGFiaW5kZXg9MCxudWxsIT1zLkdldERhdGEodGhpcy4kZWxlbWVudFswXSxcIm9sZC10YWJpbmRleFwiKT90aGlzLl90YWJpbmRleD1zLkdldERhdGEodGhpcy4kZWxlbWVudFswXSxcIm9sZC10YWJpbmRleFwiKTpudWxsIT10aGlzLiRlbGVtZW50LmF0dHIoXCJ0YWJpbmRleFwiKSYmKHRoaXMuX3RhYmluZGV4PXRoaXMuJGVsZW1lbnQuYXR0cihcInRhYmluZGV4XCIpKSxlLmF0dHIoXCJ0aXRsZVwiLHRoaXMuJGVsZW1lbnQuYXR0cihcInRpdGxlXCIpKSxlLmF0dHIoXCJ0YWJpbmRleFwiLHRoaXMuX3RhYmluZGV4KSxlLmF0dHIoXCJhcmlhLWRpc2FibGVkXCIsXCJmYWxzZVwiKSx0aGlzLiRzZWxlY3Rpb249ZX0sci5wcm90b3R5cGUuYmluZD1mdW5jdGlvbihlLHQpe3ZhciBuPXRoaXMscz1lLmlkK1wiLXJlc3VsdHNcIjt0aGlzLmNvbnRhaW5lcj1lLHRoaXMuJHNlbGVjdGlvbi5vbihcImZvY3VzXCIsZnVuY3Rpb24oZSl7bi50cmlnZ2VyKFwiZm9jdXNcIixlKX0pLHRoaXMuJHNlbGVjdGlvbi5vbihcImJsdXJcIixmdW5jdGlvbihlKXtuLl9oYW5kbGVCbHVyKGUpfSksdGhpcy4kc2VsZWN0aW9uLm9uKFwia2V5ZG93blwiLGZ1bmN0aW9uKGUpe24udHJpZ2dlcihcImtleXByZXNzXCIsZSksZS53aGljaD09PWkuU1BBQ0UmJmUucHJldmVudERlZmF1bHQoKX0pLGUub24oXCJyZXN1bHRzOmZvY3VzXCIsZnVuY3Rpb24oZSl7bi4kc2VsZWN0aW9uLmF0dHIoXCJhcmlhLWFjdGl2ZWRlc2NlbmRhbnRcIixlLmRhdGEuX3Jlc3VsdElkKX0pLGUub24oXCJzZWxlY3Rpb246dXBkYXRlXCIsZnVuY3Rpb24oZSl7bi51cGRhdGUoZS5kYXRhKX0pLGUub24oXCJvcGVuXCIsZnVuY3Rpb24oKXtuLiRzZWxlY3Rpb24uYXR0cihcImFyaWEtZXhwYW5kZWRcIixcInRydWVcIiksbi4kc2VsZWN0aW9uLmF0dHIoXCJhcmlhLW93bnNcIixzKSxuLl9hdHRhY2hDbG9zZUhhbmRsZXIoZSl9KSxlLm9uKFwiY2xvc2VcIixmdW5jdGlvbigpe24uJHNlbGVjdGlvbi5hdHRyKFwiYXJpYS1leHBhbmRlZFwiLFwiZmFsc2VcIiksbi4kc2VsZWN0aW9uLnJlbW92ZUF0dHIoXCJhcmlhLWFjdGl2ZWRlc2NlbmRhbnRcIiksbi4kc2VsZWN0aW9uLnJlbW92ZUF0dHIoXCJhcmlhLW93bnNcIiksbi4kc2VsZWN0aW9uLnRyaWdnZXIoXCJmb2N1c1wiKSxuLl9kZXRhY2hDbG9zZUhhbmRsZXIoZSl9KSxlLm9uKFwiZW5hYmxlXCIsZnVuY3Rpb24oKXtuLiRzZWxlY3Rpb24uYXR0cihcInRhYmluZGV4XCIsbi5fdGFiaW5kZXgpLG4uJHNlbGVjdGlvbi5hdHRyKFwiYXJpYS1kaXNhYmxlZFwiLFwiZmFsc2VcIil9KSxlLm9uKFwiZGlzYWJsZVwiLGZ1bmN0aW9uKCl7bi4kc2VsZWN0aW9uLmF0dHIoXCJ0YWJpbmRleFwiLFwiLTFcIiksbi4kc2VsZWN0aW9uLmF0dHIoXCJhcmlhLWRpc2FibGVkXCIsXCJ0cnVlXCIpfSl9LHIucHJvdG90eXBlLl9oYW5kbGVCbHVyPWZ1bmN0aW9uKGUpe3ZhciB0PXRoaXM7d2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKXtkb2N1bWVudC5hY3RpdmVFbGVtZW50PT10LiRzZWxlY3Rpb25bMF18fG4uY29udGFpbnModC4kc2VsZWN0aW9uWzBdLGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpfHx0LnRyaWdnZXIoXCJibHVyXCIsZSl9LDEpfSxyLnByb3RvdHlwZS5fYXR0YWNoQ2xvc2VIYW5kbGVyPWZ1bmN0aW9uKGUpe24oZG9jdW1lbnQuYm9keSkub24oXCJtb3VzZWRvd24uc2VsZWN0Mi5cIitlLmlkLGZ1bmN0aW9uKGUpe3ZhciB0PW4oZS50YXJnZXQpLmNsb3Nlc3QoXCIuc2VsZWN0MlwiKTtuKFwiLnNlbGVjdDIuc2VsZWN0Mi1jb250YWluZXItLW9wZW5cIikuZWFjaChmdW5jdGlvbigpe3RoaXMhPXRbMF0mJnMuR2V0RGF0YSh0aGlzLFwiZWxlbWVudFwiKS5zZWxlY3QyKFwiY2xvc2VcIil9KX0pfSxyLnByb3RvdHlwZS5fZGV0YWNoQ2xvc2VIYW5kbGVyPWZ1bmN0aW9uKGUpe24oZG9jdW1lbnQuYm9keSkub2ZmKFwibW91c2Vkb3duLnNlbGVjdDIuXCIrZS5pZCl9LHIucHJvdG90eXBlLnBvc2l0aW9uPWZ1bmN0aW9uKGUsdCl7dC5maW5kKFwiLnNlbGVjdGlvblwiKS5hcHBlbmQoZSl9LHIucHJvdG90eXBlLmRlc3Ryb3k9ZnVuY3Rpb24oKXt0aGlzLl9kZXRhY2hDbG9zZUhhbmRsZXIodGhpcy5jb250YWluZXIpfSxyLnByb3RvdHlwZS51cGRhdGU9ZnVuY3Rpb24oZSl7dGhyb3cgbmV3IEVycm9yKFwiVGhlIGB1cGRhdGVgIG1ldGhvZCBtdXN0IGJlIGRlZmluZWQgaW4gY2hpbGQgY2xhc3Nlcy5cIil9LHIucHJvdG90eXBlLmlzRW5hYmxlZD1mdW5jdGlvbigpe3JldHVybiF0aGlzLmlzRGlzYWJsZWQoKX0sci5wcm90b3R5cGUuaXNEaXNhYmxlZD1mdW5jdGlvbigpe3JldHVybiB0aGlzLm9wdGlvbnMuZ2V0KFwiZGlzYWJsZWRcIil9LHJ9KSx1LmRlZmluZShcInNlbGVjdDIvc2VsZWN0aW9uL3NpbmdsZVwiLFtcImpxdWVyeVwiLFwiLi9iYXNlXCIsXCIuLi91dGlsc1wiLFwiLi4va2V5c1wiXSxmdW5jdGlvbihlLHQsbixzKXtmdW5jdGlvbiBpKCl7aS5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcyxhcmd1bWVudHMpfXJldHVybiBuLkV4dGVuZChpLHQpLGkucHJvdG90eXBlLnJlbmRlcj1mdW5jdGlvbigpe3ZhciBlPWkuX19zdXBlcl9fLnJlbmRlci5jYWxsKHRoaXMpO3JldHVybiBlWzBdLmNsYXNzTGlzdC5hZGQoXCJzZWxlY3QyLXNlbGVjdGlvbi0tc2luZ2xlXCIpLGUuaHRtbCgnPHNwYW4gY2xhc3M9XCJzZWxlY3QyLXNlbGVjdGlvbl9fcmVuZGVyZWRcIj48L3NwYW4+PHNwYW4gY2xhc3M9XCJzZWxlY3QyLXNlbGVjdGlvbl9fYXJyb3dcIiByb2xlPVwicHJlc2VudGF0aW9uXCI+PGIgcm9sZT1cInByZXNlbnRhdGlvblwiPjwvYj48L3NwYW4+JyksZX0saS5wcm90b3R5cGUuYmluZD1mdW5jdGlvbih0LGUpe3ZhciBuPXRoaXM7aS5fX3N1cGVyX18uYmluZC5hcHBseSh0aGlzLGFyZ3VtZW50cyk7dmFyIHM9dC5pZCtcIi1jb250YWluZXJcIjt0aGlzLiRzZWxlY3Rpb24uZmluZChcIi5zZWxlY3QyLXNlbGVjdGlvbl9fcmVuZGVyZWRcIikuYXR0cihcImlkXCIscykuYXR0cihcInJvbGVcIixcInRleHRib3hcIikuYXR0cihcImFyaWEtcmVhZG9ubHlcIixcInRydWVcIiksdGhpcy4kc2VsZWN0aW9uLmF0dHIoXCJhcmlhLWxhYmVsbGVkYnlcIixzKSx0aGlzLiRzZWxlY3Rpb24uYXR0cihcImFyaWEtY29udHJvbHNcIixzKSx0aGlzLiRzZWxlY3Rpb24ub24oXCJtb3VzZWRvd25cIixmdW5jdGlvbihlKXsxPT09ZS53aGljaCYmbi50cmlnZ2VyKFwidG9nZ2xlXCIse29yaWdpbmFsRXZlbnQ6ZX0pfSksdGhpcy4kc2VsZWN0aW9uLm9uKFwiZm9jdXNcIixmdW5jdGlvbihlKXt9KSx0aGlzLiRzZWxlY3Rpb24ub24oXCJibHVyXCIsZnVuY3Rpb24oZSl7fSksdC5vbihcImZvY3VzXCIsZnVuY3Rpb24oZSl7dC5pc09wZW4oKXx8bi4kc2VsZWN0aW9uLnRyaWdnZXIoXCJmb2N1c1wiKX0pfSxpLnByb3RvdHlwZS5jbGVhcj1mdW5jdGlvbigpe3ZhciBlPXRoaXMuJHNlbGVjdGlvbi5maW5kKFwiLnNlbGVjdDItc2VsZWN0aW9uX19yZW5kZXJlZFwiKTtlLmVtcHR5KCksZS5yZW1vdmVBdHRyKFwidGl0bGVcIil9LGkucHJvdG90eXBlLmRpc3BsYXk9ZnVuY3Rpb24oZSx0KXt2YXIgbj10aGlzLm9wdGlvbnMuZ2V0KFwidGVtcGxhdGVTZWxlY3Rpb25cIik7cmV0dXJuIHRoaXMub3B0aW9ucy5nZXQoXCJlc2NhcGVNYXJrdXBcIikobihlLHQpKX0saS5wcm90b3R5cGUuc2VsZWN0aW9uQ29udGFpbmVyPWZ1bmN0aW9uKCl7cmV0dXJuIGUoXCI8c3Bhbj48L3NwYW4+XCIpfSxpLnByb3RvdHlwZS51cGRhdGU9ZnVuY3Rpb24oZSl7dmFyIHQsbjswIT09ZS5sZW5ndGg/KG49ZVswXSx0PXRoaXMuJHNlbGVjdGlvbi5maW5kKFwiLnNlbGVjdDItc2VsZWN0aW9uX19yZW5kZXJlZFwiKSxlPXRoaXMuZGlzcGxheShuLHQpLHQuZW1wdHkoKS5hcHBlbmQoZSksKG49bi50aXRsZXx8bi50ZXh0KT90LmF0dHIoXCJ0aXRsZVwiLG4pOnQucmVtb3ZlQXR0cihcInRpdGxlXCIpKTp0aGlzLmNsZWFyKCl9LGl9KSx1LmRlZmluZShcInNlbGVjdDIvc2VsZWN0aW9uL211bHRpcGxlXCIsW1wianF1ZXJ5XCIsXCIuL2Jhc2VcIixcIi4uL3V0aWxzXCJdLGZ1bmN0aW9uKGksZSxjKXtmdW5jdGlvbiByKGUsdCl7ci5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcyxhcmd1bWVudHMpfXJldHVybiBjLkV4dGVuZChyLGUpLHIucHJvdG90eXBlLnJlbmRlcj1mdW5jdGlvbigpe3ZhciBlPXIuX19zdXBlcl9fLnJlbmRlci5jYWxsKHRoaXMpO3JldHVybiBlWzBdLmNsYXNzTGlzdC5hZGQoXCJzZWxlY3QyLXNlbGVjdGlvbi0tbXVsdGlwbGVcIiksZS5odG1sKCc8dWwgY2xhc3M9XCJzZWxlY3QyLXNlbGVjdGlvbl9fcmVuZGVyZWRcIj48L3VsPicpLGV9LHIucHJvdG90eXBlLmJpbmQ9ZnVuY3Rpb24oZSx0KXt2YXIgbj10aGlzO3IuX19zdXBlcl9fLmJpbmQuYXBwbHkodGhpcyxhcmd1bWVudHMpO3ZhciBzPWUuaWQrXCItY29udGFpbmVyXCI7dGhpcy4kc2VsZWN0aW9uLmZpbmQoXCIuc2VsZWN0Mi1zZWxlY3Rpb25fX3JlbmRlcmVkXCIpLmF0dHIoXCJpZFwiLHMpLHRoaXMuJHNlbGVjdGlvbi5vbihcImNsaWNrXCIsZnVuY3Rpb24oZSl7bi50cmlnZ2VyKFwidG9nZ2xlXCIse29yaWdpbmFsRXZlbnQ6ZX0pfSksdGhpcy4kc2VsZWN0aW9uLm9uKFwiY2xpY2tcIixcIi5zZWxlY3QyLXNlbGVjdGlvbl9fY2hvaWNlX19yZW1vdmVcIixmdW5jdGlvbihlKXt2YXIgdDtuLmlzRGlzYWJsZWQoKXx8KHQ9aSh0aGlzKS5wYXJlbnQoKSx0PWMuR2V0RGF0YSh0WzBdLFwiZGF0YVwiKSxuLnRyaWdnZXIoXCJ1bnNlbGVjdFwiLHtvcmlnaW5hbEV2ZW50OmUsZGF0YTp0fSkpfSksdGhpcy4kc2VsZWN0aW9uLm9uKFwia2V5ZG93blwiLFwiLnNlbGVjdDItc2VsZWN0aW9uX19jaG9pY2VfX3JlbW92ZVwiLGZ1bmN0aW9uKGUpe24uaXNEaXNhYmxlZCgpfHxlLnN0b3BQcm9wYWdhdGlvbigpfSl9LHIucHJvdG90eXBlLmNsZWFyPWZ1bmN0aW9uKCl7dmFyIGU9dGhpcy4kc2VsZWN0aW9uLmZpbmQoXCIuc2VsZWN0Mi1zZWxlY3Rpb25fX3JlbmRlcmVkXCIpO2UuZW1wdHkoKSxlLnJlbW92ZUF0dHIoXCJ0aXRsZVwiKX0sci5wcm90b3R5cGUuZGlzcGxheT1mdW5jdGlvbihlLHQpe3ZhciBuPXRoaXMub3B0aW9ucy5nZXQoXCJ0ZW1wbGF0ZVNlbGVjdGlvblwiKTtyZXR1cm4gdGhpcy5vcHRpb25zLmdldChcImVzY2FwZU1hcmt1cFwiKShuKGUsdCkpfSxyLnByb3RvdHlwZS5zZWxlY3Rpb25Db250YWluZXI9ZnVuY3Rpb24oKXtyZXR1cm4gaSgnPGxpIGNsYXNzPVwic2VsZWN0Mi1zZWxlY3Rpb25fX2Nob2ljZVwiPjxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwic2VsZWN0Mi1zZWxlY3Rpb25fX2Nob2ljZV9fcmVtb3ZlXCIgdGFiaW5kZXg9XCItMVwiPjxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiZ0aW1lczs8L3NwYW4+PC9idXR0b24+PHNwYW4gY2xhc3M9XCJzZWxlY3QyLXNlbGVjdGlvbl9fY2hvaWNlX19kaXNwbGF5XCI+PC9zcGFuPjwvbGk+Jyl9LHIucHJvdG90eXBlLnVwZGF0ZT1mdW5jdGlvbihlKXtpZih0aGlzLmNsZWFyKCksMCE9PWUubGVuZ3RoKXtmb3IodmFyIHQ9W10sbj10aGlzLiRzZWxlY3Rpb24uZmluZChcIi5zZWxlY3QyLXNlbGVjdGlvbl9fcmVuZGVyZWRcIikuYXR0cihcImlkXCIpK1wiLWNob2ljZS1cIixzPTA7czxlLmxlbmd0aDtzKyspe3ZhciBpPWVbc10scj10aGlzLnNlbGVjdGlvbkNvbnRhaW5lcigpLG89dGhpcy5kaXNwbGF5KGksciksYT1uK2MuZ2VuZXJhdGVDaGFycyg0KStcIi1cIjtpLmlkP2ErPWkuaWQ6YSs9Yy5nZW5lcmF0ZUNoYXJzKDQpLHIuZmluZChcIi5zZWxlY3QyLXNlbGVjdGlvbl9fY2hvaWNlX19kaXNwbGF5XCIpLmFwcGVuZChvKS5hdHRyKFwiaWRcIixhKTt2YXIgbD1pLnRpdGxlfHxpLnRleHQ7bCYmci5hdHRyKFwidGl0bGVcIixsKTtvPXRoaXMub3B0aW9ucy5nZXQoXCJ0cmFuc2xhdGlvbnNcIikuZ2V0KFwicmVtb3ZlSXRlbVwiKSxsPXIuZmluZChcIi5zZWxlY3QyLXNlbGVjdGlvbl9fY2hvaWNlX19yZW1vdmVcIik7bC5hdHRyKFwidGl0bGVcIixvKCkpLGwuYXR0cihcImFyaWEtbGFiZWxcIixvKCkpLGwuYXR0cihcImFyaWEtZGVzY3JpYmVkYnlcIixhKSxjLlN0b3JlRGF0YShyWzBdLFwiZGF0YVwiLGkpLHQucHVzaChyKX10aGlzLiRzZWxlY3Rpb24uZmluZChcIi5zZWxlY3QyLXNlbGVjdGlvbl9fcmVuZGVyZWRcIikuYXBwZW5kKHQpfX0scn0pLHUuZGVmaW5lKFwic2VsZWN0Mi9zZWxlY3Rpb24vcGxhY2Vob2xkZXJcIixbXSxmdW5jdGlvbigpe2Z1bmN0aW9uIGUoZSx0LG4pe3RoaXMucGxhY2Vob2xkZXI9dGhpcy5ub3JtYWxpemVQbGFjZWhvbGRlcihuLmdldChcInBsYWNlaG9sZGVyXCIpKSxlLmNhbGwodGhpcyx0LG4pfXJldHVybiBlLnByb3RvdHlwZS5ub3JtYWxpemVQbGFjZWhvbGRlcj1mdW5jdGlvbihlLHQpe3JldHVybiB0PVwic3RyaW5nXCI9PXR5cGVvZiB0P3tpZDpcIlwiLHRleHQ6dH06dH0sZS5wcm90b3R5cGUuY3JlYXRlUGxhY2Vob2xkZXI9ZnVuY3Rpb24oZSx0KXt2YXIgbj10aGlzLnNlbGVjdGlvbkNvbnRhaW5lcigpO24uaHRtbCh0aGlzLmRpc3BsYXkodCkpLG5bMF0uY2xhc3NMaXN0LmFkZChcInNlbGVjdDItc2VsZWN0aW9uX19wbGFjZWhvbGRlclwiKSxuWzBdLmNsYXNzTGlzdC5yZW1vdmUoXCJzZWxlY3QyLXNlbGVjdGlvbl9fY2hvaWNlXCIpO3Q9dC50aXRsZXx8dC50ZXh0fHxuLnRleHQoKTtyZXR1cm4gdGhpcy4kc2VsZWN0aW9uLmZpbmQoXCIuc2VsZWN0Mi1zZWxlY3Rpb25fX3JlbmRlcmVkXCIpLmF0dHIoXCJ0aXRsZVwiLHQpLG59LGUucHJvdG90eXBlLnVwZGF0ZT1mdW5jdGlvbihlLHQpe3ZhciBuPTE9PXQubGVuZ3RoJiZ0WzBdLmlkIT10aGlzLnBsYWNlaG9sZGVyLmlkO2lmKDE8dC5sZW5ndGh8fG4pcmV0dXJuIGUuY2FsbCh0aGlzLHQpO3RoaXMuY2xlYXIoKTt0PXRoaXMuY3JlYXRlUGxhY2Vob2xkZXIodGhpcy5wbGFjZWhvbGRlcik7dGhpcy4kc2VsZWN0aW9uLmZpbmQoXCIuc2VsZWN0Mi1zZWxlY3Rpb25fX3JlbmRlcmVkXCIpLmFwcGVuZCh0KX0sZX0pLHUuZGVmaW5lKFwic2VsZWN0Mi9zZWxlY3Rpb24vYWxsb3dDbGVhclwiLFtcImpxdWVyeVwiLFwiLi4va2V5c1wiLFwiLi4vdXRpbHNcIl0sZnVuY3Rpb24oaSxzLGEpe2Z1bmN0aW9uIGUoKXt9cmV0dXJuIGUucHJvdG90eXBlLmJpbmQ9ZnVuY3Rpb24oZSx0LG4pe3ZhciBzPXRoaXM7ZS5jYWxsKHRoaXMsdCxuKSxudWxsPT10aGlzLnBsYWNlaG9sZGVyJiZ0aGlzLm9wdGlvbnMuZ2V0KFwiZGVidWdcIikmJndpbmRvdy5jb25zb2xlJiZjb25zb2xlLmVycm9yJiZjb25zb2xlLmVycm9yKFwiU2VsZWN0MjogVGhlIGBhbGxvd0NsZWFyYCBvcHRpb24gc2hvdWxkIGJlIHVzZWQgaW4gY29tYmluYXRpb24gd2l0aCB0aGUgYHBsYWNlaG9sZGVyYCBvcHRpb24uXCIpLHRoaXMuJHNlbGVjdGlvbi5vbihcIm1vdXNlZG93blwiLFwiLnNlbGVjdDItc2VsZWN0aW9uX19jbGVhclwiLGZ1bmN0aW9uKGUpe3MuX2hhbmRsZUNsZWFyKGUpfSksdC5vbihcImtleXByZXNzXCIsZnVuY3Rpb24oZSl7cy5faGFuZGxlS2V5Ym9hcmRDbGVhcihlLHQpfSl9LGUucHJvdG90eXBlLl9oYW5kbGVDbGVhcj1mdW5jdGlvbihlLHQpe2lmKCF0aGlzLmlzRGlzYWJsZWQoKSl7dmFyIG49dGhpcy4kc2VsZWN0aW9uLmZpbmQoXCIuc2VsZWN0Mi1zZWxlY3Rpb25fX2NsZWFyXCIpO2lmKDAhPT1uLmxlbmd0aCl7dC5zdG9wUHJvcGFnYXRpb24oKTt2YXIgcz1hLkdldERhdGEoblswXSxcImRhdGFcIiksaT10aGlzLiRlbGVtZW50LnZhbCgpO3RoaXMuJGVsZW1lbnQudmFsKHRoaXMucGxhY2Vob2xkZXIuaWQpO3ZhciByPXtkYXRhOnN9O2lmKHRoaXMudHJpZ2dlcihcImNsZWFyXCIsciksci5wcmV2ZW50ZWQpdGhpcy4kZWxlbWVudC52YWwoaSk7ZWxzZXtmb3IodmFyIG89MDtvPHMubGVuZ3RoO28rKylpZihyPXtkYXRhOnNbb119LHRoaXMudHJpZ2dlcihcInVuc2VsZWN0XCIsciksci5wcmV2ZW50ZWQpcmV0dXJuIHZvaWQgdGhpcy4kZWxlbWVudC52YWwoaSk7dGhpcy4kZWxlbWVudC50cmlnZ2VyKFwiaW5wdXRcIikudHJpZ2dlcihcImNoYW5nZVwiKSx0aGlzLnRyaWdnZXIoXCJ0b2dnbGVcIix7fSl9fX19LGUucHJvdG90eXBlLl9oYW5kbGVLZXlib2FyZENsZWFyPWZ1bmN0aW9uKGUsdCxuKXtuLmlzT3BlbigpfHx0LndoaWNoIT1zLkRFTEVURSYmdC53aGljaCE9cy5CQUNLU1BBQ0V8fHRoaXMuX2hhbmRsZUNsZWFyKHQpfSxlLnByb3RvdHlwZS51cGRhdGU9ZnVuY3Rpb24oZSx0KXt2YXIgbixzO2UuY2FsbCh0aGlzLHQpLHRoaXMuJHNlbGVjdGlvbi5maW5kKFwiLnNlbGVjdDItc2VsZWN0aW9uX19jbGVhclwiKS5yZW1vdmUoKSx0aGlzLiRzZWxlY3Rpb25bMF0uY2xhc3NMaXN0LnJlbW92ZShcInNlbGVjdDItc2VsZWN0aW9uLS1jbGVhcmFibGVcIiksMDx0aGlzLiRzZWxlY3Rpb24uZmluZChcIi5zZWxlY3QyLXNlbGVjdGlvbl9fcGxhY2Vob2xkZXJcIikubGVuZ3RofHwwPT09dC5sZW5ndGh8fChuPXRoaXMuJHNlbGVjdGlvbi5maW5kKFwiLnNlbGVjdDItc2VsZWN0aW9uX19yZW5kZXJlZFwiKS5hdHRyKFwiaWRcIikscz10aGlzLm9wdGlvbnMuZ2V0KFwidHJhbnNsYXRpb25zXCIpLmdldChcInJlbW92ZUFsbEl0ZW1zXCIpLChlPWkoJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwic2VsZWN0Mi1zZWxlY3Rpb25fX2NsZWFyXCIgdGFiaW5kZXg9XCItMVwiPjxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiZ0aW1lczs8L3NwYW4+PC9idXR0b24+JykpLmF0dHIoXCJ0aXRsZVwiLHMoKSksZS5hdHRyKFwiYXJpYS1sYWJlbFwiLHMoKSksZS5hdHRyKFwiYXJpYS1kZXNjcmliZWRieVwiLG4pLGEuU3RvcmVEYXRhKGVbMF0sXCJkYXRhXCIsdCksdGhpcy4kc2VsZWN0aW9uLnByZXBlbmQoZSksdGhpcy4kc2VsZWN0aW9uWzBdLmNsYXNzTGlzdC5hZGQoXCJzZWxlY3QyLXNlbGVjdGlvbi0tY2xlYXJhYmxlXCIpKX0sZX0pLHUuZGVmaW5lKFwic2VsZWN0Mi9zZWxlY3Rpb24vc2VhcmNoXCIsW1wianF1ZXJ5XCIsXCIuLi91dGlsc1wiLFwiLi4va2V5c1wiXSxmdW5jdGlvbihzLGEsbCl7ZnVuY3Rpb24gZShlLHQsbil7ZS5jYWxsKHRoaXMsdCxuKX1yZXR1cm4gZS5wcm90b3R5cGUucmVuZGVyPWZ1bmN0aW9uKGUpe3ZhciB0PXRoaXMub3B0aW9ucy5nZXQoXCJ0cmFuc2xhdGlvbnNcIikuZ2V0KFwic2VhcmNoXCIpLG49cygnPHNwYW4gY2xhc3M9XCJzZWxlY3QyLXNlYXJjaCBzZWxlY3QyLXNlYXJjaC0taW5saW5lXCI+PHRleHRhcmVhIGNsYXNzPVwic2VsZWN0Mi1zZWFyY2hfX2ZpZWxkXCIgdHlwZT1cInNlYXJjaFwiIHRhYmluZGV4PVwiLTFcIiBhdXRvY29ycmVjdD1cIm9mZlwiIGF1dG9jYXBpdGFsaXplPVwibm9uZVwiIHNwZWxsY2hlY2s9XCJmYWxzZVwiIHJvbGU9XCJzZWFyY2hib3hcIiBhcmlhLWF1dG9jb21wbGV0ZT1cImxpc3RcIiA+PC90ZXh0YXJlYT48L3NwYW4+Jyk7dGhpcy4kc2VhcmNoQ29udGFpbmVyPW4sdGhpcy4kc2VhcmNoPW4uZmluZChcInRleHRhcmVhXCIpLHRoaXMuJHNlYXJjaC5wcm9wKFwiYXV0b2NvbXBsZXRlXCIsdGhpcy5vcHRpb25zLmdldChcImF1dG9jb21wbGV0ZVwiKSksdGhpcy4kc2VhcmNoLmF0dHIoXCJhcmlhLWxhYmVsXCIsdCgpKTtlPWUuY2FsbCh0aGlzKTtyZXR1cm4gdGhpcy5fdHJhbnNmZXJUYWJJbmRleCgpLGUuYXBwZW5kKHRoaXMuJHNlYXJjaENvbnRhaW5lciksZX0sZS5wcm90b3R5cGUuYmluZD1mdW5jdGlvbihlLHQsbil7dmFyIHM9dGhpcyxpPXQuaWQrXCItcmVzdWx0c1wiLHI9dC5pZCtcIi1jb250YWluZXJcIjtlLmNhbGwodGhpcyx0LG4pLHMuJHNlYXJjaC5hdHRyKFwiYXJpYS1kZXNjcmliZWRieVwiLHIpLHQub24oXCJvcGVuXCIsZnVuY3Rpb24oKXtzLiRzZWFyY2guYXR0cihcImFyaWEtY29udHJvbHNcIixpKSxzLiRzZWFyY2gudHJpZ2dlcihcImZvY3VzXCIpfSksdC5vbihcImNsb3NlXCIsZnVuY3Rpb24oKXtzLiRzZWFyY2gudmFsKFwiXCIpLHMucmVzaXplU2VhcmNoKCkscy4kc2VhcmNoLnJlbW92ZUF0dHIoXCJhcmlhLWNvbnRyb2xzXCIpLHMuJHNlYXJjaC5yZW1vdmVBdHRyKFwiYXJpYS1hY3RpdmVkZXNjZW5kYW50XCIpLHMuJHNlYXJjaC50cmlnZ2VyKFwiZm9jdXNcIil9KSx0Lm9uKFwiZW5hYmxlXCIsZnVuY3Rpb24oKXtzLiRzZWFyY2gucHJvcChcImRpc2FibGVkXCIsITEpLHMuX3RyYW5zZmVyVGFiSW5kZXgoKX0pLHQub24oXCJkaXNhYmxlXCIsZnVuY3Rpb24oKXtzLiRzZWFyY2gucHJvcChcImRpc2FibGVkXCIsITApfSksdC5vbihcImZvY3VzXCIsZnVuY3Rpb24oZSl7cy4kc2VhcmNoLnRyaWdnZXIoXCJmb2N1c1wiKX0pLHQub24oXCJyZXN1bHRzOmZvY3VzXCIsZnVuY3Rpb24oZSl7ZS5kYXRhLl9yZXN1bHRJZD9zLiRzZWFyY2guYXR0cihcImFyaWEtYWN0aXZlZGVzY2VuZGFudFwiLGUuZGF0YS5fcmVzdWx0SWQpOnMuJHNlYXJjaC5yZW1vdmVBdHRyKFwiYXJpYS1hY3RpdmVkZXNjZW5kYW50XCIpfSksdGhpcy4kc2VsZWN0aW9uLm9uKFwiZm9jdXNpblwiLFwiLnNlbGVjdDItc2VhcmNoLS1pbmxpbmVcIixmdW5jdGlvbihlKXtzLnRyaWdnZXIoXCJmb2N1c1wiLGUpfSksdGhpcy4kc2VsZWN0aW9uLm9uKFwiZm9jdXNvdXRcIixcIi5zZWxlY3QyLXNlYXJjaC0taW5saW5lXCIsZnVuY3Rpb24oZSl7cy5faGFuZGxlQmx1cihlKX0pLHRoaXMuJHNlbGVjdGlvbi5vbihcImtleWRvd25cIixcIi5zZWxlY3QyLXNlYXJjaC0taW5saW5lXCIsZnVuY3Rpb24oZSl7dmFyIHQ7ZS5zdG9wUHJvcGFnYXRpb24oKSxzLnRyaWdnZXIoXCJrZXlwcmVzc1wiLGUpLHMuX2tleVVwUHJldmVudGVkPWUuaXNEZWZhdWx0UHJldmVudGVkKCksZS53aGljaCE9PWwuQkFDS1NQQUNFfHxcIlwiIT09cy4kc2VhcmNoLnZhbCgpfHwwPCh0PXMuJHNlbGVjdGlvbi5maW5kKFwiLnNlbGVjdDItc2VsZWN0aW9uX19jaG9pY2VcIikubGFzdCgpKS5sZW5ndGgmJih0PWEuR2V0RGF0YSh0WzBdLFwiZGF0YVwiKSxzLnNlYXJjaFJlbW92ZUNob2ljZSh0KSxlLnByZXZlbnREZWZhdWx0KCkpfSksdGhpcy4kc2VsZWN0aW9uLm9uKFwiY2xpY2tcIixcIi5zZWxlY3QyLXNlYXJjaC0taW5saW5lXCIsZnVuY3Rpb24oZSl7cy4kc2VhcmNoLnZhbCgpJiZlLnN0b3BQcm9wYWdhdGlvbigpfSk7dmFyIHQ9ZG9jdW1lbnQuZG9jdW1lbnRNb2RlLG89dCYmdDw9MTE7dGhpcy4kc2VsZWN0aW9uLm9uKFwiaW5wdXQuc2VhcmNoY2hlY2tcIixcIi5zZWxlY3QyLXNlYXJjaC0taW5saW5lXCIsZnVuY3Rpb24oZSl7bz9zLiRzZWxlY3Rpb24ub2ZmKFwiaW5wdXQuc2VhcmNoIGlucHV0LnNlYXJjaGNoZWNrXCIpOnMuJHNlbGVjdGlvbi5vZmYoXCJrZXl1cC5zZWFyY2hcIil9KSx0aGlzLiRzZWxlY3Rpb24ub24oXCJrZXl1cC5zZWFyY2ggaW5wdXQuc2VhcmNoXCIsXCIuc2VsZWN0Mi1zZWFyY2gtLWlubGluZVwiLGZ1bmN0aW9uKGUpe3ZhciB0O28mJlwiaW5wdXRcIj09PWUudHlwZT9zLiRzZWxlY3Rpb24ub2ZmKFwiaW5wdXQuc2VhcmNoIGlucHV0LnNlYXJjaGNoZWNrXCIpOih0PWUud2hpY2gpIT1sLlNISUZUJiZ0IT1sLkNUUkwmJnQhPWwuQUxUJiZ0IT1sLlRBQiYmcy5oYW5kbGVTZWFyY2goZSl9KX0sZS5wcm90b3R5cGUuX3RyYW5zZmVyVGFiSW5kZXg9ZnVuY3Rpb24oZSl7dGhpcy4kc2VhcmNoLmF0dHIoXCJ0YWJpbmRleFwiLHRoaXMuJHNlbGVjdGlvbi5hdHRyKFwidGFiaW5kZXhcIikpLHRoaXMuJHNlbGVjdGlvbi5hdHRyKFwidGFiaW5kZXhcIixcIi0xXCIpfSxlLnByb3RvdHlwZS5jcmVhdGVQbGFjZWhvbGRlcj1mdW5jdGlvbihlLHQpe3RoaXMuJHNlYXJjaC5hdHRyKFwicGxhY2Vob2xkZXJcIix0LnRleHQpfSxlLnByb3RvdHlwZS51cGRhdGU9ZnVuY3Rpb24oZSx0KXt2YXIgbj10aGlzLiRzZWFyY2hbMF09PWRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7dGhpcy4kc2VhcmNoLmF0dHIoXCJwbGFjZWhvbGRlclwiLFwiXCIpLGUuY2FsbCh0aGlzLHQpLHRoaXMucmVzaXplU2VhcmNoKCksbiYmdGhpcy4kc2VhcmNoLnRyaWdnZXIoXCJmb2N1c1wiKX0sZS5wcm90b3R5cGUuaGFuZGxlU2VhcmNoPWZ1bmN0aW9uKCl7dmFyIGU7dGhpcy5yZXNpemVTZWFyY2goKSx0aGlzLl9rZXlVcFByZXZlbnRlZHx8KGU9dGhpcy4kc2VhcmNoLnZhbCgpLHRoaXMudHJpZ2dlcihcInF1ZXJ5XCIse3Rlcm06ZX0pKSx0aGlzLl9rZXlVcFByZXZlbnRlZD0hMX0sZS5wcm90b3R5cGUuc2VhcmNoUmVtb3ZlQ2hvaWNlPWZ1bmN0aW9uKGUsdCl7dGhpcy50cmlnZ2VyKFwidW5zZWxlY3RcIix7ZGF0YTp0fSksdGhpcy4kc2VhcmNoLnZhbCh0LnRleHQpLHRoaXMuaGFuZGxlU2VhcmNoKCl9LGUucHJvdG90eXBlLnJlc2l6ZVNlYXJjaD1mdW5jdGlvbigpe3RoaXMuJHNlYXJjaC5jc3MoXCJ3aWR0aFwiLFwiMjVweFwiKTt2YXIgZT1cIjEwMCVcIjtcIlwiPT09dGhpcy4kc2VhcmNoLmF0dHIoXCJwbGFjZWhvbGRlclwiKSYmKGU9Ljc1Kih0aGlzLiRzZWFyY2gudmFsKCkubGVuZ3RoKzEpK1wiZW1cIiksdGhpcy4kc2VhcmNoLmNzcyhcIndpZHRoXCIsZSl9LGV9KSx1LmRlZmluZShcInNlbGVjdDIvc2VsZWN0aW9uL3NlbGVjdGlvbkNzc1wiLFtcIi4uL3V0aWxzXCJdLGZ1bmN0aW9uKG4pe2Z1bmN0aW9uIGUoKXt9cmV0dXJuIGUucHJvdG90eXBlLnJlbmRlcj1mdW5jdGlvbihlKXt2YXIgdD1lLmNhbGwodGhpcyksZT10aGlzLm9wdGlvbnMuZ2V0KFwic2VsZWN0aW9uQ3NzQ2xhc3NcIil8fFwiXCI7cmV0dXJuLTEhPT1lLmluZGV4T2YoXCI6YWxsOlwiKSYmKGU9ZS5yZXBsYWNlKFwiOmFsbDpcIixcIlwiKSxuLmNvcHlOb25JbnRlcm5hbENzc0NsYXNzZXModFswXSx0aGlzLiRlbGVtZW50WzBdKSksdC5hZGRDbGFzcyhlKSx0fSxlfSksdS5kZWZpbmUoXCJzZWxlY3QyL3NlbGVjdGlvbi9ldmVudFJlbGF5XCIsW1wianF1ZXJ5XCJdLGZ1bmN0aW9uKG8pe2Z1bmN0aW9uIGUoKXt9cmV0dXJuIGUucHJvdG90eXBlLmJpbmQ9ZnVuY3Rpb24oZSx0LG4pe3ZhciBzPXRoaXMsaT1bXCJvcGVuXCIsXCJvcGVuaW5nXCIsXCJjbG9zZVwiLFwiY2xvc2luZ1wiLFwic2VsZWN0XCIsXCJzZWxlY3RpbmdcIixcInVuc2VsZWN0XCIsXCJ1bnNlbGVjdGluZ1wiLFwiY2xlYXJcIixcImNsZWFyaW5nXCJdLHI9W1wib3BlbmluZ1wiLFwiY2xvc2luZ1wiLFwic2VsZWN0aW5nXCIsXCJ1bnNlbGVjdGluZ1wiLFwiY2xlYXJpbmdcIl07ZS5jYWxsKHRoaXMsdCxuKSx0Lm9uKFwiKlwiLGZ1bmN0aW9uKGUsdCl7dmFyIG47LTEhPT1pLmluZGV4T2YoZSkmJih0PXR8fHt9LG49by5FdmVudChcInNlbGVjdDI6XCIrZSx7cGFyYW1zOnR9KSxzLiRlbGVtZW50LnRyaWdnZXIobiksLTEhPT1yLmluZGV4T2YoZSkmJih0LnByZXZlbnRlZD1uLmlzRGVmYXVsdFByZXZlbnRlZCgpKSl9KX0sZX0pLHUuZGVmaW5lKFwic2VsZWN0Mi90cmFuc2xhdGlvblwiLFtcImpxdWVyeVwiLFwicmVxdWlyZVwiXSxmdW5jdGlvbih0LG4pe2Z1bmN0aW9uIHMoZSl7dGhpcy5kaWN0PWV8fHt9fXJldHVybiBzLnByb3RvdHlwZS5hbGw9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5kaWN0fSxzLnByb3RvdHlwZS5nZXQ9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMuZGljdFtlXX0scy5wcm90b3R5cGUuZXh0ZW5kPWZ1bmN0aW9uKGUpe3RoaXMuZGljdD10LmV4dGVuZCh7fSxlLmFsbCgpLHRoaXMuZGljdCl9LHMuX2NhY2hlPXt9LHMubG9hZFBhdGg9ZnVuY3Rpb24oZSl7dmFyIHQ7cmV0dXJuIGUgaW4gcy5fY2FjaGV8fCh0PW4oZSkscy5fY2FjaGVbZV09dCksbmV3IHMocy5fY2FjaGVbZV0pfSxzfSksdS5kZWZpbmUoXCJzZWxlY3QyL2RpYWNyaXRpY3NcIixbXSxmdW5jdGlvbigpe3JldHVybntcIuKStlwiOlwiQVwiLFwi77yhXCI6XCJBXCIsXCLDgFwiOlwiQVwiLFwiw4FcIjpcIkFcIixcIsOCXCI6XCJBXCIsXCLhuqZcIjpcIkFcIixcIuG6pFwiOlwiQVwiLFwi4bqqXCI6XCJBXCIsXCLhuqhcIjpcIkFcIixcIsODXCI6XCJBXCIsXCLEgFwiOlwiQVwiLFwixIJcIjpcIkFcIixcIuG6sFwiOlwiQVwiLFwi4bquXCI6XCJBXCIsXCLhurRcIjpcIkFcIixcIuG6slwiOlwiQVwiLFwiyKZcIjpcIkFcIixcIsegXCI6XCJBXCIsXCLDhFwiOlwiQVwiLFwix55cIjpcIkFcIixcIuG6olwiOlwiQVwiLFwiw4VcIjpcIkFcIixcIse6XCI6XCJBXCIsXCLHjVwiOlwiQVwiLFwiyIBcIjpcIkFcIixcIsiCXCI6XCJBXCIsXCLhuqBcIjpcIkFcIixcIuG6rFwiOlwiQVwiLFwi4bq2XCI6XCJBXCIsXCLhuIBcIjpcIkFcIixcIsSEXCI6XCJBXCIsXCLIulwiOlwiQVwiLFwi4rGvXCI6XCJBXCIsXCLqnLJcIjpcIkFBXCIsXCLDhlwiOlwiQUVcIixcIse8XCI6XCJBRVwiLFwix6JcIjpcIkFFXCIsXCLqnLRcIjpcIkFPXCIsXCLqnLZcIjpcIkFVXCIsXCLqnLhcIjpcIkFWXCIsXCLqnLpcIjpcIkFWXCIsXCLqnLxcIjpcIkFZXCIsXCLikrdcIjpcIkJcIixcIu+8olwiOlwiQlwiLFwi4biCXCI6XCJCXCIsXCLhuIRcIjpcIkJcIixcIuG4hlwiOlwiQlwiLFwiyYNcIjpcIkJcIixcIsaCXCI6XCJCXCIsXCLGgVwiOlwiQlwiLFwi4pK4XCI6XCJDXCIsXCLvvKNcIjpcIkNcIixcIsSGXCI6XCJDXCIsXCLEiFwiOlwiQ1wiLFwixIpcIjpcIkNcIixcIsSMXCI6XCJDXCIsXCLDh1wiOlwiQ1wiLFwi4biIXCI6XCJDXCIsXCLGh1wiOlwiQ1wiLFwiyLtcIjpcIkNcIixcIuqcvlwiOlwiQ1wiLFwi4pK5XCI6XCJEXCIsXCLvvKRcIjpcIkRcIixcIuG4ilwiOlwiRFwiLFwixI5cIjpcIkRcIixcIuG4jFwiOlwiRFwiLFwi4biQXCI6XCJEXCIsXCLhuJJcIjpcIkRcIixcIuG4jlwiOlwiRFwiLFwixJBcIjpcIkRcIixcIsaLXCI6XCJEXCIsXCLGilwiOlwiRFwiLFwixolcIjpcIkRcIixcIuqduVwiOlwiRFwiLFwix7FcIjpcIkRaXCIsXCLHhFwiOlwiRFpcIixcIseyXCI6XCJEelwiLFwix4VcIjpcIkR6XCIsXCLikrpcIjpcIkVcIixcIu+8pVwiOlwiRVwiLFwiw4hcIjpcIkVcIixcIsOJXCI6XCJFXCIsXCLDilwiOlwiRVwiLFwi4buAXCI6XCJFXCIsXCLhur5cIjpcIkVcIixcIuG7hFwiOlwiRVwiLFwi4buCXCI6XCJFXCIsXCLhurxcIjpcIkVcIixcIsSSXCI6XCJFXCIsXCLhuJRcIjpcIkVcIixcIuG4llwiOlwiRVwiLFwixJRcIjpcIkVcIixcIsSWXCI6XCJFXCIsXCLDi1wiOlwiRVwiLFwi4bq6XCI6XCJFXCIsXCLEmlwiOlwiRVwiLFwiyIRcIjpcIkVcIixcIsiGXCI6XCJFXCIsXCLhurhcIjpcIkVcIixcIuG7hlwiOlwiRVwiLFwiyKhcIjpcIkVcIixcIuG4nFwiOlwiRVwiLFwixJhcIjpcIkVcIixcIuG4mFwiOlwiRVwiLFwi4biaXCI6XCJFXCIsXCLGkFwiOlwiRVwiLFwixo5cIjpcIkVcIixcIuKSu1wiOlwiRlwiLFwi77ymXCI6XCJGXCIsXCLhuJ5cIjpcIkZcIixcIsaRXCI6XCJGXCIsXCLqnbtcIjpcIkZcIixcIuKSvFwiOlwiR1wiLFwi77ynXCI6XCJHXCIsXCLHtFwiOlwiR1wiLFwixJxcIjpcIkdcIixcIuG4oFwiOlwiR1wiLFwixJ5cIjpcIkdcIixcIsSgXCI6XCJHXCIsXCLHplwiOlwiR1wiLFwixKJcIjpcIkdcIixcIsekXCI6XCJHXCIsXCLGk1wiOlwiR1wiLFwi6p6gXCI6XCJHXCIsXCLqnb1cIjpcIkdcIixcIuqdvlwiOlwiR1wiLFwi4pK9XCI6XCJIXCIsXCLvvKhcIjpcIkhcIixcIsSkXCI6XCJIXCIsXCLhuKJcIjpcIkhcIixcIuG4plwiOlwiSFwiLFwiyJ5cIjpcIkhcIixcIuG4pFwiOlwiSFwiLFwi4bioXCI6XCJIXCIsXCLhuKpcIjpcIkhcIixcIsSmXCI6XCJIXCIsXCLisadcIjpcIkhcIixcIuKxtVwiOlwiSFwiLFwi6p6NXCI6XCJIXCIsXCLikr5cIjpcIklcIixcIu+8qVwiOlwiSVwiLFwiw4xcIjpcIklcIixcIsONXCI6XCJJXCIsXCLDjlwiOlwiSVwiLFwixKhcIjpcIklcIixcIsSqXCI6XCJJXCIsXCLErFwiOlwiSVwiLFwixLBcIjpcIklcIixcIsOPXCI6XCJJXCIsXCLhuK5cIjpcIklcIixcIuG7iFwiOlwiSVwiLFwix49cIjpcIklcIixcIsiIXCI6XCJJXCIsXCLIilwiOlwiSVwiLFwi4buKXCI6XCJJXCIsXCLErlwiOlwiSVwiLFwi4bisXCI6XCJJXCIsXCLGl1wiOlwiSVwiLFwi4pK/XCI6XCJKXCIsXCLvvKpcIjpcIkpcIixcIsS0XCI6XCJKXCIsXCLJiFwiOlwiSlwiLFwi4pOAXCI6XCJLXCIsXCLvvKtcIjpcIktcIixcIuG4sFwiOlwiS1wiLFwix6hcIjpcIktcIixcIuG4slwiOlwiS1wiLFwixLZcIjpcIktcIixcIuG4tFwiOlwiS1wiLFwixphcIjpcIktcIixcIuKxqVwiOlwiS1wiLFwi6p2AXCI6XCJLXCIsXCLqnYJcIjpcIktcIixcIuqdhFwiOlwiS1wiLFwi6p6iXCI6XCJLXCIsXCLik4FcIjpcIkxcIixcIu+8rFwiOlwiTFwiLFwixL9cIjpcIkxcIixcIsS5XCI6XCJMXCIsXCLEvVwiOlwiTFwiLFwi4bi2XCI6XCJMXCIsXCLhuLhcIjpcIkxcIixcIsS7XCI6XCJMXCIsXCLhuLxcIjpcIkxcIixcIuG4ulwiOlwiTFwiLFwixYFcIjpcIkxcIixcIsi9XCI6XCJMXCIsXCLisaJcIjpcIkxcIixcIuKxoFwiOlwiTFwiLFwi6p2IXCI6XCJMXCIsXCLqnYZcIjpcIkxcIixcIuqegFwiOlwiTFwiLFwix4dcIjpcIkxKXCIsXCLHiFwiOlwiTGpcIixcIuKTglwiOlwiTVwiLFwi77ytXCI6XCJNXCIsXCLhuL5cIjpcIk1cIixcIuG5gFwiOlwiTVwiLFwi4bmCXCI6XCJNXCIsXCLisa5cIjpcIk1cIixcIsacXCI6XCJNXCIsXCLik4NcIjpcIk5cIixcIu+8rlwiOlwiTlwiLFwix7hcIjpcIk5cIixcIsWDXCI6XCJOXCIsXCLDkVwiOlwiTlwiLFwi4bmEXCI6XCJOXCIsXCLFh1wiOlwiTlwiLFwi4bmGXCI6XCJOXCIsXCLFhVwiOlwiTlwiLFwi4bmKXCI6XCJOXCIsXCLhuYhcIjpcIk5cIixcIsigXCI6XCJOXCIsXCLGnVwiOlwiTlwiLFwi6p6QXCI6XCJOXCIsXCLqnqRcIjpcIk5cIixcIseKXCI6XCJOSlwiLFwix4tcIjpcIk5qXCIsXCLik4RcIjpcIk9cIixcIu+8r1wiOlwiT1wiLFwiw5JcIjpcIk9cIixcIsOTXCI6XCJPXCIsXCLDlFwiOlwiT1wiLFwi4buSXCI6XCJPXCIsXCLhu5BcIjpcIk9cIixcIuG7llwiOlwiT1wiLFwi4buUXCI6XCJPXCIsXCLDlVwiOlwiT1wiLFwi4bmMXCI6XCJPXCIsXCLIrFwiOlwiT1wiLFwi4bmOXCI6XCJPXCIsXCLFjFwiOlwiT1wiLFwi4bmQXCI6XCJPXCIsXCLhuZJcIjpcIk9cIixcIsWOXCI6XCJPXCIsXCLIrlwiOlwiT1wiLFwiyLBcIjpcIk9cIixcIsOWXCI6XCJPXCIsXCLIqlwiOlwiT1wiLFwi4buOXCI6XCJPXCIsXCLFkFwiOlwiT1wiLFwix5FcIjpcIk9cIixcIsiMXCI6XCJPXCIsXCLIjlwiOlwiT1wiLFwixqBcIjpcIk9cIixcIuG7nFwiOlwiT1wiLFwi4buaXCI6XCJPXCIsXCLhu6BcIjpcIk9cIixcIuG7nlwiOlwiT1wiLFwi4buiXCI6XCJPXCIsXCLhu4xcIjpcIk9cIixcIuG7mFwiOlwiT1wiLFwix6pcIjpcIk9cIixcIsesXCI6XCJPXCIsXCLDmFwiOlwiT1wiLFwix75cIjpcIk9cIixcIsaGXCI6XCJPXCIsXCLGn1wiOlwiT1wiLFwi6p2KXCI6XCJPXCIsXCLqnYxcIjpcIk9cIixcIsWSXCI6XCJPRVwiLFwixqJcIjpcIk9JXCIsXCLqnY5cIjpcIk9PXCIsXCLIolwiOlwiT1VcIixcIuKThVwiOlwiUFwiLFwi77ywXCI6XCJQXCIsXCLhuZRcIjpcIlBcIixcIuG5llwiOlwiUFwiLFwixqRcIjpcIlBcIixcIuKxo1wiOlwiUFwiLFwi6p2QXCI6XCJQXCIsXCLqnZJcIjpcIlBcIixcIuqdlFwiOlwiUFwiLFwi4pOGXCI6XCJRXCIsXCLvvLFcIjpcIlFcIixcIuqdllwiOlwiUVwiLFwi6p2YXCI6XCJRXCIsXCLJilwiOlwiUVwiLFwi4pOHXCI6XCJSXCIsXCLvvLJcIjpcIlJcIixcIsWUXCI6XCJSXCIsXCLhuZhcIjpcIlJcIixcIsWYXCI6XCJSXCIsXCLIkFwiOlwiUlwiLFwiyJJcIjpcIlJcIixcIuG5mlwiOlwiUlwiLFwi4bmcXCI6XCJSXCIsXCLFllwiOlwiUlwiLFwi4bmeXCI6XCJSXCIsXCLJjFwiOlwiUlwiLFwi4rGkXCI6XCJSXCIsXCLqnZpcIjpcIlJcIixcIuqeplwiOlwiUlwiLFwi6p6CXCI6XCJSXCIsXCLik4hcIjpcIlNcIixcIu+8s1wiOlwiU1wiLFwi4bqeXCI6XCJTXCIsXCLFmlwiOlwiU1wiLFwi4bmkXCI6XCJTXCIsXCLFnFwiOlwiU1wiLFwi4bmgXCI6XCJTXCIsXCLFoFwiOlwiU1wiLFwi4bmmXCI6XCJTXCIsXCLhuaJcIjpcIlNcIixcIuG5qFwiOlwiU1wiLFwiyJhcIjpcIlNcIixcIsWeXCI6XCJTXCIsXCLisb5cIjpcIlNcIixcIuqeqFwiOlwiU1wiLFwi6p6EXCI6XCJTXCIsXCLik4lcIjpcIlRcIixcIu+8tFwiOlwiVFwiLFwi4bmqXCI6XCJUXCIsXCLFpFwiOlwiVFwiLFwi4bmsXCI6XCJUXCIsXCLImlwiOlwiVFwiLFwixaJcIjpcIlRcIixcIuG5sFwiOlwiVFwiLFwi4bmuXCI6XCJUXCIsXCLFplwiOlwiVFwiLFwixqxcIjpcIlRcIixcIsauXCI6XCJUXCIsXCLIvlwiOlwiVFwiLFwi6p6GXCI6XCJUXCIsXCLqnKhcIjpcIlRaXCIsXCLik4pcIjpcIlVcIixcIu+8tVwiOlwiVVwiLFwiw5lcIjpcIlVcIixcIsOaXCI6XCJVXCIsXCLDm1wiOlwiVVwiLFwixahcIjpcIlVcIixcIuG5uFwiOlwiVVwiLFwixapcIjpcIlVcIixcIuG5ulwiOlwiVVwiLFwixaxcIjpcIlVcIixcIsOcXCI6XCJVXCIsXCLHm1wiOlwiVVwiLFwix5dcIjpcIlVcIixcIseVXCI6XCJVXCIsXCLHmVwiOlwiVVwiLFwi4bumXCI6XCJVXCIsXCLFrlwiOlwiVVwiLFwixbBcIjpcIlVcIixcIseTXCI6XCJVXCIsXCLIlFwiOlwiVVwiLFwiyJZcIjpcIlVcIixcIsavXCI6XCJVXCIsXCLhu6pcIjpcIlVcIixcIuG7qFwiOlwiVVwiLFwi4buuXCI6XCJVXCIsXCLhu6xcIjpcIlVcIixcIuG7sFwiOlwiVVwiLFwi4bukXCI6XCJVXCIsXCLhubJcIjpcIlVcIixcIsWyXCI6XCJVXCIsXCLhubZcIjpcIlVcIixcIuG5tFwiOlwiVVwiLFwiyYRcIjpcIlVcIixcIuKTi1wiOlwiVlwiLFwi77y2XCI6XCJWXCIsXCLhubxcIjpcIlZcIixcIuG5vlwiOlwiVlwiLFwixrJcIjpcIlZcIixcIuqdnlwiOlwiVlwiLFwiyYVcIjpcIlZcIixcIuqdoFwiOlwiVllcIixcIuKTjFwiOlwiV1wiLFwi77y3XCI6XCJXXCIsXCLhuoBcIjpcIldcIixcIuG6glwiOlwiV1wiLFwixbRcIjpcIldcIixcIuG6hlwiOlwiV1wiLFwi4bqEXCI6XCJXXCIsXCLhuohcIjpcIldcIixcIuKxslwiOlwiV1wiLFwi4pONXCI6XCJYXCIsXCLvvLhcIjpcIlhcIixcIuG6ilwiOlwiWFwiLFwi4bqMXCI6XCJYXCIsXCLik45cIjpcIllcIixcIu+8uVwiOlwiWVwiLFwi4buyXCI6XCJZXCIsXCLDnVwiOlwiWVwiLFwixbZcIjpcIllcIixcIuG7uFwiOlwiWVwiLFwiyLJcIjpcIllcIixcIuG6jlwiOlwiWVwiLFwixbhcIjpcIllcIixcIuG7tlwiOlwiWVwiLFwi4bu0XCI6XCJZXCIsXCLGs1wiOlwiWVwiLFwiyY5cIjpcIllcIixcIuG7vlwiOlwiWVwiLFwi4pOPXCI6XCJaXCIsXCLvvLpcIjpcIlpcIixcIsW5XCI6XCJaXCIsXCLhupBcIjpcIlpcIixcIsW7XCI6XCJaXCIsXCLFvVwiOlwiWlwiLFwi4bqSXCI6XCJaXCIsXCLhupRcIjpcIlpcIixcIsa1XCI6XCJaXCIsXCLIpFwiOlwiWlwiLFwi4rG/XCI6XCJaXCIsXCLisatcIjpcIlpcIixcIuqdolwiOlwiWlwiLFwi4pOQXCI6XCJhXCIsXCLvvYFcIjpcImFcIixcIuG6mlwiOlwiYVwiLFwiw6BcIjpcImFcIixcIsOhXCI6XCJhXCIsXCLDolwiOlwiYVwiLFwi4bqnXCI6XCJhXCIsXCLhuqVcIjpcImFcIixcIuG6q1wiOlwiYVwiLFwi4bqpXCI6XCJhXCIsXCLDo1wiOlwiYVwiLFwixIFcIjpcImFcIixcIsSDXCI6XCJhXCIsXCLhurFcIjpcImFcIixcIuG6r1wiOlwiYVwiLFwi4bq1XCI6XCJhXCIsXCLhurNcIjpcImFcIixcIsinXCI6XCJhXCIsXCLHoVwiOlwiYVwiLFwiw6RcIjpcImFcIixcIsefXCI6XCJhXCIsXCLhuqNcIjpcImFcIixcIsOlXCI6XCJhXCIsXCLHu1wiOlwiYVwiLFwix45cIjpcImFcIixcIsiBXCI6XCJhXCIsXCLIg1wiOlwiYVwiLFwi4bqhXCI6XCJhXCIsXCLhuq1cIjpcImFcIixcIuG6t1wiOlwiYVwiLFwi4biBXCI6XCJhXCIsXCLEhVwiOlwiYVwiLFwi4rGlXCI6XCJhXCIsXCLJkFwiOlwiYVwiLFwi6pyzXCI6XCJhYVwiLFwiw6ZcIjpcImFlXCIsXCLHvVwiOlwiYWVcIixcIsejXCI6XCJhZVwiLFwi6py1XCI6XCJhb1wiLFwi6py3XCI6XCJhdVwiLFwi6py5XCI6XCJhdlwiLFwi6py7XCI6XCJhdlwiLFwi6py9XCI6XCJheVwiLFwi4pORXCI6XCJiXCIsXCLvvYJcIjpcImJcIixcIuG4g1wiOlwiYlwiLFwi4biFXCI6XCJiXCIsXCLhuIdcIjpcImJcIixcIsaAXCI6XCJiXCIsXCLGg1wiOlwiYlwiLFwiyZNcIjpcImJcIixcIuKTklwiOlwiY1wiLFwi772DXCI6XCJjXCIsXCLEh1wiOlwiY1wiLFwixIlcIjpcImNcIixcIsSLXCI6XCJjXCIsXCLEjVwiOlwiY1wiLFwiw6dcIjpcImNcIixcIuG4iVwiOlwiY1wiLFwixohcIjpcImNcIixcIsi8XCI6XCJjXCIsXCLqnL9cIjpcImNcIixcIuKGhFwiOlwiY1wiLFwi4pOTXCI6XCJkXCIsXCLvvYRcIjpcImRcIixcIuG4i1wiOlwiZFwiLFwixI9cIjpcImRcIixcIuG4jVwiOlwiZFwiLFwi4biRXCI6XCJkXCIsXCLhuJNcIjpcImRcIixcIuG4j1wiOlwiZFwiLFwixJFcIjpcImRcIixcIsaMXCI6XCJkXCIsXCLJllwiOlwiZFwiLFwiyZdcIjpcImRcIixcIuqdulwiOlwiZFwiLFwix7NcIjpcImR6XCIsXCLHhlwiOlwiZHpcIixcIuKTlFwiOlwiZVwiLFwi772FXCI6XCJlXCIsXCLDqFwiOlwiZVwiLFwiw6lcIjpcImVcIixcIsOqXCI6XCJlXCIsXCLhu4FcIjpcImVcIixcIuG6v1wiOlwiZVwiLFwi4buFXCI6XCJlXCIsXCLhu4NcIjpcImVcIixcIuG6vVwiOlwiZVwiLFwixJNcIjpcImVcIixcIuG4lVwiOlwiZVwiLFwi4biXXCI6XCJlXCIsXCLElVwiOlwiZVwiLFwixJdcIjpcImVcIixcIsOrXCI6XCJlXCIsXCLhurtcIjpcImVcIixcIsSbXCI6XCJlXCIsXCLIhVwiOlwiZVwiLFwiyIdcIjpcImVcIixcIuG6uVwiOlwiZVwiLFwi4buHXCI6XCJlXCIsXCLIqVwiOlwiZVwiLFwi4bidXCI6XCJlXCIsXCLEmVwiOlwiZVwiLFwi4biZXCI6XCJlXCIsXCLhuJtcIjpcImVcIixcIsmHXCI6XCJlXCIsXCLJm1wiOlwiZVwiLFwix51cIjpcImVcIixcIuKTlVwiOlwiZlwiLFwi772GXCI6XCJmXCIsXCLhuJ9cIjpcImZcIixcIsaSXCI6XCJmXCIsXCLqnbxcIjpcImZcIixcIuKTllwiOlwiZ1wiLFwi772HXCI6XCJnXCIsXCLHtVwiOlwiZ1wiLFwixJ1cIjpcImdcIixcIuG4oVwiOlwiZ1wiLFwixJ9cIjpcImdcIixcIsShXCI6XCJnXCIsXCLHp1wiOlwiZ1wiLFwixKNcIjpcImdcIixcIselXCI6XCJnXCIsXCLJoFwiOlwiZ1wiLFwi6p6hXCI6XCJnXCIsXCLhtblcIjpcImdcIixcIuqdv1wiOlwiZ1wiLFwi4pOXXCI6XCJoXCIsXCLvvYhcIjpcImhcIixcIsSlXCI6XCJoXCIsXCLhuKNcIjpcImhcIixcIuG4p1wiOlwiaFwiLFwiyJ9cIjpcImhcIixcIuG4pVwiOlwiaFwiLFwi4bipXCI6XCJoXCIsXCLhuKtcIjpcImhcIixcIuG6llwiOlwiaFwiLFwixKdcIjpcImhcIixcIuKxqFwiOlwiaFwiLFwi4rG2XCI6XCJoXCIsXCLJpVwiOlwiaFwiLFwixpVcIjpcImh2XCIsXCLik5hcIjpcImlcIixcIu+9iVwiOlwiaVwiLFwiw6xcIjpcImlcIixcIsOtXCI6XCJpXCIsXCLDrlwiOlwiaVwiLFwixKlcIjpcImlcIixcIsSrXCI6XCJpXCIsXCLErVwiOlwiaVwiLFwiw69cIjpcImlcIixcIuG4r1wiOlwiaVwiLFwi4buJXCI6XCJpXCIsXCLHkFwiOlwiaVwiLFwiyIlcIjpcImlcIixcIsiLXCI6XCJpXCIsXCLhu4tcIjpcImlcIixcIsSvXCI6XCJpXCIsXCLhuK1cIjpcImlcIixcIsmoXCI6XCJpXCIsXCLEsVwiOlwiaVwiLFwi4pOZXCI6XCJqXCIsXCLvvYpcIjpcImpcIixcIsS1XCI6XCJqXCIsXCLHsFwiOlwialwiLFwiyYlcIjpcImpcIixcIuKTmlwiOlwia1wiLFwi772LXCI6XCJrXCIsXCLhuLFcIjpcImtcIixcIsepXCI6XCJrXCIsXCLhuLNcIjpcImtcIixcIsS3XCI6XCJrXCIsXCLhuLVcIjpcImtcIixcIsaZXCI6XCJrXCIsXCLisapcIjpcImtcIixcIuqdgVwiOlwia1wiLFwi6p2DXCI6XCJrXCIsXCLqnYVcIjpcImtcIixcIuqeo1wiOlwia1wiLFwi4pObXCI6XCJsXCIsXCLvvYxcIjpcImxcIixcIsWAXCI6XCJsXCIsXCLEulwiOlwibFwiLFwixL5cIjpcImxcIixcIuG4t1wiOlwibFwiLFwi4bi5XCI6XCJsXCIsXCLEvFwiOlwibFwiLFwi4bi9XCI6XCJsXCIsXCLhuLtcIjpcImxcIixcIsW/XCI6XCJsXCIsXCLFglwiOlwibFwiLFwixppcIjpcImxcIixcIsmrXCI6XCJsXCIsXCLisaFcIjpcImxcIixcIuqdiVwiOlwibFwiLFwi6p6BXCI6XCJsXCIsXCLqnYdcIjpcImxcIixcIseJXCI6XCJsalwiLFwi4pOcXCI6XCJtXCIsXCLvvY1cIjpcIm1cIixcIuG4v1wiOlwibVwiLFwi4bmBXCI6XCJtXCIsXCLhuYNcIjpcIm1cIixcIsmxXCI6XCJtXCIsXCLJr1wiOlwibVwiLFwi4pOdXCI6XCJuXCIsXCLvvY5cIjpcIm5cIixcIse5XCI6XCJuXCIsXCLFhFwiOlwiblwiLFwiw7FcIjpcIm5cIixcIuG5hVwiOlwiblwiLFwixYhcIjpcIm5cIixcIuG5h1wiOlwiblwiLFwixYZcIjpcIm5cIixcIuG5i1wiOlwiblwiLFwi4bmJXCI6XCJuXCIsXCLGnlwiOlwiblwiLFwiybJcIjpcIm5cIixcIsWJXCI6XCJuXCIsXCLqnpFcIjpcIm5cIixcIuqepVwiOlwiblwiLFwix4xcIjpcIm5qXCIsXCLik55cIjpcIm9cIixcIu+9j1wiOlwib1wiLFwiw7JcIjpcIm9cIixcIsOzXCI6XCJvXCIsXCLDtFwiOlwib1wiLFwi4buTXCI6XCJvXCIsXCLhu5FcIjpcIm9cIixcIuG7l1wiOlwib1wiLFwi4buVXCI6XCJvXCIsXCLDtVwiOlwib1wiLFwi4bmNXCI6XCJvXCIsXCLIrVwiOlwib1wiLFwi4bmPXCI6XCJvXCIsXCLFjVwiOlwib1wiLFwi4bmRXCI6XCJvXCIsXCLhuZNcIjpcIm9cIixcIsWPXCI6XCJvXCIsXCLIr1wiOlwib1wiLFwiyLFcIjpcIm9cIixcIsO2XCI6XCJvXCIsXCLIq1wiOlwib1wiLFwi4buPXCI6XCJvXCIsXCLFkVwiOlwib1wiLFwix5JcIjpcIm9cIixcIsiNXCI6XCJvXCIsXCLIj1wiOlwib1wiLFwixqFcIjpcIm9cIixcIuG7nVwiOlwib1wiLFwi4bubXCI6XCJvXCIsXCLhu6FcIjpcIm9cIixcIuG7n1wiOlwib1wiLFwi4bujXCI6XCJvXCIsXCLhu41cIjpcIm9cIixcIuG7mVwiOlwib1wiLFwix6tcIjpcIm9cIixcIsetXCI6XCJvXCIsXCLDuFwiOlwib1wiLFwix79cIjpcIm9cIixcIsmUXCI6XCJvXCIsXCLqnYtcIjpcIm9cIixcIuqdjVwiOlwib1wiLFwiybVcIjpcIm9cIixcIsWTXCI6XCJvZVwiLFwixqNcIjpcIm9pXCIsXCLIo1wiOlwib3VcIixcIuqdj1wiOlwib29cIixcIuKTn1wiOlwicFwiLFwi772QXCI6XCJwXCIsXCLhuZVcIjpcInBcIixcIuG5l1wiOlwicFwiLFwixqVcIjpcInBcIixcIuG1vVwiOlwicFwiLFwi6p2RXCI6XCJwXCIsXCLqnZNcIjpcInBcIixcIuqdlVwiOlwicFwiLFwi4pOgXCI6XCJxXCIsXCLvvZFcIjpcInFcIixcIsmLXCI6XCJxXCIsXCLqnZdcIjpcInFcIixcIuqdmVwiOlwicVwiLFwi4pOhXCI6XCJyXCIsXCLvvZJcIjpcInJcIixcIsWVXCI6XCJyXCIsXCLhuZlcIjpcInJcIixcIsWZXCI6XCJyXCIsXCLIkVwiOlwiclwiLFwiyJNcIjpcInJcIixcIuG5m1wiOlwiclwiLFwi4bmdXCI6XCJyXCIsXCLFl1wiOlwiclwiLFwi4bmfXCI6XCJyXCIsXCLJjVwiOlwiclwiLFwiyb1cIjpcInJcIixcIuqdm1wiOlwiclwiLFwi6p6nXCI6XCJyXCIsXCLqnoNcIjpcInJcIixcIuKTolwiOlwic1wiLFwi772TXCI6XCJzXCIsXCLDn1wiOlwic1wiLFwixZtcIjpcInNcIixcIuG5pVwiOlwic1wiLFwixZ1cIjpcInNcIixcIuG5oVwiOlwic1wiLFwixaFcIjpcInNcIixcIuG5p1wiOlwic1wiLFwi4bmjXCI6XCJzXCIsXCLhualcIjpcInNcIixcIsiZXCI6XCJzXCIsXCLFn1wiOlwic1wiLFwiyL9cIjpcInNcIixcIuqeqVwiOlwic1wiLFwi6p6FXCI6XCJzXCIsXCLhuptcIjpcInNcIixcIuKTo1wiOlwidFwiLFwi772UXCI6XCJ0XCIsXCLhuatcIjpcInRcIixcIuG6l1wiOlwidFwiLFwixaVcIjpcInRcIixcIuG5rVwiOlwidFwiLFwiyJtcIjpcInRcIixcIsWjXCI6XCJ0XCIsXCLhubFcIjpcInRcIixcIuG5r1wiOlwidFwiLFwixadcIjpcInRcIixcIsatXCI6XCJ0XCIsXCLKiFwiOlwidFwiLFwi4rGmXCI6XCJ0XCIsXCLqnodcIjpcInRcIixcIuqcqVwiOlwidHpcIixcIuKTpFwiOlwidVwiLFwi772VXCI6XCJ1XCIsXCLDuVwiOlwidVwiLFwiw7pcIjpcInVcIixcIsO7XCI6XCJ1XCIsXCLFqVwiOlwidVwiLFwi4bm5XCI6XCJ1XCIsXCLFq1wiOlwidVwiLFwi4bm7XCI6XCJ1XCIsXCLFrVwiOlwidVwiLFwiw7xcIjpcInVcIixcIsecXCI6XCJ1XCIsXCLHmFwiOlwidVwiLFwix5ZcIjpcInVcIixcIseaXCI6XCJ1XCIsXCLhu6dcIjpcInVcIixcIsWvXCI6XCJ1XCIsXCLFsVwiOlwidVwiLFwix5RcIjpcInVcIixcIsiVXCI6XCJ1XCIsXCLIl1wiOlwidVwiLFwixrBcIjpcInVcIixcIuG7q1wiOlwidVwiLFwi4bupXCI6XCJ1XCIsXCLhu69cIjpcInVcIixcIuG7rVwiOlwidVwiLFwi4buxXCI6XCJ1XCIsXCLhu6VcIjpcInVcIixcIuG5s1wiOlwidVwiLFwixbNcIjpcInVcIixcIuG5t1wiOlwidVwiLFwi4bm1XCI6XCJ1XCIsXCLKiVwiOlwidVwiLFwi4pOlXCI6XCJ2XCIsXCLvvZZcIjpcInZcIixcIuG5vVwiOlwidlwiLFwi4bm/XCI6XCJ2XCIsXCLKi1wiOlwidlwiLFwi6p2fXCI6XCJ2XCIsXCLKjFwiOlwidlwiLFwi6p2hXCI6XCJ2eVwiLFwi4pOmXCI6XCJ3XCIsXCLvvZdcIjpcIndcIixcIuG6gVwiOlwid1wiLFwi4bqDXCI6XCJ3XCIsXCLFtVwiOlwid1wiLFwi4bqHXCI6XCJ3XCIsXCLhuoVcIjpcIndcIixcIuG6mFwiOlwid1wiLFwi4bqJXCI6XCJ3XCIsXCLisbNcIjpcIndcIixcIuKTp1wiOlwieFwiLFwi772YXCI6XCJ4XCIsXCLhuotcIjpcInhcIixcIuG6jVwiOlwieFwiLFwi4pOoXCI6XCJ5XCIsXCLvvZlcIjpcInlcIixcIuG7s1wiOlwieVwiLFwiw71cIjpcInlcIixcIsW3XCI6XCJ5XCIsXCLhu7lcIjpcInlcIixcIsizXCI6XCJ5XCIsXCLhuo9cIjpcInlcIixcIsO/XCI6XCJ5XCIsXCLhu7dcIjpcInlcIixcIuG6mVwiOlwieVwiLFwi4bu1XCI6XCJ5XCIsXCLGtFwiOlwieVwiLFwiyY9cIjpcInlcIixcIuG7v1wiOlwieVwiLFwi4pOpXCI6XCJ6XCIsXCLvvZpcIjpcInpcIixcIsW6XCI6XCJ6XCIsXCLhupFcIjpcInpcIixcIsW8XCI6XCJ6XCIsXCLFvlwiOlwielwiLFwi4bqTXCI6XCJ6XCIsXCLhupVcIjpcInpcIixcIsa2XCI6XCJ6XCIsXCLIpVwiOlwielwiLFwiyYBcIjpcInpcIixcIuKxrFwiOlwielwiLFwi6p2jXCI6XCJ6XCIsXCLOhlwiOlwizpFcIixcIs6IXCI6XCLOlVwiLFwizolcIjpcIs6XXCIsXCLOilwiOlwizplcIixcIs6qXCI6XCLOmVwiLFwizoxcIjpcIs6fXCIsXCLOjlwiOlwizqVcIixcIs6rXCI6XCLOpVwiLFwizo9cIjpcIs6pXCIsXCLOrFwiOlwizrFcIixcIs6tXCI6XCLOtVwiLFwizq5cIjpcIs63XCIsXCLOr1wiOlwizrlcIixcIs+KXCI6XCLOuVwiLFwizpBcIjpcIs65XCIsXCLPjFwiOlwizr9cIixcIs+NXCI6XCLPhVwiLFwiz4tcIjpcIs+FXCIsXCLOsFwiOlwiz4VcIixcIs+OXCI6XCLPiVwiLFwiz4JcIjpcIs+DXCIsXCLigJlcIjpcIidcIn19KSx1LmRlZmluZShcInNlbGVjdDIvZGF0YS9iYXNlXCIsW1wiLi4vdXRpbHNcIl0sZnVuY3Rpb24obil7ZnVuY3Rpb24gcyhlLHQpe3MuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmNhbGwodGhpcyl9cmV0dXJuIG4uRXh0ZW5kKHMsbi5PYnNlcnZhYmxlKSxzLnByb3RvdHlwZS5jdXJyZW50PWZ1bmN0aW9uKGUpe3Rocm93IG5ldyBFcnJvcihcIlRoZSBgY3VycmVudGAgbWV0aG9kIG11c3QgYmUgZGVmaW5lZCBpbiBjaGlsZCBjbGFzc2VzLlwiKX0scy5wcm90b3R5cGUucXVlcnk9ZnVuY3Rpb24oZSx0KXt0aHJvdyBuZXcgRXJyb3IoXCJUaGUgYHF1ZXJ5YCBtZXRob2QgbXVzdCBiZSBkZWZpbmVkIGluIGNoaWxkIGNsYXNzZXMuXCIpfSxzLnByb3RvdHlwZS5iaW5kPWZ1bmN0aW9uKGUsdCl7fSxzLnByb3RvdHlwZS5kZXN0cm95PWZ1bmN0aW9uKCl7fSxzLnByb3RvdHlwZS5nZW5lcmF0ZVJlc3VsdElkPWZ1bmN0aW9uKGUsdCl7ZT1lLmlkK1wiLXJlc3VsdC1cIjtyZXR1cm4gZSs9bi5nZW5lcmF0ZUNoYXJzKDQpLG51bGwhPXQuaWQ/ZSs9XCItXCIrdC5pZC50b1N0cmluZygpOmUrPVwiLVwiK24uZ2VuZXJhdGVDaGFycyg0KSxlfSxzfSksdS5kZWZpbmUoXCJzZWxlY3QyL2RhdGEvc2VsZWN0XCIsW1wiLi9iYXNlXCIsXCIuLi91dGlsc1wiLFwianF1ZXJ5XCJdLGZ1bmN0aW9uKGUsYSxsKXtmdW5jdGlvbiBuKGUsdCl7dGhpcy4kZWxlbWVudD1lLHRoaXMub3B0aW9ucz10LG4uX19zdXBlcl9fLmNvbnN0cnVjdG9yLmNhbGwodGhpcyl9cmV0dXJuIGEuRXh0ZW5kKG4sZSksbi5wcm90b3R5cGUuY3VycmVudD1mdW5jdGlvbihlKXt2YXIgdD10aGlzO2UoQXJyYXkucHJvdG90eXBlLm1hcC5jYWxsKHRoaXMuJGVsZW1lbnRbMF0ucXVlcnlTZWxlY3RvckFsbChcIjpjaGVja2VkXCIpLGZ1bmN0aW9uKGUpe3JldHVybiB0Lml0ZW0obChlKSl9KSl9LG4ucHJvdG90eXBlLnNlbGVjdD1mdW5jdGlvbihpKXt2YXIgZSxyPXRoaXM7aWYoaS5zZWxlY3RlZD0hMCxudWxsIT1pLmVsZW1lbnQmJlwib3B0aW9uXCI9PT1pLmVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpKXJldHVybiBpLmVsZW1lbnQuc2VsZWN0ZWQ9ITAsdm9pZCB0aGlzLiRlbGVtZW50LnRyaWdnZXIoXCJpbnB1dFwiKS50cmlnZ2VyKFwiY2hhbmdlXCIpO3RoaXMuJGVsZW1lbnQucHJvcChcIm11bHRpcGxlXCIpP3RoaXMuY3VycmVudChmdW5jdGlvbihlKXt2YXIgdD1bXTsoaT1baV0pLnB1c2guYXBwbHkoaSxlKTtmb3IodmFyIG49MDtuPGkubGVuZ3RoO24rKyl7dmFyIHM9aVtuXS5pZDstMT09PXQuaW5kZXhPZihzKSYmdC5wdXNoKHMpfXIuJGVsZW1lbnQudmFsKHQpLHIuJGVsZW1lbnQudHJpZ2dlcihcImlucHV0XCIpLnRyaWdnZXIoXCJjaGFuZ2VcIil9KTooZT1pLmlkLHRoaXMuJGVsZW1lbnQudmFsKGUpLHRoaXMuJGVsZW1lbnQudHJpZ2dlcihcImlucHV0XCIpLnRyaWdnZXIoXCJjaGFuZ2VcIikpfSxuLnByb3RvdHlwZS51bnNlbGVjdD1mdW5jdGlvbihpKXt2YXIgcj10aGlzO2lmKHRoaXMuJGVsZW1lbnQucHJvcChcIm11bHRpcGxlXCIpKXtpZihpLnNlbGVjdGVkPSExLG51bGwhPWkuZWxlbWVudCYmXCJvcHRpb25cIj09PWkuZWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkpcmV0dXJuIGkuZWxlbWVudC5zZWxlY3RlZD0hMSx2b2lkIHRoaXMuJGVsZW1lbnQudHJpZ2dlcihcImlucHV0XCIpLnRyaWdnZXIoXCJjaGFuZ2VcIik7dGhpcy5jdXJyZW50KGZ1bmN0aW9uKGUpe2Zvcih2YXIgdD1bXSxuPTA7bjxlLmxlbmd0aDtuKyspe3ZhciBzPWVbbl0uaWQ7cyE9PWkuaWQmJi0xPT09dC5pbmRleE9mKHMpJiZ0LnB1c2gocyl9ci4kZWxlbWVudC52YWwodCksci4kZWxlbWVudC50cmlnZ2VyKFwiaW5wdXRcIikudHJpZ2dlcihcImNoYW5nZVwiKX0pfX0sbi5wcm90b3R5cGUuYmluZD1mdW5jdGlvbihlLHQpe3ZhciBuPXRoaXM7KHRoaXMuY29udGFpbmVyPWUpLm9uKFwic2VsZWN0XCIsZnVuY3Rpb24oZSl7bi5zZWxlY3QoZS5kYXRhKX0pLGUub24oXCJ1bnNlbGVjdFwiLGZ1bmN0aW9uKGUpe24udW5zZWxlY3QoZS5kYXRhKX0pfSxuLnByb3RvdHlwZS5kZXN0cm95PWZ1bmN0aW9uKCl7dGhpcy4kZWxlbWVudC5maW5kKFwiKlwiKS5lYWNoKGZ1bmN0aW9uKCl7YS5SZW1vdmVEYXRhKHRoaXMpfSl9LG4ucHJvdG90eXBlLnF1ZXJ5PWZ1bmN0aW9uKHQsZSl7dmFyIG49W10scz10aGlzO3RoaXMuJGVsZW1lbnQuY2hpbGRyZW4oKS5lYWNoKGZ1bmN0aW9uKCl7dmFyIGU7XCJvcHRpb25cIiE9PXRoaXMudGFnTmFtZS50b0xvd2VyQ2FzZSgpJiZcIm9wdGdyb3VwXCIhPT10aGlzLnRhZ05hbWUudG9Mb3dlckNhc2UoKXx8KGU9bCh0aGlzKSxlPXMuaXRlbShlKSxudWxsIT09KGU9cy5tYXRjaGVzKHQsZSkpJiZuLnB1c2goZSkpfSksZSh7cmVzdWx0czpufSl9LG4ucHJvdG90eXBlLmFkZE9wdGlvbnM9ZnVuY3Rpb24oZSl7dGhpcy4kZWxlbWVudC5hcHBlbmQoZSl9LG4ucHJvdG90eXBlLm9wdGlvbj1mdW5jdGlvbihlKXt2YXIgdDtlLmNoaWxkcmVuPyh0PWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRncm91cFwiKSkubGFiZWw9ZS50ZXh0OnZvaWQgMCE9PSh0PWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIikpLnRleHRDb250ZW50P3QudGV4dENvbnRlbnQ9ZS50ZXh0OnQuaW5uZXJUZXh0PWUudGV4dCx2b2lkIDAhPT1lLmlkJiYodC52YWx1ZT1lLmlkKSxlLmRpc2FibGVkJiYodC5kaXNhYmxlZD0hMCksZS5zZWxlY3RlZCYmKHQuc2VsZWN0ZWQ9ITApLGUudGl0bGUmJih0LnRpdGxlPWUudGl0bGUpO2U9dGhpcy5fbm9ybWFsaXplSXRlbShlKTtyZXR1cm4gZS5lbGVtZW50PXQsYS5TdG9yZURhdGEodCxcImRhdGFcIixlKSxsKHQpfSxuLnByb3RvdHlwZS5pdGVtPWZ1bmN0aW9uKGUpe3ZhciB0PXt9O2lmKG51bGwhPSh0PWEuR2V0RGF0YShlWzBdLFwiZGF0YVwiKSkpcmV0dXJuIHQ7dmFyIG49ZVswXTtpZihcIm9wdGlvblwiPT09bi50YWdOYW1lLnRvTG93ZXJDYXNlKCkpdD17aWQ6ZS52YWwoKSx0ZXh0OmUudGV4dCgpLGRpc2FibGVkOmUucHJvcChcImRpc2FibGVkXCIpLHNlbGVjdGVkOmUucHJvcChcInNlbGVjdGVkXCIpLHRpdGxlOmUucHJvcChcInRpdGxlXCIpfTtlbHNlIGlmKFwib3B0Z3JvdXBcIj09PW4udGFnTmFtZS50b0xvd2VyQ2FzZSgpKXt0PXt0ZXh0OmUucHJvcChcImxhYmVsXCIpLGNoaWxkcmVuOltdLHRpdGxlOmUucHJvcChcInRpdGxlXCIpfTtmb3IodmFyIHM9ZS5jaGlsZHJlbihcIm9wdGlvblwiKSxpPVtdLHI9MDtyPHMubGVuZ3RoO3IrKyl7dmFyIG89bChzW3JdKSxvPXRoaXMuaXRlbShvKTtpLnB1c2gobyl9dC5jaGlsZHJlbj1pfXJldHVybih0PXRoaXMuX25vcm1hbGl6ZUl0ZW0odCkpLmVsZW1lbnQ9ZVswXSxhLlN0b3JlRGF0YShlWzBdLFwiZGF0YVwiLHQpLHR9LG4ucHJvdG90eXBlLl9ub3JtYWxpemVJdGVtPWZ1bmN0aW9uKGUpe2UhPT1PYmplY3QoZSkmJihlPXtpZDplLHRleHQ6ZX0pO3JldHVybiBudWxsIT0oZT1sLmV4dGVuZCh7fSx7dGV4dDpcIlwifSxlKSkuaWQmJihlLmlkPWUuaWQudG9TdHJpbmcoKSksbnVsbCE9ZS50ZXh0JiYoZS50ZXh0PWUudGV4dC50b1N0cmluZygpKSxudWxsPT1lLl9yZXN1bHRJZCYmZS5pZCYmbnVsbCE9dGhpcy5jb250YWluZXImJihlLl9yZXN1bHRJZD10aGlzLmdlbmVyYXRlUmVzdWx0SWQodGhpcy5jb250YWluZXIsZSkpLGwuZXh0ZW5kKHt9LHtzZWxlY3RlZDohMSxkaXNhYmxlZDohMX0sZSl9LG4ucHJvdG90eXBlLm1hdGNoZXM9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gdGhpcy5vcHRpb25zLmdldChcIm1hdGNoZXJcIikoZSx0KX0sbn0pLHUuZGVmaW5lKFwic2VsZWN0Mi9kYXRhL2FycmF5XCIsW1wiLi9zZWxlY3RcIixcIi4uL3V0aWxzXCIsXCJqcXVlcnlcIl0sZnVuY3Rpb24oZSx0LGMpe2Z1bmN0aW9uIHMoZSx0KXt0aGlzLl9kYXRhVG9Db252ZXJ0PXQuZ2V0KFwiZGF0YVwiKXx8W10scy5fX3N1cGVyX18uY29uc3RydWN0b3IuY2FsbCh0aGlzLGUsdCl9cmV0dXJuIHQuRXh0ZW5kKHMsZSkscy5wcm90b3R5cGUuYmluZD1mdW5jdGlvbihlLHQpe3MuX19zdXBlcl9fLmJpbmQuY2FsbCh0aGlzLGUsdCksdGhpcy5hZGRPcHRpb25zKHRoaXMuY29udmVydFRvT3B0aW9ucyh0aGlzLl9kYXRhVG9Db252ZXJ0KSl9LHMucHJvdG90eXBlLnNlbGVjdD1mdW5jdGlvbihuKXt2YXIgZT10aGlzLiRlbGVtZW50LmZpbmQoXCJvcHRpb25cIikuZmlsdGVyKGZ1bmN0aW9uKGUsdCl7cmV0dXJuIHQudmFsdWU9PW4uaWQudG9TdHJpbmcoKX0pOzA9PT1lLmxlbmd0aCYmKGU9dGhpcy5vcHRpb24obiksdGhpcy5hZGRPcHRpb25zKGUpKSxzLl9fc3VwZXJfXy5zZWxlY3QuY2FsbCh0aGlzLG4pfSxzLnByb3RvdHlwZS5jb252ZXJ0VG9PcHRpb25zPWZ1bmN0aW9uKGUpe3ZhciB0PXRoaXMsbj10aGlzLiRlbGVtZW50LmZpbmQoXCJvcHRpb25cIikscz1uLm1hcChmdW5jdGlvbigpe3JldHVybiB0Lml0ZW0oYyh0aGlzKSkuaWR9KS5nZXQoKSxpPVtdO2Zvcih2YXIgcj0wO3I8ZS5sZW5ndGg7cisrKXt2YXIgbyxhLGw9dGhpcy5fbm9ybWFsaXplSXRlbShlW3JdKTswPD1zLmluZGV4T2YobC5pZCk/KG89bi5maWx0ZXIoZnVuY3Rpb24oZSl7cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIGModGhpcykudmFsKCk9PWUuaWR9fShsKSksYT10aGlzLml0ZW0obyksYT1jLmV4dGVuZCghMCx7fSxsLGEpLGE9dGhpcy5vcHRpb24oYSksby5yZXBsYWNlV2l0aChhKSk6KGE9dGhpcy5vcHRpb24obCksbC5jaGlsZHJlbiYmKGw9dGhpcy5jb252ZXJ0VG9PcHRpb25zKGwuY2hpbGRyZW4pLGEuYXBwZW5kKGwpKSxpLnB1c2goYSkpfXJldHVybiBpfSxzfSksdS5kZWZpbmUoXCJzZWxlY3QyL2RhdGEvYWpheFwiLFtcIi4vYXJyYXlcIixcIi4uL3V0aWxzXCIsXCJqcXVlcnlcIl0sZnVuY3Rpb24oZSx0LHIpe2Z1bmN0aW9uIG4oZSx0KXt0aGlzLmFqYXhPcHRpb25zPXRoaXMuX2FwcGx5RGVmYXVsdHModC5nZXQoXCJhamF4XCIpKSxudWxsIT10aGlzLmFqYXhPcHRpb25zLnByb2Nlc3NSZXN1bHRzJiYodGhpcy5wcm9jZXNzUmVzdWx0cz10aGlzLmFqYXhPcHRpb25zLnByb2Nlc3NSZXN1bHRzKSxuLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMsZSx0KX1yZXR1cm4gdC5FeHRlbmQobixlKSxuLnByb3RvdHlwZS5fYXBwbHlEZWZhdWx0cz1mdW5jdGlvbihlKXt2YXIgdD17ZGF0YTpmdW5jdGlvbihlKXtyZXR1cm4gci5leHRlbmQoe30sZSx7cTplLnRlcm19KX0sdHJhbnNwb3J0OmZ1bmN0aW9uKGUsdCxuKXtlPXIuYWpheChlKTtyZXR1cm4gZS50aGVuKHQpLGUuZmFpbChuKSxlfX07cmV0dXJuIHIuZXh0ZW5kKHt9LHQsZSwhMCl9LG4ucHJvdG90eXBlLnByb2Nlc3NSZXN1bHRzPWZ1bmN0aW9uKGUpe3JldHVybiBlfSxuLnByb3RvdHlwZS5xdWVyeT1mdW5jdGlvbih0LG4pe3ZhciBzPXRoaXM7bnVsbCE9dGhpcy5fcmVxdWVzdCYmKFwiZnVuY3Rpb25cIj09dHlwZW9mIHRoaXMuX3JlcXVlc3QuYWJvcnQmJnRoaXMuX3JlcXVlc3QuYWJvcnQoKSx0aGlzLl9yZXF1ZXN0PW51bGwpO3ZhciBpPXIuZXh0ZW5kKHt0eXBlOlwiR0VUXCJ9LHRoaXMuYWpheE9wdGlvbnMpO2Z1bmN0aW9uIGUoKXt2YXIgZT1pLnRyYW5zcG9ydChpLGZ1bmN0aW9uKGUpe2U9cy5wcm9jZXNzUmVzdWx0cyhlLHQpO3Mub3B0aW9ucy5nZXQoXCJkZWJ1Z1wiKSYmd2luZG93LmNvbnNvbGUmJmNvbnNvbGUuZXJyb3ImJihlJiZlLnJlc3VsdHMmJkFycmF5LmlzQXJyYXkoZS5yZXN1bHRzKXx8Y29uc29sZS5lcnJvcihcIlNlbGVjdDI6IFRoZSBBSkFYIHJlc3VsdHMgZGlkIG5vdCByZXR1cm4gYW4gYXJyYXkgaW4gdGhlIGByZXN1bHRzYCBrZXkgb2YgdGhlIHJlc3BvbnNlLlwiKSksbihlKX0sZnVuY3Rpb24oKXtcInN0YXR1c1wiaW4gZSYmKDA9PT1lLnN0YXR1c3x8XCIwXCI9PT1lLnN0YXR1cyl8fHMudHJpZ2dlcihcInJlc3VsdHM6bWVzc2FnZVwiLHttZXNzYWdlOlwiZXJyb3JMb2FkaW5nXCJ9KX0pO3MuX3JlcXVlc3Q9ZX1cImZ1bmN0aW9uXCI9PXR5cGVvZiBpLnVybCYmKGkudXJsPWkudXJsLmNhbGwodGhpcy4kZWxlbWVudCx0KSksXCJmdW5jdGlvblwiPT10eXBlb2YgaS5kYXRhJiYoaS5kYXRhPWkuZGF0YS5jYWxsKHRoaXMuJGVsZW1lbnQsdCkpLHRoaXMuYWpheE9wdGlvbnMuZGVsYXkmJm51bGwhPXQudGVybT8odGhpcy5fcXVlcnlUaW1lb3V0JiZ3aW5kb3cuY2xlYXJUaW1lb3V0KHRoaXMuX3F1ZXJ5VGltZW91dCksdGhpcy5fcXVlcnlUaW1lb3V0PXdpbmRvdy5zZXRUaW1lb3V0KGUsdGhpcy5hamF4T3B0aW9ucy5kZWxheSkpOmUoKX0sbn0pLHUuZGVmaW5lKFwic2VsZWN0Mi9kYXRhL3RhZ3NcIixbXCJqcXVlcnlcIl0sZnVuY3Rpb24odCl7ZnVuY3Rpb24gZShlLHQsbil7dmFyIHM9bi5nZXQoXCJ0YWdzXCIpLGk9bi5nZXQoXCJjcmVhdGVUYWdcIik7dm9pZCAwIT09aSYmKHRoaXMuY3JlYXRlVGFnPWkpO2k9bi5nZXQoXCJpbnNlcnRUYWdcIik7aWYodm9pZCAwIT09aSYmKHRoaXMuaW5zZXJ0VGFnPWkpLGUuY2FsbCh0aGlzLHQsbiksQXJyYXkuaXNBcnJheShzKSlmb3IodmFyIHI9MDtyPHMubGVuZ3RoO3IrKyl7dmFyIG89c1tyXSxvPXRoaXMuX25vcm1hbGl6ZUl0ZW0obyksbz10aGlzLm9wdGlvbihvKTt0aGlzLiRlbGVtZW50LmFwcGVuZChvKX19cmV0dXJuIGUucHJvdG90eXBlLnF1ZXJ5PWZ1bmN0aW9uKGUsYyx1KXt2YXIgZD10aGlzO3RoaXMuX3JlbW92ZU9sZFRhZ3MoKSxudWxsIT1jLnRlcm0mJm51bGw9PWMucGFnZT9lLmNhbGwodGhpcyxjLGZ1bmN0aW9uIGUodCxuKXtmb3IodmFyIHM9dC5yZXN1bHRzLGk9MDtpPHMubGVuZ3RoO2krKyl7dmFyIHI9c1tpXSxvPW51bGwhPXIuY2hpbGRyZW4mJiFlKHtyZXN1bHRzOnIuY2hpbGRyZW59LCEwKTtpZigoci50ZXh0fHxcIlwiKS50b1VwcGVyQ2FzZSgpPT09KGMudGVybXx8XCJcIikudG9VcHBlckNhc2UoKXx8bylyZXR1cm4hbiYmKHQuZGF0YT1zLHZvaWQgdSh0KSl9aWYobilyZXR1cm4hMDt2YXIgYSxsPWQuY3JlYXRlVGFnKGMpO251bGwhPWwmJigoYT1kLm9wdGlvbihsKSkuYXR0cihcImRhdGEtc2VsZWN0Mi10YWdcIixcInRydWVcIiksZC5hZGRPcHRpb25zKFthXSksZC5pbnNlcnRUYWcocyxsKSksdC5yZXN1bHRzPXMsdSh0KX0pOmUuY2FsbCh0aGlzLGMsdSl9LGUucHJvdG90eXBlLmNyZWF0ZVRhZz1mdW5jdGlvbihlLHQpe2lmKG51bGw9PXQudGVybSlyZXR1cm4gbnVsbDt0PXQudGVybS50cmltKCk7cmV0dXJuXCJcIj09PXQ/bnVsbDp7aWQ6dCx0ZXh0OnR9fSxlLnByb3RvdHlwZS5pbnNlcnRUYWc9ZnVuY3Rpb24oZSx0LG4pe3QudW5zaGlmdChuKX0sZS5wcm90b3R5cGUuX3JlbW92ZU9sZFRhZ3M9ZnVuY3Rpb24oZSl7dGhpcy4kZWxlbWVudC5maW5kKFwib3B0aW9uW2RhdGEtc2VsZWN0Mi10YWddXCIpLmVhY2goZnVuY3Rpb24oKXt0aGlzLnNlbGVjdGVkfHx0KHRoaXMpLnJlbW92ZSgpfSl9LGV9KSx1LmRlZmluZShcInNlbGVjdDIvZGF0YS90b2tlbml6ZXJcIixbXCJqcXVlcnlcIl0sZnVuY3Rpb24oYyl7ZnVuY3Rpb24gZShlLHQsbil7dmFyIHM9bi5nZXQoXCJ0b2tlbml6ZXJcIik7dm9pZCAwIT09cyYmKHRoaXMudG9rZW5pemVyPXMpLGUuY2FsbCh0aGlzLHQsbil9cmV0dXJuIGUucHJvdG90eXBlLmJpbmQ9ZnVuY3Rpb24oZSx0LG4pe2UuY2FsbCh0aGlzLHQsbiksdGhpcy4kc2VhcmNoPXQuZHJvcGRvd24uJHNlYXJjaHx8dC5zZWxlY3Rpb24uJHNlYXJjaHx8bi5maW5kKFwiLnNlbGVjdDItc2VhcmNoX19maWVsZFwiKX0sZS5wcm90b3R5cGUucXVlcnk9ZnVuY3Rpb24oZSx0LG4pe3ZhciBzPXRoaXM7dC50ZXJtPXQudGVybXx8XCJcIjt2YXIgaT10aGlzLnRva2VuaXplcih0LHRoaXMub3B0aW9ucyxmdW5jdGlvbihlKXt2YXIgdCxuPXMuX25vcm1hbGl6ZUl0ZW0oZSk7cy4kZWxlbWVudC5maW5kKFwib3B0aW9uXCIpLmZpbHRlcihmdW5jdGlvbigpe3JldHVybiBjKHRoaXMpLnZhbCgpPT09bi5pZH0pLmxlbmd0aHx8KCh0PXMub3B0aW9uKG4pKS5hdHRyKFwiZGF0YS1zZWxlY3QyLXRhZ1wiLCEwKSxzLl9yZW1vdmVPbGRUYWdzKCkscy5hZGRPcHRpb25zKFt0XSkpLHQ9bixzLnRyaWdnZXIoXCJzZWxlY3RcIix7ZGF0YTp0fSl9KTtpLnRlcm0hPT10LnRlcm0mJih0aGlzLiRzZWFyY2gubGVuZ3RoJiYodGhpcy4kc2VhcmNoLnZhbChpLnRlcm0pLHRoaXMuJHNlYXJjaC50cmlnZ2VyKFwiZm9jdXNcIikpLHQudGVybT1pLnRlcm0pLGUuY2FsbCh0aGlzLHQsbil9LGUucHJvdG90eXBlLnRva2VuaXplcj1mdW5jdGlvbihlLHQsbixzKXtmb3IodmFyIGk9bi5nZXQoXCJ0b2tlblNlcGFyYXRvcnNcIil8fFtdLHI9dC50ZXJtLG89MCxhPXRoaXMuY3JlYXRlVGFnfHxmdW5jdGlvbihlKXtyZXR1cm57aWQ6ZS50ZXJtLHRleHQ6ZS50ZXJtfX07bzxyLmxlbmd0aDspe3ZhciBsPXJbb107LTEhPT1pLmluZGV4T2YobCk/KGw9ci5zdWJzdHIoMCxvKSxudWxsIT0obD1hKGMuZXh0ZW5kKHt9LHQse3Rlcm06bH0pKSk/KHMobCkscj1yLnN1YnN0cihvKzEpfHxcIlwiLG89MCk6bysrKTpvKyt9cmV0dXJue3Rlcm06cn19LGV9KSx1LmRlZmluZShcInNlbGVjdDIvZGF0YS9taW5pbXVtSW5wdXRMZW5ndGhcIixbXSxmdW5jdGlvbigpe2Z1bmN0aW9uIGUoZSx0LG4pe3RoaXMubWluaW11bUlucHV0TGVuZ3RoPW4uZ2V0KFwibWluaW11bUlucHV0TGVuZ3RoXCIpLGUuY2FsbCh0aGlzLHQsbil9cmV0dXJuIGUucHJvdG90eXBlLnF1ZXJ5PWZ1bmN0aW9uKGUsdCxuKXt0LnRlcm09dC50ZXJtfHxcIlwiLHQudGVybS5sZW5ndGg8dGhpcy5taW5pbXVtSW5wdXRMZW5ndGg/dGhpcy50cmlnZ2VyKFwicmVzdWx0czptZXNzYWdlXCIse21lc3NhZ2U6XCJpbnB1dFRvb1Nob3J0XCIsYXJnczp7bWluaW11bTp0aGlzLm1pbmltdW1JbnB1dExlbmd0aCxpbnB1dDp0LnRlcm0scGFyYW1zOnR9fSk6ZS5jYWxsKHRoaXMsdCxuKX0sZX0pLHUuZGVmaW5lKFwic2VsZWN0Mi9kYXRhL21heGltdW1JbnB1dExlbmd0aFwiLFtdLGZ1bmN0aW9uKCl7ZnVuY3Rpb24gZShlLHQsbil7dGhpcy5tYXhpbXVtSW5wdXRMZW5ndGg9bi5nZXQoXCJtYXhpbXVtSW5wdXRMZW5ndGhcIiksZS5jYWxsKHRoaXMsdCxuKX1yZXR1cm4gZS5wcm90b3R5cGUucXVlcnk9ZnVuY3Rpb24oZSx0LG4pe3QudGVybT10LnRlcm18fFwiXCIsMDx0aGlzLm1heGltdW1JbnB1dExlbmd0aCYmdC50ZXJtLmxlbmd0aD50aGlzLm1heGltdW1JbnB1dExlbmd0aD90aGlzLnRyaWdnZXIoXCJyZXN1bHRzOm1lc3NhZ2VcIix7bWVzc2FnZTpcImlucHV0VG9vTG9uZ1wiLGFyZ3M6e21heGltdW06dGhpcy5tYXhpbXVtSW5wdXRMZW5ndGgsaW5wdXQ6dC50ZXJtLHBhcmFtczp0fX0pOmUuY2FsbCh0aGlzLHQsbil9LGV9KSx1LmRlZmluZShcInNlbGVjdDIvZGF0YS9tYXhpbXVtU2VsZWN0aW9uTGVuZ3RoXCIsW10sZnVuY3Rpb24oKXtmdW5jdGlvbiBlKGUsdCxuKXt0aGlzLm1heGltdW1TZWxlY3Rpb25MZW5ndGg9bi5nZXQoXCJtYXhpbXVtU2VsZWN0aW9uTGVuZ3RoXCIpLGUuY2FsbCh0aGlzLHQsbil9cmV0dXJuIGUucHJvdG90eXBlLmJpbmQ9ZnVuY3Rpb24oZSx0LG4pe3ZhciBzPXRoaXM7ZS5jYWxsKHRoaXMsdCxuKSx0Lm9uKFwic2VsZWN0XCIsZnVuY3Rpb24oKXtzLl9jaGVja0lmTWF4aW11bVNlbGVjdGVkKCl9KX0sZS5wcm90b3R5cGUucXVlcnk9ZnVuY3Rpb24oZSx0LG4pe3ZhciBzPXRoaXM7dGhpcy5fY2hlY2tJZk1heGltdW1TZWxlY3RlZChmdW5jdGlvbigpe2UuY2FsbChzLHQsbil9KX0sZS5wcm90b3R5cGUuX2NoZWNrSWZNYXhpbXVtU2VsZWN0ZWQ9ZnVuY3Rpb24oZSx0KXt2YXIgbj10aGlzO3RoaXMuY3VycmVudChmdW5jdGlvbihlKXtlPW51bGwhPWU/ZS5sZW5ndGg6MDswPG4ubWF4aW11bVNlbGVjdGlvbkxlbmd0aCYmZT49bi5tYXhpbXVtU2VsZWN0aW9uTGVuZ3RoP24udHJpZ2dlcihcInJlc3VsdHM6bWVzc2FnZVwiLHttZXNzYWdlOlwibWF4aW11bVNlbGVjdGVkXCIsYXJnczp7bWF4aW11bTpuLm1heGltdW1TZWxlY3Rpb25MZW5ndGh9fSk6dCYmdCgpfSl9LGV9KSx1LmRlZmluZShcInNlbGVjdDIvZHJvcGRvd25cIixbXCJqcXVlcnlcIixcIi4vdXRpbHNcIl0sZnVuY3Rpb24odCxlKXtmdW5jdGlvbiBuKGUsdCl7dGhpcy4kZWxlbWVudD1lLHRoaXMub3B0aW9ucz10LG4uX19zdXBlcl9fLmNvbnN0cnVjdG9yLmNhbGwodGhpcyl9cmV0dXJuIGUuRXh0ZW5kKG4sZS5PYnNlcnZhYmxlKSxuLnByb3RvdHlwZS5yZW5kZXI9ZnVuY3Rpb24oKXt2YXIgZT10KCc8c3BhbiBjbGFzcz1cInNlbGVjdDItZHJvcGRvd25cIj48c3BhbiBjbGFzcz1cInNlbGVjdDItcmVzdWx0c1wiPjwvc3Bhbj48L3NwYW4+Jyk7cmV0dXJuIGUuYXR0cihcImRpclwiLHRoaXMub3B0aW9ucy5nZXQoXCJkaXJcIikpLHRoaXMuJGRyb3Bkb3duPWV9LG4ucHJvdG90eXBlLmJpbmQ9ZnVuY3Rpb24oKXt9LG4ucHJvdG90eXBlLnBvc2l0aW9uPWZ1bmN0aW9uKGUsdCl7fSxuLnByb3RvdHlwZS5kZXN0cm95PWZ1bmN0aW9uKCl7dGhpcy4kZHJvcGRvd24ucmVtb3ZlKCl9LG59KSx1LmRlZmluZShcInNlbGVjdDIvZHJvcGRvd24vc2VhcmNoXCIsW1wianF1ZXJ5XCJdLGZ1bmN0aW9uKHIpe2Z1bmN0aW9uIGUoKXt9cmV0dXJuIGUucHJvdG90eXBlLnJlbmRlcj1mdW5jdGlvbihlKXt2YXIgdD1lLmNhbGwodGhpcyksbj10aGlzLm9wdGlvbnMuZ2V0KFwidHJhbnNsYXRpb25zXCIpLmdldChcInNlYXJjaFwiKSxlPXIoJzxzcGFuIGNsYXNzPVwic2VsZWN0Mi1zZWFyY2ggc2VsZWN0Mi1zZWFyY2gtLWRyb3Bkb3duXCI+PGlucHV0IGNsYXNzPVwic2VsZWN0Mi1zZWFyY2hfX2ZpZWxkXCIgdHlwZT1cInNlYXJjaFwiIHRhYmluZGV4PVwiLTFcIiBhdXRvY29ycmVjdD1cIm9mZlwiIGF1dG9jYXBpdGFsaXplPVwibm9uZVwiIHNwZWxsY2hlY2s9XCJmYWxzZVwiIHJvbGU9XCJzZWFyY2hib3hcIiBhcmlhLWF1dG9jb21wbGV0ZT1cImxpc3RcIiAvPjwvc3Bhbj4nKTtyZXR1cm4gdGhpcy4kc2VhcmNoQ29udGFpbmVyPWUsdGhpcy4kc2VhcmNoPWUuZmluZChcImlucHV0XCIpLHRoaXMuJHNlYXJjaC5wcm9wKFwiYXV0b2NvbXBsZXRlXCIsdGhpcy5vcHRpb25zLmdldChcImF1dG9jb21wbGV0ZVwiKSksdGhpcy4kc2VhcmNoLmF0dHIoXCJhcmlhLWxhYmVsXCIsbigpKSx0LnByZXBlbmQoZSksdH0sZS5wcm90b3R5cGUuYmluZD1mdW5jdGlvbihlLHQsbil7dmFyIHM9dGhpcyxpPXQuaWQrXCItcmVzdWx0c1wiO2UuY2FsbCh0aGlzLHQsbiksdGhpcy4kc2VhcmNoLm9uKFwia2V5ZG93blwiLGZ1bmN0aW9uKGUpe3MudHJpZ2dlcihcImtleXByZXNzXCIsZSkscy5fa2V5VXBQcmV2ZW50ZWQ9ZS5pc0RlZmF1bHRQcmV2ZW50ZWQoKX0pLHRoaXMuJHNlYXJjaC5vbihcImlucHV0XCIsZnVuY3Rpb24oZSl7cih0aGlzKS5vZmYoXCJrZXl1cFwiKX0pLHRoaXMuJHNlYXJjaC5vbihcImtleXVwIGlucHV0XCIsZnVuY3Rpb24oZSl7cy5oYW5kbGVTZWFyY2goZSl9KSx0Lm9uKFwib3BlblwiLGZ1bmN0aW9uKCl7cy4kc2VhcmNoLmF0dHIoXCJ0YWJpbmRleFwiLDApLHMuJHNlYXJjaC5hdHRyKFwiYXJpYS1jb250cm9sc1wiLGkpLHMuJHNlYXJjaC50cmlnZ2VyKFwiZm9jdXNcIiksd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKXtzLiRzZWFyY2gudHJpZ2dlcihcImZvY3VzXCIpfSwwKX0pLHQub24oXCJjbG9zZVwiLGZ1bmN0aW9uKCl7cy4kc2VhcmNoLmF0dHIoXCJ0YWJpbmRleFwiLC0xKSxzLiRzZWFyY2gucmVtb3ZlQXR0cihcImFyaWEtY29udHJvbHNcIikscy4kc2VhcmNoLnJlbW92ZUF0dHIoXCJhcmlhLWFjdGl2ZWRlc2NlbmRhbnRcIikscy4kc2VhcmNoLnZhbChcIlwiKSxzLiRzZWFyY2gudHJpZ2dlcihcImJsdXJcIil9KSx0Lm9uKFwiZm9jdXNcIixmdW5jdGlvbigpe3QuaXNPcGVuKCl8fHMuJHNlYXJjaC50cmlnZ2VyKFwiZm9jdXNcIil9KSx0Lm9uKFwicmVzdWx0czphbGxcIixmdW5jdGlvbihlKXtudWxsIT1lLnF1ZXJ5LnRlcm0mJlwiXCIhPT1lLnF1ZXJ5LnRlcm18fChzLnNob3dTZWFyY2goZSk/cy4kc2VhcmNoQ29udGFpbmVyWzBdLmNsYXNzTGlzdC5yZW1vdmUoXCJzZWxlY3QyLXNlYXJjaC0taGlkZVwiKTpzLiRzZWFyY2hDb250YWluZXJbMF0uY2xhc3NMaXN0LmFkZChcInNlbGVjdDItc2VhcmNoLS1oaWRlXCIpKX0pLHQub24oXCJyZXN1bHRzOmZvY3VzXCIsZnVuY3Rpb24oZSl7ZS5kYXRhLl9yZXN1bHRJZD9zLiRzZWFyY2guYXR0cihcImFyaWEtYWN0aXZlZGVzY2VuZGFudFwiLGUuZGF0YS5fcmVzdWx0SWQpOnMuJHNlYXJjaC5yZW1vdmVBdHRyKFwiYXJpYS1hY3RpdmVkZXNjZW5kYW50XCIpfSl9LGUucHJvdG90eXBlLmhhbmRsZVNlYXJjaD1mdW5jdGlvbihlKXt2YXIgdDt0aGlzLl9rZXlVcFByZXZlbnRlZHx8KHQ9dGhpcy4kc2VhcmNoLnZhbCgpLHRoaXMudHJpZ2dlcihcInF1ZXJ5XCIse3Rlcm06dH0pKSx0aGlzLl9rZXlVcFByZXZlbnRlZD0hMX0sZS5wcm90b3R5cGUuc2hvd1NlYXJjaD1mdW5jdGlvbihlLHQpe3JldHVybiEwfSxlfSksdS5kZWZpbmUoXCJzZWxlY3QyL2Ryb3Bkb3duL2hpZGVQbGFjZWhvbGRlclwiLFtdLGZ1bmN0aW9uKCl7ZnVuY3Rpb24gZShlLHQsbixzKXt0aGlzLnBsYWNlaG9sZGVyPXRoaXMubm9ybWFsaXplUGxhY2Vob2xkZXIobi5nZXQoXCJwbGFjZWhvbGRlclwiKSksZS5jYWxsKHRoaXMsdCxuLHMpfXJldHVybiBlLnByb3RvdHlwZS5hcHBlbmQ9ZnVuY3Rpb24oZSx0KXt0LnJlc3VsdHM9dGhpcy5yZW1vdmVQbGFjZWhvbGRlcih0LnJlc3VsdHMpLGUuY2FsbCh0aGlzLHQpfSxlLnByb3RvdHlwZS5ub3JtYWxpemVQbGFjZWhvbGRlcj1mdW5jdGlvbihlLHQpe3JldHVybiB0PVwic3RyaW5nXCI9PXR5cGVvZiB0P3tpZDpcIlwiLHRleHQ6dH06dH0sZS5wcm90b3R5cGUucmVtb3ZlUGxhY2Vob2xkZXI9ZnVuY3Rpb24oZSx0KXtmb3IodmFyIG49dC5zbGljZSgwKSxzPXQubGVuZ3RoLTE7MDw9cztzLS0pe3ZhciBpPXRbc107dGhpcy5wbGFjZWhvbGRlci5pZD09PWkuaWQmJm4uc3BsaWNlKHMsMSl9cmV0dXJuIG59LGV9KSx1LmRlZmluZShcInNlbGVjdDIvZHJvcGRvd24vaW5maW5pdGVTY3JvbGxcIixbXCJqcXVlcnlcIl0sZnVuY3Rpb24obil7ZnVuY3Rpb24gZShlLHQsbixzKXt0aGlzLmxhc3RQYXJhbXM9e30sZS5jYWxsKHRoaXMsdCxuLHMpLHRoaXMuJGxvYWRpbmdNb3JlPXRoaXMuY3JlYXRlTG9hZGluZ01vcmUoKSx0aGlzLmxvYWRpbmc9ITF9cmV0dXJuIGUucHJvdG90eXBlLmFwcGVuZD1mdW5jdGlvbihlLHQpe3RoaXMuJGxvYWRpbmdNb3JlLnJlbW92ZSgpLHRoaXMubG9hZGluZz0hMSxlLmNhbGwodGhpcyx0KSx0aGlzLnNob3dMb2FkaW5nTW9yZSh0KSYmKHRoaXMuJHJlc3VsdHMuYXBwZW5kKHRoaXMuJGxvYWRpbmdNb3JlKSx0aGlzLmxvYWRNb3JlSWZOZWVkZWQoKSl9LGUucHJvdG90eXBlLmJpbmQ9ZnVuY3Rpb24oZSx0LG4pe3ZhciBzPXRoaXM7ZS5jYWxsKHRoaXMsdCxuKSx0Lm9uKFwicXVlcnlcIixmdW5jdGlvbihlKXtzLmxhc3RQYXJhbXM9ZSxzLmxvYWRpbmc9ITB9KSx0Lm9uKFwicXVlcnk6YXBwZW5kXCIsZnVuY3Rpb24oZSl7cy5sYXN0UGFyYW1zPWUscy5sb2FkaW5nPSEwfSksdGhpcy4kcmVzdWx0cy5vbihcInNjcm9sbFwiLHRoaXMubG9hZE1vcmVJZk5lZWRlZC5iaW5kKHRoaXMpKX0sZS5wcm90b3R5cGUubG9hZE1vcmVJZk5lZWRlZD1mdW5jdGlvbigpe3ZhciBlPW4uY29udGFpbnMoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LHRoaXMuJGxvYWRpbmdNb3JlWzBdKTshdGhpcy5sb2FkaW5nJiZlJiYoZT10aGlzLiRyZXN1bHRzLm9mZnNldCgpLnRvcCt0aGlzLiRyZXN1bHRzLm91dGVySGVpZ2h0KCExKSx0aGlzLiRsb2FkaW5nTW9yZS5vZmZzZXQoKS50b3ArdGhpcy4kbG9hZGluZ01vcmUub3V0ZXJIZWlnaHQoITEpPD1lKzUwJiZ0aGlzLmxvYWRNb3JlKCkpfSxlLnByb3RvdHlwZS5sb2FkTW9yZT1mdW5jdGlvbigpe3RoaXMubG9hZGluZz0hMDt2YXIgZT1uLmV4dGVuZCh7fSx7cGFnZToxfSx0aGlzLmxhc3RQYXJhbXMpO2UucGFnZSsrLHRoaXMudHJpZ2dlcihcInF1ZXJ5OmFwcGVuZFwiLGUpfSxlLnByb3RvdHlwZS5zaG93TG9hZGluZ01vcmU9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gdC5wYWdpbmF0aW9uJiZ0LnBhZ2luYXRpb24ubW9yZX0sZS5wcm90b3R5cGUuY3JlYXRlTG9hZGluZ01vcmU9ZnVuY3Rpb24oKXt2YXIgZT1uKCc8bGkgY2xhc3M9XCJzZWxlY3QyLXJlc3VsdHNfX29wdGlvbiBzZWxlY3QyLXJlc3VsdHNfX29wdGlvbi0tbG9hZC1tb3JlXCJyb2xlPVwib3B0aW9uXCIgYXJpYS1kaXNhYmxlZD1cInRydWVcIj48L2xpPicpLHQ9dGhpcy5vcHRpb25zLmdldChcInRyYW5zbGF0aW9uc1wiKS5nZXQoXCJsb2FkaW5nTW9yZVwiKTtyZXR1cm4gZS5odG1sKHQodGhpcy5sYXN0UGFyYW1zKSksZX0sZX0pLHUuZGVmaW5lKFwic2VsZWN0Mi9kcm9wZG93bi9hdHRhY2hCb2R5XCIsW1wianF1ZXJ5XCIsXCIuLi91dGlsc1wiXSxmdW5jdGlvbih1LG8pe2Z1bmN0aW9uIGUoZSx0LG4pe3RoaXMuJGRyb3Bkb3duUGFyZW50PXUobi5nZXQoXCJkcm9wZG93blBhcmVudFwiKXx8ZG9jdW1lbnQuYm9keSksZS5jYWxsKHRoaXMsdCxuKX1yZXR1cm4gZS5wcm90b3R5cGUuYmluZD1mdW5jdGlvbihlLHQsbil7dmFyIHM9dGhpcztlLmNhbGwodGhpcyx0LG4pLHQub24oXCJvcGVuXCIsZnVuY3Rpb24oKXtzLl9zaG93RHJvcGRvd24oKSxzLl9hdHRhY2hQb3NpdGlvbmluZ0hhbmRsZXIodCkscy5fYmluZENvbnRhaW5lclJlc3VsdEhhbmRsZXJzKHQpfSksdC5vbihcImNsb3NlXCIsZnVuY3Rpb24oKXtzLl9oaWRlRHJvcGRvd24oKSxzLl9kZXRhY2hQb3NpdGlvbmluZ0hhbmRsZXIodCl9KSx0aGlzLiRkcm9wZG93bkNvbnRhaW5lci5vbihcIm1vdXNlZG93blwiLGZ1bmN0aW9uKGUpe2Uuc3RvcFByb3BhZ2F0aW9uKCl9KX0sZS5wcm90b3R5cGUuZGVzdHJveT1mdW5jdGlvbihlKXtlLmNhbGwodGhpcyksdGhpcy4kZHJvcGRvd25Db250YWluZXIucmVtb3ZlKCl9LGUucHJvdG90eXBlLnBvc2l0aW9uPWZ1bmN0aW9uKGUsdCxuKXt0LmF0dHIoXCJjbGFzc1wiLG4uYXR0cihcImNsYXNzXCIpKSx0WzBdLmNsYXNzTGlzdC5yZW1vdmUoXCJzZWxlY3QyXCIpLHRbMF0uY2xhc3NMaXN0LmFkZChcInNlbGVjdDItY29udGFpbmVyLS1vcGVuXCIpLHQuY3NzKHtwb3NpdGlvbjpcImFic29sdXRlXCIsdG9wOi05OTk5OTl9KSx0aGlzLiRjb250YWluZXI9bn0sZS5wcm90b3R5cGUucmVuZGVyPWZ1bmN0aW9uKGUpe3ZhciB0PXUoXCI8c3Bhbj48L3NwYW4+XCIpLGU9ZS5jYWxsKHRoaXMpO3JldHVybiB0LmFwcGVuZChlKSx0aGlzLiRkcm9wZG93bkNvbnRhaW5lcj10fSxlLnByb3RvdHlwZS5faGlkZURyb3Bkb3duPWZ1bmN0aW9uKGUpe3RoaXMuJGRyb3Bkb3duQ29udGFpbmVyLmRldGFjaCgpfSxlLnByb3RvdHlwZS5fYmluZENvbnRhaW5lclJlc3VsdEhhbmRsZXJzPWZ1bmN0aW9uKGUsdCl7dmFyIG47dGhpcy5fY29udGFpbmVyUmVzdWx0c0hhbmRsZXJzQm91bmR8fChuPXRoaXMsdC5vbihcInJlc3VsdHM6YWxsXCIsZnVuY3Rpb24oKXtuLl9wb3NpdGlvbkRyb3Bkb3duKCksbi5fcmVzaXplRHJvcGRvd24oKX0pLHQub24oXCJyZXN1bHRzOmFwcGVuZFwiLGZ1bmN0aW9uKCl7bi5fcG9zaXRpb25Ecm9wZG93bigpLG4uX3Jlc2l6ZURyb3Bkb3duKCl9KSx0Lm9uKFwicmVzdWx0czptZXNzYWdlXCIsZnVuY3Rpb24oKXtuLl9wb3NpdGlvbkRyb3Bkb3duKCksbi5fcmVzaXplRHJvcGRvd24oKX0pLHQub24oXCJzZWxlY3RcIixmdW5jdGlvbigpe24uX3Bvc2l0aW9uRHJvcGRvd24oKSxuLl9yZXNpemVEcm9wZG93bigpfSksdC5vbihcInVuc2VsZWN0XCIsZnVuY3Rpb24oKXtuLl9wb3NpdGlvbkRyb3Bkb3duKCksbi5fcmVzaXplRHJvcGRvd24oKX0pLHRoaXMuX2NvbnRhaW5lclJlc3VsdHNIYW5kbGVyc0JvdW5kPSEwKX0sZS5wcm90b3R5cGUuX2F0dGFjaFBvc2l0aW9uaW5nSGFuZGxlcj1mdW5jdGlvbihlLHQpe3ZhciBuPXRoaXMscz1cInNjcm9sbC5zZWxlY3QyLlwiK3QuaWQsaT1cInJlc2l6ZS5zZWxlY3QyLlwiK3QuaWQscj1cIm9yaWVudGF0aW9uY2hhbmdlLnNlbGVjdDIuXCIrdC5pZCx0PXRoaXMuJGNvbnRhaW5lci5wYXJlbnRzKCkuZmlsdGVyKG8uaGFzU2Nyb2xsKTt0LmVhY2goZnVuY3Rpb24oKXtvLlN0b3JlRGF0YSh0aGlzLFwic2VsZWN0Mi1zY3JvbGwtcG9zaXRpb25cIix7eDp1KHRoaXMpLnNjcm9sbExlZnQoKSx5OnUodGhpcykuc2Nyb2xsVG9wKCl9KX0pLHQub24ocyxmdW5jdGlvbihlKXt2YXIgdD1vLkdldERhdGEodGhpcyxcInNlbGVjdDItc2Nyb2xsLXBvc2l0aW9uXCIpO3UodGhpcykuc2Nyb2xsVG9wKHQueSl9KSx1KHdpbmRvdykub24ocytcIiBcIitpK1wiIFwiK3IsZnVuY3Rpb24oZSl7bi5fcG9zaXRpb25Ecm9wZG93bigpLG4uX3Jlc2l6ZURyb3Bkb3duKCl9KX0sZS5wcm90b3R5cGUuX2RldGFjaFBvc2l0aW9uaW5nSGFuZGxlcj1mdW5jdGlvbihlLHQpe3ZhciBuPVwic2Nyb2xsLnNlbGVjdDIuXCIrdC5pZCxzPVwicmVzaXplLnNlbGVjdDIuXCIrdC5pZCx0PVwib3JpZW50YXRpb25jaGFuZ2Uuc2VsZWN0Mi5cIit0LmlkO3RoaXMuJGNvbnRhaW5lci5wYXJlbnRzKCkuZmlsdGVyKG8uaGFzU2Nyb2xsKS5vZmYobiksdSh3aW5kb3cpLm9mZihuK1wiIFwiK3MrXCIgXCIrdCl9LGUucHJvdG90eXBlLl9wb3NpdGlvbkRyb3Bkb3duPWZ1bmN0aW9uKCl7dmFyIGU9dSh3aW5kb3cpLHQ9dGhpcy4kZHJvcGRvd25bMF0uY2xhc3NMaXN0LmNvbnRhaW5zKFwic2VsZWN0Mi1kcm9wZG93bi0tYWJvdmVcIiksbj10aGlzLiRkcm9wZG93blswXS5jbGFzc0xpc3QuY29udGFpbnMoXCJzZWxlY3QyLWRyb3Bkb3duLS1iZWxvd1wiKSxzPW51bGwsaT10aGlzLiRjb250YWluZXIub2Zmc2V0KCk7aS5ib3R0b209aS50b3ArdGhpcy4kY29udGFpbmVyLm91dGVySGVpZ2h0KCExKTt2YXIgcj17aGVpZ2h0OnRoaXMuJGNvbnRhaW5lci5vdXRlckhlaWdodCghMSl9O3IudG9wPWkudG9wLHIuYm90dG9tPWkudG9wK3IuaGVpZ2h0O3ZhciBvPXRoaXMuJGRyb3Bkb3duLm91dGVySGVpZ2h0KCExKSxhPWUuc2Nyb2xsVG9wKCksbD1lLnNjcm9sbFRvcCgpK2UuaGVpZ2h0KCksYz1hPGkudG9wLW8sZT1sPmkuYm90dG9tK28sYT17bGVmdDppLmxlZnQsdG9wOnIuYm90dG9tfSxsPXRoaXMuJGRyb3Bkb3duUGFyZW50O1wic3RhdGljXCI9PT1sLmNzcyhcInBvc2l0aW9uXCIpJiYobD1sLm9mZnNldFBhcmVudCgpKTtpPXt0b3A6MCxsZWZ0OjB9Oyh1LmNvbnRhaW5zKGRvY3VtZW50LmJvZHksbFswXSl8fGxbMF0uaXNDb25uZWN0ZWQpJiYoaT1sLm9mZnNldCgpKSxhLnRvcC09aS50b3AsYS5sZWZ0LT1pLmxlZnQsdHx8bnx8KHM9XCJiZWxvd1wiKSxlfHwhY3x8dD8hYyYmZSYmdCYmKHM9XCJiZWxvd1wiKTpzPVwiYWJvdmVcIiwoXCJhYm92ZVwiPT1zfHx0JiZcImJlbG93XCIhPT1zKSYmKGEudG9wPXIudG9wLWkudG9wLW8pLG51bGwhPXMmJih0aGlzLiRkcm9wZG93blswXS5jbGFzc0xpc3QucmVtb3ZlKFwic2VsZWN0Mi1kcm9wZG93bi0tYmVsb3dcIiksdGhpcy4kZHJvcGRvd25bMF0uY2xhc3NMaXN0LnJlbW92ZShcInNlbGVjdDItZHJvcGRvd24tLWFib3ZlXCIpLHRoaXMuJGRyb3Bkb3duWzBdLmNsYXNzTGlzdC5hZGQoXCJzZWxlY3QyLWRyb3Bkb3duLS1cIitzKSx0aGlzLiRjb250YWluZXJbMF0uY2xhc3NMaXN0LnJlbW92ZShcInNlbGVjdDItY29udGFpbmVyLS1iZWxvd1wiKSx0aGlzLiRjb250YWluZXJbMF0uY2xhc3NMaXN0LnJlbW92ZShcInNlbGVjdDItY29udGFpbmVyLS1hYm92ZVwiKSx0aGlzLiRjb250YWluZXJbMF0uY2xhc3NMaXN0LmFkZChcInNlbGVjdDItY29udGFpbmVyLS1cIitzKSksdGhpcy4kZHJvcGRvd25Db250YWluZXIuY3NzKGEpfSxlLnByb3RvdHlwZS5fcmVzaXplRHJvcGRvd249ZnVuY3Rpb24oKXt2YXIgZT17d2lkdGg6dGhpcy4kY29udGFpbmVyLm91dGVyV2lkdGgoITEpK1wicHhcIn07dGhpcy5vcHRpb25zLmdldChcImRyb3Bkb3duQXV0b1dpZHRoXCIpJiYoZS5taW5XaWR0aD1lLndpZHRoLGUucG9zaXRpb249XCJyZWxhdGl2ZVwiLGUud2lkdGg9XCJhdXRvXCIpLHRoaXMuJGRyb3Bkb3duLmNzcyhlKX0sZS5wcm90b3R5cGUuX3Nob3dEcm9wZG93bj1mdW5jdGlvbihlKXt0aGlzLiRkcm9wZG93bkNvbnRhaW5lci5hcHBlbmRUbyh0aGlzLiRkcm9wZG93blBhcmVudCksdGhpcy5fcG9zaXRpb25Ecm9wZG93bigpLHRoaXMuX3Jlc2l6ZURyb3Bkb3duKCl9LGV9KSx1LmRlZmluZShcInNlbGVjdDIvZHJvcGRvd24vbWluaW11bVJlc3VsdHNGb3JTZWFyY2hcIixbXSxmdW5jdGlvbigpe2Z1bmN0aW9uIGUoZSx0LG4scyl7dGhpcy5taW5pbXVtUmVzdWx0c0ZvclNlYXJjaD1uLmdldChcIm1pbmltdW1SZXN1bHRzRm9yU2VhcmNoXCIpLHRoaXMubWluaW11bVJlc3VsdHNGb3JTZWFyY2g8MCYmKHRoaXMubWluaW11bVJlc3VsdHNGb3JTZWFyY2g9MS8wKSxlLmNhbGwodGhpcyx0LG4scyl9cmV0dXJuIGUucHJvdG90eXBlLnNob3dTZWFyY2g9ZnVuY3Rpb24oZSx0KXtyZXR1cm4hKGZ1bmN0aW9uIGUodCl7Zm9yKHZhciBuPTAscz0wO3M8dC5sZW5ndGg7cysrKXt2YXIgaT10W3NdO2kuY2hpbGRyZW4/bis9ZShpLmNoaWxkcmVuKTpuKyt9cmV0dXJuIG59KHQuZGF0YS5yZXN1bHRzKTx0aGlzLm1pbmltdW1SZXN1bHRzRm9yU2VhcmNoKSYmZS5jYWxsKHRoaXMsdCl9LGV9KSx1LmRlZmluZShcInNlbGVjdDIvZHJvcGRvd24vc2VsZWN0T25DbG9zZVwiLFtcIi4uL3V0aWxzXCJdLGZ1bmN0aW9uKHMpe2Z1bmN0aW9uIGUoKXt9cmV0dXJuIGUucHJvdG90eXBlLmJpbmQ9ZnVuY3Rpb24oZSx0LG4pe3ZhciBzPXRoaXM7ZS5jYWxsKHRoaXMsdCxuKSx0Lm9uKFwiY2xvc2VcIixmdW5jdGlvbihlKXtzLl9oYW5kbGVTZWxlY3RPbkNsb3NlKGUpfSl9LGUucHJvdG90eXBlLl9oYW5kbGVTZWxlY3RPbkNsb3NlPWZ1bmN0aW9uKGUsdCl7aWYodCYmbnVsbCE9dC5vcmlnaW5hbFNlbGVjdDJFdmVudCl7dmFyIG49dC5vcmlnaW5hbFNlbGVjdDJFdmVudDtpZihcInNlbGVjdFwiPT09bi5fdHlwZXx8XCJ1bnNlbGVjdFwiPT09bi5fdHlwZSlyZXR1cm59bj10aGlzLmdldEhpZ2hsaWdodGVkUmVzdWx0cygpO24ubGVuZ3RoPDF8fChudWxsIT0obj1zLkdldERhdGEoblswXSxcImRhdGFcIikpLmVsZW1lbnQmJm4uZWxlbWVudC5zZWxlY3RlZHx8bnVsbD09bi5lbGVtZW50JiZuLnNlbGVjdGVkfHx0aGlzLnRyaWdnZXIoXCJzZWxlY3RcIix7ZGF0YTpufSkpfSxlfSksdS5kZWZpbmUoXCJzZWxlY3QyL2Ryb3Bkb3duL2Nsb3NlT25TZWxlY3RcIixbXSxmdW5jdGlvbigpe2Z1bmN0aW9uIGUoKXt9cmV0dXJuIGUucHJvdG90eXBlLmJpbmQ9ZnVuY3Rpb24oZSx0LG4pe3ZhciBzPXRoaXM7ZS5jYWxsKHRoaXMsdCxuKSx0Lm9uKFwic2VsZWN0XCIsZnVuY3Rpb24oZSl7cy5fc2VsZWN0VHJpZ2dlcmVkKGUpfSksdC5vbihcInVuc2VsZWN0XCIsZnVuY3Rpb24oZSl7cy5fc2VsZWN0VHJpZ2dlcmVkKGUpfSl9LGUucHJvdG90eXBlLl9zZWxlY3RUcmlnZ2VyZWQ9ZnVuY3Rpb24oZSx0KXt2YXIgbj10Lm9yaWdpbmFsRXZlbnQ7biYmKG4uY3RybEtleXx8bi5tZXRhS2V5KXx8dGhpcy50cmlnZ2VyKFwiY2xvc2VcIix7b3JpZ2luYWxFdmVudDpuLG9yaWdpbmFsU2VsZWN0MkV2ZW50OnR9KX0sZX0pLHUuZGVmaW5lKFwic2VsZWN0Mi9kcm9wZG93bi9kcm9wZG93bkNzc1wiLFtcIi4uL3V0aWxzXCJdLGZ1bmN0aW9uKG4pe2Z1bmN0aW9uIGUoKXt9cmV0dXJuIGUucHJvdG90eXBlLnJlbmRlcj1mdW5jdGlvbihlKXt2YXIgdD1lLmNhbGwodGhpcyksZT10aGlzLm9wdGlvbnMuZ2V0KFwiZHJvcGRvd25Dc3NDbGFzc1wiKXx8XCJcIjtyZXR1cm4tMSE9PWUuaW5kZXhPZihcIjphbGw6XCIpJiYoZT1lLnJlcGxhY2UoXCI6YWxsOlwiLFwiXCIpLG4uY29weU5vbkludGVybmFsQ3NzQ2xhc3Nlcyh0WzBdLHRoaXMuJGVsZW1lbnRbMF0pKSx0LmFkZENsYXNzKGUpLHR9LGV9KSx1LmRlZmluZShcInNlbGVjdDIvZHJvcGRvd24vdGFnc1NlYXJjaEhpZ2hsaWdodFwiLFtcIi4uL3V0aWxzXCJdLGZ1bmN0aW9uKHMpe2Z1bmN0aW9uIGUoKXt9cmV0dXJuIGUucHJvdG90eXBlLmhpZ2hsaWdodEZpcnN0SXRlbT1mdW5jdGlvbihlKXt2YXIgdD10aGlzLiRyZXN1bHRzLmZpbmQoXCIuc2VsZWN0Mi1yZXN1bHRzX19vcHRpb24tLXNlbGVjdGFibGU6bm90KC5zZWxlY3QyLXJlc3VsdHNfX29wdGlvbi0tc2VsZWN0ZWQpXCIpO2lmKDA8dC5sZW5ndGgpe3ZhciBuPXQuZmlyc3QoKSx0PXMuR2V0RGF0YShuWzBdLFwiZGF0YVwiKS5lbGVtZW50O2lmKHQmJnQuZ2V0QXR0cmlidXRlJiZcInRydWVcIj09PXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1zZWxlY3QyLXRhZ1wiKSlyZXR1cm4gdm9pZCBuLnRyaWdnZXIoXCJtb3VzZWVudGVyXCIpfWUuY2FsbCh0aGlzKX0sZX0pLHUuZGVmaW5lKFwic2VsZWN0Mi9pMThuL2VuXCIsW10sZnVuY3Rpb24oKXtyZXR1cm57ZXJyb3JMb2FkaW5nOmZ1bmN0aW9uKCl7cmV0dXJuXCJUaGUgcmVzdWx0cyBjb3VsZCBub3QgYmUgbG9hZGVkLlwifSxpbnB1dFRvb0xvbmc6ZnVuY3Rpb24oZSl7dmFyIHQ9ZS5pbnB1dC5sZW5ndGgtZS5tYXhpbXVtLGU9XCJQbGVhc2UgZGVsZXRlIFwiK3QrXCIgY2hhcmFjdGVyXCI7cmV0dXJuIDEhPXQmJihlKz1cInNcIiksZX0saW5wdXRUb29TaG9ydDpmdW5jdGlvbihlKXtyZXR1cm5cIlBsZWFzZSBlbnRlciBcIisoZS5taW5pbXVtLWUuaW5wdXQubGVuZ3RoKStcIiBvciBtb3JlIGNoYXJhY3RlcnNcIn0sbG9hZGluZ01vcmU6ZnVuY3Rpb24oKXtyZXR1cm5cIkxvYWRpbmcgbW9yZSByZXN1bHRz4oCmXCJ9LG1heGltdW1TZWxlY3RlZDpmdW5jdGlvbihlKXt2YXIgdD1cIllvdSBjYW4gb25seSBzZWxlY3QgXCIrZS5tYXhpbXVtK1wiIGl0ZW1cIjtyZXR1cm4gMSE9ZS5tYXhpbXVtJiYodCs9XCJzXCIpLHR9LG5vUmVzdWx0czpmdW5jdGlvbigpe3JldHVyblwiTm8gcmVzdWx0cyBmb3VuZFwifSxzZWFyY2hpbmc6ZnVuY3Rpb24oKXtyZXR1cm5cIlNlYXJjaGluZ+KAplwifSxyZW1vdmVBbGxJdGVtczpmdW5jdGlvbigpe3JldHVyblwiUmVtb3ZlIGFsbCBpdGVtc1wifSxyZW1vdmVJdGVtOmZ1bmN0aW9uKCl7cmV0dXJuXCJSZW1vdmUgaXRlbVwifSxzZWFyY2g6ZnVuY3Rpb24oKXtyZXR1cm5cIlNlYXJjaFwifX19KSx1LmRlZmluZShcInNlbGVjdDIvZGVmYXVsdHNcIixbXCJqcXVlcnlcIixcIi4vcmVzdWx0c1wiLFwiLi9zZWxlY3Rpb24vc2luZ2xlXCIsXCIuL3NlbGVjdGlvbi9tdWx0aXBsZVwiLFwiLi9zZWxlY3Rpb24vcGxhY2Vob2xkZXJcIixcIi4vc2VsZWN0aW9uL2FsbG93Q2xlYXJcIixcIi4vc2VsZWN0aW9uL3NlYXJjaFwiLFwiLi9zZWxlY3Rpb24vc2VsZWN0aW9uQ3NzXCIsXCIuL3NlbGVjdGlvbi9ldmVudFJlbGF5XCIsXCIuL3V0aWxzXCIsXCIuL3RyYW5zbGF0aW9uXCIsXCIuL2RpYWNyaXRpY3NcIixcIi4vZGF0YS9zZWxlY3RcIixcIi4vZGF0YS9hcnJheVwiLFwiLi9kYXRhL2FqYXhcIixcIi4vZGF0YS90YWdzXCIsXCIuL2RhdGEvdG9rZW5pemVyXCIsXCIuL2RhdGEvbWluaW11bUlucHV0TGVuZ3RoXCIsXCIuL2RhdGEvbWF4aW11bUlucHV0TGVuZ3RoXCIsXCIuL2RhdGEvbWF4aW11bVNlbGVjdGlvbkxlbmd0aFwiLFwiLi9kcm9wZG93blwiLFwiLi9kcm9wZG93bi9zZWFyY2hcIixcIi4vZHJvcGRvd24vaGlkZVBsYWNlaG9sZGVyXCIsXCIuL2Ryb3Bkb3duL2luZmluaXRlU2Nyb2xsXCIsXCIuL2Ryb3Bkb3duL2F0dGFjaEJvZHlcIixcIi4vZHJvcGRvd24vbWluaW11bVJlc3VsdHNGb3JTZWFyY2hcIixcIi4vZHJvcGRvd24vc2VsZWN0T25DbG9zZVwiLFwiLi9kcm9wZG93bi9jbG9zZU9uU2VsZWN0XCIsXCIuL2Ryb3Bkb3duL2Ryb3Bkb3duQ3NzXCIsXCIuL2Ryb3Bkb3duL3RhZ3NTZWFyY2hIaWdobGlnaHRcIixcIi4vaTE4bi9lblwiXSxmdW5jdGlvbihsLHIsbyxhLGMsdSxkLHAsaCxmLGcsdCxtLHksdixfLGIsJCx3LHgsQSxELFMsRSxPLEMsTCxULHEsSSxlKXtmdW5jdGlvbiBuKCl7dGhpcy5yZXNldCgpfXJldHVybiBuLnByb3RvdHlwZS5hcHBseT1mdW5jdGlvbihlKXt2YXIgdDtudWxsPT0oZT1sLmV4dGVuZCghMCx7fSx0aGlzLmRlZmF1bHRzLGUpKS5kYXRhQWRhcHRlciYmKG51bGwhPWUuYWpheD9lLmRhdGFBZGFwdGVyPXY6bnVsbCE9ZS5kYXRhP2UuZGF0YUFkYXB0ZXI9eTplLmRhdGFBZGFwdGVyPW0sMDxlLm1pbmltdW1JbnB1dExlbmd0aCYmKGUuZGF0YUFkYXB0ZXI9Zi5EZWNvcmF0ZShlLmRhdGFBZGFwdGVyLCQpKSwwPGUubWF4aW11bUlucHV0TGVuZ3RoJiYoZS5kYXRhQWRhcHRlcj1mLkRlY29yYXRlKGUuZGF0YUFkYXB0ZXIsdykpLDA8ZS5tYXhpbXVtU2VsZWN0aW9uTGVuZ3RoJiYoZS5kYXRhQWRhcHRlcj1mLkRlY29yYXRlKGUuZGF0YUFkYXB0ZXIseCkpLGUudGFncyYmKGUuZGF0YUFkYXB0ZXI9Zi5EZWNvcmF0ZShlLmRhdGFBZGFwdGVyLF8pKSxudWxsPT1lLnRva2VuU2VwYXJhdG9ycyYmbnVsbD09ZS50b2tlbml6ZXJ8fChlLmRhdGFBZGFwdGVyPWYuRGVjb3JhdGUoZS5kYXRhQWRhcHRlcixiKSkpLG51bGw9PWUucmVzdWx0c0FkYXB0ZXImJihlLnJlc3VsdHNBZGFwdGVyPXIsbnVsbCE9ZS5hamF4JiYoZS5yZXN1bHRzQWRhcHRlcj1mLkRlY29yYXRlKGUucmVzdWx0c0FkYXB0ZXIsRSkpLG51bGwhPWUucGxhY2Vob2xkZXImJihlLnJlc3VsdHNBZGFwdGVyPWYuRGVjb3JhdGUoZS5yZXN1bHRzQWRhcHRlcixTKSksZS5zZWxlY3RPbkNsb3NlJiYoZS5yZXN1bHRzQWRhcHRlcj1mLkRlY29yYXRlKGUucmVzdWx0c0FkYXB0ZXIsTCkpLGUudGFncyYmKGUucmVzdWx0c0FkYXB0ZXI9Zi5EZWNvcmF0ZShlLnJlc3VsdHNBZGFwdGVyLEkpKSksbnVsbD09ZS5kcm9wZG93bkFkYXB0ZXImJihlLm11bHRpcGxlP2UuZHJvcGRvd25BZGFwdGVyPUE6KHQ9Zi5EZWNvcmF0ZShBLEQpLGUuZHJvcGRvd25BZGFwdGVyPXQpLDAhPT1lLm1pbmltdW1SZXN1bHRzRm9yU2VhcmNoJiYoZS5kcm9wZG93bkFkYXB0ZXI9Zi5EZWNvcmF0ZShlLmRyb3Bkb3duQWRhcHRlcixDKSksZS5jbG9zZU9uU2VsZWN0JiYoZS5kcm9wZG93bkFkYXB0ZXI9Zi5EZWNvcmF0ZShlLmRyb3Bkb3duQWRhcHRlcixUKSksbnVsbCE9ZS5kcm9wZG93bkNzc0NsYXNzJiYoZS5kcm9wZG93bkFkYXB0ZXI9Zi5EZWNvcmF0ZShlLmRyb3Bkb3duQWRhcHRlcixxKSksZS5kcm9wZG93bkFkYXB0ZXI9Zi5EZWNvcmF0ZShlLmRyb3Bkb3duQWRhcHRlcixPKSksbnVsbD09ZS5zZWxlY3Rpb25BZGFwdGVyJiYoZS5tdWx0aXBsZT9lLnNlbGVjdGlvbkFkYXB0ZXI9YTplLnNlbGVjdGlvbkFkYXB0ZXI9byxudWxsIT1lLnBsYWNlaG9sZGVyJiYoZS5zZWxlY3Rpb25BZGFwdGVyPWYuRGVjb3JhdGUoZS5zZWxlY3Rpb25BZGFwdGVyLGMpKSxlLmFsbG93Q2xlYXImJihlLnNlbGVjdGlvbkFkYXB0ZXI9Zi5EZWNvcmF0ZShlLnNlbGVjdGlvbkFkYXB0ZXIsdSkpLGUubXVsdGlwbGUmJihlLnNlbGVjdGlvbkFkYXB0ZXI9Zi5EZWNvcmF0ZShlLnNlbGVjdGlvbkFkYXB0ZXIsZCkpLG51bGwhPWUuc2VsZWN0aW9uQ3NzQ2xhc3MmJihlLnNlbGVjdGlvbkFkYXB0ZXI9Zi5EZWNvcmF0ZShlLnNlbGVjdGlvbkFkYXB0ZXIscCkpLGUuc2VsZWN0aW9uQWRhcHRlcj1mLkRlY29yYXRlKGUuc2VsZWN0aW9uQWRhcHRlcixoKSksZS5sYW5ndWFnZT10aGlzLl9yZXNvbHZlTGFuZ3VhZ2UoZS5sYW5ndWFnZSksZS5sYW5ndWFnZS5wdXNoKFwiZW5cIik7Zm9yKHZhciBuPVtdLHM9MDtzPGUubGFuZ3VhZ2UubGVuZ3RoO3MrKyl7dmFyIGk9ZS5sYW5ndWFnZVtzXTstMT09PW4uaW5kZXhPZihpKSYmbi5wdXNoKGkpfXJldHVybiBlLmxhbmd1YWdlPW4sZS50cmFuc2xhdGlvbnM9dGhpcy5fcHJvY2Vzc1RyYW5zbGF0aW9ucyhlLmxhbmd1YWdlLGUuZGVidWcpLGV9LG4ucHJvdG90eXBlLnJlc2V0PWZ1bmN0aW9uKCl7ZnVuY3Rpb24gYShlKXtyZXR1cm4gZS5yZXBsYWNlKC9bXlxcdTAwMDAtXFx1MDA3RV0vZyxmdW5jdGlvbihlKXtyZXR1cm4gdFtlXXx8ZX0pfXRoaXMuZGVmYXVsdHM9e2FtZExhbmd1YWdlQmFzZTpcIi4vaTE4bi9cIixhdXRvY29tcGxldGU6XCJvZmZcIixjbG9zZU9uU2VsZWN0OiEwLGRlYnVnOiExLGRyb3Bkb3duQXV0b1dpZHRoOiExLGVzY2FwZU1hcmt1cDpmLmVzY2FwZU1hcmt1cCxsYW5ndWFnZTp7fSxtYXRjaGVyOmZ1bmN0aW9uIGUodCxuKXtpZihudWxsPT10LnRlcm18fFwiXCI9PT10LnRlcm0udHJpbSgpKXJldHVybiBuO2lmKG4uY2hpbGRyZW4mJjA8bi5jaGlsZHJlbi5sZW5ndGgpe2Zvcih2YXIgcz1sLmV4dGVuZCghMCx7fSxuKSxpPW4uY2hpbGRyZW4ubGVuZ3RoLTE7MDw9aTtpLS0pbnVsbD09ZSh0LG4uY2hpbGRyZW5baV0pJiZzLmNoaWxkcmVuLnNwbGljZShpLDEpO3JldHVybiAwPHMuY2hpbGRyZW4ubGVuZ3RoP3M6ZSh0LHMpfXZhciByPWEobi50ZXh0KS50b1VwcGVyQ2FzZSgpLG89YSh0LnRlcm0pLnRvVXBwZXJDYXNlKCk7cmV0dXJuLTE8ci5pbmRleE9mKG8pP246bnVsbH0sbWluaW11bUlucHV0TGVuZ3RoOjAsbWF4aW11bUlucHV0TGVuZ3RoOjAsbWF4aW11bVNlbGVjdGlvbkxlbmd0aDowLG1pbmltdW1SZXN1bHRzRm9yU2VhcmNoOjAsc2VsZWN0T25DbG9zZTohMSxzY3JvbGxBZnRlclNlbGVjdDohMSxzb3J0ZXI6ZnVuY3Rpb24oZSl7cmV0dXJuIGV9LHRlbXBsYXRlUmVzdWx0OmZ1bmN0aW9uKGUpe3JldHVybiBlLnRleHR9LHRlbXBsYXRlU2VsZWN0aW9uOmZ1bmN0aW9uKGUpe3JldHVybiBlLnRleHR9LHRoZW1lOlwiZGVmYXVsdFwiLHdpZHRoOlwicmVzb2x2ZVwifX0sbi5wcm90b3R5cGUuYXBwbHlGcm9tRWxlbWVudD1mdW5jdGlvbihlLHQpe3ZhciBuPWUubGFuZ3VhZ2Uscz10aGlzLmRlZmF1bHRzLmxhbmd1YWdlLGk9dC5wcm9wKFwibGFuZ1wiKSx0PXQuY2xvc2VzdChcIltsYW5nXVwiKS5wcm9wKFwibGFuZ1wiKSx0PUFycmF5LnByb3RvdHlwZS5jb25jYXQuY2FsbCh0aGlzLl9yZXNvbHZlTGFuZ3VhZ2UoaSksdGhpcy5fcmVzb2x2ZUxhbmd1YWdlKG4pLHRoaXMuX3Jlc29sdmVMYW5ndWFnZShzKSx0aGlzLl9yZXNvbHZlTGFuZ3VhZ2UodCkpO3JldHVybiBlLmxhbmd1YWdlPXQsZX0sbi5wcm90b3R5cGUuX3Jlc29sdmVMYW5ndWFnZT1mdW5jdGlvbihlKXtpZighZSlyZXR1cm5bXTtpZihsLmlzRW1wdHlPYmplY3QoZSkpcmV0dXJuW107aWYobC5pc1BsYWluT2JqZWN0KGUpKXJldHVybltlXTtmb3IodmFyIHQsbj1BcnJheS5pc0FycmF5KGUpP2U6W2VdLHM9W10saT0wO2k8bi5sZW5ndGg7aSsrKXMucHVzaChuW2ldKSxcInN0cmluZ1wiPT10eXBlb2YgbltpXSYmMDxuW2ldLmluZGV4T2YoXCItXCIpJiYodD1uW2ldLnNwbGl0KFwiLVwiKVswXSxzLnB1c2godCkpO3JldHVybiBzfSxuLnByb3RvdHlwZS5fcHJvY2Vzc1RyYW5zbGF0aW9ucz1mdW5jdGlvbihlLHQpe2Zvcih2YXIgbj1uZXcgZyxzPTA7czxlLmxlbmd0aDtzKyspe3ZhciBpPW5ldyBnLHI9ZVtzXTtpZihcInN0cmluZ1wiPT10eXBlb2Ygcil0cnl7aT1nLmxvYWRQYXRoKHIpfWNhdGNoKGUpe3RyeXtyPXRoaXMuZGVmYXVsdHMuYW1kTGFuZ3VhZ2VCYXNlK3IsaT1nLmxvYWRQYXRoKHIpfWNhdGNoKGUpe3QmJndpbmRvdy5jb25zb2xlJiZjb25zb2xlLndhcm4mJmNvbnNvbGUud2FybignU2VsZWN0MjogVGhlIGxhbmd1YWdlIGZpbGUgZm9yIFwiJytyKydcIiBjb3VsZCBub3QgYmUgYXV0b21hdGljYWxseSBsb2FkZWQuIEEgZmFsbGJhY2sgd2lsbCBiZSB1c2VkIGluc3RlYWQuJyl9fWVsc2UgaT1sLmlzUGxhaW5PYmplY3Qocik/bmV3IGcocik6cjtuLmV4dGVuZChpKX1yZXR1cm4gbn0sbi5wcm90b3R5cGUuc2V0PWZ1bmN0aW9uKGUsdCl7dmFyIG49e307bltsLmNhbWVsQ2FzZShlKV09dDtuPWYuX2NvbnZlcnREYXRhKG4pO2wuZXh0ZW5kKCEwLHRoaXMuZGVmYXVsdHMsbil9LG5ldyBufSksdS5kZWZpbmUoXCJzZWxlY3QyL29wdGlvbnNcIixbXCJqcXVlcnlcIixcIi4vZGVmYXVsdHNcIixcIi4vdXRpbHNcIl0sZnVuY3Rpb24oYyxuLHUpe2Z1bmN0aW9uIGUoZSx0KXt0aGlzLm9wdGlvbnM9ZSxudWxsIT10JiZ0aGlzLmZyb21FbGVtZW50KHQpLG51bGwhPXQmJih0aGlzLm9wdGlvbnM9bi5hcHBseUZyb21FbGVtZW50KHRoaXMub3B0aW9ucyx0KSksdGhpcy5vcHRpb25zPW4uYXBwbHkodGhpcy5vcHRpb25zKX1yZXR1cm4gZS5wcm90b3R5cGUuZnJvbUVsZW1lbnQ9ZnVuY3Rpb24oZSl7dmFyIHQ9W1wic2VsZWN0MlwiXTtudWxsPT10aGlzLm9wdGlvbnMubXVsdGlwbGUmJih0aGlzLm9wdGlvbnMubXVsdGlwbGU9ZS5wcm9wKFwibXVsdGlwbGVcIikpLG51bGw9PXRoaXMub3B0aW9ucy5kaXNhYmxlZCYmKHRoaXMub3B0aW9ucy5kaXNhYmxlZD1lLnByb3AoXCJkaXNhYmxlZFwiKSksbnVsbD09dGhpcy5vcHRpb25zLmF1dG9jb21wbGV0ZSYmZS5wcm9wKFwiYXV0b2NvbXBsZXRlXCIpJiYodGhpcy5vcHRpb25zLmF1dG9jb21wbGV0ZT1lLnByb3AoXCJhdXRvY29tcGxldGVcIikpLG51bGw9PXRoaXMub3B0aW9ucy5kaXImJihlLnByb3AoXCJkaXJcIik/dGhpcy5vcHRpb25zLmRpcj1lLnByb3AoXCJkaXJcIik6ZS5jbG9zZXN0KFwiW2Rpcl1cIikucHJvcChcImRpclwiKT90aGlzLm9wdGlvbnMuZGlyPWUuY2xvc2VzdChcIltkaXJdXCIpLnByb3AoXCJkaXJcIik6dGhpcy5vcHRpb25zLmRpcj1cImx0clwiKSxlLnByb3AoXCJkaXNhYmxlZFwiLHRoaXMub3B0aW9ucy5kaXNhYmxlZCksZS5wcm9wKFwibXVsdGlwbGVcIix0aGlzLm9wdGlvbnMubXVsdGlwbGUpLHUuR2V0RGF0YShlWzBdLFwic2VsZWN0MlRhZ3NcIikmJih0aGlzLm9wdGlvbnMuZGVidWcmJndpbmRvdy5jb25zb2xlJiZjb25zb2xlLndhcm4mJmNvbnNvbGUud2FybignU2VsZWN0MjogVGhlIGBkYXRhLXNlbGVjdDItdGFnc2AgYXR0cmlidXRlIGhhcyBiZWVuIGNoYW5nZWQgdG8gdXNlIHRoZSBgZGF0YS1kYXRhYCBhbmQgYGRhdGEtdGFncz1cInRydWVcImAgYXR0cmlidXRlcyBhbmQgd2lsbCBiZSByZW1vdmVkIGluIGZ1dHVyZSB2ZXJzaW9ucyBvZiBTZWxlY3QyLicpLHUuU3RvcmVEYXRhKGVbMF0sXCJkYXRhXCIsdS5HZXREYXRhKGVbMF0sXCJzZWxlY3QyVGFnc1wiKSksdS5TdG9yZURhdGEoZVswXSxcInRhZ3NcIiwhMCkpLHUuR2V0RGF0YShlWzBdLFwiYWpheFVybFwiKSYmKHRoaXMub3B0aW9ucy5kZWJ1ZyYmd2luZG93LmNvbnNvbGUmJmNvbnNvbGUud2FybiYmY29uc29sZS53YXJuKFwiU2VsZWN0MjogVGhlIGBkYXRhLWFqYXgtdXJsYCBhdHRyaWJ1dGUgaGFzIGJlZW4gY2hhbmdlZCB0byBgZGF0YS1hamF4LS11cmxgIGFuZCBzdXBwb3J0IGZvciB0aGUgb2xkIGF0dHJpYnV0ZSB3aWxsIGJlIHJlbW92ZWQgaW4gZnV0dXJlIHZlcnNpb25zIG9mIFNlbGVjdDIuXCIpLGUuYXR0cihcImFqYXgtLXVybFwiLHUuR2V0RGF0YShlWzBdLFwiYWpheFVybFwiKSksdS5TdG9yZURhdGEoZVswXSxcImFqYXgtVXJsXCIsdS5HZXREYXRhKGVbMF0sXCJhamF4VXJsXCIpKSk7dmFyIG49e307ZnVuY3Rpb24gcyhlLHQpe3JldHVybiB0LnRvVXBwZXJDYXNlKCl9Zm9yKHZhciBpPTA7aTxlWzBdLmF0dHJpYnV0ZXMubGVuZ3RoO2krKyl7dmFyIHI9ZVswXS5hdHRyaWJ1dGVzW2ldLm5hbWUsbz1cImRhdGEtXCI7ci5zdWJzdHIoMCxvLmxlbmd0aCk9PW8mJihyPXIuc3Vic3RyaW5nKG8ubGVuZ3RoKSxvPXUuR2V0RGF0YShlWzBdLHIpLG5bci5yZXBsYWNlKC8tKFthLXpdKS9nLHMpXT1vKX1jLmZuLmpxdWVyeSYmXCIxLlwiPT1jLmZuLmpxdWVyeS5zdWJzdHIoMCwyKSYmZVswXS5kYXRhc2V0JiYobj1jLmV4dGVuZCghMCx7fSxlWzBdLmRhdGFzZXQsbikpO3ZhciBhLGw9Yy5leHRlbmQoITAse30sdS5HZXREYXRhKGVbMF0pLG4pO2ZvcihhIGluIGw9dS5fY29udmVydERhdGEobCkpLTE8dC5pbmRleE9mKGEpfHwoYy5pc1BsYWluT2JqZWN0KHRoaXMub3B0aW9uc1thXSk/Yy5leHRlbmQodGhpcy5vcHRpb25zW2FdLGxbYV0pOnRoaXMub3B0aW9uc1thXT1sW2FdKTtyZXR1cm4gdGhpc30sZS5wcm90b3R5cGUuZ2V0PWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLm9wdGlvbnNbZV19LGUucHJvdG90eXBlLnNldD1mdW5jdGlvbihlLHQpe3RoaXMub3B0aW9uc1tlXT10fSxlfSksdS5kZWZpbmUoXCJzZWxlY3QyL2NvcmVcIixbXCJqcXVlcnlcIixcIi4vb3B0aW9uc1wiLFwiLi91dGlsc1wiLFwiLi9rZXlzXCJdLGZ1bmN0aW9uKHQsaSxyLHMpe3ZhciBvPWZ1bmN0aW9uKGUsdCl7bnVsbCE9ci5HZXREYXRhKGVbMF0sXCJzZWxlY3QyXCIpJiZyLkdldERhdGEoZVswXSxcInNlbGVjdDJcIikuZGVzdHJveSgpLHRoaXMuJGVsZW1lbnQ9ZSx0aGlzLmlkPXRoaXMuX2dlbmVyYXRlSWQoZSksdD10fHx7fSx0aGlzLm9wdGlvbnM9bmV3IGkodCxlKSxvLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMpO3ZhciBuPWUuYXR0cihcInRhYmluZGV4XCIpfHwwO3IuU3RvcmVEYXRhKGVbMF0sXCJvbGQtdGFiaW5kZXhcIixuKSxlLmF0dHIoXCJ0YWJpbmRleFwiLFwiLTFcIik7dD10aGlzLm9wdGlvbnMuZ2V0KFwiZGF0YUFkYXB0ZXJcIik7dGhpcy5kYXRhQWRhcHRlcj1uZXcgdChlLHRoaXMub3B0aW9ucyk7bj10aGlzLnJlbmRlcigpO3RoaXMuX3BsYWNlQ29udGFpbmVyKG4pO3Q9dGhpcy5vcHRpb25zLmdldChcInNlbGVjdGlvbkFkYXB0ZXJcIik7dGhpcy5zZWxlY3Rpb249bmV3IHQoZSx0aGlzLm9wdGlvbnMpLHRoaXMuJHNlbGVjdGlvbj10aGlzLnNlbGVjdGlvbi5yZW5kZXIoKSx0aGlzLnNlbGVjdGlvbi5wb3NpdGlvbih0aGlzLiRzZWxlY3Rpb24sbik7dD10aGlzLm9wdGlvbnMuZ2V0KFwiZHJvcGRvd25BZGFwdGVyXCIpO3RoaXMuZHJvcGRvd249bmV3IHQoZSx0aGlzLm9wdGlvbnMpLHRoaXMuJGRyb3Bkb3duPXRoaXMuZHJvcGRvd24ucmVuZGVyKCksdGhpcy5kcm9wZG93bi5wb3NpdGlvbih0aGlzLiRkcm9wZG93bixuKTtuPXRoaXMub3B0aW9ucy5nZXQoXCJyZXN1bHRzQWRhcHRlclwiKTt0aGlzLnJlc3VsdHM9bmV3IG4oZSx0aGlzLm9wdGlvbnMsdGhpcy5kYXRhQWRhcHRlciksdGhpcy4kcmVzdWx0cz10aGlzLnJlc3VsdHMucmVuZGVyKCksdGhpcy5yZXN1bHRzLnBvc2l0aW9uKHRoaXMuJHJlc3VsdHMsdGhpcy4kZHJvcGRvd24pO3ZhciBzPXRoaXM7dGhpcy5fYmluZEFkYXB0ZXJzKCksdGhpcy5fcmVnaXN0ZXJEb21FdmVudHMoKSx0aGlzLl9yZWdpc3RlckRhdGFFdmVudHMoKSx0aGlzLl9yZWdpc3RlclNlbGVjdGlvbkV2ZW50cygpLHRoaXMuX3JlZ2lzdGVyRHJvcGRvd25FdmVudHMoKSx0aGlzLl9yZWdpc3RlclJlc3VsdHNFdmVudHMoKSx0aGlzLl9yZWdpc3RlckV2ZW50cygpLHRoaXMuZGF0YUFkYXB0ZXIuY3VycmVudChmdW5jdGlvbihlKXtzLnRyaWdnZXIoXCJzZWxlY3Rpb246dXBkYXRlXCIse2RhdGE6ZX0pfSksZVswXS5jbGFzc0xpc3QuYWRkKFwic2VsZWN0Mi1oaWRkZW4tYWNjZXNzaWJsZVwiKSxlLmF0dHIoXCJhcmlhLWhpZGRlblwiLFwidHJ1ZVwiKSx0aGlzLl9zeW5jQXR0cmlidXRlcygpLHIuU3RvcmVEYXRhKGVbMF0sXCJzZWxlY3QyXCIsdGhpcyksZS5kYXRhKFwic2VsZWN0MlwiLHRoaXMpfTtyZXR1cm4gci5FeHRlbmQobyxyLk9ic2VydmFibGUpLG8ucHJvdG90eXBlLl9nZW5lcmF0ZUlkPWZ1bmN0aW9uKGUpe3JldHVyblwic2VsZWN0Mi1cIisobnVsbCE9ZS5hdHRyKFwiaWRcIik/ZS5hdHRyKFwiaWRcIik6bnVsbCE9ZS5hdHRyKFwibmFtZVwiKT9lLmF0dHIoXCJuYW1lXCIpK1wiLVwiK3IuZ2VuZXJhdGVDaGFycygyKTpyLmdlbmVyYXRlQ2hhcnMoNCkpLnJlcGxhY2UoLyg6fFxcLnxcXFt8XFxdfCwpL2csXCJcIil9LG8ucHJvdG90eXBlLl9wbGFjZUNvbnRhaW5lcj1mdW5jdGlvbihlKXtlLmluc2VydEFmdGVyKHRoaXMuJGVsZW1lbnQpO3ZhciB0PXRoaXMuX3Jlc29sdmVXaWR0aCh0aGlzLiRlbGVtZW50LHRoaXMub3B0aW9ucy5nZXQoXCJ3aWR0aFwiKSk7bnVsbCE9dCYmZS5jc3MoXCJ3aWR0aFwiLHQpfSxvLnByb3RvdHlwZS5fcmVzb2x2ZVdpZHRoPWZ1bmN0aW9uKGUsdCl7dmFyIG49L153aWR0aDooKFstK10/KFswLTldKlxcLik/WzAtOV0rKShweHxlbXxleHwlfGlufGNtfG1tfHB0fHBjKSkvaTtpZihcInJlc29sdmVcIj09dCl7dmFyIHM9dGhpcy5fcmVzb2x2ZVdpZHRoKGUsXCJzdHlsZVwiKTtyZXR1cm4gbnVsbCE9cz9zOnRoaXMuX3Jlc29sdmVXaWR0aChlLFwiZWxlbWVudFwiKX1pZihcImVsZW1lbnRcIj09dCl7cz1lLm91dGVyV2lkdGgoITEpO3JldHVybiBzPD0wP1wiYXV0b1wiOnMrXCJweFwifWlmKFwic3R5bGVcIiE9dClyZXR1cm5cImNvbXB1dGVkc3R5bGVcIiE9dD90OndpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVbMF0pLndpZHRoO2U9ZS5hdHRyKFwic3R5bGVcIik7aWYoXCJzdHJpbmdcIiE9dHlwZW9mIGUpcmV0dXJuIG51bGw7Zm9yKHZhciBpPWUuc3BsaXQoXCI7XCIpLHI9MCxvPWkubGVuZ3RoO3I8bztyKz0xKXt2YXIgYT1pW3JdLnJlcGxhY2UoL1xccy9nLFwiXCIpLm1hdGNoKG4pO2lmKG51bGwhPT1hJiYxPD1hLmxlbmd0aClyZXR1cm4gYVsxXX1yZXR1cm4gbnVsbH0sby5wcm90b3R5cGUuX2JpbmRBZGFwdGVycz1mdW5jdGlvbigpe3RoaXMuZGF0YUFkYXB0ZXIuYmluZCh0aGlzLHRoaXMuJGNvbnRhaW5lciksdGhpcy5zZWxlY3Rpb24uYmluZCh0aGlzLHRoaXMuJGNvbnRhaW5lciksdGhpcy5kcm9wZG93bi5iaW5kKHRoaXMsdGhpcy4kY29udGFpbmVyKSx0aGlzLnJlc3VsdHMuYmluZCh0aGlzLHRoaXMuJGNvbnRhaW5lcil9LG8ucHJvdG90eXBlLl9yZWdpc3RlckRvbUV2ZW50cz1mdW5jdGlvbigpe3ZhciB0PXRoaXM7dGhpcy4kZWxlbWVudC5vbihcImNoYW5nZS5zZWxlY3QyXCIsZnVuY3Rpb24oKXt0LmRhdGFBZGFwdGVyLmN1cnJlbnQoZnVuY3Rpb24oZSl7dC50cmlnZ2VyKFwic2VsZWN0aW9uOnVwZGF0ZVwiLHtkYXRhOmV9KX0pfSksdGhpcy4kZWxlbWVudC5vbihcImZvY3VzLnNlbGVjdDJcIixmdW5jdGlvbihlKXt0LnRyaWdnZXIoXCJmb2N1c1wiLGUpfSksdGhpcy5fc3luY0E9ci5iaW5kKHRoaXMuX3N5bmNBdHRyaWJ1dGVzLHRoaXMpLHRoaXMuX3N5bmNTPXIuYmluZCh0aGlzLl9zeW5jU3VidHJlZSx0aGlzKSx0aGlzLl9vYnNlcnZlcj1uZXcgd2luZG93Lk11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24oZSl7dC5fc3luY0EoKSx0Ll9zeW5jUyhlKX0pLHRoaXMuX29ic2VydmVyLm9ic2VydmUodGhpcy4kZWxlbWVudFswXSx7YXR0cmlidXRlczohMCxjaGlsZExpc3Q6ITAsc3VidHJlZTohMX0pfSxvLnByb3RvdHlwZS5fcmVnaXN0ZXJEYXRhRXZlbnRzPWZ1bmN0aW9uKCl7dmFyIG49dGhpczt0aGlzLmRhdGFBZGFwdGVyLm9uKFwiKlwiLGZ1bmN0aW9uKGUsdCl7bi50cmlnZ2VyKGUsdCl9KX0sby5wcm90b3R5cGUuX3JlZ2lzdGVyU2VsZWN0aW9uRXZlbnRzPWZ1bmN0aW9uKCl7dmFyIG49dGhpcyxzPVtcInRvZ2dsZVwiLFwiZm9jdXNcIl07dGhpcy5zZWxlY3Rpb24ub24oXCJ0b2dnbGVcIixmdW5jdGlvbigpe24udG9nZ2xlRHJvcGRvd24oKX0pLHRoaXMuc2VsZWN0aW9uLm9uKFwiZm9jdXNcIixmdW5jdGlvbihlKXtuLmZvY3VzKGUpfSksdGhpcy5zZWxlY3Rpb24ub24oXCIqXCIsZnVuY3Rpb24oZSx0KXstMT09PXMuaW5kZXhPZihlKSYmbi50cmlnZ2VyKGUsdCl9KX0sby5wcm90b3R5cGUuX3JlZ2lzdGVyRHJvcGRvd25FdmVudHM9ZnVuY3Rpb24oKXt2YXIgbj10aGlzO3RoaXMuZHJvcGRvd24ub24oXCIqXCIsZnVuY3Rpb24oZSx0KXtuLnRyaWdnZXIoZSx0KX0pfSxvLnByb3RvdHlwZS5fcmVnaXN0ZXJSZXN1bHRzRXZlbnRzPWZ1bmN0aW9uKCl7dmFyIG49dGhpczt0aGlzLnJlc3VsdHMub24oXCIqXCIsZnVuY3Rpb24oZSx0KXtuLnRyaWdnZXIoZSx0KX0pfSxvLnByb3RvdHlwZS5fcmVnaXN0ZXJFdmVudHM9ZnVuY3Rpb24oKXt2YXIgbj10aGlzO3RoaXMub24oXCJvcGVuXCIsZnVuY3Rpb24oKXtuLiRjb250YWluZXJbMF0uY2xhc3NMaXN0LmFkZChcInNlbGVjdDItY29udGFpbmVyLS1vcGVuXCIpfSksdGhpcy5vbihcImNsb3NlXCIsZnVuY3Rpb24oKXtuLiRjb250YWluZXJbMF0uY2xhc3NMaXN0LnJlbW92ZShcInNlbGVjdDItY29udGFpbmVyLS1vcGVuXCIpfSksdGhpcy5vbihcImVuYWJsZVwiLGZ1bmN0aW9uKCl7bi4kY29udGFpbmVyWzBdLmNsYXNzTGlzdC5yZW1vdmUoXCJzZWxlY3QyLWNvbnRhaW5lci0tZGlzYWJsZWRcIil9KSx0aGlzLm9uKFwiZGlzYWJsZVwiLGZ1bmN0aW9uKCl7bi4kY29udGFpbmVyWzBdLmNsYXNzTGlzdC5hZGQoXCJzZWxlY3QyLWNvbnRhaW5lci0tZGlzYWJsZWRcIil9KSx0aGlzLm9uKFwiYmx1clwiLGZ1bmN0aW9uKCl7bi4kY29udGFpbmVyWzBdLmNsYXNzTGlzdC5yZW1vdmUoXCJzZWxlY3QyLWNvbnRhaW5lci0tZm9jdXNcIil9KSx0aGlzLm9uKFwicXVlcnlcIixmdW5jdGlvbih0KXtuLmlzT3BlbigpfHxuLnRyaWdnZXIoXCJvcGVuXCIse30pLHRoaXMuZGF0YUFkYXB0ZXIucXVlcnkodCxmdW5jdGlvbihlKXtuLnRyaWdnZXIoXCJyZXN1bHRzOmFsbFwiLHtkYXRhOmUscXVlcnk6dH0pfSl9KSx0aGlzLm9uKFwicXVlcnk6YXBwZW5kXCIsZnVuY3Rpb24odCl7dGhpcy5kYXRhQWRhcHRlci5xdWVyeSh0LGZ1bmN0aW9uKGUpe24udHJpZ2dlcihcInJlc3VsdHM6YXBwZW5kXCIse2RhdGE6ZSxxdWVyeTp0fSl9KX0pLHRoaXMub24oXCJrZXlwcmVzc1wiLGZ1bmN0aW9uKGUpe3ZhciB0PWUud2hpY2g7bi5pc09wZW4oKT90PT09cy5FU0N8fHQ9PT1zLlVQJiZlLmFsdEtleT8obi5jbG9zZShlKSxlLnByZXZlbnREZWZhdWx0KCkpOnQ9PT1zLkVOVEVSfHx0PT09cy5UQUI/KG4udHJpZ2dlcihcInJlc3VsdHM6c2VsZWN0XCIse30pLGUucHJldmVudERlZmF1bHQoKSk6dD09PXMuU1BBQ0UmJmUuY3RybEtleT8obi50cmlnZ2VyKFwicmVzdWx0czp0b2dnbGVcIix7fSksZS5wcmV2ZW50RGVmYXVsdCgpKTp0PT09cy5VUD8obi50cmlnZ2VyKFwicmVzdWx0czpwcmV2aW91c1wiLHt9KSxlLnByZXZlbnREZWZhdWx0KCkpOnQ9PT1zLkRPV04mJihuLnRyaWdnZXIoXCJyZXN1bHRzOm5leHRcIix7fSksZS5wcmV2ZW50RGVmYXVsdCgpKToodD09PXMuRU5URVJ8fHQ9PT1zLlNQQUNFfHx0PT09cy5ET1dOJiZlLmFsdEtleSkmJihuLm9wZW4oKSxlLnByZXZlbnREZWZhdWx0KCkpfSl9LG8ucHJvdG90eXBlLl9zeW5jQXR0cmlidXRlcz1mdW5jdGlvbigpe3RoaXMub3B0aW9ucy5zZXQoXCJkaXNhYmxlZFwiLHRoaXMuJGVsZW1lbnQucHJvcChcImRpc2FibGVkXCIpKSx0aGlzLmlzRGlzYWJsZWQoKT8odGhpcy5pc09wZW4oKSYmdGhpcy5jbG9zZSgpLHRoaXMudHJpZ2dlcihcImRpc2FibGVcIix7fSkpOnRoaXMudHJpZ2dlcihcImVuYWJsZVwiLHt9KX0sby5wcm90b3R5cGUuX2lzQ2hhbmdlTXV0YXRpb249ZnVuY3Rpb24oZSl7dmFyIHQ9dGhpcztpZihlLmFkZGVkTm9kZXMmJjA8ZS5hZGRlZE5vZGVzLmxlbmd0aCl7Zm9yKHZhciBuPTA7bjxlLmFkZGVkTm9kZXMubGVuZ3RoO24rKylpZihlLmFkZGVkTm9kZXNbbl0uc2VsZWN0ZWQpcmV0dXJuITB9ZWxzZXtpZihlLnJlbW92ZWROb2RlcyYmMDxlLnJlbW92ZWROb2Rlcy5sZW5ndGgpcmV0dXJuITA7aWYoQXJyYXkuaXNBcnJheShlKSlyZXR1cm4gZS5zb21lKGZ1bmN0aW9uKGUpe3JldHVybiB0Ll9pc0NoYW5nZU11dGF0aW9uKGUpfSl9cmV0dXJuITF9LG8ucHJvdG90eXBlLl9zeW5jU3VidHJlZT1mdW5jdGlvbihlKXt2YXIgZT10aGlzLl9pc0NoYW5nZU11dGF0aW9uKGUpLHQ9dGhpcztlJiZ0aGlzLmRhdGFBZGFwdGVyLmN1cnJlbnQoZnVuY3Rpb24oZSl7dC50cmlnZ2VyKFwic2VsZWN0aW9uOnVwZGF0ZVwiLHtkYXRhOmV9KX0pfSxvLnByb3RvdHlwZS50cmlnZ2VyPWZ1bmN0aW9uKGUsdCl7dmFyIG49by5fX3N1cGVyX18udHJpZ2dlcixzPXtvcGVuOlwib3BlbmluZ1wiLGNsb3NlOlwiY2xvc2luZ1wiLHNlbGVjdDpcInNlbGVjdGluZ1wiLHVuc2VsZWN0OlwidW5zZWxlY3RpbmdcIixjbGVhcjpcImNsZWFyaW5nXCJ9O2lmKHZvaWQgMD09PXQmJih0PXt9KSxlIGluIHMpe3ZhciBpPXNbZV0scz17cHJldmVudGVkOiExLG5hbWU6ZSxhcmdzOnR9O2lmKG4uY2FsbCh0aGlzLGkscykscy5wcmV2ZW50ZWQpcmV0dXJuIHZvaWQodC5wcmV2ZW50ZWQ9ITApfW4uY2FsbCh0aGlzLGUsdCl9LG8ucHJvdG90eXBlLnRvZ2dsZURyb3Bkb3duPWZ1bmN0aW9uKCl7dGhpcy5pc0Rpc2FibGVkKCl8fCh0aGlzLmlzT3BlbigpP3RoaXMuY2xvc2UoKTp0aGlzLm9wZW4oKSl9LG8ucHJvdG90eXBlLm9wZW49ZnVuY3Rpb24oKXt0aGlzLmlzT3BlbigpfHx0aGlzLmlzRGlzYWJsZWQoKXx8dGhpcy50cmlnZ2VyKFwicXVlcnlcIix7fSl9LG8ucHJvdG90eXBlLmNsb3NlPWZ1bmN0aW9uKGUpe3RoaXMuaXNPcGVuKCkmJnRoaXMudHJpZ2dlcihcImNsb3NlXCIse29yaWdpbmFsRXZlbnQ6ZX0pfSxvLnByb3RvdHlwZS5pc0VuYWJsZWQ9ZnVuY3Rpb24oKXtyZXR1cm4hdGhpcy5pc0Rpc2FibGVkKCl9LG8ucHJvdG90eXBlLmlzRGlzYWJsZWQ9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5vcHRpb25zLmdldChcImRpc2FibGVkXCIpfSxvLnByb3RvdHlwZS5pc09wZW49ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy4kY29udGFpbmVyWzBdLmNsYXNzTGlzdC5jb250YWlucyhcInNlbGVjdDItY29udGFpbmVyLS1vcGVuXCIpfSxvLnByb3RvdHlwZS5oYXNGb2N1cz1mdW5jdGlvbigpe3JldHVybiB0aGlzLiRjb250YWluZXJbMF0uY2xhc3NMaXN0LmNvbnRhaW5zKFwic2VsZWN0Mi1jb250YWluZXItLWZvY3VzXCIpfSxvLnByb3RvdHlwZS5mb2N1cz1mdW5jdGlvbihlKXt0aGlzLmhhc0ZvY3VzKCl8fCh0aGlzLiRjb250YWluZXJbMF0uY2xhc3NMaXN0LmFkZChcInNlbGVjdDItY29udGFpbmVyLS1mb2N1c1wiKSx0aGlzLnRyaWdnZXIoXCJmb2N1c1wiLHt9KSl9LG8ucHJvdG90eXBlLmVuYWJsZT1mdW5jdGlvbihlKXt0aGlzLm9wdGlvbnMuZ2V0KFwiZGVidWdcIikmJndpbmRvdy5jb25zb2xlJiZjb25zb2xlLndhcm4mJmNvbnNvbGUud2FybignU2VsZWN0MjogVGhlIGBzZWxlY3QyKFwiZW5hYmxlXCIpYCBtZXRob2QgaGFzIGJlZW4gZGVwcmVjYXRlZCBhbmQgd2lsbCBiZSByZW1vdmVkIGluIGxhdGVyIFNlbGVjdDIgdmVyc2lvbnMuIFVzZSAkZWxlbWVudC5wcm9wKFwiZGlzYWJsZWRcIikgaW5zdGVhZC4nKTtlPSEoZT1udWxsPT1lfHwwPT09ZS5sZW5ndGg/WyEwXTplKVswXTt0aGlzLiRlbGVtZW50LnByb3AoXCJkaXNhYmxlZFwiLGUpfSxvLnByb3RvdHlwZS5kYXRhPWZ1bmN0aW9uKCl7dGhpcy5vcHRpb25zLmdldChcImRlYnVnXCIpJiYwPGFyZ3VtZW50cy5sZW5ndGgmJndpbmRvdy5jb25zb2xlJiZjb25zb2xlLndhcm4mJmNvbnNvbGUud2FybignU2VsZWN0MjogRGF0YSBjYW4gbm8gbG9uZ2VyIGJlIHNldCB1c2luZyBgc2VsZWN0MihcImRhdGFcIilgLiBZb3Ugc2hvdWxkIGNvbnNpZGVyIHNldHRpbmcgdGhlIHZhbHVlIGluc3RlYWQgdXNpbmcgYCRlbGVtZW50LnZhbCgpYC4nKTt2YXIgdD1bXTtyZXR1cm4gdGhpcy5kYXRhQWRhcHRlci5jdXJyZW50KGZ1bmN0aW9uKGUpe3Q9ZX0pLHR9LG8ucHJvdG90eXBlLnZhbD1mdW5jdGlvbihlKXtpZih0aGlzLm9wdGlvbnMuZ2V0KFwiZGVidWdcIikmJndpbmRvdy5jb25zb2xlJiZjb25zb2xlLndhcm4mJmNvbnNvbGUud2FybignU2VsZWN0MjogVGhlIGBzZWxlY3QyKFwidmFsXCIpYCBtZXRob2QgaGFzIGJlZW4gZGVwcmVjYXRlZCBhbmQgd2lsbCBiZSByZW1vdmVkIGluIGxhdGVyIFNlbGVjdDIgdmVyc2lvbnMuIFVzZSAkZWxlbWVudC52YWwoKSBpbnN0ZWFkLicpLG51bGw9PWV8fDA9PT1lLmxlbmd0aClyZXR1cm4gdGhpcy4kZWxlbWVudC52YWwoKTtlPWVbMF07QXJyYXkuaXNBcnJheShlKSYmKGU9ZS5tYXAoZnVuY3Rpb24oZSl7cmV0dXJuIGUudG9TdHJpbmcoKX0pKSx0aGlzLiRlbGVtZW50LnZhbChlKS50cmlnZ2VyKFwiaW5wdXRcIikudHJpZ2dlcihcImNoYW5nZVwiKX0sby5wcm90b3R5cGUuZGVzdHJveT1mdW5jdGlvbigpe3IuUmVtb3ZlRGF0YSh0aGlzLiRjb250YWluZXJbMF0pLHRoaXMuJGNvbnRhaW5lci5yZW1vdmUoKSx0aGlzLl9vYnNlcnZlci5kaXNjb25uZWN0KCksdGhpcy5fb2JzZXJ2ZXI9bnVsbCx0aGlzLl9zeW5jQT1udWxsLHRoaXMuX3N5bmNTPW51bGwsdGhpcy4kZWxlbWVudC5vZmYoXCIuc2VsZWN0MlwiKSx0aGlzLiRlbGVtZW50LmF0dHIoXCJ0YWJpbmRleFwiLHIuR2V0RGF0YSh0aGlzLiRlbGVtZW50WzBdLFwib2xkLXRhYmluZGV4XCIpKSx0aGlzLiRlbGVtZW50WzBdLmNsYXNzTGlzdC5yZW1vdmUoXCJzZWxlY3QyLWhpZGRlbi1hY2Nlc3NpYmxlXCIpLHRoaXMuJGVsZW1lbnQuYXR0cihcImFyaWEtaGlkZGVuXCIsXCJmYWxzZVwiKSxyLlJlbW92ZURhdGEodGhpcy4kZWxlbWVudFswXSksdGhpcy4kZWxlbWVudC5yZW1vdmVEYXRhKFwic2VsZWN0MlwiKSx0aGlzLmRhdGFBZGFwdGVyLmRlc3Ryb3koKSx0aGlzLnNlbGVjdGlvbi5kZXN0cm95KCksdGhpcy5kcm9wZG93bi5kZXN0cm95KCksdGhpcy5yZXN1bHRzLmRlc3Ryb3koKSx0aGlzLmRhdGFBZGFwdGVyPW51bGwsdGhpcy5zZWxlY3Rpb249bnVsbCx0aGlzLmRyb3Bkb3duPW51bGwsdGhpcy5yZXN1bHRzPW51bGx9LG8ucHJvdG90eXBlLnJlbmRlcj1mdW5jdGlvbigpe3ZhciBlPXQoJzxzcGFuIGNsYXNzPVwic2VsZWN0MiBzZWxlY3QyLWNvbnRhaW5lclwiPjxzcGFuIGNsYXNzPVwic2VsZWN0aW9uXCI+PC9zcGFuPjxzcGFuIGNsYXNzPVwiZHJvcGRvd24td3JhcHBlclwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvc3Bhbj48L3NwYW4+Jyk7cmV0dXJuIGUuYXR0cihcImRpclwiLHRoaXMub3B0aW9ucy5nZXQoXCJkaXJcIikpLHRoaXMuJGNvbnRhaW5lcj1lLHRoaXMuJGNvbnRhaW5lclswXS5jbGFzc0xpc3QuYWRkKFwic2VsZWN0Mi1jb250YWluZXItLVwiK3RoaXMub3B0aW9ucy5nZXQoXCJ0aGVtZVwiKSksci5TdG9yZURhdGEoZVswXSxcImVsZW1lbnRcIix0aGlzLiRlbGVtZW50KSxlfSxvfSksdS5kZWZpbmUoXCJqcXVlcnktbW91c2V3aGVlbFwiLFtcImpxdWVyeVwiXSxmdW5jdGlvbihlKXtyZXR1cm4gZX0pLHUuZGVmaW5lKFwianF1ZXJ5LnNlbGVjdDJcIixbXCJqcXVlcnlcIixcImpxdWVyeS1tb3VzZXdoZWVsXCIsXCIuL3NlbGVjdDIvY29yZVwiLFwiLi9zZWxlY3QyL2RlZmF1bHRzXCIsXCIuL3NlbGVjdDIvdXRpbHNcIl0sZnVuY3Rpb24oaSxlLHIsdCxvKXt2YXIgYTtyZXR1cm4gbnVsbD09aS5mbi5zZWxlY3QyJiYoYT1bXCJvcGVuXCIsXCJjbG9zZVwiLFwiZGVzdHJveVwiXSxpLmZuLnNlbGVjdDI9ZnVuY3Rpb24odCl7aWYoXCJvYmplY3RcIj09dHlwZW9mKHQ9dHx8e30pKXJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXt2YXIgZT1pLmV4dGVuZCghMCx7fSx0KTtuZXcgcihpKHRoaXMpLGUpfSksdGhpcztpZihcInN0cmluZ1wiIT10eXBlb2YgdCl0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGFyZ3VtZW50cyBmb3IgU2VsZWN0MjogXCIrdCk7dmFyIG4scz1BcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsMSk7cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe3ZhciBlPW8uR2V0RGF0YSh0aGlzLFwic2VsZWN0MlwiKTtudWxsPT1lJiZ3aW5kb3cuY29uc29sZSYmY29uc29sZS5lcnJvciYmY29uc29sZS5lcnJvcihcIlRoZSBzZWxlY3QyKCdcIit0K1wiJykgbWV0aG9kIHdhcyBjYWxsZWQgb24gYW4gZWxlbWVudCB0aGF0IGlzIG5vdCB1c2luZyBTZWxlY3QyLlwiKSxuPWVbdF0uYXBwbHkoZSxzKX0pLC0xPGEuaW5kZXhPZih0KT90aGlzOm59KSxudWxsPT1pLmZuLnNlbGVjdDIuZGVmYXVsdHMmJihpLmZuLnNlbGVjdDIuZGVmYXVsdHM9dCkscn0pLHtkZWZpbmU6dS5kZWZpbmUscmVxdWlyZTp1LnJlcXVpcmV9KTtmdW5jdGlvbiBiKGUsdCl7cmV0dXJuIGkuY2FsbChlLHQpfWZ1bmN0aW9uIGwoZSx0KXt2YXIgbixzLGkscixvLGEsbCxjLHUsZCxwPXQmJnQuc3BsaXQoXCIvXCIpLGg9eS5tYXAsZj1oJiZoW1wiKlwiXXx8e307aWYoZSl7Zm9yKHQ9KGU9ZS5zcGxpdChcIi9cIikpLmxlbmd0aC0xLHkubm9kZUlkQ29tcGF0JiZfLnRlc3QoZVt0XSkmJihlW3RdPWVbdF0ucmVwbGFjZShfLFwiXCIpKSxcIi5cIj09PWVbMF0uY2hhckF0KDApJiZwJiYoZT1wLnNsaWNlKDAscC5sZW5ndGgtMSkuY29uY2F0KGUpKSxjPTA7YzxlLmxlbmd0aDtjKyspXCIuXCI9PT0oZD1lW2NdKT8oZS5zcGxpY2UoYywxKSwtLWMpOlwiLi5cIj09PWQmJigwPT09Y3x8MT09PWMmJlwiLi5cIj09PWVbMl18fFwiLi5cIj09PWVbYy0xXXx8MDxjJiYoZS5zcGxpY2UoYy0xLDIpLGMtPTIpKTtlPWUuam9pbihcIi9cIil9aWYoKHB8fGYpJiZoKXtmb3IoYz0obj1lLnNwbGl0KFwiL1wiKSkubGVuZ3RoOzA8YzstLWMpe2lmKHM9bi5zbGljZSgwLGMpLmpvaW4oXCIvXCIpLHApZm9yKHU9cC5sZW5ndGg7MDx1Oy0tdSlpZihpPWhbcC5zbGljZSgwLHUpLmpvaW4oXCIvXCIpXSxpPWkmJmlbc10pe3I9aSxvPWM7YnJlYWt9aWYocilicmVhazshYSYmZiYmZltzXSYmKGE9ZltzXSxsPWMpfSFyJiZhJiYocj1hLG89bCksciYmKG4uc3BsaWNlKDAsbyxyKSxlPW4uam9pbihcIi9cIikpfXJldHVybiBlfWZ1bmN0aW9uIHcodCxuKXtyZXR1cm4gZnVuY3Rpb24oKXt2YXIgZT1hLmNhbGwoYXJndW1lbnRzLDApO3JldHVyblwic3RyaW5nXCIhPXR5cGVvZiBlWzBdJiYxPT09ZS5sZW5ndGgmJmUucHVzaChudWxsKSxvLmFwcGx5KHAsZS5jb25jYXQoW3Qsbl0pKX19ZnVuY3Rpb24geChlKXt2YXIgdDtpZihiKG0sZSkmJih0PW1bZV0sZGVsZXRlIG1bZV0sdltlXT0hMCxyLmFwcGx5KHAsdCkpLCFiKGcsZSkmJiFiKHYsZSkpdGhyb3cgbmV3IEVycm9yKFwiTm8gXCIrZSk7cmV0dXJuIGdbZV19ZnVuY3Rpb24gYyhlKXt2YXIgdCxuPWU/ZS5pbmRleE9mKFwiIVwiKTotMTtyZXR1cm4tMTxuJiYodD1lLnN1YnN0cmluZygwLG4pLGU9ZS5zdWJzdHJpbmcobisxLGUubGVuZ3RoKSksW3QsZV19ZnVuY3Rpb24gQShlKXtyZXR1cm4gZT9jKGUpOltdfXZhciB1PXMucmVxdWlyZShcImpxdWVyeS5zZWxlY3QyXCIpO3JldHVybiB0LmZuLnNlbGVjdDIuYW1kPXMsdX0pOyIsIi8qXG4gICAgIF8gXyAgICAgIF8gICAgICAgX1xuIF9fX3wgKF8pIF9fX3wgfCBfXyAgKF8pX19fXG4vIF9ffCB8IHwvIF9ffCB8LyAvICB8IC8gX198XG5cXF9fIFxcIHwgfCAoX198ICAgPCBfIHwgXFxfXyBcXFxufF9fXy9ffF98XFxfX198X3xcXF8oXykvIHxfX18vXG4gICAgICAgICAgICAgICAgICAgfF9fL1xuXG4gVmVyc2lvbjogMS44LjBcbiAgQXV0aG9yOiBLZW4gV2hlZWxlclxuIFdlYnNpdGU6IGh0dHA6Ly9rZW53aGVlbGVyLmdpdGh1Yi5pb1xuICAgIERvY3M6IGh0dHA6Ly9rZW53aGVlbGVyLmdpdGh1Yi5pby9zbGlja1xuICAgIFJlcG86IGh0dHA6Ly9naXRodWIuY29tL2tlbndoZWVsZXIvc2xpY2tcbiAgSXNzdWVzOiBodHRwOi8vZ2l0aHViLmNvbS9rZW53aGVlbGVyL3NsaWNrL2lzc3Vlc1xuXG4gKi9cbi8qIGdsb2JhbCB3aW5kb3csIGRvY3VtZW50LCBkZWZpbmUsIGpRdWVyeSwgc2V0SW50ZXJ2YWwsIGNsZWFySW50ZXJ2YWwgKi9cbjsoZnVuY3Rpb24oZmFjdG9yeSkge1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShbJ2pxdWVyeSddLCBmYWN0b3J5KTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZSgnanF1ZXJ5JykpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGZhY3RvcnkoalF1ZXJ5KTtcbiAgICB9XG5cbn0oZnVuY3Rpb24oJCkge1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICB2YXIgU2xpY2sgPSB3aW5kb3cuU2xpY2sgfHwge307XG5cbiAgICBTbGljayA9IChmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgaW5zdGFuY2VVaWQgPSAwO1xuXG4gICAgICAgIGZ1bmN0aW9uIFNsaWNrKGVsZW1lbnQsIHNldHRpbmdzKSB7XG5cbiAgICAgICAgICAgIHZhciBfID0gdGhpcywgZGF0YVNldHRpbmdzO1xuXG4gICAgICAgICAgICBfLmRlZmF1bHRzID0ge1xuICAgICAgICAgICAgICAgIGFjY2Vzc2liaWxpdHk6IHRydWUsXG4gICAgICAgICAgICAgICAgYWRhcHRpdmVIZWlnaHQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGFwcGVuZEFycm93czogJChlbGVtZW50KSxcbiAgICAgICAgICAgICAgICBhcHBlbmREb3RzOiAkKGVsZW1lbnQpLFxuICAgICAgICAgICAgICAgIGFycm93czogdHJ1ZSxcbiAgICAgICAgICAgICAgICBhc05hdkZvcjogbnVsbCxcbiAgICAgICAgICAgICAgICBwcmV2QXJyb3c6ICc8YnV0dG9uIGNsYXNzPVwic2xpY2stcHJldlwiIGFyaWEtbGFiZWw9XCJQcmV2aW91c1wiIHR5cGU9XCJidXR0b25cIj5QcmV2aW91czwvYnV0dG9uPicsXG4gICAgICAgICAgICAgICAgbmV4dEFycm93OiAnPGJ1dHRvbiBjbGFzcz1cInNsaWNrLW5leHRcIiBhcmlhLWxhYmVsPVwiTmV4dFwiIHR5cGU9XCJidXR0b25cIj5OZXh0PC9idXR0b24+JyxcbiAgICAgICAgICAgICAgICBhdXRvcGxheTogZmFsc2UsXG4gICAgICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogMzAwMCxcbiAgICAgICAgICAgICAgICBjZW50ZXJNb2RlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjZW50ZXJQYWRkaW5nOiAnNTBweCcsXG4gICAgICAgICAgICAgICAgY3NzRWFzZTogJ2Vhc2UnLFxuICAgICAgICAgICAgICAgIGN1c3RvbVBhZ2luZzogZnVuY3Rpb24oc2xpZGVyLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAkKCc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiAvPicpLnRleHQoaSArIDEpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZG90czogZmFsc2UsXG4gICAgICAgICAgICAgICAgZG90c0NsYXNzOiAnc2xpY2stZG90cycsXG4gICAgICAgICAgICAgICAgZHJhZ2dhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGVhc2luZzogJ2xpbmVhcicsXG4gICAgICAgICAgICAgICAgZWRnZUZyaWN0aW9uOiAwLjM1LFxuICAgICAgICAgICAgICAgIGZhZGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGZvY3VzT25TZWxlY3Q6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGZvY3VzT25DaGFuZ2U6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGluaXRpYWxTbGlkZTogMCxcbiAgICAgICAgICAgICAgICBsYXp5TG9hZDogJ29uZGVtYW5kJyxcbiAgICAgICAgICAgICAgICBtb2JpbGVGaXJzdDogZmFsc2UsXG4gICAgICAgICAgICAgICAgcGF1c2VPbkhvdmVyOiB0cnVlLFxuICAgICAgICAgICAgICAgIHBhdXNlT25Gb2N1czogdHJ1ZSxcbiAgICAgICAgICAgICAgICBwYXVzZU9uRG90c0hvdmVyOiBmYWxzZSxcbiAgICAgICAgICAgICAgICByZXNwb25kVG86ICd3aW5kb3cnLFxuICAgICAgICAgICAgICAgIHJlc3BvbnNpdmU6IG51bGwsXG4gICAgICAgICAgICAgICAgcm93czogMSxcbiAgICAgICAgICAgICAgICBydGw6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHNsaWRlOiAnJyxcbiAgICAgICAgICAgICAgICBzbGlkZXNQZXJSb3c6IDEsXG4gICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxuICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICAgICAgICAgIHNwZWVkOiA1MDAsXG4gICAgICAgICAgICAgICAgc3dpcGU6IHRydWUsXG4gICAgICAgICAgICAgICAgc3dpcGVUb1NsaWRlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB0b3VjaE1vdmU6IHRydWUsXG4gICAgICAgICAgICAgICAgdG91Y2hUaHJlc2hvbGQ6IDUsXG4gICAgICAgICAgICAgICAgdXNlQ1NTOiB0cnVlLFxuICAgICAgICAgICAgICAgIHVzZVRyYW5zZm9ybTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB2YXJpYWJsZVdpZHRoOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB2ZXJ0aWNhbDogZmFsc2UsXG4gICAgICAgICAgICAgICAgdmVydGljYWxTd2lwaW5nOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB3YWl0Rm9yQW5pbWF0ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB6SW5kZXg6IDEwMDBcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIF8uaW5pdGlhbHMgPSB7XG4gICAgICAgICAgICAgICAgYW5pbWF0aW5nOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBkcmFnZ2luZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgYXV0b1BsYXlUaW1lcjogbnVsbCxcbiAgICAgICAgICAgICAgICBjdXJyZW50RGlyZWN0aW9uOiAwLFxuICAgICAgICAgICAgICAgIGN1cnJlbnRMZWZ0OiBudWxsLFxuICAgICAgICAgICAgICAgIGN1cnJlbnRTbGlkZTogMCxcbiAgICAgICAgICAgICAgICBkaXJlY3Rpb246IDEsXG4gICAgICAgICAgICAgICAgJGRvdHM6IG51bGwsXG4gICAgICAgICAgICAgICAgbGlzdFdpZHRoOiBudWxsLFxuICAgICAgICAgICAgICAgIGxpc3RIZWlnaHQ6IG51bGwsXG4gICAgICAgICAgICAgICAgbG9hZEluZGV4OiAwLFxuICAgICAgICAgICAgICAgICRuZXh0QXJyb3c6IG51bGwsXG4gICAgICAgICAgICAgICAgJHByZXZBcnJvdzogbnVsbCxcbiAgICAgICAgICAgICAgICBzY3JvbGxpbmc6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHNsaWRlQ291bnQ6IG51bGwsXG4gICAgICAgICAgICAgICAgc2xpZGVXaWR0aDogbnVsbCxcbiAgICAgICAgICAgICAgICAkc2xpZGVUcmFjazogbnVsbCxcbiAgICAgICAgICAgICAgICAkc2xpZGVzOiBudWxsLFxuICAgICAgICAgICAgICAgIHNsaWRpbmc6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHNsaWRlT2Zmc2V0OiAwLFxuICAgICAgICAgICAgICAgIHN3aXBlTGVmdDogbnVsbCxcbiAgICAgICAgICAgICAgICBzd2lwaW5nOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAkbGlzdDogbnVsbCxcbiAgICAgICAgICAgICAgICB0b3VjaE9iamVjdDoge30sXG4gICAgICAgICAgICAgICAgdHJhbnNmb3Jtc0VuYWJsZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHVuc2xpY2tlZDogZmFsc2VcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICQuZXh0ZW5kKF8sIF8uaW5pdGlhbHMpO1xuXG4gICAgICAgICAgICBfLmFjdGl2ZUJyZWFrcG9pbnQgPSBudWxsO1xuICAgICAgICAgICAgXy5hbmltVHlwZSA9IG51bGw7XG4gICAgICAgICAgICBfLmFuaW1Qcm9wID0gbnVsbDtcbiAgICAgICAgICAgIF8uYnJlYWtwb2ludHMgPSBbXTtcbiAgICAgICAgICAgIF8uYnJlYWtwb2ludFNldHRpbmdzID0gW107XG4gICAgICAgICAgICBfLmNzc1RyYW5zaXRpb25zID0gZmFsc2U7XG4gICAgICAgICAgICBfLmZvY3Vzc2VkID0gZmFsc2U7XG4gICAgICAgICAgICBfLmludGVycnVwdGVkID0gZmFsc2U7XG4gICAgICAgICAgICBfLmhpZGRlbiA9ICdoaWRkZW4nO1xuICAgICAgICAgICAgXy5wYXVzZWQgPSB0cnVlO1xuICAgICAgICAgICAgXy5wb3NpdGlvblByb3AgPSBudWxsO1xuICAgICAgICAgICAgXy5yZXNwb25kVG8gPSBudWxsO1xuICAgICAgICAgICAgXy5yb3dDb3VudCA9IDE7XG4gICAgICAgICAgICBfLnNob3VsZENsaWNrID0gdHJ1ZTtcbiAgICAgICAgICAgIF8uJHNsaWRlciA9ICQoZWxlbWVudCk7XG4gICAgICAgICAgICBfLiRzbGlkZXNDYWNoZSA9IG51bGw7XG4gICAgICAgICAgICBfLnRyYW5zZm9ybVR5cGUgPSBudWxsO1xuICAgICAgICAgICAgXy50cmFuc2l0aW9uVHlwZSA9IG51bGw7XG4gICAgICAgICAgICBfLnZpc2liaWxpdHlDaGFuZ2UgPSAndmlzaWJpbGl0eWNoYW5nZSc7XG4gICAgICAgICAgICBfLndpbmRvd1dpZHRoID0gMDtcbiAgICAgICAgICAgIF8ud2luZG93VGltZXIgPSBudWxsO1xuXG4gICAgICAgICAgICBkYXRhU2V0dGluZ3MgPSAkKGVsZW1lbnQpLmRhdGEoJ3NsaWNrJykgfHwge307XG5cbiAgICAgICAgICAgIF8ub3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCBfLmRlZmF1bHRzLCBzZXR0aW5ncywgZGF0YVNldHRpbmdzKTtcblxuICAgICAgICAgICAgXy5jdXJyZW50U2xpZGUgPSBfLm9wdGlvbnMuaW5pdGlhbFNsaWRlO1xuXG4gICAgICAgICAgICBfLm9yaWdpbmFsU2V0dGluZ3MgPSBfLm9wdGlvbnM7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgZG9jdW1lbnQubW96SGlkZGVuICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIF8uaGlkZGVuID0gJ21vekhpZGRlbic7XG4gICAgICAgICAgICAgICAgXy52aXNpYmlsaXR5Q2hhbmdlID0gJ21venZpc2liaWxpdHljaGFuZ2UnO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZG9jdW1lbnQud2Via2l0SGlkZGVuICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIF8uaGlkZGVuID0gJ3dlYmtpdEhpZGRlbic7XG4gICAgICAgICAgICAgICAgXy52aXNpYmlsaXR5Q2hhbmdlID0gJ3dlYmtpdHZpc2liaWxpdHljaGFuZ2UnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBfLmF1dG9QbGF5ID0gJC5wcm94eShfLmF1dG9QbGF5LCBfKTtcbiAgICAgICAgICAgIF8uYXV0b1BsYXlDbGVhciA9ICQucHJveHkoXy5hdXRvUGxheUNsZWFyLCBfKTtcbiAgICAgICAgICAgIF8uYXV0b1BsYXlJdGVyYXRvciA9ICQucHJveHkoXy5hdXRvUGxheUl0ZXJhdG9yLCBfKTtcbiAgICAgICAgICAgIF8uY2hhbmdlU2xpZGUgPSAkLnByb3h5KF8uY2hhbmdlU2xpZGUsIF8pO1xuICAgICAgICAgICAgXy5jbGlja0hhbmRsZXIgPSAkLnByb3h5KF8uY2xpY2tIYW5kbGVyLCBfKTtcbiAgICAgICAgICAgIF8uc2VsZWN0SGFuZGxlciA9ICQucHJveHkoXy5zZWxlY3RIYW5kbGVyLCBfKTtcbiAgICAgICAgICAgIF8uc2V0UG9zaXRpb24gPSAkLnByb3h5KF8uc2V0UG9zaXRpb24sIF8pO1xuICAgICAgICAgICAgXy5zd2lwZUhhbmRsZXIgPSAkLnByb3h5KF8uc3dpcGVIYW5kbGVyLCBfKTtcbiAgICAgICAgICAgIF8uZHJhZ0hhbmRsZXIgPSAkLnByb3h5KF8uZHJhZ0hhbmRsZXIsIF8pO1xuICAgICAgICAgICAgXy5rZXlIYW5kbGVyID0gJC5wcm94eShfLmtleUhhbmRsZXIsIF8pO1xuXG4gICAgICAgICAgICBfLmluc3RhbmNlVWlkID0gaW5zdGFuY2VVaWQrKztcblxuICAgICAgICAgICAgLy8gQSBzaW1wbGUgd2F5IHRvIGNoZWNrIGZvciBIVE1MIHN0cmluZ3NcbiAgICAgICAgICAgIC8vIFN0cmljdCBIVE1MIHJlY29nbml0aW9uIChtdXN0IHN0YXJ0IHdpdGggPClcbiAgICAgICAgICAgIC8vIEV4dHJhY3RlZCBmcm9tIGpRdWVyeSB2MS4xMSBzb3VyY2VcbiAgICAgICAgICAgIF8uaHRtbEV4cHIgPSAvXig/OlxccyooPFtcXHdcXFddKz4pW14+XSopJC87XG5cblxuICAgICAgICAgICAgXy5yZWdpc3RlckJyZWFrcG9pbnRzKCk7XG4gICAgICAgICAgICBfLmluaXQodHJ1ZSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBTbGljaztcblxuICAgIH0oKSk7XG5cbiAgICBTbGljay5wcm90b3R5cGUuYWN0aXZhdGVBREEgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIF8uJHNsaWRlVHJhY2suZmluZCgnLnNsaWNrLWFjdGl2ZScpLmF0dHIoe1xuICAgICAgICAgICAgJ2FyaWEtaGlkZGVuJzogJ2ZhbHNlJ1xuICAgICAgICB9KS5maW5kKCdhLCBpbnB1dCwgYnV0dG9uLCBzZWxlY3QnKS5hdHRyKHtcbiAgICAgICAgICAgICd0YWJpbmRleCc6ICcwJ1xuICAgICAgICB9KTtcblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuYWRkU2xpZGUgPSBTbGljay5wcm90b3R5cGUuc2xpY2tBZGQgPSBmdW5jdGlvbihtYXJrdXAsIGluZGV4LCBhZGRCZWZvcmUpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgaWYgKHR5cGVvZihpbmRleCkgPT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgYWRkQmVmb3JlID0gaW5kZXg7XG4gICAgICAgICAgICBpbmRleCA9IG51bGw7XG4gICAgICAgIH0gZWxzZSBpZiAoaW5kZXggPCAwIHx8IChpbmRleCA+PSBfLnNsaWRlQ291bnQpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBfLnVubG9hZCgpO1xuXG4gICAgICAgIGlmICh0eXBlb2YoaW5kZXgpID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgaWYgKGluZGV4ID09PSAwICYmIF8uJHNsaWRlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAkKG1hcmt1cCkuYXBwZW5kVG8oXy4kc2xpZGVUcmFjayk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGFkZEJlZm9yZSkge1xuICAgICAgICAgICAgICAgICQobWFya3VwKS5pbnNlcnRCZWZvcmUoXy4kc2xpZGVzLmVxKGluZGV4KSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICQobWFya3VwKS5pbnNlcnRBZnRlcihfLiRzbGlkZXMuZXEoaW5kZXgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChhZGRCZWZvcmUgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAkKG1hcmt1cCkucHJlcGVuZFRvKF8uJHNsaWRlVHJhY2spO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKG1hcmt1cCkuYXBwZW5kVG8oXy4kc2xpZGVUcmFjayk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBfLiRzbGlkZXMgPSBfLiRzbGlkZVRyYWNrLmNoaWxkcmVuKHRoaXMub3B0aW9ucy5zbGlkZSk7XG5cbiAgICAgICAgXy4kc2xpZGVUcmFjay5jaGlsZHJlbih0aGlzLm9wdGlvbnMuc2xpZGUpLmRldGFjaCgpO1xuXG4gICAgICAgIF8uJHNsaWRlVHJhY2suYXBwZW5kKF8uJHNsaWRlcyk7XG5cbiAgICAgICAgXy4kc2xpZGVzLmVhY2goZnVuY3Rpb24oaW5kZXgsIGVsZW1lbnQpIHtcbiAgICAgICAgICAgICQoZWxlbWVudCkuYXR0cignZGF0YS1zbGljay1pbmRleCcsIGluZGV4KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgXy4kc2xpZGVzQ2FjaGUgPSBfLiRzbGlkZXM7XG5cbiAgICAgICAgXy5yZWluaXQoKTtcblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuYW5pbWF0ZUhlaWdodCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgXyA9IHRoaXM7XG4gICAgICAgIGlmIChfLm9wdGlvbnMuc2xpZGVzVG9TaG93ID09PSAxICYmIF8ub3B0aW9ucy5hZGFwdGl2ZUhlaWdodCA9PT0gdHJ1ZSAmJiBfLm9wdGlvbnMudmVydGljYWwgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICB2YXIgdGFyZ2V0SGVpZ2h0ID0gXy4kc2xpZGVzLmVxKF8uY3VycmVudFNsaWRlKS5vdXRlckhlaWdodCh0cnVlKTtcbiAgICAgICAgICAgIF8uJGxpc3QuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiB0YXJnZXRIZWlnaHRcbiAgICAgICAgICAgIH0sIF8ub3B0aW9ucy5zcGVlZCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmFuaW1hdGVTbGlkZSA9IGZ1bmN0aW9uKHRhcmdldExlZnQsIGNhbGxiYWNrKSB7XG5cbiAgICAgICAgdmFyIGFuaW1Qcm9wcyA9IHt9LFxuICAgICAgICAgICAgXyA9IHRoaXM7XG5cbiAgICAgICAgXy5hbmltYXRlSGVpZ2h0KCk7XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5ydGwgPT09IHRydWUgJiYgXy5vcHRpb25zLnZlcnRpY2FsID09PSBmYWxzZSkge1xuICAgICAgICAgICAgdGFyZ2V0TGVmdCA9IC10YXJnZXRMZWZ0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChfLnRyYW5zZm9ybXNFbmFibGVkID09PSBmYWxzZSkge1xuICAgICAgICAgICAgaWYgKF8ub3B0aW9ucy52ZXJ0aWNhbCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBfLiRzbGlkZVRyYWNrLmFuaW1hdGUoe1xuICAgICAgICAgICAgICAgICAgICBsZWZ0OiB0YXJnZXRMZWZ0XG4gICAgICAgICAgICAgICAgfSwgXy5vcHRpb25zLnNwZWVkLCBfLm9wdGlvbnMuZWFzaW5nLCBjYWxsYmFjayk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIF8uJHNsaWRlVHJhY2suYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIHRvcDogdGFyZ2V0TGVmdFxuICAgICAgICAgICAgICAgIH0sIF8ub3B0aW9ucy5zcGVlZCwgXy5vcHRpb25zLmVhc2luZywgY2FsbGJhY2spO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIGlmIChfLmNzc1RyYW5zaXRpb25zID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIGlmIChfLm9wdGlvbnMucnRsID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIF8uY3VycmVudExlZnQgPSAtKF8uY3VycmVudExlZnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAkKHtcbiAgICAgICAgICAgICAgICAgICAgYW5pbVN0YXJ0OiBfLmN1cnJlbnRMZWZ0XG4gICAgICAgICAgICAgICAgfSkuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIGFuaW1TdGFydDogdGFyZ2V0TGVmdFxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IF8ub3B0aW9ucy5zcGVlZCxcbiAgICAgICAgICAgICAgICAgICAgZWFzaW5nOiBfLm9wdGlvbnMuZWFzaW5nLFxuICAgICAgICAgICAgICAgICAgICBzdGVwOiBmdW5jdGlvbihub3cpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vdyA9IE1hdGguY2VpbChub3cpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF8ub3B0aW9ucy52ZXJ0aWNhbCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltUHJvcHNbXy5hbmltVHlwZV0gPSAndHJhbnNsYXRlKCcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub3cgKyAncHgsIDBweCknO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF8uJHNsaWRlVHJhY2suY3NzKGFuaW1Qcm9wcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1Qcm9wc1tfLmFuaW1UeXBlXSA9ICd0cmFuc2xhdGUoMHB4LCcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub3cgKyAncHgpJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfLiRzbGlkZVRyYWNrLmNzcyhhbmltUHJvcHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIF8uYXBwbHlUcmFuc2l0aW9uKCk7XG4gICAgICAgICAgICAgICAgdGFyZ2V0TGVmdCA9IE1hdGguY2VpbCh0YXJnZXRMZWZ0KTtcblxuICAgICAgICAgICAgICAgIGlmIChfLm9wdGlvbnMudmVydGljYWwgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGFuaW1Qcm9wc1tfLmFuaW1UeXBlXSA9ICd0cmFuc2xhdGUzZCgnICsgdGFyZ2V0TGVmdCArICdweCwgMHB4LCAwcHgpJztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhbmltUHJvcHNbXy5hbmltVHlwZV0gPSAndHJhbnNsYXRlM2QoMHB4LCcgKyB0YXJnZXRMZWZ0ICsgJ3B4LCAwcHgpJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXy4kc2xpZGVUcmFjay5jc3MoYW5pbVByb3BzKTtcblxuICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBfLmRpc2FibGVUcmFuc2l0aW9uKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgXy5vcHRpb25zLnNwZWVkKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmdldE5hdlRhcmdldCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcyxcbiAgICAgICAgICAgIGFzTmF2Rm9yID0gXy5vcHRpb25zLmFzTmF2Rm9yO1xuXG4gICAgICAgIGlmICggYXNOYXZGb3IgJiYgYXNOYXZGb3IgIT09IG51bGwgKSB7XG4gICAgICAgICAgICBhc05hdkZvciA9ICQoYXNOYXZGb3IpLm5vdChfLiRzbGlkZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGFzTmF2Rm9yO1xuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5hc05hdkZvciA9IGZ1bmN0aW9uKGluZGV4KSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzLFxuICAgICAgICAgICAgYXNOYXZGb3IgPSBfLmdldE5hdlRhcmdldCgpO1xuXG4gICAgICAgIGlmICggYXNOYXZGb3IgIT09IG51bGwgJiYgdHlwZW9mIGFzTmF2Rm9yID09PSAnb2JqZWN0JyApIHtcbiAgICAgICAgICAgIGFzTmF2Rm9yLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRhcmdldCA9ICQodGhpcykuc2xpY2soJ2dldFNsaWNrJyk7XG4gICAgICAgICAgICAgICAgaWYoIXRhcmdldC51bnNsaWNrZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LnNsaWRlSGFuZGxlcihpbmRleCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuYXBwbHlUcmFuc2l0aW9uID0gZnVuY3Rpb24oc2xpZGUpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXMsXG4gICAgICAgICAgICB0cmFuc2l0aW9uID0ge307XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5mYWRlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgdHJhbnNpdGlvbltfLnRyYW5zaXRpb25UeXBlXSA9IF8udHJhbnNmb3JtVHlwZSArICcgJyArIF8ub3B0aW9ucy5zcGVlZCArICdtcyAnICsgXy5vcHRpb25zLmNzc0Vhc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0cmFuc2l0aW9uW18udHJhbnNpdGlvblR5cGVdID0gJ29wYWNpdHkgJyArIF8ub3B0aW9ucy5zcGVlZCArICdtcyAnICsgXy5vcHRpb25zLmNzc0Vhc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXy5vcHRpb25zLmZhZGUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBfLiRzbGlkZVRyYWNrLmNzcyh0cmFuc2l0aW9uKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF8uJHNsaWRlcy5lcShzbGlkZSkuY3NzKHRyYW5zaXRpb24pO1xuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmF1dG9QbGF5ID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIF8uYXV0b1BsYXlDbGVhcigpO1xuXG4gICAgICAgIGlmICggXy5zbGlkZUNvdW50ID4gXy5vcHRpb25zLnNsaWRlc1RvU2hvdyApIHtcbiAgICAgICAgICAgIF8uYXV0b1BsYXlUaW1lciA9IHNldEludGVydmFsKCBfLmF1dG9QbGF5SXRlcmF0b3IsIF8ub3B0aW9ucy5hdXRvcGxheVNwZWVkICk7XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuYXV0b1BsYXlDbGVhciA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBpZiAoXy5hdXRvUGxheVRpbWVyKSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKF8uYXV0b1BsYXlUaW1lcik7XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuYXV0b1BsYXlJdGVyYXRvciA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcyxcbiAgICAgICAgICAgIHNsaWRlVG8gPSBfLmN1cnJlbnRTbGlkZSArIF8ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbDtcblxuICAgICAgICBpZiAoICFfLnBhdXNlZCAmJiAhXy5pbnRlcnJ1cHRlZCAmJiAhXy5mb2N1c3NlZCApIHtcblxuICAgICAgICAgICAgaWYgKCBfLm9wdGlvbnMuaW5maW5pdGUgPT09IGZhbHNlICkge1xuXG4gICAgICAgICAgICAgICAgaWYgKCBfLmRpcmVjdGlvbiA9PT0gMSAmJiAoIF8uY3VycmVudFNsaWRlICsgMSApID09PSAoIF8uc2xpZGVDb3VudCAtIDEgKSkge1xuICAgICAgICAgICAgICAgICAgICBfLmRpcmVjdGlvbiA9IDA7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoIF8uZGlyZWN0aW9uID09PSAwICkge1xuXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlVG8gPSBfLmN1cnJlbnRTbGlkZSAtIF8ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbDtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIF8uY3VycmVudFNsaWRlIC0gMSA9PT0gMCApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF8uZGlyZWN0aW9uID0gMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIF8uc2xpZGVIYW5kbGVyKCBzbGlkZVRvICk7XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5idWlsZEFycm93cyA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBpZiAoXy5vcHRpb25zLmFycm93cyA9PT0gdHJ1ZSApIHtcblxuICAgICAgICAgICAgXy4kcHJldkFycm93ID0gJChfLm9wdGlvbnMucHJldkFycm93KS5hZGRDbGFzcygnc2xpY2stYXJyb3cnKTtcbiAgICAgICAgICAgIF8uJG5leHRBcnJvdyA9ICQoXy5vcHRpb25zLm5leHRBcnJvdykuYWRkQ2xhc3MoJ3NsaWNrLWFycm93Jyk7XG5cbiAgICAgICAgICAgIGlmKCBfLnNsaWRlQ291bnQgPiBfLm9wdGlvbnMuc2xpZGVzVG9TaG93ICkge1xuXG4gICAgICAgICAgICAgICAgXy4kcHJldkFycm93LnJlbW92ZUNsYXNzKCdzbGljay1oaWRkZW4nKS5yZW1vdmVBdHRyKCdhcmlhLWhpZGRlbiB0YWJpbmRleCcpO1xuICAgICAgICAgICAgICAgIF8uJG5leHRBcnJvdy5yZW1vdmVDbGFzcygnc2xpY2staGlkZGVuJykucmVtb3ZlQXR0cignYXJpYS1oaWRkZW4gdGFiaW5kZXgnKTtcblxuICAgICAgICAgICAgICAgIGlmIChfLmh0bWxFeHByLnRlc3QoXy5vcHRpb25zLnByZXZBcnJvdykpIHtcbiAgICAgICAgICAgICAgICAgICAgXy4kcHJldkFycm93LnByZXBlbmRUbyhfLm9wdGlvbnMuYXBwZW5kQXJyb3dzKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoXy5odG1sRXhwci50ZXN0KF8ub3B0aW9ucy5uZXh0QXJyb3cpKSB7XG4gICAgICAgICAgICAgICAgICAgIF8uJG5leHRBcnJvdy5hcHBlbmRUbyhfLm9wdGlvbnMuYXBwZW5kQXJyb3dzKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoXy5vcHRpb25zLmluZmluaXRlICE9PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIF8uJHByZXZBcnJvd1xuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdzbGljay1kaXNhYmxlZCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignYXJpYS1kaXNhYmxlZCcsICd0cnVlJyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgXy4kcHJldkFycm93LmFkZCggXy4kbmV4dEFycm93IClcblxuICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ3NsaWNrLWhpZGRlbicpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdhcmlhLWRpc2FibGVkJzogJ3RydWUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3RhYmluZGV4JzogJy0xJ1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuYnVpbGREb3RzID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzLFxuICAgICAgICAgICAgaSwgZG90O1xuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuZG90cyA9PT0gdHJ1ZSAmJiBfLnNsaWRlQ291bnQgPiBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSB7XG5cbiAgICAgICAgICAgIF8uJHNsaWRlci5hZGRDbGFzcygnc2xpY2stZG90dGVkJyk7XG5cbiAgICAgICAgICAgIGRvdCA9ICQoJzx1bCAvPicpLmFkZENsYXNzKF8ub3B0aW9ucy5kb3RzQ2xhc3MpO1xuXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDw9IF8uZ2V0RG90Q291bnQoKTsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgZG90LmFwcGVuZCgkKCc8bGkgLz4nKS5hcHBlbmQoXy5vcHRpb25zLmN1c3RvbVBhZ2luZy5jYWxsKHRoaXMsIF8sIGkpKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIF8uJGRvdHMgPSBkb3QuYXBwZW5kVG8oXy5vcHRpb25zLmFwcGVuZERvdHMpO1xuXG4gICAgICAgICAgICBfLiRkb3RzLmZpbmQoJ2xpJykuZmlyc3QoKS5hZGRDbGFzcygnc2xpY2stYWN0aXZlJyk7XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5idWlsZE91dCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBfLiRzbGlkZXMgPVxuICAgICAgICAgICAgXy4kc2xpZGVyXG4gICAgICAgICAgICAgICAgLmNoaWxkcmVuKCBfLm9wdGlvbnMuc2xpZGUgKyAnOm5vdCguc2xpY2stY2xvbmVkKScpXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKCdzbGljay1zbGlkZScpO1xuXG4gICAgICAgIF8uc2xpZGVDb3VudCA9IF8uJHNsaWRlcy5sZW5ndGg7XG5cbiAgICAgICAgXy4kc2xpZGVzLmVhY2goZnVuY3Rpb24oaW5kZXgsIGVsZW1lbnQpIHtcbiAgICAgICAgICAgICQoZWxlbWVudClcbiAgICAgICAgICAgICAgICAuYXR0cignZGF0YS1zbGljay1pbmRleCcsIGluZGV4KVxuICAgICAgICAgICAgICAgIC5kYXRhKCdvcmlnaW5hbFN0eWxpbmcnLCAkKGVsZW1lbnQpLmF0dHIoJ3N0eWxlJykgfHwgJycpO1xuICAgICAgICB9KTtcblxuICAgICAgICBfLiRzbGlkZXIuYWRkQ2xhc3MoJ3NsaWNrLXNsaWRlcicpO1xuXG4gICAgICAgIF8uJHNsaWRlVHJhY2sgPSAoXy5zbGlkZUNvdW50ID09PSAwKSA/XG4gICAgICAgICAgICAkKCc8ZGl2IGNsYXNzPVwic2xpY2stdHJhY2tcIi8+JykuYXBwZW5kVG8oXy4kc2xpZGVyKSA6XG4gICAgICAgICAgICBfLiRzbGlkZXMud3JhcEFsbCgnPGRpdiBjbGFzcz1cInNsaWNrLXRyYWNrXCIvPicpLnBhcmVudCgpO1xuXG4gICAgICAgIF8uJGxpc3QgPSBfLiRzbGlkZVRyYWNrLndyYXAoXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cInNsaWNrLWxpc3RcIi8+JykucGFyZW50KCk7XG4gICAgICAgIF8uJHNsaWRlVHJhY2suY3NzKCdvcGFjaXR5JywgMCk7XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5jZW50ZXJNb2RlID09PSB0cnVlIHx8IF8ub3B0aW9ucy5zd2lwZVRvU2xpZGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgIF8ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbCA9IDE7XG4gICAgICAgIH1cblxuICAgICAgICAkKCdpbWdbZGF0YS1sYXp5XScsIF8uJHNsaWRlcikubm90KCdbc3JjXScpLmFkZENsYXNzKCdzbGljay1sb2FkaW5nJyk7XG5cbiAgICAgICAgXy5zZXR1cEluZmluaXRlKCk7XG5cbiAgICAgICAgXy5idWlsZEFycm93cygpO1xuXG4gICAgICAgIF8uYnVpbGREb3RzKCk7XG5cbiAgICAgICAgXy51cGRhdGVEb3RzKCk7XG5cblxuICAgICAgICBfLnNldFNsaWRlQ2xhc3Nlcyh0eXBlb2YgXy5jdXJyZW50U2xpZGUgPT09ICdudW1iZXInID8gXy5jdXJyZW50U2xpZGUgOiAwKTtcblxuICAgICAgICBpZiAoXy5vcHRpb25zLmRyYWdnYWJsZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgXy4kbGlzdC5hZGRDbGFzcygnZHJhZ2dhYmxlJyk7XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuYnVpbGRSb3dzID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzLCBhLCBiLCBjLCBuZXdTbGlkZXMsIG51bU9mU2xpZGVzLCBvcmlnaW5hbFNsaWRlcyxzbGlkZXNQZXJTZWN0aW9uO1xuXG4gICAgICAgIG5ld1NsaWRlcyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAgICAgb3JpZ2luYWxTbGlkZXMgPSBfLiRzbGlkZXIuY2hpbGRyZW4oKTtcblxuICAgICAgICBpZihfLm9wdGlvbnMucm93cyA+IDApIHtcblxuICAgICAgICAgICAgc2xpZGVzUGVyU2VjdGlvbiA9IF8ub3B0aW9ucy5zbGlkZXNQZXJSb3cgKiBfLm9wdGlvbnMucm93cztcbiAgICAgICAgICAgIG51bU9mU2xpZGVzID0gTWF0aC5jZWlsKFxuICAgICAgICAgICAgICAgIG9yaWdpbmFsU2xpZGVzLmxlbmd0aCAvIHNsaWRlc1BlclNlY3Rpb25cbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGZvcihhID0gMDsgYSA8IG51bU9mU2xpZGVzOyBhKyspe1xuICAgICAgICAgICAgICAgIHZhciBzbGlkZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIGZvcihiID0gMDsgYiA8IF8ub3B0aW9ucy5yb3dzOyBiKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgICAgICBmb3IoYyA9IDA7IGMgPCBfLm9wdGlvbnMuc2xpZGVzUGVyUm93OyBjKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0YXJnZXQgPSAoYSAqIHNsaWRlc1BlclNlY3Rpb24gKyAoKGIgKiBfLm9wdGlvbnMuc2xpZGVzUGVyUm93KSArIGMpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcmlnaW5hbFNsaWRlcy5nZXQodGFyZ2V0KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdy5hcHBlbmRDaGlsZChvcmlnaW5hbFNsaWRlcy5nZXQodGFyZ2V0KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc2xpZGUuYXBwZW5kQ2hpbGQocm93KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbmV3U2xpZGVzLmFwcGVuZENoaWxkKHNsaWRlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgXy4kc2xpZGVyLmVtcHR5KCkuYXBwZW5kKG5ld1NsaWRlcyk7XG4gICAgICAgICAgICBfLiRzbGlkZXIuY2hpbGRyZW4oKS5jaGlsZHJlbigpLmNoaWxkcmVuKClcbiAgICAgICAgICAgICAgICAuY3NzKHtcbiAgICAgICAgICAgICAgICAgICAgJ3dpZHRoJzooMTAwIC8gXy5vcHRpb25zLnNsaWRlc1BlclJvdykgKyAnJScsXG4gICAgICAgICAgICAgICAgICAgICdkaXNwbGF5JzogJ2lubGluZS1ibG9jaydcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmNoZWNrUmVzcG9uc2l2ZSA9IGZ1bmN0aW9uKGluaXRpYWwsIGZvcmNlVXBkYXRlKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzLFxuICAgICAgICAgICAgYnJlYWtwb2ludCwgdGFyZ2V0QnJlYWtwb2ludCwgcmVzcG9uZFRvV2lkdGgsIHRyaWdnZXJCcmVha3BvaW50ID0gZmFsc2U7XG4gICAgICAgIHZhciBzbGlkZXJXaWR0aCA9IF8uJHNsaWRlci53aWR0aCgpO1xuICAgICAgICB2YXIgd2luZG93V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCB8fCAkKHdpbmRvdykud2lkdGgoKTtcblxuICAgICAgICBpZiAoXy5yZXNwb25kVG8gPT09ICd3aW5kb3cnKSB7XG4gICAgICAgICAgICByZXNwb25kVG9XaWR0aCA9IHdpbmRvd1dpZHRoO1xuICAgICAgICB9IGVsc2UgaWYgKF8ucmVzcG9uZFRvID09PSAnc2xpZGVyJykge1xuICAgICAgICAgICAgcmVzcG9uZFRvV2lkdGggPSBzbGlkZXJXaWR0aDtcbiAgICAgICAgfSBlbHNlIGlmIChfLnJlc3BvbmRUbyA9PT0gJ21pbicpIHtcbiAgICAgICAgICAgIHJlc3BvbmRUb1dpZHRoID0gTWF0aC5taW4od2luZG93V2lkdGgsIHNsaWRlcldpZHRoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggXy5vcHRpb25zLnJlc3BvbnNpdmUgJiZcbiAgICAgICAgICAgIF8ub3B0aW9ucy5yZXNwb25zaXZlLmxlbmd0aCAmJlxuICAgICAgICAgICAgXy5vcHRpb25zLnJlc3BvbnNpdmUgIT09IG51bGwpIHtcblxuICAgICAgICAgICAgdGFyZ2V0QnJlYWtwb2ludCA9IG51bGw7XG5cbiAgICAgICAgICAgIGZvciAoYnJlYWtwb2ludCBpbiBfLmJyZWFrcG9pbnRzKSB7XG4gICAgICAgICAgICAgICAgaWYgKF8uYnJlYWtwb2ludHMuaGFzT3duUHJvcGVydHkoYnJlYWtwb2ludCkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKF8ub3JpZ2luYWxTZXR0aW5ncy5tb2JpbGVGaXJzdCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25kVG9XaWR0aCA8IF8uYnJlYWtwb2ludHNbYnJlYWtwb2ludF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRCcmVha3BvaW50ID0gXy5icmVha3BvaW50c1ticmVha3BvaW50XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25kVG9XaWR0aCA+IF8uYnJlYWtwb2ludHNbYnJlYWtwb2ludF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRCcmVha3BvaW50ID0gXy5icmVha3BvaW50c1ticmVha3BvaW50XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRhcmdldEJyZWFrcG9pbnQgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBpZiAoXy5hY3RpdmVCcmVha3BvaW50ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0YXJnZXRCcmVha3BvaW50ICE9PSBfLmFjdGl2ZUJyZWFrcG9pbnQgfHwgZm9yY2VVcGRhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF8uYWN0aXZlQnJlYWtwb2ludCA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0QnJlYWtwb2ludDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfLmJyZWFrcG9pbnRTZXR0aW5nc1t0YXJnZXRCcmVha3BvaW50XSA9PT0gJ3Vuc2xpY2snKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXy51bnNsaWNrKHRhcmdldEJyZWFrcG9pbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfLm9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgXy5vcmlnaW5hbFNldHRpbmdzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfLmJyZWFrcG9pbnRTZXR0aW5nc1tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldEJyZWFrcG9pbnRdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5pdGlhbCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfLmN1cnJlbnRTbGlkZSA9IF8ub3B0aW9ucy5pbml0aWFsU2xpZGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF8ucmVmcmVzaChpbml0aWFsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRyaWdnZXJCcmVha3BvaW50ID0gdGFyZ2V0QnJlYWtwb2ludDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIF8uYWN0aXZlQnJlYWtwb2ludCA9IHRhcmdldEJyZWFrcG9pbnQ7XG4gICAgICAgICAgICAgICAgICAgIGlmIChfLmJyZWFrcG9pbnRTZXR0aW5nc1t0YXJnZXRCcmVha3BvaW50XSA9PT0gJ3Vuc2xpY2snKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfLnVuc2xpY2sodGFyZ2V0QnJlYWtwb2ludCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfLm9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgXy5vcmlnaW5hbFNldHRpbmdzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF8uYnJlYWtwb2ludFNldHRpbmdzW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRCcmVha3BvaW50XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5pdGlhbCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF8uY3VycmVudFNsaWRlID0gXy5vcHRpb25zLmluaXRpYWxTbGlkZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIF8ucmVmcmVzaChpbml0aWFsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyQnJlYWtwb2ludCA9IHRhcmdldEJyZWFrcG9pbnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoXy5hY3RpdmVCcmVha3BvaW50ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIF8uYWN0aXZlQnJlYWtwb2ludCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIF8ub3B0aW9ucyA9IF8ub3JpZ2luYWxTZXR0aW5ncztcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluaXRpYWwgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF8uY3VycmVudFNsaWRlID0gXy5vcHRpb25zLmluaXRpYWxTbGlkZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBfLnJlZnJlc2goaW5pdGlhbCk7XG4gICAgICAgICAgICAgICAgICAgIHRyaWdnZXJCcmVha3BvaW50ID0gdGFyZ2V0QnJlYWtwb2ludDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIG9ubHkgdHJpZ2dlciBicmVha3BvaW50cyBkdXJpbmcgYW4gYWN0dWFsIGJyZWFrLiBub3Qgb24gaW5pdGlhbGl6ZS5cbiAgICAgICAgICAgIGlmKCAhaW5pdGlhbCAmJiB0cmlnZ2VyQnJlYWtwb2ludCAhPT0gZmFsc2UgKSB7XG4gICAgICAgICAgICAgICAgXy4kc2xpZGVyLnRyaWdnZXIoJ2JyZWFrcG9pbnQnLCBbXywgdHJpZ2dlckJyZWFrcG9pbnRdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5jaGFuZ2VTbGlkZSA9IGZ1bmN0aW9uKGV2ZW50LCBkb250QW5pbWF0ZSkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcyxcbiAgICAgICAgICAgICR0YXJnZXQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLFxuICAgICAgICAgICAgaW5kZXhPZmZzZXQsIHNsaWRlT2Zmc2V0LCB1bmV2ZW5PZmZzZXQ7XG5cbiAgICAgICAgLy8gSWYgdGFyZ2V0IGlzIGEgbGluaywgcHJldmVudCBkZWZhdWx0IGFjdGlvbi5cbiAgICAgICAgaWYoJHRhcmdldC5pcygnYScpKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgdGFyZ2V0IGlzIG5vdCB0aGUgPGxpPiBlbGVtZW50IChpZTogYSBjaGlsZCksIGZpbmQgdGhlIDxsaT4uXG4gICAgICAgIGlmKCEkdGFyZ2V0LmlzKCdsaScpKSB7XG4gICAgICAgICAgICAkdGFyZ2V0ID0gJHRhcmdldC5jbG9zZXN0KCdsaScpO1xuICAgICAgICB9XG5cbiAgICAgICAgdW5ldmVuT2Zmc2V0ID0gKF8uc2xpZGVDb3VudCAlIF8ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbCAhPT0gMCk7XG4gICAgICAgIGluZGV4T2Zmc2V0ID0gdW5ldmVuT2Zmc2V0ID8gMCA6IChfLnNsaWRlQ291bnQgLSBfLmN1cnJlbnRTbGlkZSkgJSBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGw7XG5cbiAgICAgICAgc3dpdGNoIChldmVudC5kYXRhLm1lc3NhZ2UpIHtcblxuICAgICAgICAgICAgY2FzZSAncHJldmlvdXMnOlxuICAgICAgICAgICAgICAgIHNsaWRlT2Zmc2V0ID0gaW5kZXhPZmZzZXQgPT09IDAgPyBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGwgOiBfLm9wdGlvbnMuc2xpZGVzVG9TaG93IC0gaW5kZXhPZmZzZXQ7XG4gICAgICAgICAgICAgICAgaWYgKF8uc2xpZGVDb3VudCA+IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpIHtcbiAgICAgICAgICAgICAgICAgICAgXy5zbGlkZUhhbmRsZXIoXy5jdXJyZW50U2xpZGUgLSBzbGlkZU9mZnNldCwgZmFsc2UsIGRvbnRBbmltYXRlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ25leHQnOlxuICAgICAgICAgICAgICAgIHNsaWRlT2Zmc2V0ID0gaW5kZXhPZmZzZXQgPT09IDAgPyBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGwgOiBpbmRleE9mZnNldDtcbiAgICAgICAgICAgICAgICBpZiAoXy5zbGlkZUNvdW50ID4gXy5vcHRpb25zLnNsaWRlc1RvU2hvdykge1xuICAgICAgICAgICAgICAgICAgICBfLnNsaWRlSGFuZGxlcihfLmN1cnJlbnRTbGlkZSArIHNsaWRlT2Zmc2V0LCBmYWxzZSwgZG9udEFuaW1hdGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnaW5kZXgnOlxuICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IGV2ZW50LmRhdGEuaW5kZXggPT09IDAgPyAwIDpcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuZGF0YS5pbmRleCB8fCAkdGFyZ2V0LmluZGV4KCkgKiBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGw7XG5cbiAgICAgICAgICAgICAgICBfLnNsaWRlSGFuZGxlcihfLmNoZWNrTmF2aWdhYmxlKGluZGV4KSwgZmFsc2UsIGRvbnRBbmltYXRlKTtcbiAgICAgICAgICAgICAgICAkdGFyZ2V0LmNoaWxkcmVuKCkudHJpZ2dlcignZm9jdXMnKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuY2hlY2tOYXZpZ2FibGUgPSBmdW5jdGlvbihpbmRleCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcyxcbiAgICAgICAgICAgIG5hdmlnYWJsZXMsIHByZXZOYXZpZ2FibGU7XG5cbiAgICAgICAgbmF2aWdhYmxlcyA9IF8uZ2V0TmF2aWdhYmxlSW5kZXhlcygpO1xuICAgICAgICBwcmV2TmF2aWdhYmxlID0gMDtcbiAgICAgICAgaWYgKGluZGV4ID4gbmF2aWdhYmxlc1tuYXZpZ2FibGVzLmxlbmd0aCAtIDFdKSB7XG4gICAgICAgICAgICBpbmRleCA9IG5hdmlnYWJsZXNbbmF2aWdhYmxlcy5sZW5ndGggLSAxXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvciAodmFyIG4gaW4gbmF2aWdhYmxlcykge1xuICAgICAgICAgICAgICAgIGlmIChpbmRleCA8IG5hdmlnYWJsZXNbbl0pIHtcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSBwcmV2TmF2aWdhYmxlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcHJldk5hdmlnYWJsZSA9IG5hdmlnYWJsZXNbbl07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5jbGVhblVwRXZlbnRzID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuZG90cyAmJiBfLiRkb3RzICE9PSBudWxsKSB7XG5cbiAgICAgICAgICAgICQoJ2xpJywgXy4kZG90cylcbiAgICAgICAgICAgICAgICAub2ZmKCdjbGljay5zbGljaycsIF8uY2hhbmdlU2xpZGUpXG4gICAgICAgICAgICAgICAgLm9mZignbW91c2VlbnRlci5zbGljaycsICQucHJveHkoXy5pbnRlcnJ1cHQsIF8sIHRydWUpKVxuICAgICAgICAgICAgICAgIC5vZmYoJ21vdXNlbGVhdmUuc2xpY2snLCAkLnByb3h5KF8uaW50ZXJydXB0LCBfLCBmYWxzZSkpO1xuXG4gICAgICAgICAgICBpZiAoXy5vcHRpb25zLmFjY2Vzc2liaWxpdHkgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBfLiRkb3RzLm9mZigna2V5ZG93bi5zbGljaycsIF8ua2V5SGFuZGxlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBfLiRzbGlkZXIub2ZmKCdmb2N1cy5zbGljayBibHVyLnNsaWNrJyk7XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5hcnJvd3MgPT09IHRydWUgJiYgXy5zbGlkZUNvdW50ID4gXy5vcHRpb25zLnNsaWRlc1RvU2hvdykge1xuICAgICAgICAgICAgXy4kcHJldkFycm93ICYmIF8uJHByZXZBcnJvdy5vZmYoJ2NsaWNrLnNsaWNrJywgXy5jaGFuZ2VTbGlkZSk7XG4gICAgICAgICAgICBfLiRuZXh0QXJyb3cgJiYgXy4kbmV4dEFycm93Lm9mZignY2xpY2suc2xpY2snLCBfLmNoYW5nZVNsaWRlKTtcblxuICAgICAgICAgICAgaWYgKF8ub3B0aW9ucy5hY2Nlc3NpYmlsaXR5ID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgXy4kcHJldkFycm93ICYmIF8uJHByZXZBcnJvdy5vZmYoJ2tleWRvd24uc2xpY2snLCBfLmtleUhhbmRsZXIpO1xuICAgICAgICAgICAgICAgIF8uJG5leHRBcnJvdyAmJiBfLiRuZXh0QXJyb3cub2ZmKCdrZXlkb3duLnNsaWNrJywgXy5rZXlIYW5kbGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIF8uJGxpc3Qub2ZmKCd0b3VjaHN0YXJ0LnNsaWNrIG1vdXNlZG93bi5zbGljaycsIF8uc3dpcGVIYW5kbGVyKTtcbiAgICAgICAgXy4kbGlzdC5vZmYoJ3RvdWNobW92ZS5zbGljayBtb3VzZW1vdmUuc2xpY2snLCBfLnN3aXBlSGFuZGxlcik7XG4gICAgICAgIF8uJGxpc3Qub2ZmKCd0b3VjaGVuZC5zbGljayBtb3VzZXVwLnNsaWNrJywgXy5zd2lwZUhhbmRsZXIpO1xuICAgICAgICBfLiRsaXN0Lm9mZigndG91Y2hjYW5jZWwuc2xpY2sgbW91c2VsZWF2ZS5zbGljaycsIF8uc3dpcGVIYW5kbGVyKTtcblxuICAgICAgICBfLiRsaXN0Lm9mZignY2xpY2suc2xpY2snLCBfLmNsaWNrSGFuZGxlcik7XG5cbiAgICAgICAgJChkb2N1bWVudCkub2ZmKF8udmlzaWJpbGl0eUNoYW5nZSwgXy52aXNpYmlsaXR5KTtcblxuICAgICAgICBfLmNsZWFuVXBTbGlkZUV2ZW50cygpO1xuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuYWNjZXNzaWJpbGl0eSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgXy4kbGlzdC5vZmYoJ2tleWRvd24uc2xpY2snLCBfLmtleUhhbmRsZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5mb2N1c09uU2VsZWN0ID09PSB0cnVlKSB7XG4gICAgICAgICAgICAkKF8uJHNsaWRlVHJhY2spLmNoaWxkcmVuKCkub2ZmKCdjbGljay5zbGljaycsIF8uc2VsZWN0SGFuZGxlcik7XG4gICAgICAgIH1cblxuICAgICAgICAkKHdpbmRvdykub2ZmKCdvcmllbnRhdGlvbmNoYW5nZS5zbGljay5zbGljay0nICsgXy5pbnN0YW5jZVVpZCwgXy5vcmllbnRhdGlvbkNoYW5nZSk7XG5cbiAgICAgICAgJCh3aW5kb3cpLm9mZigncmVzaXplLnNsaWNrLnNsaWNrLScgKyBfLmluc3RhbmNlVWlkLCBfLnJlc2l6ZSk7XG5cbiAgICAgICAgJCgnW2RyYWdnYWJsZSE9dHJ1ZV0nLCBfLiRzbGlkZVRyYWNrKS5vZmYoJ2RyYWdzdGFydCcsIF8ucHJldmVudERlZmF1bHQpO1xuXG4gICAgICAgICQod2luZG93KS5vZmYoJ2xvYWQuc2xpY2suc2xpY2stJyArIF8uaW5zdGFuY2VVaWQsIF8uc2V0UG9zaXRpb24pO1xuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5jbGVhblVwU2xpZGVFdmVudHMgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgXy4kbGlzdC5vZmYoJ21vdXNlZW50ZXIuc2xpY2snLCAkLnByb3h5KF8uaW50ZXJydXB0LCBfLCB0cnVlKSk7XG4gICAgICAgIF8uJGxpc3Qub2ZmKCdtb3VzZWxlYXZlLnNsaWNrJywgJC5wcm94eShfLmludGVycnVwdCwgXywgZmFsc2UpKTtcblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuY2xlYW5VcFJvd3MgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXMsIG9yaWdpbmFsU2xpZGVzO1xuXG4gICAgICAgIGlmKF8ub3B0aW9ucy5yb3dzID4gMCkge1xuICAgICAgICAgICAgb3JpZ2luYWxTbGlkZXMgPSBfLiRzbGlkZXMuY2hpbGRyZW4oKS5jaGlsZHJlbigpO1xuICAgICAgICAgICAgb3JpZ2luYWxTbGlkZXMucmVtb3ZlQXR0cignc3R5bGUnKTtcbiAgICAgICAgICAgIF8uJHNsaWRlci5lbXB0eSgpLmFwcGVuZChvcmlnaW5hbFNsaWRlcyk7XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuY2xpY2tIYW5kbGVyID0gZnVuY3Rpb24oZXZlbnQpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgaWYgKF8uc2hvdWxkQ2xpY2sgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24ocmVmcmVzaCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBfLmF1dG9QbGF5Q2xlYXIoKTtcblxuICAgICAgICBfLnRvdWNoT2JqZWN0ID0ge307XG5cbiAgICAgICAgXy5jbGVhblVwRXZlbnRzKCk7XG5cbiAgICAgICAgJCgnLnNsaWNrLWNsb25lZCcsIF8uJHNsaWRlcikuZGV0YWNoKCk7XG5cbiAgICAgICAgaWYgKF8uJGRvdHMpIHtcbiAgICAgICAgICAgIF8uJGRvdHMucmVtb3ZlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIF8uJHByZXZBcnJvdyAmJiBfLiRwcmV2QXJyb3cubGVuZ3RoICkge1xuXG4gICAgICAgICAgICBfLiRwcmV2QXJyb3dcbiAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ3NsaWNrLWRpc2FibGVkIHNsaWNrLWFycm93IHNsaWNrLWhpZGRlbicpXG4gICAgICAgICAgICAgICAgLnJlbW92ZUF0dHIoJ2FyaWEtaGlkZGVuIGFyaWEtZGlzYWJsZWQgdGFiaW5kZXgnKVxuICAgICAgICAgICAgICAgIC5jc3MoJ2Rpc3BsYXknLCcnKTtcblxuICAgICAgICAgICAgaWYgKCBfLmh0bWxFeHByLnRlc3QoIF8ub3B0aW9ucy5wcmV2QXJyb3cgKSkge1xuICAgICAgICAgICAgICAgIF8uJHByZXZBcnJvdy5yZW1vdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggXy4kbmV4dEFycm93ICYmIF8uJG5leHRBcnJvdy5sZW5ndGggKSB7XG5cbiAgICAgICAgICAgIF8uJG5leHRBcnJvd1xuICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnc2xpY2stZGlzYWJsZWQgc2xpY2stYXJyb3cgc2xpY2staGlkZGVuJylcbiAgICAgICAgICAgICAgICAucmVtb3ZlQXR0cignYXJpYS1oaWRkZW4gYXJpYS1kaXNhYmxlZCB0YWJpbmRleCcpXG4gICAgICAgICAgICAgICAgLmNzcygnZGlzcGxheScsJycpO1xuXG4gICAgICAgICAgICBpZiAoIF8uaHRtbEV4cHIudGVzdCggXy5vcHRpb25zLm5leHRBcnJvdyApKSB7XG4gICAgICAgICAgICAgICAgXy4kbmV4dEFycm93LnJlbW92ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cblxuICAgICAgICBpZiAoXy4kc2xpZGVzKSB7XG5cbiAgICAgICAgICAgIF8uJHNsaWRlc1xuICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnc2xpY2stc2xpZGUgc2xpY2stYWN0aXZlIHNsaWNrLWNlbnRlciBzbGljay12aXNpYmxlIHNsaWNrLWN1cnJlbnQnKVxuICAgICAgICAgICAgICAgIC5yZW1vdmVBdHRyKCdhcmlhLWhpZGRlbicpXG4gICAgICAgICAgICAgICAgLnJlbW92ZUF0dHIoJ2RhdGEtc2xpY2staW5kZXgnKVxuICAgICAgICAgICAgICAgIC5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuYXR0cignc3R5bGUnLCAkKHRoaXMpLmRhdGEoJ29yaWdpbmFsU3R5bGluZycpKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgXy4kc2xpZGVUcmFjay5jaGlsZHJlbih0aGlzLm9wdGlvbnMuc2xpZGUpLmRldGFjaCgpO1xuXG4gICAgICAgICAgICBfLiRzbGlkZVRyYWNrLmRldGFjaCgpO1xuXG4gICAgICAgICAgICBfLiRsaXN0LmRldGFjaCgpO1xuXG4gICAgICAgICAgICBfLiRzbGlkZXIuYXBwZW5kKF8uJHNsaWRlcyk7XG4gICAgICAgIH1cblxuICAgICAgICBfLmNsZWFuVXBSb3dzKCk7XG5cbiAgICAgICAgXy4kc2xpZGVyLnJlbW92ZUNsYXNzKCdzbGljay1zbGlkZXInKTtcbiAgICAgICAgXy4kc2xpZGVyLnJlbW92ZUNsYXNzKCdzbGljay1pbml0aWFsaXplZCcpO1xuICAgICAgICBfLiRzbGlkZXIucmVtb3ZlQ2xhc3MoJ3NsaWNrLWRvdHRlZCcpO1xuXG4gICAgICAgIF8udW5zbGlja2VkID0gdHJ1ZTtcblxuICAgICAgICBpZighcmVmcmVzaCkge1xuICAgICAgICAgICAgXy4kc2xpZGVyLnRyaWdnZXIoJ2Rlc3Ryb3knLCBbX10pO1xuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmRpc2FibGVUcmFuc2l0aW9uID0gZnVuY3Rpb24oc2xpZGUpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXMsXG4gICAgICAgICAgICB0cmFuc2l0aW9uID0ge307XG5cbiAgICAgICAgdHJhbnNpdGlvbltfLnRyYW5zaXRpb25UeXBlXSA9ICcnO1xuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuZmFkZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIF8uJHNsaWRlVHJhY2suY3NzKHRyYW5zaXRpb24pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgXy4kc2xpZGVzLmVxKHNsaWRlKS5jc3ModHJhbnNpdGlvbik7XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuZmFkZVNsaWRlID0gZnVuY3Rpb24oc2xpZGVJbmRleCwgY2FsbGJhY2spIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgaWYgKF8uY3NzVHJhbnNpdGlvbnMgPT09IGZhbHNlKSB7XG5cbiAgICAgICAgICAgIF8uJHNsaWRlcy5lcShzbGlkZUluZGV4KS5jc3Moe1xuICAgICAgICAgICAgICAgIHpJbmRleDogXy5vcHRpb25zLnpJbmRleFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIF8uJHNsaWRlcy5lcShzbGlkZUluZGV4KS5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAxXG4gICAgICAgICAgICB9LCBfLm9wdGlvbnMuc3BlZWQsIF8ub3B0aW9ucy5lYXNpbmcsIGNhbGxiYWNrKTtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBfLmFwcGx5VHJhbnNpdGlvbihzbGlkZUluZGV4KTtcblxuICAgICAgICAgICAgXy4kc2xpZGVzLmVxKHNsaWRlSW5kZXgpLmNzcyh7XG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgICAgICAgICB6SW5kZXg6IF8ub3B0aW9ucy56SW5kZXhcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICAgICAgICAgIF8uZGlzYWJsZVRyYW5zaXRpb24oc2xpZGVJbmRleCk7XG5cbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbCgpO1xuICAgICAgICAgICAgICAgIH0sIF8ub3B0aW9ucy5zcGVlZCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5mYWRlU2xpZGVPdXQgPSBmdW5jdGlvbihzbGlkZUluZGV4KSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIGlmIChfLmNzc1RyYW5zaXRpb25zID09PSBmYWxzZSkge1xuXG4gICAgICAgICAgICBfLiRzbGlkZXMuZXEoc2xpZGVJbmRleCkuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMCxcbiAgICAgICAgICAgICAgICB6SW5kZXg6IF8ub3B0aW9ucy56SW5kZXggLSAyXG4gICAgICAgICAgICB9LCBfLm9wdGlvbnMuc3BlZWQsIF8ub3B0aW9ucy5lYXNpbmcpO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIF8uYXBwbHlUcmFuc2l0aW9uKHNsaWRlSW5kZXgpO1xuXG4gICAgICAgICAgICBfLiRzbGlkZXMuZXEoc2xpZGVJbmRleCkuY3NzKHtcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAwLFxuICAgICAgICAgICAgICAgIHpJbmRleDogXy5vcHRpb25zLnpJbmRleCAtIDJcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuZmlsdGVyU2xpZGVzID0gU2xpY2sucHJvdG90eXBlLnNsaWNrRmlsdGVyID0gZnVuY3Rpb24oZmlsdGVyKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIGlmIChmaWx0ZXIgIT09IG51bGwpIHtcblxuICAgICAgICAgICAgXy4kc2xpZGVzQ2FjaGUgPSBfLiRzbGlkZXM7XG5cbiAgICAgICAgICAgIF8udW5sb2FkKCk7XG5cbiAgICAgICAgICAgIF8uJHNsaWRlVHJhY2suY2hpbGRyZW4odGhpcy5vcHRpb25zLnNsaWRlKS5kZXRhY2goKTtcblxuICAgICAgICAgICAgXy4kc2xpZGVzQ2FjaGUuZmlsdGVyKGZpbHRlcikuYXBwZW5kVG8oXy4kc2xpZGVUcmFjayk7XG5cbiAgICAgICAgICAgIF8ucmVpbml0KCk7XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5mb2N1c0hhbmRsZXIgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgXy4kc2xpZGVyXG4gICAgICAgICAgICAub2ZmKCdmb2N1cy5zbGljayBibHVyLnNsaWNrJylcbiAgICAgICAgICAgIC5vbignZm9jdXMuc2xpY2sgYmx1ci5zbGljaycsICcqJywgZnVuY3Rpb24oZXZlbnQpIHtcblxuICAgICAgICAgICAgZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB2YXIgJHNmID0gJCh0aGlzKTtcblxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgICAgIGlmKCBfLm9wdGlvbnMucGF1c2VPbkZvY3VzICkge1xuICAgICAgICAgICAgICAgICAgICBfLmZvY3Vzc2VkID0gJHNmLmlzKCc6Zm9jdXMnKTtcbiAgICAgICAgICAgICAgICAgICAgXy5hdXRvUGxheSgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSwgMCk7XG5cbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5nZXRDdXJyZW50ID0gU2xpY2sucHJvdG90eXBlLnNsaWNrQ3VycmVudFNsaWRlID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuICAgICAgICByZXR1cm4gXy5jdXJyZW50U2xpZGU7XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmdldERvdENvdW50ID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIHZhciBicmVha1BvaW50ID0gMDtcbiAgICAgICAgdmFyIGNvdW50ZXIgPSAwO1xuICAgICAgICB2YXIgcGFnZXJRdHkgPSAwO1xuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuaW5maW5pdGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGlmIChfLnNsaWRlQ291bnQgPD0gXy5vcHRpb25zLnNsaWRlc1RvU2hvdykge1xuICAgICAgICAgICAgICAgICArK3BhZ2VyUXR5O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB3aGlsZSAoYnJlYWtQb2ludCA8IF8uc2xpZGVDb3VudCkge1xuICAgICAgICAgICAgICAgICAgICArK3BhZ2VyUXR5O1xuICAgICAgICAgICAgICAgICAgICBicmVha1BvaW50ID0gY291bnRlciArIF8ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbDtcbiAgICAgICAgICAgICAgICAgICAgY291bnRlciArPSBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGwgPD0gXy5vcHRpb25zLnNsaWRlc1RvU2hvdyA/IF8ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbCA6IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3c7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKF8ub3B0aW9ucy5jZW50ZXJNb2RlID09PSB0cnVlKSB7XG4gICAgICAgICAgICBwYWdlclF0eSA9IF8uc2xpZGVDb3VudDtcbiAgICAgICAgfSBlbHNlIGlmKCFfLm9wdGlvbnMuYXNOYXZGb3IpIHtcbiAgICAgICAgICAgIHBhZ2VyUXR5ID0gMSArIE1hdGguY2VpbCgoXy5zbGlkZUNvdW50IC0gXy5vcHRpb25zLnNsaWRlc1RvU2hvdykgLyBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGwpO1xuICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICB3aGlsZSAoYnJlYWtQb2ludCA8IF8uc2xpZGVDb3VudCkge1xuICAgICAgICAgICAgICAgICsrcGFnZXJRdHk7XG4gICAgICAgICAgICAgICAgYnJlYWtQb2ludCA9IGNvdW50ZXIgKyBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGw7XG4gICAgICAgICAgICAgICAgY291bnRlciArPSBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGwgPD0gXy5vcHRpb25zLnNsaWRlc1RvU2hvdyA/IF8ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbCA6IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3c7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcGFnZXJRdHkgLSAxO1xuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5nZXRMZWZ0ID0gZnVuY3Rpb24oc2xpZGVJbmRleCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcyxcbiAgICAgICAgICAgIHRhcmdldExlZnQsXG4gICAgICAgICAgICB2ZXJ0aWNhbEhlaWdodCxcbiAgICAgICAgICAgIHZlcnRpY2FsT2Zmc2V0ID0gMCxcbiAgICAgICAgICAgIHRhcmdldFNsaWRlLFxuICAgICAgICAgICAgY29lZjtcblxuICAgICAgICBfLnNsaWRlT2Zmc2V0ID0gMDtcbiAgICAgICAgdmVydGljYWxIZWlnaHQgPSBfLiRzbGlkZXMuZmlyc3QoKS5vdXRlckhlaWdodCh0cnVlKTtcblxuICAgICAgICBpZiAoXy5vcHRpb25zLmluZmluaXRlID09PSB0cnVlKSB7XG4gICAgICAgICAgICBpZiAoXy5zbGlkZUNvdW50ID4gXy5vcHRpb25zLnNsaWRlc1RvU2hvdykge1xuICAgICAgICAgICAgICAgIF8uc2xpZGVPZmZzZXQgPSAoXy5zbGlkZVdpZHRoICogXy5vcHRpb25zLnNsaWRlc1RvU2hvdykgKiAtMTtcbiAgICAgICAgICAgICAgICBjb2VmID0gLTFcblxuICAgICAgICAgICAgICAgIGlmIChfLm9wdGlvbnMudmVydGljYWwgPT09IHRydWUgJiYgXy5vcHRpb25zLmNlbnRlck1vZGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgPT09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZWYgPSAtMS41O1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZWYgPSAtMlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZlcnRpY2FsT2Zmc2V0ID0gKHZlcnRpY2FsSGVpZ2h0ICogXy5vcHRpb25zLnNsaWRlc1RvU2hvdykgKiBjb2VmO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKF8uc2xpZGVDb3VudCAlIF8ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbCAhPT0gMCkge1xuICAgICAgICAgICAgICAgIGlmIChzbGlkZUluZGV4ICsgXy5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsID4gXy5zbGlkZUNvdW50ICYmIF8uc2xpZGVDb3VudCA+IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNsaWRlSW5kZXggPiBfLnNsaWRlQ291bnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF8uc2xpZGVPZmZzZXQgPSAoKF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgLSAoc2xpZGVJbmRleCAtIF8uc2xpZGVDb3VudCkpICogXy5zbGlkZVdpZHRoKSAqIC0xO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmVydGljYWxPZmZzZXQgPSAoKF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgLSAoc2xpZGVJbmRleCAtIF8uc2xpZGVDb3VudCkpICogdmVydGljYWxIZWlnaHQpICogLTE7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfLnNsaWRlT2Zmc2V0ID0gKChfLnNsaWRlQ291bnQgJSBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGwpICogXy5zbGlkZVdpZHRoKSAqIC0xO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmVydGljYWxPZmZzZXQgPSAoKF8uc2xpZGVDb3VudCAlIF8ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbCkgKiB2ZXJ0aWNhbEhlaWdodCkgKiAtMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChzbGlkZUluZGV4ICsgXy5vcHRpb25zLnNsaWRlc1RvU2hvdyA+IF8uc2xpZGVDb3VudCkge1xuICAgICAgICAgICAgICAgIF8uc2xpZGVPZmZzZXQgPSAoKHNsaWRlSW5kZXggKyBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSAtIF8uc2xpZGVDb3VudCkgKiBfLnNsaWRlV2lkdGg7XG4gICAgICAgICAgICAgICAgdmVydGljYWxPZmZzZXQgPSAoKHNsaWRlSW5kZXggKyBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSAtIF8uc2xpZGVDb3VudCkgKiB2ZXJ0aWNhbEhlaWdodDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfLnNsaWRlQ291bnQgPD0gXy5vcHRpb25zLnNsaWRlc1RvU2hvdykge1xuICAgICAgICAgICAgXy5zbGlkZU9mZnNldCA9IDA7XG4gICAgICAgICAgICB2ZXJ0aWNhbE9mZnNldCA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXy5vcHRpb25zLmNlbnRlck1vZGUgPT09IHRydWUgJiYgXy5zbGlkZUNvdW50IDw9IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpIHtcbiAgICAgICAgICAgIF8uc2xpZGVPZmZzZXQgPSAoKF8uc2xpZGVXaWR0aCAqIE1hdGguZmxvb3IoXy5vcHRpb25zLnNsaWRlc1RvU2hvdykpIC8gMikgLSAoKF8uc2xpZGVXaWR0aCAqIF8uc2xpZGVDb3VudCkgLyAyKTtcbiAgICAgICAgfSBlbHNlIGlmIChfLm9wdGlvbnMuY2VudGVyTW9kZSA9PT0gdHJ1ZSAmJiBfLm9wdGlvbnMuaW5maW5pdGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgIF8uc2xpZGVPZmZzZXQgKz0gXy5zbGlkZVdpZHRoICogTWF0aC5mbG9vcihfLm9wdGlvbnMuc2xpZGVzVG9TaG93IC8gMikgLSBfLnNsaWRlV2lkdGg7XG4gICAgICAgIH0gZWxzZSBpZiAoXy5vcHRpb25zLmNlbnRlck1vZGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgIF8uc2xpZGVPZmZzZXQgPSAwO1xuICAgICAgICAgICAgXy5zbGlkZU9mZnNldCArPSBfLnNsaWRlV2lkdGggKiBNYXRoLmZsb29yKF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgLyAyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfLm9wdGlvbnMudmVydGljYWwgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICB0YXJnZXRMZWZ0ID0gKChzbGlkZUluZGV4ICogXy5zbGlkZVdpZHRoKSAqIC0xKSArIF8uc2xpZGVPZmZzZXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0YXJnZXRMZWZ0ID0gKChzbGlkZUluZGV4ICogdmVydGljYWxIZWlnaHQpICogLTEpICsgdmVydGljYWxPZmZzZXQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXy5vcHRpb25zLnZhcmlhYmxlV2lkdGggPT09IHRydWUpIHtcblxuICAgICAgICAgICAgaWYgKF8uc2xpZGVDb3VudCA8PSBfLm9wdGlvbnMuc2xpZGVzVG9TaG93IHx8IF8ub3B0aW9ucy5pbmZpbml0ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRTbGlkZSA9IF8uJHNsaWRlVHJhY2suY2hpbGRyZW4oJy5zbGljay1zbGlkZScpLmVxKHNsaWRlSW5kZXgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRTbGlkZSA9IF8uJHNsaWRlVHJhY2suY2hpbGRyZW4oJy5zbGljay1zbGlkZScpLmVxKHNsaWRlSW5kZXggKyBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKF8ub3B0aW9ucy5ydGwgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0U2xpZGVbMF0pIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0TGVmdCA9IChfLiRzbGlkZVRyYWNrLndpZHRoKCkgLSB0YXJnZXRTbGlkZVswXS5vZmZzZXRMZWZ0IC0gdGFyZ2V0U2xpZGUud2lkdGgoKSkgKiAtMTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXRMZWZ0ID0gIDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRMZWZ0ID0gdGFyZ2V0U2xpZGVbMF0gPyB0YXJnZXRTbGlkZVswXS5vZmZzZXRMZWZ0ICogLTEgOiAwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoXy5vcHRpb25zLmNlbnRlck1vZGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoXy5zbGlkZUNvdW50IDw9IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgfHwgXy5vcHRpb25zLmluZmluaXRlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXRTbGlkZSA9IF8uJHNsaWRlVHJhY2suY2hpbGRyZW4oJy5zbGljay1zbGlkZScpLmVxKHNsaWRlSW5kZXgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldFNsaWRlID0gXy4kc2xpZGVUcmFjay5jaGlsZHJlbignLnNsaWNrLXNsaWRlJykuZXEoc2xpZGVJbmRleCArIF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgKyAxKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoXy5vcHRpb25zLnJ0bCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGFyZ2V0U2xpZGVbMF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldExlZnQgPSAoXy4kc2xpZGVUcmFjay53aWR0aCgpIC0gdGFyZ2V0U2xpZGVbMF0ub2Zmc2V0TGVmdCAtIHRhcmdldFNsaWRlLndpZHRoKCkpICogLTE7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRMZWZ0ID0gIDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXRMZWZ0ID0gdGFyZ2V0U2xpZGVbMF0gPyB0YXJnZXRTbGlkZVswXS5vZmZzZXRMZWZ0ICogLTEgOiAwO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRhcmdldExlZnQgKz0gKF8uJGxpc3Qud2lkdGgoKSAtIHRhcmdldFNsaWRlLm91dGVyV2lkdGgoKSkgLyAyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRhcmdldExlZnQ7XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmdldE9wdGlvbiA9IFNsaWNrLnByb3RvdHlwZS5zbGlja0dldE9wdGlvbiA9IGZ1bmN0aW9uKG9wdGlvbikge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICByZXR1cm4gXy5vcHRpb25zW29wdGlvbl07XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmdldE5hdmlnYWJsZUluZGV4ZXMgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXMsXG4gICAgICAgICAgICBicmVha1BvaW50ID0gMCxcbiAgICAgICAgICAgIGNvdW50ZXIgPSAwLFxuICAgICAgICAgICAgaW5kZXhlcyA9IFtdLFxuICAgICAgICAgICAgbWF4O1xuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuaW5maW5pdGUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBtYXggPSBfLnNsaWRlQ291bnQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBicmVha1BvaW50ID0gXy5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsICogLTE7XG4gICAgICAgICAgICBjb3VudGVyID0gXy5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsICogLTE7XG4gICAgICAgICAgICBtYXggPSBfLnNsaWRlQ291bnQgKiAyO1xuICAgICAgICB9XG5cbiAgICAgICAgd2hpbGUgKGJyZWFrUG9pbnQgPCBtYXgpIHtcbiAgICAgICAgICAgIGluZGV4ZXMucHVzaChicmVha1BvaW50KTtcbiAgICAgICAgICAgIGJyZWFrUG9pbnQgPSBjb3VudGVyICsgXy5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsO1xuICAgICAgICAgICAgY291bnRlciArPSBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGwgPD0gXy5vcHRpb25zLnNsaWRlc1RvU2hvdyA/IF8ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbCA6IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3c7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaW5kZXhlcztcblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuZ2V0U2xpY2sgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuZ2V0U2xpZGVDb3VudCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcyxcbiAgICAgICAgICAgIHNsaWRlc1RyYXZlcnNlZCwgc3dpcGVkU2xpZGUsIGNlbnRlck9mZnNldDtcblxuICAgICAgICBjZW50ZXJPZmZzZXQgPSBfLm9wdGlvbnMuY2VudGVyTW9kZSA9PT0gdHJ1ZSA/IF8uc2xpZGVXaWR0aCAqIE1hdGguZmxvb3IoXy5vcHRpb25zLnNsaWRlc1RvU2hvdyAvIDIpIDogMDtcblxuICAgICAgICBpZiAoXy5vcHRpb25zLnN3aXBlVG9TbGlkZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgXy4kc2xpZGVUcmFjay5maW5kKCcuc2xpY2stc2xpZGUnKS5lYWNoKGZ1bmN0aW9uKGluZGV4LCBzbGlkZSkge1xuICAgICAgICAgICAgICAgIGlmIChzbGlkZS5vZmZzZXRMZWZ0IC0gY2VudGVyT2Zmc2V0ICsgKCQoc2xpZGUpLm91dGVyV2lkdGgoKSAvIDIpID4gKF8uc3dpcGVMZWZ0ICogLTEpKSB7XG4gICAgICAgICAgICAgICAgICAgIHN3aXBlZFNsaWRlID0gc2xpZGU7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgc2xpZGVzVHJhdmVyc2VkID0gTWF0aC5hYnMoJChzd2lwZWRTbGlkZSkuYXR0cignZGF0YS1zbGljay1pbmRleCcpIC0gXy5jdXJyZW50U2xpZGUpIHx8IDE7XG5cbiAgICAgICAgICAgIHJldHVybiBzbGlkZXNUcmF2ZXJzZWQ7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGw7XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuZ29UbyA9IFNsaWNrLnByb3RvdHlwZS5zbGlja0dvVG8gPSBmdW5jdGlvbihzbGlkZSwgZG9udEFuaW1hdGUpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgXy5jaGFuZ2VTbGlkZSh7XG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZTogJ2luZGV4JyxcbiAgICAgICAgICAgICAgICBpbmRleDogcGFyc2VJbnQoc2xpZGUpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGRvbnRBbmltYXRlKTtcblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uKGNyZWF0aW9uKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIGlmICghJChfLiRzbGlkZXIpLmhhc0NsYXNzKCdzbGljay1pbml0aWFsaXplZCcpKSB7XG5cbiAgICAgICAgICAgICQoXy4kc2xpZGVyKS5hZGRDbGFzcygnc2xpY2staW5pdGlhbGl6ZWQnKTtcblxuICAgICAgICAgICAgXy5idWlsZFJvd3MoKTtcbiAgICAgICAgICAgIF8uYnVpbGRPdXQoKTtcbiAgICAgICAgICAgIF8uc2V0UHJvcHMoKTtcbiAgICAgICAgICAgIF8uc3RhcnRMb2FkKCk7XG4gICAgICAgICAgICBfLmxvYWRTbGlkZXIoKTtcbiAgICAgICAgICAgIF8uaW5pdGlhbGl6ZUV2ZW50cygpO1xuICAgICAgICAgICAgXy51cGRhdGVBcnJvd3MoKTtcbiAgICAgICAgICAgIF8udXBkYXRlRG90cygpO1xuICAgICAgICAgICAgXy5jaGVja1Jlc3BvbnNpdmUodHJ1ZSk7XG4gICAgICAgICAgICBfLmZvY3VzSGFuZGxlcigpO1xuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY3JlYXRpb24pIHtcbiAgICAgICAgICAgIF8uJHNsaWRlci50cmlnZ2VyKCdpbml0JywgW19dKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuYWNjZXNzaWJpbGl0eSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgXy5pbml0QURBKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIF8ub3B0aW9ucy5hdXRvcGxheSApIHtcblxuICAgICAgICAgICAgXy5wYXVzZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIF8uYXV0b1BsYXkoKTtcblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmluaXRBREEgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIF8gPSB0aGlzLFxuICAgICAgICAgICAgICAgIG51bURvdEdyb3VwcyA9IE1hdGguY2VpbChfLnNsaWRlQ291bnQgLyBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSxcbiAgICAgICAgICAgICAgICB0YWJDb250cm9sSW5kZXhlcyA9IF8uZ2V0TmF2aWdhYmxlSW5kZXhlcygpLmZpbHRlcihmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICh2YWwgPj0gMCkgJiYgKHZhbCA8IF8uc2xpZGVDb3VudCk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgXy4kc2xpZGVzLmFkZChfLiRzbGlkZVRyYWNrLmZpbmQoJy5zbGljay1jbG9uZWQnKSkuYXR0cih7XG4gICAgICAgICAgICAnYXJpYS1oaWRkZW4nOiAndHJ1ZScsXG4gICAgICAgICAgICAndGFiaW5kZXgnOiAnLTEnXG4gICAgICAgIH0pLmZpbmQoJ2EsIGlucHV0LCBidXR0b24sIHNlbGVjdCcpLmF0dHIoe1xuICAgICAgICAgICAgJ3RhYmluZGV4JzogJy0xJ1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoXy4kZG90cyAhPT0gbnVsbCkge1xuICAgICAgICAgICAgXy4kc2xpZGVzLm5vdChfLiRzbGlkZVRyYWNrLmZpbmQoJy5zbGljay1jbG9uZWQnKSkuZWFjaChmdW5jdGlvbihpKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNsaWRlQ29udHJvbEluZGV4ID0gdGFiQ29udHJvbEluZGV4ZXMuaW5kZXhPZihpKTtcblxuICAgICAgICAgICAgICAgICQodGhpcykuYXR0cih7XG4gICAgICAgICAgICAgICAgICAgICdyb2xlJzogJ3RhYnBhbmVsJyxcbiAgICAgICAgICAgICAgICAgICAgJ2lkJzogJ3NsaWNrLXNsaWRlJyArIF8uaW5zdGFuY2VVaWQgKyBpLFxuICAgICAgICAgICAgICAgICAgICAndGFiaW5kZXgnOiAtMVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKHNsaWRlQ29udHJvbEluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgIHZhciBhcmlhQnV0dG9uQ29udHJvbCA9ICdzbGljay1zbGlkZS1jb250cm9sJyArIF8uaW5zdGFuY2VVaWQgKyBzbGlkZUNvbnRyb2xJbmRleFxuICAgICAgICAgICAgICAgICAgIGlmICgkKCcjJyArIGFyaWFCdXR0b25Db250cm9sKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICQodGhpcykuYXR0cih7XG4gICAgICAgICAgICAgICAgICAgICAgICAgJ2FyaWEtZGVzY3JpYmVkYnknOiBhcmlhQnV0dG9uQ29udHJvbFxuICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBfLiRkb3RzLmF0dHIoJ3JvbGUnLCAndGFibGlzdCcpLmZpbmQoJ2xpJykuZWFjaChmdW5jdGlvbihpKSB7XG4gICAgICAgICAgICAgICAgdmFyIG1hcHBlZFNsaWRlSW5kZXggPSB0YWJDb250cm9sSW5kZXhlc1tpXTtcblxuICAgICAgICAgICAgICAgICQodGhpcykuYXR0cih7XG4gICAgICAgICAgICAgICAgICAgICdyb2xlJzogJ3ByZXNlbnRhdGlvbidcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICQodGhpcykuZmluZCgnYnV0dG9uJykuZmlyc3QoKS5hdHRyKHtcbiAgICAgICAgICAgICAgICAgICAgJ3JvbGUnOiAndGFiJyxcbiAgICAgICAgICAgICAgICAgICAgJ2lkJzogJ3NsaWNrLXNsaWRlLWNvbnRyb2wnICsgXy5pbnN0YW5jZVVpZCArIGksXG4gICAgICAgICAgICAgICAgICAgICdhcmlhLWNvbnRyb2xzJzogJ3NsaWNrLXNsaWRlJyArIF8uaW5zdGFuY2VVaWQgKyBtYXBwZWRTbGlkZUluZGV4LFxuICAgICAgICAgICAgICAgICAgICAnYXJpYS1sYWJlbCc6IChpICsgMSkgKyAnIG9mICcgKyBudW1Eb3RHcm91cHMsXG4gICAgICAgICAgICAgICAgICAgICdhcmlhLXNlbGVjdGVkJzogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgJ3RhYmluZGV4JzogJy0xJ1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9KS5lcShfLmN1cnJlbnRTbGlkZSkuZmluZCgnYnV0dG9uJykuYXR0cih7XG4gICAgICAgICAgICAgICAgJ2FyaWEtc2VsZWN0ZWQnOiAndHJ1ZScsXG4gICAgICAgICAgICAgICAgJ3RhYmluZGV4JzogJzAnXG4gICAgICAgICAgICB9KS5lbmQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAodmFyIGk9Xy5jdXJyZW50U2xpZGUsIG1heD1pK18ub3B0aW9ucy5zbGlkZXNUb1Nob3c7IGkgPCBtYXg7IGkrKykge1xuICAgICAgICAgIGlmIChfLm9wdGlvbnMuZm9jdXNPbkNoYW5nZSkge1xuICAgICAgICAgICAgXy4kc2xpZGVzLmVxKGkpLmF0dHIoeyd0YWJpbmRleCc6ICcwJ30pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfLiRzbGlkZXMuZXEoaSkucmVtb3ZlQXR0cigndGFiaW5kZXgnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBfLmFjdGl2YXRlQURBKCk7XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmluaXRBcnJvd0V2ZW50cyA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBpZiAoXy5vcHRpb25zLmFycm93cyA9PT0gdHJ1ZSAmJiBfLnNsaWRlQ291bnQgPiBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSB7XG4gICAgICAgICAgICBfLiRwcmV2QXJyb3dcbiAgICAgICAgICAgICAgIC5vZmYoJ2NsaWNrLnNsaWNrJylcbiAgICAgICAgICAgICAgIC5vbignY2xpY2suc2xpY2snLCB7XG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdwcmV2aW91cydcbiAgICAgICAgICAgICAgIH0sIF8uY2hhbmdlU2xpZGUpO1xuICAgICAgICAgICAgXy4kbmV4dEFycm93XG4gICAgICAgICAgICAgICAub2ZmKCdjbGljay5zbGljaycpXG4gICAgICAgICAgICAgICAub24oJ2NsaWNrLnNsaWNrJywge1xuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiAnbmV4dCdcbiAgICAgICAgICAgICAgIH0sIF8uY2hhbmdlU2xpZGUpO1xuXG4gICAgICAgICAgICBpZiAoXy5vcHRpb25zLmFjY2Vzc2liaWxpdHkgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBfLiRwcmV2QXJyb3cub24oJ2tleWRvd24uc2xpY2snLCBfLmtleUhhbmRsZXIpO1xuICAgICAgICAgICAgICAgIF8uJG5leHRBcnJvdy5vbigna2V5ZG93bi5zbGljaycsIF8ua2V5SGFuZGxlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuaW5pdERvdEV2ZW50cyA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBpZiAoXy5vcHRpb25zLmRvdHMgPT09IHRydWUgJiYgXy5zbGlkZUNvdW50ID4gXy5vcHRpb25zLnNsaWRlc1RvU2hvdykge1xuICAgICAgICAgICAgJCgnbGknLCBfLiRkb3RzKS5vbignY2xpY2suc2xpY2snLCB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZTogJ2luZGV4J1xuICAgICAgICAgICAgfSwgXy5jaGFuZ2VTbGlkZSk7XG5cbiAgICAgICAgICAgIGlmIChfLm9wdGlvbnMuYWNjZXNzaWJpbGl0eSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIF8uJGRvdHMub24oJ2tleWRvd24uc2xpY2snLCBfLmtleUhhbmRsZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5kb3RzID09PSB0cnVlICYmIF8ub3B0aW9ucy5wYXVzZU9uRG90c0hvdmVyID09PSB0cnVlICYmIF8uc2xpZGVDb3VudCA+IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpIHtcblxuICAgICAgICAgICAgJCgnbGknLCBfLiRkb3RzKVxuICAgICAgICAgICAgICAgIC5vbignbW91c2VlbnRlci5zbGljaycsICQucHJveHkoXy5pbnRlcnJ1cHQsIF8sIHRydWUpKVxuICAgICAgICAgICAgICAgIC5vbignbW91c2VsZWF2ZS5zbGljaycsICQucHJveHkoXy5pbnRlcnJ1cHQsIF8sIGZhbHNlKSk7XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5pbml0U2xpZGVFdmVudHMgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgaWYgKCBfLm9wdGlvbnMucGF1c2VPbkhvdmVyICkge1xuXG4gICAgICAgICAgICBfLiRsaXN0Lm9uKCdtb3VzZWVudGVyLnNsaWNrJywgJC5wcm94eShfLmludGVycnVwdCwgXywgdHJ1ZSkpO1xuICAgICAgICAgICAgXy4kbGlzdC5vbignbW91c2VsZWF2ZS5zbGljaycsICQucHJveHkoXy5pbnRlcnJ1cHQsIF8sIGZhbHNlKSk7XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5pbml0aWFsaXplRXZlbnRzID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIF8uaW5pdEFycm93RXZlbnRzKCk7XG5cbiAgICAgICAgXy5pbml0RG90RXZlbnRzKCk7XG4gICAgICAgIF8uaW5pdFNsaWRlRXZlbnRzKCk7XG5cbiAgICAgICAgXy4kbGlzdC5vbigndG91Y2hzdGFydC5zbGljayBtb3VzZWRvd24uc2xpY2snLCB7XG4gICAgICAgICAgICBhY3Rpb246ICdzdGFydCdcbiAgICAgICAgfSwgXy5zd2lwZUhhbmRsZXIpO1xuICAgICAgICBfLiRsaXN0Lm9uKCd0b3VjaG1vdmUuc2xpY2sgbW91c2Vtb3ZlLnNsaWNrJywge1xuICAgICAgICAgICAgYWN0aW9uOiAnbW92ZSdcbiAgICAgICAgfSwgXy5zd2lwZUhhbmRsZXIpO1xuICAgICAgICBfLiRsaXN0Lm9uKCd0b3VjaGVuZC5zbGljayBtb3VzZXVwLnNsaWNrJywge1xuICAgICAgICAgICAgYWN0aW9uOiAnZW5kJ1xuICAgICAgICB9LCBfLnN3aXBlSGFuZGxlcik7XG4gICAgICAgIF8uJGxpc3Qub24oJ3RvdWNoY2FuY2VsLnNsaWNrIG1vdXNlbGVhdmUuc2xpY2snLCB7XG4gICAgICAgICAgICBhY3Rpb246ICdlbmQnXG4gICAgICAgIH0sIF8uc3dpcGVIYW5kbGVyKTtcblxuICAgICAgICBfLiRsaXN0Lm9uKCdjbGljay5zbGljaycsIF8uY2xpY2tIYW5kbGVyKTtcblxuICAgICAgICAkKGRvY3VtZW50KS5vbihfLnZpc2liaWxpdHlDaGFuZ2UsICQucHJveHkoXy52aXNpYmlsaXR5LCBfKSk7XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5hY2Nlc3NpYmlsaXR5ID09PSB0cnVlKSB7XG4gICAgICAgICAgICBfLiRsaXN0Lm9uKCdrZXlkb3duLnNsaWNrJywgXy5rZXlIYW5kbGVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuZm9jdXNPblNlbGVjdCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgJChfLiRzbGlkZVRyYWNrKS5jaGlsZHJlbigpLm9uKCdjbGljay5zbGljaycsIF8uc2VsZWN0SGFuZGxlcik7XG4gICAgICAgIH1cblxuICAgICAgICAkKHdpbmRvdykub24oJ29yaWVudGF0aW9uY2hhbmdlLnNsaWNrLnNsaWNrLScgKyBfLmluc3RhbmNlVWlkLCAkLnByb3h5KF8ub3JpZW50YXRpb25DaGFuZ2UsIF8pKTtcblxuICAgICAgICAkKHdpbmRvdykub24oJ3Jlc2l6ZS5zbGljay5zbGljay0nICsgXy5pbnN0YW5jZVVpZCwgJC5wcm94eShfLnJlc2l6ZSwgXykpO1xuXG4gICAgICAgICQoJ1tkcmFnZ2FibGUhPXRydWVdJywgXy4kc2xpZGVUcmFjaykub24oJ2RyYWdzdGFydCcsIF8ucHJldmVudERlZmF1bHQpO1xuXG4gICAgICAgICQod2luZG93KS5vbignbG9hZC5zbGljay5zbGljay0nICsgXy5pbnN0YW5jZVVpZCwgXy5zZXRQb3NpdGlvbik7XG4gICAgICAgICQoXy5zZXRQb3NpdGlvbik7XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmluaXRVSSA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBpZiAoXy5vcHRpb25zLmFycm93cyA9PT0gdHJ1ZSAmJiBfLnNsaWRlQ291bnQgPiBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSB7XG5cbiAgICAgICAgICAgIF8uJHByZXZBcnJvdy5zaG93KCk7XG4gICAgICAgICAgICBfLiRuZXh0QXJyb3cuc2hvdygpO1xuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXy5vcHRpb25zLmRvdHMgPT09IHRydWUgJiYgXy5zbGlkZUNvdW50ID4gXy5vcHRpb25zLnNsaWRlc1RvU2hvdykge1xuXG4gICAgICAgICAgICBfLiRkb3RzLnNob3coKTtcblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmtleUhhbmRsZXIgPSBmdW5jdGlvbihldmVudCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcbiAgICAgICAgIC8vRG9udCBzbGlkZSBpZiB0aGUgY3Vyc29yIGlzIGluc2lkZSB0aGUgZm9ybSBmaWVsZHMgYW5kIGFycm93IGtleXMgYXJlIHByZXNzZWRcbiAgICAgICAgaWYoIWV2ZW50LnRhcmdldC50YWdOYW1lLm1hdGNoKCdURVhUQVJFQXxJTlBVVHxTRUxFQ1QnKSkge1xuICAgICAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDM3ICYmIF8ub3B0aW9ucy5hY2Nlc3NpYmlsaXR5ID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgXy5jaGFuZ2VTbGlkZSh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IF8ub3B0aW9ucy5ydGwgPT09IHRydWUgPyAnbmV4dCcgOiAgJ3ByZXZpb3VzJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LmtleUNvZGUgPT09IDM5ICYmIF8ub3B0aW9ucy5hY2Nlc3NpYmlsaXR5ID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgXy5jaGFuZ2VTbGlkZSh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IF8ub3B0aW9ucy5ydGwgPT09IHRydWUgPyAncHJldmlvdXMnIDogJ25leHQnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5sYXp5TG9hZCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcyxcbiAgICAgICAgICAgIGxvYWRSYW5nZSwgY2xvbmVSYW5nZSwgcmFuZ2VTdGFydCwgcmFuZ2VFbmQ7XG5cbiAgICAgICAgZnVuY3Rpb24gbG9hZEltYWdlcyhpbWFnZXNTY29wZSkge1xuXG4gICAgICAgICAgICAkKCdpbWdbZGF0YS1sYXp5XScsIGltYWdlc1Njb3BlKS5lYWNoKGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICAgICAgdmFyIGltYWdlID0gJCh0aGlzKSxcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VTb3VyY2UgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtbGF6eScpLFxuICAgICAgICAgICAgICAgICAgICBpbWFnZVNyY1NldCA9ICQodGhpcykuYXR0cignZGF0YS1zcmNzZXQnKSxcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VTaXplcyAgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtc2l6ZXMnKSB8fCBfLiRzbGlkZXIuYXR0cignZGF0YS1zaXplcycpLFxuICAgICAgICAgICAgICAgICAgICBpbWFnZVRvTG9hZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuXG4gICAgICAgICAgICAgICAgaW1hZ2VUb0xvYWQub25sb2FkID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hbmltYXRlKHsgb3BhY2l0eTogMCB9LCAxMDAsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGltYWdlU3JjU2V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignc3Jjc2V0JywgaW1hZ2VTcmNTZXQgKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW1hZ2VTaXplcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignc2l6ZXMnLCBpbWFnZVNpemVzICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWFnZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignc3JjJywgaW1hZ2VTb3VyY2UpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbmltYXRlKHsgb3BhY2l0eTogMSB9LCAyMDAsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQXR0cignZGF0YS1sYXp5IGRhdGEtc3Jjc2V0IGRhdGEtc2l6ZXMnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnc2xpY2stbG9hZGluZycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfLiRzbGlkZXIudHJpZ2dlcignbGF6eUxvYWRlZCcsIFtfLCBpbWFnZSwgaW1hZ2VTb3VyY2VdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIGltYWdlVG9Mb2FkLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgICAgICAgICBpbWFnZVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUF0dHIoICdkYXRhLWxhenknIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcyggJ3NsaWNrLWxvYWRpbmcnIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcyggJ3NsaWNrLWxhenlsb2FkLWVycm9yJyApO1xuXG4gICAgICAgICAgICAgICAgICAgIF8uJHNsaWRlci50cmlnZ2VyKCdsYXp5TG9hZEVycm9yJywgWyBfLCBpbWFnZSwgaW1hZ2VTb3VyY2UgXSk7XG5cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgaW1hZ2VUb0xvYWQuc3JjID0gaW1hZ2VTb3VyY2U7XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXy5vcHRpb25zLmNlbnRlck1vZGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGlmIChfLm9wdGlvbnMuaW5maW5pdGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICByYW5nZVN0YXJ0ID0gXy5jdXJyZW50U2xpZGUgKyAoXy5vcHRpb25zLnNsaWRlc1RvU2hvdyAvIDIgKyAxKTtcbiAgICAgICAgICAgICAgICByYW5nZUVuZCA9IHJhbmdlU3RhcnQgKyBfLm9wdGlvbnMuc2xpZGVzVG9TaG93ICsgMjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmFuZ2VTdGFydCA9IE1hdGgubWF4KDAsIF8uY3VycmVudFNsaWRlIC0gKF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgLyAyICsgMSkpO1xuICAgICAgICAgICAgICAgIHJhbmdlRW5kID0gMiArIChfLm9wdGlvbnMuc2xpZGVzVG9TaG93IC8gMiArIDEpICsgXy5jdXJyZW50U2xpZGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByYW5nZVN0YXJ0ID0gXy5vcHRpb25zLmluZmluaXRlID8gXy5vcHRpb25zLnNsaWRlc1RvU2hvdyArIF8uY3VycmVudFNsaWRlIDogXy5jdXJyZW50U2xpZGU7XG4gICAgICAgICAgICByYW5nZUVuZCA9IE1hdGguY2VpbChyYW5nZVN0YXJ0ICsgXy5vcHRpb25zLnNsaWRlc1RvU2hvdyk7XG4gICAgICAgICAgICBpZiAoXy5vcHRpb25zLmZhZGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBpZiAocmFuZ2VTdGFydCA+IDApIHJhbmdlU3RhcnQtLTtcbiAgICAgICAgICAgICAgICBpZiAocmFuZ2VFbmQgPD0gXy5zbGlkZUNvdW50KSByYW5nZUVuZCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbG9hZFJhbmdlID0gXy4kc2xpZGVyLmZpbmQoJy5zbGljay1zbGlkZScpLnNsaWNlKHJhbmdlU3RhcnQsIHJhbmdlRW5kKTtcblxuICAgICAgICBpZiAoXy5vcHRpb25zLmxhenlMb2FkID09PSAnYW50aWNpcGF0ZWQnKSB7XG4gICAgICAgICAgICB2YXIgcHJldlNsaWRlID0gcmFuZ2VTdGFydCAtIDEsXG4gICAgICAgICAgICAgICAgbmV4dFNsaWRlID0gcmFuZ2VFbmQsXG4gICAgICAgICAgICAgICAgJHNsaWRlcyA9IF8uJHNsaWRlci5maW5kKCcuc2xpY2stc2xpZGUnKTtcblxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGw7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChwcmV2U2xpZGUgPCAwKSBwcmV2U2xpZGUgPSBfLnNsaWRlQ291bnQgLSAxO1xuICAgICAgICAgICAgICAgIGxvYWRSYW5nZSA9IGxvYWRSYW5nZS5hZGQoJHNsaWRlcy5lcShwcmV2U2xpZGUpKTtcbiAgICAgICAgICAgICAgICBsb2FkUmFuZ2UgPSBsb2FkUmFuZ2UuYWRkKCRzbGlkZXMuZXEobmV4dFNsaWRlKSk7XG4gICAgICAgICAgICAgICAgcHJldlNsaWRlLS07XG4gICAgICAgICAgICAgICAgbmV4dFNsaWRlKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsb2FkSW1hZ2VzKGxvYWRSYW5nZSk7XG5cbiAgICAgICAgaWYgKF8uc2xpZGVDb3VudCA8PSBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSB7XG4gICAgICAgICAgICBjbG9uZVJhbmdlID0gXy4kc2xpZGVyLmZpbmQoJy5zbGljay1zbGlkZScpO1xuICAgICAgICAgICAgbG9hZEltYWdlcyhjbG9uZVJhbmdlKTtcbiAgICAgICAgfSBlbHNlXG4gICAgICAgIGlmIChfLmN1cnJlbnRTbGlkZSA+PSBfLnNsaWRlQ291bnQgLSBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSB7XG4gICAgICAgICAgICBjbG9uZVJhbmdlID0gXy4kc2xpZGVyLmZpbmQoJy5zbGljay1jbG9uZWQnKS5zbGljZSgwLCBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KTtcbiAgICAgICAgICAgIGxvYWRJbWFnZXMoY2xvbmVSYW5nZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoXy5jdXJyZW50U2xpZGUgPT09IDApIHtcbiAgICAgICAgICAgIGNsb25lUmFuZ2UgPSBfLiRzbGlkZXIuZmluZCgnLnNsaWNrLWNsb25lZCcpLnNsaWNlKF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgKiAtMSk7XG4gICAgICAgICAgICBsb2FkSW1hZ2VzKGNsb25lUmFuZ2UpO1xuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmxvYWRTbGlkZXIgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgXy5zZXRQb3NpdGlvbigpO1xuXG4gICAgICAgIF8uJHNsaWRlVHJhY2suY3NzKHtcbiAgICAgICAgICAgIG9wYWNpdHk6IDFcbiAgICAgICAgfSk7XG5cbiAgICAgICAgXy4kc2xpZGVyLnJlbW92ZUNsYXNzKCdzbGljay1sb2FkaW5nJyk7XG5cbiAgICAgICAgXy5pbml0VUkoKTtcblxuICAgICAgICBpZiAoXy5vcHRpb25zLmxhenlMb2FkID09PSAncHJvZ3Jlc3NpdmUnKSB7XG4gICAgICAgICAgICBfLnByb2dyZXNzaXZlTGF6eUxvYWQoKTtcbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5uZXh0ID0gU2xpY2sucHJvdG90eXBlLnNsaWNrTmV4dCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBfLmNoYW5nZVNsaWRlKHtcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAnbmV4dCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLm9yaWVudGF0aW9uQ2hhbmdlID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIF8uY2hlY2tSZXNwb25zaXZlKCk7XG4gICAgICAgIF8uc2V0UG9zaXRpb24oKTtcblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUucGF1c2UgPSBTbGljay5wcm90b3R5cGUuc2xpY2tQYXVzZSA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBfLmF1dG9QbGF5Q2xlYXIoKTtcbiAgICAgICAgXy5wYXVzZWQgPSB0cnVlO1xuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5wbGF5ID0gU2xpY2sucHJvdG90eXBlLnNsaWNrUGxheSA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBfLmF1dG9QbGF5KCk7XG4gICAgICAgIF8ub3B0aW9ucy5hdXRvcGxheSA9IHRydWU7XG4gICAgICAgIF8ucGF1c2VkID0gZmFsc2U7XG4gICAgICAgIF8uZm9jdXNzZWQgPSBmYWxzZTtcbiAgICAgICAgXy5pbnRlcnJ1cHRlZCA9IGZhbHNlO1xuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5wb3N0U2xpZGUgPSBmdW5jdGlvbihpbmRleCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBpZiggIV8udW5zbGlja2VkICkge1xuXG4gICAgICAgICAgICBfLiRzbGlkZXIudHJpZ2dlcignYWZ0ZXJDaGFuZ2UnLCBbXywgaW5kZXhdKTtcblxuICAgICAgICAgICAgXy5hbmltYXRpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgaWYgKF8uc2xpZGVDb3VudCA+IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpIHtcbiAgICAgICAgICAgICAgICBfLnNldFBvc2l0aW9uKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIF8uc3dpcGVMZWZ0ID0gbnVsbDtcblxuICAgICAgICAgICAgaWYgKCBfLm9wdGlvbnMuYXV0b3BsYXkgKSB7XG4gICAgICAgICAgICAgICAgXy5hdXRvUGxheSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoXy5vcHRpb25zLmFjY2Vzc2liaWxpdHkgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBfLmluaXRBREEoKTtcblxuICAgICAgICAgICAgICAgIGlmIChfLm9wdGlvbnMuZm9jdXNPbkNoYW5nZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgJGN1cnJlbnRTbGlkZSA9ICQoXy4kc2xpZGVzLmdldChfLmN1cnJlbnRTbGlkZSkpO1xuICAgICAgICAgICAgICAgICAgICAkY3VycmVudFNsaWRlLmF0dHIoJ3RhYmluZGV4JywgMCkuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5wcmV2ID0gU2xpY2sucHJvdG90eXBlLnNsaWNrUHJldiA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBfLmNoYW5nZVNsaWRlKHtcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAncHJldmlvdXMnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5wcmV2ZW50RGVmYXVsdCA9IGZ1bmN0aW9uKGV2ZW50KSB7XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUucHJvZ3Jlc3NpdmVMYXp5TG9hZCA9IGZ1bmN0aW9uKCB0cnlDb3VudCApIHtcblxuICAgICAgICB0cnlDb3VudCA9IHRyeUNvdW50IHx8IDE7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzLFxuICAgICAgICAgICAgJGltZ3NUb0xvYWQgPSAkKCAnaW1nW2RhdGEtbGF6eV0nLCBfLiRzbGlkZXIgKSxcbiAgICAgICAgICAgIGltYWdlLFxuICAgICAgICAgICAgaW1hZ2VTb3VyY2UsXG4gICAgICAgICAgICBpbWFnZVNyY1NldCxcbiAgICAgICAgICAgIGltYWdlU2l6ZXMsXG4gICAgICAgICAgICBpbWFnZVRvTG9hZDtcblxuICAgICAgICBpZiAoICRpbWdzVG9Mb2FkLmxlbmd0aCApIHtcblxuICAgICAgICAgICAgaW1hZ2UgPSAkaW1nc1RvTG9hZC5maXJzdCgpO1xuICAgICAgICAgICAgaW1hZ2VTb3VyY2UgPSBpbWFnZS5hdHRyKCdkYXRhLWxhenknKTtcbiAgICAgICAgICAgIGltYWdlU3JjU2V0ID0gaW1hZ2UuYXR0cignZGF0YS1zcmNzZXQnKTtcbiAgICAgICAgICAgIGltYWdlU2l6ZXMgID0gaW1hZ2UuYXR0cignZGF0YS1zaXplcycpIHx8IF8uJHNsaWRlci5hdHRyKCdkYXRhLXNpemVzJyk7XG4gICAgICAgICAgICBpbWFnZVRvTG9hZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuXG4gICAgICAgICAgICBpbWFnZVRvTG9hZC5vbmxvYWQgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgICAgIGlmIChpbWFnZVNyY1NldCkge1xuICAgICAgICAgICAgICAgICAgICBpbWFnZVxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3NyY3NldCcsIGltYWdlU3JjU2V0ICk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGltYWdlU2l6ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3NpemVzJywgaW1hZ2VTaXplcyApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaW1hZ2VcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoICdzcmMnLCBpbWFnZVNvdXJjZSApXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVBdHRyKCdkYXRhLWxhenkgZGF0YS1zcmNzZXQgZGF0YS1zaXplcycpXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnc2xpY2stbG9hZGluZycpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCBfLm9wdGlvbnMuYWRhcHRpdmVIZWlnaHQgPT09IHRydWUgKSB7XG4gICAgICAgICAgICAgICAgICAgIF8uc2V0UG9zaXRpb24oKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBfLiRzbGlkZXIudHJpZ2dlcignbGF6eUxvYWRlZCcsIFsgXywgaW1hZ2UsIGltYWdlU291cmNlIF0pO1xuICAgICAgICAgICAgICAgIF8ucHJvZ3Jlc3NpdmVMYXp5TG9hZCgpO1xuXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpbWFnZVRvTG9hZC5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoIHRyeUNvdW50IDwgMyApIHtcblxuICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICogdHJ5IHRvIGxvYWQgdGhlIGltYWdlIDMgdGltZXMsXG4gICAgICAgICAgICAgICAgICAgICAqIGxlYXZlIGEgc2xpZ2h0IGRlbGF5IHNvIHdlIGRvbid0IGdldFxuICAgICAgICAgICAgICAgICAgICAgKiBzZXJ2ZXJzIGJsb2NraW5nIHRoZSByZXF1ZXN0LlxuICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCggZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfLnByb2dyZXNzaXZlTGF6eUxvYWQoIHRyeUNvdW50ICsgMSApO1xuICAgICAgICAgICAgICAgICAgICB9LCA1MDAgKTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVBdHRyKCAnZGF0YS1sYXp5JyApXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoICdzbGljay1sb2FkaW5nJyApXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoICdzbGljay1sYXp5bG9hZC1lcnJvcicgKTtcblxuICAgICAgICAgICAgICAgICAgICBfLiRzbGlkZXIudHJpZ2dlcignbGF6eUxvYWRFcnJvcicsIFsgXywgaW1hZ2UsIGltYWdlU291cmNlIF0pO1xuXG4gICAgICAgICAgICAgICAgICAgIF8ucHJvZ3Jlc3NpdmVMYXp5TG9hZCgpO1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpbWFnZVRvTG9hZC5zcmMgPSBpbWFnZVNvdXJjZTtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBfLiRzbGlkZXIudHJpZ2dlcignYWxsSW1hZ2VzTG9hZGVkJywgWyBfIF0pO1xuXG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUucmVmcmVzaCA9IGZ1bmN0aW9uKCBpbml0aWFsaXppbmcgKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzLCBjdXJyZW50U2xpZGUsIGxhc3RWaXNpYmxlSW5kZXg7XG5cbiAgICAgICAgbGFzdFZpc2libGVJbmRleCA9IF8uc2xpZGVDb3VudCAtIF8ub3B0aW9ucy5zbGlkZXNUb1Nob3c7XG5cbiAgICAgICAgLy8gaW4gbm9uLWluZmluaXRlIHNsaWRlcnMsIHdlIGRvbid0IHdhbnQgdG8gZ28gcGFzdCB0aGVcbiAgICAgICAgLy8gbGFzdCB2aXNpYmxlIGluZGV4LlxuICAgICAgICBpZiggIV8ub3B0aW9ucy5pbmZpbml0ZSAmJiAoIF8uY3VycmVudFNsaWRlID4gbGFzdFZpc2libGVJbmRleCApKSB7XG4gICAgICAgICAgICBfLmN1cnJlbnRTbGlkZSA9IGxhc3RWaXNpYmxlSW5kZXg7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiBsZXNzIHNsaWRlcyB0aGFuIHRvIHNob3csIGdvIHRvIHN0YXJ0LlxuICAgICAgICBpZiAoIF8uc2xpZGVDb3VudCA8PSBfLm9wdGlvbnMuc2xpZGVzVG9TaG93ICkge1xuICAgICAgICAgICAgXy5jdXJyZW50U2xpZGUgPSAwO1xuXG4gICAgICAgIH1cblxuICAgICAgICBjdXJyZW50U2xpZGUgPSBfLmN1cnJlbnRTbGlkZTtcblxuICAgICAgICBfLmRlc3Ryb3kodHJ1ZSk7XG5cbiAgICAgICAgJC5leHRlbmQoXywgXy5pbml0aWFscywgeyBjdXJyZW50U2xpZGU6IGN1cnJlbnRTbGlkZSB9KTtcblxuICAgICAgICBfLmluaXQoKTtcblxuICAgICAgICBpZiggIWluaXRpYWxpemluZyApIHtcblxuICAgICAgICAgICAgXy5jaGFuZ2VTbGlkZSh7XG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiAnaW5kZXgnLFxuICAgICAgICAgICAgICAgICAgICBpbmRleDogY3VycmVudFNsaWRlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgZmFsc2UpO1xuXG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUucmVnaXN0ZXJCcmVha3BvaW50cyA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcywgYnJlYWtwb2ludCwgY3VycmVudEJyZWFrcG9pbnQsIGwsXG4gICAgICAgICAgICByZXNwb25zaXZlU2V0dGluZ3MgPSBfLm9wdGlvbnMucmVzcG9uc2l2ZSB8fCBudWxsO1xuXG4gICAgICAgIGlmICggJC50eXBlKHJlc3BvbnNpdmVTZXR0aW5ncykgPT09ICdhcnJheScgJiYgcmVzcG9uc2l2ZVNldHRpbmdzLmxlbmd0aCApIHtcblxuICAgICAgICAgICAgXy5yZXNwb25kVG8gPSBfLm9wdGlvbnMucmVzcG9uZFRvIHx8ICd3aW5kb3cnO1xuXG4gICAgICAgICAgICBmb3IgKCBicmVha3BvaW50IGluIHJlc3BvbnNpdmVTZXR0aW5ncyApIHtcblxuICAgICAgICAgICAgICAgIGwgPSBfLmJyZWFrcG9pbnRzLmxlbmd0aC0xO1xuXG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNpdmVTZXR0aW5ncy5oYXNPd25Qcm9wZXJ0eShicmVha3BvaW50KSkge1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50QnJlYWtwb2ludCA9IHJlc3BvbnNpdmVTZXR0aW5nc1ticmVha3BvaW50XS5icmVha3BvaW50O1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGxvb3AgdGhyb3VnaCB0aGUgYnJlYWtwb2ludHMgYW5kIGN1dCBvdXQgYW55IGV4aXN0aW5nXG4gICAgICAgICAgICAgICAgICAgIC8vIG9uZXMgd2l0aCB0aGUgc2FtZSBicmVha3BvaW50IG51bWJlciwgd2UgZG9uJ3Qgd2FudCBkdXBlcy5cbiAgICAgICAgICAgICAgICAgICAgd2hpbGUoIGwgPj0gMCApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCBfLmJyZWFrcG9pbnRzW2xdICYmIF8uYnJlYWtwb2ludHNbbF0gPT09IGN1cnJlbnRCcmVha3BvaW50ICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF8uYnJlYWtwb2ludHMuc3BsaWNlKGwsMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBsLS07XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBfLmJyZWFrcG9pbnRzLnB1c2goY3VycmVudEJyZWFrcG9pbnQpO1xuICAgICAgICAgICAgICAgICAgICBfLmJyZWFrcG9pbnRTZXR0aW5nc1tjdXJyZW50QnJlYWtwb2ludF0gPSByZXNwb25zaXZlU2V0dGluZ3NbYnJlYWtwb2ludF0uc2V0dGluZ3M7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgXy5icmVha3BvaW50cy5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKCBfLm9wdGlvbnMubW9iaWxlRmlyc3QgKSA/IGEtYiA6IGItYTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUucmVpbml0ID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIF8uJHNsaWRlcyA9XG4gICAgICAgICAgICBfLiRzbGlkZVRyYWNrXG4gICAgICAgICAgICAgICAgLmNoaWxkcmVuKF8ub3B0aW9ucy5zbGlkZSlcbiAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ3NsaWNrLXNsaWRlJyk7XG5cbiAgICAgICAgXy5zbGlkZUNvdW50ID0gXy4kc2xpZGVzLmxlbmd0aDtcblxuICAgICAgICBpZiAoXy5jdXJyZW50U2xpZGUgPj0gXy5zbGlkZUNvdW50ICYmIF8uY3VycmVudFNsaWRlICE9PSAwKSB7XG4gICAgICAgICAgICBfLmN1cnJlbnRTbGlkZSA9IF8uY3VycmVudFNsaWRlIC0gXy5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF8uc2xpZGVDb3VudCA8PSBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSB7XG4gICAgICAgICAgICBfLmN1cnJlbnRTbGlkZSA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBfLnJlZ2lzdGVyQnJlYWtwb2ludHMoKTtcblxuICAgICAgICBfLnNldFByb3BzKCk7XG4gICAgICAgIF8uc2V0dXBJbmZpbml0ZSgpO1xuICAgICAgICBfLmJ1aWxkQXJyb3dzKCk7XG4gICAgICAgIF8udXBkYXRlQXJyb3dzKCk7XG4gICAgICAgIF8uaW5pdEFycm93RXZlbnRzKCk7XG4gICAgICAgIF8uYnVpbGREb3RzKCk7XG4gICAgICAgIF8udXBkYXRlRG90cygpO1xuICAgICAgICBfLmluaXREb3RFdmVudHMoKTtcbiAgICAgICAgXy5jbGVhblVwU2xpZGVFdmVudHMoKTtcbiAgICAgICAgXy5pbml0U2xpZGVFdmVudHMoKTtcblxuICAgICAgICBfLmNoZWNrUmVzcG9uc2l2ZShmYWxzZSwgdHJ1ZSk7XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5mb2N1c09uU2VsZWN0ID09PSB0cnVlKSB7XG4gICAgICAgICAgICAkKF8uJHNsaWRlVHJhY2spLmNoaWxkcmVuKCkub24oJ2NsaWNrLnNsaWNrJywgXy5zZWxlY3RIYW5kbGVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIF8uc2V0U2xpZGVDbGFzc2VzKHR5cGVvZiBfLmN1cnJlbnRTbGlkZSA9PT0gJ251bWJlcicgPyBfLmN1cnJlbnRTbGlkZSA6IDApO1xuXG4gICAgICAgIF8uc2V0UG9zaXRpb24oKTtcbiAgICAgICAgXy5mb2N1c0hhbmRsZXIoKTtcblxuICAgICAgICBfLnBhdXNlZCA9ICFfLm9wdGlvbnMuYXV0b3BsYXk7XG4gICAgICAgIF8uYXV0b1BsYXkoKTtcblxuICAgICAgICBfLiRzbGlkZXIudHJpZ2dlcigncmVJbml0JywgW19dKTtcblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUucmVzaXplID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSAhPT0gXy53aW5kb3dXaWR0aCkge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KF8ud2luZG93RGVsYXkpO1xuICAgICAgICAgICAgXy53aW5kb3dEZWxheSA9IHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIF8ud2luZG93V2lkdGggPSAkKHdpbmRvdykud2lkdGgoKTtcbiAgICAgICAgICAgICAgICBfLmNoZWNrUmVzcG9uc2l2ZSgpO1xuICAgICAgICAgICAgICAgIGlmKCAhXy51bnNsaWNrZWQgKSB7IF8uc2V0UG9zaXRpb24oKTsgfVxuICAgICAgICAgICAgfSwgNTApO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5yZW1vdmVTbGlkZSA9IFNsaWNrLnByb3RvdHlwZS5zbGlja1JlbW92ZSA9IGZ1bmN0aW9uKGluZGV4LCByZW1vdmVCZWZvcmUsIHJlbW92ZUFsbCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBpZiAodHlwZW9mKGluZGV4KSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgICByZW1vdmVCZWZvcmUgPSBpbmRleDtcbiAgICAgICAgICAgIGluZGV4ID0gcmVtb3ZlQmVmb3JlID09PSB0cnVlID8gMCA6IF8uc2xpZGVDb3VudCAtIDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpbmRleCA9IHJlbW92ZUJlZm9yZSA9PT0gdHJ1ZSA/IC0taW5kZXggOiBpbmRleDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfLnNsaWRlQ291bnQgPCAxIHx8IGluZGV4IDwgMCB8fCBpbmRleCA+IF8uc2xpZGVDb3VudCAtIDEpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIF8udW5sb2FkKCk7XG5cbiAgICAgICAgaWYgKHJlbW92ZUFsbCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgXy4kc2xpZGVUcmFjay5jaGlsZHJlbigpLnJlbW92ZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgXy4kc2xpZGVUcmFjay5jaGlsZHJlbih0aGlzLm9wdGlvbnMuc2xpZGUpLmVxKGluZGV4KS5yZW1vdmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIF8uJHNsaWRlcyA9IF8uJHNsaWRlVHJhY2suY2hpbGRyZW4odGhpcy5vcHRpb25zLnNsaWRlKTtcblxuICAgICAgICBfLiRzbGlkZVRyYWNrLmNoaWxkcmVuKHRoaXMub3B0aW9ucy5zbGlkZSkuZGV0YWNoKCk7XG5cbiAgICAgICAgXy4kc2xpZGVUcmFjay5hcHBlbmQoXy4kc2xpZGVzKTtcblxuICAgICAgICBfLiRzbGlkZXNDYWNoZSA9IF8uJHNsaWRlcztcblxuICAgICAgICBfLnJlaW5pdCgpO1xuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5zZXRDU1MgPSBmdW5jdGlvbihwb3NpdGlvbikge1xuXG4gICAgICAgIHZhciBfID0gdGhpcyxcbiAgICAgICAgICAgIHBvc2l0aW9uUHJvcHMgPSB7fSxcbiAgICAgICAgICAgIHgsIHk7XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5ydGwgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHBvc2l0aW9uID0gLXBvc2l0aW9uO1xuICAgICAgICB9XG4gICAgICAgIHggPSBfLnBvc2l0aW9uUHJvcCA9PSAnbGVmdCcgPyBNYXRoLmNlaWwocG9zaXRpb24pICsgJ3B4JyA6ICcwcHgnO1xuICAgICAgICB5ID0gXy5wb3NpdGlvblByb3AgPT0gJ3RvcCcgPyBNYXRoLmNlaWwocG9zaXRpb24pICsgJ3B4JyA6ICcwcHgnO1xuXG4gICAgICAgIHBvc2l0aW9uUHJvcHNbXy5wb3NpdGlvblByb3BdID0gcG9zaXRpb247XG5cbiAgICAgICAgaWYgKF8udHJhbnNmb3Jtc0VuYWJsZWQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBfLiRzbGlkZVRyYWNrLmNzcyhwb3NpdGlvblByb3BzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBvc2l0aW9uUHJvcHMgPSB7fTtcbiAgICAgICAgICAgIGlmIChfLmNzc1RyYW5zaXRpb25zID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uUHJvcHNbXy5hbmltVHlwZV0gPSAndHJhbnNsYXRlKCcgKyB4ICsgJywgJyArIHkgKyAnKSc7XG4gICAgICAgICAgICAgICAgXy4kc2xpZGVUcmFjay5jc3MocG9zaXRpb25Qcm9wcyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uUHJvcHNbXy5hbmltVHlwZV0gPSAndHJhbnNsYXRlM2QoJyArIHggKyAnLCAnICsgeSArICcsIDBweCknO1xuICAgICAgICAgICAgICAgIF8uJHNsaWRlVHJhY2suY3NzKHBvc2l0aW9uUHJvcHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLnNldERpbWVuc2lvbnMgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy52ZXJ0aWNhbCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGlmIChfLm9wdGlvbnMuY2VudGVyTW9kZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIF8uJGxpc3QuY3NzKHtcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogKCcwcHggJyArIF8ub3B0aW9ucy5jZW50ZXJQYWRkaW5nKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgXy4kbGlzdC5oZWlnaHQoXy4kc2xpZGVzLmZpcnN0KCkub3V0ZXJIZWlnaHQodHJ1ZSkgKiBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KTtcbiAgICAgICAgICAgIGlmIChfLm9wdGlvbnMuY2VudGVyTW9kZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIF8uJGxpc3QuY3NzKHtcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogKF8ub3B0aW9ucy5jZW50ZXJQYWRkaW5nICsgJyAwcHgnKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgXy5saXN0V2lkdGggPSBfLiRsaXN0LndpZHRoKCk7XG4gICAgICAgIF8ubGlzdEhlaWdodCA9IF8uJGxpc3QuaGVpZ2h0KCk7XG5cblxuICAgICAgICBpZiAoXy5vcHRpb25zLnZlcnRpY2FsID09PSBmYWxzZSAmJiBfLm9wdGlvbnMudmFyaWFibGVXaWR0aCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIF8uc2xpZGVXaWR0aCA9IE1hdGguY2VpbChfLmxpc3RXaWR0aCAvIF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpO1xuICAgICAgICAgICAgXy4kc2xpZGVUcmFjay53aWR0aChNYXRoLmNlaWwoKF8uc2xpZGVXaWR0aCAqIF8uJHNsaWRlVHJhY2suY2hpbGRyZW4oJy5zbGljay1zbGlkZScpLmxlbmd0aCkpKTtcblxuICAgICAgICB9IGVsc2UgaWYgKF8ub3B0aW9ucy52YXJpYWJsZVdpZHRoID09PSB0cnVlKSB7XG4gICAgICAgICAgICBfLiRzbGlkZVRyYWNrLndpZHRoKDUwMDAgKiBfLnNsaWRlQ291bnQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgXy5zbGlkZVdpZHRoID0gTWF0aC5jZWlsKF8ubGlzdFdpZHRoKTtcbiAgICAgICAgICAgIF8uJHNsaWRlVHJhY2suaGVpZ2h0KE1hdGguY2VpbCgoXy4kc2xpZGVzLmZpcnN0KCkub3V0ZXJIZWlnaHQodHJ1ZSkgKiBfLiRzbGlkZVRyYWNrLmNoaWxkcmVuKCcuc2xpY2stc2xpZGUnKS5sZW5ndGgpKSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgb2Zmc2V0ID0gXy4kc2xpZGVzLmZpcnN0KCkub3V0ZXJXaWR0aCh0cnVlKSAtIF8uJHNsaWRlcy5maXJzdCgpLndpZHRoKCk7XG4gICAgICAgIGlmIChfLm9wdGlvbnMudmFyaWFibGVXaWR0aCA9PT0gZmFsc2UpIF8uJHNsaWRlVHJhY2suY2hpbGRyZW4oJy5zbGljay1zbGlkZScpLndpZHRoKF8uc2xpZGVXaWR0aCAtIG9mZnNldCk7XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLnNldEZhZGUgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXMsXG4gICAgICAgICAgICB0YXJnZXRMZWZ0O1xuXG4gICAgICAgIF8uJHNsaWRlcy5lYWNoKGZ1bmN0aW9uKGluZGV4LCBlbGVtZW50KSB7XG4gICAgICAgICAgICB0YXJnZXRMZWZ0ID0gKF8uc2xpZGVXaWR0aCAqIGluZGV4KSAqIC0xO1xuICAgICAgICAgICAgaWYgKF8ub3B0aW9ucy5ydGwgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAkKGVsZW1lbnQpLmNzcyh7XG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICAgICAgICAgICAgICAgICAgICByaWdodDogdGFyZ2V0TGVmdCxcbiAgICAgICAgICAgICAgICAgICAgdG9wOiAwLFxuICAgICAgICAgICAgICAgICAgICB6SW5kZXg6IF8ub3B0aW9ucy56SW5kZXggLSAyLFxuICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAwXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICQoZWxlbWVudCkuY3NzKHtcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IHRhcmdldExlZnQsXG4gICAgICAgICAgICAgICAgICAgIHRvcDogMCxcbiAgICAgICAgICAgICAgICAgICAgekluZGV4OiBfLm9wdGlvbnMuekluZGV4IC0gMixcbiAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBfLiRzbGlkZXMuZXEoXy5jdXJyZW50U2xpZGUpLmNzcyh7XG4gICAgICAgICAgICB6SW5kZXg6IF8ub3B0aW9ucy56SW5kZXggLSAxLFxuICAgICAgICAgICAgb3BhY2l0eTogMVxuICAgICAgICB9KTtcblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuc2V0SGVpZ2h0ID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuc2xpZGVzVG9TaG93ID09PSAxICYmIF8ub3B0aW9ucy5hZGFwdGl2ZUhlaWdodCA9PT0gdHJ1ZSAmJiBfLm9wdGlvbnMudmVydGljYWwgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICB2YXIgdGFyZ2V0SGVpZ2h0ID0gXy4kc2xpZGVzLmVxKF8uY3VycmVudFNsaWRlKS5vdXRlckhlaWdodCh0cnVlKTtcbiAgICAgICAgICAgIF8uJGxpc3QuY3NzKCdoZWlnaHQnLCB0YXJnZXRIZWlnaHQpO1xuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLnNldE9wdGlvbiA9XG4gICAgU2xpY2sucHJvdG90eXBlLnNsaWNrU2V0T3B0aW9uID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGFjY2VwdHMgYXJndW1lbnRzIGluIGZvcm1hdCBvZjpcbiAgICAgICAgICpcbiAgICAgICAgICogIC0gZm9yIGNoYW5naW5nIGEgc2luZ2xlIG9wdGlvbidzIHZhbHVlOlxuICAgICAgICAgKiAgICAgLnNsaWNrKFwic2V0T3B0aW9uXCIsIG9wdGlvbiwgdmFsdWUsIHJlZnJlc2ggKVxuICAgICAgICAgKlxuICAgICAgICAgKiAgLSBmb3IgY2hhbmdpbmcgYSBzZXQgb2YgcmVzcG9uc2l2ZSBvcHRpb25zOlxuICAgICAgICAgKiAgICAgLnNsaWNrKFwic2V0T3B0aW9uXCIsICdyZXNwb25zaXZlJywgW3t9LCAuLi5dLCByZWZyZXNoIClcbiAgICAgICAgICpcbiAgICAgICAgICogIC0gZm9yIHVwZGF0aW5nIG11bHRpcGxlIHZhbHVlcyBhdCBvbmNlIChub3QgcmVzcG9uc2l2ZSlcbiAgICAgICAgICogICAgIC5zbGljayhcInNldE9wdGlvblwiLCB7ICdvcHRpb24nOiB2YWx1ZSwgLi4uIH0sIHJlZnJlc2ggKVxuICAgICAgICAgKi9cblxuICAgICAgICB2YXIgXyA9IHRoaXMsIGwsIGl0ZW0sIG9wdGlvbiwgdmFsdWUsIHJlZnJlc2ggPSBmYWxzZSwgdHlwZTtcblxuICAgICAgICBpZiggJC50eXBlKCBhcmd1bWVudHNbMF0gKSA9PT0gJ29iamVjdCcgKSB7XG5cbiAgICAgICAgICAgIG9wdGlvbiA9ICBhcmd1bWVudHNbMF07XG4gICAgICAgICAgICByZWZyZXNoID0gYXJndW1lbnRzWzFdO1xuICAgICAgICAgICAgdHlwZSA9ICdtdWx0aXBsZSc7XG5cbiAgICAgICAgfSBlbHNlIGlmICggJC50eXBlKCBhcmd1bWVudHNbMF0gKSA9PT0gJ3N0cmluZycgKSB7XG5cbiAgICAgICAgICAgIG9wdGlvbiA9ICBhcmd1bWVudHNbMF07XG4gICAgICAgICAgICB2YWx1ZSA9IGFyZ3VtZW50c1sxXTtcbiAgICAgICAgICAgIHJlZnJlc2ggPSBhcmd1bWVudHNbMl07XG5cbiAgICAgICAgICAgIGlmICggYXJndW1lbnRzWzBdID09PSAncmVzcG9uc2l2ZScgJiYgJC50eXBlKCBhcmd1bWVudHNbMV0gKSA9PT0gJ2FycmF5JyApIHtcblxuICAgICAgICAgICAgICAgIHR5cGUgPSAncmVzcG9uc2l2ZSc7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIHR5cGVvZiBhcmd1bWVudHNbMV0gIT09ICd1bmRlZmluZWQnICkge1xuXG4gICAgICAgICAgICAgICAgdHlwZSA9ICdzaW5nbGUnO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggdHlwZSA9PT0gJ3NpbmdsZScgKSB7XG5cbiAgICAgICAgICAgIF8ub3B0aW9uc1tvcHRpb25dID0gdmFsdWU7XG5cblxuICAgICAgICB9IGVsc2UgaWYgKCB0eXBlID09PSAnbXVsdGlwbGUnICkge1xuXG4gICAgICAgICAgICAkLmVhY2goIG9wdGlvbiAsIGZ1bmN0aW9uKCBvcHQsIHZhbCApIHtcblxuICAgICAgICAgICAgICAgIF8ub3B0aW9uc1tvcHRdID0gdmFsO1xuXG4gICAgICAgICAgICB9KTtcblxuXG4gICAgICAgIH0gZWxzZSBpZiAoIHR5cGUgPT09ICdyZXNwb25zaXZlJyApIHtcblxuICAgICAgICAgICAgZm9yICggaXRlbSBpbiB2YWx1ZSApIHtcblxuICAgICAgICAgICAgICAgIGlmKCAkLnR5cGUoIF8ub3B0aW9ucy5yZXNwb25zaXZlICkgIT09ICdhcnJheScgKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgXy5vcHRpb25zLnJlc3BvbnNpdmUgPSBbIHZhbHVlW2l0ZW1dIF07XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgIGwgPSBfLm9wdGlvbnMucmVzcG9uc2l2ZS5sZW5ndGgtMTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBsb29wIHRocm91Z2ggdGhlIHJlc3BvbnNpdmUgb2JqZWN0IGFuZCBzcGxpY2Ugb3V0IGR1cGxpY2F0ZXMuXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlKCBsID49IDAgKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCBfLm9wdGlvbnMucmVzcG9uc2l2ZVtsXS5icmVha3BvaW50ID09PSB2YWx1ZVtpdGVtXS5icmVha3BvaW50ICkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXy5vcHRpb25zLnJlc3BvbnNpdmUuc3BsaWNlKGwsMSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgbC0tO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBfLm9wdGlvbnMucmVzcG9uc2l2ZS5wdXNoKCB2YWx1ZVtpdGVtXSApO1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggcmVmcmVzaCApIHtcblxuICAgICAgICAgICAgXy51bmxvYWQoKTtcbiAgICAgICAgICAgIF8ucmVpbml0KCk7XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5zZXRQb3NpdGlvbiA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBfLnNldERpbWVuc2lvbnMoKTtcblxuICAgICAgICBfLnNldEhlaWdodCgpO1xuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuZmFkZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIF8uc2V0Q1NTKF8uZ2V0TGVmdChfLmN1cnJlbnRTbGlkZSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgXy5zZXRGYWRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBfLiRzbGlkZXIudHJpZ2dlcignc2V0UG9zaXRpb24nLCBbX10pO1xuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5zZXRQcm9wcyA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcyxcbiAgICAgICAgICAgIGJvZHlTdHlsZSA9IGRvY3VtZW50LmJvZHkuc3R5bGU7XG5cbiAgICAgICAgXy5wb3NpdGlvblByb3AgPSBfLm9wdGlvbnMudmVydGljYWwgPT09IHRydWUgPyAndG9wJyA6ICdsZWZ0JztcblxuICAgICAgICBpZiAoXy5wb3NpdGlvblByb3AgPT09ICd0b3AnKSB7XG4gICAgICAgICAgICBfLiRzbGlkZXIuYWRkQ2xhc3MoJ3NsaWNrLXZlcnRpY2FsJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfLiRzbGlkZXIucmVtb3ZlQ2xhc3MoJ3NsaWNrLXZlcnRpY2FsJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYm9keVN0eWxlLldlYmtpdFRyYW5zaXRpb24gIT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgYm9keVN0eWxlLk1velRyYW5zaXRpb24gIT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgYm9keVN0eWxlLm1zVHJhbnNpdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAoXy5vcHRpb25zLnVzZUNTUyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIF8uY3NzVHJhbnNpdGlvbnMgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCBfLm9wdGlvbnMuZmFkZSApIHtcbiAgICAgICAgICAgIGlmICggdHlwZW9mIF8ub3B0aW9ucy56SW5kZXggPT09ICdudW1iZXInICkge1xuICAgICAgICAgICAgICAgIGlmKCBfLm9wdGlvbnMuekluZGV4IDwgMyApIHtcbiAgICAgICAgICAgICAgICAgICAgXy5vcHRpb25zLnpJbmRleCA9IDM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBfLm9wdGlvbnMuekluZGV4ID0gXy5kZWZhdWx0cy56SW5kZXg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYm9keVN0eWxlLk9UcmFuc2Zvcm0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgXy5hbmltVHlwZSA9ICdPVHJhbnNmb3JtJztcbiAgICAgICAgICAgIF8udHJhbnNmb3JtVHlwZSA9ICctby10cmFuc2Zvcm0nO1xuICAgICAgICAgICAgXy50cmFuc2l0aW9uVHlwZSA9ICdPVHJhbnNpdGlvbic7XG4gICAgICAgICAgICBpZiAoYm9keVN0eWxlLnBlcnNwZWN0aXZlUHJvcGVydHkgPT09IHVuZGVmaW5lZCAmJiBib2R5U3R5bGUud2Via2l0UGVyc3BlY3RpdmUgPT09IHVuZGVmaW5lZCkgXy5hbmltVHlwZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChib2R5U3R5bGUuTW96VHJhbnNmb3JtICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIF8uYW5pbVR5cGUgPSAnTW96VHJhbnNmb3JtJztcbiAgICAgICAgICAgIF8udHJhbnNmb3JtVHlwZSA9ICctbW96LXRyYW5zZm9ybSc7XG4gICAgICAgICAgICBfLnRyYW5zaXRpb25UeXBlID0gJ01velRyYW5zaXRpb24nO1xuICAgICAgICAgICAgaWYgKGJvZHlTdHlsZS5wZXJzcGVjdGl2ZVByb3BlcnR5ID09PSB1bmRlZmluZWQgJiYgYm9keVN0eWxlLk1velBlcnNwZWN0aXZlID09PSB1bmRlZmluZWQpIF8uYW5pbVR5cGUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYm9keVN0eWxlLndlYmtpdFRyYW5zZm9ybSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBfLmFuaW1UeXBlID0gJ3dlYmtpdFRyYW5zZm9ybSc7XG4gICAgICAgICAgICBfLnRyYW5zZm9ybVR5cGUgPSAnLXdlYmtpdC10cmFuc2Zvcm0nO1xuICAgICAgICAgICAgXy50cmFuc2l0aW9uVHlwZSA9ICd3ZWJraXRUcmFuc2l0aW9uJztcbiAgICAgICAgICAgIGlmIChib2R5U3R5bGUucGVyc3BlY3RpdmVQcm9wZXJ0eSA9PT0gdW5kZWZpbmVkICYmIGJvZHlTdHlsZS53ZWJraXRQZXJzcGVjdGl2ZSA9PT0gdW5kZWZpbmVkKSBfLmFuaW1UeXBlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGJvZHlTdHlsZS5tc1RyYW5zZm9ybSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBfLmFuaW1UeXBlID0gJ21zVHJhbnNmb3JtJztcbiAgICAgICAgICAgIF8udHJhbnNmb3JtVHlwZSA9ICctbXMtdHJhbnNmb3JtJztcbiAgICAgICAgICAgIF8udHJhbnNpdGlvblR5cGUgPSAnbXNUcmFuc2l0aW9uJztcbiAgICAgICAgICAgIGlmIChib2R5U3R5bGUubXNUcmFuc2Zvcm0gPT09IHVuZGVmaW5lZCkgXy5hbmltVHlwZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChib2R5U3R5bGUudHJhbnNmb3JtICE9PSB1bmRlZmluZWQgJiYgXy5hbmltVHlwZSAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIF8uYW5pbVR5cGUgPSAndHJhbnNmb3JtJztcbiAgICAgICAgICAgIF8udHJhbnNmb3JtVHlwZSA9ICd0cmFuc2Zvcm0nO1xuICAgICAgICAgICAgXy50cmFuc2l0aW9uVHlwZSA9ICd0cmFuc2l0aW9uJztcbiAgICAgICAgfVxuICAgICAgICBfLnRyYW5zZm9ybXNFbmFibGVkID0gXy5vcHRpb25zLnVzZVRyYW5zZm9ybSAmJiAoXy5hbmltVHlwZSAhPT0gbnVsbCAmJiBfLmFuaW1UeXBlICE9PSBmYWxzZSk7XG4gICAgfTtcblxuXG4gICAgU2xpY2sucHJvdG90eXBlLnNldFNsaWRlQ2xhc3NlcyA9IGZ1bmN0aW9uKGluZGV4KSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzLFxuICAgICAgICAgICAgY2VudGVyT2Zmc2V0LCBhbGxTbGlkZXMsIGluZGV4T2Zmc2V0LCByZW1haW5kZXI7XG5cbiAgICAgICAgYWxsU2xpZGVzID0gXy4kc2xpZGVyXG4gICAgICAgICAgICAuZmluZCgnLnNsaWNrLXNsaWRlJylcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnc2xpY2stYWN0aXZlIHNsaWNrLWNlbnRlciBzbGljay1jdXJyZW50JylcbiAgICAgICAgICAgIC5hdHRyKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG5cbiAgICAgICAgXy4kc2xpZGVzXG4gICAgICAgICAgICAuZXEoaW5kZXgpXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ3NsaWNrLWN1cnJlbnQnKTtcblxuICAgICAgICBpZiAoXy5vcHRpb25zLmNlbnRlck1vZGUgPT09IHRydWUpIHtcblxuICAgICAgICAgICAgdmFyIGV2ZW5Db2VmID0gXy5vcHRpb25zLnNsaWRlc1RvU2hvdyAlIDIgPT09IDAgPyAxIDogMDtcblxuICAgICAgICAgICAgY2VudGVyT2Zmc2V0ID0gTWF0aC5mbG9vcihfLm9wdGlvbnMuc2xpZGVzVG9TaG93IC8gMik7XG5cbiAgICAgICAgICAgIGlmIChfLm9wdGlvbnMuaW5maW5pdGUgPT09IHRydWUpIHtcblxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA+PSBjZW50ZXJPZmZzZXQgJiYgaW5kZXggPD0gKF8uc2xpZGVDb3VudCAtIDEpIC0gY2VudGVyT2Zmc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIF8uJHNsaWRlc1xuICAgICAgICAgICAgICAgICAgICAgICAgLnNsaWNlKGluZGV4IC0gY2VudGVyT2Zmc2V0ICsgZXZlbkNvZWYsIGluZGV4ICsgY2VudGVyT2Zmc2V0ICsgMSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnc2xpY2stYWN0aXZlJylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdhcmlhLWhpZGRlbicsICdmYWxzZScpO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICBpbmRleE9mZnNldCA9IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgKyBpbmRleDtcbiAgICAgICAgICAgICAgICAgICAgYWxsU2xpZGVzXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2xpY2UoaW5kZXhPZmZzZXQgLSBjZW50ZXJPZmZzZXQgKyAxICsgZXZlbkNvZWYsIGluZGV4T2Zmc2V0ICsgY2VudGVyT2Zmc2V0ICsgMilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnc2xpY2stYWN0aXZlJylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdhcmlhLWhpZGRlbicsICdmYWxzZScpO1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID09PSAwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgYWxsU2xpZGVzXG4gICAgICAgICAgICAgICAgICAgICAgICAuZXEoYWxsU2xpZGVzLmxlbmd0aCAtIDEgLSBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdzbGljay1jZW50ZXInKTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaW5kZXggPT09IF8uc2xpZGVDb3VudCAtIDEpIHtcblxuICAgICAgICAgICAgICAgICAgICBhbGxTbGlkZXNcbiAgICAgICAgICAgICAgICAgICAgICAgIC5lcShfLm9wdGlvbnMuc2xpZGVzVG9TaG93KVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdzbGljay1jZW50ZXInKTtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBfLiRzbGlkZXNcbiAgICAgICAgICAgICAgICAuZXEoaW5kZXgpXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKCdzbGljay1jZW50ZXInKTtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBpZiAoaW5kZXggPj0gMCAmJiBpbmRleCA8PSAoXy5zbGlkZUNvdW50IC0gXy5vcHRpb25zLnNsaWRlc1RvU2hvdykpIHtcblxuICAgICAgICAgICAgICAgIF8uJHNsaWRlc1xuICAgICAgICAgICAgICAgICAgICAuc2xpY2UoaW5kZXgsIGluZGV4ICsgXy5vcHRpb25zLnNsaWRlc1RvU2hvdylcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdzbGljay1hY3RpdmUnKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cignYXJpYS1oaWRkZW4nLCAnZmFsc2UnKTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmIChhbGxTbGlkZXMubGVuZ3RoIDw9IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpIHtcblxuICAgICAgICAgICAgICAgIGFsbFNsaWRlc1xuICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ3NsaWNrLWFjdGl2ZScpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdhcmlhLWhpZGRlbicsICdmYWxzZScpO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgcmVtYWluZGVyID0gXy5zbGlkZUNvdW50ICUgXy5vcHRpb25zLnNsaWRlc1RvU2hvdztcbiAgICAgICAgICAgICAgICBpbmRleE9mZnNldCA9IF8ub3B0aW9ucy5pbmZpbml0ZSA9PT0gdHJ1ZSA/IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgKyBpbmRleCA6IGluZGV4O1xuXG4gICAgICAgICAgICAgICAgaWYgKF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgPT0gXy5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsICYmIChfLnNsaWRlQ291bnQgLSBpbmRleCkgPCBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgYWxsU2xpZGVzXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2xpY2UoaW5kZXhPZmZzZXQgLSAoXy5vcHRpb25zLnNsaWRlc1RvU2hvdyAtIHJlbWFpbmRlciksIGluZGV4T2Zmc2V0ICsgcmVtYWluZGVyKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdzbGljay1hY3RpdmUnKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJyk7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgIGFsbFNsaWRlc1xuICAgICAgICAgICAgICAgICAgICAgICAgLnNsaWNlKGluZGV4T2Zmc2V0LCBpbmRleE9mZnNldCArIF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ3NsaWNrLWFjdGl2ZScpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignYXJpYS1oaWRkZW4nLCAnZmFsc2UnKTtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXy5vcHRpb25zLmxhenlMb2FkID09PSAnb25kZW1hbmQnIHx8IF8ub3B0aW9ucy5sYXp5TG9hZCA9PT0gJ2FudGljaXBhdGVkJykge1xuICAgICAgICAgICAgXy5sYXp5TG9hZCgpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5zZXR1cEluZmluaXRlID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzLFxuICAgICAgICAgICAgaSwgc2xpZGVJbmRleCwgaW5maW5pdGVDb3VudDtcblxuICAgICAgICBpZiAoXy5vcHRpb25zLmZhZGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgIF8ub3B0aW9ucy5jZW50ZXJNb2RlID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXy5vcHRpb25zLmluZmluaXRlID09PSB0cnVlICYmIF8ub3B0aW9ucy5mYWRlID09PSBmYWxzZSkge1xuXG4gICAgICAgICAgICBzbGlkZUluZGV4ID0gbnVsbDtcblxuICAgICAgICAgICAgaWYgKF8uc2xpZGVDb3VudCA+IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpIHtcblxuICAgICAgICAgICAgICAgIGlmIChfLm9wdGlvbnMuY2VudGVyTW9kZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICBpbmZpbml0ZUNvdW50ID0gXy5vcHRpb25zLnNsaWRlc1RvU2hvdyArIDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaW5maW5pdGVDb3VudCA9IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3c7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZm9yIChpID0gXy5zbGlkZUNvdW50OyBpID4gKF8uc2xpZGVDb3VudCAtXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmZpbml0ZUNvdW50KTsgaSAtPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlSW5kZXggPSBpIC0gMTtcbiAgICAgICAgICAgICAgICAgICAgJChfLiRzbGlkZXNbc2xpZGVJbmRleF0pLmNsb25lKHRydWUpLmF0dHIoJ2lkJywgJycpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignZGF0YS1zbGljay1pbmRleCcsIHNsaWRlSW5kZXggLSBfLnNsaWRlQ291bnQpXG4gICAgICAgICAgICAgICAgICAgICAgICAucHJlcGVuZFRvKF8uJHNsaWRlVHJhY2spLmFkZENsYXNzKCdzbGljay1jbG9uZWQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGluZmluaXRlQ291bnQgICsgXy5zbGlkZUNvdW50OyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVJbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgICAgICQoXy4kc2xpZGVzW3NsaWRlSW5kZXhdKS5jbG9uZSh0cnVlKS5hdHRyKCdpZCcsICcnKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2RhdGEtc2xpY2staW5kZXgnLCBzbGlkZUluZGV4ICsgXy5zbGlkZUNvdW50KVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZFRvKF8uJHNsaWRlVHJhY2spLmFkZENsYXNzKCdzbGljay1jbG9uZWQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXy4kc2xpZGVUcmFjay5maW5kKCcuc2xpY2stY2xvbmVkJykuZmluZCgnW2lkXScpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuYXR0cignaWQnLCAnJyk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmludGVycnVwdCA9IGZ1bmN0aW9uKCB0b2dnbGUgKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIGlmKCAhdG9nZ2xlICkge1xuICAgICAgICAgICAgXy5hdXRvUGxheSgpO1xuICAgICAgICB9XG4gICAgICAgIF8uaW50ZXJydXB0ZWQgPSB0b2dnbGU7XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLnNlbGVjdEhhbmRsZXIgPSBmdW5jdGlvbihldmVudCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICB2YXIgdGFyZ2V0RWxlbWVudCA9XG4gICAgICAgICAgICAkKGV2ZW50LnRhcmdldCkuaXMoJy5zbGljay1zbGlkZScpID9cbiAgICAgICAgICAgICAgICAkKGV2ZW50LnRhcmdldCkgOlxuICAgICAgICAgICAgICAgICQoZXZlbnQudGFyZ2V0KS5wYXJlbnRzKCcuc2xpY2stc2xpZGUnKTtcblxuICAgICAgICB2YXIgaW5kZXggPSBwYXJzZUludCh0YXJnZXRFbGVtZW50LmF0dHIoJ2RhdGEtc2xpY2staW5kZXgnKSk7XG5cbiAgICAgICAgaWYgKCFpbmRleCkgaW5kZXggPSAwO1xuXG4gICAgICAgIGlmIChfLnNsaWRlQ291bnQgPD0gXy5vcHRpb25zLnNsaWRlc1RvU2hvdykge1xuXG4gICAgICAgICAgICBfLnNsaWRlSGFuZGxlcihpbmRleCwgZmFsc2UsIHRydWUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIH1cblxuICAgICAgICBfLnNsaWRlSGFuZGxlcihpbmRleCk7XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLnNsaWRlSGFuZGxlciA9IGZ1bmN0aW9uKGluZGV4LCBzeW5jLCBkb250QW5pbWF0ZSkge1xuXG4gICAgICAgIHZhciB0YXJnZXRTbGlkZSwgYW5pbVNsaWRlLCBvbGRTbGlkZSwgc2xpZGVMZWZ0LCB0YXJnZXRMZWZ0ID0gbnVsbCxcbiAgICAgICAgICAgIF8gPSB0aGlzLCBuYXZUYXJnZXQ7XG5cbiAgICAgICAgc3luYyA9IHN5bmMgfHwgZmFsc2U7XG5cbiAgICAgICAgaWYgKF8uYW5pbWF0aW5nID09PSB0cnVlICYmIF8ub3B0aW9ucy53YWl0Rm9yQW5pbWF0ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5mYWRlID09PSB0cnVlICYmIF8uY3VycmVudFNsaWRlID09PSBpbmRleCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN5bmMgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBfLmFzTmF2Rm9yKGluZGV4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRhcmdldFNsaWRlID0gaW5kZXg7XG4gICAgICAgIHRhcmdldExlZnQgPSBfLmdldExlZnQodGFyZ2V0U2xpZGUpO1xuICAgICAgICBzbGlkZUxlZnQgPSBfLmdldExlZnQoXy5jdXJyZW50U2xpZGUpO1xuXG4gICAgICAgIF8uY3VycmVudExlZnQgPSBfLnN3aXBlTGVmdCA9PT0gbnVsbCA/IHNsaWRlTGVmdCA6IF8uc3dpcGVMZWZ0O1xuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuaW5maW5pdGUgPT09IGZhbHNlICYmIF8ub3B0aW9ucy5jZW50ZXJNb2RlID09PSBmYWxzZSAmJiAoaW5kZXggPCAwIHx8IGluZGV4ID4gXy5nZXREb3RDb3VudCgpICogXy5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsKSkge1xuICAgICAgICAgICAgaWYgKF8ub3B0aW9ucy5mYWRlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHRhcmdldFNsaWRlID0gXy5jdXJyZW50U2xpZGU7XG4gICAgICAgICAgICAgICAgaWYgKGRvbnRBbmltYXRlICE9PSB0cnVlICYmIF8uc2xpZGVDb3VudCA+IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpIHtcbiAgICAgICAgICAgICAgICAgICAgXy5hbmltYXRlU2xpZGUoc2xpZGVMZWZ0LCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF8ucG9zdFNsaWRlKHRhcmdldFNsaWRlKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgXy5wb3N0U2xpZGUodGFyZ2V0U2xpZGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSBlbHNlIGlmIChfLm9wdGlvbnMuaW5maW5pdGUgPT09IGZhbHNlICYmIF8ub3B0aW9ucy5jZW50ZXJNb2RlID09PSB0cnVlICYmIChpbmRleCA8IDAgfHwgaW5kZXggPiAoXy5zbGlkZUNvdW50IC0gXy5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsKSkpIHtcbiAgICAgICAgICAgIGlmIChfLm9wdGlvbnMuZmFkZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRTbGlkZSA9IF8uY3VycmVudFNsaWRlO1xuICAgICAgICAgICAgICAgIGlmIChkb250QW5pbWF0ZSAhPT0gdHJ1ZSAmJiBfLnNsaWRlQ291bnQgPiBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSB7XG4gICAgICAgICAgICAgICAgICAgIF8uYW5pbWF0ZVNsaWRlKHNsaWRlTGVmdCwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfLnBvc3RTbGlkZSh0YXJnZXRTbGlkZSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIF8ucG9zdFNsaWRlKHRhcmdldFNsaWRlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIF8ub3B0aW9ucy5hdXRvcGxheSApIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoXy5hdXRvUGxheVRpbWVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0YXJnZXRTbGlkZSA8IDApIHtcbiAgICAgICAgICAgIGlmIChfLnNsaWRlQ291bnQgJSBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGwgIT09IDApIHtcbiAgICAgICAgICAgICAgICBhbmltU2xpZGUgPSBfLnNsaWRlQ291bnQgLSAoXy5zbGlkZUNvdW50ICUgXy5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYW5pbVNsaWRlID0gXy5zbGlkZUNvdW50ICsgdGFyZ2V0U2xpZGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0U2xpZGUgPj0gXy5zbGlkZUNvdW50KSB7XG4gICAgICAgICAgICBpZiAoXy5zbGlkZUNvdW50ICUgXy5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgYW5pbVNsaWRlID0gMDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYW5pbVNsaWRlID0gdGFyZ2V0U2xpZGUgLSBfLnNsaWRlQ291bnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhbmltU2xpZGUgPSB0YXJnZXRTbGlkZTtcbiAgICAgICAgfVxuXG4gICAgICAgIF8uYW5pbWF0aW5nID0gdHJ1ZTtcblxuICAgICAgICBfLiRzbGlkZXIudHJpZ2dlcignYmVmb3JlQ2hhbmdlJywgW18sIF8uY3VycmVudFNsaWRlLCBhbmltU2xpZGVdKTtcblxuICAgICAgICBvbGRTbGlkZSA9IF8uY3VycmVudFNsaWRlO1xuICAgICAgICBfLmN1cnJlbnRTbGlkZSA9IGFuaW1TbGlkZTtcblxuICAgICAgICBfLnNldFNsaWRlQ2xhc3NlcyhfLmN1cnJlbnRTbGlkZSk7XG5cbiAgICAgICAgaWYgKCBfLm9wdGlvbnMuYXNOYXZGb3IgKSB7XG5cbiAgICAgICAgICAgIG5hdlRhcmdldCA9IF8uZ2V0TmF2VGFyZ2V0KCk7XG4gICAgICAgICAgICBuYXZUYXJnZXQgPSBuYXZUYXJnZXQuc2xpY2soJ2dldFNsaWNrJyk7XG5cbiAgICAgICAgICAgIGlmICggbmF2VGFyZ2V0LnNsaWRlQ291bnQgPD0gbmF2VGFyZ2V0Lm9wdGlvbnMuc2xpZGVzVG9TaG93ICkge1xuICAgICAgICAgICAgICAgIG5hdlRhcmdldC5zZXRTbGlkZUNsYXNzZXMoXy5jdXJyZW50U2xpZGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICBfLnVwZGF0ZURvdHMoKTtcbiAgICAgICAgXy51cGRhdGVBcnJvd3MoKTtcblxuICAgICAgICBpZiAoXy5vcHRpb25zLmZhZGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGlmIChkb250QW5pbWF0ZSAhPT0gdHJ1ZSkge1xuXG4gICAgICAgICAgICAgICAgXy5mYWRlU2xpZGVPdXQob2xkU2xpZGUpO1xuXG4gICAgICAgICAgICAgICAgXy5mYWRlU2xpZGUoYW5pbVNsaWRlLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgXy5wb3N0U2xpZGUoYW5pbVNsaWRlKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBfLnBvc3RTbGlkZShhbmltU2xpZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXy5hbmltYXRlSGVpZ2h0KCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZG9udEFuaW1hdGUgIT09IHRydWUgJiYgXy5zbGlkZUNvdW50ID4gXy5vcHRpb25zLnNsaWRlc1RvU2hvdykge1xuICAgICAgICAgICAgXy5hbmltYXRlU2xpZGUodGFyZ2V0TGVmdCwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgXy5wb3N0U2xpZGUoYW5pbVNsaWRlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgXy5wb3N0U2xpZGUoYW5pbVNsaWRlKTtcbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5zdGFydExvYWQgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5hcnJvd3MgPT09IHRydWUgJiYgXy5zbGlkZUNvdW50ID4gXy5vcHRpb25zLnNsaWRlc1RvU2hvdykge1xuXG4gICAgICAgICAgICBfLiRwcmV2QXJyb3cuaGlkZSgpO1xuICAgICAgICAgICAgXy4kbmV4dEFycm93LmhpZGUoKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5kb3RzID09PSB0cnVlICYmIF8uc2xpZGVDb3VudCA+IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpIHtcblxuICAgICAgICAgICAgXy4kZG90cy5oaWRlKCk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIF8uJHNsaWRlci5hZGRDbGFzcygnc2xpY2stbG9hZGluZycpO1xuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5zd2lwZURpcmVjdGlvbiA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciB4RGlzdCwgeURpc3QsIHIsIHN3aXBlQW5nbGUsIF8gPSB0aGlzO1xuXG4gICAgICAgIHhEaXN0ID0gXy50b3VjaE9iamVjdC5zdGFydFggLSBfLnRvdWNoT2JqZWN0LmN1clg7XG4gICAgICAgIHlEaXN0ID0gXy50b3VjaE9iamVjdC5zdGFydFkgLSBfLnRvdWNoT2JqZWN0LmN1clk7XG4gICAgICAgIHIgPSBNYXRoLmF0YW4yKHlEaXN0LCB4RGlzdCk7XG5cbiAgICAgICAgc3dpcGVBbmdsZSA9IE1hdGgucm91bmQociAqIDE4MCAvIE1hdGguUEkpO1xuICAgICAgICBpZiAoc3dpcGVBbmdsZSA8IDApIHtcbiAgICAgICAgICAgIHN3aXBlQW5nbGUgPSAzNjAgLSBNYXRoLmFicyhzd2lwZUFuZ2xlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgoc3dpcGVBbmdsZSA8PSA0NSkgJiYgKHN3aXBlQW5nbGUgPj0gMCkpIHtcbiAgICAgICAgICAgIHJldHVybiAoXy5vcHRpb25zLnJ0bCA9PT0gZmFsc2UgPyAnbGVmdCcgOiAncmlnaHQnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoKHN3aXBlQW5nbGUgPD0gMzYwKSAmJiAoc3dpcGVBbmdsZSA+PSAzMTUpKSB7XG4gICAgICAgICAgICByZXR1cm4gKF8ub3B0aW9ucy5ydGwgPT09IGZhbHNlID8gJ2xlZnQnIDogJ3JpZ2h0Jyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKChzd2lwZUFuZ2xlID49IDEzNSkgJiYgKHN3aXBlQW5nbGUgPD0gMjI1KSkge1xuICAgICAgICAgICAgcmV0dXJuIChfLm9wdGlvbnMucnRsID09PSBmYWxzZSA/ICdyaWdodCcgOiAnbGVmdCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChfLm9wdGlvbnMudmVydGljYWxTd2lwaW5nID09PSB0cnVlKSB7XG4gICAgICAgICAgICBpZiAoKHN3aXBlQW5nbGUgPj0gMzUpICYmIChzd2lwZUFuZ2xlIDw9IDEzNSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2Rvd24nO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3VwJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAndmVydGljYWwnO1xuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5zd2lwZUVuZCA9IGZ1bmN0aW9uKGV2ZW50KSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzLFxuICAgICAgICAgICAgc2xpZGVDb3VudCxcbiAgICAgICAgICAgIGRpcmVjdGlvbjtcblxuICAgICAgICBfLmRyYWdnaW5nID0gZmFsc2U7XG4gICAgICAgIF8uc3dpcGluZyA9IGZhbHNlO1xuXG4gICAgICAgIGlmIChfLnNjcm9sbGluZykge1xuICAgICAgICAgICAgXy5zY3JvbGxpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIF8uaW50ZXJydXB0ZWQgPSBmYWxzZTtcbiAgICAgICAgXy5zaG91bGRDbGljayA9ICggXy50b3VjaE9iamVjdC5zd2lwZUxlbmd0aCA+IDEwICkgPyBmYWxzZSA6IHRydWU7XG5cbiAgICAgICAgaWYgKCBfLnRvdWNoT2JqZWN0LmN1clggPT09IHVuZGVmaW5lZCApIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggXy50b3VjaE9iamVjdC5lZGdlSGl0ID09PSB0cnVlICkge1xuICAgICAgICAgICAgXy4kc2xpZGVyLnRyaWdnZXIoJ2VkZ2UnLCBbXywgXy5zd2lwZURpcmVjdGlvbigpIF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCBfLnRvdWNoT2JqZWN0LnN3aXBlTGVuZ3RoID49IF8udG91Y2hPYmplY3QubWluU3dpcGUgKSB7XG5cbiAgICAgICAgICAgIGRpcmVjdGlvbiA9IF8uc3dpcGVEaXJlY3Rpb24oKTtcblxuICAgICAgICAgICAgc3dpdGNoICggZGlyZWN0aW9uICkge1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgICAgICAgICAgY2FzZSAnZG93bic6XG5cbiAgICAgICAgICAgICAgICAgICAgc2xpZGVDb3VudCA9XG4gICAgICAgICAgICAgICAgICAgICAgICBfLm9wdGlvbnMuc3dpcGVUb1NsaWRlID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfLmNoZWNrTmF2aWdhYmxlKCBfLmN1cnJlbnRTbGlkZSArIF8uZ2V0U2xpZGVDb3VudCgpICkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF8uY3VycmVudFNsaWRlICsgXy5nZXRTbGlkZUNvdW50KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgXy5jdXJyZW50RGlyZWN0aW9uID0gMDtcblxuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgICAgICAgICBjYXNlICd1cCc6XG5cbiAgICAgICAgICAgICAgICAgICAgc2xpZGVDb3VudCA9XG4gICAgICAgICAgICAgICAgICAgICAgICBfLm9wdGlvbnMuc3dpcGVUb1NsaWRlID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfLmNoZWNrTmF2aWdhYmxlKCBfLmN1cnJlbnRTbGlkZSAtIF8uZ2V0U2xpZGVDb3VudCgpICkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF8uY3VycmVudFNsaWRlIC0gXy5nZXRTbGlkZUNvdW50KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgXy5jdXJyZW50RGlyZWN0aW9uID0gMTtcblxuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG5cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiggZGlyZWN0aW9uICE9ICd2ZXJ0aWNhbCcgKSB7XG5cbiAgICAgICAgICAgICAgICBfLnNsaWRlSGFuZGxlciggc2xpZGVDb3VudCApO1xuICAgICAgICAgICAgICAgIF8udG91Y2hPYmplY3QgPSB7fTtcbiAgICAgICAgICAgICAgICBfLiRzbGlkZXIudHJpZ2dlcignc3dpcGUnLCBbXywgZGlyZWN0aW9uIF0pO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgaWYgKCBfLnRvdWNoT2JqZWN0LnN0YXJ0WCAhPT0gXy50b3VjaE9iamVjdC5jdXJYICkge1xuXG4gICAgICAgICAgICAgICAgXy5zbGlkZUhhbmRsZXIoIF8uY3VycmVudFNsaWRlICk7XG4gICAgICAgICAgICAgICAgXy50b3VjaE9iamVjdCA9IHt9O1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5zd2lwZUhhbmRsZXIgPSBmdW5jdGlvbihldmVudCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBpZiAoKF8ub3B0aW9ucy5zd2lwZSA9PT0gZmFsc2UpIHx8ICgnb250b3VjaGVuZCcgaW4gZG9jdW1lbnQgJiYgXy5vcHRpb25zLnN3aXBlID09PSBmYWxzZSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSBlbHNlIGlmIChfLm9wdGlvbnMuZHJhZ2dhYmxlID09PSBmYWxzZSAmJiBldmVudC50eXBlLmluZGV4T2YoJ21vdXNlJykgIT09IC0xKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBfLnRvdWNoT2JqZWN0LmZpbmdlckNvdW50ID0gZXZlbnQub3JpZ2luYWxFdmVudCAmJiBldmVudC5vcmlnaW5hbEV2ZW50LnRvdWNoZXMgIT09IHVuZGVmaW5lZCA/XG4gICAgICAgICAgICBldmVudC5vcmlnaW5hbEV2ZW50LnRvdWNoZXMubGVuZ3RoIDogMTtcblxuICAgICAgICBfLnRvdWNoT2JqZWN0Lm1pblN3aXBlID0gXy5saXN0V2lkdGggLyBfLm9wdGlvbnNcbiAgICAgICAgICAgIC50b3VjaFRocmVzaG9sZDtcblxuICAgICAgICBpZiAoXy5vcHRpb25zLnZlcnRpY2FsU3dpcGluZyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgXy50b3VjaE9iamVjdC5taW5Td2lwZSA9IF8ubGlzdEhlaWdodCAvIF8ub3B0aW9uc1xuICAgICAgICAgICAgICAgIC50b3VjaFRocmVzaG9sZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXRjaCAoZXZlbnQuZGF0YS5hY3Rpb24pIHtcblxuICAgICAgICAgICAgY2FzZSAnc3RhcnQnOlxuICAgICAgICAgICAgICAgIF8uc3dpcGVTdGFydChldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ21vdmUnOlxuICAgICAgICAgICAgICAgIF8uc3dpcGVNb3ZlKGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnZW5kJzpcbiAgICAgICAgICAgICAgICBfLnN3aXBlRW5kKGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLnN3aXBlTW92ZSA9IGZ1bmN0aW9uKGV2ZW50KSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzLFxuICAgICAgICAgICAgZWRnZVdhc0hpdCA9IGZhbHNlLFxuICAgICAgICAgICAgY3VyTGVmdCwgc3dpcGVEaXJlY3Rpb24sIHN3aXBlTGVuZ3RoLCBwb3NpdGlvbk9mZnNldCwgdG91Y2hlcywgdmVydGljYWxTd2lwZUxlbmd0aDtcblxuICAgICAgICB0b3VjaGVzID0gZXZlbnQub3JpZ2luYWxFdmVudCAhPT0gdW5kZWZpbmVkID8gZXZlbnQub3JpZ2luYWxFdmVudC50b3VjaGVzIDogbnVsbDtcblxuICAgICAgICBpZiAoIV8uZHJhZ2dpbmcgfHwgXy5zY3JvbGxpbmcgfHwgdG91Y2hlcyAmJiB0b3VjaGVzLmxlbmd0aCAhPT0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgY3VyTGVmdCA9IF8uZ2V0TGVmdChfLmN1cnJlbnRTbGlkZSk7XG5cbiAgICAgICAgXy50b3VjaE9iamVjdC5jdXJYID0gdG91Y2hlcyAhPT0gdW5kZWZpbmVkID8gdG91Y2hlc1swXS5wYWdlWCA6IGV2ZW50LmNsaWVudFg7XG4gICAgICAgIF8udG91Y2hPYmplY3QuY3VyWSA9IHRvdWNoZXMgIT09IHVuZGVmaW5lZCA/IHRvdWNoZXNbMF0ucGFnZVkgOiBldmVudC5jbGllbnRZO1xuXG4gICAgICAgIF8udG91Y2hPYmplY3Quc3dpcGVMZW5ndGggPSBNYXRoLnJvdW5kKE1hdGguc3FydChcbiAgICAgICAgICAgIE1hdGgucG93KF8udG91Y2hPYmplY3QuY3VyWCAtIF8udG91Y2hPYmplY3Quc3RhcnRYLCAyKSkpO1xuXG4gICAgICAgIHZlcnRpY2FsU3dpcGVMZW5ndGggPSBNYXRoLnJvdW5kKE1hdGguc3FydChcbiAgICAgICAgICAgIE1hdGgucG93KF8udG91Y2hPYmplY3QuY3VyWSAtIF8udG91Y2hPYmplY3Quc3RhcnRZLCAyKSkpO1xuXG4gICAgICAgIGlmICghXy5vcHRpb25zLnZlcnRpY2FsU3dpcGluZyAmJiAhXy5zd2lwaW5nICYmIHZlcnRpY2FsU3dpcGVMZW5ndGggPiA0KSB7XG4gICAgICAgICAgICBfLnNjcm9sbGluZyA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXy5vcHRpb25zLnZlcnRpY2FsU3dpcGluZyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgXy50b3VjaE9iamVjdC5zd2lwZUxlbmd0aCA9IHZlcnRpY2FsU3dpcGVMZW5ndGg7XG4gICAgICAgIH1cblxuICAgICAgICBzd2lwZURpcmVjdGlvbiA9IF8uc3dpcGVEaXJlY3Rpb24oKTtcblxuICAgICAgICBpZiAoZXZlbnQub3JpZ2luYWxFdmVudCAhPT0gdW5kZWZpbmVkICYmIF8udG91Y2hPYmplY3Quc3dpcGVMZW5ndGggPiA0KSB7XG4gICAgICAgICAgICBfLnN3aXBpbmcgPSB0cnVlO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHBvc2l0aW9uT2Zmc2V0ID0gKF8ub3B0aW9ucy5ydGwgPT09IGZhbHNlID8gMSA6IC0xKSAqIChfLnRvdWNoT2JqZWN0LmN1clggPiBfLnRvdWNoT2JqZWN0LnN0YXJ0WCA/IDEgOiAtMSk7XG4gICAgICAgIGlmIChfLm9wdGlvbnMudmVydGljYWxTd2lwaW5nID09PSB0cnVlKSB7XG4gICAgICAgICAgICBwb3NpdGlvbk9mZnNldCA9IF8udG91Y2hPYmplY3QuY3VyWSA+IF8udG91Y2hPYmplY3Quc3RhcnRZID8gMSA6IC0xO1xuICAgICAgICB9XG5cblxuICAgICAgICBzd2lwZUxlbmd0aCA9IF8udG91Y2hPYmplY3Quc3dpcGVMZW5ndGg7XG5cbiAgICAgICAgXy50b3VjaE9iamVjdC5lZGdlSGl0ID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5pbmZpbml0ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGlmICgoXy5jdXJyZW50U2xpZGUgPT09IDAgJiYgc3dpcGVEaXJlY3Rpb24gPT09ICdyaWdodCcpIHx8IChfLmN1cnJlbnRTbGlkZSA+PSBfLmdldERvdENvdW50KCkgJiYgc3dpcGVEaXJlY3Rpb24gPT09ICdsZWZ0JykpIHtcbiAgICAgICAgICAgICAgICBzd2lwZUxlbmd0aCA9IF8udG91Y2hPYmplY3Quc3dpcGVMZW5ndGggKiBfLm9wdGlvbnMuZWRnZUZyaWN0aW9uO1xuICAgICAgICAgICAgICAgIF8udG91Y2hPYmplY3QuZWRnZUhpdCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXy5vcHRpb25zLnZlcnRpY2FsID09PSBmYWxzZSkge1xuICAgICAgICAgICAgXy5zd2lwZUxlZnQgPSBjdXJMZWZ0ICsgc3dpcGVMZW5ndGggKiBwb3NpdGlvbk9mZnNldDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF8uc3dpcGVMZWZ0ID0gY3VyTGVmdCArIChzd2lwZUxlbmd0aCAqIChfLiRsaXN0LmhlaWdodCgpIC8gXy5saXN0V2lkdGgpKSAqIHBvc2l0aW9uT2Zmc2V0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChfLm9wdGlvbnMudmVydGljYWxTd2lwaW5nID09PSB0cnVlKSB7XG4gICAgICAgICAgICBfLnN3aXBlTGVmdCA9IGN1ckxlZnQgKyBzd2lwZUxlbmd0aCAqIHBvc2l0aW9uT2Zmc2V0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5mYWRlID09PSB0cnVlIHx8IF8ub3B0aW9ucy50b3VjaE1vdmUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXy5hbmltYXRpbmcgPT09IHRydWUpIHtcbiAgICAgICAgICAgIF8uc3dpcGVMZWZ0ID0gbnVsbDtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIF8uc2V0Q1NTKF8uc3dpcGVMZWZ0KTtcblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuc3dpcGVTdGFydCA9IGZ1bmN0aW9uKGV2ZW50KSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzLFxuICAgICAgICAgICAgdG91Y2hlcztcblxuICAgICAgICBfLmludGVycnVwdGVkID0gdHJ1ZTtcblxuICAgICAgICBpZiAoXy50b3VjaE9iamVjdC5maW5nZXJDb3VudCAhPT0gMSB8fCBfLnNsaWRlQ291bnQgPD0gXy5vcHRpb25zLnNsaWRlc1RvU2hvdykge1xuICAgICAgICAgICAgXy50b3VjaE9iamVjdCA9IHt9O1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGV2ZW50Lm9yaWdpbmFsRXZlbnQgIT09IHVuZGVmaW5lZCAmJiBldmVudC5vcmlnaW5hbEV2ZW50LnRvdWNoZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdG91Y2hlcyA9IGV2ZW50Lm9yaWdpbmFsRXZlbnQudG91Y2hlc1swXTtcbiAgICAgICAgfVxuXG4gICAgICAgIF8udG91Y2hPYmplY3Quc3RhcnRYID0gXy50b3VjaE9iamVjdC5jdXJYID0gdG91Y2hlcyAhPT0gdW5kZWZpbmVkID8gdG91Y2hlcy5wYWdlWCA6IGV2ZW50LmNsaWVudFg7XG4gICAgICAgIF8udG91Y2hPYmplY3Quc3RhcnRZID0gXy50b3VjaE9iamVjdC5jdXJZID0gdG91Y2hlcyAhPT0gdW5kZWZpbmVkID8gdG91Y2hlcy5wYWdlWSA6IGV2ZW50LmNsaWVudFk7XG5cbiAgICAgICAgXy5kcmFnZ2luZyA9IHRydWU7XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLnVuZmlsdGVyU2xpZGVzID0gU2xpY2sucHJvdG90eXBlLnNsaWNrVW5maWx0ZXIgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgaWYgKF8uJHNsaWRlc0NhY2hlICE9PSBudWxsKSB7XG5cbiAgICAgICAgICAgIF8udW5sb2FkKCk7XG5cbiAgICAgICAgICAgIF8uJHNsaWRlVHJhY2suY2hpbGRyZW4odGhpcy5vcHRpb25zLnNsaWRlKS5kZXRhY2goKTtcblxuICAgICAgICAgICAgXy4kc2xpZGVzQ2FjaGUuYXBwZW5kVG8oXy4kc2xpZGVUcmFjayk7XG5cbiAgICAgICAgICAgIF8ucmVpbml0KCk7XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS51bmxvYWQgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgJCgnLnNsaWNrLWNsb25lZCcsIF8uJHNsaWRlcikucmVtb3ZlKCk7XG5cbiAgICAgICAgaWYgKF8uJGRvdHMpIHtcbiAgICAgICAgICAgIF8uJGRvdHMucmVtb3ZlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXy4kcHJldkFycm93ICYmIF8uaHRtbEV4cHIudGVzdChfLm9wdGlvbnMucHJldkFycm93KSkge1xuICAgICAgICAgICAgXy4kcHJldkFycm93LnJlbW92ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF8uJG5leHRBcnJvdyAmJiBfLmh0bWxFeHByLnRlc3QoXy5vcHRpb25zLm5leHRBcnJvdykpIHtcbiAgICAgICAgICAgIF8uJG5leHRBcnJvdy5yZW1vdmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIF8uJHNsaWRlc1xuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdzbGljay1zbGlkZSBzbGljay1hY3RpdmUgc2xpY2stdmlzaWJsZSBzbGljay1jdXJyZW50JylcbiAgICAgICAgICAgIC5hdHRyKCdhcmlhLWhpZGRlbicsICd0cnVlJylcbiAgICAgICAgICAgIC5jc3MoJ3dpZHRoJywgJycpO1xuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS51bnNsaWNrID0gZnVuY3Rpb24oZnJvbUJyZWFrcG9pbnQpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG4gICAgICAgIF8uJHNsaWRlci50cmlnZ2VyKCd1bnNsaWNrJywgW18sIGZyb21CcmVha3BvaW50XSk7XG4gICAgICAgIF8uZGVzdHJveSgpO1xuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS51cGRhdGVBcnJvd3MgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXMsXG4gICAgICAgICAgICBjZW50ZXJPZmZzZXQ7XG5cbiAgICAgICAgY2VudGVyT2Zmc2V0ID0gTWF0aC5mbG9vcihfLm9wdGlvbnMuc2xpZGVzVG9TaG93IC8gMik7XG5cbiAgICAgICAgaWYgKCBfLm9wdGlvbnMuYXJyb3dzID09PSB0cnVlICYmXG4gICAgICAgICAgICBfLnNsaWRlQ291bnQgPiBfLm9wdGlvbnMuc2xpZGVzVG9TaG93ICYmXG4gICAgICAgICAgICAhXy5vcHRpb25zLmluZmluaXRlICkge1xuXG4gICAgICAgICAgICBfLiRwcmV2QXJyb3cucmVtb3ZlQ2xhc3MoJ3NsaWNrLWRpc2FibGVkJykuYXR0cignYXJpYS1kaXNhYmxlZCcsICdmYWxzZScpO1xuICAgICAgICAgICAgXy4kbmV4dEFycm93LnJlbW92ZUNsYXNzKCdzbGljay1kaXNhYmxlZCcpLmF0dHIoJ2FyaWEtZGlzYWJsZWQnLCAnZmFsc2UnKTtcblxuICAgICAgICAgICAgaWYgKF8uY3VycmVudFNsaWRlID09PSAwKSB7XG5cbiAgICAgICAgICAgICAgICBfLiRwcmV2QXJyb3cuYWRkQ2xhc3MoJ3NsaWNrLWRpc2FibGVkJykuYXR0cignYXJpYS1kaXNhYmxlZCcsICd0cnVlJyk7XG4gICAgICAgICAgICAgICAgXy4kbmV4dEFycm93LnJlbW92ZUNsYXNzKCdzbGljay1kaXNhYmxlZCcpLmF0dHIoJ2FyaWEtZGlzYWJsZWQnLCAnZmFsc2UnKTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmIChfLmN1cnJlbnRTbGlkZSA+PSBfLnNsaWRlQ291bnQgLSBfLm9wdGlvbnMuc2xpZGVzVG9TaG93ICYmIF8ub3B0aW9ucy5jZW50ZXJNb2RlID09PSBmYWxzZSkge1xuXG4gICAgICAgICAgICAgICAgXy4kbmV4dEFycm93LmFkZENsYXNzKCdzbGljay1kaXNhYmxlZCcpLmF0dHIoJ2FyaWEtZGlzYWJsZWQnLCAndHJ1ZScpO1xuICAgICAgICAgICAgICAgIF8uJHByZXZBcnJvdy5yZW1vdmVDbGFzcygnc2xpY2stZGlzYWJsZWQnKS5hdHRyKCdhcmlhLWRpc2FibGVkJywgJ2ZhbHNlJyk7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoXy5jdXJyZW50U2xpZGUgPj0gXy5zbGlkZUNvdW50IC0gMSAmJiBfLm9wdGlvbnMuY2VudGVyTW9kZSA9PT0gdHJ1ZSkge1xuXG4gICAgICAgICAgICAgICAgXy4kbmV4dEFycm93LmFkZENsYXNzKCdzbGljay1kaXNhYmxlZCcpLmF0dHIoJ2FyaWEtZGlzYWJsZWQnLCAndHJ1ZScpO1xuICAgICAgICAgICAgICAgIF8uJHByZXZBcnJvdy5yZW1vdmVDbGFzcygnc2xpY2stZGlzYWJsZWQnKS5hdHRyKCdhcmlhLWRpc2FibGVkJywgJ2ZhbHNlJyk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLnVwZGF0ZURvdHMgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgaWYgKF8uJGRvdHMgIT09IG51bGwpIHtcblxuICAgICAgICAgICAgXy4kZG90c1xuICAgICAgICAgICAgICAgIC5maW5kKCdsaScpXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnc2xpY2stYWN0aXZlJylcbiAgICAgICAgICAgICAgICAgICAgLmVuZCgpO1xuXG4gICAgICAgICAgICBfLiRkb3RzXG4gICAgICAgICAgICAgICAgLmZpbmQoJ2xpJylcbiAgICAgICAgICAgICAgICAuZXEoTWF0aC5mbG9vcihfLmN1cnJlbnRTbGlkZSAvIF8ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbCkpXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKCdzbGljay1hY3RpdmUnKTtcblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLnZpc2liaWxpdHkgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgaWYgKCBfLm9wdGlvbnMuYXV0b3BsYXkgKSB7XG5cbiAgICAgICAgICAgIGlmICggZG9jdW1lbnRbXy5oaWRkZW5dICkge1xuXG4gICAgICAgICAgICAgICAgXy5pbnRlcnJ1cHRlZCA9IHRydWU7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICBfLmludGVycnVwdGVkID0gZmFsc2U7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgJC5mbi5zbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgXyA9IHRoaXMsXG4gICAgICAgICAgICBvcHQgPSBhcmd1bWVudHNbMF0sXG4gICAgICAgICAgICBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSxcbiAgICAgICAgICAgIGwgPSBfLmxlbmd0aCxcbiAgICAgICAgICAgIGksXG4gICAgICAgICAgICByZXQ7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0ID09ICdvYmplY3QnIHx8IHR5cGVvZiBvcHQgPT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgICAgICAgICAgX1tpXS5zbGljayA9IG5ldyBTbGljayhfW2ldLCBvcHQpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJldCA9IF9baV0uc2xpY2tbb3B0XS5hcHBseShfW2ldLnNsaWNrLCBhcmdzKTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcmV0ICE9ICd1bmRlZmluZWQnKSByZXR1cm4gcmV0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBfO1xuICAgIH07XG5cbn0pKTtcbiIsIiFmdW5jdGlvbihpKXtcInVzZSBzdHJpY3RcIjtcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKFtcImpxdWVyeVwiXSxpKTpcInVuZGVmaW5lZFwiIT10eXBlb2YgZXhwb3J0cz9tb2R1bGUuZXhwb3J0cz1pKHJlcXVpcmUoXCJqcXVlcnlcIikpOmkoalF1ZXJ5KX0oZnVuY3Rpb24oaSl7XCJ1c2Ugc3RyaWN0XCI7dmFyIGU9d2luZG93LlNsaWNrfHx7fTsoZT1mdW5jdGlvbigpe3ZhciBlPTA7cmV0dXJuIGZ1bmN0aW9uKHQsbyl7dmFyIHMsbj10aGlzO24uZGVmYXVsdHM9e2FjY2Vzc2liaWxpdHk6ITAsYWRhcHRpdmVIZWlnaHQ6ITEsYXBwZW5kQXJyb3dzOmkodCksYXBwZW5kRG90czppKHQpLGFycm93czohMCxhc05hdkZvcjpudWxsLHByZXZBcnJvdzonPGJ1dHRvbiBjbGFzcz1cInNsaWNrLXByZXZcIiBhcmlhLWxhYmVsPVwiUHJldmlvdXNcIiB0eXBlPVwiYnV0dG9uXCI+UHJldmlvdXM8L2J1dHRvbj4nLG5leHRBcnJvdzonPGJ1dHRvbiBjbGFzcz1cInNsaWNrLW5leHRcIiBhcmlhLWxhYmVsPVwiTmV4dFwiIHR5cGU9XCJidXR0b25cIj5OZXh0PC9idXR0b24+JyxhdXRvcGxheTohMSxhdXRvcGxheVNwZWVkOjNlMyxjZW50ZXJNb2RlOiExLGNlbnRlclBhZGRpbmc6XCI1MHB4XCIsY3NzRWFzZTpcImVhc2VcIixjdXN0b21QYWdpbmc6ZnVuY3Rpb24oZSx0KXtyZXR1cm4gaSgnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgLz4nKS50ZXh0KHQrMSl9LGRvdHM6ITEsZG90c0NsYXNzOlwic2xpY2stZG90c1wiLGRyYWdnYWJsZTohMCxlYXNpbmc6XCJsaW5lYXJcIixlZGdlRnJpY3Rpb246LjM1LGZhZGU6ITEsZm9jdXNPblNlbGVjdDohMSxmb2N1c09uQ2hhbmdlOiExLGluZmluaXRlOiEwLGluaXRpYWxTbGlkZTowLGxhenlMb2FkOlwib25kZW1hbmRcIixtb2JpbGVGaXJzdDohMSxwYXVzZU9uSG92ZXI6ITAscGF1c2VPbkZvY3VzOiEwLHBhdXNlT25Eb3RzSG92ZXI6ITEscmVzcG9uZFRvOlwid2luZG93XCIscmVzcG9uc2l2ZTpudWxsLHJvd3M6MSxydGw6ITEsc2xpZGU6XCJcIixzbGlkZXNQZXJSb3c6MSxzbGlkZXNUb1Nob3c6MSxzbGlkZXNUb1Njcm9sbDoxLHNwZWVkOjUwMCxzd2lwZTohMCxzd2lwZVRvU2xpZGU6ITEsdG91Y2hNb3ZlOiEwLHRvdWNoVGhyZXNob2xkOjUsdXNlQ1NTOiEwLHVzZVRyYW5zZm9ybTohMCx2YXJpYWJsZVdpZHRoOiExLHZlcnRpY2FsOiExLHZlcnRpY2FsU3dpcGluZzohMSx3YWl0Rm9yQW5pbWF0ZTohMCx6SW5kZXg6MWUzfSxuLmluaXRpYWxzPXthbmltYXRpbmc6ITEsZHJhZ2dpbmc6ITEsYXV0b1BsYXlUaW1lcjpudWxsLGN1cnJlbnREaXJlY3Rpb246MCxjdXJyZW50TGVmdDpudWxsLGN1cnJlbnRTbGlkZTowLGRpcmVjdGlvbjoxLCRkb3RzOm51bGwsbGlzdFdpZHRoOm51bGwsbGlzdEhlaWdodDpudWxsLGxvYWRJbmRleDowLCRuZXh0QXJyb3c6bnVsbCwkcHJldkFycm93Om51bGwsc2Nyb2xsaW5nOiExLHNsaWRlQ291bnQ6bnVsbCxzbGlkZVdpZHRoOm51bGwsJHNsaWRlVHJhY2s6bnVsbCwkc2xpZGVzOm51bGwsc2xpZGluZzohMSxzbGlkZU9mZnNldDowLHN3aXBlTGVmdDpudWxsLHN3aXBpbmc6ITEsJGxpc3Q6bnVsbCx0b3VjaE9iamVjdDp7fSx0cmFuc2Zvcm1zRW5hYmxlZDohMSx1bnNsaWNrZWQ6ITF9LGkuZXh0ZW5kKG4sbi5pbml0aWFscyksbi5hY3RpdmVCcmVha3BvaW50PW51bGwsbi5hbmltVHlwZT1udWxsLG4uYW5pbVByb3A9bnVsbCxuLmJyZWFrcG9pbnRzPVtdLG4uYnJlYWtwb2ludFNldHRpbmdzPVtdLG4uY3NzVHJhbnNpdGlvbnM9ITEsbi5mb2N1c3NlZD0hMSxuLmludGVycnVwdGVkPSExLG4uaGlkZGVuPVwiaGlkZGVuXCIsbi5wYXVzZWQ9ITAsbi5wb3NpdGlvblByb3A9bnVsbCxuLnJlc3BvbmRUbz1udWxsLG4ucm93Q291bnQ9MSxuLnNob3VsZENsaWNrPSEwLG4uJHNsaWRlcj1pKHQpLG4uJHNsaWRlc0NhY2hlPW51bGwsbi50cmFuc2Zvcm1UeXBlPW51bGwsbi50cmFuc2l0aW9uVHlwZT1udWxsLG4udmlzaWJpbGl0eUNoYW5nZT1cInZpc2liaWxpdHljaGFuZ2VcIixuLndpbmRvd1dpZHRoPTAsbi53aW5kb3dUaW1lcj1udWxsLHM9aSh0KS5kYXRhKFwic2xpY2tcIil8fHt9LG4ub3B0aW9ucz1pLmV4dGVuZCh7fSxuLmRlZmF1bHRzLG8scyksbi5jdXJyZW50U2xpZGU9bi5vcHRpb25zLmluaXRpYWxTbGlkZSxuLm9yaWdpbmFsU2V0dGluZ3M9bi5vcHRpb25zLHZvaWQgMCE9PWRvY3VtZW50Lm1vekhpZGRlbj8obi5oaWRkZW49XCJtb3pIaWRkZW5cIixuLnZpc2liaWxpdHlDaGFuZ2U9XCJtb3p2aXNpYmlsaXR5Y2hhbmdlXCIpOnZvaWQgMCE9PWRvY3VtZW50LndlYmtpdEhpZGRlbiYmKG4uaGlkZGVuPVwid2Via2l0SGlkZGVuXCIsbi52aXNpYmlsaXR5Q2hhbmdlPVwid2Via2l0dmlzaWJpbGl0eWNoYW5nZVwiKSxuLmF1dG9QbGF5PWkucHJveHkobi5hdXRvUGxheSxuKSxuLmF1dG9QbGF5Q2xlYXI9aS5wcm94eShuLmF1dG9QbGF5Q2xlYXIsbiksbi5hdXRvUGxheUl0ZXJhdG9yPWkucHJveHkobi5hdXRvUGxheUl0ZXJhdG9yLG4pLG4uY2hhbmdlU2xpZGU9aS5wcm94eShuLmNoYW5nZVNsaWRlLG4pLG4uY2xpY2tIYW5kbGVyPWkucHJveHkobi5jbGlja0hhbmRsZXIsbiksbi5zZWxlY3RIYW5kbGVyPWkucHJveHkobi5zZWxlY3RIYW5kbGVyLG4pLG4uc2V0UG9zaXRpb249aS5wcm94eShuLnNldFBvc2l0aW9uLG4pLG4uc3dpcGVIYW5kbGVyPWkucHJveHkobi5zd2lwZUhhbmRsZXIsbiksbi5kcmFnSGFuZGxlcj1pLnByb3h5KG4uZHJhZ0hhbmRsZXIsbiksbi5rZXlIYW5kbGVyPWkucHJveHkobi5rZXlIYW5kbGVyLG4pLG4uaW5zdGFuY2VVaWQ9ZSsrLG4uaHRtbEV4cHI9L14oPzpcXHMqKDxbXFx3XFxXXSs+KVtePl0qKSQvLG4ucmVnaXN0ZXJCcmVha3BvaW50cygpLG4uaW5pdCghMCl9fSgpKS5wcm90b3R5cGUuYWN0aXZhdGVBREE9ZnVuY3Rpb24oKXt0aGlzLiRzbGlkZVRyYWNrLmZpbmQoXCIuc2xpY2stYWN0aXZlXCIpLmF0dHIoe1wiYXJpYS1oaWRkZW5cIjpcImZhbHNlXCJ9KS5maW5kKFwiYSwgaW5wdXQsIGJ1dHRvbiwgc2VsZWN0XCIpLmF0dHIoe3RhYmluZGV4OlwiMFwifSl9LGUucHJvdG90eXBlLmFkZFNsaWRlPWUucHJvdG90eXBlLnNsaWNrQWRkPWZ1bmN0aW9uKGUsdCxvKXt2YXIgcz10aGlzO2lmKFwiYm9vbGVhblwiPT10eXBlb2YgdClvPXQsdD1udWxsO2Vsc2UgaWYodDwwfHx0Pj1zLnNsaWRlQ291bnQpcmV0dXJuITE7cy51bmxvYWQoKSxcIm51bWJlclwiPT10eXBlb2YgdD8wPT09dCYmMD09PXMuJHNsaWRlcy5sZW5ndGg/aShlKS5hcHBlbmRUbyhzLiRzbGlkZVRyYWNrKTpvP2koZSkuaW5zZXJ0QmVmb3JlKHMuJHNsaWRlcy5lcSh0KSk6aShlKS5pbnNlcnRBZnRlcihzLiRzbGlkZXMuZXEodCkpOiEwPT09bz9pKGUpLnByZXBlbmRUbyhzLiRzbGlkZVRyYWNrKTppKGUpLmFwcGVuZFRvKHMuJHNsaWRlVHJhY2spLHMuJHNsaWRlcz1zLiRzbGlkZVRyYWNrLmNoaWxkcmVuKHRoaXMub3B0aW9ucy5zbGlkZSkscy4kc2xpZGVUcmFjay5jaGlsZHJlbih0aGlzLm9wdGlvbnMuc2xpZGUpLmRldGFjaCgpLHMuJHNsaWRlVHJhY2suYXBwZW5kKHMuJHNsaWRlcykscy4kc2xpZGVzLmVhY2goZnVuY3Rpb24oZSx0KXtpKHQpLmF0dHIoXCJkYXRhLXNsaWNrLWluZGV4XCIsZSl9KSxzLiRzbGlkZXNDYWNoZT1zLiRzbGlkZXMscy5yZWluaXQoKX0sZS5wcm90b3R5cGUuYW5pbWF0ZUhlaWdodD1mdW5jdGlvbigpe3ZhciBpPXRoaXM7aWYoMT09PWkub3B0aW9ucy5zbGlkZXNUb1Nob3cmJiEwPT09aS5vcHRpb25zLmFkYXB0aXZlSGVpZ2h0JiYhMT09PWkub3B0aW9ucy52ZXJ0aWNhbCl7dmFyIGU9aS4kc2xpZGVzLmVxKGkuY3VycmVudFNsaWRlKS5vdXRlckhlaWdodCghMCk7aS4kbGlzdC5hbmltYXRlKHtoZWlnaHQ6ZX0saS5vcHRpb25zLnNwZWVkKX19LGUucHJvdG90eXBlLmFuaW1hdGVTbGlkZT1mdW5jdGlvbihlLHQpe3ZhciBvPXt9LHM9dGhpcztzLmFuaW1hdGVIZWlnaHQoKSwhMD09PXMub3B0aW9ucy5ydGwmJiExPT09cy5vcHRpb25zLnZlcnRpY2FsJiYoZT0tZSksITE9PT1zLnRyYW5zZm9ybXNFbmFibGVkPyExPT09cy5vcHRpb25zLnZlcnRpY2FsP3MuJHNsaWRlVHJhY2suYW5pbWF0ZSh7bGVmdDplfSxzLm9wdGlvbnMuc3BlZWQscy5vcHRpb25zLmVhc2luZyx0KTpzLiRzbGlkZVRyYWNrLmFuaW1hdGUoe3RvcDplfSxzLm9wdGlvbnMuc3BlZWQscy5vcHRpb25zLmVhc2luZyx0KTohMT09PXMuY3NzVHJhbnNpdGlvbnM/KCEwPT09cy5vcHRpb25zLnJ0bCYmKHMuY3VycmVudExlZnQ9LXMuY3VycmVudExlZnQpLGkoe2FuaW1TdGFydDpzLmN1cnJlbnRMZWZ0fSkuYW5pbWF0ZSh7YW5pbVN0YXJ0OmV9LHtkdXJhdGlvbjpzLm9wdGlvbnMuc3BlZWQsZWFzaW5nOnMub3B0aW9ucy5lYXNpbmcsc3RlcDpmdW5jdGlvbihpKXtpPU1hdGguY2VpbChpKSwhMT09PXMub3B0aW9ucy52ZXJ0aWNhbD8ob1tzLmFuaW1UeXBlXT1cInRyYW5zbGF0ZShcIitpK1wicHgsIDBweClcIixzLiRzbGlkZVRyYWNrLmNzcyhvKSk6KG9bcy5hbmltVHlwZV09XCJ0cmFuc2xhdGUoMHB4LFwiK2krXCJweClcIixzLiRzbGlkZVRyYWNrLmNzcyhvKSl9LGNvbXBsZXRlOmZ1bmN0aW9uKCl7dCYmdC5jYWxsKCl9fSkpOihzLmFwcGx5VHJhbnNpdGlvbigpLGU9TWF0aC5jZWlsKGUpLCExPT09cy5vcHRpb25zLnZlcnRpY2FsP29bcy5hbmltVHlwZV09XCJ0cmFuc2xhdGUzZChcIitlK1wicHgsIDBweCwgMHB4KVwiOm9bcy5hbmltVHlwZV09XCJ0cmFuc2xhdGUzZCgwcHgsXCIrZStcInB4LCAwcHgpXCIscy4kc2xpZGVUcmFjay5jc3MobyksdCYmc2V0VGltZW91dChmdW5jdGlvbigpe3MuZGlzYWJsZVRyYW5zaXRpb24oKSx0LmNhbGwoKX0scy5vcHRpb25zLnNwZWVkKSl9LGUucHJvdG90eXBlLmdldE5hdlRhcmdldD1mdW5jdGlvbigpe3ZhciBlPXRoaXMsdD1lLm9wdGlvbnMuYXNOYXZGb3I7cmV0dXJuIHQmJm51bGwhPT10JiYodD1pKHQpLm5vdChlLiRzbGlkZXIpKSx0fSxlLnByb3RvdHlwZS5hc05hdkZvcj1mdW5jdGlvbihlKXt2YXIgdD10aGlzLmdldE5hdlRhcmdldCgpO251bGwhPT10JiZcIm9iamVjdFwiPT10eXBlb2YgdCYmdC5lYWNoKGZ1bmN0aW9uKCl7dmFyIHQ9aSh0aGlzKS5zbGljayhcImdldFNsaWNrXCIpO3QudW5zbGlja2VkfHx0LnNsaWRlSGFuZGxlcihlLCEwKX0pfSxlLnByb3RvdHlwZS5hcHBseVRyYW5zaXRpb249ZnVuY3Rpb24oaSl7dmFyIGU9dGhpcyx0PXt9OyExPT09ZS5vcHRpb25zLmZhZGU/dFtlLnRyYW5zaXRpb25UeXBlXT1lLnRyYW5zZm9ybVR5cGUrXCIgXCIrZS5vcHRpb25zLnNwZWVkK1wibXMgXCIrZS5vcHRpb25zLmNzc0Vhc2U6dFtlLnRyYW5zaXRpb25UeXBlXT1cIm9wYWNpdHkgXCIrZS5vcHRpb25zLnNwZWVkK1wibXMgXCIrZS5vcHRpb25zLmNzc0Vhc2UsITE9PT1lLm9wdGlvbnMuZmFkZT9lLiRzbGlkZVRyYWNrLmNzcyh0KTplLiRzbGlkZXMuZXEoaSkuY3NzKHQpfSxlLnByb3RvdHlwZS5hdXRvUGxheT1mdW5jdGlvbigpe3ZhciBpPXRoaXM7aS5hdXRvUGxheUNsZWFyKCksaS5zbGlkZUNvdW50Pmkub3B0aW9ucy5zbGlkZXNUb1Nob3cmJihpLmF1dG9QbGF5VGltZXI9c2V0SW50ZXJ2YWwoaS5hdXRvUGxheUl0ZXJhdG9yLGkub3B0aW9ucy5hdXRvcGxheVNwZWVkKSl9LGUucHJvdG90eXBlLmF1dG9QbGF5Q2xlYXI9ZnVuY3Rpb24oKXt2YXIgaT10aGlzO2kuYXV0b1BsYXlUaW1lciYmY2xlYXJJbnRlcnZhbChpLmF1dG9QbGF5VGltZXIpfSxlLnByb3RvdHlwZS5hdXRvUGxheUl0ZXJhdG9yPWZ1bmN0aW9uKCl7dmFyIGk9dGhpcyxlPWkuY3VycmVudFNsaWRlK2kub3B0aW9ucy5zbGlkZXNUb1Njcm9sbDtpLnBhdXNlZHx8aS5pbnRlcnJ1cHRlZHx8aS5mb2N1c3NlZHx8KCExPT09aS5vcHRpb25zLmluZmluaXRlJiYoMT09PWkuZGlyZWN0aW9uJiZpLmN1cnJlbnRTbGlkZSsxPT09aS5zbGlkZUNvdW50LTE/aS5kaXJlY3Rpb249MDowPT09aS5kaXJlY3Rpb24mJihlPWkuY3VycmVudFNsaWRlLWkub3B0aW9ucy5zbGlkZXNUb1Njcm9sbCxpLmN1cnJlbnRTbGlkZS0xPT0wJiYoaS5kaXJlY3Rpb249MSkpKSxpLnNsaWRlSGFuZGxlcihlKSl9LGUucHJvdG90eXBlLmJ1aWxkQXJyb3dzPWZ1bmN0aW9uKCl7dmFyIGU9dGhpczshMD09PWUub3B0aW9ucy5hcnJvd3MmJihlLiRwcmV2QXJyb3c9aShlLm9wdGlvbnMucHJldkFycm93KS5hZGRDbGFzcyhcInNsaWNrLWFycm93XCIpLGUuJG5leHRBcnJvdz1pKGUub3B0aW9ucy5uZXh0QXJyb3cpLmFkZENsYXNzKFwic2xpY2stYXJyb3dcIiksZS5zbGlkZUNvdW50PmUub3B0aW9ucy5zbGlkZXNUb1Nob3c/KGUuJHByZXZBcnJvdy5yZW1vdmVDbGFzcyhcInNsaWNrLWhpZGRlblwiKS5yZW1vdmVBdHRyKFwiYXJpYS1oaWRkZW4gdGFiaW5kZXhcIiksZS4kbmV4dEFycm93LnJlbW92ZUNsYXNzKFwic2xpY2staGlkZGVuXCIpLnJlbW92ZUF0dHIoXCJhcmlhLWhpZGRlbiB0YWJpbmRleFwiKSxlLmh0bWxFeHByLnRlc3QoZS5vcHRpb25zLnByZXZBcnJvdykmJmUuJHByZXZBcnJvdy5wcmVwZW5kVG8oZS5vcHRpb25zLmFwcGVuZEFycm93cyksZS5odG1sRXhwci50ZXN0KGUub3B0aW9ucy5uZXh0QXJyb3cpJiZlLiRuZXh0QXJyb3cuYXBwZW5kVG8oZS5vcHRpb25zLmFwcGVuZEFycm93cyksITAhPT1lLm9wdGlvbnMuaW5maW5pdGUmJmUuJHByZXZBcnJvdy5hZGRDbGFzcyhcInNsaWNrLWRpc2FibGVkXCIpLmF0dHIoXCJhcmlhLWRpc2FibGVkXCIsXCJ0cnVlXCIpKTplLiRwcmV2QXJyb3cuYWRkKGUuJG5leHRBcnJvdykuYWRkQ2xhc3MoXCJzbGljay1oaWRkZW5cIikuYXR0cih7XCJhcmlhLWRpc2FibGVkXCI6XCJ0cnVlXCIsdGFiaW5kZXg6XCItMVwifSkpfSxlLnByb3RvdHlwZS5idWlsZERvdHM9ZnVuY3Rpb24oKXt2YXIgZSx0LG89dGhpcztpZighMD09PW8ub3B0aW9ucy5kb3RzKXtmb3Ioby4kc2xpZGVyLmFkZENsYXNzKFwic2xpY2stZG90dGVkXCIpLHQ9aShcIjx1bCAvPlwiKS5hZGRDbGFzcyhvLm9wdGlvbnMuZG90c0NsYXNzKSxlPTA7ZTw9by5nZXREb3RDb3VudCgpO2UrPTEpdC5hcHBlbmQoaShcIjxsaSAvPlwiKS5hcHBlbmQoby5vcHRpb25zLmN1c3RvbVBhZ2luZy5jYWxsKHRoaXMsbyxlKSkpO28uJGRvdHM9dC5hcHBlbmRUbyhvLm9wdGlvbnMuYXBwZW5kRG90cyksby4kZG90cy5maW5kKFwibGlcIikuZmlyc3QoKS5hZGRDbGFzcyhcInNsaWNrLWFjdGl2ZVwiKX19LGUucHJvdG90eXBlLmJ1aWxkT3V0PWZ1bmN0aW9uKCl7dmFyIGU9dGhpcztlLiRzbGlkZXM9ZS4kc2xpZGVyLmNoaWxkcmVuKGUub3B0aW9ucy5zbGlkZStcIjpub3QoLnNsaWNrLWNsb25lZClcIikuYWRkQ2xhc3MoXCJzbGljay1zbGlkZVwiKSxlLnNsaWRlQ291bnQ9ZS4kc2xpZGVzLmxlbmd0aCxlLiRzbGlkZXMuZWFjaChmdW5jdGlvbihlLHQpe2kodCkuYXR0cihcImRhdGEtc2xpY2staW5kZXhcIixlKS5kYXRhKFwib3JpZ2luYWxTdHlsaW5nXCIsaSh0KS5hdHRyKFwic3R5bGVcIil8fFwiXCIpfSksZS4kc2xpZGVyLmFkZENsYXNzKFwic2xpY2stc2xpZGVyXCIpLGUuJHNsaWRlVHJhY2s9MD09PWUuc2xpZGVDb3VudD9pKCc8ZGl2IGNsYXNzPVwic2xpY2stdHJhY2tcIi8+JykuYXBwZW5kVG8oZS4kc2xpZGVyKTplLiRzbGlkZXMud3JhcEFsbCgnPGRpdiBjbGFzcz1cInNsaWNrLXRyYWNrXCIvPicpLnBhcmVudCgpLGUuJGxpc3Q9ZS4kc2xpZGVUcmFjay53cmFwKCc8ZGl2IGNsYXNzPVwic2xpY2stbGlzdFwiLz4nKS5wYXJlbnQoKSxlLiRzbGlkZVRyYWNrLmNzcyhcIm9wYWNpdHlcIiwwKSwhMCE9PWUub3B0aW9ucy5jZW50ZXJNb2RlJiYhMCE9PWUub3B0aW9ucy5zd2lwZVRvU2xpZGV8fChlLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGw9MSksaShcImltZ1tkYXRhLWxhenldXCIsZS4kc2xpZGVyKS5ub3QoXCJbc3JjXVwiKS5hZGRDbGFzcyhcInNsaWNrLWxvYWRpbmdcIiksZS5zZXR1cEluZmluaXRlKCksZS5idWlsZEFycm93cygpLGUuYnVpbGREb3RzKCksZS51cGRhdGVEb3RzKCksZS5zZXRTbGlkZUNsYXNzZXMoXCJudW1iZXJcIj09dHlwZW9mIGUuY3VycmVudFNsaWRlP2UuY3VycmVudFNsaWRlOjApLCEwPT09ZS5vcHRpb25zLmRyYWdnYWJsZSYmZS4kbGlzdC5hZGRDbGFzcyhcImRyYWdnYWJsZVwiKX0sZS5wcm90b3R5cGUuYnVpbGRSb3dzPWZ1bmN0aW9uKCl7dmFyIGksZSx0LG8scyxuLHIsbD10aGlzO2lmKG89ZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpLG49bC4kc2xpZGVyLmNoaWxkcmVuKCksbC5vcHRpb25zLnJvd3M+MSl7Zm9yKHI9bC5vcHRpb25zLnNsaWRlc1BlclJvdypsLm9wdGlvbnMucm93cyxzPU1hdGguY2VpbChuLmxlbmd0aC9yKSxpPTA7aTxzO2krKyl7dmFyIGQ9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtmb3IoZT0wO2U8bC5vcHRpb25zLnJvd3M7ZSsrKXt2YXIgYT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO2Zvcih0PTA7dDxsLm9wdGlvbnMuc2xpZGVzUGVyUm93O3QrKyl7dmFyIGM9aSpyKyhlKmwub3B0aW9ucy5zbGlkZXNQZXJSb3crdCk7bi5nZXQoYykmJmEuYXBwZW5kQ2hpbGQobi5nZXQoYykpfWQuYXBwZW5kQ2hpbGQoYSl9by5hcHBlbmRDaGlsZChkKX1sLiRzbGlkZXIuZW1wdHkoKS5hcHBlbmQobyksbC4kc2xpZGVyLmNoaWxkcmVuKCkuY2hpbGRyZW4oKS5jaGlsZHJlbigpLmNzcyh7d2lkdGg6MTAwL2wub3B0aW9ucy5zbGlkZXNQZXJSb3crXCIlXCIsZGlzcGxheTpcImlubGluZS1ibG9ja1wifSl9fSxlLnByb3RvdHlwZS5jaGVja1Jlc3BvbnNpdmU9ZnVuY3Rpb24oZSx0KXt2YXIgbyxzLG4scj10aGlzLGw9ITEsZD1yLiRzbGlkZXIud2lkdGgoKSxhPXdpbmRvdy5pbm5lcldpZHRofHxpKHdpbmRvdykud2lkdGgoKTtpZihcIndpbmRvd1wiPT09ci5yZXNwb25kVG8/bj1hOlwic2xpZGVyXCI9PT1yLnJlc3BvbmRUbz9uPWQ6XCJtaW5cIj09PXIucmVzcG9uZFRvJiYobj1NYXRoLm1pbihhLGQpKSxyLm9wdGlvbnMucmVzcG9uc2l2ZSYmci5vcHRpb25zLnJlc3BvbnNpdmUubGVuZ3RoJiZudWxsIT09ci5vcHRpb25zLnJlc3BvbnNpdmUpe3M9bnVsbDtmb3IobyBpbiByLmJyZWFrcG9pbnRzKXIuYnJlYWtwb2ludHMuaGFzT3duUHJvcGVydHkobykmJighMT09PXIub3JpZ2luYWxTZXR0aW5ncy5tb2JpbGVGaXJzdD9uPHIuYnJlYWtwb2ludHNbb10mJihzPXIuYnJlYWtwb2ludHNbb10pOm4+ci5icmVha3BvaW50c1tvXSYmKHM9ci5icmVha3BvaW50c1tvXSkpO251bGwhPT1zP251bGwhPT1yLmFjdGl2ZUJyZWFrcG9pbnQ/KHMhPT1yLmFjdGl2ZUJyZWFrcG9pbnR8fHQpJiYoci5hY3RpdmVCcmVha3BvaW50PXMsXCJ1bnNsaWNrXCI9PT1yLmJyZWFrcG9pbnRTZXR0aW5nc1tzXT9yLnVuc2xpY2socyk6KHIub3B0aW9ucz1pLmV4dGVuZCh7fSxyLm9yaWdpbmFsU2V0dGluZ3Msci5icmVha3BvaW50U2V0dGluZ3Nbc10pLCEwPT09ZSYmKHIuY3VycmVudFNsaWRlPXIub3B0aW9ucy5pbml0aWFsU2xpZGUpLHIucmVmcmVzaChlKSksbD1zKTooci5hY3RpdmVCcmVha3BvaW50PXMsXCJ1bnNsaWNrXCI9PT1yLmJyZWFrcG9pbnRTZXR0aW5nc1tzXT9yLnVuc2xpY2socyk6KHIub3B0aW9ucz1pLmV4dGVuZCh7fSxyLm9yaWdpbmFsU2V0dGluZ3Msci5icmVha3BvaW50U2V0dGluZ3Nbc10pLCEwPT09ZSYmKHIuY3VycmVudFNsaWRlPXIub3B0aW9ucy5pbml0aWFsU2xpZGUpLHIucmVmcmVzaChlKSksbD1zKTpudWxsIT09ci5hY3RpdmVCcmVha3BvaW50JiYoci5hY3RpdmVCcmVha3BvaW50PW51bGwsci5vcHRpb25zPXIub3JpZ2luYWxTZXR0aW5ncywhMD09PWUmJihyLmN1cnJlbnRTbGlkZT1yLm9wdGlvbnMuaW5pdGlhbFNsaWRlKSxyLnJlZnJlc2goZSksbD1zKSxlfHwhMT09PWx8fHIuJHNsaWRlci50cmlnZ2VyKFwiYnJlYWtwb2ludFwiLFtyLGxdKX19LGUucHJvdG90eXBlLmNoYW5nZVNsaWRlPWZ1bmN0aW9uKGUsdCl7dmFyIG8scyxuLHI9dGhpcyxsPWkoZS5jdXJyZW50VGFyZ2V0KTtzd2l0Y2gobC5pcyhcImFcIikmJmUucHJldmVudERlZmF1bHQoKSxsLmlzKFwibGlcIil8fChsPWwuY2xvc2VzdChcImxpXCIpKSxuPXIuc2xpZGVDb3VudCVyLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGwhPTAsbz1uPzA6KHIuc2xpZGVDb3VudC1yLmN1cnJlbnRTbGlkZSklci5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsLGUuZGF0YS5tZXNzYWdlKXtjYXNlXCJwcmV2aW91c1wiOnM9MD09PW8/ci5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsOnIub3B0aW9ucy5zbGlkZXNUb1Nob3ctbyxyLnNsaWRlQ291bnQ+ci5vcHRpb25zLnNsaWRlc1RvU2hvdyYmci5zbGlkZUhhbmRsZXIoci5jdXJyZW50U2xpZGUtcywhMSx0KTticmVhaztjYXNlXCJuZXh0XCI6cz0wPT09bz9yLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGw6byxyLnNsaWRlQ291bnQ+ci5vcHRpb25zLnNsaWRlc1RvU2hvdyYmci5zbGlkZUhhbmRsZXIoci5jdXJyZW50U2xpZGUrcywhMSx0KTticmVhaztjYXNlXCJpbmRleFwiOnZhciBkPTA9PT1lLmRhdGEuaW5kZXg/MDplLmRhdGEuaW5kZXh8fGwuaW5kZXgoKSpyLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGw7ci5zbGlkZUhhbmRsZXIoci5jaGVja05hdmlnYWJsZShkKSwhMSx0KSxsLmNoaWxkcmVuKCkudHJpZ2dlcihcImZvY3VzXCIpO2JyZWFrO2RlZmF1bHQ6cmV0dXJufX0sZS5wcm90b3R5cGUuY2hlY2tOYXZpZ2FibGU9ZnVuY3Rpb24oaSl7dmFyIGUsdDtpZihlPXRoaXMuZ2V0TmF2aWdhYmxlSW5kZXhlcygpLHQ9MCxpPmVbZS5sZW5ndGgtMV0paT1lW2UubGVuZ3RoLTFdO2Vsc2UgZm9yKHZhciBvIGluIGUpe2lmKGk8ZVtvXSl7aT10O2JyZWFrfXQ9ZVtvXX1yZXR1cm4gaX0sZS5wcm90b3R5cGUuY2xlYW5VcEV2ZW50cz1mdW5jdGlvbigpe3ZhciBlPXRoaXM7ZS5vcHRpb25zLmRvdHMmJm51bGwhPT1lLiRkb3RzJiYoaShcImxpXCIsZS4kZG90cykub2ZmKFwiY2xpY2suc2xpY2tcIixlLmNoYW5nZVNsaWRlKS5vZmYoXCJtb3VzZWVudGVyLnNsaWNrXCIsaS5wcm94eShlLmludGVycnVwdCxlLCEwKSkub2ZmKFwibW91c2VsZWF2ZS5zbGlja1wiLGkucHJveHkoZS5pbnRlcnJ1cHQsZSwhMSkpLCEwPT09ZS5vcHRpb25zLmFjY2Vzc2liaWxpdHkmJmUuJGRvdHMub2ZmKFwia2V5ZG93bi5zbGlja1wiLGUua2V5SGFuZGxlcikpLGUuJHNsaWRlci5vZmYoXCJmb2N1cy5zbGljayBibHVyLnNsaWNrXCIpLCEwPT09ZS5vcHRpb25zLmFycm93cyYmZS5zbGlkZUNvdW50PmUub3B0aW9ucy5zbGlkZXNUb1Nob3cmJihlLiRwcmV2QXJyb3cmJmUuJHByZXZBcnJvdy5vZmYoXCJjbGljay5zbGlja1wiLGUuY2hhbmdlU2xpZGUpLGUuJG5leHRBcnJvdyYmZS4kbmV4dEFycm93Lm9mZihcImNsaWNrLnNsaWNrXCIsZS5jaGFuZ2VTbGlkZSksITA9PT1lLm9wdGlvbnMuYWNjZXNzaWJpbGl0eSYmKGUuJHByZXZBcnJvdyYmZS4kcHJldkFycm93Lm9mZihcImtleWRvd24uc2xpY2tcIixlLmtleUhhbmRsZXIpLGUuJG5leHRBcnJvdyYmZS4kbmV4dEFycm93Lm9mZihcImtleWRvd24uc2xpY2tcIixlLmtleUhhbmRsZXIpKSksZS4kbGlzdC5vZmYoXCJ0b3VjaHN0YXJ0LnNsaWNrIG1vdXNlZG93bi5zbGlja1wiLGUuc3dpcGVIYW5kbGVyKSxlLiRsaXN0Lm9mZihcInRvdWNobW92ZS5zbGljayBtb3VzZW1vdmUuc2xpY2tcIixlLnN3aXBlSGFuZGxlciksZS4kbGlzdC5vZmYoXCJ0b3VjaGVuZC5zbGljayBtb3VzZXVwLnNsaWNrXCIsZS5zd2lwZUhhbmRsZXIpLGUuJGxpc3Qub2ZmKFwidG91Y2hjYW5jZWwuc2xpY2sgbW91c2VsZWF2ZS5zbGlja1wiLGUuc3dpcGVIYW5kbGVyKSxlLiRsaXN0Lm9mZihcImNsaWNrLnNsaWNrXCIsZS5jbGlja0hhbmRsZXIpLGkoZG9jdW1lbnQpLm9mZihlLnZpc2liaWxpdHlDaGFuZ2UsZS52aXNpYmlsaXR5KSxlLmNsZWFuVXBTbGlkZUV2ZW50cygpLCEwPT09ZS5vcHRpb25zLmFjY2Vzc2liaWxpdHkmJmUuJGxpc3Qub2ZmKFwia2V5ZG93bi5zbGlja1wiLGUua2V5SGFuZGxlciksITA9PT1lLm9wdGlvbnMuZm9jdXNPblNlbGVjdCYmaShlLiRzbGlkZVRyYWNrKS5jaGlsZHJlbigpLm9mZihcImNsaWNrLnNsaWNrXCIsZS5zZWxlY3RIYW5kbGVyKSxpKHdpbmRvdykub2ZmKFwib3JpZW50YXRpb25jaGFuZ2Uuc2xpY2suc2xpY2stXCIrZS5pbnN0YW5jZVVpZCxlLm9yaWVudGF0aW9uQ2hhbmdlKSxpKHdpbmRvdykub2ZmKFwicmVzaXplLnNsaWNrLnNsaWNrLVwiK2UuaW5zdGFuY2VVaWQsZS5yZXNpemUpLGkoXCJbZHJhZ2dhYmxlIT10cnVlXVwiLGUuJHNsaWRlVHJhY2spLm9mZihcImRyYWdzdGFydFwiLGUucHJldmVudERlZmF1bHQpLGkod2luZG93KS5vZmYoXCJsb2FkLnNsaWNrLnNsaWNrLVwiK2UuaW5zdGFuY2VVaWQsZS5zZXRQb3NpdGlvbil9LGUucHJvdG90eXBlLmNsZWFuVXBTbGlkZUV2ZW50cz1mdW5jdGlvbigpe3ZhciBlPXRoaXM7ZS4kbGlzdC5vZmYoXCJtb3VzZWVudGVyLnNsaWNrXCIsaS5wcm94eShlLmludGVycnVwdCxlLCEwKSksZS4kbGlzdC5vZmYoXCJtb3VzZWxlYXZlLnNsaWNrXCIsaS5wcm94eShlLmludGVycnVwdCxlLCExKSl9LGUucHJvdG90eXBlLmNsZWFuVXBSb3dzPWZ1bmN0aW9uKCl7dmFyIGksZT10aGlzO2Uub3B0aW9ucy5yb3dzPjEmJigoaT1lLiRzbGlkZXMuY2hpbGRyZW4oKS5jaGlsZHJlbigpKS5yZW1vdmVBdHRyKFwic3R5bGVcIiksZS4kc2xpZGVyLmVtcHR5KCkuYXBwZW5kKGkpKX0sZS5wcm90b3R5cGUuY2xpY2tIYW5kbGVyPWZ1bmN0aW9uKGkpeyExPT09dGhpcy5zaG91bGRDbGljayYmKGkuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCksaS5zdG9wUHJvcGFnYXRpb24oKSxpLnByZXZlbnREZWZhdWx0KCkpfSxlLnByb3RvdHlwZS5kZXN0cm95PWZ1bmN0aW9uKGUpe3ZhciB0PXRoaXM7dC5hdXRvUGxheUNsZWFyKCksdC50b3VjaE9iamVjdD17fSx0LmNsZWFuVXBFdmVudHMoKSxpKFwiLnNsaWNrLWNsb25lZFwiLHQuJHNsaWRlcikuZGV0YWNoKCksdC4kZG90cyYmdC4kZG90cy5yZW1vdmUoKSx0LiRwcmV2QXJyb3cmJnQuJHByZXZBcnJvdy5sZW5ndGgmJih0LiRwcmV2QXJyb3cucmVtb3ZlQ2xhc3MoXCJzbGljay1kaXNhYmxlZCBzbGljay1hcnJvdyBzbGljay1oaWRkZW5cIikucmVtb3ZlQXR0cihcImFyaWEtaGlkZGVuIGFyaWEtZGlzYWJsZWQgdGFiaW5kZXhcIikuY3NzKFwiZGlzcGxheVwiLFwiXCIpLHQuaHRtbEV4cHIudGVzdCh0Lm9wdGlvbnMucHJldkFycm93KSYmdC4kcHJldkFycm93LnJlbW92ZSgpKSx0LiRuZXh0QXJyb3cmJnQuJG5leHRBcnJvdy5sZW5ndGgmJih0LiRuZXh0QXJyb3cucmVtb3ZlQ2xhc3MoXCJzbGljay1kaXNhYmxlZCBzbGljay1hcnJvdyBzbGljay1oaWRkZW5cIikucmVtb3ZlQXR0cihcImFyaWEtaGlkZGVuIGFyaWEtZGlzYWJsZWQgdGFiaW5kZXhcIikuY3NzKFwiZGlzcGxheVwiLFwiXCIpLHQuaHRtbEV4cHIudGVzdCh0Lm9wdGlvbnMubmV4dEFycm93KSYmdC4kbmV4dEFycm93LnJlbW92ZSgpKSx0LiRzbGlkZXMmJih0LiRzbGlkZXMucmVtb3ZlQ2xhc3MoXCJzbGljay1zbGlkZSBzbGljay1hY3RpdmUgc2xpY2stY2VudGVyIHNsaWNrLXZpc2libGUgc2xpY2stY3VycmVudFwiKS5yZW1vdmVBdHRyKFwiYXJpYS1oaWRkZW5cIikucmVtb3ZlQXR0cihcImRhdGEtc2xpY2staW5kZXhcIikuZWFjaChmdW5jdGlvbigpe2kodGhpcykuYXR0cihcInN0eWxlXCIsaSh0aGlzKS5kYXRhKFwib3JpZ2luYWxTdHlsaW5nXCIpKX0pLHQuJHNsaWRlVHJhY2suY2hpbGRyZW4odGhpcy5vcHRpb25zLnNsaWRlKS5kZXRhY2goKSx0LiRzbGlkZVRyYWNrLmRldGFjaCgpLHQuJGxpc3QuZGV0YWNoKCksdC4kc2xpZGVyLmFwcGVuZCh0LiRzbGlkZXMpKSx0LmNsZWFuVXBSb3dzKCksdC4kc2xpZGVyLnJlbW92ZUNsYXNzKFwic2xpY2stc2xpZGVyXCIpLHQuJHNsaWRlci5yZW1vdmVDbGFzcyhcInNsaWNrLWluaXRpYWxpemVkXCIpLHQuJHNsaWRlci5yZW1vdmVDbGFzcyhcInNsaWNrLWRvdHRlZFwiKSx0LnVuc2xpY2tlZD0hMCxlfHx0LiRzbGlkZXIudHJpZ2dlcihcImRlc3Ryb3lcIixbdF0pfSxlLnByb3RvdHlwZS5kaXNhYmxlVHJhbnNpdGlvbj1mdW5jdGlvbihpKXt2YXIgZT10aGlzLHQ9e307dFtlLnRyYW5zaXRpb25UeXBlXT1cIlwiLCExPT09ZS5vcHRpb25zLmZhZGU/ZS4kc2xpZGVUcmFjay5jc3ModCk6ZS4kc2xpZGVzLmVxKGkpLmNzcyh0KX0sZS5wcm90b3R5cGUuZmFkZVNsaWRlPWZ1bmN0aW9uKGksZSl7dmFyIHQ9dGhpczshMT09PXQuY3NzVHJhbnNpdGlvbnM/KHQuJHNsaWRlcy5lcShpKS5jc3Moe3pJbmRleDp0Lm9wdGlvbnMuekluZGV4fSksdC4kc2xpZGVzLmVxKGkpLmFuaW1hdGUoe29wYWNpdHk6MX0sdC5vcHRpb25zLnNwZWVkLHQub3B0aW9ucy5lYXNpbmcsZSkpOih0LmFwcGx5VHJhbnNpdGlvbihpKSx0LiRzbGlkZXMuZXEoaSkuY3NzKHtvcGFjaXR5OjEsekluZGV4OnQub3B0aW9ucy56SW5kZXh9KSxlJiZzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7dC5kaXNhYmxlVHJhbnNpdGlvbihpKSxlLmNhbGwoKX0sdC5vcHRpb25zLnNwZWVkKSl9LGUucHJvdG90eXBlLmZhZGVTbGlkZU91dD1mdW5jdGlvbihpKXt2YXIgZT10aGlzOyExPT09ZS5jc3NUcmFuc2l0aW9ucz9lLiRzbGlkZXMuZXEoaSkuYW5pbWF0ZSh7b3BhY2l0eTowLHpJbmRleDplLm9wdGlvbnMuekluZGV4LTJ9LGUub3B0aW9ucy5zcGVlZCxlLm9wdGlvbnMuZWFzaW5nKTooZS5hcHBseVRyYW5zaXRpb24oaSksZS4kc2xpZGVzLmVxKGkpLmNzcyh7b3BhY2l0eTowLHpJbmRleDplLm9wdGlvbnMuekluZGV4LTJ9KSl9LGUucHJvdG90eXBlLmZpbHRlclNsaWRlcz1lLnByb3RvdHlwZS5zbGlja0ZpbHRlcj1mdW5jdGlvbihpKXt2YXIgZT10aGlzO251bGwhPT1pJiYoZS4kc2xpZGVzQ2FjaGU9ZS4kc2xpZGVzLGUudW5sb2FkKCksZS4kc2xpZGVUcmFjay5jaGlsZHJlbih0aGlzLm9wdGlvbnMuc2xpZGUpLmRldGFjaCgpLGUuJHNsaWRlc0NhY2hlLmZpbHRlcihpKS5hcHBlbmRUbyhlLiRzbGlkZVRyYWNrKSxlLnJlaW5pdCgpKX0sZS5wcm90b3R5cGUuZm9jdXNIYW5kbGVyPWZ1bmN0aW9uKCl7dmFyIGU9dGhpcztlLiRzbGlkZXIub2ZmKFwiZm9jdXMuc2xpY2sgYmx1ci5zbGlja1wiKS5vbihcImZvY3VzLnNsaWNrIGJsdXIuc2xpY2tcIixcIipcIixmdW5jdGlvbih0KXt0LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO3ZhciBvPWkodGhpcyk7c2V0VGltZW91dChmdW5jdGlvbigpe2Uub3B0aW9ucy5wYXVzZU9uRm9jdXMmJihlLmZvY3Vzc2VkPW8uaXMoXCI6Zm9jdXNcIiksZS5hdXRvUGxheSgpKX0sMCl9KX0sZS5wcm90b3R5cGUuZ2V0Q3VycmVudD1lLnByb3RvdHlwZS5zbGlja0N1cnJlbnRTbGlkZT1mdW5jdGlvbigpe3JldHVybiB0aGlzLmN1cnJlbnRTbGlkZX0sZS5wcm90b3R5cGUuZ2V0RG90Q291bnQ9ZnVuY3Rpb24oKXt2YXIgaT10aGlzLGU9MCx0PTAsbz0wO2lmKCEwPT09aS5vcHRpb25zLmluZmluaXRlKWlmKGkuc2xpZGVDb3VudDw9aS5vcHRpb25zLnNsaWRlc1RvU2hvdykrK287ZWxzZSBmb3IoO2U8aS5zbGlkZUNvdW50OykrK28sZT10K2kub3B0aW9ucy5zbGlkZXNUb1Njcm9sbCx0Kz1pLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGw8PWkub3B0aW9ucy5zbGlkZXNUb1Nob3c/aS5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsOmkub3B0aW9ucy5zbGlkZXNUb1Nob3c7ZWxzZSBpZighMD09PWkub3B0aW9ucy5jZW50ZXJNb2RlKW89aS5zbGlkZUNvdW50O2Vsc2UgaWYoaS5vcHRpb25zLmFzTmF2Rm9yKWZvcig7ZTxpLnNsaWRlQ291bnQ7KSsrbyxlPXQraS5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsLHQrPWkub3B0aW9ucy5zbGlkZXNUb1Njcm9sbDw9aS5vcHRpb25zLnNsaWRlc1RvU2hvdz9pLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGw6aS5vcHRpb25zLnNsaWRlc1RvU2hvdztlbHNlIG89MStNYXRoLmNlaWwoKGkuc2xpZGVDb3VudC1pLm9wdGlvbnMuc2xpZGVzVG9TaG93KS9pLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGwpO3JldHVybiBvLTF9LGUucHJvdG90eXBlLmdldExlZnQ9ZnVuY3Rpb24oaSl7dmFyIGUsdCxvLHMsbj10aGlzLHI9MDtyZXR1cm4gbi5zbGlkZU9mZnNldD0wLHQ9bi4kc2xpZGVzLmZpcnN0KCkub3V0ZXJIZWlnaHQoITApLCEwPT09bi5vcHRpb25zLmluZmluaXRlPyhuLnNsaWRlQ291bnQ+bi5vcHRpb25zLnNsaWRlc1RvU2hvdyYmKG4uc2xpZGVPZmZzZXQ9bi5zbGlkZVdpZHRoKm4ub3B0aW9ucy5zbGlkZXNUb1Nob3cqLTEscz0tMSwhMD09PW4ub3B0aW9ucy52ZXJ0aWNhbCYmITA9PT1uLm9wdGlvbnMuY2VudGVyTW9kZSYmKDI9PT1uLm9wdGlvbnMuc2xpZGVzVG9TaG93P3M9LTEuNToxPT09bi5vcHRpb25zLnNsaWRlc1RvU2hvdyYmKHM9LTIpKSxyPXQqbi5vcHRpb25zLnNsaWRlc1RvU2hvdypzKSxuLnNsaWRlQ291bnQlbi5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsIT0wJiZpK24ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbD5uLnNsaWRlQ291bnQmJm4uc2xpZGVDb3VudD5uLm9wdGlvbnMuc2xpZGVzVG9TaG93JiYoaT5uLnNsaWRlQ291bnQ/KG4uc2xpZGVPZmZzZXQ9KG4ub3B0aW9ucy5zbGlkZXNUb1Nob3ctKGktbi5zbGlkZUNvdW50KSkqbi5zbGlkZVdpZHRoKi0xLHI9KG4ub3B0aW9ucy5zbGlkZXNUb1Nob3ctKGktbi5zbGlkZUNvdW50KSkqdCotMSk6KG4uc2xpZGVPZmZzZXQ9bi5zbGlkZUNvdW50JW4ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbCpuLnNsaWRlV2lkdGgqLTEscj1uLnNsaWRlQ291bnQlbi5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsKnQqLTEpKSk6aStuLm9wdGlvbnMuc2xpZGVzVG9TaG93Pm4uc2xpZGVDb3VudCYmKG4uc2xpZGVPZmZzZXQ9KGkrbi5vcHRpb25zLnNsaWRlc1RvU2hvdy1uLnNsaWRlQ291bnQpKm4uc2xpZGVXaWR0aCxyPShpK24ub3B0aW9ucy5zbGlkZXNUb1Nob3ctbi5zbGlkZUNvdW50KSp0KSxuLnNsaWRlQ291bnQ8PW4ub3B0aW9ucy5zbGlkZXNUb1Nob3cmJihuLnNsaWRlT2Zmc2V0PTAscj0wKSwhMD09PW4ub3B0aW9ucy5jZW50ZXJNb2RlJiZuLnNsaWRlQ291bnQ8PW4ub3B0aW9ucy5zbGlkZXNUb1Nob3c/bi5zbGlkZU9mZnNldD1uLnNsaWRlV2lkdGgqTWF0aC5mbG9vcihuLm9wdGlvbnMuc2xpZGVzVG9TaG93KS8yLW4uc2xpZGVXaWR0aCpuLnNsaWRlQ291bnQvMjohMD09PW4ub3B0aW9ucy5jZW50ZXJNb2RlJiYhMD09PW4ub3B0aW9ucy5pbmZpbml0ZT9uLnNsaWRlT2Zmc2V0Kz1uLnNsaWRlV2lkdGgqTWF0aC5mbG9vcihuLm9wdGlvbnMuc2xpZGVzVG9TaG93LzIpLW4uc2xpZGVXaWR0aDohMD09PW4ub3B0aW9ucy5jZW50ZXJNb2RlJiYobi5zbGlkZU9mZnNldD0wLG4uc2xpZGVPZmZzZXQrPW4uc2xpZGVXaWR0aCpNYXRoLmZsb29yKG4ub3B0aW9ucy5zbGlkZXNUb1Nob3cvMikpLGU9ITE9PT1uLm9wdGlvbnMudmVydGljYWw/aSpuLnNsaWRlV2lkdGgqLTErbi5zbGlkZU9mZnNldDppKnQqLTErciwhMD09PW4ub3B0aW9ucy52YXJpYWJsZVdpZHRoJiYobz1uLnNsaWRlQ291bnQ8PW4ub3B0aW9ucy5zbGlkZXNUb1Nob3d8fCExPT09bi5vcHRpb25zLmluZmluaXRlP24uJHNsaWRlVHJhY2suY2hpbGRyZW4oXCIuc2xpY2stc2xpZGVcIikuZXEoaSk6bi4kc2xpZGVUcmFjay5jaGlsZHJlbihcIi5zbGljay1zbGlkZVwiKS5lcShpK24ub3B0aW9ucy5zbGlkZXNUb1Nob3cpLGU9ITA9PT1uLm9wdGlvbnMucnRsP29bMF0/LTEqKG4uJHNsaWRlVHJhY2sud2lkdGgoKS1vWzBdLm9mZnNldExlZnQtby53aWR0aCgpKTowOm9bMF0/LTEqb1swXS5vZmZzZXRMZWZ0OjAsITA9PT1uLm9wdGlvbnMuY2VudGVyTW9kZSYmKG89bi5zbGlkZUNvdW50PD1uLm9wdGlvbnMuc2xpZGVzVG9TaG93fHwhMT09PW4ub3B0aW9ucy5pbmZpbml0ZT9uLiRzbGlkZVRyYWNrLmNoaWxkcmVuKFwiLnNsaWNrLXNsaWRlXCIpLmVxKGkpOm4uJHNsaWRlVHJhY2suY2hpbGRyZW4oXCIuc2xpY2stc2xpZGVcIikuZXEoaStuLm9wdGlvbnMuc2xpZGVzVG9TaG93KzEpLGU9ITA9PT1uLm9wdGlvbnMucnRsP29bMF0/LTEqKG4uJHNsaWRlVHJhY2sud2lkdGgoKS1vWzBdLm9mZnNldExlZnQtby53aWR0aCgpKTowOm9bMF0/LTEqb1swXS5vZmZzZXRMZWZ0OjAsZSs9KG4uJGxpc3Qud2lkdGgoKS1vLm91dGVyV2lkdGgoKSkvMikpLGV9LGUucHJvdG90eXBlLmdldE9wdGlvbj1lLnByb3RvdHlwZS5zbGlja0dldE9wdGlvbj1mdW5jdGlvbihpKXtyZXR1cm4gdGhpcy5vcHRpb25zW2ldfSxlLnByb3RvdHlwZS5nZXROYXZpZ2FibGVJbmRleGVzPWZ1bmN0aW9uKCl7dmFyIGksZT10aGlzLHQ9MCxvPTAscz1bXTtmb3IoITE9PT1lLm9wdGlvbnMuaW5maW5pdGU/aT1lLnNsaWRlQ291bnQ6KHQ9LTEqZS5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsLG89LTEqZS5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsLGk9MiplLnNsaWRlQ291bnQpO3Q8aTspcy5wdXNoKHQpLHQ9bytlLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGwsbys9ZS5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsPD1lLm9wdGlvbnMuc2xpZGVzVG9TaG93P2Uub3B0aW9ucy5zbGlkZXNUb1Njcm9sbDplLm9wdGlvbnMuc2xpZGVzVG9TaG93O3JldHVybiBzfSxlLnByb3RvdHlwZS5nZXRTbGljaz1mdW5jdGlvbigpe3JldHVybiB0aGlzfSxlLnByb3RvdHlwZS5nZXRTbGlkZUNvdW50PWZ1bmN0aW9uKCl7dmFyIGUsdCxvPXRoaXM7cmV0dXJuIHQ9ITA9PT1vLm9wdGlvbnMuY2VudGVyTW9kZT9vLnNsaWRlV2lkdGgqTWF0aC5mbG9vcihvLm9wdGlvbnMuc2xpZGVzVG9TaG93LzIpOjAsITA9PT1vLm9wdGlvbnMuc3dpcGVUb1NsaWRlPyhvLiRzbGlkZVRyYWNrLmZpbmQoXCIuc2xpY2stc2xpZGVcIikuZWFjaChmdW5jdGlvbihzLG4pe2lmKG4ub2Zmc2V0TGVmdC10K2kobikub3V0ZXJXaWR0aCgpLzI+LTEqby5zd2lwZUxlZnQpcmV0dXJuIGU9biwhMX0pLE1hdGguYWJzKGkoZSkuYXR0cihcImRhdGEtc2xpY2staW5kZXhcIiktby5jdXJyZW50U2xpZGUpfHwxKTpvLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGx9LGUucHJvdG90eXBlLmdvVG89ZS5wcm90b3R5cGUuc2xpY2tHb1RvPWZ1bmN0aW9uKGksZSl7dGhpcy5jaGFuZ2VTbGlkZSh7ZGF0YTp7bWVzc2FnZTpcImluZGV4XCIsaW5kZXg6cGFyc2VJbnQoaSl9fSxlKX0sZS5wcm90b3R5cGUuaW5pdD1mdW5jdGlvbihlKXt2YXIgdD10aGlzO2kodC4kc2xpZGVyKS5oYXNDbGFzcyhcInNsaWNrLWluaXRpYWxpemVkXCIpfHwoaSh0LiRzbGlkZXIpLmFkZENsYXNzKFwic2xpY2staW5pdGlhbGl6ZWRcIiksdC5idWlsZFJvd3MoKSx0LmJ1aWxkT3V0KCksdC5zZXRQcm9wcygpLHQuc3RhcnRMb2FkKCksdC5sb2FkU2xpZGVyKCksdC5pbml0aWFsaXplRXZlbnRzKCksdC51cGRhdGVBcnJvd3MoKSx0LnVwZGF0ZURvdHMoKSx0LmNoZWNrUmVzcG9uc2l2ZSghMCksdC5mb2N1c0hhbmRsZXIoKSksZSYmdC4kc2xpZGVyLnRyaWdnZXIoXCJpbml0XCIsW3RdKSwhMD09PXQub3B0aW9ucy5hY2Nlc3NpYmlsaXR5JiZ0LmluaXRBREEoKSx0Lm9wdGlvbnMuYXV0b3BsYXkmJih0LnBhdXNlZD0hMSx0LmF1dG9QbGF5KCkpfSxlLnByb3RvdHlwZS5pbml0QURBPWZ1bmN0aW9uKCl7dmFyIGU9dGhpcyx0PU1hdGguY2VpbChlLnNsaWRlQ291bnQvZS5vcHRpb25zLnNsaWRlc1RvU2hvdyksbz1lLmdldE5hdmlnYWJsZUluZGV4ZXMoKS5maWx0ZXIoZnVuY3Rpb24oaSl7cmV0dXJuIGk+PTAmJmk8ZS5zbGlkZUNvdW50fSk7ZS4kc2xpZGVzLmFkZChlLiRzbGlkZVRyYWNrLmZpbmQoXCIuc2xpY2stY2xvbmVkXCIpKS5hdHRyKHtcImFyaWEtaGlkZGVuXCI6XCJ0cnVlXCIsdGFiaW5kZXg6XCItMVwifSkuZmluZChcImEsIGlucHV0LCBidXR0b24sIHNlbGVjdFwiKS5hdHRyKHt0YWJpbmRleDpcIi0xXCJ9KSxudWxsIT09ZS4kZG90cyYmKGUuJHNsaWRlcy5ub3QoZS4kc2xpZGVUcmFjay5maW5kKFwiLnNsaWNrLWNsb25lZFwiKSkuZWFjaChmdW5jdGlvbih0KXt2YXIgcz1vLmluZGV4T2YodCk7aSh0aGlzKS5hdHRyKHtyb2xlOlwidGFicGFuZWxcIixpZDpcInNsaWNrLXNsaWRlXCIrZS5pbnN0YW5jZVVpZCt0LHRhYmluZGV4Oi0xfSksLTEhPT1zJiZpKHRoaXMpLmF0dHIoe1wiYXJpYS1kZXNjcmliZWRieVwiOlwic2xpY2stc2xpZGUtY29udHJvbFwiK2UuaW5zdGFuY2VVaWQrc30pfSksZS4kZG90cy5hdHRyKFwicm9sZVwiLFwidGFibGlzdFwiKS5maW5kKFwibGlcIikuZWFjaChmdW5jdGlvbihzKXt2YXIgbj1vW3NdO2kodGhpcykuYXR0cih7cm9sZTpcInByZXNlbnRhdGlvblwifSksaSh0aGlzKS5maW5kKFwiYnV0dG9uXCIpLmZpcnN0KCkuYXR0cih7cm9sZTpcInRhYlwiLGlkOlwic2xpY2stc2xpZGUtY29udHJvbFwiK2UuaW5zdGFuY2VVaWQrcyxcImFyaWEtY29udHJvbHNcIjpcInNsaWNrLXNsaWRlXCIrZS5pbnN0YW5jZVVpZCtuLFwiYXJpYS1sYWJlbFwiOnMrMStcIiBvZiBcIit0LFwiYXJpYS1zZWxlY3RlZFwiOm51bGwsdGFiaW5kZXg6XCItMVwifSl9KS5lcShlLmN1cnJlbnRTbGlkZSkuZmluZChcImJ1dHRvblwiKS5hdHRyKHtcImFyaWEtc2VsZWN0ZWRcIjpcInRydWVcIix0YWJpbmRleDpcIjBcIn0pLmVuZCgpKTtmb3IodmFyIHM9ZS5jdXJyZW50U2xpZGUsbj1zK2Uub3B0aW9ucy5zbGlkZXNUb1Nob3c7czxuO3MrKyllLiRzbGlkZXMuZXEocykuYXR0cihcInRhYmluZGV4XCIsMCk7ZS5hY3RpdmF0ZUFEQSgpfSxlLnByb3RvdHlwZS5pbml0QXJyb3dFdmVudHM9ZnVuY3Rpb24oKXt2YXIgaT10aGlzOyEwPT09aS5vcHRpb25zLmFycm93cyYmaS5zbGlkZUNvdW50Pmkub3B0aW9ucy5zbGlkZXNUb1Nob3cmJihpLiRwcmV2QXJyb3cub2ZmKFwiY2xpY2suc2xpY2tcIikub24oXCJjbGljay5zbGlja1wiLHttZXNzYWdlOlwicHJldmlvdXNcIn0saS5jaGFuZ2VTbGlkZSksaS4kbmV4dEFycm93Lm9mZihcImNsaWNrLnNsaWNrXCIpLm9uKFwiY2xpY2suc2xpY2tcIix7bWVzc2FnZTpcIm5leHRcIn0saS5jaGFuZ2VTbGlkZSksITA9PT1pLm9wdGlvbnMuYWNjZXNzaWJpbGl0eSYmKGkuJHByZXZBcnJvdy5vbihcImtleWRvd24uc2xpY2tcIixpLmtleUhhbmRsZXIpLGkuJG5leHRBcnJvdy5vbihcImtleWRvd24uc2xpY2tcIixpLmtleUhhbmRsZXIpKSl9LGUucHJvdG90eXBlLmluaXREb3RFdmVudHM9ZnVuY3Rpb24oKXt2YXIgZT10aGlzOyEwPT09ZS5vcHRpb25zLmRvdHMmJihpKFwibGlcIixlLiRkb3RzKS5vbihcImNsaWNrLnNsaWNrXCIse21lc3NhZ2U6XCJpbmRleFwifSxlLmNoYW5nZVNsaWRlKSwhMD09PWUub3B0aW9ucy5hY2Nlc3NpYmlsaXR5JiZlLiRkb3RzLm9uKFwia2V5ZG93bi5zbGlja1wiLGUua2V5SGFuZGxlcikpLCEwPT09ZS5vcHRpb25zLmRvdHMmJiEwPT09ZS5vcHRpb25zLnBhdXNlT25Eb3RzSG92ZXImJmkoXCJsaVwiLGUuJGRvdHMpLm9uKFwibW91c2VlbnRlci5zbGlja1wiLGkucHJveHkoZS5pbnRlcnJ1cHQsZSwhMCkpLm9uKFwibW91c2VsZWF2ZS5zbGlja1wiLGkucHJveHkoZS5pbnRlcnJ1cHQsZSwhMSkpfSxlLnByb3RvdHlwZS5pbml0U2xpZGVFdmVudHM9ZnVuY3Rpb24oKXt2YXIgZT10aGlzO2Uub3B0aW9ucy5wYXVzZU9uSG92ZXImJihlLiRsaXN0Lm9uKFwibW91c2VlbnRlci5zbGlja1wiLGkucHJveHkoZS5pbnRlcnJ1cHQsZSwhMCkpLGUuJGxpc3Qub24oXCJtb3VzZWxlYXZlLnNsaWNrXCIsaS5wcm94eShlLmludGVycnVwdCxlLCExKSkpfSxlLnByb3RvdHlwZS5pbml0aWFsaXplRXZlbnRzPWZ1bmN0aW9uKCl7dmFyIGU9dGhpcztlLmluaXRBcnJvd0V2ZW50cygpLGUuaW5pdERvdEV2ZW50cygpLGUuaW5pdFNsaWRlRXZlbnRzKCksZS4kbGlzdC5vbihcInRvdWNoc3RhcnQuc2xpY2sgbW91c2Vkb3duLnNsaWNrXCIse2FjdGlvbjpcInN0YXJ0XCJ9LGUuc3dpcGVIYW5kbGVyKSxlLiRsaXN0Lm9uKFwidG91Y2htb3ZlLnNsaWNrIG1vdXNlbW92ZS5zbGlja1wiLHthY3Rpb246XCJtb3ZlXCJ9LGUuc3dpcGVIYW5kbGVyKSxlLiRsaXN0Lm9uKFwidG91Y2hlbmQuc2xpY2sgbW91c2V1cC5zbGlja1wiLHthY3Rpb246XCJlbmRcIn0sZS5zd2lwZUhhbmRsZXIpLGUuJGxpc3Qub24oXCJ0b3VjaGNhbmNlbC5zbGljayBtb3VzZWxlYXZlLnNsaWNrXCIse2FjdGlvbjpcImVuZFwifSxlLnN3aXBlSGFuZGxlciksZS4kbGlzdC5vbihcImNsaWNrLnNsaWNrXCIsZS5jbGlja0hhbmRsZXIpLGkoZG9jdW1lbnQpLm9uKGUudmlzaWJpbGl0eUNoYW5nZSxpLnByb3h5KGUudmlzaWJpbGl0eSxlKSksITA9PT1lLm9wdGlvbnMuYWNjZXNzaWJpbGl0eSYmZS4kbGlzdC5vbihcImtleWRvd24uc2xpY2tcIixlLmtleUhhbmRsZXIpLCEwPT09ZS5vcHRpb25zLmZvY3VzT25TZWxlY3QmJmkoZS4kc2xpZGVUcmFjaykuY2hpbGRyZW4oKS5vbihcImNsaWNrLnNsaWNrXCIsZS5zZWxlY3RIYW5kbGVyKSxpKHdpbmRvdykub24oXCJvcmllbnRhdGlvbmNoYW5nZS5zbGljay5zbGljay1cIitlLmluc3RhbmNlVWlkLGkucHJveHkoZS5vcmllbnRhdGlvbkNoYW5nZSxlKSksaSh3aW5kb3cpLm9uKFwicmVzaXplLnNsaWNrLnNsaWNrLVwiK2UuaW5zdGFuY2VVaWQsaS5wcm94eShlLnJlc2l6ZSxlKSksaShcIltkcmFnZ2FibGUhPXRydWVdXCIsZS4kc2xpZGVUcmFjaykub24oXCJkcmFnc3RhcnRcIixlLnByZXZlbnREZWZhdWx0KSxpKHdpbmRvdykub24oXCJsb2FkLnNsaWNrLnNsaWNrLVwiK2UuaW5zdGFuY2VVaWQsZS5zZXRQb3NpdGlvbiksaShlLnNldFBvc2l0aW9uKX0sZS5wcm90b3R5cGUuaW5pdFVJPWZ1bmN0aW9uKCl7dmFyIGk9dGhpczshMD09PWkub3B0aW9ucy5hcnJvd3MmJmkuc2xpZGVDb3VudD5pLm9wdGlvbnMuc2xpZGVzVG9TaG93JiYoaS4kcHJldkFycm93LnNob3coKSxpLiRuZXh0QXJyb3cuc2hvdygpKSwhMD09PWkub3B0aW9ucy5kb3RzJiZpLnNsaWRlQ291bnQ+aS5vcHRpb25zLnNsaWRlc1RvU2hvdyYmaS4kZG90cy5zaG93KCl9LGUucHJvdG90eXBlLmtleUhhbmRsZXI9ZnVuY3Rpb24oaSl7dmFyIGU9dGhpcztpLnRhcmdldC50YWdOYW1lLm1hdGNoKFwiVEVYVEFSRUF8SU5QVVR8U0VMRUNUXCIpfHwoMzc9PT1pLmtleUNvZGUmJiEwPT09ZS5vcHRpb25zLmFjY2Vzc2liaWxpdHk/ZS5jaGFuZ2VTbGlkZSh7ZGF0YTp7bWVzc2FnZTohMD09PWUub3B0aW9ucy5ydGw/XCJuZXh0XCI6XCJwcmV2aW91c1wifX0pOjM5PT09aS5rZXlDb2RlJiYhMD09PWUub3B0aW9ucy5hY2Nlc3NpYmlsaXR5JiZlLmNoYW5nZVNsaWRlKHtkYXRhOnttZXNzYWdlOiEwPT09ZS5vcHRpb25zLnJ0bD9cInByZXZpb3VzXCI6XCJuZXh0XCJ9fSkpfSxlLnByb3RvdHlwZS5sYXp5TG9hZD1mdW5jdGlvbigpe2Z1bmN0aW9uIGUoZSl7aShcImltZ1tkYXRhLWxhenldXCIsZSkuZWFjaChmdW5jdGlvbigpe3ZhciBlPWkodGhpcyksdD1pKHRoaXMpLmF0dHIoXCJkYXRhLWxhenlcIiksbz1pKHRoaXMpLmF0dHIoXCJkYXRhLXNyY3NldFwiKSxzPWkodGhpcykuYXR0cihcImRhdGEtc2l6ZXNcIil8fG4uJHNsaWRlci5hdHRyKFwiZGF0YS1zaXplc1wiKSxyPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7ci5vbmxvYWQ9ZnVuY3Rpb24oKXtlLmFuaW1hdGUoe29wYWNpdHk6MH0sMTAwLGZ1bmN0aW9uKCl7byYmKGUuYXR0cihcInNyY3NldFwiLG8pLHMmJmUuYXR0cihcInNpemVzXCIscykpLGUuYXR0cihcInNyY1wiLHQpLmFuaW1hdGUoe29wYWNpdHk6MX0sMjAwLGZ1bmN0aW9uKCl7ZS5yZW1vdmVBdHRyKFwiZGF0YS1sYXp5IGRhdGEtc3Jjc2V0IGRhdGEtc2l6ZXNcIikucmVtb3ZlQ2xhc3MoXCJzbGljay1sb2FkaW5nXCIpfSksbi4kc2xpZGVyLnRyaWdnZXIoXCJsYXp5TG9hZGVkXCIsW24sZSx0XSl9KX0sci5vbmVycm9yPWZ1bmN0aW9uKCl7ZS5yZW1vdmVBdHRyKFwiZGF0YS1sYXp5XCIpLnJlbW92ZUNsYXNzKFwic2xpY2stbG9hZGluZ1wiKS5hZGRDbGFzcyhcInNsaWNrLWxhenlsb2FkLWVycm9yXCIpLG4uJHNsaWRlci50cmlnZ2VyKFwibGF6eUxvYWRFcnJvclwiLFtuLGUsdF0pfSxyLnNyYz10fSl9dmFyIHQsbyxzLG49dGhpcztpZighMD09PW4ub3B0aW9ucy5jZW50ZXJNb2RlPyEwPT09bi5vcHRpb25zLmluZmluaXRlP3M9KG89bi5jdXJyZW50U2xpZGUrKG4ub3B0aW9ucy5zbGlkZXNUb1Nob3cvMisxKSkrbi5vcHRpb25zLnNsaWRlc1RvU2hvdysyOihvPU1hdGgubWF4KDAsbi5jdXJyZW50U2xpZGUtKG4ub3B0aW9ucy5zbGlkZXNUb1Nob3cvMisxKSkscz1uLm9wdGlvbnMuc2xpZGVzVG9TaG93LzIrMSsyK24uY3VycmVudFNsaWRlKToobz1uLm9wdGlvbnMuaW5maW5pdGU/bi5vcHRpb25zLnNsaWRlc1RvU2hvdytuLmN1cnJlbnRTbGlkZTpuLmN1cnJlbnRTbGlkZSxzPU1hdGguY2VpbChvK24ub3B0aW9ucy5zbGlkZXNUb1Nob3cpLCEwPT09bi5vcHRpb25zLmZhZGUmJihvPjAmJm8tLSxzPD1uLnNsaWRlQ291bnQmJnMrKykpLHQ9bi4kc2xpZGVyLmZpbmQoXCIuc2xpY2stc2xpZGVcIikuc2xpY2UobyxzKSxcImFudGljaXBhdGVkXCI9PT1uLm9wdGlvbnMubGF6eUxvYWQpZm9yKHZhciByPW8tMSxsPXMsZD1uLiRzbGlkZXIuZmluZChcIi5zbGljay1zbGlkZVwiKSxhPTA7YTxuLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGw7YSsrKXI8MCYmKHI9bi5zbGlkZUNvdW50LTEpLHQ9KHQ9dC5hZGQoZC5lcShyKSkpLmFkZChkLmVxKGwpKSxyLS0sbCsrO2UodCksbi5zbGlkZUNvdW50PD1uLm9wdGlvbnMuc2xpZGVzVG9TaG93P2Uobi4kc2xpZGVyLmZpbmQoXCIuc2xpY2stc2xpZGVcIikpOm4uY3VycmVudFNsaWRlPj1uLnNsaWRlQ291bnQtbi5vcHRpb25zLnNsaWRlc1RvU2hvdz9lKG4uJHNsaWRlci5maW5kKFwiLnNsaWNrLWNsb25lZFwiKS5zbGljZSgwLG4ub3B0aW9ucy5zbGlkZXNUb1Nob3cpKTowPT09bi5jdXJyZW50U2xpZGUmJmUobi4kc2xpZGVyLmZpbmQoXCIuc2xpY2stY2xvbmVkXCIpLnNsaWNlKC0xKm4ub3B0aW9ucy5zbGlkZXNUb1Nob3cpKX0sZS5wcm90b3R5cGUubG9hZFNsaWRlcj1mdW5jdGlvbigpe3ZhciBpPXRoaXM7aS5zZXRQb3NpdGlvbigpLGkuJHNsaWRlVHJhY2suY3NzKHtvcGFjaXR5OjF9KSxpLiRzbGlkZXIucmVtb3ZlQ2xhc3MoXCJzbGljay1sb2FkaW5nXCIpLGkuaW5pdFVJKCksXCJwcm9ncmVzc2l2ZVwiPT09aS5vcHRpb25zLmxhenlMb2FkJiZpLnByb2dyZXNzaXZlTGF6eUxvYWQoKX0sZS5wcm90b3R5cGUubmV4dD1lLnByb3RvdHlwZS5zbGlja05leHQ9ZnVuY3Rpb24oKXt0aGlzLmNoYW5nZVNsaWRlKHtkYXRhOnttZXNzYWdlOlwibmV4dFwifX0pfSxlLnByb3RvdHlwZS5vcmllbnRhdGlvbkNoYW5nZT1mdW5jdGlvbigpe3ZhciBpPXRoaXM7aS5jaGVja1Jlc3BvbnNpdmUoKSxpLnNldFBvc2l0aW9uKCl9LGUucHJvdG90eXBlLnBhdXNlPWUucHJvdG90eXBlLnNsaWNrUGF1c2U9ZnVuY3Rpb24oKXt2YXIgaT10aGlzO2kuYXV0b1BsYXlDbGVhcigpLGkucGF1c2VkPSEwfSxlLnByb3RvdHlwZS5wbGF5PWUucHJvdG90eXBlLnNsaWNrUGxheT1mdW5jdGlvbigpe3ZhciBpPXRoaXM7aS5hdXRvUGxheSgpLGkub3B0aW9ucy5hdXRvcGxheT0hMCxpLnBhdXNlZD0hMSxpLmZvY3Vzc2VkPSExLGkuaW50ZXJydXB0ZWQ9ITF9LGUucHJvdG90eXBlLnBvc3RTbGlkZT1mdW5jdGlvbihlKXt2YXIgdD10aGlzO3QudW5zbGlja2VkfHwodC4kc2xpZGVyLnRyaWdnZXIoXCJhZnRlckNoYW5nZVwiLFt0LGVdKSx0LmFuaW1hdGluZz0hMSx0LnNsaWRlQ291bnQ+dC5vcHRpb25zLnNsaWRlc1RvU2hvdyYmdC5zZXRQb3NpdGlvbigpLHQuc3dpcGVMZWZ0PW51bGwsdC5vcHRpb25zLmF1dG9wbGF5JiZ0LmF1dG9QbGF5KCksITA9PT10Lm9wdGlvbnMuYWNjZXNzaWJpbGl0eSYmKHQuaW5pdEFEQSgpLHQub3B0aW9ucy5mb2N1c09uQ2hhbmdlJiZpKHQuJHNsaWRlcy5nZXQodC5jdXJyZW50U2xpZGUpKS5hdHRyKFwidGFiaW5kZXhcIiwwKS5mb2N1cygpKSl9LGUucHJvdG90eXBlLnByZXY9ZS5wcm90b3R5cGUuc2xpY2tQcmV2PWZ1bmN0aW9uKCl7dGhpcy5jaGFuZ2VTbGlkZSh7ZGF0YTp7bWVzc2FnZTpcInByZXZpb3VzXCJ9fSl9LGUucHJvdG90eXBlLnByZXZlbnREZWZhdWx0PWZ1bmN0aW9uKGkpe2kucHJldmVudERlZmF1bHQoKX0sZS5wcm90b3R5cGUucHJvZ3Jlc3NpdmVMYXp5TG9hZD1mdW5jdGlvbihlKXtlPWV8fDE7dmFyIHQsbyxzLG4scixsPXRoaXMsZD1pKFwiaW1nW2RhdGEtbGF6eV1cIixsLiRzbGlkZXIpO2QubGVuZ3RoPyh0PWQuZmlyc3QoKSxvPXQuYXR0cihcImRhdGEtbGF6eVwiKSxzPXQuYXR0cihcImRhdGEtc3Jjc2V0XCIpLG49dC5hdHRyKFwiZGF0YS1zaXplc1wiKXx8bC4kc2xpZGVyLmF0dHIoXCJkYXRhLXNpemVzXCIpLChyPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIikpLm9ubG9hZD1mdW5jdGlvbigpe3MmJih0LmF0dHIoXCJzcmNzZXRcIixzKSxuJiZ0LmF0dHIoXCJzaXplc1wiLG4pKSx0LmF0dHIoXCJzcmNcIixvKS5yZW1vdmVBdHRyKFwiZGF0YS1sYXp5IGRhdGEtc3Jjc2V0IGRhdGEtc2l6ZXNcIikucmVtb3ZlQ2xhc3MoXCJzbGljay1sb2FkaW5nXCIpLCEwPT09bC5vcHRpb25zLmFkYXB0aXZlSGVpZ2h0JiZsLnNldFBvc2l0aW9uKCksbC4kc2xpZGVyLnRyaWdnZXIoXCJsYXp5TG9hZGVkXCIsW2wsdCxvXSksbC5wcm9ncmVzc2l2ZUxhenlMb2FkKCl9LHIub25lcnJvcj1mdW5jdGlvbigpe2U8Mz9zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7bC5wcm9ncmVzc2l2ZUxhenlMb2FkKGUrMSl9LDUwMCk6KHQucmVtb3ZlQXR0cihcImRhdGEtbGF6eVwiKS5yZW1vdmVDbGFzcyhcInNsaWNrLWxvYWRpbmdcIikuYWRkQ2xhc3MoXCJzbGljay1sYXp5bG9hZC1lcnJvclwiKSxsLiRzbGlkZXIudHJpZ2dlcihcImxhenlMb2FkRXJyb3JcIixbbCx0LG9dKSxsLnByb2dyZXNzaXZlTGF6eUxvYWQoKSl9LHIuc3JjPW8pOmwuJHNsaWRlci50cmlnZ2VyKFwiYWxsSW1hZ2VzTG9hZGVkXCIsW2xdKX0sZS5wcm90b3R5cGUucmVmcmVzaD1mdW5jdGlvbihlKXt2YXIgdCxvLHM9dGhpcztvPXMuc2xpZGVDb3VudC1zLm9wdGlvbnMuc2xpZGVzVG9TaG93LCFzLm9wdGlvbnMuaW5maW5pdGUmJnMuY3VycmVudFNsaWRlPm8mJihzLmN1cnJlbnRTbGlkZT1vKSxzLnNsaWRlQ291bnQ8PXMub3B0aW9ucy5zbGlkZXNUb1Nob3cmJihzLmN1cnJlbnRTbGlkZT0wKSx0PXMuY3VycmVudFNsaWRlLHMuZGVzdHJveSghMCksaS5leHRlbmQocyxzLmluaXRpYWxzLHtjdXJyZW50U2xpZGU6dH0pLHMuaW5pdCgpLGV8fHMuY2hhbmdlU2xpZGUoe2RhdGE6e21lc3NhZ2U6XCJpbmRleFwiLGluZGV4OnR9fSwhMSl9LGUucHJvdG90eXBlLnJlZ2lzdGVyQnJlYWtwb2ludHM9ZnVuY3Rpb24oKXt2YXIgZSx0LG8scz10aGlzLG49cy5vcHRpb25zLnJlc3BvbnNpdmV8fG51bGw7aWYoXCJhcnJheVwiPT09aS50eXBlKG4pJiZuLmxlbmd0aCl7cy5yZXNwb25kVG89cy5vcHRpb25zLnJlc3BvbmRUb3x8XCJ3aW5kb3dcIjtmb3IoZSBpbiBuKWlmKG89cy5icmVha3BvaW50cy5sZW5ndGgtMSxuLmhhc093blByb3BlcnR5KGUpKXtmb3IodD1uW2VdLmJyZWFrcG9pbnQ7bz49MDspcy5icmVha3BvaW50c1tvXSYmcy5icmVha3BvaW50c1tvXT09PXQmJnMuYnJlYWtwb2ludHMuc3BsaWNlKG8sMSksby0tO3MuYnJlYWtwb2ludHMucHVzaCh0KSxzLmJyZWFrcG9pbnRTZXR0aW5nc1t0XT1uW2VdLnNldHRpbmdzfXMuYnJlYWtwb2ludHMuc29ydChmdW5jdGlvbihpLGUpe3JldHVybiBzLm9wdGlvbnMubW9iaWxlRmlyc3Q/aS1lOmUtaX0pfX0sZS5wcm90b3R5cGUucmVpbml0PWZ1bmN0aW9uKCl7dmFyIGU9dGhpcztlLiRzbGlkZXM9ZS4kc2xpZGVUcmFjay5jaGlsZHJlbihlLm9wdGlvbnMuc2xpZGUpLmFkZENsYXNzKFwic2xpY2stc2xpZGVcIiksZS5zbGlkZUNvdW50PWUuJHNsaWRlcy5sZW5ndGgsZS5jdXJyZW50U2xpZGU+PWUuc2xpZGVDb3VudCYmMCE9PWUuY3VycmVudFNsaWRlJiYoZS5jdXJyZW50U2xpZGU9ZS5jdXJyZW50U2xpZGUtZS5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsKSxlLnNsaWRlQ291bnQ8PWUub3B0aW9ucy5zbGlkZXNUb1Nob3cmJihlLmN1cnJlbnRTbGlkZT0wKSxlLnJlZ2lzdGVyQnJlYWtwb2ludHMoKSxlLnNldFByb3BzKCksZS5zZXR1cEluZmluaXRlKCksZS5idWlsZEFycm93cygpLGUudXBkYXRlQXJyb3dzKCksZS5pbml0QXJyb3dFdmVudHMoKSxlLmJ1aWxkRG90cygpLGUudXBkYXRlRG90cygpLGUuaW5pdERvdEV2ZW50cygpLGUuY2xlYW5VcFNsaWRlRXZlbnRzKCksZS5pbml0U2xpZGVFdmVudHMoKSxlLmNoZWNrUmVzcG9uc2l2ZSghMSwhMCksITA9PT1lLm9wdGlvbnMuZm9jdXNPblNlbGVjdCYmaShlLiRzbGlkZVRyYWNrKS5jaGlsZHJlbigpLm9uKFwiY2xpY2suc2xpY2tcIixlLnNlbGVjdEhhbmRsZXIpLGUuc2V0U2xpZGVDbGFzc2VzKFwibnVtYmVyXCI9PXR5cGVvZiBlLmN1cnJlbnRTbGlkZT9lLmN1cnJlbnRTbGlkZTowKSxlLnNldFBvc2l0aW9uKCksZS5mb2N1c0hhbmRsZXIoKSxlLnBhdXNlZD0hZS5vcHRpb25zLmF1dG9wbGF5LGUuYXV0b1BsYXkoKSxlLiRzbGlkZXIudHJpZ2dlcihcInJlSW5pdFwiLFtlXSl9LGUucHJvdG90eXBlLnJlc2l6ZT1mdW5jdGlvbigpe3ZhciBlPXRoaXM7aSh3aW5kb3cpLndpZHRoKCkhPT1lLndpbmRvd1dpZHRoJiYoY2xlYXJUaW1lb3V0KGUud2luZG93RGVsYXkpLGUud2luZG93RGVsYXk9d2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKXtlLndpbmRvd1dpZHRoPWkod2luZG93KS53aWR0aCgpLGUuY2hlY2tSZXNwb25zaXZlKCksZS51bnNsaWNrZWR8fGUuc2V0UG9zaXRpb24oKX0sNTApKX0sZS5wcm90b3R5cGUucmVtb3ZlU2xpZGU9ZS5wcm90b3R5cGUuc2xpY2tSZW1vdmU9ZnVuY3Rpb24oaSxlLHQpe3ZhciBvPXRoaXM7aWYoaT1cImJvb2xlYW5cIj09dHlwZW9mIGk/ITA9PT0oZT1pKT8wOm8uc2xpZGVDb3VudC0xOiEwPT09ZT8tLWk6aSxvLnNsaWRlQ291bnQ8MXx8aTwwfHxpPm8uc2xpZGVDb3VudC0xKXJldHVybiExO28udW5sb2FkKCksITA9PT10P28uJHNsaWRlVHJhY2suY2hpbGRyZW4oKS5yZW1vdmUoKTpvLiRzbGlkZVRyYWNrLmNoaWxkcmVuKHRoaXMub3B0aW9ucy5zbGlkZSkuZXEoaSkucmVtb3ZlKCksby4kc2xpZGVzPW8uJHNsaWRlVHJhY2suY2hpbGRyZW4odGhpcy5vcHRpb25zLnNsaWRlKSxvLiRzbGlkZVRyYWNrLmNoaWxkcmVuKHRoaXMub3B0aW9ucy5zbGlkZSkuZGV0YWNoKCksby4kc2xpZGVUcmFjay5hcHBlbmQoby4kc2xpZGVzKSxvLiRzbGlkZXNDYWNoZT1vLiRzbGlkZXMsby5yZWluaXQoKX0sZS5wcm90b3R5cGUuc2V0Q1NTPWZ1bmN0aW9uKGkpe3ZhciBlLHQsbz10aGlzLHM9e307ITA9PT1vLm9wdGlvbnMucnRsJiYoaT0taSksZT1cImxlZnRcIj09by5wb3NpdGlvblByb3A/TWF0aC5jZWlsKGkpK1wicHhcIjpcIjBweFwiLHQ9XCJ0b3BcIj09by5wb3NpdGlvblByb3A/TWF0aC5jZWlsKGkpK1wicHhcIjpcIjBweFwiLHNbby5wb3NpdGlvblByb3BdPWksITE9PT1vLnRyYW5zZm9ybXNFbmFibGVkP28uJHNsaWRlVHJhY2suY3NzKHMpOihzPXt9LCExPT09by5jc3NUcmFuc2l0aW9ucz8oc1tvLmFuaW1UeXBlXT1cInRyYW5zbGF0ZShcIitlK1wiLCBcIit0K1wiKVwiLG8uJHNsaWRlVHJhY2suY3NzKHMpKTooc1tvLmFuaW1UeXBlXT1cInRyYW5zbGF0ZTNkKFwiK2UrXCIsIFwiK3QrXCIsIDBweClcIixvLiRzbGlkZVRyYWNrLmNzcyhzKSkpfSxlLnByb3RvdHlwZS5zZXREaW1lbnNpb25zPWZ1bmN0aW9uKCl7dmFyIGk9dGhpczshMT09PWkub3B0aW9ucy52ZXJ0aWNhbD8hMD09PWkub3B0aW9ucy5jZW50ZXJNb2RlJiZpLiRsaXN0LmNzcyh7cGFkZGluZzpcIjBweCBcIitpLm9wdGlvbnMuY2VudGVyUGFkZGluZ30pOihpLiRsaXN0LmhlaWdodChpLiRzbGlkZXMuZmlyc3QoKS5vdXRlckhlaWdodCghMCkqaS5vcHRpb25zLnNsaWRlc1RvU2hvdyksITA9PT1pLm9wdGlvbnMuY2VudGVyTW9kZSYmaS4kbGlzdC5jc3Moe3BhZGRpbmc6aS5vcHRpb25zLmNlbnRlclBhZGRpbmcrXCIgMHB4XCJ9KSksaS5saXN0V2lkdGg9aS4kbGlzdC53aWR0aCgpLGkubGlzdEhlaWdodD1pLiRsaXN0LmhlaWdodCgpLCExPT09aS5vcHRpb25zLnZlcnRpY2FsJiYhMT09PWkub3B0aW9ucy52YXJpYWJsZVdpZHRoPyhpLnNsaWRlV2lkdGg9TWF0aC5jZWlsKGkubGlzdFdpZHRoL2kub3B0aW9ucy5zbGlkZXNUb1Nob3cpLGkuJHNsaWRlVHJhY2sud2lkdGgoTWF0aC5jZWlsKGkuc2xpZGVXaWR0aCppLiRzbGlkZVRyYWNrLmNoaWxkcmVuKFwiLnNsaWNrLXNsaWRlXCIpLmxlbmd0aCkpKTohMD09PWkub3B0aW9ucy52YXJpYWJsZVdpZHRoP2kuJHNsaWRlVHJhY2sud2lkdGgoNWUzKmkuc2xpZGVDb3VudCk6KGkuc2xpZGVXaWR0aD1NYXRoLmNlaWwoaS5saXN0V2lkdGgpLGkuJHNsaWRlVHJhY2suaGVpZ2h0KE1hdGguY2VpbChpLiRzbGlkZXMuZmlyc3QoKS5vdXRlckhlaWdodCghMCkqaS4kc2xpZGVUcmFjay5jaGlsZHJlbihcIi5zbGljay1zbGlkZVwiKS5sZW5ndGgpKSk7dmFyIGU9aS4kc2xpZGVzLmZpcnN0KCkub3V0ZXJXaWR0aCghMCktaS4kc2xpZGVzLmZpcnN0KCkud2lkdGgoKTshMT09PWkub3B0aW9ucy52YXJpYWJsZVdpZHRoJiZpLiRzbGlkZVRyYWNrLmNoaWxkcmVuKFwiLnNsaWNrLXNsaWRlXCIpLndpZHRoKGkuc2xpZGVXaWR0aC1lKX0sZS5wcm90b3R5cGUuc2V0RmFkZT1mdW5jdGlvbigpe3ZhciBlLHQ9dGhpczt0LiRzbGlkZXMuZWFjaChmdW5jdGlvbihvLHMpe2U9dC5zbGlkZVdpZHRoKm8qLTEsITA9PT10Lm9wdGlvbnMucnRsP2kocykuY3NzKHtwb3NpdGlvbjpcInJlbGF0aXZlXCIscmlnaHQ6ZSx0b3A6MCx6SW5kZXg6dC5vcHRpb25zLnpJbmRleC0yLG9wYWNpdHk6MH0pOmkocykuY3NzKHtwb3NpdGlvbjpcInJlbGF0aXZlXCIsbGVmdDplLHRvcDowLHpJbmRleDp0Lm9wdGlvbnMuekluZGV4LTIsb3BhY2l0eTowfSl9KSx0LiRzbGlkZXMuZXEodC5jdXJyZW50U2xpZGUpLmNzcyh7ekluZGV4OnQub3B0aW9ucy56SW5kZXgtMSxvcGFjaXR5OjF9KX0sZS5wcm90b3R5cGUuc2V0SGVpZ2h0PWZ1bmN0aW9uKCl7dmFyIGk9dGhpcztpZigxPT09aS5vcHRpb25zLnNsaWRlc1RvU2hvdyYmITA9PT1pLm9wdGlvbnMuYWRhcHRpdmVIZWlnaHQmJiExPT09aS5vcHRpb25zLnZlcnRpY2FsKXt2YXIgZT1pLiRzbGlkZXMuZXEoaS5jdXJyZW50U2xpZGUpLm91dGVySGVpZ2h0KCEwKTtpLiRsaXN0LmNzcyhcImhlaWdodFwiLGUpfX0sZS5wcm90b3R5cGUuc2V0T3B0aW9uPWUucHJvdG90eXBlLnNsaWNrU2V0T3B0aW9uPWZ1bmN0aW9uKCl7dmFyIGUsdCxvLHMsbixyPXRoaXMsbD0hMTtpZihcIm9iamVjdFwiPT09aS50eXBlKGFyZ3VtZW50c1swXSk/KG89YXJndW1lbnRzWzBdLGw9YXJndW1lbnRzWzFdLG49XCJtdWx0aXBsZVwiKTpcInN0cmluZ1wiPT09aS50eXBlKGFyZ3VtZW50c1swXSkmJihvPWFyZ3VtZW50c1swXSxzPWFyZ3VtZW50c1sxXSxsPWFyZ3VtZW50c1syXSxcInJlc3BvbnNpdmVcIj09PWFyZ3VtZW50c1swXSYmXCJhcnJheVwiPT09aS50eXBlKGFyZ3VtZW50c1sxXSk/bj1cInJlc3BvbnNpdmVcIjp2b2lkIDAhPT1hcmd1bWVudHNbMV0mJihuPVwic2luZ2xlXCIpKSxcInNpbmdsZVwiPT09bilyLm9wdGlvbnNbb109cztlbHNlIGlmKFwibXVsdGlwbGVcIj09PW4paS5lYWNoKG8sZnVuY3Rpb24oaSxlKXtyLm9wdGlvbnNbaV09ZX0pO2Vsc2UgaWYoXCJyZXNwb25zaXZlXCI9PT1uKWZvcih0IGluIHMpaWYoXCJhcnJheVwiIT09aS50eXBlKHIub3B0aW9ucy5yZXNwb25zaXZlKSlyLm9wdGlvbnMucmVzcG9uc2l2ZT1bc1t0XV07ZWxzZXtmb3IoZT1yLm9wdGlvbnMucmVzcG9uc2l2ZS5sZW5ndGgtMTtlPj0wOylyLm9wdGlvbnMucmVzcG9uc2l2ZVtlXS5icmVha3BvaW50PT09c1t0XS5icmVha3BvaW50JiZyLm9wdGlvbnMucmVzcG9uc2l2ZS5zcGxpY2UoZSwxKSxlLS07ci5vcHRpb25zLnJlc3BvbnNpdmUucHVzaChzW3RdKX1sJiYoci51bmxvYWQoKSxyLnJlaW5pdCgpKX0sZS5wcm90b3R5cGUuc2V0UG9zaXRpb249ZnVuY3Rpb24oKXt2YXIgaT10aGlzO2kuc2V0RGltZW5zaW9ucygpLGkuc2V0SGVpZ2h0KCksITE9PT1pLm9wdGlvbnMuZmFkZT9pLnNldENTUyhpLmdldExlZnQoaS5jdXJyZW50U2xpZGUpKTppLnNldEZhZGUoKSxpLiRzbGlkZXIudHJpZ2dlcihcInNldFBvc2l0aW9uXCIsW2ldKX0sZS5wcm90b3R5cGUuc2V0UHJvcHM9ZnVuY3Rpb24oKXt2YXIgaT10aGlzLGU9ZG9jdW1lbnQuYm9keS5zdHlsZTtpLnBvc2l0aW9uUHJvcD0hMD09PWkub3B0aW9ucy52ZXJ0aWNhbD9cInRvcFwiOlwibGVmdFwiLFwidG9wXCI9PT1pLnBvc2l0aW9uUHJvcD9pLiRzbGlkZXIuYWRkQ2xhc3MoXCJzbGljay12ZXJ0aWNhbFwiKTppLiRzbGlkZXIucmVtb3ZlQ2xhc3MoXCJzbGljay12ZXJ0aWNhbFwiKSx2b2lkIDA9PT1lLldlYmtpdFRyYW5zaXRpb24mJnZvaWQgMD09PWUuTW96VHJhbnNpdGlvbiYmdm9pZCAwPT09ZS5tc1RyYW5zaXRpb258fCEwPT09aS5vcHRpb25zLnVzZUNTUyYmKGkuY3NzVHJhbnNpdGlvbnM9ITApLGkub3B0aW9ucy5mYWRlJiYoXCJudW1iZXJcIj09dHlwZW9mIGkub3B0aW9ucy56SW5kZXg/aS5vcHRpb25zLnpJbmRleDwzJiYoaS5vcHRpb25zLnpJbmRleD0zKTppLm9wdGlvbnMuekluZGV4PWkuZGVmYXVsdHMuekluZGV4KSx2b2lkIDAhPT1lLk9UcmFuc2Zvcm0mJihpLmFuaW1UeXBlPVwiT1RyYW5zZm9ybVwiLGkudHJhbnNmb3JtVHlwZT1cIi1vLXRyYW5zZm9ybVwiLGkudHJhbnNpdGlvblR5cGU9XCJPVHJhbnNpdGlvblwiLHZvaWQgMD09PWUucGVyc3BlY3RpdmVQcm9wZXJ0eSYmdm9pZCAwPT09ZS53ZWJraXRQZXJzcGVjdGl2ZSYmKGkuYW5pbVR5cGU9ITEpKSx2b2lkIDAhPT1lLk1velRyYW5zZm9ybSYmKGkuYW5pbVR5cGU9XCJNb3pUcmFuc2Zvcm1cIixpLnRyYW5zZm9ybVR5cGU9XCItbW96LXRyYW5zZm9ybVwiLGkudHJhbnNpdGlvblR5cGU9XCJNb3pUcmFuc2l0aW9uXCIsdm9pZCAwPT09ZS5wZXJzcGVjdGl2ZVByb3BlcnR5JiZ2b2lkIDA9PT1lLk1velBlcnNwZWN0aXZlJiYoaS5hbmltVHlwZT0hMSkpLHZvaWQgMCE9PWUud2Via2l0VHJhbnNmb3JtJiYoaS5hbmltVHlwZT1cIndlYmtpdFRyYW5zZm9ybVwiLGkudHJhbnNmb3JtVHlwZT1cIi13ZWJraXQtdHJhbnNmb3JtXCIsaS50cmFuc2l0aW9uVHlwZT1cIndlYmtpdFRyYW5zaXRpb25cIix2b2lkIDA9PT1lLnBlcnNwZWN0aXZlUHJvcGVydHkmJnZvaWQgMD09PWUud2Via2l0UGVyc3BlY3RpdmUmJihpLmFuaW1UeXBlPSExKSksdm9pZCAwIT09ZS5tc1RyYW5zZm9ybSYmKGkuYW5pbVR5cGU9XCJtc1RyYW5zZm9ybVwiLGkudHJhbnNmb3JtVHlwZT1cIi1tcy10cmFuc2Zvcm1cIixpLnRyYW5zaXRpb25UeXBlPVwibXNUcmFuc2l0aW9uXCIsdm9pZCAwPT09ZS5tc1RyYW5zZm9ybSYmKGkuYW5pbVR5cGU9ITEpKSx2b2lkIDAhPT1lLnRyYW5zZm9ybSYmITEhPT1pLmFuaW1UeXBlJiYoaS5hbmltVHlwZT1cInRyYW5zZm9ybVwiLGkudHJhbnNmb3JtVHlwZT1cInRyYW5zZm9ybVwiLGkudHJhbnNpdGlvblR5cGU9XCJ0cmFuc2l0aW9uXCIpLGkudHJhbnNmb3Jtc0VuYWJsZWQ9aS5vcHRpb25zLnVzZVRyYW5zZm9ybSYmbnVsbCE9PWkuYW5pbVR5cGUmJiExIT09aS5hbmltVHlwZX0sZS5wcm90b3R5cGUuc2V0U2xpZGVDbGFzc2VzPWZ1bmN0aW9uKGkpe3ZhciBlLHQsbyxzLG49dGhpcztpZih0PW4uJHNsaWRlci5maW5kKFwiLnNsaWNrLXNsaWRlXCIpLnJlbW92ZUNsYXNzKFwic2xpY2stYWN0aXZlIHNsaWNrLWNlbnRlciBzbGljay1jdXJyZW50XCIpLmF0dHIoXCJhcmlhLWhpZGRlblwiLFwidHJ1ZVwiKSxuLiRzbGlkZXMuZXEoaSkuYWRkQ2xhc3MoXCJzbGljay1jdXJyZW50XCIpLCEwPT09bi5vcHRpb25zLmNlbnRlck1vZGUpe3ZhciByPW4ub3B0aW9ucy5zbGlkZXNUb1Nob3clMj09MD8xOjA7ZT1NYXRoLmZsb29yKG4ub3B0aW9ucy5zbGlkZXNUb1Nob3cvMiksITA9PT1uLm9wdGlvbnMuaW5maW5pdGUmJihpPj1lJiZpPD1uLnNsaWRlQ291bnQtMS1lP24uJHNsaWRlcy5zbGljZShpLWUrcixpK2UrMSkuYWRkQ2xhc3MoXCJzbGljay1hY3RpdmVcIikuYXR0cihcImFyaWEtaGlkZGVuXCIsXCJmYWxzZVwiKToobz1uLm9wdGlvbnMuc2xpZGVzVG9TaG93K2ksdC5zbGljZShvLWUrMStyLG8rZSsyKS5hZGRDbGFzcyhcInNsaWNrLWFjdGl2ZVwiKS5hdHRyKFwiYXJpYS1oaWRkZW5cIixcImZhbHNlXCIpKSwwPT09aT90LmVxKHQubGVuZ3RoLTEtbi5vcHRpb25zLnNsaWRlc1RvU2hvdykuYWRkQ2xhc3MoXCJzbGljay1jZW50ZXJcIik6aT09PW4uc2xpZGVDb3VudC0xJiZ0LmVxKG4ub3B0aW9ucy5zbGlkZXNUb1Nob3cpLmFkZENsYXNzKFwic2xpY2stY2VudGVyXCIpKSxuLiRzbGlkZXMuZXEoaSkuYWRkQ2xhc3MoXCJzbGljay1jZW50ZXJcIil9ZWxzZSBpPj0wJiZpPD1uLnNsaWRlQ291bnQtbi5vcHRpb25zLnNsaWRlc1RvU2hvdz9uLiRzbGlkZXMuc2xpY2UoaSxpK24ub3B0aW9ucy5zbGlkZXNUb1Nob3cpLmFkZENsYXNzKFwic2xpY2stYWN0aXZlXCIpLmF0dHIoXCJhcmlhLWhpZGRlblwiLFwiZmFsc2VcIik6dC5sZW5ndGg8PW4ub3B0aW9ucy5zbGlkZXNUb1Nob3c/dC5hZGRDbGFzcyhcInNsaWNrLWFjdGl2ZVwiKS5hdHRyKFwiYXJpYS1oaWRkZW5cIixcImZhbHNlXCIpOihzPW4uc2xpZGVDb3VudCVuLm9wdGlvbnMuc2xpZGVzVG9TaG93LG89ITA9PT1uLm9wdGlvbnMuaW5maW5pdGU/bi5vcHRpb25zLnNsaWRlc1RvU2hvdytpOmksbi5vcHRpb25zLnNsaWRlc1RvU2hvdz09bi5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsJiZuLnNsaWRlQ291bnQtaTxuLm9wdGlvbnMuc2xpZGVzVG9TaG93P3Quc2xpY2Uoby0obi5vcHRpb25zLnNsaWRlc1RvU2hvdy1zKSxvK3MpLmFkZENsYXNzKFwic2xpY2stYWN0aXZlXCIpLmF0dHIoXCJhcmlhLWhpZGRlblwiLFwiZmFsc2VcIik6dC5zbGljZShvLG8rbi5vcHRpb25zLnNsaWRlc1RvU2hvdykuYWRkQ2xhc3MoXCJzbGljay1hY3RpdmVcIikuYXR0cihcImFyaWEtaGlkZGVuXCIsXCJmYWxzZVwiKSk7XCJvbmRlbWFuZFwiIT09bi5vcHRpb25zLmxhenlMb2FkJiZcImFudGljaXBhdGVkXCIhPT1uLm9wdGlvbnMubGF6eUxvYWR8fG4ubGF6eUxvYWQoKX0sZS5wcm90b3R5cGUuc2V0dXBJbmZpbml0ZT1mdW5jdGlvbigpe3ZhciBlLHQsbyxzPXRoaXM7aWYoITA9PT1zLm9wdGlvbnMuZmFkZSYmKHMub3B0aW9ucy5jZW50ZXJNb2RlPSExKSwhMD09PXMub3B0aW9ucy5pbmZpbml0ZSYmITE9PT1zLm9wdGlvbnMuZmFkZSYmKHQ9bnVsbCxzLnNsaWRlQ291bnQ+cy5vcHRpb25zLnNsaWRlc1RvU2hvdykpe2ZvcihvPSEwPT09cy5vcHRpb25zLmNlbnRlck1vZGU/cy5vcHRpb25zLnNsaWRlc1RvU2hvdysxOnMub3B0aW9ucy5zbGlkZXNUb1Nob3csZT1zLnNsaWRlQ291bnQ7ZT5zLnNsaWRlQ291bnQtbztlLT0xKXQ9ZS0xLGkocy4kc2xpZGVzW3RdKS5jbG9uZSghMCkuYXR0cihcImlkXCIsXCJcIikuYXR0cihcImRhdGEtc2xpY2staW5kZXhcIix0LXMuc2xpZGVDb3VudCkucHJlcGVuZFRvKHMuJHNsaWRlVHJhY2spLmFkZENsYXNzKFwic2xpY2stY2xvbmVkXCIpO2ZvcihlPTA7ZTxvK3Muc2xpZGVDb3VudDtlKz0xKXQ9ZSxpKHMuJHNsaWRlc1t0XSkuY2xvbmUoITApLmF0dHIoXCJpZFwiLFwiXCIpLmF0dHIoXCJkYXRhLXNsaWNrLWluZGV4XCIsdCtzLnNsaWRlQ291bnQpLmFwcGVuZFRvKHMuJHNsaWRlVHJhY2spLmFkZENsYXNzKFwic2xpY2stY2xvbmVkXCIpO3MuJHNsaWRlVHJhY2suZmluZChcIi5zbGljay1jbG9uZWRcIikuZmluZChcIltpZF1cIikuZWFjaChmdW5jdGlvbigpe2kodGhpcykuYXR0cihcImlkXCIsXCJcIil9KX19LGUucHJvdG90eXBlLmludGVycnVwdD1mdW5jdGlvbihpKXt2YXIgZT10aGlzO2l8fGUuYXV0b1BsYXkoKSxlLmludGVycnVwdGVkPWl9LGUucHJvdG90eXBlLnNlbGVjdEhhbmRsZXI9ZnVuY3Rpb24oZSl7dmFyIHQ9dGhpcyxvPWkoZS50YXJnZXQpLmlzKFwiLnNsaWNrLXNsaWRlXCIpP2koZS50YXJnZXQpOmkoZS50YXJnZXQpLnBhcmVudHMoXCIuc2xpY2stc2xpZGVcIikscz1wYXJzZUludChvLmF0dHIoXCJkYXRhLXNsaWNrLWluZGV4XCIpKTtzfHwocz0wKSx0LnNsaWRlQ291bnQ8PXQub3B0aW9ucy5zbGlkZXNUb1Nob3c/dC5zbGlkZUhhbmRsZXIocywhMSwhMCk6dC5zbGlkZUhhbmRsZXIocyl9LGUucHJvdG90eXBlLnNsaWRlSGFuZGxlcj1mdW5jdGlvbihpLGUsdCl7dmFyIG8scyxuLHIsbCxkPW51bGwsYT10aGlzO2lmKGU9ZXx8ITEsISghMD09PWEuYW5pbWF0aW5nJiYhMD09PWEub3B0aW9ucy53YWl0Rm9yQW5pbWF0ZXx8ITA9PT1hLm9wdGlvbnMuZmFkZSYmYS5jdXJyZW50U2xpZGU9PT1pKSlpZighMT09PWUmJmEuYXNOYXZGb3IoaSksbz1pLGQ9YS5nZXRMZWZ0KG8pLHI9YS5nZXRMZWZ0KGEuY3VycmVudFNsaWRlKSxhLmN1cnJlbnRMZWZ0PW51bGw9PT1hLnN3aXBlTGVmdD9yOmEuc3dpcGVMZWZ0LCExPT09YS5vcHRpb25zLmluZmluaXRlJiYhMT09PWEub3B0aW9ucy5jZW50ZXJNb2RlJiYoaTwwfHxpPmEuZ2V0RG90Q291bnQoKSphLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGwpKSExPT09YS5vcHRpb25zLmZhZGUmJihvPWEuY3VycmVudFNsaWRlLCEwIT09dD9hLmFuaW1hdGVTbGlkZShyLGZ1bmN0aW9uKCl7YS5wb3N0U2xpZGUobyl9KTphLnBvc3RTbGlkZShvKSk7ZWxzZSBpZighMT09PWEub3B0aW9ucy5pbmZpbml0ZSYmITA9PT1hLm9wdGlvbnMuY2VudGVyTW9kZSYmKGk8MHx8aT5hLnNsaWRlQ291bnQtYS5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsKSkhMT09PWEub3B0aW9ucy5mYWRlJiYobz1hLmN1cnJlbnRTbGlkZSwhMCE9PXQ/YS5hbmltYXRlU2xpZGUocixmdW5jdGlvbigpe2EucG9zdFNsaWRlKG8pfSk6YS5wb3N0U2xpZGUobykpO2Vsc2V7aWYoYS5vcHRpb25zLmF1dG9wbGF5JiZjbGVhckludGVydmFsKGEuYXV0b1BsYXlUaW1lcikscz1vPDA/YS5zbGlkZUNvdW50JWEub3B0aW9ucy5zbGlkZXNUb1Njcm9sbCE9MD9hLnNsaWRlQ291bnQtYS5zbGlkZUNvdW50JWEub3B0aW9ucy5zbGlkZXNUb1Njcm9sbDphLnNsaWRlQ291bnQrbzpvPj1hLnNsaWRlQ291bnQ/YS5zbGlkZUNvdW50JWEub3B0aW9ucy5zbGlkZXNUb1Njcm9sbCE9MD8wOm8tYS5zbGlkZUNvdW50Om8sYS5hbmltYXRpbmc9ITAsYS4kc2xpZGVyLnRyaWdnZXIoXCJiZWZvcmVDaGFuZ2VcIixbYSxhLmN1cnJlbnRTbGlkZSxzXSksbj1hLmN1cnJlbnRTbGlkZSxhLmN1cnJlbnRTbGlkZT1zLGEuc2V0U2xpZGVDbGFzc2VzKGEuY3VycmVudFNsaWRlKSxhLm9wdGlvbnMuYXNOYXZGb3ImJihsPShsPWEuZ2V0TmF2VGFyZ2V0KCkpLnNsaWNrKFwiZ2V0U2xpY2tcIikpLnNsaWRlQ291bnQ8PWwub3B0aW9ucy5zbGlkZXNUb1Nob3cmJmwuc2V0U2xpZGVDbGFzc2VzKGEuY3VycmVudFNsaWRlKSxhLnVwZGF0ZURvdHMoKSxhLnVwZGF0ZUFycm93cygpLCEwPT09YS5vcHRpb25zLmZhZGUpcmV0dXJuITAhPT10PyhhLmZhZGVTbGlkZU91dChuKSxhLmZhZGVTbGlkZShzLGZ1bmN0aW9uKCl7YS5wb3N0U2xpZGUocyl9KSk6YS5wb3N0U2xpZGUocyksdm9pZCBhLmFuaW1hdGVIZWlnaHQoKTshMCE9PXQ/YS5hbmltYXRlU2xpZGUoZCxmdW5jdGlvbigpe2EucG9zdFNsaWRlKHMpfSk6YS5wb3N0U2xpZGUocyl9fSxlLnByb3RvdHlwZS5zdGFydExvYWQ9ZnVuY3Rpb24oKXt2YXIgaT10aGlzOyEwPT09aS5vcHRpb25zLmFycm93cyYmaS5zbGlkZUNvdW50Pmkub3B0aW9ucy5zbGlkZXNUb1Nob3cmJihpLiRwcmV2QXJyb3cuaGlkZSgpLGkuJG5leHRBcnJvdy5oaWRlKCkpLCEwPT09aS5vcHRpb25zLmRvdHMmJmkuc2xpZGVDb3VudD5pLm9wdGlvbnMuc2xpZGVzVG9TaG93JiZpLiRkb3RzLmhpZGUoKSxpLiRzbGlkZXIuYWRkQ2xhc3MoXCJzbGljay1sb2FkaW5nXCIpfSxlLnByb3RvdHlwZS5zd2lwZURpcmVjdGlvbj1mdW5jdGlvbigpe3ZhciBpLGUsdCxvLHM9dGhpcztyZXR1cm4gaT1zLnRvdWNoT2JqZWN0LnN0YXJ0WC1zLnRvdWNoT2JqZWN0LmN1clgsZT1zLnRvdWNoT2JqZWN0LnN0YXJ0WS1zLnRvdWNoT2JqZWN0LmN1clksdD1NYXRoLmF0YW4yKGUsaSksKG89TWF0aC5yb3VuZCgxODAqdC9NYXRoLlBJKSk8MCYmKG89MzYwLU1hdGguYWJzKG8pKSxvPD00NSYmbz49MD8hMT09PXMub3B0aW9ucy5ydGw/XCJsZWZ0XCI6XCJyaWdodFwiOm88PTM2MCYmbz49MzE1PyExPT09cy5vcHRpb25zLnJ0bD9cImxlZnRcIjpcInJpZ2h0XCI6bz49MTM1JiZvPD0yMjU/ITE9PT1zLm9wdGlvbnMucnRsP1wicmlnaHRcIjpcImxlZnRcIjohMD09PXMub3B0aW9ucy52ZXJ0aWNhbFN3aXBpbmc/bz49MzUmJm88PTEzNT9cImRvd25cIjpcInVwXCI6XCJ2ZXJ0aWNhbFwifSxlLnByb3RvdHlwZS5zd2lwZUVuZD1mdW5jdGlvbihpKXt2YXIgZSx0LG89dGhpcztpZihvLmRyYWdnaW5nPSExLG8uc3dpcGluZz0hMSxvLnNjcm9sbGluZylyZXR1cm4gby5zY3JvbGxpbmc9ITEsITE7aWYoby5pbnRlcnJ1cHRlZD0hMSxvLnNob3VsZENsaWNrPSEoby50b3VjaE9iamVjdC5zd2lwZUxlbmd0aD4xMCksdm9pZCAwPT09by50b3VjaE9iamVjdC5jdXJYKXJldHVybiExO2lmKCEwPT09by50b3VjaE9iamVjdC5lZGdlSGl0JiZvLiRzbGlkZXIudHJpZ2dlcihcImVkZ2VcIixbbyxvLnN3aXBlRGlyZWN0aW9uKCldKSxvLnRvdWNoT2JqZWN0LnN3aXBlTGVuZ3RoPj1vLnRvdWNoT2JqZWN0Lm1pblN3aXBlKXtzd2l0Y2godD1vLnN3aXBlRGlyZWN0aW9uKCkpe2Nhc2VcImxlZnRcIjpjYXNlXCJkb3duXCI6ZT1vLm9wdGlvbnMuc3dpcGVUb1NsaWRlP28uY2hlY2tOYXZpZ2FibGUoby5jdXJyZW50U2xpZGUrby5nZXRTbGlkZUNvdW50KCkpOm8uY3VycmVudFNsaWRlK28uZ2V0U2xpZGVDb3VudCgpLG8uY3VycmVudERpcmVjdGlvbj0wO2JyZWFrO2Nhc2VcInJpZ2h0XCI6Y2FzZVwidXBcIjplPW8ub3B0aW9ucy5zd2lwZVRvU2xpZGU/by5jaGVja05hdmlnYWJsZShvLmN1cnJlbnRTbGlkZS1vLmdldFNsaWRlQ291bnQoKSk6by5jdXJyZW50U2xpZGUtby5nZXRTbGlkZUNvdW50KCksby5jdXJyZW50RGlyZWN0aW9uPTF9XCJ2ZXJ0aWNhbFwiIT10JiYoby5zbGlkZUhhbmRsZXIoZSksby50b3VjaE9iamVjdD17fSxvLiRzbGlkZXIudHJpZ2dlcihcInN3aXBlXCIsW28sdF0pKX1lbHNlIG8udG91Y2hPYmplY3Quc3RhcnRYIT09by50b3VjaE9iamVjdC5jdXJYJiYoby5zbGlkZUhhbmRsZXIoby5jdXJyZW50U2xpZGUpLG8udG91Y2hPYmplY3Q9e30pfSxlLnByb3RvdHlwZS5zd2lwZUhhbmRsZXI9ZnVuY3Rpb24oaSl7dmFyIGU9dGhpcztpZighKCExPT09ZS5vcHRpb25zLnN3aXBlfHxcIm9udG91Y2hlbmRcImluIGRvY3VtZW50JiYhMT09PWUub3B0aW9ucy5zd2lwZXx8ITE9PT1lLm9wdGlvbnMuZHJhZ2dhYmxlJiYtMSE9PWkudHlwZS5pbmRleE9mKFwibW91c2VcIikpKXN3aXRjaChlLnRvdWNoT2JqZWN0LmZpbmdlckNvdW50PWkub3JpZ2luYWxFdmVudCYmdm9pZCAwIT09aS5vcmlnaW5hbEV2ZW50LnRvdWNoZXM/aS5vcmlnaW5hbEV2ZW50LnRvdWNoZXMubGVuZ3RoOjEsZS50b3VjaE9iamVjdC5taW5Td2lwZT1lLmxpc3RXaWR0aC9lLm9wdGlvbnMudG91Y2hUaHJlc2hvbGQsITA9PT1lLm9wdGlvbnMudmVydGljYWxTd2lwaW5nJiYoZS50b3VjaE9iamVjdC5taW5Td2lwZT1lLmxpc3RIZWlnaHQvZS5vcHRpb25zLnRvdWNoVGhyZXNob2xkKSxpLmRhdGEuYWN0aW9uKXtjYXNlXCJzdGFydFwiOmUuc3dpcGVTdGFydChpKTticmVhaztjYXNlXCJtb3ZlXCI6ZS5zd2lwZU1vdmUoaSk7YnJlYWs7Y2FzZVwiZW5kXCI6ZS5zd2lwZUVuZChpKX19LGUucHJvdG90eXBlLnN3aXBlTW92ZT1mdW5jdGlvbihpKXt2YXIgZSx0LG8scyxuLHIsbD10aGlzO3JldHVybiBuPXZvaWQgMCE9PWkub3JpZ2luYWxFdmVudD9pLm9yaWdpbmFsRXZlbnQudG91Y2hlczpudWxsLCEoIWwuZHJhZ2dpbmd8fGwuc2Nyb2xsaW5nfHxuJiYxIT09bi5sZW5ndGgpJiYoZT1sLmdldExlZnQobC5jdXJyZW50U2xpZGUpLGwudG91Y2hPYmplY3QuY3VyWD12b2lkIDAhPT1uP25bMF0ucGFnZVg6aS5jbGllbnRYLGwudG91Y2hPYmplY3QuY3VyWT12b2lkIDAhPT1uP25bMF0ucGFnZVk6aS5jbGllbnRZLGwudG91Y2hPYmplY3Quc3dpcGVMZW5ndGg9TWF0aC5yb3VuZChNYXRoLnNxcnQoTWF0aC5wb3cobC50b3VjaE9iamVjdC5jdXJYLWwudG91Y2hPYmplY3Quc3RhcnRYLDIpKSkscj1NYXRoLnJvdW5kKE1hdGguc3FydChNYXRoLnBvdyhsLnRvdWNoT2JqZWN0LmN1clktbC50b3VjaE9iamVjdC5zdGFydFksMikpKSwhbC5vcHRpb25zLnZlcnRpY2FsU3dpcGluZyYmIWwuc3dpcGluZyYmcj40PyhsLnNjcm9sbGluZz0hMCwhMSk6KCEwPT09bC5vcHRpb25zLnZlcnRpY2FsU3dpcGluZyYmKGwudG91Y2hPYmplY3Quc3dpcGVMZW5ndGg9ciksdD1sLnN3aXBlRGlyZWN0aW9uKCksdm9pZCAwIT09aS5vcmlnaW5hbEV2ZW50JiZsLnRvdWNoT2JqZWN0LnN3aXBlTGVuZ3RoPjQmJihsLnN3aXBpbmc9ITAsaS5wcmV2ZW50RGVmYXVsdCgpKSxzPSghMT09PWwub3B0aW9ucy5ydGw/MTotMSkqKGwudG91Y2hPYmplY3QuY3VyWD5sLnRvdWNoT2JqZWN0LnN0YXJ0WD8xOi0xKSwhMD09PWwub3B0aW9ucy52ZXJ0aWNhbFN3aXBpbmcmJihzPWwudG91Y2hPYmplY3QuY3VyWT5sLnRvdWNoT2JqZWN0LnN0YXJ0WT8xOi0xKSxvPWwudG91Y2hPYmplY3Quc3dpcGVMZW5ndGgsbC50b3VjaE9iamVjdC5lZGdlSGl0PSExLCExPT09bC5vcHRpb25zLmluZmluaXRlJiYoMD09PWwuY3VycmVudFNsaWRlJiZcInJpZ2h0XCI9PT10fHxsLmN1cnJlbnRTbGlkZT49bC5nZXREb3RDb3VudCgpJiZcImxlZnRcIj09PXQpJiYobz1sLnRvdWNoT2JqZWN0LnN3aXBlTGVuZ3RoKmwub3B0aW9ucy5lZGdlRnJpY3Rpb24sbC50b3VjaE9iamVjdC5lZGdlSGl0PSEwKSwhMT09PWwub3B0aW9ucy52ZXJ0aWNhbD9sLnN3aXBlTGVmdD1lK28qczpsLnN3aXBlTGVmdD1lK28qKGwuJGxpc3QuaGVpZ2h0KCkvbC5saXN0V2lkdGgpKnMsITA9PT1sLm9wdGlvbnMudmVydGljYWxTd2lwaW5nJiYobC5zd2lwZUxlZnQ9ZStvKnMpLCEwIT09bC5vcHRpb25zLmZhZGUmJiExIT09bC5vcHRpb25zLnRvdWNoTW92ZSYmKCEwPT09bC5hbmltYXRpbmc/KGwuc3dpcGVMZWZ0PW51bGwsITEpOnZvaWQgbC5zZXRDU1MobC5zd2lwZUxlZnQpKSkpfSxlLnByb3RvdHlwZS5zd2lwZVN0YXJ0PWZ1bmN0aW9uKGkpe3ZhciBlLHQ9dGhpcztpZih0LmludGVycnVwdGVkPSEwLDEhPT10LnRvdWNoT2JqZWN0LmZpbmdlckNvdW50fHx0LnNsaWRlQ291bnQ8PXQub3B0aW9ucy5zbGlkZXNUb1Nob3cpcmV0dXJuIHQudG91Y2hPYmplY3Q9e30sITE7dm9pZCAwIT09aS5vcmlnaW5hbEV2ZW50JiZ2b2lkIDAhPT1pLm9yaWdpbmFsRXZlbnQudG91Y2hlcyYmKGU9aS5vcmlnaW5hbEV2ZW50LnRvdWNoZXNbMF0pLHQudG91Y2hPYmplY3Quc3RhcnRYPXQudG91Y2hPYmplY3QuY3VyWD12b2lkIDAhPT1lP2UucGFnZVg6aS5jbGllbnRYLHQudG91Y2hPYmplY3Quc3RhcnRZPXQudG91Y2hPYmplY3QuY3VyWT12b2lkIDAhPT1lP2UucGFnZVk6aS5jbGllbnRZLHQuZHJhZ2dpbmc9ITB9LGUucHJvdG90eXBlLnVuZmlsdGVyU2xpZGVzPWUucHJvdG90eXBlLnNsaWNrVW5maWx0ZXI9ZnVuY3Rpb24oKXt2YXIgaT10aGlzO251bGwhPT1pLiRzbGlkZXNDYWNoZSYmKGkudW5sb2FkKCksaS4kc2xpZGVUcmFjay5jaGlsZHJlbih0aGlzLm9wdGlvbnMuc2xpZGUpLmRldGFjaCgpLGkuJHNsaWRlc0NhY2hlLmFwcGVuZFRvKGkuJHNsaWRlVHJhY2spLGkucmVpbml0KCkpfSxlLnByb3RvdHlwZS51bmxvYWQ9ZnVuY3Rpb24oKXt2YXIgZT10aGlzO2koXCIuc2xpY2stY2xvbmVkXCIsZS4kc2xpZGVyKS5yZW1vdmUoKSxlLiRkb3RzJiZlLiRkb3RzLnJlbW92ZSgpLGUuJHByZXZBcnJvdyYmZS5odG1sRXhwci50ZXN0KGUub3B0aW9ucy5wcmV2QXJyb3cpJiZlLiRwcmV2QXJyb3cucmVtb3ZlKCksZS4kbmV4dEFycm93JiZlLmh0bWxFeHByLnRlc3QoZS5vcHRpb25zLm5leHRBcnJvdykmJmUuJG5leHRBcnJvdy5yZW1vdmUoKSxlLiRzbGlkZXMucmVtb3ZlQ2xhc3MoXCJzbGljay1zbGlkZSBzbGljay1hY3RpdmUgc2xpY2stdmlzaWJsZSBzbGljay1jdXJyZW50XCIpLmF0dHIoXCJhcmlhLWhpZGRlblwiLFwidHJ1ZVwiKS5jc3MoXCJ3aWR0aFwiLFwiXCIpfSxlLnByb3RvdHlwZS51bnNsaWNrPWZ1bmN0aW9uKGkpe3ZhciBlPXRoaXM7ZS4kc2xpZGVyLnRyaWdnZXIoXCJ1bnNsaWNrXCIsW2UsaV0pLGUuZGVzdHJveSgpfSxlLnByb3RvdHlwZS51cGRhdGVBcnJvd3M9ZnVuY3Rpb24oKXt2YXIgaT10aGlzO01hdGguZmxvb3IoaS5vcHRpb25zLnNsaWRlc1RvU2hvdy8yKSwhMD09PWkub3B0aW9ucy5hcnJvd3MmJmkuc2xpZGVDb3VudD5pLm9wdGlvbnMuc2xpZGVzVG9TaG93JiYhaS5vcHRpb25zLmluZmluaXRlJiYoaS4kcHJldkFycm93LnJlbW92ZUNsYXNzKFwic2xpY2stZGlzYWJsZWRcIikuYXR0cihcImFyaWEtZGlzYWJsZWRcIixcImZhbHNlXCIpLGkuJG5leHRBcnJvdy5yZW1vdmVDbGFzcyhcInNsaWNrLWRpc2FibGVkXCIpLmF0dHIoXCJhcmlhLWRpc2FibGVkXCIsXCJmYWxzZVwiKSwwPT09aS5jdXJyZW50U2xpZGU/KGkuJHByZXZBcnJvdy5hZGRDbGFzcyhcInNsaWNrLWRpc2FibGVkXCIpLmF0dHIoXCJhcmlhLWRpc2FibGVkXCIsXCJ0cnVlXCIpLGkuJG5leHRBcnJvdy5yZW1vdmVDbGFzcyhcInNsaWNrLWRpc2FibGVkXCIpLmF0dHIoXCJhcmlhLWRpc2FibGVkXCIsXCJmYWxzZVwiKSk6aS5jdXJyZW50U2xpZGU+PWkuc2xpZGVDb3VudC1pLm9wdGlvbnMuc2xpZGVzVG9TaG93JiYhMT09PWkub3B0aW9ucy5jZW50ZXJNb2RlPyhpLiRuZXh0QXJyb3cuYWRkQ2xhc3MoXCJzbGljay1kaXNhYmxlZFwiKS5hdHRyKFwiYXJpYS1kaXNhYmxlZFwiLFwidHJ1ZVwiKSxpLiRwcmV2QXJyb3cucmVtb3ZlQ2xhc3MoXCJzbGljay1kaXNhYmxlZFwiKS5hdHRyKFwiYXJpYS1kaXNhYmxlZFwiLFwiZmFsc2VcIikpOmkuY3VycmVudFNsaWRlPj1pLnNsaWRlQ291bnQtMSYmITA9PT1pLm9wdGlvbnMuY2VudGVyTW9kZSYmKGkuJG5leHRBcnJvdy5hZGRDbGFzcyhcInNsaWNrLWRpc2FibGVkXCIpLmF0dHIoXCJhcmlhLWRpc2FibGVkXCIsXCJ0cnVlXCIpLGkuJHByZXZBcnJvdy5yZW1vdmVDbGFzcyhcInNsaWNrLWRpc2FibGVkXCIpLmF0dHIoXCJhcmlhLWRpc2FibGVkXCIsXCJmYWxzZVwiKSkpfSxlLnByb3RvdHlwZS51cGRhdGVEb3RzPWZ1bmN0aW9uKCl7dmFyIGk9dGhpcztudWxsIT09aS4kZG90cyYmKGkuJGRvdHMuZmluZChcImxpXCIpLnJlbW92ZUNsYXNzKFwic2xpY2stYWN0aXZlXCIpLmVuZCgpLGkuJGRvdHMuZmluZChcImxpXCIpLmVxKE1hdGguZmxvb3IoaS5jdXJyZW50U2xpZGUvaS5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsKSkuYWRkQ2xhc3MoXCJzbGljay1hY3RpdmVcIikpfSxlLnByb3RvdHlwZS52aXNpYmlsaXR5PWZ1bmN0aW9uKCl7dmFyIGk9dGhpcztpLm9wdGlvbnMuYXV0b3BsYXkmJihkb2N1bWVudFtpLmhpZGRlbl0/aS5pbnRlcnJ1cHRlZD0hMDppLmludGVycnVwdGVkPSExKX0saS5mbi5zbGljaz1mdW5jdGlvbigpe3ZhciBpLHQsbz10aGlzLHM9YXJndW1lbnRzWzBdLG49QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLDEpLHI9by5sZW5ndGg7Zm9yKGk9MDtpPHI7aSsrKWlmKFwib2JqZWN0XCI9PXR5cGVvZiBzfHx2b2lkIDA9PT1zP29baV0uc2xpY2s9bmV3IGUob1tpXSxzKTp0PW9baV0uc2xpY2tbc10uYXBwbHkob1tpXS5zbGljayxuKSx2b2lkIDAhPT10KXJldHVybiB0O3JldHVybiBvfX0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
