!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("react")):"function"==typeof define&&define.amd?define(["exports","react"],e):e((t=t||self).Ob={},t.react)}(this,function(t,a){"use strict";var o=function(){return(o=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var u in e=arguments[n])Object.prototype.hasOwnProperty.call(e,u)&&(t[u]=e[u]);return t}).apply(this,arguments)};function s(n,r){var u,o,i,a={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]},t={next:e(0),throw:e(1),return:e(2)};return"function"==typeof Symbol&&(t[Symbol.iterator]=function(){return this}),t;function e(e){return function(t){return function(e){if(u)throw new TypeError("Generator is already executing.");for(;a;)try{if(u=1,o&&(i=2&e[0]?o.return:e[0]?o.throw||((i=o.return)&&i.call(o),0):o.next)&&!(i=i.call(o,e[1])).done)return i;switch(o=0,(e=i?[2&e[0],i.value]:e)[0]){case 0:case 1:i=e;break;case 4:return a.label++,{value:e[1],done:!1};case 5:a.label++,o=e[1],e=[0];continue;case 7:e=a.ops.pop(),a.trys.pop();continue;default:if(!(i=0<(i=a.trys).length&&i[i.length-1])&&(6===e[0]||2===e[0])){a=0;continue}if(3===e[0]&&(!i||e[1]>i[0]&&e[1]<i[3])){a.label=e[1];break}if(6===e[0]&&a.label<i[1]){a.label=i[1],i=e;break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(e);break}i[2]&&a.ops.pop(),a.trys.pop();continue}e=r.call(n,a)}catch(t){e=[6,t],o=0}finally{u=i=0}if(5&e[0])throw e[1];return{value:e[0]?e[1]:void 0,done:!0}}([e,t])}}}function c(t){var c={state:t,events:[],next:function(e){c.events.forEach(function(t){t(e||c.state)})},setState:function(t){t(c.state),c.next(c.state)},subscribe:function(n){c.events.push(n);var r={unsubscribe:function(){var e=[];return c.events.forEach(function(t){t!==n&&e.push(t)}),c.events=e,r},next:function(t){return n(t||c.state),r}};return r},subscribeMemo:function(u,o){var i=c.state?u(c.state):[],a=i.length,t=c.subscribe(function(t){for(var e=u(t),n=!0,r=0;r<a;r++)if(e[r]!==i[r]){n=!1;break}n||(o(t),i=e)});return t.next=function(t){return o(t||c.state)},t}};return c}var f={immer:null};t.Subject=c,t.allowImmer=function(t){f.immer=t},t.default=function(t,e){var i=c(t);function n(e,n){var r=this,t=a.useState(i.state),u=t[0],o=t[1];return a.useEffect(function(){var t;return n&&n.forEach(function(n){return o=r,c=function(){var e;return s(this,function(t){switch(t.label){case 0:return[4,Promise.resolve(n)];case 1:return"function"==typeof(e=t.sent())&&e(),[2]}})},new(a=(a=i=void 0)||Promise)(function(t,e){function n(t){try{u(c.next(t))}catch(t){e(t)}}function r(t){try{u(c.throw(t))}catch(t){e(t)}}function u(e){e.done?t(e.value):new a(function(t){t(e.value)}).then(n,r)}u((c=c.apply(o,i||[])).next())});var o,i,a,c}),t=e?i.subscribeMemo(e,function(t){o(t)}):i.subscribe(function(t){o(t)}),function(){t.unsubscribe()}},[]),u}function r(t){return(0,t.children)(n(t.meno))}var u=JSON.parse(JSON.stringify(t));return r.getBaseState=function(){return JSON.parse(JSON.stringify(u))},r.get=function(){return i.state},r.set=function(e){f.immer?i.state=f.immer(i.state,function(t){e(t)}):(e(i.state),i.state=o({},i.state)),i.next()},r.next=function(){return r.set(function(){})},r.fn=e,r.useState=n,r},Object.defineProperty(t,"__esModule",{value:!0})});
//# sourceMappingURL=index.js.map
